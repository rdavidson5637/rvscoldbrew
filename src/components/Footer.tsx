import Link from "next/link";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

const footerNav = [
  { href: "/builder", label: "Build Your Can" },
  { href: "/shop", label: "Shop the Fridge" },
  { href: "/process", label: "Our Process" },
  { href: "/shop", label: "Order Now" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141514] text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <p className="font-display text-3xl tracking-wide">
              RV&apos;s Cold Brew
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">
              Espresso-strength cold brew concentrate and Okumidori matcha —
              proudly independent, brewed in Belfast.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl tracking-wide">Explore</h2>
            <ul className="mt-4 space-y-2">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl tracking-wide">Visit</h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-cream/80">
              <p>
                {LOCATION.name}
                <br />
                {LOCATION.detail}
                <br />
                {LOCATION.city}
              </p>
              <p>
                {OPENING_HOURS.map((row) => (
                  <span key={row.days} className="block">
                    <span className="text-cream">{row.days}</span> {row.hours}
                  </span>
                ))}
              </p>
              <a
                href={LOCATION.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-cream underline-offset-2 hover:underline"
              >
                Get directions →
              </a>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-cream/60 sm:flex-row sm:px-6 sm:text-left">
          <p>&copy; {year} RV&apos;s Cold Brew. All rights reserved.</p>
          <p>Proudly independent · Born in Belfast</p>
        </div>
      </div>
    </footer>
  );
}
