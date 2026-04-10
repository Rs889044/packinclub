"use client";
import { useState, FormEvent, useEffect } from "react";

export default function RequestCallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // silent fail for MVP
    } finally {
      setSubmitted(true);
      setLoading(false);
      form.reset();
      setTimeout(() => { setSubmitted(false); setIsOpen(false); }, 3000);
    }
  }

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
    }`}>
      {/* Expanded Form */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-brand-pale w-72 overflow-hidden animate-in slide-in-from-bottom-2">
          {submitted ? (
            <div className="p-6 text-center">
              <div className="text-3xl mb-2">📞</div>
              <h4 className="font-display font-bold text-brand-charcoal mb-1">We&apos;ll call you!</h4>
              <p className="text-xs text-brand-gray">Expect a call shortly.</p>
            </div>
          ) : (
            <>
              <div className="bg-brand-forest p-4 flex items-center justify-between">
                <div className="text-white">
                  <h4 className="font-display font-bold text-sm">Request a Callback</h4>
                  <p className="text-[11px] text-white/70">We&apos;ll call you back</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Your phone number *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all placeholder:text-brand-gray/60"
                />
                <select
                  name="preferredTime"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-sand/50 border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all text-brand-gray"
                >
                  <option value="Anytime">Anytime</option>
                  <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                  <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                  <option value="Evening (3PM-6PM)">Evening (3PM-6PM)</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  ) : (
                    <>
                      Call Me Back
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-all hover:-translate-y-1 ${
          isOpen
            ? "bg-brand-charcoal hover:bg-brand-gray shadow-brand-charcoal/20"
            : "bg-brand-forest hover:bg-brand-green shadow-brand-forest/30"
        }`}
        aria-label="Request a callback"
      >
        {!isOpen && (
          <span className="absolute inset-0 w-full h-full rounded-full bg-brand-forest opacity-20 animate-ping group-hover:hidden" />
        )}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 md:w-8 md:h-8 text-white relative z-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          )}
        </svg>
      </button>
    </div>
  );
}
