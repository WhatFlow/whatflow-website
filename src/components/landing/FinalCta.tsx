"use client";

import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { useScrollScene } from "./useScrollScene";

export function FinalCta() {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pass" });
	return (
		<section ref={ref} className="lp-final" aria-labelledby="lp-final-title">
			<div className="lp-shell lp-final-inner">
				<h2 id="lp-final-title" className="lp-final-title">
					<span>Start the</span>
					<span>conversation.</span>
				</h2>
				<p className="lp-final-sub">Install in minutes. Free plan, no seat fees, every feature on every plan.</p>
				<a href={getShopifyAppUrl("bottom_cta_banner")} target="_blank" rel="noopener noreferrer" className="lp-compose">
					<span className="lp-compose-field">Install WhatFlow on Shopify<span className="lp-caret" /></span>
					<span className="lp-compose-send" aria-hidden="true">➤</span>
				</a>
				<Link href="/pricing" className="lp-final-link">See pricing →</Link>
			</div>
			<div className="lp-final-bubbles" aria-hidden="true">
				<span>Order confirmed ✓</span>
				<span>Back in stock 🎉</span>
				<span>On its way 📦</span>
				<span>Thanks! 🙏</span>
			</div>
		</section>
	);
}
