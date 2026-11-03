import { NextRequest, NextResponse } from "next/server";
import { weddingConfig } from "@/config/wedding";
import { getEnvVar } from "@/lib/supabase";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const correctPin =
      getEnvVar("ADMIN_PIN") || weddingConfig.admin.pin || "037172";

    if (!pin || pin.toString().trim() !== correctPin.toString().trim()) {
      return NextResponse.json(
        { success: false, error: "Nombor PIN tidak tepat. Sila cuba lagi." },
        { status: 401 }
      );
    }

    const payload = `admin:${pin}:${Date.now()}`;
    const token = typeof btoa !== "undefined"
      ? btoa(payload)
      : Buffer.from(payload).toString("base64");

    return NextResponse.json({
      success: true,
      message: "Pengesahan pentadbir berjaya.",
      token,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ralat pelayan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
