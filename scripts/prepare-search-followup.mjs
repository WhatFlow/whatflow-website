import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { markdownToLexical } from "./build-quality-content.mjs";
import { refreshes } from "../content/blog/search-followup-2026-11-08/refresh.mjs";

const root = process.argv[2];
assert(root, "Pass the directory with the live Payload snapshots");
const now = new Date().toISOString();
const quote = value => "'" + value.replaceAll("'", "''") + "'";
const plain = node => node.text ?? (node.children ?? []).map(plain).join("");
const statements = [];
const comparisonBefore = [];
const comparisonAfter = [];

for (const [slug, change] of Object.entries(refreshes)) {
  const { docs } = JSON.parse(await readFile(`${root}/${slug}.json`, "utf8"));
  assert.equal(docs.length, 1);
  const old = docs[0];
  assert.equal(old.slug, slug);
  const next = structuredClone(old);
  const nodes = next.content.root.children;
  const anchor = nodes.findIndex(node => node.type === "heading" && plain(node).trim() === change.anchor);
  assert(anchor >= 0, slug);
  const isComparison = old._status === "published";
  const start = isComparison ? 0 : anchor;
  if (isComparison) assert(nodes.slice(0, anchor).every(node => node.type === "paragraph"), slug);
  nodes.splice(start, anchor - start, ...markdownToLexical(change.copy).root.children);
  next.seo.metaTitle = change.title;
  next.seo.metaDescription = change.description;
  next.updatedAt = now;
  if (isComparison) {
    next.reviewedAt = now;
    comparisonBefore.push(old);
    comparisonAfter.push(next);
  } else {
    assert.equal(old.status, "published");
    assert(Number.isInteger(old.id));
    statements.push(`UPDATE posts SET content=${quote(JSON.stringify(next.content))}, seo_meta_title=${quote(change.title)}, seo_meta_description=${quote(change.description)}, updated_at=${quote(now)}, reviewed_at=${quote(now)} WHERE id=${old.id} AND slug=${quote(slug)} AND status='published' AND updated_at=${quote(old.updatedAt)};`);
  }
}

await Promise.all([
  writeFile(`${root}/update-posts.sql`, statements.join("\n") + "\n"),
  writeFile(`${root}/source-documents.json`, JSON.stringify(comparisonBefore)),
  writeFile(`${root}/candidate-documents.json`, JSON.stringify(comparisonAfter)),
]);
