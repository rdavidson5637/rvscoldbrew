"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MENU_ITEMS } from "@/lib/menu-data";

type Temp = "hot" | "iced" | null;
type Base = "coffee" | "matcha" | null;

const FLAVOURS = [
  { id: "plain", label: "No syrup / classic" },
  { id: "vanilla", label: "Vanilla" },
  { id: "caramel", label: "Caramel" },
  { id: "hazelnut", label: "Hazelnut" },
  { id: "lavender", label: "Lavender" },
  { id: "pistachio", label: "Pistachio" },
  { id: "rose", label: "Rose" },
  { id: "mango", label: "Mango" },
  { id: "strawberry", label: "Strawberry" },
  { id: "white-chocolate", label: "White Chocolate" },
] as const;

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

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [temp, setTemp] = useState<Temp>(null);
  const [base, setBase] = useState<Base>(null);
  const [flavour, setFlavour] = useState<string | null>(null);

  const match = useMemo(
    () => (flavour ? findDrink(temp, base, flavour) : null),
    [temp, base, flavour],
  );

  const canNext =
    (step === 0 && temp) ||
    (step === 1 && base) ||
    (step === 2 && flavour);

  return (
    <div className="bg-[#fff2cc] px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="font-display text-5xl text-[#141514] sm:text-6xl">
            Find Your Drink
          </h1>
          <p className="mt-2 text-sm text-[#141514]/70">
            Hot or iced · coffee or matcha · pick a flavour — we&apos;ll land you
            on the real menu item.
          </p>
        </header>

        <nav className="mt-10" aria-label="Finder progress">
          <ol className="flex items-center justify-center gap-2">
            {["Temp", "Base", "Flavour"].map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    index <= step
                      ? "bg-[#0c343d] text-[#fff2cc]"
                      : "border-2 border-[#0c343d]/30 text-[#0c343d]/50"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden text-xs font-semibold uppercase tracking-wide text-[#141514]/60 sm:inline">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12">
          {step === 0 && (
            <section>
              <h2 className="font-display text-4xl text-[#141514]">Hot or iced?</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    { id: "iced", label: "Iced" },
                    { id: "hot", label: "Hot" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setTemp(opt.id);
                      setStep(1);
                    }}
                    className={`rounded-2xl border-2 bg-white p-8 text-left shadow-sm transition-all hover:shadow-md ${
                      temp === opt.id
                        ? "border-[#0c343d] ring-2 ring-[#0c343d]/20"
                        : "border-transparent hover:border-[#0c343d]/30"
                    }`}
                  >
                    <span className="font-display text-3xl text-[#141514]">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h2 className="font-display text-4xl text-[#141514]">
                Coffee or matcha?
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    { id: "coffee", label: "Coffee", sub: "CoreBrew Coffee Base" },
                    { id: "matcha", label: "Matcha", sub: "Okumidori ceremonial" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setBase(opt.id);
                      setStep(2);
                    }}
                    className={`rounded-2xl border-2 bg-white p-8 text-left shadow-sm transition-all hover:shadow-md ${
                      base === opt.id
                        ? "border-[#0c343d] ring-2 ring-[#0c343d]/20"
                        : "border-transparent hover:border-[#0c343d]/30"
                    }`}
                  >
                    <span className="font-display text-3xl text-[#141514]">
                      {opt.label}
                    </span>
                    <p className="mt-2 text-sm text-[#141514]/70">{opt.sub}</p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="btn-outline mt-8 normal-case"
              >
                Back
              </button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="font-display text-4xl text-[#141514]">
                Pick a flavour
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {FLAVOURS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFlavour(opt.id)}
                    className={`rounded-2xl border-2 bg-white p-5 text-left shadow-sm transition-all ${
                      flavour === opt.id
                        ? "border-[#0c343d] ring-2 ring-[#0c343d]/20"
                        : "border-transparent hover:border-[#0c343d]/30"
                    }`}
                  >
                    <span className="font-display text-xl text-[#141514]">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              {flavour && (
                <div className="mt-10 rounded-2xl bg-[#0c343d] p-8 text-[#fff2cc]">
                  {match ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#fff2cc]/70">
                        Your match
                      </p>
                      <h3 className="mt-2 font-display text-3xl">{match.name}</h3>
                      {match.description && (
                        <p className="mt-3 text-sm text-[#fff2cc]/80">
                          {match.description}
                        </p>
                      )}
                      <Link
                        href={`/menu#category-${match.category}`}
                        className="btn-cream mt-8 inline-flex normal-case"
                      >
                        See it on the Menu
                      </Link>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-3xl">No exact match</h3>
                      <p className="mt-3 text-sm text-[#fff2cc]/80">
                        Browse the full menu — every drink is listed as its own
                        item.
                      </p>
                      <Link
                        href="/menu"
                        className="btn-cream mt-8 inline-flex normal-case"
                      >
                        See the Menu
                      </Link>
                    </>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline mt-8 normal-case"
              >
                Back
              </button>
            </section>
          )}
        </div>

        {step < 2 && canNext && (
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary normal-case"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
