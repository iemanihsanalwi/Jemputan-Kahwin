import React from "react";

interface BismillahHeaderProps {
  className?: string;
  variant?: "gold" | "sage" | "charcoal" | "rose" | "light";
  size?: "sm" | "md" | "lg";
}

/**
 * BismillahHeader - Pure vector SVG calligraphy of Bismillah Ar-Rahman Ar-Rahim
 * Classical Thuluth / Diwani style rendering framed by delicate botanical olive sprigs.
 * Zero raster filters (<feGaussianBlur> removed) for crisp vector rendering and 0 GPU lag.
 */
export default function BismillahHeader({
  className = "",
  variant = "gold",
  size = "md",
}: BismillahHeaderProps) {
  const sizeClasses = {
    sm: "w-48 sm:w-64 h-12 sm:h-14",
    md: "w-64 sm:w-80 md:w-96 h-16 sm:h-20",
    lg: "w-80 sm:w-[420px] md:w-[480px] h-20 sm:h-28",
  };

  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}
      aria-label="Bismillahir Rahmanir Rahim (بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ)"
    >
      <svg
        viewBox="0 0 680 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs transition-transform duration-300 hover:scale-[1.01]"
      >
        <defs>
          {/* Champagne Gold Gradient */}
          <linearGradient id={`${idPrefix}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8EE" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9C7838" />
          </linearGradient>

          {/* Sage Botanical Gradient */}
          <linearGradient id={`${idPrefix}-sage`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#556B2F" />
            <stop offset="50%" stopColor="#7D8B74" />
            <stop offset="100%" stopColor="#556B2F" />
          </linearGradient>

          {/* Deep Charcoal Gradient */}
          <linearGradient id={`${idPrefix}-charcoal`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A202C" />
            <stop offset="50%" stopColor="#2D3748" />
            <stop offset="100%" stopColor="#1A202C" />
          </linearGradient>

          {/* Dusty Rose Gradient */}
          <linearGradient id={`${idPrefix}-rose`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B87B7B" />
            <stop offset="50%" stopColor="#D4A5A5" />
            <stop offset="100%" stopColor="#B87B7B" />
          </linearGradient>
        </defs>

        <g
          fill={
            variant === "sage"
              ? `url(#${idPrefix}-sage)`
              : variant === "charcoal"
              ? `url(#${idPrefix}-charcoal)`
              : variant === "rose"
              ? `url(#${idPrefix}-rose)`
              : `url(#${idPrefix}-gold)`
          }
        >
          {/* Central Calligraphy Artistic Glyphs Composition */}
          {/* Basmalah Classical Stroke Flourishes (Diwani / Thuluth) */}
          <path d="M 60 120 C 85 95, 120 75, 160 85 C 190 92, 210 115, 235 110 C 255 106, 260 85, 255 65 C 250 48, 235 45, 225 55 C 215 65, 222 80, 235 80 C 242 80, 248 74, 250 68 C 258 85, 248 102, 230 102 C 205 102, 185 82, 155 78 C 115 72, 80 95, 55 125 Z" />

          {/* Allah Majesty Glyph */}
          <path d="M 270 120 C 275 80, 280 40, 285 25 C 292 25, 295 45, 298 75 C 305 60, 315 35, 322 30 C 330 30, 332 50, 332 80 C 340 60, 350 40, 360 40 C 372 40, 375 60, 372 85 C 368 110, 350 125, 330 125 C 300 125, 290 105, 285 120 Z" />

          {/* Tashkeel & Shaddah on Allah */}
          <path d="M 320 18 C 322 10, 330 10, 332 18 C 334 10, 342 10, 344 18 C 342 24, 322 24, 320 18 Z" />
          <path d="M 330 6 C 332 2, 336 2, 336 6 L 334 14 L 330 14 Z" />

          {/* Ar-Rahman Segment */}
          <path d="M 380 122 C 388 95, 396 68, 405 45 C 412 45, 414 62, 412 85 C 420 80, 435 75, 450 78 C 470 82, 485 100, 480 120 C 475 138, 452 145, 435 138 C 420 132, 412 118, 410 105 C 405 125, 395 135, 378 126 Z" />
          {/* Noon Arch of Ar-Rahman */}
          <path d="M 455 110 C 465 110, 470 95, 460 90 C 450 85, 445 100, 455 110 Z" />
          <circle cx="452" cy="70" r="5" />

          {/* Ar-Rahim Segment */}
          <path d="M 500 122 C 506 95, 514 68, 520 45 C 528 45, 530 62, 528 85 C 536 78, 550 72, 565 75 C 585 78, 600 95, 605 115 C 612 140, 595 155, 570 155 C 540 155, 525 135, 510 140 C 495 145, 488 135, 498 122 Z" />
          {/* Diacritical marks (Dots for Yaa & Harakat) */}
          <circle cx="550" cy="115" r="4.5" />
          <circle cx="564" cy="118" r="4.5" />

          {/* Ornamental Symmetrical Harakat & Swashes */}
          <path d="M 120 40 C 135 32, 145 35, 140 45 C 132 45, 128 42, 120 40 Z" />
          <path d="M 190 45 C 205 38, 215 42, 208 52 C 200 50, 195 48, 190 45 Z" />
          <path d="M 420 30 C 435 22, 445 25, 440 35 C 432 35, 428 32, 420 30 Z" />
          <path d="M 540 28 C 555 20, 565 24, 560 34 C 552 34, 548 30, 540 28 Z" />
          <path d="M 615 75 C 635 65, 650 80, 638 95 C 625 90, 622 80, 615 75 Z" />
        </g>

        {/* Botanical Olive Leaf Sprigs Flanking Both Sides */}
        <g
          stroke={
            variant === "sage"
              ? "#556B2F"
              : variant === "charcoal"
              ? "#2D3748"
              : variant === "rose"
              ? "#B87B7B"
              : "#D4AF37"
          }
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.8"
        >
          {/* Left Olive Branch Sprig */}
          <path d="M 16 95 C 28 92, 42 84, 52 74" />
          <path
            d="M 28 90 C 26 80, 36 80, 36 90 Z"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />
          <path
            d="M 40 82 C 40 72, 50 74, 48 84 Z"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />
          <circle
            cx="14"
            cy="95"
            r="2.5"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />

          {/* Right Olive Branch Sprig */}
          <path d="M 664 95 C 652 92, 638 84, 628 74" />
          <path
            d="M 652 90 C 654 80, 644 80, 644 90 Z"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />
          <path
            d="M 640 82 C 640 72, 630 74, 632 84 Z"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />
          <circle
            cx="666"
            cy="95"
            r="2.5"
            fill={
              variant === "sage"
                ? "#556B2F"
                : variant === "charcoal"
                ? "#2D3748"
                : variant === "rose"
                ? "#B87B7B"
                : "#D4AF37"
            }
          />
        </g>
      </svg>
    </div>
  );
}
