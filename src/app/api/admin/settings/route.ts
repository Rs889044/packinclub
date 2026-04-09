import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    saveSettings(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save settings error:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
