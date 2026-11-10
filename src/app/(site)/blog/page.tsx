import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES, getBlogCategory } from "@/lib/blog-taxonomy";
import { SITE_URL } from "@/lib/schema-org";
import { getPosts, type Post } from "@/lib/payload-api";
import { PostCard, FeaturedPostCard, EmptyCard, RssIcon, ICONS, categoryLabel } from "./blog-ui";
import "./content.css";

const blogMetadata: Metadata = {
  title: "Blog — WhatFlow",
  description:
    "Tips, guides, and updates on WhatsApp marketing for Shopify merchants. Learn how to automate your store with WhatFlow.",
  keywords: [
    "WhatsApp marketing Shopify",
    "Shopify WhatsApp tips",
    "abandoned cart recovery guide",
    "WhatFlow blog",
    "ecommerce automation tips",
  ],
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string; page?: string; q?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const query = new URLSearchParams();
  const category = getBlogCategory(params.category);
  if (category) query.set("category", category.value);
  const page = Number(params.page);
  if (Number.isInteger(page) && page > 1) query.set("page", String(page));
  return { ...blogMetadata, ...(category ? { title: `${category.label} — WhatFlow Blog`, description: category.description } : {}), ...(params.q?.trim() ? { robots: { index: false, follow: true } } : {}), alternates: { canonical: `${SITE_URL}/blog${query.size ? `?${query}` : ""}` } };
}

const CATEGORIES = [{ value: "all", label: "All posts" }, ...BLOG_CATEGORIES];

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedCategory = getBlogCategory(params.category)?.value ?? "all";
  const pageNumber = Number(params.page);
  const currentPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const search = params.q?.trim().slice(0, 120) || "";
  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    if (selectedCategory !== "all") query.set("category", selectedCategory);
    if (search) query.set("q", search);
    if (page > 1) query.set("page", String(page));
    return `/blog${query.size ? `?${query}` : ""}`;
  };

  let postsData;
  let loadFailed = false;
  try {
    postsData = await getPosts({
      category: selectedCategory !== "all" ? (selectedCategory as Post["category"]) : undefined,
      page: currentPage,
      limit: 12,
      q: search,
    });
  } catch {
    loadFailed = true;
    postsData = { docs: [], totalPages: 0, totalDocs: 0, page: 1, hasNextPage: false, hasPrevPage: false };
  }

  const posts = postsData.docs;

  // Page one of the unfiltered list leads with a large featured story.
  const showFeature = !loadFailed && currentPage === 1 && !search && posts.length > 0;
  const feature = showFeature ? posts.find((post) => post.featured) ?? posts[0] : undefined;
  const rest = feature ? posts.filter((post) => post.id !== feature.id) : posts;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="wf-shell wf-directory wfc-library">
        <header className="wf-directory-header wf-editorial-header">
          <div><h1>Tips, guides and updates.</h1><p>Practical guides to reviews, trust, retention, WhatsApp and growing your Shopify store.</p></div>
          <a href="/blog/rss.xml" target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-ghost wf-btn-sm" title="Subscribe to RSS Feed"><RssIcon /><span>RSS feed</span></a>
        </header>
        <div className="wf-directory-body">
          <aside className="wf-directory-rail" aria-label="Filter articles"><h2>Browse by topic</h2>
          <div className="wfc-toolbar" data-reveal>
            <nav aria-label="Blog categories" className="wfc-seg">
              {CATEGORIES.map((cat) => {
                const isActive = cat.value === selectedCategory;
                return (
                  <Link
                    key={cat.value}
                    href={`${cat.value === "all" ? "/blog" : `/blog?category=${cat.value}`}${search ? `${cat.value === "all" ? "?" : "&"}q=${encodeURIComponent(search)}` : ""}`}
                    id={`category-filter-${cat.value}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          </aside>
          <section className="wf-directory-results" aria-label="Articles">
          <div className="wfc-toolbar mt-4" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
            <form {...{ toolname: "search_whatflow_guides", tooldescription: "Search WhatFlow guides by keyword and category." }} action="/blog" method="get" role="search" className="wfc-search">
              {selectedCategory !== "all" && <input type="hidden" name="category" value={selectedCategory} />}
              <label htmlFor="blog-search" className="sr-only">Search the blog</label>
              <input key={search || "all"} id="blog-search" name="q" type="search" defaultValue={search} maxLength={120} placeholder="Search reviews, retention, WhatsApp…" />
              <button type="submit" className="wf-btn wf-btn-green wf-btn-sm">Search</button>
            </form>
            {search && <Link href={selectedCategory === "all" ? "/blog" : `/blog?category=${selectedCategory}`} className="text-sm font-bold underline underline-offset-4">Clear search</Link>}
          </div>

          <p role="status" className="wfc-count">
            {postsData.totalDocs} {postsData.totalDocs === 1 ? "post" : "posts"}
            {selectedCategory !== "all" && ` in ${categoryLabel(selectedCategory)}`}
            {search && ` matching “${search}”`}
          </p>

          {loadFailed ? (
            <div role="alert" className="wf-card wfc-empty">
              <div className="wfc-empty-icon">{ICONS.doc}</div>
              <h2>We couldn’t load the articles</h2>
              <p>Something went wrong on our side. <Link href={pageHref(currentPage)} className="font-bold underline underline-offset-4">Try again</Link></p>
            </div>
          ) : (
            <>
              {feature && <FeaturedPostCard post={feature} />}
              <div className={`wf-grid wf-grid-2 ${feature ? "mt-6" : ""}`}>
                {posts.length > 0 ? (
                  rest.map((post, index) => <PostCard key={post.id} post={post} index={index} />)
                ) : (
                  <EmptyCard icon={search ? ICONS.search : ICONS.doc} title={search ? "No matching articles" : "No posts yet"}>
                    {search ? "Try a shorter search or choose another topic." : "Check back soon, our first posts are on the way."}
                  </EmptyCard>
                )}
              </div>
            </>
          )}

          {/* ─── Pagination ─── */}
          {(postsData.hasPrevPage || postsData.hasNextPage) && (
            <nav aria-label="Pagination" className="wfc-pager">
              {postsData.hasPrevPage && (
                <Link href={pageHref(currentPage - 1)} className="wf-btn wf-btn-ghost wf-btn-sm">
                  Previous page
                </Link>
              )}
              <span>
                Page {postsData.page} of {postsData.totalPages}
              </span>
              {postsData.hasNextPage && (
                <Link href={pageHref(currentPage + 1)} className="wf-btn wf-btn-green wf-btn-sm">
                  Next page
                </Link>
              )}
            </nav>
          )}
          </section>
        </div>
      </div>
    </div>
  );
}
