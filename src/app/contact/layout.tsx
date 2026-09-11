import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Get in touch with RV's Cold Brew for wholesale, events, corporate orders, press enquiries, or general questions. We typically respond within 48 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
