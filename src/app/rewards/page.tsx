import type { Metadata } from "next";
import RewardsClient from "@/components/RewardsClient";
import { getProgram } from "@/lib/loyalty";

export const metadata: Metadata = {
  title: "Rewards",
  description:
    "Earn points with every cup at RV's Cold Brew — online and in-store, one balance.",
  alternates: { canonical: "/rewards" },
  openGraph: {
    title: "Rewards | RV's Cold Brew",
    description:
      "Earn points with every cup at RV's Cold Brew — online and in-store, one balance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewards | RV's Cold Brew",
    description:
      "Earn points with every cup at RV's Cold Brew — online and in-store, one balance.",
  },
};

export const revalidate = 600;

export default async function RewardsPage() {
  const program = await getProgram();
  const launchingSoon = !program;

  return (
    <main className="bg-[#fff2cc]">
      <section className="bg-[#0c343d] px-4 py-16 text-[#fff2cc] sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl">
            Every cup counts.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#fff2cc]/85 sm:text-base">
            {program
              ? `Earn ${
                  program.pointsPerPound != null
                    ? `${program.pointsPerPound} ${program.terminology.other} per £1`
                    : program.terminology.other
                } on every order — online and at Unit 11.`
              : "Join free and earn on every order — online and at Unit 11."}
          </p>
          {program && program.rewardTiers.length > 0 && (
            <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3 text-sm">
              {program.rewardTiers.map((tier) => (
                <li
                  key={tier.name}
                  className="rounded-md border border-[#fff2cc]/25 px-3 py-2 text-[#fff2cc]/90"
                >
                  {tier.points} {program.terminology.other} → {tier.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-lg">
          <RewardsClient launchingSoon={launchingSoon} />
        </div>
      </section>
    </main>
  );
}
