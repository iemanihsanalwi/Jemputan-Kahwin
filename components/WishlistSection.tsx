"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import SectionHeader from "@/components/SectionHeader";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import {
  Gift,
  ExternalLink,
  Check,
  ShoppingBag,
  UtensilsCrossed,
  Tv,
  Armchair,
  Home,
  Sparkles,
} from "lucide-react";

export default function WishlistSection() {
  const weddingConfig = useWeddingConfig();
  const { wishlist } = weddingConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  if (!wishlist || wishlist.length === 0) return null;

  const categories = [
    "Semua",
    ...Array.from(new Set(wishlist.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === "Semua"
      ? wishlist
      : wishlist.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dapur":
        return <UtensilsCrossed size={28} className="text-[#C56D7E]" />;
      case "Elektronik":
        return <Tv size={28} className="text-[#C56D7E]" />;
      case "Ruang Tamu":
        return <Armchair size={28} className="text-[#C56D7E]" />;
      case "Bilik Tidur":
        return <Home size={28} className="text-[#C56D7E]" />;
      default:
        return <Gift size={28} className="text-[#C56D7E]" />;
    }
  };

  return (
    <section id="hadiah" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Centered Section Header */}
      <SectionHeader
        eyebrow="TANDA INGATAN"
        title="Senarai Hajat & Hadiah"
        subtitle="Kehadiran dan doa ikhlas anda adalah hadiah paling bermakna bagi kami. Bagi yang berhajat menitipkan buah tangan untuk melengkapi kediaman baharu kami, berikut adalah beberapa keperluan yang kami impikan."
        className="mb-14"
      />

      {/* Category Filter Pills (Rounded Contours & HIG 44pt Targets) */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center justify-center min-h-[44px] rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 active:scale-[0.96] cursor-pointer ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-[#D88A96] to-[#C56D7E] text-white shadow-rose border border-[#C56D7E]"
                : "border border-[#EAD5D5] bg-white/85 text-[#7A555C] hover:border-[#D88A96] hover:bg-[#FFF8F8]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wishlist Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EAD5D5] bg-white/85 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#D88A96] hover:shadow-rose"
          >
            <BotanicalCornerFlourish position="top-right" size={32} variant="rose" />

            <div>
              {/* Category Botanical Art Emblem */}
              <div className="relative mb-5 flex h-36 w-full items-center justify-center rounded-2xl border border-[#EAD5D5]/80 bg-gradient-to-b from-[#FFF8F8] via-[#FDE8EC]/30 to-white shadow-inner">
                <div className="absolute flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-[#D4A373]/30 opacity-70 animate-pulse-subtle" />
                  <div className="absolute h-24 w-24 rounded-full border border-[#FADBD8]/40" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <BotanicalIconBadge size="lg" variant="rose">
                    {getCategoryIcon(item.category)}
                  </BotanicalIconBadge>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#B56576]">
                    {item.category}
                  </span>
                </div>

                {/* Reserved vs Available Tag */}
                <div className="absolute left-3 top-3">
                  {item.isReserved ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#3D2429]/80 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-xs">
                      <Check size={11} className="text-[#FADBD8]" />
                      <span>Ditempah</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#D4A373]/40 bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs backdrop-blur-xs">
                      <Sparkles size={11} className="text-[#FFF8F8]" />
                      <span>Tersedia</span>
                    </span>
                  )}
                </div>

                {/* Platform Badge */}
                <div className="absolute right-3 top-3">
                  <span className="rounded-full border border-[#EAD5D5] bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7A555C] shadow-xs">
                    {item.platform}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-[#3D2429]">
                {item.title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-[#7A555C] line-clamp-3">
                {item.description}
              </p>
            </div>

            <div>
              {item.priceEstimate && (
                <div className="mb-4 flex items-center justify-between border-t border-[#F0D5DA] pt-3">
                  <span className="text-xs text-[#9B7077]">Anggaran Harga:</span>
                  <span className="text-sm font-semibold text-[#3D2429] font-mono">
                    {item.priceEstimate}
                  </span>
                </div>
              )}

              {/* Action Button (Rounded Pill Contour with Soft Rose Styling & 44pt Target) */}
              <a
                href={item.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all cursor-pointer ${
                  item.isReserved
                    ? "pointer-events-none cursor-not-allowed bg-stone-100 text-stone-400"
                    : "bg-gradient-to-r from-[#D88A96] to-[#C56D7E] text-white hover:opacity-95 shadow-xs hover:shadow-rose active:scale-[0.97]"
                }`}
              >
                <ShoppingBag size={14} />
                <span>
                  {item.isReserved ? "Hadiah Telah Ditempah" : `Lihat di ${item.platform}`}
                </span>
                {!item.isReserved && <ExternalLink size={12} />}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
