"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartLine = {
  variationId: string;
  quantity: number;
  name: string;
  priceGBP: number;
};

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: CartLine) => void;
  updateQuantity: (variationId: string, delta: number) => void;
  removeItem: (variationId: string) => void;
  clear: () => void;
};

const CART_STORAGE_KEY = "rvs-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const addItem = useCallback((item: CartLine) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variationId === item.variationId);
      if (existing) {
        return prev.map((i) =>
          i.variationId === item.variationId
            ? { ...i, quantity: Math.min(20, i.quantity + item.quantity) }
            : i,
        );
      }
      return [...prev, { ...item, quantity: Math.min(20, item.quantity) }];
    });
    setOpen(true);
  }, []);

  const updateQuantity = useCallback((variationId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.variationId === variationId
            ? { ...i, quantity: i.quantity + delta }
            : i,
        )
        .filter((i) => i.quantity > 0 && i.quantity <= 20),
    );
  }, []);

  const removeItem = useCallback((variationId: string) => {
    setItems((prev) => prev.filter((i) => i.variationId !== variationId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceGBP * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      hydrated,
      open,
      setOpen,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [
      items,
      count,
      subtotal,
      hydrated,
      open,
      addItem,
      updateQuantity,
      removeItem,
      clear,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    hydrated,
    open,
    setOpen,
    updateQuantity,
    removeItem,
    clear,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || !asideRef.current) return;
    const node = asideRef.current;
    const focusable = node.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const checkout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            variationId: i.variationId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }
      window.location.assign(data.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Checkout failed. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#141514]/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
      />
        <aside
          ref={asideRef}
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fff2cc] shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Your order"
        >
        <div className="flex items-center justify-between border-b border-[#0c343d]/10 px-6 py-5">
          <div>
            <h2 className="font-display text-3xl text-[#141514]">Your Order</h2>
            <p className="mt-0.5 text-xs text-[#141514]/60">
              Collection at Unit 11
              {hydrated && count > 0 ? ` · ${count} item${count === 1 ? "" : "s"}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-[#141514] transition-colors hover:bg-[#0c343d]/10"
            aria-label="Close cart"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[#141514]/60">
                Your order is empty — browse the menu.
              </p>
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block text-sm font-semibold text-[#0c343d] hover:underline"
              >
                See the Menu →
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.variationId}
                  className="rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex justify-between gap-3">
                    <h3 className="font-display text-xl leading-tight text-[#141514]">
                      {item.name}
                    </h3>
                    <p className="shrink-0 text-sm text-[#0c343d]">
                      £{(item.priceGBP * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variationId, -1)}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-[#0c343d]/20 text-[#141514]"
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variationId, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-[#0c343d]/20 text-[#141514]"
                      aria-label={`Increase ${item.name}`}
                      disabled={item.quantity >= 20}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variationId)}
                      className="ml-auto text-xs text-[#141514]/50 underline-offset-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[#0c343d]/10 px-6 py-6">
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mb-4 w-full text-center text-xs text-[#141514]/50 underline-offset-2 hover:underline"
            >
              Clear order
            </button>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#141514]/70">
              Subtotal
            </span>
            <span className="font-display text-2xl text-[#0c343d]">
              £{subtotal.toFixed(2)}
            </span>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={checkout}
            className="btn-primary mt-6 w-full normal-case disabled:opacity-50"
            disabled={items.length === 0 || loading}
          >
            {loading ? "Redirecting…" : "Pay & Collect"}
          </button>
          <p className="mt-3 text-center text-xs text-[#141514]/50">
            Collection only at Unit 11, Great Northern Mall.
          </p>
        </div>
      </aside>
    </div>
  );
}

export function CartButton() {
  const { count, hydrated, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="btn-cream relative shrink-0 normal-case"
      aria-label={`Open order, ${hydrated ? count : 0} items`}
    >
      Order
      {hydrated && count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#141514] text-xs font-bold text-[#fff2cc]">
          {count}
        </span>
      )}
    </button>
  );
}
