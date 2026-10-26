import DrinkFinderClient, {
  type FinderDrinkItem,
} from "@/components/DrinkFinderClient";
import { getMenu } from "@/lib/catalog";

export const revalidate = 300;

export default async function BuilderPage() {
  const menu = await getMenu();
  const items: FinderDrinkItem[] = menu.categories.flatMap((category) =>
    category.items.map((item) => ({
      squareId: item.squareId,
      slug: item.slug,
      name: item.name,
      category: category.id,
      description: item.description,
      variationId: item.variationId,
      priceGBP: item.priceGBP,
      soldOut: item.soldOut,
    })),
  );

  return <DrinkFinderClient items={items} />;
}
