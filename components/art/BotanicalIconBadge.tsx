import React from "react";

export interface BotanicalIconBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "sage" | "blush" | "cream" | "rose";
  className?: string;
}

/**
 * BotanicalIconBadge - Wraps action icons in a micro-botanical enclosure
 * featuring circular rose gold borders with tiny petal accents (Zero Green).
 */
export default function BotanicalIconBadge({
  children,
  size = "md",
  variant = "rose",
  className = "",
}: BotanicalIconBadgeProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const bgClasses = {
    gold: "bg-gradient-to-b from-white via-[#FAEDE3] to-[#F3DAC8] text-[#D4A373]",
    sage: "bg-gradient-to-b from-white via-[#FDE8EC] to-[#FADBD8] text-[#C56D7E]",
    blush: "bg-gradient-to-b from-white via-[#FDE8EC] to-[#FADBD8] text-[#D88A96]",
    rose: "bg-gradient-to-b from-white via-[#FDE8EC] to-[#FADBD8] text-[#C56D7E]",
    cream: "bg-[#FFF8F8] text-[#7A555C]",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full shadow-sm transition-transform duration-300 group-hover:scale-105 ${sizeClasses[size]} ${bgClasses[variant]} ${className}`}
    >
      {/* SVG Micro-Botanical Enclosure Ring with Leaf Accents */}
      <svg
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${idPrefix}-badgeBorder`} x1="0%" y1="0%" x2="100%" y2="100%">
            {variant === "sage" || variant === "rose" || variant === "blush" ? (
              <>
                <stop offset="0%" stopColor="#FADBD8" />
                <stop offset="60%" stopColor="#D88A96" />
                <stop offset="100%" stopColor="#D4A373" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFF8F2" />
                <stop offset="35%" stopColor="#E2B686" />
                <stop offset="75%" stopColor="#D4A373" />
                <stop offset="100%" stopColor="#C89B7B" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Outer Circular Botanical Ring */}
        <circle
          cx="30"
          cy="30"
          r="27"
          stroke={`url(#${idPrefix}-badgeBorder)`}
          strokeWidth="1.4"
        />

        {/* Inner Delicate Scallop Ring */}
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke={`url(#${idPrefix}-badgeBorder)`}
          strokeWidth="0.8"
          strokeDasharray="2.5 2.5"
          opacity="0.65"
        />

        {/* 4 Cardinal Leaflet Flourishes */}
        {/* Top Leaf Accent */}
        <path
          d="M 30 3 C 28 0, 32 0, 30 3 Z"
          fill={`url(#${idPrefix}-badgeBorder)`}
        />
        <circle cx="30" cy="5.5" r="1.2" fill={`url(#${idPrefix}-badgeBorder)`} />

        {/* Bottom Leaf Accent */}
        <path
          d="M 30 57 C 28 60, 32 60, 30 57 Z"
          fill={`url(#${idPrefix}-badgeBorder)`}
        />
        <circle cx="30" cy="54.5" r="1.2" fill={`url(#${idPrefix}-badgeBorder)`} />

        {/* Left Leaf Accent */}
        <path
          d="M 3 30 C 0 28, 0 32, 3 30 Z"
          fill={`url(#${idPrefix}-badgeBorder)`}
        />
        <circle cx="5.5" cy="30" r="1.2" fill={`url(#${idPrefix}-badgeBorder)`} />

        {/* Right Leaf Accent */}
        <path
          d="M 57 30 C 60 28, 60 32, 57 30 Z"
          fill={`url(#${idPrefix}-badgeBorder)`}
        />
        <circle cx="54.5" cy="30" r="1.2" fill={`url(#${idPrefix}-badgeBorder)`} />
      </svg>

      {/* Centered Icon Content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
