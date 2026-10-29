import React from "react";

export interface BotanicalIconBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "sage" | "blush" | "cream";
  className?: string;
}

/**
 * BotanicalIconBadge - Wraps action icons in a micro-botanical enclosure
 * featuring circular antique gold borders with tiny leaf and petal accents.
 */
export default function BotanicalIconBadge({
  children,
  size = "md",
  variant = "gold",
  className = "",
}: BotanicalIconBadgeProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const bgClasses = {
    gold: "bg-gradient-to-b from-white via-gold-50/80 to-cream-100/90 text-gold-700",
    sage: "bg-gradient-to-b from-white via-sage-50 to-sage-100/80 text-sage-700",
    blush: "bg-gradient-to-b from-white via-blush-50 to-blush-100/80 text-blush-700",
    cream: "bg-cream-50 text-olive-600",
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
            {variant === "sage" ? (
              <>
                <stop offset="0%" stopColor="#7CA58A" />
                <stop offset="60%" stopColor="#2D5A43" />
                <stop offset="100%" stopColor="#C5A059" />
              </>
            ) : variant === "blush" ? (
              <>
                <stop offset="0%" stopColor="#E8C5BE" />
                <stop offset="70%" stopColor="#D8A49B" />
                <stop offset="100%" stopColor="#C5A059" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#F5EED6" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="75%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#D8A49B" />
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
