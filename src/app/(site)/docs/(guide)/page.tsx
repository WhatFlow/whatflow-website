import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_NAV } from "@/lib/docs/nav";

export const metadata: Metadata = {
	title: "WhatFlow Docs: set up and use every feature",
	description:
		"Step-by-step guides for every WhatFlow feature: connecting WhatsApp, templates, COD verification, abandoned checkout recovery, shipping updates, Live Inbox, broadcasts, Shopify Flow and billing.",
	alternates: { canonical: "/docs" },
};

const START = [
	{ href: "/docs/getting-started/install", title: "Install WhatFlow", body: "Add the app to Shopify and take the tour." },
	{ href: "/docs/getting-started/connect-whatsapp", title: "Connect WhatsApp", body: "Link your business number with Meta." },
	{ href: "/docs/getting-started/quickstart", title: "Quickstart", body: "Send your first automated message." },
];

export default function DocsHome() {
	return (
		<div className="docs-page docs-home">
			<article className="docs-article">
				<header className="docs-header">
					<p className="docs-eyebrow">Documentation</p>
					<h1>Everything WhatFlow does, explained</h1>
					<p className="docs-lead">
						Guides for setting up and running WhatsApp for your Shopify store: every automation, every setting, and what to do when a message does not send.
					</p>
				</header>

				<section className="docs-home-start" aria-labelledby="docs-start">
					<h2 id="docs-start">Start here</h2>
					<ol className="docs-home-steps">
						{START.map((item, index) => (
							<li key={item.href}>
								<Link href={item.href}>
									<span className="docs-home-num">{index + 1}</span>
									<strong>{item.title}</strong>
									<span>{item.body}</span>
								</Link>
							</li>
						))}
					</ol>
				</section>

				<section aria-labelledby="docs-all">
					<h2 id="docs-all" className="docs-home-heading">Browse by topic</h2>
					<div className="docs-home-groups">
						{DOCS_NAV.filter((group) => group.title !== "Get started").map((group) => (
							<div key={group.title} className="docs-home-group">
								<h3>{group.title}</h3>
								<ul>
									{group.pages.map((page) => (
										<li key={page.slug}>
											<Link href={page.href ?? `/docs/${page.slug}`}>
												<strong>{page.title}</strong>
												<span>{page.description}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>
			</article>
		</div>
	);
}
