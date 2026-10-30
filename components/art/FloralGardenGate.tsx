import React from "react";

export interface FloralGardenGateProps {
  initials?: string;
  className?: string;
}

/**
 * FloralGardenGate - A pure SVG code-drawn minimalist, romantic floral garden gate.
 * 
 * Features:
 * - Curved trellis/gate silhouette rendered in delicate rose-gold vector lines (stroke="#D4A373")
 * - Entwined vines, climbing soft pink roses, and cherry blossom petals wrapping naturally around pillars and apex
 * - Central delicate circular floral vine ring holding the couple's monogram
 * - Complete absence of green tones: palette uses rose gold, brushed champagne, pastel blossom, dusty rose, and pearl white.
 */
export default function FloralGardenGate({
  initials = "I & A",
  className = "",
}: FloralGardenGateProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Ambient Soft Rose Glow Behind Gate Apex */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 -z-10 w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full blur-[70px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 228, 232, 0.9) 0%, rgba(245, 183, 177, 0.35) 50%, transparent 72%)",
        }}
      />

      {/* SVG Floral Garden Gate */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[360/420]">
        <svg
          viewBox="0 0 360 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
          aria-hidden="true"
        >
          <defs>
            {/* Rose Gold Gradient for Gate Lines */}
            <linearGradient id={`${idPrefix}-roseGold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2E8" />
              <stop offset="25%" stopColor="#E5C3B2" />
              <stop offset="60%" stopColor="#D4A373" />
              <stop offset="85%" stopColor="#C89B7B" />
              <stop offset="100%" stopColor="#A86F58" />
            </linearGradient>

            {/* Delicate Vine Stem Gradient (Rose Gold to Taupe - Zero Green) */}
            <linearGradient id={`${idPrefix}-vineStem`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#B3806D" />
              <stop offset="50%" stopColor="#C89B7B" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>

            {/* Soft Pink Rose Petal Gradient */}
            <linearGradient id={`${idPrefix}-rosePetal`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#FADBD8" />
              <stop offset="80%" stopColor="#F5B7B1" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>

            {/* Deep Dusty Rose Petal Gradient */}
            <linearGradient id={`${idPrefix}-deepPetal`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF0F2" />
              <stop offset="50%" stopColor="#E89DA8" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>

            {/* Radial Core for Blossoms */}
            <radialGradient id={`${idPrefix}-blossomCore`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FCE4E8" />
              <stop offset="100%" stopColor="#D88A96" />
            </radialGradient>

            {/* Gold Stamen Center */}
            <radialGradient id={`${idPrefix}-goldStamen`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="60%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#9C6B46" />
            </radialGradient>
          </defs>

          {/* ================= 1. GARDEN TRELLIS & GATE ARCH STRUCTURE ================= */}
          <g stroke={`url(#${idPrefix}-roseGold)`} strokeLinecap="round" strokeLinejoin="round">
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

            {/* Third Inner Contour */}
            <path
              d="M 68 415 L 68 188 C 68 115, 118 60, 180 50 C 242 60, 292 115, 292 188 L 292 415"
              strokeWidth="0.8"
              opacity="0.45"
            />

            {/* Gate Post Footers / Bases */}
            <line x1="36" y1="415" x2="76" y2="415" strokeWidth="2" />
            <line x1="284" y1="415" x2="324" y2="415" strokeWidth="2" />

            {/* Trellis Cross-Hatch Rings / Spindles along Arch Apex */}
            <line x1="90" y1="120" x2="108" y2="128" strokeWidth="0.8" opacity="0.6" />
            <line x1="125" y1="75" x2="140" y2="88" strokeWidth="0.8" opacity="0.6" />
            <line x1="180" y1="20" x2="180" y2="50" strokeWidth="0.9" opacity="0.7" />
            <line x1="235" y1="75" x2="220" y2="88" strokeWidth="0.8" opacity="0.6" />
            <line x1="270" y1="120" x2="252" y2="128" strokeWidth="0.8" opacity="0.6" />

            {/* Finial Fleur at Arch Crest Apex */}
            <circle cx="180" cy="18" r="3.5" fill={`url(#${idPrefix}-goldStamen)`} strokeWidth="1" />
            <path
              d="M 180 8 C 183 12, 185 14, 180 18 C 175 14, 177 12, 180 8 Z"
              fill={`url(#${idPrefix}-rosePetal)`}
              strokeWidth="0.8"
            />
            <path
              d="M 172 17 C 175 15, 178 15, 180 18 C 178 20, 175 19, 172 17 Z"
              fill={`url(#${idPrefix}-rosePetal)`}
              strokeWidth="0.7"
            />
            <path
              d="M 188 17 C 185 15, 182 15, 180 18 C 182 20, 185 19, 188 17 Z"
              fill={`url(#${idPrefix}-rosePetal)`}
              strokeWidth="0.7"
            />
          </g>

          {/* ================= 2. ENTWINED CLIMBING FLORAL VINES (ZERO GREEN) ================= */}
          <g stroke={`url(#${idPrefix}-vineStem)`} fill="none" strokeLinecap="round">
            {/* Left Pillar Climbing Winding Vine */}
            <path
              d="M 46 410 
                 C 38 360, 62 330, 48 270 
                 C 36 215, 60 170, 52 130 
                 C 48 95, 78 65, 120 45 
                 C 145 34, 165 30, 180 30"
              strokeWidth="1.3"
            />
            {/* Left Vine Tendril Offshoots */}
            <path d="M 48 270 C 60 255, 68 262, 72 250" strokeWidth="0.9" />
            <path d="M 52 130 C 38 120, 36 105, 42 95" strokeWidth="0.9" />
            <path d="M 120 45 C 122 30, 134 25, 142 32" strokeWidth="0.9" />

            {/* Right Pillar Climbing Winding Vine */}
            <path
              d="M 314 410 
                 C 322 360, 298 330, 312 270 
                 C 324 215, 300 170, 308 130 
                 C 312 95, 282 65, 240 45 
                 C 215 34, 195 30, 180 30"
              strokeWidth="1.3"
            />
            {/* Right Vine Tendril Offshoots */}
            <path d="M 312 270 C 300 255, 292 262, 288 250" strokeWidth="0.9" />
            <path d="M 308 130 C 322 120, 324 105, 318 95" strokeWidth="0.9" />
            <path d="M 240 45 C 238 30, 226 25, 218 32" strokeWidth="0.9" />
          </g>

          {/* ================= 3. SOFT ROSE & CHERRY BLOSSOM PETALS ================= */}
          {/* Leaves rendered in Soft Champagne Rose-Gold Tone (NO GREEN) */}
          <g fill="#E5C3B2" stroke="#C89B7B" strokeWidth="0.6" opacity="0.85">
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

          {/* ================= BLOOMING ROSES & CHERRY BLOSSOMS ON GATE ================= */}
          {/* Top Left Apex Rose Cluster */}
          <g transform="translate(105, 56)">
            {/* Rose Outer Petals */}
            <circle cx="0" cy="0" r="13" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.8" />
            <path
              d="M -9 -7 C -14 0, -10 10, 0 11 C 10 11, 14 2, 8 -7 C 2 -12, -5 -12, -9 -7 Z"
              fill={`url(#${idPrefix}-deepPetal)`}
              stroke="#D88A96"
              strokeWidth="0.6"
            />
            <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          {/* Top Right Apex Rose Cluster */}
          <g transform="translate(255, 56)">
            <circle cx="0" cy="0" r="13" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.8" />
            <path
              d="M -9 -7 C -14 0, -10 10, 0 11 C 10 11, 14 2, 8 -7 C 2 -12, -5 -12, -9 -7 Z"
              fill={`url(#${idPrefix}-deepPetal)`}
              stroke="#D88A96"
              strokeWidth="0.6"
            />
            <circle cx="0" cy="0" r="5.5" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          {/* Left Mid-Pillar Cherry Blossom */}
          <g transform="translate(48, 200)">
            {/* 5 Soft Petals */}
            {[0, 72, 144, 216, 288].map((ang, i) => (
              <path
                key={i}
                d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
                fill={`url(#${idPrefix}-rosePetal)`}
                stroke="#D88A96"
                strokeWidth="0.5"
                transform={`rotate(${ang}) translate(0, -2)`}
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          {/* Left Lower Pillar Petite Rosebud */}
          <g transform="translate(56, 320)">
            <ellipse cx="0" cy="0" rx="7" ry="9" fill={`url(#${idPrefix}-deepPetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.7" />
            <circle cx="0" cy="1" r="3" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.5" />
          </g>

          {/* Right Mid-Pillar Cherry Blossom */}
          <g transform="translate(312, 200)">
            {[0, 72, 144, 216, 288].map((ang, i) => (
              <path
                key={i}
                d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
                fill={`url(#${idPrefix}-rosePetal)`}
                stroke="#D88A96"
                strokeWidth="0.5"
                transform={`rotate(${ang}) translate(0, -2)`}
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill={`url(#${idPrefix}-goldStamen)`} />
          </g>

          {/* Right Lower Pillar Petite Rosebud */}
          <g transform="translate(304, 320)">
            <ellipse cx="0" cy="0" rx="7" ry="9" fill={`url(#${idPrefix}-deepPetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.7" />
            <circle cx="0" cy="1" r="3" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.5" />
          </g>

          {/* ================= 4. MONOGRAM ENCLOSURE: DELICATE CIRCULAR FLORAL VINE RING ================= */}
          <g transform="translate(180, 205)">
            {/* Outer Vine Ring */}
            <circle
              cx="0"
              cy="0"
              r="76"
              fill="none"
              stroke={`url(#${idPrefix}-roseGold)`}
              strokeWidth="1.2"
            />
            {/* Inner Concentric Beaded Ring */}
            <circle
              cx="0"
              cy="0"
              r="71"
              fill="none"
              stroke={`url(#${idPrefix}-roseGold)`}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity="0.65"
            />
            {/* Translucent Alabaster Core Fill */}
            <circle
              cx="0"
              cy="0"
              r="70"
              fill="#FFFFFF"
              fillOpacity="0.45"
            />

            {/* Micro Vine Twigs & Leaflets Wrapping the Ring */}
            <path
              d="M -76 0 C -78 -35, -50 -70, -10 -76"
              fill="none"
              stroke={`url(#${idPrefix}-vineStem)`}
              strokeWidth="1"
            />
            <path
              d="M 10 76 C 50 72, 76 40, 76 0"
              fill="none"
              stroke={`url(#${idPrefix}-vineStem)`}
              strokeWidth="1"
            />

            {/* Petite Rose Clusters on the Ring (4 Cardinal Accents) */}
            {/* Top Cardinal Bloom */}
            <g transform="translate(0, -74)">
              <circle cx="0" cy="0" r="7" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.7" />
              <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill={`url(#${idPrefix}-goldStamen)`} />
            </g>

            {/* Bottom Cardinal Bloom */}
            <g transform="translate(0, 74)">
              <circle cx="0" cy="0" r="7" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.7" />
              <circle cx="0" cy="0" r="3.2" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill={`url(#${idPrefix}-goldStamen)`} />
            </g>

            {/* Left Bloom Accent */}
            <g transform="translate(-75, 0)">
              <circle cx="0" cy="0" r="6" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.6" />
              <circle cx="0" cy="0" r="1.5" fill={`url(#${idPrefix}-goldStamen)`} />
            </g>

            {/* Right Bloom Accent */}
            <g transform="translate(75, 0)">
              <circle cx="0" cy="0" r="6" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-roseGold)`} strokeWidth="0.6" />
              <circle cx="0" cy="0" r="1.5" fill={`url(#${idPrefix}-goldStamen)`} />
            </g>

            {/* Small Champagne Leaves Flanking Ring */}
            <path d="M -70 -25 C -78 -32, -84 -30, -78 -24 C -72 -20, -68 -22, -70 -25 Z" fill="#E5C3B2" stroke="#C89B7B" strokeWidth="0.5" />
            <path d="M 70 25 C 78 32, 84 30, 78 24 C 72 20, 68 22, 70 25 Z" fill="#E5C3B2" stroke="#C89B7B" strokeWidth="0.5" />
          </g>
        </svg>

        {/* Monogram Initials Centered Exactly Inside the Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-2 sm:pb-3">
          <div className="flex items-center justify-center">
            <span
              className="font-serif font-medium tracking-[0.2em] text-[#3D262A] text-4xl sm:text-5xl select-none"
              style={{
                textShadow: "0 2px 10px rgba(216, 138, 150, 0.25)",
              }}
            >
              {initials}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
