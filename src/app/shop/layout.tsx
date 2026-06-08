import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop the Fridge",
  description:
    "Cold brew cans, bundles, espresso-strength concentrate, and Okumidori matcha. Local pickup and shipping across NI — brewed in Belfast.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
