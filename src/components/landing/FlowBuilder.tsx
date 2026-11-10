"use client";

import Image from "next/image";
import { useScrollScene } from "./useScrollScene";

const prompt = "When a cash on delivery order comes in, ask the customer to confirm it on WhatsApp.";

const nodes = [
	{ type: "Trigger", title: "Order created", detail: "Shopify", icon: "/shopify-brand-assets/02-glyph/svg/glyph-color.svg", tone: "lp-node-green" },
	{ type: "Condition", title: "Payment is Cash on Delivery", detail: "If true", icon: null, tone: "lp-node-yellow" },
	{ type: "Action", title: "Send WhatsApp Template", detail: "WhatFlow · COD confirmation", icon: "/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg", tone: "lp-node-white" },
	{ type: "Action", title: "Add order tags", detail: "⚠ Confirmation Pending", icon: "/shopify-brand-assets/02-glyph/svg/glyph-color.svg", tone: "lp-node-white" },
];

export function FlowBuilder() {
	const [ref, step] = useScrollScene<HTMLElement>({ steps: 10 });
	// 0–2: Sidekick prompt types out; 3–7: nodes and connectors appear; 8–9 hold the result.
	const typed = prompt.slice(0, Math.round(prompt.length * Math.min(1, (step + 1) / 3)));
	const built = Math.max(0, step - 2);

	return (
		<section ref={ref} className="lp-flow" aria-labelledby="lp-flow-title">
			<div className="lp-flow-sticky">
				<div className="lp-shell lp-flow-grid">
					<div className="lp-flow-copy">
						<h2 id="lp-flow-title" className="lp-h2">Describe it. Watch it build.</h2>
						<p className="lp-lead"><b className="wf-leadin">Shopify Flow + Sidekick.</b> 9 WhatsApp triggers (button clicks, replies, media, catalog orders, opt-outs) and 8 send actions, native in Shopify Flow. Ask Sidekick to draft it, or drag the steps yourself.</p>
						<div className="lp-sidekick" aria-label={`Sidekick prompt: ${prompt}`}>
							<span className="lp-sidekick-label">Sidekick</span>
							<p aria-hidden="true">{typed}<span className="lp-caret" /></p>
						</div>
					</div>
					<ol className="lp-flow-canvas" aria-label="Shopify Flow workflow: order created, payment is cash on delivery, send WhatsApp template, add order tags">
						{nodes.map((node, index) => (
							<li key={node.title} className={`lp-node ${node.tone} ${index < built ? "is-built" : ""}`} style={{ "--i": index } as React.CSSProperties}>
								{index > 0 && <span className={`lp-wire ${index < built ? "is-built" : ""}`} aria-hidden="true" />}
								<span className="lp-node-type">{node.type}</span>
								<span className="flex items-center gap-2.5">
									{node.icon ? <Image src={node.icon} width={22} height={22} alt="" /> : <span className="lp-node-if" aria-hidden="true">if</span>}
									<b>{node.title}</b>
								</span>
								<small>{node.detail}</small>
							</li>
						))}
						<li className={`lp-flow-done ${built >= 5 ? "is-built" : ""}`} aria-hidden={built < 5}>✓ Workflow turned on</li>
					</ol>
				</div>
			</div>
		</section>
	);
}
