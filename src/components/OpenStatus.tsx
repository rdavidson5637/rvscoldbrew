"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";

/**
 * Live "open now" line, computed in Belfast time on the client.
 * Renders an invisible placeholder until mounted so server and client markup match.
 */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) {
    return (
      <span className={`inline-flex items-center gap-2 opacity-0 ${className}`} aria-hidden>
        <span className="h-2 w-2 rounded-full" />
        Checking hours
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${
          state.open ? "bg-[#9fd36b] shadow-[0_0_0_3px_rgba(159,211,107,0.25)]" : "bg-current opacity-50"
        }`}
        aria-hidden
      />
      {state.open
        ? `Open now, until ${state.closesAt}`
        : state.opensLabel
          ? `Closed, opens ${state.opensLabel}`
          : "Closed"}
    </span>
  );
}
