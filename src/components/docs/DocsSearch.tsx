"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DOCS_PAGES } from "@/lib/docs/nav";

type SearchEntry = {
	url: string;
	title: string;
	group: string;
	section?: string;
	text: string;
};

type Result = SearchEntry & { score: number };

const normalize = (value: string) =>
	value.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();

// Titles and descriptions are searchable immediately; full text arrives with /docs-search.json.
const BASE_ENTRIES: SearchEntry[] = DOCS_PAGES.map((page) => ({
	url: page.url,
	title: page.title,
	group: page.group,
	text: `${page.description} ${(page.keywords ?? []).join(" ")}`,
}));

function rank(entries: SearchEntry[], query: string): Result[] {
	const words = normalize(query).split(" ").filter(Boolean);
	if (!words.length) return [];
	const results: Result[] = [];
	for (const entry of entries) {
		const title = normalize(`${entry.section ?? ""} ${entry.title}`);
		const text = normalize(entry.text);
		let score = 0;
		let matched = true;
		for (const word of words) {
			if (title.includes(word)) score += title.split(" ").includes(word) ? 6 : 4;
			else if (text.includes(word)) score += 1;
			else { matched = false; break; }
		}
		if (!matched) continue;
		if (title.includes(words.join(" "))) score += 5;
		if (!entry.section) score += 1;
		results.push({ ...entry, score });
	}
	const seen = new Set<string>();
	return results
		.sort((a, b) => b.score - a.score)
		.filter((result) => (seen.has(result.url) ? false : (seen.add(result.url), true)))
		.slice(0, 12);
}

function snippet(text: string, query: string) {
	const first = normalize(query).split(" ")[0] ?? "";
	const index = text.toLowerCase().indexOf(first);
	const start = Math.max(0, index - 50);
	const piece = text.slice(start, start + 150).trim();
	return `${start > 0 ? "…" : ""}${piece}${start + 150 < text.length ? "…" : ""}`;
}

export function DocsSearch({ compact = false }: { compact?: boolean }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const [entries, setEntries] = useState<SearchEntry[]>(BASE_ENTRIES);
	const loaded = useRef(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const show = useCallback(() => {
		setOpen(true);
		if (!loaded.current) {
			loaded.current = true;
			fetch("/docs-search.json")
				.then((response) => (response.ok ? response.json() : null))
				.then((data: SearchEntry[] | null) => { if (Array.isArray(data)) setEntries([...BASE_ENTRIES, ...data]); })
				.catch(() => { loaded.current = false; });
		}
	}, []);

	useEffect(() => {
		// Only the full-size instance listens for the shortcut, so one dialog opens.
		if (compact) return;
		const onKey = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				show();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [compact, show]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			inputRef.current?.focus();
		} else if (!open && dialog.open) dialog.close();
	}, [open]);

	const results = useMemo(() => rank(entries, query), [entries, query]);

	const go = (url: string) => {
		setOpen(false);
		setQuery("");
		router.push(url);
	};

	return (
		<>
			<button type="button" className="docs-search-trigger" data-compact={compact} onClick={show} aria-label="Search documentation">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
				{!compact && <span>Search docs</span>}
				{!compact && <kbd>⌘K</kbd>}
			</button>
			<dialog
				ref={dialogRef}
				className="docs-search-dialog"
				aria-label="Search documentation"
				onClose={() => setOpen(false)}
				onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
			>
				<div className="docs-search-panel">
					<div className="docs-search-field">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
						<input
							ref={inputRef}
							type="search"
							value={query}
							placeholder="Search for a feature, setting or error"
							aria-label="Search documentation"
							aria-controls="docs-search-results"
							onChange={(event) => { setQuery(event.target.value); setActive(0); }}
							onKeyDown={(event) => {
								if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, results.length - 1)); }
								if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
								if (event.key === "Enter" && results[active]) { event.preventDefault(); go(results[active].url); }
							}}
						/>
						<button type="button" className="docs-search-close" onClick={() => setOpen(false)}>Esc</button>
					</div>
					<ul id="docs-search-results" className="docs-search-results" role="listbox">
						{query && results.length === 0 && <li className="docs-search-empty">No results for “{query}”. Try a shorter word, or message support on WhatsApp.</li>}
						{results.map((result, index) => (
							<li key={result.url} role="option" aria-selected={index === active}>
								<button type="button" onMouseEnter={() => setActive(index)} onClick={() => go(result.url)}>
									<span className="docs-search-crumb">{result.group}{result.section ? ` › ${result.title}` : ""}</span>
									<strong>{result.section ?? result.title}</strong>
									<span className="docs-search-snippet">{snippet(result.text, query)}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</dialog>
		</>
	);
}
