import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { getSettings, getContent } from "@/lib/data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();

  return {
    title: {
      default: "Packin Club — Compostable Packaging Solutions",
      template: "%s | Packin Club",
    },
    description: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions. Replace plastic with plant-based compostable packaging.",
    keywords: "compostable packaging, eco-friendly packaging, CPCB certified, sustainable packaging India, plant-based packaging, compostable bags, bio-degradable packaging Delhi",
    metadataBase: new URL("https://packinclub.com"),
    icons: settings.favicon ? { icon: settings.favicon } : undefined,
    openGraph: {
      title: "Packin Club — Compostable Packaging Solutions",
      description: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions.",
      url: "https://packinclub.com",
      siteName: "Packin Club",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Packin Club — Compostable Packaging Solutions",
      description: "India's trusted partner for sustainable, durable, and CPCB-certified eco-packaging solutions.",
    },
    alternates: {
      canonical: "https://packinclub.com",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  const content = getContent();

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <LayoutShell settings={settings} content={content}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
