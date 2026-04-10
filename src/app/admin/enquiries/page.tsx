"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Enquiry } from "@/types";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "read", label: "Read", color: "bg-gray-50 text-gray-700 border-gray-200" },
  { value: "replied", label: "Replied", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "quoted", label: "Quoted", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "converted", label: "Converted", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "closed", label: "Closed", color: "bg-red-50 text-red-700 border-red-200" },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/enquiries").then(r => r.json()).then(e => { setEnquiries(e); setLoading(false); });
  }, []);

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: status as Enquiry["status"] } : e));
  }

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.status === filter);
  const newCount = enquiries.filter(e => e.status === "new").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">
            Product Enquiries
            {newCount > 0 && (
              <span className="ml-3 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {newCount} new
              </span>
            )}
          </h1>
          <p className="text-brand-gray mt-1">{enquiries.length} total enquiries</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "new", "replied", "quoted", "converted", "closed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brand-forest text-white"
                  : "bg-brand-pale text-brand-gray hover:bg-brand-mint/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-pale p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2">No enquiries found</h3>
          <p className="text-sm text-brand-gray">
            {filter === "all" ? "Product enquiries will appear here." : `No ${filter} enquiries.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-brand-pale overflow-hidden">
              <div
                className="px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-brand-sand/30 transition-colors"
                onClick={() => setExpanded(expanded === e.id ? null : e.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-brand-charcoal truncate">{e.name}</h3>
                    <span className="text-xs text-brand-gray hidden sm:inline">•</span>
                    <span className="text-xs text-brand-gray hidden sm:inline">{e.company || "No company"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Link href={`/product/${e.productSlug}`} className="text-brand-forest font-medium hover:underline" onClick={ev => ev.stopPropagation()}>
                      {e.productName}
                    </Link>
                    {e.quantity && <span className="text-brand-gray">• Qty: {e.quantity}</span>}
                  </div>
                </div>
                <select
                  value={e.status}
                  onChange={(ev) => { ev.stopPropagation(); updateStatus(e.id, ev.target.value); }}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                    statusOptions.find(s => s.value === e.status)?.color || "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {statusOptions.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <span className="text-xs text-brand-gray hidden lg:block whitespace-nowrap">
                  {new Date(e.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <svg className={`w-4 h-4 text-brand-gray transition-transform shrink-0 ${expanded === e.id ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6"/></svg>
              </div>

              {expanded === e.id && (
                <div className="px-6 py-4 bg-brand-sand/30 border-t border-brand-pale space-y-3">
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div><span className="text-brand-gray">Email:</span> <a href={`mailto:${e.email}`} className="text-brand-forest hover:underline">{e.email}</a></div>
                    <div><span className="text-brand-gray">Phone:</span> <a href={`tel:${e.phone}`} className="text-brand-forest hover:underline">{e.phone}</a></div>
                    <div><span className="text-brand-gray">Date:</span> <span className="text-brand-charcoal">{new Date(e.createdAt).toLocaleString("en-IN")}</span></div>
                  </div>
                  {e.message && (
                    <div>
                      <p className="text-xs font-medium text-brand-gray mb-1">Message:</p>
                      <p className="text-sm text-brand-charcoal bg-white rounded-xl p-4 border border-brand-pale">{e.message}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <a href={`mailto:${e.email}?subject=Quote for ${e.productName} — Packin Club`}
                      className="px-4 py-2 text-xs font-medium text-brand-forest bg-brand-forest/5 rounded-lg hover:bg-brand-forest/10 transition-colors inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                      Reply via Email
                    </a>
                    <a href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors inline-flex items-center gap-1.5">
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
