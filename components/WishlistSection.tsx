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
        return <UtensilsCrossed size={26} className="text-[#556B2F]" />;
      case "Elektronik":
        return <Tv size={26} className="text-[#556B2F]" />;
      case "Ruang Tamu":
        return <Armchair size={26} className="text-[#556B2F]" />;
      case "Bilik Tidur":
        return <Home size={26} className="text-[#556B2F]" />;
      default:
        return <Gift size={26} className="text-[#556B2F]" />;
    }
  };

  return (
    <section id="hadiah" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Centered Section Header */}
      <SectionHeader
        eyebrow="TANDA INGATAN"
        title="Senarai Hajat &amp; Hadiah"
        subtitle="Kehadiran dan doa ikhlas anda adalah hadiah paling bermakna bagi kami. Bagi yang berhajat menitipkan buah tangan untuk melengkapi kediaman baharu kami, berikut adalah beberapa keperluan yang kami impikan."
        dividerVariant="gold"
        className="mb-14"
      />

      {/* Category Filter Pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex items-center justify-center min-h-[44px] rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#556B2F] text-[#FAF7F2] shadow-xs border border-[#C5A059]/40"
                : "border border-[#E8E2D8] bg-[#FAF7F2] text-[#556377] hover:border-[#C5A059] hover:text-[#2D3748]"
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs transition-all duration-300 hover:border-[#C5A059]"
          >
            <BotanicalCornerFlourish position="top-right" size={32} variant="gold" />

            <div>
              {/* Category Botanical Art Emblem */}
              <div className="relative mb-5 flex h-36 w-full items-center justify-center rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] shadow-inner">
                <div className="relative z-10 flex flex-col items-center">
                  <BotanicalIconBadge size="lg" variant="sage">
                    {getCategoryIcon(item.category)}
                  </BotanicalIconBadge>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#7D8B74]">
                    {item.category}
                  </span>
                </div>

                {/* Reserved vs Available Tag */}
                <div className="absolute left-3 top-3">
                  {item.isReserved ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2D3748]/80 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                      <Check size={11} className="text-[#C5A059]" />
                      <span>Ditempah</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#C5A059]/40 bg-[#556B2F] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                      <Sparkles size={11} className="text-[#FAF7F2]" />
                      <span>Tersedia</span>
                    </span>
                  )}
                </div>

                {/* Platform Badge */}
                <div className="absolute right-3 top-3">
                  <span className="rounded-full border border-[#E8E2D8] bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#718096] shadow-xs">
                    {item.platform}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-[#2D3748]">
                {item.title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-[#556377] line-clamp-3">
                {item.description}
              </p>
            </div>

            <div>
              {item.priceEstimate && (
                <div className="mb-4 flex items-center justify-between border-t border-[#E8E2D8] pt-3">
                  <span className="text-xs text-[#718096]">Anggaran Harga:</span>
                  <span className="text-sm font-semibold text-[#2D3748] font-mono">
                    {item.priceEstimate}
                  </span>
                </div>
              )}

              {/* Action Button */}
              <a
                href={item.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all cursor-pointer ${
                  item.isReserved
                    ? "pointer-events-none cursor-not-allowed bg-stone-100 text-stone-400"
                    : "border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] text-white hover:opacity-95 shadow-xs active:scale-98"
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
