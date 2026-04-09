"use client";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

import { useState, useEffect } from "react";
import type { PageContent } from "@/types";

function PageHero({ content }: { content?: PageContent["about"]["hero"] }) {
  if (!content) {
    content = { title: "Every revolution starts with a moment of <span class=\"text-brand-forest italic\">realization</span>", subtitle: "About Us", desc: "For us, it was two." };
  }
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-brand-cream to-white relative overflow-hidden">
      <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-brand-mint/15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">{content.subtitle}</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal mt-3 mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
          <p className="text-lg text-brand-gray leading-relaxed">{content.desc}</p>
        </FadeIn>
      </div>
    </section>
  );
}

function OurStory({ content }: { content?: PageContent["about"]["story"] }) {
  if (!content) {
    content = {
      image: "",
      title: "From challenge to <span class=\"text-brand-forest italic\">opportunity</span>",
      subtitle: "Our Story",
      p1: "When India announced the single-use plastic ban, it wasn't just a policy change — it was personal. Coming from a second-generation plastic film trading family, our founder, Vikas Jha, saw both challenge and opportunity.",
      p2: "At the same time, a casual coffee meeting with a friend from Spain exposed the harsh realities behind so-called \"eco-friendly alternatives\" like paper straws — products that often fall short in real-world performance.",
      p3: "Packin Club was born from a simple but powerful question: <span class=\"font-semibold text-brand-charcoal\">Can we build packaging that's safe, strong, and truly sustainable?</span>"
    };
  }
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            {content.image ? (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-brand-pale shadow-lg bg-brand-sand/30 flex items-center justify-center p-2">
                <img src={content.image} alt="Our Story" className="w-full h-full object-cover rounded-xl" />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-pale via-brand-mint/20 to-brand-leaf/10 flex items-center justify-center overflow-hidden">
                <div className="text-center p-10">
                  <div className="text-7xl mb-4">🌿</div>
                  <p className="font-display text-2xl text-brand-forest font-semibold">Our Story</p>
                  <p className="text-sm text-brand-gray mt-2">From plastic trading to planet saving</p>
                </div>
              </div>
            )}
          </FadeIn>
          <FadeIn delay={0.15}>
            <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">{content.subtitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-3 mb-6" dangerouslySetInnerHTML={{ __html: content.title }} />
            <p className="text-brand-gray leading-relaxed mb-4">{content.p1}</p>
            <p className="text-brand-gray leading-relaxed mb-4">{content.p2}</p>
            <p className="text-brand-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p3.replace("Can we build packaging that's safe, strong, and truly sustainable?", '<span class="font-semibold text-brand-charcoal">Can we build packaging that\'s safe, strong, and truly sustainable?</span>') }} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FounderMessage({ content }: { content?: PageContent["about"]["founder"] }) {
  if (!content) {
    content = { quote: "I couldn't accept that the cost of convenience should be human health or nature's future.", desc: "That's why we're building packaging that's safe, strong, and truly sustainable — for businesses, for families, and for tomorrow. It's not just about what we make; it's about what we leave behind.", name: "Vikas Jha", role: "Founder, Packin Club" };
  }
  return (
    <section className="py-20 md:py-28 bg-brand-cream">
      <div className="max-w-4xl mx-auto px-5">
        <FadeIn>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-pale relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-forest" />
            <div className="absolute top-6 right-8 text-7xl text-brand-pale font-display">&ldquo;</div>
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-display text-brand-charcoal leading-relaxed mb-4 italic">
                {content.quote}
              </p>
              <p className="text-brand-gray leading-relaxed mb-6">
                {content.desc}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-forest/10 flex items-center justify-center text-2xl overflow-hidden">
                  👤
                </div>
                <div>
                  <p className="font-display font-semibold text-brand-charcoal">{content.name}</p>
                  <p className="text-sm text-brand-gray">{content.role}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Leadership({ content }: { content?: PageContent["about"]["leadership"] }) {
  if (!content) {
    content = {
      title: "Meet the team behind the mission",
      team: [
        { name: "Vikas Jha", role: "Founder", bio: "MBA in Marketing & Operations, second-generation entrepreneur. Experience in sales, marketing and branding across startups, trading, and sustainability-driven projects.", image: "👨‍💼" },
        { name: "Rajat Sharma", role: "Co-founder", bio: "Passionate about innovation, engineering, and building solutions for a plastic-free future. Drives operations and product development at Packin Club.", image: "👨‍💻" }
      ]
    };
  }
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-leaf tracking-widest uppercase">Leadership</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-charcoal mt-3 mb-4">
            {content.title}
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {content.team.map((l, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="bg-brand-cream rounded-2xl p-8 text-center hover:shadow-lg transition-shadow h-full border border-brand-pale">
                <div className={`w-28 h-28 rounded-full bg-white border border-brand-pale mx-auto mb-5 overflow-hidden flex items-center justify-center shadow-inner ${l.image.startsWith("http") ? "" : "text-6xl bg-brand-forest/5"}`}>
                  {l.image && l.image.startsWith("http") ? (
                    <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  ) : (
                    l.image || "👤"
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-charcoal">{l.name}</h3>
                <p className="text-sm text-brand-forest font-medium mt-1 mb-4">{l.role}</p>
                <p className="text-sm text-brand-gray leading-relaxed">{l.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy({ content }: { content?: PageContent["about"]["philosophy"] }) {
  if (!content) {
    content = {
      title: "Impact Through Innovation", desc: "We believe in building a business that serves both commerce and the planet.",
      items: [
        { icon: "🔬", title: "Science Over Shortcuts", desc: "We back every claim with research, testing, and certified manufacturing." },
        { icon: "🤝", title: "Partnerships Over Transactions", desc: "We build long-term relationships with brands who share our vision." },
        { icon: "🌍", title: "Planet Over Profit", desc: "Every business decision is filtered through its environmental impact." },
        { icon: "📐", title: "Quality Without Compromise", desc: "Compostable doesn't mean weak — our products match plastic in strength." }
      ]
    };
  }
  return (
    <section className="py-20 md:py-28 bg-brand-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='white'/%3E%3C/svg%3E")` }} />
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-brand-mint tracking-widest uppercase">Our Philosophy</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">{content.title}</h2>
          <p className="text-brand-mint/80">{content.desc}</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {content.items.map((b, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all h-full border border-white/10">
                <span className="text-3xl block mb-3">{b.icon}</span>
                <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionVision({ content }: { content?: PageContent["about"] }) {
  if (!content) {
    content = {
      hero: { title: "", subtitle: "", desc: "" },
      story: { title: "", subtitle: "", p1: "", p2: "", p3: "", image: "" },
      founder: { quote: "", desc: "", name: "", role: "" },
      leadership: { title: "", team: [] },
      philosophy: { title: "", desc: "", items: [] },
      mission: { title: "Our Mission", desc: "To eliminate single-use plastic from India's packaging ecosystem by providing compostable alternatives that match plastic in strength, affordability, and convenience — empowering every business to make the sustainable switch." },
      vision: { title: "Vision 2030", desc: "To make compostable packaging the default choice across India — serving over 10,000 businesses, diverting millions of kilograms of plastic from landfills, and proving that sustainability and profitability can grow together." }
    };
  }
  return (
    <section className="py-20 md:py-28 bg-brand-cream border-b border-brand-pale">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-white rounded-2xl p-8 md:p-10 h-full border border-brand-pale">
              <div className="w-14 h-14 rounded-xl bg-brand-forest/10 flex items-center justify-center text-2xl mb-5">🎯</div>
              <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-4">{content.mission.title}</h3>
              <p className="text-brand-gray leading-relaxed whitespace-pre-line">{content.mission.desc}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl p-8 md:p-10 h-full border border-brand-pale">
              <div className="w-14 h-14 rounded-xl bg-brand-forest/10 flex items-center justify-center text-2xl mb-5">🔭</div>
              <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-4">{content.vision.title}</h3>
              <p className="text-brand-gray leading-relaxed whitespace-pre-line">{content.vision.desc}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function JoinUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-charcoal mb-6">
            Let&apos;s Create Sustainable Change Together
          </h2>
          <p className="text-lg text-brand-gray mb-10 max-w-2xl mx-auto">
            Whether you&apos;re a business looking for sustainable packaging solutions or an individual passionate about environmental change, there&apos;s a place for you in our story.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 bg-brand-forest text-white font-semibold rounded-full hover:bg-brand-green transition-all hover:shadow-lg">
              Partner With Us
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [content, setContent] = useState<PageContent | null>(null);
  
  useEffect(() => {
    fetch("/api/admin/content").then(r => r.json()).then(setContent);
  }, []);

  return (
    <>
      <PageHero content={content?.about?.hero} />
      <OurStory content={content?.about?.story} />
      <FounderMessage content={content?.about?.founder} />
      <Leadership content={content?.about?.leadership} />
      <Philosophy content={content?.about?.philosophy} />
      <MissionVision content={content?.about} />
      <JoinUs />
    </>
  );
}
