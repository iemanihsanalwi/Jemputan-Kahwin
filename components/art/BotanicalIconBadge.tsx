import React from "react";

export interface BotanicalIconBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "sage" | "rose" | "charcoal" | "cream";
  className?: string;
}

/**
 * BotanicalIconBadge - Clean, elegant circular enclosure for Lucide action icons
 * matching the Mawaddah aesthetic with subtle borders and gentle tints.
 */
export default function BotanicalIconBadge({
  children,
  size = "md",
  variant = "gold",
  className = "",
}: BotanicalIconBadgeProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const variantClasses = {
    gold: "border border-[#D4AF37]/40 bg-[#FAF7F2] text-[#C5A059]",
    sage: "border border-[#7D8B74]/40 bg-[#F4F6F2] text-[#556B2F]",
    rose: "border border-[#D4A5A5]/40 bg-[#FAF2F2] text-[#B87B7B]",
    charcoal: "border border-[#2D3748]/20 bg-[#FAF7F2] text-[#2D3748]",
    cream: "border border-[#E8E2D8] bg-[#FAF7F2] text-[#556377]",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full shadow-xs transition-transform duration-300 group-hover:scale-105 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
