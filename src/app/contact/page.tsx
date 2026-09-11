"use client";

import { useState, FormEvent } from "react";
import { LOCATION, OPENING_HOURS } from "@/lib/brand";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORMSPREE_ID";

const enquiryTypes = [
  { value: "", label: "Select enquiry type" },
  { value: "wholesale", label: "Wholesale" },
  { value: "events", label: "Events & Catering" },
  { value: "corporate", label: "Corporate Orders" },
  { value: "press", label: "Press & Media" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_ENDPOINT}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message"
      );
    }
  }

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
            {status === "success" ? (
              <div className="rounded-2xl border-2 border-[#0c343d]/20 bg-white p-8 text-center sm:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0c343d]">
                  <svg
                    className="h-8 w-8 text-[#fff2cc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-4xl text-[#141514]">
                  Message Sent
                </h2>
                <p className="mt-4 text-[#141514]/75">
                  Thanks for reaching out! We&apos;ll be in touch within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-primary mt-8 normal-case"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border-2 border-[#0c343d]/10 bg-white p-8 shadow-sm sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#141514]"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-2 block w-full rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#141514]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-2 block w-full rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#141514]"
                    >
                      Phone Number{" "}
                      <span className="font-normal text-[#141514]/50">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="mt-2 block w-full rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-[#141514]"
                    >
                      Company / Organisation{" "}
                      <span className="font-normal text-[#141514]/50">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className="mt-2 block w-full rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry_type"
                    className="block text-sm font-medium text-[#141514]"
                  >
                    Enquiry Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="enquiry_type"
                    name="enquiry_type"
                    required
                    className="mt-2 block w-full rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                  >
                    {enquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#141514]"
                  >
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 block w-full resize-none rounded-lg border-2 border-[#0c343d]/20 bg-[#fff2cc]/30 px-4 py-3 text-[#141514] placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
                    placeholder="Tell us about your enquiry..."
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {errorMessage || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full normal-case disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-center text-xs text-[#141514]/50">
                  By submitting this form, you agree to our privacy policy. We
                  will only use your information to respond to your enquiry.
                </p>
              </form>
            )}
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
