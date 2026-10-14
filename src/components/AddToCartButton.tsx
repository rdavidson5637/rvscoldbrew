"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  variationId: string;
  name: string;
  priceGBP: number;
  /** "light" for cream/white surfaces, "dark" for teal/ink surfaces */
  tone?: "light" | "dark";
};

export default function AddToCartButton({
  variationId,
  name,
  priceGBP,
  tone = "light",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(id);
  }, [added]);

  const colours =
    tone === "dark"
      ? "bg-cream text-teal hover:bg-[#fff8e2] focus-visible:outline-cream"
      : "bg-teal text-cream hover:bg-teal-deep focus-visible:outline-teal";

  return (
    <button
      type="button"
      onClick={() => {
        addItem({ variationId, name, priceGBP, quantity: 1 });
        setAdded(true);
      }}
      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full pl-3 pr-4 text-sm font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colours}`}
      aria-label={`Add ${name} to order`}
    >
      {added ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
          <path strokeLinecap="round" d="M12 5v14M5 12h14" />
        </svg>
      )}
      {added ? "Added" : "Add"}
    </button>
  );
}
