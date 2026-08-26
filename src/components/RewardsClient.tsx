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
      <div className="rounded-2xl bg-[#0c343d] p-8 text-center text-[#fff2cc]">
        <h2 className="font-display text-3xl">Rewards launching soon</h2>
        <p className="mt-3 text-sm text-[#fff2cc]/80">
          Ask at the till to join when it goes live — online and in-store will
          share one balance.
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
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <label htmlFor="rewards-phone" className="block text-sm font-semibold text-[#141514]">
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
        className="mt-2 w-full rounded-md border border-[#0c343d]/20 bg-[#fff2cc]/40 px-4 py-3 text-base text-[#141514] outline-none focus:border-[#0c343d] focus:ring-2 focus:ring-[#0c343d]/20"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => submit("balance")}
          disabled={!phone || loading !== null}
          className="btn-primary flex-1 normal-case disabled:opacity-50"
        >
          {loading === "balance" ? "Checking…" : "Check my points"}
        </button>
        <button
          type="button"
          onClick={() => submit("join")}
          disabled={!phone || loading !== null}
          className="btn-outline flex-1 normal-case disabled:opacity-50"
        >
          {loading === "join" ? "Joining…" : "Join free"}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      {result?.kind === "balance" && (
        <div className="mt-6 rounded-xl bg-[#0c343d] p-6 text-[#fff2cc]">
          <p className="font-display text-4xl">
            {result.balance} {unit}
          </p>
          {result.rewardTiers && result.rewardTiers.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-[#fff2cc]/85">
              {result.rewardTiers.map((tier) => {
                const reach = Math.max(0, tier.points - result.balance);
                return (
                  <li key={tier.name}>
                    {reach === 0
                      ? `${tier.name} — ready to redeem`
                      : `${tier.name} — ${reach} ${unit} to go`}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {result?.kind === "joined" && (
        <div className="mt-6 rounded-xl bg-[#0c343d] p-6 text-[#fff2cc]">
          <h3 className="font-display text-3xl">
            {result.alreadyMember ? "Welcome back." : "You're in."}
          </h3>
          <p className="mt-3 text-sm text-[#fff2cc]/85">
            Give your number at the till or at checkout and points add up
            automatically.
          </p>
          <p className="mt-4 font-display text-2xl">
            {result.balance} {unit}
          </p>
        </div>
      )}
    </div>
  );
}
