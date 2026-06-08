import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Your Own Drink",
  description:
    "Build your custom cold brew or Okumidori matcha drink. Pick your base, milk, flavour, and pickup time at Great Northern Mall, Belfast.",
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
