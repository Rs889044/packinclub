import type { Metadata } from "next";
import { getContent } from "@/lib/data";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Our Story & Mission",
  description: "Learn about Packin Club's mission to eliminate single-use plastic from India's packaging ecosystem. Founded in Delhi, we provide CPCB-certified compostable packaging alternatives.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Packin Club — Our Story & Mission",
    description: "Learn about Packin Club's mission to eliminate single-use plastic from India with certified compostable packaging.",
    url: "/about",
  },
};

export default function AboutPage() {
  const content = getContent();
  return <AboutClient content={content} />;
}
