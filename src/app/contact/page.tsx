import ContactForm from "@/components/ContactForm";
import OpenStatus from "@/components/OpenStatus";
import PageHeader from "@/components/PageHeader";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

const OFFERS = [
  "Wholesale minimum orders from £100",
  "Event catering for 20+ guests",
  "Corporate accounts available",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Wholesale, events and enquiries"
        intro={
          <p>
            Wholesale, events, corporate orders or a collaboration. Send us the
            details and we&apos;ll get back to you within 48 hours.
          </p>
        }
      />

      <section className="bg-cream px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ContactForm />
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
            </div>

            <div className="rounded-[2rem] bg-teal p-8 text-cream">
              <h2 className="font-display text-4xl leading-none">Visit us</h2>
              <OpenStatus className="mt-4 font-extrabold" />
              <address className="mt-4 text-lg not-italic leading-relaxed text-cream/85">
                {LOCATION.unit}, {LOCATION.name}
                <br />
                {LOCATION.detail}
                <br />
                {LOCATION.city}
              </address>
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
