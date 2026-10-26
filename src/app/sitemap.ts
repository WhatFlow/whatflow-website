import { getAllIndexableComparisons } from "@/lib/comparisons-api";
export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import {
  getAllPublishedPosts,
  getCaseStudies,
  getIntegrations,
  type Integration,
} from "@/lib/payload-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integrations`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/affiliate`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/abandoned-cart-recovery`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/cod-order-verification`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/order-tracking-notifications`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/whatsapp-reviews-ugc`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/chat-button`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/changelog`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/security`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Blog posts
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPublishedPosts();
    postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      ...(post.updatedAt || post.publishedAt ? { lastModified: new Date(post.updatedAt || post.publishedAt!) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    postRoutes = [];
  }

  // Case studies
  let studyRoutes: MetadataRoute.Sitemap = [];
  try {
    const studiesData = await getCaseStudies({ limit: 100 });
    studyRoutes = studiesData.docs.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      ...(study.publishedAt ? { lastModified: new Date(study.publishedAt) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    studyRoutes = [];
  }

  // Integrations
  let integrationRoutes: MetadataRoute.Sitemap = [];
  try {
    const integrationsData = await getIntegrations({ limit: 100 });
    integrationRoutes = integrationsData.docs.map((item: Integration) => ({
      url: `${baseUrl}/integrations/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    integrationRoutes = [];
  }

  const comparisons = await getAllIndexableComparisons();
  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map(item => ({
    url: `${baseUrl}/compare/${item.slug}`,
    lastModified: new Date(item.updatedAt || item.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...postRoutes, ...studyRoutes, ...integrationRoutes, ...comparisonRoutes];
}
