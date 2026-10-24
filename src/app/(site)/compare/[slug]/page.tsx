import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { RichText } from "@/lib/RichText";
import { calculateReadingTime } from "@/lib/payload-api";
import { getComparison, getComparisons, formatComparisonDate, comparisonImage, safeJSON, COMPARISON_CATEGORIES, type Comparison } from "@/lib/comparisons-api";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { getBreadcrumbSchema, getFAQSchema, SITE_URL } from "@/lib/schema-org";

interface Props { params: Promise<{ slug: string }> }
const loadComparison = cache(getComparison);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await loadComparison(slug);
  if (!item) return { title: "Comparison not found", robots: { index: false } };
  const title = item.seo?.metaTitle || item.title;
  const description = item.seo?.metaDescription || item.excerpt;
  const image = comparisonImage(item);
  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/compare/${item.slug}` },
    robots: { index: !item.seo?.noindex, follow: true },
    openGraph: { type: "article", title, description, url: `${SITE_URL}/compare/${item.slug}`, publishedTime: item.publishedAt, modifiedTime: item.updatedAt, authors: [item.author], ...(image ? { images: [{ url: image, alt: item.imageAlt || item.title }] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const item = await loadComparison(slug);
  if (!item) notFound();
  const image = comparisonImage(item);
  const selectedRelated = item.relatedComparisons?.filter((doc): doc is Comparison => typeof doc === "object" && doc !== null && doc.slug !== item.slug) ?? [];
  const related = selectedRelated.length ? selectedRelated.slice(0, 3) : (await getComparisons({ category: item.category, excludeSlug: item.slug, limit: 3 })).docs;
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: item.title, description: item.excerpt,
    mainEntityOfPage: `${SITE_URL}/compare/${item.slug}`,
    datePublished: item.publishedAt, dateModified: item.updatedAt,
    author: { "@type": "Person", name: item.author, jobTitle: item.authorRole, worksFor: { "@type": "Organization", name: "WhatFlow", url: SITE_URL } },
    publisher: { "@type": "Organization", name: "WhatFlow", url: SITE_URL },
    ...(image ? { image: new URL(image, SITE_URL).href } : {}),
    citation: item.sources.map(source => source.url),
  };
  return <main className="bg-[#FAF7F0] text-black">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/compare" }, { name: item.title, url: `/compare/${item.slug}` }])) }} />
    {!!item.faqs?.length && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getFAQSchema(item.faqs)) }} />}
    <header className="border-b-[2.5px] border-black px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600"><Link href="/">Home</Link> / <Link href="/compare">Compare</Link> / {item.competitor}</nav>
        <span className="neo-pill bg-[#00D261] px-3 py-1 text-xs font-black uppercase">{COMPARISON_CATEGORIES[item.category]}</span>
        <h1 id="comparison-title" className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">{item.title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed">{item.excerpt}</p>
        <div className="border-t border-black/15 pt-5 text-sm space-y-1">
          <p className="font-bold">By {item.author} <span className="font-normal text-gray-600">· {item.authorRole}</span></p>
          <p className="text-gray-600">Published <time dateTime={item.publishedAt}>{formatComparisonDate(item.publishedAt)}</time> · Sources checked <time dateTime={item.reviewedAt}>{formatComparisonDate(item.reviewedAt)}</time> · {calculateReadingTime(item.content)} min read</p>
        </div>
      </div>
    </header>
    <article aria-labelledby="comparison-title" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <aside className="neo-box bg-[#E8F8F0] p-6 sm:p-8 rounded-2xl space-y-3" aria-label="The short answer">
        <h2 className="font-display text-2xl font-black">The short answer</h2>
        <p className="leading-relaxed">{item.verdict}</p>
      </aside>
      <p className="text-sm text-gray-600 leading-relaxed">Publisher disclosure: this comparison is written by WhatFlow. Competitor capabilities are based on the linked public documentation; the WhatFlow screenshots come from our demo store. Examples are illustrative, and results depend on your store and configuration.</p>
      {image && <figure className="space-y-3">
        {/* CMS supports owned local screenshots and editorial image URLs without a host allowlist. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href={image} target="_blank" rel="noopener noreferrer" aria-label="View the full-size article cover"><img src={image} alt={item.imageAlt || item.coverImage?.alt || item.title} width={1200} height={630} className="w-full h-auto rounded-xl border-2 border-black" fetchPriority="high" /></a>
        {item.imageCaption && <figcaption className="text-sm text-gray-600">{item.imageCaption}{item.imageSourceUrl && <> <a href={item.imageSourceUrl} className="underline" rel="noopener noreferrer">Image source</a></>}</figcaption>}
      </figure>}
      {!!item.featureTable?.length && <section aria-labelledby="comparison-table-heading" className="space-y-5">
        <h2 id="comparison-table-heading" className="font-display text-3xl font-black">{item.category === "channels" ? "WhatsApp with WhatFlow" : "WhatFlow"} and {item.competitor} at a glance</h2>
        <div className="overflow-x-auto rounded-xl border-2 border-black bg-white" role="region" aria-labelledby="comparison-table-heading" tabIndex={0}>
          <table className="w-full text-sm text-left min-w-[600px]">
            <caption className="sr-only">Workflow and buying considerations for WhatFlow and {item.competitor}</caption>
            <thead className="bg-[#091E17] text-white"><tr><th scope="col" className="p-4">Consideration</th><th scope="col" className="p-4">{item.category === "channels" ? "WhatsApp with WhatFlow" : "WhatFlow"}</th><th scope="col" className="p-4">{item.competitor}</th></tr></thead>
            <tbody>{item.featureTable.map((row, i) => <tr key={i} className="border-t border-black/10 align-top"><th scope="row" className="p-4 font-bold">{row.feature}</th><td className="p-4 text-gray-700">{row.whatflow}</td><td className="p-4 text-gray-700">{row.competitor}</td></tr>)}</tbody>
          </table>
        </div>
      </section>}
      <RichText content={item.content} />
      {!!item.faqs?.length && <section className="space-y-5"><h2 className="font-display text-3xl font-black">Questions worth asking</h2>{item.faqs.map((faq, i) => <details key={i} className="neo-box bg-white rounded-xl p-5"><summary className="font-bold cursor-pointer">{faq.question}</summary><p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p></details>)}</section>}
      <section id="sources" className="border-t border-black/20 pt-8 space-y-4"><h2 className="font-display text-2xl font-black">Sources and methodology</h2><p className="text-sm text-gray-600">We checked these primary sources on {formatComparisonDate(item.reviewedAt)}. Vendor pages describe advertised capabilities, rather than independent performance tests. Confirm current pricing, plan limits and availability with each provider.</p><ul className="space-y-3">{item.sources.map((source, i) => <li key={i} className="text-sm"><a className="underline font-semibold text-[#0A6B56]" href={source.url} rel="noopener noreferrer">{source.title}</a>{source.note && <p className="mt-1 text-gray-600">{source.note}</p>}</li>)}</ul></section>
      {item.cta?.heading && <aside className="neo-box bg-[#091E17] text-white rounded-2xl p-8 space-y-5"><h2 className="font-display text-3xl font-black">{item.cta.heading}</h2><p className="text-gray-300">{item.cta.description}</p><a href={getShopifyAppUrl(`compare_${item.slug}`)} className="neo-btn inline-block bg-[#00D261] text-black px-5 py-3 rounded-lg font-bold" rel="noopener noreferrer">{item.cta.label}</a><p className="text-sm"><Link href="/pricing" className="underline">View current pricing</Link> · <Link href="/features" className="underline">Explore the features</Link></p></aside>}
    </article>
    {!!related.length && <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-6"><h2 className="font-display text-3xl font-black">Keep comparing</h2><div className="grid md:grid-cols-3 gap-5">{related.map(doc => <Link href={`/compare/${doc.slug}`} key={doc.id} className="neo-box rounded-xl bg-white p-6 space-y-3 block hover:bg-[#E8F8F0]"><h3 className="font-bold text-lg">{doc.title}</h3><p className="text-sm text-gray-600">{doc.excerpt}</p></Link>)}</div></section>}
  </main>;
}
