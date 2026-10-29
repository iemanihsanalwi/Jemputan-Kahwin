"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralWreathHeader from "@/components/art/FloralWreathHeader";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import { Instagram } from "lucide-react";

export default function BrideGroom() {
  const weddingConfig = useWeddingConfig();
  const { groom, bride } = weddingConfig.couple;
  const { quote, blessings } = weddingConfig;
  const [activeTab, setActiveTab] = useState<number>(0);

  const doaItems = [
    {
      label: "Surah Ar-Rum (30:21)",
      arabic: quote.arabic,
      translation: quote.translationMalay,
      source: quote.source,
    },
    {
      label: "Doa Mempelai (Hadis)",
      arabic:
        blessings?.[0]?.arabic ||
        "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
      translation:
        blessings?.[0]?.translation ||
        "“Semoga Allah memberkati kamu dan melimpahkan keberkatan ke atasmu, serta menghimpunkan kamu berdua dalam kebaikan.”",
      source: blessings?.[0]?.source || "Hadis Riwayat Abu Daud & Tirmizi",
    },
    {
      label: "Doa Penyejuk Hati",
      arabic:
        blessings?.[1]?.arabic ||
        "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      translation:
        blessings?.[1]?.translation ||
        "“Wahai Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan kami dan keturunan kami sebagai penyejuk hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.”",
      source: blessings?.[1]?.source || "Surah Al-Furqan : Ayat 74",
    },
  ];

  const currentItem = doaItems[activeTab] || doaItems[0];

  return (
    <section id="mempelai" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Doa Pengantin & Quranic Verse Calligraphy Card with Botanical Corner Flourishes */}
      <div className="relative mx-auto mb-20 max-w-3xl overflow-hidden rounded-3xl border-2 border-gold-300/90 ring-1 ring-gold-200/60 bg-gradient-to-b from-white via-cream-50/70 to-white p-6 text-center shadow-gold backdrop-blur-md sm:p-10">
        <BotanicalCornerFlourish position="all" size={44} variant="gold" />
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        {/* Tab Selector for Doa & Verse (Rounded Pills) */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-2">
          {doaItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === idx
                  ? "bg-sage-800 text-gold-300 shadow-sm border border-gold-400/60"
                  : "bg-white/85 text-olive-700 hover:bg-gold-50 hover:text-stone-900 border border-gold-200/60"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative z-10 transition-all duration-300">
          <p className="dir-rtl mb-4 font-arabic text-xl leading-loose text-sage-950 sm:text-2xl md:text-3xl">
            {currentItem.arabic}
          </p>

          <p className="mb-3 font-serif text-xs sm:text-sm italic leading-relaxed text-olive-700 max-w-xl mx-auto">
            {currentItem.translation}
          </p>

          <FloralSectionDivider size="sm" className="my-3" />

          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gold-800">
            — {currentItem.source} —
          </span>
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Raja Sehari
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-sage-950 sm:text-4xl md:text-5xl">
          Pasangan Mempelai
        </h2>
        <FloralSectionDivider size="md" />
      </div>

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-14">
        {/* Groom Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-gold-200/90 bg-white/95 p-6 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:shadow-gold sm:p-8">
          <BotanicalCornerFlourish position="all" size={38} variant="gold" />

          {/* Floral Wreath Monogram Medallion */}
          <div className="relative mb-6">
            <FloralWreathHeader
              initials={groom.shortName.charAt(0)}
              subtitle="PENGANTIN LELAKI"
              size="lg"
              variant="groom"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-sage-200 bg-sage-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sage-900">
            {groom.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-sage-950 sm:text-3xl">
            {groom.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-gold-700 sm:text-sm">
            {groom.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-gold-200/60 bg-cream-50/80 p-3 text-xs text-olive-800 sm:text-sm">
            <p className="font-semibold text-stone-900">{groom.fatherName}</p>
            <p className="my-0.5 text-gold-600 font-serif italic">&amp;</p>
            <p className="font-semibold text-stone-900">{groom.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-olive-600 sm:text-sm">
            &ldquo;{groom.bio}&rdquo;
          </p>

          {groom.instagram && (
            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-olive-400 transition-colors hover:text-gold-600"
            >
              <Instagram size={15} />
              <span>@{groom.shortName.toLowerCase()}</span>
            </a>
          )}
        </div>

        {/* Bride Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-gold-200/90 bg-white/95 p-6 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:shadow-gold sm:p-8">
          <BotanicalCornerFlourish position="all" size={38} variant="gold" />

          {/* Floral Wreath Monogram Medallion */}
          <div className="relative mb-6">
            <FloralWreathHeader
              initials={bride.shortName.charAt(0)}
              subtitle="PENGANTIN PEREMPUAN"
              size="lg"
              variant="bride"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-blush-200 bg-blush-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blush-800">
            {bride.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-sage-950 sm:text-3xl">
            {bride.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-gold-700 sm:text-sm">
            {bride.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-gold-200/60 bg-cream-50/80 p-3 text-xs text-olive-800 sm:text-sm">
            <p className="font-semibold text-stone-900">{bride.fatherName}</p>
            <p className="my-0.5 text-gold-600 font-serif italic">&amp;</p>
            <p className="font-semibold text-stone-900">{bride.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-olive-600 sm:text-sm">
            &ldquo;{bride.bio}&rdquo;
          </p>

          {bride.instagram && (
            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-olive-400 transition-colors hover:text-gold-600"
            >
              <Instagram size={15} />
              <span>@{bride.shortName.toLowerCase()}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
