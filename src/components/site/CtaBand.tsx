"use client";

import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { useScrollScene } from "@/components/landing/useScrollScene";

/** Big green closing band: sliding headline and a WhatsApp-style install "message". */
export function CtaBand({
	placement = "cta_band",
	title = ["Start the", "conversation."],
	sub = "Install in minutes. Free plan, no seat fees, every feature on every plan.",
}: { placement?: string; title?: [string, string]; sub?: string }) {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pass" });
	return (
		<section ref={ref} className="wf-cta" aria-label="Install WhatFlow">
			<div className="wf-shell wf-cta-inner">
				<h2 className="wf-cta-title">
					<span>{title[0]}</span>
					<span>{title[1]}</span>
				</h2>
				<p className="wf-cta-sub">{sub}</p>
				<a href={getShopifyAppUrl(placement)} target="_blank" rel="noopener noreferrer" className="wf-compose">
					<span className="wf-compose-field">Install WhatFlow on Shopify<span className="wf-caret" /></span>
					<span className="wf-compose-send" aria-hidden="true">➤</span>
				</a>
				<Link href="/pricing" className="wf-cta-link">See pricing</Link>
			</div>
			<div className="wf-cta-bubbles" aria-hidden="true">
				<span>Order confirmed ✓</span>
				<span>Back in stock 🎉</span>
				<span>On its way 📦</span>
				<span>Thanks! 🙏</span>
			</div>
		</section>
	);
}
