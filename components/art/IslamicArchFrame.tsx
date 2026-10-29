import React from "react";

interface IslamicArchFrameProps {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  hasBackgroundGlow?: boolean;
  variant?: "gold" | "emerald";
}

/**
 * IslamicArchFrame - An ornate Mughal/Moorish pointed arch (Gerbang Kubah)
 * Features arabesque border patterns, cusped multi-foil curves, and polished metallic gold accents.
 */
export default function IslamicArchFrame({
  children,
  className = "",
  innerClassName = "",
  hasBackgroundGlow = true,
  variant = "gold",
}: IslamicArchFrameProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 sm:p-8 ${className}`}>
      {/* Background Soft Glow */}
      {hasBackgroundGlow && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-gold-300/15 via-gold-400/20 to-amber-200/10 blur-3xl transform scale-110" />
        </div>
      )}

      {/* SVG Architectural Frame Border Layer */}
      <div className="absolute inset-0 pointer-events-none w-full h-full">
        <svg
          viewBox="0 0 500 700"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id={`${idPrefix}-goldStroke`} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === "emerald" ? (
                <>
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="25%" stopColor="#1B4D3E" />
                  <stop offset="50%" stopColor="#FFF2A1" />
                  <stop offset="75%" stopColor="#091F18" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#F5E6BE" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#FFF2A1" />
                  <stop offset="70%" stopColor="#B88E28" />
                  <stop offset="100%" stopColor="#7A5716" />
                </>
              )}
            </linearGradient>

            <linearGradient id={`${idPrefix}-archInnerGrad`} x1="50%" y1="0%" x2="50%" y2="100%">
              {variant === "emerald" ? (
                <>
                  <stop offset="0%" stopColor="#F4F8F6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.95" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FDFBF7" stopOpacity="0.95" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Arch Sanctuary Fill Panel */}
          {/* Moorish Pointed Ogee Arch Path */}
          <path
            d="M 50 670 
               L 50 280 
               C 50 170, 150 110, 250 30 
               C 350 110, 450 170, 450 280 
               L 450 670 
               Z"
            fill={`url(#${idPrefix}-archInnerGrad)`}
          />

          {/* Outer Arch Molding */}
          <path
            d="M 35 680 
               L 35 285 
               C 35 165, 140 100, 250 16 
               C 360 100, 465 165, 465 285 
               L 465 680"
            stroke={`url(#${idPrefix}-goldStroke)`}
            strokeWidth="3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Middle Beaded / Dashed Arch Line */}
          <path
            d="M 45 675 
               L 45 282 
               C 45 168, 145 105, 250 24 
               C 355 105, 455 168, 455 282 
               L 455 675"
            stroke={`url(#${idPrefix}-goldStroke)`}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner Primary Frame Line */}
          <path
            d="M 55 670 
               L 55 280 
               C 55 172, 152 112, 250 34 
               C 348 112, 445 172, 445 280 
               L 445 670"
            stroke={`url(#${idPrefix}-goldStroke)`}
            strokeWidth="2.2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Multi-Foil Cusps (Intricate Inner Arch Arabesque Scallops) */}
          {/* Left Cusps */}
          <path
            d="M 65 280 C 65 250 85 240 100 230 C 115 220 120 195 140 185 C 160 175 175 150 200 135 C 220 120 235 90 250 48"
            stroke={`url(#${idPrefix}-goldStroke)`}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
            vectorEffect="non-scaling-stroke"
          />
          {/* Right Cusps */}
          <path
            d="M 435 280 C 435 250 415 240 400 230 C 385 220 380 195 360 185 C 340 175 325 150 300 135 C 280 120 265 90 250 48"
            stroke={`url(#${idPrefix}-goldStroke)`}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
            vectorEffect="non-scaling-stroke"
          />

          {/* Top Arabesque Finial / Crown */}
          <g transform="translate(250, 16)">
            {/* Crown Motif */}
            <path
              d="M 0 -14 C -6 -7 -6 -3 0 2 C 6 -3 6 -7 0 -14 Z"
              fill={`url(#${idPrefix}-goldStroke)`}
            />
            <circle cx="0" cy="-18" r="3" fill={`url(#${idPrefix}-goldStroke)`} />
            <circle cx="0" cy="5" r="3.5" fill={`url(#${idPrefix}-goldStroke)`} />
            {/* Khatam 8-Point Star at Apex */}
            <g transform="scale(0.8)">
              <rect x="-6" y="-6" width="12" height="12" fill={`url(#${idPrefix}-goldStroke)`} />
              <rect x="-6" y="-6" width="12" height="12" fill={`url(#${idPrefix}-goldStroke)`} transform="rotate(45)" />
            </g>
          </g>

          {/* Left Corner Spandrel Arabesque Scroll */}
          <g transform="translate(45, 120)" opacity="0.75" stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="1.2" fill="none">
            <path d="M 0 0 C 15 -30 45 -50 75 -60" />
            <path d="M 15 -10 C 25 -25 40 -35 55 -40" />
            <circle cx="75" cy="-60" r="2.5" fill={`url(#${idPrefix}-goldStroke)`} />
            <circle cx="55" cy="-40" r="2" fill={`url(#${idPrefix}-goldStroke)`} />
          </g>

          {/* Right Corner Spandrel Arabesque Scroll */}
          <g transform="translate(455, 120)" opacity="0.75" stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="1.2" fill="none">
            <path d="M 0 0 C -15 -30 -45 -50 -75 -60" />
            <path d="M -15 -10 C -25 -25 -40 -35 -55 -40" />
            <circle cx="-75" cy="-60" r="2.5" fill={`url(#${idPrefix}-goldStroke)`} />
            <circle cx="-55" cy="-40" r="2" fill={`url(#${idPrefix}-goldStroke)`} />
          </g>

          {/* Base Plinth / Columns Base */}
          <line x1="20" y1="680" x2="480" y2="680" stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="688" x2="470" y2="688" stroke={`url(#${idPrefix}-goldStroke)`} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      {/* Inner Framed Content */}
      <div className={`relative z-10 w-full pt-16 sm:pt-24 pb-8 px-4 sm:px-8 text-center ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

