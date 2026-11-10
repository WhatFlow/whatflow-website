import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/schema-org";
import { safeJSON } from "@/lib/comparisons-api";
import { RichText } from "@/lib/RichText";
import { markFirstImagePriority } from "@/components/rich-text-blocks";
import { CHANGELOG_APP_FULL_NAMES } from "@/lib/changelog-data";
import {
  CHANGELOG_APP_LABELS,
  CHANGELOG_TYPE_BADGE,
  SHOPIFY_APP_URLS,
  changelogHighlights,
  formatReleaseDate,
  getChangelogBySlug,
  type ChangelogItem,
} from "@/lib/changelog";
import { TypePill, typeLabel } from "../type-pill";
import "../../blog/content.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getChangelogBySlug(slug);
  if (!result) return { title: "Update not found", robots: { index: false } };
  const { entry } = result;
  const title = `${entry.title} | Changelog`;
  const url = `${SITE_URL}/changelog/${entry.slug}`;
  return {
    title,
    description: entry.summary,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${SITE_URL}/changelog/rss.xml` },
    },
    openGraph: {
      title,
      description: entry.summary,
      type: "article",
      url,
      publishedTime: entry.releaseDate,
      modifiedTime: entry.updatedAt || entry.releaseDate,
      section: "Changelog",
    },
    twitter: { card: "summary_large_image", title, description: entry.summary },
  };
}

function appsFor(entry: ChangelogItem): ("business-api" | "chat")[] {
  if (entry.app === "business-api" || entry.app === "chat") return [entry.app];
  return ["business-api", "chat"];
}

export default async function ChangelogEntryPage({ params }: Props) {
  const { slug } = await params;
  const result = await getChangelogBySlug(slug);
  if (!result) notFound();
  const { entry, newer, older, related } = result;

  const url = `${SITE_URL}/changelog/${entry.slug}`;
  const badge = CHANGELOG_TYPE_BADGE[entry.type];
  const highlights = changelogHighlights(entry.content);
  const apps = appsFor(entry);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.releaseDate,
    dateModified: entry.updatedAt || entry.releaseDate,
    articleSection: `Changelog: ${badge.label}`,
    keywords: ["WhatFlow", "WhatsApp for Shopify", "release notes", badge.label, CHANGELOG_APP_LABELS[entry.app]].join(", "),
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${SITE_URL}/changelog#page` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: "WhatFlow", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } },
    about: apps.map((key) => ({
      "@type": "SoftwareApplication",
      name: key === "chat" ? "WhatFlow Chat Automation (unofficial API app)" : "WhatFlow Business API (official API app)",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Shopify",
      url: SHOPIFY_APP_URLS[key],
    })),
    ...(highlights.length ? { abstract: highlights.join(" ") } : {}),
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJSON(
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Changelog", url: "/changelog" },
              { name: entry.title, url: `/changelog/${entry.slug}` },
            ]),
          ),
        }}
      />

      <article>
        <header className="wf-hero wfc-article-hero" data-tone="paper" data-split="false">
          <div className="wf-shell wf-hero-grid">
            <div className="wf-hero-copy">
              <nav aria-label="Breadcrumb" className="wfc-crumbs wf-load">
                <ol className="flex items-center gap-2 flex-wrap">
                  <li><Link href="/">Home</Link></li>
                  <li aria-hidden>/</li>
                  <li><Link href="/changelog">Changelog</Link></li>
                </ol>
              </nav>

              <div className="flex items-center gap-2 flex-wrap mt-8 wf-load" style={{ "--d": "80ms" } as CSSProperties}>
                <TypePill type={entry.type} />
                <span className="wf-pill">{CHANGELOG_APP_LABELS[entry.app]}</span>
                <time dateTime={entry.releaseDate} className="text-sm font-semibold text-[var(--text-muted-alt)] ml-1">
                  {formatReleaseDate(entry.releaseDate)}
                </time>
              </div>
              <h1 className="wfc-title wf-load" style={{ "--d": "160ms" } as CSSProperties}>
                {entry.title}
              </h1>
              <p className="wfc-dek wf-load" style={{ "--d": "260ms" } as CSSProperties}>{entry.summary}</p>
              <div className="wfc-byline wf-load" style={{ "--d": "360ms" } as CSSProperties}>
                <p className="text-sm font-semibold text-[var(--text-muted-alt)]">
                  Applies to: {CHANGELOG_APP_FULL_NAMES[entry.app]}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="wf-shell" style={{ maxWidth: 840 }}>
          <div className="wfc-body py-12 sm:py-16" data-reveal>
            <RichText content={markFirstImagePriority(entry.content)} />
          </div>

          <aside className="wf-card wfc-side" data-tone="green" data-reveal style={{ padding: "clamp(22px, 4vw, 32px)" }}>
            <h2>Already live for every store.</h2>
            <p>
              This update is already live for every store using the app. Install WhatFlow from the Shopify App Store to get started.
            </p>
            <div className="flex gap-3 flex-wrap mt-5">
              {apps.map((key) => (
                <a
                  key={key}
                  href={SHOPIFY_APP_URLS[key]}
                  target="_blank"
                  rel="noopener"
                  className="wf-btn wf-btn-dark wf-btn-sm"
                  style={{ marginTop: 0, width: "auto" }}
                >
                  {key === "chat" ? "Get the unofficial API app" : "Get the official API app"}
                </a>
              ))}
            </div>
          </aside>

          <nav aria-label="More updates" className="wfc-pn mt-10">
            {older ? (
              <Link href={`/changelog/${older.slug}`} className="wf-card" data-reveal>
                <small>Previous update</small>
                <b>{older.title}</b>
              </Link>
            ) : <span />}
            {newer && (
              <Link href={`/changelog/${newer.slug}`} className="wf-card text-right" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
                <small>Next update</small>
                <b>{newer.title}</b>
              </Link>
            )}
          </nav>

          {related.length > 0 && (
            <section className="mt-16 pb-20" aria-labelledby="related-updates">
              <h2 id="related-updates" className="wfc-h-sm mb-6" data-reveal>
                Related updates
              </h2>
              <ul className="grid gap-3">
                {related.map((item, index) => (
                  <li key={item.slug} data-reveal style={{ "--d": `${index * 60}ms` } as CSSProperties}>
                    <Link href={`/changelog/${item.slug}`} className="wf-card flex-row items-center justify-between gap-4" style={{ padding: "16px 20px", flexDirection: "row" }}>
                      <span>
                        <span className="block font-display text-lg font-bold tracking-tight">{item.title}</span>
                        <span className="block text-sm font-medium text-[var(--text-muted-alt)] mt-1">
                          <time dateTime={item.releaseDate}>{formatReleaseDate(item.releaseDate)}</time> · {typeLabel(item.type)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/changelog" className="wfc-link mt-6">
                See all updates
              </Link>
            </section>
          )}
          {related.length === 0 && <div className="pb-20" />}
        </div>
      </article>
    </div>
  );
}
