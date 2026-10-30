import React from "react";

export interface PetalFrameProps {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  hasBackgroundGlow?: boolean;
  variant?: "gold" | "sage" | "rose" | "emerald";
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
      {/* Background Soft Watercolor Glow */}
      {hasBackgroundGlow && (
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-gold-300/15 via-blush-200/20 to-cream-100/10 blur-3xl transform scale-110" />
        </div>
      )}

      {/* SVG Botanical Frame Border Layer */}
      <div className="absolute inset-0 pointer-events-none w-full h-full select-none" aria-hidden="true">
        <svg
          viewBox="0 0 500 700"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            <linearGradient id={`${idPrefix}-frameGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === "sage" || variant === "emerald" || variant === "rose" ? (
                <>
                  <stop offset="0%" stopColor="#FADBD8" />
                  <stop offset="30%" stopColor="#D88A96" />
                  <stop offset="65%" stopColor="#D4A373" />
                  <stop offset="100%" stopColor="#B56576" />
                </>
              ) : (
                // Warm antique gold to soft rose gradient
                <>
                  <stop offset="0%" stopColor="#F5EED6" />
                  <stop offset="25%" stopColor="#D4AF37" />
                  <stop offset="55%" stopColor="#C5A059" />
                  <stop offset="80%" stopColor="#D8A49B" />
                  <stop offset="100%" stopColor="#86652C" />
                </>
              )}
            </linearGradient>

            <linearGradient id={`${idPrefix}-innerFill`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.94" />
              <stop offset="50%" stopColor="#FAF7EE" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#F4EFE6" stopOpacity="0.95" />
            </linearGradient>

            <radialGradient id={`${idPrefix}-bloomFill`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="65%" stopColor="#E8C5BE" />
              <stop offset="100%" stopColor="#C5A059" />
            </radialGradient>
          </defs>

          {/* Organic Arched Fill Panel */}
          <path
            d="M 50 670 
               L 50 250 
               C 50 140, 140 60, 250 34 
               C 360 60, 450 140, 450 250 
               L 450 670 
               Z"
            fill={`url(#${idPrefix}-innerFill)`}
          />

          {/* Outer Organic Contour with Soft Scalloped Arches */}
          <path
            d="M 38 680 
               L 38 255 
               C 38 135, 132 50, 250 22 
               C 368 50, 462 135, 462 255 
               L 462 680"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="3.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Delicate Dashed Dewdrop Filigree Line */}
          <path
            d="M 46 676 
               L 46 252 
               C 46 138, 138 56, 250 28 
               C 362 56, 454 138, 454 252 
               L 454 676"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner Botanical Frame Line */}
          <path
            d="M 54 670 
               L 54 250 
               C 54 142, 144 64, 250 38 
               C 356 64, 446 142, 446 250 
               L 446 670"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Organic Leafy Tendrils on the Arch Sides */}
          {/* Left Branch Leaflet Clusters */}
          <g stroke={`url(#${idPrefix}-frameGrad)`} strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Left Upper Vine Swag */}
            <path d="M 68 250 C 72 210, 92 175, 126 145 C 160 115, 202 85, 246 45" opacity="0.6" />

            {/* Left Leaflets */}
            <path
              d="M 96 182 C 102 174, 112 176, 110 186 C 104 188, 98 186, 96 182 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
            <path
              d="M 148 132 C 156 124, 166 128, 162 138 C 156 140, 150 138, 148 132 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
            <path
              d="M 198 94 C 206 86, 216 90, 214 100 C 208 102, 200 100, 198 94 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
          </g>

          {/* Right Branch Leaflet Clusters */}
          <g stroke={`url(#${idPrefix}-frameGrad)`} strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Right Upper Vine Swag */}
            <path d="M 432 250 C 428 210, 408 175, 374 145 C 340 115, 298 85, 254 45" opacity="0.6" />

            {/* Right Leaflets */}
            <path
              d="M 404 182 C 398 174, 388 176, 390 186 C 396 188, 402 186, 404 182 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
            <path
              d="M 352 132 C 344 124, 334 128, 338 138 C 344 140, 350 138, 352 132 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
            <path
              d="M 302 94 C 294 86, 284 90, 286 100 C 292 102, 300 100, 302 94 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
            />
          </g>

          {/* Top Blooming Apex Crest */}
          <g transform="translate(250, 22)">
            {/* Central Bloom Petal Trio */}
            <path
              d="M 0 -14 C -8 -7, -8 -3, 0 4 C 8 -3, 8 -7, 0 -14 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
              stroke={`url(#${idPrefix}-frameGrad)`}
              strokeWidth="1.2"
            />
            <path
              d="M -5 -6 C -14 -8, -12 2, 0 4 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
              stroke={`url(#${idPrefix}-frameGrad)`}
              strokeWidth="1"
            />
            <path
              d="M 5 -6 C 14 -8, 12 2, 0 4 Z"
              fill={`url(#${idPrefix}-bloomFill)`}
              stroke={`url(#${idPrefix}-frameGrad)`}
              strokeWidth="1"
            />

            {/* Delicate Stamen Dots */}
            <circle cx="0" cy="-18" r="2.8" fill={`url(#${idPrefix}-frameGrad)`} />
            <circle cx="-6" cy="-15" r="1.8" fill={`url(#${idPrefix}-frameGrad)`} />
            <circle cx="6" cy="-15" r="1.8" fill={`url(#${idPrefix}-frameGrad)`} />
            <circle cx="0" cy="8" r="3" fill={`url(#${idPrefix}-frameGrad)`} />
          </g>

          {/* Base Botanical Plinth / Grounding Vines */}
          <line
            x1="24"
            y1="680"
            x2="476"
            y2="680"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <line
            x1="36"
            y1="688"
            x2="464"
            y2="688"
            stroke={`url(#${idPrefix}-frameGrad)`}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Inner Framed Content */}
      <div className={`relative z-10 w-full pt-16 sm:pt-24 pb-8 px-4 sm:px-8 text-center ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
