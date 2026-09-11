"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartButton } from "@/components/cart/CartProvider";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/rewards", label: "Rewards" },
  { href: "/process", label: "Our Process" },
  { href: "/contact", label: "Contact" },
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

  const linkClass = (href: string) =>
    `text-sm font-medium transition-opacity hover:opacity-80 ${
      pathname === href || pathname.startsWith(`${href}/`)
        ? "text-cream underline decoration-cream/50 underline-offset-4"
        : "text-cream/90"
    }`;

  return (
    <nav className="bg-[#141514] text-cream" aria-label="Main navigation">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label="RV's Cold Brew home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="RV's Cold Brew"
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
          />
          <span className="font-display text-2xl tracking-wide text-cream sm:text-3xl">
            RV&apos;s Cold Brew
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CartButton />
          <Link href="/order" className="btn-cream normal-case">
            Order for Collection
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-md p-2 text-cream transition-colors hover:bg-white/10"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 top-[7.75rem] z-40 flex flex-col bg-[#141514] transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex min-h-12 items-center font-display text-4xl tracking-wide transition-opacity hover:opacity-80 ${
                  pathname === link.href ? "text-cream" : "text-cream/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-cream/10 p-4">
          <Link href="/order" className="btn-cream w-full normal-case">
            Order for Collection
          </Link>
        </div>
      </div>
    </nav>
  );
}
