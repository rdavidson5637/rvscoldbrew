import Image from "next/image";
import Link from "next/link";
import MapEmbed from "@/components/MapEmbed";
import {
  IMAGES,
  LOCATION,
  OPENING_HOURS,
  PRODUCT_COPY,
  SPOTIFY_PLAYLIST_ID,
} from "@/lib/brand";

const featureCards = [
  {
    image: IMAGES.coldBrewCan,
    label: "Customise",
    title: "Build Your Can",
    description:
      "Pick your base, milk, and flavour — we seal it fresh into a can for counter pickup.",
    href: "/builder",
    cta: "Heck Yeah — Let's Build",
    variant: "teal" as const,
  },
  {
    image: IMAGES.coldBrewPour,
    label: "Grab & Go",
    title: "Shop the Fridge",
    description:
      "Cans, bundles, and concentrate — shipping and local pickup coming online soon.",
    href: "/shop",
    cta: "Shop the Fridge",
    variant: "white" as const,
  },
  {
    image: IMAGES.beans,
    label: "Behind the Brew",
    title: "Our Process",
    description:
      "24 hours cold-steeped for smoothness. See why cold brew beats the bitterness.",
    href: "/process",
    cta: "See the Process",
    variant: "white" as const,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-7.75rem)] flex-col justify-center overflow-hidden bg-[#0c343d] text-[#fff2cc]">
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full border border-[#fff2cc]/10 bg-[#fff2cc]/5 animate-float"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-12 h-48 w-48 rounded-full bg-[#fff2cc]/5 animate-float delay-300"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-[#fff2cc]/80 sm:text-sm">
              {LOCATION.name} · Belfast
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] animate-fade-up delay-100 sm:text-6xl lg:text-7xl xl:text-8xl">
              Smooth Craft Cold Brew &amp; Premium Matcha. Born in Belfast.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#fff2cc]/85 animate-fade-up delay-200 sm:text-lg">
              Espresso-strength concentrate brewed in-house — the base for every
              premium hot and cold drink we pour. Plus single cultivar Okumidori
              matcha for a smooth, joyful lift.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/builder?quick=1" className="btn-cream normal-case">
                Quick Order
              </Link>
              <Link href="/builder" className="btn border-2 border-[#fff2cc] bg-transparent text-[#fff2cc] hover:bg-[#fff2cc] hover:text-[#0c343d]">
                Build Your Can
              </Link>
              <Link
                href="/shop"
                className="btn border-2 border-[#fff2cc]/60 bg-transparent text-[#fff2cc] hover:border-[#fff2cc] hover:bg-[#fff2cc]/10"
              >
                Shop the Fridge
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] animate-fade-up delay-200 overflow-hidden rounded-2xl shadow-2xl sm:aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src={IMAGES.hero}
              alt="Layered cold brew drink with rich concentrate and milk"
              fill
              className="animate-ken-burns object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c343d]/50 via-transparent to-[#0c343d]/10" />
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 md:gap-8">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className={`flex flex-col overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                card.variant === "teal"
                  ? "bg-[#0c343d] text-[#fff2cc]"
                  : "bg-white text-[#141514]"
              }`}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.15em] ${
                    card.variant === "teal"
                      ? "text-[#fff2cc]/70"
                      : "text-[#0c343d]"
                  }`}
                >
                  {card.label}
                </p>
                <h2 className="mt-2 font-display text-4xl leading-none">
                  {card.title}
                </h2>
                <p
                  className={`mt-4 flex-1 text-sm leading-relaxed ${
                    card.variant === "teal"
                      ? "text-[#fff2cc]/85"
                      : "text-[#141514]/75"
                  }`}
                >
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className={
                    card.variant === "teal"
                      ? "btn-cream mt-8 w-fit normal-case"
                      : "btn-primary mt-8 w-fit normal-case"
                  }
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Caffeine strip */}
      <section className="bg-[#141514] px-4 py-20 text-[#fff2cc] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
            All The Caffeine. Zero Bitterness.
          </h2>
          <p className="mt-4 text-sm text-[#fff2cc]/70 sm:text-base">
            {PRODUCT_COPY}
          </p>
          <Link
            href="/process"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#fff2cc] underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
          >
            Heck yeah — show me how →
          </Link>
        </div>
      </section>

      {/* Matcha */}
      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c343d]">
              Premium Matcha
            </p>
            <h2 className="mt-3 font-display text-5xl leading-tight text-[#141514] sm:text-6xl">
              Okumidori Matcha
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#141514]/80">
              Single cultivar ceremonial matcha from Uji — vivid green, naturally
              sweet, and clean enough to drink straight. Hot whisked lattes or iced
              over our concentrate.
            </p>
            <Link
              href="/shop"
              className="btn-primary mt-8 inline-flex normal-case"
            >
              Heck Yeah — Try Matcha
            </Link>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={IMAGES.matcha}
              alt="Vibrant green matcha being whisked"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Store info + map + Spotify */}
      <section className="bg-[#0c343d] px-4 py-20 text-[#fff2cc] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <article className="rounded-2xl border border-[#fff2cc]/15 bg-[#fff2cc]/5 p-8 backdrop-blur-sm">
              <span className="text-3xl" aria-hidden>
                📍
              </span>
              <h3 className="mt-4 font-display text-3xl">Location</h3>
              <div className="mt-4 space-y-1 text-sm leading-relaxed text-[#fff2cc]/85">
                <p>{LOCATION.name}</p>
                <p>{LOCATION.detail}</p>
                <p>{LOCATION.city}</p>
              </div>
              <a
                href={LOCATION.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold underline-offset-2 hover:underline"
              >
                Get directions →
              </a>
            </article>

            <article className="rounded-2xl border border-[#fff2cc]/15 bg-[#fff2cc]/5 p-8 backdrop-blur-sm">
              <span className="text-3xl" aria-hidden>
                🕐
              </span>
              <h3 className="mt-4 font-display text-3xl">Opening Hours</h3>
              <div className="mt-4 space-y-1 text-sm leading-relaxed text-[#fff2cc]/85">
                {OPENING_HOURS.map((row) => (
                  <p key={row.days}>
                    {row.days} · {row.hours}
                  </p>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-8">
            <MapEmbed />
          </div>

          <div className="mt-10 rounded-2xl border border-[#fff2cc]/15 bg-[#fff2cc]/5 p-6 sm:p-8">
            <div className="mb-6 text-center sm:text-left">
              <h3 className="font-display text-3xl">Shop Vibes</h3>
              <p className="mt-2 text-sm text-[#fff2cc]/80">
                Listen to the shop vibe right now — the same upbeat playlist
                spinning in-store.
              </p>
            </div>
            <iframe
              title="RV's Cold Brew in-store Spotify playlist"
              src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#fff2cc] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-5xl leading-tight text-[#141514] sm:text-6xl lg:text-7xl">
            Your Daily Upgrade Awaits.
          </h2>
          <Link
            href="/builder?quick=1"
            className="btn-primary mt-10 inline-flex normal-case"
          >
            Heck Yeah. Build My Drink.
          </Link>
        </div>
      </section>
    </>
  );
}
