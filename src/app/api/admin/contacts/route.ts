import { NextResponse } from "next/server";
import { getContacts } from "@/lib/data";

export async function GET() {
  const contacts = getContacts();
  // Return sorted by newest first
  contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(contacts);
}
