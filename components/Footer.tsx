"use client";

import React from "react";
import Link from "next/link";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralDivider from "@/components/art/FloralDivider";
import { Heart, Lock } from "lucide-react";

export default function Footer() {
  const weddingConfig = useWeddingConfig();
  const { couple, event } = weddingConfig;

  return (
    <footer className="relative overflow-hidden border-t border-gold-400/30 bg-[#091F18] pb-28 pt-16 text-center text-white md:pb-16 select-none">
      {/* Decorative Gold Arch */}
      <div className="absolute left-1/2 top-0 h-1 w-96 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="mx-auto max-w-4xl px-4">
        <h3 className="mb-2 font-serif text-3xl font-bold tracking-tight text-gold-200 sm:text-4xl">
          {couple.groom.shortName} &amp; {couple.bride.shortName}
        </h3>

        <p className="mx-auto mb-4 max-w-lg font-serif text-sm italic text-stone-300 sm:text-base">
          “Semoga Allah memberkati ikatan ini dan menghimpunkan kami berdua dalam kebaikan
          serta kebahagiaan hingga ke syurga.”
        </p>

        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-gold-400 sm:text-sm">
          <span>{event.dateDisplay}</span>
          <span>•</span>
          <span>{event.venueName}</span>
        </div>

        <div className="flex justify-center mb-6">
          <FloralDivider size="sm" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-400 sm:flex-row pt-4 border-t border-white/10">
          <p className="flex items-center justify-center gap-1.5">
            <span>Dihasilkan dengan penuh kasih sayang</span>
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            <span>untuk hari bahagia</span>
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-full border border-gold-400/20 bg-white/5 px-3 py-1.5 text-stone-400 transition-colors hover:border-gold-400/50 hover:bg-white/10 hover:text-gold-300"
          >
            <Lock size={12} />
            <span>Log Masuk Urusetia (Admin)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
