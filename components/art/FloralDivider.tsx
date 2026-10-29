import React from "react";

interface FloralDividerProps {
  className?: string;
  variant?: "gold" | "emerald";
  size?: "sm" | "md" | "lg";
}

/**
 * FloralDivider - An elegant vector flourish divider for section transitions.
 * Features an Islamic eight-pointed star (Khatam) flanked by symmetrical arabesque floral vines.
 */
export default function FloralDivider({
  className = "",
  variant = "gold",
  size = "md",
}: FloralDividerProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  const sizeClasses = {
    sm: "w-44 h-6",
    md: "w-64 sm:w-80 h-8",
    lg: "w-80 sm:w-96 md:w-[450px] h-10",
  };

  return (
    <div className={`relative flex items-center justify-center my-6 select-none ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 500 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={variant === "emerald" ? "#1B4D3E" : "#D4AF37"} stopOpacity="0" />
            <stop offset="20%" stopColor={variant === "emerald" ? "#2E6B56" : "#B88E28"} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFF2A1" />
            <stop offset="80%" stopColor={variant === "emerald" ? "#2E6B56" : "#B88E28"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={variant === "emerald" ? "#1B4D3E" : "#D4AF37"} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-starGold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variant === "emerald" ? "#C2DFC7" : "#FFF2A1"} />
            <stop offset="50%" stopColor={variant === "emerald" ? "#1B4D3E" : "#D4AF37"} />
            <stop offset="100%" stopColor={variant === "emerald" ? "#091F18" : "#875E19"} />
          </linearGradient>
        </defs>

        {/* Left Side Horizontal Rule with Fade */}
        <line x1="20" y1="30" x2="190" y2="30" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.2" />

        {/* Left Arabesque Vine Scroll */}
        <g stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M 190 30 C 205 30, 215 20, 225 22 C 235 24, 238 32, 232 36 C 226 39, 218 35, 222 28" />
          <path d="M 210 30 C 215 36, 222 42, 230 40 C 236 38, 235 32, 230 32" strokeWidth="1" />
        </g>
        {/* Left Petal Leaf */}
        <path
          d="M 226 22 C 232 16, 240 18, 236 25 C 230 25, 226 22, 226 22 Z"
          fill={`url(#${idPrefix}-starGold)`}
          opacity="0.85"
        />

        {/* Center 8-Point Islamic Star (Khatam) */}
        <g transform="translate(250, 30)">
          {/* Subtle Outer Star Ring */}
          <circle cx="0" cy="0" r="16" fill="none" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" opacity="0.6" />
          
          {/* First Square */}
          <rect
            x="-7"
            y="-7"
            width="14"
            height="14"
            fill={`url(#${idPrefix}-starGold)`}
            rx="1"
          />
          {/* Second Square Rotated 45deg */}
          <rect
            x="-7"
            y="-7"
            width="14"
            height="14"
            fill={`url(#${idPrefix}-starGold)`}
            transform="rotate(45)"
            rx="1"
          />
          {/* Center Point Accent */}
          <circle cx="0" cy="0" r="2.5" fill="#FAF7F2" />
        </g>

        {/* Right Arabesque Vine Scroll */}
        <g stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M 310 30 C 295 30, 285 20, 275 22 C 265 24, 262 32, 268 36 C 274 39, 282 35, 278 28" />
          <path d="M 290 30 C 285 36, 278 42, 270 40 C 264 38, 265 32, 270 32" strokeWidth="1" />
        </g>
        {/* Right Petal Leaf */}
        <path
          d="M 274 22 C 268 16, 260 18, 264 25 C 270 25, 274 22, 274 22 Z"
          fill={`url(#${idPrefix}-starGold)`}
          opacity="0.85"
        />

        {/* Right Side Horizontal Rule with Fade */}
        <line x1="310" y1="30" x2="480" y2="30" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.2" />

        {/* Flanking Diamond Accents */}
        <polygon points="120,30 124,27 128,30 124,33" fill={`url(#${idPrefix}-starGold)`} />
        <polygon points="380,30 376,27 372,30 376,33" fill={`url(#${idPrefix}-starGold)`} />
      </svg>
    </div>
  );
}

