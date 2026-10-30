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
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EAD5D5] bg-white/95 px-4 py-1.5 text-xs font-semibold text-[#3D2429] shadow-sm backdrop-blur-sm animate-pulse-subtle">
      <span className="h-2 w-2 rounded-full bg-[#D4A373] animate-ping" />
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
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute left-1/2 top-16 -z-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full border border-gold-300/25 sm:h-[580px] sm:w-[580px]" />
      <div className="pointer-events-none absolute left-1/2 top-10 -z-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full border border-blush-300/20 sm:h-[640px] sm:w-[640px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Dynamic Guest Ribbon Badge */}
        <Suspense fallback={null}>
          <HeroPersonalizedBadge />
        </Suspense>

        {/* Bismillah Vector Calligraphy */}
        <div className="mb-4">
          <BismillahHeader variant="light" size="md" />
        </div>

        {/* Invitation Category Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#EAD5D5] bg-[#FDE8EC] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576] shadow-sm">
          <Heart size={13} className="fill-[#D88A96] text-[#D88A96]" />
          <span>WALIMATULURUS</span>
          <Heart size={13} className="fill-[#D88A96] text-[#D88A96]" />
        </div>

        {/* Family Side Greeting */}
        <p className="mb-6 max-w-md text-xs tracking-wide text-[#7A555C] sm:text-sm">
          {couple.familySideNote}
        </p>

        {/* Expansive Multi-Layered Garden Trellis & Floral Archway */}
        <GardenArchHeader
          initials={initials}
          subtitle="RAJA SEHARI"
          className="w-full max-w-2xl mb-8"
        >
          {/* Couple Calligraphic Names */}
          <div className="mb-3">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#3D2429] sm:text-6xl md:text-7xl">
              <span>{couple.groom.shortName}</span>
              <span className="mx-3 font-script text-3xl font-normal text-[#D4A373] sm:mx-4 sm:text-5xl md:text-6xl">
                &amp;
              </span>
              <span>{couple.bride.shortName}</span>
            </h1>
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#7A555C] italic max-w-md mx-auto mb-2">
            {couple.groom.fullName} &amp; {couple.bride.fullName}
          </p>

          <FloralSectionDivider size="sm" className="my-3" />

          {/* Date & Venue Subtitle */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-[#7A555C] sm:flex-row sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-1.5 text-[#D4A373]">
              <Calendar size={15} className="text-[#C56D7E]" />
              <span className="font-semibold">{event.dateDisplay}</span>
            </div>
            <span className="hidden text-[#D4A373] sm:inline">•</span>
            <span className="text-[#7A555C]">{event.hijriDate}</span>
            <span className="hidden text-[#D4A373] sm:inline">•</span>
            <div className="flex items-center gap-1 text-[#3D2429] font-semibold">
              <MapPin size={15} className="text-[#B56576]" />
              <span>{event.venueName}</span>
            </div>
          </div>
        </GardenArchHeader>

        {/* Live Countdown Timer with Pressed-Flower Botanical Enclosures */}
        <div className="mb-10 w-full max-w-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
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
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#EAD5D5] ring-1 ring-[#FADBD8]/60 bg-white/85 p-3 shadow-rose backdrop-blur-sm transition-all hover:border-[#D4A373] hover:scale-105 sm:p-4 overflow-hidden"
              >
                {/* Micro Petal Corner Florets in Each Box */}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="absolute top-1 left-1 w-3.5 h-3.5 text-[#D4A373] opacity-60 pointer-events-none"
                  aria-hidden="true"
                >
                  <path d="M 0 0 C 6 2, 8 8, 8 12 C 4 8, 2 6, 0 0 Z" fill="#D88A96" opacity="0.8" />
                  <circle cx="2" cy="2" r="1.5" fill="#D4A373" />
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="absolute top-1 right-1 w-3.5 h-3.5 text-[#D4A373] opacity-60 pointer-events-none rotate-90"
                  aria-hidden="true"
                >
                  <path d="M 0 0 C 6 2, 8 8, 8 12 C 4 8, 2 6, 0 0 Z" fill="#D88A96" opacity="0.8" />
                  <circle cx="2" cy="2" r="1.5" fill="#D4A373" />
                </svg>

                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent" />
                <span className="font-serif text-2xl font-bold text-[#3D2429] sm:text-4xl group-hover:text-[#B56576] transition-colors">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#7A555C] sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Call to Actions (Rounded Pill Contours with Rose Gold Borders) */}
        <div className="flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row">
          <a
            href="#rsvp"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#E2B686] bg-gradient-to-r from-[#D88A96] via-[#C56D7E] to-[#B56576] px-8 py-3.5 text-sm font-semibold text-white shadow-rose transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_24px_rgba(201,122,139,0.35)] active:scale-95 sm:w-auto sm:text-base cursor-pointer"
          >
            <span>Sahkan Kehadiran (RSVP)</span>
          </a>

          <a
            href="#acara"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#EAD5D5] bg-white/95 px-7 py-3.5 text-sm font-medium text-[#3D2429] shadow-sm transition-all duration-300 hover:border-[#D4A373] hover:bg-[#FDE8EC]/60 hover:shadow-rose active:scale-95 sm:w-auto sm:text-base cursor-pointer"
          >
            <span>Maklumat Acara &amp; Lokasi</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#mempelai"
          aria-label="Skrol ke bawah"
          className="mt-12 flex animate-bounce flex-col items-center gap-1 text-[#B56576] transition-colors hover:text-[#3D2429]"
        >
          <span className="text-[11px] uppercase tracking-wider">Teruskan Membaca</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
}
