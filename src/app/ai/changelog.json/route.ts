import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/schema-org";
import { CHANGELOG_APP_FULL_NAMES } from "@/lib/changelog-data";
import { CHANGELOG_TYPE_BADGE, changelogHighlights, getAllChangelog } from "@/lib/changelog";

export const dynamic = "force-dynamic";

/** Machine-readable WhatFlow release history for AI assistants and crawlers. */
export async function GET() {
  const entries = await getAllChangelog();
  const data = {
    name: "WhatFlow Changelog",
    description:
      "Merchant-facing release notes for WhatFlow's WhatsApp apps for Shopify. Plain-language summaries of features, improvements, fixes and security updates.",
    url: `${SITE_URL}/changelog`,
    feed: `${SITE_URL}/changelog/rss.xml`,
    last_updated: entries[0]?.releaseDate.slice(0, 10) ?? null,
    entry_count: entries.length,
    entries: entries.map((entry) => ({
      title: entry.title,
      date: entry.releaseDate.slice(0, 10),
      type: CHANGELOG_TYPE_BADGE[entry.type].label,
      applies_to: CHANGELOG_APP_FULL_NAMES[entry.app],
      summary: entry.summary,
      highlights: changelogHighlights(entry.content),
      url: `${SITE_URL}/changelog/${entry.slug}`,
    })),
  };

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
