"use client";

import { useState } from "react";

export default function Home() {
	const [activeTab, setActiveTab] = useState<"checkout" | "flow" | "review" | "broadcast">("checkout");
	const [faqOpen, setFaqOpen] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setFaqOpen(faqOpen === index ? null : index);
	};

	return (
		<div className="min-h-screen bg-[#FCF5EB] text-[#111B21] flex flex-col font-sans">
			{/* Top Announcement Bar */}
			<div className="bg-[#075E54] text-white text-sm py-2 px-4 text-center font-medium">
				🚀 Officially integrated with Shopify Flow & Judge.me Reviews. <a href="#features" className="underline hover:opacity-90 ml-1">Learn more →</a>
			</div>

			{/* Navigation Bar */}
			<header className="sticky top-0 z-50 bg-[#FCF5EB]/90 backdrop-blur-md border-b border-[#DAD7D0]/60">
				<div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
					{/* Brand Logo */}
					<a href="#" className="flex items-center gap-3 group">
						<div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-[#111B21] border border-[#111B21] shadow-sm">
							<svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
								<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.26-1.116z"/>
							</svg>
						</div>
						<span className="text-2xl font-bold tracking-tight text-[#111B21]">WhatFlow</span>
					</a>

					{/* Nav Links */}
					<nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#111B21]">
						<a href="#features" className="hover:text-[#075E54] transition-colors">Features</a>
						<a href="#templates" className="hover:text-[#075E54] transition-colors">Templates</a>
						<a href="#integrations" className="hover:text-[#075E54] transition-colors">Integrations</a>
						<a href="#pricing" className="hover:text-[#075E54] transition-colors">Pricing</a>
						<a href="#faq" className="hover:text-[#075E54] transition-colors">FAQ</a>
					</nav>

					{/* Actions */}
					<div className="flex items-center gap-3">
						<a
							href="/admin"
							className="px-5 py-2.5 rounded-full border border-[#111B21] text-[#111B21] font-medium text-sm hover:bg-[#111B21] hover:text-white transition-all"
						>
							Admin Login
						</a>
						<a
							href="#pricing"
							className="px-5 py-2.5 rounded-full bg-[#25D366] text-[#111B21] font-medium text-sm border border-[#111B21] hover:bg-[#111B21] hover:text-white transition-all shadow-sm"
						>
							Install App
						</a>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="pt-16 pb-20 md:pt-24 md:pb-28 px-6 max-w-[1240px] mx-auto w-full">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					{/* Hero Left Content */}
					<div className="lg:col-span-7 flex flex-col items-start">
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] border border-[#25D366]/40 text-[#075E54] text-xs font-semibold uppercase tracking-wider mb-6">
							Built Exclusively For Shopify Stores
						</div>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#111B21] mb-6">
							Message your Shopify customers privately on WhatsApp.
						</h1>
						<p className="text-lg sm:text-xl text-[#3B4A54] leading-relaxed mb-8 max-w-xl font-normal">
							Recover up to 35% of abandoned checkouts, automate shipping notifications, collect Judge.me photo reviews, and send targeted segment broadcasts.
						</p>

						<div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
							<a
								href="#pricing"
								className="px-7 py-3.5 rounded-full bg-[#25D366] text-[#111B21] font-medium text-base border border-[#111B21] hover:bg-[#111B21] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
							>
								Start 14-Day Free Trial
								<span>→</span>
							</a>
							<a
								href="#templates"
								className="px-7 py-3.5 rounded-full border border-[#111B21] text-[#111B21] font-medium text-base hover:bg-[#111B21] hover:text-white transition-all flex items-center justify-center"
							>
								Explore Templates
							</a>
						</div>

						{/* Proof indicators */}
						<div className="mt-10 pt-8 border-t border-[#DAD7D0] w-full flex items-center gap-8 text-xs sm:text-sm text-[#3B4A54]">
							<div className="flex items-center gap-2">
								<span className="text-[#25D366] font-bold text-base">✓</span> Official Meta Cloud API
							</div>
							<div className="flex items-center gap-2">
								<span className="text-[#25D366] font-bold text-base">✓</span> 98% Message Open Rate
							</div>
							<div className="flex items-center gap-2">
								<span className="text-[#25D366] font-bold text-base">✓</span> Zero Code Required
							</div>
						</div>
					</div>

					{/* Hero Right Mockup */}
					<div className="lg:col-span-5 w-full">
						<div className="bg-white rounded-[32px] p-6 border border-[#DAD7D0] shadow-lg max-w-md mx-auto">
							{/* Chat header */}
							<div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DAD7D0]">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-[#075E54] text-white font-bold flex items-center justify-center text-sm">
										WF
									</div>
									<div>
										<h4 className="font-semibold text-sm text-[#111B21]">Your Store Support</h4>
										<p className="text-xs text-[#25D366] font-medium">● Verified WhatsApp Business</p>
									</div>
								</div>
								<span className="text-xs text-[#3B4A54] bg-[#FCF5EB] px-2.5 py-1 rounded-full border border-[#DAD7D0]">Official</span>
							</div>

							{/* Chat Messages Container */}
							<div className="space-y-4 text-xs sm:text-sm bg-[#FCF5EB] p-4 rounded-2xl border border-[#DAD7D0]/60">
								{/* Outgoing Message */}
								<div className="chat-bubble-outgoing p-3.5 ml-4">
									<p className="font-medium text-[#075E54] text-xs mb-1">AUTOMATED CHECKOUT RECOVERY</p>
									<p className="text-[#111B21]">Hi Alex! 👋 We noticed you left your <strong>Leather Travel Duffel</strong> in your cart.</p>
									<p className="text-[#111B21] mt-2">Complete your order now and enjoy 10% OFF with code <strong>WHAT10</strong>:</p>
									<a href="#" className="inline-block mt-2 font-semibold text-[#075E54] underline">checkout.yourstore.com/r/9x821</a>
									<span className="block text-[10px] text-right text-[#3B4A54] mt-1">10:42 AM ✓✓</span>
								</div>

								{/* Incoming Reply */}
								<div className="chat-bubble-incoming p-3.5 mr-4">
									<p className="text-[#111B21]">Awesome! Just finished ordering. Does it ship today?</p>
									<span className="block text-[10px] text-right text-[#3B4A54] mt-1">10:44 AM</span>
								</div>

								{/* Outgoing Reply */}
								<div className="chat-bubble-outgoing p-3.5 ml-4">
									<p className="text-[#111B21]">Yes! Order #2041 is packed and being dispatched. Here is your live tracking link: <span className="underline text-[#075E54]">track.whatflow.store/2041</span></p>
									<span className="block text-[10px] text-right text-[#3B4A54] mt-1">10:45 AM ✓✓</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Bar Section */}
			<section className="bg-white border-y border-[#DAD7D0] py-10 px-6">
				<div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div>
						<div className="text-3xl md:text-4xl font-semibold text-[#111B21]">98%</div>
						<div className="text-xs sm:text-sm text-[#3B4A54] mt-1">Average Open Rate</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-semibold text-[#111B21]">3.5x</div>
						<div className="text-xs sm:text-sm text-[#3B4A54] mt-1">Recovery Rate vs Email</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-semibold text-[#111B21]">1-Click</div>
						<div className="text-xs sm:text-sm text-[#3B4A54] mt-1">Shopify Flow Integration</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-semibold text-[#111B21]">&lt; 5 mins</div>
						<div className="text-xs sm:text-sm text-[#3B4A54] mt-1">Average Setup Time</div>
					</div>
				</div>
			</section>

			{/* Key Features Grid */}
			<section id="features" className="py-20 md:py-28 px-6 max-w-[1240px] mx-auto w-full">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-3xl md:text-4xl font-normal text-[#111B21] mb-4">
						Everything you need for WhatsApp eCommerce.
					</h2>
					<p className="text-base sm:text-lg text-[#3B4A54]">
						Designed explicitly for Shopify merchants who want direct, automated customer communication without complicated coding.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Feature 1 */}
					<div className="bg-white rounded-3xl p-8 border border-[#DAD7D0] flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#075E54] flex items-center justify-center font-bold text-xl mb-6">
								🛒
							</div>
							<h3 className="text-xl font-semibold text-[#111B21] mb-3">Abandoned Checkout Recovery</h3>
							<p className="text-sm text-[#3B4A54] leading-relaxed">
								Automatically trigger WhatsApp recovery messages 15 minutes after checkout abandonment. Pre-populate discount codes and direct cart links.
							</p>
						</div>
						<ul className="mt-6 pt-6 border-t border-[#DAD7D0] space-y-2 text-xs text-[#3B4A54]">
							<li>✓ Up to 3 retry follow-up sequences</li>
							<li>✓ Dynamic customer & product tokens</li>
						</ul>
					</div>

					{/* Feature 2 */}
					<div className="bg-white rounded-3xl p-8 border border-[#DAD7D0] flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#075E54] flex items-center justify-center font-bold text-xl mb-6">
								⚡
							</div>
							<h3 className="text-xl font-semibold text-[#111B21] mb-3">Shopify Flow Integration</h3>
							<p className="text-sm text-[#3B4A54] leading-relaxed">
								Native Shopify Flow action extensions. Send custom WhatsApp notifications based on order tags, customer VIP status, or stock levels.
							</p>
						</div>
						<ul className="mt-6 pt-6 border-t border-[#DAD7D0] space-y-2 text-xs text-[#3B4A54]">
							<li>✓ Native Shopify Flow action block</li>
							<li>✓ Custom event triggers & variable mappings</li>
						</ul>
					</div>

					{/* Feature 3 */}
					<div className="bg-white rounded-3xl p-8 border border-[#DAD7D0] flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#075E54] flex items-center justify-center font-bold text-xl mb-6">
								⭐
							</div>
							<h3 className="text-xl font-semibold text-[#111B21] mb-3">Judge.me Review Requests</h3>
							<p className="text-sm text-[#3B4A54] leading-relaxed">
								Collect 4x more customer reviews and photos by sending instant WhatsApp review requests synced with your Judge.me app.
							</p>
						</div>
						<ul className="mt-6 pt-6 border-t border-[#DAD7D0] space-y-2 text-xs text-[#3B4A54]">
							<li>✓ Instant Judge.me review link generation</li>
							<li>✓ Photo & video review incentive prompts</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Interactive Template Showcase */}
			<section id="templates" className="py-20 bg-white border-y border-[#DAD7D0] px-6">
				<div className="max-w-[1240px] mx-auto">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-3xl md:text-4xl font-normal text-[#111B21] mb-4">
							Meta-approved template library.
						</h2>
						<p className="text-base text-[#3B4A54]">
							Pre-tested, fully compliant WhatsApp templates ready to launch in 1 click.
						</p>

						{/* Template Tabs */}
						<div className="flex flex-wrap items-center justify-center gap-2 mt-8">
							<button
								onClick={() => setActiveTab("checkout")}
								className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
									activeTab === "checkout"
										? "bg-[#111B21] text-white border-[#111B21]"
										: "bg-[#FCF5EB] text-[#111B21] border-[#DAD7D0] hover:bg-[#DAD7D0]/50"
								}`}
							>
								Checkout Recovery
							</button>
							<button
								onClick={() => setActiveTab("flow")}
								className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
									activeTab === "flow"
										? "bg-[#111B21] text-white border-[#111B21]"
										: "bg-[#FCF5EB] text-[#111B21] border-[#DAD7D0] hover:bg-[#DAD7D0]/50"
								}`}
							>
								Shopify Flow Trigger
							</button>
							<button
								onClick={() => setActiveTab("review")}
								className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
									activeTab === "review"
										? "bg-[#111B21] text-white border-[#111B21]"
										: "bg-[#FCF5EB] text-[#111B21] border-[#DAD7D0] hover:bg-[#DAD7D0]/50"
								}`}
							>
								Judge.me Review
							</button>
							<button
								onClick={() => setActiveTab("broadcast")}
								className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
									activeTab === "broadcast"
										? "bg-[#111B21] text-white border-[#111B21]"
										: "bg-[#FCF5EB] text-[#111B21] border-[#DAD7D0] hover:bg-[#DAD7D0]/50"
								}`}
							>
								Customer Broadcast
							</button>
						</div>
					</div>

					{/* Template Display Box */}
					<div className="max-w-xl mx-auto bg-[#FCF5EB] p-6 rounded-3xl border border-[#DAD7D0]">
						{activeTab === "checkout" && (
							<div className="chat-bubble-outgoing p-4">
								<p className="text-xs font-semibold text-[#075E54] mb-1">TEMPLATE: CHECKOUT_RECOVERY_V1</p>
								<p className="text-sm text-[#111B21]">Hi {"{{1}}"}, you left items in your cart at {"{{2}}"}. Complete your order today and get {"{{3}}"} off using link below:</p>
								<div className="mt-3 p-2 bg-white/80 rounded-xl text-xs font-mono text-[#3B4A54]">
									Button: Recover Cart → {"{{checkout_url}}"}
								</div>
							</div>
						)}

						{activeTab === "flow" && (
							<div className="chat-bubble-outgoing p-4">
								<p className="text-xs font-semibold text-[#075E54] mb-1">TEMPLATE: SHOPIFY_FLOW_VIP_UPDATE</p>
								<p className="text-sm text-[#111B21]">Hello {"{{customer_name}}"}, your order #{"{{order_number}}"} qualified you for VIP status! Here is your exclusive reward code: {"{{vip_code}}"}.</p>
								<div className="mt-3 p-2 bg-white/80 rounded-xl text-xs font-mono text-[#3B4A54]">
									Button: View VIP Rewards
								</div>
							</div>
						)}

						{activeTab === "review" && (
							<div className="chat-bubble-outgoing p-4">
								<p className="text-xs font-semibold text-[#075E54] mb-1">TEMPLATE: JUDGEME_REVIEW_REQUEST</p>
								<p className="text-sm text-[#111B21]">Hi {"{{first_name}}"}! How are you enjoying your {"{{product_name}}"}? Share a quick review on Judge.me and get $5 off your next order.</p>
								<div className="mt-3 p-2 bg-white/80 rounded-xl text-xs font-mono text-[#3B4A54]">
									Button: Leave Photo Review ⭐
								</div>
							</div>
						)}

						{activeTab === "broadcast" && (
							<div className="chat-bubble-outgoing p-4">
								<p className="text-xs font-semibold text-[#075E54] mb-1">TEMPLATE: SEGMENT_BROADCAST_PROMO</p>
								<p className="text-sm text-[#111B21]">Exciting news {"{{first_name}}"}! Our new collection is live. As a valued customer, enjoy early access before it sells out.</p>
								<div className="mt-3 p-2 bg-white/80 rounded-xl text-xs font-mono text-[#3B4A54]">
									Button: Shop New Collection
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 md:py-28 px-6 max-w-[1240px] mx-auto w-full">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-3xl md:text-4xl font-normal text-[#111B21] mb-4">
						Simple, transparent pricing.
					</h2>
					<p className="text-base text-[#3B4A54]">
						No hidden fees. Start with a 14-day free trial on any plan.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Starter Plan */}
					<div className="bg-white rounded-3xl p-8 border border-[#DAD7D0] flex flex-col justify-between">
						<div>
							<h3 className="text-xl font-semibold text-[#111B21]">Starter</h3>
							<p className="text-xs text-[#3B4A54] mt-1">For growing stores getting started with WhatsApp.</p>
							<div className="my-6">
								<span className="text-4xl font-bold text-[#111B21]">$19</span>
								<span className="text-sm text-[#3B4A54]"> / month</span>
							</div>
							<ul className="space-y-3 text-xs sm:text-sm text-[#3B4A54]">
								<li>✓ 500 Recovered Checkouts / mo</li>
								<li>✓ Standard Templates</li>
								<li>✓ Shipping Notifications</li>
								<li>✓ Basic Analytics</li>
							</ul>
						</div>
						<a
							href="#"
							className="mt-8 w-full py-3 rounded-full text-center text-sm font-medium border border-[#111B21] text-[#111B21] hover:bg-[#111B21] hover:text-white transition-all"
						>
							Start Free Trial
						</a>
					</div>

					{/* Pro Plan */}
					<div className="bg-white rounded-3xl p-8 border-2 border-[#25D366] relative flex flex-col justify-between shadow-md">
						<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#25D366] text-[#111B21] font-bold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider">
							Most Popular
						</div>
						<div>
							<h3 className="text-xl font-semibold text-[#111B21]">Growth</h3>
							<p className="text-xs text-[#3B4A54] mt-1">For established brands scaling revenue.</p>
							<div className="my-6">
								<span className="text-4xl font-bold text-[#111B21]">$49</span>
								<span className="text-sm text-[#3B4A54]"> / month</span>
							</div>
							<ul className="space-y-3 text-xs sm:text-sm text-[#3B4A54]">
								<li>✓ 2,500 Recovered Checkouts / mo</li>
								<li>✓ Shopify Flow Native Actions</li>
								<li>✓ Judge.me Review Automation</li>
								<li>✓ Customer Segment Broadcasts</li>
								<li>✓ Custom Meta Templates</li>
							</ul>
						</div>
						<a
							href="#"
							className="mt-8 w-full py-3 rounded-full text-center text-sm font-medium bg-[#25D366] text-[#111B21] border border-[#111B21] hover:bg-[#111B21] hover:text-white transition-all"
						>
							Start Free Trial
						</a>
					</div>

					{/* Enterprise Plan */}
					<div className="bg-white rounded-3xl p-8 border border-[#DAD7D0] flex flex-col justify-between">
						<div>
							<h3 className="text-xl font-semibold text-[#111B21]">Scale</h3>
							<p className="text-xs text-[#3B4A54] mt-1">For high volume Shopify Plus merchants.</p>
							<div className="my-6">
								<span className="text-4xl font-bold text-[#111B21]">$129</span>
								<span className="text-sm text-[#3B4A54]"> / month</span>
							</div>
							<ul className="space-y-3 text-xs sm:text-sm text-[#3B4A54]">
								<li>✓ Unlimited Messages & Recoveries</li>
								<li>✓ Dedicated WhatsApp Account Manager</li>
								<li>✓ Priority Meta Template Approvals</li>
								<li>✓ Custom Webhook & API Integrations</li>
							</ul>
						</div>
						<a
							href="#"
							className="mt-8 w-full py-3 rounded-full text-center text-sm font-medium border border-[#111B21] text-[#111B21] hover:bg-[#111B21] hover:text-white transition-all"
						>
							Contact Sales
						</a>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-20 bg-white border-t border-[#DAD7D0] px-6">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl font-normal text-center text-[#111B21] mb-12">
						Frequently Asked Questions
					</h2>

					<div className="space-y-4">
						{[
							{
								q: "Do I need an official Meta WhatsApp Business account?",
								a: "Yes. WhatFlow connects directly to the official Meta Cloud API to ensure 99.9% deliverability and zero phone number ban risks."
							},
							{
								q: "How does abandoned checkout recovery work?",
								a: "When a customer enters their phone number at checkout and leaves without completing the purchase, WhatFlow automatically triggers a WhatsApp recovery message after a customizable delay."
							},
							{
								q: "Does this integrate with Shopify Flow?",
								a: "Yes! WhatFlow includes native Shopify Flow action blocks so you can trigger WhatsApp messages for any custom workflow or event."
							},
							{
								q: "How does Judge.me review integration work?",
								a: "After an order is delivered, WhatFlow sends a friendly WhatsApp message containing a direct Judge.me review link allowing customers to submit reviews and photos in seconds."
							}
						].map((item, idx) => (
							<div key={idx} className="border border-[#DAD7D0] rounded-2xl overflow-hidden bg-[#FCF5EB]">
								<button
									onClick={() => toggleFaq(idx)}
									className="w-full text-left p-5 font-semibold text-base text-[#111B21] flex justify-between items-center"
								>
									<span>{item.q}</span>
									<span className="text-xl font-bold">{faqOpen === idx ? "−" : "+"}</span>
								</button>
								{faqOpen === idx && (
									<div className="px-5 pb-5 text-sm text-[#3B4A54] border-t border-[#DAD7D0]/60 pt-3">
										{item.a}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Banner */}
			<section className="bg-[#075E54] text-white py-16 px-6 text-center">
				<div className="max-w-2xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-normal mb-4">Ready to boost your Shopify revenue?</h2>
					<p className="text-white/80 text-base mb-8">Install WhatFlow today and start recovering checkouts within minutes.</p>
					<a
						href="#pricing"
						className="inline-block px-8 py-3.5 rounded-full bg-[#25D366] text-[#111B21] font-medium text-base border border-[#111B21] hover:bg-white transition-all shadow-sm"
					>
						Get Started For Free
					</a>
				</div>
			</section>

			{/* Dark Ink Footer */}
			<footer className="bg-[#111B21] text-white pt-16 pb-12 px-6 border-t border-[#111B21]">
				<div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
					<div>
						<h4 className="font-semibold text-base mb-4 text-[#25D366]">WhatFlow</h4>
						<p className="text-xs text-[#DAD7D0] leading-relaxed">
							Automated WhatsApp marketing and checkout recovery platform for Shopify stores.
						</p>
					</div>

					<div>
						<h4 className="font-semibold text-sm mb-4 text-white">Product</h4>
						<ul className="space-y-2.5 text-xs text-[#DAD7D0]">
							<li><a href="#features" className="hover:text-[#25D366]">Checkout Recovery</a></li>
							<li><a href="#features" className="hover:text-[#25D366]">Shopify Flow</a></li>
							<li><a href="#features" className="hover:text-[#25D366]">Judge.me Reviews</a></li>
							<li><a href="#templates" className="hover:text-[#25D366]">Meta Templates</a></li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-sm mb-4 text-white">Integrations</h4>
						<ul className="space-y-2.5 text-xs text-[#DAD7D0]">
							<li><a href="#" className="hover:text-[#25D366]">Shopify Admin</a></li>
							<li><a href="#" className="hover:text-[#25D366]">Shopify Flow</a></li>
							<li><a href="#" className="hover:text-[#25D366]">Judge.me Product Reviews</a></li>
							<li><a href="#" className="hover:text-[#25D366]">Meta WhatsApp Cloud API</a></li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold text-sm mb-4 text-white">Support</h4>
						<ul className="space-y-2.5 text-xs text-[#DAD7D0]">
							<li><a href="#faq" className="hover:text-[#25D366]">Help Center & FAQ</a></li>
							<li><a href="/admin" className="hover:text-[#25D366]">Payload Admin Panel</a></li>
							<li><a href="#" className="hover:text-[#25D366]">Privacy Policy</a></li>
							<li><a href="#" className="hover:text-[#25D366]">Terms of Service</a></li>
						</ul>
					</div>
				</div>

				<div className="max-w-[1240px] mx-auto pt-8 border-t border-white/10 text-center text-xs text-[#DAD7D0]">
					© {new Date().getFullYear()} WhatFlow. All rights reserved. Powered by Cloudflare Workers & Payload CMS.
				</div>
			</footer>
		</div>
	);
}
