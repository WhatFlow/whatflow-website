/**
 * Builds public/docs-search.json: one entry per page section (h2) of every
 * src/content/docs/*.mdx article, so the ⌘K search can match body text.
 * Run with `npm run docs:index` (also runs before `npm run build`).
 * Pass --check to fail when the committed index is out of date.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import GithubSlugger from "github-slugger";
import { DOCS_ARTICLES } from "../src/lib/docs/nav";

const root = join(import.meta.dirname, "..");
const out = join(root, "public", "docs-search.json");

type Entry = { url: string; title: string; group: string; section?: string; text: string };

/** Turns MDX into searchable plain text. */
export function plainText(mdx: string): string {
	return mdx
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/^import .*$/gm, "")
		.replace(/<[A-Z][^>]*?\/>/g, " ")
		.replace(/<\/?[A-Za-z][^>]*>/g, " ")
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/^\s*\|?\s*:?-{3,}.*$/gm, " ")
		.replace(/[*_`#>|]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

export function buildIndex(): Entry[] {
	const entries: Entry[] = [];
	for (const page of DOCS_ARTICLES) {
		const file = join(root, "src", "content", "docs", `${page.slug}.mdx`);
		if (!existsSync(file)) throw new Error(`Missing docs article: src/content/docs/${page.slug}.mdx`);
		const source = readFileSync(file, "utf8");
		const slugger = new GithubSlugger();
		const parts = source.split(/^## (.+)$/m);
		const intro = plainText(parts[0]);
		if (intro) entries.push({ url: page.url, title: page.title, group: page.group, text: intro.slice(0, 600) });
		for (let i = 1; i < parts.length; i += 2) {
			const heading = parts[i].trim();
			// Keep h3 slugs in the slugger so repeated heading ids match rehype-slug's.
			const id = slugger.slug(heading);
			for (const h3 of parts[i + 1].matchAll(/^### (.+)$/gm)) slugger.slug(h3[1].trim());
			entries.push({ url: `${page.url}#${id}`, title: page.title, group: page.group, section: heading, text: plainText(parts[i + 1]).slice(0, 1200) });
		}
	}
	return entries;
}

const json = `${JSON.stringify(buildIndex())}\n`;
if (process.argv.includes("--check")) {
	const current = existsSync(out) ? readFileSync(out, "utf8") : "";
	if (current !== json) {
		console.error("public/docs-search.json is out of date. Run: npm run docs:index");
		process.exit(1);
	}
	console.log("Docs search index is up to date.");
} else {
	writeFileSync(out, json);
	console.log(`Wrote ${out}`);
}
