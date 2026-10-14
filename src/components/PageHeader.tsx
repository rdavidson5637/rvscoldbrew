type PageHeaderProps = {
  title: string;
  intro?: React.ReactNode;
  /** Buttons or links under the intro */
  actions?: React.ReactNode;
  /** Optional media or sticker on the right at md+ */
  aside?: React.ReactNode;
  tone?: "teal" | "ink" | "matcha";
};

const TONES = {
  teal: "bg-teal text-cream",
  ink: "bg-ink text-cream",
  matcha: "bg-matcha text-matcha-ink",
} as const;

/** Shared top band for inner pages, so every page opens the same way. */
export default function PageHeader({
  title,
  intro,
  actions,
  aside,
  tone = "teal",
}: PageHeaderProps) {
  return (
    <header className={`relative overflow-hidden ${TONES[tone]}`}>
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 pb-14 pt-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] lg:pb-20 lg:pt-16">
        <div>
          <h1 className="rise font-display text-[clamp(3.75rem,10vw,8.5rem)] leading-[0.86]">
            {title}
          </h1>
          {intro && (
            <div className="rise mt-5 max-w-xl text-lg leading-relaxed opacity-85 delay-100">
              {intro}
            </div>
          )}
          {actions && (
            <div className="rise mt-8 flex flex-wrap gap-3 delay-200">{actions}</div>
          )}
        </div>
        {aside && <div className="hidden md:block">{aside}</div>}
      </div>
    </header>
  );
}
