import type { Metadata } from "next";
import Link from "next/link";
import MenuCategoryNav from "@/components/MenuCategoryNav";
import MenuItemRow from "@/components/MenuItemRow";
import PageHeader from "@/components/PageHeader";
import AutoVideo from "@/components/AutoVideo";
import Sticker from "@/components/Sticker";
import { VIDEOS } from "@/lib/brand";
import { getMenu } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full RV's Cold Brew menu: iced coffee, matcha, hot drinks, food and bakery. Order for collection at Unit 11, Great Northern Mall, Belfast.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | RV's Cold Brew",
    description:
      "Iced coffee, matcha, hot drinks, food and bakery. Order for collection at Unit 11.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | RV's Cold Brew",
    description:
      "Iced coffee, matcha, hot drinks, food and bakery. Order for collection at Unit 11.",
  },
};

const isMatcha = (id: string) => id.includes("matcha");

/** A real clip beside the bigger drink sections. Only where the footage actually shows that drink. */
const CATEGORY_MEDIA: Record<string, { video: { src: string; poster: string }; label: string; tilt: string }> = {
  "iced-coffee": {
    video: VIDEOS.cityHall,
    label: "An RV's iced cold brew held up at Belfast City Hall",
    tilt: "[--tilt:4deg]",
  },
  "iced-matcha": {
    video: VIDEOS.matchaStreet,
    label: "An RV's iced matcha held up in Belfast city centre",
    tilt: "[--tilt:-4deg]",
  },
  "hot-matcha": {
    video: VIDEOS.matchaWhisk,
    label: "Matcha being whisked by hand",
    tilt: "[--tilt:3deg]",
  },
};

export default async function MenuPage() {
  const menu = await getMenu();
  const categories = menu.categories.map((c) => ({ id: c.id, name: c.name }));
  // When Square isn't returning prices, say so once instead of on every line
  const priced = menu.categories.some((c) =>
    c.items.some((i) => i.priceGBP != null && Number.isFinite(i.priceGBP)),
  );

  return (
    <>
      <PageHeader
        title="The menu"
        intro={
          <p>
            Built on CoreBrew Coffee Base and ceremonial Okumidori matcha.{" "}
            {priced
              ? "Add what you want, pay online, and collect at Unit 11."
              : "Prices are at the till in Unit 11."}
          </p>
        }
        actions={
          <Link href="/order" className="btn-ghost-cream">
            How collection works
          </Link>
        }
        aside={
          <Sticker
            ring="Order ahead • Pay online • Collect at Unit 11 • "
            centre={["Unit", "11"]}
            className="tilt w-40 [--tilt:-10deg] lg:w-48"
          />
        }
      />

      <MenuCategoryNav categories={categories} />

      {menu.categories.map((category) => {
        const matcha = isMatcha(category.id);
        const media = CATEGORY_MEDIA[category.id];
        const half = Math.ceil(category.items.length / 2);
        const columns =
          category.items.length > 4
            ? [category.items.slice(0, half), category.items.slice(half)]
            : [category.items];

        return (
          <section
            key={category.id}
            id={`category-${category.id}`}
            className={`scroll-mt-[calc(var(--header-h)+4.5rem)] ${
              matcha ? "bg-matcha text-matcha-ink" : "bg-cream text-teal"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
              <div className="flex items-end justify-between gap-6" data-reveal>
                <div className="min-w-0">
                  <h2 className="font-display text-6xl leading-none sm:text-7xl">
                    {category.name}
                  </h2>
                  {category.blurb && (
                    <p className="mt-3 max-w-md text-base leading-relaxed opacity-75">
                      {category.blurb}
                    </p>
                  )}
                </div>
                {media && (
                  <div
                    className={`tilt relative z-10 -mb-6 w-24 shrink-0 overflow-hidden rounded-[1.25rem] border-4 shadow-xl shadow-black/20 sm:w-28 lg:w-36 ${
                      matcha ? "border-cream" : "border-teal"
                    } ${media.tilt}`}
                  >
                    <div className="aspect-[4/5]">
                      <AutoVideo
                        src={media.video.src}
                        poster={media.video.poster}
                        label={media.label}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div
                data-reveal
                className={`mt-8 grid gap-x-16 ${columns.length > 1 ? "md:grid-cols-2" : "md:max-w-[calc(50%-2rem)]"}`}
              >
                {columns.map((col, i) => (
                  <ul
                    key={i}
                    className={`divide-y-2 divide-dotted border-t-2 ${
                      matcha
                        ? "divide-matcha-ink/15 border-matcha-ink"
                        : "divide-teal/15 border-teal"
                    } ${i > 0 ? "max-md:border-t-0" : ""}`}
                  >
                    {col.map((item) => (
                      <MenuItemRow key={item.squareId} item={item} />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <div className="bg-ink px-4 py-12 text-center text-cream sm:px-6">
        <p className="font-display text-4xl leading-none">Every cup counts</p>
        <p className="mx-auto mt-3 max-w-md text-cream/75">
          Join RV&apos;s Rewards free with your mobile number. Points build up
          online and at the till, on one balance.
        </p>
        <Link href="/rewards" className="btn-cream mt-6">
          Join rewards
        </Link>
      </div>
    </>
  );
}
