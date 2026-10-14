import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import Marquee from "@/components/Marquee";
import PageHeader from "@/components/PageHeader";
import Sticker from "@/components/Sticker";
import { IMAGES, VIDEOS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Three steps, twenty-four hours, one smooth result. See how RV's Cold Brew filters out bitterness through cold extraction.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Process | RV's Cold Brew",
    description:
      "Three steps, twenty-four hours, one smooth result. See how RV's Cold Brew filters out bitterness through cold extraction.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Process | RV's Cold Brew",
    description:
      "Three steps, twenty-four hours, one smooth result. See how RV's Cold Brew filters out bitterness through cold extraction.",
  },
};

const TIMELINE_STEPS = [
  {
    number: "01",
    image: IMAGES.processBlend,
    title: "The blend",
    subtitle: "Proprietary bean selection",
    description:
      "We source and blend beans for one goal: maximum smoothness once steeped cold.",
  },
  {
    number: "02",
    image: IMAGES.processSteep,
    title: "The steep",
    subtitle: "24 hours. Cold water. Nothing else.",
    description:
      "Slow cold extraction pulls out flavour without heat, stripping bitterness and acidity from every batch.",
  },
  {
    number: "03",
    image: IMAGES.processCan,
    title: "The pour",
    subtitle: "CoreBrew Coffee Base, ready to drink",
    description:
      "Our CoreBrew Coffee Base powers every hot and iced coffee on the menu. Smooth, never bitter.",
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
  "Bold flavour, even over ice",
  "Cold extraction preserves complexity",
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        title="Our process"
        intro={<p>Three steps and 24 hours, for coffee with none of the bitterness.</p>}
        aside={
          <Sticker
            ring="Cold steeped • Zero bitterness • Brewed in Belfast • "
            centre={["24", "hours"]}
            className="tilt w-40 [--tilt:10deg] lg:w-48"
          />
        }
      />

      <section className="bg-cream px-4 py-16 text-teal sm:px-6 lg:py-24">
        <ol className="mx-auto max-w-5xl space-y-16 lg:space-y-24">
          {TIMELINE_STEPS.map((step, i) => (
            <li
              key={step.number}
              className="grid items-center gap-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-14"
              data-reveal
            >
              <div
                className={`tilt relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-[1.75rem] border-[5px] border-teal md:w-full ${
                  i % 2 ? "[--tilt:2deg]" : "[--tilt:-2deg]"
                }`}
              >
                <Image src={step.image} alt="" fill className="object-cover" sizes="240px" />
              </div>
              <div>
                <p className="font-display text-7xl leading-none text-teal/25">{step.number}</p>
                <h2 className="mt-2 font-display text-6xl leading-none sm:text-7xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-lg font-extrabold">{step.subtitle}</p>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/75">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Marquee
        tone="teal"
        speed={32}
        items={["No heat", "No bitterness", "24 hours", "Cold water", "CoreBrew Coffee Base"]}
      />

      <section className="bg-ink px-4 py-16 text-cream sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-6xl leading-none sm:text-7xl" data-reveal>
            Hot vs cold
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2" data-reveal>
            <article className="rounded-[2rem] border-2 border-cream/15 p-8">
              <h3 className="font-display text-4xl leading-none text-cream/50">Hot brew</h3>
              <ul className="mt-6 space-y-3">
                {HOT_BREW_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-lg text-cream/55">
                    <span className="mt-0.5 shrink-0" aria-hidden>
                      ✕
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[2rem] bg-cream p-8 text-teal">
              <h3 className="font-display text-4xl leading-none">Cold brew</h3>
              <ul className="mt-6 space-y-3">
                {COLD_BREW_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-lg font-bold">
                    <span className="mt-0.5 shrink-0" aria-hidden>
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-matcha text-matcha-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:py-24">
          <div data-reveal>
            <h2 className="font-display text-6xl leading-none sm:text-7xl">Okumidori matcha</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed">
              Single cultivar ceremonial matcha from Uji. Whisked fresh, naturally
              sweet, and every bit as smooth as our cold brew.
            </p>
            <Link href="/menu#category-iced-matcha" className="link-under mt-8 inline-block">
              See the matcha
            </Link>
          </div>
          <div className="tilt mx-auto w-56 overflow-hidden rounded-[1.75rem] border-[5px] border-matcha-ink [--tilt:3deg] md:w-full">
            <div className="aspect-[9/16]">
              <AutoVideo
                src={VIDEOS.matchaWhisk.src}
                poster={VIDEOS.matchaWhisk.poster}
                label="Matcha being whisked by hand"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal px-4 py-16 text-cream sm:px-6 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="font-display text-6xl leading-[0.9] sm:text-7xl">
            Taste the difference.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="btn-cream">
              Order ahead
            </Link>
            <Link href="/order" className="btn-ghost-cream">
              How collection works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
