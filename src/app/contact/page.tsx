import type { Metadata } from "next";
import { getContent } from "@/lib/data";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote",
  description: "Contact Packin Club for sustainable compostable packaging solutions. Get a free quote for custom packaging, bulk orders, or partnership inquiries. Based in Delhi, serving all of India.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Packin Club — Get a Quote",
    description: "Contact us for sustainable compostable packaging solutions. Get a free quote for bulk orders.",
    url: "/contact",
  },
};

export default function ContactPage() {
  const content = getContent();
  return <ContactClient content={content} />;
}
