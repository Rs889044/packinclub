"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Product } from "@/types";
import { useEffect, useState } from "react";

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-brand-pale/40 to-brand-cream">
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-brand-mint/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-brand-leaf/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C20 5 10 20 10 35s10 20 20 20c5 0 10-5 15-15' fill='none' stroke='%232D6A4F' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />

      <div className="max-w-7xl mx-auto px-5 py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-forest/10 text-brand-forest text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-leaf animate-pulse" />
              CPCB-Certified &bull; 100% Plant-Based
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-charcoal leading-[1.1] mb-6"
          >
            Packaging that{" "}
            <span className="text-brand-forest italic">returns</span>
            <br />to the earth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-brand-gray max-w-xl mb-10 leading-relaxed"
          >
            India&apos;s trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions. Replace single-use plastic without compromising strength.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products" className="px-8 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-all hover:shadow-lg hover:shadow-brand-forest/20">
              Explore Products
            </Link>
            <Link href="/about" className="px-8 py-3.5 border-2 border-brand-forest text-brand-forest font-semibold rounded-full hover:bg-brand-forest hover:text-white transition-all">
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Who We Are</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-3 mb-6">
              Replacing plastic,{" "}
              <span className="text-brand-forest italic">one package</span> at a time
            </h2>
            <p className="text-brand-gray leading-relaxed mb-4">
              At Packin Club, we help brands replace plastic with certified compostable packaging — without compromising on strength, durability, or quality. Based in Delhi, we serve e-commerce, retail, food delivery, logistics, and agriculture industries across India.
            </p>
            <p className="text-brand-gray leading-relaxed mb-8">
              Our products are 100% plant-based, fully decompose within 180 days, and match the performance of conventional plastic. Every bag, film, and pouch we make is a step towards a plastic-free future.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-brand-forest font-semibold hover:gap-3 transition-all">
              Learn more about us
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-pale via-brand-mint/30 to-brand-leaf/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌱</div>
                  <p className="font-display text-xl text-brand-forest font-semibold">100% Plant-Based</p>
                  <p className="text-sm text-brand-gray mt-1">Compostable in 180 days</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl bg-brand-forest/10 -z-10" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/admin/products").then(r => r.json()).then(setProducts);
  }, []);
  const featured = products.filter((p) => p.featured);
  const icons = ["📦", "🛍️", "🎞️", "🌾"];

  return (
    <section className="py-20 md:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Our Products</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-3 mb-4">
            India&apos;s widest range of compostable packaging
          </h2>
          <p className="text-brand-gray">From courier bags to agricultural films — we have a sustainable alternative for every plastic product you use.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Link href={`/product/${p.slug}`} className="group block bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-brand-forest/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-brand-pale flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">{icons[i]}</div>
                <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2 group-hover:text-brand-forest transition-colors">{p.name}</h3>
                <p className="text-sm text-brand-gray leading-relaxed flex-1">{p.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="inline-block text-xs font-medium text-brand-forest bg-brand-pale px-3 py-1 rounded-full">{p.category}</span>
                  <span className="text-xs font-bold text-brand-forest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Details <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14m-7-7l7 7-7 7"/></svg></span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-all">
            View All 24 Products
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: "Made from", plastic: "Petroleum", biodegradable: "Mixed materials", compostable: "100% plant-based" },
    { feature: "Decomposition", plastic: "400+ years", biodegradable: "Years (varies)", compostable: "90–180 days" },
    { feature: "Toxic residue", plastic: "Microplastics", biodegradable: "Possible", compostable: "None — becomes soil" },
    { feature: "Certification", plastic: "None required", biodegradable: "Often uncertified", compostable: "CPCB-certified" },
    { feature: "Strength", plastic: "High", biodegradable: "Variable", compostable: "Matches plastic" },
    { feature: "Environmental impact", plastic: "Severe harm", biodegradable: "Moderate", compostable: "Earth-positive" },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">The Difference</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-3 mb-4">Plastic vs Biodegradable vs Compostable</h2>
          <p className="text-brand-gray">Not all eco-friendly claims are equal. See why compostable packaging stands apart.</p>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-brand-pale">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-pale/50">
                  <th className="px-5 py-4 font-display font-semibold text-brand-charcoal">Feature</th>
                  <th className="px-5 py-4 font-display font-semibold text-red-600/80">Plastic</th>
                  <th className="px-5 py-4 font-display font-semibold text-yellow-600/80">Biodegradable</th>
                  <th className="px-5 py-4 font-display font-semibold text-brand-forest">Compostable ✓</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.feature} className={i % 2 ? "bg-brand-cream/30" : "bg-white"}>
                    <td className="px-5 py-3.5 font-medium text-brand-charcoal">{r.feature}</td>
                    <td className="px-5 py-3.5 text-brand-gray">{r.plastic}</td>
                    <td className="px-5 py-3.5 text-brand-gray">{r.biodegradable}</td>
                    <td className="px-5 py-3.5 text-brand-forest font-medium">{r.compostable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WhyChoose() {
  const features = [
    { icon: "🌿", title: "100% Plant-Based", desc: "Every product is made from renewable, plant-derived materials that fully decompose." },
    { icon: "💪", title: "Strength of Plastic", desc: "Our compostable products match the durability and performance of conventional plastic." },
    { icon: "🏭", title: "CPCB-Certified", desc: "All manufacturing partners are CPCB-certified, meeting India's highest standards." },
    { icon: "🎨", title: "Fully Customizable", desc: "Custom printing, sizing, and branding options for your unique business needs." },
    { icon: "📦", title: "Widest Range in India", desc: "24+ compostable product types across retail, industrial, and agriculture." },
    { icon: "🤝", title: "Dedicated Support", desc: "Personal account management and responsive customer support for every client." },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='white'/%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-mint tracking-widest uppercase">Why Packin Club</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">The smart switch to compostable</h2>
          <p className="text-brand-mint/80">Trusted by businesses across India to deliver sustainable packaging that performs.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all h-full">
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "24+", label: "Product Types" },
    { value: "180", label: "Days to Decompose" },
    { value: "100%", label: "Plant-Based" },
    { value: "6+", label: "Industries Served" },
  ];

  return (
    <section className="py-16 bg-brand-cream border-y border-brand-pale">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-brand-forest">{s.value}</div>
              <div className="text-sm text-brand-gray mt-1 font-medium">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-charcoal mb-6">Ready to make the switch?</h2>
          <p className="text-lg text-brand-gray mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses choosing compostable packaging. Tell us about your needs and we&apos;ll find the perfect sustainable solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-all hover:shadow-lg">
              Get a Quote
            </Link>
            <a href="https://wa.me/918178414360" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 border-2 border-brand-forest text-brand-forest font-semibold rounded-full hover:bg-brand-forest hover:text-white transition-all inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.232-2.644.886.886-2.644-.232-.386A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProducts />
      <ComparisonTable />
      <WhyChoose />
      <Stats />
      <CTA />
    </>
  );
}
