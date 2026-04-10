"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Blog } from "@/types";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/blogs").then(r => r.json()).then(b => { setBlogs(b); setLoading(false); });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetch("/api/admin/cleanup", { method: "POST" });
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
    setDeleting(null);
  }

  const categoryColors: Record<string, string> = {
    Industries: "bg-blue-50 text-blue-700",
    Sustainability: "bg-emerald-50 text-emerald-700",
    Health: "bg-rose-50 text-rose-700",
    "Inside Packin": "bg-amber-50 text-amber-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Blog Posts</h1>
          <p className="text-brand-gray mt-1">{blogs.length} posts total</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-white text-sm font-semibold rounded-xl hover:bg-brand-green transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-pale overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-sand/50 border-b border-brand-pale">
                <th className="text-left px-6 py-4 font-medium text-brand-gray">Title</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Date</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Author</th>
                <th className="text-right px-6 py-4 font-medium text-brand-gray">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pale">
              {blogs.map((b) => (
                <tr key={b.id} className={`hover:bg-brand-sand/30 transition-colors ${(b.status || "published") === "draft" ? "bg-amber-50/30" : ""}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-brand-charcoal max-w-[240px] truncate">{b.title}</div>
                      {(b.status || "published") === "draft" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Draft</span>
                      )}
                    </div>
                    <div className="text-xs text-brand-gray mt-0.5 truncate max-w-[280px]">{b.excerpt}</div>
                    {b.tags && b.tags.length > 0 && (
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {b.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-brand-forest/5 text-brand-forest">{t}</span>
                        ))}
                        {b.tags.length > 3 && <span className="text-[10px] text-brand-gray">+{b.tags.length - 3}</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[b.category] || "bg-gray-50 text-gray-700"}`}>{b.category}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-brand-gray">
                    {new Date(b.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-brand-gray">{b.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${b.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium text-brand-forest bg-brand-forest/5 rounded-lg hover:bg-brand-forest/10 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(b.id)}
                        disabled={deleting === b.id}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {deleting === b.id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
