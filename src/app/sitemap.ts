import { getAllIndexableComparisons } from "@/lib/comparisons-api";
export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import {
  getAllPublishedPosts,
  getCaseStudies,
  getIntegrations,
  getChangelogEntries,
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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integrations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/affiliate`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/abandoned-cart-recovery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/cod-order-verification`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/order-tracking-notifications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/whatsapp-reviews-ugc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions/chat-button`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
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
      lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
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
      lastModified: study.publishedAt ? new Date(study.publishedAt) : new Date(),
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
      lastModified: new Date(),
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
