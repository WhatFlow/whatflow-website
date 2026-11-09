"use client";

import { Phone } from "./Phone";
import { useScrollScene } from "./useScrollScene";

const replyTypes = ["Text", "Image", "Video", "Voice note", "Document", "Sticker", "Location", "Contact card", "Emoji reaction", "Text with buttons", "Menu list", "Catalog product", "Product list", "CTA link", "WhatsApp Flow", "Call permission"];

const scenes = [
	{ match: "Contains", keyword: "where's my order", type: "Text with buttons", ask: "hey where's my order??" },
	{ match: "Any of these words", keyword: "menu, help, hi", type: "Menu list", ask: "hi 👋" },
	{ match: "Contains", keyword: "linen", type: "Product list", ask: "do you have more linen stuff" },
	{ match: "Message is exactly", keyword: "talk to a person", type: "Text", ask: "talk to a person" },
];

function Reply({ step }: { step: number }) {
	if (step === 0) {
		return (
			<div className="lp-ar-reply">
				<p>Order #1027 is out for delivery 🚚 It should arrive by 6 pm today.</p>
				<span className="lp-ar-btn">Track package</span>
				<span className="lp-ar-btn">Talk to a person</span>
			</div>
		);
	}
	if (step === 1) {
		return (
			<div className="lp-ar-reply">
				<p>Hi! 👋 How can we help you today?</p>
				<span className="lp-ar-btn">☰ View options</span>
				<div className="lp-ar-sheet">
					{["Track my order", "Returns and exchanges", "Opening hours", "Payment options"].map((row, index) => (
						<span key={row} style={{ "--i": index } as React.CSSProperties}>{row}<i /></span>
					))}
				</div>
			</div>
		);
	}
	if (step === 2) {
		return (
			<div className="lp-ar-reply lp-ar-wide">
				<p>Here&apos;s our linen edit 🌿</p>
				<div className="lp-ar-products">
					{[["👕", "Linen Shirt", "$48"], ["👖", "Linen Pants", "$62"], ["🧺", "Linen Tote", "$24"]].map(([emoji, name, price], index) => (
						<span key={name} style={{ "--i": index } as React.CSSProperties}><b>{emoji}</b>{name}<small>{price}</small></span>
					))}
				</div>
				<span className="lp-ar-btn">View items</span>
			</div>
		);
	}
	return (
		<div className="lp-ar-reply">
			<p>Connecting you with our team 🙋 Someone will reply here shortly.</p>
			<span className="lp-ar-handoff">→ Sent to Live Inbox · Needs reply</span>
		</div>
	);
}

export function AutoReplies() {
	const [ref, step] = useScrollScene<HTMLElement>({ steps: scenes.length });
	const scene = scenes[step];

	return (
		<section ref={ref} className="lp-ar" aria-labelledby="lp-ar-title">
			<div className="lp-ar-sticky">
				<div className="lp-shell lp-ar-grid">
					<div className="lp-ar-copy">
						<span className="lp-eyebrow">Auto-replies</span>
						<h2 id="lp-ar-title" className="lp-h2">Answers itself. <span className="lp-hl">Even at 3 a.m.</span></h2>
						<p className="lp-lead">Match keywords, exact phrases or patterns, then reply with any of 16 message types, from menus to your product catalog.</p>
						<div className="lp-ar-rule" key={step}>
							<div><small>When the message</small><b>{scene.match.toLowerCase()}</b><code>{scene.keyword}</code></div>
							<span aria-hidden="true">→</span>
							<div><small>Reply with</small><b>{scene.type}</b></div>
						</div>
						<ul className="lp-ar-types" aria-label="Reply types">
							{replyTypes.map((type) => <li key={type} className={type === scene.type ? "is-on" : ""}>{type}</li>)}
						</ul>
					</div>
					<div className="lp-ar-stage">
						<Phone className="lp-ar-phone" label="Automatic WhatsApp replies: order status with buttons, a menu list, a product list from the catalog, and a handoff to the team">
							<div className="lp-ar-convo" key={step}>
								<span className="lp-ar-ask">{scene.ask}</span>
								<Reply step={step} />
							</div>
						</Phone>
						<span className="lp-ar-badge" aria-hidden="true">⚡ Auto-reply</span>
					</div>
				</div>
			</div>
		</section>
	);
}
