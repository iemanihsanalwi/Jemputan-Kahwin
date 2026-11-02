"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import { cleanPhoneNumber, createGoogleCalendarUrl, downloadIcsFile } from "@/lib/utils";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import {
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle2,
  X,
  Navigation,
  Copy,
  Check,
  CalendarPlus,
  ExternalLink,
  Phone,
} from "lucide-react";

export default function FloatingActionDock() {
  const weddingConfig = useWeddingConfig();
  const [activeModal, setActiveModal] = useState<"location" | "calendar" | "whatsapp" | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const { event, contacts, couple } = weddingConfig;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleGoogleCalendar = () => {
    const url = createGoogleCalendarUrl({
      title: event.title,
      details: `${couple.familySideNote}\n\nTempat: ${event.venueName}, ${event.venueHall}\nAlamat: ${event.venueAddress}`,
      location: `${event.venueName}, ${event.venueAddress}`,
      startDate: event.date,
    });
    window.open(url, "_blank");
    setActiveModal(null);
  };

  const handleIcsDownload = () => {
    downloadIcsFile({
      title: event.title,
      details: `Majlis Walimatulurus ${couple.groom.shortName} & ${couple.bride.shortName}`,
      location: `${event.venueName}, ${event.venueAddress}`,
      startDate: event.date,
    });
    setDownloadedIcs(true);
    setTimeout(() => {
      setDownloadedIcs(false);
      setActiveModal(null);
    }, 2000);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Floating Bottom Action Dock - Appllama HIG Compliant Safe Area Inset */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-40 max-w-md mx-auto select-none">
        <div className="flex items-center justify-around rounded-full border border-[#E8E2D8] bg-[#FAF7F2]/95 px-3 py-2 shadow-sm backdrop-blur-md">
          {/* 1. Location Trigger */}
          <button
            onClick={() => setActiveModal("location")}
            aria-label="Panduan Lokasi & Peta"
            className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-1 text-[#556377] transition-all hover:text-[#2D3748] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <MapPin size={18} className="text-[#556B2F]" />
            <span className="text-[10px] font-medium tracking-wide">Lokasi</span>
          </button>

          {/* 2. Calendar Trigger */}
          <button
            onClick={() => setActiveModal("calendar")}
            aria-label="Simpan Tarikh Majlis"
            className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-1 text-[#556377] transition-all hover:text-[#2D3748] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <Calendar size={18} className="text-[#C5A059]" />
            <span className="text-[10px] font-medium tracking-wide">Kalendar</span>
          </button>

          {/* 3. Primary RSVP Action (Central Highlight with Pill Contour) */}
          <a
            href="#rsvp"
            aria-label="Sahkan Kehadiran RSVP"
            className="-mt-6 flex flex-col items-center justify-center min-w-[56px] min-h-[56px] rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] p-3 font-bold text-white shadow-sm ring-4 ring-[#FAF7F2] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 size={22} className="text-[#FAF7F2]" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#FAF7F2]">
              RSVP
            </span>
          </a>

          {/* 4. WhatsApp Salam Trigger */}
          <button
            onClick={() => setActiveModal("whatsapp")}
            aria-label="Hubungi Wakil Pengantin via WhatsApp"
            className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-1 text-[#556377] transition-all hover:text-[#2D3748] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <MessageCircle size={18} className="text-[#556B2F]" />
            <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Interactive Bottom Sheet Modals with iOS Safe Area Padding */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4 transition-all"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-12 h-1.5 bg-[#E8E2D8] rounded-full mx-auto mb-4 sm:hidden" />
            {/* Accessible 44pt Close Button */}
            <button
              onClick={closeModal}
              aria-label="Tutup Pilihan"
              className="absolute right-3 top-3 flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#FAF7F2] text-[#556377] hover:bg-[#E8E2D8] active:scale-95 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal: Location Actions */}
            {activeModal === "location" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex justify-center">
                  <BotanicalIconBadge size="lg" variant="sage">
                    <MapPin size={24} className="text-[#556B2F]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D3748]">
                    Panduan Arah Majlis
                  </h3>
                  <p className="mt-1 text-xs text-[#556377] line-clamp-2">
                    {event.venueName} — {event.venueAddress}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <a
                    href={event.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#1f8ceb] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#1877cb] transition-colors cursor-pointer"
                  >
                    <Navigation size={16} />
                    <span>Pandu Dengan Waze</span>
                    <ExternalLink size={13} className="opacity-75" />
                  </a>

                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#ea4335] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#d33426] transition-colors cursor-pointer"
                  >
                    <MapPin size={16} />
                    <span>Pandu Dengan Google Maps</span>
                    <ExternalLink size={13} className="opacity-75" />
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check size={15} className="text-[#556B2F]" />
                        <span className="text-[#556B2F]">Alamat Penuh Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="text-[#556B2F]" />
                        <span>Salin Alamat Penuh</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Modal: Calendar Actions */}
            {activeModal === "calendar" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex justify-center">
                  <BotanicalIconBadge size="lg" variant="gold">
                    <Calendar size={24} className="text-[#C5A059]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D3748]">
                    Simpan Tarikh Majlis
                  </h3>
                  <p className="mt-1 text-xs text-[#556377]">
                    {event.dateDisplay} • {event.receptionTime}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <button
                    onClick={handleGoogleCalendar}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#556B2F] to-[#7D8B74] px-4 py-3 text-xs sm:text-sm font-semibold text-[#FAF7F2] shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <CalendarPlus size={16} />
                    <span>Simpan ke Google Calendar</span>
                  </button>

                  <button
                    onClick={handleIcsDownload}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-4 py-3 text-xs sm:text-sm font-semibold text-[#2D3748] hover:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    {downloadedIcs ? (
                      <>
                        <Check size={16} className="text-[#556B2F]" />
                        <span className="text-[#556B2F]">Fail Kalendar Dimuat Turun!</span>
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
            )}

            {/* Modal: WhatsApp Salam Contacts */}
            {activeModal === "whatsapp" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex justify-center">
                  <BotanicalIconBadge size="lg" variant="sage">
                    <MessageCircle size={24} className="text-[#556B2F]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D3748]">
                    WhatsApp Salam &amp; Pertanyaan
                  </h3>
                  <p className="mt-1 text-xs text-[#556377]">
                    Pilih wakil keluarga untuk menghantar ucapan atau pertanyaan:
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-left max-h-60 overflow-y-auto">
                  {contacts.map((contact, idx) => {
                    const rawPhone = cleanPhoneNumber(contact.phone);
                    const defaultMsg = `Salam, tahniah atas perkahwinan ${couple.groom.shortName} & ${couple.bride.shortName}! Saya ingin bertanya berkenaan majlis...`;
                    const waLink = `https://wa.me/${rawPhone}?text=${encodeURIComponent(defaultMsg)}`;

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] hover:border-[#C5A059] transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#2D3748]">
                            {contact.name}
                          </div>
                          <div className="text-[11px] text-[#7D8B74] font-medium">
                            {contact.relation}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${contact.name}`}
                            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <MessageCircle size={16} />
                          </a>
                          <a
                            href={`tel:${contact.phone}`}
                            aria-label={`Hubungi ${contact.name}`}
                            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#E8E2D8] bg-white text-[#556377] hover:border-[#C5A059] transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <Phone size={16} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
