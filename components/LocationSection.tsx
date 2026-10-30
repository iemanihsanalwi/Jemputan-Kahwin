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
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-[#EAD5D5] bg-white/85 p-6 shadow-rose backdrop-blur-md sm:p-8">
        <BotanicalCornerFlourish position="all" size={40} variant="rose" />

        {/* Venue Info Top */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#EAD5D5] pb-6 md:flex-row md:items-center">
          <div>
            <span className="mb-2 inline-block rounded-full border border-[#EAD5D5] bg-[#FDE8EC] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
              Dewan Majlis
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#3D2429] sm:text-3xl">
              {event.venueName}
            </h3>
            {event.venueHall && (
              <p className="mb-1 text-sm font-medium text-[#D4A373]">{event.venueHall}</p>
            )}
            <p className="max-w-xl text-xs leading-relaxed text-[#7A555C] sm:text-sm select-text">
              {event.venueAddress}
            </p>
          </div>

          <button
            onClick={handleCopyAddress}
            aria-label="Salin alamat penuh majlis"
            className="flex flex-shrink-0 items-center justify-center min-h-[44px] gap-2 rounded-full border-2 border-[#EAD5D5] bg-[#FFF8F8] px-5 py-2.5 text-xs font-semibold text-[#3D2429] transition-all hover:border-[#D4A373] hover:bg-[#FDE8EC]/70 focus:outline-none focus:ring-2 focus:ring-[#D88A96] active:scale-[0.97] shadow-xs cursor-pointer"
          >
            {copied ? (
              <span
                role="status"
                aria-live="polite"
                className="flex items-center gap-1.5 font-semibold text-[#C56D7E]"
              >
                <Check size={14} className="text-[#C56D7E]" />
                <span>Alamat Tersalin!</span>
              </span>
            ) : (
              <>
                <Copy size={14} className="text-[#D4A373]" />
                <span>Salin Alamat Penuh</span>
              </>
            )}
          </button>
        </div>

        {/* 1-Click Navigation Buttons with HIG 44pt Touch Targets */}
        <div className="flex flex-col items-center gap-4 py-6 sm:flex-row">
          <a
            href={event.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-full border-2 border-[#EAD5D5] bg-white px-6 py-3.5 text-sm font-semibold text-[#3D2429] shadow-sm transition-all hover:bg-[#FFF8F8] hover:border-[#D4A373] hover:shadow-rose active:scale-[0.97] sm:flex-1 cursor-pointer"
          >
            <Navigation size={18} className="text-[#D4A373]" />
            <span>Pandu Dengan Waze</span>
            <ExternalLink size={14} className="opacity-60 text-[#7A555C]" />
          </a>

          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-full border-2 border-[#EAD5D5] bg-white px-6 py-3.5 text-sm font-semibold text-[#3D2429] shadow-sm transition-all hover:bg-[#FFF8F8] hover:border-[#D4A373] hover:shadow-rose active:scale-[0.97] sm:flex-1 cursor-pointer"
          >
            <MapPin size={18} className="text-[#C56D7E]" />
            <span>Pandu Dengan Google Maps</span>
            <ExternalLink size={14} className="opacity-60 text-[#7A555C]" />
          </a>
        </div>

        {/* Embedded Google Maps Frame */}
        <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border-2 border-[#EAD5D5] shadow-inner sm:h-[420px]">
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
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 text-xs text-[#7A555C] sm:text-sm">
            <div className="mt-0.5 flex-shrink-0">
              <BotanicalIconBadge size="sm" variant="rose">
                <Car size={15} className="text-[#C56D7E]" />
              </BotanicalIconBadge>
            </div>
            <p>
              <strong className="text-[#3D2429] font-bold">Kemudahan Tempat Letak Kereta:</strong>{" "}
              {event.parkingInfo}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
