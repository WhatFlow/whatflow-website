import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { DocsToc } from "@/components/docs/DocsToc";
import { DOCS_ARTICLES, getDocNeighbours, getDocPage } from "@/lib/docs/nav";

export const dynamicParams = false;

const SUPPORT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER?.trim().replace(/^\+/, "");

export function generateStaticParams() {
	return DOCS_ARTICLES.map((page) => ({ slug: page.slug.split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const page = getDocPage((await params).slug.join("/"));
	if (!page) return {};
	return {
		title: `${page.title} · WhatFlow Docs`,
		description: page.description,
		alternates: { canonical: page.url },
		openGraph: { title: `${page.title} · WhatFlow Docs`, description: page.description, url: page.url, type: "article" },
	};
}

export default async function DocPage({ params }: Props) {
	const slug = (await params).slug.join("/");
	const page = getDocPage(slug);
	if (!page) notFound();

	let Content: ComponentType;
	try {
		Content = (await import(`../../../../../content/docs/${slug}.mdx`)).default;
	} catch {
		notFound();
	}
	const { prev, next } = getDocNeighbours(slug);

	return (
		<div className="docs-page" key={slug}>
			<article className="docs-article">
				<header className="docs-header">
					<p className="docs-eyebrow">{page.group}</p>
					<h1>{page.title}</h1>
					<p className="docs-lead">{page.description}</p>
				</header>
				<div className="docs-prose">
					<Content />
				</div>
				<footer className="docs-footer">
					<p className="docs-help">
						Still stuck?{" "}
						{SUPPORT_NUMBER && <><a href={`https://wa.me/${SUPPORT_NUMBER}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> or email{" "}</>}
						<a href="mailto:support@whatflow.tech">support@whatflow.tech</a>.
					</p>
					<nav className="docs-pager" aria-label="Previous and next page">
						{prev ? (
							<Link href={prev.url} className="docs-pager-link" data-dir="prev">
								<span>Previous</span>
								<strong>{prev.title}</strong>
							</Link>
						) : <span />}
						{next && (
							<Link href={next.url} className="docs-pager-link" data-dir="next">
								<span>Next</span>
								<strong>{next.title}</strong>
							</Link>
						)}
					</nav>
				</footer>
			</article>
			<aside className="docs-aside">
				<DocsToc key={slug} />
			</aside>
		</div>
	);
}
