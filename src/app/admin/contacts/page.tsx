"use client";
import { useEffect, useState } from "react";
import type { Contact } from "@/types";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/contacts").then(r => r.json()).then(c => { setContacts(c); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Contact Submissions</h1>
        <p className="text-brand-gray mt-1">{contacts.length} submissions total</p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-pale p-12 text-center">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2">No submissions yet</h3>
          <p className="text-sm text-brand-gray">Contact form submissions will appear here.</p>
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
                  <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Company</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Interest</th>
                  <th className="text-left px-6 py-4 font-medium text-brand-gray">Date</th>
                  <th className="px-6 py-4 font-medium text-brand-gray w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pale">
                {contacts.map((c) => (
                  <>
                    <tr key={c.id} className="hover:bg-brand-sand/30 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                      <td className="px-6 py-4 font-medium text-brand-charcoal">{c.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${c.email}`} className="text-brand-forest hover:underline">{c.email}</a>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <a href={`tel:${c.phone}`} className="text-brand-gray hover:text-brand-forest">{c.phone}</a>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell text-brand-gray">{c.company || "—"}</td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-pale text-brand-forest">{c.interest}</span>
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
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
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
