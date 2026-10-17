import React from "react";
import Link from "next/link";
import { weddingConfig } from "@/config/wedding";
import { Heart, Lock } from "lucide-react";

export default function Footer() {
  const { couple, event } = weddingConfig;

  return (
    <footer className="relative overflow-hidden border-t border-gold-400/30 bg-emerald-950 pb-24 pt-16 text-center text-white md:pb-12">
      {/* Decorative Gold Arch */}
      <div className="absolute left-1/2 top-0 h-1 w-96 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="mx-auto max-w-4xl px-4">
        <h3 className="mb-2 font-serif text-3xl font-bold tracking-tight text-gold-200 sm:text-4xl">
          {couple.groom.shortName} & {couple.bride.shortName}
        </h3>

        <p className="mx-auto mb-6 max-w-lg font-serif text-sm italic text-stone-300 sm:text-base">
          “Semoga Allah memberkati ikatan ini dan menghimpunkan kami berdua dalam kebaikan
          serta kebahagiaan hingga ke syurga.”
        </p>

        <div className="mb-8 flex items-center justify-center gap-2 text-xs font-medium text-gold-400 sm:text-sm">
          <span>{event.dateDisplay}</span>
          <span>•</span>
          <span>{event.venueName}</span>
        </div>

        <div className="mx-auto mb-8 h-px w-32 bg-gold-400/30" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-400 sm:flex-row">
          <p className="flex items-center justify-center gap-1.5">
            <span>Dihasilkan dengan penuh kasih sayang</span>
            <Heart size={14} className="fill-rose-500 text-rose-500" />
            <span>untuk hari bahagia</span>
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-stone-400 transition-colors hover:border-gold-400/30 hover:bg-white/5 hover:text-gold-300"
          >
            <Lock size={12} />
            <span>Log Masuk Urusetia (Admin)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
