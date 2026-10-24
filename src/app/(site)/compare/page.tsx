import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISON_CATEGORIES, getComparisons } from "@/lib/comparisons-api";
import { SITE_URL } from "@/lib/schema-org";

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

  return <main className="bg-[#FAF7F0] text-black min-h-screen">
    <header className="border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto space-y-6">
        <span className="neo-pill bg-[#00D261] px-3 py-1 text-xs font-black uppercase">The comparison library</span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl">Find the right WhatsApp tool for your store.</h1>
        <p className="text-lg text-gray-700 max-w-3xl">Compare provider pricing, inbox costs, Shopify integration and customer workflows. Explore WhatsApp alongside email, SMS, push and social channels, with practical cost examples.</p>
        <p className="text-sm text-gray-600 max-w-3xl">These guides are published by WhatFlow. Each article names its author, links to primary sources and explains when the other product may be a better fit.</p>
      </div>
    </header>
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <nav aria-label="Comparison categories" className="flex flex-wrap gap-3 mb-8">
        <Link href={categoryUrl()} aria-current={!category ? "page" : undefined} className={`neo-pill px-4 py-2 text-sm font-bold ${!category ? "bg-[#00D261]" : "bg-white"}`}>All comparisons</Link>
        {Object.entries(COMPARISON_CATEGORIES).map(([key, label]) => <Link key={key} href={categoryUrl(key)} aria-current={category === key ? "page" : undefined} className={`neo-pill px-4 py-2 text-sm font-bold ${category === key ? "bg-[#00D261]" : "bg-white"}`}>{label}</Link>)}
      </nav>
      <form action="/compare" method="get" role="search" className="flex flex-wrap gap-3 mb-6">
        {category && <input type="hidden" name="category" value={category} />}
        <label htmlFor="comparison-search" className="sr-only">Search comparisons</label>
        <input key={query || "all"} id="comparison-search" type="search" name="q" defaultValue={query} placeholder="Search providers, pricing or workflows" maxLength={120} className="bg-white border-2 border-black rounded-lg px-4 py-3 flex-1 min-w-0" />
        <button type="submit" className="neo-btn bg-[#00D261] px-5 py-3 rounded-lg font-bold">Search</button>
        {query && <Link href={category ? `/compare?category=${category}` : "/compare"} className="self-center underline">Clear</Link>}
      </form>
      <p role="status" className="text-sm text-gray-600 mb-6">{data.totalDocs} {data.totalDocs === 1 ? "guide" : "guides"}{query && <> matching “{query}”</>}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.docs.map(item => <article key={item.id} className="neo-box bg-white rounded-2xl p-6 flex flex-col gap-4">
          {(item.imageUrl || item.coverImage?.url) && <Link href={`/compare/${item.slug}`} tabIndex={-1} aria-hidden="true" className="-mx-6 -mt-6 mb-2 block overflow-hidden rounded-t-2xl border-b-2 border-black">
            {/* Owned CMS cover, shared by the article and its social preview. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl || item.coverImage?.url} alt="" width={1200} height={630} loading="lazy" className="w-full h-auto aspect-[1200/630] object-cover" />
          </Link>}
          <span className="text-xs font-bold uppercase text-[#0A6B56]">{COMPARISON_CATEGORIES[item.category]}</span>
          <h2 className="font-display font-black text-xl leading-snug"><Link href={`/compare/${item.slug}`} className="hover:underline">{item.title}</Link></h2>
          <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.excerpt}</p>
          <p className="text-xs text-gray-500">By {item.author}</p>
          <Link href={`/compare/${item.slug}`} className="neo-btn bg-[#00D261] text-sm font-extrabold p-3 rounded-lg text-center">Read the comparison →</Link>
        </article>)}
      </div>
      {!data.docs.length && <p className="py-12">{query ? "No matching comparisons. Try fewer words or another category." : "No published comparisons in this category yet."}</p>}
      {data.totalPages > 1 && <nav aria-label="Comparison pages" className="flex gap-6 justify-center mt-12">
        {data.page > 1 && <Link href={pageUrl(data.page - 1)} className="underline">Previous</Link>}
        <span>Page {data.page} of {data.totalPages}</span>
        {data.hasNextPage && <Link href={pageUrl(data.page + 1)} className="underline">Next</Link>}
      </nav>}
    </section>
  </main>;
}
