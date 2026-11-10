import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { PageHero } from "@/components/site/PageKit";
import { RssIcon } from "../blog/blog-ui";
import { TypePill, typeColor } from "./type-pill";
import "../blog/content.css";
import { SITE_URL, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema-org";
import { safeJSON } from "@/lib/comparisons-api";
import {
  CHANGELOG_APP_LABELS,
  CHANGELOG_TYPES,
  formatReleaseDate,
  getAllChangelog,
  groupByMonth,
  isChangelogApp,
  isChangelogType,
  type ChangelogItem,
} from "@/lib/changelog";

const TITLE = "Changelog: WhatsApp for Shopify Product Updates";
const DESCRIPTION =
  "Release notes for WhatFlow's WhatsApp apps for Shopify: new features, improvements, bug fixes and security updates for WhatFlow Business API (official API app), Chat Automation (unofficial API app) and the Team Inbox.";

interface ChangelogPageProps {
  searchParams: Promise<{ app?: string; type?: string }>;
}

export async function generateMetadata({ searchParams }: ChangelogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(params.app || params.type);
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: `${SITE_URL}/changelog`,
      types: { "application/rss+xml": `${SITE_URL}/changelog/rss.xml` },
    },
    // Filtered views are convenience views of the same list.
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: "website",
      url: `${SITE_URL}/changelog`,
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

const FAQS = [
  {
    question: "Which WhatFlow apps does this changelog cover?",
    answer:
      "It covers WhatFlow Business API, the official Meta WhatsApp Cloud API app for Shopify that includes the WhatsApp Team Inbox, and WhatFlow Chat Automation, our unofficial API app, which links a store's regular WhatsApp account. Updates that apply to both are labeled \"Both apps\".",
  },
  {
    question: "How far back does this changelog go?",
    answer:
      "WhatFlow Chat Automation, our unofficial API app, launched on the Shopify App Store in October 2024. Its preserved release history starts in December 2024, and WhatFlow Business API, our official API app, is covered from its first features in March 2026.",
  },
  {
    question: "Do I need to do anything to get these updates?",
    answer:
      "No. WhatFlow updates automatically for every store. If a new feature needs an extra Shopify permission, the app asks you to approve it the next time you open it.",
  },
  {
    question: "How can I follow new WhatFlow releases?",
    answer:
      "Check this page, or subscribe to the changelog RSS feed at whatflow.io/changelog/rss.xml to see new releases in your feed reader.",
  },
  {
    question: "What is the difference between the official and unofficial API apps?",
    answer:
      "WhatFlow Business API, the official API app, connects through Meta's official WhatsApp Cloud API and adds Shopify Flow triggers, catalog sharing and a team inbox. WhatFlow Chat Automation, the unofficial API app, links a regular WhatsApp account as a linked device, for stores that want to start without a Meta Business account.",
  },
];

function filterHref(app: string, type: string) {
  const params = new URLSearchParams();
  if (app !== "all") params.set("app", app);
  if (type !== "all") params.set("type", type);
  const query = params.toString();
  return query ? `/changelog?${query}` : "/changelog";
}

export default async function ChangelogPage({ searchParams }: ChangelogPageProps) {
  const params = await searchParams;
  const selectedApp = isChangelogApp(params.app) && params.app !== "all" ? params.app : "all";
  const selectedType = isChangelogType(params.type) ? params.type : "all";

  const all = await getAllChangelog();
  const entries = all.filter((item) => {
    const appMatch =
      selectedApp === "all" || item.app === selectedApp || item.app === "all";
    const typeMatch = selectedType === "all" || item.type === selectedType;
    return appMatch && typeMatch;
  });
  const months = groupByMonth(entries);

  const counts = {
    feature: all.filter((e) => e.type === "feature").length,
    improvement: all.filter((e) => e.type === "improvement").length,
    fix: all.filter((e) => e.type === "fix").length,
    security: all.filter((e) => e.type === "security").length,
  };
  const latest = all[0];
  const oldest = all[all.length - 1];

  const appFilters = [
    { key: "all", label: "All apps" },
    ...(["business-api", "chat", "ai"] as const)
      .filter((key) => all.some((e) => e.app === key))
      .map((key) => ({ key, label: CHANGELOG_APP_LABELS[key] })),
  ];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/changelog#page`,
    url: `${SITE_URL}/changelog`,
    name: TITLE,
    description: DESCRIPTION,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    dateModified: latest?.updatedAt || latest?.releaseDate,
    about: [
      { "@type": "SoftwareApplication", name: "WhatFlow Business API (official API app)", applicationCategory: "BusinessApplication", operatingSystem: "Shopify", url: "https://apps.shopify.com/whatflow-official-api" },
      { "@type": "SoftwareApplication", name: "WhatFlow Chat Automation (unofficial API app)", applicationCategory: "BusinessApplication", operatingSystem: "Shopify", url: "https://apps.shopify.com/whatflow" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: all.slice(0, 50).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/changelog/${item.slug}`,
        name: item.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(collectionJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJSON(getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Changelog", url: "/changelog" }])),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getFAQSchema(FAQS)) }} />

      <PageHero
        kicker="Product updates"
        title="WhatFlow changelog."
        accent={["changelog"]}
        sub={
          <p>
            New features, improvements and bug fixes for WhatFlow&apos;s WhatsApp apps for Shopify: the{" "}
            <strong>official API app</strong> (Business API) with its Team Inbox, and the <strong>unofficial API app</strong> (Chat Automation).
          </p>
        }
        actions={
          <a href="/changelog/rss.xml" className="wf-btn wf-btn-ghost wf-btn-sm">
            <RssIcon />
            RSS feed
          </a>
        }
        meta={
          latest && oldest ? (
            <span>
              Covering {formatReleaseDate(oldest.releaseDate)} to {formatReleaseDate(latest.releaseDate)}. Last updated{" "}
              <time dateTime={latest.releaseDate}>{formatReleaseDate(latest.releaseDate)}</time>.
            </span>
          ) : undefined
        }
      >
        {latest && oldest && (
          <dl className="wfc-hero-metrics">
            {[
              { label: "Updates", value: all.length, tone: "wfc-tone-white" },
              { label: "New features", value: counts.feature, tone: "wfc-tone-green" },
              { label: "Improvements", value: counts.improvement, tone: "wfc-tone-sky" },
              { label: "Fixes and security", value: counts.fix + counts.security, tone: "wfc-tone-yellow" },
            ].map((stat) => (
              <div key={stat.label} className={`wfc-metric ${stat.tone} flex flex-col-reverse justify-end`} data-size={stat.label === "Updates" ? undefined : "sm"}>
                <dt className="wfc-metric-label">{stat.label}</dt>
                <dd className="wfc-metric-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHero>

      {/* ─── Filter bar ─── */}
      <nav aria-label="Filter changelog" className="wfc-filterbar">
        <div className="wf-shell wfc-shell-row">
          <div className="wfc-seg" data-size="sm">
            {appFilters.map((f) => {
              const isActive = selectedApp === f.key;
              return (
                <Link key={f.key} href={filterHref(f.key, selectedType)} aria-current={isActive ? "page" : undefined}>
                  {f.label}
                </Link>
              );
            })}
          </div>
          <div className="wfc-seg wfc-seg-green" data-size="sm">
            {[{ key: "all", label: "All types" }, ...CHANGELOG_TYPES].map((t) => {
              const isActive = selectedType === t.key;
              return (
                <Link key={t.key} href={filterHref(selectedApp, t.key)} aria-current={isActive ? "page" : undefined}>
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── Timeline ─── */}
      <section className="py-14 sm:py-20">
        <div className="wf-shell" style={{ maxWidth: 1040 }}>
          {months.length === 0 && (
            <div className="wf-card wfc-empty">
              <h2>Nothing here yet</h2>
              <p>
                No updates match this filter. <Link href="/changelog" className="font-bold underline underline-offset-4">Show all updates</Link>.
              </p>
            </div>
          )}

          {months.map((month) => (
            <section key={month.key} className="wfc-month" aria-labelledby={`month-${month.key}`}>
              <h2 id={`month-${month.key}`} className="wfc-month-head" data-reveal>
                {month.label}
                <small>
                  {month.entries.length} {month.entries.length === 1 ? "update" : "updates"}
                </small>
              </h2>
              <ol className="wfc-tl">
                {month.entries.map((entry, index) => (
                  <ChangelogCard key={entry.slug} entry={entry} index={index} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="wf-section" data-tone="white" style={{ borderTop: "2.5px solid var(--ink)" }}>
        <div className="wf-shell">
          <div className="wf-head" data-reveal>
            <h2 className="wf-h2">About this changelog</h2>
          </div>
          <div className="wf-grid wf-grid-2 mt-10">
            {FAQS.map((faq, index) => (
              <div key={faq.question} className="wf-card" data-reveal style={{ "--d": `${(index % 2) * 80}ms` } as CSSProperties}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ChangelogCard({ entry, index }: { entry: ChangelogItem; index: number }) {
  const date = new Date(entry.releaseDate);
  return (
    <li className="wfc-tl-item" data-reveal style={{ "--d": `${Math.min(index, 4) * 60}ms`, "--tone": typeColor(entry.type) } as CSSProperties}>
      <span className="wfc-tl-dot" aria-hidden="true" />
      <time className="wfc-tl-date" dateTime={entry.releaseDate}>
        <b>{date.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" })}</b>
        {date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}
      </time>
      <article className="wf-card wfc-entry">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <TypePill type={entry.type} />
            <span className="wf-pill">{CHANGELOG_APP_LABELS[entry.app]}</span>
          </div>
          <time dateTime={entry.releaseDate} className="text-sm font-semibold text-[var(--text-muted-alt)] md:hidden">
            {formatReleaseDate(entry.releaseDate, "short")}
          </time>
        </div>
        <h3 style={{ marginTop: 16 }}>
          <Link href={`/changelog/${entry.slug}`}>{entry.title}</Link>
        </h3>
        <p>{entry.summary}</p>
        <Link
          href={`/changelog/${entry.slug}`}
          className="wfc-link"
          aria-label={`Read the full release notes: ${entry.title}`}
        >
          Full release notes
        </Link>
      </article>
    </li>
  );
}
