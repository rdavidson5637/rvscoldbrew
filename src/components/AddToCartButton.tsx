"use client";

import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  variationId: string;
  name: string;
  priceGBP: number;
};

export default function AddToCartButton({
  variationId,
  name,
  priceGBP,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          variationId,
          name,
          priceGBP,
          quantity: 1,
        })
      }
      className="btn-primary shrink-0 px-4 py-2 text-xs normal-case"
      aria-label={`Add ${name} to order`}
    >
      Add to order
    </button>
  );
}
