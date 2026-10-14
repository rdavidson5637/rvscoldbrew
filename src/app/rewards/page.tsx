import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RewardsClient from "@/components/RewardsClient";
import Sticker from "@/components/Sticker";
import { getProgram } from "@/lib/loyalty";

export const metadata: Metadata = {
  title: "Rewards",
  description:
    "Earn points with every cup at RV's Cold Brew, online and in store, on one balance.",
  alternates: { canonical: "/rewards" },
  openGraph: {
    title: "Rewards | RV's Cold Brew",
    description:
      "Earn points with every cup at RV's Cold Brew, online and in store, on one balance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewards | RV's Cold Brew",
    description:
      "Earn points with every cup at RV's Cold Brew, online and in store, on one balance.",
  },
};

export const revalidate = 600;

export default async function RewardsPage() {
  const program = await getProgram();
  const launchingSoon = !program;

  const earnLine = program
    ? `Earn ${
        program.pointsPerPound != null
          ? `${program.pointsPerPound} ${program.terminology.other} per £1`
          : program.terminology.other
      } on every order, online and at Unit 11.`
    : "Join free and earn on every order, online and at Unit 11.";

  return (
    <div className="bg-cream">
      <PageHeader
        title="Every cup counts"
        intro={<p>{earnLine} One balance, whichever way you order.</p>}
        aside={
          <Sticker
            ring="Every cup counts • Online and in store • "
            centre={["RV's", "rewards"]}
            className="tilt w-40 [--tilt:8deg] lg:w-48"
          />
        }
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-24">
        <div className="text-teal">
          <h2 className="font-display text-5xl leading-none sm:text-6xl">How it works</h2>
          <ol className="mt-8 border-t-2 border-teal">
            {[
              "Join with your UK mobile number. It's free.",
              "Give the same number at the till, or at online checkout.",
              "Points add up automatically. Swap them for rewards when you hit a tier.",
            ].map((line, i) => (
              <li
                key={line}
                className="flex gap-5 border-b-2 border-dotted border-teal/20 py-5 text-lg leading-relaxed text-ink/85"
              >
                <span className="font-display text-4xl leading-none text-teal/40">{i + 1}</span>
                {line}
              </li>
            ))}
          </ol>

          {program && program.rewardTiers.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-4xl leading-none">Rewards</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {program.rewardTiers.map((tier) => (
                  <li
                    key={tier.name}
                    className="rounded-full border-2 border-teal px-4 py-2 font-bold"
                  >
                    {tier.name}
                    <span className="ml-2 text-ink/60">
                      {tier.points} {program.terminology.other}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <RewardsClient launchingSoon={launchingSoon} />
        </div>
      </section>
    </div>
  );
}
