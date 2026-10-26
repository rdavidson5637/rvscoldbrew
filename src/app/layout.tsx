import type { Metadata } from "next";
import { Bebas_Neue, Nunito } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import EmailModal from "@/components/EmailModal";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RevealOnScroll from "@/components/RevealOnScroll";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/brand";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RV's Cold Brew | Great Northern Mall, Belfast",
    template: "%s | RV's Cold Brew",
  },
  description:
    "CoreBrew Coffee Base, nitro cold brew, and Okumidori matcha at Unit 11, Great Northern Mall, Belfast BT2 7GN. Order for collection or put cold brew on tap at your venue.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png" },
    ],
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RV's Cold Brew",
    description:
      "Smooth craft cold brew & premium matcha. Born in Belfast. Collection at Unit 11.",
    locale: "en_GB",
    type: "website",
    siteName: "RV's Cold Brew",
  },
  twitter: {
    card: "summary_large_image",
    title: "RV's Cold Brew",
    description:
      "Smooth craft cold brew & premium matcha. Born in Belfast.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${bebasNeue.variable} ${nunito.variable}`}>
      <head>
        <link rel="preconnect" href="https://items-images-production.s3.us-west-2.amazonaws.com" />
        <link rel="preconnect" href="https://square-cdn.com" />
        <link rel="dns-prefetch" href="https://items-images-production.s3.us-west-2.amazonaws.com" />
        <link rel="dns-prefetch" href="https://square-cdn.com" />
      </head>
      <body className={nunito.className}>
        <CartProvider>
          <JsonLd />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:font-bold focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-[#0c343d] focus:px-4 focus:py-2 focus:text-[#fff2cc]"
          >
            Skip to content
          </a>
          <SiteHeader />
          <RevealOnScroll />
          <EmailModal />

          <div className="flex min-h-screen flex-col pt-[var(--header-h)]">
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
