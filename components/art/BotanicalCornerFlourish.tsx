import React from "react";

export interface BotanicalCornerFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "all";
  size?: number;
  className?: string;
  variant?: "gold" | "sage" | "rose" | "charcoal" | "emerald";
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
              <stop offset="0%" stopColor="#A2B09B" />
              <stop offset="50%" stopColor="#7D8B74" />
              <stop offset="100%" stopColor="#556B2F" />
            </>
          ) : variant === "rose" ? (
            <>
              <stop offset="0%" stopColor="#F5D0D0" />
              <stop offset="50%" stopColor="#D4A5A5" />
              <stop offset="100%" stopColor="#B87B7B" />
            </>
          ) : variant === "charcoal" ? (
            <>
              <stop offset="0%" stopColor="#4A5568" />
              <stop offset="50%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </>
          ) : (
            // Default "gold": warm champagne gold
            <>
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="35%" stopColor="#E2C882" />
              <stop offset="70%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#9C7838" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`${idPrefix}-petal`} x1="0%" y1="0%" x2="100%" y2="100%">
          {variant === "sage" || variant === "emerald" ? (
            <>
              <stop offset="0%" stopColor="#F0F4EE" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#A2B09B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7D8B74" stopOpacity="0.85" />
            </>
          ) : variant === "rose" ? (
            <>
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#E8C5BE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D4A5A5" stopOpacity="0.85" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FFF8EE" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#E8C5BE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.85" />
            </>
          )}
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
          strokeWidth="1.6"
          fill="none"
        />

        {/* Secondary Tendril scrolling inward */}
        <path
          d="M 28 22 C 34 28, 42 34, 52 32 C 60 30, 64 22, 58 16 C 52 11, 44 18, 46 25"
          strokeWidth="1.2"
          fill="none"
          opacity="0.85"
        />

        {/* Bottom Branch Tendril */}
        <path
          d="M 22 28 C 28 34, 34 42, 32 52 C 30 60, 22 64, 16 58 C 11 52, 18 44, 25 46"
          strokeWidth="1.2"
          fill="none"
          opacity="0.85"
        />

        {/* Leaf 1: Upper Vine Leaf */}
        <path
          d="M 52 10 C 58 4, 68 6, 66 14 C 60 16, 54 13, 52 10 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1"
        />

        {/* Leaf 2: Lateral Leaf */}
        <path
          d="M 38 18 C 42 12, 50 14, 48 20 C 44 22, 39 21, 38 18 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1"
        />

        {/* Leaf 3: Lower Vine Leaf */}
        <path
          d="M 10 52 C 4 58, 6 68, 14 66 C 16 60, 13 54, 10 52 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1"
        />

        {/* Leaf 4: Lower Lateral Leaf */}
        <path
          d="M 18 38 C 12 42, 14 50, 20 48 C 22 44, 21 39, 18 38 Z"
          fill={`url(#${idPrefix}-petal)`}
          strokeWidth="1"
        />

        {/* Center Accent Bud */}
        <circle cx="28" cy="22" r="3" fill={`url(#${idPrefix}-petal)`} strokeWidth="1" />
      </g>
    </svg>
  );

  if (position === "all") {
    return (
      <div className={`pointer-events-none absolute inset-0 select-none ${className}`} aria-hidden="true">
        <div className="absolute top-2 left-2">
          <CornerSvg />
        </div>
        <div className="absolute top-2 right-2">
          <CornerSvg transform="scale(-1, 1)" />
        </div>
        <div className="absolute bottom-2 left-2">
          <CornerSvg transform="scale(1, -1)" />
        </div>
        <div className="absolute bottom-2 right-2">
          <CornerSvg transform="scale(-1, -1)" />
        </div>
      </div>
    );
  }

  const transformMap: Record<string, string> = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  };

  const positionClasses: Record<string, string> = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div
      className={`pointer-events-none absolute ${positionClasses[position] || "top-2 left-2"} select-none ${className}`}
      aria-hidden="true"
    >
      <CornerSvg transform={transformMap[position] || ""} />
    </div>
  );
}
