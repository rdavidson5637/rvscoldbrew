import Image from "next/image";
import Link from "next/link";
import { IMAGES, LOCATION, OPENING_HOURS } from "@/lib/brand";
import { getMenu, type CatalogMenuItem } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

export const revalidate = 300;

const TEASER_SLUGS = [
  "cold-brew",
  "cold-brew-can",
  "iced-latte",
  "iced-matcha-latte",
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

export default async function Home() {
  const menu = await getMenu();
  const teaser = pickTeaser(menu.categories.flatMap((category) => category.items));

  return (
    <>
      <section className="bg-[#fff2cc] text-[#0c343d]">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 md:py-16 lg:px-8 lg:py-24">
            <h1 className="font-display text-[3.25rem] leading-[0.86] sm:text-7xl md:text-6xl lg:text-8xl xl:text-[7.25rem]">
              Smooth Craft Cold Brew &amp; Premium Matcha. Born in Belfast.
            </h1>
            <Link href="/menu" className="btn-primary mt-10 w-fit normal-case">
              See the menu
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed sm:text-base">
              {LOCATION.unit}, {LOCATION.name}. {LOCATION.detail}. {LOCATION.city}.
            </p>
          </div>
          <div className="relative h-[78vw] min-h-[18rem] md:h-auto md:min-h-[32rem]">
            <Image
              src={IMAGES.cansFridge}
              alt="Cans of RV's Cold Brew in the fridge"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0c343d] text-[#fff2cc]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:py-32">
          <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            The Menu
          </h2>
          <ul className="mt-12 border-b border-[#fff2cc]/25 sm:mt-16">
            {teaser.map((item) => (
              <li
                key={item.squareId}
                className="flex items-baseline justify-between gap-6 border-t border-[#fff2cc]/25 py-5 sm:py-6"
              >
                <span className="font-display text-3xl leading-none sm:text-4xl">
                  {item.name}
                </span>
                <span className="shrink-0 text-base tabular-nums">
                  {item.priceGBP != null && Number.isFinite(item.priceGBP)
                    ? formatPrice(item.priceGBP)
                    : "Price at till"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#fff2cc] px-4 py-24 text-[#0c343d] sm:px-6 sm:py-32 lg:py-40">
        <p className="mx-auto max-w-6xl text-center font-display text-6xl leading-[0.88] sm:text-7xl lg:text-8xl xl:text-9xl">
          All The Caffeine. Zero Bitterness.
        </p>
      </section>

      <section className="bg-[#0c343d] text-[#fff2cc]">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[70vw] min-h-[16rem] md:h-auto md:min-h-[28rem]">
            <Image
              src={IMAGES.processSteep}
              alt="Cold brew poured over ice"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
            <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
              Our Process
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[#fff2cc]/90 sm:text-lg">
              24 hours cold-steeped for smoothness.
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#fff2cc]/90 sm:text-lg">
              See why cold brew beats the bitterness.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff2cc] text-[#0c343d]">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 sm:py-24 md:grid-cols-2 lg:gap-24 lg:px-8 lg:py-32">
          <div>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">
              Visit
            </h2>
            <address className="mt-8 space-y-1 text-lg not-italic leading-relaxed sm:text-xl">
              <p>
                {LOCATION.unit}, {LOCATION.name}
              </p>
              <p>{LOCATION.detail}</p>
              <p>{LOCATION.city}</p>
            </address>
            <a
              href={LOCATION.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-semibold underline underline-offset-4"
            >
              Get directions
            </a>
          </div>
          <div>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">
              Hours
            </h2>
            <ul className="mt-8 space-y-3 text-lg leading-relaxed sm:text-xl">
              {OPENING_HOURS.map((row) => (
                <li key={row.days} className="flex justify-between gap-6">
                  <span>{row.days}</span>
                  <span className="tabular-nums">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
