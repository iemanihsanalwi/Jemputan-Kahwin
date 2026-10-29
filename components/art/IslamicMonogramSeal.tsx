import React from "react";

interface IslamicMonogramSealProps {
  initials?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "couple" | "groom" | "bride";
}

/**
 * IslamicMonogramSeal - Pure vector royal seal & medallion
 * Replaces raster photos with an Islamic heraldic monogram crest
 */
export default function IslamicMonogramSeal({
  initials = "I & A",
  subtitle = "Walimatulurus",
  size = "lg",
  className = "",
  variant = "couple",
}: IslamicMonogramSealProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const sizeMap = {
    sm: "w-24 h-24",
    md: "w-36 h-36 sm:w-40 sm:h-40",
    lg: "w-44 h-44 sm:w-52 sm:h-52",
    xl: "w-56 h-56 sm:w-64 sm:h-64",
  };

  const textSizes = {
    sm: "text-lg font-serif",
    md: "text-2xl font-serif",
    lg: "text-3xl sm:text-4xl font-serif",
    xl: "text-4xl sm:text-5xl font-serif",
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Outer Pulse Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-amber-400 opacity-30 blur-md animate-pulse-subtle" />

      {/* SVG Royal Seal Medallion */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A1" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FAF0CA" />
            <stop offset="75%" stopColor="#B88E28" />
            <stop offset="100%" stopColor="#7A5716" />
          </linearGradient>

          <radialGradient id={`${idPrefix}-centerBg`} cx="50%" cy="45%" r="60%">
            {variant === "groom" ? (
              <>
                <stop offset="0%" stopColor="#1B4D3E" />
                <stop offset="65%" stopColor="#0B2B20" />
                <stop offset="100%" stopColor="#04120E" />
              </>
            ) : variant === "bride" ? (
              <>
                <stop offset="0%" stopColor="#2E4F44" />
                <stop offset="65%" stopColor="#14362B" />
                <stop offset="100%" stopColor="#091F18" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#144634" />
                <stop offset="70%" stopColor="#091F18" />
                <stop offset="100%" stopColor="#04120E" />
              </>
            )}
          </radialGradient>
        </defs>

        {/* Outer Arabesque Floral Ring */}
        <circle cx="100" cy="100" r="94" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="100" cy="100" r="88" stroke={`url(#${idPrefix}-gold)`} strokeWidth="2.5" />

        {/* 12 Outer Petal Accents */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 30} 100 100)`}>
            <circle cx="100" cy="9" r="2.5" fill={`url(#${idPrefix}-gold)`} />
            <path d="M 96 14 C 98 10, 102 10, 104 14" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" />
          </g>
        ))}

        {/* Geometric Islamic Starburst Layer (Interlocking Squares) */}
        <rect
          x="35"
          y="35"
          width="130"
          height="130"
          rx="12"
          fill="none"
          stroke={`url(#${idPrefix}-gold)`}
          strokeWidth="1.2"
          opacity="0.45"
        />
        <rect
          x="35"
          y="35"
          width="130"
          height="130"
          rx="12"
          fill="none"
          stroke={`url(#${idPrefix}-gold)`}
          strokeWidth="1.2"
          opacity="0.45"
          transform="rotate(45 100 100)"
        />

        {/* Medallion Core Disc (Emerald Sanctuary) */}
        <circle cx="100" cy="100" r="72" fill={`url(#${idPrefix}-centerBg)`} stroke={`url(#${idPrefix}-gold)`} strokeWidth="2.5" />
        <circle cx="100" cy="100" r="66" fill="none" stroke={`url(#${idPrefix}-gold)`} strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />

        {/* Inner Arabesque Leaf Arc Accents */}
        <path d="M 60 100 C 60 78, 78 60, 100 60" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M 140 100 C 140 122, 122 140, 100 140" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" fill="none" opacity="0.4" />
      </svg>

      {/* Center Monogram Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10 pointer-events-none">
        <span
          className={`font-serif font-bold tracking-wider leading-none text-gold-gradient drop-shadow-md ${textSizes[size]}`}
        >
          {initials}
        </span>

        {subtitle && size !== "sm" && (
          <span className="mt-1 font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-300 font-medium opacity-90">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

