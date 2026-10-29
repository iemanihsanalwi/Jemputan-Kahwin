import React from "react";

export interface BotanicalCornerFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "all";
  size?: number;
  className?: string;
  variant?: "gold" | "sage" | "rose" | "emerald";
}

/**
 * BotanicalCornerFlourish - Hand-crafted SVG path corners depicting winding vines,
 * delicate olive leaves, and asymmetrical floral buds for cards and modals.
 */
export default function BotanicalCornerFlourish({
  position = "top-left",
  size = 56,
  className = "",
  variant = "gold",
}: BotanicalCornerFlourishProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const CornerSvg = ({ transform = "" }: { transform?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform }}
      className="drop-shadow-xs pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${idPrefix}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          {variant === "sage" || variant === "emerald" ? (
            <>
              <stop offset="0%" stopColor="#7CA58A" />
              <stop offset="45%" stopColor="#2D5A43" />
              <stop offset="85%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#3E5C49" />
            </>
          ) : variant === "rose" ? (
            <>
              <stop offset="0%" stopColor="#E8C5BE" />
              <stop offset="50%" stopColor="#D8A49B" />
              <stop offset="100%" stopColor="#C5A059" />
            </>
          ) : (
            // Default "gold": warm antique gold transitioning to soft rose
            <>
              <stop offset="0%" stopColor="#F5EED6" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#D8A49B" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`${idPrefix}-petal`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E8C5BE" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g
        stroke={`url(#${idPrefix}-grad)`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer border guide line - soft organic segment */}
        <path
          d="M 6 82 L 6 22 C 6 13, 13 6, 22 6 L 82 6"
          strokeWidth="1.2"
          opacity="0.35"
        />

        {/* Primary Main Vine Path with fluid curvature */}
        <path
          d="M 8 72 C 10 52, 16 32, 28 22 C 38 14, 56 10, 72 8"
          strokeWidth="1.8"
          fill="none"
        />

        {/* Secondary Tendril scrolling inward */}
        <path
          d="M 28 22 C 34 28, 42 34, 52 32 C 60 30, 64 22, 58 16 C 52 11, 44 18, 46 25"
          strokeWidth="1.4"
          fill="none"
          opacity="0.85"
        />

        {/* Bottom Branch Tendril */}
        <path
          d="M 22 28 C 28 34, 34 42, 32 52 C 30 60, 22 64, 16 58 C 11 52, 18 44, 25 46"
          strokeWidth="1.4"
          fill="none"
          opacity="0.85"
        />

        {/* Leaf 1: Upper Vine Leaf */}
        <path
          d="M 52 10 C 58 4, 68 6, 66 14 C 60 16, 54 13, 52 10 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />

        {/* Leaf 2: Lateral Leaf */}
        <path
          d="M 38 18 C 42 12, 50 14, 48 20 C 44 22, 39 21, 38 18 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />

        {/* Leaf 3: Lower Vine Leaf */}
        <path
          d="M 10 52 C 4 58, 6 68, 14 66 C 16 60, 13 54, 10 52 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />

        {/* Leaf 4: Lower Lateral Leaf */}
        <path
          d="M 18 38 C 12 42, 14 50, 20 48 C 22 44, 21 39, 18 38 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />

        {/* Blooming Jasmine Flower at the Root Junction (around 26, 26) */}
        <g transform="translate(26, 26)">
          {/* 5 Petals of Jasmine */}
          <path
            d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
            fill={`url(#${idPrefix}-petal)`}
            strokeWidth="1"
          />
          <path
            d="M 0 0 C 10 -4, 10 4, 0 0 Z"
            fill={`url(#${idPrefix}-petal)`}
            strokeWidth="1"
          />
          <path
            d="M 0 0 C 4 10, -4 10, 0 0 Z"
            fill={`url(#${idPrefix}-petal)`}
            strokeWidth="1"
          />
          <path
            d="M 0 0 C -10 4, -10 -4, 0 0 Z"
            fill={`url(#${idPrefix}-petal)`}
            strokeWidth="1"
          />
          <path
            d="M 0 0 C -7 -7, -2 -11, 0 0 Z"
            fill={`url(#${idPrefix}-petal)`}
            strokeWidth="1"
          />
          {/* Center Golden Pistil */}
          <circle cx="0" cy="0" r="2.2" fill={`url(#${idPrefix}-grad)`} stroke="none" />
        </g>

        {/* Floral Bud Clusters on Tendril Tips */}
        {/* Upper Bud */}
        <path
          d="M 72 8 C 77 6, 80 10, 76 13 C 73 14, 70 11, 72 8 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />
        <circle cx="80" cy="11" r="1.8" fill={`url(#${idPrefix}-grad)`} stroke="none" />

        {/* Lower Bud */}
        <path
          d="M 8 72 C 6 77, 10 80, 13 76 C 14 73, 11 70, 8 72 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1.2"
        />
        <circle cx="11" cy="80" r="1.8" fill={`url(#${idPrefix}-grad)`} stroke="none" />

        {/* Delicate Golden Dewdrop Accents */}
        <circle cx="58" cy="16" r="2" fill={`url(#${idPrefix}-grad)`} stroke="none" />
        <circle cx="16" cy="58" r="2" fill={`url(#${idPrefix}-grad)`} stroke="none" />
        <circle cx="10" cy="10" r="2.5" fill={`url(#${idPrefix}-grad)`} stroke="none" opacity="0.8" />
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
