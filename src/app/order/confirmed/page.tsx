import Link from "next/link";
import ClearCart from "@/components/ClearCart";
import { LOCATION } from "@/lib/brand";

export default function OrderConfirmedPage() {
  return (
    <main className="bg-[#fff2cc] px-4 py-20 text-center sm:px-6 lg:py-28">
      <ClearCart />
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-5xl text-[#141514] sm:text-6xl">
          Order received.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#141514]/80">
          We&apos;ll have it ready at {LOCATION.unit}, {LOCATION.name}. Your
          receipt comes from Square by email.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/menu" className="btn-primary normal-case">
            Back to Menu
          </Link>
          <Link href="/" className="btn-outline normal-case">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
