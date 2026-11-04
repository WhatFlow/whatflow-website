import {
  CHANGELOG_SEED,
  CHANGELOG_APP_LABELS,
  releaseDateToISO,
  type ChangelogApp,
  type ChangelogSeedEntry,
  type ChangelogType,
} from "./changelog-data";
import { payloadFetch, type CollectionResponse } from "./payload-api";

export { CHANGELOG_APP_LABELS };
export type { ChangelogApp, ChangelogType };

/** Public shape for rendering. Never includes commit identifiers or raw commit messages. */
export type ChangelogItem = {
  slug: string;
  version: string;
  title: string;
  releaseDate: string; // ISO
  type: ChangelogType;
  app: ChangelogApp;
  summary: string;
  content: unknown; // Lexical JSON
  updatedAt?: string;
};

type CMSChangelogDoc = {
  slug: string;
  version: string;
  title: string;
  releaseDate: string;
  type: ChangelogType;
  app: ChangelogApp;
  summary: string;
  content?: unknown;
  updatedAt?: string;
};

export const CHANGELOG_TYPES: { key: ChangelogType; label: string }[] = [
  { key: "feature", label: "New features" },
  { key: "improvement", label: "Improvements" },
  { key: "fix", label: "Bug fixes" },
  { key: "security", label: "Security" },
];

export const CHANGELOG_TYPE_BADGE: Record<ChangelogType, { label: string; className: string }> = {
  feature: { label: "New Feature", className: "bg-[#00D261] text-black" },
  improvement: { label: "Improvement", className: "bg-[#2563EB] text-white" },
  fix: { label: "Bug Fix", className: "bg-[#FFC107] text-black" },
  security: { label: "Security", className: "bg-[#FF4B4B] text-white" },
};

export const SHOPIFY_APP_URLS: Record<"business-api" | "chat", string> = {
  "business-api": "https://apps.shopify.com/whatflow-official-api",
  chat: "https://apps.shopify.com/whatflow",
};

// ─── Lexical helpers ─────────────────────────────────────────────────────────

const textNode = (text: string, format = 0) => ({
  type: "text",
  text,
  format,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const block = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  children,
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1,
  ...extra,
});

/** Builds the CMS rich-text body for a curated entry: highlights list + why it matters. */
export function changelogSeedToLexical(entry: ChangelogSeedEntry) {
  const children: unknown[] = [
    block("heading", [textNode("What's new")], { tag: "h2" }),
    block(
      "list",
      entry.highlights.map((item, index) => block("listitem", [textNode(item)], { value: index + 1 })),
      { listType: "bullet", start: 1, tag: "ul" },
    ),
  ];
  if (entry.whyItMatters) {
    children.push(block("heading", [textNode("Why it matters")], { tag: "h2" }));
    children.push(block("paragraph", [textNode(entry.whyItMatters)], { textFormat: 0, textStyle: "" }));
  }
  return { root: block("root", children) };
}

function fromSeed(entry: ChangelogSeedEntry): ChangelogItem {
  return {
    slug: entry.slug,
    version: entry.version,
    title: entry.title,
    releaseDate: releaseDateToISO(entry.releaseDate),
    type: entry.type,
    app: entry.app,
    summary: entry.summary,
    content: changelogSeedToLexical(entry),
  };
}

function fromCMS(doc: CMSChangelogDoc): ChangelogItem {
  return {
    slug: doc.slug,
    version: doc.version,
    title: doc.title,
    releaseDate: doc.releaseDate,
    type: doc.type,
    app: doc.app,
    summary: doc.summary,
    content: doc.content ?? null,
    updatedAt: doc.updatedAt,
  };
}

// ─── Data access ─────────────────────────────────────────────────────────────

/**
 * All published entries, newest first. Reads the CMS; falls back to the curated
 * history only when the CMS is unreachable or has no published entries.
 */
export async function getAllChangelog(): Promise<ChangelogItem[]> {
  try {
    const params = new URLSearchParams({
      "where[status][equals]": "published",
      sort: "-releaseDate",
      limit: "500",
      depth: "0",
    });
    const res = await payloadFetch<CollectionResponse<CMSChangelogDoc>>(`/api/changelog?${params}`);
    if (res.docs.length > 0) return res.docs.map(fromCMS);
  } catch {
    // fall through to curated history
  }
  return CHANGELOG_SEED.map(fromSeed);
}

export async function getChangelogBySlug(slug: string) {
  const all = await getAllChangelog();
  const index = all.findIndex((item) => item.slug === slug);
  if (index === -1) return null;
  return {
    entry: all[index],
    newer: index > 0 ? all[index - 1] : null,
    older: index < all.length - 1 ? all[index + 1] : null,
    related: all
      .filter((item, i) => i !== index && (item.app === all[index].app || item.app === "all"))
      .slice(0, 3),
  };
}

// ─── Formatting ──────────────────────────────────────────────────────────────

export function formatReleaseDate(iso: string, month: "short" | "long" = "long") {
  return new Date(iso).toLocaleDateString("en-US", {
    month,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function monthKey(iso: string) {
  return iso.slice(0, 7);
}

export function monthLabel(key: string) {
  return new Date(`${key}-15T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function groupByMonth(items: ChangelogItem[]) {
  const groups = new Map<string, ChangelogItem[]>();
  for (const item of items) {
    const key = monthKey(item.releaseDate);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()].map(([key, entries]) => ({ key, label: monthLabel(key), entries }));
}

export function isChangelogApp(value: string | undefined): value is ChangelogApp {
  return value === "business-api" || value === "chat" || value === "ai" || value === "all";
}

export function isChangelogType(value: string | undefined): value is ChangelogType {
  return CHANGELOG_TYPES.some((t) => t.key === value);
}

/** Plain-text bullet points from an entry body, for feeds and machine-readable output. */
export function changelogHighlights(content: unknown): string[] {
  const out: string[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as { type?: string; children?: unknown[] };
    if (n.type === "listitem") {
      const text = collectText(n).trim();
      if (text) out.push(text);
      return;
    }
    n.children?.forEach(walk);
    if ("root" in (node as object)) walk((node as { root: unknown }).root);
  };
  walk(content);
  return out;
}

function collectText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[] };
  if (typeof n.text === "string") return n.text;
  return (n.children ?? []).map(collectText).join("");
}
