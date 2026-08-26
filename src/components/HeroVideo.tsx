"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroVideoProps = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
};

export default function HeroVideo({
  src,
  poster,
  alt,
  className = "",
}: HeroVideoProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority
        sizes="100vw"
      />
    );
  }

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
