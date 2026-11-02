"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import SectionHeader from "@/components/SectionHeader";
import { MapPin, Navigation, Copy, Check, Car, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const weddingConfig = useWeddingConfig();
  const { event } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="lokasi" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="PANDUAN ARAH"
        title="Lokasi Majlis"
        dividerVariant="gold"
      />

      <div className="relative overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs sm:p-8">
        <BotanicalCornerFlourish position="all" size={40} variant="gold" />

        {/* Venue Info Top */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#E8E2D8] pb-6 md:flex-row md:items-center">
          <div>
            <span className="mb-2 inline-block rounded-full border border-[#E8E2D8] bg-[#F4F6F2] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#556B2F]">
              Dewan Majlis
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#2D3748] sm:text-3xl">
              {event.venueName}
            </h3>
            {event.venueHall && (
              <p className="mb-1 text-sm font-medium text-[#C5A059]">{event.venueHall}</p>
            )}
            <p className="max-w-xl text-xs leading-relaxed text-[#556377] sm:text-sm select-text">
              {event.venueAddress}
            </p>
          </div>

          <button
            onClick={handleCopyAddress}
            aria-label="Salin alamat penuh majlis"
            className="flex flex-shrink-0 items-center justify-center min-h-[44px] gap-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-5 py-2.5 text-xs font-semibold text-[#2D3748] transition-all hover:border-[#C5A059] hover:bg-white focus:outline-none active:scale-98 shadow-xs cursor-pointer"
          >
            {copied ? (
              <span
                role="status"
                aria-live="polite"
                className="flex items-center gap-1.5 font-semibold text-[#556B2F]"
              >
                <Check size={14} className="text-[#556B2F]" />
                <span>Alamat Tersalin!</span>
              </span>
            ) : (
              <>
                <Copy size={14} className="text-[#C5A059]" />
                <span>Salin Alamat Penuh</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row">
          <a
            href={event.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-6 py-3.5 text-sm font-semibold text-[#2D3748] shadow-xs transition-all hover:bg-white hover:border-[#C5A059] active:scale-98 sm:flex-1 cursor-pointer"
          >
            <Navigation size={18} className="text-[#C5A059]" />
            <span>Pandu Dengan Waze</span>
            <ExternalLink size={14} className="opacity-60 text-[#556377]" />
          </a>

          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-6 py-3.5 text-sm font-semibold text-[#2D3748] shadow-xs transition-all hover:bg-white hover:border-[#C5A059] active:scale-98 sm:flex-1 cursor-pointer"
          >
            <MapPin size={18} className="text-[#556B2F]" />
            <span>Pandu Dengan Google Maps</span>
            <ExternalLink size={14} className="opacity-60 text-[#556377]" />
          </a>
        </div>

        {/* Embedded Google Maps Frame */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-[#E8E2D8] shadow-inner sm:h-[420px]">
          <iframe
            src={event.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi Acara di ${event.venueName}`}
            className="h-full w-full"
          />
        </div>

        {/* Parking / Arrival Tips */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-4 text-xs text-[#556377] sm:text-sm">
          <div className="flex-shrink-0 mt-0.5">
            <BotanicalIconBadge size="sm" variant="sage">
              <Car size={16} className="text-[#556B2F]" />
            </BotanicalIconBadge>
          </div>
          <div>
            <h4 className="font-semibold text-[#2D3748]">Panduan Tempat Letak Kereta</h4>
            <p className="mt-0.5 leading-relaxed">
              Kawasan parkir percuma yang luas disediakan di sekitar dewan. Tetamu dinasihatkan tiba 15–20 minit lebih awal untuk kemudahan meletak kenderaan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
