import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import FadeIn from "@/components/FadeIn";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductGallery from "./ProductGallery";
import ProductEnquiryForm from "@/components/ProductEnquiryForm";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const products = getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Packin Club`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      siteName: "Packin Club",
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export const dynamic = "force-dynamic";

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const products = getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // WhatsApp Message encoding
  const waMessage = encodeURIComponent(`Hi! I'm interested in ${product.name}. Can you share more details and pricing?`);
  const waLink = `https://wa.me/918178414360?text=${waMessage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image ? [product.image, ...(product.gallery || [])] : [],
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Packin Club"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR",
      "price": "0.00",
      "seller": {
        "@type": "Organization",
        "name": "Packin Club"
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-6 md:mb-10">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-gray hover:text-brand-forest transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Products
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Gallery */}
            <FadeIn>
              <ProductGallery image={product.image} gallery={product.gallery} name={product.name} />
            </FadeIn>

            {/* Product Info */}
            <FadeIn delay={0.1}>
              <span className="inline-block px-3 py-1 bg-brand-pale text-brand-forest text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-brand-gray leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Price / CTA Area */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-pale shadow-sm mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm font-medium text-brand-gray mb-1">Bulk Orders & Customization</div>
                    <div className="text-xl font-bold text-brand-forest">Get a Quote</div>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-forest text-white font-bold rounded-full hover:bg-brand-green transition-transform hover:-translate-y-1 shadow-lg shadow-brand-forest/30"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.232-2.644.886.886-2.644-.232-.386A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>

              {/* Quote Request Form */}
              <ProductEnquiryForm productName={product.name} productSlug={product.slug} />

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-brand-sand p-4 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">🌱</span>
                  <span className="text-xs font-semibold text-brand-charcoal">100% Plant-based</span>
                </div>
                <div className="bg-brand-sand p-4 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">📜</span>
                  <span className="text-xs font-semibold text-brand-charcoal">CPCB Certified</span>
                </div>
                <div className="bg-brand-sand p-4 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">♻️</span>
                  <span className="text-xs font-semibold text-brand-charcoal">Compostable</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Details & Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Long Description */}
            {product.longDescription && (
              <FadeIn>
                <div className="prose prose-lg prose-brand max-w-none prose-headings:font-display prose-headings:text-brand-charcoal prose-p:text-brand-gray prose-a:text-brand-forest">
                  <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                </div>
              </FadeIn>
            )}

            {/* Application Areas */}
            {product.applications && product.applications.length > 0 && (
              <FadeIn>
                <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6 border-b border-brand-pale pb-4">Ideal Applications</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-brand-sand/50 p-4 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-brand-mint text-brand-forest flex flex-shrink-0 items-center justify-center mt-0.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span className="text-sm text-brand-charcoal font-medium leading-relaxed">{app}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <FadeIn>
                <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6 border-b border-brand-pale pb-4">Frequently Asked Questions</h3>
                <ProductDetailsClient faqs={product.faqs} />
              </FadeIn>
            )}

          </div>

          {/* Sidebar / Key Features */}
          <div className="lg:col-span-4">
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <FadeIn className="bg-brand-charcoal rounded-3xl p-8 text-white sticky top-32">
                <h3 className="font-display text-2xl font-bold mb-6">Key Features</h3>
                <ul className="space-y-4">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-forest flex flex-shrink-0 items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path d="M20 6L9 17l-5-5"/></svg>
                      </div>
                      <span className="text-sm leading-relaxed text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn className="bg-gradient-to-r from-brand-forest to-[#1A4533] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="font-display text-3xl font-bold mb-4 relative z-10">Make a sustainable switch today</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto relative z-10">Contact us to request product samples, verify certifications, or discuss custom sizing and printing requirements.</p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white text-brand-forest font-bold rounded-full hover:bg-brand-cream transition-colors">
                Request Samples
              </a>
              <Link href="/contact" className="px-8 py-3.5 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                Contact Sales
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-5">
            <FadeIn>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal mb-10 text-center">More from {product.category}</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <FadeIn key={p.id}>
                  <Link href={`/product/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-forest/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-brand-pale">
                    <div className="aspect-square bg-brand-pale flex items-center justify-center relative overflow-hidden p-6">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">📦</span>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] font-semibold text-brand-forest bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-2 group-hover:text-brand-forest transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-brand-gray leading-relaxed mb-4 flex-1">
                        {p.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-forest">
                        View Details
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
