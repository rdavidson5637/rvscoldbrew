export default function ProcessLoading() {
  return (
    <>
      <section className="bg-[#0c343d] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-20 w-64 animate-pulse rounded bg-[#fff2cc]/20" />
          <div className="mx-auto mt-5 h-6 w-full max-w-md animate-pulse rounded bg-[#fff2cc]/10" />
        </div>
      </section>

      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl space-y-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 sm:gap-8">
              <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-[#0c343d]/10 sm:h-20 sm:w-20" />
              <div className="flex-1 space-y-3 pt-1">
                <div className="h-10 w-40 animate-pulse rounded bg-[#0c343d]/10" />
                <div className="h-4 w-48 animate-pulse rounded bg-[#0c343d]/5" />
                <div className="h-4 w-full animate-pulse rounded bg-[#0c343d]/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
