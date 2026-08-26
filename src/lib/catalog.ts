import "server-only";

import type { Square } from "square";
import { penceToPounds } from "@/lib/money";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategoryId,
} from "@/lib/menu-data";
import {
  getSquareClient,
  getSquareLocationId,
  hasSquareCredentials,
} from "@/lib/square";

export type CatalogMenuItem = {
  squareId: string;
  variationId?: string;
  name: string;
  description?: string;
  priceGBP?: number | null;
  imageUrl?: string | null;
  soldOut?: boolean;
  slug?: string;
};

export type CatalogMenuCategory = {
  id: string;
  squareId: string;
  name: string;
  blurb: string;
  items: CatalogMenuItem[];
};

export type CatalogMenu = {
  categories: CatalogMenuCategory[];
  source: "square" | "fallback";
};

function fallbackMenu(): CatalogMenu {
  return {
    source: "fallback",
    categories: MENU_CATEGORIES.map((cat) => ({
      id: cat.id,
      squareId: cat.squareId,
      name: cat.name,
      blurb: cat.blurb,
      items: MENU_ITEMS.filter((item) => item.category === cat.id).map(
        (item) => ({
          squareId: item.squareId,
          name: item.name,
          description: item.description,
          priceGBP: null,
          imageUrl: null,
          slug: item.slug,
        }),
      ),
    })),
  };
}

function moneyToPounds(amount: bigint | number | string | null | undefined): number | null {
  if (amount == null) return null;
  try {
    if (typeof amount === "bigint") return penceToPounds(amount);
    if (typeof amount === "number") return penceToPounds(amount);
    if (typeof amount === "string") return penceToPounds(Number(amount));
  } catch {
    return null;
  }
  return null;
}

function availableAtLocation(
  obj: Square.CatalogObjectBase,
  locationId: string,
): boolean {
  if (obj.isDeleted) return false;
  if (obj.absentAtLocationIds?.includes(locationId)) return false;
  if (obj.presentAtAllLocations) return true;
  if (obj.presentAtLocationIds?.includes(locationId)) return true;
  if (!obj.presentAtLocationIds?.length && !obj.absentAtLocationIds?.length) {
    return true;
  }
  return Boolean(obj.presentAtLocationIds?.includes(locationId));
}

export async function getMenu(): Promise<CatalogMenu> {
  if (!hasSquareCredentials()) {
    console.warn("[catalog] Square env vars missing — using menu-data fallback");
    return fallbackMenu();
  }

  try {
    const client = getSquareClient();
    const locationId = getSquareLocationId();

    const page = await client.catalog.list({
      types: "ITEM,CATEGORY,IMAGE",
    });

    const objects: Square.CatalogObject[] = [];
    for await (const obj of page) {
      objects.push(obj);
    }

    const images = new Map<string, string>();
    const categoryNames = new Map<string, string>();

    for (const obj of objects) {
      if (obj.type === "IMAGE" && obj.id && obj.imageData?.url) {
        images.set(obj.id, obj.imageData.url);
      }
      if (obj.type === "CATEGORY" && obj.id) {
        categoryNames.set(obj.id, obj.categoryData?.name ?? "");
      }
    }

    const knownBySquareId = new Map(MENU_ITEMS.map((i) => [i.squareId, i]));
    const knownCategoryBySquareId = new Map(
      MENU_CATEGORIES.map((c) => [c.squareId, c]),
    );

    const itemsByCategory = new Map<string, CatalogMenuItem[]>();
    for (const cat of MENU_CATEGORIES) {
      itemsByCategory.set(cat.id, []);
    }
    const extrasBySquareCategory = new Map<string, CatalogMenuItem[]>();
    const unexpected: string[] = [];

    for (const obj of objects) {
      if (obj.type !== "ITEM" || !obj.id || !obj.itemData) continue;
      if (!availableAtLocation(obj, locationId)) continue;

      const data = obj.itemData;
      const variations = (data.variations ?? []).filter(
        (v): v is Square.CatalogObject.ItemVariation => v.type === "ITEM_VARIATION",
      );

      const primary =
        variations.find(
          (v) => v.itemVariationData?.priceMoney?.amount != null,
        ) ?? variations[0];

      const amount = primary?.itemVariationData?.priceMoney?.amount;
      const priceGBP = moneyToPounds(amount ?? null);
      if (!primary?.id || priceGBP == null) {
        console.warn(
          `[catalog] Skipping item without price/variation: ${data.name ?? obj.id}`,
        );
        continue;
      }

      const override = primary.itemVariationData?.locationOverrides?.find(
        (o) => o.locationId === locationId,
      );
      const soldOut = Boolean(override?.soldOut);

      const imageId = data.imageIds?.[0];
      const imageUrl = imageId ? (images.get(imageId) ?? null) : null;

      const squareCategoryId =
        data.categories?.[0]?.id ?? data.categoryId ?? "";

      const known = knownBySquareId.get(obj.id);
      const item: CatalogMenuItem = {
        squareId: obj.id,
        variationId: primary.id,
        name: data.name ?? known?.name ?? "Item",
        description:
          data.descriptionPlaintext ??
          data.description ??
          known?.description,
        priceGBP,
        imageUrl,
        soldOut,
        slug: known?.slug,
      };

      if (known) {
        const list = itemsByCategory.get(known.category) ?? [];
        list.push(item);
        itemsByCategory.set(known.category, list);
      } else {
        unexpected.push(`${item.name} (${obj.id})`);
        const mapped = knownCategoryBySquareId.get(squareCategoryId);
        if (mapped) {
          const list = itemsByCategory.get(mapped.id) ?? [];
          list.push(item);
          itemsByCategory.set(mapped.id, list);
        } else {
          const list = extrasBySquareCategory.get(squareCategoryId) ?? [];
          list.push(item);
          extrasBySquareCategory.set(squareCategoryId, list);
        }
      }
    }

    if (unexpected.length > 0) {
      console.warn(
        `[catalog] Items in Square missing from menu-data.ts:\n${unexpected.join("\n")}`,
      );
    }

    const categories: CatalogMenuCategory[] = MENU_CATEGORIES.map((cat) => {
      const fetched = itemsByCategory.get(cat.id) ?? [];
      const order = new Map(
        MENU_ITEMS.filter((i) => i.category === cat.id).map((i, idx) => [
          i.squareId,
          idx,
        ]),
      );
      fetched.sort((a, b) => {
        const ai = order.get(a.squareId) ?? 9999;
        const bi = order.get(b.squareId) ?? 9999;
        return ai - bi;
      });

      const items =
        fetched.length > 0
          ? fetched
          : MENU_ITEMS.filter((i) => i.category === cat.id).map((i) => ({
              squareId: i.squareId,
              name: i.name,
              description: i.description,
              priceGBP: null as number | null,
              imageUrl: null as string | null,
              slug: i.slug,
            }));

      return {
        id: cat.id,
        squareId: cat.squareId,
        name: cat.name,
        blurb: cat.blurb,
        items,
      };
    });

    for (const [squareCatId, items] of Array.from(extrasBySquareCategory.entries())) {
      if (items.length === 0) continue;
      if (MENU_CATEGORIES.some((c) => c.squareId === squareCatId)) continue;
      categories.push({
        id: squareCatId,
        squareId: squareCatId,
        name: categoryNames.get(squareCatId) || "More",
        blurb: "",
        items,
      });
    }

    const totalItems = categories.reduce((n, c) => n + c.items.length, 0);
    if (totalItems === 0) {
      console.warn("[catalog] Square returned no items — using fallback");
      return fallbackMenu();
    }

    return { source: "square", categories };
  } catch (err) {
    console.warn("[catalog] Square Catalog API failed — using fallback", err);
    return fallbackMenu();
  }
}

export type { MenuCategoryId };
