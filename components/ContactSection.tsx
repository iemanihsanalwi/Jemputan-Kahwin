"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { cleanPhoneNumber } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const { contacts } = weddingConfig;

  return (
    <section id="hubungi" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Pertanyaan & Bantuan
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Hubungi Wakil Majlis
        </h2>
        <div className="mb-4 flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <Phone size={16} className="text-gold-500" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
        <p className="mx-auto max-w-md text-xs text-stone-600 sm:text-sm">
          Sebarang pertanyaan lanjut berkenaan majlis, panduan arah, atau pengesahan
          kehadiran boleh diajukan kepada wakil kami.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => {
          const rawPhone = cleanPhoneNumber(contact.phone);
          const encodedMessage = encodeURIComponent(
            contact.whatsappMessage ||
              "Salam, saya ingin bertanya berkenaan majlis perkahwinan..."
          );
          const waUrl = `https://wa.me/${rawPhone}?text=${encodedMessage}`;
          const telUrl = `tel:${rawPhone}`;

          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-3xl border border-gold-200 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:shadow-card"
            >
              <div>
                <span className="mb-3 inline-block rounded-full border border-gold-200/60 bg-champagne-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">
                  {contact.relation}
                </span>

                <h3 className="mb-1 font-serif text-lg font-bold text-emerald-950 sm:text-xl">
                  {contact.name}
                </h3>

                <p className="mb-6 font-mono text-xs text-stone-500 sm:text-sm">
                  {contact.phone}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 border-t border-stone-100 pt-2">
                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-xs flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-95"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                {/* Call Button */}
                <a
                  href={telUrl}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50 active:scale-95"
                >
                  <Phone size={14} className="text-gold-600" />
                  <span>Hubungi</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
