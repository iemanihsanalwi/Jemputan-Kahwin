"use client";

import React, { useState } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { Gift, ExternalLink, Check, ShoppingBag } from "lucide-react";

export default function WishlistSection() {
  const { wishlist } = weddingConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    ...Array.from(new Set(wishlist.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === "Semua"
      ? wishlist
      : wishlist.filter((item) => item.category === selectedCategory);

  return (
    <section id="hadiah" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Tanda Ingatan
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Senarai Hajat & Hadiah
        </h2>
        <div className="mb-4 flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <Gift size={16} className="text-gold-500" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
        <p className="mx-auto max-w-xl text-xs leading-relaxed text-stone-600 sm:text-sm">
          Kehadiran dan doa ikhlas anda adalah hadiah paling bermakna bagi kami. Bagi yang
          berhajat menitipkan buah tangan untuk melengkapi kediaman baharu kami, berikut
          adalah beberapa keperluan yang kami impikan.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-emerald-900 text-white shadow-sm"
                : "border border-gold-200 bg-white/80 text-stone-600 hover:border-gold-400"
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
            className="group flex flex-col overflow-hidden rounded-3xl border border-gold-200 bg-white shadow-sm transition-all duration-300 hover:border-gold-400 hover:shadow-card"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-stone-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Reserved vs Available Tag */}
              <div className="absolute left-3 top-3">
                {item.isReserved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-stone-900/80 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
                    <Check size={12} className="text-emerald-400" />
                    <span>Telah Ditempah</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700/85 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
                    <span>Tersedia</span>
                  </span>
                )}
              </div>

              {/* Platform Badge */}
              <div className="absolute right-3 top-3">
                <span className="rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-800 shadow-sm backdrop-blur-sm">
                  {item.platform}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gold-700">
                  {item.category}
                </span>
                <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-emerald-950">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-stone-600">
                  {item.description}
                </p>
              </div>

              <div>
                {item.priceEstimate && (
                  <div className="mb-4 flex items-center justify-between border-t border-stone-100 pt-3">
                    <span className="text-xs text-stone-400">Anggaran Harga:</span>
                    <span className="text-sm font-semibold text-emerald-900">
                      {item.priceEstimate}
                    </span>
                  </div>
                )}

                {/* Buy Button */}
                <a
                  href={item.storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                    item.isReserved
                      ? "pointer-events-none cursor-not-allowed bg-stone-100 text-stone-400"
                      : "border border-gold-300 bg-gold-50 text-gold-800 hover:border-gold-400 hover:bg-gold-100 active:scale-95"
                  }`}
                >
                  <ShoppingBag size={14} />
                  <span>
                    {item.isReserved
                      ? "Hadiah Telah Ditempah"
                      : `Lihat di ${item.platform}`}
                  </span>
                  {!item.isReserved && <ExternalLink size={12} />}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
