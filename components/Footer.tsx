"use client";

import React from "react";
import Link from "next/link";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import GardenBedDivider from "@/components/art/GardenBedDivider";
import { Heart, Lock } from "lucide-react";

export default function Footer() {
  const weddingConfig = useWeddingConfig();
  const { couple, event } = weddingConfig;

  return (
    <footer className="relative overflow-hidden border-t-2 border-[#D4A373]/30 bg-[#3D2429] pb-28 pt-10 text-center text-white md:pb-16 select-none">
      {/* Decorative Garden Hanging Canopy at top of footer */}
      <div className="w-full mb-6 opacity-70">
        <GardenBedDivider variant="canopy" />
      </div>

      <div className="mx-auto max-w-4xl px-4 relative z-10">
        <h3 className="mb-2 font-serif text-3xl font-bold tracking-tight text-[#D4A373] sm:text-4xl">
          {couple.groom.shortName} &amp; {couple.bride.shortName}
        </h3>

        <p className="mx-auto mb-4 max-w-lg font-serif text-sm italic text-[#FFF8F8]/90 sm:text-base">
          “Semoga Allah memberkati ikatan ini dan menghimpunkan kami berdua dalam kebaikan
          serta kebahagiaan hingga ke syurga.”
        </p>

        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-[#FADBD8]/90 sm:text-sm">
          <span>{event.dateDisplay}</span>
          <span>•</span>
          <span>{event.venueName}</span>
        </div>

        <div className="flex justify-center mb-6">
          <FloralSectionDivider size="sm" variant="rose" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#FADBD8]/70 sm:flex-row pt-4 border-t border-white/10">
          <p className="flex items-center justify-center gap-1.5">
            <span>Dihasilkan dengan penuh kasih sayang</span>
            <Heart size={14} className="fill-[#D88A96] text-[#D88A96]" />
            <span>untuk hari bahagia</span>
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-full border border-[#D4A373]/30 bg-white/5 px-4 py-1.5 text-[#FADBD8]/80 transition-colors hover:border-[#D4A373]/60 hover:bg-white/10 hover:text-[#FFF8F8]"
          >
            <Lock size={12} />
            <span>Log Masuk Urusetia (Admin)</span>
          </Link>
        </div>
      </div>

      {/* Lush Meadow Base Grounding the Footer Viewport */}
      <div className="w-full mt-10 -mb-28 md:-mb-16 opacity-85">
        <GardenBedDivider variant="footer" />
      </div>
    </footer>
  );
}
