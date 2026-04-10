"use client";
import { useState, useEffect, FormEvent } from "react";
import type { PageContent } from "@/types";

export default function BlogContentPage() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(r => r.json())
      .then(data => {
        if (!data.blog) data.blog = { hero: { title: "", desc: "" } };
        setContent(data);
        setLoading(false);
      });
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    setSaving(false);
  }

  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-brand-gray">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading content...</p>
      </div>
    );
  }

  const blog = content.blog || { hero: { title: "", desc: "" } };

  return (
    <div className="max-w-3xl">
      <div className="mb-8 p-6 bg-gradient-to-r from-brand-forest to-[#1A4533] rounded-2xl text-white shadow-lg overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
           <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Blog Page Content</h1>
           <p className="text-white/80 text-sm">Edit the hero title and description shown on the public Blog listing page.</p>
         </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-brand-pale p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-brand-charcoal mb-2">Hero Title <span className="font-normal text-brand-gray">(HTML supported)</span></label>
          <input
            type="text"
            value={blog.hero.title}
            onChange={e => setContent({...content, blog: {...blog, hero: {...blog.hero, title: e.target.value}}})}
            placeholder="Insights for a sustainable future"
            className="w-full px-4 py-3 text-sm rounded-xl border border-brand-pale focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-charcoal mb-2">Hero Description</label>
          <textarea
            rows={3}
            value={blog.hero.desc}
            onChange={e => setContent({...content, blog: {...blog, hero: {...blog.hero, desc: e.target.value}}})}
            placeholder="Expert articles on compostable packaging..."
            className="w-full px-4 py-3 text-sm rounded-xl border border-brand-pale resize-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest outline-none transition-all"
          />
        </div>

        <div className="pt-4">
          <button type="submit" disabled={saving}
            className="w-full sm:w-auto px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-xl shadow-brand-forest/20">
            {saving ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Publish Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
