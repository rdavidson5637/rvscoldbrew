import type { Metadata } from "next";
import Link from "next/link";
import OpenStatus from "@/components/OpenStatus";
import PageHeader from "@/components/PageHeader";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Order for Collection",
  description:
    "Order RV's Cold Brew online and collect at Unit 11, Great Northern Mall, Belfast, near Grand Central Station.",
  alternates: { canonical: "/order" },
  openGraph: {
    title: "Order for Collection | RV's Cold Brew",
    description:
      "Order RV's Cold Brew online and collect at Unit 11, Great Northern Mall, Belfast, near Grand Central Station.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Order for Collection | RV's Cold Brew",
    description:
      "Order RV's Cold Brew online and collect at Unit 11, Great Northern Mall, Belfast, near Grand Central Station.",
  },
};

const STEPS = [
  {
    title: "Pick your drinks",
    body: "Add anything from the menu to your order. Prices come straight from our till.",
  },
  {
    title: "Pay online",
    body: "Checkout runs through Square. Your receipt lands in your inbox.",
  },
  {
    title: "Collect at Unit 11",
    body: "Head to our counter in Great Northern Mall and we'll have it ready.",
  },
];

export default function OrderPage() {
  return (
    <div className="bg-cream text-ink">
      <PageHeader
        title="Order ahead"
        intro={
          <p>
            Order online and collect at {LOCATION.full}. Collection only, no
            delivery.
          </p>
        }
        actions={
          <Link href="/menu" className="btn-cream">
            Start your order
          </Link>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-5xl leading-none text-teal sm:text-6xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t-2 border-teal pt-6">
              <p className="font-display text-5xl leading-none text-teal/35">{i + 1}</p>
              <h3 className="mt-3 font-display text-4xl leading-none text-teal">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-teal text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-24">
          <div>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">Collect here</h2>
            <address className="mt-6 text-xl not-italic leading-relaxed text-cream/85">
              {LOCATION.unit}, {LOCATION.name}
              <br />
              {LOCATION.detail}
              <br />
              {LOCATION.city}
            </address>
            <a
              href={LOCATION.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-under mt-6 inline-block text-cream"
            >
              Get directions
            </a>
          </div>
          <div>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">Opening hours</h2>
            <OpenStatus className="mt-4 font-extrabold text-cream" />
            <dl className="mt-6 max-w-sm border-t-2 border-cream/40">
              {OPENING_HOURS.map((row) => (
                <div
                  key={row.days}
                  className="flex justify-between gap-6 border-b-2 border-dotted border-cream/20 py-3 text-lg"
                >
                  <dt className="font-extrabold">{row.days}</dt>
                  <dd className="tabular-nums text-cream/80">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-8 border-2 border-matcha-ink bg-matcha p-8 text-matcha-ink sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">
              Not sure what to get?
            </h2>
            <p className="mt-3 max-w-md text-lg leading-relaxed">
              Answer three quick questions, hot or iced, coffee or matcha, and a
              flavour, and we&apos;ll point you at a drink.
            </p>
          </div>
          <Link
            href="/builder"
            className="btn shrink-0 bg-matcha-ink text-matcha hover:opacity-90 focus-visible:outline-matcha-ink"
          >
            Find your drink
          </Link>
        </div>
      </section>
    </div>
  );
}
