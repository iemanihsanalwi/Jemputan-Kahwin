"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import FloralWreathHeader from "@/components/art/FloralWreathHeader";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import SectionHeader from "@/components/SectionHeader";
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
      {/* Doa Pengantin & Quranic Verse Calligraphy Card */}
      <div className="relative mx-auto mb-20 max-w-3xl overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 text-center shadow-xs sm:p-10">
        <BotanicalCornerFlourish position="all" size={44} variant="sage" />
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        {/* Tab Selector for Doa & Verse (Rounded Pills) */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-2">
          {doaItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === idx
                  ? "bg-[#556B2F] text-[#FAF7F2] shadow-xs border border-[#C5A059]/50"
                  : "bg-[#FAF7F2] text-[#556377] hover:bg-[#E8E2D8] hover:text-[#2D3748] border border-[#E8E2D8]"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative z-10 transition-all duration-300">
          <p className="dir-rtl mb-4 font-arabic text-xl leading-loose text-[#2D3748] sm:text-2xl md:text-3xl">
            {currentItem.arabic}
          </p>

          <p className="mb-3 font-serif text-xs sm:text-sm italic leading-relaxed text-[#556377] max-w-xl mx-auto">
            {currentItem.translation}
          </p>

          <FloralSectionDivider size="sm" variant="gold" className="my-3" />

          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]">
            — {currentItem.source} —
          </span>
        </div>
      </div>

      {/* Unified Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="MEMPELAI RAJA SEHARI"
        title="Pasangan Mempelai"
        dividerVariant="gold"
      />

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-14">
        {/* Groom Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 text-center shadow-xs transition-all duration-300 hover:border-[#C5A059] sm:p-8">
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

          <span className="mb-2 inline-block rounded-full border border-[#E8E2D8] bg-[#F4F6F2] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#556B2F]">
            {groom.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-[#2D3748] sm:text-3xl">
            {groom.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-[#C5A059] sm:text-sm">
            {groom.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-3 text-xs text-[#556377] sm:text-sm">
            <p className="font-semibold text-[#2D3748]">{groom.fatherName}</p>
            <p className="my-0.5 text-[#C5A059] font-serif italic">&amp;</p>
            <p className="font-semibold text-[#2D3748]">{groom.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-[#556377] sm:text-sm">
            &ldquo;{groom.bio}&rdquo;
          </p>

          {groom.instagram && (
            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] bg-white text-xs font-medium text-[#556377] transition-all hover:border-[#C5A059] hover:text-[#2D3748] active:scale-95 cursor-pointer shadow-xs"
            >
              <Instagram size={15} />
              <span>@{groom.shortName.toLowerCase()}</span>
            </a>
          )}
        </div>

        {/* Bride Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 text-center shadow-xs transition-all duration-300 hover:border-[#C5A059] sm:p-8">
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

          <span className="mb-2 inline-block rounded-full border border-[#E8E2D8] bg-[#FAF2F2] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#B87B7B]">
            {bride.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-[#2D3748] sm:text-3xl">
            {bride.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-[#C5A059] sm:text-sm">
            {bride.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-3 text-xs text-[#556377] sm:text-sm">
            <p className="font-semibold text-[#2D3748]">{bride.fatherName}</p>
            <p className="my-0.5 text-[#C5A059] font-serif italic">&amp;</p>
            <p className="font-semibold text-[#2D3748]">{bride.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-[#556377] sm:text-sm">
            &ldquo;{bride.bio}&rdquo;
          </p>

          {bride.instagram && (
            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D8] bg-white text-xs font-medium text-[#556377] transition-all hover:border-[#C5A059] hover:text-[#2D3748] active:scale-95 cursor-pointer shadow-xs"
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
