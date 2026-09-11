import Image from "next/image";

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
  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        className={`object-cover motion-safe:hidden ${className}`}
        priority
        sizes="100vw"
      />
      <video
        className={`absolute inset-0 h-full w-full object-cover motion-reduce:hidden ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
