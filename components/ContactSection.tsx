"use client";

import React from "react";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import { cleanPhoneNumber } from "@/lib/utils";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import SectionHeader from "@/components/SectionHeader";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const weddingConfig = useWeddingConfig();
  const { contacts, couple } = weddingConfig;

  return (
    <section id="hubungi" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Centered Section Header */}
      <SectionHeader
        eyebrow="PERTANYAAN & BANTUAN"
        title="Hubungi Wakil Majlis"
        subtitle="Sebarang pertanyaan lanjut berkenaan majlis, panduan arah, atau pengesahan kehadiran boleh diajukan kepada wakil kami."
        className="mb-14"
      />

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
              className="relative flex flex-col justify-between rounded-3xl border border-[#E8E2D9] bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-md"
            >
              <BotanicalCornerFlourish position="top-right" size={28} variant="gold" />

              <div>
                <span className="mb-3 inline-block rounded-full border border-[#E8E2D9] bg-[#FDFBF7] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#7D8B74]">
                  {contact.relation}
                </span>

                <h3 className="mb-1 font-serif text-lg font-bold text-[#2D3748] sm:text-xl">
                  {contact.name}
                </h3>

                <p className="mb-6 font-mono tabular-nums text-xs text-[#4A5568] sm:text-sm select-all">
                  {contact.phone}
                </p>
              </div>

              {/* Action Buttons (Rounded Pills with HIG 44pt Touch Targets) */}
              <div className="grid grid-cols-2 gap-2.5 border-t border-[#E8E2D9] pt-3.5">
                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center min-h-[44px] gap-1.5 rounded-full bg-gradient-to-r from-[#7D8B74] to-[#556B2F] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:opacity-95 active:scale-[0.96] shadow-xs hover:shadow-md cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                {/* Call Button */}
                <a
                  href={telUrl}
                  className="flex items-center justify-center min-h-[44px] gap-1.5 rounded-full border border-[#E8E2D9] bg-white px-3 py-2.5 text-xs font-semibold text-[#2D3748] transition-all hover:border-[#7D8B74] hover:bg-[#FDFBF7] active:scale-[0.96] shadow-xs cursor-pointer"
                >
                  <Phone size={14} className="text-[#C5A059]" />
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
