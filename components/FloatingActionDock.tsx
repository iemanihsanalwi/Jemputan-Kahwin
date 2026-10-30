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
      {/* Floating Bottom Action Dock */}
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto select-none">
        <div className="flex items-center justify-around rounded-full border border-[#EAD5D5] bg-white/90 px-4 py-2.5 shadow-rose backdrop-blur-lg">
          {/* 1. Location Trigger */}
          <button
            onClick={() => setActiveModal("location")}
            aria-label="Panduan Lokasi & Peta"
            className="flex flex-col items-center gap-1 text-[#7A555C] transition-colors hover:text-[#C56D7E] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <MapPin size={18} className="text-[#C56D7E]" />
            <span className="text-[10px] font-medium tracking-wide">Lokasi</span>
          </button>

          {/* 2. Calendar Trigger */}
          <button
            onClick={() => setActiveModal("calendar")}
            aria-label="Simpan Tarikh Majlis"
            className="flex flex-col items-center gap-1 text-[#7A555C] transition-colors hover:text-[#C56D7E] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <Calendar size={18} className="text-[#C56D7E]" />
            <span className="text-[10px] font-medium tracking-wide">Kalendar</span>
          </button>

          {/* 3. Primary RSVP Action (Central Highlight with Pill Contour) */}
          <a
            href="#rsvp"
            aria-label="Sahkan Kehadiran RSVP"
            className="-mt-5 flex flex-col items-center justify-center rounded-full border border-[#D4A373]/40 bg-gradient-to-r from-[#D88A96] via-[#C56D7E] to-[#B56576] p-3 font-bold text-white shadow-rose ring-4 ring-[#FFF8F8] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 size={22} className="text-white" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-white">
              RSVP
            </span>
          </a>

          {/* 4. WhatsApp Salam Trigger */}
          <button
            onClick={() => setActiveModal("whatsapp")}
            aria-label="Hubungi Wakil Pengantin via WhatsApp"
            className="flex flex-col items-center gap-1 text-[#7A555C] transition-colors hover:text-[#C56D7E] active:scale-95 px-2 py-1 cursor-pointer"
          >
            <MessageCircle size={18} className="text-[#C56D7E]" />
            <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Interactive Bottom Sheet Modals */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs p-4 transition-all"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-[#EAD5D5] bg-white/95 backdrop-blur-md p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-12 h-1.5 bg-[#EAD5D5] rounded-full mx-auto mb-4 sm:hidden" />
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Tutup Pilihan"
              className="absolute right-4 top-4 rounded-full bg-[#FFF8F8] p-1.5 text-[#7A555C] hover:bg-[#FDE8EC] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal: Location Actions */}
            {activeModal === "location" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex justify-center">
                  <BotanicalIconBadge size="lg" variant="rose">
                    <MapPin size={24} className="text-[#C56D7E]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D2429]">
                    Panduan Arah Majlis
                  </h3>
                  <p className="mt-1 text-xs text-[#7A555C] line-clamp-2">
                    {event.venueName} — {event.venueAddress}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <a
                    href={event.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#1f8ceb] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1877cb] transition-colors cursor-pointer"
                  >
                    <Navigation size={16} />
                    <span>Pandu Dengan Waze</span>
                    <ExternalLink size={13} className="opacity-75" />
                  </a>

                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#ea4335] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#d33426] transition-colors cursor-pointer"
                  >
                    <MapPin size={16} />
                    <span>Pandu Dengan Google Maps</span>
                    <ExternalLink size={13} className="opacity-75" />
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#EAD5D5] bg-[#FFF8F8] px-4 py-2.5 text-xs font-semibold text-[#4A2E35] hover:border-[#D88A96] hover:bg-[#FDE8EC] transition-colors cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check size={15} className="text-[#C56D7E]" />
                        <span className="text-[#C56D7E]">Alamat Penuh Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="text-[#C56D7E]" />
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
                  <BotanicalIconBadge size="lg" variant="rose">
                    <Calendar size={24} className="text-[#C56D7E]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D2429]">
                    Simpan Tarikh Majlis
                  </h3>
                  <p className="mt-1 text-xs text-[#7A555C]">
                    {event.dateDisplay} • {event.receptionTime}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <button
                    onClick={handleGoogleCalendar}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-rose hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <CalendarPlus size={16} />
                    <span>Simpan ke Google Calendar</span>
                  </button>

                  <button
                    onClick={handleIcsDownload}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#EAD5D5] bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-[#4A2E35] hover:border-[#D88A96] hover:bg-[#FFF8F8] transition-colors cursor-pointer"
                  >
                    {downloadedIcs ? (
                      <>
                        <Check size={16} className="text-[#C56D7E]" />
                        <span className="text-[#C56D7E]">Fail Kalendar Dimuat Turun!</span>
                      </>
                    ) : (
                      <>
                        <Calendar size={16} className="text-[#C56D7E]" />
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
                  <BotanicalIconBadge size="lg" variant="rose">
                    <MessageCircle size={24} className="text-[#C56D7E]" />
                  </BotanicalIconBadge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D2429]">
                    WhatsApp Salam &amp; Pertanyaan
                  </h3>
                  <p className="mt-1 text-xs text-[#7A555C]">
                    Pilih wakil keluarga untuk menghantar ucapan atau pertanyaan:
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-left max-h-60 overflow-y-auto">
                  {contacts.map((contact, idx) => {
                    const rawPhone = cleanPhoneNumber(contact.phone);
                    const defaultMsg = `Salam, tahniah atas perkahwinan ${couple.groom.shortName} & ${couple.bride.shortName}! Saya ingin bertanya berkenaan majlis...`;
                    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                      contact.whatsappMessage || defaultMsg
                    )}`;

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-3 hover:border-[#D88A96] transition-colors"
                      >
                        <div>
                          <p className="font-serif text-xs font-bold text-[#3D2429]">
                            {contact.name}
                          </p>
                          <span className="text-[10px] text-[#B56576] font-medium">
                            {contact.relation}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-3 py-1.5 text-[11px] font-semibold text-white shadow-xs hover:opacity-95 transition-opacity"
                          >
                            <MessageCircle size={13} />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${rawPhone}`}
                            className="flex items-center rounded-full border border-[#EAD5D5] bg-white p-1.5 text-[#7A555C] hover:text-[#C56D7E]"
                            title="Panggilan Telefon"
                          >
                            <Phone size={13} />
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
