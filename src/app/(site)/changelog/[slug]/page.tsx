import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/schema-org";
import { safeJSON } from "@/lib/comparisons-api";
import { RichText } from "@/lib/RichText";
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
      name: key === "chat" ? "WhatFlow Chat Automation" : "WhatFlow Business API",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Shopify",
      url: SHOPIFY_APP_URLS[key],
    })),
    ...(highlights.length ? { abstract: highlights.join(" ") } : {}),
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
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

      <article className="px-4 sm:px-6 py-12 sm:py-16 max-w-[760px] mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-black">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/changelog" className="hover:text-black">Changelog</Link></li>
          </ol>
        </nav>

        <header className="space-y-4 border-b-[2.5px] border-black pb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${badge.className}`}>
              {badge.label}
            </span>
            <span className="neo-pill bg-white border-black px-2.5 py-0.5 text-[10px] font-bold text-gray-700 uppercase">
              {CHANGELOG_APP_LABELS[entry.app]}
            </span>
            <time dateTime={entry.releaseDate} className="text-xs font-bold text-gray-500 uppercase ml-1">
              {formatReleaseDate(entry.releaseDate)}
            </time>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-black leading-[1.05] tracking-tight">
            {entry.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">{entry.summary}</p>
          <p className="text-xs font-bold text-gray-500">
            Applies to: {CHANGELOG_APP_FULL_NAMES[entry.app]}
          </p>
        </header>

        <div className="py-8">
          <RichText content={entry.content} />
        </div>

        <aside className="neo-box bg-white p-6 rounded-2xl space-y-3">
          <p className="text-sm font-extrabold text-black uppercase tracking-wider">Try it on your store</p>
          <p className="text-sm text-gray-700 font-medium">
            This update is already live for every store using the app. Install WhatFlow from the Shopify App Store to get started.
          </p>
          <div className="flex gap-3 flex-wrap">
            {apps.map((key) => (
              <a
                key={key}
                href={SHOPIFY_APP_URLS[key]}
                target="_blank"
                rel="noopener"
                className="neo-box bg-[#00D261] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-black"
              >
                {key === "chat" ? "Get Chat Automation" : "Get Business API"}
              </a>
            ))}
          </div>
        </aside>

        <nav aria-label="More updates" className="grid sm:grid-cols-2 gap-4 mt-10">
          {older ? (
            <Link href={`/changelog/${older.slug}`} className="neo-box bg-white p-4 rounded-xl hover:bg-[#F2FFF7]">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500">← Previous update</span>
              <span className="block text-sm font-extrabold text-black mt-1">{older.title}</span>
            </Link>
          ) : <span />}
          {newer && (
            <Link href={`/changelog/${newer.slug}`} className="neo-box bg-white p-4 rounded-xl text-right hover:bg-[#F2FFF7]">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500">Next update →</span>
              <span className="block text-sm font-extrabold text-black mt-1">{newer.title}</span>
            </Link>
          )}
        </nav>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-updates">
            <h2 id="related-updates" className="text-xl font-display font-black uppercase text-black mb-4">
              Related updates
            </h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/changelog/${item.slug}`} className="group block">
                    <span className="text-sm font-extrabold text-black group-hover:underline">{item.title}</span>
                    <span className="block text-xs font-medium text-gray-500">
                      <time dateTime={item.releaseDate}>{formatReleaseDate(item.releaseDate)}</time> ·{" "}
                      {CHANGELOG_TYPE_BADGE[item.type].label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/changelog" className="inline-block mt-6 text-xs font-extrabold uppercase tracking-wider underline underline-offset-4">
              See all updates →
            </Link>
          </section>
        )}
      </article>
    </div>
  );
}
