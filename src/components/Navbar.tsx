"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image src="/images/logo.png" alt="Packin Club" width={160} height={33} className="h-8 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-gray hover:text-brand-forest transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-leaf group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 bg-brand-forest text-white text-sm font-semibold rounded-full hover:bg-brand-green transition-colors"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-brand-charcoal transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-brand-pale overflow-hidden"
          >
            <nav className="flex flex-col p-5 gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-brand-charcoal hover:text-brand-forest transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-5 py-3 bg-brand-forest text-white text-center font-semibold rounded-full"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
