/**
 * Payload CMS REST API utilities.
 * These run on the server using the internal Next.js API routes served by Payload.
 * All fetches use the absolute URL resolved from environment or localhost in dev.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

type FetchOptions = {
  revalidate?: number;
};

async function payloadFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    next: { revalidate: options.revalidate ?? 60 },
  });
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}

// ─── Type Definitions ──────────────────────────────────────────────────────────

export type MediaDoc = {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: MediaDoc;
  category: "tips" | "guides" | "updates" | "whatsapp" | "shopify";
  tags?: { tag: string }[];
  author: string;
  authorRole?: string;
  publishedAt?: string;
  status: "draft" | "published";
  featured?: boolean;
  content: unknown; // Lexical JSON
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: MediaDoc;
  storeName: string;
  storeUrl?: string;
  storeLogo?: MediaDoc;
  industry: string;
  metrics?: {
    label: string;
    value: string;
    description?: string;
  }[];
  appsUsed?: string[];
  publishedAt?: string;
  status: "draft" | "published";
  featured?: boolean;
  content: unknown;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

type CollectionResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// ─── Posts API ──────────────────────────────────────────────────────────────

export type PostsFilter = {
  category?: Post["category"];
  limit?: number;
  page?: number;
  featured?: boolean;
};

export async function getPosts(filter: PostsFilter = {}): Promise<CollectionResponse<Post>> {
  const params = new URLSearchParams();
  params.set("where[status][equals]", "published");
  params.set("sort", "-publishedAt");
  params.set("depth", "1");

  if (filter.category) {
    params.set("where[category][equals]", filter.category);
  }
  if (filter.featured !== undefined) {
    params.set("where[featured][equals]", String(filter.featured));
  }
  if (filter.limit) {
    params.set("limit", String(filter.limit));
  }
  if (filter.page) {
    params.set("page", String(filter.page));
  }

  return payloadFetch<CollectionResponse<Post>>(`/api/posts?${params.toString()}`);
}

export async function getPost(slug: string): Promise<Post | null> {
  const params = new URLSearchParams();
  params.set("where[slug][equals]", slug);
  params.set("where[status][equals]", "published");
  params.set("depth", "1");
  params.set("limit", "1");

  const res = await payloadFetch<CollectionResponse<Post>>(`/api/posts?${params.toString()}`);
  return res.docs[0] ?? null;
}

export async function getRelatedPosts(
  category: Post["category"],
  excludeSlug: string,
  limit = 3
): Promise<Post[]> {
  const params = new URLSearchParams();
  params.set("where[status][equals]", "published");
  params.set("where[category][equals]", category);
  params.set("where[slug][not_equals]", excludeSlug);
  params.set("sort", "-publishedAt");
  params.set("depth", "1");
  params.set("limit", String(limit));

  const res = await payloadFetch<CollectionResponse<Post>>(`/api/posts?${params.toString()}`);
  return res.docs;
}

// ─── Case Studies API ────────────────────────────────────────────────────────

export type CaseStudiesFilter = {
  industry?: string;
  limit?: number;
  page?: number;
  featured?: boolean;
};

export async function getCaseStudies(
  filter: CaseStudiesFilter = {}
): Promise<CollectionResponse<CaseStudy>> {
  const params = new URLSearchParams();
  params.set("where[status][equals]", "published");
  params.set("sort", "-publishedAt");
  params.set("depth", "1");

  if (filter.industry) {
    params.set("where[industry][equals]", filter.industry);
  }
  if (filter.featured !== undefined) {
    params.set("where[featured][equals]", String(filter.featured));
  }
  if (filter.limit) {
    params.set("limit", String(filter.limit));
  }
  if (filter.page) {
    params.set("page", String(filter.page));
  }

  return payloadFetch<CollectionResponse<CaseStudy>>(`/api/case-studies?${params.toString()}`);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const params = new URLSearchParams();
  params.set("where[slug][equals]", slug);
  params.set("where[status][equals]", "published");
  params.set("depth", "1");
  params.set("limit", "1");

  const res = await payloadFetch<CollectionResponse<CaseStudy>>(
    `/api/case-studies?${params.toString()}`
  );
  return res.docs[0] ?? null;
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const CATEGORY_LABELS: Record<string, string> = {
  tips: "Tips & Tricks",
  guides: "Guides",
  updates: "Product Updates",
  whatsapp: "WhatsApp Marketing",
  shopify: "Shopify",
};

export const INDUSTRY_LABELS: Record<string, string> = {
  fashion: "Fashion & Apparel",
  beauty: "Beauty & Cosmetics",
  food: "Food & Beverage",
  electronics: "Electronics",
  home: "Home & Living",
  sports: "Sports & Fitness",
  pets: "Pets",
  other: "Other",
};

export const APP_LABELS: Record<string, string> = {
  chat: "WhatFlow Chat",
  business: "WhatFlow Business",
  ai: "WhatFlow AI",
};

export const CATEGORY_COLORS: Record<string, string> = {
  tips: "bg-[#FFF3CD] text-[#856404]",
  guides: "bg-[#D4EDDA] text-[#155724]",
  updates: "bg-[#D1ECF1] text-[#0C5460]",
  whatsapp: "bg-[#E8F8F0] text-[#0A6B56]",
  shopify: "bg-[#E8F0FF] text-[#2563EB]",
};

// ─── Reading Time & Text Extraction ──────────────────────────────────────────

export function extractTextFromLexical(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "object") {
    if ("text" in node && typeof node.text === "string") return node.text;
    if ("root" in node) return extractTextFromLexical(node.root);
    if (Array.isArray(node.children)) {
      return node.children.map(extractTextFromLexical).join(" ");
    }
  }
  return "";
}

export function calculateReadingTime(content: unknown, excerpt?: string): number {
  const text = (extractTextFromLexical(content) + " " + (excerpt || "")).trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// ─── Reviews API ────────────────────────────────────────────────────────────

export type Review = {
  id: string;
  storeName: string;
  merchantName?: string;
  quote: string;
  rating: number;
  highlight?: string;
  app?: "chat" | "business-api" | "ai" | "general";
  featured?: boolean;
};

export async function getReviews(
  options: { limit?: number; page?: number } = {}
): Promise<CollectionResponse<Review>> {
  const params = new URLSearchParams();
  params.set("depth", "1");
  if (options.limit) params.set("limit", String(options.limit));
  if (options.page) params.set("page", String(options.page));

  return payloadFetch<CollectionResponse<Review>>(`/api/reviews?${params.toString()}`);
}

// ─── Integrations API ─────────────────────────────────────────────────────────

export type Integration = {
  id: string;
  name: string;
  slug: string;
  category: "automation" | "reviews" | "marketing" | "support" | "subscriptions" | "shipping";
  tagline: string;
  description: string;
  logo?: MediaDoc;
  featured?: boolean;
  keyFeatures?: { feature: string }[];
  guideUrl?: string;
  docsContent?: unknown;
  status: "draft" | "published" | "coming-soon";
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export const INTEGRATION_CATEGORY_LABELS: Record<string, string> = {
  automation: "Automation & Workflows",
  reviews: "Reviews & UGC",
  marketing: "Marketing & CRM",
  support: "Helpdesk & Support",
  subscriptions: "Subscriptions",
  shipping: "Shipping & Tracking",
};

export async function getIntegrations(
  options: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  } = {}
): Promise<CollectionResponse<Integration>> {
  const params = new URLSearchParams();
  params.set("where[status][not_equals]", "draft");
  params.set("sort", "name");
  params.set("depth", "1");
  if (options.limit) params.set("limit", String(options.limit));
  if (options.page) params.set("page", String(options.page));
  if (options.category && options.category !== "all") {
    params.set("where[category][equals]", options.category);
  }
  if (options.featured !== undefined) {
    params.set("where[featured][equals]", String(options.featured));
  }

  return payloadFetch<CollectionResponse<Integration>>(`/api/integrations?${params.toString()}`);
}

export async function getIntegration(slug: string): Promise<Integration | null> {
  const params = new URLSearchParams();
  params.set("where[slug][equals]", slug);
  params.set("where[status][not_equals]", "draft");
  params.set("depth", "1");
  params.set("limit", "1");

  const res = await payloadFetch<CollectionResponse<Integration>>(`/api/integrations?${params.toString()}`);
  return res.docs[0] ?? null;
}

// ─── Changelog API ───────────────────────────────────────────────────────────

export type ChangelogEntry = {
  id: string;
  version: string;
  title: string;
  slug: string;
  releaseDate: string;
  type: "feature" | "improvement" | "fix" | "security";
  app: "all" | "business-api" | "chat" | "ai";
  summary: string;
  content?: unknown;
  gitCommitHash?: string;
  gitCommitMessage?: string;
  status: "draft" | "published";
};

export const CHANGELOG_TYPE_LABELS: Record<string, string> = {
  feature: "New Feature",
  improvement: "Improvement",
  fix: "Bug Fix",
  security: "Security",
};

export const CHANGELOG_TYPE_COLORS: Record<string, string> = {
  feature: "bg-[#00D261] text-black",
  improvement: "bg-[#2563EB] text-white",
  fix: "bg-[#FFC107] text-black",
  security: "bg-[#FF4B4B] text-white",
};

export async function getChangelogEntries(
  options: {
    app?: string;
    type?: string;
    limit?: number;
    page?: number;
  } = {}
): Promise<CollectionResponse<ChangelogEntry>> {
  const params = new URLSearchParams();
  params.set("where[status][equals]", "published");
  params.set("sort", "-releaseDate");
  params.set("depth", "1");
  if (options.limit) params.set("limit", String(options.limit));
  if (options.page) params.set("page", String(options.page));
  if (options.app && options.app !== "all") {
    params.set("where[app][equals]", options.app);
  }
  if (options.type && options.type !== "all") {
    params.set("where[type][equals]", options.type);
  }

  return payloadFetch<CollectionResponse<ChangelogEntry>>(`/api/changelog?${params.toString()}`);
}



