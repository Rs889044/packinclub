"use client";
import { useState, useEffect, FormEvent } from "react";
import type { PageContent } from "@/types";

export default function HomeContentPage() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(r => r.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  async function handleUpload(file: File, fieldPath: ("whoWeAre" | "productLifecycle")) {
    setUploading(fieldPath);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.url && content) {
        setContent({
          ...content,
          home: {
            ...content.home,
            [fieldPath]: { ...content.home[fieldPath], image: data.url }
          }
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
    setUploading(null);
  }

  function removeImage(fieldPath: ("whoWeAre" | "productLifecycle")) {
    if (!content) return;
    setContent({
      ...content,
      home: {
        ...content.home,
        [fieldPath]: { ...content.home[fieldPath], image: "" }
      }
    });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });
    await fetch("/api/admin/cleanup", { method: "POST" });
    setSaving(false);
  }

  const renderUploadBox = (label: string, fieldPath: ("whoWeAre" | "productLifecycle")) => {
    if (!content) return null;
    const currentValue = content.home[fieldPath].image;
    const isUploading = uploading === fieldPath;

    return (
      <div className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale">
        <label className="block text-sm font-medium text-brand-charcoal mb-1">{label}</label>
        <p className="text-xs text-brand-gray mb-3 italic">
          {fieldPath === "whoWeAre" 
            ? "Recommended: 4:3 Aspect Ratio (e.g., 800x600px)" 
            : "Recommended: Landscape or Square (e.g., 1200x800px)"}
        </p>
        {currentValue ? (
          <div className="relative w-full aspect-square md:aspect-auto md:h-32 rounded-xl overflow-hidden border border-brand-pale bg-white flex items-center justify-center">
            <img src={currentValue} alt={label} className="max-w-full max-h-full object-contain" />
            <button type="button" onClick={() => removeImage(fieldPath)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-sm">✕</button>
          </div>
        ) : (
          <label className="block w-full h-32 border-2 border-dashed border-brand-pale rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-forest/30 bg-white transition-all text-center px-4">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], fieldPath); }} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-brand-gray text-sm">
                <div className="w-5 h-5 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              <div>
                <div className="text-xl mb-1">🖼️</div>
                <p className="text-xs text-brand-gray">Upload Image</p>
              </div>
            )}
          </label>
        )}
      </div>
    );
  };

  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-brand-gray">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 p-6 bg-gradient-to-r from-brand-forest to-[#1A4533] rounded-2xl text-white shadow-lg overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
           <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Home Page Content</h1>
           <p className="text-white/80 text-sm">Manage the sections and text blocks displayed on your landing page.</p>
         </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Hero Section</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1">Subtitle <span className="text-xs text-brand-gray font-normal">(Recommended: 3-5 words)</span></label>
              <input type="text" value={content.home.hero.subtitle} onChange={e => setContent({...content, home: {...content.home, hero: {...content.home.hero, subtitle: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1">Main Heading <span className="text-xs text-brand-gray font-normal">(Recommended: 5-8 words. Use HTML tags like &lt;span class="italic text-brand-forest"&gt; for highlighted words)</span></label>
              <input type="text" value={content.home.hero.title} onChange={e => setContent({...content, home: {...content.home, hero: {...content.home.hero, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1">Description <span className="text-xs text-brand-gray font-normal">(Recommended: 15-25 words)</span></label>
              <textarea rows={2} value={content.home.hero.desc} onChange={e => setContent({...content, home: {...content.home, hero: {...content.home.hero, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">&quot;Who We Are&quot; Section</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Title <span className="text-xs text-brand-gray font-normal">(Recommended: 4-8 words)</span></label>
                <input type="text" value={content.home.whoWeAre.title} onChange={e => setContent({...content, home: {...content.home, whoWeAre: {...content.home.whoWeAre, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Description <span className="text-xs text-brand-gray font-normal">(Recommended: 50-80 words. Use \n for paragraphs)</span></label>
                <textarea rows={4} value={content.home.whoWeAre.desc} onChange={e => setContent({...content, home: {...content.home, whoWeAre: {...content.home.whoWeAre, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
            </div>
            <div>{renderUploadBox("Side Image", "whoWeAre")}</div>
          </div>
        </div>

        {/* Product Lifecycle */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">Product Lifecycle Section</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Title <span className="text-xs text-brand-gray font-normal">(Recommended: 2-5 words)</span></label>
                <input type="text" value={content.home.productLifecycle.title} onChange={e => setContent({...content, home: {...content.home, productLifecycle: {...content.home.productLifecycle, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-charcoal mb-1">Description <span className="text-xs text-brand-gray font-normal">(Recommended: 15-25 words)</span></label>
                <textarea rows={4} value={content.home.productLifecycle.desc} onChange={e => setContent({...content, home: {...content.home, productLifecycle: {...content.home.productLifecycle, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
              </div>
            </div>
            <div>{renderUploadBox("Infographic Image", "productLifecycle")}</div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-charcoal border-b border-brand-pale pb-4">&quot;Why Choose Us&quot; Section</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1">Section Title</label>
              <input type="text" value={content.home.whyChooseUs.title} onChange={e => setContent({...content, home: {...content.home, whyChooseUs: {...content.home.whyChooseUs, title: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1">Section Description</label>
              <input type="text" value={content.home.whyChooseUs.desc} onChange={e => setContent({...content, home: {...content.home, whyChooseUs: {...content.home.whyChooseUs, desc: e.target.value}}})} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale" />
            </div>
          </div>
          
          <h3 className="text-sm font-semibold text-brand-charcoal mb-4 border-t border-brand-pale pt-4">Cards Grid</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.home.whyChooseUs.cards.map((card, i) => (
              <div key={i} className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale space-y-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">Card {i + 1} Title <span className="font-normal text-brand-gray">(2-4 words)</span></label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      const newCards = [...content.home.whyChooseUs.cards];
                      newCards[i].title = e.target.value;
                      setContent({ ...content, home: { ...content.home, whyChooseUs: { ...content.home.whyChooseUs, cards: newCards } } });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale font-medium text-brand-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">Description <span className="font-normal text-brand-gray">(10-15 words)</span></label>
                  <textarea
                    rows={2}
                    value={card.desc}
                    onChange={(e) => {
                      const newCards = [...content.home.whyChooseUs.cards];
                      newCards[i].desc = e.target.value;
                      setContent({ ...content, home: { ...content.home, whyChooseUs: { ...content.home.whyChooseUs, cards: newCards } } });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 sticky bottom-6 z-20">
          <button type="submit" disabled={saving}
            className="px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center gap-2 shadow-xl shadow-brand-forest/20">
            {saving ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Publish Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
