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
              className="relative flex flex-col justify-between rounded-3xl border border-[#EAD5D5] bg-white/85 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#D88A96] hover:shadow-rose"
            >
              <BotanicalCornerFlourish position="top-right" size={28} variant="rose" />

              <div>
                <span className="mb-3 inline-block rounded-full border border-[#EAD5D5] bg-[#FFF8F8] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#B56576]">
                  {contact.relation}
                </span>

                <h3 className="mb-1 font-serif text-lg font-bold text-[#3D2429] sm:text-xl">
                  {contact.name}
                </h3>

                <p className="mb-6 font-mono text-xs text-[#7A555C] sm:text-sm">
                  {contact.phone}
                </p>
              </div>

              {/* Action Buttons (Rounded Pills) */}
              <div className="grid grid-cols-2 gap-2.5 border-t border-[#F0D5DA] pt-3.5">
                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95 active:scale-95 shadow-xs hover:shadow-rose cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                {/* Call Button */}
                <a
                  href={telUrl}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-[#EAD5D5] bg-white px-3 py-2 text-xs font-semibold text-[#4A2E35] transition-colors hover:border-[#D88A96] hover:bg-[#FFF8F8] active:scale-95 shadow-xs cursor-pointer"
                >
                  <Phone size={14} className="text-[#D4A373]" />
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
