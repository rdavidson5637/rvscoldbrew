import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import MapEmbed from "@/components/MapEmbed";
import {
  IMAGES,
  LOCATION,
  OPENING_HOURS,
  PRODUCT_COPY,
  SPOTIFY_PLAYLIST_ID,
  VIDEOS,
} from "@/lib/brand";

const featureCards = [
  {
    image: IMAGES.cansFridge,
    label: "Browse",
    title: "See the Menu",
    description:
      "Iced coffee, matcha, hot drinks, food and bakery — built on CoreBrew Coffee Base.",
    href: "/menu",
    cta: "See the Menu",
    variant: "teal" as const,
  },
  {
    image: IMAGES.concentratePour,
    label: "Collect",
    title: "Order for Collection",
    description:
      "Order online and pick up at Unit 11, Great Northern Mall — near Grand Central Station.",
    href: "/order",
    cta: "Order for Collection",
    variant: "white" as const,
  },
  {
    image: IMAGES.matchaPour,
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
      <section className="relative flex min-h-[calc(100svh-7.75rem)] flex-col justify-end overflow-hidden bg-[#0c343d] text-[#fff2cc]">
        <div className="absolute inset-0">
          <HeroVideo
            src={VIDEOS.milkPour.src}
            poster={VIDEOS.milkPour.poster}
            alt="Cold brew milk pour"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0c343d] via-[#0c343d]/70 to-[#0c343d]/30"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] animate-fade-up sm:text-6xl lg:text-7xl xl:text-8xl">
            Smooth Craft Cold Brew &amp; Premium Matcha. Born in Belfast.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#fff2cc]/85 animate-fade-up delay-100 sm:text-lg">
            Espresso-strength CoreBrew Coffee Base and ceremonial Okumidori
            matcha — poured fresh for collection at Unit 11.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-200">
            <Link href="/order" className="btn-cream normal-case">
              Order for Collection
            </Link>
            <Link
              href="/menu"
              className="btn border-2 border-[#fff2cc] bg-transparent text-[#fff2cc] hover:bg-[#fff2cc] hover:text-[#0c343d] normal-case"
            >
              See the Menu
            </Link>
          </div>
        </div>
      </section>

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
            See Our Process →
          </Link>
        </div>
      </section>

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
              sweet, and clean enough to drink straight. Hot whisked or iced.
            </p>
            <Link href="/menu" className="btn-primary mt-8 inline-flex normal-case">
              See Matcha on the Menu
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

      <section className="bg-[#0c343d] px-4 py-20 text-[#fff2cc] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <article className="rounded-2xl border border-[#fff2cc]/15 bg-[#fff2cc]/5 p-8 backdrop-blur-sm">
              <h3 className="font-display text-3xl">Location</h3>
              <div className="mt-4 space-y-1 text-sm leading-relaxed text-[#fff2cc]/85">
                <p>
                  {LOCATION.unit}, {LOCATION.name}
                </p>
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
              <h3 className="font-display text-3xl">Opening Hours</h3>
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

      <section className="bg-[#fff2cc] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-5xl leading-tight text-[#141514] sm:text-6xl lg:text-7xl">
            Elevate Your Daily Routine.
          </h2>
          <Link href="/order" className="btn-primary mt-10 inline-flex normal-case">
            Order for Collection
          </Link>
        </div>
      </section>
    </>
  );
}
