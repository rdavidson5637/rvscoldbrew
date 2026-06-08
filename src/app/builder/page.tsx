"use client";

import {
  generateOrderRef,
  generateTimeSlots,
  getNearestPickupSlot,
} from "@/lib/builder-utils";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const STEPS = ["Base", "Milk", "Flavour", "Pick Up Time", "Summary"] as const;

const BASE_OPTIONS = [
  {
    id: "cold-brew",
    emoji: "☕",
    title: "House Cold Brew Concentrate",
    subtitle: "24-hour steep · Espresso-strength",
    description:
      "Our signature in-house concentrate — espresso-strength, bold and smooth. Powers every hot and iced drink we pour.",
  },
  {
    id: "matcha",
    emoji: "🍵",
    title: "Single Cultivar Okumidori Matcha",
    subtitle: "Uji, Japan · Ceremonial grade",
    description:
      "Vivid green, naturally sweet Okumidori matcha whisked fresh with zero bitterness.",
  },
];

const MILK_OPTIONS = [
  { id: "oat", label: "Oat Milk", emoji: "🌾" },
  { id: "almond", label: "Almond Milk", emoji: "🥜" },
  { id: "whole", label: "Whole Milk", emoji: "🥛" },
  { id: "none", label: "No Milk", emoji: "✨" },
];

const FLAVOUR_OPTIONS = [
  { id: "none", label: "No Syrup" },
  { id: "vanilla", label: "Vanilla" },
  { id: "caramel", label: "Caramel" },
  { id: "hazelnut", label: "Hazelnut" },
  { id: "honey", label: "Raw Honey" },
  { id: "lavender", label: "Lavender" },
];

const TIME_SLOTS = generateTimeSlots();

type Selections = {
  base: string | null;
  milk: string | null;
  flavour: string | null;
  pickupTime: string | null;
};

const INITIAL_SELECTIONS: Selections = {
  base: null,
  milk: null,
  flavour: null,
  pickupTime: null,
};

function getLabel<T extends { id: string; label?: string; title?: string }>(
  options: T[],
  id: string | null,
  key: "label" | "title" = "label",
): string {
  if (!id) return "—";
  const option = options.find((o) => o.id === id);
  if (!option) return "—";
  if (key === "title" && "title" in option) return option.title as string;
  if ("label" in option && option.label) return option.label;
  if ("title" in option && option.title) return option.title;
  return "—";
}

function BuilderContent() {
  const searchParams = useSearchParams();
  const isQuick = searchParams.get("quick") === "1";

  const [step, setStep] = useState(0);
  const [selections, setSelections] =
    useState<Selections>(INITIAL_SELECTIONS);
  const [confirmed, setConfirmed] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [copied, setCopied] = useState(false);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return selections.base !== null;
      case 1:
        return selections.milk !== null;
      case 2:
        return selections.flavour !== null;
      case 3:
        return selections.pickupTime !== null;
      default:
        return true;
    }
  }, [step, selections]);

  const handleNext = () => {
    if (step < STEPS.length - 1 && canProceed) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleConfirm = () => {
    setOrderRef(generateOrderRef());
    setConfirmed(true);
  };

  const handleBuildAnother = () => {
    setSelections(INITIAL_SELECTIONS);
    setStep(0);
    setConfirmed(false);
    setOrderRef("");
  };

  const updateSelection = <K extends keyof Selections>(
    key: K,
    value: Selections[K],
  ) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const selectAndAdvance = <K extends keyof Selections>(
    key: K,
    value: Selections[K],
  ) => {
    updateSelection(key, value);
    if (isQuick && step < 3) {
      setTimeout(() => setStep((s) => Math.min(s + 1, 4)), 350);
    }
  };

  useEffect(() => {
    if (step === 3 && isQuick && !selections.pickupTime) {
      updateSelection("pickupTime", getNearestPickupSlot(TIME_SLOTS));
    }
  }, [step, isQuick, selections.pickupTime]);

  useEffect(() => {
    if (isQuick && step === 3 && selections.pickupTime) {
      const timer = setTimeout(() => setStep(4), 600);
      return () => clearTimeout(timer);
    }
  }, [isQuick, step, selections.pickupTime]);

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(orderRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (confirmed) {
    return (
      <div className="bg-[#fff2cc] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <span
            className="inline-block text-7xl animate-float"
            role="img"
            aria-label="Celebration"
          >
            🎉
          </span>
          <h1 className="mt-6 font-display text-5xl text-[#141514] sm:text-6xl">
            Your Daily Upgrade is Secured!
          </h1>
          <p className="mt-4 text-[#141514]/80">
            Heck yeah — great choice. Show this reference at the counter when you
            collect your drink.
          </p>
          <p className="mt-8 font-display text-4xl tracking-wide text-[#0c343d]">
            {orderRef}
          </p>
          <button
            type="button"
            onClick={handleCopyRef}
            className="btn-outline mt-4 normal-case"
          >
            {copied ? "✓ Copied!" : "Copy Reference"}
          </button>
          <button
            type="button"
            onClick={handleBuildAnother}
            className="btn-primary mt-4 normal-case"
          >
            Build Another Upgrade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff2cc] px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="font-display text-5xl text-[#141514] sm:text-6xl">
            {isQuick ? "Quick Order" : "Make Your Own Drink"}
          </h1>
          <p className="mt-2 text-sm text-[#141514]/70">
            {isQuick
              ? "Rushing from the station? Build your can in under a minute."
              : "Five quick steps — we seal it fresh into a can for counter pickup"}
          </p>
        </header>

        {/* Progress indicator */}
        <nav
          className="mt-10"
          aria-label="Builder progress"
        >
          <ol className="flex items-center justify-between">
            {STEPS.map((label, index) => {
              const isComplete = index < step;
              const isCurrent = index === step;
              return (
                <li
                  key={label}
                  className="flex flex-1 flex-col items-center last:flex-none"
                >
                  <div className="flex w-full items-center">
                    {index > 0 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          isComplete || isCurrent
                            ? "bg-[#0c343d]"
                            : "bg-[#0c343d]/20"
                        }`}
                        aria-hidden
                      />
                    )}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        isComplete || isCurrent
                          ? "bg-[#0c343d] text-[#fff2cc]"
                          : "border-2 border-[#0c343d]/30 bg-transparent text-[#0c343d]/50"
                      }`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {index + 1}
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          isComplete ? "bg-[#0c343d]" : "bg-[#0c343d]/20"
                        }`}
                        aria-hidden
                      />
                    )}
                  </div>
                  <span
                    className={`mt-2 hidden text-[10px] font-semibold uppercase tracking-wide sm:block ${
                      isCurrent ? "text-[#0c343d]" : "text-[#141514]/50"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Step content */}
        <div key={step} className="mt-12 animate-fade-up">
          {step === 0 && (
            <StepPanel title="Choose your base" subtitle="Step 1 of 5">
              <div className="grid gap-4 sm:grid-cols-2">
                {BASE_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.id}
                    selected={selections.base === option.id}
                    onSelect={() => selectAndAdvance("base", option.id)}
                  >
                    <span className="text-4xl" aria-hidden>
                      {option.emoji}
                    </span>
                    <h3 className="mt-4 font-display text-2xl leading-tight text-[#141514]">
                      {option.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#0c343d]">
                      {option.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#141514]/75">
                      {option.description}
                    </p>
                  </OptionCard>
                ))}
              </div>
            </StepPanel>
          )}

          {step === 1 && (
            <StepPanel title="Choose your milk" subtitle="Step 2 of 5">
              <div className="grid grid-cols-2 gap-4">
                {MILK_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.id}
                    selected={selections.milk === option.id}
                    onSelect={() => selectAndAdvance("milk", option.id)}
                    compact
                  >
                    <span className="text-3xl" aria-hidden>
                      {option.emoji}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-[#141514]">
                      {option.label}
                    </h3>
                  </OptionCard>
                ))}
              </div>
            </StepPanel>
          )}

          {step === 2 && (
            <StepPanel title="Choose your flavour" subtitle="Step 3 of 5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {FLAVOUR_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.id}
                    selected={selections.flavour === option.id}
                    onSelect={() => selectAndAdvance("flavour", option.id)}
                    compact
                  >
                    <h3 className="font-display text-xl text-[#141514]">
                      {option.label}
                    </h3>
                  </OptionCard>
                ))}
              </div>
            </StepPanel>
          )}

          {step === 3 && (
            <StepPanel title="Pick up time" subtitle="Step 4 of 5">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => selectAndAdvance("pickupTime", slot)}
                    className={`rounded-lg border-2 px-2 py-3 text-sm font-semibold transition-colors ${
                      selections.pickupTime === slot
                        ? "border-[#0c343d] bg-[#0c343d] text-[#fff2cc]"
                        : "border-[#0c343d]/20 bg-white text-[#141514] hover:border-[#0c343d]/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </StepPanel>
          )}

          {step === 4 && (
            <StepPanel title="Your order" subtitle="Step 5 of 5">
              <div className="rounded-2xl bg-[#0c343d] p-8 text-[#fff2cc]">
                <h3 className="font-display text-3xl">Order Summary</h3>
                <dl className="mt-6 space-y-4">
                  <SummaryRow
                    label="Base"
                    value={getLabel(BASE_OPTIONS, selections.base, "title")}
                  />
                  <SummaryRow
                    label="Milk"
                    value={getLabel(MILK_OPTIONS, selections.milk)}
                  />
                  <SummaryRow
                    label="Flavour"
                    value={getLabel(FLAVOUR_OPTIONS, selections.flavour)}
                  />
                  <SummaryRow
                    label="Collection Time"
                    value={selections.pickupTime ?? "—"}
                  />
                </dl>
                <p className="mt-6 border-t border-[#fff2cc]/20 pt-6 text-sm text-[#fff2cc]/80">
                  Payment is taken at the counter when you collect your drink.
                </p>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="btn-cream mt-8 w-full normal-case tracking-normal"
                >
                  Confirm — Your Daily Upgrade is Secured 🎉
                </button>
              </div>
            </StepPanel>
          )}
        </div>

        {/* Navigation */}
        {step < 4 && (
          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="btn-outline disabled:cursor-not-allowed disabled:opacity-40 normal-case"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40 normal-case"
            >
              Looking Good — Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="btn-outline normal-case"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-4xl text-[#141514]">{title}</h2>
      <p className="mt-1 text-sm text-[#141514]/60">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function OptionCard({
  selected,
  onSelect,
  children,
  compact = false,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border-2 bg-white text-left transition-all hover:shadow-md ${
        compact ? "p-5" : "p-6"
      } ${
        selected
          ? "border-[#0c343d] ring-2 ring-[#0c343d]/20"
          : "border-transparent shadow-sm hover:border-[#0c343d]/30"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#fff2cc]/15 pb-4 last:border-0 last:pb-0">
      <dt className="text-sm font-semibold uppercase tracking-wide text-[#fff2cc]/70">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
    </div>
  );
}

function BuilderFallback() {
  return (
    <div className="bg-[#fff2cc] px-4 py-16 text-center sm:px-6">
      <p className="font-display text-4xl text-[#141514]">Loading builder…</p>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BuilderContent />
    </Suspense>
  );
}
