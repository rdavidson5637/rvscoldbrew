"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/money";
import { IMAGES } from "@/lib/brand";

export type MenuItemCardData = {
  squareId: string;
  variationId?: string;
  name: string;
  description?: string;
  priceGBP?: number | null;
  imageUrl?: string | null;
  soldOut?: boolean;
};

export default function MenuItemCard({ item }: { item: MenuItemCardData }) {
  const { addItem } = useCart();
  const price =
    item.priceGBP != null && Number.isFinite(item.priceGBP)
      ? formatPrice(item.priceGBP)
      : null;
  const canAdd = Boolean(item.variationId) && !item.soldOut && item.priceGBP != null;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[#0c343d]/5">
        <Image
          src={item.imageUrl || IMAGES.placeholder}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.soldOut && (
          <span className="absolute left-3 top-3 rounded-md bg-[#141514] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#fff2cc]">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-[#141514]">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#141514]/70">
            {item.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-display text-xl text-[#0c343d]">
            {price ?? (
              <span className="text-sm font-normal text-[#141514]/40">
                Price at till
              </span>
            )}
          </p>
          {canAdd && item.variationId && item.priceGBP != null && (
            <button
              type="button"
              onClick={() =>
                addItem({
                  variationId: item.variationId!,
                  name: item.name,
                  priceGBP: item.priceGBP!,
                  quantity: 1,
                })
              }
              className="btn-primary shrink-0 px-4 py-2 text-xs normal-case"
            >
              Add to order
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
