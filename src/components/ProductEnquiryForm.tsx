"use client";
import { useState, FormEvent } from "react";

interface ProductEnquiryFormProps {
  productName: string;
  productSlug: string;
}

export default function ProductEnquiryForm({ productName, productSlug }: ProductEnquiryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productName,
          productSlug,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-6 py-3.5 bg-brand-charcoal text-white font-semibold rounded-full hover:bg-brand-gray transition-all flex items-center justify-center gap-2 shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </svg>
        Request a Quote
      </button>
    );
  }

  if (submitted) {
    return (
      <div className="bg-brand-mint/20 border border-brand-leaf/30 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h4 className="font-display text-lg font-bold text-brand-charcoal mb-1">Quote Requested!</h4>
        <p className="text-sm text-brand-gray mb-4">
          We&apos;ll get back to you within 24 hours with pricing for <strong>{productName}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setIsOpen(false); }}
          className="text-sm text-brand-forest font-semibold hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-brand-pale rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display text-lg font-bold text-brand-charcoal">Request a Quote</h4>
        <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-brand-pale flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-brand-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <p className="text-sm text-brand-gray mb-5">
        Fill in your details and we&apos;ll send you a quote for <strong className="text-brand-charcoal">{productName}</strong>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input type="text" name="name" required placeholder="Your Name *"
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60" />
          </div>
          <div>
            <input type="tel" name="phone" required placeholder="Phone Number *"
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60" />
          </div>
        </div>
        <input type="email" name="email" required placeholder="Email Address *"
          className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60" />
        <div className="grid grid-cols-2 gap-3">
          <input type="text" name="company" placeholder="Company Name"
            className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60" />
          <input type="text" name="quantity" placeholder="Required Qty (e.g. 5000 pcs)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60" />
        </div>
        <textarea name="message" rows={3} placeholder="Any specific requirements? (sizes, printing, etc.)"
          className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-none placeholder:text-brand-gray/60" />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Quote Request
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
