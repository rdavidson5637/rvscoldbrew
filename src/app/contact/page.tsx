import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import OpenStatus from "@/components/OpenStatus";
import PageHeader from "@/components/PageHeader";
import { CONTACT_EMAIL, LOCATION, OPENING_HOURS } from "@/lib/brand";

const OFFERS = [
  "Cold brew & nitro on tap — £0 equipment to buy, taps & line cleaning included",
  "White-label cold brew kegging for coffee roasters (from 4 kegs/month)",
  "Wholesale minimum orders from £100",
  "Event catering for 20+ guests & corporate accounts",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="On tap, wholesale & enquiries"
        intro={
          <p>
            Put cold brew on tap at your venue, talk to us about white-label
            roaster kegs, or enquire about events and wholesale. Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Cold%20brew%20on%20tap%20enquiry`}
              className="underline decoration-2 underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or use the form below.
          </p>
        }
        actions={
          <Link href="/on-tap" className="btn-ghost-cream">
            See how On Tap works
          </Link>
        }
      />

      <section className="bg-cream px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="space-y-10 text-teal lg:col-span-2">
            <div>
              <h2 className="font-display text-4xl leading-none">What we can do</h2>
              <ul className="mt-5 border-t-2 border-teal">
                {OFFERS.map((offer) => (
                  <li
                    key={offer}
                    className="flex items-start gap-3 border-b-2 border-dotted border-teal/20 py-3 text-lg font-bold"
                  >
                    <span aria-hidden>✓</span>
                    {offer}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Book%20a%20demo&body=Hi%20RV%27s%20Cold%20Brew%2C%0A%0AI%27d%20like%20to%20book%20a%20demo%20of%20your%20cold%20brew%20on%20tap.%0A%0AVenue%20name%3A%0ALocation%3A%0APhone%3A%0ABest%20days%2Ftimes%3A%0A%0AThanks`}
                  className="btn-primary"
                >
                  Book a demo
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Cold%20brew%20on%20tap%20enquiry`}
                  className="btn-outline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-teal p-8 text-cream">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cream/65">
                Tasting room &amp; showroom
              </p>
              <h2 className="mt-2 font-display text-4xl leading-none">
                Come and taste it from the tap
              </h2>
              <OpenStatus className="mt-4 font-extrabold" />
              <address className="mt-4 text-lg not-italic leading-relaxed text-cream/85">
                {LOCATION.unit}, {LOCATION.name}
                <br />
                {LOCATION.detail}
                <br />
                {LOCATION.city}, {LOCATION.region}
              </address>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                Our tasting room at the front of our brewery serves our cold
                brew and nitro every day. Venue owners are welcome to book a
                demo.
              </p>
              <dl className="mt-5 space-y-1">
                {OPENING_HOURS.map((row) => (
                  <div key={row.days} className="flex max-w-[16rem] justify-between gap-4">
                    <dt className="font-bold">{row.days}</dt>
                    <dd className="tabular-nums text-cream/80">{row.hours}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={LOCATION.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-under mt-6 inline-block text-cream"
              >
                Get directions
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
