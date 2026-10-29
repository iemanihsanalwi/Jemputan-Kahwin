"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BismillahHeader from "@/components/art/BismillahHeader";
import IslamicMonogramSeal from "@/components/art/IslamicMonogramSeal";
import ArabesqueCorner from "@/components/art/ArabesqueCorner";
import { MailOpen, Music, Sparkles } from "lucide-react";

function EnvelopeContent({ onOpen }: { onOpen: () => void }) {
  const weddingConfig = useWeddingConfig();
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    const toParam =
      searchParams.get("to") || searchParams.get("guest") || searchParams.get("nama");
    if (toParam) {
      try {
        setGuestName(decodeURIComponent(toParam.replace(/\+/g, " ")).trim());
      } catch {
        setGuestName(toParam.replace(/\+/g, " ").trim());
      }
    }
  }, [searchParams]);

  const initials = `${weddingConfig.couple.groom.shortName.charAt(0)} & ${weddingConfig.couple.bride.shortName.charAt(0)}`;

  return (
    <div className="relative mx-auto flex w-full max-w-md sm:max-w-lg flex-col items-center px-4 py-6 text-center select-none">
      {/* Decorative Floating Sparkle Accents */}
      <div className="pointer-events-none absolute -top-4 right-6 animate-float-slow text-gold-300 opacity-70">
        <Sparkles size={24} />
      </div>
      <div className="pointer-events-none absolute bottom-12 left-6 animate-float-slow text-gold-400 opacity-60">
        <Sparkles size={20} />
      </div>

      {/* Ornate Islamic Arch Sanctuary Entrance Card */}
      <div className="relative w-full overflow-hidden rounded-3xl border border-gold-400/40 bg-gradient-to-b from-[#091F18]/95 via-[#0c2a21]/95 to-[#091F18]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* 4 Golden Arabesque Corners */}
        <ArabesqueCorner position="all" size={48} />

        {/* Bismillah Classical Calligraphy */}
        <div className="mb-4 flex justify-center">
          <BismillahHeader variant="light" size="sm" />
        </div>

        {/* Ornate Islamic Pointed Arch Framing the Monogram Initials */}
        <div className="relative mx-auto mb-5 flex flex-col items-center justify-center max-w-[280px]">
          {/* Pure SVG Moorish Pointed Arch Silhouette Contour */}
          <svg
            viewBox="0 0 280 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="envelopeArchGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2A1" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#B88E28" />
                <stop offset="100%" stopColor="#7A5716" />
              </linearGradient>
            </defs>

            {/* Pointed Arch Double Filigree Outline */}
            <path
              d="M 20 195 L 20 110 C 20 50, 80 25, 140 8 C 200 25, 260 50, 260 110 L 260 195"
              stroke="url(#envelopeArchGold)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 28 195 L 28 112 C 28 58, 84 34, 140 18 C 196 34, 252 58, 252 112 L 252 195"
              stroke="url(#envelopeArchGold)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.75"
            />

            {/* Apex Finial Star */}
            <circle cx="140" cy="8" r="3.5" fill="url(#envelopeArchGold)" />
            <polygon points="140,0 143,5 140,8 137,5" fill="url(#envelopeArchGold)" />

            {/* Multi-foil Cusps */}
            <path
              d="M 40 110 C 40 90, 60 85, 75 75 C 90 65, 110 50, 140 28 C 170 50, 190 65, 205 75 C 220 85, 240 90, 240 110"
              stroke="url(#envelopeArchGold)"
              strokeWidth="1"
              opacity="0.45"
              fill="none"
            />
          </svg>

          {/* Royal Crest Monogram Seal with Couple's Initials */}
          <div className="py-5 flex justify-center">
            <IslamicMonogramSeal
              initials={initials}
              subtitle="WALIMATULURUS"
              size="md"
            />
          </div>
        </div>

        {/* Invitation Sub-badge */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-950/60 px-4 py-1 text-[11px] font-semibold tracking-widest text-gold-300">
          <span>UNDANGAN RAJA SEHARI</span>
        </div>

        {/* Couple Main Typography */}
        <h1 className="mb-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
          <span>{weddingConfig.couple.groom.shortName}</span>
          <span className="mx-2 font-script text-2xl sm:text-3xl text-gold-400 font-normal">
            &
          </span>
          <span>{weddingConfig.couple.bride.shortName}</span>
        </h1>

        <p className="mb-6 text-xs text-gold-200/80 font-medium">
          {weddingConfig.event.dateDisplay} • {weddingConfig.event.venueName}
        </p>

        {/* Dynamic Guest Personalization Box */}
        <div className="mb-6 w-full rounded-2xl border border-gold-400/30 bg-white/5 p-4 shadow-inner backdrop-blur-sm">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-gold-400">
            {guestName ? "Jemputan Khas Kepada:" : "Jemputan ke Majlis Perkahwinan"}
          </span>
          <p className="line-clamp-2 font-serif text-base sm:text-xl font-bold text-white">
            {guestName || "Dato' / Datin / Tuan / Puan / Sekeluarga"}
          </p>
        </div>

        {/* Primary Entrance Action Button */}
        <button
          onClick={onOpen}
          autoFocus
          aria-label="Buka Jemputan Perkahwinan dan mainkan lagu latar"
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-8 py-4 text-sm sm:text-base font-bold text-emerald-950 shadow-gold-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 cursor-pointer"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <MailOpen size={18} className="transition-transform group-hover:rotate-12" />
          <span>Buka Jemputan</span>
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gold-300/70">
          <Music size={12} className="text-gold-400" />
          <span>Disertakan bersama alunan lagu latar perkahwinan</span>
        </p>
      </div>
    </div>
  );
}

export default function EnvelopeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#04120E] via-[#091F18] to-[#04120E] px-4 transition-all duration-700 ease-in-out ${
        isOpen
          ? "pointer-events-none -translate-y-full scale-95 opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
    >
      <Suspense fallback={<div className="text-sm text-gold-300">Memuatkan jemputan...</div>}>
        <EnvelopeContent onOpen={handleOpen} />
      </Suspense>
    </div>
  );
}
