import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/money";

export type MenuItemRowData = {
  squareId: string;
  variationId?: string;
  name: string;
  description?: string;
  priceGBP?: number | null;
  imageUrl?: string | null;
  soldOut?: boolean;
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
  const hasPrice = item.priceGBP != null && Number.isFinite(item.priceGBP);
  const price = hasPrice ? formatPrice(item.priceGBP as number) : null;
  const canAdd = Boolean(item.variationId) && !item.soldOut && hasPrice;
  const muted = tone === "dark" ? "text-cream/65" : "text-ink/65";

  return (
    <li className="flex items-start gap-4 py-5">
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
          {(price || item.soldOut) && (
            <>
              <span className="leader" aria-hidden />
              <p className="shrink-0 font-display text-[1.6rem] leading-none tabular-nums">
                {item.soldOut ? (
                  <span className={`font-body text-sm font-bold ${muted}`}>Sold out</span>
                ) : (
                  price
                )}
              </p>
            </>
          )}
        </div>
        {(item.description || canAdd) && (
          <div className="mt-2 flex items-start justify-between gap-4">
            {item.description ? (
              <p className={`max-w-prose text-[0.95rem] leading-relaxed ${muted}`}>
                {item.description}
              </p>
            ) : (
              <span />
            )}
            {canAdd && item.variationId && (
              <AddToCartButton
                variationId={item.variationId}
                name={item.name}
                priceGBP={item.priceGBP as number}
                tone={tone}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
