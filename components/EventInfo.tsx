"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import { createGoogleCalendarUrl, downloadIcsFile } from "@/lib/utils";
import ArabesqueCorner from "@/components/art/ArabesqueCorner";
import FloralDivider from "@/components/art/FloralDivider";
import { Calendar, Clock, MapPin, CalendarPlus, Shirt, Check, Sparkles, Heart, UserCheck, Camera, CheckCircle } from "lucide-react";

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

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCheck":
        return <UserCheck size={16} className="text-gold-600" />;
      case "Sparkles":
        return <Sparkles size={16} className="text-gold-600" />;
      case "Heart":
        return <Heart size={16} className="text-gold-600" />;
      case "Camera":
        return <Camera size={16} className="text-gold-600" />;
      case "CheckCircle":
        return <CheckCircle size={16} className="text-gold-600" />;
      default:
        return <Clock size={16} className="text-gold-600" />;
    }
  };

  return (
    <section id="acara" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Maklumat Majlis
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Atur Cara & Butiran Acara
        </h2>
        <FloralDivider size="md" />
      </div>

      {/* Main Event Card with Arabesque Frame */}
      <div className="relative mb-12 rounded-3xl border border-gold-200/90 bg-white/90 p-6 shadow-gold backdrop-blur-md sm:p-10">
        <ArabesqueCorner position="all" size={40} />

        <div className="grid grid-cols-1 gap-6 divide-y divide-gold-200 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* Tarikh */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <Calendar size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Tarikh Majlis
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-emerald-950 sm:text-2xl">
              {event.dateDisplay}
            </p>
            <p className="mt-1 text-xs font-medium text-gold-700">{event.hijriDate}</p>
          </div>

          {/* Masa */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <Clock size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Waktu Jamuan
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-emerald-950 sm:text-2xl">
              {event.receptionTime}
            </p>
            {event.resepsi && (
              <p className="mt-1 text-xs text-stone-500">{event.resepsi.venue}</p>
            )}
          </div>

          {/* Tempat */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <MapPin size={24} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Tempat Acara
            </span>
            <p className="mt-1 font-serif text-xl font-bold text-emerald-950 sm:text-2xl">
              {event.venueName}
            </p>
            <p className="mt-1 text-xs font-medium text-stone-600">{event.venueHall}</p>
          </div>
        </div>

        {/* Akad & Resepsi Dual Badge (if specified) */}
        {(event.akad || event.resepsi) && (
          <div className="mt-6 pt-6 border-t border-gold-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.akad && (
              <div className="rounded-2xl border border-gold-200 bg-champagne-50/70 p-4 text-center">
                <span className="inline-block rounded-full bg-gold-200/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-900 mb-1">
                  Upacara Akad Nikah
                </span>
                <p className="font-serif text-sm font-bold text-emerald-950">
                  {event.akad.time}
                </p>
                <p className="text-xs text-stone-600">{event.akad.venue}</p>
              </div>
            )}
            {event.resepsi && (
              <div className="rounded-2xl border border-gold-200 bg-champagne-50/70 p-4 text-center">
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  Majlis Resepsi
                </span>
                <p className="font-serif text-sm font-bold text-emerald-950">
                  {event.resepsi.time}
                </p>
                <p className="text-xs text-stone-600">{event.resepsi.venue}</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar Integration Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-gold-200/60 pt-8">
          <button
            onClick={handleGoogleCalendar}
            className="flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-emerald-850 sm:text-sm active:scale-95"
          >
            <CalendarPlus size={16} />
            <span>Simpan ke Google Calendar</span>
          </button>

          <button
            onClick={handleIcsDownload}
            className="flex items-center gap-2 rounded-full border border-gold-300 bg-white px-5 py-2.5 text-xs font-medium text-stone-800 shadow-sm transition-all hover:bg-gold-50 sm:text-sm active:scale-95"
          >
            {downloadedIcs ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="font-medium text-emerald-700">Kalendar Dimuat Turun!</span>
              </>
            ) : (
              <>
                <Calendar size={16} className="text-gold-600" />
                <span>Apple Calendar / iCal (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dress Code Box */}
      {event.dressCode && (
        <div className="relative mb-12 rounded-3xl border border-gold-300/60 bg-gradient-to-r from-champagne-100/80 via-white to-champagne-100/80 p-6 text-center shadow-sm sm:p-8">
          <ArabesqueCorner position="all" size={32} />
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-800 sm:text-sm">
            <Shirt size={16} />
            <span>{event.dressCode.title}</span>
          </div>
          <p className="mx-auto mb-5 max-w-xl text-sm font-medium text-stone-700 sm:text-base">
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
                <span className="text-[11px] font-medium text-stone-600">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Flow / Timeline */}
      <div className="relative rounded-3xl border border-gold-200/90 bg-white/90 p-6 shadow-gold backdrop-blur-md sm:p-10">
        <ArabesqueCorner position="all" size={36} />

        <div className="mb-8 text-center">
          <h3 className="mb-1 font-serif text-2xl font-bold text-emerald-950">
            Tentatif Majlis
          </h3>
          <p className="text-xs text-stone-500 sm:text-sm">
            Perjalanan acara sepanjang hari bahagia
          </p>
        </div>

        <div className="relative ml-4 space-y-8 border-l-2 border-gold-300/70 py-2 pl-6 sm:ml-32 sm:pl-8">
          {event.schedule.map((item, index) => (
            <div key={index} className="group relative">
              {/* Timeline Gold Dot with Icon */}
              <div className="absolute -left-[31px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gold-500 shadow-md transition-transform group-hover:scale-125 sm:-left-[41px]">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              {/* Time indicator */}
              <div className="sm:absolute sm:-left-32 sm:top-0 sm:w-24 sm:text-right">
                <span className="inline-block rounded-md bg-gold-100 px-2.5 py-1 font-mono text-xs font-bold text-gold-900 shadow-xs">
                  {item.time}
                </span>
              </div>

              {/* Event Content */}
              <div>
                <h4 className="flex items-center gap-2 font-serif text-lg font-bold text-emerald-950 transition-colors group-hover:text-gold-700">
                  {getIcon(item.iconName)}
                  <span>{item.title}</span>
                </h4>
                {item.description && (
                  <p className="mt-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
