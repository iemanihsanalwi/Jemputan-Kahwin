import React from "react";

export interface FloralSectionDividerProps {
  className?: string;
  variant?: "gold" | "sage" | "rose" | "emerald";
  size?: "sm" | "md" | "lg";
}

/**
 * FloralSectionDivider - A centered, slender floral vine divider
 * featuring blooming jasmine/rose petals and delicate olive leaves
 * replacing rigid straight horizontal rules.
 */
export default function FloralSectionDivider({
  className = "",
  variant = "gold",
  size = "md",
}: FloralSectionDividerProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const sizeClasses = {
    sm: "w-44 h-6",
    md: "w-64 sm:w-80 h-8",
    lg: "w-80 sm:w-96 md:w-[460px] h-10",
  };

  return (
    <div
      className={`relative flex items-center justify-center my-6 select-none ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          {/* Subtle gold-to-rose gradient along horizontal axis */}
          <linearGradient id={`${idPrefix}-vine`} x1="0%" y1="0%" x2="100%" y2="0%">
            {variant === "sage" || variant === "emerald" ? (
              <>
                <stop offset="0%" stopColor="#2D5A43" stopOpacity="0" />
                <stop offset="20%" stopColor="#2D5A43" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#C5A059" />
                <stop offset="80%" stopColor="#2D5A43" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2D5A43" stopOpacity="0" />
              </>
            ) : variant === "rose" ? (
              <>
                <stop offset="0%" stopColor="#D8A49B" stopOpacity="0" />
                <stop offset="25%" stopColor="#D8A49B" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#E8C5BE" />
                <stop offset="75%" stopColor="#D8A49B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D8A49B" stopOpacity="0" />
              </>
            ) : (
              // Default gold-to-rose gradient
              <>
                <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
                <stop offset="20%" stopColor="#C5A059" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#D8A49B" />
                <stop offset="50%" stopColor="#FAF7EE" />
                <stop offset="58%" stopColor="#D8A49B" />
                <stop offset="80%" stopColor="#C5A059" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
              </>
            )}
          </linearGradient>

          {/* Radial Petal Shading */}
          <radialGradient id={`${idPrefix}-blossom`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="60%" stopColor="#E8C5BE" />
            <stop offset="100%" stopColor="#C5A059" />
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
          {/* Sinuous Left Vine Curve */}
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
          {/* Sinuous Right Vine Curve */}
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

        {/* Centerpiece: Symmetrical Blooming Flower Motif */}
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

          {/* Center Golden Pistil Core */}
          <circle cx="0" cy="0" r="3.2" fill="#FAF7EE" stroke={`url(#${idPrefix}-vine)`} strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1.5" fill="#C5A059" />
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
