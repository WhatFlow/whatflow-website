import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema-org";
import { safeJSON } from "@/lib/comparisons-api";
import {
  CHANGELOG_APP_LABELS,
  CHANGELOG_TYPES,
  CHANGELOG_TYPE_BADGE,
  formatReleaseDate,
  getAllChangelog,
  groupByMonth,
  isChangelogApp,
  isChangelogType,
  type ChangelogItem,
} from "@/lib/changelog";

const TITLE = "Changelog: WhatsApp for Shopify Product Updates";
const DESCRIPTION =
  "Release notes for WhatFlow's WhatsApp apps for Shopify: new features, improvements, bug fixes and security updates for WhatFlow Business API, Chat Automation and the Team Inbox.";

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
      "It covers WhatFlow Business API, the official Meta WhatsApp Cloud API app for Shopify that includes the WhatsApp Team Inbox, and WhatFlow Chat Automation, the linked-device WhatsApp app for Shopify. Updates that apply to both are labeled \"Both apps\".",
  },
  {
    question: "Do I need to do anything to get these updates?",
    answer:
      "No. WhatFlow updates automatically for every store. If a new feature needs an extra Shopify permission, the app asks you to approve it the next time you open it.",
  },
  {
    question: "How can I follow new WhatFlow releases?",
    answer:
      "Check this page, or subscribe to the changelog RSS feed at whatflow.tech/changelog/rss.xml to see new releases in your feed reader.",
  },
  {
    question: "What is the difference between WhatFlow Business API and WhatFlow Chat Automation?",
    answer:
      "WhatFlow Business API connects through Meta's official WhatsApp Cloud API and adds Shopify Flow triggers, catalog sharing and a team inbox. WhatFlow Chat Automation links a regular WhatsApp account as a linked device, for stores that want to start without a Meta Business account.",
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
      { "@type": "SoftwareApplication", name: "WhatFlow Business API", applicationCategory: "BusinessApplication", operatingSystem: "Shopify", url: "https://apps.shopify.com/whatflow-official-api" },
      { "@type": "SoftwareApplication", name: "WhatFlow Chat Automation", applicationCategory: "BusinessApplication", operatingSystem: "Shopify", url: "https://apps.shopify.com/whatflow" },
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
    <div className="min-h-screen bg-[#FAF7F0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(collectionJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJSON(getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Changelog", url: "/changelog" }])),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getFAQSchema(FAQS)) }} />

      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
              Product updates
            </div>
            <a
              href="/changelog/rss.xml"
              className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-black"
            >
              <span className="w-2 h-2 rounded-full bg-[#00D261]" aria-hidden />
              RSS feed
            </a>
          </div>

          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-4">
            WhatFlow <br />
            <span className="text-stroke-green">Changelog.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl">
            New features, improvements and bug fixes for WhatFlow&apos;s WhatsApp apps for Shopify: the{" "}
            <strong>Business API</strong> app with its Team Inbox, and <strong>Chat Automation</strong>.
          </p>

          {latest && oldest && (
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {[
                { label: "Updates", value: all.length },
                { label: "New features", value: counts.feature },
                { label: "Improvements", value: counts.improvement },
                { label: "Fixes & security", value: counts.fix + counts.security },
              ].map((stat) => (
                <div key={stat.label} className="neo-box bg-white px-4 py-3">
                  <dt className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">{stat.label}</dt>
                  <dd className="text-2xl font-display font-black text-black">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {latest && oldest && (
            <p className="mt-4 text-xs font-bold text-gray-500">
              Covering {formatReleaseDate(oldest.releaseDate)} to {formatReleaseDate(latest.releaseDate)}. Last
              updated <time dateTime={latest.releaseDate}>{formatReleaseDate(latest.releaseDate)}</time>.
            </p>
          )}
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <nav
        aria-label="Filter changelog"
        className="border-b-[2.5px] border-black bg-white px-4 sm:px-6 py-3 sticky top-0 z-30"
      >
        <div className="max-w-[960px] mx-auto flex flex-col gap-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {appFilters.map((f) => {
              const isActive = selectedApp === f.key;
              return (
                <Link
                  key={f.key}
                  href={filterHref(f.key, selectedType)}
                  aria-current={isActive ? "page" : undefined}
                  className={`neo-pill px-3 py-1 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive ? "bg-[#00D261] text-black shadow-[2px_2px_0px_#000]" : "bg-[#FAF7F0] text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {[{ key: "all", label: "All types" }, ...CHANGELOG_TYPES].map((t) => {
              const isActive = selectedType === t.key;
              return (
                <Link
                  key={t.key}
                  href={filterHref(selectedApp, t.key)}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border whitespace-nowrap transition-all ${
                    isActive ? "border-black bg-black text-white" : "border-gray-300 text-gray-600 hover:border-black"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── Timeline Feed ─── */}
      <section className="px-4 sm:px-6 py-14 max-w-[960px] mx-auto">
        {months.length === 0 && (
          <p className="text-sm font-medium text-gray-600">
            No updates match this filter. <Link href="/changelog" className="underline">Show all updates</Link>.
          </p>
        )}

        <div className="space-y-14">
          {months.map((month) => (
            <section key={month.key} aria-labelledby={`month-${month.key}`}>
              <h2
                id={`month-${month.key}`}
                className="text-2xl sm:text-3xl font-display font-black uppercase text-black mb-6 scroll-mt-32"
              >
                {month.label}
              </h2>
              <ol className="space-y-6 border-l-[2.5px] border-black pl-5 sm:pl-8">
                {month.entries.map((entry) => (
                  <ChangelogCard key={entry.slug} entry={entry} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t-[2.5px] border-black bg-white px-4 sm:px-6 py-14">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-black mb-6">
            About this changelog
          </h2>
          <div className="space-y-5">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-extrabold text-black">{faq.question}</h3>
                <p className="mt-1 text-sm text-gray-700 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ChangelogCard({ entry }: { entry: ChangelogItem }) {
  const badge = CHANGELOG_TYPE_BADGE[entry.type];
  return (
    <li className="relative">
      <span
        className="absolute -left-[29px] sm:-left-[41px] top-7 w-3.5 h-3.5 rounded-full border-[2.5px] border-black bg-[#00D261]"
        aria-hidden
      />
      <article className="neo-box bg-white p-6 sm:p-8 rounded-2xl space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${badge.className}`}>
              {badge.label}
            </span>
            <span className="neo-pill bg-[#FAF7F0] border-black px-2.5 py-0.5 text-[10px] font-bold text-gray-700 uppercase">
              {CHANGELOG_APP_LABELS[entry.app]}
            </span>
          </div>
          <time dateTime={entry.releaseDate} className="text-xs font-bold text-gray-500 uppercase">
            {formatReleaseDate(entry.releaseDate, "short")}
          </time>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-black leading-tight">
          <Link href={`/changelog/${entry.slug}`} className="hover:text-[#00A84D]">
            {entry.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-700 font-medium leading-relaxed">{entry.summary}</p>
        <Link
          href={`/changelog/${entry.slug}`}
          className="inline-block text-xs font-extrabold uppercase tracking-wider text-black underline underline-offset-4"
          aria-label={`Read the full release notes: ${entry.title}`}
        >
          Full release notes →
        </Link>
      </article>
    </li>
  );
}
