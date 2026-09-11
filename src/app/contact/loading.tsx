export default function ContactLoading() {
  return (
    <>
      <section className="bg-[#0c343d] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-4 w-24 animate-pulse rounded bg-[#fff2cc]/20" />
          <div className="mx-auto mt-6 h-16 w-80 animate-pulse rounded bg-[#fff2cc]/20" />
          <div className="mx-auto mt-6 h-6 w-full max-w-lg animate-pulse rounded bg-[#fff2cc]/10" />
        </div>
      </section>

      <section className="bg-[#fff2cc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="space-y-6 rounded-2xl border-2 border-[#0c343d]/10 bg-white p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-[#0c343d]/10" />
                  <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/5" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#0c343d]/10" />
                  <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-[#0c343d]/10" />
                <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/5" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 animate-pulse rounded bg-[#0c343d]/10" />
                <div className="h-32 w-full animate-pulse rounded-lg bg-[#0c343d]/5" />
              </div>
              <div className="h-12 w-full animate-pulse rounded-lg bg-[#0c343d]/20" />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <div className="h-48 animate-pulse rounded-2xl bg-[#0c343d]/10" />
            <div className="h-36 animate-pulse rounded-2xl bg-[#0c343d]/10" />
            <div className="h-48 animate-pulse rounded-2xl bg-[#0c343d]/5" />
          </aside>
        </div>
      </section>
    </>
  );
}
