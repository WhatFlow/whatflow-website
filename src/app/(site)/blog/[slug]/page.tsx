import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, getFAQSchema } from "@/lib/schema-org";
import { safeJSON } from "@/lib/comparisons-api";
import {
  getPost,
  getRelatedPosts,
  formatDate,
  calculateReadingTime,
  type Post,
} from "@/lib/payload-api";
import { RichText } from "@/lib/RichText";
import { markFirstImagePriority } from "@/components/rich-text-blocks";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SocialShare } from "@/components/SocialShare";
import { TableOfContents } from "@/components/TableOfContents";
import { NewsletterBox } from "@/components/NewsletterBox";
import { CategoryPill, Cover, PostCard, RssIcon } from "../blog-ui";
import "../content.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function getCoverImage(post: Post) {
  const source = post.coverImageUrl || post.coverImage?.url;
  if (!source) return undefined;

  return {
    url: new URL(source, SITE_URL).href,
    alt: post.coverImageUrl
      ? post.coverImageAlt || post.title
      : post.coverImage?.alt || post.title,
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found — WhatFlow" };

  const title = post.seo?.metaTitle || `${post.title} — WhatFlow Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  const coverImage = getCoverImage(post);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      modifiedTime: post.updatedAt,
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.author || "Safwan Adnan"],
      images: coverImage ? [coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3).catch(() => []);
  const readingTime = calculateReadingTime(post.content, post.excerpt);
  const coverImage = getCoverImage(post);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.io" : "http://localhost:3000");

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt,
    citation: post.sources?.map(source => source.url),
    author: {
      "@type": "Person",
      name: post.author || "Safwan Adnan",
      jobTitle: post.authorRole,
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
    image: coverImage ? [coverImage.url] : undefined,
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
    <div className="min-h-screen bg-[var(--paper)] relative">
      <ReadingProgressBar />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJSON(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJSON(breadcrumbJsonLd) }}
      />

      {!!post.faqs?.length && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getFAQSchema(post.faqs)) }} />}

      {/* ─── Article hero ─── */}
      <header className="wf-hero wfc-article-hero" data-tone="paper" data-split="false" style={coverImage ? { paddingBottom: "clamp(96px, 12vw, 150px)" } : undefined}>
        <div className="wf-shell wf-hero-grid">
          <div className="wf-hero-copy">
            <div className="flex items-center justify-between gap-4 flex-wrap wf-load">
              <nav aria-label="Breadcrumb" className="wfc-crumbs">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span className="text-black truncate max-w-[16rem] sm:max-w-md">{post.title}</span>
              </nav>
              <a href="/blog/rss.xml" target="_blank" className="wf-pill" title="Subscribe via RSS">
                <RssIcon />
                <span>RSS feed</span>
              </a>
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-8 wf-load" style={{ "--d": "80ms" } as CSSProperties}>
              <CategoryPill category={post.category} />
              <div className="wfc-meta">
                {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
                <span>{readingTime} min read</span>
              </div>
            </div>

            <h1 id="article-title" className="wfc-title wf-load" style={{ "--d": "160ms" } as CSSProperties}>
              {post.title}
            </h1>
            {post.excerpt && <p className="wfc-dek wf-load" style={{ "--d": "260ms" } as CSSProperties}>{post.excerpt}</p>}

            <div className="wfc-byline wf-load" style={{ "--d": "360ms" } as CSSProperties}>
              <div className="wfc-person">
                <span className="wfc-avatar" data-size="lg" aria-hidden="true">{post.author.charAt(0).toUpperCase()}</span>
                <div>
                  <b>{post.author}</b>
                  {post.authorRole && <small>{post.authorRole}</small>}
                </div>
              </div>
              <SocialShare title={post.title} url={postUrl} />
            </div>
          </div>
        </div>
      </header>

      {/* ─── Cover image ─── */}
      {coverImage && (
        <figure className="wf-shell wfc-hero-cover wf-load" style={{ "--d": "300ms", maxWidth: 1120 } as CSSProperties}>
          <Cover
            src={post.coverImageUrl}
            media={post.coverImage?.url}
            alt={coverImage.alt}
            fit={post.coverImageUrl ? "contain" : undefined}
            priority
            sizes="(min-width: 1120px) 1060px, 100vw"
          />
          {post.coverImageCaption && <figcaption className="wfc-caption">{post.coverImageCaption}</figcaption>}
        </figure>
      )}

      {/* ─── Body with sticky contents rail ─── */}
      <section className="wfc-article">
        <div className="wf-shell wfc-article-grid">
          <article aria-labelledby="article-title" className="wfc-article-main wfc-body wfc-stack">
            <RichText content={coverImage ? post.content : markFirstImagePriority(post.content)} />
            {!!post.faqs?.length && <section className="space-y-5" aria-label="Frequently asked questions">
              <h2 className="wfc-h-sm">Frequently asked questions</h2>
              <div className="wfc-faq">
                {post.faqs.map((faq, i) => <details key={i}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
              </div>
            </section>}
            {!!post.sources?.length && <section className="wf-prose space-y-4 border-t-[1.5px] border-dashed border-black/25 pt-8" aria-label="Sources and demonstration notes">
              <h2 className="wfc-h-sm" style={{ margin: 0 }}>Sources and demonstration notes</h2>
              {post.reviewedAt && <p className="text-sm text-gray-600">Sources checked {formatDate(post.reviewedAt)}.</p>}
              <ul className="space-y-3" style={{ listStyle: "none", padding: 0 }}>{post.sources.map((source, i) => <li key={i}><a href={source.url} rel="noopener noreferrer">{source.title}</a>{source.note && <p className="mt-1 text-sm text-gray-600" style={{ margin: 0 }}>{source.note}</p>}</li>)}</ul>
            </section>}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[var(--text-muted-alt)] mr-1">Tags</span>
                {post.tags.map(({ tag }) => (
                  <span key={tag} className="wf-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Newsletter CTA Box */}
            <NewsletterBox />

            {/* Bottom Social Share */}
            <div className="wf-card" style={{ padding: "18px 22px" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-display text-lg font-bold tracking-tight">
                  Found this helpful? Pass it on.
                </div>
                <SocialShare title={post.title} url={postUrl} />
              </div>
            </div>
          </article>

          {/* Sidebar (TOC & app card) */}
          <aside className="wfc-rail" aria-label="On this page">
            <div className="wfc-rail-inner">
              <TableOfContents />

              <div className="wf-card wfc-side" data-tone="dark">
                <h2>Automate your store with WhatsApp.</h2>
                <p>
                  Cart recovery, order alerts, an enterprise-ready team inbox, and official Meta Cloud API messaging.
                </p>
                <Link href="/#products" className="wf-btn wf-btn-green wf-btn-sm">
                  Explore apps
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── Related Posts ─── */}
      {relatedPosts.length > 0 && (
        <section className="wf-section" data-tone="white" style={{ borderTop: "2.5px solid var(--ink)" }}>
          <div className="wf-shell">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
              <div className="wf-head" data-reveal>
                <h2 className="wf-h2">Related articles</h2>
              </div>
              <Link href="/blog" className="wf-btn wf-btn-ghost wf-btn-sm" data-reveal>
                All posts
              </Link>
            </div>

            <div className="wf-grid wf-grid-3">
              {relatedPosts.map((related, index) => (
                <PostCard key={related.id} post={related} index={index} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
