"use client";

import React, { useState } from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
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
        return <UtensilsCrossed size={28} className="text-gold-600" />;
      case "Elektronik":
        return <Tv size={28} className="text-gold-600" />;
      case "Ruang Tamu":
        return <Armchair size={28} className="text-gold-600" />;
      case "Bilik Tidur":
        return <Home size={28} className="text-gold-600" />;
      default:
        return <Gift size={28} className="text-gold-600" />;
    }
  };

  return (
    <section id="hadiah" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Tanda Ingatan
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-sage-950 sm:text-4xl md:text-5xl">
          Senarai Hajat &amp; Hadiah
        </h2>
        <FloralSectionDivider size="md" />
        <p className="mx-auto max-w-xl text-xs leading-relaxed text-olive-600 sm:text-sm">
          Kehadiran dan doa ikhlas anda adalah hadiah paling bermakna bagi kami. Bagi yang
          berhajat menitipkan buah tangan untuk melengkapi kediaman baharu kami, berikut
          adalah beberapa keperluan yang kami impikan.
        </p>
      </div>

      {/* Category Filter Pills (Rounded Contours) */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
              selectedCategory === cat
                ? "bg-sage-800 text-white shadow-sm border border-sage-700"
                : "border border-gold-200 bg-white/85 text-olive-700 hover:border-gold-400 hover:bg-gold-50"
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
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-gold-200/90 bg-white/95 p-6 shadow-sm transition-all duration-300 hover:border-gold-400 hover:shadow-gold"
          >
            <BotanicalCornerFlourish position="top-right" size={32} variant="gold" />

            <div>
              {/* Category Botanical Art Emblem */}
              <div className="relative mb-5 flex h-36 w-full items-center justify-center rounded-2xl border border-gold-200/60 bg-gradient-to-b from-cream-100/60 via-cream-50/40 to-white shadow-inner">
                <div className="absolute flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-gold-300/40 opacity-70 animate-pulse-subtle" />
                  <div className="absolute h-24 w-24 rounded-full border border-blush-300/20" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <BotanicalIconBadge size="lg" variant="gold">
                    {getCategoryIcon(item.category)}
                  </BotanicalIconBadge>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gold-800">
                    {item.category}
                  </span>
                </div>

                {/* Reserved vs Available Tag */}
                <div className="absolute left-3 top-3">
                  {item.isReserved ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm backdrop-blur-xs">
                      <Check size={11} className="text-sage-400" />
                      <span>Ditempah</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold-300/40 bg-sage-800/90 px-2.5 py-0.5 text-[10px] font-semibold text-gold-200 shadow-sm backdrop-blur-xs">
                      <Sparkles size={11} className="text-gold-300" />
                      <span>Tersedia</span>
                    </span>
                  )}
                </div>

                {/* Platform Badge */}
                <div className="absolute right-3 top-3">
                  <span className="rounded-full border border-gold-200 bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-olive-800 shadow-xs">
                    {item.platform}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-sage-950">
                {item.title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-olive-600 line-clamp-3">
                {item.description}
              </p>
            </div>

            <div>
              {item.priceEstimate && (
                <div className="mb-4 flex items-center justify-between border-t border-gold-100 pt-3">
                  <span className="text-xs text-olive-400">Anggaran Harga:</span>
                  <span className="text-sm font-semibold text-sage-900 font-mono">
                    {item.priceEstimate}
                  </span>
                </div>
              )}

              {/* Action Button (Rounded Pill Contour with Botanical Gold Border) */}
              <a
                href={item.storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  item.isReserved
                    ? "pointer-events-none cursor-not-allowed bg-stone-100 text-stone-400"
                    : "border-2 border-gold-300 bg-gold-50/70 text-gold-900 hover:border-gold-400 hover:bg-gold-100 active:scale-95 shadow-xs"
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
