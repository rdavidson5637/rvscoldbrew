import type { Metadata } from "next";
import FlipdishOrder from "@/components/FlipdishOrder";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Order Online | RV's Cold Brew",
  description:
    "Order RV's Cold Brew for collection at Unit 11, Great Northern Mall, Belfast. View the live menu and check out online.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <main className="bg-[#0f100f] text-cream">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
        <header className="text-center">
          <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
            Order Online
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            Browse the live menu and check out for collection at {LOCATION.full}.
          </p>
          <p className="mt-2 text-xs text-cream/60">
            {OPENING_HOURS.map((row) => (
              <span key={row.days} className="mx-2 inline-block">
                <span className="text-cream">{row.days}</span> {row.hours}
              </span>
            ))}
          </p>
        </header>

        <div className="mt-10">
          <FlipdishOrder />
        </div>
      </div>
    </main>
  );
}
