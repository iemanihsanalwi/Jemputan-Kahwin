import { NextRequest, NextResponse } from "next/server";
import { weddingConfig } from "@/config/wedding";
import fs from "fs";
import path from "path";

const CONFIG_PATHS = [
  path.join(process.cwd(), "src", "config", "wedding.config.json"),
  path.join(process.cwd(), "config", "wedding.config.json"),
];

function verifyPin(req: NextRequest): boolean {
  const adminPin = req.headers.get("x-admin-pin");
  const expectedPin = process.env.ADMIN_PIN || weddingConfig.admin.pin || "037172";
  return adminPin?.trim() === expectedPin.toString().trim();
}

export async function GET(req: NextRequest) {
  if (!verifyPin(req)) {
    return NextResponse.json({ success: false, error: "Tidak dibenarkan. PIN tidak sah." }, { status: 401 });
  }

  try {
    for (const p of CONFIG_PATHS) {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf-8");
        return NextResponse.json({ success: true, data: JSON.parse(content) });
      }
    }

    return NextResponse.json({ success: true, data: weddingConfig });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ralat membaca fail konfigurasi.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!verifyPin(req)) {
    return NextResponse.json({ success: false, error: "Tidak dibenarkan. PIN tidak sah." }, { status: 401 });
  }

  try {
    const updatedConfig = await req.json();

    if (!updatedConfig || typeof updatedConfig !== "object" || !updatedConfig.couple || !updatedConfig.event) {
      return NextResponse.json({ success: false, error: "Format konfigurasi tidak sah." }, { status: 400 });
    }

    const jsonString = JSON.stringify(updatedConfig, null, 2);

    for (const p of CONFIG_PATHS) {
      try {
        const dir = path.dirname(p);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(p, jsonString, "utf-8");
      } catch (writeErr) {
        console.error(`Error writing to ${p}:`, writeErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Konfigurasi berjaya disimpan dan dikemaskini!",
      data: updatedConfig,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ralat menyimpan konfigurasi.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

