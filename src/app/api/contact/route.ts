import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, interest, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    ensureDataDir();
    const contacts = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    contacts.push({
      id: Date.now(),
      name,
      email,
      phone,
      company: company || "",
      interest: interest || "General Inquiry",
      message: message || "",
      createdAt: new Date().toISOString(),
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
