"use client";

import Image from "next/image";
import { useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import type { CatalogItemVariation } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

export type MenuItemRowData = {
  squareId: string;
  variationId?: string;
  variations?: CatalogItemVariation[];
  name: string;
  description?: string;
  priceGBP?: number | null;
  imageUrl?: string | null;
  soldOut?: boolean;
  slug?: string;
};

/**
 * One line on the menu board: name, dotted leader, price, Add.
 * Shows a thumbnail only when Square has a real photo for the item,
 * so the menu never repeats a stock placeholder.
 */
export default function MenuItemRow({
  item,
  tone = "light",
}: {
  item: MenuItemRowData;
  tone?: "light" | "dark";
}) {
  const multi = item.variations && item.variations.length > 1 ? item.variations : null;
  const [selectedVarId, setSelectedVarId] = useState<string | undefined>(
    multi?.find((v) => !v.soldOut)?.id ?? item.variationId,
  );

  const activeVar = multi?.find((v) => v.id === selectedVarId) ?? multi?.[0];
  const effectiveVariationId = activeVar ? activeVar.id : item.variationId;
  const effectivePriceGBP = activeVar ? activeVar.priceGBP : item.priceGBP;
  const effectiveSoldOut = activeVar ? activeVar.soldOut : item.soldOut;
  const effectiveName =
    activeVar && multi ? `${item.name} (${activeVar.name})` : item.name;

  const hasPrice =
    effectivePriceGBP != null && Number.isFinite(effectivePriceGBP);
  const price = hasPrice ? formatPrice(effectivePriceGBP as number) : null;
  const canAdd =
    Boolean(effectiveVariationId) && !effectiveSoldOut && hasPrice;
  const muted = tone === "dark" ? "text-cream/65" : "text-ink/65";

  return (
    <li
      id={item.slug ? `item-${item.slug}` : undefined}
      className="flex scroll-mt-40 items-start gap-4 py-5"
    >
      {item.imageUrl && (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-teal/10 sm:h-20 sm:w-20">
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-[1.7rem] leading-none sm:text-[1.9rem]">
            {item.name}
          </h3>
          {/* No price from Square: leave the line clean. The page says prices are at the till once. */}
          {(price || effectiveSoldOut) && (
            <>
              <span className="leader" aria-hidden />
              <p className="shrink-0 font-display text-[1.6rem] leading-none tabular-nums">
                {effectiveSoldOut ? (
                  <span className={`font-body text-sm font-bold ${muted}`}>
                    Sold out
                  </span>
                ) : (
                  price
                )}
              </p>
            </>
          )}
        </div>

        {multi && (
          <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={`${item.name} options`}>
            {multi.map((v) => {
              const selected = v.id === activeVar?.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.soldOut}
                  onClick={() => setSelectedVarId(v.id)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-3.5 text-xs font-extrabold transition-colors disabled:opacity-40 ${
                    selected
                      ? "border-teal bg-teal text-cream"
                      : "border-current/25 hover:border-current"
                  }`}
                >
                  {v.name} · {formatPrice(v.priceGBP)}
                </button>
              );
            })}
          </div>
        )}

        {(item.description || canAdd) && (
          <div className="mt-2 flex items-start justify-between gap-4">
            {item.description ? (
              <p
                className={`max-w-prose text-[0.95rem] leading-relaxed ${muted}`}
              >
                {item.description}
              </p>
            ) : (
              <span />
            )}
            {canAdd && effectiveVariationId && (
              <AddToCartButton
                variationId={effectiveVariationId}
                name={effectiveName}
                priceGBP={effectivePriceGBP as number}
                tone={tone}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
