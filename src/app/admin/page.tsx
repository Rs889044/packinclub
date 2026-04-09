"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product, Blog, Contact } from "@/types";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products").then(r => r.json()),
      fetch("/api/admin/blogs").then(r => r.json()),
      fetch("/api/admin/contacts").then(r => r.json()),
    ]).then(([p, b, c]) => {
      setProducts(p);
      setBlogs(b);
      setContacts(c);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", color: "bg-blue-50 text-blue-600", href: "/admin/products" },
    { label: "Blog Posts", value: blogs.length, icon: "📝", color: "bg-emerald-50 text-emerald-600", href: "/admin/blogs" },
    { label: "Contact Submissions", value: contacts.length, icon: "📬", color: "bg-amber-50 text-amber-600", href: "/admin/contacts" },
    { label: "Featured Products", value: products.filter(p => p.featured).length, icon: "⭐", color: "bg-purple-50 text-purple-600", href: "/admin/products" },
  ];

  const recentContacts = contacts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Dashboard</h1>
        <p className="text-brand-gray mt-1">Welcome to the Packin Club admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-brand-pale hover:shadow-lg hover:shadow-brand-forest/5 transition-all group-hover:-translate-y-0.5">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-xl mb-4`}>
                {s.icon}
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">{s.value}</div>
              <div className="text-sm text-brand-gray mt-1">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
        <Link href="/admin/products/new" className="group">
          <div className="bg-brand-forest rounded-2xl p-6 text-white hover:bg-brand-green transition-all group-hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
              <h3 className="font-display text-lg font-semibold">Add New Product</h3>
            </div>
            <p className="text-white/70 text-sm">Create a new compostable packaging product listing.</p>
          </div>
        </Link>
        <Link href="/admin/blogs/new" className="group">
          <div className="bg-brand-charcoal rounded-2xl p-6 text-white hover:bg-brand-gray transition-all group-hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
              <h3 className="font-display text-lg font-semibold">Write New Blog Post</h3>
            </div>
            <p className="text-white/70 text-sm">Publish a new article on sustainability and packaging.</p>
          </div>
        </Link>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-2xl border border-brand-pale overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-brand-pale">
          <h2 className="font-display text-lg font-bold text-brand-charcoal">Recent Contact Submissions</h2>
          <Link href="/admin/contacts" className="text-sm text-brand-forest font-medium hover:underline">
            View all →
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="p-8 text-center text-brand-gray text-sm">
            No contact submissions yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-sand/50">
                  <th className="text-left px-6 py-3 font-medium text-brand-gray">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-brand-gray">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-brand-gray">Interest</th>
                  <th className="text-left px-6 py-3 font-medium text-brand-gray">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-pale">
                {recentContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-sand/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-charcoal">{c.name}</td>
                    <td className="px-6 py-4 text-brand-gray">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-pale text-brand-forest">{c.interest}</span>
                    </td>
                    <td className="px-6 py-4 text-brand-gray">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
