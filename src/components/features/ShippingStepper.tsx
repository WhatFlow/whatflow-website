"use client";

import { Phone } from "@/components/landing/Phone";
import { useScrollScene } from "@/components/landing/useScrollScene";

const events = [
	{ name: "Label purchased", text: "Your order #1027 has a shipping label. It's getting packed now." },
	{ name: "Label printed", text: "Label printed for #1027. Almost ready to go." },
	{ name: "Shipment confirmed", text: "#1027 has shipped! We'll keep you posted here." },
	{ name: "Carrier picked up", text: "The carrier just picked up #1027." },
	{ name: "In transit", text: "#1027 is on its way to you." },
	{ name: "Out for delivery", text: "#1027 is out for delivery today. Keep your phone close!" },
	{ name: "Ready for pickup", text: "#1027 is ready to collect from the pickup point." },
	{ name: "Delivered", text: "Delivered! Enjoy your Linen Shirt 💚" },
	{ name: "Attempted delivery", text: "We missed you. The carrier will try #1027 again." },
	{ name: "Delayed", text: "Heads up: #1027 is running a little late. Sorry about that!" },
	{ name: "Failure", text: "There's a problem delivering #1027. Reply here and we'll sort it out." },
];

export function ShippingStepper() {
	const [ref, step] = useScrollScene<HTMLElement>({ steps: events.length, offset: 126 });
	const event = events[step];
	return (
		<section ref={ref} className="wf-ship" aria-labelledby="wf-ship-title">
			<div className="wf-ship-sticky">
				<div className="wf-shell wf-ship-grid">
					<div>
						<h2 id="wf-ship-title" className="wf-h2">Every step of delivery, on WhatsApp.</h2>
						<p className="wf-lead wf-ship-lead"><b className="wf-leadin">Shipping Journey.</b> One message per Shopify fulfillment event. Turn on the ones you want, each with its own template and tracking link.</p>
						<ol className="wf-ship-list" aria-label="Fulfillment events">
							{events.map((item, index) => (
								<li key={item.name} data-state={index < step ? "done" : index === step ? "now" : "next"}>
									{item.name}
								</li>
							))}
						</ol>
					</div>
					<div className="wf-ship-stage lp">
						<Phone className="wf-ship-phone" label={`WhatsApp shipping update: ${event.name}`}>
							<div className="wf-ship-msg" key={step}>
								<span className="wf-ship-event">{event.name}</span>
								<p>{event.text}</p>
								<span className="wf-ship-btn">Track package</span>
							</div>
						</Phone>
						<span className="wf-ship-count" aria-hidden="true">{String(step + 1).padStart(2, "0")}<small>/11</small></span>
					</div>
				</div>
			</div>
		</section>
	);
}
