"use client";

import { useEffect, useRef } from "react";

type AutoVideoProps = {
  src: string;
  poster: string;
  /** Describes what the clip shows. Videos are decorative loops, so this goes on the wrapper. */
  label: string;
  /** Start loading straight away (above the fold). Otherwise loads when scrolled near. */
  eager?: boolean;
  className?: string;
};

/**
 * Muted looping clip that only plays while on screen.
 * - Off-screen clips are paused, and below-the-fold clips don't download until needed.
 * - prefers-reduced-motion: the poster frame shows and the clip never plays.
 */
export default function AutoVideo({
  src,
  poster,
  label,
  eager = false,
  className = "",
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.src = src;
      video.load();
    };

    if (eager) load();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          video.play().catch(() => {
            /* autoplay blocked: poster stays */
          });
        } else if (loaded) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, eager]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      role="img"
    />
  );
}
