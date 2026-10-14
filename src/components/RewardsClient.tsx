"use client";

import { useState } from "react";

type Tier = { name: string; points: number };

export default function RewardsClient({
  launchingSoon,
}: {
  launchingSoon: boolean;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState<"balance" | "join" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    kind: "balance" | "joined";
    balance: number;
    terminology?: { one: string; other: string };
    rewardTiers?: Tier[];
    alreadyMember?: boolean;
  } | null>(null);

  if (launchingSoon) {
    return (
      <div className="rounded-[2rem] bg-teal p-8 text-cream sm:p-10">
        <h2 className="font-display text-5xl leading-none">Launching soon</h2>
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-cream/80">
          Ask at the till to join when it goes live. Online and in-store orders
          will share one balance.
        </p>
      </div>
    );
  }

  const submit = async (kind: "balance" | "join") => {
    setError(null);
    setResult(null);
    setLoading(kind);
    try {
      const res = await fetch(
        kind === "balance" ? "/api/loyalty/balance" : "/api/loyalty/join",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        },
      );
      const data = (await res.json()) as {
        error?: string;
        balance?: number;
        terminology?: { one: string; other: string };
        rewardTiers?: Tier[];
        alreadyMember?: boolean;
      };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult({
        kind: kind === "balance" ? "balance" : "joined",
        balance: data.balance ?? 0,
        terminology: data.terminology,
        rewardTiers: data.rewardTiers,
        alreadyMember: data.alreadyMember,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(null);
    }
  };

  const unit = result?.terminology?.other ?? "points";

  return (
    <div className="rounded-[2rem] bg-teal p-6 text-cream sm:p-10">
      <h2 className="font-display text-5xl leading-none">Join or check points</h2>
      <label htmlFor="rewards-phone" className="mt-6 block text-sm font-extrabold text-cream/85">
        UK mobile number
      </label>
      <input
        id="rewards-phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="07xxx xxxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mt-2 w-full rounded-full border-2 border-cream/30 bg-cream px-5 py-3.5 text-lg font-bold text-ink outline-none placeholder:font-normal placeholder:text-ink/40 focus:border-cream focus:ring-4 focus:ring-cream/30"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => submit("balance")}
          disabled={!phone || loading !== null}
          className="btn-cream flex-1 disabled:opacity-50"
        >
          {loading === "balance" ? "Checking…" : "Check my points"}
        </button>
        <button
          type="button"
          onClick={() => submit("join")}
          disabled={!phone || loading !== null}
          className="btn-ghost-cream flex-1 disabled:opacity-50"
        >
          {loading === "join" ? "Joining…" : "Join free"}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-cream px-4 py-3 text-sm font-bold text-[#9b1c1c]" role="alert">
          {error}
        </p>
      )}

      {result?.kind === "balance" && (
        <div className="mt-6 rounded-[1.5rem] bg-cream p-6 text-teal" role="status">
          <p className="font-display text-5xl leading-none">
            {result.balance} {unit}
          </p>
          {result.rewardTiers && result.rewardTiers.length > 0 && (
            <ul className="mt-4 space-y-2 text-base text-ink/80">
              {result.rewardTiers.map((tier) => {
                const reach = Math.max(0, tier.points - result.balance);
                return (
                  <li key={tier.name}>
                    {reach === 0
                      ? `${tier.name}: ready to redeem`
                      : `${tier.name}: ${reach} ${unit} to go`}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {result?.kind === "joined" && (
        <div className="mt-6 rounded-[1.5rem] bg-cream p-6 text-teal" role="status">
          <h3 className="font-display text-5xl leading-none">
            {result.alreadyMember ? "Welcome back." : "You're in."}
          </h3>
          <p className="mt-3 text-base text-ink/80">
            Give your number at the till or at checkout and points add up
            automatically.
          </p>
          <p className="mt-4 font-display text-3xl">
            {result.balance} {unit}
          </p>
        </div>
      )}
    </div>
  );
}
