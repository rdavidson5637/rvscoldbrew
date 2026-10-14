"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { VIDEOS } from "@/lib/brand";
import { MENU_ITEMS } from "@/lib/menu-data";

type Temp = "hot" | "iced" | null;
type Base = "coffee" | "matcha" | null;

const FLAVOURS = [
  { id: "plain", label: "Classic, no syrup" },
  { id: "vanilla", label: "Vanilla" },
  { id: "caramel", label: "Caramel" },
  { id: "hazelnut", label: "Hazelnut" },
  { id: "lavender", label: "Lavender" },
  { id: "pistachio", label: "Pistachio" },
  { id: "rose", label: "Rose" },
  { id: "mango", label: "Mango" },
  { id: "strawberry", label: "Strawberry" },
  { id: "white-chocolate", label: "White chocolate" },
] as const;

const STEPS = ["Hot or iced", "Coffee or matcha", "Flavour"] as const;

const BASE_MEDIA = {
  coffee: {
    src: VIDEOS.concentratePour.poster,
    alt: "CoreBrew cold brew concentrate being poured over ice",
  },
  matcha: {
    src: VIDEOS.matchaWhisk.poster,
    alt: "Matcha being whisked by hand",
  },
} as const;

function findDrink(temp: Temp, base: Base, flavour: string) {
  if (!temp || !base) return null;

  const category =
    temp === "iced"
      ? base === "coffee"
        ? "iced-coffee"
        : "iced-matcha"
      : base === "coffee"
        ? "hot-coffee"
        : "hot-matcha";

  const pool = MENU_ITEMS.filter((i) => i.category === category);

  if (flavour === "plain") {
    const classic =
      pool.find((i) =>
        base === "matcha"
          ? /^(iced )?matcha latte$/i.test(i.name)
          : temp === "iced"
            ? /^iced latte$/i.test(i.name)
            : /^(latte|flat white|americano)$/i.test(i.name),
      ) ?? pool[0];
    return classic ?? null;
  }

  const flavourToken = flavour.replace(/-/g, " ");
  const scored = pool
    .map((item) => {
      const name = item.name.toLowerCase();
      const hasFlavour = name.includes(flavourToken);
      return { item, hasFlavour };
    })
    .filter((x) => x.hasFlavour);

  return scored[0]?.item ?? null;
}

const tileBase =
  "group relative flex w-full flex-col overflow-hidden rounded-[2rem] text-left transition duration-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-teal";

function selectedRing(selected: boolean) {
  return selected
    ? "ring-4 ring-teal ring-offset-4 ring-offset-cream"
    : "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/15";
}

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [temp, setTemp] = useState<Temp>(null);
  const [base, setBase] = useState<Base>(null);
  const [flavour, setFlavour] = useState<string | null>(null);

  const match = useMemo(
    () => (flavour ? findDrink(temp, base, flavour) : null),
    [temp, base, flavour],
  );

  // On phones the answer lands below the fold, so bring it into view
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (flavour) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [flavour]);

  const reset = () => {
    setTemp(null);
    setBase(null);
    setFlavour(null);
    setStep(0);
  };

  const done = [Boolean(temp), Boolean(base), Boolean(flavour)];

  return (
    <>
      <PageHeader
        title="Find your drink"
        tone="matcha"
        intro={
          <p>
            Three quick choices: hot or iced, coffee or matcha, then a flavour.
            We&apos;ll point you at the drink on our menu.
          </p>
        }
      />

      <div className="bg-cream px-4 py-12 text-teal sm:px-6 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Finder progress">
            <ol className="flex flex-wrap items-center gap-2">
              {STEPS.map((label, index) => {
                const current = index === step;
                const reachable = index <= step || done[index - 1];
                return (
                  <li key={label}>
                    <button
                      type="button"
                      disabled={!reachable}
                      onClick={() => setStep(index)}
                      aria-current={current ? "step" : undefined}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 text-sm font-extrabold transition-colors ${
                        current
                          ? "border-teal bg-teal text-cream"
                          : done[index]
                            ? "border-teal/30 text-teal hover:border-teal"
                            : "border-teal/15 text-teal/45"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                          current ? "bg-cream text-teal" : done[index] ? "bg-teal text-cream" : "border-2 border-current"
                        }`}
                        aria-hidden
                      >
                        {done[index] && !current ? (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </span>
                      {label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-10">
            {step === 0 && (
              <section aria-labelledby="q-temp">
                <h2 id="q-temp" className="font-display text-5xl leading-none sm:text-6xl">
                  Hot or iced?
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "iced",
                        label: "Iced",
                        sub: "Over ice, all year round.",
                        tone: "bg-teal text-cream",
                      },
                      {
                        id: "hot",
                        label: "Hot",
                        sub: "For a proper Belfast morning.",
                        tone: "bg-ink text-cream",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={temp === opt.id}
                      onClick={() => {
                        setTemp(opt.id);
                        setFlavour(null);
                        setStep(1);
                      }}
                      className={`${tileBase} ${opt.tone} min-h-[13rem] justify-end p-8 sm:min-h-[16rem] ${selectedRing(temp === opt.id)}`}
                    >
                      <span className="font-display text-8xl leading-[0.8]">{opt.label}</span>
                      <span className="mt-3 text-base font-bold opacity-80">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === 1 && (
              <section aria-labelledby="q-base">
                <h2 id="q-base" className="font-display text-5xl leading-none sm:text-6xl">
                  Coffee or matcha?
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "coffee",
                        label: "Coffee",
                        sub: "CoreBrew Coffee Base",
                        tone: "bg-ink text-cream",
                      },
                      {
                        id: "matcha",
                        label: "Matcha",
                        sub: "Single cultivar Okumidori",
                        tone: "bg-matcha text-matcha-ink",
                      },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={base === opt.id}
                      onClick={() => {
                        setBase(opt.id);
                        setFlavour(null);
                        setStep(2);
                      }}
                      className={`${tileBase} ${opt.tone} ${selectedRing(base === opt.id)}`}
                    >
                      <span className="relative block aspect-[16/10] overflow-hidden">
                        <Image
                          src={BASE_MEDIA[opt.id].src}
                          alt={BASE_MEDIA[opt.id].alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 440px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="block p-7">
                        <span className="block font-display text-6xl leading-none">{opt.label}</span>
                        <span className="mt-2 block text-sm font-extrabold opacity-75">{opt.sub}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === 2 && (
              <section aria-labelledby="q-flavour">
                <h2 id="q-flavour" className="font-display text-5xl leading-none sm:text-6xl">
                  Pick a flavour
                </h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {FLAVOURS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={flavour === opt.id}
                      onClick={() => setFlavour(opt.id)}
                      className={`min-h-12 rounded-full border-2 px-5 font-display text-2xl leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                        flavour === opt.id
                          ? "border-teal bg-teal text-cream"
                          : "border-teal/20 bg-white/50 text-teal hover:border-teal"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {flavour && (
                  <div
                    ref={resultRef}
                    className="rise mt-10 grid scroll-mb-6 overflow-hidden rounded-[2rem] bg-teal text-cream sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
                    aria-live="polite"
                  >
                    {base && (
                      <div className="relative min-h-[12rem] sm:min-h-full">
                        <Image
                          src={BASE_MEDIA[base].src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 340px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-8 sm:p-10">
                      {match ? (
                        <>
                          <p className="text-sm font-extrabold text-cream/65">Your match</p>
                          <h3 className="mt-2 font-display text-6xl leading-[0.9]">
                            {match.name}
                          </h3>
                          {match.description && (
                            <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
                              {match.description}
                            </p>
                          )}
                          <div className="mt-8 flex flex-wrap gap-3">
                            <Link href={`/menu#category-${match.category}`} className="btn-cream">
                              See it on the menu
                            </Link>
                            <button type="button" onClick={reset} className="btn-ghost-cream">
                              Start again
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="font-display text-6xl leading-[0.9]">
                            No exact match
                          </h3>
                          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
                            That one isn&apos;t on the menu as its own drink. Try
                            another flavour, or ask at the counter.
                          </p>
                          <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/menu" className="btn-cream">
                              See the full menu
                            </Link>
                            <button type="button" onClick={reset} className="btn-ghost-cream">
                              Start again
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="link-under mt-10 inline-block text-teal"
            >
              Back a step
            </button>
          )}
        </div>
      </div>
    </>
  );
}
