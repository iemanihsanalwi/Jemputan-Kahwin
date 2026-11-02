"use client";

import React, { useState, useEffect } from "react";
import { GuestWish } from "@/types/wedding";
import { formatTimeAgo } from "@/lib/utils";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import SectionHeader from "@/components/SectionHeader";
import { Heart, Send, User, Users, Loader2, Sparkles } from "lucide-react";

// Client-side cache with 60s staleTime to prevent spamming Supabase read endpoints
let cachedWishes: GuestWish[] | null = null;
let lastFetchTime = 0;
const STALE_TIME = 60 * 1000;

export default function GuestbookSection() {
  const [wishes, setWishes] = useState<GuestWish[]>(cachedWishes || []);
  const [loading, setLoading] = useState<boolean>(!cachedWishes);
  const [submitting, setSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [successToast, setSuccessToast] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [form, setForm] = useState({
    sender_name: "",
    relationship: "Keluarga",
    message: "",
    honeypot: "",
  });

  const fetchWishes = async (force = false) => {
    // Aggressive client-side caching check
    if (!force && cachedWishes && Date.now() - lastFetchTime < STALE_TIME) {
      setWishes(cachedWishes);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/wishes?limit=50");
      const data = await res.json();
      if (data.success && data.data) {
        cachedWishes = data.data;
        lastFetchTime = Date.now();
        setWishes(data.data);
      }
    } catch (err) {
      console.error("Error loading wishes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sender_name.trim() || !form.message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success && result.data) {
        const updated = [result.data, ...wishes];
        cachedWishes = updated;
        lastFetchTime = Date.now();
        setWishes(updated);
        setForm({
          sender_name: "",
          relationship: "Keluarga",
          message: "",
          honeypot: "",
        });
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 3500);
      }
    } catch (err) {
      console.error("Failed to post wish:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (wishId: string) => {
    if (likedMap[wishId]) return;

    setLikedMap((prev) => ({ ...prev, [wishId]: true }));
    const updated = wishes.map((w) =>
      w.id === wishId ? { ...w, likes_count: (w.likes_count || 0) + 1 } : w
    );
    cachedWishes = updated;
    setWishes(updated);

    try {
      await fetch(`/api/wishes/${wishId}/like`, { method: "POST" });
    } catch (err) {
      console.error("Error liking wish:", err);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="ucapan" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      {/* Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="TITIPAN KASIH &amp; UCAPAN"
        title="Buku Tetamu &amp; Ucapan"
        subtitle="Tinggalkan kata-kata manis, titipan doa restu atau pesanan ikhlas buat kedua mempelai."
        dividerVariant="gold"
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Wish Form Column */}
        <div className="relative sticky top-24 rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs sm:p-8 lg:col-span-5">
          <BotanicalCornerFlourish position="all" size={32} variant="gold" />

          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-[#2D3748]">
            <Sparkles size={18} className="text-[#C5A059]" />
            <span>Kirimkan Ucapan Anda</span>
          </h3>

          {successToast && (
            <div className="mb-4 flex items-center gap-2 rounded-2xl border border-[#E8E2D8] bg-[#F4F6F2] p-3 text-xs text-[#556B2F]">
              <Heart size={14} className="fill-[#556B2F] text-[#556B2F]" />
              <span>Ucapan anda telah berjaya dimuat naik!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="sender_name"
                className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                Nama Anda
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#718096]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  id="sender_name"
                  required
                  placeholder="Nama penuh atau panggilan"
                  value={form.sender_name}
                  onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
                  className="w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-2.5 pl-9 pr-3 text-xs text-[#2D3748] placeholder-[#718096]/60 outline-none transition focus:border-[#C5A059] focus:bg-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="relationship"
                className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                Hubungan Dengan Pengantin
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#718096]">
                  <Users size={16} />
                </div>
                <select
                  id="relationship"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="w-full cursor-pointer rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-2.5 pl-9 pr-3 text-xs text-[#2D3748] outline-none transition focus:border-[#C5A059] focus:bg-white sm:text-sm"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat Pengantin Lelaki">
                    Sahabat Pengantin Lelaki
                  </option>
                  <option value="Sahabat Pengantin Perempuan">
                    Sahabat Pengantin Perempuan
                  </option>
                  <option value="Rakan Sekerja">Rakan Sekerja</option>
                  <option value="Jiran Tetangga">Jiran Tetangga</option>
                  <option value="Tetamu Kehormat">Tetamu Kehormat</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="wish_message"
                className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                id="wish_message"
                required
                rows={4}
                placeholder="Tuliskan ucapan tahniah atau doa anda di sini..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-3 text-xs text-[#2D3748] placeholder-[#718096]/60 outline-none transition focus:border-[#C5A059] focus:bg-white sm:text-sm"
              />
            </div>

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              className="hidden"
            />

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] py-3 text-xs font-semibold text-[#FAF7F2] shadow-xs transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-70 sm:text-sm cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#FAF7F2]" />
                  <span>Sedang Mengirim...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Kirimkan Ucapan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List Column */}
        <div className="space-y-4 lg:col-span-7">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-[#718096]">
              <Loader2 size={24} className="animate-spin text-[#C5A059]" />
              <span className="text-xs">Memuat turun ucapan para tetamu...</span>
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-8 text-center text-sm text-[#718096]">
              Belum ada ucapan lagi. Jadilah orang pertama mengirimkan doa buat mempelai!
            </div>
          ) : (
            <>
              <div className="space-y-3.5">
                {wishes.slice(0, visibleCount).map((wish) => (
                  <div
                    key={wish.id}
                    className="rounded-2xl border border-[#E8E2D8] bg-[#FDFBF7] p-5 shadow-xs transition-all hover:border-[#C5A059]"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#2D3748]">
                          {wish.sender_name}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-2">
                          {wish.relationship && (
                            <span className="rounded-full border border-[#E8E2D8] bg-[#F4F6F2] px-2.5 py-0.5 text-[11px] font-medium text-[#556B2F]">
                              {wish.relationship}
                            </span>
                          )}
                          <span className="text-[11px] text-[#718096]">
                            {formatTimeAgo(wish.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Heart Like Button */}
                      <button
                        onClick={() => handleLike(wish.id)}
                        aria-label="Suka ucapan ini"
                        className={`flex items-center justify-center min-h-[36px] gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all active:scale-95 cursor-pointer ${
                          likedMap[wish.id]
                            ? "border border-[#C5A059] bg-[#FFF8EE] text-[#C5A059]"
                            : "border border-[#E8E2D8] bg-[#FAF7F2] text-[#556377] hover:border-[#C5A059] hover:text-[#2D3748]"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={
                            likedMap[wish.id] ? "fill-[#C5A059] text-[#C5A059]" : ""
                          }
                        />
                        <span className="font-semibold">{wish.likes_count || 0}</span>
                      </button>
                    </div>

                    <p className="whitespace-pre-line text-xs leading-relaxed text-[#2D3748] sm:text-sm">
                      {wish.message}
                    </p>
                  </div>
                ))}
              </div>

              {visibleCount < wishes.length && (
                <div className="pt-4 text-center">
                  <button
                    onClick={loadMore}
                    className="flex items-center justify-center min-h-[44px] mx-auto rounded-full border border-[#E8E2D8] bg-[#FDFBF7] px-7 py-2.5 text-xs font-semibold text-[#2D3748] transition-all hover:border-[#C5A059] hover:bg-white active:scale-98 shadow-xs cursor-pointer"
                  >
                    Muat Turun Lagi ({wishes.length - visibleCount} ucapan)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
