"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuCategoryId } from "@/lib/menu-data";

type Category = {
  id: MenuCategoryId | string;
  name: string;
};

export default function MenuCategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  // Active pill = the last section whose top has passed a line a third of the way down.
  // Scroll-based rather than IntersectionObserver so it also resets when you scroll back to the top.
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`category-${c.id}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.33;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
      }
      setActive(current.id.replace("category-", ""));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [categories]);

  // Keep the active pill in view on narrow screens
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !el) return;
    list.scrollTo({
      left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[var(--header-h)] z-30 border-b-2 border-teal/10 bg-cream/95 backdrop-blur-sm"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide sm:px-6"
      >
        {categories.map((cat) => (
          <li key={cat.id} className="shrink-0">
            <a
              href={`#category-${cat.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`category-${cat.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActive(cat.id);
              }}
              aria-current={active === cat.id ? "true" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full border-2 px-4 text-sm font-extrabold transition-colors ${
                active === cat.id
                  ? "border-teal bg-teal text-cream"
                  : "border-teal/15 text-teal hover:border-teal/40"
              }`}
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
