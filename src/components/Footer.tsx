import Link from "next/link";
import Image from "next/image";

const productCategories = [
  "Retail Packaging",
  "Industrial Packaging",
  "Agriculture & Nursery",
  "Bags on Roll",
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Packin Club" width={140} height={29} className="h-7 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              India&apos;s trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/918178414360" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-leaf transition-colors" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.61.609l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.232-2.644.886.886-2.644-.232-.386A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              </a>
              <a href="mailto:orders@packinclub.com" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-leaf transition-colors" aria-label="Email">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-brand-leaf transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2.5">
              {productCategories.map((c) => (
                <li key={c}>
                  <Link href="/products" className="text-sm text-gray-400 hover:text-brand-leaf transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0 text-brand-leaf" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>
                D-1/64, 21st Century Business Centre, Veer Savarkar Block, Shakarpur, Nirman Vihar, Delhi-110092
              </p>
              <p className="flex gap-2 items-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-brand-leaf" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +91 81784 14360
              </p>
              <p className="flex gap-2 items-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-brand-leaf" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                orders@packinclub.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Packin Club. All rights reserved.</p>
          <p className="text-xs text-gray-500">Making packaging earth-positive, one bag at a time.</p>
        </div>
      </div>
    </footer>
  );
}
