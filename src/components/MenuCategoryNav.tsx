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
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(`category-${c.id}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id.replace("category-", ""));
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav
      ref={navRef}
      aria-label="Menu categories"
      className="sticky top-[7.75rem] z-30 border-b border-[#0c343d]/10 bg-[#fff2cc]/95 backdrop-blur-sm"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 scrollbar-hide sm:px-6 lg:px-8">
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
              className={`inline-flex min-h-12 items-center rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                active === cat.id
                  ? "bg-[#0c343d] text-[#fff2cc]"
                  : "bg-white/70 text-[#141514] hover:bg-[#0c343d]/10"
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
