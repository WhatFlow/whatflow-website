/**
 * Publish a code-defined blog post to the Payload `posts` collection.
 *
 *   npx tsx scripts/publish-post.ts <module> --local|--remote [--check] [--update]
 *
 * <module> exports `post` (see content/engineering/gadget-to-cloudflare.ts).
 * Default inserts only when the slug is new; --update replaces an existing post's
 * fields and its tags, FAQs and sources.
 */
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { PostBlock } from "../content/engineering/gadget-to-cloudflare";

const args = process.argv.slice(2);
const modulePath = args.find((a) => !a.startsWith("--"));
if (!modulePath) throw new Error("Pass the post module path");
const remote = args.includes("--remote");
const local = args.includes("--local");
if (remote === local) throw new Error("Choose exactly one D1 target: --local or --remote");
const check = args.includes("--check");
const update = args.includes("--update");
const database = "whatflow-payload-cms";
const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));

function d1(cmd: string[]) {
  const r = spawnSync(process.execPath, [wrangler, "d1", "execute", database, remote ? "--remote" : "--local", ...cmd, "--json"], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`D1 command failed (exit ${r.status})`);
  const parsed = JSON.parse(r.stdout.slice(r.stdout.indexOf("["))) as { success: boolean; results: Record<string, unknown>[] }[];
  if (!parsed.every((x) => x.success)) throw new Error("D1 returned an unsuccessful result");
  return parsed;
}

// ─── Lexical ────────────────────────────────────────────────────────────────
const base = { direction: "ltr", format: "", indent: 0, version: 1 };
const text = (t: string, format = 0) => ({ type: "text", text: t, format, detail: 0, mode: "normal", style: "", version: 1 });

/** Parses **bold** and [label](https://url) into Lexical inline nodes. */
function inline(src: string): unknown[] {
  const out: unknown[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  for (const m of src.matchAll(re)) {
    if (m.index! > last) out.push(text(src.slice(last, m.index)));
    if (m[1] !== undefined) out.push(text(m[1], 1));
    else out.push({ ...base, type: "link", fields: { linkType: "custom", url: m[3], newTab: !m[3].startsWith("https://whatflow.tech") }, children: [text(m[2])] });
    last = m.index! + m[0].length;
  }
  if (last < src.length) out.push(text(src.slice(last)));
  return out;
}

function toLexical(blocks: PostBlock[]) {
  const children = blocks.map((b) => {
    if ("h2" in b) return { ...base, type: "heading", tag: "h2", children: inline(b.h2) };
    if ("h3" in b) return { ...base, type: "heading", tag: "h3", children: inline(b.h3) };
    if ("quote" in b) return { ...base, type: "quote", children: inline(b.quote) };
    if ("p" in b) return { ...base, type: "paragraph", textFormat: 0, textStyle: "", children: inline(b.p) };
    const ordered = "ol" in b;
    const items = ordered ? b.ol : b.ul;
    return {
      ...base,
      type: "list",
      listType: ordered ? "number" : "bullet",
      start: 1,
      tag: ordered ? "ol" : "ul",
      children: items.map((item, i) => ({ ...base, type: "listitem", value: i + 1, children: inline(item) })),
    };
  });
  return { root: { ...base, type: "root", children } };
}

// ─── Publish ────────────────────────────────────────────────────────────────
const { post } = await import(pathToFileURL(resolve(modulePath)).href);
const q = (v: string | null | undefined) => (v == null ? "NULL" : `'${String(v).replaceAll("'", "''")}'`);
const id = () => randomBytes(12).toString("hex");

const existing = d1(["--command", `SELECT id FROM posts WHERE slug = ${q(post.slug)}`])[0].results[0] as { id: number } | undefined;
console.log(`Target: ${remote ? "remote" : "local"} | slug ${post.slug} | ${existing ? `exists (id ${existing.id})` : "new"}`);
if (check || (existing && !update)) process.exit(0);

const now = new Date().toISOString();
const cols: Record<string, string> = {
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  cover_image_url: post.coverImageUrl,
  cover_image_alt: post.coverImageAlt,
  cover_image_caption: post.coverImageCaption,
  reviewed_at: post.publishedAt,
  category: post.category,
  published_at: post.publishedAt,
  status: "published",
  featured: "0",
  content: JSON.stringify(toLexical(post.blocks)),
  seo_meta_title: post.seoTitle,
  seo_meta_description: post.seoDescription,
  updated_at: now,
};
const parent = `(SELECT id FROM posts WHERE slug = ${q(post.slug)})`;
const sql: string[] = [];
if (existing) {
  sql.push(`UPDATE posts SET ${Object.entries(cols).map(([k, v]) => `${k} = ${k === "featured" ? v : q(v)}`).join(", ")} WHERE id = ${existing.id};`);
  for (const t of ["posts_tags", "posts_faqs", "posts_sources"]) sql.push(`DELETE FROM ${t} WHERE _parent_id = ${existing.id};`);
} else {
  const names = [...Object.keys(cols), "created_at"];
  const values = [...Object.entries(cols).map(([k, v]) => (k === "featured" ? v : q(v))), q(now)];
  sql.push(`INSERT INTO posts (${names.join(", ")}) VALUES (${values.join(", ")});`);
}
post.tags.forEach((tag: string, i: number) => sql.push(`INSERT INTO posts_tags (_order, _parent_id, id, tag) VALUES (${i + 1}, ${parent}, ${q(id())}, ${q(tag)});`));
post.faqs.forEach((f: { question: string; answer: string }, i: number) => sql.push(`INSERT INTO posts_faqs (_order, _parent_id, id, question, answer) VALUES (${i + 1}, ${parent}, ${q(id())}, ${q(f.question)}, ${q(f.answer)});`));
post.sources.forEach((s: { title: string; url: string; note?: string }, i: number) => sql.push(`INSERT INTO posts_sources (_order, _parent_id, id, title, url, note) VALUES (${i + 1}, ${parent}, ${q(id())}, ${q(s.title)}, ${q(s.url)}, ${q(s.note)});`));

const dir = mkdtempSync(join(tmpdir(), "whatflow-post-"));
try {
  const file = join(dir, "post.sql");
  writeFileSync(file, sql.join("\n"), { mode: 0o600 });
  d1(["--file", file, "--yes"]);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(`Published ${post.slug}`);
