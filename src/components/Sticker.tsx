import { useId } from "react";

type StickerProps = {
  /** Text set around the edge of the sticker */
  ring: string;
  /** Big text in the middle (one or two short lines) */
  centre: [string, string?];
  className?: string;
};

/**
 * Round sticker in the style of the RV's cup label: ink disc, cream rim,
 * text running round the edge. Purely decorative.
 */
export default function Sticker({ ring, centre, className = "" }: StickerProps) {
  const id = useId().replace(/:/g, "");
  const pathId = `ring-${id}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="100" cy="100" r="98" fill="var(--cream)" />
      <circle cx="100" cy="100" r="91" fill="var(--black)" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--cream)" strokeWidth="2" />
      <defs>
        <path
          id={pathId}
          d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
        />
      </defs>
      <text
        fill="var(--cream)"
        style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif" }}
        fontSize="22"
      >
        <textPath href={`#${pathId}`} startOffset="0" textLength={446} lengthAdjust="spacing">
          {ring}
        </textPath>
      </text>
      <text
        x="100"
        y={centre[1] ? 96 : 112}
        textAnchor="middle"
        fill="var(--cream)"
        style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif" }}
        fontSize={centre[1] ? 40 : 48}
      >
        {centre[0]}
      </text>
      {centre[1] && (
        <text
          x="100"
          y="128"
          textAnchor="middle"
          fill="var(--cream)"
          style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif" }}
          fontSize="24"
          letterSpacing="2"
        >
          {centre[1]}
        </text>
      )}
    </svg>
  );
}
