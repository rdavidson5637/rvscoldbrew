import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Get in touch with RV's Cold Brew for wholesale, events, corporate orders, press enquiries, or general questions. We typically respond within 48 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Enquiries | RV's Cold Brew",
    description:
      "Get in touch with RV's Cold Brew for wholesale, events, corporate orders, press enquiries, or general questions. We typically respond within 48 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Enquiries | RV's Cold Brew",
    description:
      "Get in touch with RV's Cold Brew for wholesale, events, corporate orders, press enquiries, or general questions. We typically respond within 48 hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
