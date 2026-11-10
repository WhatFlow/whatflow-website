"use client";

import Image from "next/image";
import Link from "next/link";
import { scrollToY } from "./LandingMotion";
import { Bubble, Phone, type ChatMessage } from "./Phone";
import { useScrollScene } from "./useScrollScene";

const steps = [
	{
		kicker: "Abandoned checkout",
		title: "A shopper leaves at checkout.",
		body: "WhatFlow notices the abandoned Shopify checkout and sends a friendly nudge with a link straight back to their saved cart.",
		href: "/solutions/abandoned-cart-recovery",
	},
	{
		kicker: "Cash on delivery",
		title: "They come back and order COD.",
		body: "Before anything ships, the customer confirms with one tap, and the order is tagged in Shopify automatically.",
		href: "/solutions/cod-order-verification",
	},
	{
		kicker: "Shipping updates",
		title: "It ships. They hear about it.",
		body: "Fulfillment and tracking updates go out on WhatsApp, where customers actually read them.",
		href: "/solutions/order-tracking-notifications",
	},
	{
		kicker: "Team inbox",
		title: "They reply. Your team answers.",
		body: "Every reply lands in a shared inbox next to the customer's Shopify orders, so anyone on the team can help.",
		href: "/inbox",
	},
];

const messages: (ChatMessage & { at: number })[] = [
	{ at: 0, id: "s1", from: "store", time: "18:02", card: { title: "Linen Shirt + Canvas Tote", meta: "2 items in your cart", price: "$84", emoji: "🛍️" }, text: "Hey Maya 👋 you left a couple of things behind. Your cart is saved!", buttons: ["Complete checkout"] },
	{ at: 1, id: "s2", from: "store", time: "18:20", text: "Thanks for your order! Please confirm COD order #1027 for $84.00 so we can pack it.", buttons: ["Confirm Order", "Cancel Order"], tapped: 0 },
	{ at: 1, id: "s3", from: "customer", time: "18:21", text: "Confirm Order" },
	{ at: 2, id: "s4", from: "store", time: "Tue 11:05", text: "📦 Your order #1027 is on the way! It should arrive Thursday.", buttons: ["Track package"] },
	{ at: 3, id: "s5", from: "customer", time: "Tue 11:09", text: "Amazing! Could I swap the shirt to a size L?" },
	{ at: 3, id: "s6", from: "agent", time: "Tue 11:12", text: "Done ✅ Swapped to L before it leaves the warehouse." },
];

const admin = [
	{ label: "Abandoned checkout", tone: "lp-tag-yellow", tag: "Reminder sent", line: "Maya Chen · 2 items · $84.00" },
	{ label: "Order #1027", tone: "lp-tag-green", tag: "✓ Order Confirmed", line: "Was ⚠ Confirmation Pending. COD, $84.00" },
	{ label: "Order #1027", tone: "lp-tag-blue", tag: "✓ Fulfillment Notified", line: "Out for delivery, tracking sent" },
	{ label: "Order #1027", tone: "lp-tag-green", tag: "Inbox · Sara", line: "Size changed to L · replied in 3 min" },
];

export function OrderStory() {
	const [ref, step] = useScrollScene<HTMLElement>({ steps: steps.length });

	const jumpTo = (index: number) => {
		const element = ref.current;
		if (!element) return;
		const top = element.getBoundingClientRect().top + window.scrollY - 72;
		const travel = element.offsetHeight - (window.innerHeight - 72);
		scrollToY(top + travel * ((index + 0.5) / steps.length));
	};

	return (
		<section ref={ref} id="see-it-work" className="lp-story" data-step={step} aria-labelledby="lp-story-title">
			<div className="lp-story-sticky">
				<div className="lp-shell lp-story-grid">
					<div className="lp-story-copy">
						<h2 id="lp-story-title" className="sr-only">One order, start to finish</h2>
						<div className="lp-story-steps">
							{steps.map((item, index) => (
								<div key={item.kicker} className={`lp-story-step ${index === step ? "is-active" : ""}`} aria-hidden={index !== step}>
									<span className="lp-story-num">0{index + 1}<small>of 4</small></span>
									<h3>{item.title}</h3>
									<p><b>{item.kicker}.</b> {item.body}</p>
									<Link href={item.href} tabIndex={index === step ? 0 : -1}>How it works</Link>
								</div>
							))}
						</div>
						<div className="lp-story-nav" role="tablist" aria-label="Story steps">
							{steps.map((item, index) => (
								<button key={item.kicker} type="button" role="tab" aria-selected={index === step} onClick={() => jumpTo(index)} className={index <= step ? "is-done" : ""}>
									<span className="sr-only">{item.kicker}</span>
								</button>
							))}
						</div>
					</div>

					<div className="lp-story-stage">
						<Phone className="lp-story-phone" label="WhatsApp conversation between Juniper Goods and a customer across checkout, confirmation, shipping and support">
							{messages.map((message) => <Bubble key={message.id} message={message} shown={message.at <= step} />)}
						</Phone>
						<div className="lp-admin" aria-live="polite">
							<div className="lp-admin-head">
								<Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={16} height={16} alt="" />
								<span>Shopify admin</span>
							</div>
							<div className="lp-admin-body" key={step}>
								<div className="flex items-center justify-between gap-2">
									<b>{admin[step].label}</b>
									<span className={`lp-tag ${admin[step].tone}`}>{admin[step].tag}</span>
								</div>
								<span className="lp-admin-line">{admin[step].line}</span>
							</div>
							<ol className="lp-admin-timeline" aria-hidden="true">
								{["Checkout", "Confirmed", "Shipped", "Answered"].map((label, index) => (
									<li key={label} className={index <= step ? "is-done" : ""}><span />{label}</li>
								))}
							</ol>
						</div>
					</div>
				</div>
				<div className="lp-story-progress" aria-hidden="true"><span /></div>
			</div>
		</section>
	);
}
