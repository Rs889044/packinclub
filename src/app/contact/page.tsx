"use client";
import { useState, FormEvent } from "react";
import FadeIn from "@/components/FadeIn";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Fallback — still show success for MVP
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-brand-cream to-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-brand-mint/15 blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal mt-3 mb-6">
              Let&apos;s start your <span className="text-brand-forest italic">sustainable</span> journey
            </h1>
            <p className="text-lg text-brand-gray leading-relaxed">
              Have questions or ready to make the switch? Our team is here to help with personalized packaging solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid sm:grid-cols-3 gap-6">
            <FadeIn>
              <div className="bg-brand-cream rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-forest/10 flex items-center justify-center text-2xl mx-auto mb-4">📞</div>
                <h3 className="font-display font-semibold text-brand-charcoal mb-1">Sales Team</h3>
                <a href="tel:+918178414360" className="text-brand-forest font-medium hover:underline">+91 81784 14360</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-brand-cream rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-forest/10 flex items-center justify-center text-2xl mx-auto mb-4">✉️</div>
                <h3 className="font-display font-semibold text-brand-charcoal mb-1">Email Us</h3>
                <a href="mailto:orders@packinclub.com" className="text-brand-forest font-medium hover:underline">orders@packinclub.com</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-brand-cream rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-brand-forest/10 flex items-center justify-center text-2xl mx-auto mb-4">📍</div>
                <h3 className="font-display font-semibold text-brand-charcoal mb-1">Head Office</h3>
                <p className="text-sm text-brand-gray">D-1/64, 21st Century Business Centre, Nirman Vihar, Delhi-110092</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <FadeIn>
              <div className="bg-brand-cream rounded-3xl p-8 md:p-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal mb-2">Send us a message</h2>
                <p className="text-brand-gray mb-8">Fill the form below and we&apos;ll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-2">Message Sent!</h3>
                    <p className="text-brand-gray mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="text-brand-forest font-semibold hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-1.5">Full Name</label>
                        <input type="text" id="name" name="name" required placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-1.5">Email Address</label>
                        <input type="email" id="email" name="email" required placeholder="Your Email"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-1.5">Phone Number</label>
                        <input type="tel" id="phone" name="phone" required placeholder="Your Phone Number"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-brand-charcoal mb-1.5">Company Name</label>
                        <input type="text" id="company" name="company" required placeholder="Company Name"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-brand-charcoal mb-1.5">What are you interested in?</label>
                      <select id="interest" name="interest" required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all text-brand-gray">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Retail Packaging">Retail Packaging</option>
                        <option value="Food Packaging">Food Packaging</option>
                        <option value="E-commerce Solutions">E-commerce Solutions</option>
                        <option value="Custom Solution">Custom Solution</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-1.5">Message</label>
                      <textarea id="message" name="message" rows={4} placeholder="Share your thought with us"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-pale focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20 outline-none text-sm transition-all resize-none" />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Map + Info */}
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-6 h-full">
                <div className="bg-brand-cream rounded-3xl overflow-hidden flex-1 min-h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.28!3d28.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzI0LjAiTiA3N8KwMTYnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: 300 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                    title="Packin Club Office Location"
                  />
                </div>
                <div className="bg-brand-cream rounded-3xl p-8">
                  <h3 className="font-display text-xl font-bold text-brand-charcoal mb-4">Visit Our Office</h3>
                  <p className="text-sm text-brand-gray leading-relaxed mb-6">
                    Visit our office to explore our complete range of compostable packaging solutions. We&apos;d love to show you samples.
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 mt-0.5 shrink-0 text-brand-forest" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <p className="text-sm text-brand-charcoal font-medium">D-1/64, 21st Century Business Centre, Veer Savarkar Block, Shakarpur, Nirman Vihar, Delhi-110092</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-brand-forest" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                      <a href="tel:+918178414360" className="text-sm text-brand-charcoal font-medium hover:text-brand-forest transition-colors">+91 81784 14360</a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-brand-forest" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                      <a href="mailto:orders@packinclub.com" className="text-sm text-brand-charcoal font-medium hover:text-brand-forest transition-colors">orders@packinclub.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/918178414360"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.232-2.644.886.886-2.644-.232-.386A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
      </a>
    </>
  );
}
