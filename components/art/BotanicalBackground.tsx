import React from "react";

/**
 * BotanicalBackground - Pure SVG botanical pattern with multi-stop watercolor wash
 * and gentle drifting falling petals (GPU-accelerated CSS).
 */
export default function BotanicalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Multi-stop CSS Watercolor Radial Gradients */}
      {/* Top Center: Warm Champagne & Ivory Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] sm:w-[1050px] h-[650px] sm:h-[850px] rounded-full blur-[110px] opacity-60 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 238, 214, 0.7) 0%, rgba(232, 197, 190, 0.25) 45%, transparent 72%)",
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
              {/* Top-Left Corner */}
              <g transform="translate(0, 0)" stroke="#C5A059">
                <circle cx="0" cy="0" r="1.5" fill="#C5A059" />
                <path d="M 0 0 C 4 8, 8 4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C 8 4, 8 -4, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
                <path d="M 0 0 C 4 -8, -4 -8, 0 0 Z" fill="#C5A059" fillOpacity="0.3" />
              </g>

              {/* Bottom-Right Corner */}
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

      {/* 3. Pure CSS SVG Drifting Falling Petals (GPU accelerated via translate3d) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: "8%", delay: "0s", duration: "13s", size: 18, rotate: "rotate-12", color: "#E8C5BE" },
          { left: "24%", delay: "4s", duration: "16s", size: 22, rotate: "-rotate-45", color: "#D8A49B" },
          { left: "44%", delay: "1.5s", duration: "14s", size: 16, rotate: "rotate-45", color: "#FAF0EE" },
          { left: "64%", delay: "6s", duration: "17s", size: 20, rotate: "-rotate-12", color: "#E8C5BE" },
          { left: "80%", delay: "3s", duration: "15s", size: 24, rotate: "rotate-90", color: "#D8A49B" },
          { left: "92%", delay: "8s", duration: "18s", size: 16, rotate: "-rotate-90", color: "#F4E0DC" },
        ].map((p, idx) => (
          <div
            key={idx}
            className="absolute top-0 animate-float-petal opacity-0"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              willChange: "transform, opacity",
              transform: "translate3d(0, -30px, 0)",
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform ${p.rotate} drop-shadow-xs`}
            >
              {/* Organic Soft Petal Shape */}
              <path
                d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
                fill={p.color}
                fillOpacity="0.75"
                stroke="#C5A059"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
              {/* Petal Center Rib Line */}
              <path
                d="M 15 6 C 15 12, 15 18, 15 24"
                stroke="#FAF7EE"
                strokeWidth="0.6"
                strokeOpacity="0.6"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
