import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { submitRsvp, getRsvpList } from "@/lib/db";
import { weddingConfig } from "@/config/wedding";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Rate limiting: max 5 submissions per minute per IP
    const rateCheck = checkRateLimit(`rsvp_${ip}`, 5, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percubaan. Sila tunggu ${rateCheck.resetInSeconds} saat sebelum mencuba lagi.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Check honeypot field
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate body
    const validated = rsvpSchema.parse(body);

    const result = await submitRsvp({
      guest_name: validated.guest_name,
      phone_number: validated.phone_number,
      attendance_status: validated.attendance_status,
      attendees_count: validated.attendees_count,
      remarks: validated.remarks,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Gagal menyimpan maklumat RSVP." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "RSVP anda telah berjaya dihantar! Terima kasih.",
      data: result.data,
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "errors" in error) {
      const zErr = error as { errors: { message?: string }[] };
      return NextResponse.json(
        { error: zErr.errors[0]?.message || "Maklumat yang dimasukkan tidak sah." },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Ralat pelayan. Sila cuba sebentar lagi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check admin authentication via header
    const authHeader = req.headers.get("x-admin-pin");
    const configuredPin = process.env.ADMIN_PIN || weddingConfig.admin.pin;

    if (!authHeader || authHeader !== configuredPin) {
      return NextResponse.json(
        { error: "Akses tidak dibenarkan. PIN pentadbir diperlukan." },
        { status: 401 }
      );
    }

    const rsvps = await getRsvpList();
    return NextResponse.json({ success: true, data: rsvps });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal mendapatkan senarai RSVP.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
