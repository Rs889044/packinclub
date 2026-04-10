import { NextResponse } from "next/server";
import { getBlogs, saveBlogs } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    const body = await request.json();
    const blogs = getBlogs();
    const index = blogs.findIndex(b => b.id === blogId);

    if (index === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blogs[index] = {
      ...blogs[index],
      title: body.title ?? blogs[index].title,
      slug: body.slug ?? blogs[index].slug,
      excerpt: body.excerpt ?? blogs[index].excerpt,
      content: body.content ?? blogs[index].content,
      category: body.category ?? blogs[index].category,
      tags: body.tags ?? blogs[index].tags ?? [],
      date: body.date ?? blogs[index].date,
      author: body.author ?? blogs[index].author,
      thumbnail: body.thumbnail ?? blogs[index].thumbnail,
      status: body.status ?? blogs[index].status ?? "published",
    };

    saveBlogs(blogs);
    return NextResponse.json(blogs[index]);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    const blogs = getBlogs();
    const filtered = blogs.filter(b => b.id !== blogId);

    if (filtered.length === blogs.length) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    saveBlogs(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
