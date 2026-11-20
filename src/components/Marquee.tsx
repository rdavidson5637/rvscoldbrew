type MarqueeProps = {
  items: string[];
  tone?: "cream" | "teal" | "ink" | "matcha";
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
  className?: string;
};

const TONES = {
  cream: "bg-cream text-teal border-teal",
  teal: "bg-teal text-cream border-cream/15",
  ink: "bg-ink text-cream border-cream/15",
  matcha: "bg-matcha text-matcha-ink border-matcha-ink/20",
} as const;

/**
 * Scrolling ticker band. Decorative, so it's hidden from screen readers and
 * the items are repeated to fill wide screens. Stops under reduced motion.
 */
export default function Marquee({
  items,
  tone = "cream",
  speed = 38,
  className = "",
}: MarqueeProps) {
  // Repeat enough times that one half of the track is wider than any screen
  const run = [...items, ...items, ...items];

  return (
    <div
      className={`marquee overflow-hidden border-y-2 py-3 sm:py-4 ${TONES[tone]} ${className}`}
      aria-hidden
    >
      <div
        className="marquee-track"
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {[0, 1].map((half) => (
          <ul key={half} className="flex shrink-0 items-center">
            {run.map((item, i) => (
              <li
                key={`${half}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-2xl leading-none sm:text-3xl"
              >
                <span className="px-5 sm:px-7">{item}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 opacity-60 sm:h-5 sm:w-5"
                  aria-hidden
                >
                  <path
                    d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
