import type { Metadata } from "next";
import { Bebas_Neue, Nunito } from "next/font/google";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
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
    "Espresso-strength cold brew concentrate and Okumidori matcha. Born in Belfast — build your can or shop the fridge.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "RV's Cold Brew",
    description:
      "Smooth craft cold brew & premium matcha. Born in Belfast.",
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
      <body className={nunito.className}>
        <JsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-[#0c343d] focus:px-4 focus:py-2 focus:text-[#fff2cc]"
        >
          Skip to content
        </a>
        <SiteHeader />

        <div className="flex min-h-screen flex-col pt-[7.75rem]">
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
