export default function MenuLoading() {
  return (
    <div className="bg-[#fff2cc] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="h-12 w-48 animate-pulse rounded bg-[#0c343d]/10" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="aspect-[4/3] animate-pulse bg-[#0c343d]/10" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-2/3 animate-pulse rounded bg-[#0c343d]/10" />
                <div className="h-4 w-full animate-pulse rounded bg-[#0c343d]/5" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-[#0c343d]/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
