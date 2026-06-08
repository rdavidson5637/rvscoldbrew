import { LOCATION } from "@/lib/brand";

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#fff2cc]/15">
      <iframe
        title={`Map showing ${LOCATION.name}, Belfast`}
        src={`https://maps.google.com/maps?q=${LOCATION.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="280"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full border-0"
      />
      <div className="flex items-center justify-between gap-4 border-t border-[#fff2cc]/10 bg-[#fff2cc]/5 px-4 py-3">
        <p className="text-xs text-[#fff2cc]/80">{LOCATION.full}</p>
        <a
          href={LOCATION.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-[#fff2cc] underline-offset-2 hover:underline"
        >
          Get directions →
        </a>
      </div>
    </div>
  );
}
