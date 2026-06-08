export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-[#fff2cc]">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0c343d]/20 border-t-[#0c343d]"
          aria-hidden
        />
        <p className="mt-4 font-display text-2xl text-[#141514]">Brewing…</p>
      </div>
    </div>
  );
}
