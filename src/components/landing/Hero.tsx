"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { Bubble, Phone, type ChatMessage } from "./Phone";
import { prefersReducedMotion, useScrollScene } from "./useScrollScene";

const heroChat: ChatMessage[] = [
	{ id: "h1", from: "store", time: "09:41", card: { title: "Linen Shirt", meta: "Sand, size M", price: "$48", emoji: "👕" }, text: "Good news, Maya! The Linen Shirt you wanted is back in stock 🎉" },
	{ id: "h2", from: "customer", time: "09:42", text: "Omg yes. Grabbing it now!" },
	{ id: "h3", from: "store", time: "09:44", text: "Order #1031 is confirmed ✓ We'll message you here when it ships.", buttons: ["Track order", "Talk to us"] },
];

const headline = [["Your", "store,"], ["now", "chatting"], ["on", "WhatsApp."]];

export function Hero() {
	const [ref] = useScrollScene<HTMLElement>({ mode: "exit" });
	const [shown, setShown] = useState(heroChat.length);
	const [typing, setTyping] = useState(false);

	useEffect(() => {
		if (prefersReducedMotion()) return;
		let cancelled = false;
		const timers: number[] = [];
		const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));
		(async () => {
			while (!cancelled) {
				setShown(1);
				await wait(1300);
				for (let index = 1; index < heroChat.length && !cancelled; index++) {
					setTyping(true);
					await wait(1100);
					setTyping(false);
					setShown(index + 1);
					await wait(1300);
				}
				await wait(3200);
			}
		})();
		return () => {
			cancelled = true;
			timers.forEach(clearTimeout);
		};
	}, []);

	let wordIndex = 0;
	return (
		<section ref={ref} className="lp-hero" aria-labelledby="lp-hero-title">
			<div className="lp-shell lp-hero-grid">
				<div className="lp-hero-copy">
					<span className="lp-chip lp-load" style={{ "--d": "0ms" } as React.CSSProperties}>
						<Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={16} height={16} alt="" />
						<span aria-hidden="true">×</span>
						<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg" width={16} height={16} alt="" />
						WhatsApp for Shopify
					</span>
					<h1 id="lp-hero-title" className="lp-hero-title">
						{headline.map((line, lineIndex) => (
							<span key={lineIndex} className="lp-hero-line">
								{line.map((word) => {
									const delay = 120 + wordIndex++ * 90;
									const accent = word === "WhatsApp.";
									return (
										<Fragment key={word}>
											<span className="lp-word-mask">
												<span className={`lp-word ${accent ? "lp-word-accent" : ""}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
													{word}
													{accent && (
														<svg className="lp-scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
															<path d="M4 16 C 60 4, 120 22, 180 10 S 270 8, 296 14" />
														</svg>
													)}
												</span>
											</span>{" "}
										</Fragment>
									);
								})}
							</span>
						))}
					</h1>
					<p className="lp-hero-sub lp-load" style={{ "--d": "700ms" } as React.CSSProperties}>
						WhatFlow sends the messages your Shopify store should be sending: cart reminders, COD confirmations and shipping updates. Every reply lands in one team inbox.
					</p>
					<div className="lp-hero-ctas lp-load" style={{ "--d": "820ms" } as React.CSSProperties}>
						<a href={getShopifyAppUrl("hero_cta")} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-green">
							Install on Shopify
						</a>
						<a href="#see-it-work" className="lp-btn lp-btn-ghost">
							Watch it work
						</a>
					</div>
					<ul className="lp-hero-trust lp-load" style={{ "--d": "940ms" } as React.CSSProperties}>
						<li><Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={15} height={15} alt="" /> Built for Shopify</li>
						<li><Image src="/brand/meta-lockup.webp" unoptimized width={42} height={13} alt="Meta" /> Tech Partner</li>
						<li><span className="lp-stars" aria-hidden="true">★★★★★</span> 5.0 on Shopify</li>
						<li>Free plan</li>
					</ul>
				</div>

				<div className="lp-hero-stage lp-load" style={{ "--d": "300ms" } as React.CSSProperties}>
					<div className="lp-hero-phone">
						<Phone label="A Shopify store chatting with a customer on WhatsApp about a back-in-stock item">
							{heroChat.map((message, index) => <Bubble key={message.id} message={message} shown={index < shown} />)}
							<div className={`lp-typing ${typing ? "is-shown" : ""}`} aria-hidden="true"><span /><span /><span /></div>
						</Phone>
					</div>
					<ul className="lp-hero-status" aria-label="Example Shopify updates">
						<li><strong>Checkout recovered</strong><small>Linen Shirt + Tote · $84</small></li>
						<li><strong>COD confirmed</strong><small>Order #1027 · tagged in Shopify</small></li>
						<li><strong>Out for delivery</strong><small>Tracking sent on WhatsApp</small></li>
					</ul>
				</div>
			</div>
		</section>
	);
}
