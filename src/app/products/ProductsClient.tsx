"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import type { Product } from "@/types";

const categories = ["All", "Retail Packaging", "Industrial Packaging", "Agriculture & Nursery", "Bags on Roll"];

const categoryIcons: Record<string, string> = {
  "Retail Packaging": "🛍️",
  "Industrial Packaging": "🏭",
  "Agriculture & Nursery": "🌾",
  "Bags on Roll": "📦",
};

interface ProductsClientProps {
  products: Product[];
  catalogPdf: string;
  heroTitle?: string;
  heroDesc?: string;
}

export default function ProductsClient({ products, catalogPdf, heroTitle, heroDesc }: ProductsClientProps) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-brand-cream to-white relative overflow-hidden">
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-brand-mint/15 blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Our Products</span>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal mt-3 mb-6"
              dangerouslySetInnerHTML={{ __html: heroTitle || "India&apos;s widest range of <span class=\"text-brand-forest italic\">compostable</span> packaging" }}
            />
            <p className="text-lg text-brand-gray leading-relaxed">
              {heroDesc || `Explore ${products.length} plant-based, CPCB-certified packaging products designed to replace single-use plastic across every industry.`}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          {/* Category tabs */}
          <FadeIn className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    active === cat
                      ? "bg-brand-forest text-white shadow-md shadow-brand-forest/20"
                      : "bg-brand-pale text-brand-gray hover:bg-brand-mint/30 hover:text-brand-charcoal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Product count */}
          <p className="text-sm text-brand-gray mb-8 text-center">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && <> in <span className="font-semibold text-brand-forest">{active}</span></>}
          </p>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/product/${p.slug}`} className="group bg-brand-cream rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-forest/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col block">
                    <div className="aspect-square bg-gradient-to-br from-brand-pale via-brand-mint/20 to-brand-leaf/10 flex items-center justify-center relative overflow-hidden">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {categoryIcons[p.category] || "📦"}
                        </span>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] font-semibold text-brand-forest bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2 group-hover:text-brand-forest transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-4">
                        {p.description}
                      </p>
                      <span className="inline-flex items-center justify-between mt-auto pt-4 border-t border-brand-pale text-sm font-semibold text-brand-forest">
                        View Details
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {catalogPdf && (
            <div className="flex justify-center mt-10">
              <a
                href={catalogPdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-brand-forest bg-brand-forest/5 border border-brand-forest/15 rounded-full hover:bg-brand-forest/10 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download Catalog
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Need a custom solution?</h2>
            <p className="text-brand-mint/80 mb-10 text-lg">
              We offer fully customizable packaging — custom sizes, printing, and branding. Tell us what you need and we&apos;ll make it happen.
            </p>
            <a
              href="https://wa.me/918178414360?text=Hi!%20I%20need%20a%20custom%20packaging%20solution.%20Can%20we%20discuss?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-forest font-semibold rounded-full hover:bg-brand-cream transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.232-2.644.886.886-2.644-.232-.386A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Discuss Custom Requirements
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
