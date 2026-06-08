import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Three steps, twenty-four hours, one smooth result. See how RV's Cold Brew filters out bitterness through cold extraction.",
};

const TIMELINE_STEPS = [
  {
    number: "01",
    image: IMAGES.processBlend,
    title: "The Blend",
    subtitle: "Proprietary Bean Selection",
    description:
      "We source and blend beans for one goal — maximum smoothness once steeped cold.",
  },
  {
    number: "02",
    image: IMAGES.processSteep,
    title: "The Steep",
    subtitle: "24 Hours. Cold Water. Nothing Else.",
    description:
      "Slow cold extraction pulls out flavour without heat, stripping bitterness and acidity from every batch.",
  },
  {
    number: "03",
    image: IMAGES.processCan,
    title: "The Can",
    subtitle: "Infused, Sealed, Ready to Upgrade Your Day.",
    description:
      "Infused to order, sealed fresh, and chilled — grab from the fridge or build your own.",
  },
];

const HOT_BREW_POINTS = [
  "Higher acidity",
  "Bitter, burnt notes",
  "Weakens when poured over ice",
  "Heat breaks down delicate flavours",
];

const COLD_BREW_POINTS = [
  "Naturally low acidity",
  "Smooth, clean finish",
  "Bold flavour — even over ice",
  "Cold extraction preserves complexity",
];

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0c343d] px-4 py-20 text-[#fff2cc] sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl">
            The Process.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[#fff2cc]/80 sm:text-base">
            Three steps. Twenty-four hours. One extraordinarily smooth result.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:py-28">
        <div className="relative mx-auto max-w-2xl">
          <div
            className="absolute bottom-8 left-7 top-8 w-px bg-[#0c343d]/20 sm:left-8"
            aria-hidden
          />

          <ol className="relative space-y-20">
            {TIMELINE_STEPS.map((step) => (
              <li key={step.number} className="relative flex gap-6 sm:gap-8">
                <div className="relative z-10 h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#0c343d] sm:h-20 sm:w-20">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="relative min-w-0 pt-1">
                  <span
                    className="pointer-events-none absolute -left-1 -top-6 font-display text-7xl leading-none text-[#0c343d]/[0.07] sm:text-8xl"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                  <h2 className="relative font-display text-4xl text-[#141514] sm:text-5xl">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#0c343d]">
                    {step.subtitle}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#141514]/75">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#141514] px-4 py-20 text-[#fff2cc] sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#fff2cc]/10 bg-[#fff2cc]/5 p-8 opacity-60">
            <h3 className="font-display text-3xl text-[#fff2cc]/70">
              Hot Brew
            </h3>
            <ul className="mt-6 space-y-3">
              {HOT_BREW_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-[#fff2cc]/60"
                >
                  <span
                    className="mt-0.5 shrink-0 text-[#fff2cc]/40"
                    aria-hidden
                  >
                    ✕
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border-2 border-[#fff2cc]/30 bg-[#0c343d] p-8">
            <h3 className="font-display text-3xl">Cold Brew</h3>
            <ul className="mt-6 space-y-3">
              {COLD_BREW_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-[#fff2cc]/90"
                >
                  <span
                    className="mt-0.5 shrink-0 text-emerald-400"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Matcha */}
      <section className="bg-[#0c343d] px-4 py-20 text-[#fff2cc] sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#fff2cc]/30">
            <Image
              src={IMAGES.matcha}
              alt="Okumidori matcha"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Okumidori Matcha
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#fff2cc]/80 sm:text-base">
            Single cultivar ceremonial matcha from Uji — whisked fresh, naturally
            sweet, and every bit as smooth as our cold brew.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/builder" className="btn-cream normal-case">
              Heck Yeah — Build My Drink
            </Link>
            <Link
              href="/shop"
              className="btn border-2 border-[#fff2cc] bg-transparent text-[#fff2cc] hover:bg-[#fff2cc] hover:text-[#0c343d] normal-case"
            >
              Shop the Fridge
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#fff2cc] px-4 py-20 text-center sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-5xl text-[#141514] sm:text-6xl">
            Ready to Taste the Difference?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/builder" className="btn-primary normal-case">
              Heck Yeah — Build My Drink
            </Link>
            <Link href="/shop" className="btn-outline normal-case">
              Shop the Fridge
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
