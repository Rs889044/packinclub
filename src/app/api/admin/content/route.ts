import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    saveContent(data);
    return NextResponse.json({ success: true, content: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
