"use client";

import Script from "next/script";
import { FLIPDISH, LOCATION } from "@/lib/brand";

/**
 * Flipdish web ordering embed. Renders the Flipdish menu + checkout inline.
 * Until NEXT_PUBLIC_FLIPDISH_APP_ID is set (see lib/brand.ts) it shows a
 * friendly placeholder instead of an empty box.
 */
export default function FlipdishOrder() {
  if (!FLIPDISH.APP_ID) {
    return (
      <div className="rounded-lg border border-cream/15 bg-[#141514] p-8 text-center text-cream/80">
        <p className="font-display text-2xl tracking-wide text-cream">
          Online ordering is on its way
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          We&apos;re setting up Flipdish ordering. In the meantime, pop in and
          see us at {LOCATION.full}.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        id="flipdish-menu"
        data-restaurant={FLIPDISH.APP_ID}
        data-initial-screen="menu"
        data-theme="dark"
      />
      <Script src={FLIPDISH.EMBED_SCRIPT} strategy="afterInteractive" />
    </>
  );
}
