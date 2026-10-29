import React from "react";

/**
 * ZellijBackground - Moroccan / Islamic geometric repeating zellij vector pattern
 * Features:
 * - Pure SVG geometric 8-point star (Khatam) tessellation pattern at 3-5% opacity
 * - Ambient warm gold & deep emerald illumination gradients
 * - GPU-accelerated CSS floating star particles for magical depth
 */
export default function ZellijBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Ambient Warm Illuminations (Soft CSS Radial Gradients) */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[600px] sm:h-[800px] rounded-full blur-[100px] opacity-40 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(243, 229, 171, 0.15) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -left-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(20, 70, 52, 0.22) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[70%] -right-40 w-[650px] h-[650px] rounded-full blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 65%)",
        }}
      />

      {/* 2. Moroccan / Islamic Geometric Zellij Repeating SVG Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Repeating Moroccan 8-point geometric star tile */}
          <pattern
            id="zellij-tile"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Center 8-point star */}
            <g fill="none" stroke="#5D4114" strokeWidth="1.2">
              {/* Outer Square 1 */}
              <rect x="25" y="25" width="30" height="30" />
              {/* Outer Square 2 rotated 45 deg */}
              <rect
                x="25"
                y="25"
                width="30"
                height="30"
                transform="rotate(45 40 40)"
              />
              {/* Corner Star Connectors */}
              <path d="M 0 40 L 25 40 M 55 40 L 80 40" />
              <path d="M 40 0 L 40 25 M 40 55 L 40 80" />
              {/* Diagonals */}
              <path d="M 0 0 L 25 25 M 55 55 L 80 80" />
              <path d="M 80 0 L 55 25 M 25 55 L 0 80" />
              {/* Outer Corner Octagram points */}
              <polygon points="0,15 15,0 0,0" fill="#5D4114" opacity="0.4" />
              <polygon points="80,15 65,0 80,0" fill="#5D4114" opacity="0.4" />
              <polygon points="0,65 15,80 0,80" fill="#5D4114" opacity="0.4" />
              <polygon points="80,65 65,80 80,80" fill="#5D4114" opacity="0.4" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#zellij-tile)" />
      </svg>

      {/* 3. Subtle Floating Gold Dust & Star Particles (GPU CSS Only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "12%", left: "15%", delay: "0s", duration: "7s", size: "w-1.5 h-1.5" },
          { top: "25%", left: "82%", delay: "1.5s", duration: "8s", size: "w-2 h-2" },
          { top: "45%", left: "8%", delay: "2.8s", duration: "9s", size: "w-1 h-1" },
          { top: "62%", left: "88%", delay: "0.8s", duration: "7.5s", size: "w-2 h-2" },
          { top: "78%", left: "20%", delay: "3.2s", duration: "8.5s", size: "w-1.5 h-1.5" },
          { top: "90%", left: "70%", delay: "1.2s", duration: "9.5s", size: "w-1 h-1" },
        ].map((p, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full bg-gold-400 opacity-60 animate-float-slow ${p.size}`}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

