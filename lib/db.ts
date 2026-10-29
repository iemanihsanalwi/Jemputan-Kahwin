import { supabase, isSupabaseConfigured, getServiceSupabase } from "./supabase";
import { RsvpSubmission, GuestWish, WeddingConfig } from "@/types/wedding";
import { weddingConfig as defaultWeddingConfig } from "@/config/wedding";

// In-memory demo store for when Supabase is not configured
let mockRsvps: RsvpSubmission[] = [
  {
    id: "rsvp-1",
    guest_name: "Tengku Faiz & Isteri",
    phone_number: "0123344556",
    attendance_status: "hadir",
    attendees_count: 2,
    remarks: "Alhamdulillah tahniah! Kami sekeluarga akan hadir.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "rsvp-2",
    guest_name: "Cikgu Rosli & Keluarga",
    phone_number: "0178899001",
    attendance_status: "hadir",
    attendees_count: 4,
    remarks: "Bawa anak-anak sekali ya.",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "rsvp-3",
    guest_name: "Azlan Iskandar",
    phone_number: "0194455667",
    attendance_status: "tidak_hadir",
    attendees_count: 1,
    remarks:
      "Maaf Amirul, ada urusan kerja di luar negara waktu tu. Selamat pengantin baru!",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

let mockWishes: GuestWish[] = [
  {
    id: "wish-1",
    sender_name: "Dato' Seri Khalid & Keluarga",
    relationship: "Sahabat Keluarga",
    message:
      "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Selamat melangkah ke gerbang perkahwinan, semoga rumahtangga sentiasa disinari sakinah, mawaddah dan rahmah.",
    is_approved: true,
    likes_count: 14,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "wish-2",
    sender_name: "Nurul Aina",
    relationship: "Rakan Sekerja Farhana",
    message:
      "Tahniah Farhana & Amirul! Cantik sangat kedua mempelai bagai pinang dibelah dua. Semoga berkekalan hingga ke jannah!",
    is_approved: true,
    likes_count: 9,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "wish-3",
    sender_name: "Ahmad Faizal",
    relationship: "Kawan Universiti Amirul",
    message:
      "Congrats brother Amirul! Finally tied the knot! Semoga dipermudahkan segala urusan dan murah rezeki selalu.",
    is_approved: true,
    likes_count: 7,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "wish-4",
    sender_name: "Mak Ngah & Pak Ngah",
    relationship: "Keluarga",
    message:
      "Alhamdulillah, syukur selesai satu lagi fasa. Jaga solat, jaga adab berumahtangga dan saling tolak ansur sentiasa.",
    is_approved: true,
    likes_count: 5,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

// Helper to access window localStorage in browser
const getLocalItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalItem = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage error:", e);
  }
};

/**
 * Submit RSVP Form
 */
export async function submitRsvp(data: {
  guest_name: string;
  phone_number: string;
  attendance_status: "hadir" | "tidak_hadir";
  attendees_count: number;
  remarks?: string;
  dietary_requirements?: string;
}): Promise<{ success: boolean; data?: RsvpSubmission; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data: result, error } = await supabase
        .from("rsvp_submissions")
        .insert([
          {
            guest_name: data.guest_name,
            phone_number: data.phone_number,
            attendance_status: data.attendance_status,
            attendees_count: data.attendees_count,
            remarks: data.remarks || null,
            dietary_requirements: data.dietary_requirements || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase RSVP error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: result };
    } else {
      // Mock / Local storage demo mode
      const newSubmission: RsvpSubmission = {
        id: "rsvp-" + Date.now(),
        guest_name: data.guest_name,
        phone_number: data.phone_number,
        attendance_status: data.attendance_status,
        attendees_count: data.attendees_count,
        remarks: data.remarks || "",
        created_at: new Date().toISOString(),
      };

      const current = getLocalItem<RsvpSubmission[]>("wedding_rsvps", mockRsvps);
      const updated = [newSubmission, ...current];
      setLocalItem("wedding_rsvps", updated);
      mockRsvps = updated;

      return { success: true, data: newSubmission };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Ralat semasa menghantar RSVP.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Fetch All RSVPs (For Admin Dashboard)
 */
export async function getRsvpList(): Promise<RsvpSubmission[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("rsvp_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } else {
      return getLocalItem<RsvpSubmission[]>("wedding_rsvps", mockRsvps);
    }
  } catch (err) {
    console.warn("Falling back to demo RSVP data:", err);
    return getLocalItem<RsvpSubmission[]>("wedding_rsvps", mockRsvps);
  }
}

/**
 * Fetch Approved Wishes for Guestbook
 */
export async function getApprovedWishes(limit = 20, offset = 0): Promise<GuestWish[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("guest_wishes")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    } else {
      const current = getLocalItem<GuestWish[]>("wedding_wishes", mockWishes);
      return current.filter((w) => w.is_approved).slice(offset, offset + limit);
    }
  } catch (err) {
    console.warn("Falling back to demo wishes:", err);
    return getLocalItem<GuestWish[]>("wedding_wishes", mockWishes);
  }
}

/**
 * Submit Guestbook Wish
 */
export async function submitWish(data: {
  sender_name: string;
  relationship?: string;
  message: string;
}): Promise<{ success: boolean; data?: GuestWish; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data: result, error } = await supabase
        .from("guest_wishes")
        .insert([
          {
            sender_name: data.sender_name,
            relationship: data.relationship || null,
            message: data.message,
            is_approved: true, // Auto-approve by default, editable in admin
            likes_count: 0,
          },
        ])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: result };
    } else {
      const newWish: GuestWish = {
        id: "wish-" + Date.now(),
        sender_name: data.sender_name,
        relationship: data.relationship || "Tetamu",
        message: data.message,
        is_approved: true,
        likes_count: 0,
        created_at: new Date().toISOString(),
      };

      const current = getLocalItem<GuestWish[]>("wedding_wishes", mockWishes);
      const updated = [newWish, ...current];
      setLocalItem("wedding_wishes", updated);
      mockWishes = updated;

      return { success: true, data: newWish };
    }
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Ralat semasa menghantar ucapan.";
    return { success: false, error: errorMsg };
  }
}

/**
 * Toggle Wish Approval (Admin)
 */
export async function toggleWishApproval(
  id: string,
  newStatus: boolean
): Promise<boolean> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("guest_wishes")
        .update({ is_approved: newStatus })
        .eq("id", id);
      return !error;
    } else {
      const current = getLocalItem<GuestWish[]>("wedding_wishes", mockWishes);
      const updated = current.map((w) =>
        w.id === id ? { ...w, is_approved: newStatus } : w
      );
      setLocalItem("wedding_wishes", updated);
      mockWishes = updated;
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Like a Wish (Public)
 */
export async function likeWish(id: string): Promise<boolean> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.rpc("increment_wish_like", { wish_id: id });
      if (error) {
        // Fallback update if RPC not created
        const { data } = await supabase
          .from("guest_wishes")
          .select("likes_count")
          .eq("id", id)
          .single();
        if (data) {
          await supabase
            .from("guest_wishes")
            .update({ likes_count: (data.likes_count || 0) + 1 })
            .eq("id", id);
        }
      }
      return true;
    } else {
      const current = getLocalItem<GuestWish[]>("wedding_wishes", mockWishes);
      const updated = current.map((w) =>
        w.id === id ? { ...w, likes_count: (w.likes_count || 0) + 1 } : w
      );
      setLocalItem("wedding_wishes", updated);
      mockWishes = updated;
      return true;
    }
  } catch {
    return false;
  }
}

/**
 * Fetch Dynamic Wedding Configuration from Supabase (id = 1)
 * Gracefully falls back to local wedding.config.json if table or connection is unavailable.
 */
export async function fetchWeddingConfig(): Promise<WeddingConfig> {
  try {
    const client = getServiceSupabase() || supabase;
    if (isSupabaseConfigured && client) {
      const { data, error } = await client
        .from("wedding_config")
        .select("config")
        .eq("id", 1)
        .maybeSingle();

      if (!error && data?.config) {
        return data.config as WeddingConfig;
      }
      if (error && error.code !== "PGRST116") {
        console.warn("Supabase wedding_config notice:", error.message);
      }
    }
  } catch (err) {
    console.warn("fetchWeddingConfig fallback to default:", err);
  }
  return defaultWeddingConfig;
}

/**
 * Save / Upsert Wedding Configuration into Supabase (id = 1)
 */
export async function saveWeddingConfig(
  newConfig: WeddingConfig
): Promise<{ success: boolean; data?: WeddingConfig; error?: string }> {
  try {
    const client = getServiceSupabase() || supabase;
    if (!isSupabaseConfigured || !client) {
      return {
        success: false,
        error: "Pangkalan data Supabase belum dikonfigurasikan sepenuhnya.",
      };
    }

    const { data, error } = await client
      .from("wedding_config")
      .upsert(
        {
          id: 1,
          config: newConfig,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase wedding_config save error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data.config as WeddingConfig };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Ralat menyimpan konfigurasi.";
    return { success: false, error: msg };
  }
}

