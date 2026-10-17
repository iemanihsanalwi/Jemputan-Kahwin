"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { Calendar, ChevronDown, Heart, Sparkles } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const targetDate = new Date(`${weddingConfig.event.date}T11:00:00+08:00`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-gradient-to-b from-champagne-50 via-parchment to-champagne-100 px-4 pb-16 pt-24 sm:min-h-screen">
      {/* Decorative Gold Rings & Ornaments in Background */}
      <div className="pointer-events-none absolute left-1/2 top-12 -z-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full border border-gold-300/30 sm:h-[540px] sm:w-[540px]" />
      <div className="pointer-events-none absolute left-1/2 top-8 -z-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-gold-400/20 sm:h-[600px] sm:w-[600px]" />

      {/* Floating Sparkle Accents */}
      <div className="pointer-events-none absolute left-[10%] top-28 hidden animate-float-slow text-gold-400/60 sm:block">
        <Sparkles size={28} />
      </div>
      <div className="pointer-events-none absolute bottom-32 right-[12%] hidden animate-float-slow text-gold-400/60 sm:block">
        <Sparkles size={24} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Bismillah Calligraphy */}
        <div className="mb-4">
          <p className="font-arabic text-2xl tracking-wide text-emerald-900 sm:text-3xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Invitation Header */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-gold-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-800 shadow-sm sm:text-sm">
          <Heart size={14} className="fill-gold-600 text-gold-600" />
          <span>WALIMATULURUS</span>
          <Heart size={14} className="fill-gold-600 text-gold-600" />
        </div>

        {/* Family Greeting */}
        <p className="mb-6 max-w-lg text-xs tracking-wide text-stone-600 sm:text-sm">
          {weddingConfig.couple.familySideNote}
        </p>

        {/* Featured Couple Portrait with Gold Frame */}
        <div className="group relative mb-8">
          <div className="absolute -inset-2 animate-pulse-subtle rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 opacity-60 blur-sm transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-2xl sm:h-52 sm:w-52">
            <Image
              src={weddingConfig.gallery[0]?.url || weddingConfig.couple.groom.image}
              alt="Mempelai Amirul & Farhana"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 160px, 208px"
            />
          </div>
        </div>

        {/* Couple Names */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-6xl md:text-7xl">
            <span>{weddingConfig.couple.groom.shortName}</span>
            <span className="mx-3 font-script text-3xl font-normal text-gold-500 sm:mx-4 sm:text-5xl md:text-6xl">
              &
            </span>
            <span>{weddingConfig.couple.bride.shortName}</span>
          </h1>
        </div>

        {/* Date & Venue Subtitle */}
        <div className="mb-8 flex flex-col items-center justify-center gap-2 text-sm font-medium text-stone-700 sm:flex-row sm:gap-4 sm:text-base">
          <div className="flex items-center gap-1.5 text-gold-800">
            <Calendar size={18} className="text-gold-600" />
            <span className="font-semibold">{weddingConfig.event.dateDisplay}</span>
          </div>
          <span className="hidden text-gold-400 sm:inline">•</span>
          <span className="text-stone-600">{weddingConfig.event.hijriDate}</span>
          <span className="hidden text-gold-400 sm:inline">•</span>
          <span className="font-medium text-emerald-900">
            {weddingConfig.event.venueName}
          </span>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10 w-full max-w-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-500">
            Menghitung Hari Bahagia
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Minit", value: timeLeft.minutes },
              { label: "Saat", value: timeLeft.seconds },
            ].map((unit, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-2xl border border-gold-200/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm transition-colors hover:border-gold-400 sm:p-4"
              >
                <span className="font-serif text-2xl font-bold text-emerald-950 sm:text-4xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-stone-500 sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#rsvp"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3.5 text-sm font-semibold text-white shadow-gold transition-all hover:from-gold-600 hover:to-gold-700 hover:shadow-gold-glow active:scale-95 sm:w-auto sm:text-base"
          >
            <span>Sahkan Kehadiran (RSVP)</span>
          </a>

          <a
            href="#acara"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold-300 bg-white/90 px-7 py-3.5 text-sm font-medium text-stone-800 shadow-sm transition-all hover:border-gold-500 hover:bg-white active:scale-95 sm:w-auto sm:text-base"
          >
            <span>Maklumat Acara & Lokasi</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <a
          href="#mempelai"
          aria-label="Skrol ke bawah"
          className="mt-12 flex animate-bounce flex-col items-center gap-1 text-stone-400 transition-colors hover:text-gold-600"
        >
          <span className="text-[11px] uppercase tracking-wider">Teruskan Membaca</span>
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  );
}
