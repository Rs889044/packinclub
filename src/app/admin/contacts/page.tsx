"use client";
import { useEffect, useState } from "react";
import type { Contact } from "@/types";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "read", label: "Read", color: "bg-gray-50 text-gray-700 border-gray-200" },
  { value: "replied", label: "Replied", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "converted", label: "Converted", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "closed", label: "Closed", color: "bg-red-50 text-red-700 border-red-200" },
];

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/contacts").then(r => r.json()).then(c => { setContacts(c); setLoading(false); });
  }, []);

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status: status as Contact["status"] } : c));
  }

  const filtered = filter === "all" ? contacts : contacts.filter(c => c.status === filter);
  const newCount = contacts.filter(c => c.status === "new").length;

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
            Contact Submissions
            {newCount > 0 && (
              <span className="ml-3 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {newCount} new
              </span>
            )}
          </h1>
          <p className="text-brand-gray mt-1">{contacts.length} submissions total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "new", "read", "replied", "converted", "closed"].map(f => (
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
          <div className="text-4xl mb-4">📭</div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2">No submissions found</h3>
          <p className="text-sm text-brand-gray">
            {filter === "all" ? "Contact form submissions will appear here." : `No ${filter} submissions.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-pale overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-sand/50 border-b border-brand-pale">
                  <th className="text-left px-6 py-4 font-medium text-brand-gray">Name</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray">Email</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray hidden md:table-cell">Phone</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Interest</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray">Status</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray">Date</th>
                  <th className="px-6 py-4 font-medium text-brand-gray w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pale">
                {filtered.map((c) => (
                  <> 
                    <tr key={c.id} className="hover:bg-brand-sand/30 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                      <td className="px-6 py-4 font-medium text-brand-charcoal">{c.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${c.email}`} className="text-brand-forest hover:underline" onClick={e => e.stopPropagation()}>{c.email}</a>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <a href={`tel:${c.phone}`} className="text-brand-gray hover:text-brand-forest" onClick={e => e.stopPropagation()}>{c.phone}</a>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-pale text-brand-forest">{c.interest}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={c.status || "new"}
                          onChange={(e) => { e.stopPropagation(); updateStatus(c.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            statusOptions.find(s => s.value === (c.status || "new"))?.color || "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {statusOptions.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-brand-gray text-xs">
                        {new Date(c.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <svg className={`w-4 h-4 text-brand-gray transition-transform ${expanded === c.id ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6"/></svg>
                      </td>
                    </tr>
                    {expanded === c.id && (
                      <tr key={`${c.id}-msg`}>
                        <td colSpan={7} className="px-6 py-4 bg-brand-sand/30">
                          <div className="space-y-3">
                            <div className="md:hidden grid grid-cols-2 gap-3 text-sm">
                              <div><span className="text-brand-gray">Phone:</span> <a href={`tel:${c.phone}`} className="text-brand-forest">{c.phone}</a></div>
                              <div><span className="text-brand-gray">Company:</span> <span className="text-brand-charcoal">{c.company || "—"}</span></div>
                              <div><span className="text-brand-gray">Interest:</span> <span className="text-brand-charcoal">{c.interest}</span></div>
                            </div>
                            <div className="hidden md:block"><span className="text-brand-gray text-sm">Company:</span> <span className="text-brand-charcoal text-sm font-medium">{c.company || "—"}</span></div>
                            <div>
                              <p className="text-xs font-medium text-brand-gray mb-1">Message:</p>
                              <p className="text-sm text-brand-charcoal bg-white rounded-xl p-4 border border-brand-pale">
                                {c.message || <span className="text-brand-gray italic">No message provided</span>}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a href={`mailto:${c.email}`}
                                className="px-4 py-2 text-xs font-medium text-brand-forest bg-brand-forest/5 rounded-lg hover:bg-brand-forest/10 transition-colors inline-flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                                Reply via Email
                              </a>
                              <a href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                                className="px-4 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors inline-flex items-center gap-1.5">
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
