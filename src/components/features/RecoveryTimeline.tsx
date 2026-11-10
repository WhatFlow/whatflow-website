"use client";

import { useScrollScene } from "@/components/landing/useScrollScene";

const steps = [
	{ time: "0 min", title: "Checkout abandoned", body: "WhatFlow sees the unpaid Shopify checkout.", tone: "#FFD6E2" },
	{ time: "30 min+", title: "Reminder 1", body: "A friendly nudge with a short link back to the saved cart.", tone: "#FFE7A3" },
	{ time: "You choose", title: "Reminder 2", body: "Checked again first. Still unpaid, so it sends.", tone: "#FFE7A3" },
	{ time: "You choose", title: "Reminder 3", body: "The last nudge. Each one has its own template.", tone: "#FFE7A3" },
	{ time: "Ordered", title: "Reminders stop", body: "The moment they order, the sequence ends.", tone: "#C9F5DC" },
];

const also = [
	{ title: "Draft order recovery", body: "Invoice links for draft orders, with up to 3 reminders until the customer pays." },
	{ title: "Back in stock", body: "A product-page button collects requests; WhatsApp alerts go out the moment a variant is restocked." },
	{ title: "Tracked links", body: "Recovery links carry utm_source=whatsapp and utm_campaign=whatflow, so revenue shows up in your reports." },
];

export function RecoveryTimeline() {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pass" });
	return (
		<section ref={ref} className="wf-recovery" aria-labelledby="wf-recovery-title">
			<div className="wf-shell">
				<div className="wf-head" data-center="true" data-reveal>
					<h2 id="wf-recovery-title" className="wf-h2">Three chances to win the sale back.</h2>
					<p className="wf-lead"><b className="wf-leadin">Recovery.</b> Up to three timed reminders for abandoned checkouts. Before each one, WhatFlow checks the checkout is still unpaid, and stops as soon as the customer orders.</p>
				</div>
				<ol className="wf-rtl">
					<span className="wf-rtl-line" aria-hidden="true"><span /></span>
					{steps.map((step, index) => (
						<li key={step.title} style={{ "--i": index, "--tone": step.tone } as React.CSSProperties}>
							<span className="wf-rtl-dot" aria-hidden="true">{index === steps.length - 1 ? "✓" : index + 1}</span>
							<small>{step.time}</small>
							<b>{step.title}</b>
							<p>{step.body}</p>
						</li>
					))}
				</ol>
				<div className="wf-grid wf-grid-3 wf-recovery-also">
					{also.map((item, index) => (
						<div key={item.title} className="wf-card" data-reveal data-hover style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
