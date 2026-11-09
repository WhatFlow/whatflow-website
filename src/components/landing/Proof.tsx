"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useScrollScene";

type Review = { id: string | number; author: string; rating?: number; body: string };

function CountUp({ to, decimals = 0, prefix = "" }: { to: number; decimals?: number; prefix?: string }) {
	const [ref, inView] = useInView<HTMLSpanElement>(0.6);
	const [value, setValue] = useState(to);
	useEffect(() => {
		if (!inView || prefersReducedMotion()) return;
		const start = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			const t = Math.min(1, (now - start) / 1100);
			setValue(to * (1 - Math.pow(1 - t, 3)));
			if (t < 1) frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	}, [inView, to]);
	return <span ref={ref}>{prefix}{value.toFixed(decimals)}</span>;
}

const automations = [
	{ emoji: "🛒", title: "Abandoned checkouts", href: "/solutions/abandoned-cart-recovery", tone: "#FFE7A3" },
	{ emoji: "✅", title: "COD confirmation", href: "/solutions/cod-order-verification", tone: "#C9F5DC" },
	{ emoji: "📦", title: "Shipping updates", href: "/solutions/order-tracking-notifications", tone: "#D9E6FF" },
	{ emoji: "🔔", title: "Back-in-stock alerts", href: "/features", tone: "#FFD6E2" },
	{ emoji: "📣", title: "Broadcasts", href: "/features", tone: "#E7DBFF" },
	{ emoji: "💬", title: "Chat buttons for your theme", href: "/features", tone: "#C9F5DC" },
];

export function Proof() {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		fetch("/api/reviews?limit=12&where[active][equals]=true")
			.then((response) => (response.ok ? (response.json() as Promise<{ docs?: Review[] }>) : null))
			.then((data) => setReviews((data?.docs ?? []).filter((review) => (review.rating ?? 5) >= 5).slice(0, 8)))
			.catch(() => { /* No reviews strip when the API is unavailable. */ });
	}, []);

	return (
		<section className="lp-proof" aria-labelledby="lp-proof-title">
			<div className="lp-shell">
				<div data-reveal className="lp-proof-head">
					<span className="lp-eyebrow">Everything included</span>
					<h2 id="lp-proof-title" className="lp-h2">Every plan gets <span className="lp-hl">every feature.</span></h2>
				</div>
				<div className="lp-stats">
					<div data-reveal className="lp-stat lp-stat-green" style={{ "--d": "0ms" } as React.CSSProperties}>
						<b><CountUp to={5} decimals={1} />★</b>
						<span>Business API rating on the Shopify App Store</span>
					</div>
					<div data-reveal className="lp-stat lp-stat-yellow" style={{ "--d": "80ms" } as React.CSSProperties}>
						<b><CountUp to={0} prefix="$" /></b>
						<span>Inbox seat fees. Add your whole team.</span>
					</div>
					<div data-reveal className="lp-stat lp-stat-white" style={{ "--d": "160ms" } as React.CSSProperties}>
						<b>Official</b>
						<span>Meta WhatsApp Cloud API</span>
					</div>
					<div data-reveal className="lp-stat lp-stat-dark" style={{ "--d": "240ms" } as React.CSSProperties}>
						<b>Free</b>
						<span>Plan to start. Meta message rates are separate.</span>
					</div>
				</div>
				<ul className="lp-autos">
					{automations.map((item, index) => (
						<li key={item.title} data-reveal style={{ "--d": `${index * 60}ms`, "--tone": item.tone } as React.CSSProperties}>
							<Link href={item.href}><span aria-hidden="true">{item.emoji}</span>{item.title}<i aria-hidden="true">→</i></Link>
						</li>
					))}
				</ul>
			</div>
			{reviews.length > 1 && (
				<div className="lp-reviews" aria-label="Merchant reviews">
					<div className="lp-reviews-track">
						{[0, 1].map((copy) => (
							<ul key={copy} className="lp-reviews-group" aria-hidden={copy === 1}>
								{reviews.map((review) => (
									<li key={review.id} className="lp-review">
										<span className="text-[#E8A400]" aria-label="5 out of 5 stars">★★★★★</span>
										<p>{review.body.length > 180 ? `${review.body.slice(0, 177).trimEnd()}…` : review.body}</p>
										<b>{review.author}</b>
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
