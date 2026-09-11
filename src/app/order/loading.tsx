export default function OrderLoading() {
  return (
    <main className="bg-[#fff2cc] text-[#141514]">
      <section className="bg-[#0c343d] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-14 w-72 animate-pulse rounded bg-[#fff2cc]/20" />
          <div className="mx-auto mt-4 h-6 w-full max-w-md animate-pulse rounded bg-[#fff2cc]/10" />
          <div className="mx-auto mt-8 h-12 w-40 animate-pulse rounded-md bg-[#fff2cc]/20" />
        </div>
      </section>

      <div className="bg-[#141514] px-4 py-3 sm:px-6">
        <div className="mx-auto h-4 w-48 animate-pulse rounded bg-[#fff2cc]/20" />
      </div>

      <section className="px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
        <div className="mx-auto mt-10 h-44 max-w-4xl animate-pulse rounded-2xl bg-[#0c343d]/10" />
      </section>
    </main>
  );
}
