"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Fades [data-reveal] blocks up as they scroll into view.
 *
 * Mounted once in the root layout. Anything already on screen is marked
 * revealed before the hiding rule switches on, so nothing above the fold
 * flickers. A MutationObserver picks up content from client-side navigation
 * and streamed sections. Without JS, or with reduced motion, content is
 * simply visible.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window) || !("MutationObserver" in window)) {
      return;
    }

    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const track = (scope: ParentNode) => {
      const fold = window.innerHeight * 0.92;
      scope.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.getBoundingClientRect().top < fold) reveal(el);
        else io.observe(el);
      });
    };

    track(document);
    document.documentElement.classList.add("reveal-ready");

    // Mutation callbacks run before the next paint, so new content never flashes hidden
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(SELECTOR)) {
            const fold = window.innerHeight * 0.92;
            if (node.getBoundingClientRect().top < fold) reveal(node);
            else io.observe(node);
          }
          track(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
