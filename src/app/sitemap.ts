import { MetadataRoute } from "next";
import { getProducts, getBlogs } from "@/lib/data";

const BASE_URL = "https://packinclub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts();
  const blogs = getBlogs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs
    .filter(b => (b.status || "published") === "published")
    .map((b) => ({
      url: `${BASE_URL}/blog/${b.slug}`,
      lastModified: new Date(b.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...productPages, ...blogPages];
}
