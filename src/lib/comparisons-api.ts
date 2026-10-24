import { payloadFetch, type MediaDoc } from "./payload-api";
import { searchPublishedContent } from "./content-search";

export const COMPARISON_CATEGORIES: Record<string, string> = {
  shopify: "Shopify & ecommerce",
  whatsapp: "WhatsApp platforms",
  api: "Messaging APIs",
  support: "Support & CRM",
  channels: "Channel comparisons",
  usecases: "Shopify workflows & costs",
};

export type Comparison = {
  id: string | number;
  title: string;
  slug: string;
  competitor: string;
  competitorUrl: string;
  category: string;
  excerpt: string;
  verdict: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  reviewedAt: string;
  updatedAt: string;
  featured?: boolean;
  coverImage?: MediaDoc;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageSourceUrl?: string;
  featureTable?: { feature: string; whatflow: string; competitor: string }[];
  content: unknown;
  faqs?: { question: string; answer: string }[];
  sources: { title: string; url: string; note?: string }[];
  relatedComparisons?: (Comparison | number | string)[];
  cta?: { heading?: string; description?: string; label?: string };
  seo?: { metaTitle?: string; metaDescription?: string; noindex?: boolean };
};

type ComparisonResponse = { docs: Comparison[]; totalDocs: number; totalPages: number; page: number; hasNextPage: boolean };

export async function getComparisons(options: { category?: string; query?: string; page?: number; limit?: number; excludeSlug?: string; indexableOnly?: boolean } = {}) {
  const params = new URLSearchParams({ "where[_status][equals]": "published", sort: "-featured,competitor", depth: "1", limit: String(options.limit ?? 24), page: String(options.page ?? 1) });
  if (options.category && COMPARISON_CATEGORIES[options.category]) params.set("where[category][equals]", options.category);
  if (options.excludeSlug) params.set("where[slug][not_equals]", options.excludeSlug);
  if (options.indexableOnly) params.set("where[seo.noindex][not_equals]", "true");
  if (options.query?.trim()) {
    return searchPublishedContent<Comparison>({ query: options.query, page: options.page ?? 1, limit: options.limit ?? 24,
      fetchPage: (page, limit) => {
        const searchParams = new URLSearchParams(params);
        searchParams.set("page", String(page)); searchParams.set("limit", String(limit));
        return payloadFetch<ComparisonResponse>(`/api/comparisons?${searchParams}`);
      },
    });
  }
  return payloadFetch<ComparisonResponse>(`/api/comparisons?${params}`);
}

export async function getComparison(slug: string): Promise<Comparison | null> {
  const params = new URLSearchParams({ "where[_status][equals]": "published", "where[slug][equals]": slug, limit: "1", depth: "1" });
  const data = await payloadFetch<ComparisonResponse>(`/api/comparisons?${params}`);
  return data.docs[0] ?? null;
}

export async function getAllIndexableComparisons() {
  const docs: Comparison[] = [];
  let page = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const data = await getComparisons({ limit: 100, page, indexableOnly: true });
    docs.push(...data.docs);
    hasNextPage = data.hasNextPage;
    page++;
  }
  return docs;
}

export function comparisonImage(item: Comparison) {
  return item.imageUrl || item.coverImage?.url;
}

export function safeJSON(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function formatComparisonDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Baku" });
}
