import { NextRequest, NextResponse } from "next/server";
import { likeWish } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID tidak sah." }, { status: 400 });
    }

    const success = await likeWish(id);
    if (!success) {
      return NextResponse.json({ error: "Gagal memberikan reaksi." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ralat.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
