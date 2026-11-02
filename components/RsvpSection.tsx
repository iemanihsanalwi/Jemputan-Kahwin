"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useWeddingConfig } from "@/context/WeddingConfigContext";
import BotanicalCornerFlourish from "@/components/art/BotanicalCornerFlourish";
import BotanicalIconBadge from "@/components/art/BotanicalIconBadge";
import SectionHeader from "@/components/SectionHeader";
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

      // Trigger Confetti in champagne gold and sage olive colors
      if (formData.attendance_status === "hadir") {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#C5A059", "#7D8B74", "#556B2F"],
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
        <div className="relative overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-8 text-center shadow-xs">
          <BotanicalCornerFlourish position="all" size={36} variant="gold" />
          <h2 className="font-serif text-2xl font-bold text-[#2D3748] sm:text-3xl">Pendaftaran RSVP Ditutup</h2>
          <p className="mt-2 text-[#556377] text-sm">Pendaftaran kehadiran secara dalam talian bagi majlis ini telah ditutup. Terima kasih atas sokongan dan doa tulus anda.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Strictly-Centered Section Header */}
      <SectionHeader
        eyebrow="PENGESAHAN KEHADIRAN"
        title="Borang RSVP"
        subtitle={
          <p>
            Sila sahkan kehadiran anda selewat-lewatnya{" "}
            <strong className="text-[#2D3748] font-bold">
              {rsvp?.deadlineDisplay || rsvp?.deadline || "1 Mac 2027"}
            </strong>{" "}
            bagi memudahkan urusan persiapan hidangan meja makan.
          </p>
        }
        dividerVariant="gold"
      />

      <div className="relative overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#FDFBF7] p-6 shadow-xs sm:p-10">
        <BotanicalCornerFlourish position="all" size={42} variant="gold" />

        {/* Decorative Top Accent */}
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        {isSubmitted && submittedData ? (
          /* Success Screen */
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex justify-center">
              <BotanicalIconBadge size="lg" variant="sage">
                <CheckCircle2 size={36} className="text-[#556B2F]" />
              </BotanicalIconBadge>
            </div>

            <h3 className="mb-2 font-serif text-2xl font-bold text-[#2D3748] sm:text-3xl">
              Terima Kasih, {submittedData.guest_name}!
            </h3>

            <p className="mx-auto mb-6 max-w-lg text-sm text-[#556377] sm:text-base">
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

            <div className="mx-auto mb-8 max-w-sm space-y-2 rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] p-4 text-left text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-[#556377]">Status Kehadiran:</span>
                <span className="font-semibold capitalize text-[#2D3748]">
                  {submittedData.attendance_status === "hadir" ? "Hadir" : "Tidak Hadir"}
                </span>
              </div>
              {submittedData.attendance_status === "hadir" && (
                <div className="flex justify-between">
                  <span className="text-[#556377]">Bilangan Tetamu:</span>
                  <span className="font-semibold text-[#2D3748]">
                    {submittedData.attendees_count} Orang
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#556377]">Nombor Telefon:</span>
                <span className="font-semibold text-[#2D3748]">
                  {submittedData.phone_number}
                </span>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="rounded-full border border-[#E8E2D8] bg-[#FAF7F2] px-7 py-2.5 text-xs font-semibold text-[#2D3748] shadow-xs transition-colors hover:border-[#C5A059] hover:bg-white sm:text-sm active:scale-95 cursor-pointer"
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
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]">
                <span>Adakah Anda Akan Hadir?</span>
                <span className="text-[#C5A059]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance_status: "hadir" })}
                  className={`relative flex items-center justify-center min-h-[48px] gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden active:scale-98 ${
                    formData.attendance_status === "hadir"
                      ? "border-[#556B2F] bg-[#F4F6F2] text-[#2D3748] shadow-xs ring-2 ring-[#556B2F]/30"
                      : "border-[#E8E2D8] bg-[#FAF7F2] text-[#556377] hover:border-[#C5A059]"
                  }`}
                >
                  <CheckCircle2
                    size={18}
                    className={
                      formData.attendance_status === "hadir"
                        ? "text-[#556B2F]"
                        : "text-[#718096]"
                    }
                  />
                  <span>Ya, Saya Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, attendance_status: "tidak_hadir" })
                  }
                  className={`relative flex items-center justify-center min-h-[48px] gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden active:scale-98 ${
                    formData.attendance_status === "tidak_hadir"
                      ? "border-[#B87B7B] bg-[#FAF2F2] text-[#2D3748] shadow-xs ring-2 ring-[#B87B7B]/30"
                      : "border-[#E8E2D8] bg-[#FAF7F2] text-[#556377] hover:border-[#C5A059]"
                  }`}
                >
                  <XCircle
                    size={18}
                    className={
                      formData.attendance_status === "tidak_hadir"
                        ? "text-[#B87B7B]"
                        : "text-[#718096]"
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
                className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                <span>Nama Penuh</span>
                <span className="text-[#C5A059]">*</span>
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#718096]">
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
                  className="w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm font-medium text-[#2D3748] placeholder-[#718096]/60 outline-none transition focus:border-[#C5A059] focus:bg-white shadow-xs"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                <span>Nombor Telefon (WhatsApp)</span>
                <span className="text-[#C5A059]">*</span>
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#718096]">
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
                  className="w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm font-medium text-[#2D3748] placeholder-[#718096]/60 outline-none transition focus:border-[#C5A059] focus:bg-white shadow-xs"
                />
              </div>
            </div>

            {/* Number of Pax */}
            {formData.attendance_status === "hadir" && (
              <div>
                <label className="mb-1.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]">
                  <span>Bilangan Kehadiran (Termasuk Anda)</span>
                  <span className="text-[#C5A059]">*</span>
                </label>
                <div className="relative group">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#718096]">
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
                    className="w-full cursor-pointer rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm font-medium text-[#2D3748] outline-none transition focus:border-[#C5A059] focus:bg-white shadow-xs"
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

            {/* Special Remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="mb-1.5 block text-xs font-bold uppercase tracking-[0.18em] text-[#7D8B74]"
              >
                Catatan / Keperluan Khas / Ucapan Ringkas (Pilihan)
              </label>
              <div className="relative group">
                <div className="pointer-events-none absolute left-3 top-3 text-[#718096]">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="remarks"
                  rows={3}
                  placeholder="Contoh: Vegetarian / alahan makanan / ucapan tahniah..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] py-3 pl-10 pr-4 text-sm font-medium text-[#2D3748] placeholder-[#718096]/60 outline-none transition focus:border-[#C5A059] focus:bg-white shadow-xs"
                />
              </div>
            </div>

            {/* Anti-spam Honeypot field */}
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
              className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#C5A059]/40 bg-gradient-to-r from-[#556B2F] via-[#7D8B74] to-[#556B2F] py-3.5 text-sm font-bold text-[#FAF7F2] shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-98 disabled:opacity-70 sm:text-base cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-[#FAF7F2]" />
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
