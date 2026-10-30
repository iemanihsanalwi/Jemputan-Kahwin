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
      />

      {/* Main Event Card with Botanical Corners */}
      <div className="relative mb-12 rounded-3xl border-2 border-[#EAD5D5] bg-white/85 p-6 shadow-rose backdrop-blur-md sm:p-10">
        <BotanicalCornerFlourish position="all" size={40} variant="rose" />

        <div className="grid grid-cols-1 gap-6 divide-y divide-[#EAD5D5] text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Tarikh */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="rose">
                <Calendar size={22} className="text-[#C56D7E]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
              Tarikh Majlis
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#3D2429] sm:text-2xl">
              {event.dateDisplay}
            </p>
            <p className="mt-1 text-xs font-medium text-[#D4A373]">{event.hijriDate}</p>
          </div>

          {/* Masa */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="rose">
                <Clock size={22} className="text-[#C56D7E]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
              Waktu Jamuan
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#3D2429] sm:text-2xl">
              {event.receptionTime}
            </p>
            {event.resepsi && (
              <p className="mt-1 text-xs text-[#7A555C]">{event.resepsi.venue}</p>
            )}
          </div>

          {/* Tempat */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3">
              <BotanicalIconBadge size="md" variant="rose">
                <MapPin size={22} className="text-[#C56D7E]" />
              </BotanicalIconBadge>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
              Tempat Acara
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-[#3D2429] sm:text-2xl">
              {event.venueName}
            </p>
            <p className="mt-1 text-xs font-medium text-[#7A555C]">{event.venueHall}</p>
          </div>
        </div>

        {/* Akad & Resepsi Dual Badge */}
        {(event.akad || event.resepsi) && (
          <div className="mt-6 pt-6 border-t border-[#EAD5D5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.akad && (
              <div className="rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 text-center">
                <span className="inline-block rounded-full bg-[#FDE8EC] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B56576] mb-1">
                  Upacara Akad Nikah
                </span>
                <p className="font-serif text-sm font-bold text-[#3D2429]">
                  {event.akad.time}
                </p>
                <p className="text-xs text-[#7A555C]">{event.akad.venue}</p>
              </div>
            )}
            {event.resepsi && (
              <div className="rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 text-center">
                <span className="inline-block rounded-full bg-[#FDE8EC] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B56576] mb-1">
                  Majlis Resepsi
                </span>
                <p className="font-serif text-sm font-bold text-[#3D2429]">
                  {event.resepsi.time}
                </p>
                <p className="text-xs text-[#7A555C]">{event.resepsi.venue}</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar Integration Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-[#EAD5D5] pt-8">
          <button
            onClick={handleGoogleCalendar}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E2B686] bg-gradient-to-r from-[#D88A96] via-[#C56D7E] to-[#B56576] px-6 py-3 text-xs font-semibold text-white shadow-rose transition-all hover:scale-[1.02] active:scale-[0.97] sm:text-sm cursor-pointer"
          >
            <CalendarPlus size={16} />
            <span>Simpan ke Google Calendar</span>
          </button>

          <button
            onClick={handleIcsDownload}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-[#EAD5D5] bg-white px-6 py-3 text-xs font-semibold text-[#3D2429] shadow-sm transition-all hover:border-[#D4A373] hover:bg-[#FDE8EC]/60 sm:text-sm active:scale-[0.97] cursor-pointer"
          >
            {downloadedIcs ? (
              <>
                <Check size={16} className="text-[#C56D7E]" />
                <span className="font-medium text-[#C56D7E]">Kalendar Dimuat Turun!</span>
              </>
            ) : (
              <>
                <Calendar size={16} className="text-[#D4A373]" />
                <span>Apple Calendar / iCal (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dress Code Box */}
      {event.dressCode && (
        <div className="relative mb-12 rounded-3xl border-2 border-[#EAD5D5] bg-white/85 p-6 text-center shadow-rose sm:p-8">
          <BotanicalCornerFlourish position="all" size={32} variant="rose" />
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576] sm:text-sm">
            <Shirt size={16} className="text-[#C56D7E]" />
            <span>{event.dressCode.title}</span>
          </div>
          <p className="mx-auto mb-5 max-w-xl text-sm font-medium text-[#7A555C] sm:text-base">
            {event.dressCode.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {event.dressCode.colorPalette.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[11px] font-medium text-[#7A555C]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Flow / Timeline */}
      <div className="relative rounded-3xl border-2 border-[#EAD5D5] bg-white/85 p-6 shadow-rose backdrop-blur-md sm:p-10">
        <BotanicalCornerFlourish position="all" size={36} variant="rose" />

        <div className="mb-8 text-center">
          <h3 className="mb-1 font-serif text-2xl font-bold text-[#3D2429]">
            Tentatif Majlis
          </h3>
          <p className="text-xs text-[#7A555C] sm:text-sm">
            Perjalanan acara sepanjang hari bahagia
          </p>
        </div>

        <VineTimeline schedule={event.schedule} />
      </div>
    </section>
  );
}
