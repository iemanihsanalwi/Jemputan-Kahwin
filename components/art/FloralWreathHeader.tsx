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
 * olive branches and delicate floral petals framing the monogram typography.
 */
export default function FloralWreathHeader({
  initials = "I & A",
  subtitle = "Walimatulurus",
  size = "lg",
  className = "",
  variant: _variant = "couple",
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
      {/* Outer Static Botanical Subtle Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/15 to-[#7D8B74]/15 opacity-40" />

      {/* Pure SVG Botanical Wreath Medallion */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          {/* Champagne Gold Gradient */}
          <linearGradient id={`${idPrefix}-wreathGold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8EE" />
            <stop offset="25%" stopColor="#E2C882" />
            <stop offset="60%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9C7838" />
          </linearGradient>

          {/* Botanical Sage Foliage Gradient */}
          <linearGradient id={`${idPrefix}-wreathSage`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A2B09B" />
            <stop offset="50%" stopColor="#7D8B74" />
            <stop offset="100%" stopColor="#556B2F" />
          </linearGradient>

          {/* Dusty Rose Petal Gradient */}
          <linearGradient id={`${idPrefix}-wreathRose`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E8C5BE" />
            <stop offset="100%" stopColor="#D4A5A5" />
          </linearGradient>

          {/* Alabaster Core Fill */}
          <radialGradient id={`${idPrefix}-coreFill`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FDFBF7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5EFEB" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Central Translucent Alabaster Core */}
        <circle cx="100" cy="100" r="76" fill={`url(#${idPrefix}-coreFill)`} />

        {/* Outer Circular Vine Branches */}
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Delicate Inner Beaded/Dashed Ring */}
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke={`url(#${idPrefix}-wreathGold)`}
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.65"
        />

        {/* Left Side Climbing Olive Foliage */}
        <g stroke={`url(#${idPrefix}-wreathSage)`} strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 24 100 C 24 62, 54 30, 94 22" />
          <path d="M 94 22 C 78 30, 68 45, 62 62" strokeWidth="0.8" opacity="0.6" />

          {/* Olive Leaf Clusters on Left Branch */}
          <path d="M 32 78 C 22 74, 20 64, 28 60 C 34 66, 34 72, 32 78 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 46 54 C 40 44, 44 36, 52 40 C 52 48, 48 52, 46 54 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 68 36 C 66 26, 74 20, 80 26 C 78 32, 72 36, 68 36 Z" fill="#7D8B74" strokeWidth="0.8" />
        </g>

        {/* Right Side Climbing Olive Foliage */}
        <g stroke={`url(#${idPrefix}-wreathSage)`} strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 176 100 C 176 62, 146 30, 106 22" />
          <path d="M 106 22 C 122 30, 132 45, 138 62" strokeWidth="0.8" opacity="0.6" />

          {/* Olive Leaf Clusters on Right Branch */}
          <path d="M 168 78 C 178 74, 180 64, 172 60 C 166 66, 166 72, 168 78 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 154 54 C 160 44, 156 36, 148 40 C 148 48, 152 52, 154 54 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 132 36 C 134 26, 126 20, 120 26 C 122 32, 128 36, 132 36 Z" fill="#7D8B74" strokeWidth="0.8" />
        </g>

        {/* Lower Left & Right Laurel Base Branches */}
        <g stroke={`url(#${idPrefix}-wreathSage)`} strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 24 100 C 24 138, 54 170, 94 178" />
          <path d="M 176 100 C 176 138, 146 170, 106 178" />

          {/* Lower Leaflets */}
          <path d="M 32 122 C 22 126, 20 136, 28 140 C 34 134, 34 128, 32 122 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 50 148 C 44 156, 48 164, 56 160 C 56 152, 52 148, 50 148 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 168 122 C 178 126, 180 136, 172 140 C 166 134, 166 128, 168 122 Z" fill="#7D8B74" strokeWidth="0.8" />
          <path d="M 150 148 C 156 156, 152 164, 144 160 C 144 152, 148 148, 150 148 Z" fill="#7D8B74" strokeWidth="0.8" />
        </g>

        {/* Blooming Jasmine Petal Accents */}
        <g transform="translate(100, 22)">
          <circle cx="0" cy="0" r="5" fill={`url(#${idPrefix}-wreathRose)`} stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
        </g>

        <g transform="translate(100, 178)">
          <circle cx="0" cy="0" r="5" fill={`url(#${idPrefix}-wreathRose)`} stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
        </g>

        <g transform="translate(24, 100)">
          <circle cx="0" cy="0" r="4" fill={`url(#${idPrefix}-wreathRose)`} stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="0.8" />
        </g>

        <g transform="translate(176, 100)">
          <circle cx="0" cy="0" r="4" fill={`url(#${idPrefix}-wreathRose)`} stroke={`url(#${idPrefix}-wreathGold)`} strokeWidth="0.8" />
        </g>
      </svg>

      {/* Centered Monogram Typography strictly inside the medallion */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none p-4">
        <span className={`font-serif font-bold text-[#2D3748] tracking-widest ${textSizes[size]}`}>
          {initials}
        </span>
        {subtitle && size !== "sm" && (
          <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#7D8B74] mt-0.5 max-w-[120px] truncate">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
