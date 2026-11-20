import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Book a demo or enquire about cold brew on tap, white-label kegging for roasters, wholesale and events. Email info@rvscoldbrew.co.uk or use the form. Unit 11, Great Northern Mall, Belfast BT2 7GN.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Enquiries | RV's Cold Brew",
    description:
      "Book a demo or enquire about cold brew on tap, white-label kegging for roasters, wholesale and events. Email info@rvscoldbrew.co.uk.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Enquiries | RV's Cold Brew",
    description:
      "Book a demo or enquire about cold brew on tap, white-label kegging for roasters, wholesale and events. Email info@rvscoldbrew.co.uk.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
