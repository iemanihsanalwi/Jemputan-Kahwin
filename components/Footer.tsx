"use client";

import React from "react";
import Link from "next/link";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import { Heart, Lock } from "lucide-react";

export default function Footer() {
  const weddingConfig = useWeddingConfig();
  const { couple, event } = weddingConfig;

  return (
    <footer className="relative overflow-hidden border-t border-[#E8E2D8] bg-[#FAF7F2] pb-[max(7.5rem,calc(env(safe-area-inset-bottom)+7rem))] pt-12 text-center text-[#2D3748] md:pb-20 select-none">
      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <h3 className="mb-2 font-serif text-3xl font-bold tracking-tight text-[#2D3748] sm:text-4xl">
          {couple.groom.shortName} &amp; {couple.bride.shortName}
        </h3>

        <p className="mx-auto mb-4 max-w-lg font-serif text-sm italic text-[#556377] sm:text-base">
          “Semoga Allah memberkati ikatan ini dan menghimpunkan kami berdua dalam kebaikan
          serta kebahagiaan hingga ke syurga.”
        </p>

        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-[#7D8B74] sm:text-sm">
          <span>{event.dateDisplay}</span>
          <span>•</span>
          <span>{event.venueName}</span>
        </div>

        <div className="flex justify-center mb-6">
          <FloralSectionDivider size="sm" variant="gold" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#718096] sm:flex-row pt-6 border-t border-[#E8E2D8]">
          <p className="flex items-center justify-center gap-1.5">
            <span>Dihasilkan dengan penuh kesyukuran</span>
            <Heart size={14} className="fill-[#C5A059] text-[#C5A059]" />
            <span>untuk hari bahagia</span>
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-full border border-[#E8E2D8] bg-white px-4 py-1.5 text-[#556377] transition-colors hover:border-[#C5A059] hover:text-[#2D3748] shadow-xs"
          >
            <Lock size={12} />
            <span>Log Masuk Urusetia (Admin)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
