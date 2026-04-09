"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsClient({ faqs }: { faqs: { question: string, answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? "bg-white border-brand-leaf shadow-sm" : "bg-brand-sand/30 border-brand-pale hover:bg-brand-sand/70"}`}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-brand-charcoal focus:outline-none"
            >
              <span>{faq.question}</span>
              <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center transition-colors ${isOpen ? "bg-brand-forest text-white" : "bg-brand-pale text-brand-forest"}`}>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-brand-gray leading-relaxed text-sm">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
