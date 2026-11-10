import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getCaseStudy,
  getCaseStudies,
  formatDate,
  calculateReadingTime,
  INDUSTRY_LABELS,
  APP_LABELS,
} from "@/lib/payload-api";
import { RichText } from "@/lib/RichText";
import { markFirstImagePriority } from "@/components/rich-text-blocks";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SocialShare } from "@/components/SocialShare";
import { NewsletterBox } from "@/components/NewsletterBox";
import { TableOfContents } from "@/components/TableOfContents";
import { Cover, ICONS, METRIC_TONES } from "../../blog/blog-ui";
import "../../blog/content.css";

const APP_TONES: Record<string, string> = {
  chat: "wfc-tone-yellow",
  business: "wfc-tone-mint",
  ai: "wfc-tone-lilac",
};

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found — WhatFlow" };

  const title = study.seo?.metaTitle || `${study.title} — WhatFlow Case Study`;
  const description = study.seo?.metaDescription || study.excerpt;

  return {
    alternates: { canonical: `/case-studies/${slug}` },
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: study.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  // Fetch 3 more case studies for "More Stories" section
  const moreStudies = await getCaseStudies({ limit: 4 })
    .then((res) => res.docs.filter((s) => s.slug !== slug).slice(0, 3))
    .catch(() => []);

  const industryLabel = INDUSTRY_LABELS[study.industry] ?? study.industry;
  const readingTime = calculateReadingTime(study.content, study.excerpt);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.io" : "http://localhost:3000");

  const studyUrl = `${siteUrl}/case-studies/${study.slug}`;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    datePublished: study.publishedAt || new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "WhatFlow",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    image: study.coverImage?.url ? [study.coverImage.url] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": studyUrl,
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
        name: "Case Studies",
        item: `${siteUrl}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.storeName,
        item: studyUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] relative">
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

      {/* ─── Hero ─── */}
      <header className="wf-hero wfc-article-hero" data-tone="paper" data-split="false" style={study.coverImage?.url ? { paddingBottom: "clamp(96px, 12vw, 150px)" } : undefined}>
        <div className="wf-shell wf-hero-grid">
          <div className="wf-hero-copy">
            <nav aria-label="Breadcrumb" className="wfc-crumbs wf-load">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/case-studies">Case studies</Link>
              <span aria-hidden="true">/</span>
              <span className="text-black">{study.storeName}</span>
            </nav>

            <div className="flex items-center gap-4 mt-8 wf-load" style={{ "--d": "80ms" } as CSSProperties}>
              <span className="wfc-logo" data-size="lg">
                {study.storeLogo?.url ? (
                  <Image src={study.storeLogo.url} alt={study.storeName} width={56} height={56} />
                ) : (
                  <span aria-hidden="true">{study.storeName.charAt(0)}</span>
                )}
              </span>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold tracking-tight">{study.storeName}</div>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span className="wf-pill wfc-tone-mint">{industryLabel}</span>
                </div>
              </div>
            </div>

            <h1 className="wfc-title wf-load" style={{ "--d": "160ms" } as CSSProperties}>
              {study.title}
            </h1>
            {study.excerpt && <p className="wfc-dek wf-load" style={{ "--d": "260ms" } as CSSProperties}>{study.excerpt}</p>}

            {/* Meta row + Social Share */}
            <div className="wfc-byline wf-load" style={{ "--d": "360ms" } as CSSProperties}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="wfc-meta">
                  {study.publishedAt && <time dateTime={study.publishedAt}>{formatDate(study.publishedAt)}</time>}
                  <span>{readingTime} min read</span>
                </div>
                {study.appsUsed?.map((app) => (
                  <span key={app} className={`wf-pill ${APP_TONES[app] ?? "wfc-tone-white"}`}>
                    {APP_LABELS[app] ?? app}
                  </span>
                ))}
              </div>

              <SocialShare title={study.title} url={studyUrl} />
            </div>
          </div>
        </div>
      </header>

      {/* ─── Cover image ─── */}
      {study.coverImage?.url && (
        <div className="wf-shell wfc-hero-cover wf-load" style={{ "--d": "300ms", maxWidth: 1120 } as CSSProperties}>
          <Cover media={study.coverImage.url} alt={study.coverImage.alt || study.title} icon={ICONS.trend} priority sizes="(min-width: 1120px) 1060px, 100vw" />
        </div>
      )}

      {/* ─── Results ─── */}
      {study.metrics && study.metrics.length > 0 && (
        <section className="pt-14 sm:pt-20" aria-labelledby="case-study-results">
          <div className="wf-shell">
            <h2 id="case-study-results" className="wfc-h-sm" data-reveal>The results</h2>
            <div className="wfc-metrics mt-6">
              {study.metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className={`wfc-metric ${METRIC_TONES[i % METRIC_TONES.length]}`}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as CSSProperties}
                >
                  <span className="wfc-metric-value">{metric.value}</span>
                  <span className="wfc-metric-label">{metric.label}</span>
                  {metric.description && <span className="wfc-metric-note">{metric.description}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Content Grid with Sidebar ─── */}
      <section className="wfc-article">
        <div className="wf-shell wfc-article-grid">
          <div className="wfc-article-main wfc-body wfc-stack">
            <RichText content={study.coverImage?.url ? study.content : markFirstImagePriority(study.content)} />

            <NewsletterBox />

            <div className="wf-card" style={{ padding: "18px 22px" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-display text-lg font-bold tracking-tight">
                  Share this merchant story
                </div>
                <SocialShare title={study.title} url={studyUrl} />
              </div>
            </div>
          </div>

          <aside className="wfc-rail" aria-label="On this page">
            <div className="wfc-rail-inner">
              <TableOfContents />

              <div className="wf-card wfc-side" data-tone="green">
                <h2>Launch in under 5 minutes.</h2>
                <p>
                  Connect WhatFlow to your Shopify store and start recovering abandoned carts on WhatsApp today.
                </p>
                <Link href="/#products" className="wf-btn wf-btn-dark wf-btn-sm">
                  Install WhatFlow
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─── More Stories ─── */}
      {moreStudies.length > 0 && (
        <section className="wf-section" data-tone="white" style={{ borderTop: "2.5px solid var(--ink)" }}>
          <div className="wf-shell">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
              <div className="wf-head" data-reveal>
                <h2 className="wf-h2">More success stories</h2>
              </div>
              <Link href="/case-studies" className="wf-btn wf-btn-ghost wf-btn-sm" data-reveal>
                All stories
              </Link>
            </div>

            <div className="wf-grid wf-grid-3">
              {moreStudies.map((s, index) => (
                <Link
                  key={s.id}
                  href={`/case-studies/${s.slug}`}
                  className="wf-card wfc-card"
                  data-reveal
                  style={{ "--d": `${index * 80}ms` } as CSSProperties}
                >
                  <Cover media={s.coverImage?.url} alt={s.coverImage?.alt || s.title} icon={ICONS.trend}>
                    {s.metrics?.[0] && (
                      <div className="wfc-chip-metric">
                        <b>{s.metrics[0].value}</b>
                        <small>{s.metrics[0].label}</small>
                      </div>
                    )}
                  </Cover>
                  <div className="wfc-card-body">
                    <div className="wfc-meta">
                      <span className="font-bold text-black">{s.storeName}</span>
                      <span>{INDUSTRY_LABELS[s.industry] ?? s.industry}</span>
                    </div>
                    <h3>{s.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
