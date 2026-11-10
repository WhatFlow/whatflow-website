import Link from "next/link";
import { WhatFlowLogo } from "./Navbar";
import { FooterCta } from "./site/FooterCta";

const columns = [
	{
		title: "Product",
		links: [
			["/features", "Features"],
			["/inbox", "Team inbox"],
			["/features#recovery", "Abandoned cart recovery"],
			["/features#automations", "Order confirmations and COD"],
			["/features#auto-replies", "Auto-replies"],
			["/pricing", "Pricing"],
		],
	},
	{
		title: "Solutions",
		links: [
			["/solutions", "All solutions"],
			["/solutions/abandoned-cart-recovery", "Abandoned cart recovery"],
			["/solutions/cod-order-verification", "COD verification"],
			["/solutions/order-tracking-notifications", "Order tracking and shipping"],
			["/solutions/whatsapp-reviews-ugc", "Reviews and UGC"],
			["/compare", "Compare alternatives"],
		],
	},
	{
		title: "Resources",
		links: [
			["/affiliate", "Affiliate program"],
			["/blog", "Blog and guides"],
			["/case-studies", "Case studies"],
			["/changelog", "Changelog"],
			["/docs/mcp", "Connect AI apps (MCP)"],
			["/admin", "Merchant portal"],
		],
	},
	{
		title: "Company",
		links: [
			["https://www.linkedin.com/company/whatflow", "LinkedIn"],
			["/about", "About WhatFlow"],
			["mailto:support@whatflow.tech", "Contact support"],
			["/privacy", "Privacy policy"],
			["/terms", "Terms of service"],
			["/security", "Security and GDPR"],
		],
	},
];

export function Footer() {
	return (
		<>
			<FooterCta />
			<footer className="wf-footer">
				<div className="wf-shell">
					<div className="wf-footer-grid">
						<div className="wf-footer-brand" data-reveal>
							<WhatFlowLogo lightMode={false} />
							<p>WhatsApp marketing, customer support and order automation for Shopify stores.</p>
							<span className="wf-footer-badge">Official Meta Tech Partner</span>
						</div>
						{columns.map((column, index) => (
							<div key={column.title} className="wf-footer-col" data-reveal style={{ "--d": `${(index + 1) * 60}ms` } as React.CSSProperties}>
								<h2>{column.title}</h2>
								<ul>
									{column.links.map(([href, label]) =>
										<li key={href}>{href.startsWith("/") ? <Link href={href}>{label}</Link> : <a href={href}>{label}</a>}</li>,
									)}
								</ul>
							</div>
						))}
					</div>
					<div className="wf-footer-word" aria-hidden="true">WhatFlow</div>
					<div className="wf-footer-base">
						<span>© {new Date().getFullYear()} WhatFlow Solutions.</span>
						<span>Official Meta Tech Partner · Zero markup guarantee</span>
					</div>
				</div>
			</footer>
		</>
	);
}
