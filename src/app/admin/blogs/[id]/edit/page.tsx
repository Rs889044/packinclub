"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Blog } from "@/types";

const categories = ["Sustainability", "Industries", "Health", "Inside Packin"];

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: categories[0],
    author: "Packin Club",
    date: "",
    tags: [] as string[],
    status: "published" as "draft" | "published",
  });

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then(r => r.json())
      .then((blogs: Blog[]) => {
        const b = blogs.find(b => b.id === parseInt(id));
        if (b) {
          setForm({
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            category: b.category,
            author: b.author,
            date: b.date,
            tags: b.tags || [],
            status: b.status || "published",
          });
          setThumbnailUrl(b.thumbnail || "");
        }
        setFetching(false);
      });
  }, [id]);

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  }

  async function handleThumbnailUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setThumbnailUrl(data.url);
    } catch { /* ignore */ }
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, thumbnail: thumbnailUrl }),
    });

    if (res.ok) {
      await fetch("/api/admin/cleanup", { method: "POST" });
      router.push("/admin/blogs");
    } else {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-forest transition-colors mb-4">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Blogs
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-brand-pale p-6 md:p-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-brand-charcoal mb-2">Title</label>
            <input type="text" id="title" required value={form.title} onChange={(e) => updateField("title", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-brand-charcoal mb-2">URL Slug</label>
            <input type="text" id="slug" required value={form.slug} onChange={(e) => updateField("slug", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all text-brand-gray" />
          </div>

          {/* Category, Date & Status */}
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-brand-charcoal mb-2">Category</label>
              <select id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-brand-charcoal mb-2">Publish Date</label>
              <input type="date" id="date" value={form.date} onChange={(e) => updateField("date", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-brand-charcoal mb-2">Status</label>
              <select id="status" value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value as "draft" | "published" }))}
                className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-brand-charcoal mb-2">Author</label>
            <input type="text" id="author" value={form.author} onChange={(e) => updateField("author", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-brand-forest/5 text-brand-forest text-xs font-medium rounded-full border border-brand-forest/15">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest outline-none text-sm transition-all" />
              <button type="button" onClick={addTag} className="px-4 py-2.5 bg-brand-pale text-brand-gray rounded-xl text-sm font-medium hover:bg-brand-sand transition-colors">Add</button>
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-brand-charcoal mb-2">Excerpt</label>
            <textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-none" />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-brand-charcoal mb-2">
              Content <span className="text-brand-gray font-normal">(HTML supported)</span>
            </label>
            <textarea id="content" rows={12} required value={form.content} onChange={(e) => updateField("content", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-y font-mono" />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Thumbnail Image</label>
            {thumbnailUrl ? (
              <div className="relative w-60 h-40 rounded-xl overflow-hidden border border-brand-pale">
                <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setThumbnailUrl("")}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
              </div>
            ) : (
              <label className="block w-full p-8 border-2 border-dashed border-brand-pale rounded-xl text-center cursor-pointer hover:border-brand-forest/30 hover:bg-brand-sand/50 transition-all">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleThumbnailUpload(e.target.files[0]); }} />
                {uploading ? (
                  <div className="flex items-center justify-center gap-2 text-brand-gray text-sm">
                    <div className="w-4 h-4 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <>
                    <div className="text-3xl mb-2">🖼️</div>
                    <p className="text-sm text-brand-gray">Click to upload thumbnail</p>
                  </>
                )}
              </label>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading}
            className="px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center gap-2 shadow-sm">
            {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Save Changes"}
          </button>
          <Link href="/admin/blogs" className="px-6 py-3 text-brand-gray font-medium hover:text-brand-charcoal transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
