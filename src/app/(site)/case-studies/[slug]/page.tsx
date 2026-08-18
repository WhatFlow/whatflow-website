import type { Metadata } from "next";
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
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SocialShare } from "@/components/SocialShare";
import { NewsletterBox } from "@/components/NewsletterBox";
import { TableOfContents } from "@/components/TableOfContents";

const APP_COLORS: Record<string, string> = {
  chat: "bg-[#FFF3CD] text-[#856404]",
  business: "bg-[#D4EDDA] text-[#155724]",
  ai: "bg-[#E2E3E5] text-[#383D41]",
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

      {/* ─── Cover Banner ─── */}
      <div className="relative w-full h-[300px] sm:h-[420px] bg-[#091E17] border-b-[2.5px] border-black overflow-hidden">
        {study.coverImage?.url ? (
          <Image
            src={study.coverImage.url}
            alt={study.coverImage.alt || study.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D261]/10 via-[#0A6B56]/20 to-[#091E17]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091E17]/80 via-[#091E17]/30 to-transparent" />

        {/* Store info overlay */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            {study.storeLogo?.url ? (
              <div className="neo-box bg-white p-2 w-14 h-14 flex items-center justify-center flex-shrink-0">
                <Image src={study.storeLogo.url} alt={study.storeName} width={44} height={44} className="object-contain" />
              </div>
            ) : (
              <div className="neo-box w-14 h-14 bg-[#00D261] flex items-center justify-center font-display font-black text-2xl text-black flex-shrink-0">
                {study.storeName.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-white font-display font-black text-2xl sm:text-3xl uppercase leading-tight">
                {study.storeName}
              </div>
              <div className="neo-pill bg-[#00D261] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-black inline-block mt-1">
                {industryLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Header ─── */}
      <section className="px-4 sm:px-6 py-10 border-b-[2.5px] border-black bg-[#FAF7F0]">
        <div className="max-w-[1080px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/case-studies" className="hover:text-[#00D261] transition-colors">Case Studies</Link>
            <span>›</span>
            <span className="text-black">{study.storeName}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="neo-box inline-block bg-[#00D261] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
              CASE STUDY
            </div>
            <span className="neo-pill bg-white px-2.5 py-0.5 text-[10px] font-bold text-gray-700">
              ⏱ {readingTime} min read
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[44px] lg:text-[54px] font-display font-black uppercase text-black tracking-tight leading-tight mb-6">
            {study.title}
          </h1>

          {/* Meta row + Social Share */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-[2.5px] border-black">
            <div className="flex items-center gap-4 flex-wrap text-xs font-bold text-gray-500 uppercase tracking-wider">
              {study.publishedAt && <span>{formatDate(study.publishedAt)}</span>}
              <span className="w-1 h-1 rounded-full bg-gray-400" />
              {study.appsUsed?.map((app) => (
                <span
                  key={app}
                  className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${APP_COLORS[app] ?? "bg-gray-100"}`}
                >
                  {APP_LABELS[app] ?? app}
                </span>
              ))}
            </div>

            <SocialShare title={study.title} url={studyUrl} />
          </div>
        </div>
      </section>

      {/* ─── Metrics Strip ─── */}
      {study.metrics && study.metrics.length > 0 && (
        <section className="bg-[#091E17] border-b-[2.5px] border-black px-4 sm:px-6 py-8">
          <div className="max-w-[1080px] mx-auto">
            <div className={`grid gap-6 ${
              study.metrics.length === 1 ? "grid-cols-1 max-w-xs mx-auto" :
              study.metrics.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
              study.metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
              "grid-cols-2 sm:grid-cols-4"
            }`}>
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="neo-box bg-white p-5 text-center"
                >
                  <div className="font-display font-black text-[32px] sm:text-[44px] text-black leading-none">
                    {metric.value}
                  </div>
                  <div className="font-extrabold text-xs uppercase tracking-wider text-black mt-1">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-[10px] text-gray-500 font-bold mt-0.5">{metric.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Content Grid with Sidebar ─── */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <RichText content={study.content} />

            <NewsletterBox />

            <div className="neo-box bg-white p-5 rounded-xl border-[2.5px] border-black flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-display font-black text-sm uppercase text-black">
                Share this merchant story:
              </div>
              <SocialShare title={study.title} url={studyUrl} />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <TableOfContents />

            <div className="neo-box bg-[#00D261] p-6 text-black space-y-4 rounded-xl">
              <div className="neo-pill inline-block bg-black px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#00D261]">
                GET SIMILAR RESULTS
              </div>
              <h4 className="font-display font-black text-xl uppercase leading-tight">
                LAUNCH IN UNDER 5 MINUTES.
              </h4>
              <p className="text-xs text-black/80 font-medium leading-relaxed">
                Connect WhatFlow to your Shopify store and start recovering abandoned carts on WhatsApp today.
              </p>
              <Link
                href="/#products"
                className="neo-btn bg-black text-[#00D261] font-black text-xs uppercase tracking-wider py-2.5 rounded-lg block text-center"
              >
                INSTALL WHATFLOW ➔
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-[#00D261] border-t-[2.5px] border-black py-14 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto text-center space-y-4">
          <div className="neo-box inline-block bg-black px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#00D261] mb-2">
            YOUR STORE COULD BE NEXT
          </div>
          <h2 className="text-[28px] sm:text-[42px] font-display font-black uppercase text-black tracking-tight leading-tight">
            READY TO GROW YOUR STORE WITH WHATSAPP?
          </h2>
          <p className="text-black/70 font-medium text-sm max-w-lg mx-auto">
            Join 1,000+ Shopify merchants already using WhatFlow. 14-day free trial, no credit card required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
            <Link
              href="/#products"
              className="neo-btn bg-black text-[#00D261] font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg"
            >
              INSTALL ON SHOPIFY →
            </Link>
            <Link
              href="/case-studies"
              className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg"
            >
              ← MORE CASE STUDIES
            </Link>
          </div>
        </div>
      </section>

      {/* ─── More Stories ─── */}
      {moreStudies.length > 0 && (
        <section className="px-4 sm:px-6 py-14 border-t-[2.5px] border-black bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-2">
                  MORE STORIES
                </div>
                <h2 className="text-[26px] sm:text-[32px] font-display font-black uppercase text-black tracking-tight">
                  MORE SUCCESS STORIES
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hidden sm:inline-flex items-center gap-1"
              >
                ALL STORIES →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreStudies.map((s) => (
                <Link
                  key={s.id}
                  href={`/case-studies/${s.slug}`}
                  className="neo-box bg-white overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  <div className="relative h-40 bg-[#091E17] overflow-hidden border-b-[2.5px] border-black">
                    {s.coverImage?.url ? (
                      <Image
                        src={s.coverImage.url}
                        alt={s.coverImage.alt || s.title}
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-[#00D261]/20 to-[#0A6B56]/20">
                        📈
                      </div>
                    )}
                    {s.metrics?.[0] && (
                      <div className="absolute bottom-2 right-2 neo-box bg-[#00D261] px-2.5 py-1.5 text-center">
                        <div className="font-display font-black text-sm text-black leading-none">{s.metrics[0].value}</div>
                        <div className="text-[8px] font-extrabold uppercase text-black/70">{s.metrics[0].label}</div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs uppercase text-black">{s.storeName}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{INDUSTRY_LABELS[s.industry] ?? s.industry}</span>
                    </div>
                    <h3 className="font-display font-black text-sm text-black uppercase leading-tight group-hover:text-[#0A6B56] transition-colors">
                      {s.title}
                    </h3>
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
