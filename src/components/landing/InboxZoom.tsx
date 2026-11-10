"use client";

import { useEffect, useRef } from "react";
import { useScrollScene } from "./useScrollScene";

const conversations = [
	{ name: "Maya Chen", preview: "Could I swap the shirt to a size L?", time: "11:09", badge: "Needs reply", active: true },
	{ name: "Omar Haddad", preview: "Is the tote waterproof?", time: "10:52", badge: "2" },
	{ name: "Priya S.", preview: "✓ Confirmed order #1026", time: "10:31" },
	{ name: "Lucas Ferreira", preview: "Thanks, got the tracking link!", time: "09:58" },
	{ name: "Aisha Bello", preview: "When is the linen back?", time: "Yesterday", badge: "1" },
	{ name: "Tom Becker", preview: "Perfect, see you Thursday", time: "Yesterday" },
];

const callouts = [
	{ text: "No seat fees", className: "lp-callout-a" },
	{ text: "Shopify orders beside every chat", className: "lp-callout-b" },
	{ text: "Reply-window countdown", className: "lp-callout-c" },
	{ text: "Assign to teammates", className: "lp-callout-d" },
];

export function InboxZoom() {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pin" });
	const fitRef = useRef<HTMLDivElement>(null);

	// The mock is laid out at 1040×600 and scaled to fit the screen.
	useEffect(() => {
		const element = fitRef.current;
		if (!element) return;
		const fit = () => {
			const byWidth = element.clientWidth / 1040;
			const byHeight = (window.innerHeight - 72 - 250) / 620;
			element.style.setProperty("--fit", Math.max(0.3, Math.min(1, byWidth, byHeight)).toFixed(3));
		};
		const observer = new ResizeObserver(fit);
		observer.observe(element);
		window.addEventListener("resize", fit);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", fit);
		};
	}, []);

	return (
		<section ref={ref} className="lp-inbox" aria-labelledby="lp-inbox-title">
			<div className="lp-inbox-sticky">
				<div className="lp-shell lp-inbox-head">
					<h2 id="lp-inbox-title" className="lp-h2 text-white">Every chat. Every order. One screen.</h2>
				</div>
				<div ref={fitRef} className="lp-shell lp-inbox-fit">
					<div className="lp-inbox-scaler">
						<div className="lp-window" role="img" aria-label="WhatFlow team inbox with a conversation list, an open chat, and the customer's Shopify orders">
							<div className="lp-app-head"><b>WhatFlow Inbox</b></div>
							<div className="lp-window-body">
								<aside className="lp-inbox-list">
									<div className="lp-inbox-filters"><span className="is-on">All</span><span>Needs reply · 2</span><span>Mine</span></div>
									{conversations.map((item) => (
										<div key={item.name} className={`lp-inbox-row ${item.active ? "is-active" : ""}`}>
											<span className="lp-inbox-avatar">{item.name[0]}</span>
											<span className="min-w-0 flex-1">
												<span className="flex justify-between gap-2"><b>{item.name}</b><small>{item.time}</small></span>
												<span className="lp-inbox-preview">{item.preview}</span>
											</span>
											{item.badge && <span className={item.badge === "Needs reply" ? "lp-badge-warn" : "lp-badge"}>{item.badge}</span>}
										</div>
									))}
								</aside>
								<div className="lp-inbox-thread">
									<div className="lp-inbox-thread-head">
										<b>Maya Chen</b>
										<span className="lp-countdown">⏱ 21h 48m left to reply</span>
										<span className="lp-assign">Assigned · Sara</span>
									</div>
									<div className="lp-inbox-messages">
										<p className="lp-im lp-im-out">📦 Your order #1027 is on the way! It should arrive Thursday.</p>
										<p className="lp-im lp-im-in">Amazing! Could I swap the shirt to a size L?</p>
										<p className="lp-im lp-im-out lp-im-typing">Done ✅ Swapped to L before it leaves the warehouse.<span className="lp-caret" /></p>
									</div>
									<div className="lp-inbox-composer"><span>Reply, or type / for quick replies</span><b>Send</b></div>
								</div>
								<aside className="lp-inbox-customer">
									<span className="lp-inbox-avatar lp-inbox-avatar-lg">M</span>
									<b>Maya Chen</b>
									<small>+1 (415) 555‑0148 · Returning customer</small>
									<div className="lp-inbox-order">
										<div className="flex justify-between"><b>#1027</b><span className="lp-tag lp-tag-green">✓ Order Confirmed</span></div>
										<small>Linen Shirt (L) · Canvas Tote</small>
										<div className="flex justify-between"><small>Fulfilled</small><b>$84.00</b></div>
									</div>
									<div className="lp-inbox-order">
										<div className="flex justify-between"><b>#0988</b><span className="lp-tag lp-tag-blue">Delivered</span></div>
										<small>Ceramic Mug × 2</small>
									</div>
									<div className="lp-inbox-actions"><span>Send template</span><span>Open in Shopify</span></div>
								</aside>
							</div>
						</div>
						{callouts.map((callout) => <span key={callout.text} className={`lp-callout ${callout.className}`}>{callout.text}</span>)}
					</div>
				</div>
			</div>
		</section>
	);
}
