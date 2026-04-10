import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonials } from "@/lib/data";

export async function GET() {
  const testimonials = getTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, role, quote, rating, image } = body;

    if (!name || !quote) {
      return NextResponse.json({ error: "Name and quote are required" }, { status: 400 });
    }

    const testimonials = getTestimonials();
    const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;

    testimonials.push({
      id: newId,
      name,
      company: company || "",
      role: role || "",
      quote,
      rating: rating || 5,
      image: image || "",
      visible: true,
    });
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const testimonials = getTestimonials();
    const idx = testimonials.findIndex(t => t.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    testimonials[idx] = { ...testimonials[idx], ...updates };
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const testimonials = getTestimonials().filter(t => t.id !== id);
    saveTestimonials(testimonials);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
