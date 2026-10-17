"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { weddingConfig } from "@/config/wedding";
import { MailOpen, Heart, Music, Sparkles } from "lucide-react";

function EnvelopeContent({ onOpen }: { onOpen: () => void }) {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    const to =
      searchParams.get("to") || searchParams.get("guest") || searchParams.get("nama");
    if (to) {
      setGuestName(to.replace(/\+/g, " "));
    }
  }, [searchParams]);

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center p-6 text-center sm:p-10">
      {/* Decorative Ornaments & Sparkles */}
      <div className="mb-2 animate-float-slow text-gold-400">
        <Sparkles size={28} />
      </div>

      <p className="mb-3 font-arabic text-xl tracking-wide text-gold-300 sm:text-2xl">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>

      {/* Royal Seal Monogram Badge */}
      <div className="relative mb-6 flex h-20 w-20 animate-pulse-subtle items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-0.5 shadow-gold-glow sm:h-24 sm:w-24">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border-2 border-gold-300/40 bg-emerald-950">
          <span className="font-serif text-lg font-bold tracking-wider text-gold-200 sm:text-xl">
            {weddingConfig.couple.groom.shortName.charAt(0)} &{" "}
            {weddingConfig.couple.bride.shortName.charAt(0)}
          </span>
          <Heart size={10} className="mt-0.5 fill-gold-400 text-gold-400" />
        </div>
      </div>

      <span className="mb-4 inline-block rounded-full border border-gold-400/40 bg-gold-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300 shadow-sm">
        WALIMATULURUS
      </span>

      {/* Main Couple Title */}
      <h1 className="mb-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
        {weddingConfig.couple.groom.shortName}{" "}
        <span className="mx-1 font-script text-2xl font-normal text-gold-400 sm:text-4xl">
          &
        </span>{" "}
        {weddingConfig.couple.bride.shortName}
      </h1>

      <p className="mb-6 text-xs font-medium text-stone-300 sm:text-sm">
        {weddingConfig.event.dateDisplay} • {weddingConfig.event.venueName}
      </p>

      {/* Personalized Guest Box */}
      <div className="mb-8 w-full rounded-2xl border border-gold-400/30 bg-white/10 p-4 shadow-inner backdrop-blur-md sm:p-5">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-gold-300">
          Undangan Khas Buat
        </span>
        <p className="line-clamp-2 font-serif text-lg font-bold text-white sm:text-2xl">
          {guestName || "Dato' / Datin / Tuan / Puan / Sahabat Sekeluarga"}
        </p>
      </div>

      {/* Open Button with Direct User Interaction for Audio Unlocking */}
      <button
        onClick={onOpen}
        autoFocus
        aria-label="Buka Jemputan Perkahwinan dan mainkan lagu latar"
        className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-8 py-4 text-base font-bold text-emerald-950 shadow-gold-glow transition-all duration-300 hover:from-gold-500 hover:to-gold-700 active:scale-95"
      >
        <MailOpen size={20} className="transition-transform group-hover:rotate-12" />
        <span>Buka Jemputan</span>
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
        <Music size={12} className="text-gold-400" />
        <span>Disertakan bersama alunan lagu latar</span>
      </p>
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
    setIsOpen(true);
    // Dispatch custom event to notify AudioPlayer to start playing
    window.dispatchEvent(new CustomEvent("wedding:play_audio"));
  };

  if (!mounted) return null;

  return (
    <div
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-emerald-950 via-[#0d281e] to-emerald-950 px-4 transition-all duration-700 ease-in-out ${
        isOpen
          ? "pointer-events-none translate-y-[-100vh] scale-105 opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
    >
      {/* Background Islamic Geometric Arches */}
      <div className="bg-wedding-pattern pointer-events-none absolute inset-0 opacity-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/20 sm:h-[540px] sm:w-[540px]" />

      <Suspense
        fallback={<div className="text-sm text-gold-300">Memuatkan jemputan...</div>}
      >
        <EnvelopeContent onOpen={handleOpen} />
      </Suspense>
    </div>
  );
}
