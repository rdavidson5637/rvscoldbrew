import ContactForm from "@/components/ContactForm";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0c343d] px-4 py-20 text-[#fff2cc] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fff2cc]/70">
            Get in Touch
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Business Enquiries
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#fff2cc]/85 sm:text-lg">
            Interested in wholesale, events, corporate orders, or collaborations?
            We&apos;d love to hear from you. Fill out the form below and
            we&apos;ll get back to you within 48 hours.
          </p>
        </div>
      </section>

      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-[#0c343d] p-8 text-[#fff2cc]">
              <h2 className="font-display text-3xl">Visit Us</h2>
              <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-[#fff2cc]/85">
                <p>
                  {LOCATION.unit}, {LOCATION.name}
                  <br />
                  {LOCATION.detail}
                  <br />
                  {LOCATION.city}
                </p>
              </address>
              <a
                href={LOCATION.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold underline-offset-2 hover:underline"
              >
                Get directions →
              </a>
            </div>

            <div className="rounded-2xl bg-[#0c343d] p-8 text-[#fff2cc]">
              <h2 className="font-display text-3xl">Opening Hours</h2>
              <div className="mt-4 space-y-1 text-sm leading-relaxed text-[#fff2cc]/85">
                {OPENING_HOURS.map((row) => (
                  <p key={row.days}>
                    <span className="text-[#fff2cc]">{row.days}</span> ·{" "}
                    {row.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[#0c343d]/10 bg-white p-8">
              <h2 className="font-display text-3xl text-[#141514]">
                Quick Response
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#141514]/75">
                We typically respond to all enquiries within 48 hours during
                business days.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#141514]/75">
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0c343d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Wholesale minimum orders from £100</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0c343d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Event catering for 20+ guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0c343d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Corporate accounts available</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
