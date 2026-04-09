"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Blog } from "@/types";

const categoryColors: Record<string, string> = {
  Industries: "bg-blue-50 text-blue-700",
  Sustainability: "bg-emerald-50 text-emerald-700",
  Health: "bg-rose-50 text-rose-700",
  "Inside Packin": "bg-amber-50 text-amber-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("/api/admin/blogs").then(r => r.json()).then(setBlogs);
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];
  const filtered = active === "All" ? blogs : blogs.filter((b) => b.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-brand-cream to-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-brand-mint/15 blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Blog &amp; Resources</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal mt-3 mb-6">
              Insights for a <span className="text-brand-forest italic">sustainable</span> future
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Expert articles on compostable packaging, sustainability trends, industry insights, and the science behind going plastic-free.
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

          {/* Post count */}
          <p className="text-sm text-brand-gray mb-8 text-center">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && <> in <span className="font-semibold text-brand-forest">{active}</span></>}
          </p>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="bg-brand-cream rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-forest/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="aspect-[3/2] bg-gradient-to-br from-brand-pale via-brand-mint/20 to-brand-leaf/10 flex items-center justify-center relative overflow-hidden">
                        {post.thumbnail ? (
                          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                            {post.category === "Industries" ? "🏭" : post.category === "Health" ? "💚" : "🌿"}
                          </div>
                        )}
                        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-50 text-gray-700"}`}>
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-brand-gray mb-3">
                          <span>{formatDate(post.date)}</span>
                          <span className="w-1 h-1 rounded-full bg-brand-gray/40" />
                          <span>{post.author}</span>
                        </div>
                        <h2 className="font-display text-lg font-bold text-brand-charcoal mb-3 group-hover:text-brand-forest transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-sm text-brand-gray leading-relaxed flex-1 mb-4">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-forest group-hover:gap-2.5 transition-all">
                          Read More
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">
              Ready to make the switch?
            </h2>
            <p className="text-brand-gray mb-10 text-lg">
              Explore our full range of compostable packaging products and find the right solution for your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="px-8 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-all">
                Explore Products
              </Link>
              <Link href="/contact" className="px-8 py-3.5 border-2 border-brand-forest text-brand-forest font-semibold rounded-full hover:bg-brand-forest hover:text-white transition-all">
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
