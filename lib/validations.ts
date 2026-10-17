import { z } from "zod";

export const rsvpSchema = z.object({
  guest_name: z
    .string()
    .min(2, "Sila masukkan nama penuh anda (sekurang-kurangnya 2 huruf)")
    .max(100, "Nama terlalu panjang"),
  phone_number: z
    .string()
    .min(9, "Nombor telefon tidak sah (cth: 0123456789)")
    .max(15, "Nombor telefon terlalu panjang")
    .regex(/^[0-9+\-\s]+$/, "Nombor telefon hanya boleh mengandungi angka"),
  attendance_status: z.enum(["hadir", "tidak_hadir"], {
    errorMap: () => ({ message: "Sila pilih status kehadiran anda" }),
  }),
  attendees_count: z.coerce
    .number()
    .min(1, "Sekurang-kurangnya 1 orang tetamu")
    .max(10, "Maksimum 10 orang setiap tempahan"),
  remarks: z.string().max(500, "Catatan maksimum 500 aksara").optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export const wishSchema = z.object({
  sender_name: z
    .string()
    .min(2, "Sila masukkan nama anda")
    .max(80, "Nama terlalu panjang"),
  relationship: z.string().max(50).optional(),
  message: z
    .string()
    .min(3, "Sila tuliskan sedikit ucapan atau doa buat pengantin")
    .max(600, "Ucapan maksimum 600 aksara"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type RsvpFormData = z.infer<typeof rsvpSchema>;
export type WishFormData = z.infer<typeof wishSchema>;
