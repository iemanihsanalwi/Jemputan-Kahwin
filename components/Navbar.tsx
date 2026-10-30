"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import {
  Heart,
  Calendar,
  MapPin,
  MessageSquare,
  Gift,
  Phone,
  BookOpen,
  CheckCircle2,
  Menu,
  X,
  CreditCard,
} from "lucide-react";

export default function Navbar() {
  const weddingConfig = useWeddingConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Mempelai", href: "#mempelai", icon: Heart },
    { label: "Acara", href: "#acara", icon: Calendar },
    { label: "Lokasi", href: "#lokasi", icon: MapPin },
    ...(weddingConfig.rsvp?.enabled !== false
      ? [{ label: "RSVP", href: "#rsvp", icon: CheckCircle2, highlight: true }]
      : []),
    { label: "Ucapan", href: "#ucapan", icon: MessageSquare },
    ...(weddingConfig.wishlist && weddingConfig.wishlist.length > 0
      ? [{ label: "Hadiah", href: "#hadiah", icon: Gift }]
      : []),
    ...(weddingConfig.salamKaut?.enabled !== false
      ? [{ label: "Salam Kaut", href: "#salam-kaut", icon: CreditCard }]
      : []),
    { label: "Doa & Seni", href: "#galeri", icon: BookOpen },
    { label: "Hubungi", href: "#hubungi", icon: Phone },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#EAD5D5] bg-white/90 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="group flex items-center gap-2 transition-transform active:scale-95">
          <span className="font-serif text-xl font-bold tracking-wider text-[#3D2429] transition-colors group-hover:text-[#D88A96] sm:text-2xl">
            {weddingConfig.couple.groom.shortName} &amp; {weddingConfig.couple.bride.shortName}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#7A555C] md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-[#C56D7E] ${
                item.highlight
                  ? "rounded-full bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-5 py-1.5 font-semibold text-white shadow-rose hover:opacity-95"
                  : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#rsvp"
            className="rounded-full bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-3.5 py-1 text-xs font-semibold text-white shadow-rose"
          >
            RSVP
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="rounded-full border border-[#EAD5D5] bg-white/80 p-2 text-[#7A555C] hover:text-[#C56D7E] cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#EAD5D5] bg-white/95 px-6 py-4 shadow-xl backdrop-blur-lg transition-all md:hidden">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-2xl p-2.5 text-[#7A555C] transition-colors hover:bg-[#FFF8F8] hover:text-[#C56D7E]"
                >
                  <Icon size={16} className="text-[#C56D7E]" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
