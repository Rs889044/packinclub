import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac, randomBytes } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "packinclub2024";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "default-secret-change-in-production";

function generateSessionToken(): string {
  const nonce = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", ADMIN_SECRET)
    .update(`session:${nonce}`)
    .digest("hex");
  return `${nonce}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateSessionToken();
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
