import React from "react";

/**
 * BotanicalBackground - Minimalist, high-performance Islamic botanical background.
 * 
 * Performance & Aesthetic:
 * - Base: Warm Ivory / Cream (#FAF7F2 / #F5EFEB)
 * - Static radial wash for subtle depth without ANY re-rasterization or animation loops.
 * - Subtle botanical tile pattern in sage (#7D8B74) and champagne gold (#D4AF37) at low opacity.
 * - Zero CPU/GPU idle draw: All continuous CSS animation loops (sunbeam, falling petals, pollen) removed.
 */
export default function BotanicalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Static Ambient Gradients - Zero Animation Overhead */}
      {/* Top Center: Warm Ivory Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[950px] h-[600px] sm:h-[750px] rounded-full opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(253, 251, 247, 0.95) 0%, rgba(245, 239, 235, 0.6) 45%, transparent 75%)",
        }}
      />

      {/* Mid Left: Soft Botanical Sage Tint */}
      <div
        className="absolute top-[35%] -left-36 w-[550px] h-[550px] rounded-full opacity-35 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125, 139, 116, 0.25) 0%, rgba(250, 247, 242, 0.15) 50%, transparent 70%)",
        }}
      />

      {/* Mid Right: Soft Champagne Gold Tint */}
      <div
        className="absolute top-[55%] -right-36 w-[550px] h-[550px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(250, 247, 242, 0.1) 50%, transparent 70%)",
        }}
      />

      {/* Bottom Center: Warm Grounding Wash */}
      <div
        className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(197, 160, 89, 0.2) 0%, rgba(250, 247, 242, 0.15) 55%, transparent 70%)",
        }}
      />

      {/* 2. Seamless Botanical Olive & Vine SVG Pattern Watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="botanical-tile-static"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#7D8B74" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Central Olive Leaf Pair */}
              <path d="M 60 60 C 50 48, 38 46, 32 50 C 36 62, 48 62, 60 60 Z" fill="#7D8B74" fillOpacity="0.25" />
              <path d="M 60 60 C 70 48, 82 46, 88 50 C 84 62, 72 62, 60 60 Z" fill="#7D8B74" fillOpacity="0.25" />

              {/* Graceful Sinuous Vine Branch */}
              <path d="M 10 110 C 35 95, 45 75, 60 60 C 75 45, 85 25, 110 10" />

              {/* Secondary Branch Tendril */}
              <path d="M 60 60 C 55 75, 62 90, 78 98" opacity="0.8" />
              <path d="M 78 98 C 84 94, 88 98, 84 104 C 80 106, 74 102, 78 98 Z" fill="#D4AF37" fillOpacity="0.3" stroke="#7D8B74" />

              <path d="M 60 60 C 65 45, 58 30, 42 22" opacity="0.8" />
              <path d="M 42 22 C 36 26, 32 22, 36 16 C 40 14, 46 18, 42 22 Z" fill="#D4AF37" fillOpacity="0.3" stroke="#7D8B74" />

              {/* Corner Petite Olive Blossoms */}
              <g transform="translate(0, 0)" stroke="#D4AF37">
                <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
                <path d="M 0 0 C 4 8, 8 4, 0 0 Z" fill="#7D8B74" fillOpacity="0.3" />
                <path d="M 0 0 C 8 4, 8 -4, 0 0 Z" fill="#7D8B74" fillOpacity="0.3" />
              </g>

              <g transform="translate(120, 120)" stroke="#D4AF37">
                <circle cx="0" cy="0" r="1.5" fill="#D4AF37" />
                <path d="M 0 0 C -4 -8, -8 -4, 0 0 Z" fill="#7D8B74" fillOpacity="0.3" />
                <path d="M 0 0 C -8 -4, -8 4, 0 0 Z" fill="#7D8B74" fillOpacity="0.3" />
              </g>

              {/* Center Accent */}
              <circle cx="60" cy="60" r="2" fill="#D4AF37" stroke="none" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#botanical-tile-static)" />
      </svg>
    </div>
  );
}
