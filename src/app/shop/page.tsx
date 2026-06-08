"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCT_COPY } from "@/lib/brand";
import { formatPrice, PRODUCTS } from "@/lib/products";

type Fulfillment = "pickup" | "shipping";

type CartItem = {
  productId: string;
  quantity: number;
};

const CART_STORAGE_KEY = "rvs-cart";
const FULFILLMENT_STORAGE_KEY = "rvs-fulfillment";
const SUBSCRIBE_STORAGE_KEY = "rvs-subscribe";

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState<string | null>(null);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [subscribeInterest, setSubscribeInterest] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedFulfillment = localStorage.getItem(FULFILLMENT_STORAGE_KEY);
      if (savedFulfillment === "pickup" || savedFulfillment === "shipping") {
        setFulfillment(savedFulfillment);
      }
      if (localStorage.getItem(SUBSCRIBE_STORAGE_KEY) === "true") {
        setSubscribeInterest(true);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FULFILLMENT_STORAGE_KEY, fulfillment);
  }, [fulfillment, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      SUBSCRIBE_STORAGE_KEY,
      subscribeInterest ? "true" : "false",
    );
  }, [subscribeInterest, hydrated]);

  useEffect(() => {
    if (!addedFlash) return;
    const timer = setTimeout(() => setAddedFlash(null), 1500);
    return () => clearTimeout(timer);
  }, [addedFlash]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setAddedFlash(productId);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <>
      {/* Header */}
      <header className="bg-[#0c343d] px-4 py-12 text-[#fff2cc] sm:px-6 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl">
              Shop the Fridge
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#fff2cc]/85 sm:text-base">
              {PRODUCT_COPY} Order for local pickup at Great Northern Mall or
              shipping across NI — checkout integration coming soon.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="btn-cream relative shrink-0 normal-case"
            aria-label={`Open cart, ${cartCount} items`}
          >
            My Cart
            {hydrated && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#141514] text-xs font-bold text-[#fff2cc]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Subscribe banner */}
      <div className="bg-[#141514] px-4 py-4 text-center text-sm text-[#fff2cc] sm:px-6">
        <p>
          Subscribe &amp; Save coming soon — never run out of cold brew again.
        </p>
      </div>

      {/* Fulfillment selector */}
      <div className="border-b border-[#0c343d]/10 bg-[#fff2cc] px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#141514]/70">
            How would you like it?
          </p>
          <div className="flex rounded-lg border-2 border-[#0c343d]/20 bg-white p-1">
            <button
              type="button"
              onClick={() => setFulfillment("pickup")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                fulfillment === "pickup"
                  ? "bg-[#0c343d] text-[#fff2cc]"
                  : "text-[#141514] hover:bg-[#0c343d]/5"
              }`}
            >
              Local Pickup
            </button>
            <button
              type="button"
              onClick={() => setFulfillment("shipping")}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                fulfillment === "shipping"
                  ? "bg-[#0c343d] text-[#fff2cc]"
                  : "text-[#141514] hover:bg-[#0c343d]/5"
              }`}
            >
              Shipping
            </button>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-7xl text-xs text-[#141514]/50">
          {fulfillment === "pickup"
            ? "Collect at Great Northern Mall, Belfast — near Grand Central Station."
            : "We’ll ship across Northern Ireland. Rates calculated at checkout (coming soon)."}
        </p>
      </div>

      {/* Product grid */}
      <section className="bg-[#fff2cc] px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <span className="absolute right-4 top-4 z-10 rounded-full bg-[#0c343d] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#fff2cc]">
                {product.badge}
              </span>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0c343d]">
                  {product.subtitle}
                </p>
                <h2 className="mt-1 font-display text-3xl leading-tight text-[#141514]">
                  {product.name}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#141514]/75">
                  {product.description}
                </p>
                <p className="mt-4 font-display text-2xl text-[#0c343d]">
                  {formatPrice(product.price)}
                </p>
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className={`mt-4 w-full rounded-md px-6 py-3 text-sm font-semibold normal-case tracking-normal transition-colors duration-300 ${
                    addedFlash === product.id
                      ? "bg-emerald-500 text-white animate-pulse-soft"
                      : "bg-[#0c343d] text-[#fff2cc] hover:brightness-110"
                  }`}
                >
                  {addedFlash === product.id
                    ? "✓ Heck Yeah — Great Choice!"
                    : "Heck Yeah — Add It"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Builder CTA */}
      <section className="bg-[#0c343d] px-4 py-16 text-center text-[#fff2cc] sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Want it Fresh to Order?
          </h2>
          <p className="mt-4 text-sm text-[#fff2cc]/80 sm:text-base">
            Customise your espresso-strength base, milk, and flavour — sealed
            fresh for pickup.
          </p>
          <Link
            href="/builder"
            className="btn-cream mt-8 inline-flex normal-case"
          >
            Heck Yeah — Build My Drink
          </Link>
        </div>
      </section>

      {/* Cart overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          cartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!cartOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#141514]/60 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
          aria-label="Close cart"
          tabIndex={cartOpen ? 0 : -1}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fff2cc] shadow-2xl transition-transform duration-300 ease-out ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <div className="flex items-center justify-between border-b border-[#0c343d]/10 px-6 py-5">
            <div>
              <h2 className="font-display text-3xl text-[#141514]">Your Cart</h2>
              <p className="mt-0.5 text-xs text-[#141514]/60">
                {fulfillment === "pickup" ? "Local pickup" : "Shipping"} · NI
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-md p-2 text-[#141514] transition-colors hover:bg-[#0c343d]/10"
              aria-label="Close cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-[#141514]/60">
                  Your cart is empty — grab something from the fridge!
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="text-sm font-semibold text-[#0c343d] hover:underline"
                  >
                    Browse bestsellers →
                  </Link>
                  <Link
                    href="/builder?quick=1"
                    onClick={() => setCartOpen(false)}
                    className="text-sm font-semibold text-[#0c343d] hover:underline"
                  >
                    Or quick-order a custom can →
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => {
                  const product = PRODUCTS.find(
                    (p) => p.id === item.productId,
                  );
                  if (!product) return null;
                  return (
                    <li
                      key={item.productId}
                      className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl leading-tight text-[#141514]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#0c343d]">
                          {formatPrice(product.price)}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, -1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#0c343d]/20 text-[#141514] transition-colors hover:bg-[#0c343d]/5"
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#0c343d]/20 text-[#141514] transition-colors hover:bg-[#0c343d]/5"
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            className="ml-auto text-xs text-[#141514]/50 underline-offset-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-[#0c343d]/10 px-6 py-6">
            <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg border border-[#0c343d]/10 bg-white/60 px-3 py-3">
              <input
                type="checkbox"
                checked={subscribeInterest}
                onChange={(e) => setSubscribeInterest(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#0c343d]"
              />
              <span className="text-xs text-[#141514]/70">
                <span className="font-semibold text-[#0c343d]">
                  Subscribe &amp; Save
                </span>{" "}
                — notify me when recurring orders launch. Checkout integration
                coming soon.
              </span>
            </label>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="mb-4 w-full text-center text-xs text-[#141514]/50 underline-offset-2 hover:underline"
              >
                Clear cart
              </button>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#141514]/70">
                Subtotal
              </span>
              <span className="font-display text-2xl text-[#0c343d]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              type="button"
              className="btn-primary mt-6 w-full normal-case"
              disabled={cart.length === 0}
            >
              Secure My Upgrade
            </button>
            <p className="mt-3 text-center text-xs text-[#141514]/50">
              Checkout integration coming soon — proudly independent, brewed in
              Belfast.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
