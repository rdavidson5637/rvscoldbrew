import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#fff2cc] px-4 py-20 text-center">
      <p className="font-display text-8xl text-[#0c343d]/20">404</p>
      <h1 className="mt-4 font-display text-5xl text-[#141514] sm:text-6xl">
        Wrong Turn at the Mall
      </h1>
      <p className="mt-4 max-w-md text-sm text-[#141514]/70">
        This page doesn&apos;t exist — but your daily upgrade still does.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary normal-case">
          Back Home
        </Link>
        <Link href="/builder" className="btn-outline normal-case">
          Quick Order
        </Link>
      </div>
    </div>
  );
}
