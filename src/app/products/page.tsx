import type { Metadata } from "next";
import { getProducts, getSettings } from "@/lib/data";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Compostable Packaging Products — Full Range",
  description: "Explore India's widest range of CPCB-certified compostable packaging. 24+ plant-based products for retail, industrial, agriculture, and e-commerce — courier bags, food packaging, shrink films & more.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Compostable Packaging Products — Full Range",
    description: "Explore India's widest range of CPCB-certified compostable packaging products.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const products = getProducts();
  const settings = getSettings();
  return <ProductsClient products={products} catalogPdf={settings.catalogPdf} />;
}
