import type { Metadata } from "next";
import Link from "next/link";
import {
  getChangelogEntries,
  CHANGELOG_TYPE_LABELS,
  CHANGELOG_TYPE_COLORS,
  type ChangelogEntry,
} from "@/lib/payload-api";

export const metadata: Metadata = {
  title: "Product Changelog & Release Notes | WhatFlow",
  description: "See what's new in WhatFlow. Weekly release notes, feature launches, performance improvements, and API updates.",
};

const DEFAULT_CHANGELOG: Partial<ChangelogEntry>[] = [
  {
    version: "v2.6.0",
    title: "Native Shopify Flow Action & Auto-Replier Updates",
    releaseDate: "2026-08-18",
    type: "feature",
    app: "business-api",
    summary: "Added native Shopify Flow action triggers, instantaneous Judge.me review requests, and automatic WhatsApp order confirmation reconciliation.",
    gitCommitHash: "c4f812e",
  },
  {
    version: "v2.5.2",
    title: "Ultra-Fast Edge Metadata Caching & Zero-Markup Rates",
    releaseDate: "2026-08-14",
    type: "improvement",
    app: "all",
    summary: "Migrated Meta Cloud API token validation to Cloudflare platform proxies with zero latency overhead. Released full country rate transparency calculators.",
    gitCommitHash: "9a7b11d",
  },
  {
    version: "v2.4.0",
    title: "Interactive Quick Reply Buttons & Auto-Tagging",
    releaseDate: "2026-08-08",
    type: "feature",
    app: "chat",
    summary: "Merchants can now attach interactive 'Confirm Order' and 'Cancel Order' buttons that automatically tag Shopify orders in real-time.",
    gitCommitHash: "3b2e59a",
  },
  {
    version: "v2.3.1",
    title: "Enhanced Meta Cloud API v25.0 Support",
    releaseDate: "2026-07-29",
    type: "security",
    app: "business-api",
    summary: "Upgraded Graph API endpoints to version 25.0 with strict end-to-end webhook validation and enhanced template error code diagnostics.",
    gitCommitHash: "e17a44f",
  },
];

interface ChangelogPageProps {
  searchParams: Promise<{ app?: string; type?: string }>;
}

export default async function ChangelogPage({ searchParams }: ChangelogPageProps) {
  const params = await searchParams;
  const selectedApp = params.app ?? "all";
  const selectedType = params.type ?? "all";

  let cmsEntries: ChangelogEntry[] = [];
  try {
    const res = await getChangelogEntries({
      app: selectedApp !== "all" ? selectedApp : undefined,
      type: selectedType !== "all" ? selectedType : undefined,
    });
    cmsEntries = res.docs;
  } catch {
    cmsEntries = [];
  }

  const entries =
    cmsEntries.length > 0
      ? cmsEntries
      : (DEFAULT_CHANGELOG.filter((item) => {
          const matchApp = selectedApp === "all" || item.app === selectedApp;
          const matchType = selectedType === "all" || item.type === selectedType;
          return matchApp && matchType;
        }) as ChangelogEntry[]);

  const appFilters = [
    { key: "all", label: "All Apps" },
    { key: "business-api", label: "Business API" },
    { key: "chat", label: "WhatFlow Chat" },
    { key: "ai", label: "WhatFlow AI" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
              PRODUCT UPDATES
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#00D261] animate-pulse" />
              <span>SHIPPING WEEKLY</span>
            </div>
          </div>

          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-4">
            WHAT&apos;S NEW IN <br />
            <span className="text-stroke-green">WHATFLOW.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-xl">
            Track our latest features, performance improvements, and developer updates in real time.
          </p>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <section className="border-b-[2.5px] border-black bg-white px-4 sm:px-6 py-3 sticky top-0 z-30">
        <div className="max-w-[960px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto">
            {appFilters.map((f) => {
              const isActive = selectedApp === f.key;
              return (
                <Link
                  key={f.key}
                  href={f.key === "all" ? "/changelog" : `/changelog?app=${f.key}`}
                  className={`neo-pill px-3 py-1 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#00D261] text-black shadow-[2px_2px_0px_#000]"
                      : "bg-[#FAF7F0] text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            API SYNC ENABLED
          </div>
        </div>
      </section>

      {/* ─── Timeline Feed ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[960px] mx-auto">
        <div className="space-y-8">
          {entries.map((entry) => {
            const formattedDate = new Date(entry.releaseDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const typeColor = CHANGELOG_TYPE_COLORS[entry.type] ?? "bg-gray-100 text-black";
            const typeLabel = CHANGELOG_TYPE_LABELS[entry.type] ?? entry.type;

            return (
              <article
                key={entry.version + entry.title}
                className="neo-box bg-white p-7 sm:p-9 rounded-2xl space-y-4 relative"
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="neo-box bg-black text-[#00D261] px-2.5 py-1 text-xs font-display font-black tracking-wider uppercase">
                      {entry.version}
                    </span>
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${typeColor}`}>
                      {typeLabel}
                    </span>
                    {entry.app && entry.app !== "all" && (
                      <span className="neo-pill bg-[#FAF7F0] border-black text-[10px] font-bold text-gray-700 uppercase">
                        {entry.app}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase">
                    {entry.gitCommitHash && (
                      <span className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200 text-gray-600">
                        {entry.gitCommitHash.slice(0, 7)}
                      </span>
                    )}
                    <span>{formattedDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-black leading-tight">
                  {entry.title}
                </h2>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                  {entry.summary}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
