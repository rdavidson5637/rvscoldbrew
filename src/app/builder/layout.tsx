import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Drink",
  description:
    "Hot or iced, coffee or matcha — find the matching drink on the RV's Cold Brew menu for collection at Unit 11.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "Find Your Drink | RV's Cold Brew",
    description:
      "Hot or iced, coffee or matcha — find the matching drink on the RV's Cold Brew menu for collection at Unit 11.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Drink | RV's Cold Brew",
    description:
      "Hot or iced, coffee or matcha — find the matching drink on the RV's Cold Brew menu for collection at Unit 11.",
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
