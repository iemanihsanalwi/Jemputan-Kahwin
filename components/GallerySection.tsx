"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

export default function GallerySection() {
  const { gallery } = weddingConfig;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % gallery.length);
  }, [activePhotoIndex, gallery.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);
  }, [activePhotoIndex, gallery.length]);

  const handleClose = () => {
    setActivePhotoIndex(null);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  return (
    <section id="galeri" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Memori Terindah
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Galeri Kenangan
        </h2>
        <div className="mb-4 flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <ImageIcon size={16} className="text-gold-500" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
        <p className="mx-auto max-w-md text-xs text-stone-600 sm:text-sm">
          Setiap detik pertemuan dan perjalanan yang mengukir kisah kasih abadi kami.
        </p>
      </div>

      {/* Masonry / Grid Gallery */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {gallery.map((photo, index) => (
          <div
            key={photo.id}
            role="button"
            tabIndex={0}
            aria-label={`Buka paparan penuh gambar: ${photo.caption || index + 1}`}
            onClick={() => setActivePhotoIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActivePhotoIndex(index);
              }
            }}
            className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl border border-gold-200/60 bg-stone-100 shadow-sm transition-all duration-300 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-gold-500 sm:h-80"
          >
            <Image
              src={photo.url}
              alt={photo.caption || `Foto Mempelai ${index + 1}`}
              fill
              loading="lazy"
              className="group-hover:scale-108 object-cover transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center justify-between">
                <span className="line-clamp-1 text-xs font-medium sm:text-sm">
                  {photo.caption || "Klik untuk paparan skrin penuh"}
                </span>
                <Maximize2 size={16} className="flex-shrink-0 text-gold-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Paparan gambar skrin penuh"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            autoFocus
            aria-label="Tutup Paparan"
            className="absolute right-5 top-5 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-gold-400 active:scale-95"
          >
            <X size={22} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Foto Sebelumnya"
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 active:scale-95"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Main Lightbox Image */}
          <div
            className="relative flex h-[70vh] max-h-[80vh] w-full max-w-4xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={gallery[activePhotoIndex].url}
                alt={gallery[activePhotoIndex].caption || "Foto Mempelai"}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption & Counter */}
            <div className="mt-4 text-center text-white">
              <p className="mb-0.5 text-sm font-medium text-gold-300">
                {gallery[activePhotoIndex].caption}
              </p>
              <span className="text-xs text-stone-400">
                {activePhotoIndex + 1} daripada {gallery.length}
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Foto Seterusnya"
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 active:scale-95"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </section>
  );
}
