import { getPosts, extractTextFromLexical, type Post } from "@/lib/payload-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

  let posts: Post[] = [];
  try {
    const data = await getPosts({ limit: 50 });
    posts = data.docs || [];
  } catch {
    posts = [];
  }

  const feedItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date().toUTCString();
      const content = extractTextFromLexical(post.content) || post.excerpt;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <dc:creator><![CDATA[${post.author || "WhatFlow Team"}]]></dc:creator>
      <category><![CDATA[${post.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>WhatFlow Blog — WhatsApp Marketing &amp; Automation for Shopify</title>
    <link>${siteUrl}/blog</link>
    <description>Tips, guides, and product updates on WhatsApp marketing for Shopify merchants.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
