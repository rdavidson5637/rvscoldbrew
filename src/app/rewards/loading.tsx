export default function RewardsLoading() {
  return (
    <main className="bg-[#fff2cc]">
      <section className="bg-[#0c343d] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-16 w-80 animate-pulse rounded bg-[#fff2cc]/20" />
          <div className="mx-auto mt-4 h-6 w-full max-w-md animate-pulse rounded bg-[#fff2cc]/10" />
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-36 animate-pulse rounded-md bg-[#fff2cc]/10"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-lg">
          <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
            <div className="h-8 w-40 animate-pulse rounded bg-[#0c343d]/10" />
            <div className="h-4 w-full animate-pulse rounded bg-[#0c343d]/5" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/10" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/20" />
          </div>
        </div>
      </section>
    </main>
  );
}
