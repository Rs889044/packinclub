import { NextResponse } from "next/server";
import { getContacts, saveContacts } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, interest, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contacts = getContacts();
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
    saveContacts(contacts);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
