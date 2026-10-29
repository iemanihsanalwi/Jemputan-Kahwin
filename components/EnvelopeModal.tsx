"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BismillahHeader from "@/components/art/BismillahHeader";
import FloralWreathHeader from "@/components/art/FloralWreathHeader";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
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
      <div className="pointer-events-none absolute bottom-12 left-6 animate-float-slow text-blush-300 opacity-60">
        <Sparkles size={20} />
      </div>

      {/* Ornate Botanical Velvet Sanctuary Entrance Card */}
      <div className="relative w-full overflow-hidden rounded-3xl border-2 border-gold-400/50 bg-gradient-to-b from-[#183024]/95 via-[#234534]/95 to-[#183024]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* 4 Hand-Crafted Botanical Corner Flourishes */}
        <BotanicalCornerFlourish position="all" size={48} variant="gold" />

        {/* Bismillah Vector Calligraphy with Botanical Touches */}
        <div className="mb-4 flex justify-center">
          <BismillahHeader variant="light" size="sm" />
        </div>

        {/* Botanical Organic Arch Framing the Monogram Wreath */}
        <div className="relative mx-auto mb-5 flex flex-col items-center justify-center max-w-[280px]">
          {/* Pure SVG Botanical Arch Contour */}
          <svg
            viewBox="0 0 280 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envelopeBotanicalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF7EE" />
                <stop offset="30%" stopColor="#D4AF37" />
                <stop offset="65%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#D8A49B" />
              </linearGradient>
            </defs>

            {/* Organic Curved Arch Contour */}
            <path
              d="M 22 195 L 22 110 C 22 55, 75 22, 140 10 C 205 22, 258 55, 258 110 L 258 195"
              stroke="url(#envelopeBotanicalGold)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M 30 195 L 30 112 C 30 62, 80 32, 140 20 C 200 32, 250 62, 250 112 L 250 195"
              stroke="url(#envelopeBotanicalGold)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.65"
            />

            {/* Apex Floral Blossom Accent */}
            <circle cx="140" cy="10" r="3.5" fill="url(#envelopeBotanicalGold)" />
            <path
              d="M 140 2 C 144 6, 144 8, 140 10 C 136 8, 136 6, 140 2 Z"
              fill="url(#envelopeBotanicalGold)"
            />
            <path
              d="M 132 10 C 136 6, 138 6, 140 10 Z"
              fill="url(#envelopeBotanicalGold)"
            />
            <path
              d="M 148 10 C 144 6, 142 6, 140 10 Z"
              fill="url(#envelopeBotanicalGold)"
            />
          </svg>

          {/* Floral Wreath Monogram Medallion */}
          <div className="py-5 flex justify-center">
            <FloralWreathHeader
              initials={initials}
              subtitle="WALIMATULURUS"
              size="md"
            />
          </div>
        </div>

        {/* Invitation Sub-badge */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-950/70 px-4 py-1 text-[11px] font-semibold tracking-widest text-gold-300">
          <span>UNDANGAN RAJA SEHARI</span>
        </div>

        {/* Couple Main Typography */}
        <h1 className="mb-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
          <span>{weddingConfig.couple.groom.shortName}</span>
          <span className="mx-2 font-script text-2xl sm:text-3xl text-gold-400 font-normal">
            &amp;
          </span>
          <span>{weddingConfig.couple.bride.shortName}</span>
        </h1>

        <p className="mb-6 text-xs text-gold-200/90 font-medium">
          {weddingConfig.event.dateDisplay} • {weddingConfig.event.venueName}
        </p>

        {/* Dynamic Guest Personalization Box */}
        <div className="mb-6 w-full rounded-2xl border border-gold-400/30 bg-white/5 p-4 shadow-inner backdrop-blur-sm">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-gold-300">
            {guestName ? "Jemputan Khas Kepada:" : "Jemputan ke Majlis Perkahwinan"}
          </span>
          <p className="line-clamp-2 font-serif text-base sm:text-xl font-bold text-white">
            {guestName || "Dato' / Datin / Tuan / Puan / Sekeluarga"}
          </p>
        </div>

        {/* Primary Entrance Action Button (Rounded Pill with Gold Botanical Border) */}
        <button
          onClick={onOpen}
          autoFocus
          aria-label="Buka Jemputan Perkahwinan dan mainkan lagu latar"
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full border-2 border-gold-300 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-8 py-4 text-sm sm:text-base font-bold text-sage-950 shadow-gold-glow transition-all duration-300 hover:scale-[1.02] hover:border-gold-200 hover:shadow-xl active:scale-95 cursor-pointer"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <MailOpen size={18} className="transition-transform group-hover:rotate-12 text-sage-950" />
          <span>Buka Jemputan</span>
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gold-300/80">
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0C1913] via-[#183024] to-[#0C1913] px-4 transition-all duration-700 ease-in-out ${
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
