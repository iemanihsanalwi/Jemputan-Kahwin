"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import ArabesqueCorner from "@/components/art/ArabesqueCorner";
import FloralDivider from "@/components/art/FloralDivider";
import {
  CheckCircle2,
  XCircle,
  Users,
  Phone,
  User,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";

export default function RsvpSection() {
  const weddingConfig = useWeddingConfig();
  const { rsvp } = weddingConfig;

  const [formData, setFormData] = useState({
    guest_name: "",
    phone_number: "",
    attendance_status: "hadir" as "hadir" | "tidak_hadir",
    attendees_count: 2,
    remarks: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const maxPax = rsvp?.maxPaxPerGuest || 5;
  const paxOptions = Array.from({ length: maxPax }, (_, i) => i + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghantar RSVP.");
      }

      // Trigger Confetti if attending
      if (formData.attendance_status === "hadir") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#1B4D3E", "#FAF7EE", "#E6CA65"],
        });
      }

      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ralat tidak dijangka. Sila cuba lagi.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      guest_name: "",
      phone_number: "",
      attendance_status: "hadir",
      attendees_count: 2,
      remarks: "",
      honeypot: "",
    });
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  if (rsvp?.enabled === false) {
    return (
      <section id="rsvp" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gold-300/80 bg-white/95 p-8 text-center shadow-gold backdrop-blur-md">
          <ArabesqueCorner position="all" size={36} />
          <h2 className="font-serif text-2xl font-bold text-emerald-950 sm:text-3xl">Pendaftaran RSVP Ditutup</h2>
          <p className="mt-2 text-stone-600 text-sm">Pendaftaran kehadiran secara dalam talian bagi majlis ini telah ditutup. Terima kasih atas sokongan dan doa tulus anda.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gold-700">
          Pengesahan Kehadiran
        </span>
        <h2 className="mb-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl md:text-5xl">
          Borang RSVP
        </h2>
        <FloralDivider size="md" />
        <p className="mx-auto max-w-md text-xs text-stone-600 sm:text-sm">
          Sila sahkan kehadiran anda selewat-lewatnya{" "}
          <strong className="text-emerald-950 font-bold">
            {rsvp?.deadlineDisplay || rsvp?.deadline || "1 Mac 2027"}
          </strong>{" "}
          bagi memudahkan urusan persiapan hidangan meja makan.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gold-300/80 bg-white/95 p-6 shadow-gold backdrop-blur-md sm:p-10">
        <ArabesqueCorner position="all" size={42} />

        {/* Decorative Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

        {isSubmitted && submittedData ? (
          /* Success Screen */
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="mb-2 font-serif text-2xl font-bold text-emerald-950 sm:text-3xl">
              Terima Kasih, {submittedData.guest_name}!
            </h3>

            <p className="mx-auto mb-6 max-w-lg text-sm text-stone-600 sm:text-base">
              {submittedData.attendance_status === "hadir" ? (
                <>
                  Maklumat kehadiran anda ({submittedData.attendees_count} orang) telah
                  berjaya direkodkan. Kami sekeluarga tidak sabar menyambut kedatangan
                  anda!
                </>
              ) : (
                <>
                  Terima kasih atas maklum balas anda. Walaupun tidak dapat bersama, doa
                  dan ingatan tulus anda amat kami hargai.
                </>
              )}
            </p>

            <div className="mx-auto mb-8 max-w-sm space-y-2 rounded-2xl border border-gold-200 bg-champagne-50 p-4 text-left text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Status Kehadiran:</span>
                <span className="font-semibold capitalize text-emerald-900">
                  {submittedData.attendance_status === "hadir" ? "Hadir" : "Tidak Hadir"}
                </span>
              </div>
              {submittedData.attendance_status === "hadir" && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Bilangan Tetamu:</span>
                  <span className="font-semibold text-emerald-900">
                    {submittedData.attendees_count} Orang
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Nombor Telefon:</span>
                <span className="font-semibold text-emerald-900">
                  {submittedData.phone_number}
                </span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="rounded-full border border-gold-400 px-6 py-2.5 text-xs font-semibold text-gold-900 transition-colors hover:bg-gold-50 sm:text-sm active:scale-95"
            >
              Hantar RSVP Untuk Tetamu Lain
            </button>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 sm:text-sm">
                <XCircle size={18} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Attendance Toggle */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-700">
                Adakah Anda Akan Hadir? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance_status: "hadir" })}
                  className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all ${
                    formData.attendance_status === "hadir"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm"
                      : "border-stone-200 bg-stone-50/50 text-stone-600 hover:border-gold-300"
                  }`}
                >
                  <CheckCircle2
                    size={18}
                    className={
                      formData.attendance_status === "hadir"
                        ? "text-emerald-600"
                        : "text-stone-400"
                    }
                  />
                  <span>Ya, Saya Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, attendance_status: "tidak_hadir" })
                  }
                  className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-all ${
                    formData.attendance_status === "tidak_hadir"
                      ? "border-rose-500 bg-rose-50 text-rose-900 shadow-sm"
                      : "border-stone-200 bg-stone-50/50 text-stone-600 hover:border-gold-300"
                  }`}
                >
                  <XCircle
                    size={18}
                    className={
                      formData.attendance_status === "tidak_hadir"
                        ? "text-rose-500"
                        : "text-stone-400"
                    }
                  />
                  <span>Tidak Dapat Hadir</span>
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div>
              <label
                htmlFor="guest_name"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Nama Penuh <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="guest_name"
                  required
                  placeholder="Contoh: Encik Ahmad Faizal & Isteri"
                  value={formData.guest_name}
                  onChange={(e) =>
                    setFormData({ ...formData, guest_name: e.target.value })
                  }
                  className="w-full rounded-xl border border-gold-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200/50"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Nombor Telefon (WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  id="phone_number"
                  required
                  placeholder="Contoh: 0123456789"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  className="w-full rounded-xl border border-gold-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200/50"
                />
              </div>
            </div>

            {/* Number of Pax (Only shown if attending) */}
            {formData.attendance_status === "hadir" && (
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Bilangan Kehadiran (Termasuk Anda){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                    <Users size={18} />
                  </div>
                  <select
                    value={formData.attendees_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendees_count: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full cursor-pointer rounded-xl border border-gold-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-800 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200/50"
                  >
                    {paxOptions.map((num) => (
                      <option key={num} value={num}>
                        {num} Orang Tetamu
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Special Remarks / Dietary / Wishes */}
            <div>
              <label
                htmlFor="remarks"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
              >
                Catatan / Keperluan Khas / Ucapan Ringkas (Pilihan)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3 text-stone-400">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="remarks"
                  rows={3}
                  placeholder="Contoh: Vegetarian / alahan makanan / ucapan tahniah..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full rounded-xl border border-gold-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200/50"
                />
              </div>
            </div>

            {/* Anti-spam Honeypot field (hidden from humans) */}
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="active:scale-98 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 py-4 text-sm font-bold text-white shadow-gold transition-all duration-300 hover:from-gold-600 hover:to-gold-800 disabled:opacity-70 sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sedang Menghantar...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Hantar Pengesahan RSVP</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
