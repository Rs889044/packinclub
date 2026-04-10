"use client";
import { useEffect, useState, FormEvent } from "react";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", company: "", role: "", quote: "", rating: 5 });

  useEffect(() => {
    fetch("/api/admin/testimonials").then(r => r.json()).then(t => { setTestimonials(t); setLoading(false); });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...formData }),
      });
      setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const res = await fetch("/api/admin/testimonials");
      setTestimonials(await res.json());
    }
    resetForm();
  }

  async function toggleVisibility(id: number, visible: boolean) {
    await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !visible }),
    });
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, visible: !visible } : t));
  }

  async function deleteTestimonial(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }

  function startEdit(t: Testimonial) {
    setFormData({ name: t.name, company: t.company, role: t.role, quote: t.quote, rating: t.rating });
    setEditingId(t.id);
    setShowForm(true);
  }

  function resetForm() {
    setFormData({ name: "", company: "", role: "", quote: "", rating: 5 });
    setEditingId(null);
    setShowForm(false);
  }

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
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Testimonials</h1>
          <p className="text-brand-gray mt-1">{testimonials.length} testimonials • {testimonials.filter(t => t.visible).length} visible on homepage</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="px-5 py-2.5 bg-brand-forest text-white font-medium rounded-xl hover:bg-brand-green transition-colors text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
          Add New
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-pale p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-brand-charcoal">
            {editingId ? "Edit Testimonial" : "Add New Testimonial"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <input type="text" placeholder="Client Name *" required value={formData.name}
              onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
              className="px-4 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest outline-none text-sm" />
            <input type="text" placeholder="Company" value={formData.company}
              onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
              className="px-4 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest outline-none text-sm" />
            <input type="text" placeholder="Role / Designation" value={formData.role}
              onChange={e => setFormData(f => ({ ...f, role: e.target.value }))}
              className="px-4 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest outline-none text-sm" />
          </div>
          <textarea placeholder="Quote / Testimonial *" required rows={3} value={formData.quote}
            onChange={e => setFormData(f => ({ ...f, quote: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest outline-none text-sm resize-none" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-gray">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(r => (
                <button key={r} type="button" onClick={() => setFormData(f => ({ ...f, rating: r }))}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    r <= formData.rating ? "bg-amber-100 text-amber-500" : "bg-brand-pale text-brand-gray"
                  }`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 bg-brand-forest text-white font-medium rounded-xl hover:bg-brand-green transition-colors text-sm">
              {editingId ? "Update" : "Add Testimonial"}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-brand-pale text-brand-gray font-medium rounded-xl hover:bg-brand-sand transition-colors text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className={`bg-white rounded-2xl border p-6 transition-colors ${t.visible ? "border-brand-pale" : "border-red-200/50 bg-red-50/20"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-sm ${i < t.rating ? "text-amber-400" : "text-brand-pale"}`}>★</span>
                    ))}
                  </div>
                  {!t.visible && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">Hidden</span>}
                </div>
                <p className="text-brand-charcoal italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm">
                  <span className="font-semibold text-brand-charcoal">{t.name}</span>
                  {t.role && <span className="text-brand-gray"> • {t.role}</span>}
                  {t.company && <span className="text-brand-gray"> • {t.company}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleVisibility(t.id, t.visible)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    t.visible ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-brand-pale text-brand-gray hover:bg-brand-sand"
                  }`}>
                  {t.visible ? "Visible" : "Hidden"}
                </button>
                <button onClick={() => startEdit(t)}
                  className="w-8 h-8 rounded-lg bg-brand-pale flex items-center justify-center hover:bg-brand-sand transition-colors">
                  <svg className="w-3.5 h-3.5 text-brand-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => deleteTestimonial(t.id)}
                  className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                  <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
