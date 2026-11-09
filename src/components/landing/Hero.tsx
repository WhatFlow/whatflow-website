"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { Bubble, Phone, type ChatMessage } from "./Phone";
import { prefersReducedMotion, useScrollScene } from "./useScrollScene";

const heroChat: ChatMessage[] = [
	{ id: "h1", from: "store", time: "09:41", card: { title: "Linen Shirt", meta: "Sand · Size M", price: "$48", emoji: "👕" }, text: "Good news, Maya! The Linen Shirt you wanted is back in stock 🎉" },
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
				setShown(0);
				await wait(700);
				for (let index = 0; index < heroChat.length && !cancelled; index++) {
					setTyping(true);
					await wait(index === 0 ? 900 : 1100);
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
			<div className="lp-hero-blob lp-hero-blob-a" aria-hidden="true" />
			<div className="lp-hero-blob lp-hero-blob-b" aria-hidden="true" />
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
						WhatFlow sends the messages your Shopify store should be sending — cart reminders, COD confirmations, shipping updates — and puts every reply in one team inbox.
					</p>
					<div className="lp-hero-ctas lp-load" style={{ "--d": "820ms" } as React.CSSProperties}>
						<a href={getShopifyAppUrl("hero_cta")} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-green">
							Install on Shopify <span aria-hidden="true">↗</span>
						</a>
						<a href="#see-it-work" className="lp-btn lp-btn-ghost">
							Watch it work <span aria-hidden="true" className="lp-bounce">↓</span>
						</a>
					</div>
					<ul className="lp-hero-trust lp-load" style={{ "--d": "940ms" } as React.CSSProperties}>
						<li><Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={15} height={15} alt="" /> Built for Shopify</li>
						<li><Image src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg" width={42} height={13} alt="Meta" /> Tech Partner</li>
						<li><span className="text-[#E8A400]" aria-hidden="true">★★★★★</span> 5.0 on Shopify</li>
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
					<div className="lp-sticker lp-sticker-a" aria-hidden="true">
						<span className="lp-sticker-icon bg-[#FFC107]">🛒</span>
						<span><b>Checkout recovered</b><small>Linen Shirt + Tote · $84</small></span>
					</div>
					<div className="lp-sticker lp-sticker-b" aria-hidden="true">
						<span className="lp-sticker-icon bg-[#00D261]">✓</span>
						<span><b>COD confirmed</b><small>Order #1027 · tagged in Shopify</small></span>
					</div>
					<div className="lp-sticker lp-sticker-c" aria-hidden="true">
						<span className="lp-sticker-icon bg-[#BFD7FF]">📦</span>
						<span><b>Out for delivery</b><small>Tracking sent on WhatsApp</small></span>
					</div>
				</div>
			</div>
		</section>
	);
}
