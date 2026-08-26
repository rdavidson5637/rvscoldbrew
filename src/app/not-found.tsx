import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#fff2cc] px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-5xl text-[#141514]">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-[#141514]/70">
        That link doesn&apos;t lead anywhere. Try the menu or head home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/menu" className="btn-primary normal-case">
          See the Menu
        </Link>
        <Link href="/" className="btn-outline normal-case">
          Home
        </Link>
      </div>
    </main>
  );
}
