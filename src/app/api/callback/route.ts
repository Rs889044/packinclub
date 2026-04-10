import { NextResponse } from "next/server";
import { getCallbacks, saveCallbacks } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, preferredTime } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const callbacks = getCallbacks();
    callbacks.push({
      id: Date.now(),
      phone,
      preferredTime: preferredTime || "Anytime",
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    saveCallbacks(callbacks);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
