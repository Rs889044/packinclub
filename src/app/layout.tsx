import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Packin Club — Compostable Packaging Solutions",
  description: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions. Replace plastic with plant-based compostable packaging.",
  keywords: "compostable packaging, eco-friendly packaging, CPCB certified, sustainable packaging India",
  openGraph: {
    title: "Packin Club — Compostable Packaging Solutions",
    description: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions.",
    url: "https://packinclub.com",
    siteName: "Packin Club",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
