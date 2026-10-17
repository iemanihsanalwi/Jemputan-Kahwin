"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { weddingConfig } from "@/config/wedding";
import {
  Heart,
  Calendar,
  MapPin,
  MessageSquare,
  Gift,
  Phone,
  Image as ImageIcon,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
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
    { label: "RSVP", href: "#rsvp", icon: CheckCircle2, highlight: true },
    { label: "Ucapan", href: "#ucapan", icon: MessageSquare },
    { label: "Hadiah", href: "#hadiah", icon: Gift },
    { label: "Galeri", href: "#galeri", icon: ImageIcon },
    { label: "Hubungi", href: "#hubungi", icon: Phone },
  ];

  return (
    <>
      {/* Top Desktop Navigation */}
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold-200/50 bg-white/85 py-3 shadow-sm backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="#"
            className="group flex items-center gap-2 transition-transform active:scale-95"
          >
            <span className="font-serif text-xl font-bold tracking-wider text-emerald-900 transition-colors group-hover:text-gold-600 sm:text-2xl">
              {weddingConfig.couple.groom.shortName} &{" "}
              {weddingConfig.couple.bride.shortName}
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-gold-600 ${
                  item.highlight
                    ? "rounded-full bg-gold-500 px-4 py-1.5 font-semibold text-white shadow-gold hover:bg-gold-600"
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
              className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"
            >
              RSVP
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="rounded-lg border border-gold-200 bg-white/80 p-2 text-stone-700 hover:text-gold-600"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-gold-200 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-lg transition-all md:hidden">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2 text-stone-700 transition-colors hover:bg-gold-50 hover:text-gold-600"
                  >
                    <Icon size={16} className="text-gold-500" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="flex items-center justify-around rounded-full border border-gold-400/40 bg-emerald-950/90 px-5 py-3 text-xs text-white shadow-2xl backdrop-blur-md">
          <a
            href="#mempelai"
            className="flex flex-col items-center gap-0.5 text-stone-300 transition-transform hover:text-gold-300 active:scale-95"
          >
            <Heart size={16} />
            <span>Mempelai</span>
          </a>
          <a
            href="#acara"
            className="flex flex-col items-center gap-0.5 text-stone-300 transition-transform hover:text-gold-300 active:scale-95"
          >
            <Calendar size={16} />
            <span>Acara</span>
          </a>
          <a
            href="#rsvp"
            className="-mt-6 flex flex-col items-center gap-0.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 p-3 font-bold text-white shadow-gold ring-4 ring-emerald-950 transition-transform active:scale-95"
          >
            <CheckCircle2 size={22} />
            <span className="text-[10px] tracking-wide">RSVP</span>
          </a>
          <a
            href="#lokasi"
            className="flex flex-col items-center gap-0.5 text-stone-300 transition-transform hover:text-gold-300 active:scale-95"
          >
            <MapPin size={16} />
            <span>Lokasi</span>
          </a>
          <a
            href="#hubungi"
            className="flex flex-col items-center gap-0.5 text-stone-300 transition-transform hover:text-gold-300 active:scale-95"
          >
            <Phone size={16} />
            <span>Hubungi</span>
          </a>
        </div>
      </div>
    </>
  );
}
