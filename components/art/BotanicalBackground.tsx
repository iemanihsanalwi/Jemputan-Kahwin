import React from "react";

/**
 * BotanicalBackground - Pure SVG botanical pattern with multi-stop watercolor wash,
 * dappled sunlight glow spots ("komorebi"), and continuous garden drift of 12 soft-falling
 * petals, olive leaves, and golden pollen specks.
 */
export default function BotanicalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Multi-stop CSS Watercolor Radial Gradients & Dappled Sunlight ("Komorebi") */}
      {/* Top Center: Warm Champagne & Ivory Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1050px] h-[650px] sm:h-[850px] rounded-full blur-[110px] opacity-60 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 238, 214, 0.75) 0%, rgba(232, 197, 190, 0.25) 45%, transparent 72%)",
        }}
      />

      {/* Dappled Sunlight Spot 1 (Top-Left Garden Canopy Glow) */}
      <div
        className="absolute top-16 left-[10%] w-[420px] h-[420px] rounded-full blur-[90px] opacity-45 animate-sunbeam"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 252, 232, 0.7) 0%, rgba(212, 175, 55, 0.18) 50%, transparent 70%)",
        }}
      />

      {/* Mid Left: Soft Blush & Dusty Rose Wash */}
      <div
        className="absolute top-[35%] -left-36 w-[620px] h-[620px] rounded-full blur-[130px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(216, 164, 155, 0.35) 0%, rgba(232, 197, 190, 0.15) 50%, transparent 70%)",
        }}
      />

      {/* Dappled Sunlight Spot 2 (Mid-Right Komorebi Sunbeam) */}
      <div
        className="absolute top-[45%] right-[8%] w-[480px] h-[480px] rounded-full blur-[100px] opacity-40 animate-sunbeam"
        style={{
          background:
            "radial-gradient(circle, rgba(250, 245, 225, 0.65) 0%, rgba(216, 164, 155, 0.2) 48%, transparent 70%)",
          animationDelay: "4s",
        }}
      />

      {/* Mid Right: Botanical Sage & Forest Wash */}
      <div
        className="absolute top-[55%] -right-36 w-[640px] h-[640px] rounded-full blur-[130px] opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(62, 92, 73, 0.28) 0%, rgba(124, 165, 138, 0.12) 50%, transparent 70%)",
        }}
      />

      {/* Bottom Center: Warm Antique Gold Wash */}
      <div
        className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[800px] h-[650px] rounded-full blur-[140px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(197, 160, 89, 0.25) 0%, rgba(244, 239, 230, 0.15) 55%, transparent 70%)",
        }}
      />

      {/* 2. Seamless Botanical Leaves & Blossoms Repeating SVG Pattern Tile */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="botanical-tile"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#2D5A43" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Central Leaf Pair */}
              <path d="M 60 60 C 50 48, 38 46, 32 50 C 36 62, 48 62, 60 60 Z" fill="#2D5A43" fillOpacity="0.25" />
              <path d="M 60 60 C 70 48, 82 46, 88 50 C 84 62, 72 62, 60 60 Z" fill="#2D5A43" fillOpacity="0.25" />

              {/* Graceful Sinuous Vine Branch */}
              <path d="M 10 110 C 35 95, 45 75, 60 60 C 75 45, 85 25, 110 10" />

              {/* Secondary Branch Tendril */}
              <path d="M 60 60 C 55 75, 62 90, 78 98" opacity="0.8" />
              <path d="M 78 98 C 84 94, 88 98, 84 104 C 80 106, 74 102, 78 98 Z" fill="#C5A059" fillOpacity="0.3" stroke="#C5A059" />

              <path d="M 60 60 C 65 45, 58 30, 42 22" opacity="0.8" />
              <path d="M 42 22 C 36 26, 32 22, 36 16 C 40 14, 46 18, 42 22 Z" fill="#C5A059" fillOpacity="0.3" stroke="#C5A059" />

              {/* Corner Petite Jasmine Blossoms (Repeat at tile seams) */}
              <g transform="translate(0, 0)" stroke="#C5A059">
                <circle cx="0" cy="0" r="1.5" fill="#C5A059" />
                <path d="M 0 0 C 4 8, 8 4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C 8 4, 8 -4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C 4 -8, -4 -8, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
              </g>

              <g transform="translate(120, 120)" stroke="#C5A059">
                <circle cx="0" cy="0" r="1.5" fill="#C5A059" />
                <path d="M 0 0 C -4 -8, -8 -4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C -8 -4, -8 4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C -4 8, 4 8, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
              </g>

              {/* Center Dewdrop / Stamen Accent */}
              <circle cx="60" cy="60" r="2" fill="#C5A059" stroke="none" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#botanical-tile)" />
      </svg>

      {/* 3. Pure CSS SVG Drifting Flora: 12 Petals, Olive Leaves & Golden Pollen (GPU accelerated via translate3d & rotateZ) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Item 1: Soft Blush Wild Rose Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "6%",
            animationDelay: "0s",
            animationDuration: "14s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={22} height={22} viewBox="0 0 30 30" fill="none" className="transform rotate-12 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#E8C5BE"
              fillOpacity="0.8"
              stroke="#C5A059"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />
            <path d="M 15 6 C 15 12, 15 18, 15 24" stroke="#FAF7EE" strokeWidth="0.6" strokeOpacity="0.7" />
          </svg>
        </div>

        {/* Item 2: Golden Pollen Glow Speck */}
        <div
          className="absolute top-0 animate-pollen-float opacity-0"
          style={{
            left: "15%",
            animationDelay: "3s",
            animationDuration: "13s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -20px, 0)",
          }}
        >
          <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#D4AF37" fillOpacity="0.35" filter="blur(1px)" />
            <circle cx="8" cy="8" r="3" fill="#D4AF37" />
            <circle cx="7" cy="7" r="1" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Item 3: Dusty Rose Curved Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "22%",
            animationDelay: "5s",
            animationDuration: "17s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={25} height={25} viewBox="0 0 30 30" fill="none" className="transform -rotate-45 drop-shadow-xs">
            <path
              d="M 15 2 C 24 4, 29 11, 27 19 C 25 26, 17 29, 13 27 C 7 24, 3 16, 5 9 C 7 3, 11 1, 15 2 Z"
              fill="#D8A49B"
              fillOpacity="0.75"
              stroke="#C5A059"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* Item 4: Botanical Sage Olive Leaf */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "32%",
            animationDelay: "1.5s",
            animationDuration: "16s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={20} height={28} viewBox="0 0 20 28" fill="none" className="transform rotate-45 drop-shadow-xs">
            <path
              d="M 10 2 C 16 7, 19 15, 17 22 C 15 27, 10 27, 7 24 C 2 19, 3 9, 10 2 Z"
              fill="#3E5C49"
              fillOpacity="0.75"
              stroke="#2D5A43"
              strokeWidth="0.8"
            />
            <path d="M 10 4 L 11 25" stroke="#FAF7EE" strokeWidth="0.6" strokeOpacity="0.7" />
            <path d="M 10 10 Q 14 12 15 15" stroke="#FAF7EE" strokeWidth="0.5" strokeOpacity="0.5" />
            <path d="M 10 16 Q 6 18 5 21" stroke="#FAF7EE" strokeWidth="0.5" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Item 5: Pale Cream Jasmine Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "42%",
            animationDelay: "7s",
            animationDuration: "15s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={18} height={18} viewBox="0 0 30 30" fill="none" className="transform rotate-30 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#FAF0EE"
              fillOpacity="0.85"
              stroke="#D8A49B"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />
            <circle cx="15" cy="15" r="2" fill="#D4AF37" />
          </svg>
        </div>

        {/* Item 6: Golden Pollen Glow Speck */}
        <div
          className="absolute top-0 animate-pollen-float opacity-0"
          style={{
            left: "52%",
            animationDelay: "0.5s",
            animationDuration: "15s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -20px, 0)",
          }}
        >
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" fill="#C5A059" fillOpacity="0.3" filter="blur(1px)" />
            <circle cx="8" cy="8" r="3.5" fill="#D4AF37" />
            <circle cx="7" cy="7" r="1.2" fill="#FAF7EE" />
          </svg>
        </div>

        {/* Item 7: Soft Blush Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "60%",
            animationDelay: "4s",
            animationDuration: "18s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={24} height={24} viewBox="0 0 30 30" fill="none" className="transform -rotate-12 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#E8C5BE"
              fillOpacity="0.8"
              stroke="#C5A059"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />
            <path d="M 15 6 C 15 12, 15 18, 15 24" stroke="#FAF7EE" strokeWidth="0.6" strokeOpacity="0.7" />
          </svg>
        </div>

        {/* Item 8: Botanical Sage Olive Leaf */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "70%",
            animationDelay: "9s",
            animationDuration: "15s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={20} height={28} viewBox="0 0 20 28" fill="none" className="transform -rotate-45 drop-shadow-xs">
            <path
              d="M 10 2 C 16 7, 19 15, 17 22 C 15 27, 10 27, 7 24 C 2 19, 3 9, 10 2 Z"
              fill="#2D5A43"
              fillOpacity="0.7"
              stroke="#183024"
              strokeWidth="0.8"
            />
            <path d="M 10 4 L 11 25" stroke="#FAF7EE" strokeWidth="0.6" strokeOpacity="0.7" />
          </svg>
        </div>

        {/* Item 9: Dusty Rose Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "78%",
            animationDelay: "2s",
            animationDuration: "14s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={22} height={22} viewBox="0 0 30 30" fill="none" className="transform rotate-90 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#D8A49B"
              fillOpacity="0.75"
              stroke="#C5A059"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* Item 10: Golden Pollen Glow Speck */}
        <div
          className="absolute top-0 animate-pollen-float opacity-0"
          style={{
            left: "86%",
            animationDelay: "6s",
            animationDuration: "12s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -20px, 0)",
          }}
        >
          <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#D4AF37" fillOpacity="0.4" filter="blur(1px)" />
            <circle cx="8" cy="8" r="3" fill="#D4AF37" />
            <circle cx="7" cy="7" r="1" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Item 11: Soft Blush Wild Rose Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "92%",
            animationDelay: "8.5s",
            animationDuration: "17s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={20} height={20} viewBox="0 0 30 30" fill="none" className="transform -rotate-90 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#F4E0DC"
              fillOpacity="0.8"
              stroke="#C5A059"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* Item 12: Pale Jasmine Petal */}
        <div
          className="absolute top-0 animate-garden-drift opacity-0"
          style={{
            left: "97%",
            animationDelay: "11s",
            animationDuration: "19s",
            willChange: "transform, opacity",
            transform: "translate3d(0, -40px, 0)",
          }}
        >
          <svg width={16} height={16} viewBox="0 0 30 30" fill="none" className="transform rotate-45 drop-shadow-xs">
            <path
              d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
              fill="#FAF7EE"
              fillOpacity="0.85"
              stroke="#D8A49B"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
