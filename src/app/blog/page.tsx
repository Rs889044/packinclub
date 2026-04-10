import type { Metadata } from "next";
import { getBlogs, getContent } from "@/lib/data";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog — Sustainable Packaging Insights",
  description: "Expert articles on compostable packaging, sustainability trends, industry insights, and the science behind going plastic-free. Stay updated with Packin Club.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Sustainable Packaging Insights",
    description: "Expert articles on compostable packaging, sustainability trends, and industry insights.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const blogs = getBlogs();
  const content = getContent();
  return <BlogClient blogs={blogs} heroTitle={content.blog?.hero?.title} heroDesc={content.blog?.hero?.desc} />;
}
