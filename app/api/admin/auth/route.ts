import { NextRequest, NextResponse } from "next/server";
import { weddingConfig } from "@/config/wedding";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const correctPin = process.env.ADMIN_PIN || weddingConfig.admin.pin;

    if (!pin || pin.toString().trim() !== correctPin.toString().trim()) {
      return NextResponse.json(
        { success: false, error: "Nombor PIN tidak tepat. Sila cuba lagi." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pengesahan pentadbir berjaya.",
      token: Buffer.from(`admin:${pin}:${Date.now()}`).toString("base64"),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ralat pelayan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
