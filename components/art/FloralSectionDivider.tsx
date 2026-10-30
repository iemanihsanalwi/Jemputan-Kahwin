import React from "react";

export interface FloralSectionDividerProps {
  className?: string;
  variant?: "rose" | "gold" | "mulberry";
  size?: "sm" | "md" | "lg";
}

/**
 * FloralSectionDivider - A strictly centered, slender floral vine divider
 * featuring blooming rose petals and delicate leaves in romantic rose gold and dusty rose.
 * 
 * Strict Centering:
 * - width: 100%
 * - max-width: 220px
 * - margin: 0.75rem auto
 * - display: block
 * - preserveAspectRatio: "xMidYMid meet"
 */
export default function FloralSectionDivider({
  className = "",
  variant = "rose",
  size = "md",
}: FloralSectionDividerProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const maxWidthClasses = {
    sm: "max-w-[160px] h-5",
    md: "max-w-[220px] h-6",
    lg: "max-w-[280px] h-7",
  };

  return (
    <div
      className={`w-full mx-auto my-3 flex items-center justify-center select-none ${maxWidthClasses[size]} ${className}`}
      style={{
        display: "block",
        margin: "0.75rem auto",
        width: "100%",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 50"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block mx-auto drop-shadow-xs"
      >
        <defs>
          {/* Subtle rose-gold to dusty-rose gradient along horizontal axis */}
          <linearGradient id={`${idPrefix}-vine`} x1="0%" y1="0%" x2="100%" y2="0%">
            {variant === "gold" ? (
              <>
                <stop offset="0%" stopColor="#D4A373" stopOpacity="0" />
                <stop offset="25%" stopColor="#D4A373" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E2B686" />
                <stop offset="75%" stopColor="#D4A373" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4A373" stopOpacity="0" />
              </>
            ) : variant === "mulberry" ? (
              <>
                <stop offset="0%" stopColor="#B56576" stopOpacity="0" />
                <stop offset="25%" stopColor="#B56576" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#D88A96" />
                <stop offset="75%" stopColor="#B56576" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B56576" stopOpacity="0" />
              </>
            ) : (
              // Default Rose Gold & Dusty Rose
              <>
                <stop offset="0%" stopColor="#D88A96" stopOpacity="0" />
                <stop offset="20%" stopColor="#D88A96" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#D4A373" />
                <stop offset="50%" stopColor="#FAF0F2" />
                <stop offset="58%" stopColor="#D4A373" />
                <stop offset="80%" stopColor="#D88A96" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#D88A96" stopOpacity="0" />
              </>
            )}
          </linearGradient>

          {/* Radial Petal Shading */}
          <radialGradient id={`${idPrefix}-blossom`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FADBD8" />
            <stop offset="85%" stopColor="#D88A96" />
            <stop offset="100%" stopColor="#D4A373" />
          </radialGradient>
        </defs>

        {/* Left Tapering Stem Rule */}
        <path
          d="M 15 25 Q 110 24, 205 25"
          stroke={`url(#${idPrefix}-vine)`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Right Tapering Stem Rule */}
        <path
          d="M 295 25 Q 390 24, 485 25"
          stroke={`url(#${idPrefix}-vine)`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Left Side Organic Foliage & Tendrils */}
        <g stroke={`url(#${idPrefix}-vine)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 205 25 C 215 23, 225 17, 235 20 C 242 22, 245 28, 239 33 C 234 37, 226 33, 230 26" />

          {/* Left Leaf Pair */}
          <path
            d="M 218 20 C 220 12, 228 12, 226 21 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1.2"
          />
          <path
            d="M 210 26 C 212 34, 220 33, 218 25 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1.2"
          />

          {/* Left Bud Flare */}
          <path
            d="M 239 19 C 243 14, 248 16, 245 21 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1"
          />
        </g>

        {/* Right Side Organic Foliage & Tendrils */}
        <g stroke={`url(#${idPrefix}-vine)`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 295 25 C 285 23, 275 17, 265 20 C 258 22, 255 28, 261 33 C 266 37, 274 33, 270 26" />

          {/* Right Leaf Pair */}
          <path
            d="M 282 20 C 280 12, 272 12, 274 21 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1.2"
          />
          <path
            d="M 290 26 C 288 34, 280 33, 282 25 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1.2"
          />

          {/* Right Bud Flare */}
          <path
            d="M 261 19 C 257 14, 252 16, 255 21 Z"
            fill={`url(#${idPrefix}-blossom)`}
            strokeWidth="1"
          />
        </g>

        {/* Centerpiece: Symmetrical Blooming Flower Motif (Center at X=250, Y=25) */}
        <g transform="translate(250, 25)">
          {/* Outer Petals Ring */}
          <circle cx="0" cy="0" r="14" stroke={`url(#${idPrefix}-vine)`} strokeWidth="1" opacity="0.35" fill="none" strokeDasharray="2 2" />

          {/* 8 Floral Bloom Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d="M 0 0 C -4 -11, 4 -11, 0 0 Z"
                fill={`url(#${idPrefix}-blossom)`}
                stroke={`url(#${idPrefix}-vine)`}
                strokeWidth="1"
                opacity={i % 2 === 0 ? "0.95" : "0.75"}
              />
            </g>
          ))}

          {/* Center Golden/Mulberry Pistil Core */}
          <circle cx="0" cy="0" r="3.2" fill="#FAF0F2" stroke={`url(#${idPrefix}-vine)`} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1.5" fill="#D4A373" />
        </g>

        {/* Lateral Decorative Dewdrop Accents */}
        <circle cx="150" cy="25" r="2.2" fill={`url(#${idPrefix}-vine)`} />
        <circle cx="350" cy="25" r="2.2" fill={`url(#${idPrefix}-vine)`} />
        <circle cx="95" cy="25" r="1.5" fill={`url(#${idPrefix}-vine)`} opacity="0.7" />
        <circle cx="405" cy="25" r="1.5" fill={`url(#${idPrefix}-vine)`} opacity="0.7" />
      </svg>
    </div>
  );
}
