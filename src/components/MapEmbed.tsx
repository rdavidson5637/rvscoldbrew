import { LOCATION } from "@/lib/brand";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative min-h-[22rem] overflow-hidden border-2 border-teal bg-teal/5 ${className}`}
    >
      <iframe
        title={`Map showing ${LOCATION.name}, Belfast`}
        src={`https://maps.google.com/maps?q=${LOCATION.mapsQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[15%]"
      />
    </div>
  );
}
