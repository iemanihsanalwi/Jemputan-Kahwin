"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import SectionHeader from "@/components/SectionHeader";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import { X, ChevronLeft, ChevronRight, Maximize2, BookOpen, Sparkles } from "lucide-react";

export default function GallerySection() {
  const weddingConfig = useWeddingConfig();
  const blessings = weddingConfig.blessings || [
    {
      id: "doa-1",
      arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
      translation: "“Semoga Allah memberkati kamu dan melimpahkan keberkatan ke atasmu, serta menghimpunkan kamu berdua dalam kebaikan.”",
      source: "Hadis Riwayat Abu Daud & Tirmizi",
    },
    {
      id: "doa-2",
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      translation: "“Wahai Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan kami dan keturunan kami sebagai penyejuk hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.”",
      source: "Surah Al-Furqan : Ayat 74",
    },
    {
      id: "doa-3",
      arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِهِمَا كَمَا أَلَّفْتَ بَيْنَ آدَمَ وَحَوَّاءَ وَبَيْنَ مُحَمَّدٍ وَخَدِيجَةَ",
      translation: "“Ya Allah, satukanlah hati kedua mempelai ini sebagaimana Engkau menyatukan hati Adam dan Hawa, dan sebagaimana Engkau menyatukan hati Nabi Muhammad dan Khadijah.”",
      source: "Doa Walimatulurus Tradisi Melayu Islam",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! + 1) % blessings.length);
  }, [activeIndex, blessings.length]);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev! - 1 + blessings.length) % blessings.length);
  }, [activeIndex, blessings.length]);

  const handleClose = () => setActiveIndex(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleNext, handlePrev]);

  return (
    <section id="galeri" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Centered Section Header */}
      <SectionHeader
        eyebrow="TITIPAN BARAKAH"
        title="Koleksi Doa & Seni Khat Mempelai"
        subtitle="Alunan doa dan ayat-ayat suci yang mengiringi ikatan mahabbah kedua mempelai hingga ke jannah."
        className="mb-14"
      />

      {/* Islamic Calligraphic Digital Art Plaques Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blessings.map((item, index) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`Buka paparan penuh: ${item.source}`}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EAD5D5] bg-white/85 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#D88A96] hover:shadow-rose focus:outline-none focus:ring-2 focus:ring-[#D88A96] cursor-pointer min-h-[300px]"
          >
            <BotanicalCornerFlourish position="all" size={34} variant="rose" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4">
                <BotanicalIconBadge size="md" variant="rose">
                  <BookOpen size={18} className="text-[#C56D7E]" />
                </BotanicalIconBadge>
              </div>

              {/* Arabic Calligraphy Typography */}
              <p className="dir-rtl mb-4 font-arabic text-xl sm:text-2xl leading-loose text-[#3D2429] transition-colors group-hover:text-[#B56576]">
                {item.arabic}
              </p>

              {/* Malay Translation */}
              <p className="mb-3 font-serif text-xs italic leading-relaxed text-[#7A555C] line-clamp-3">
                {item.translation}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-[#F0D5DA] flex items-center justify-between text-[#B56576] text-[11px] font-semibold">
              <span className="truncate">{item.source}</span>
              <Maximize2 size={14} className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all text-[#C56D7E]" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Full-fidelity Calligraphy Art */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            autoFocus
            aria-label="Tutup Paparan"
            className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-[#D88A96] active:scale-95 cursor-pointer"
          >
            <X size={22} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Doa Sebelumnya"
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Main Modal Calligraphic Art Card with Romantic Mulberry Velvet Finish */}
          <div
            className="relative w-full max-w-2xl rounded-3xl border-2 border-[#D4A373]/80 bg-gradient-to-b from-[#3D2429] via-[#4A2E35] to-[#2B191D] p-8 sm:p-12 text-center text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <BotanicalCornerFlourish position="all" size={48} variant="rose" />

            <div className="mb-6 flex justify-center">
              <Sparkles size={24} className="text-[#D4A373] animate-float-slow" />
            </div>

            <p className="dir-rtl mb-6 font-arabic text-2xl sm:text-3xl leading-loose text-[#FADBD8]">
              {blessings[activeIndex].arabic}
            </p>

            <FloralSectionDivider size="md" variant="rose" className="my-4" />

            <p className="mx-auto mb-6 max-w-lg font-serif text-sm sm:text-base italic leading-relaxed text-[#FFF8F8]">
              {blessings[activeIndex].translation}
            </p>

            <span className="inline-block rounded-full border border-[#D4A373]/40 bg-[#2B191D]/80 px-5 py-1.5 text-xs font-semibold tracking-widest text-[#D4A373]">
              — {blessings[activeIndex].source} —
            </span>

            <div className="mt-6 text-[11px] text-[#FADBD8]/70">
              {activeIndex + 1} daripada {blessings.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Doa Seterusnya"
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}
