"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BismillahHeader from "@/components/art/BismillahHeader";
import PetalFrame from "@/components/art/PetalFrame";
import FloralWreathHeader from "@/components/art/FloralWreathHeader";
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
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/80 bg-white/95 px-4 py-1.5 text-xs font-semibold text-sage-900 shadow-sm backdrop-blur-sm animate-pulse-subtle">
      <span className="h-2 w-2 rounded-full bg-gold-500 animate-ping" />
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
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:min-h-screen">
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
          <BismillahHeader variant="sage" size="md" />
        </div>

        {/* Invitation Category Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-gold-100/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-900 shadow-sm">
          <Heart size={13} className="fill-gold-600 text-gold-600" />
          <span>WALIMATULURUS</span>
          <Heart size={13} className="fill-gold-600 text-gold-600" />
        </div>

        {/* Family Side Greeting */}
        <p className="mb-6 max-w-md text-xs tracking-wide text-olive-600 sm:text-sm">
          {couple.familySideNote}
        </p>

        {/* Pure SVG PetalFrame Framing the Monogram Wreath & Names */}
        <PetalFrame className="w-full max-w-2xl mb-6">
          {/* Floral Wreath Monogram Medallion */}
          <div className="mb-6 flex justify-center">
            <FloralWreathHeader
              initials={initials}
              subtitle="RAJA SEHARI"
              size="lg"
            />
          </div>

          {/* Couple Calligraphic Names */}
          <div className="mb-3">
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-sage-950 sm:text-6xl md:text-7xl">
              <span>{couple.groom.shortName}</span>
              <span className="mx-3 font-script text-3xl font-normal text-gold-500 sm:mx-4 sm:text-5xl md:text-6xl">
                &amp;
              </span>
              <span>{couple.bride.shortName}</span>
            </h1>
          </div>

          <p className="font-serif text-xs sm:text-sm text-olive-600 italic max-w-md mx-auto mb-2">
            {couple.groom.fullName} &amp; {couple.bride.fullName}
          </p>

          <FloralSectionDivider size="sm" className="my-3" />

          {/* Date & Venue Subtitle with Micro-Botanical Badges */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-medium text-olive-700 sm:flex-row sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-1.5 text-gold-800">
              <Calendar size={15} className="text-gold-600" />
              <span className="font-semibold">{event.dateDisplay}</span>
            </div>
            <span className="hidden text-gold-400 sm:inline">•</span>
            <span className="text-olive-600">{event.hijriDate}</span>
            <span className="hidden text-gold-400 sm:inline">•</span>
            <div className="flex items-center gap-1 text-sage-900 font-semibold">
              <MapPin size={15} className="text-sage-700" />
              <span>{event.venueName}</span>
            </div>
          </div>
        </PetalFrame>

        {/* Live Countdown Timer with Gold Borders */}
        <div className="mb-10 w-full max-w-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-800">
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
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-gold-300/90 ring-1 ring-gold-200/50 bg-gradient-to-b from-white via-cream-50/70 to-white p-3 shadow-gold backdrop-blur-sm transition-all hover:border-gold-500 hover:scale-105 sm:p-4"
              >
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                <span className="font-serif text-2xl font-bold text-sage-950 sm:text-4xl group-hover:text-gold-700 transition-colors">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-olive-500 sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Call to Actions (Rounded Pill Contours with Gold Botanical Borders) */}
        <div className="flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row">
          <a
            href="#rsvp"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-gold-400 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 px-8 py-3.5 text-sm font-semibold text-white shadow-gold transition-all duration-300 hover:from-gold-600 hover:to-gold-800 hover:shadow-gold-glow hover:border-gold-300 active:scale-95 sm:w-auto sm:text-base"
          >
            <span>Sahkan Kehadiran (RSVP)</span>
          </a>

          <a
            href="#acara"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-gold-300/80 bg-white/95 px-7 py-3.5 text-sm font-medium text-olive-800 shadow-sm transition-all duration-300 hover:border-gold-500 hover:bg-gold-50/50 hover:shadow-gold active:scale-95 sm:w-auto sm:text-base"
          >
            <span>Maklumat Acara &amp; Lokasi</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#mempelai"
          aria-label="Skrol ke bawah"
          className="mt-12 flex animate-bounce flex-col items-center gap-1 text-olive-400 transition-colors hover:text-gold-600"
        >
          <span className="text-[11px] uppercase tracking-wider">Teruskan Membaca</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
}
