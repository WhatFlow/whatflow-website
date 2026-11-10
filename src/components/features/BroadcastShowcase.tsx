"use client";

import { useInView } from "@/components/landing/useScrollScene";

const queue = [
	{ name: "Linen restock, VIP segment", template: "back_in_stock_vip", status: "Sending", sent: 64, total: 100, pacing: "1 / 2s" },
	{ name: "Eid sale early access", template: "eid_early_access", status: "Completed", sent: 100, total: 100, pacing: "1 / 1s" },
	{ name: "Win-back, 90 days", template: "we_miss_you", status: "Queued", sent: 0, total: 100, pacing: "1 / 3s" },
];

export function BroadcastShowcase() {
	const [ref, inView] = useInView<HTMLDivElement>(0.3);
	return (
		<section className="wf-section wf-bc" data-tone="white" aria-labelledby="wf-bc-title">
			<div className="wf-shell wf-bc-grid">
				<div className="wf-head" data-reveal>
					<h2 id="wf-bc-title" className="wf-h2">Send to a segment. At a safe pace.</h2>
					<p className="wf-lead"><b className="wf-leadin">Broadcasts.</b> Pick customers or a whole Shopify segment from the admin, choose an approved template, set the delay between messages and a delivery tag. Then watch the queue, and cancel anytime.</p>
				</div>
				<div ref={ref} className={`wf-bc-stage ${inView ? "is-in" : ""}`} aria-label="Illustrative broadcast setup and queue" role="img">
					<div className="wf-bc-modal">
						<b>Send WhatsApp Segment Broadcast</b>
						<label><small>Choose a template</small><span>back_in_stock_vip ▾</span></label>
						<label><small>Delay between messages</small><span>2 seconds ▾</span></label>
						<label><small>Delivery tag</small><span>bis-vip-nov</span></label>
						<span className="wf-bc-send">Start broadcast</span>
					</div>
					<div className="wf-bc-queue">
						<div className="wf-bc-row wf-bc-headrow"><span>Broadcast</span><span>Status</span><span>Messages</span><span>Pacing</span></div>
						{queue.map((row, index) => (
							<div key={row.name} className="wf-bc-row" style={{ "--v": row.sent / row.total, "--i": index } as React.CSSProperties}>
								<span><b>{row.name}</b><small>{row.template}</small></span>
								<span className="wf-bc-status" data-status={row.status}>{row.status}</span>
								<span className="wf-bc-bar"><i /></span>
								<span>{row.pacing}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
