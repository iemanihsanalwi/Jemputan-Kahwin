import { NextRequest, NextResponse } from "next/server";
import { wishSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { submitWish, getApprovedWishes } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const wishes = await getApprovedWishes(limit, offset);
    return NextResponse.json({ success: true, data: wishes });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mendapatkan ucapan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Rate limiting: max 6 wishes per minute
    const rateCheck = checkRateLimit(`wish_${ip}`, 6, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Terlalu kerap menghantar. Sila tunggu ${rateCheck.resetInSeconds} saat.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const validated = wishSchema.parse(body);

    const result = await submitWish({
      sender_name: validated.sender_name,
      relationship: validated.relationship,
      message: validated.message,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Gagal menyimpan ucapan." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Ucapan anda telah berjaya dimuat naik!",
      data: result.data,
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "errors" in error) {
      const zErr = error as { errors: { message?: string }[] };
      return NextResponse.json(
        { error: zErr.errors[0]?.message || "Maklumat ucapan tidak lengkap." },
        { status: 400 }
      );
    }
    const message = error instanceof Error ? error.message : "Ralat pelayan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
