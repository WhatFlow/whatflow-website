import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies, INDUSTRY_LABELS, APP_LABELS, type CaseStudy } from "@/lib/payload-api";
import { PageHero } from "@/components/site/PageKit";
import { Cover, EmptyCard, ICONS, METRIC_TONES } from "../blog/blog-ui";
import "../blog/content.css";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies" },
  title: "Case Studies — WhatFlow",
  description:
    "Real results from Shopify merchants using WhatFlow. See how stores recover abandoned carts, increase conversions, and delight customers with WhatsApp automation.",
  keywords: [
    "WhatFlow case studies",
    "WhatsApp Shopify success stories",
    "cart recovery results",
    "Shopify WhatsApp ROI",
    "WhatsApp marketing results",
  ],
};

const INDUSTRIES = [
  { value: "all", label: "All industries" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "food", label: "Food and drink" },
  { value: "electronics", label: "Electronics" },
  { value: "home", label: "Home and living" },
  { value: "sports", label: "Sports" },
] as const;

const APP_TONES: Record<string, string> = {
  chat: "wfc-tone-yellow",
  business: "wfc-tone-mint",
  ai: "wfc-tone-lilac",
};

function StoreMark({ study }: { study: CaseStudy }) {
  return (
    <span className="wfc-store">
      <span className="wfc-logo" aria-hidden={study.storeLogo?.url ? undefined : true}>
        {study.storeLogo?.url ? (
          <Image src={study.storeLogo.url} alt={study.storeName} width={30} height={30} />
        ) : (
          study.storeName.charAt(0)
        )}
      </span>
      {study.storeName}
    </span>
  );
}

function StudyCover({ study, priority, sizes }: { study: CaseStudy; priority?: boolean; sizes?: string }) {
  const primaryMetric = study.metrics?.[0];
  return (
    <Cover media={study.coverImage?.url} alt={study.coverImage?.alt || study.title} icon={ICONS.trend} priority={priority} sizes={sizes}>
      {study.featured && (
        <div className="wfc-cover-badges">
          <span className="wf-pill wfc-tone-yellow">Featured</span>
        </div>
      )}
      {primaryMetric && (
        <div className="wfc-chip-metric">
          <b>{primaryMetric.value}</b>
          <small>{primaryMetric.label}</small>
        </div>
      )}
    </Cover>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const industryLabel = INDUSTRY_LABELS[study.industry] ?? study.industry;

  return (
    <Link href={`/case-studies/${study.slug}`} className="wf-card wfc-card" data-reveal style={{ "--d": `${(index % 3) * 80}ms` } as CSSProperties}>
      <StudyCover study={study} />
      <div className="wfc-card-body">
        <div className="flex items-center justify-between gap-2 flex-wrap text-sm">
          <StoreMark study={study} />
          <span className="wf-pill wfc-tone-mint">{industryLabel}</span>
        </div>

        <h2>{study.title}</h2>
        {study.excerpt && <p>{study.excerpt}</p>}

        {/* Metrics row */}
        {study.metrics && study.metrics.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {study.metrics.slice(0, 2).map((metric, i) => (
              <div key={metric.label} className={`wfc-metric ${METRIC_TONES[(i + 1) % METRIC_TONES.length]}`} data-size="sm">
                <span className="wfc-metric-value" style={{ fontSize: "1.6rem" }}>{metric.value}</span>
                <span className="wfc-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Apps used */}
        <div className="wfc-card-foot">
          <div className="flex gap-1.5 flex-wrap">
            {study.appsUsed?.slice(0, 2).map((app) => (
              <span key={app} className={`wf-pill ${APP_TONES[app] ?? "wfc-tone-white"}`}>
                {APP_LABELS[app] ?? app}
              </span>
            ))}
          </div>
          <span className="wfc-more">Read</span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="wf-card wfc-feature" data-reveal>
      <StudyCover study={study} priority sizes="(min-width: 900px) 640px, 100vw" />
      <div className="wfc-card-body">
        <div className="flex items-center gap-3 flex-wrap text-sm">
          <StoreMark study={study} />
        </div>
        <h2>{study.title}</h2>
        {study.excerpt && <p>{study.excerpt}</p>}
        {study.metrics && study.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {study.metrics.slice(0, 2).map((metric, i) => (
              <div key={metric.label} className={`wfc-metric ${METRIC_TONES[i % METRIC_TONES.length]}`} data-size="sm">
                <span className="wfc-metric-value">{metric.value}</span>
                <span className="wfc-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="wfc-card-foot">
          <span className="wf-pill wfc-tone-mint">{INDUSTRY_LABELS[study.industry] ?? study.industry}</span>
          <span className="wfc-more">Read the story</span>
        </div>
      </div>
    </Link>
  );
}

interface CaseStudiesPageProps {
  searchParams: Promise<{ industry?: string; page?: string }>;
}

export default async function CaseStudiesPage({ searchParams }: CaseStudiesPageProps) {
  const params = await searchParams;
  const selectedIndustry = params.industry ?? "all";
  const currentPage = parseInt(params.page ?? "1", 10);

  let studiesData;
  try {
    studiesData = await getCaseStudies({
      industry: selectedIndustry !== "all" ? selectedIndustry : undefined,
      page: currentPage,
      limit: 9,
    });
  } catch {
    studiesData = { docs: [], totalPages: 0, totalDocs: 0, page: 1, hasNextPage: false, hasPrevPage: false };
  }

  const studies = studiesData.docs;
  const feature = currentPage === 1 && studies.length > 0 ? studies.find((study) => study.featured) ?? studies[0] : undefined;
  const rest = feature ? studies.filter((study) => study.id !== feature.id) : studies;
  const pageHref = (page: number) => `/case-studies?${selectedIndustry !== "all" ? `industry=${selectedIndustry}&` : ""}page=${page}`;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <PageHero
        kicker="Merchant success stories"
        title="Real stores. Real results."
        accent={["results"]}
        sub={<p>See how Shopify merchants use WhatFlow to recover abandoned carts, boost revenue, and build customer loyalty through WhatsApp.</p>}
      >
        <div className="wfc-hero-metrics">
          {[
            { value: "10,000+", label: "Merchants worldwide", tone: "wfc-tone-green" },
            { value: "98%", label: "Open rate", tone: "wfc-tone-yellow" },
            { value: "$2M+", label: "Revenue recovered", tone: "wfc-tone-sky" },
          ].map((stat) => (
            <div key={stat.label} className={`wfc-metric ${stat.tone}`}>
              <span className="wfc-metric-value">{stat.value}</span>
              <span className="wfc-metric-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="wf-shell">
          {/* ─── Industry filter ─── */}
          <nav aria-label="Filter by industry" className="wfc-seg" data-reveal>
            {INDUSTRIES.map((ind) => {
              const isActive = ind.value === selectedIndustry;
              return (
                <Link
                  key={ind.value}
                  href={ind.value === "all" ? "/case-studies" : `/case-studies?industry=${ind.value}`}
                  id={`industry-filter-${ind.value}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {ind.label}
                </Link>
              );
            })}
          </nav>

          <p className="wfc-count">
            {studiesData.totalDocs} {studiesData.totalDocs === 1 ? "case study" : "case studies"}
            {selectedIndustry !== "all" && ` in ${INDUSTRY_LABELS[selectedIndustry] ?? selectedIndustry}`}
          </p>

          {feature && <FeaturedStudyCard study={feature} />}
          <div className={`wf-grid wf-grid-3 ${feature ? "mt-6" : ""}`}>
            {studies.length > 0 ? (
              rest.map((study, index) => <CaseStudyCard key={study.id} study={study} index={index} />)
            ) : (
              <EmptyCard icon={ICONS.trend} title="Case studies coming soon">
                We&apos;re collecting merchant success stories. Check back soon.
              </EmptyCard>
            )}
          </div>

          {/* ─── Pagination ─── */}
          {(studiesData.hasPrevPage || studiesData.hasNextPage) && (
            <nav aria-label="Pagination" className="wfc-pager">
              {studiesData.hasPrevPage && (
                <Link href={pageHref(currentPage - 1)} className="wf-btn wf-btn-ghost wf-btn-sm">
                  Previous page
                </Link>
              )}
              <span>
                Page {studiesData.page} of {studiesData.totalPages}
              </span>
              {studiesData.hasNextPage && (
                <Link href={pageHref(currentPage + 1)} className="wf-btn wf-btn-green wf-btn-sm">
                  Next page
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
