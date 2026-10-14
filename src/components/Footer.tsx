import Image from "next/image";
import Link from "next/link";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

const footerNav = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "How collection works" },
  { href: "/rewards", label: "Rewards" },
  { href: "/builder", label: "Find your drink" },
  { href: "/process", label: "Our process" },
  { href: "/contact", label: "Wholesale and events" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex items-start gap-5">
            <Image
              src="/logo.png"
              alt=""
              width={88}
              height={88}
              className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-[5.5rem] sm:w-[5.5rem]"
            />
            <div>
              <p className="font-display text-4xl leading-none tracking-wide">
                RV&apos;s Cold Brew
              </p>
              <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-cream/70">
                CoreBrew cold brew and Okumidori matcha. Independent, brewed in
                Belfast, collection at Unit 11.
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-2xl tracking-wide text-cream/50">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-bold text-cream/85 transition-colors hover:text-cream hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-2xl tracking-wide text-cream/50">Visit</h2>
            <address className="mt-4 text-[0.95rem] not-italic leading-relaxed text-cream/85">
              {LOCATION.unit}, {LOCATION.name}
              <br />
              {LOCATION.detail}
              <br />
              {LOCATION.city}
            </address>
            <dl className="mt-4 space-y-1 text-[0.95rem]">
              {OPENING_HOURS.map((row) => (
                <div key={row.days} className="flex max-w-[15rem] justify-between gap-4">
                  <dt className="font-bold">{row.days}</dt>
                  <dd className="tabular-nums text-cream/75">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <a
              href={LOCATION.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-under mt-5 inline-block text-cream"
            >
              Get directions
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-6 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} RV&apos;s Cold Brew</p>
          <p>Payments handled securely by Square</p>
        </div>
      </div>
    </footer>
  );
}
