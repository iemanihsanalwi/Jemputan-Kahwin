"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import { createGoogleCalendarUrl, downloadIcsFile } from "@/lib/utils";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import VineTimeline from "@/components/art/VineTimeline";
import SectionHeader from "@/components/SectionHeader";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  Shirt,
  Check,
} from "lucide-react";

export default function EventInfo() {
  const weddingConfig = useWeddingConfig();
  const { event, couple } = weddingConfig;
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const handleGoogleCalendar = () => {
    const url = createGoogleCalendarUrl({
      title: event.title,
      details: `${couple.familySideNote}\n\nTempat: ${event.venueName}, ${event.venueHall}\nAlamat: ${event.venueAddress}`,
      location: `${event.venueName}, ${event.venueAddress}`,
      startDate: event.date,
    });
    window.open(url, "_blank");
  };

  const handleIcsDownload = () => {
    downloadIcsFile({
      title: event.title,
      details: `Majlis Walimatulurus ${couple.groom.shortName} & ${couple.bride.shortName}`,
      location: `${event.venueName}, ${event.venueAddress}`,
      startDate: event.date,
    });
    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  return (
    <section id="acara" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="ATUR CARA MAJLIS"
        title="Atur Cara &amp; Butiran Acara"
        dividerVariant="gold"
      />

      {/* Main Event Card */}
      <div className="relative mb-12 rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs sm:p-10">
        <BotanicalCornerFlourish position="all" size={40} variant="gold" />

        <div className="grid grid-cols-1 gap-6 divide-y divide-[#E8E2D8] text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Tarikh */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="gold">
                <Calendar size={22} className="text-[#C5A059]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D8B74]">
              Tarikh Majlis
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#2D3748] sm:text-2xl">
              {event.dateDisplay}
            </p>
            <p className="mt-1 text-xs font-medium text-[#C5A059]">{event.hijriDate}</p>
          </div>

          {/* Masa */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="sage">
                <Clock size={22} className="text-[#556B2F]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D8B74]">
              Waktu Jamuan
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#2D3748] sm:text-2xl">
              {event.receptionTime}
            </p>
            {event.resepsi && (
              <p className="mt-1 text-xs text-[#556377]">{event.resepsi.venue}</p>
            )}
          </div>

          {/* Tempat */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="gold">
                <MapPin size={22} className="text-[#C5A059]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D8B74]">
              Tempat Acara
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#2D3748] sm:text-2xl">
              {event.venueName}
            </p>
            <p className="mt-1 text-xs font-medium text-[#556377]">{event.venueHall}</p>
          </div>
        </div>

        {/* Akad & Resepsi Dual Badge */}
        {(event.akad || event.resepsi) && (
          <div className="mt-6 pt-6 border-t border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.akad && (
              <div className="rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-4 text-center">
                <span className="inline-block rounded-full bg-[#F4F6F2] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#556B2F] mb-1">
                  Upacara Akad Nikah
                </span>
                <p className="font-serif text-sm font-bold text-[#2D3748]">
                  {event.akad.time}
                </p>
                <p className="text-xs text-[#556377]">{event.akad.venue}</p>
              </div>
            )}
            {event.resepsi && (
              <div className="rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-4 text-center">
                <span className="inline-block rounded-full bg-[#F4F6F2] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#556B2F] mb-1">
                  Majlis Resepsi
                </span>
                <p className="font-serif text-sm font-bold text-[#2D3748]">
                  {event.resepsi.time}
                </p>
                <p className="text-xs text-[#556377]">{event.resepsi.venue}</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar Integration Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-[#E8E2D8] pt-8">
          <button
            onClick={handleGoogleCalendar}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] px-6 py-3 text-xs font-semibold text-[#FAF7F2] shadow-xs transition-all hover:scale-[1.02] active:scale-98 sm:text-sm cursor-pointer"
          >
            <CalendarPlus size={16} />
            <span>Simpan ke Google Calendar</span>
          </button>

          <button
            onClick={handleIcsDownload}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-6 py-3 text-xs font-semibold text-[#2D3748] shadow-xs transition-all hover:border-[#C5A059] hover:bg-white sm:text-sm active:scale-98 cursor-pointer"
          >
            {downloadedIcs ? (
              <>
                <Check size={16} className="text-[#556B2F]" />
                <span className="font-medium text-[#556B2F]">Kalendar Dimuat Turun!</span>
              </>
            ) : (
              <>
                <Calendar size={16} className="text-[#C5A059]" />
                <span>Apple Calendar / iCal (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dress Code Box */}
      {event.dressCode && (
        <div className="relative mb-12 rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 text-center shadow-xs sm:p-8">
          <BotanicalCornerFlourish position="all" size={32} variant="sage" />
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7D8B74] sm:text-sm">
            <Shirt size={16} className="text-[#556B2F]" />
            <span>{event.dressCode.title}</span>
          </div>
          <p className="mx-auto mb-5 max-w-xl text-sm font-medium text-[#556377] sm:text-base">
            {event.dressCode.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {event.dressCode.colorPalette.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className="h-10 w-10 rounded-full border-2 border-white shadow-xs transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[11px] font-medium text-[#556377]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Flow / Timeline */}
      <div className="relative rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs sm:p-10">
        <BotanicalCornerFlourish position="all" size={36} variant="gold" />

        <div className="mb-8 text-center">
          <h3 className="mb-1 font-serif text-2xl font-bold text-[#2D3748]">
            Tentatif Majlis
          </h3>
          <p className="text-xs text-[#556377] sm:text-sm">
            Perjalanan acara sepanjang hari bahagia
          </p>
        </div>

        <VineTimeline schedule={event.schedule} />
      </div>
    </section>
  );
}
