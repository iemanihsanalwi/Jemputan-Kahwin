"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { cleanPhoneNumber, createGoogleCalendarUrl, downloadIcsFile } from "@/lib/utils";
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
        <div className="flex items-center justify-around rounded-full border border-gold-400/40 bg-emerald-950/95 px-4 py-2.5 shadow-2xl backdrop-blur-lg">
          {/* 1. Location Trigger */}
          <button
            onClick={() => setActiveModal("location")}
            aria-label="Panduan Lokasi & Peta"
            className="flex flex-col items-center gap-1 text-stone-300 transition-colors hover:text-gold-300 active:scale-95 px-2 py-1"
          >
            <MapPin size={18} className="text-gold-400" />
            <span className="text-[10px] font-medium tracking-wide">Lokasi</span>
          </button>

          {/* 2. Calendar Trigger */}
          <button
            onClick={() => setActiveModal("calendar")}
            aria-label="Simpan Tarikh Majlis"
            className="flex flex-col items-center gap-1 text-stone-300 transition-colors hover:text-gold-300 active:scale-95 px-2 py-1"
          >
            <Calendar size={18} className="text-gold-400" />
            <span className="text-[10px] font-medium tracking-wide">Kalendar</span>
          </button>

          {/* 3. Primary RSVP Action (Central Highlight) */}
          <a
            href="#rsvp"
            aria-label="Sahkan Kehadiran RSVP"
            className="-mt-5 flex flex-col items-center justify-center rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 p-3 font-bold text-white shadow-gold-glow ring-4 ring-emerald-950 transition-transform hover:scale-105 active:scale-95"
          >
            <CheckCircle2 size={22} className="text-emerald-950" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-950">
              RSVP
            </span>
          </a>

          {/* 4. WhatsApp Salam Trigger */}
          <button
            onClick={() => setActiveModal("whatsapp")}
            aria-label="Hubungi Wakil Pengantin via WhatsApp"
            className="flex flex-col items-center gap-1 text-stone-300 transition-colors hover:text-gold-300 active:scale-95 px-2 py-1"
          >
            <MessageCircle size={18} className="text-gold-400" />
            <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Interactive Bottom Sheet Modals */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-gold-300/60 bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-4 sm:hidden" />
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Tutup Pilihan"
              className="absolute right-4 top-4 rounded-full bg-stone-100 p-1.5 text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal: Location Actions */}
            {activeModal === "location" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    Panduan Arah Majlis
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2">
                    {event.venueName} — {event.venueAddress}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <a
                    href={event.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#1f8ceb] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1877cb] transition-colors"
                  >
                    <Navigation size={16} />
                    <span>Pandu Dengan Waze</span>
                    <ExternalLink size={13} className="opacity-70" />
                  </a>

                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#ea4335] px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#d33426] transition-colors"
                  >
                    <MapPin size={16} />
                    <span>Pandu Dengan Google Maps</span>
                    <ExternalLink size={13} className="opacity-70" />
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gold-300 bg-champagne-50 px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-gold-100 transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <Check size={15} className="text-emerald-600" />
                        <span className="text-emerald-700">Alamat Penuh Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} className="text-gold-700" />
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    Simpan Tarikh Majlis
                  </h3>
                  <p className="mt-1 text-xs text-stone-600">
                    {event.dateDisplay} • {event.receptionTime}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  <button
                    onClick={handleGoogleCalendar}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-850 transition-colors"
                  >
                    <CalendarPlus size={16} />
                    <span>Simpan ke Google Calendar</span>
                  </button>

                  <button
                    onClick={handleIcsDownload}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gold-300 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-stone-800 hover:bg-gold-50 transition-colors"
                  >
                    {downloadedIcs ? (
                      <>
                        <Check size={16} className="text-emerald-600" />
                        <span className="text-emerald-700">Fail Kalendar Dimuat Turun!</span>
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
            )}

            {/* Modal: WhatsApp Salam Contacts */}
            {activeModal === "whatsapp" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    WhatsApp Salam & Pertanyaan
                  </h3>
                  <p className="mt-1 text-xs text-stone-600">
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
                        className="flex items-center justify-between rounded-xl border border-gold-200/80 bg-champagne-50/70 p-3 hover:border-gold-400 transition-colors"
                      >
                        <div>
                          <p className="font-serif text-xs font-bold text-emerald-950">
                            {contact.name}
                          </p>
                          <span className="text-[10px] text-gold-700 font-medium">
                            {contact.relation}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                          >
                            <MessageCircle size={13} />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${rawPhone}`}
                            className="flex items-center rounded-lg border border-stone-200 bg-white p-1.5 text-stone-600 hover:text-emerald-700"
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

