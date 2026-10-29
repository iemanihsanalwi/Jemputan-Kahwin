import React from "react";

export interface FloralWreathHeaderProps {
  initials?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "couple" | "groom" | "bride";
}

/**
 * FloralWreathHeader - A circular botanical wreath featuring stylized
 * olive branches, blooming jasmine, and delicate petals framing the couple's monogram typography.
 */
export default function FloralWreathHeader({
  initials = "I & A",
  subtitle = "Walimatulurus",
  size = "lg",
  className = "",
  variant = "couple",
}: FloralWreathHeaderProps) {
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
    <div
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      aria-label={`${initials} ${subtitle}`}
    >
      {/* Outer Soft Botanical Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-300/30 via-blush-300/30 to-sage-300/30 opacity-40 blur-md animate-pulse-subtle" />

      {/* Pure SVG Botanical Wreath Medallion */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Gold to Rose Gradient for Stems and Outlines */}
          <linearGradient id={`${idPrefix}-wreathGold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF7EE" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="60%" stopColor="#C5A059" />
            <stop offset="85%" stopColor="#D8A49B" />
            <stop offset="100%" stopColor="#86652C" />
          </linearGradient>

          {/* Soft Petal Shading */}
          <linearGradient id={`${idPrefix}-petalShade`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E8C5BE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.9" />
          </linearGradient>

          {/* Deep Forest Sage / Velvet Background for the Inner Medallion */}
          <radialGradient id={`${idPrefix}-centerBg`} cx="50%" cy="45%" r="65%">
            {variant === "groom" ? (
              <>
                <stop offset="0%" stopColor="#2D5A43" />
                <stop offset="70%" stopColor="#183024" />
                <stop offset="100%" stopColor="#0C1913" />
              </>
            ) : variant === "bride" ? (
              <>
                <stop offset="0%" stopColor="#3E5C49" />
                <stop offset="60%" stopColor="#224433" />
                <stop offset="100%" stopColor="#183024" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#2D5A43" />
                <stop offset="65%" stopColor="#183024" />
                <stop offset="100%" stopColor="#0C1913" />
              </>
            )}
          </radialGradient>
        </defs>

        {/* Outer Delicate Dewdrop Ring */}
        <circle
          cx="100"
          cy="100"
          r="94"
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.45"
        />

        {/* Primary Circular Vine Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Inner Sanctuary Disc (Deep Velvet Botanical Sage) */}
        <circle
          cx="100"
          cy="100"
          r="72"
          fill={`url(#${idPrefix}-centerBg)`}
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="2.2"
        />

        {/* Inner Beaded Contour */}
        <circle
          cx="100"
          cy="100"
          r="66"
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.6"
        />

        {/* Symmetrical Left Botanical Olive Branch */}
        <g stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Left Sweeping Branch */}
          <path d="M 100 188 C 50 186, 12 148, 12 100 C 12 56, 48 18, 96 12" fill="none" />

          {/* Left Leaf Clusters along the curvature */}
          {/* Pair 1 - Lower */}
          <path d="M 38 152 C 28 150, 24 160, 32 164 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 44 146 C 42 136, 52 134, 52 144 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 2 - Mid Lower */}
          <path d="M 16 118 C 6 114, 4 124, 12 128 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 22 110 C 22 100, 32 100, 30 110 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 3 - Mid Upper */}
          <path d="M 16 82 C 6 86, 4 76, 12 72 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 24 88 C 24 98, 34 98, 32 88 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 4 - Upper */}
          <path d="M 38 48 C 28 50, 26 40, 34 36 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 46 54 C 44 64, 54 66, 54 56 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 5 - Apex */}
          <path d="M 74 24 C 70 14, 80 12, 82 22 Z" fill={`url(#${idPrefix}-petalShade)`} />
        </g>

        {/* Symmetrical Right Botanical Olive Branch */}
        <g stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Right Sweeping Branch */}
          <path d="M 100 188 C 150 186, 188 148, 188 100 C 188 56, 152 18, 104 12" fill="none" />

          {/* Right Leaf Clusters along the curvature */}
          {/* Pair 1 - Lower */}
          <path d="M 162 152 C 172 150, 176 160, 168 164 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 156 146 C 158 136, 148 134, 148 144 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 2 - Mid Lower */}
          <path d="M 184 118 C 194 114, 196 124, 188 128 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 178 110 C 178 100, 168 100, 170 110 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 3 - Mid Upper */}
          <path d="M 184 82 C 194 86, 196 76, 188 72 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 176 88 C 176 98, 166 98, 168 88 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 4 - Upper */}
          <path d="M 162 48 C 172 50, 174 40, 166 36 Z" fill={`url(#${idPrefix}-petalShade)`} />
          <path d="M 154 54 C 156 64, 146 66, 146 56 Z" fill={`url(#${idPrefix}-petalShade)`} />

          {/* Pair 5 - Apex */}
          <path d="M 126 24 C 130 14, 120 12, 118 22 Z" fill={`url(#${idPrefix}-petalShade)`} />
        </g>

        {/* Lower Junction Blossom (Jasmine Flower) */}
        <g transform="translate(100, 188)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <path
              key={i}
              d="M 0 0 C -3 -8, 3 -8, 0 0 Z"
              transform={`rotate(${angle})`}
              fill={`url(#${idPrefix}-petalShade)`}
              stroke={`url(#${idPrefix}-wreathGold)`}
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-wreathGold)`} />
        </g>

        {/* Upper Apex Blossom (Delicate Jasmine Crest) */}
        <g transform="translate(100, 12)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <path
              key={i}
              d="M 0 0 C -3 -8, 3 -8, 0 0 Z"
              transform={`rotate(${angle})`}
              fill={`url(#${idPrefix}-petalShade)`}
              stroke={`url(#${idPrefix}-wreathGold)`}
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-wreathGold)`} />
        </g>

        {/* Delicate Dewdrop Accents */}
        <circle cx="48" cy="100" r="2" fill={`url(#${idPrefix}-wreathGold)`} opacity="0.6" />
        <circle cx="152" cy="100" r="2" fill={`url(#${idPrefix}-wreathGold)`} opacity="0.6" />
        <circle cx="100" cy="48" r="2" fill={`url(#${idPrefix}-wreathGold)`} opacity="0.6" />
        <circle cx="100" cy="152" r="2" fill={`url(#${idPrefix}-wreathGold)`} opacity="0.6" />
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
