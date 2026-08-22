import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

  const citationAndAiBots = [
    "*",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Googlebot",
    "Google-Extended",
    "Google-CloudVertexBot",
    "Bingbot",
    "Applebot",
    "Applebot-Extended",
    "facebookexternalhit",
    "meta-externalagent",
    "Meta-ExternalFetcher",
    "Amazonbot",
    "AI2Bot",
    "AI2Bot-Dolma",
    "xAI-Bot",
    "cohere-ai",
    "DuckAssistBot",
    "Bytespider",
    "YouBot",
    "CCBot",
    "PetalBot",
  ];

  return {
    rules: citationAndAiBots.map((bot) => ({
      userAgent: bot,
      allow: "/",
      disallow: ["/admin", "/api/payload/*", "/(payload)/*"],
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
