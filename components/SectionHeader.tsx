import React from "react";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  dividerVariant?: "gold" | "sage" | "rose" | "charcoal" | "mulberry";
}

/**
 * SectionHeader - Unified section header component strictly centered with flexbox,
 * elegant Islamic typography (deep charcoal #2D3748, sage #7D8B74 eyebrow), and centered botanical flourish divider.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
  dividerVariant = "gold",
}: SectionHeaderProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center mx-auto mb-10 sm:mb-14 select-none ${className}`}
    >
      {/* Eyebrow Label (e.g. "PANDUAN ARAH") */}
      {eyebrow && (
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]">
          {eyebrow}
        </span>
      )}

      {/* Main Section Title */}
      <h2 className="mb-1 font-serif text-3xl font-bold tracking-tight text-[#2D3748] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* Centered Decorative Floral Line Divider */}
      <FloralSectionDivider variant={dividerVariant} />

      {/* Optional Description / Subtitle */}
      {subtitle && (
        <div className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#556377] sm:text-sm">
          {subtitle}
        </div>
      )}
    </div>
  );
}
