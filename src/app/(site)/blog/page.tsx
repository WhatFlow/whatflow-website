import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getPosts,
  formatDate,
  calculateReadingTime,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type Post,
} from "@/lib/payload-api";

export const metadata: Metadata = {
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

const CATEGORIES = [
  { value: "all", label: "All Posts" },
  { value: "guides", label: "Guides" },
  { value: "tips", label: "Tips & Tricks" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "updates", label: "Updates" },
  { value: "shopify", label: "Shopify" },
] as const;

function PostCard({ post }: { post: Post }) {
  const colorClass = CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;
  const readingTime = calculateReadingTime(post.content, post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="neo-box bg-white flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Cover Image */}
      <div className="relative w-full h-52 bg-[#D5F5E3] border-b-[2.5px] border-black overflow-hidden">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00D261]/20 to-[#0A6B56]/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-black/40 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        )}
        {post.featured && (
          <div className="absolute top-3 left-3 neo-pill bg-[#FFC107] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 right-3 neo-pill bg-white text-black text-[9px] font-extrabold uppercase px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{readingTime} MIN READ</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Category + Date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${colorClass}`}>
            {categoryLabel}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display font-black text-black text-xl leading-tight uppercase tracking-tight group-hover:text-[#0A6B56] transition-colors">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs text-gray-600 font-medium leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#00D261] border border-black flex items-center justify-center font-extrabold text-[10px] text-black">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-black">{post.author}</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] group-hover:text-[#00D261] transition-colors">
            READ MORE →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="neo-box bg-white text-center py-20 px-6 col-span-full space-y-3">
      <div className="w-12 h-12 mx-auto bg-[#FAF7F0] border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#000]">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h3 className="font-display font-black text-2xl text-black uppercase">
        No posts yet
      </h3>
      <p className="text-gray-500 font-medium text-sm">
        Check back soon — our first posts are on the way.
      </p>
    </div>
  );
}

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category ?? "all";
  const currentPage = parseInt(params.page ?? "1", 10);

  let postsData;
  try {
    postsData = await getPosts({
      category: selectedCategory !== "all" ? (selectedCategory as Post["category"]) : undefined,
      page: currentPage,
      limit: 9,
    });
  } catch {
    postsData = { docs: [], totalPages: 0, totalDocs: 0, page: 1, hasNextPage: false, hasPrevPage: false };
  }

  const posts = postsData.docs;

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
              WHATFLOW BLOG
            </div>
            <h1 className="text-[48px] sm:text-[64px] lg:text-[80px] font-display font-black uppercase text-black tracking-tight leading-none mb-4">
              TIPS, GUIDES &amp;{" "}
              <span className="text-stroke-green">UPDATES.</span>
            </h1>
            <p className="text-[17px] text-[#222] font-medium max-w-xl">
              Everything you need to know about WhatsApp marketing for your Shopify store.
            </p>
          </div>

          <a
            href="/blog/rss.xml"
            target="_blank"
            className="neo-btn bg-[#FFF3CD] text-[#856404] px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 self-start md:self-auto hover:bg-[#FFE8A1]"
            title="Subscribe to RSS Feed"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" fill="currentColor" />
            </svg>
            <span>RSS FEED</span>
          </a>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="bg-white border-b-[2.5px] border-black sticky top-[72px] z-40 px-4 sm:px-6 py-4 overflow-x-auto">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = cat.value === selectedCategory;
            return (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/blog" : `/blog?category=${cat.value}`}
                id={`category-filter-${cat.value}`}
                className={`neo-btn px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#00D261] text-black shadow-[3px_3px_0px_#000]"
                    : "bg-white text-black hover:bg-[#F0FFF6]"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Posts Grid ─── */}
      <section className="px-4 sm:px-6 py-14">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {postsData.totalDocs} {postsData.totalDocs === 1 ? "Post" : "Posts"}
              {selectedCategory !== "all" && ` in ${CATEGORY_LABELS[selectedCategory] ?? selectedCategory}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <EmptyState />
            )}
          </div>

          {/* ─── Pagination ─── */}
          {(postsData.hasPrevPage || postsData.hasNextPage) && (
            <div className="flex items-center justify-center gap-4 mt-14">
              {postsData.hasPrevPage && (
                <Link
                  href={`/blog?${selectedCategory !== "all" ? `category=${selectedCategory}&` : ""}page=${currentPage - 1}`}
                  className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
                >
                  ← PREV PAGE
                </Link>
              )}
              <span className="text-xs font-bold text-gray-500">
                Page {postsData.page} of {postsData.totalPages}
              </span>
              {postsData.hasNextPage && (
                <Link
                  href={`/blog?${selectedCategory !== "all" ? `category=${selectedCategory}&` : ""}page=${currentPage + 1}`}
                  className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
                >
                  NEXT PAGE →
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="bg-[#091E17] border-t-[2.5px] border-black py-12 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-[28px] sm:text-[36px] font-display font-black uppercase text-white tracking-tight">
            READY TO AUTOMATE YOUR STORE?
          </h2>
          <p className="text-gray-300 text-sm font-medium">
            14-day free trial. No credit card required.
          </p>
          <Link
            href="/#products"
            className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg inline-block"
          >
            INSTALL ON SHOPIFY →
          </Link>
        </div>
      </section>
    </div>
  );
}
