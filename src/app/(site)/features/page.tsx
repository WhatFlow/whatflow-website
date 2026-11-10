import type { Metadata } from "next";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { PageHero } from "@/components/site/PageKit";
import { Bubble, Phone, type ChatMessage } from "@/components/landing/Phone";
import { AutomationGallery } from "@/components/landing/AutomationGallery";
import { AutoReplies } from "@/components/landing/AutoReplies";
import { InboxZoom } from "@/components/landing/InboxZoom";
import { AnalyticsChapter } from "@/components/landing/AnalyticsChapter";
import { FlowBuilder } from "@/components/landing/FlowBuilder";
import { ShopifyStack } from "@/components/landing/ShopifyStack";
import { AiSection } from "@/components/landing/AiSection";
import { Bento } from "@/components/landing/Bento";
import { Proof } from "@/components/landing/Proof";
import { FeatureNav } from "@/components/features/FeatureNav";
import { RecoveryTimeline } from "@/components/features/RecoveryTimeline";
import { ShippingStepper } from "@/components/features/ShippingStepper";
import { BroadcastShowcase } from "@/components/features/BroadcastShowcase";
import "@/components/landing/landing.css";
import "@/components/landing/primitives.css";
import "@/components/landing/sections.css";
import "@/components/features/features.css";

export const metadata: Metadata = {
	alternates: { canonical: "/features" },
	title: "WhatFlow Features — 11+ Automations, 2-Way Inbox & Shopify Functions",
	description:
		"Explore WhatFlow's full suite: 6 core order automations, 3-stage cart recovery, 11-step shipping alerts, Shopify Functions COD engine, 2-way live chat, and native Shopify Flow triggers.",
	keywords: [
		"WhatsApp Shopify features",
		"abandoned cart WhatsApp sequence",
		"Shopify COD verification WhatsApp",
		"Shopify Functions COD fee",
		"WhatsApp shipping notifications 11 statuses",
		"Shopify Flow WhatsApp action block",
		"WhatsApp 2-way chat inbox Shopify",
		"Meta Cloud API WhatsApp Shopify",
	],
};

const heroChat: ChatMessage[] = [
	{ id: "f1", from: "store", time: "18:20", text: "Thanks for your order! Please confirm COD order #1027 for $84.00.", buttons: ["Confirm Order", "Cancel Order"], tapped: 0 },
	{ id: "f2", from: "customer", time: "18:21", text: "Confirm Order" },
	{ id: "f3", from: "store", time: "Tue 11:05", text: "📦 #1027 is out for delivery today!", buttons: ["Track package"] },
];

export default function FeaturesPage() {
	return (
		<div className="lp wf-features">
			<PageHero
				kicker="Features"
				title="Everything your store says, on WhatsApp."
				accent={["WhatsApp"]}
				sub={<p>Order automations, recovery, shipping updates, auto-replies, broadcasts and a team inbox, built on Meta&apos;s official Cloud API and wired into Shopify.</p>}
				actions={
					<>
						<a href={getShopifyAppUrl("features_hero")} target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-green">Install on Shopify</a>
						<Link href="/pricing" className="wf-btn wf-btn-ghost">See pricing</Link>
					</>
				}
				meta={<><span>Every feature on every plan</span><span>No inbox seat fees</span><span>Official Meta Cloud API</span></>}
			>
				<div className="wf-features-hero-phone">
					<Phone label="A COD confirmation on WhatsApp, the customer confirming, and a shipping update">
						{heroChat.map((message) => <Bubble key={message.id} message={message} />)}
					</Phone>
					<span className="wf-features-chip wf-features-chip-a" aria-hidden="true">✓ Order Confirmed</span>
					<span className="wf-features-chip wf-features-chip-b" aria-hidden="true">Out for delivery</span>
				</div>
			</PageHero>
			<FeatureNav />
			<div id="automations"><AutomationGallery /></div>
			<div id="recovery"><RecoveryTimeline /></div>
			<div id="shipping"><ShippingStepper /></div>
			<div id="auto-replies"><AutoReplies /></div>
			<div id="broadcasts"><BroadcastShowcase /></div>
			<div id="inbox"><InboxZoom /></div>
			<div id="analytics"><AnalyticsChapter /></div>
			<div id="flow"><FlowBuilder /></div>
			<div id="shopify"><ShopifyStack /></div>
			<div id="ai"><AiSection /></div>
			<Bento />
			<Proof />
		</div>
	);
}
