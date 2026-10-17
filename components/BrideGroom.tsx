"use client";

import React from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { Heart, Instagram } from "lucide-react";

export default function BrideGroom() {
  const { groom, bride } = weddingConfig.couple;
  const { quote } = weddingConfig;

  return (
    <section id="mempelai" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Quranic Verse Box */}
      <div className="relative mx-auto mb-20 max-w-3xl overflow-hidden rounded-3xl border border-gold-300/60 bg-white/70 p-6 text-center shadow-card backdrop-blur-md sm:p-10">
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

        <p className="dir-rtl mb-4 font-arabic text-xl leading-relaxed text-emerald-950 sm:text-2xl">
          {quote.arabic}
        </p>

        <p className="mb-3 font-serif text-sm italic leading-relaxed text-stone-700 sm:text-base">
          {quote.translationMalay}
        </p>

        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold-700">
          — {quote.source} —
        </span>
      </div>

      {/* Section Title */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Raja Sehari
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Pasangan Mempelai
        </h2>
        <div className="flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <Heart size={16} className="fill-gold-400 text-gold-400" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
      </div>

      {/* Couple Profiles Grid */}
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-14">
        {/* Groom Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border border-gold-200 bg-white/90 p-6 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:border-gold-400 sm:p-8">
          <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-2xl border-2 border-gold-200 shadow-md sm:h-52 sm:w-52">
            <Image
              src={groom.image}
              alt={groom.fullName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 176px, 208px"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-900">
            {groom.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-emerald-950 sm:text-3xl">
            {groom.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-gold-700 sm:text-sm">
            {groom.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-xl border border-gold-200/50 bg-champagne-50/80 p-3 text-xs text-stone-700 sm:text-sm">
            <p className="font-semibold text-stone-900">{groom.fatherName}</p>
            <p className="my-0.5 text-gold-600">&</p>
            <p className="font-semibold text-stone-900">{groom.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-stone-600 sm:text-sm">
            &ldquo;{groom.bio}&rdquo;
          </p>

          {groom.instagram && (
            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 transition-colors hover:text-gold-600"
            >
              <Instagram size={15} />
              <span>@{groom.shortName.toLowerCase()}</span>
            </a>
          )}
        </div>

        {/* Bride Card */}
        <div className="group relative flex flex-col items-center rounded-3xl border border-gold-200 bg-white/90 p-6 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:border-gold-400 sm:p-8">
          <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-2xl border-2 border-gold-200 shadow-md sm:h-52 sm:w-52">
            <Image
              src={bride.image}
              alt={bride.fullName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 176px, 208px"
            />
          </div>

          <span className="mb-2 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-900">
            {bride.title}
          </span>

          <h3 className="mb-1 font-serif text-2xl font-bold text-emerald-950 sm:text-3xl">
            {bride.fullName}
          </h3>

          <p className="mb-4 text-xs font-medium text-gold-700 sm:text-sm">
            {bride.orderInFamily}
          </p>

          <div className="mb-4 w-full rounded-xl border border-gold-200/50 bg-champagne-50/80 p-3 text-xs text-stone-700 sm:text-sm">
            <p className="font-semibold text-stone-900">{bride.fatherName}</p>
            <p className="my-0.5 text-gold-600">&</p>
            <p className="font-semibold text-stone-900">{bride.motherName}</p>
          </div>

          <p className="mb-4 text-xs italic leading-relaxed text-stone-600 sm:text-sm">
            &ldquo;{bride.bio}&rdquo;
          </p>

          {bride.instagram && (
            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 transition-colors hover:text-gold-600"
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
