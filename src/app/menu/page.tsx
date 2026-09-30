import type { Metadata } from "next";
import Link from "next/link";
import MenuCategoryNav from "@/components/MenuCategoryNav";
import MenuItemCard from "@/components/MenuItemCard";
import { getMenu } from "@/lib/catalog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full RV's Cold Brew menu — iced coffee, matcha, hot drinks, food and bakery. Order for collection at Unit 11, Great Northern Mall, Belfast.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | RV's Cold Brew",
    description:
      "Iced coffee, matcha, hot drinks, food and bakery — order for collection at Unit 11.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | RV's Cold Brew",
    description:
      "Iced coffee, matcha, hot drinks, food and bakery — order for collection at Unit 11.",
  },
};

export default async function MenuPage() {
  const menu = await getMenu();
  const categories = menu.categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <>
      <header className="bg-[#0c343d] px-4 py-12 text-[#fff2cc] sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl">
            The Menu
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#fff2cc]/85 sm:text-base">
            Built on CoreBrew Coffee Base and ceremonial Okumidori matcha.
            Collection only at Unit 11, Great Northern Mall.
          </p>
          <Link
            href="/order"
            className="btn-cream mt-6 inline-flex normal-case"
          >
            Order for Collection
          </Link>
        </div>
      </header>

      <div className="bg-[#141514] px-4 py-3 text-center text-sm text-[#fff2cc]/90 sm:px-6">
        <Link href="/rewards" className="underline-offset-2 hover:underline">
          Earn points with every order →
        </Link>
      </div>

      <MenuCategoryNav categories={categories} />

      <div className="bg-[#fff2cc] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl space-y-16">
          {menu.categories.map((category) => (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-40"
            >
              <h2 className="font-display text-4xl text-[#141514] sm:text-5xl">
                {category.name}
              </h2>
              {category.blurb && (
                <p className="mt-2 max-w-xl text-sm text-[#141514]/70">
                  {category.blurb}
                </p>
              )}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <MenuItemCard key={item.squareId} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-7xl text-center text-xs text-[#141514]/50">
          Prices and availability come straight from our till.
        </p>
      </div>
    </>
  );
}
