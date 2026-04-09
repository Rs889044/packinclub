"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  image?: string;
  gallery?: string[];
  name: string;
}

export default function ProductGallery({ image, gallery = [], name }: ProductGalleryProps) {
  const images = image ? [image, ...gallery] : gallery;
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-brand-forest/5 border border-brand-pale aspect-square flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-brand-sand rounded-2xl text-6xl text-brand-gray/30">
          No Image
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-white rounded-3xl p-4 shadow-xl shadow-brand-forest/5 border border-brand-pale relative overflow-hidden flex items-center justify-center aspect-square">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeIdx}
            src={images[activeIdx]}
            alt={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain rounded-2xl bg-[#F7F5F0]"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                activeIdx === idx ? "border-brand-forest shadow-md" : "border-brand-pale hover:border-brand-forest/40 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
