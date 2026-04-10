import { getContent, getProducts, getBlogs, getTestimonials } from "@/lib/data";
import HomePageContent from "./HomePageContent";

export default function HomePage() {
  const content = getContent();
  const products = getProducts();
  const blogs = getBlogs();
  const testimonials = getTestimonials();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Packin Club",
    "image": "https://packinclub.com/images/logo.png",
    "@id": "https://packinclub.com",
    "url": "https://packinclub.com",
    "telephone": content.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": content.contact.address,
      "addressCountry": "IN"
    },
    "description": content.home.hero.desc,
    "sameAs": [],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageContent content={content} products={products} blogs={blogs} testimonials={testimonials} />
    </>
  );
}
