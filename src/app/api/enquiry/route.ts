import { NextResponse } from "next/server";
import { getEnquiries, saveEnquiries } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productName, productSlug, name, email, phone, company, quantity, message } = body;

    if (!name || !email || !phone || !productName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiries = getEnquiries();
    enquiries.push({
      id: Date.now(),
      productName,
      productSlug: productSlug || "",
      name,
      email,
      phone,
      company: company || "",
      quantity: quantity || "",
      message: message || "",
      status: "new",
      createdAt: new Date().toISOString(),
    });
    saveEnquiries(enquiries);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
