"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-[#fff2cc] px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-5xl text-[#141514]">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-[#141514]/70">
        Please try again. If ordering is down, pop into Unit 11 and we&apos;ll sort
        you out.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="btn-primary normal-case">
          Try again
        </button>
        <Link href="/" className="btn-outline normal-case">
          Home
        </Link>
      </div>
    </main>
  );
}
