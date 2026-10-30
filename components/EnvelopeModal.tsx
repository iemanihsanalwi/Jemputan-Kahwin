"use client";

import React, { useState, useEffect } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralGardenGate from "@/components/art/FloralGardenGate";
import { MailOpen } from "lucide-react";

/**
 * EnvelopeModal - Minimalist, soothing floral garden entrance popup (/ landing cover modal).
 * 
 * Features:
 * - Color Palette: Romantic soft pink garden palette (zero green tones)
 *   * Background: Soft blush & petal cream gradient (#FFF8F8 to #FCE4E8)
 *   * Card Surface: Frosted glass / translucent alabaster (rgba(255, 255, 255, 0.75) with blur)
 *   * Accent & Outlines: Brushed rose gold / champagne gold (#C89B7B / #D4A373)
 *   * Primary Typography: Warm espresso / deep mulberry (#3D262A / #4A2E35)
 * - Pure Minimalist Layout (displays ONLY 4 elements):
 *   1. Code-drawn Floral Garden Gate
 *   2. Refined serif monogram initials in center ("I & A")
 *   3. Soft pill "Buka Jemputan" button with rose-gold gradient
 *   4. Discreet music hint: "♪ Lagu Latar"
 * - Ambient gentle CSS drifting pink petals
 * - Smooth fade / parting gate transition triggering unmuted background music
 */
export default function EnvelopeModal() {
  const weddingConfig = useWeddingConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const groomInitial = weddingConfig.couple.groom.shortName?.charAt(0) || "I";
  const brideInitial = weddingConfig.couple.bride.shortName?.charAt(0) || "A";
  const initials = `${groomInitial} & ${brideInitial}`;

  const handleOpen = () => {
    // 1. Immediately dispatch audio trigger event for unmuted playback
    window.dispatchEvent(new CustomEvent("wedding:play_audio"));

    // 2. Smoothly transition open
    setIsOpen(true);
  };

  if (!mounted) return null;

  return (
    <div
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden select-none transition-all duration-1000 ease-out ${
        isOpen
          ? "pointer-events-none scale-105 opacity-0"
          : "pointer-events-auto scale-100 opacity-100"
      }`}
      style={{
        background: "linear-gradient(180deg, #FFF8F8 0%, #FDF2F4 50%, #FCE4E8 100%)",
      }}
    >
      {/* ================= 1. AMBIENT SOFT KOMOREBI & BLUSH GLOW SPOTS ================= */}
      {/* Top Center Warm Champagne Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] sm:w-[720px] h-[520px] sm:h-[720px] rounded-full blur-[120px] opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 245, 242, 0.95) 0%, rgba(252, 228, 232, 0.5) 45%, transparent 70%)",
        }}
      />
      {/* Bottom Center Soft Rose Mist */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[480px] sm:w-[680px] h-[480px] rounded-full blur-[110px] opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 183, 177, 0.4) 0%, rgba(250, 219, 216, 0.2) 50%, transparent 70%)",
        }}
      />

      {/* ================= 2. AMBIENT GENTLE SLOW DRIFTING PINK PETALS ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[
          { left: "8%", delay: "0s", duration: "16s", size: 18, rotate: "rotate-12", color: "#FADBD8" },
          { left: "22%", delay: "4s", duration: "19s", size: 22, rotate: "-rotate-45", color: "#F5B7B1" },
          { left: "42%", delay: "1.5s", duration: "17s", size: 16, rotate: "rotate-45", color: "#FFF0F2" },
          { left: "62%", delay: "6s", duration: "20s", size: 20, rotate: "-rotate-12", color: "#FADBD8" },
          { left: "78%", delay: "3s", duration: "18s", size: 24, rotate: "rotate-90", color: "#D88A96" },
          { left: "90%", delay: "8s", duration: "21s", size: 16, rotate: "-rotate-90", color: "#F5B7B1" },
          { left: "32%", delay: "9s", duration: "22s", size: 18, rotate: "rotate-30", color: "#FCE4E8" },
        ].map((p, idx) => (
          <div
            key={idx}
            className="absolute top-0 animate-garden-drift opacity-0"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              willChange: "transform, opacity",
              transform: "translate3d(0, -40px, 0)",
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 30 30"
              fill="none"
              className={`transform ${p.rotate} drop-shadow-xs`}
            >
              <path
                d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 20 28, 15 28 C 10 28, 2 22, 2 15 C 2 8, 8 2, 15 2 Z"
                fill={p.color}
                fillOpacity="0.85"
                stroke="#D4A373"
                strokeWidth="0.8"
                strokeOpacity="0.55"
              />
              <path d="M 15 6 C 15 12, 15 18, 15 24" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.75" />
            </svg>
          </div>
        ))}
      </div>

      {/* ================= 3. FROSTED ALABASTER ENTRANCE CARD ================= */}
      <div className="relative z-10 mx-auto flex w-full max-w-[360px] sm:max-w-[420px] flex-col items-center rounded-3xl border border-[#D4A373]/30 bg-white/75 p-6 sm:p-8 text-center shadow-[0_20px_50px_rgba(216,138,150,0.22)] backdrop-blur-md">
        {/* Soft Rose Gold Corner Accents */}
        <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D4A373]/50 rounded-tl-lg" />
        <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D4A373]/50 rounded-tr-lg" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D4A373]/50 rounded-bl-lg" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D4A373]/50 rounded-br-lg" />

        {/* 1. Code-Drawn Floral Garden Gate & 2. Refined Serif Monogram */}
        <div className="w-full mb-6">
          <FloralGardenGate initials={initials} />
        </div>

        {/* 3. Primary Action Button: "Buka Jemputan" */}
        <button
          onClick={handleOpen}
          autoFocus
          aria-label="Buka Jemputan"
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#D4A373]/40 bg-gradient-to-r from-[#D4A373] via-[#C89B7B] to-[#D88A96] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-serif font-medium tracking-widest text-white shadow-[0_8px_20px_rgba(216,138,150,0.28)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_24px_rgba(216,138,150,0.38)] active:scale-95 cursor-pointer"
        >
          {/* Subtle Shimmer Sheen on Hover */}
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Elegant Envelope / Wax Seal Icon */}
          <MailOpen size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 text-white/95" />
          
          <span>Buka Jemputan</span>
        </button>

        {/* 4. Discreet Tiny Music Hint: "♪ Lagu Latar" */}
        <p className="mt-3 text-[11px] sm:text-xs font-serif italic tracking-wider text-[#4A2E35]/70">
          ♪ Lagu Latar
        </p>
      </div>
    </div>
  );
}
