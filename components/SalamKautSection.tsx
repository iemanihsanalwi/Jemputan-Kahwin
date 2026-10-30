"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import SectionHeader from "@/components/SectionHeader";
import { CreditCard, Copy, Check, QrCode } from "lucide-react";

/**
 * Pure SVG DuitNow QR Code Component
 * Stylized vector representation of the standard Malaysian DuitNow QR code with rose-gold touches
 */
function DuitNowVectorQr({ accountName }: { accountName: string }) {
  const idPrefix = React.useId().replace(/:/g, "");

  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-white via-[#FFF8F8] to-white border-2 border-[#D4A373]/50 shadow-rose overflow-hidden">
      {/* Pressed Flower Corner Accents on QR Card */}
      <svg viewBox="0 0 24 24" className="absolute top-1.5 left-1.5 w-4 h-4 text-[#D4A373] pointer-events-none opacity-75" aria-hidden="true">
        <path d="M 0 0 C 8 2, 10 10, 10 16 C 6 10, 2 8, 0 0 Z" fill="#D88A96" />
        <circle cx="3" cy="3" r="2" fill="#D4A373" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute top-1.5 right-1.5 w-4 h-4 text-[#D4A373] pointer-events-none opacity-75 rotate-90" aria-hidden="true">
        <path d="M 0 0 C 8 2, 10 10, 10 16 C 6 10, 2 8, 0 0 Z" fill="#D88A96" />
        <circle cx="3" cy="3" r="2" fill="#D4A373" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute bottom-1.5 left-1.5 w-4 h-4 text-[#D4A373] pointer-events-none opacity-75 -rotate-90" aria-hidden="true">
        <path d="M 0 0 C 8 2, 10 10, 10 16 C 6 10, 2 8, 0 0 Z" fill="#D88A96" />
        <circle cx="3" cy="3" r="2" fill="#D4A373" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute bottom-1.5 right-1.5 w-4 h-4 text-[#D4A373] pointer-events-none opacity-75 rotate-180" aria-hidden="true">
        <path d="M 0 0 C 8 2, 10 10, 10 16 C 6 10, 2 8, 0 0 Z" fill="#D88A96" />
        <circle cx="3" cy="3" r="2" fill="#D4A373" />
      </svg>

      {/* Top DuitNow Banner in SVG */}
      <div className="w-full flex items-center justify-center py-1.5 px-3 mb-2.5 rounded-full bg-[#ED1C24] text-white shadow-xs">
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

          {/* Center Botanical Floral Emblem (Rose & Mulberry Tones) */}
          <circle cx="80" cy="80" r="12" fill="#D4A373" />
          <circle cx="80" cy="80" r="9" fill="#4A2E35" />
          <circle cx="80" cy="80" r="4" fill="#FFF8F8" />

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

      <span className="mt-2 text-[10px] font-mono font-medium text-[#7A555C] uppercase tracking-wider">
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
      {/* Centered Section Header */}
      <SectionHeader
        eyebrow="HADIAH IKHLAS"
        title="Salam Kaut Digital"
        subtitle={
          salamKaut.instructionText ||
          "Bagi tetamu yang berhajat menitipkan ingatan tulus dan hadiah ikhlas secara digital, anda boleh menyalurkannya melalui DuitNow QR atau pindahan akaun bank berikut."
        }
        className="mb-14"
      />

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#EAD5D5] bg-white/85 p-6 text-center shadow-sm backdrop-blur-md sm:p-10 hover:shadow-rose transition-all">
        <BotanicalCornerFlourish position="all" size={42} variant="rose" />

        {/* Decorative Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#D88A96] to-[#C56D7E]" />

        <div className="mb-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
          {/* Pure SVG DuitNow QR Code */}
          <div className="flex flex-col items-center">
            <DuitNowVectorQr accountName={salamKaut.accountName} />
            <span className="mt-2.5 text-[11px] text-[#7A555C] font-medium flex items-center gap-1">
              <QrCode size={13} className="text-[#C56D7E]" />
              <span>Imbas menggunakan mana-mana aplikasi perbankan</span>
            </span>
          </div>

          {/* Account Details Box with Botanical Enclosures */}
          <div className="w-full space-y-4 text-left sm:max-w-xs">
            <div className="relative overflow-hidden rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 shadow-xs">
              <svg viewBox="0 0 16 16" className="absolute top-1 right-1 w-3.5 h-3.5 text-[#D4A373] opacity-60 pointer-events-none" aria-hidden="true">
                <path d="M 0 0 C 6 2, 8 8, 8 12 C 4 8, 2 6, 0 0 Z" fill="#D88A96" />
                <circle cx="2" cy="2" r="1.2" fill="#D4A373" />
              </svg>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#B56576]">
                Nama Bank
              </span>
              <p className="flex items-center gap-2 text-sm font-semibold text-[#3D2429] sm:text-base">
                <CreditCard size={18} className="flex-shrink-0 text-[#C56D7E]" />
                <span>{salamKaut.bankName}</span>
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 shadow-xs">
              <svg viewBox="0 0 16 16" className="absolute top-1 right-1 w-3.5 h-3.5 text-[#D4A373] opacity-60 pointer-events-none" aria-hidden="true">
                <path d="M 0 0 C 6 2, 8 8, 8 12 C 4 8, 2 6, 0 0 Z" fill="#D88A96" />
                <circle cx="2" cy="2" r="1.2" fill="#D4A373" />
              </svg>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#B56576]">
                Nama Pemegang Akaun
              </span>
              <p className="text-sm font-semibold text-[#3D2429] sm:text-base">
                {salamKaut.accountName}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 shadow-xs">
              <svg viewBox="0 0 16 16" className="absolute top-1 right-1 w-3.5 h-3.5 text-[#D4A373] opacity-60 pointer-events-none" aria-hidden="true">
                <path d="M 0 0 C 6 2, 8 8, 8 12 C 4 8, 2 6, 0 0 Z" fill="#D88A96" />
                <circle cx="2" cy="2" r="1.2" fill="#D4A373" />
              </svg>
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#B56576]">
                Nombor Akaun
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-base font-bold tracking-wider text-[#3D2429] sm:text-lg">
                  {salamKaut.accountNumber}
                </span>

                <button
                  onClick={handleCopy}
                  aria-label="Salin nombor akaun bank"
                  className="rounded-full border border-[#EAD5D5] bg-white p-2.5 text-[#B56576] transition-colors hover:border-[#D88A96] hover:bg-[#FDE8EC] hover:text-[#3D2429] focus:outline-none focus:ring-2 focus:ring-[#D88A96] active:scale-95 shadow-xs cursor-pointer"
                >
                  {copied ? (
                    <Check size={16} className="text-[#C56D7E]" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {copied && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#C56D7E]"
                >
                  <Check size={12} />
                  <span>Nombor akaun berjaya disalin!</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-md text-[11px] italic text-[#7A555C] sm:text-xs">
          Semoga setiap kebaikan dan keikhlasan anda dibalas dengan ganjaran rezeki yang
          berlipat kali ganda. Jazakumullah Khairan Kathira.
        </p>
      </div>
    </section>
  );
}
