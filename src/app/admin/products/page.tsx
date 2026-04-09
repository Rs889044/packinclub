"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/products").then(r => r.json()).then(p => { setProducts(p); setLoading(false); });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetch("/api/admin/cleanup", { method: "POST" });
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    setDeleting(null);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal">Products</h1>
          <p className="text-brand-gray mt-1">{products.length} products total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-forest text-white text-sm font-semibold rounded-xl hover:bg-brand-green transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 4v16m8-8H4"/></svg>
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-brand-pale overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-sand/50 border-b border-brand-pale">
                <th className="text-left px-6 py-4 font-medium text-brand-gray">Image</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray">Name</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 font-medium text-brand-gray hidden lg:table-cell">Featured</th>
                <th className="text-right px-6 py-4 font-medium text-brand-gray">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pale">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-brand-sand/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-pale flex items-center justify-center overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">📦</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-brand-charcoal">{p.name}</div>
                    <div className="text-xs text-brand-gray mt-0.5 truncate max-w-[200px]">{p.description}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-pale text-brand-forest">{p.category}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {p.featured ? (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">⭐ Featured</span>
                    ) : (
                      <span className="text-xs text-brand-gray">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium text-brand-forest bg-brand-forest/5 rounded-lg hover:bg-brand-forest/10 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deleting === p.id}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {deleting === p.id ? "..." : "Delete"}
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
