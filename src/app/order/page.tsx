import type { Metadata } from "next";
import Link from "next/link";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Order for Collection",
  description:
    "Order RV's Cold Brew for collection at Unit 11, Great Northern Mall, Belfast — near Grand Central Station.",
  alternates: { canonical: "/order" },
  openGraph: {
    title: "Order for Collection | RV's Cold Brew",
    images: ["/media/og-image.jpg"],
  },
};

export default function OrderPage() {
  return (
    <main className="bg-[#fff2cc] text-[#141514]">
      <section className="bg-[#0c343d] px-4 py-16 text-[#fff2cc] sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl sm:text-6xl">
            Order for Collection
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#fff2cc]/85 sm:text-base">
            Browse the menu, pay online, and we&apos;ll have it ready at{" "}
            {LOCATION.full}.
          </p>
          <Link href="/menu" className="btn-cream mt-8 inline-flex normal-case">
            See the Menu
          </Link>
        </div>
      </section>

      <div className="bg-[#141514] px-4 py-3 text-center text-sm text-[#fff2cc]/90 sm:px-6">
        <Link href="/rewards" className="underline-offset-2 hover:underline">
          Earn points with every order →
        </Link>
      </div>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl text-[#0c343d]">Collect here</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#141514]/80">
              {LOCATION.unit}, {LOCATION.name}
              <br />
              {LOCATION.detail}
              <br />
              {LOCATION.city}
            </p>
            <a
              href={LOCATION.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-[#0c343d] underline-offset-2 hover:underline"
            >
              Get directions →
            </a>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-display text-3xl text-[#0c343d]">Opening hours</h2>
            <ul className="mt-4 space-y-1 text-sm text-[#141514]/80">
              {OPENING_HOURS.map((row) => (
                <li key={row.days}>
                  <span className="font-semibold text-[#141514]">{row.days}</span>{" "}
                  {row.hours}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-[#0c343d] p-8 text-center text-[#fff2cc]">
          <h2 className="font-display text-3xl">Not sure what to get?</h2>
          <p className="mt-3 text-sm text-[#fff2cc]/80">
            Hot or iced, coffee or matcha — we&apos;ll point you at the real menu
            item.
          </p>
          <Link href="/builder" className="btn-cream mt-6 inline-flex normal-case">
            Find Your Drink
          </Link>
        </div>
      </section>
    </main>
  );
}
