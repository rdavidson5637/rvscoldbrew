import Image from "next/image";
import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import MapEmbed from "@/components/MapEmbed";
import Marquee from "@/components/Marquee";
import MenuItemRow from "@/components/MenuItemRow";
import OpenStatus from "@/components/OpenStatus";
import Sticker from "@/components/Sticker";
import { IMAGES, LOCATION, OPENING_HOURS, VIDEOS } from "@/lib/brand";
import { getMenu, type CatalogMenuItem } from "@/lib/catalog";

export const revalidate = 300;

const TEASER_SLUGS = [
  "cold-brew",
  "iced-latte",
  "iced-matcha-latte",
  "cold-brew-can",
  "flat-white",
  "butter-croissant",
] as const;

function pickTeaser(items: CatalogMenuItem[]): CatalogMenuItem[] {
  const bySlug = new Map<string, CatalogMenuItem>();
  for (const item of items) {
    if (item.slug && !bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }

  const preferred = TEASER_SLUGS.flatMap((slug) => {
    const item = bySlug.get(slug);
    return item ? [item] : [];
  });
  const priced = preferred.filter(
    (item) => item.priceGBP != null && Number.isFinite(item.priceGBP),
  );

  if (priced.length >= 4) return priced.slice(0, 6);
  if (preferred.length >= 4) return preferred.slice(0, 6);

  return items
    .filter((item) => item.priceGBP != null && Number.isFinite(item.priceGBP))
    .slice(0, 6);
}

const STEPS = [
  {
    title: "The blend",
    body: "Beans picked and blended for one job: tasting smooth once they're steeped cold.",
  },
  {
    title: "The steep",
    body: "24 hours in cold water. No heat, so the bitterness and acidity stay behind.",
  },
  {
    title: "The pour",
    body: "What's left is CoreBrew, an espresso-strength base that goes into every coffee we make.",
  },
];

export default async function Home() {
  const menu = await getMenu();
  const teaser = pickTeaser(menu.categories.flatMap((category) => category.items));
  const priced = teaser.some((i) => i.priceGBP != null && Number.isFinite(i.priceGBP));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-center md:gap-6 md:pb-24 lg:pt-20">
          <div>
            {/* Each line stays whole: sized so the longest line fits the column at every width */}
            <h1 className="font-display text-[clamp(2.75rem,14vw,4.5rem)] leading-[0.86] md:text-[clamp(3.5rem,7.6vw,6.4rem)]">
              <span className="rise block whitespace-nowrap">Smooth cold brew.</span>
              <span className="rise block whitespace-nowrap delay-100">Premium matcha.</span>
              <span className="rise block whitespace-nowrap text-cream/55 delay-200">
                Born in Belfast.
              </span>
            </h1>
            <p className="rise mt-7 max-w-md text-lg leading-relaxed text-cream/85 delay-300">
              All the caffeine, none of the bitterness. Order ahead and collect at{" "}
              {LOCATION.unit}, {LOCATION.name}, near Grand Central Station.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3 delay-400">
              <Link href="/menu" className="btn-cream">
                Order ahead
              </Link>
              <Link href="/builder" className="btn-ghost-cream">
                Find your drink
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[26rem] items-end justify-center md:max-w-none">
            <div
              className="rise-frame relative z-0 -mr-10 mb-10 w-[42%] overflow-hidden rounded-[1.75rem] border-[5px] border-cream shadow-2xl shadow-black/30 [--tilt:-5deg] delay-300"
            >
              <div className="aspect-[9/16]">
                <AutoVideo
                  src={VIDEOS.matchaPour.src}
                  poster={VIDEOS.matchaPour.poster}
                  label="Matcha being poured over ice"
                  eager
                />
              </div>
            </div>
            <div
              className="rise-frame relative z-10 w-[58%] overflow-hidden rounded-[2rem] border-[6px] border-cream shadow-2xl shadow-black/40 [--tilt:3deg] delay-100"
            >
              <div className="aspect-[9/16]">
                <AutoVideo
                  src={VIDEOS.milkPour.src}
                  poster={VIDEOS.milkPour.poster}
                  label="Oat milk poured into an RV's iced cold brew"
                  eager
                />
              </div>
            </div>
            <Sticker
              ring="Cold steeped • Zero bitterness • Brewed in Belfast • "
              centre={["24", "hours"]}
              className="tilt absolute -top-6 right-0 z-20 w-28 drop-shadow-xl [--tilt:12deg] sm:w-32 md:-right-2 lg:w-36"
            />
          </div>
        </div>
      </section>

      <Marquee
        tone="cream"
        items={[
          "Cold steeped for 24 hours",
          "Zero bitterness",
          "Okumidori matcha",
          "Brewed in Belfast",
          "Order ahead, collect at Unit 11",
        ]}
      />

      {/* Two drinks */}
      <section className="grid md:grid-cols-2">
        <article className="flex flex-col bg-ink text-cream">
          <div className="relative h-[26rem] overflow-hidden sm:h-[32rem]">
            <AutoVideo
              src={VIDEOS.concentratePour.src}
              poster={VIDEOS.concentratePour.poster}
              label="CoreBrew cold brew concentrate being poured"
            />
          </div>
          <div className="flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-14 lg:py-14" data-reveal>
            <h2 className="font-display text-6xl leading-none sm:text-7xl">Cold brew</h2>
            <p className="mt-2 text-sm font-extrabold text-cream/60">CoreBrew Coffee Base</p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/85">
              Steeped cold for 24 hours into an espresso-strength base. It goes into
              every coffee on the menu, iced or hot, without the bitter edge.
            </p>
            <Link href="/menu#category-iced-coffee" className="link-under mt-8 w-fit text-cream">
              See the coffees
            </Link>
          </div>
        </article>

        <article className="flex flex-col bg-matcha text-matcha-ink">
          <div className="relative h-[26rem] overflow-hidden sm:h-[32rem]">
            <AutoVideo
              src={VIDEOS.matchaWhisk.src}
              poster={VIDEOS.matchaWhisk.poster}
              label="Matcha being whisked by hand"
            />
          </div>
          <div
            className="flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <h2 className="font-display text-6xl leading-none sm:text-7xl">Matcha</h2>
            <p className="mt-2 text-sm font-extrabold text-matcha-ink/70">Single cultivar Okumidori</p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-matcha-ink/90">
              Ceremonial matcha from Uji, whisked fresh for every cup and naturally
              sweet. Have it plain, or with strawberry, mango, pistachio and more.
            </p>
            <Link href="/menu#category-iced-matcha" className="link-under mt-8 w-fit">
              See the matcha
            </Link>
          </div>
        </article>
      </section>

      {/* Menu board */}
      <section className="overflow-hidden bg-cream text-teal">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-28">
          <div className="relative order-2 mx-auto w-full max-w-[18rem] sm:max-w-sm lg:order-1 lg:max-w-none" data-reveal>
            <div className="tilt overflow-hidden rounded-[2rem] border-[6px] border-teal shadow-2xl shadow-black/20 [--tilt:-3deg]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={IMAGES.cansFridge}
                  alt="Cans of RV's Cold Brew lined up in the fridge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 384px, 460px"
                />
              </div>
            </div>
            <Sticker
              ring="Cold brew cans • Grab one for later • Smooth • "
              centre={["Cans", "to go"]}
              className="tilt absolute -bottom-8 -right-4 w-28 drop-shadow-xl [--tilt:-10deg] sm:w-32 lg:-right-8"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div data-reveal>
              <h2 className="font-display text-6xl leading-none sm:text-7xl lg:text-8xl">
                On the menu
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
                {priced
                  ? "A few to start with. Add them here and pay online, or see everything on the full menu."
                  : "A few to start with. Prices are at the till, and there's plenty more on the full menu."}
              </p>
            </div>

            <ul
              className="mt-10 divide-y-2 divide-dotted divide-teal/15 border-y-2 border-teal"
              data-reveal
            >
              {teaser.map((item) => (
                <MenuItemRow key={item.squareId} item={item} />
              ))}
            </ul>

            <Link href="/menu" className="btn-primary mt-10">
              See the full menu
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <h2
            className="max-w-4xl font-display text-6xl leading-[0.9] sm:text-7xl lg:text-8xl"
            data-reveal
          >
            24 hours. Cold water. Nothing else.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="border-t-2 border-cream/25 pt-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              >
                <p className="font-display text-7xl leading-none text-cream/30">0{i + 1}</p>
                <h3 className="mt-4 font-display text-4xl leading-none">{step.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-cream/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/process" className="link-under mt-12 inline-block text-cream">
            How we brew it
          </Link>
        </div>
      </section>

      {/* Belfast */}
      <section className="overflow-hidden bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:py-28">
          <div className="order-2 grid grid-cols-2 gap-4 md:order-1" data-reveal>
            <div className="tilt overflow-hidden rounded-[1.75rem] [--tilt:-2deg]">
              <div className="aspect-[9/16]">
                <AutoVideo
                  src={VIDEOS.cityHall.src}
                  poster={VIDEOS.cityHall.poster}
                  label="An RV's cold brew held up in front of Belfast City Hall grounds"
                />
              </div>
            </div>
            <div className="tilt mt-12 overflow-hidden rounded-[1.75rem] [--tilt:2deg]">
              <div className="aspect-[9/16]">
                <AutoVideo
                  src={VIDEOS.matchaStreet.src}
                  poster={VIDEOS.matchaStreet.poster}
                  label="An RV's iced matcha held up in Belfast city centre"
                />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2" data-reveal>
            <h2 className="font-display text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
              Brewed in Belfast.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/80">
              Independent, and made at Unit 11 near Grand Central Station.
              Grab one on the way to the train, or take it for a walk round town.
            </p>
            <div className="mt-10 rounded-[2rem] border-2 border-cream/15 p-6 sm:p-8">
              <h3 className="font-display text-4xl leading-none">Every cup counts</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-cream/75">
                Join RV&apos;s Rewards free with your mobile number. Points build up
                online and at the till, on one balance.
              </p>
              <Link href="/rewards" className="btn-cream mt-6">
                Join rewards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="bg-cream text-teal">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28">
          <div data-reveal>
            <h2 className="font-display text-6xl leading-none sm:text-7xl lg:text-8xl">
              Come find us
            </h2>
            <OpenStatus className="mt-5 text-base font-extrabold text-teal" />
            <address className="mt-8 text-xl not-italic leading-relaxed text-ink/85">
              {LOCATION.unit}, {LOCATION.name}
              <br />
              {LOCATION.detail}
              <br />
              {LOCATION.city}
            </address>
            <dl className="mt-8 max-w-sm border-t-2 border-teal">
              {OPENING_HOURS.map((row) => (
                <div
                  key={row.days}
                  className="flex justify-between gap-6 border-b-2 border-dotted border-teal/20 py-3 text-lg"
                >
                  <dt className="font-extrabold">{row.days}</dt>
                  <dd className="tabular-nums text-ink/80">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <a
              href={LOCATION.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-10"
            >
              Get directions
            </a>
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
