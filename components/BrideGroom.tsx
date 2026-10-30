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
      <div className="relative mx-auto mb-20 max-w-3xl overflow-hidden rounded-3xl border-2 border-[#EAD5D5] bg-white/85 p-6 text-center shadow-rose backdrop-blur-md sm:p-10">
        <BotanicalCornerFlourish position="all" size={44} variant="rose" />
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent" />

        {/* Tab Selector for Doa & Verse (Rounded Pills) */}
        <div className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-2">
          {doaItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-[#D88A96] to-[#C56D7E] text-white shadow-sm border border-[#E2B686]"
                  : "bg-white/85 text-[#7A555C] hover:bg-[#FDE8EC] hover:text-[#3D2429] border border-[#EAD5D5]"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative z-10 transition-all duration-300">
          <p className="dir-rtl mb-4 font-arabic text-xl leading-loose text-[#3D2429] sm:text-2xl md:text-3xl">
            {currentItem.arabic}
          </p>

          <p className="mb-3 font-serif text-xs sm:text-sm italic leading-relaxed text-[#7A555C] max-w-xl mx-auto">
            {currentItem.translation}
          </p>

          <FloralSectionDivider size="sm" className="my-3" />

          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#B56576]">
            — {currentItem.source} —
          </span>
        </div>
      </div>

      {/* Unified Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="MEMPELAI RAJA SEHARI"
        title="Pasangan Mempelai"
      />

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-14">
        {/* Groom Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-[#EAD5D5] bg-white/90 p-6 text-center shadow-rose backdrop-blur-md transition-all duration-300 hover:border-[#D4A373] hover:shadow-[0_12px_30px_rgba(216,138,150,0.22)] sm:p-8">
          <BotanicalCornerFlourish position="all" size={38} variant="rose" />

          {/* Floral Wreath Monogram Medallion */}
          <div className="relative mb-6">
            <FloralWreathHeader
              initials={groom.shortName.charAt(0)}
              subtitle="PENGANTIN LELAKI"
              size="lg"
              variant="groom"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-[#EAD5D5] bg-[#FDE8EC] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
            {groom.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-[#3D2429] sm:text-3xl">
            {groom.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-[#D4A373] sm:text-sm">
            {groom.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-3 text-xs text-[#7A555C] sm:text-sm">
            <p className="font-semibold text-[#3D2429]">{groom.fatherName}</p>
            <p className="my-0.5 text-[#D4A373] font-serif italic">&amp;</p>
            <p className="font-semibold text-[#3D2429]">{groom.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-[#7A555C] sm:text-sm">
            &ldquo;{groom.bio}&rdquo;
          </p>

          {groom.instagram && (
            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#B56576] transition-colors hover:text-[#3D2429]"
            >
              <Instagram size={15} />
              <span>@{groom.shortName.toLowerCase()}</span>
            </a>
          )}
        </div>

        {/* Bride Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-[#EAD5D5] bg-white/90 p-6 text-center shadow-rose backdrop-blur-md transition-all duration-300 hover:border-[#D4A373] hover:shadow-[0_12px_30px_rgba(216,138,150,0.22)] sm:p-8">
          <BotanicalCornerFlourish position="all" size={38} variant="rose" />

          {/* Floral Wreath Monogram Medallion */}
          <div className="relative mb-6">
            <FloralWreathHeader
              initials={bride.shortName.charAt(0)}
              subtitle="PENGANTIN PEREMPUAN"
              size="lg"
              variant="bride"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-[#EAD5D5] bg-[#FDE8EC] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#B56576]">
            {bride.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-[#3D2429] sm:text-3xl">
            {bride.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-[#D4A373] sm:text-sm">
            {bride.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-3 text-xs text-[#7A555C] sm:text-sm">
            <p className="font-semibold text-[#3D2429]">{bride.fatherName}</p>
            <p className="my-0.5 text-[#D4A373] font-serif italic">&amp;</p>
            <p className="font-semibold text-[#3D2429]">{bride.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-[#7A555C] sm:text-sm">
            &ldquo;{bride.bio}&rdquo;
          </p>

          {bride.instagram && (
            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#B56576] transition-colors hover:text-[#3D2429]"
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
