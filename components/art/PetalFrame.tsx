import React from "react";

export interface PetalFrameProps {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  hasBackgroundGlow?: boolean;
  variant?: "gold" | "sage" | "rose" | "charcoal";
}

/**
 * PetalFrame - An organic floral border featuring delicate olive branches,
 * winding floral vines, and scalloped petal contours for the Hero, RSVP card,
 * and event details.
 */
export default function PetalFrame({
  children,
  className = "",
  innerClassName = "",
  hasBackgroundGlow = true,
  variant = "gold",
}: PetalFrameProps) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className={`relative flex flex-col items-center justify-center p-4 sm:p-8 ${className}`}>
      {/* Background Soft Glow */}
      {hasBackgroundGlow && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-[#D4AF37]/10 via-[#FAF7F2] to-[#7D8B74]/10 blur-2xl transform scale-105" />
        </div>
      )}

      {/* SVG Botanical Frame Border Layer */}
      <div className="absolute inset-0 pointer-events-none w-full h-full select-none" aria-hidden="true">
        <svg
          viewBox="0 0 500 700"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          <defs>
            <linearGradient id={`${idPrefix}-frameGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === "sage" ? (
                <>
                  <stop offset="0%" stopColor="#A2B09B" />
                  <stop offset="35%" stopColor="#7D8B74" />
                  <stop offset="70%" stopColor="#556B2F" />
                  <stop offset="100%" stopColor="#3B4D36" />
                </>
              ) : variant === "rose" ? (
                <>
                  <stop offset="0%" stopColor="#F5D0D0" />
                  <stop offset="35%" stopColor="#D4A5A5" />
                  <stop offset="70%" stopColor="#C88A8A" />
                  <stop offset="100%" stopColor="#B87B7B" />
                </>
              ) : variant === "charcoal" ? (
                <>
                  <stop offset="0%" stopColor="#718096" />
                  <stop offset="50%" stopColor="#4A5568" />
                  <stop offset="100%" stopColor="#2D3748" />
                </>
              ) : (
                // Warm champagne gold
                <>
                  <stop offset="0%" stopColor="#FFF8EE" />
                  <stop offset="30%" stopColor="#E2C882" />
                  <stop offset="70%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#9C7838" />
                </>
              )}
            </linearGradient>

            <linearGradient id={`${idPrefix}-innerFill`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.96" />
              <stop offset="50%" stopColor="#FDFBF7" stopOpacity="0.97" />
              <stop offset="100%" stopColor="#F5EFEB" stopOpacity="0.96" />
            </linearGradient>

            <radialGradient id={`${idPrefix}-bloomFill`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="65%" stopColor="#E8C5BE" />
              <stop offset="100%" stopColor="#C5A059" />
            </radialGradient>
          </defs>

          {/* Organic Arched Fill Panel */}
          <path
            d="M 50 670 L 50 250 C 50 140, 140 60, 250 34 C 360 60, 450 140, 450 250 L 450 670 Z"
            fill={`url(#${idPrefix}-innerFill)`}
          />

          {/* Outer Organic Contour */}
          <path
            d="M 38 680 L 38 255 C 38 135, 132 50, 250 22 C 368 50, 462 135, 462 255 L 462 680"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Delicate Dashed Line */}
          <path
            d="M 46 676 L 46 252 C 46 138, 138 56, 250 28 C 362 56, 454 138, 454 252 L 454 676"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner Botanical Frame Line */}
          <path
            d="M 54 670 L 54 250 C 54 142, 144 64, 250 38 C 356 64, 446 142, 446 250 L 446 670"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Leaflets on Arch */}
          <g stroke={`url(#${idPrefix}-frameGrad)`} strokeWidth="1.2" strokeLinecap="round" fill="none">
            <path d="M 68 250 C 72 210, 92 175, 126 145 C 160 115, 202 85, 246 45" opacity="0.6" />
            <path d="M 96 182 C 102 174, 112 176, 110 186 C 104 188, 98 186, 96 182 Z" fill="#7D8B74" fillOpacity="0.7" />
            <path d="M 148 132 C 156 124, 166 128, 162 138 C 156 140, 150 138, 148 132 Z" fill="#7D8B74" fillOpacity="0.7" />
            <path d="M 198 94 C 206 86, 216 90, 214 100 C 208 102, 200 100, 198 94 Z" fill="#7D8B74" fillOpacity="0.7" />

            <path d="M 432 250 C 428 210, 408 175, 374 145 C 340 115, 298 85, 254 45" opacity="0.6" />
            <path d="M 404 182 C 398 174, 388 176, 390 186 C 396 188, 402 186, 404 182 Z" fill="#7D8B74" fillOpacity="0.7" />
            <path d="M 352 132 C 344 124, 334 128, 338 138 C 344 140, 350 138, 352 132 Z" fill="#7D8B74" fillOpacity="0.7" />
            <path d="M 302 94 C 294 86, 284 90, 286 100 C 292 102, 300 100, 302 94 Z" fill="#7D8B74" fillOpacity="0.7" />
          </g>

          {/* Top Blooming Crest */}
          <g transform="translate(250, 22)">
            <path
              d="M 0 -14 C -8 -7, -8 -3, 0 4 C 8 -3, 8 -7, 0 -14 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
              stroke={`url(#${idPrefix}-frameGrad)`}
              strokeWidth="1.2"
            />
            <circle cx="0" cy="-18" r="2.5" fill={`url(#${idPrefix}-frameGrad)`} />
            <circle cx="0" cy="8" r="2.5" fill={`url(#${idPrefix}-frameGrad)`} />
          </g>

          {/* Base Plinth */}
          <line x1="24" y1="680" x2="476" y2="680" stroke={`url(#${idPrefix}-frameGrad)`} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Inner Framed Content */}
      <div className={`relative z-10 w-full pt-16 sm:pt-24 pb-8 px-4 sm:px-8 text-center ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
