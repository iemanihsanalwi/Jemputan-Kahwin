"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RsvpSubmission, GuestWish } from "@/types/wedding";
import { weddingConfig } from "@/config/wedding";
import { exportToCsv, formatMalayDate, formatTimeAgo } from "@/lib/utils";
import {
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Search,
  RefreshCw,
  ArrowLeft,
  LogOut,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import WeddingConfigEditor from "@/components/admin/WeddingConfigEditor";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<"config" | "rsvp" | "wishes">("config");

  const [rsvps, setRsvps] = useState<RsvpSubmission[]>([]);
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "hadir" | "tidak_hadir">(
    "all"
  );

  // Check stored auth on load
  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_auth_token");
    if (savedToken) {
      setIsAuthenticated(true);
      setPinInput(savedToken);
      fetchAdminData(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setPinError(data.error || "PIN tidak tepat.");
        return;
      }

      sessionStorage.setItem("admin_auth_token", pinInput);
      setIsAuthenticated(true);
      fetchAdminData(pinInput);
    } catch {
      setPinError("Ralat semasa log masuk.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth_token");
    setIsAuthenticated(false);
    setPinInput("");
  };

  const fetchAdminData = async (pin: string) => {
    setLoading(true);
    try {
      // Fetch RSVPs with admin header
      const resRsvp = await fetch("/api/rsvp", {
        headers: { "x-admin-pin": pin },
      });
      const dataRsvp = await resRsvp.json();
      if (dataRsvp.success && dataRsvp.data) {
        setRsvps(dataRsvp.data);
      }

      // Fetch wishes
      const resWishes = await fetch("/api/wishes?limit=100");
      const dataWishes = await resWishes.json();
      if (dataWishes.success && dataWishes.data) {
        setWishes(dataWishes.data);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Analytics Computations
  const totalResponses = rsvps.length;
  const hadirCount = rsvps.filter((r) => r.attendance_status === "hadir").length;
  const totalPaxHadir = rsvps
    .filter((r) => r.attendance_status === "hadir")
    .reduce((sum, r) => sum + (r.attendees_count || 1), 0);
  const tidakHadirCount = rsvps.filter(
    (r) => r.attendance_status === "tidak_hadir"
  ).length;
  const attendanceRate =
    totalResponses > 0 ? Math.round((hadirCount / totalResponses) * 100) : 0;

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone_number.includes(searchQuery);
    const matchesStatus =
      statusFilter === "all" ? true : r.attendance_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCsv = () => {
    const exportRows = rsvps.map((r, index) => ({
      No: index + 1,
      Nama_Tetamu: r.guest_name,
      Nombor_Telefon: r.phone_number,
      Status_Kehadiran: r.attendance_status === "hadir" ? "Hadir" : "Tidak Hadir",
      Bilangan_Pax: r.attendance_status === "hadir" ? r.attendees_count : 0,
      Catatan: r.remarks || "-",
      Tarikh_Dihantar: r.created_at
        ? new Date(r.created_at).toLocaleString("ms-MY")
        : "-",
    }));

    exportToCsv(
      `RSVP-Walimatulurus-${weddingConfig.couple.groom.shortName}-${weddingConfig.couple.bride.shortName}.csv`,
      exportRows
    );
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-parchment p-4">
        <div className="w-full max-w-md rounded-3xl border border-gold-300 bg-white/95 p-8 text-center shadow-gold backdrop-blur-md sm:p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <Lock size={30} />
          </div>

          <h1 className="mb-1 font-serif text-2xl font-bold text-emerald-950">
            Portal Urusetia
          </h1>
          <p className="mb-6 text-xs text-stone-500">
            Sila masukkan nombor PIN keselamatan untuk mengakses maklumat tetamu.
          </p>

          {pinError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              {pinError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                required
                maxLength={10}
                placeholder="Masukkan PIN (Default: 123456)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full rounded-xl border border-gold-300 py-3 text-center font-mono text-lg tracking-widest outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 py-3.5 text-sm font-bold text-white shadow-gold transition-all hover:from-gold-600 hover:to-gold-700 active:scale-95"
            >
              <Unlock size={16} />
              <span>Buka Papan Pemuka</span>
            </button>
          </form>

          <div className="mt-6 border-t border-stone-200 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 transition-colors hover:text-gold-700"
            >
              <ArrowLeft size={14} />
              <span>Kembali ke Laman Utama</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-20">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-gold-400/30 bg-emerald-950 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-white/10 p-2 transition-colors hover:bg-white/20"
              title="Kembali ke laman jemputan"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-serif text-lg font-bold text-gold-200 sm:text-xl">
                Papan Pemuka Majlis
              </h1>
              <p className="text-[11px] text-stone-300">
                {weddingConfig.couple.groom.shortName} &{" "}
                {weddingConfig.couple.bride.shortName} • {weddingConfig.event.dateDisplay}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchAdminData(pinInput)}
              className="rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              title="Muat semula data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-900/60 px-3 py-1.5 text-xs font-medium text-rose-200 transition-colors hover:bg-rose-900"
            >
              <LogOut size={14} />
              <span>Log Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Statistics Analytics Row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="shadow-xs rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Jumlah Respons
              </span>
              <Users size={18} className="text-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-950">
              {totalResponses}
            </p>
            <span className="text-[11px] text-stone-500">Penyertaan RSVP</span>
          </div>

          <div className="shadow-xs rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Jumlah Pax Hadir
              </span>
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-600">
              {totalPaxHadir}
            </p>
            <span className="text-[11px] text-stone-500">
              Daripada {hadirCount} jemputan sah
            </span>
          </div>

          <div className="shadow-xs rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tidak Hadir
              </span>
              <XCircle size={18} className="text-rose-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-rose-600">
              {tidakHadirCount}
            </p>
            <span className="text-[11px] text-stone-500">Memohon kemaafan</span>
          </div>

          <div className="shadow-xs rounded-2xl border border-stone-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between text-stone-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                Kadar Kehadiran
              </span>
              <Calendar size={18} className="text-emerald-700" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-950">
              {attendanceRate}%
            </p>
            <span className="text-[11px] text-stone-500">Nisbah Hadir vs Respons</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center rounded-2xl bg-stone-200/70 p-1">
            <button
              onClick={() => setActiveTab("config")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === "config"
                  ? "shadow-xs bg-white text-emerald-950"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <SlidersHorizontal size={15} />
              <span>Konfigurasi Majlis (No-Code)</span>
            </button>
            <button
              onClick={() => setActiveTab("rsvp")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === "rsvp"
                  ? "shadow-xs bg-white text-emerald-950"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Senarai RSVP ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveTab("wishes")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === "wishes"
                  ? "shadow-xs bg-white text-emerald-950"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Buku Tetamu ({wishes.length})
            </button>
          </div>

          {activeTab === "rsvp" && (
            <button
              onClick={handleExportCsv}
              className="shadow-xs flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-850 active:scale-95"
            >
              <Download size={15} />
              <span>Eksport ke CSV</span>
            </button>
          )}
        </div>

        {/* Tab 1: Configuration Editor */}
        {activeTab === "config" && (
          <WeddingConfigEditor pin={pinInput} />
        )}

        {/* Tab 1: RSVP List */}
        {activeTab === "rsvp" && (
          <div className="shadow-xs overflow-hidden rounded-3xl border border-stone-200 bg-white">
            {/* Filter & Search Bar */}
            <div className="flex flex-col items-center justify-between gap-4 border-b border-stone-200 p-4 sm:flex-row sm:p-5">
              <div className="relative w-full sm:w-80">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  placeholder="Cari nama atau nombor telefon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 py-2 pl-9 pr-4 text-xs outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-300 sm:text-sm"
                />
              </div>

              {/* Status Filter buttons */}
              <div className="flex w-full items-center gap-1.5 overflow-x-auto pb-1 sm:w-auto sm:pb-0">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    statusFilter === "all"
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setStatusFilter("hadir")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    statusFilter === "hadir"
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  Hadir
                </button>
                <button
                  onClick={() => setStatusFilter("tidak_hadir")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    statusFilter === "tidak_hadir"
                      ? "bg-rose-700 text-white"
                      : "bg-rose-50 text-rose-800 hover:bg-rose-100"
                  }`}
                >
                  Tidak Hadir
                </button>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    <th className="px-4 py-3">Nama Tetamu</th>
                    <th className="px-4 py-3">No. Telefon</th>
                    <th className="px-4 py-3">Kehadiran</th>
                    <th className="px-4 py-3">Pax</th>
                    <th className="px-4 py-3">Catatan / Mesej</th>
                    <th className="px-4 py-3">Masa Dihantar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-stone-400">
                        Tiada maklumat RSVP yang sepadan.
                      </td>
                    </tr>
                  ) : (
                    filteredRsvps.map((rsvp, idx) => (
                      <tr
                        key={rsvp.id || idx}
                        className="transition-colors hover:bg-gold-50/40"
                      >
                        <td className="px-4 py-3.5 font-semibold text-stone-900">
                          {rsvp.guest_name}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-stone-600">
                          {rsvp.phone_number}
                        </td>
                        <td className="px-4 py-3.5">
                          {rsvp.attendance_status === "hadir" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                              <CheckCircle2 size={12} />
                              <span>Hadir</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-800">
                              <XCircle size={12} />
                              <span>Tidak Hadir</span>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-stone-800">
                          {rsvp.attendance_status === "hadir"
                            ? `${rsvp.attendees_count} orang`
                            : "-"}
                        </td>
                        <td className="max-w-xs truncate px-4 py-3.5 text-stone-600">
                          {rsvp.remarks || "-"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-xs text-stone-400">
                          {rsvp.created_at ? formatTimeAgo(rsvp.created_at) : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Wishes Moderation */}
        {activeTab === "wishes" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="shadow-xs flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5"
              >
                <div>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-base font-bold text-emerald-950">
                        {wish.sender_name}
                      </h4>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="rounded-md border border-gold-200/50 bg-gold-50 px-2 py-0.5 text-[11px] font-medium text-gold-700">
                          {wish.relationship || "Tetamu"}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {formatTimeAgo(wish.created_at)}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        wish.is_approved
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {wish.is_approved ? "Diluluskan" : "Disekat"}
                    </span>
                  </div>

                  <p className="my-3 rounded-xl border border-stone-100 bg-stone-50 p-3 text-xs leading-relaxed text-stone-700 sm:text-sm">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-xs text-stone-500">
                  <span>{wish.likes_count || 0} tanda suka</span>
                  <span className="text-[11px] text-stone-400">
                    {formatMalayDate(wish.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
