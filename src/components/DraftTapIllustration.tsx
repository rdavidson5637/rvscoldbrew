export default function DraftTapIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 420 470"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] ${className}`}
    >
      <defs>
        <linearGradient id="chrome" x1="0" x2="1">
          <stop offset="0" stopColor="#6f8582" />
          <stop offset=".12" stopColor="#c3cdca" />
          <stop offset=".28" stopColor="#fdfaf0" />
          <stop offset=".42" stopColor="#e3e8e4" />
          <stop offset=".6" stopColor="#9fb1ae" />
          <stop offset=".8" stopColor="#e2e7e3" />
          <stop offset="1" stopColor="#6f8582" />
        </linearGradient>
        <linearGradient id="chromeV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfaf0" />
          <stop offset=".5" stopColor="#c9d2cf" />
          <stop offset="1" stopColor="#7d918e" />
        </linearGradient>
        <radialGradient id="knob" cx=".35" cy=".35" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".45" stopColor="#d6ddd9" />
          <stop offset="1" stopColor="#6f8582" />
        </radialGradient>
        <linearGradient id="hCream" x1="0" x2="1">
          <stop offset="0" stopColor="#e6d6a6" />
          <stop offset=".35" stopColor="#fff8e0" />
          <stop offset="1" stopColor="#d9c690" />
        </linearGradient>
        <linearGradient id="hTeal" x1="0" x2="1">
          <stop offset="0" stopColor="#04161b" />
          <stop offset=".35" stopColor="#145060" />
          <stop offset="1" stopColor="#061d23" />
        </linearGradient>
        <pattern
          id="frost"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="4" r="1.1" fill="#fff" />
          <circle cx="10" cy="9" r=".8" fill="#fff" />
          <circle cx="7" cy="12" r=".6" fill="#fff" />
          <circle cx="12" cy="2" r=".5" fill="#fff" />
        </pattern>
        <linearGradient id="frostFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>
        <mask id="frostMask">
          <rect x="0" y="0" width="420" height="470" fill="url(#frostFade)" />
        </mask>
        <clipPath id="col">
          <path d="M152 150 Q152 78 210 78 Q268 78 268 150 V414 H152 Z" />
        </clipPath>
      </defs>

      {/* floor shadow */}
      <ellipse cx="210" cy="458" rx="150" ry="10" fill="#000" opacity=".28" />

      {/* drip tray */}
      <rect x="84" y="438" width="252" height="18" rx="9" fill="url(#chromeV)" />
      <rect
        x="98"
        y="442"
        width="224"
        height="8"
        rx="4"
        fill="#4c605d"
        opacity=".55"
      />
      <g stroke="#e3e8e4" strokeWidth="2" opacity=".55">
        <line x1="112" y1="443" x2="112" y2="449" />
        <line x1="126" y1="443" x2="126" y2="449" />
        <line x1="140" y1="443" x2="140" y2="449" />
        <line x1="154" y1="443" x2="154" y2="449" />
        <line x1="168" y1="443" x2="168" y2="449" />
        <line x1="182" y1="443" x2="182" y2="449" />
        <line x1="196" y1="443" x2="196" y2="449" />
        <line x1="210" y1="443" x2="210" y2="449" />
        <line x1="224" y1="443" x2="224" y2="449" />
        <line x1="238" y1="443" x2="238" y2="449" />
        <line x1="252" y1="443" x2="252" y2="449" />
        <line x1="266" y1="443" x2="266" y2="449" />
        <line x1="280" y1="443" x2="280" y2="449" />
        <line x1="294" y1="443" x2="294" y2="449" />
        <line x1="308" y1="443" x2="308" y2="449" />
      </g>

      {/* base flange */}
      <ellipse cx="210" cy="430" rx="88" ry="12" fill="#7d918e" />
      <ellipse cx="210" cy="426" rx="88" ry="12" fill="url(#chrome)" />
      <rect x="146" y="408" width="128" height="16" rx="5" fill="url(#chrome)" />
      <rect x="146" y="408" width="128" height="3" fill="#fff" opacity=".45" />

      {/* column */}
      <path
        d="M152 150 Q152 78 210 78 Q268 78 268 150 V414 H152 Z"
        fill="url(#chrome)"
      />
      <g clipPath="url(#col)">
        <rect
          x="150"
          y="70"
          width="120"
          height="350"
          fill="url(#frost)"
          opacity=".45"
          mask="url(#frostMask)"
        />
        <rect x="176" y="70" width="9" height="350" fill="#fff" opacity=".55" />
        <rect x="190" y="70" width="3" height="350" fill="#fff" opacity=".35" />
        <rect x="246" y="70" width="5" height="350" fill="#fff" opacity=".22" />
        <ellipse cx="196" cy="96" rx="22" ry="10" fill="#fff" opacity=".5" />
      </g>
      {/* collar ring under the dome */}
      <rect
        x="150"
        y="146"
        width="120"
        height="8"
        rx="4"
        fill="url(#chromeV)"
        opacity=".9"
      />

      {/* left tap: cold brew */}
      <g>
        <path
          d="M168 86 Q168 74 183 74 Q198 74 198 86 L195 168 Q195 172 191 172 H175 Q171 172 171 168 Z"
          fill="url(#hCream)"
          stroke="#0c343d"
          strokeOpacity=".3"
          strokeWidth="1"
        />
        <rect
          x="170"
          y="96"
          width="26"
          height="62"
          fill="#0c343d"
          opacity=".9"
        />
        <text
          x="183"
          y="129"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="700"
          fontSize="7.5"
          letterSpacing=".3"
          fill="#fff2cc"
          transform="rotate(-90 183 126)"
        >
          COLD BREW
        </text>
        <rect x="175" y="172" width="16" height="10" rx="2" fill="url(#chrome)" />
        <rect x="178" y="182" width="10" height="8" fill="#9fb1ae" />
        <circle
          cx="183"
          cy="204"
          r="17"
          fill="url(#chromeV)"
          stroke="#6f8582"
          strokeWidth="1.5"
        />
        <circle cx="183" cy="204" r="11" fill="url(#knob)" />
        <path
          d="M176 210 h14 v12 q0 6 -5 7 v20 q0 4 -2 4 q-2 0 -2 -4 v-20 q-5 -1 -5 -7z"
          fill="url(#chrome)"
          stroke="#6f8582"
          strokeWidth=".8"
        />
        <ellipse
          className="tap-drip"
          cx="183"
          cy="262"
          rx="2.6"
          ry="3.6"
          fill="#5a3520"
        />
      </g>

      {/* right tap: nitro */}
      <g>
        <path
          d="M222 86 Q222 74 237 74 Q252 74 252 86 L249 168 Q249 172 245 172 H229 Q225 172 225 168 Z"
          fill="url(#hTeal)"
          stroke="#fff2cc"
          strokeWidth="2"
        />
        <rect
          x="224"
          y="96"
          width="26"
          height="62"
          fill="#fff2cc"
          opacity=".95"
        />
        <text
          x="237"
          y="129"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="700"
          fontSize="7.5"
          letterSpacing=".3"
          fill="#0c343d"
          transform="rotate(-90 237 126)"
        >
          NITRO
        </text>
        <rect x="229" y="172" width="16" height="10" rx="2" fill="url(#chrome)" />
        <rect x="232" y="182" width="10" height="8" fill="#9fb1ae" />
        <circle
          cx="237"
          cy="204"
          r="17"
          fill="url(#chromeV)"
          stroke="#6f8582"
          strokeWidth="1.5"
        />
        <circle cx="237" cy="204" r="11" fill="url(#knob)" />
        <path
          d="M228 210 h18 v10 q0 7 -6 8 v28 q0 5 -3 5 q-3 0 -3 -5 v-28 q-6 -1 -6 -8z"
          fill="url(#chrome)"
          stroke="#6f8582"
          strokeWidth=".8"
        />
        <rect x="234" y="258" width="6" height="4" rx="1" fill="#6f8582" />
      </g>
    </svg>
  );
}
