import Link from "next/link";

export default function StickyBar() {
  return (
    <div className="bg-teal text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:justify-center sm:gap-x-4">
        <span className="hidden text-sm sm:inline sm:text-base">
          Rushing from the Station?
        </span>
        <span className="text-sm sm:hidden">Rushing from the Station?</span>
        <Link
          href="/builder?quick=1"
          className="btn-cream shrink-0 animate-pulse-soft px-4 py-1.5 text-xs normal-case tracking-normal sm:text-sm"
        >
          Tap to Quick Order
        </Link>
      </div>
    </div>
  );
}
