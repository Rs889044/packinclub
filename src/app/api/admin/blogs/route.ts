import { NextResponse } from "next/server";
import { getBlogs, saveBlogs } from "@/lib/data";

export async function GET() {
  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, date, author, thumbnail, tags, status } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Title, content, and category are required" }, { status: 400 });
    }

    const blogs = getBlogs();
    const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;

    const newBlog = {
      id: newId,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      excerpt: excerpt || "",
      content,
      category,
      tags: tags || [],
      date: date || new Date().toISOString().split("T")[0],
      author: author || "Packin Club",
      thumbnail: thumbnail || "",
      status: status || "published",
    };

    blogs.push(newBlog);
    saveBlogs(blogs);

    return NextResponse.json(newBlog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
