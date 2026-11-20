import { LOCATION } from "@/lib/brand";
import OpenStatus from "./OpenStatus";

export default function StickyBar() {
  return (
    <div className="min-h-11 bg-teal text-cream">
      <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-between gap-4 px-4 text-[0.8rem] font-semibold sm:px-6 sm:text-sm">
        <OpenStatus />
        <a
          href={LOCATION.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center text-cream/80 transition-colors hover:text-cream"
        >
          <span className="sm:hidden">{LOCATION.unit}</span>
          <span className="hidden sm:inline">
            Collect at {LOCATION.unit}, {LOCATION.name}
          </span>
        </a>
      </div>
    </div>
  );
}
