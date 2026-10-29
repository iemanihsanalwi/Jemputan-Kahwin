import { NextRequest, NextResponse } from "next/server";
import { weddingConfig } from "@/config/wedding";
import { fetchWeddingConfig, saveWeddingConfig } from "@/lib/db";
import { WeddingConfig } from "@/types/wedding";

function verifyPin(req: NextRequest): boolean {
  const adminPin = req.headers.get("x-admin-pin");
  const expectedPin = process.env.ADMIN_PIN || weddingConfig.admin.pin || "037172";
  return adminPin?.trim() === expectedPin.toString().trim();
}

export async function GET(req: NextRequest) {
  if (!verifyPin(req)) {
    return NextResponse.json(
      { success: false, error: "Tidak dibenarkan. PIN tidak sah." },
      { status: 401 }
    );
  }

  try {
    const config = await fetchWeddingConfig();
    return NextResponse.json({ success: true, data: config });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Ralat membaca konfigurasi dari Supabase.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!verifyPin(req)) {
    return NextResponse.json(
      { success: false, error: "Tidak dibenarkan. PIN tidak sah." },
      { status: 401 }
    );
  }

  try {
    const updatedConfig = (await req.json()) as WeddingConfig;

    if (
      !updatedConfig ||
      typeof updatedConfig !== "object" ||
      !updatedConfig.couple ||
      !updatedConfig.event
    ) {
      return NextResponse.json(
        { success: false, error: "Format konfigurasi tidak sah." },
        { status: 400 }
      );
    }

    const result = await saveWeddingConfig(updatedConfig);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Gagal menyimpan konfigurasi ke Supabase." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Konfigurasi berjaya disimpan dan dikemaskini dalam pangkalan data Supabase!",
      data: result.data,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Ralat menyimpan konfigurasi.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
