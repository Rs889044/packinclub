import { NextResponse } from "next/server";
import { getEnquiries, saveEnquiries } from "@/lib/data";

export async function GET() {
  const enquiries = getEnquiries();
  enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(enquiries);
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const enquiries = getEnquiries();
    const idx = enquiries.findIndex(e => e.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    enquiries[idx].status = status;
    saveEnquiries(enquiries);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
