"use client";

import React, { useState, useEffect } from "react";
import { GuestWish } from "@/types/wedding";
import { formatTimeAgo } from "@/lib/utils";
import { MessageSquare, Heart, Send, User, Users, Loader2, Sparkles } from "lucide-react";

export default function GuestbookSection() {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes?limit=50");
      const data = await res.json();
      if (data.success && data.data) {
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
        setWishes([result.data, ...wishes]);
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

    // Optimistic UI update
    setLikedMap((prev) => ({ ...prev, [wishId]: true }));
    setWishes((prev) =>
      prev.map((w) =>
        w.id === wishId ? { ...w, likes_count: (w.likes_count || 0) + 1 } : w
      )
    );

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
      {/* Header */}
      <div className="mb-16 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Titipan Doa
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Buku Tetamu & Ucapan
        </h2>
        <div className="mb-4 flex items-center justify-center gap-3 text-gold-500">
          <span className="h-px w-12 bg-gold-300" />
          <MessageSquare size={16} className="text-gold-500" />
          <span className="h-px w-12 bg-gold-300" />
        </div>
        <p className="mx-auto max-w-md text-xs text-stone-600 sm:text-sm">
          Tinggalkan kata-kata manis, titipan doa restu atau pesanan ikhlas buat kedua
          mempelai.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Wish Form Column */}
        <div className="sticky top-24 rounded-3xl border border-gold-200 bg-white/95 p-6 shadow-card backdrop-blur-md sm:p-8 lg:col-span-5">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-emerald-950">
            <Sparkles size={18} className="text-gold-500" />
            <span>Kirimkan Ucapan Anda</span>
          </h3>

          {successToast && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
              <Heart size={14} className="fill-emerald-600 text-emerald-600" />
              <span>Ucapan anda telah berjaya dimuat naik!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="sender_name"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Nama Anda
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  id="sender_name"
                  required
                  placeholder="Nama penuh atau panggilan"
                  value={form.sender_name}
                  onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
                  className="w-full rounded-xl border border-gold-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-300 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="relationship"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Hubungan Dengan Pengantin
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                  <Users size={16} />
                </div>
                <select
                  id="relationship"
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="w-full cursor-pointer rounded-xl border border-gold-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-300 sm:text-sm"
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
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Ucapan & Doa Restu
              </label>
              <textarea
                id="wish_message"
                required
                rows={4}
                placeholder="Tuliskan ucapan tahniah atau doa anda di sini..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-gold-200 bg-white p-3 text-xs outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-300 sm:text-sm"
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
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-900 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-850 active:scale-95 disabled:opacity-70 sm:text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
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
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-stone-400">
              <Loader2 size={24} className="animate-spin text-gold-500" />
              <span className="text-xs">Memuat turun ucapan para tetamu...</span>
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-3xl border border-gold-200 bg-white/70 p-8 text-center text-sm text-stone-500">
              Belum ada ucapan lagi. Jadilah orang pertama mengirimkan doa buat mempelai!
            </div>
          ) : (
            <>
              <div className="space-y-3.5">
                {wishes.slice(0, visibleCount).map((wish) => (
                  <div
                    key={wish.id}
                    className="rounded-2xl border border-gold-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-gold-300"
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-base font-bold text-emerald-950">
                          {wish.sender_name}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-2">
                          {wish.relationship && (
                            <span className="rounded-full border border-gold-200/50 bg-gold-50 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                              {wish.relationship}
                            </span>
                          )}
                          <span className="text-[11px] text-stone-400">
                            {formatTimeAgo(wish.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Heart Like Button */}
                      <button
                        onClick={() => handleLike(wish.id)}
                        aria-label="Suka ucapan ini"
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${
                          likedMap[wish.id]
                            ? "border border-rose-200 bg-rose-50 text-rose-600"
                            : "border border-stone-200 bg-stone-50 text-stone-500 hover:bg-rose-50 hover:text-rose-500"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={
                            likedMap[wish.id] ? "fill-rose-500 text-rose-500" : ""
                          }
                        />
                        <span className="font-semibold">{wish.likes_count || 0}</span>
                      </button>
                    </div>

                    <p className="whitespace-pre-line text-xs leading-relaxed text-stone-700 sm:text-sm">
                      {wish.message}
                    </p>
                  </div>
                ))}
              </div>

              {visibleCount < wishes.length && (
                <div className="pt-4 text-center">
                  <button
                    onClick={loadMore}
                    className="shadow-xs rounded-full border border-gold-300 bg-white px-6 py-2.5 text-xs font-semibold text-stone-700 transition-colors hover:bg-gold-50"
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
