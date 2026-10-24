/** Search the published CMS documents, including words split across their fields. */
type SearchDocument = {
  title: string; slug: string; excerpt?: string; content?: unknown;
  author?: string; competitor?: string; verdict?: string;
  tags?: unknown; faqs?: unknown; featureTable?: unknown;
};

export function normalizeSearch(value: string): string {
  return value.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");
}

function contentText(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  if (Array.isArray(value)) return value.map(contentText).join(" ");
  const node = value as Record<string, unknown>;
  return Object.entries(node).map(([key, v]) => {
    if (["text", "tag", "question", "answer", "feature", "whatflow", "competitor", "heading", "title", "message", "caption", "alt", "description"].includes(key) && typeof v === "string") return v;
    return v && typeof v === "object" ? contentText(v) : "";
  }).join(" ");
}

export function rankContent<T extends SearchDocument>(documents: T[], query: string): T[] {
  const normalized = normalizeSearch(query.trim().slice(0, 120));
  const terms = [...new Set(normalized.split(" ").filter(Boolean))];
  if (!terms.length) return documents;
  return documents.map((doc, index) => {
    const title = normalizeSearch(doc.title);
    const summary = normalizeSearch([doc.excerpt, doc.competitor, doc.slug, doc.verdict, doc.author].filter(Boolean).join(" "));
    const body = normalizeSearch(contentText([doc.content, doc.tags, doc.faqs, doc.featureTable]));
    const haystack = `${title} ${summary} ${body}`;
    if (!terms.every(term => haystack.includes(term))) return null;
    const score = (title === normalized ? 100 : title.includes(normalized) ? 40 : 0)
      + terms.reduce((n, term) => n + (title.includes(term) ? 10 : summary.includes(term) ? 4 : 1), 0);
    return { doc, index, score };
  }).filter((entry): entry is { doc: T; index: number; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index).map(entry => entry.doc);
}

export async function searchPublishedContent<T extends SearchDocument>(options: {
  query: string; page: number; limit: number;
  fetchPage: (page: number, limit: number) => Promise<{ docs: T[]; hasNextPage: boolean }>;
}) {
  const documents: T[] = [];
  // Share cached, bounded-size CMS pages between search terms. Never search drafts.
  for (let page = 1; ; page++) {
    const data = await options.fetchPage(page, 50);
    documents.push(...data.docs);
    if (!data.hasNextPage) break;
    if (!data.docs.length) throw new Error("CMS search pagination did not advance");
  }
  const matches = rankContent(documents, options.query);
  const limit = Math.max(1, Math.floor(options.limit) || 12);
  const totalPages = Math.max(1, Math.ceil(matches.length / limit));
  const page = Math.min(totalPages, Math.max(1, Math.floor(options.page) || 1));
  return {
    docs: matches.slice((page - 1) * limit, page * limit), totalDocs: matches.length,
    totalPages, page, limit, hasNextPage: page < totalPages, hasPrevPage: page > 1,
  };
}
