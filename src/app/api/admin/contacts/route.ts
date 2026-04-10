import { NextResponse } from "next/server";
import { getContacts, saveContacts } from "@/lib/data";

export async function GET() {
  const contacts = getContacts();
  // Return sorted by newest first
  contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(contacts);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const contacts = getContacts();
    const idx = contacts.findIndex(c => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    contacts[idx].status = status;
    saveContacts(contacts);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
