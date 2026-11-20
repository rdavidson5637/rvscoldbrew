"use client";

import { useSearchParams } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { CONTACT_EMAIL } from "@/lib/brand";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const enquiryTypes = [
  { value: "", label: "Select enquiry type" },
  { value: "on-tap", label: "Cold Brew on Tap (Venue Demo / Trial Keg)" },
  { value: "white-label", label: "White-Label Brewing (For Coffee Roasters)" },
  { value: "wholesale", label: "Wholesale" },
  { value: "events", label: "Events & Catering" },
  { value: "corporate", label: "Corporate Orders" },
  { value: "press", label: "Press & Media" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [enquiryType, setEnquiryType] = useState("");

  useEffect(() => {
    const param = searchParams.get("type");
    if (param && enquiryTypes.some((t) => t.value === param)) {
      setEnquiryType(param);
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!FORMSPREE_ENDPOINT) {
      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const phone = String(formData.get("phone") || "");
      const company = String(formData.get("company") || "");
      const type = String(formData.get("enquiry_type") || "Enquiry");
      const message = String(formData.get("message") || "");
      const subject = `RV's Cold Brew Enquiry: ${type}${company ? ` (${company})` : ""}`;
      const body = `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}${company ? `\nVenue / Company: ${company}` : ""}\nEnquiry Type: ${type}\n\n${message}`;
      const a = document.createElement("a");
      a.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

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

  if (status === "success") {
    return (
      <div 
        className="rounded-[2rem] border-2 border-teal bg-white/70 p-8 text-center sm:p-12"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal">
          <svg
            className="h-8 w-8 text-cream"
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
        </div>
        <h2 className="font-display text-4xl text-ink">
          Enquiry sent
        </h2>
        {/* TODO Ryan: confirm response-time promise before publishing a specific SLA. */}
        <p className="mt-4 text-ink/75">
          Thanks. We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-primary mt-8 normal-case"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[2rem] border-2 border-teal bg-white/70 p-6 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-extrabold text-teal"
          >
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 block w-full rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-extrabold text-teal"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 block w-full rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-extrabold text-teal"
          >
            Phone{" "}
            <span className="font-normal text-[#141514]/50">
              (optional)
            </span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            className="mt-2 block w-full rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
            placeholder="+44 7XXX XXXXXX"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-extrabold text-teal"
          >
            Company or organisation{" "}
            <span className="font-normal text-[#141514]/50">
              (optional)
            </span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            autoComplete="organization"
            className="mt-2 block w-full rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry_type"
          className="block text-sm font-extrabold text-teal"
        >
          Enquiry type <span className="text-red-600">*</span>
        </label>
        <select
          id="enquiry_type"
          name="enquiry_type"
          required
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value)}
          className="mt-2 block w-full rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
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
          className="block text-sm font-extrabold text-teal"
        >
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 block w-full resize-none rounded-2xl border-2 border-teal/20 bg-cream/50 px-4 py-3.5 text-ink placeholder-[#141514]/40 transition-colors focus:border-[#0c343d] focus:outline-none focus:ring-0"
          placeholder="What do you need, and when?"
        />
      </div>

      {status === "error" && (
        <div 
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
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
              aria-hidden="true"
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
          "Send enquiry"
        )}
      </button>

      <p className="text-center text-xs text-[#141514]/50">
        We only use your details to reply to this enquiry.
      </p>
    </form>
  );
}
