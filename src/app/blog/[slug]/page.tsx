import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogs } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blogs = getBlogs();
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Packin Club Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Packin Club",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blogs = getBlogs();
  const post = blogs.find((b) => b.slug === slug);
  if (!post) notFound();

  const related = blogs
    .filter((b) => b.category === post.category && b.id !== post.id)
    .slice(0, 3);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const categoryColors: Record<string, string> = {
    Industries: "bg-blue-50 text-blue-700",
    Sustainability: "bg-emerald-50 text-emerald-700",
    Health: "bg-rose-50 text-rose-700",
    "Inside Packin": "bg-amber-50 text-amber-700",
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "datePublished": post.date,
    "publisher": {
      "@type": "Organization",
      "name": "Packin Club",
      "logo": {
        "@type": "ImageObject",
        "url": "https://packinclub.com/images/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://packinclub.com/blog/${slug}`,
    },
    ...(post.thumbnail ? { "image": post.thumbnail } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-brand-cream to-white relative overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-brand-mint/15 blur-3xl" />
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-brand-forest transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Blog
            </Link>
          </div>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColors[post.category] || "bg-gray-50 text-gray-700"}`}>
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-gray">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-forest/10 flex items-center justify-center text-xs">🌿</div>
              <span className="font-medium">{post.author}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-brand-gray/40" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </section>

      <BlogPostClient content={post.content} />

      <section className="py-16 bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to switch to compostable packaging?</h2>
          <p className="text-brand-mint/80 mb-8">Explore our full range of CPCB-certified products or get in touch for a custom solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="px-7 py-3 bg-white text-brand-forest font-semibold rounded-full hover:bg-brand-cream transition-colors">View Products</Link>
            <a href="https://wa.me/918178414360" target="_blank" rel="noopener noreferrer" className="px-7 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-brand-forest transition-all inline-flex items-center gap-2">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal text-center mb-12">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-forest/5 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-[3/2] bg-gradient-to-br from-brand-pale via-brand-mint/20 to-brand-leaf/10 flex items-center justify-center overflow-hidden">
                      {r.thumbnail ? (
                        <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <span className="text-4xl group-hover:scale-110 transition-transform">{r.category === "Industries" ? "🏭" : "🌿"}</span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="text-xs text-brand-gray mb-2">{formatDate(r.date)}</span>
                      <h3 className="font-display text-base font-bold text-brand-charcoal group-hover:text-brand-forest transition-colors leading-snug mb-2">{r.title}</h3>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-forest mt-auto">
                        Read More
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
