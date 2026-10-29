import React from "react";

interface ArabesqueCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "all";
  size?: number;
  className?: string;
  variant?: "gold" | "emerald";
}

/**
 * ArabesqueCorner - Intricate floral mandala corners for card containers.
 * Renders exquisite gold arabesque corner flourishes.
 */
export default function ArabesqueCorner({
  position = "top-left",
  size = 56,
  className = "",
  variant = "gold",
}: ArabesqueCornerProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const CornerSvg = ({ transform = "" }: { transform?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
      className="drop-shadow-xs pointer-events-none"
    >
      <defs>
        <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          {variant === "emerald" ? (
            <>
              <stop offset="0%" stopColor="#A3B899" />
              <stop offset="35%" stopColor="#1B4D3E" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#091F18" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#F5E6BE" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#B88E28" />
              <stop offset="100%" stopColor="#875E19" />
            </>
          )}
        </linearGradient>
      </defs>

      <g stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Frame Edge */}
        <path d="M 6 85 L 6 18 C 6 11, 11 6, 18 6 L 85 6" />
        <path d="M 14 75 L 14 22 C 14 18, 18 14, 22 14 L 75 14" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />

        {/* Central Mandala Arabesque Fan */}
        <path d="M 14 14 C 28 20, 36 36, 42 52 C 48 36, 56 20, 70 14" fill="none" opacity="0.85" />
        <path d="M 14 70 C 20 56, 36 48, 52 42 C 36 36, 20 28, 14 14" fill="none" opacity="0.85" />

        {/* Diagonal Focal Vine */}
        <path d="M 18 18 C 30 30, 40 40, 58 58" strokeWidth="2.2" />

        {/* Petal Flourishes */}
        <path
          d="M 38 38 C 42 30, 48 32, 45 42 C 42 45, 34 42, 38 38 Z"
          fill={`url(#${idPrefix}-gold)`}
          opacity="0.8"
        />
        <path
          d="M 28 28 C 30 22, 35 24, 33 30 C 31 32, 26 30, 28 28 Z"
          fill={`url(#${idPrefix}-gold)`}
          opacity="0.8"
        />

        {/* Leaf Tendrils */}
        <path d="M 46 22 C 54 20, 60 26, 62 34" strokeWidth="1.3" opacity="0.75" />
        <path d="M 22 46 C 20 54, 26 60, 34 62" strokeWidth="1.3" opacity="0.75" />

        {/* Beaded Accents */}
        <circle cx="58" cy="58" r="3" fill={`url(#${idPrefix}-gold)`} />
        <circle cx="62" cy="34" r="2" fill={`url(#${idPrefix}-gold)`} />
        <circle cx="34" cy="62" r="2" fill={`url(#${idPrefix}-gold)`} />
        <circle cx="8" cy="8" r="3.5" fill={`url(#${idPrefix}-gold)`} />
      </g>
    </svg>
  );

  if (position === "all") {
    return (
      <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
        <div className="absolute left-1.5 top-1.5">
          <CornerSvg />
        </div>
        <div className="absolute right-1.5 top-1.5">
          <CornerSvg transform="scale(-1, 1)" />
        </div>
        <div className="absolute bottom-1.5 left-1.5">
          <CornerSvg transform="scale(1, -1)" />
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          <CornerSvg transform="scale(-1, -1)" />
        </div>
      </div>
    );
  }

  const transformMap = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  return (
    <div className={`inline-block ${className}`}>
      <CornerSvg transform={transformMap[position]} />
    </div>
  );
}

