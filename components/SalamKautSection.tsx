"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import { CreditCard, Copy, Check, QrCode } from "lucide-react";

/**
 * Pure SVG DuitNow QR Code Component
 * Stylized vector representation of the standard Malaysian DuitNow QR code with botanical touches
 */
function DuitNowVectorQr({ accountName }: { accountName: string }) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className="relative flex flex-col items-center justify-center p-3.5 rounded-3xl bg-white border-2 border-gold-300 shadow-md">
      {/* Top DuitNow Banner in SVG */}
      <div className="w-full flex items-center justify-center py-1.5 px-3 mb-2.5 rounded-full bg-[#ED1C24] text-white">
        <span className="font-sans font-bold text-xs tracking-wider">DuitNow</span>
        <span className="text-[10px] ml-1.5 opacity-90 font-medium">QR</span>
      </div>

      <svg
        viewBox="0 0 160 160"
        className="w-40 h-40 sm:w-44 sm:h-44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${idPrefix}-qrDark`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C1917" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
        </defs>

        {/* QR Position Squares (Top-Left, Top-Right, Bottom-Left) */}
        {/* Top-Left */}
        <rect x="10" y="10" width="40" height="40" rx="6" fill="#1C1917" />
        <rect x="18" y="18" width="24" height="24" rx="3" fill="#FFFFFF" />
        <rect x="24" y="24" width="12" height="12" rx="2" fill="#ED1C24" />

        {/* Top-Right */}
        <rect x="110" y="10" width="40" height="40" rx="6" fill="#1C1917" />
        <rect x="118" y="18" width="24" height="24" rx="3" fill="#FFFFFF" />
        <rect x="124" y="24" width="12" height="12" rx="2" fill="#ED1C24" />

        {/* Bottom-Left */}
        <rect x="10" y="110" width="40" height="40" rx="6" fill="#1C1917" />
        <rect x="18" y="118" width="24" height="24" rx="3" fill="#FFFFFF" />
        <rect x="24" y="124" width="12" height="12" rx="2" fill="#ED1C24" />

        {/* Decorative Grid Pattern Data Cells */}
        <g fill={`url(#${idPrefix}-qrDark)`}>
          {/* Timing Patterns */}
          <rect x="56" y="16" width="6" height="6" rx="1" />
          <rect x="68" y="16" width="6" height="6" rx="1" />
          <rect x="80" y="16" width="6" height="6" rx="1" />
          <rect x="92" y="16" width="6" height="6" rx="1" />

          <rect x="16" y="56" width="6" height="6" rx="1" />
          <rect x="16" y="68" width="6" height="6" rx="1" />
          <rect x="16" y="80" width="6" height="6" rx="1" />
          <rect x="16" y="92" width="6" height="6" rx="1" />

          {/* Random Seeded QR Modules */}
          <rect x="56" y="32" width="12" height="6" rx="1" />
          <rect x="74" y="32" width="6" height="12" rx="1" />
          <rect x="86" y="32" width="12" height="6" rx="1" />

          <rect x="36" y="56" width="12" height="6" rx="1" />
          <rect x="56" y="56" width="6" height="12" rx="1" />
          <rect x="68" y="56" width="12" height="6" rx="1" />
          <rect x="86" y="56" width="6" height="12" rx="1" />
          <rect x="98" y="56" width="12" height="6" rx="1" />
          <rect x="116" y="56" width="6" height="12" rx="1" />
          <rect x="128" y="56" width="12" height="6" rx="1" />

          {/* Center Botanical Floral Emblem */}
          <circle cx="80" cy="80" r="12" fill="#C5A059" />
          <circle cx="80" cy="80" r="9" fill="#2D5A43" />
          <circle cx="80" cy="80" r="4" fill="#FAF7EE" />

          {/* Lower Quadrant Modules */}
          <rect x="36" y="80" width="8" height="8" rx="1" />
          <rect x="56" y="80" width="8" height="8" rx="1" />
          <rect x="96" y="80" width="8" height="8" rx="1" />
          <rect x="110" y="80" width="14" height="6" rx="1" />
          <rect x="130" y="80" width="12" height="8" rx="1" />

          <rect x="56" y="96" width="14" height="6" rx="1" />
          <rect x="76" y="96" width="8" height="8" rx="1" />
          <rect x="96" y="96" width="12" height="6" rx="1" />
          <rect x="114" y="96" width="8" height="12" rx="1" />
          <rect x="128" y="96" width="14" height="6" rx="1" />

          <rect x="56" y="116" width="12" height="8" rx="1" />
          <rect x="74" y="116" width="14" height="6" rx="1" />
          <rect x="94" y="116" width="8" height="12" rx="1" />
          <rect x="108" y="116" width="12" height="6" rx="1" />
          <rect x="126" y="116" width="14" height="8" rx="1" />

          <rect x="56" y="132" width="16" height="8" rx="1" />
          <rect x="78" y="132" width="10" height="8" rx="1" />
          <rect x="94" y="132" width="14" height="8" rx="1" />
          <rect x="114" y="132" width="8" height="8" rx="1" />
          <rect x="128" y="132" width="14" height="8" rx="1" />
        </g>
      </svg>

      <span className="mt-2 text-[10px] font-mono font-medium text-olive-600 uppercase tracking-wider">
        {accountName}
      </span>
    </div>
  );
}

export default function SalamKautSection() {
  const weddingConfig = useWeddingConfig();
  const { salamKaut } = weddingConfig;
  const [copied, setCopied] = useState(false);

  if (salamKaut.enabled === false) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(salamKaut.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="salam-kaut" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Hadiah Ikhlas
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-sage-950 sm:text-4xl md:text-5xl">
          Salam Kaut Digital
        </h2>
        <FloralSectionDivider size="md" />
        <p className="mx-auto max-w-md text-xs leading-relaxed text-olive-600 sm:text-sm">
          {salamKaut.instructionText ||
            "Bagi tetamu yang berhajat menitipkan ingatan tulus dan hadiah ikhlas secara digital, anda boleh menyalurkannya melalui DuitNow QR atau pindahan akaun bank berikut."}
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border-2 border-gold-300/80 bg-white/95 p-6 text-center shadow-gold backdrop-blur-md sm:p-10">
        <BotanicalCornerFlourish position="all" size={42} variant="gold" />

        {/* Decorative Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-blush-300" />

        <div className="mb-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
          {/* Pure SVG DuitNow QR Code */}
          <div className="flex flex-col items-center">
            <DuitNowVectorQr accountName={salamKaut.accountName} />
            <span className="mt-2.5 text-[11px] text-olive-500 font-medium flex items-center gap-1">
              <QrCode size={13} className="text-gold-600" />
              <span>Imbas menggunakan mana-mana aplikasi perbankan</span>
            </span>
          </div>

          {/* Account Details Box */}
          <div className="w-full space-y-4 text-left sm:max-w-xs">
            <div className="rounded-2xl border border-gold-200/70 bg-cream-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-olive-400">
                Nama Bank
              </span>
              <p className="flex items-center gap-2 text-sm font-semibold text-stone-900 sm:text-base">
                <CreditCard size={18} className="flex-shrink-0 text-gold-600" />
                <span>{salamKaut.bankName}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-gold-200/70 bg-cream-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-olive-400">
                Nama Pemegang Akaun
              </span>
              <p className="text-sm font-semibold text-stone-900 sm:text-base">
                {salamKaut.accountName}
              </p>
            </div>

            <div className="rounded-2xl border border-gold-200/70 bg-cream-50/80 p-4">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-olive-400">
                Nombor Akaun
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-base font-bold tracking-wider text-sage-950 sm:text-lg">
                  {salamKaut.accountNumber}
                </span>

                <button
                  onClick={handleCopy}
                  aria-label="Salin nombor akaun bank"
                  className="rounded-full border-2 border-gold-300 bg-white p-2.5 text-gold-800 transition-colors hover:border-gold-400 hover:bg-gold-50 focus:outline-none focus:ring-2 focus:ring-gold-500 active:scale-95 shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <Check size={16} className="text-sage-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {copied && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-1.5 flex items-center gap-1 text-xs font-medium text-sage-700"
                >
                  <Check size={12} />
                  <span>Nombor akaun berjaya disalin!</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-md text-[11px] italic text-olive-600 sm:text-xs">
          Semoga setiap kebaikan dan keikhlasan anda dibalas dengan ganjaran rezeki yang
          berlipat kali ganda. Jazakumullah Khairan Kathira.
        </p>
      </div>
    </section>
  );
}
