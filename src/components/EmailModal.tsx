"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/brand";

type EmailPayload = {
  href: string;
  subject: string;
  body: string;
};

function parseMailto(href: string): EmailPayload {
  const query = href.split("?")[1] || "";
  let subject = "";
  let body = "";
  for (const part of query.split("&")) {
    if (!part) continue;
    const [rawKey, rawVal = ""] = part.split("=");
    const key = decodeURIComponent(rawKey || "");
    const val = decodeURIComponent(rawVal.replace(/\+/g, " "));
    if (key === "subject") subject = val;
    if (key === "body") body = val;
  }
  return { href, subject, body };
}

/**
 * Intercepts clicks on any `a[href^="mailto:"]` in the document (just like
 * rvscoldbrew.co.uk) and offers a choice of Default Email App, Gmail, Outlook,
 * or one-click Copy.
 */
export default function EmailModal() {
  const [payload, setPayload] = useState<EmailPayload | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (!anchor || anchor.dataset.directMailto === "true") return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      setCopied(false);
      setPayload(parseMailto(href));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPayload(null);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!payload) return null;

  const enc = encodeURIComponent;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(
    CONTACT_EMAIL,
  )}&su=${enc(payload.subject)}&body=${enc(payload.body)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(
    CONTACT_EMAIL,
  )}&subject=${enc(payload.subject)}&body=${enc(payload.body)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      const t = document.createElement("textarea");
      t.value = CONTACT_EMAIL;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {
        /* ignore */
      }
      document.body.removeChild(t);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-teal/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setPayload(null);
      }}
    >
      <div className="relative w-full max-w-md rounded-[1.75rem] border-2 border-teal bg-cream p-7 text-teal shadow-2xl">
        <button
          type="button"
          onClick={() => setPayload(null)}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-teal/70 transition-colors hover:bg-teal/10 hover:text-teal"
        >
          ×
        </button>

        <h3 id="email-modal-title" className="font-display text-4xl leading-none">
          Email us
        </h3>
        <p className="mt-2 text-sm text-ink/75">
          Choose how you&apos;d like to send your email, or copy our address.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-teal/20 bg-white px-3.5 py-2.5">
          <span className="flex-1 break-all text-sm font-extrabold text-teal">
            {CONTACT_EMAIL}
          </span>
          <button
            type="button"
            onClick={copyAddress}
            className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-extrabold text-teal transition-colors hover:bg-teal hover:text-cream"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-4 grid gap-2.5">
          <a
            href={payload.href}
            data-direct-mailto="true"
            onClick={() => setTimeout(() => setPayload(null), 300)}
            className="btn-primary w-full text-center"
          >
            Open my email app
          </a>
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setPayload(null)}
            className="btn-outline w-full text-center"
          >
            Open in Gmail
          </a>
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setPayload(null)}
            className="btn-outline w-full text-center"
          >
            Open in Outlook
          </a>
        </div>
      </div>
    </div>
  );
}
