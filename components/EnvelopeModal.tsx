"use client";

import React, { useState, useEffect } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralGardenGate from "@/components/art/FloralGardenGate";
import { MailOpen } from "lucide-react";

/**
 * EnvelopeModal - Refined Islamic wedding entrance gate overlay.
 * 
 * Features:
 * - Server-rendered by default (isOpen = false) to prevent any page flash or hydration layout shift.
 * - Locks body scroll while unopened.
 * - When opened, triggers audio playback, fades smoothly, and unmounts from DOM after transition.
 * - Clean, elegant Islamic botanical aesthetic: Warm Cream, Champagne Gold, Sage & Deep Charcoal.
 * - Zero continuous animation loops to preserve battery and GPU/CPU life.
 */
export default function EnvelopeModal() {
  const weddingConfig = useWeddingConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Lock body scroll while the invitation is unopened
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const groomInitial = weddingConfig?.couple?.groom?.shortName?.charAt(0) || "I";
  const brideInitial = weddingConfig?.couple?.bride?.shortName?.charAt(0) || "A";
  const initials = `${groomInitial} & ${brideInitial}`;

  const handleOpen = () => {
    // 1. Immediately dispatch audio trigger event for unmuted playback
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:play_audio"));
    }

    // 2. Smoothly transition open
    setIsOpen(true);

    // 3. Unmount completely from DOM after transition finishes to free CPU/GPU memory
    setTimeout(() => {
      setIsDismissed(true);
    }, 900);
  };

  // Once dismissed, remove completely from DOM
  if (isDismissed) return null;

  return (
    <div
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden select-none transition-all duration-700 ease-out ${
        isOpen
          ? "pointer-events-none scale-105 opacity-0"
          : "pointer-events-auto scale-100 opacity-100"
      }`}
      style={{
        background: "linear-gradient(180deg, #FAF7F2 0%, #F5EFEB 50%, #EFE8E0 100%)",
      }}
    >
      {/* Subtle Static Warm Ambient Glow - No CPU/GPU animation loops */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[80px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(125, 139, 116, 0.15) 50%, transparent 70%)",
        }}
      />

      {/* Frosted Warm Ivory Entrance Card */}
      <div className="relative z-10 mx-auto flex w-full max-w-[360px] sm:max-w-[420px] flex-col items-center rounded-3xl border border-[#D4AF37]/35 bg-[#FAF7F2]/95 p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(45,55,72,0.08)] backdrop-blur-md">
        {/* Soft Champagne Gold Corner Accents */}
        <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-lg" />
        <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-lg" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-lg" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-lg" />

        {/* Code-Drawn Minimalist Botanical Gate & Monogram */}
        <div className="w-full mb-6">
          <FloralGardenGate initials={initials} />
        </div>

        {/* Primary Action Button: "Buka Jemputan" */}
        <button
          onClick={handleOpen}
          autoFocus
          aria-label="Buka Jemputan"
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-serif font-medium tracking-widest text-[#FAF7F2] shadow-[0_8px_20px_rgba(85,107,47,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_24px_rgba(85,107,47,0.35)] active:scale-98 cursor-pointer"
        >
          {/* Subtle Shimmer on Hover */}
          <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Elegant Envelope Icon */}
          <MailOpen size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 text-[#D4AF37]" />

          <span>Buka Jemputan</span>
        </button>

        {/* Discreet Music Hint */}
        <p className="mt-3 text-[11px] sm:text-xs font-serif italic tracking-wider text-[#2D3748]/70">
          ♪ Lagu Latar
        </p>
      </div>
    </div>
  );
}
