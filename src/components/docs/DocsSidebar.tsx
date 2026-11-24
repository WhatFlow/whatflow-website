"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DOCS_NAV } from "@/lib/docs/nav";
import { DocsSearch } from "./DocsSearch";

export function DocsSidebar() {
	const pathname = usePathname();
	const [openPath, setOpenPath] = useState<string | null>(null);
	// The mobile menu closes itself on navigation because it is keyed to the path it opened on.
	const open = openPath === pathname;
	const current = DOCS_NAV.flatMap((group) => group.pages).find((page) => (page.href ?? `/docs/${page.slug}`) === pathname);

	return (
		<>
			<div className="docs-mobilebar">
				<button type="button" className="docs-menu-button" aria-expanded={open} aria-controls="docs-nav" onClick={() => setOpenPath(open ? null : pathname)}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
					<span>{current ? current.title : "Documentation"}</span>
				</button>
				<DocsSearch compact />
			</div>
			<nav id="docs-nav" className="docs-sidebar" data-open={open} aria-label="Documentation">
				<div className="docs-sidebar-search"><DocsSearch /></div>
				<Link href="/docs" className="docs-nav-link docs-nav-home" aria-current={pathname === "/docs" ? "page" : undefined}>Documentation home</Link>
				{DOCS_NAV.map((group) => (
					<div key={group.title} className="docs-nav-group">
						<p className="docs-nav-heading">{group.title}</p>
						<ul>
							{group.pages.map((page) => {
								const href = page.href ?? `/docs/${page.slug}`;
								return (
									<li key={href}>
										<Link href={href} className="docs-nav-link" aria-current={pathname === href ? "page" : undefined}>
											{page.title}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</nav>
		</>
	);
}
