"use client";

import React, { useState, useEffect, useCallback } from "react";
import { WeddingConfig, EventScheduleItem, ContactPerson, WishlistItem } from "@/types/wedding";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Save,
  Download,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  Music,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Phone,
  CreditCard,
  Gift,
  Globe,
  AlertCircle,
} from "lucide-react";

interface WeddingConfigEditorProps {
  pin: string;
}

export default function WeddingConfigEditor({ pin }: WeddingConfigEditorProps) {
  const [config, setConfig] = useState<WeddingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const [activeSection, setActiveSection] = useState<
    "couple" | "event" | "venue" | "audio" | "schedule" | "rsvp_contacts" | "salamKaut" | "wishlist" | "seo"
  >("couple");

  // Fetch latest configuration from Supabase on initial render
  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // 1. Try directly fetching from Supabase wedding_config table (row id = 1)
      if (isSupabaseConfigured && supabase) {
        const { data: supaData, error: supaErr } = await supabase
          .from("wedding_config")
          .select("config")
          .eq("id", 1)
          .maybeSingle();

        if (!supaErr && supaData?.config) {
          setConfig(supaData.config as WeddingConfig);
          setLoading(false);
          return;
        }
      }

      // 2. Fallback to API route (which also queries Supabase / local backup)
      const res = await fetch("/api/admin/config", {
        headers: { "x-admin-pin": pin },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal memuat konfigurasi.");
      }
      setConfig(data.data);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Ralat memuat turun tetapan."
      );
    } finally {
      setLoading(false);
    }
  }, [pin]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Save changes dynamically to Supabase
  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      let savedDirectly = false;

      // 1. Execute direct Supabase upsert (row id = 1)
      if (isSupabaseConfigured && supabase) {
        const { error: supaError } = await supabase
          .from("wedding_config")
          .upsert(
            {
              id: 1,
              config: config,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

        if (!supaError) {
          savedDirectly = true;
        } else {
          console.warn("Direct Supabase save warning:", supaError.message);
        }
      }

      // 2. Also execute save via server API route (for admin PIN authorization & fallback)
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (!savedDirectly) {
          throw new Error(data.error || "Gagal menyimpan konfigurasi ke Supabase.");
        }
      }

      // Trigger success state and live toast
      setSaveSuccess(true);
      setToast({
        show: true,
        type: "success",
        message: "Konfigurasi berjaya disimpan ke pangkalan data Supabase! Perubahan kini aktif serta-merta di laman web.",
      });

      setTimeout(() => {
        setSaveSuccess(false);
        setToast((prev) => ({ ...prev, show: false }));
      }, 4500);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Ralat semasa menyimpan ke Supabase.";
      setErrorMessage(errorMsg);
      setToast({
        show: true,
        type: "error",
        message: errorMsg,
      });
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  // Export as wedding.config.json file download
  const handleExportJson = () => {
    if (!config) return;
    const jsonStr = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy raw JSON to clipboard
  const handleCopyJson = () => {
    if (!config) return;
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-stone-500">
        <RefreshCw size={28} className="animate-spin text-gold-600 mb-3" />
        <p className="text-sm">Sedang memuat turun data konfigurasi majlis...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
        <AlertCircle size={32} className="mx-auto mb-2 text-rose-500" />
        <p className="font-semibold">Konfigurasi tidak dapat dimuatkan.</p>
        <p className="text-xs mt-1 text-rose-600">{errorMessage || "Sila periksa sambungan atau PIN pentadbir."}</p>
        <button
          onClick={fetchConfig}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
        >
          Cuba Semula
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold-200/80 bg-white p-5 shadow-sm">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#3D2429] sm:text-2xl">
            Editor Konfigurasi Majlis (No-Code)
          </h2>
          <p className="text-xs text-stone-500">
            Kemaskini maklumat pengantin, lokasi, waktu, dan media secara langsung tanpa menyentuh kod.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
            title="Buka jemputan di tab baru"
          >
            <Eye size={14} className="text-[#B56576]" />
            <span>Pratonton Laman</span>
            <ExternalLink size={12} className="opacity-60" />
          </a>

          <button
            type="button"
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
            title="Salin JSON ke papan keratan"
          >
            {copiedJson ? (
              <>
                <Check size={14} className="text-[#C56D7E]" />
                <span className="text-[#B56576]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-gold-700" />
                <span>Salin JSON</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 rounded-xl border border-gold-300 bg-champagne-50 px-3.5 py-2 text-xs font-semibold text-stone-800 transition hover:bg-gold-100"
            title="Muat turun wedding.config.json"
          >
            <Download size={14} className="text-gold-700" />
            <span>Eksport JSON</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-95 active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw size={14} className="animate-spin text-gold-300" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={14} className="text-gold-300" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Live Toast Notification (Visible anywhere on screen) */}
      {toast.show && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "border border-[#D4A373]/80 bg-[#3D2429]/90 text-white shadow-rose"
              : "border border-rose-400/80 bg-rose-950/90 text-white shadow-rose-900/30"
          }`}
        >
          {toast.type === "success" ? (
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#D88A96] text-white">
              <Check size={16} />
            </div>
          ) : (
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
              <AlertCircle size={16} />
            </div>
          )}
          <div className="text-xs sm:text-sm font-medium pr-2">
            {toast.message}
          </div>
          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="text-stone-300 hover:text-white text-xs opacity-70 hover:opacity-100 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Inline Notifications */}
      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-[#EAD5D5] bg-[#FFF8F8] p-4 text-xs font-semibold text-[#4A2E35] animate-fadeIn">
          <Check size={16} className="text-[#C56D7E] flex-shrink-0" />
          <span>Tetapan perkahwinan telah berjaya disimpan ke pangkalan data Supabase! Perubahan kini aktif serta-merta di laman web.</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        {[
          { id: "couple", label: "Mempelai & Pasangan", icon: Heart },
          { id: "event", label: "Maklumat Acara", icon: Calendar },
          { id: "venue", label: "Lokasi & Peta", icon: MapPin },
          { id: "audio", label: "Lagu Latar (Audio)", icon: Music },
          { id: "schedule", label: "Tentatif Majlis", icon: Clock },
          { id: "rsvp_contacts", label: "RSVP & Hubungi", icon: Phone },
          { id: "salamKaut", label: "Salam Kaut Digital", icon: CreditCard },
          { id: "wishlist", label: "Senarai Hadiah", icon: Gift },
          { id: "seo", label: "Metadata & SEO", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-[#3D2429] text-gold-300 shadow-sm"
                  : "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
              }`}
            >
              <Icon size={14} className={isActive ? "text-gold-400" : "text-stone-400"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: BRIDE & GROOM */}
      {activeSection === "couple" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
              <Heart size={18} className="text-gold-600" />
              <span>Nota Jemputan Pihak Keluarga</span>
            </h3>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Kapsyen Undangan Keluarga
              </label>
              <input
                type="text"
                value={config.couple.familySideNote || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    couple: { ...config.couple, familySideNote: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900 focus:border-gold-500 focus:ring-1 focus:ring-gold-400"
                placeholder="cth: Walimatulurus Pihak Pengantin Lelaki & Perempuan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom Details */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif text-base font-bold text-[#3D2429] flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#D88A96]" />
                  <span>Pengantin Lelaki (Groom)</span>
                </h3>
                <span className="text-[11px] font-semibold text-gold-700 uppercase">Raja Sehari</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Panggilan (Short Name)</label>
                <input
                  type="text"
                  value={config.couple.groom.shortName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, shortName: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Penuh (Full Name)</label>
                <input
                  type="text"
                  value={config.couple.groom.fullName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, fullName: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Gelaran / Title</label>
                <input
                  type="text"
                  value={config.couple.groom.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, title: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Kedudukan Keluarga</label>
                <input
                  type="text"
                  value={config.couple.groom.orderInFamily}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, orderInFamily: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  placeholder="cth: Putera bongsu kepada"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Bapa</label>
                  <input
                    type="text"
                    value={config.couple.groom.fatherName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          groom: { ...config.couple.groom, fatherName: e.target.value },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={config.couple.groom.motherName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          groom: { ...config.couple.groom, motherName: e.target.value },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Biodata / Madah Romantis</label>
                <textarea
                  rows={2}
                  value={config.couple.groom.bio}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, bio: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pautan Instagram</label>
                <input
                  type="text"
                  value={config.couple.groom.instagram || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        groom: { ...config.couple.groom, instagram: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  placeholder="https://www.instagram.com/..."
                />
              </div>
            </div>

            {/* Bride Details */}
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif text-base font-bold text-[#3D2429] flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gold-500" />
                  <span>Pengantin Perempuan (Bride)</span>
                </h3>
                <span className="text-[11px] font-semibold text-gold-700 uppercase">Permaisuri Sehari</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Panggilan (Short Name)</label>
                <input
                  type="text"
                  value={config.couple.bride.shortName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, shortName: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Penuh (Full Name)</label>
                <input
                  type="text"
                  value={config.couple.bride.fullName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, fullName: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Gelaran / Title</label>
                <input
                  type="text"
                  value={config.couple.bride.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, title: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Kedudukan Keluarga</label>
                <input
                  type="text"
                  value={config.couple.bride.orderInFamily}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, orderInFamily: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  placeholder="cth: Puteri sulung kepada"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Bapa</label>
                  <input
                    type="text"
                    value={config.couple.bride.fatherName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          bride: { ...config.couple.bride, fatherName: e.target.value },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={config.couple.bride.motherName}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        couple: {
                          ...config.couple,
                          bride: { ...config.couple.bride, motherName: e.target.value },
                        },
                      })
                    }
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Biodata / Madah Romantis</label>
                <textarea
                  rows={2}
                  value={config.couple.bride.bio}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, bio: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pautan Instagram</label>
                <input
                  type="text"
                  value={config.couple.bride.instagram || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      couple: {
                        ...config.couple,
                        bride: { ...config.couple.bride, instagram: e.target.value },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  placeholder="https://www.instagram.com/..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: EVENT DETAILS */}
      {activeSection === "event" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
            <Calendar size={18} className="text-gold-600" />
            <span>Butiran Tarikh & Atur Cara Utama</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tajuk Majlis</label>
              <input
                type="text"
                value={config.event.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Salam Pembuka</label>
              <input
                type="text"
                value={config.event.invitationGreeting}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, invitationGreeting: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Mesej / Teks Undangan</label>
            <textarea
              rows={3}
              value={config.event.invitationMessage}
              onChange={(e) =>
                setConfig({
                  ...config,
                  event: { ...config.event, invitationMessage: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tarikh ISO (YYYY-MM-DD)</label>
              <input
                type="date"
                value={config.event.date}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, date: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Paparan Tarikh</label>
              <input
                type="text"
                value={config.event.dateDisplay}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, dateDisplay: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="cth: Sabtu, 20 Mac 2027"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tarikh Hijrah</label>
              <input
                type="text"
                value={config.event.hijriDate}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, hijriDate: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="cth: 12 Syawal 1448H"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Waktu Jamuan / Resepsi</label>
              <input
                type="text"
                value={config.event.receptionTime}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, receptionTime: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="cth: 11:00 Pagi - 4:00 Petang"
              />
            </div>
          </div>

          {/* Akad & Resepsi Specifics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            {/* Akad Nikah */}
            <div className="rounded-2xl border border-gold-200 bg-champagne-50/60 p-4 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#3D2429]">Upacara Akad Nikah</h4>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Waktu</label>
                <input
                  type="text"
                  value={config.event.akad?.time || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      event: {
                        ...config.event,
                        akad: {
                          date: config.event.akad?.date || config.event.date,
                          time: e.target.value,
                          venue: config.event.akad?.venue || "",
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                  placeholder="cth: 09:30 Pagi"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Tempat / Masjid</label>
                <input
                  type="text"
                  value={config.event.akad?.venue || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      event: {
                        ...config.event,
                        akad: {
                          date: config.event.akad?.date || config.event.date,
                          time: config.event.akad?.time || "",
                          venue: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                  placeholder="cth: Masjid Kariah Kampung Pachitan"
                />
              </div>
            </div>

            {/* Resepsi */}
            <div className="rounded-2xl border border-gold-200 bg-champagne-50/60 p-4 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#3D2429]">Majlis Resepsi</h4>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Waktu</label>
                <input
                  type="text"
                  value={config.event.resepsi?.time || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      event: {
                        ...config.event,
                        resepsi: {
                          date: config.event.resepsi?.date || config.event.date,
                          time: e.target.value,
                          venue: config.event.resepsi?.venue || "",
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                  placeholder="cth: 11:00 Pagi - 04:00 Petang"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Tempat Resepsi</label>
                <input
                  type="text"
                  value={config.event.resepsi?.venue || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      event: {
                        ...config.event,
                        resepsi: {
                          date: config.event.resepsi?.date || config.event.date,
                          time: config.event.resepsi?.time || "",
                          venue: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                  placeholder="cth: Dataran Pachitan"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: VENUE & MAPS */}
      {activeSection === "venue" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
            <MapPin size={18} className="text-gold-600" />
            <span>Lokasi, Alamat & Pautan Navigasi GPS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Tempat / Bangunan</label>
              <input
                type="text"
                value={config.event.venueName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, venueName: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Dewan / Bilik</label>
              <input
                type="text"
                value={config.event.venueHall}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, venueHall: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Penuh</label>
            <textarea
              rows={2}
              value={config.event.venueAddress}
              onChange={(e) =>
                setConfig({
                  ...config,
                  event: { ...config.event, venueAddress: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Maklumat Tempat Letak Kereta</label>
            <input
              type="text"
              value={config.event.parkingInfo || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  event: { ...config.event, parkingInfo: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Pautan Navigasi Waze (URL)</label>
              <input
                type="text"
                value={config.event.wazeUrl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, wazeUrl: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="https://ul.waze.com/..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Pautan Google Maps (URL)</label>
              <input
                type="text"
                value={config.event.googleMapsUrl}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: { ...config.event, googleMapsUrl: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="https://maps.app.goo.gl/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Pautan Embed Peta Google (iframe src)</label>
            <input
              type="text"
              value={config.event.googleMapsEmbedUrl}
              onChange={(e) =>
                setConfig({
                  ...config,
                  event: { ...config.event, googleMapsEmbedUrl: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Latitud (Latitude)</label>
              <input
                type="number"
                step="any"
                value={config.event.coordinates?.lat || 0}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: {
                      ...config.event,
                      coordinates: {
                        lat: parseFloat(e.target.value) || 0,
                        lng: config.event.coordinates?.lng || 0,
                      },
                    },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Longitud (Longitude)</label>
              <input
                type="number"
                step="any"
                value={config.event.coordinates?.lng || 0}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    event: {
                      ...config.event,
                      coordinates: {
                        lat: config.event.coordinates?.lat || 0,
                        lng: parseFloat(e.target.value) || 0,
                      },
                    },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: AUDIO SETTINGS */}
      {activeSection === "audio" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <Music size={18} className="text-gold-600" />
                <span>Tetapan Lagu Latar & Pemain Muzik</span>
              </h3>
              <p className="text-xs text-stone-500">Konfigurasi muzik instrumental atau lagu latar majlis perkahwinan.</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.audio?.enabled !== false}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    audio: {
                      ...config.audio,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D88A96]"></div>
              <span className="ml-2 text-xs font-semibold text-stone-700">Aktifkan Audio</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tajuk Lagu</label>
              <input
                type="text"
                value={config.audio?.title || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    audio: { ...config.audio, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Penyanyi / Artis</label>
              <input
                type="text"
                value={config.audio?.artist || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    audio: { ...config.audio, artist: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Sumber Fail Audio (URL atau Fail Tempatan)
            </label>
            <input
              type="text"
              value={config.audio?.src || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  audio: { ...config.audio, src: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900 font-mono"
              placeholder="/audio/wedding-bgm.mp3 atau https://..."
            />
            <p className="mt-1 text-[11px] text-stone-400">
              Tips: Letakkan fail audio MP3 ke dalam folder <code>public/audio/</code> atau gunakan skrip <code>npm run sync-song</code>.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.audio?.autoLoop !== false}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    audio: { ...config.audio, autoLoop: e.target.checked },
                  })
                }
                className="rounded text-[#B56576] focus:ring-gold-500 h-4 w-4"
              />
              <span className="text-xs font-semibold text-stone-700">Ulang Automatik (Auto Loop)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.audio?.autoPlayPrompt !== false}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    audio: { ...config.audio, autoPlayPrompt: e.target.checked },
                  })
                }
                className="rounded text-[#B56576] focus:ring-gold-500 h-4 w-4"
              />
              <span className="text-xs font-semibold text-stone-700">Minta Main Semasa Buka Sampul (Autoplay on Open)</span>
            </label>
          </div>
        </div>
      )}

      {/* SECTION 5: SCHEDULE / TENTATIF */}
      {activeSection === "schedule" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <Clock size={18} className="text-gold-600" />
                <span>Tentatif Majlis (Itinerary Timeline)</span>
              </h3>
              <p className="text-xs text-stone-500">Susun jadual perjalanan acara dari ketibaan hingga bersurai.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                const newItem: EventScheduleItem = {
                  time: "12:00 PM",
                  title: "Aktiviti Baharu",
                  description: "Penerangan aktiviti...",
                  iconName: "Sparkles",
                };
                setConfig({
                  ...config,
                  event: {
                    ...config.event,
                    schedule: [...config.event.schedule, newItem],
                  },
                });
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gold-100 px-3.5 py-2 text-xs font-semibold text-gold-900 hover:bg-gold-200 transition"
            >
              <Plus size={14} />
              <span>Tambah Slot</span>
            </button>
          </div>

          <div className="space-y-4">
            {config.event.schedule.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-4"
              >
                <div className="w-full sm:w-28 flex-shrink-0">
                  <label className="block text-[10px] font-bold text-stone-400 uppercase">Masa</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...config.event.schedule];
                      updated[index].time = e.target.value;
                      setConfig({ ...config, event: { ...config.event, schedule: updated } });
                    }}
                    className="w-full rounded-lg border border-stone-300 p-2 text-xs font-mono font-bold text-[#3D2429]"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase">Tajuk Aktiviti</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...config.event.schedule];
                          updated[index].title = e.target.value;
                          setConfig({ ...config, event: { ...config.event, schedule: updated } });
                        }}
                        className="w-full rounded-lg border border-stone-300 p-2 text-xs font-semibold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase">Ikon</label>
                      <select
                        value={item.iconName || "Clock"}
                        onChange={(e) => {
                          const updated = [...config.event.schedule];
                          updated[index].iconName = e.target.value;
                          setConfig({ ...config, event: { ...config.event, schedule: updated } });
                        }}
                        className="w-full rounded-lg border border-stone-300 p-2 text-xs text-stone-900"
                      >
                        <option value="Clock">Clock (Jam)</option>
                        <option value="UserCheck">UserCheck (Ketibaan)</option>
                        <option value="Sparkles">Sparkles (Perarakan)</option>
                        <option value="Heart">Heart (Doa & Jamuan)</option>
                        <option value="Camera">Camera (Fotografi)</option>
                        <option value="CheckCircle">CheckCircle (Bersurai)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Penerangan</label>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => {
                        const updated = [...config.event.schedule];
                        updated[index].description = e.target.value;
                        setConfig({ ...config, event: { ...config.event, schedule: updated } });
                      }}
                      className="w-full rounded-lg border border-stone-300 p-2 text-xs text-stone-600"
                      placeholder="Penerangan ringkas..."
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const updated = config.event.schedule.filter((_, i) => i !== index);
                    setConfig({ ...config, event: { ...config.event, schedule: updated } });
                  }}
                  className="rounded-lg p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Padam slot"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: RSVP & CONTACTS */}
      {activeSection === "rsvp_contacts" && (
        <div className="space-y-6">
          {/* RSVP Settings Box */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <Check size={18} className="text-gold-600" />
                <span>Tetapan Borang RSVP</span>
              </h3>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.rsvp?.enabled !== false}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      rsvp: { ...config.rsvp, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D88A96]"></div>
                <span className="ml-2 text-xs font-semibold text-stone-700">Aktifkan RSVP</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Tarikh Akhir (ISO YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={config.rsvp?.deadline || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      rsvp: { ...config.rsvp, deadline: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Paparan Tarikh Tutup RSVP</label>
                <input
                  type="text"
                  value={config.rsvp?.deadlineDisplay || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      rsvp: { ...config.rsvp, deadlineDisplay: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                  placeholder="cth: 1 Mac 2027"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Maksimum Pax Setiap Tetamu</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={config.rsvp?.maxPaxPerGuest || 5}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      rsvp: { ...config.rsvp, maxPaxPerGuest: parseInt(e.target.value) || 5 },
                    })
                  }
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Contact Persons for WhatsApp Salam */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <Phone size={18} className="text-gold-600" />
                <span>Wakil Majlis (WhatsApp & Panggilan)</span>
              </h3>

              <button
                type="button"
                onClick={() => {
                  const newContact: ContactPerson = {
                    name: "Wakil Baharu",
                    relation: "Keluarga",
                    phone: "+60123456789",
                    whatsappMessage: "Salam, tahniah atas perkahwinan...",
                  };
                  setConfig({
                    ...config,
                    contacts: [...config.contacts, newContact],
                  });
                }}
                className="flex items-center gap-1.5 rounded-xl bg-gold-100 px-3.5 py-2 text-xs font-semibold text-gold-900 hover:bg-gold-200 transition"
              >
                <Plus size={14} />
                <span>Tambah Wakil</span>
              </button>
            </div>

            <div className="space-y-4">
              {config.contacts.map((contact, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3D2429]">Wakil #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.contacts.filter((_, i) => i !== index);
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="text-stone-400 hover:text-rose-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Nama Wakil</label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => {
                          const updated = [...config.contacts];
                          updated[index].name = e.target.value;
                          setConfig({ ...config, contacts: updated });
                        }}
                        className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Hubungan</label>
                      <input
                        type="text"
                        value={contact.relation}
                        onChange={(e) => {
                          const updated = [...config.contacts];
                          updated[index].relation = e.target.value;
                          setConfig({ ...config, contacts: updated });
                        }}
                        className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                        placeholder="cth: Bapa, Ibu, Koordinator"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">No. Telefon</label>
                      <input
                        type="text"
                        value={contact.phone}
                        onChange={(e) => {
                          const updated = [...config.contacts];
                          updated[index].phone = e.target.value;
                          setConfig({ ...config, contacts: updated });
                        }}
                        className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900 font-mono"
                        placeholder="+60123456789"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Mesej WhatsApp Pra-isi</label>
                    <input
                      type="text"
                      value={contact.whatsappMessage || ""}
                      onChange={(e) => {
                        const updated = [...config.contacts];
                        updated[index].whatsappMessage = e.target.value;
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: SALAM KAUT DIGITAL */}
      {activeSection === "salamKaut" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <CreditCard size={18} className="text-gold-600" />
                <span>Salam Kaut Digital & Butiran Bank</span>
              </h3>
              <p className="text-xs text-stone-500">
                Pilihan untuk membolehkan tetamu menyalurkan hadiah ikhlas secara dalam talian atau DuitNow QR.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.salamKaut?.enabled !== false}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    salamKaut: {
                      ...config.salamKaut,
                      enabled: e.target.checked,
                    },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D88A96]"></div>
              <span className="ml-2 text-xs font-semibold text-stone-700">Aktifkan Salam Kaut</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Bank</label>
              <input
                type="text"
                value={config.salamKaut?.bankName || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    salamKaut: { ...config.salamKaut, bankName: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
                placeholder="cth: BANK ISLAM / MAYBANK"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Pemegang Akaun</label>
              <input
                type="text"
                value={config.salamKaut?.accountName || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    salamKaut: { ...config.salamKaut, accountName: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nombor Akaun Bank</label>
              <input
                type="text"
                value={config.salamKaut?.accountNumber || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    salamKaut: { ...config.salamKaut, accountNumber: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Teks Arahan & Doa Salam Kaut</label>
            <textarea
              rows={2}
              value={config.salamKaut?.instructionText || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  salamKaut: { ...config.salamKaut, instructionText: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>
        </div>
      )}

      {/* SECTION 8: WISHLIST */}
      {activeSection === "wishlist" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
                <Gift size={18} className="text-gold-600" />
                <span>Senarai Hajat & Hadiah (Gift Wishlist)</span>
              </h3>
              <p className="text-xs text-stone-500">Pilihan hadiah barangan yang dihajati oleh pasangan pengantin.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                const newItem: WishlistItem = {
                  id: `gift-${Date.now()}`,
                  title: "Barangan Baharu",
                  category: "Dapur",
                  description: "Penerangan barangan...",
                  priceEstimate: "RM 100.00",
                  platform: "Shopee",
                  storeLink: "https://shopee.com.my",
                  isReserved: false,
                };
                setConfig({
                  ...config,
                  wishlist: [...config.wishlist, newItem],
                });
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gold-100 px-3.5 py-2 text-xs font-semibold text-gold-900 hover:bg-gold-200 transition"
            >
              <Plus size={14} />
              <span>Tambah Hadiah</span>
            </button>
          </div>

          <div className="space-y-4">
            {config.wishlist.map((item, index) => (
              <div
                key={item.id || index}
                className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3D2429]">Hadiah #{index + 1}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.isReserved === true}
                        onChange={(e) => {
                          const updated = [...config.wishlist];
                          updated[index].isReserved = e.target.checked;
                          setConfig({ ...config, wishlist: updated });
                        }}
                        className="rounded text-[#B56576] h-3.5 w-3.5"
                      />
                      <span>Telah Dihadiahkan (Reserved)</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.wishlist.filter((_, i) => i !== index);
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="text-stone-400 hover:text-rose-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Nama Hadiah</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...config.wishlist];
                        updated[index].title = e.target.value;
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Kategori</label>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...config.wishlist];
                        updated[index].category = e.target.value;
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                    >
                      <option value="Dapur">Dapur</option>
                      <option value="Bilik Tidur">Bilik Tidur</option>
                      <option value="Ruang Tamu">Ruang Tamu</option>
                      <option value="Elektronik">Elektronik</option>
                      <option value="Lain-lain">Lain-lain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Anggaran Harga</label>
                    <input
                      type="text"
                      value={item.priceEstimate || ""}
                      onChange={(e) => {
                        const updated = [...config.wishlist];
                        updated[index].priceEstimate = e.target.value;
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                      placeholder="cth: RM 450.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Platform Kedai</label>
                    <input
                      type="text"
                      value={item.platform}
                      onChange={(e) => {
                        const updated = [...config.wishlist];
                        updated[index].platform = e.target.value;
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900"
                      placeholder="Shopee / Lazada / IKEA"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase">Pautan Kedai (URL)</label>
                    <input
                      type="text"
                      value={item.storeLink}
                      onChange={(e) => {
                        const updated = [...config.wishlist];
                        updated[index].storeLink = e.target.value;
                        setConfig({ ...config, wishlist: updated });
                      }}
                      className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase">Penerangan</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...config.wishlist];
                      updated[index].description = e.target.value;
                      setConfig({ ...config, wishlist: updated });
                    }}
                    className="w-full rounded-xl border border-stone-300 p-2 text-xs text-stone-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 9: SEO & METADATA */}
      {activeSection === "seo" && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#3D2429] flex items-center gap-2">
            <Globe size={18} className="text-gold-600" />
            <span>SEO, Meta Tajuk & Pratonton Carian</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Tajuk Laman (Site Title)</label>
            <input
              type="text"
              value={config.seo?.title || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  seo: { ...config.seo, title: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Penerangan Laman (Meta Description)</label>
            <textarea
              rows={3}
              value={config.seo?.description || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  seo: { ...config.seo, description: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">URL Laman Web</label>
            <input
              type="text"
              value={config.seo?.url || ""}
              onChange={(e) =>
                setConfig({
                  ...config,
                  seo: { ...config.seo, url: e.target.value },
                })
              }
              className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-stone-900"
              placeholder="https://..."
            />
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={handleExportJson}
          className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
        >
          <Download size={15} className="text-gold-700" />
          <span>Eksport Fail JSON</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D88A96] to-[#C56D7E] px-6 py-2.5 text-xs font-bold text-white shadow-gold transition hover:opacity-95 active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <>
              <RefreshCw size={15} className="animate-spin text-gold-300" />
              <span>Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <Save size={15} className="text-gold-300" />
              <span>Simpan Konfigurasi</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
