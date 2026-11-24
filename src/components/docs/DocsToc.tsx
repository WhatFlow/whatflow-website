"use client";

import { useEffect, useState } from "react";

type Item = { id: string; text: string; level: number };

/** "On this page" links, read from the rendered article's h2/h3 headings. */
export function DocsToc({ inline = false }: { inline?: boolean }) {
	const [items, setItems] = useState<Item[]>([]);
	const [active, setActive] = useState("");

	useEffect(() => {
		const headings = Array.from(document.querySelectorAll<HTMLElement>(".docs-prose h2[id], .docs-prose h3[id]"))
			.filter((el) => !el.classList.contains("docs-step-title"));
		// Headings are only known after the article renders.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setItems(headings.map((el) => ({ id: el.id, text: el.textContent ?? "", level: el.tagName === "H2" ? 2 : 3 })));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((entry) => entry.isIntersecting);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-90px 0px -65% 0px" },
		);
		headings.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	if (items.length < 2) return null;
	if (inline) {
		return (
			<details className="docs-toc-inline">
				<summary>On this page</summary>
				<ul>
					{items.filter((item) => item.level === 2).map((item) => (
						<li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
					))}
				</ul>
			</details>
		);
	}
	return (
		<nav className="docs-toc" aria-label="On this page">
			<p className="docs-toc-title">On this page</p>
			<ul>
				{items.map((item) => (
					<li key={item.id} data-level={item.level}>
						<a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.text}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
