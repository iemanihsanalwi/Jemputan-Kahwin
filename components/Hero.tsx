"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BismillahHeader from "@/components/art/BismillahHeader";
import GardenArchHeader from "@/components/art/GardenArchHeader";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import { Calendar, ChevronDown, Heart, MapPin } from "lucide-react";

function HeroPersonalizedBadge() {
  const searchParams = useSearchParams();
  const [guestName, setGuestName] = useState("");

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

  if (!guestName) return null;

  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8E2D8] bg-[#FDFBF7] px-4 py-1.5 text-xs font-semibold text-[#2D3748] shadow-xs backdrop-blur-xs">
      <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
      <span>Undangan Khas Buat: <strong>{guestName}</strong></span>
    </div>
  );
}

export default function Hero() {
  const weddingConfig = useWeddingConfig();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const { couple, event } = weddingConfig;
  const initials = `${couple.groom.shortName.charAt(0)} & ${couple.bride.shortName.charAt(0)}`;

  useEffect(() => {
    const targetDate = new Date(`${event.date}T11:00:00+08:00`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date]);

  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden px-3 sm:px-6 pb-16 pt-24 sm:min-h-screen">
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Dynamic Guest Ribbon Badge */}
        <Suspense fallback={null}>
          <HeroPersonalizedBadge />
        </Suspense>

        {/* Bismillah Vector Calligraphy */}
        <div className="mb-4">
          <BismillahHeader variant="gold" size="md" />
        </div>

        {/* Invitation Category Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8E2D8] bg-[#F4F6F2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#556B2F] shadow-xs">
          <Heart size={12} className="fill-[#C5A059] text-[#C5A059]" />
          <span>WALIMATULURUS</span>
          <Heart size={12} className="fill-[#C5A059] text-[#C5A059]" />
        </div>

        {/* Family Side Greeting */}
        <p className="mb-6 max-w-md text-xs tracking-wide text-[#556377] sm:text-sm">
          {couple.familySideNote}
        </p>

        {/* Botanical Trellis & Archway Frame */}
        <GardenArchHeader
          initials={initials}
          subtitle="RAJA SEHARI"
          className="w-full max-w-2xl mb-8"
        >
          {/* Couple Calligraphic Names */}
          <div className="mb-3">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#2D3748] sm:text-6xl md:text-7xl">
              <span>{couple.groom.shortName}</span>
              <span className="mx-3 font-script text-3xl font-normal text-[#C5A059] sm:mx-4 sm:text-5xl md:text-6xl">
                &amp;
              </span>
              <span>{couple.bride.shortName}</span>
            </h1>
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#556377] italic max-w-md mx-auto mb-2">
            {couple.groom.fullName} &amp; {couple.bride.fullName}
          </p>

          <FloralSectionDivider size="sm" variant="gold" className="my-3" />

          {/* Date & Venue Subtitle */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-[#556377] sm:flex-row sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-1.5 text-[#2D3748]">
              <Calendar size={15} className="text-[#C5A059]" />
              <span className="font-semibold">{event.dateDisplay}</span>
            </div>
            <span className="hidden text-[#C5A059] sm:inline">•</span>
            <span className="text-[#556377]">{event.hijriDate}</span>
            <span className="hidden text-[#C5A059] sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#2D3748] font-semibold">
              <MapPin size={15} className="text-[#556B2F]" />
              <span>{event.venueName}</span>
            </div>
          </div>
        </GardenArchHeader>

        {/* Live Countdown Timer */}
        <div className="mb-10 w-full max-w-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7D8B74]">
            {timeLeft.isExpired ? "Alhamdulillah, Hari Bahagia Telah Tiba" : "Menghitung Hari Bahagia"}
          </p>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Minit", value: timeLeft.minutes },
              { label: "Saat", value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#E8E2D8] bg-[#FDFBF7] p-3 shadow-xs transition-all hover:border-[#C5A059] hover:scale-102 sm:p-4 overflow-hidden"
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                <span className="font-serif text-2xl font-bold text-[#2D3748] sm:text-4xl group-hover:text-[#556B2F] transition-colors tabular-nums font-mono">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#718096] sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row">
          <a
            href="#rsvp"
            className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] px-8 py-3.5 text-sm font-semibold text-[#FAF7F2] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(85,107,47,0.3)] active:scale-98 sm:w-auto sm:text-base cursor-pointer"
          >
            <span>Sahkan Kehadiran (RSVP)</span>
          </a>

          <a
            href="#acara"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E8E2D8] bg-[#FDFBF7] px-7 py-3.5 text-sm font-medium text-[#2D3748] shadow-xs transition-all duration-300 hover:border-[#C5A059] hover:bg-white active:scale-98 sm:w-auto sm:text-base cursor-pointer"
          >
            <span>Maklumat Acara &amp; Lokasi</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#mempelai"
          aria-label="Skrol ke bawah"
          className="mt-12 flex animate-bounce flex-col items-center gap-1 text-[#7D8B74] transition-colors hover:text-[#2D3748]"
        >
          <span className="text-[11px] uppercase tracking-wider">Teruskan Membaca</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
}
