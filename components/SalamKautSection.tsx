"use client";

import React, { useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { CreditCard, Copy, Check, Download, HeartHandshake } from "lucide-react";

export default function SalamKautSection() {
  const { salamKaut } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(salamKaut.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    // Open or download QR code image
    const link = document.createElement("a");
    link.href = salamKaut.qrCodeUrl;
    link.target = "_blank";
    link.download = `QR-Salam-Kaut-${salamKaut.accountName.replace(/\s+/g, "-")}.png`;
    link.click();
  };

  return (
    <section id="salam-kaut" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Hadiah Ikhlas
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Salam Kaut Digital
        </h2>
        <div className="mb-4 flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <HeartHandshake size={16} className="text-gold-500" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
        <p className="mx-auto max-w-md text-xs leading-relaxed text-stone-600 sm:text-sm">
          {salamKaut.instructionText ||
            "Bagi tetamu yang berhajat menitipkan ingatan tulus dan hadiah ikhlas secara digital, anda boleh menyalurkannya melalui DuitNow QR atau pindahan akaun bank berikut."}
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-gold-300/80 bg-white/95 p-6 text-center shadow-gold backdrop-blur-md sm:p-10">
        {/* Decorative Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

        <div className="mb-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
          {/* QR Code Container */}
          <div className="flex flex-col items-center">
            <div className="group relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-gold-200 bg-white p-3 shadow-sm sm:h-56 sm:w-56">
              <Image
                src={salamKaut.qrCodeUrl}
                alt="DuitNow QR Kod"
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 192px, 224px"
              />
            </div>

            <button
              onClick={handleDownloadQr}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gold-800 underline underline-offset-4 transition-colors hover:text-gold-900"
            >
              <Download size={13} />
              <span>Muat Turun Kod QR</span>
            </button>
          </div>

          {/* Account Details Box */}
          <div className="w-full space-y-4 text-left sm:max-w-xs">
            <div className="rounded-2xl border border-gold-200/70 bg-champagne-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Nama Bank
              </span>
              <p className="flex items-center gap-2 text-sm font-semibold text-stone-900 sm:text-base">
                <CreditCard size={18} className="flex-shrink-0 text-gold-600" />
                <span>{salamKaut.bankName}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-gold-200/70 bg-champagne-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Nama Pemegang Akaun
              </span>
              <p className="text-sm font-semibold text-stone-900 sm:text-base">
                {salamKaut.accountName}
              </p>
            </div>

            <div className="rounded-2xl border border-gold-200/70 bg-champagne-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Nombor Akaun
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-base font-bold tracking-wider text-emerald-950 sm:text-lg">
                  {salamKaut.accountNumber}
                </span>

                <button
                  onClick={handleCopy}
                  aria-label="Salin nombor akaun"
                  className="rounded-lg border border-gold-300 bg-white p-2 text-gold-800 transition-colors hover:bg-gold-50 active:scale-95"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {copied && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <Check size={12} />
                  <span>Nombor akaun berjaya disalin!</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-md text-[11px] italic text-stone-500 sm:text-xs">
          Semoga setiap kebaikan dan keikhlasan anda dibalas dengan ganjaran rezeki yang
          berlipat kali ganda. Jazakumullah Khairan Kathira.
        </p>
      </div>
    </section>
  );
}
