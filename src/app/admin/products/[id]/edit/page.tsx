"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/types";

const categories = ["Retail Packaging", "Industrial Packaging", "Agriculture & Nursery", "Bags on Roll"];

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: categories[0],
    description: "",
    longDescription: "",
    featured: false,
  });

  const [keyFeatures, setKeyFeatures] = useState("");
  const [applications, setApplications] = useState("");
  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>([]);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(r => r.json())
      .then((products: Product[]) => {
        const p = products.find(p => p.id === parseInt(id));
        if (p) {
          setForm({
            name: p.name,
            slug: p.slug,
            category: p.category,
            description: p.description,
            longDescription: p.longDescription || "",
            featured: p.featured || false,
          });
          setImageUrl(p.image || "");
          setKeyFeatures(p.keyFeatures ? p.keyFeatures.join("\n") : "");
          setApplications(p.applications ? p.applications.join("\n") : "");
          setFaqs(p.faqs || []);
        }
        setFetching(false);
      });
  }, [id]);

  function updateField(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch { /* ignore */ }
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      image: imageUrl,
      keyFeatures: keyFeatures.split("\n").map(s => s.trim()).filter(Boolean),
      applications: applications.split("\n").map(s => s.trim()).filter(Boolean),
      faqs
    };

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/products");
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
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-forest transition-colors mb-4">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Products
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-brand-pale p-6 md:p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-2">Product Name</label>
            <input type="text" id="name" required value={form.name} onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-brand-charcoal mb-2">URL Slug</label>
            <input type="text" id="slug" required value={form.slug} onChange={(e) => updateField("slug", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all text-brand-gray" />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-brand-charcoal mb-2">Category</label>
            <select id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-brand-charcoal mb-2">Short Description</label>
            <textarea id="description" rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-none" />
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-brand-charcoal mb-2">
              Full Description <span className="text-brand-gray font-normal">(HTML supported)</span>
            </label>
            <textarea id="longDescription" rows={6} value={form.longDescription} onChange={(e) => updateField("longDescription", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-y font-mono" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="keyFeatures" className="block text-sm font-medium text-brand-charcoal mb-2">
                Key Features <span className="text-brand-gray font-normal">(One per line)</span>
              </label>
              <textarea id="keyFeatures" rows={5} value={keyFeatures} onChange={(e) => setKeyFeatures(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-y" />
            </div>
            <div>
              <label htmlFor="applications" className="block text-sm font-medium text-brand-charcoal mb-2">
                Applications <span className="text-brand-gray font-normal">(One per line)</span>
              </label>
              <textarea id="applications" rows={5} value={applications} onChange={(e) => setApplications(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-brand-sand border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-y" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-brand-charcoal">FAQs</label>
              <button
                type="button"
                onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
                className="text-xs font-semibold text-brand-forest bg-brand-mint/30 px-2.5 py-1 rounded-md hover:bg-brand-mint/50"
              >
                + Add FAQ
              </button>
            </div>
            {faqs.length === 0 ? (
              <div className="text-sm text-brand-gray italic p-4 border border-dashed border-brand-pale rounded-xl text-center">No FAQs added.</div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-brand-sand/50 p-4 rounded-xl border border-brand-pale relative">
                    <button type="button" onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold w-6 h-6 flex items-center justify-center">✕</button>
                    <input type="text" placeholder="Question?" value={faq.question} onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].question = e.target.value;
                      setFaqs(newFaqs);
                    }} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale mb-2 font-medium text-brand-charcoal" />
                    <textarea placeholder="Answer..." rows={2} value={faq.answer} onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].answer = e.target.value;
                      setFaqs(newFaqs);
                    }} className="w-full px-3 py-2 text-sm rounded-lg border border-brand-pale resize-none" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">Product Image</label>
            {imageUrl ? (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-brand-pale">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">✕</button>
              </div>
            ) : (
              <label className="block w-full p-8 border-2 border-dashed border-brand-pale rounded-xl text-center cursor-pointer hover:border-brand-forest/30 hover:bg-brand-sand/50 transition-all">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
                {uploading ? (
                  <div className="flex items-center justify-center gap-2 text-brand-gray text-sm">
                    <div className="w-4 h-4 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <>
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm text-brand-gray">Click to upload product image</p>
                  </>
                )}
              </label>
            )}
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} className="sr-only" />
              <div className={`w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-brand-forest" : "bg-brand-pale"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${form.featured ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </div>
            </div>
            <span className="text-sm font-medium text-brand-charcoal">Featured product</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading}
            className="px-8 py-3 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center gap-2 shadow-sm">
            {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>) : "Save Changes"}
          </button>
          <Link href="/admin/products" className="px-6 py-3 text-brand-gray font-medium hover:text-brand-charcoal transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
