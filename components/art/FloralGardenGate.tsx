import React from "react";

export interface FloralGardenGateProps {
  initials?: string;
  className?: string;
}

/**
 * FloralGardenGate - A pure SVG code-drawn minimalist botanical garden gate.
 * 
 * Aesthetic:
 * - Curved trellis/gate silhouette rendered in refined champagne gold vector lines (#C5A059 / #D4AF37)
 * - Entwined vines with olive/sage leaves (#7D8B74 / #556B2F) and delicate dusty rose buds (#D4A5A5)
 * - Central delicate circular botanical ring holding the couple's monogram in deep charcoal (#2D3748)
 * - Zero heavy filters or animation loops for maximum performance.
 */
export default function FloralGardenGate({
  initials = "I & A",
  className = "",
}: FloralGardenGateProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* SVG Botanical Garden Gate */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[360/420]">
        <svg
          viewBox="0 0 360 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
          aria-hidden="true"
        >
          <defs>
            {/* Champagne Gold Gradient for Gate Trellis Lines */}
            <linearGradient id={`${idPrefix}-champagneGold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="30%" stopColor="#E2C882" />
              <stop offset="70%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#9C7838" />
            </linearGradient>

            {/* Sage Vine Stem Gradient */}
            <linearGradient id={`${idPrefix}-sageVine`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#556B2F" />
              <stop offset="60%" stopColor="#7D8B74" />
              <stop offset="100%" stopColor="#A2B09B" />
            </linearGradient>

            {/* Dusty Rose Petal Gradient */}
            <linearGradient id={`${idPrefix}-dustyRose`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E8C5BE" />
              <stop offset="100%" stopColor="#D4A5A5" />
            </linearGradient>

            {/* Gold Stamen Center */}
            <radialGradient id={`${idPrefix}-goldStamen`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7838" />
            </radialGradient>
          </defs>

          {/* ================= 1. GARDEN TRELLIS & GATE ARCH STRUCTURE ================= */}
          <g stroke={`url(#${idPrefix}-champagneGold)`} strokeLinecap="round" strokeLinejoin="round">
            {/* Outer Soft Curved Arch */}
            <path
              d="M 45 415 L 45 180 C 45 95, 105 32, 180 20 C 255 32, 315 95, 315 180 L 315 415"
              strokeWidth="1.5"
            />

            {/* Inner Parallel Arch */}
            <path
              d="M 58 415 L 58 184 C 58 105, 112 48, 180 36 C 248 48, 302 105, 302 184 L 302 415"
              strokeWidth="0.9"
              strokeDasharray="4 3"
              opacity="0.75"
            />

            {/* Gate Post Bases */}
            <line x1="36" y1="415" x2="76" y2="415" strokeWidth="2" />
            <line x1="284" y1="415" x2="324" y2="415" strokeWidth="2" />

            {/* Trellis Cross Spindles along Arch Apex */}
            <line x1="90" y1="120" x2="108" y2="128" strokeWidth="0.8" opacity="0.6" />
            <line x1="125" y1="75" x2="140" y2="88" strokeWidth="0.8" opacity="0.6" />
            <line x1="180" y1="20" x2="180" y2="50" strokeWidth="0.9" opacity="0.7" />
            <line x1="235" y1="75" x2="220" y2="88" strokeWidth="0.8" opacity="0.6" />
            <line x1="270" y1="120" x2="252" y2="128" strokeWidth="0.8" opacity="0.6" />

            {/* Finial Fleur at Arch Crest Apex */}
            <circle cx="180" cy="18" r="3.5" fill={`url(#${idPrefix}-goldStamen)`} strokeWidth="1" />
            <path
              d="M 180 8 C 183 12, 185 14, 180 18 C 175 14, 177 12, 180 8 Z"
              fill={`url(#${idPrefix}-dustyRose)`}
              strokeWidth="0.8"
            />
          </g>

          {/* ================= 2. ENTWINED SAGE CLIMBING BOTANICAL VINES ================= */}
          <g stroke={`url(#${idPrefix}-sageVine)`} fill="none" strokeLinecap="round">
            {/* Left Pillar Climbing Vine */}
            <path
              d="M 46 410 C 38 360, 62 330, 48 270 C 36 215, 60 170, 52 130 C 48 95, 78 65, 120 45 C 145 34, 165 30, 180 30"
              strokeWidth="1.3"
            />
            {/* Left Vine Tendrils */}
            <path d="M 48 270 C 60 255, 68 262, 72 250" strokeWidth="0.8" />
            <path d="M 52 130 C 38 120, 36 105, 42 95" strokeWidth="0.8" />

            {/* Right Pillar Climbing Vine */}
            <path
              d="M 314 410 C 322 360, 298 330, 312 270 C 324 215, 300 170, 308 130 C 312 95, 282 65, 240 45 C 215 34, 195 30, 180 30"
              strokeWidth="1.3"
            />
            {/* Right Vine Tendrils */}
            <path d="M 312 270 C 300 255, 292 262, 288 250" strokeWidth="0.8" />
            <path d="M 308 130 C 322 120, 324 105, 318 95" strokeWidth="0.8" />
          </g>

          {/* ================= 3. SAGE OLIVE LEAFLETS ================= */}
          <g fill="#7D8B74" stroke="#556B2F" strokeWidth="0.6" opacity="0.85">
            {/* Left Leaves */}
            <path d="M 44 380 C 34 374, 30 364, 38 360 C 44 366, 46 372, 44 380 Z" />
            <path d="M 55 330 C 66 326, 70 316, 62 312 C 55 316, 54 324, 55 330 Z" />
            <path d="M 42 240 C 30 236, 26 226, 34 220 C 40 225, 42 232, 42 240 Z" />
            <path d="M 58 180 C 70 176, 74 166, 65 160 C 58 165, 57 172, 58 180 Z" />
            <path d="M 78 95 C 72 82, 80 74, 88 80 C 86 88, 83 93, 78 95 Z" />
            <path d="M 145 38 C 140 26, 150 20, 158 25 C 154 33, 150 36, 145 38 Z" />

            {/* Right Leaves */}
            <path d="M 316 380 C 326 374, 330 364, 322 360 C 316 366, 314 372, 316 380 Z" />
            <path d="M 305 330 C 294 326, 290 316, 298 312 C 305 316, 306 324, 305 330 Z" />
            <path d="M 318 240 C 330 236, 334 226, 326 220 C 320 225, 318 232, 318 240 Z" />
            <path d="M 302 180 C 290 176, 286 166, 295 160 C 302 165, 303 172, 302 180 Z" />
            <path d="M 282 95 C 288 82, 280 74, 272 80 C 274 88, 277 93, 282 95 Z" />
            <path d="M 215 38 C 220 26, 210 20, 202 25 C 206 33, 210 36, 215 38 Z" />
          </g>

          {/* ================= 4. DUSTY ROSE BUDS & BLOSSOMS ================= */}
          <g transform="translate(105, 56)">
            <circle cx="0" cy="0" r="10" fill={`url(#${idPrefix}-dustyRose)`} stroke={`url(#${idPrefix}-champagneGold)`} strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          <g transform="translate(255, 56)">
            <circle cx="0" cy="0" r="10" fill={`url(#${idPrefix}-dustyRose)`} stroke={`url(#${idPrefix}-champagneGold)`} strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          {/* ================= 5. MONOGRAM ENCLOSURE RING ================= */}
          <g transform="translate(180, 205)">
            {/* Outer Golden Ring */}
            <circle
              cx="0"
              cy="0"
              r="74"
              fill="none"
              stroke={`url(#${idPrefix}-champagneGold)`}
              strokeWidth="1.2"
            />
            {/* Inner Concentric Beaded Ring */}
            <circle
              cx="0"
              cy="0"
              r="69"
              fill="none"
              stroke={`url(#${idPrefix}-champagneGold)`}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.65"
            />
            {/* Translucent Ivory Core Fill */}
            <circle
              cx="0"
              cy="0"
              r="68"
              fill="#FAF7F2"
              fillOpacity="0.8"
            />

            {/* Cardinal Olive Leaf Accents on Ring */}
            <g fill="#7D8B74" stroke="#556B2F" strokeWidth="0.5">
              <path d="M 0 -74 C -6 -80, -4 -86, 0 -84 C 4 -86, 6 -80, 0 -74 Z" />
              <path d="M 0 74 C -6 80, -4 86, 0 84 C 4 86, 6 80, 0 74 Z" />
              <circle cx="0" cy="-74" r="2" fill={`url(#${idPrefix}-goldStamen)`} />
              <circle cx="0" cy="74" r="2" fill={`url(#${idPrefix}-goldStamen)`} />
            </g>
          </g>
        </svg>

        {/* Monogram Initials Centered Strictly Inside Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-2 sm:pb-3">
          <span className="font-serif font-medium tracking-[0.2em] text-[#2D3748] text-4xl sm:text-5xl select-none">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}
