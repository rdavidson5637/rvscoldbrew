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
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#fff2cc] px-4 py-20 text-center">
      <h1 className="font-display text-5xl text-[#141514] sm:text-6xl">
        Something Spilled
      </h1>
      <p className="mt-4 max-w-md text-sm text-[#141514]/70">
        A quick hiccup on our end. Give it another go — your upgrade is still
        waiting.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="btn-primary normal-case">
          Try Again
        </button>
        <Link href="/" className="btn-outline normal-case">
          Back Home
        </Link>
      </div>
    </div>
  );
}
