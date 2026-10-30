import React from "react";

export interface GardenArchHeaderProps {
  children?: React.ReactNode;
  initials?: string;
  subtitle?: string;
  className?: string;
}

/**
 * GardenArchHeader - An expansive, multi-layered garden archway depicting
 * climbing wild roses, trailing star jasmine, layered eucalyptus foliage, and an antique gold trellis arbor.
 * Layer 1 (Background): Dark forest sage eucalyptus & fern foliage
 * Layer 2 (Midground): Soft blush & dusty rose wild garden blooms
 * Layer 3 (Foreground): Warm antique gold stamen pistils, buds, and delicate winding tendrils
 */
export default function GardenArchHeader({
  children,
  initials = "I & A",
  subtitle = "WALIMATULURUS",
  className = "",
}: GardenArchHeaderProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 sm:p-6 select-none ${className}`}>
      {/* Ambient Dappled Sunlight Glow Behind Arch Apex */}
      <div
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 -z-10 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full blur-[90px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 238, 214, 0.8) 0%, rgba(216, 164, 155, 0.25) 50%, transparent 72%)",
        }}
      />

      {/* SVG Multi-Layered Garden Trellis & Floral Arch Frame */}
      <div className="absolute inset-0 pointer-events-none w-full h-full" aria-hidden="true">
        <svg
          viewBox="0 0 600 760"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id={`${idPrefix}-goldStroke`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF7EE" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="65%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="#86652C" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-sageFoliage`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3E5C49" />
              <stop offset="50%" stopColor="#2D5A43" />
              <stop offset="100%" stopColor="#183024" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-rosePetal`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="45%" stopColor="#E8C5BE" />
              <stop offset="85%" stopColor="#D8A49B" />
              <stop offset="100%" stopColor="#C5857B" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-archFill`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FAF7EE" stopOpacity="0.97" />
              <stop offset="100%" stopColor="#F4EFE6" stopOpacity="0.96" />
            </linearGradient>

            <radialGradient id={`${idPrefix}-jasminePetal`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F4E0DC" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* Background Card Sanctuary Arch Fill */}
          <path
            d="M 60 740 
               L 60 270 
               C 60 140, 160 50, 300 28 
               C 440 50, 540 140, 540 270 
               L 540 740 
               Z"
            fill={`url(#${idPrefix}-archFill)`}
          />

          {/* Trellis Arbor Lattice Layer (Background Arbor) */}
          <g stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="1" opacity="0.28" strokeLinecap="round">
            {/* Outer Wooden/Metallic Garden Arch Outline */}
            <path
              d="M 52 745 L 52 272 C 52 136, 154 44, 300 20 C 446 44, 548 136, 548 272 L 548 745"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner Trellis Contour */}
            <path
              d="M 68 740 L 68 275 C 68 148, 166 60, 300 36 C 434 60, 532 148, 532 275 L 532 740"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />

            {/* Trellis Cross-Hatching Diagonal Bars */}
            <line x1="52" y1="200" x2="180" y2="70" />
            <line x1="52" y1="260" x2="240" y2="72" />
            <line x1="52" y1="330" x2="300" y2="82" />
            <line x1="548" y1="200" x2="420" y2="70" />
            <line x1="548" y1="260" x2="360" y2="72" />
            <line x1="548" y1="330" x2="300" y2="82" />
          </g>

          {/* ========================================================= */}
          {/* LAYER 1: Deep Sage / Forest Green Eucalyptus & Vines       */}
          {/* ========================================================= */}
          <g fill={`url(#${idPrefix}-sageFoliage)`} stroke="#183024" strokeWidth="0.8">
            {/* Left Climbing Vine Main Stems */}
            <path
              d="M 40 740 C 44 600, 32 460, 48 340 C 60 240, 95 160, 160 100 C 205 60, 255 40, 298 30"
              fill="none"
              stroke={`url(#${idPrefix}-sageFoliage)`}
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Right Climbing Vine Main Stems */}
            <path
              d="M 560 740 C 556 600, 568 460, 552 340 C 540 240, 505 160, 440 100 C 395 60, 345 40, 302 30"
              fill="none"
              stroke={`url(#${idPrefix}-sageFoliage)`}
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Left Eucalyptus Round Leaves Clusters */}
            <ellipse cx="44" cy="520" rx="14" ry="9" transform="rotate(-25 44 520)" opacity="0.9" />
            <ellipse cx="32" cy="480" rx="15" ry="10" transform="rotate(20 32 480)" opacity="0.85" />
            <ellipse cx="46" cy="420" rx="16" ry="11" transform="rotate(-35 46 420)" opacity="0.9" />
            <ellipse cx="36" cy="370" rx="14" ry="9" transform="rotate(15 36 370)" opacity="0.85" />
            <ellipse cx="58" cy="310" rx="17" ry="11" transform="rotate(-30 58 310)" opacity="0.9" />
            <ellipse cx="52" cy="250" rx="16" ry="10" transform="rotate(30 52 250)" opacity="0.85" />
            <ellipse cx="82" cy="190" rx="16" ry="10" transform="rotate(-40 82 190)" opacity="0.9" />
            <ellipse cx="115" cy="145" rx="17" ry="10" transform="rotate(-25 115 145)" opacity="0.9" />
            <ellipse cx="160" cy="105" rx="18" ry="11" transform="rotate(-15 160 105)" opacity="0.92" />
            <ellipse cx="215" cy="70" rx="16" ry="10" transform="rotate(-10 215 70)" opacity="0.88" />
            <ellipse cx="265" cy="46" rx="14" ry="9" transform="rotate(-5 265 46)" opacity="0.9" />

            {/* Right Eucalyptus Round Leaves Clusters */}
            <ellipse cx="556" cy="520" rx="14" ry="9" transform="rotate(25 556 520)" opacity="0.9" />
            <ellipse cx="568" cy="480" rx="15" ry="10" transform="rotate(-20 568 480)" opacity="0.85" />
            <ellipse cx="554" cy="420" rx="16" ry="11" transform="rotate(35 554 420)" opacity="0.9" />
            <ellipse cx="564" cy="370" rx="14" ry="9" transform="rotate(-15 564 370)" opacity="0.85" />
            <ellipse cx="542" cy="310" rx="17" ry="11" transform="rotate(30 542 310)" opacity="0.9" />
            <ellipse cx="548" cy="250" rx="16" ry="10" transform="rotate(-30 548 250)" opacity="0.85" />
            <ellipse cx="518" cy="190" rx="16" ry="10" transform="rotate(40 518 190)" opacity="0.9" />
            <ellipse cx="485" cy="145" rx="17" ry="10" transform="rotate(25 485 145)" opacity="0.9" />
            <ellipse cx="440" cy="105" rx="18" ry="11" transform="rotate(15 440 105)" opacity="0.92" />
            <ellipse cx="385" cy="70" rx="16" ry="10" transform="rotate(10 385 70)" opacity="0.88" />
            <ellipse cx="335" cy="46" rx="14" ry="9" transform="rotate(5 335 46)" opacity="0.9" />

            {/* Fern Fronds Sprays (Asymmetrical foliage depth) */}
            <path d="M 62 280 Q 85 270, 105 285 Q 85 292, 62 280 Z" />
            <path d="M 538 280 Q 515 270, 495 285 Q 515 292, 538 280 Z" />
            <path d="M 130 160 Q 155 140, 175 162 Q 150 166, 130 160 Z" />
            <path d="M 470 160 Q 445 140, 425 162 Q 450 166, 470 160 Z" />
          </g>

          {/* ========================================================= */}
          {/* LAYER 2: Midground Blooming Wild Roses & Jasmine Florets   */}
          {/* ========================================================= */}
          <g>
            {/* Macro Climbing Rose 1 (Left Shoulder: 80, 220) */}
            <g transform="translate(75, 225)">
              <circle cx="0" cy="0" r="22" fill={`url(#${idPrefix}-rosePetal)`} />
              {/* Petal overlapping folds */}
              <path d="M -16 -6 C -18 8, 4 18, 16 8 C 22 -6, 2 -18, -16 -6 Z" fill="#E8C5BE" opacity="0.9" />
              <path d="M -10 -2 C -12 8, 2 12, 10 4 C 14 -4, 2 -10, -10 -2 Z" fill="#D8A49B" opacity="0.95" />
              <circle cx="0" cy="0" r="5" fill="#FAF7F2" />
              <circle cx="0" cy="0" r="2.5" fill="#C5A059" />
            </g>

            {/* Macro Climbing Rose 2 (Right Shoulder: 525, 225) */}
            <g transform="translate(525, 225)">
              <circle cx="0" cy="0" r="22" fill={`url(#${idPrefix}-rosePetal)`} />
              <path d="M 16 -6 C 18 8, -4 18, -16 8 C -22 -6, -2 -18, 16 -6 Z" fill="#E8C5BE" opacity="0.9" />
              <path d="M 10 -2 C 12 8, -2 12, -10 4 C -14 -4, -2 -10, 10 -2 Z" fill="#D8A49B" opacity="0.95" />
              <circle cx="0" cy="0" r="5" fill="#FAF7F2" />
              <circle cx="0" cy="0" r="2.5" fill="#C5A059" />
            </g>

            {/* Climbing Rose 3 (Left Mid-Upper: 155, 120) */}
            <g transform="translate(155, 120) scale(0.9)">
              <circle cx="0" cy="0" r="18" fill={`url(#${idPrefix}-rosePetal)`} />
              <path d="M -12 -4 C -14 6, 2 14, 12 6 C 16 -4, 2 -14, -12 -4 Z" fill="#E8C5BE" />
              <circle cx="0" cy="0" r="4" fill="#FAF7F2" />
              <circle cx="0" cy="0" r="2" fill="#C5A059" />
            </g>

            {/* Climbing Rose 4 (Right Mid-Upper: 445, 120) */}
            <g transform="translate(445, 120) scale(0.9)">
              <circle cx="0" cy="0" r="18" fill={`url(#${idPrefix}-rosePetal)`} />
              <path d="M 12 -4 C 14 6, -2 14, -12 6 C -16 -4, -2 -14, 12 -4 Z" fill="#E8C5BE" />
              <circle cx="0" cy="0" r="4" fill="#FAF7F2" />
              <circle cx="0" cy="0" r="2" fill="#C5A059" />
            </g>

            {/* Grand Apex Rose Bouquet (Top Center: 300, 24) */}
            <g transform="translate(300, 26)">
              {/* Central Rose Bloom */}
              <circle cx="0" cy="0" r="24" fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="1.2" />
              <path d="M -18 -6 C -20 10, 6 20, 18 10 C 24 -6, 2 -20, -18 -6 Z" fill="#E8C5BE" opacity="0.9" />
              <path d="M -10 -2 C -12 8, 4 12, 10 4 C 14 -4, 2 -10, -10 -2 Z" fill="#D8A49B" opacity="0.95" />
              <circle cx="0" cy="0" r="6" fill="#FAF7F2" />
              <circle cx="0" cy="0" r="3" fill="#C5A059" />

              {/* Flanking Jasmine Florets */}
              <g transform="translate(-32, 2) scale(0.8)">
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <path
                    key={i}
                    d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
                    transform={`rotate(${deg})`}
                    fill={`url(#${idPrefix}-jasminePetal)`}
                    stroke={`url(#${idPrefix}-goldStroke)`}
                    strokeWidth="0.8"
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill="#D4AF37" />
              </g>

              <g transform="translate(32, 2) scale(0.8)">
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <path
                    key={i}
                    d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
                    transform={`rotate(${deg})`}
                    fill={`url(#${idPrefix}-jasminePetal)`}
                    stroke={`url(#${idPrefix}-goldStroke)`}
                    strokeWidth="0.8"
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill="#D4AF37" />
              </g>
            </g>

            {/* Trailing Star Jasmine Florets (Scattered along the arch vine) */}
            {[
              { x: 50, y: 460, scale: 0.75, rot: 15 },
              { x: 42, y: 350, scale: 0.8, rot: -20 },
              { x: 105, y: 170, scale: 0.85, rot: 45 },
              { x: 230, y: 56, scale: 0.8, rot: -10 },
              { x: 370, y: 56, scale: 0.8, rot: 15 },
              { x: 495, y: 170, scale: 0.85, rot: -30 },
              { x: 558, y: 350, scale: 0.8, rot: 25 },
              { x: 550, y: 460, scale: 0.75, rot: -15 },
            ].map((j, idx) => (
              <g key={idx} transform={`translate(${j.x}, ${j.y}) scale(${j.scale}) rotate(${j.rot})`}>
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <path
                    key={i}
                    d="M 0 0 C -4 -10, 4 -10, 0 0 Z"
                    transform={`rotate(${deg})`}
                    fill={`url(#${idPrefix}-jasminePetal)`}
                    stroke={`url(#${idPrefix}-goldStroke)`}
                    strokeWidth="0.8"
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill="#D4AF37" />
              </g>
            ))}
          </g>

          {/* ========================================================= */}
          {/* LAYER 3: Foreground Antique Gold Filigree & Tendrils      */}
          {/* ========================================================= */}
          <g stroke={`url(#${idPrefix}-goldStroke)`} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Sinuous Curling Gold Vine Tendrils */}
            <path d="M 45 400 C 65 390, 75 410, 68 425 C 62 438, 48 430, 52 418" strokeWidth="1.4" />
            <path d="M 555 400 C 535 390, 525 410, 532 425 C 538 438, 552 430, 548 418" strokeWidth="1.4" />

            <path d="M 85 200 C 105 180, 125 200, 118 215 C 110 228, 95 220, 100 205" strokeWidth="1.4" />
            <path d="M 515 200 C 495 180, 475 200, 482 215 C 490 228, 505 220, 500 205" strokeWidth="1.4" />

            <path d="M 190 70 C 210 50, 230 65, 225 80" strokeWidth="1.4" />
            <path d="M 410 70 C 390 50, 370 65, 375 80" strokeWidth="1.4" />

            {/* Delicate Stamen Dots and Golden Dewdrops */}
            <circle cx="300" cy="4" r="3.2" fill={`url(#${idPrefix}-goldStroke)`} stroke="none" />
            <circle cx="288" cy="8" r="2.2" fill={`url(#${idPrefix}-goldStroke)`} stroke="none" />
            <circle cx="312" cy="8" r="2.2" fill={`url(#${idPrefix}-goldStroke)`} stroke="none" />
            <circle cx="276" cy="16" r="2" fill={`url(#${idPrefix}-goldStroke)`} stroke="none" />
            <circle cx="324" cy="16" r="2" fill={`url(#${idPrefix}-goldStroke)`} stroke="none" />

            {/* Base Plinth / Grounding Stems */}
            <line x1="38" y1="745" x2="562" y2="745" strokeWidth="3" />
            <line x1="50" y1="752" x2="550" y2="752" strokeWidth="1.4" opacity="0.6" strokeDasharray="6 4" />
          </g>
        </svg>
      </div>

      {/* Inner Framed Content Area (High Contrast, Clean Typography) */}
      <div className="relative z-10 w-full pt-20 sm:pt-28 pb-10 px-5 sm:px-12 text-center">
        {/* Crown Monogram Seal Emblem */}
        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/80 bg-white/90 px-4 py-1 text-[11px] font-bold tracking-widest text-gold-900 shadow-sm backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
            <span>{subtitle}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
          </div>
          <div className="mt-2 text-gold-700 font-serif text-xl sm:text-2xl font-bold tracking-widest drop-shadow-xs">
            {initials}
          </div>
        </div>

        {/* Dynamic Framed Content */}
        {children}
      </div>
    </div>
  );
}
