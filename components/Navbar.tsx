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
          ? "border-b border-[#E8E2D8] bg-[#FAF7F2]/95 py-3 shadow-xs backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="group flex items-center gap-2 transition-transform active:scale-95">
          <span className="font-serif text-xl font-bold tracking-wider text-[#2D3748] transition-colors group-hover:text-[#556B2F] sm:text-2xl">
            {weddingConfig.couple.groom.shortName} &amp; {weddingConfig.couple.bride.shortName}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#556377] md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-[#2D3748] ${
                item.highlight
                  ? "rounded-full bg-gradient-to-r from-[#556B2F] to-[#7D8B74] px-5 py-1.5 font-semibold text-white shadow-xs hover:opacity-95"
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
            className="flex items-center justify-center min-h-[44px] rounded-full bg-gradient-to-r from-[#556B2F] to-[#7D8B74] px-4 py-2 text-xs font-semibold text-white shadow-xs active:scale-95 transition-all"
          >
            RSVP
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#E8E2D8] bg-[#FAF7F2] p-2 text-[#556377] hover:text-[#2D3748] active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E8E2D8] bg-[#FAF7F2]/98 px-6 py-4 shadow-xl backdrop-blur-lg transition-all md:hidden">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-[44px] gap-2 rounded-2xl p-2.5 text-[#556377] transition-all hover:bg-white hover:text-[#2D3748] active:scale-98"
                >
                  <Icon size={16} className="text-[#556B2F]" />
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
