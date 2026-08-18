import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies, formatDate, INDUSTRY_LABELS, APP_LABELS, type CaseStudy } from "@/lib/payload-api";

export const metadata: Metadata = {
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
  { value: "all", label: "All Industries" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "food", label: "Food & Bev" },
  { value: "electronics", label: "Electronics" },
  { value: "home", label: "Home & Living" },
  { value: "sports", label: "Sports" },
] as const;

const APP_COLORS: Record<string, string> = {
  chat: "bg-[#FFF3CD] text-[#856404]",
  business: "bg-[#D4EDDA] text-[#155724]",
  ai: "bg-[#E2E3E5] text-[#383D41]",
};

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const industryLabel = INDUSTRY_LABELS[study.industry] ?? study.industry;
  const primaryMetric = study.metrics?.[0];

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="neo-box bg-white flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Cover Image */}
      <div className="relative w-full h-52 bg-[#D5F5E3] border-b-[2.5px] border-black overflow-hidden">
        {study.coverImage?.url ? (
          <Image
            src={study.coverImage.url}
            alt={study.coverImage.alt || study.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D261]/20 to-[#0A6B56]/20 flex items-center justify-center">
            <span className="text-5xl">📈</span>
          </div>
        )}
        {/* Featured badge */}
        {study.featured && (
          <div className="absolute top-3 left-3 neo-pill bg-[#FFC107] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1">
            Featured
          </div>
        )}
        {/* Big metric overlay */}
        {primaryMetric && (
          <div className="absolute bottom-3 right-3 neo-box bg-[#00D261] px-3 py-2 text-center">
            <div className="font-display font-black text-xl text-black leading-none">{primaryMetric.value}</div>
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-black/70">{primaryMetric.label}</div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Store name + industry */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {study.storeLogo?.url ? (
              <Image src={study.storeLogo.url} alt={study.storeName} width={24} height={24} className="rounded border border-black object-contain" />
            ) : (
              <div className="w-6 h-6 rounded bg-[#00D261] border border-black flex items-center justify-center font-extrabold text-[10px] text-black">
                {study.storeName.charAt(0)}
              </div>
            )}
            <span className="text-xs font-extrabold uppercase tracking-wider text-black">{study.storeName}</span>
          </div>
          <span className="neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#E8F8F0] text-[#0A6B56] border-black">
            {industryLabel}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display font-black text-black text-lg leading-tight uppercase tracking-tight group-hover:text-[#0A6B56] transition-colors">
          {study.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs text-gray-600 font-medium leading-relaxed flex-1 line-clamp-3">
          {study.excerpt}
        </p>

        {/* Metrics row */}
        {study.metrics && study.metrics.length > 1 && (
          <div className="grid grid-cols-2 gap-2">
            {study.metrics.slice(0, 2).map((metric) => (
              <div key={metric.label} className="neo-box bg-[#FAF7F0] p-2.5 text-center">
                <div className="font-display font-black text-base text-black">{metric.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-wide text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Apps used + date */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            {study.appsUsed?.slice(0, 2).map((app) => (
              <span
                key={app}
                className={`neo-pill px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider border-black ${APP_COLORS[app] ?? "bg-gray-100 text-gray-700"}`}
              >
                {APP_LABELS[app] ?? app}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] group-hover:text-[#00D261] transition-colors">
            READ →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="neo-box bg-white text-center py-20 px-6 col-span-full">
      <div className="text-5xl mb-4">📈</div>
      <h3 className="font-display font-black text-2xl text-black uppercase mb-2">
        Case Studies Coming Soon
      </h3>
      <p className="text-gray-500 font-medium text-sm max-w-sm mx-auto">
        We're collecting merchant success stories. Check back soon!
      </p>
    </div>
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

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#091E17] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            MERCHANT SUCCESS STORIES
          </div>
          <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] font-display font-black uppercase text-white tracking-tight leading-none mb-4">
            REAL STORES.{" "}
            <span className="text-stroke-green">REAL RESULTS.</span>
          </h1>
          <p className="text-[17px] text-gray-300 font-medium max-w-xl">
            See how Shopify merchants use WhatFlow to recover abandoned carts, boost revenue, and build customer loyalty through WhatsApp.
          </p>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="bg-[#00D261] border-b-[2.5px] border-black px-4 sm:px-6 py-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display font-black text-[28px] sm:text-[40px] text-black leading-none">1,000+</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-black/70">Merchants</div>
          </div>
          <div>
            <div className="font-display font-black text-[28px] sm:text-[40px] text-black leading-none">98%</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-black/70">Open Rate</div>
          </div>
          <div>
            <div className="font-display font-black text-[28px] sm:text-[40px] text-black leading-none">$2M+</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-black/70">Revenue Recovered</div>
          </div>
        </div>
      </section>

      {/* ─── Industry Filter ─── */}
      <section className="bg-white border-b-[2.5px] border-black sticky top-[72px] z-40 px-4 sm:px-6 py-4 overflow-x-auto">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 min-w-max">
          {INDUSTRIES.map((ind) => {
            const isActive = ind.value === selectedIndustry;
            return (
              <Link
                key={ind.value}
                href={ind.value === "all" ? "/case-studies" : `/case-studies?industry=${ind.value}`}
                id={`industry-filter-${ind.value}`}
                className={`neo-btn px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#00D261] text-black shadow-[3px_3px_0px_#000]"
                    : "bg-white text-black hover:bg-[#F0FFF6]"
                }`}
              >
                {ind.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Studies Grid ─── */}
      <section className="px-4 sm:px-6 py-14">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {studiesData.totalDocs} {studiesData.totalDocs === 1 ? "Case Study" : "Case Studies"}
              {selectedIndustry !== "all" && ` in ${INDUSTRY_LABELS[selectedIndustry] ?? selectedIndustry}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.length > 0 ? (
              studies.map((study) => <CaseStudyCard key={study.id} study={study} />)
            ) : (
              <EmptyState />
            )}
          </div>

          {/* ─── Pagination ─── */}
          {(studiesData.hasPrevPage || studiesData.hasNextPage) && (
            <div className="flex items-center justify-center gap-4 mt-14">
              {studiesData.hasPrevPage && (
                <Link
                  href={`/case-studies?${selectedIndustry !== "all" ? `industry=${selectedIndustry}&` : ""}page=${currentPage - 1}`}
                  className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
                >
                  ← PREV PAGE
                </Link>
              )}
              <span className="text-xs font-bold text-gray-500">
                Page {studiesData.page} of {studiesData.totalPages}
              </span>
              {studiesData.hasNextPage && (
                <Link
                  href={`/case-studies?${selectedIndustry !== "all" ? `industry=${selectedIndustry}&` : ""}page=${currentPage + 1}`}
                  className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
                >
                  NEXT PAGE →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#091E17] border-t-[2.5px] border-black py-12 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-[28px] sm:text-[36px] font-display font-black uppercase text-white tracking-tight">
            YOUR STORE COULD BE NEXT.
          </h2>
          <p className="text-gray-300 text-sm font-medium">
            14-day free trial. No credit card required. Cancel anytime.
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
              READ THE BLOG →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
