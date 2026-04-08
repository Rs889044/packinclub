"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BlogPostClient({ content }: { content: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="py-12 md:py-16 bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-5"
      >
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-brand-charcoal prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-brand-gray prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-brand-charcoal
            prose-a:text-brand-forest prose-a:font-medium hover:prose-a:text-brand-green
            prose-ul:text-brand-gray prose-ol:text-brand-gray
            prose-li:mb-1"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </motion.div>
    </section>
  );
}
