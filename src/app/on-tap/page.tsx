import type { Metadata } from "next";
import Link from "next/link";
import DraftTapIllustration from "@/components/DraftTapIllustration";
import Marquee from "@/components/Marquee";
import Sticker from "@/components/Sticker";
import { CONTACT_EMAIL, LOCATION, TASTING_ROOM_CADENCE } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Cold Brew on Tap | Wholesale & Roasters",
  description:
    "RV's Cold Brew brews fresh cold brew concentrate and nitro cold brew in Belfast and supplies it on tap to cafés, bars and coffee roasters, with the taps, delivery and line cleaning included.",
  alternates: { canonical: "/on-tap" },
  openGraph: {
    title: "Cold Brew on Tap | RV's Cold Brew",
    description:
      "Fresh cold brew concentrate and nitro cold brew on draft in Belfast. Taps, delivery and line cleaning included.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Brew on Tap | RV's Cold Brew",
    description:
      "Fresh cold brew concentrate and nitro cold brew on draft in Belfast. Taps, delivery and line cleaning included.",
  },
};

const STATS = [
  { value: "Seconds", label: "to pour an iced coffee" },
  { value: "14 days", label: "chilled life in the keg" },
  { value: "19 L", label: "reusable stainless steel kegs" },
  { value: "£0", label: "equipment to buy" },
] as const;

const SERVICE_STEPS = [
  {
    number: "01",
    title: "Taste it",
    body: "Visit our tasting room in Belfast, or we bring samples to you. Try both taps and see how fast drinks are made.",
  },
  {
    number: "02",
    title: "We install the taps",
    body: "We fit a compact two-tap system for a refundable deposit. The equipment stays ours, and we train your team and supply recipe cards.",
  },
  {
    number: "03",
    title: "We keep it flowing",
    body: "We deliver full kegs on our own route, collect the empties and clean the lines.",
  },
] as const;

const ROASTER_POINTS = [
  "Brewed from your beans, to your strength and profile",
  "Kegged and delivered under your brand",
  "Small volumes to start, from 4 kegs a month",
  "No investment in a wet production facility",
] as const;

const BREW_STEPS = [
  {
    title: "Steep",
    body: "Slow cold extraction, protected under nitrogen",
  },
  {
    title: "Recover",
    body: "Our high-yield step gets more from every kilo of coffee",
  },
  {
    title: "Filter",
    body: "Multi-stage filtration for a clean, stable brew",
  },
  {
    title: "Test",
    body: "Strength (TDS) and pH checked on every batch",
  },
  {
    title: "Keg",
    body: "Sanitised steel kegs, batch-coded and dated",
  },
] as const;

const BREW_BENEFITS = [
  {
    title: "Fresh, not long-life",
    body: "Unpasteurised and kept chilled, with a 14-day life in the keg, so it tastes like proper specialty coffee.",
  },
  {
    title: "Less waste",
    body: "Venues pour only what they sell instead of throwing away jugs of home-made cold brew after a day or two.",
  },
  {
    title: "No single-use packaging",
    body: "Our stainless steel kegs are cleaned and reused, replacing hundreds of cans and bottles.",
  },
] as const;

const BOOK_DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Book%20a%20demo&body=Hi%20RV%27s%20Cold%20Brew%2C%0A%0AI%27d%20like%20to%20book%20a%20demo%20of%20your%20cold%20brew%20on%20tap.%0A%0AVenue%20name%3A%0ALocation%3A%0APhone%3A%0ABest%20days%2Ftimes%3A%0A%0AThanks`;
const WHITE_LABEL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=White-label%20cold%20brew`;
const ENQUIRY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Cold%20brew%20on%20tap%20enquiry`;

export default function OnTapPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:pb-24 lg:pt-20">
          <div>
            <p className="rise kicker text-cream/75">
              Brewed in Belfast · Hospitality &amp; Roasters
            </p>
            <h1 className="rise mt-4 font-display text-6xl leading-[0.88] delay-100 sm:text-7xl lg:text-8xl">
              Fresh cold brew <span className="text-white">on tap</span>, without
              the hassle.
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-cream/85 delay-200">
              We brew specialty cold brew concentrate and nitro cold brew in
              Belfast and supply it on draft to cafés, bars, restaurants, hotels
              and gyms. We install the taps, deliver the kegs and clean the
              lines. You just pour.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 delay-300">
              <a href={BOOK_DEMO_MAILTO} className="btn-cream">
                Book a demo
              </a>
              <a href="#how" className="link-under text-cream">
                How it works
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm items-end justify-center md:max-w-md">
            <DraftTapIllustration className="w-full max-w-[360px]" />
            <Sticker
              ring="Cold brew & nitro • Taps included • Brewed in Belfast • "
              centre={["On", "tap"]}
              className="tilt absolute -top-4 right-2 z-20 w-28 drop-shadow-xl [--tilt:10deg] sm:w-32"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        aria-label="Key draft service metrics"
        className="border-b-2 border-teal/15 bg-cream text-teal"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-teal/15 md:grid-cols-4 md:divide-x-2">
          {STATS.map((stat, idx) => (
            <div
              key={stat.value}
              className={`px-6 py-8 text-center ${
                idx < 2 ? "max-md:border-b-2 max-md:border-teal/15" : ""
              } ${idx % 2 === 0 ? "max-md:border-r-2 max-md:border-teal/15" : ""}`}
            >
              <p className="font-display text-5xl leading-none sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold text-ink/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — Cold brew as a service */}
      <section id="how" className="scroll-mt-28 bg-cream px-4 section-pad text-teal sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div data-reveal>
            <p className="kicker text-teal/70">
              Cold brew as a service
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-6xl leading-[0.9] sm:text-7xl">
              Everything handled, from brew to tap.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Making cold brew in-house is slow, inconsistent and wasteful. Our
              service gives your venue fresh, consistent cold brew with no
              equipment cost and no barista time.
            </p>
          </div>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {SERVICE_STEPS.map((step, i) => (
              <li
                key={step.number}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
                className="border-t-2 border-teal pt-6"
              >
                <p className="font-display text-7xl leading-none text-teal/25">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-4xl leading-none">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two taps, one system */}
      <section id="products" className="scroll-mt-28 bg-ink px-4 section-pad text-cream sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div data-reveal>
            <p className="kicker text-cream/65">
              Two taps, one system
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-6xl leading-[0.9] sm:text-7xl">
              A whole cold coffee menu from one set-up.
            </h2>
          </div>

          <div className="mt-12 grid gap-0 border-y-2 border-cream/20 md:grid-cols-2 md:divide-x-2 md:divide-cream/20" data-reveal>
            <article className="flex flex-col bg-teal px-6 py-10 sm:px-10 sm:py-12">
              <p className="kicker text-cream/65">Tap one</p>
              <h3 className="mt-4 font-display text-5xl leading-none">
                Cold brew concentrate
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-cream/85">
                Smooth, strong specialty cold brew for building drinks in
                seconds.
              </p>
              <ul className="mt-6 border-t-2 border-cream/20 text-base text-cream/90">
                <li className="border-b border-cream/15 py-3.5 font-bold">
                  Iced lattes and iced Americanos
                </li>
                <li className="border-b border-cream/15 py-3.5 font-bold">
                  Espresso Martinis and coffee cocktails
                </li>
                <li className="py-3.5 font-bold">
                  Around 300 drinks from every keg
                </li>
              </ul>
            </article>

            <article className="flex flex-col border-t-2 border-cream/20 bg-teal-deep px-6 py-10 sm:px-10 sm:py-12 md:border-t-0">
              <p className="kicker text-cream/65">Tap two</p>
              <h3 className="mt-4 font-display text-5xl leading-none">
                Nitro cold brew
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-cream/85">
                Ready to pour, with a creamy cascading head and no milk or sugar
                needed.
              </p>
              <ul className="mt-6 border-t-2 border-cream/20 text-base text-cream/90">
                <li className="border-b border-cream/15 py-3.5 font-bold">
                  A premium drink in its own right
                </li>
                <li className="border-b border-cream/15 py-3.5 font-bold">
                  Poured straight from the tap
                </li>
                <li className="py-3.5 font-bold">
                  Served daily in our tasting room
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <Marquee
        tone="cream"
        items={[
          "Cold brew concentrate",
          "Nitro cold brew",
          "19 L stainless steel kegs",
          "Taps, delivery & line cleaning included",
          "White-label for coffee roasters",
        ]}
      />

      {/* For Coffee Roasters */}
      <section id="roasters" className="scroll-mt-28 bg-matcha px-4 section-pad text-matcha-ink sm:px-6">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div data-reveal>
            <p className="kicker text-matcha-ink/70">
              For coffee roasters
            </p>
            <h2 className="mt-3 font-display text-6xl leading-[0.9] sm:text-7xl">
              Your coffee, your brand, on draft.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-matcha-ink/85">
              Most roasters don&apos;t have the facilities to make cold brew. We
              brew your own beans to your recipe and supply it in kegs under
              your brand, so your café customers can pour your cold brew.
            </p>
            <ul className="mt-8 divide-y-2 divide-dotted divide-matcha-ink/20 border-y-2 border-matcha-ink">
              {ROASTER_POINTS.map((point) => (
                <li
                  key={point}
                  className="py-3.5 text-lg font-bold leading-snug"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <aside
            data-reveal
            className="border-2 border-matcha-ink bg-teal p-8 text-cream sm:p-10"
          >
            <p className="kicker text-cream/65">
              Proven in Northern Ireland
            </p>
            <h3 className="mt-3 font-display text-5xl leading-none">
              Our first partner
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-cream/85">
              Strangford Coffee Roastery roasts the specialty beans for our cold
              brew, and is our first draft partner, pouring cold brew made from
              its own beans on our tap system.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={WHITE_LABEL_MAILTO} className="btn-cream">
                Talk to us about white-label
              </a>
              <Link href="/contact?type=white-label" className="link-under text-cream">
                Enquiry form
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* How we brew */}
      <section id="process" className="scroll-mt-28 bg-cream px-4 section-pad text-teal sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div data-reveal>
            <p className="kicker text-teal/70">
              How we brew
            </p>
            <h2 className="mt-3 font-display text-6xl leading-[0.9] sm:text-7xl">
              Small-batch, measured, fresh.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
              Our specialty blend of Brazil, Peru and Guatemala coffee, roasted
              in Northern Ireland, is cold brewed in our Belfast unit. Every
              batch is tested and every keg is traceable.
            </p>
          </div>

          <ol
            className="mt-12 divide-y-2 divide-dotted divide-teal/20 border-y-2 border-teal"
            data-reveal
          >
            {BREW_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,10rem)_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="font-display text-3xl leading-none text-teal/35">
                  0{i + 1}
                </span>
                <h3 className="font-display text-3xl leading-none">
                  {step.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-10 border-t-2 border-teal pt-10 md:grid-cols-3 md:gap-8" data-reveal>
            {BREW_BENEFITS.map((benefit) => (
              <article key={benefit.title}>
                <h3 className="font-display text-4xl leading-none text-teal">
                  {benefit.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/80">
                  {benefit.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tasting room & showroom + CTA */}
      <section id="visit" className="scroll-mt-28 bg-ink px-4 section-pad text-cream sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-0 border-y-2 border-cream/20 md:grid-cols-2 md:divide-x-2 md:divide-cream/20" data-reveal>
          <article className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-12">
            <div>
              <p className="kicker text-cream/65">
                Tasting room &amp; showroom
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                Come and taste it from the tap.
              </h2>
              <p className="mt-4 text-sm font-extrabold text-cream">
                {TASTING_ROOM_CADENCE}
              </p>
              {/* TODO Ryan: live Wix page only says "every day". Confirm clock hours before showing Mon–Sun times or live Open/Closed here. */}
              <address className="mt-5 text-lg not-italic leading-relaxed text-cream/85">
                <strong className="text-cream">RV&apos;s Cold Brew Coffee</strong>
                <br />
                {LOCATION.unit}, {LOCATION.name}
                <br />
                Belfast {LOCATION.postcode}
              </address>
              <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
                Our tasting room at the front of our brewery serves our cold
                brew and nitro every day. Venue owners are welcome to book a
                demo.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={LOCATION.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-cream"
              >
                Get directions
              </a>
              <Link href="/menu" className="link-under text-cream">
                See tasting room menu
              </Link>
            </div>
          </article>

          <article className="flex flex-col justify-between border-t-2 border-cream/20 bg-teal px-6 py-10 sm:px-10 sm:py-12 md:border-t-0">
            <div>
              <p className="kicker text-cream/70">
                For venues and roasters
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
                Put cold brew on tap.
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/85">
                Tell us about your venue and we&apos;ll arrange a demo or a
                trial keg.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={BOOK_DEMO_MAILTO} className="btn-cream">
                Book a demo
              </a>
              <a href={ENQUIRY_MAILTO} className="link-under text-cream">
                {CONTACT_EMAIL}
              </a>
              <Link href="/contact" className="link-under text-cream">
                Online enquiry form
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
