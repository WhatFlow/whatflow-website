import { SITE_URL } from "@/lib/schema-org";
import {
  CHANGELOG_APP_LABELS,
  CHANGELOG_TYPE_BADGE,
  changelogHighlights,
  getAllChangelog,
} from "@/lib/changelog";

export const dynamic = "force-dynamic";

const escapeCdata = (value: string) => value.replaceAll("]]>", "]]]]><![CDATA[>");
const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function GET() {
  const entries = (await getAllChangelog()).slice(0, 50);

  const items = entries
    .map((entry) => {
      const url = `${SITE_URL}/changelog/${entry.slug}`;
      const highlights = changelogHighlights(entry.content);
      const html = `<p>${escapeHtml(entry.summary)}</p>${
        highlights.length ? `<ul>${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>` : ""
      }`;
      return `
    <item>
      <title><![CDATA[${escapeCdata(entry.title)}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${escapeCdata(entry.summary)}]]></description>
      <content:encoded><![CDATA[${escapeCdata(html)}]]></content:encoded>
      <category><![CDATA[${CHANGELOG_TYPE_BADGE[entry.type].label}]]></category>
      <category><![CDATA[${CHANGELOG_APP_LABELS[entry.app]}]]></category>
      <pubDate>${new Date(entry.releaseDate).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const lastBuild = entries[0] ? new Date(entries[0].releaseDate).toUTCString() : new Date().toUTCString();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>WhatFlow Changelog: WhatsApp for Shopify Product Updates</title>
    <link>${SITE_URL}/changelog</link>
    <description>New features, improvements, bug fixes and security updates for WhatFlow Business API (official API app), Chat Automation (unofficial API app) and the WhatsApp Team Inbox.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/changelog/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
