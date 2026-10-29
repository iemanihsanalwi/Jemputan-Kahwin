"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import ArabesqueCorner from "@/components/art/ArabesqueCorner";
import FloralDivider from "@/components/art/FloralDivider";
import { MapPin, Navigation, Copy, Check, Car, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const { event } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="lokasi" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Panduan Arah
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Lokasi Majlis
        </h2>
        <FloralDivider size="md" />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gold-200/90 bg-white/95 p-6 shadow-gold backdrop-blur-md sm:p-8">
        <ArabesqueCorner position="all" size={40} />

        {/* Venue Info Top */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-gold-200/60 pb-6 md:flex-row md:items-center">
          <div>
            <span className="mb-2 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-800">
              Dewan Majlis
            </span>
            <h3 className="font-serif text-2xl font-bold text-emerald-950 sm:text-3xl">
              {event.venueName}
            </h3>
            {event.venueHall && (
              <p className="mb-1 text-sm font-medium text-gold-700">{event.venueHall}</p>
            )}
            <p className="max-w-xl text-xs leading-relaxed text-stone-600 sm:text-sm">
              {event.venueAddress}
            </p>
          </div>

          <button
            onClick={handleCopyAddress}
            aria-label="Salin alamat penuh majlis"
            className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-gold-300 bg-champagne-50 px-4 py-2.5 text-xs font-medium text-stone-800 transition-colors hover:bg-gold-100/70 focus:outline-none focus:ring-2 focus:ring-gold-500 active:scale-95 shadow-xs"
          >
            {copied ? (
              <span
                role="status"
                aria-live="polite"
                className="flex items-center gap-1.5 font-semibold text-emerald-700"
              >
                <Check size={14} className="text-emerald-600" />
                <span>Alamat Tersalin!</span>
              </span>
            ) : (
              <>
                <Copy size={14} className="text-gold-700" />
                <span>Salin Alamat Penuh</span>
              </>
            )}
          </button>
        </div>

        {/* 1-Click Navigation Buttons */}
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row">
          <a
            href={event.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1f8ceb] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1877cb] hover:shadow-lg active:scale-95 sm:flex-1"
          >
            <Navigation size={18} />
            <span>Pandu Dengan Waze</span>
            <ExternalLink size={14} className="opacity-70" />
          </a>

          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#ea4335] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#d33426] hover:shadow-lg active:scale-95 sm:flex-1"
          >
            <MapPin size={18} />
            <span>Pandu Dengan Google Maps</span>
            <ExternalLink size={14} className="opacity-70" />
          </a>
        </div>

        {/* Embedded Google Maps Frame */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-gold-200/80 shadow-inner sm:h-[420px]">
          <iframe
            src={event.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi ${event.venueName}`}
            className="saturate-90 h-full w-full filter"
          />
        </div>

        {/* Parking & Practical Tips */}
        {event.parkingInfo && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-200/50 bg-champagne-50/80 p-4 text-xs text-stone-700 sm:text-sm">
            <Car size={20} className="mt-0.5 flex-shrink-0 text-gold-600" />
            <p>
              <strong className="text-emerald-950 font-bold">Kemudahan Tempat Letak Kereta:</strong>{" "}
              {event.parkingInfo}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
