import type { ReactNode } from "react";
import { HorizontalGallery } from "./ScrollPrimitives";

type Card = { kicker: string; title: string; body: string; tag: string; tone: string; demo: ReactNode };

const Mini = ({ children, out = false }: { children: ReactNode; out?: boolean }) => <span className={`lp-mini ${out ? "lp-mini-out" : ""}`}>{children}</span>;
const Btns = ({ items, tapped }: { items: string[]; tapped?: number }) => (
	<span className="lp-mini-btns">{items.map((label, index) => <span key={label} className={index === tapped ? "is-tapped" : ""}>{label}</span>)}</span>
);

const cards: Card[] = [
	{
		kicker: "Order confirmation", title: "Confirm before you ship.", tone: "#C9F5DC", tag: "⚠ Confirmation Pending",
		body: "Customers confirm or cancel with one tap. Each button replies and tags the order its own way.",
		demo: <><Mini>Please confirm order #1027 for $84.00 🙏</Mini><Btns items={["Confirm Order", "Cancel Order"]} tapped={0} /></>,
	},
	{
		kicker: "Follow-ups", title: "Nudge the quiet ones.", tone: "#FFE7A3", tag: "Up to 3 reminders · 72h",
		body: "Remind customers who haven't responded, each reminder with its own tags and auto-reply.",
		demo: <><Mini>Reminder 1 · Still want order #1027?</Mini><Mini>Reminder 2 · We&apos;re holding it for you ⏳</Mini></>,
	},
	{
		kicker: "Abandoned checkout", title: "Bring carts back.", tone: "#FFD6E2", tag: "utm_source=whatsapp",
		body: "Up to three timed reminders. Each one checks the checkout is still unpaid, and they stop once the customer orders.",
		demo: <><Mini>You left something behind 🛍️ Your cart is saved.</Mini><Btns items={["Complete checkout"]} /></>,
	},
	{
		kicker: "Draft orders", title: "Close the quotes.", tone: "#D9E6FF", tag: "Stops once paid",
		body: "Send the invoice link for draft orders on WhatsApp, with reminders until the customer pays.",
		demo: <><Mini>Your custom order is ready — $320.00</Mini><Btns items={["Pay invoice"]} /></>,
	},
	{
		kicker: "Shipping Journey", title: "Every step of delivery.", tone: "#E7DBFF", tag: "11 fulfillment events",
		body: "Label printed, picked up, in transit, out for delivery, delivered — a message for each event you choose.",
		demo: <span className="lp-mini-track">{["Picked up", "In transit", "Out for delivery", "Delivered"].map((step, index) => <span key={step} style={{ "--i": index } as React.CSSProperties}>{step}</span>)}</span>,
	},
	{
		kicker: "Payment", title: "Paid? Say thanks.", tone: "#C9F5DC", tag: "💳 Payment Received",
		body: "Thank customers the moment payment lands, filtered by payment method and status.",
		demo: <Mini>Payment received for #1027 ✓ We&apos;re packing it now.</Mini>,
	},
	{
		kicker: "Back in stock", title: "Sold out isn't goodbye.", tone: "#FFE7A3", tag: "Notify me when back in stock",
		body: "A product-page button collects requests. The alert goes out on WhatsApp as soon as the variant is restocked.",
		demo: <><span className="lp-mini-store">Notify me when back in stock</span><Mini>Good news! Linen Shirt (M) is back 🎉</Mini></>,
	},
	{
		kicker: "Review requests", title: "Ask at the right time.", tone: "#FFD6E2", tag: "Works with Judge.me",
		body: "Send after delivery, only during the day, skipping orders with tags you choose.",
		demo: <><Mini>How&apos;s your Linen Shirt? ⭐ Tell us in 30 seconds.</Mini><Btns items={["Leave a review"]} /></>,
	},
	{
		kicker: "Team alerts", title: "Your team, in the loop.", tone: "#D9E6FF", tag: "Admin Notified",
		body: "Ping team numbers on WhatsApp for new orders, so nobody refreshes the admin all day.",
		demo: <Mini>🛎️ New order #1028 · $142.00 · COD · Lahore</Mini>,
	},
];

export function AutomationGallery() {
	return (
		<HorizontalGallery
			className="lp-autogallery"
			head={
				<div className="lp-gallery-head">
					<span className="lp-eyebrow">Order automations</span>
					<h2 className="lp-h2">An automation for <span className="lp-hl">every moment.</span></h2>
					<p className="lp-gallery-note">Every message tags the order in Shopify, so your team always knows where it stands.</p>
				</div>
			}
		>
			{cards.map((card) => (
				<article key={card.kicker} className="lp-acard" style={{ "--tone": card.tone } as React.CSSProperties}>
					<div className="lp-acard-demo" aria-hidden="true">{card.demo}</div>
					<span className="lp-acard-kicker">{card.kicker}</span>
					<h3>{card.title}</h3>
					<p>{card.body}</p>
					<span className="lp-acard-tag">{card.tag}</span>
				</article>
			))}
		</HorizontalGallery>
	);
}
