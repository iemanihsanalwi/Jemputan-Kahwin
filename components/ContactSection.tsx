"use client";

import React from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import { cleanPhoneNumber } from "@/lib/utils";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import FloralSectionDivider from "@/components/art/FloralSectionDivider";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const weddingConfig = useWeddingConfig();
  const { contacts, couple } = weddingConfig;

  return (
    <section id="hubungi" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Pertanyaan &amp; Bantuan
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-sage-950 sm:text-4xl md:text-5xl">
          Hubungi Wakil Majlis
        </h2>
        <FloralSectionDivider size="md" />
        <p className="mx-auto max-w-md text-xs text-olive-600 sm:text-sm">
          Sebarang pertanyaan lanjut berkenaan majlis, panduan arah, atau pengesahan
          kehadiran boleh diajukan kepada wakil kami.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => {
          const rawPhone = cleanPhoneNumber(contact.phone);
          const defaultMessage = `Salam, saya ingin bertanya berkenaan majlis perkahwinan ${couple.groom.shortName} & ${couple.bride.shortName}...`;
          const encodedMessage = encodeURIComponent(contact.whatsappMessage || defaultMessage);
          const waUrl = `https://wa.me/${rawPhone}?text=${encodedMessage}`;
          const telUrl = `tel:${rawPhone}`;

          return (
            <div
              key={index}
              className="relative flex flex-col justify-between rounded-3xl border-2 border-gold-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:shadow-gold"
            >
              <BotanicalCornerFlourish position="top-right" size={28} variant="gold" />

              <div>
                <span className="mb-3 inline-block rounded-full border border-gold-200/60 bg-cream-100 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-800">
                  {contact.relation}
                </span>

                <h3 className="mb-1 font-serif text-lg font-bold text-sage-950 sm:text-xl">
                  {contact.name}
                </h3>

                <p className="mb-6 font-mono text-xs text-olive-500 sm:text-sm">
                  {contact.phone}
                </p>
              </div>

              {/* Action Buttons (Rounded Pills) */}
              <div className="grid grid-cols-2 gap-2.5 border-t border-olive-100 pt-3.5">
                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-sage-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-sage-600 active:scale-95 shadow-xs cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                {/* Call Button */}
                <a
                  href={telUrl}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-olive-200 bg-white px-3 py-2 text-xs font-semibold text-olive-700 transition-colors hover:bg-cream-50 active:scale-95 shadow-xs cursor-pointer"
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
