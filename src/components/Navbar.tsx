"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartButton } from "@/components/cart/CartProvider";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/rewards", label: "Rewards" },
  { href: "/process", label: "Our Process" },
  { href: "/contact", label: "Contact" },
];

const mobileExtra = [
  { href: "/order", label: "How collection works" },
  { href: "/builder", label: "Find your drink" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="h-16 bg-[#141514] text-cream" aria-label="Main navigation">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="RV's Cold Brew home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="font-display text-[1.75rem] leading-none tracking-wide text-cream">
            RV&apos;s Cold Brew
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-[0.95rem] font-bold transition-colors ${
                    isActive(link.href)
                      ? "text-cream underline decoration-2 underline-offset-[10px]"
                      : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CartButton tone="dark" />
          <Link href="/menu" className="btn-cream min-h-11 px-5 py-2">
            Order ahead
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton tone="dark" />
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full p-2 text-cream transition-colors hover:bg-white/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col bg-[#141514] transition-[transform,visibility] duration-300 md:hidden ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <ul className="flex flex-1 flex-col overflow-y-auto px-4 pt-6">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-cream/10">
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex min-h-16 items-center font-display text-5xl leading-none tracking-wide ${
                  isActive(link.href) ? "text-cream" : "text-cream/80"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {mobileExtra.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-12 items-center text-base font-bold text-cream/70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <Link href="/menu" className="btn-cream w-full">
            Order ahead
          </Link>
        </div>
      </div>
    </nav>
  );
}
