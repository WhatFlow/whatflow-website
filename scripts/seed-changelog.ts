/**
 * Seed the Payload `changelog` collection from the curated history in
 * src/lib/changelog-data.ts.
 *
 *   npx tsx scripts/seed-changelog.ts --local|--remote [--check] [--update]
 *
 * --check   print what would change and write nothing
 * --update  overwrite entries that already exist (default: insert missing slugs only,
 *           so edits made in the CMS admin are never clobbered)
 * --only=a,b  limit inserts/updates to these slugs
 * --remove=a,b  delete these slugs from the CMS (must not be in the curated list)
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { CHANGELOG_SEED, releaseDateToISO } from "../src/lib/changelog-data";
import { changelogSeedToLexical } from "../src/lib/changelog";

const remote = process.argv.includes("--remote");
const local = process.argv.includes("--local");
if (remote === local) throw new Error("Choose exactly one D1 target: --local or --remote");
const check = process.argv.includes("--check");
const update = process.argv.includes("--update");
const listArg = (name: string) =>
  (process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? "").split(",").filter(Boolean);
const only = new Set(listArg("only"));
const remove = listArg("remove");
const database = "whatflow-payload-cms";
const wrangler = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));

function d1(args: string[]) {
  const result = spawnSync(process.execPath, [wrangler, "d1", "execute", database, remote ? "--remote" : "--local", ...args, "--json"], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.status !== 0) throw new Error(`D1 command failed (exit ${result.status})`);
  const start = result.stdout.indexOf("[");
  const parsed = JSON.parse(result.stdout.slice(start)) as { success: boolean; results: Record<string, unknown>[] }[];
  if (!parsed.every((r) => r.success)) throw new Error("D1 returned an unsuccessful result");
  return parsed;
}

// Guard against accidental leaks: published copy must not look like code or internals.
const FORBIDDEN = [/`/, /\b[0-9a-f]{7,40}\b/, /\b(D1|Hyperdrive|Postgres|Durable Object|wrangler|WAHA|Gadget|Ranksy|Kwikflow)\b/i, /=>|\(\)|\{\s*\}|<\/?[a-z]+>/];
for (const entry of CHANGELOG_SEED) {
  const text = [entry.title, entry.summary, ...entry.highlights, entry.whyItMatters ?? ""].join(" ");
  const hit = FORBIDDEN.find((re) => re.test(text));
  if (hit) throw new Error(`Entry "${entry.slug}" matches forbidden pattern ${hit}`);
  if (entry.summary.length > 200) throw new Error(`Entry "${entry.slug}" summary is ${entry.summary.length} chars`);
}
const slugs = new Set(CHANGELOG_SEED.map((e) => e.slug));
if (slugs.size !== CHANGELOG_SEED.length) throw new Error("Duplicate slugs in curated changelog");

const existing = new Set(
  (d1(["--command", "SELECT slug FROM changelog"])[0].results as { slug: string }[]).map((r) => r.slug),
);
const scoped = CHANGELOG_SEED.filter((e) => only.size === 0 || only.has(e.slug));
for (const slug of only) if (!slugs.has(slug)) throw new Error(`--only slug not in curated list: ${slug}`);
for (const slug of remove) if (slugs.has(slug)) throw new Error(`Refusing to remove a curated slug: ${slug}`);
const toInsert = scoped.filter((e) => !existing.has(e.slug));
const toUpdate = update ? scoped.filter((e) => existing.has(e.slug)) : [];
const toRemove = remove.filter((slug) => existing.has(slug));
console.log(`Target: ${remote ? "remote" : "local"} | existing ${existing.size} | insert ${toInsert.length} | update ${toUpdate.length} | remove ${toRemove.length}`);
if (check || toInsert.length + toUpdate.length + toRemove.length === 0) process.exit(0);

const q = (value: string) => `'${value.replaceAll("'", "''")}'`;
const now = new Date().toISOString();
const statements = [...toInsert, ...toUpdate].map((e) => {
  const cols = {
    version: e.version,
    title: e.title,
    slug: e.slug,
    release_date: releaseDateToISO(e.releaseDate),
    type: e.type,
    app: e.app,
    summary: e.summary,
    content: JSON.stringify(changelogSeedToLexical(e)),
    status: "published",
    updated_at: now,
    created_at: now,
  };
  const names = Object.keys(cols);
  const values = Object.values(cols).map(q);
  const set = names.filter((n) => n !== "slug" && n !== "created_at").map((n) => `${n}=excluded.${n}`).join(", ");
  return `INSERT INTO changelog (${names.join(", ")}) VALUES (${values.join(", ")}) ON CONFLICT(slug) DO UPDATE SET ${set};`;
});
for (const slug of toRemove) statements.push(`DELETE FROM changelog WHERE slug = ${q(slug)};`);

const dir = mkdtempSync(join(tmpdir(), "whatflow-changelog-"));
try {
  const file = join(dir, "seed.sql");
  writeFileSync(file, statements.join("\n"), { mode: 0o600 });
  d1(["--file", file, "--yes"]);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
const after = d1(["--command", "SELECT count(*) AS n FROM changelog WHERE status = 'published'"])[0].results[0];
console.log(`Done. Published changelog entries: ${(after as { n: number }).n}`);
