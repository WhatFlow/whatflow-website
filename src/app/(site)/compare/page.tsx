import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { COMPARISON_CATEGORIES, getComparisons } from "@/lib/comparisons-api";
import { SITE_URL } from "@/lib/schema-org";
import "./compare.css";

type SearchParams = Promise<{ category?: string; page?: string; q?: string }>;
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category && COMPARISON_CATEGORIES[params.category] ? params.category : undefined;
  const page = Number(params.page);
  const canonicalParams = new URLSearchParams();
  if (category) canonicalParams.set("category", category);
  if (Number.isInteger(page) && page > 1) canonicalParams.set("page", String(page));
  const suffix = canonicalParams.size ? `?${canonicalParams}` : "";
  return {
    title: `${category ? COMPARISON_CATEGORIES[category] : "WhatsApp & Shopify"} Comparisons${page > 1 ? ` · Page ${page}` : ""} | WhatFlow`,
    description: "Compare provider pricing, WhatsApp vs email and SMS, team inbox costs and Shopify workflows. Detailed guides by Safwan Adnan, co-founder and CEO of WhatFlow.",
    alternates: { canonical: `${SITE_URL}/compare${suffix}` },
    ...(params.q?.trim() ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ComparePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = params.category && COMPARISON_CATEGORIES[params.category] ? params.category : undefined;
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const query = params.q?.trim().slice(0, 120) || undefined;
  const data = await getComparisons({ category, query, page });
  const categoryUrl = (value?: string) => {
    const next = new URLSearchParams({ ...(value ? { category: value } : {}), ...(query ? { q: query } : {}) });
    return `/compare${next.size ? `?${next}` : ""}`;
  };
  const pageUrl = (n: number) => `/compare?${new URLSearchParams({ ...(category ? { category } : {}), ...(query ? { q: query } : {}), page: String(n) })}`;

  return <div className="bg-[var(--paper)] text-black min-h-screen">
    <div className="wf-shell wf-directory">
      <header className="wf-directory-header">
        <h1>Find the right WhatsApp tool for your store.</h1>
        <p>Compare provider pricing, inbox costs, Shopify integration and customer workflows.</p>
        <p>These guides are published by WhatFlow. Each article names its author, links to primary sources and explains when the other product may be a better fit.</p>
      </header>
      <div className="wf-directory-body">
        <aside className="wf-directory-rail" aria-label="Filter comparisons">
          <h2>Browse by topic</h2>
      <nav aria-label="Comparison categories" className="cmp-filter" data-reveal>
        <Link href={categoryUrl()} aria-current={!category ? "page" : undefined}>All comparisons</Link>
        {Object.entries(COMPARISON_CATEGORIES).map(([key, label]) => <Link key={key} href={categoryUrl(key)} aria-current={category === key ? "page" : undefined}>{label}</Link>)}
      </nav>
        </aside>
        <section className="wf-directory-results" aria-label="Comparison results">
      <form {...{ toolname: "search_whatflow_comparisons", tooldescription: "Search WhatFlow provider and messaging channel comparisons." }} action="/compare" method="get" role="search" className="cmp-search" data-reveal>
        {category && <input type="hidden" name="category" value={category} />}
        <label htmlFor="comparison-search" className="sr-only">Search comparisons</label>
        <input key={query || "all"} id="comparison-search" type="search" name="q" defaultValue={query} placeholder="Search providers, pricing or workflows" maxLength={120} />
        <button type="submit" className="wf-btn wf-btn-green">Search</button>
        {query && <Link href={category ? `/compare?category=${category}` : "/compare"}>Clear</Link>}
      </form>
      <p role="status" className="mt-6 mb-8 text-sm font-semibold text-[var(--text-muted)]">{data.totalDocs} {data.totalDocs === 1 ? "guide" : "guides"}{query && <> matching “{query}”</>}</p>
      <div className="wf-grid wf-grid-2">
        {data.docs.map((item, index) => <article key={item.id} className="wf-card cmp-card" data-hover data-reveal style={{ "--d": `${(index % 3) * 80}ms` } as CSSProperties}>
          {(item.imageUrl || item.coverImage?.url) && <Link href={`/compare/${item.slug}`} tabIndex={-1} aria-hidden="true" className="cmp-card-img">
            {/* Owned CMS cover, shared by the article and its social preview. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl || item.coverImage?.url} alt="" width={1200} height={630} loading="lazy" className="w-full h-auto aspect-[1200/630] object-cover" />
          </Link>}
          <div className="cmp-card-body">
            <h2><Link href={`/compare/${item.slug}`}>{item.title}</Link></h2>
            <p className="flex-1"><b className="wf-leadin">{COMPARISON_CATEGORIES[item.category]}.</b> {item.excerpt}</p>
            <p className="cmp-by">By {item.author}</p>
            <Link href={`/compare/${item.slug}`} className="wf-btn wf-btn-green wf-btn-sm">Read the comparison</Link>
          </div>
        </article>)}
      </div>
      {!data.docs.length && <div className="wf-card mx-auto max-w-xl items-center py-12 text-center" data-reveal><p className="cmp-empty">{query ? "No matching comparisons. Try fewer words or another category." : "No published comparisons in this category yet."}</p></div>}
      {data.totalPages > 1 && <nav aria-label="Comparison pages" className="cmp-pages">
        {data.page > 1 && <Link href={pageUrl(data.page - 1)} className="wf-btn wf-btn-ghost wf-btn-sm">Previous</Link>}
        <span>Page {data.page} of {data.totalPages}</span>
        {data.hasNextPage && <Link href={pageUrl(data.page + 1)} className="wf-btn wf-btn-ghost wf-btn-sm">Next</Link>}
      </nav>}
        </section>
      </div>
    </div>
  </div>;
}
