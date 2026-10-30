import React from "react";

export interface GardenBedDividerProps {
  variant?: "meadow" | "canopy" | "footer";
  className?: string;
}

/**
 * GardenBedDivider - A dense romantic botanical meadow border in dusty rose, soft blush, and rose gold.
 * Features code-drawn pure SVG illustrations:
 * - Wild Peonies: Multi-petal blooming rosettes with warm rose-gold pistils
 * - Bellflowers: Delicate fluted campanula blossoms in pastel blush
 * - Lavender Sprigs: Slender upright spikes with clustered pink florets
 * - Layered Foliage: Delicate pinnate fronds in warm champagne rose-gold (ZERO GREEN)
 */
export default function GardenBedDivider({
  variant = "meadow",
  className = "",
}: GardenBedDividerProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  if (variant === "footer") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-32 md:h-36 block drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8F2" />
              <stop offset="40%" stopColor="#E2B686" />
              <stop offset="70%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#C89B7B" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-roseDeep`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8C4A58" />
              <stop offset="50%" stopColor="#B56576" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-roseBloom`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FADBD8" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-lavender`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#B56576" />
              <stop offset="60%" stopColor="#F5B7B1" />
              <stop offset="100%" stopColor="#FADBD8" />
            </linearGradient>
          </defs>

          {/* Continuous Ground Vine Line */}
          <path
            d="M 0 138 C 150 130, 300 136, 450 132 C 600 138, 750 130, 900 135 C 1050 132, 1150 136, 1200 138"
            stroke={`url(#${idPrefix}-gold)`}
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />

          {/* BACKGROUND: Romantic Rose & Champagne Foliage (Zero Green) */}
          <g fill={`url(#${idPrefix}-roseDeep)`} fillOpacity="0.75" stroke="#C89B7B" strokeWidth="0.8">
            {/* Fern Cluster 1 (Left) */}
            <path d="M 60 140 Q 55 90 40 50 Q 58 75 75 140 Z" />
            <path d="M 40 50 Q 25 55 18 62 Q 32 60 40 68 Z" />
            <path d="M 43 72 Q 22 80 14 90 Q 30 84 45 92 Z" />
            <path d="M 48 95 Q 26 104 20 115 Q 36 108 52 115 Z" />
            <path d="M 40 50 Q 55 52 65 60 Q 50 62 44 70 Z" />
            <path d="M 45 72 Q 68 76 78 86 Q 62 84 48 94 Z" />

            {/* Fern Cluster 2 (Mid-Left) */}
            <path d="M 280 140 Q 295 85 320 40 Q 305 75 295 140 Z" />
            <path d="M 320 40 Q 338 48 348 58 Q 330 56 318 64 Z" />
            <path d="M 314 68 Q 340 76 352 90 Q 330 84 308 94 Z" />
            <path d="M 320 40 Q 302 46 290 54 Q 306 58 314 66 Z" />

            {/* Fern Cluster 3 (Mid-Right) */}
            <path d="M 880 140 Q 865 85 840 40 Q 855 75 865 140 Z" />
            <path d="M 840 40 Q 822 48 812 58 Q 830 56 842 64 Z" />
            <path d="M 846 68 Q 820 76 808 90 Q 830 84 852 94 Z" />
            <path d="M 840 40 Q 858 46 870 54 Q 854 58 846 66 Z" />

            {/* Fern Cluster 4 (Right) */}
            <path d="M 1120 140 Q 1125 90 1140 50 Q 1122 75 1105 140 Z" />
            <path d="M 1140 50 Q 1155 55 1162 62 Q 1148 60 1140 68 Z" />
            <path d="M 1137 72 Q 1158 80 1166 90 Q 1150 84 1135 92 Z" />
          </g>

          {/* MIDGROUND: Lavender Sprigs & Bellflowers */}
          <g stroke={`url(#${idPrefix}-roseDeep)`} strokeWidth="1.5" strokeLinecap="round">
            {/* Lavender 1 */}
            <path d="M 160 140 Q 155 100 152 45" />
            <g fill="#D88A96" stroke="#FAF0F2" strokeWidth="0.5">
              <ellipse cx="152" cy="45" rx="3.5" ry="5" />
              <ellipse cx="148" cy="54" rx="4" ry="4" />
              <ellipse cx="156" cy="56" rx="4" ry="4" />
              <ellipse cx="147" cy="66" rx="4.5" ry="4.5" />
              <ellipse cx="157" cy="68" rx="4.5" ry="4.5" />
              <ellipse cx="148" cy="78" rx="4.5" ry="4.5" />
              <ellipse cx="156" cy="80" rx="4.5" ry="4.5" />
            </g>

            {/* Lavender 2 */}
            <path d="M 420 140 Q 425 95 430 40" />
            <g fill="#D88A96" stroke="#FAF0F2" strokeWidth="0.5">
              <ellipse cx="430" cy="40" rx="3.5" ry="5" />
              <ellipse cx="426" cy="50" rx="4" ry="4" />
              <ellipse cx="434" cy="52" rx="4" ry="4" />
              <ellipse cx="425" cy="62" rx="4.5" ry="4.5" />
              <ellipse cx="435" cy="64" rx="4.5" ry="4.5" />
              <ellipse cx="425" cy="74" rx="4.5" ry="4.5" />
              <ellipse cx="435" cy="76" rx="4.5" ry="4.5" />
            </g>

            {/* Lavender 3 */}
            <path d="M 760 140 Q 755 95 750 42" />
            <g fill="#D88A96" stroke="#FAF0F2" strokeWidth="0.5">
              <ellipse cx="750" cy="42" rx="3.5" ry="5" />
              <ellipse cx="745" cy="52" rx="4" ry="4" />
              <ellipse cx="755" cy="54" rx="4" ry="4" />
              <ellipse cx="744" cy="64" rx="4.5" ry="4.5" />
              <ellipse cx="756" cy="66" rx="4.5" ry="4.5" />
            </g>

            {/* Lavender 4 */}
            <path d="M 1020 140 Q 1025 100 1028 48" />
            <g fill="#D88A96" stroke="#FAF0F2" strokeWidth="0.5">
              <ellipse cx="1028" cy="48" rx="3.5" ry="5" />
              <ellipse cx="1024" cy="57" rx="4" ry="4" />
              <ellipse cx="1032" cy="59" rx="4" ry="4" />
              <ellipse cx="1023" cy="69" rx="4.5" ry="4.5" />
              <ellipse cx="1033" cy="71" rx="4.5" ry="4.5" />
            </g>
          </g>

          {/* Campanula Bellflowers in Soft Pastel Blush */}
          <g>
            <path
              d="M 210 140 Q 215 95 228 65 Q 235 50 248 55"
              fill="none"
              stroke="#D4A373"
              strokeWidth="1.5"
            />
            <path
              d="M 248 55 C 242 58, 238 68, 244 76 C 250 82, 262 82, 266 74 C 270 66, 264 56, 255 54 Z"
              fill="#FADBD8"
              stroke={`url(#${idPrefix}-gold)`}
              strokeWidth="1"
            />
            <path d="M 244 76 L 241 81 M 255 82 L 255 87 M 266 74 L 271 78" stroke="#D4A373" strokeWidth="1" />

            <path
              d="M 960 140 Q 955 95 942 65 Q 935 50 922 55"
              fill="none"
              stroke="#D4A373"
              strokeWidth="1.5"
            />
            <path
              d="M 922 55 C 928 58, 932 68, 926 76 C 920 82, 908 82, 904 74 C 900 66, 906 56, 915 54 Z"
              fill="#FADBD8"
              stroke={`url(#${idPrefix}-gold)`}
              strokeWidth="1"
            />
            <path d="M 926 76 L 929 81 M 915 82 L 915 87 M 904 74 L 899 78" stroke="#D4A373" strokeWidth="1" />
          </g>

          {/* FOREGROUND: Wild Peonies & Rose-Gold Rosettes */}
          {/* Peony 1 */}
          <g transform="translate(360, 85)">
            <ellipse cx="0" cy="5" rx="24" ry="16" fill={`url(#${idPrefix}-roseDeep)`} opacity="0.4" />
            <path
              d="M -22 -6 C -30 -16, -15 -28, 0 -22 C 15 -28, 30 -16, 22 -6 C 30 10, 16 24, 0 20 C -16 24, -30 10, -22 -6 Z"
              fill={`url(#${idPrefix}-roseBloom)`}
              stroke={`url(#${idPrefix}-gold)`}
              strokeWidth="1.2"
            />
            <path
              d="M -14 -4 C -18 -12, -8 -18, 0 -14 C 8 -18, 18 -12, 14 -4 C 18 6, 8 14, 0 12 C -8 14, -18 6, -14 -4 Z"
              fill="#FFFFFF"
              stroke="#D88A96"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="4.5" fill="#D4A373" />
            <circle cx="-2" cy="-2" r="1.5" fill="#FAF0F2" />
          </g>

          {/* Peony 2 (Center Major) */}
          <g transform="translate(600, 75)">
            <path d="M -30 15 C -45 10, -50 -5, -40 -15 C -30 -5, -25 5, -15 8 Z" fill="#D88A96" opacity="0.6" />
            <path d="M 30 15 C 45 10, 50 -5, 40 -15 C 30 -5, 25 5, 15 8 Z" fill="#D88A96" opacity="0.6" />
            <circle cx="0" cy="0" r="28" fill="#FCE4E8" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1.2" />
            <path
              d="M -18 -15 C -25 -5, -25 15, -10 22 C 5 26, 20 18, 22 5 C 24 -12, 10 -24, -4 -22 Z"
              fill="#FFFFFF"
              stroke="#D88A96"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="14" fill="#FADBD8" stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" />
            <circle cx="0" cy="0" r="6" fill="#D4A373" />
            <circle cx="-1" cy="-1" r="2" fill="#FAF0F2" />
          </g>

          {/* Peony 3 */}
          <g transform="translate(840, 85)">
            <ellipse cx="0" cy="5" rx="24" ry="16" fill={`url(#${idPrefix}-roseDeep)`} opacity="0.4" />
            <path
              d="M -22 -6 C -30 -16, -15 -28, 0 -22 C 15 -28, 30 -16, 22 -6 C 30 10, 16 24, 0 20 C -16 24, -30 10, -22 -6 Z"
              fill={`url(#${idPrefix}-roseBloom)`}
              stroke={`url(#${idPrefix}-gold)`}
              strokeWidth="1.2"
            />
            <path
              d="M -14 -4 C -18 -12, -8 -18, 0 -14 C 8 -18, 18 -12, 14 -4 C 18 6, 8 14, 0 12 C -8 14, -18 6, -14 -4 Z"
              fill="#FFFFFF"
              stroke="#D88A96"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="4.5" fill="#D4A373" />
            <circle cx="-2" cy="-2" r="1.5" fill="#FAF0F2" />
          </g>

          {/* Delicate Winding Rose-Gold Tendrils Across Meadow */}
          <g stroke={`url(#${idPrefix}-gold)`} strokeWidth="1" fill="none" opacity="0.75" strokeLinecap="round">
            <path d="M 120 120 C 135 105, 145 115, 155 102 C 165 90, 155 80, 168 75" />
            <circle cx="168" cy="75" r="2" fill="#D4A373" stroke="none" />
            <path d="M 480 120 C 500 105, 515 110, 530 95 C 540 85, 535 70, 545 62" />
            <circle cx="545" cy="62" r="2" fill="#D4A373" stroke="none" />
            <path d="M 680 120 C 695 105, 710 110, 725 95 C 735 85, 730 70, 740 62" />
            <circle cx="740" cy="62" r="2" fill="#D4A373" stroke="none" />
            <path d="M 1060 120 C 1075 105, 1085 115, 1095 102 C 1105 90, 1095 80, 1108 75" />
            <circle cx="1108" cy="75" r="2" fill="#D4A373" stroke="none" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "canopy") {
    return (
      <div
        className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 block drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`${idPrefix}-goldCanopy`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8F2" />
              <stop offset="50%" stopColor="#E2B686" />
              <stop offset="100%" stopColor="#D4A373" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-roseCanopy`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C4A58" />
              <stop offset="60%" stopColor="#B56576" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>

            <linearGradient id={`${idPrefix}-rosePetal`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FADBD8" />
              <stop offset="100%" stopColor="#D88A96" />
            </linearGradient>
          </defs>

          {/* Top Hanging Trellis Bar */}
          <line x1="0" y1="2" x2="1200" y2="2" stroke={`url(#${idPrefix}-goldCanopy)`} strokeWidth="2" opacity="0.6" />

          {/* Inverted Trailing Foliage & Hanging Jasmine Sprigs */}
          <g fill={`url(#${idPrefix}-roseCanopy)`} stroke="#C89B7B" strokeWidth="0.8">
            <path d="M 120 0 Q 130 35 150 65 Q 135 40 128 0 Z" />
            <path d="M 150 65 Q 165 72 172 60 Q 158 55 145 52 Z" />
            <path d="M 135 35 Q 115 42 105 52 Q 122 48 132 40 Z" />

            <path d="M 380 0 Q 395 40 420 75 Q 405 45 395 0 Z" />
            <path d="M 420 75 Q 438 82 445 70 Q 430 65 418 60 Z" />

            <path d="M 580 0 Q 590 45 600 82 Q 610 45 620 0 Z" />
            <path d="M 600 82 Q 580 65 572 50 Q 590 60 598 70 Z" />
            <path d="M 600 82 Q 620 65 628 50 Q 610 60 602 70 Z" />

            <path d="M 820 0 Q 805 40 780 75 Q 795 45 805 0 Z" />
            <path d="M 780 75 Q 762 82 755 70 Q 770 65 782 60 Z" />

            <path d="M 1080 0 Q 1070 35 1050 65 Q 1065 40 1072 0 Z" />
          </g>

          {/* Hanging Rosettes & Jasmine Drops */}
          <g fill={`url(#${idPrefix}-rosePetal)`} stroke={`url(#${idPrefix}-goldCanopy)`} strokeWidth="1">
            <circle cx="150" cy="65" r="7" />
            <circle cx="420" cy="75" r="8" />
            <circle cx="600" cy="82" r="10" />
            <circle cx="780" cy="75" r="8" />
            <circle cx="1050" cy="65" r="7" />
          </g>

          <circle cx="150" cy="65" r="2.5" fill="#D4A373" />
          <circle cx="420" cy="75" r="3" fill="#D4A373" />
          <circle cx="600" cy="82" r="3.5" fill="#D4A373" />
          <circle cx="780" cy="75" r="3" fill="#D4A373" />
          <circle cx="1050" cy="65" r="2.5" fill="#D4A373" />
        </svg>
      </div>
    );
  }

  // Default: variant === "meadow"
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none my-6 sm:my-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 block opacity-90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${idPrefix}-goldMeadow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8F2" />
            <stop offset="35%" stopColor="#E2B686" />
            <stop offset="70%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#C89B7B" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-roseMeadow`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8C4A58" />
            <stop offset="60%" stopColor="#B56576" />
            <stop offset="100%" stopColor="#D88A96" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-petalMeadow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FADBD8" />
            <stop offset="100%" stopColor="#D88A96" />
          </linearGradient>
        </defs>

        {/* Central Baseline Stem */}
        <path
          d="M 40 76 C 250 68, 450 72, 600 70 C 750 68, 950 72, 1160 76"
          stroke={`url(#${idPrefix}-goldMeadow)`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Foliage Clustered Along Meadow Stem */}
        <g fill={`url(#${idPrefix}-roseMeadow)`} stroke="#C89B7B" strokeWidth="0.6" opacity="0.85">
          <path d="M 180 75 Q 170 45 155 25 Q 175 42 195 74 Z" />
          <path d="M 155 25 Q 140 28 132 35 Q 146 34 155 40 Z" />
          <path d="M 158 42 Q 138 48 130 58 Q 148 52 162 55 Z" />

          <path d="M 420 73 Q 430 40 450 18 Q 435 38 428 73 Z" />
          <path d="M 450 18 Q 465 24 472 32 Q 458 30 448 38 Z" />

          <path d="M 540 71 Q 530 35 510 15 Q 528 35 548 70 Z" />
          <path d="M 660 71 Q 670 35 690 15 Q 672 35 652 70 Z" />

          <path d="M 780 73 Q 770 40 750 18 Q 765 38 772 73 Z" />
          <path d="M 750 18 Q 735 24 728 32 Q 742 30 752 38 Z" />

          <path d="M 1020 75 Q 1030 45 1045 25 Q 1025 42 1005 74 Z" />
        </g>

        {/* Blooming Florets & Rosettes Along Stem */}
        <g>
          <g transform="translate(260, 52)">
            <circle cx="0" cy="0" r="14" fill={`url(#${idPrefix}-petalMeadow)`} stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="1" />
            <circle cx="0" cy="0" r="7" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#D4A373" />
          </g>

          <path d="M 330 72 Q 338 52 350 40" stroke="#D4A373" strokeWidth="1.2" fill="none" />
          <ellipse cx="350" cy="40" rx="7" ry="5" fill="#FADBD8" stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="0.8" />
          <circle cx="350" cy="40" r="2" fill="#D4A373" />

          {/* Centerpiece Grande Peony */}
          <g transform="translate(600, 48)">
            <circle cx="0" cy="0" r="22" fill="#FCE4E8" stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="1.2" />
            <path
              d="M -14 -12 C -20 -4, -20 12, -8 18 C 4 21, 16 15, 18 4 C 19 -10, 8 -19, -3 -18 Z"
              fill="#FFFFFF"
              stroke="#D88A96"
              strokeWidth="0.9"
            />
            <circle cx="0" cy="0" r="10" fill="#FADBD8" stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="0.8" />
            <circle cx="0" cy="0" r="4.5" fill="#D4A373" />
            <circle cx="-1" cy="-1" r="1.5" fill="#FAF0F2" />
          </g>

          <path d="M 870 72 Q 862 52 850 40" stroke="#D4A373" strokeWidth="1.2" fill="none" />
          <ellipse cx="850" cy="40" rx="7" ry="5" fill="#FADBD8" stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="0.8" />
          <circle cx="850" cy="40" r="2" fill="#D4A373" />

          <g transform="translate(940, 52)">
            <circle cx="0" cy="0" r="14" fill={`url(#${idPrefix}-petalMeadow)`} stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="1" />
            <circle cx="0" cy="0" r="7" fill="#FFFFFF" stroke="#D88A96" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#D4A373" />
          </g>
        </g>

        {/* Rose-Gold Tendrils & Stamen Accents */}
        <g stroke={`url(#${idPrefix}-goldMeadow)`} strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M 70 74 C 95 62, 115 65, 130 52" />
          <circle cx="130" cy="52" r="1.8" fill="#D4A373" stroke="none" />

          <path d="M 680 68 C 705 55, 720 58, 735 48" />
          <circle cx="735" cy="48" r="1.8" fill="#D4A373" stroke="none" />

          <path d="M 1080 74 C 1105 62, 1120 65, 1135 54" />
          <circle cx="1135" cy="54" r="1.8" fill="#D4A373" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
