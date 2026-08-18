import type { MetadataRoute } from "next";
import { getPosts, getCaseStudies } from "@/lib/payload-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.io" : "http://localhost:3000");

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
  ];

  // Blog posts
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsData = await getPosts({ limit: 100 });
    postRoutes = postsData.docs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
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

  return [...staticRoutes, ...postRoutes, ...studyRoutes];
}
