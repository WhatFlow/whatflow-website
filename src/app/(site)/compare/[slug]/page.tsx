import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, type CSSProperties } from "react";
import { RichText } from "@/lib/RichText";
import { calculateReadingTime } from "@/lib/payload-api";
import { getComparison, getComparisons, formatComparisonDate, comparisonImage, safeJSON, COMPARISON_CATEGORIES, type Comparison } from "@/lib/comparisons-api";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { getBreadcrumbSchema, getFAQSchema, SITE_URL } from "@/lib/schema-org";
import { PageHero, Section } from "@/components/site/PageKit";
import "../compare.css";

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
  const whatflowLabel = item.category === "channels" ? "WhatsApp with WhatFlow" : "WhatFlow";
  return <div className="cmp-article bg-[var(--paper)] text-black">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/compare" }, { name: item.title, url: `/compare/${item.slug}` }])) }} />
    {!!item.faqs?.length && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJSON(getFAQSchema(item.faqs)) }} />}
    <PageHero
      id="comparison-title"
      title={item.title}
      accent={["WhatFlow"]}
      sub={<p><b className="wf-leadin">{COMPARISON_CATEGORIES[item.category]}.</b> {item.excerpt}</p>}
      meta={<>
        <nav aria-label="Breadcrumb" className="cmp-crumbs"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/compare">Compare</Link><span aria-hidden="true">/</span><span aria-current="page">{item.competitor}</span></nav>
        <span className="cmp-meta-line"><b>By {item.author}</b> · {item.authorRole}</span>
        <span className="cmp-meta-line cmp-meta-row"><span>Published <time dateTime={item.publishedAt}>{formatComparisonDate(item.publishedAt)}</time></span><span>Sources checked <time dateTime={item.reviewedAt}>{formatComparisonDate(item.reviewedAt)}</time></span><span>{calculateReadingTime(item.content)} min read</span></span>
      </>}
    />
    <Section tone="paper">
      <article aria-label={item.title} className="cmp-body">
        <aside className="cmp-verdict" aria-label="The short answer" data-reveal>
          <h2>The short answer</h2>
          <p>{item.verdict}</p>
        </aside>
        <p className="cmp-disclosure">Publisher disclosure: this comparison is written by WhatFlow. Competitor capabilities are based on the linked public documentation; the WhatFlow screenshots come from our demo store. Examples are illustrative, and results depend on your store and configuration.</p>
        {image && <figure className="cmp-figure" data-reveal>
          {/* CMS supports owned local screenshots and editorial image URLs without a host allowlist. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href={image} target="_blank" rel="noopener noreferrer" aria-label="View the full-size article cover"><img src={image} alt={item.imageAlt || item.coverImage?.alt || item.title} width={1200} height={630} className="w-full h-auto" fetchPriority="high" /></a>
          {item.imageCaption && <figcaption>{item.imageCaption}{item.imageSourceUrl && <> <a href={item.imageSourceUrl} rel="noopener noreferrer">Image source</a></>}</figcaption>}
        </figure>}
        {!!item.featureTable?.length && <section aria-labelledby="comparison-table-heading" data-reveal>
          <h2 id="comparison-table-heading" className="cmp-h2">{whatflowLabel} and {item.competitor} at a glance</h2>
          <div className="cmp-table-wrap" role="region" aria-label="Scrollable comparison table" tabIndex={0}>
            <table className="cmp-table">
              <caption className="sr-only">Workflow and buying considerations for WhatFlow and {item.competitor}</caption>
              <thead><tr><th scope="col">Consideration</th><th scope="col" className="cmp-wf">{whatflowLabel}</th><th scope="col">{item.competitor}</th></tr></thead>
              <tbody>{item.featureTable.map((row, i) => <tr key={i}><th scope="row">{row.feature}</th><td className="cmp-wf"><Cell value={row.whatflow} /></td><td><Cell value={row.competitor} /></td></tr>)}</tbody>
            </table>
          </div>
        </section>}
        <RichText content={item.content} />
        {!!item.faqs?.length && <section data-reveal><h2 className="cmp-h2">Questions worth asking</h2><div className="cmp-faq">{item.faqs.map((faq, i) => <details key={i}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>}
        <section id="sources" className="cmp-sources"><h2 className="cmp-h2">Sources and methodology</h2><p>We checked these primary sources on {formatComparisonDate(item.reviewedAt)}. Vendor pages describe advertised capabilities, rather than independent performance tests. Confirm current pricing, plan limits and availability with each provider.</p><ul>{item.sources.map((source, i) => <li key={i}><a href={source.url} rel="noopener noreferrer">{source.title}</a>{source.note && <p>{source.note}</p>}</li>)}</ul></section>
        {item.cta?.heading && <aside className="cmp-cta" data-reveal><h2>{item.cta.heading}</h2><p>{item.cta.description}</p><a href={getShopifyAppUrl(`compare_${item.slug}`)} className="wf-btn wf-btn-green mt-6" rel="noopener noreferrer">{item.cta.label}</a><p className="cmp-cta-links"><Link href="/pricing">View current pricing</Link><Link href="/features">Explore the features</Link></p></aside>}
      </article>
    </Section>
    {!!related.length && <Section tone="white"><h2 className="cmp-h2" data-reveal>Keep comparing</h2><div className="wf-grid wf-grid-3 mt-8">{related.map((doc, index) => <Link href={`/compare/${doc.slug}`} key={doc.id} className="wf-card" data-reveal style={{ "--d": `${index * 80}ms` } as CSSProperties}><h3>{doc.title}</h3><p>{doc.excerpt}</p><span className="mt-auto pt-5 font-bold">Read the comparison</span></Link>)}</div></Section>}
  </div>;
}

/** Table cell: adds a check or cross when the CMS value is, or opens with, a bare "Yes" or "No" ("No seat fees" gets no mark). */
function Cell({ value }: { value: string }) {
  const match = /^(yes|no)(?:$|[.,;:(—–-])/i.exec(value.trim());
  const verdict = match ? (match[1].toLowerCase() === "yes" ? "yes" : "no") : null;
  return <>{verdict && <span className={`cmp-mark cmp-mark-${verdict}`} aria-hidden="true">{verdict === "yes" ? "✓" : "✕"}</span>}{value}</>;
}
