import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getPost,
  getRelatedPosts,
  formatDate,
  calculateReadingTime,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/payload-api";
import { RichText } from "@/lib/RichText";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SocialShare } from "@/components/SocialShare";
import { TableOfContents } from "@/components/TableOfContents";
import { NewsletterBox } from "@/components/NewsletterBox";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found — WhatFlow" };

  const title = post.seo?.metaTitle || `${post.title} — WhatFlow Blog`;
  const description = post.seo?.metaDescription || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.author || "WhatFlow Team"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3).catch(() => []);
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
  const categoryColor = CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
  const readingTime = calculateReadingTime(post.content, post.excerpt);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "WhatFlow Team",
    },
    publisher: {
      "@type": "Organization",
      name: "WhatFlow",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    image: post.coverImage?.url ? [post.coverImage.url] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] relative">
      <ReadingProgressBar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─── Cover Image Banner ─── */}
      <div className="relative w-full h-[340px] sm:h-[440px] bg-[#D5F5E3] border-b-[2.5px] border-black overflow-hidden">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D261]/20 via-[#0A6B56]/10 to-[#091E17]/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-black/30 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091E17]/60 via-transparent to-transparent" />
      </div>

      {/* ─── Article Header ─── */}
      <section className="px-4 sm:px-6 py-10 border-b-[2.5px] border-black bg-[#FAF7F0]">
        <div className="max-w-[1080px] mx-auto">
          {/* Breadcrumb + RSS link */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 flex-wrap">
              <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-[#00D261] transition-colors">Blog</Link>
              <span>›</span>
              <span className="text-black truncate max-w-xs sm:max-w-md">{post.title}</span>
            </div>
            <a
              href="/blog/rss.xml"
              target="_blank"
              className="neo-pill bg-[#FFF3CD] text-[#856404] px-2.5 py-0.5 text-[10px] font-black uppercase flex items-center gap-1 hover:bg-[#FFE8A1]"
              title="Subscribe via RSS"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" fill="currentColor" />
              </svg>
              <span>RSS FEED</span>
            </a>
          </div>

          {/* Category + Date + Reading time row */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <span className={`neo-pill px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider border-black ${categoryColor}`}>
              {categoryLabel}
            </span>
            {post.publishedAt && (
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="text-gray-300">•</span>
            <span className="neo-pill bg-white px-2.5 py-0.5 text-[10px] font-bold text-gray-700 flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{readingTime} MIN READ</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[34px] sm:text-[48px] lg:text-[58px] font-display font-black uppercase text-black tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author bar & Top Social Share */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D261] border-2 border-black flex items-center justify-center font-extrabold text-sm text-black shadow-[2px_2px_0px_#000]">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-extrabold text-sm text-black">{post.author}</div>
                {post.authorRole && (
                  <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">{post.authorRole}</div>
                )}
              </div>
            </div>

            <SocialShare title={post.title} url={postUrl} />
          </div>
        </div>
      </section>

      {/* ─── Main Content Area with TOC Sidebar ─── */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8">
            <RichText content={post.content} />

            {/* Newsletter CTA Box */}
            <NewsletterBox />

            {/* Bottom Social Share */}
            <div className="neo-box bg-white p-5 rounded-xl border-[2.5px] border-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-display font-black text-sm uppercase text-black">
                Found this helpful? Spread the word:
              </div>
              <SocialShare title={post.title} url={postUrl} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 mr-1">Tags:</span>
                {post.tags.map(({ tag }) => (
                  <span
                    key={tag}
                    className="neo-pill bg-white px-3 py-1 text-[11px] font-bold text-black"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (TOC & Fast App CTA) */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <TableOfContents />

            <div className="neo-box-teal p-6 text-white space-y-4 rounded-xl">
              <div className="neo-pill inline-block bg-[#00D261] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black">
                SHOPIFY APPS
              </div>
              <h4 className="font-display font-black text-lg uppercase leading-tight">
                AUTOMATE YOUR STORE WITH WHATSAPP.
              </h4>
              <p className="text-xs text-[#D5F5E3] font-medium leading-relaxed">
                Cart recovery, order alerts, AI support, and official Meta API badges.
              </p>
              <Link
                href="/#products"
                className="neo-btn bg-[#00D261] text-black font-black text-xs uppercase tracking-wider py-2.5 rounded-lg block text-center"
              >
                EXPLORE APPS ➔
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Posts ─── */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 py-14 border-t-[2.5px] border-black bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-2">
                  KEEP READING
                </div>
                <h2 className="text-[26px] sm:text-[32px] font-display font-black uppercase text-black tracking-tight">
                  RELATED ARTICLES
                </h2>
              </div>
              <Link
                href="/blog"
                className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hidden sm:inline-flex items-center gap-1"
              >
                ALL POSTS →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="neo-box bg-white overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  <div className="relative h-40 bg-[#E8F8F0] border-b-[2.5px] border-black overflow-hidden">
                    {related.coverImage?.url ? (
                      <Image
                        src={related.coverImage.url}
                        alt={related.coverImage.alt || related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00D261]/20 to-[#0A6B56]/20">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-black/40 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <span className={`neo-pill px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${CATEGORY_COLORS[related.category] ?? "bg-gray-100 text-gray-700"}`}>
                      {CATEGORY_LABELS[related.category] ?? related.category}
                    </span>
                    <h3 className="font-display font-black text-base text-black uppercase leading-tight group-hover:text-[#0A6B56] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-bold">{formatDate(related.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Bottom CTA ─── */}
      <section className="bg-[#091E17] border-t-[2.5px] border-black py-14 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-[28px] sm:text-[38px] font-display font-black uppercase text-white tracking-tight">
            READY TO AUTOMATE YOUR STORE WITH{" "}
            <span className="text-stroke-green">WHATSAPP?</span>
          </h2>
          <p className="text-gray-300 text-sm font-medium">
            Join 10,000+ Shopify merchants worldwide. 14-day free trial.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/#products"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg"
            >
              INSTALL ON SHOPIFY →
            </Link>
            <Link
              href="/blog"
              className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg"
            >
              ← BACK TO BLOG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
