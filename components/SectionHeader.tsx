import React from "react";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  className?: string;
  dividerVariant?: "rose" | "gold" | "mulberry";
}

/**
 * SectionHeader - Unified section header component strictly centered with flexbox,
 * consistent romantic pink/mulberry typography, and centered floral flourish divider.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
  dividerVariant = "rose",
}: SectionHeaderProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center mx-auto mb-12 sm:mb-16 select-none ${className}`}
    >
      {/* Eyebrow Label (e.g. "PANDUAN ARAH") */}
      {eyebrow && (
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#B56576]">
          {eyebrow}
        </span>
      )}

      {/* Main Section Title */}
      <h2 className="mb-1 font-serif text-3xl font-bold tracking-tight text-[#3D2429] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* Centered Decorative Floral Line Divider */}
      <FloralSectionDivider variant={dividerVariant} />

      {/* Optional Description / Subtitle */}
      {subtitle && (
        <div className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#7A555C] sm:text-sm">
          {subtitle}
        </div>
      )}
    </div>
  );
}
