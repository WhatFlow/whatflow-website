"use client";

import { useState } from "react";

export default function Home() {
	const [activeTab, setActiveTab] = useState<"cart" | "reviews" | "flow" | "broadcast">("cart");
	const [faqOpen, setFaqOpen] = useState<number | null>(0);

	const workflows = {
		cart: {
			title: "Abandoned Checkout Recovery",
			subtitle: "Automatically message shoppers 15 minutes after abandoning their cart with dynamic discount links.",
			badge: "High Conversion",
			sender: "WhatFlow Bot",
			time: "10:14 AM",
			message: "Hi Sarah! 👋 We noticed you left some items in your cart at TrendStore.\n\nHere is an exclusive 10% OFF discount link to complete your order:",
			cartDetails: {
				items: "2 items (Wireless Headphones, Leather Case)",
				total: "$129.00",
				discount: "SAVE10 Applied",
			},
			buttonText: "⚡ Complete Purchase ($116.10)",
			stat: "+42% Recovery Rate",
		},
		reviews: {
			title: "Judge.me Review Requests",
			subtitle: "Trigger photo review requests automatically when Shopify marks an order as delivered.",
			badge: "Shopify Flow Built-in",
			sender: "TrendStore Support",
			time: "02:30 PM",
			message: "Hi Alex! 📦 Your order #1042 was delivered today! How do you like your new gear?\n\nReply directly with a photo or click below to leave a quick 5-star review on Judge.me!",
			cartDetails: {
				items: "Order #1042 - Premium Sneakers",
				total: "Delivered today",
				discount: "+100 Reward Points",
			},
			buttonText: "⭐ Leave a 5-Star Review",
			stat: "3.8x More Photo Reviews",
		},
		flow: {
			title: "Shopify Flow Triggers",
			subtitle: "Use Shopify Flow action extensions to send targeted WhatsApp messages on any store event.",
			badge: "Native Integration",
			sender: "WhatFlow Automation",
			time: "05:45 PM",
			message: "⚡ Shopify Flow Trigger Executed!\n\nCondition: Customer VIP Tag Added\nAction: Send VIP Welcome Kit & WhatsApp Concierge Link.",
			cartDetails: {
				items: "Trigger: customer/tagged",
				total: "VIP Gold Tier",
				discount: "Exclusive Access",
			},
			buttonText: "💬 Connect with VIP Concierge",
			stat: "Zero-code Workflow Builder",
		},
		broadcast: {
			title: "Customer Segment Broadcasts",
			subtitle: "Launch personalized promotional campaigns directly to your Shopify customer segments.",
			badge: "Mass Reach",
			sender: "TrendStore Deals",
			time: "09:00 AM",
			message: "🎉 FLASH SALE! As a valued VIP member, enjoy early access to our Summer Collection with 25% OFF for the next 24 hours!",
			cartDetails: {
				items: "Segment: Spent > $200 (1,450 customers)",
				total: "Promo: SUMMER25",
				discount: "25% OFF",
			},
			buttonText: "🛍️ Shop VIP Summer Sale",
			stat: "98% Instant Open Rate",
		},
	};

	const currentWorkflow = workflows[activeTab];

	const faqs = [
		{
			q: "How does WhatFlow connect with my Shopify store?",
			a: "WhatFlow seamlessly integrates with your Shopify store in one click. It connects to your Shopify webhooks and Shopify Flow extensions to listen for checkouts, order updates, and customer tags in real time.",
		},
		{
			q: "Do I need a Meta WhatsApp Business API account?",
			a: "WhatFlow handles the Meta API setup for you! You can use our pre-verified WhatsApp sender lines or easily connect your existing Meta WhatsApp Business Phone Number.",
		},
		{
			q: "How does the Payload CMS integration work?",
			a: "Payload CMS is built into WhatFlow to give your team a flexible content management system for landing pages, promotional assets, and broadcast templates stored on Cloudflare D1 & R2.",
		},
		{
			q: "Can I customize message templates and variables?",
			a: "Yes! You can customize every template with dynamic variables such as {customer.first_name}, {checkout_url}, {order.name}, and discount codes.",
		},
		{
			q: "How does Judge.me review collection work?",
			a: "When an order is delivered, WhatFlow sends an interactive WhatsApp template with a direct button link to your Judge.me review form, allowing customers to easily leave text and photo reviews.",
		},
	];

	return (
		<div className="min-h-screen bg-[#090d16] text-gray-100 flex flex-col font-sans relative overflow-hidden">
			{/* Ambient background glows */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent blur-[120px] pointer-events-none rounded-full animate-pulse-glow" />
			<div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

			{/* Navigation Header */}
			<header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/80 border-b border-gray-800/60 transition-all">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl whatsapp-gradient flex items-center justify-center shadow-lg shadow-emerald-500/20 font-bold text-black text-xl tracking-wider">
							W
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
								WhatFlow
								<span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
									Shopify App
								</span>
							</span>
							<span className="text-xs text-gray-400 hidden sm:inline">Automated WhatsApp Marketing</span>
						</div>
					</div>

					<nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
						<a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
						<a href="#workflows" className="hover:text-emerald-400 transition-colors">Workflows</a>
						<a href="#cms" className="hover:text-emerald-400 transition-colors">Payload CMS</a>
						<a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
						<a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
					</nav>

					<div className="flex items-center gap-3">
						<a
							href="/admin"
							className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800/80 hover:bg-gray-800 border border-gray-700/60 rounded-lg transition-all flex items-center gap-1.5"
						>
							<svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							Payload Admin
						</a>

						<a
							href="#pricing"
							className="px-4 py-2 text-xs font-semibold text-black whatsapp-gradient rounded-lg shadow-md shadow-emerald-500/20 hover:brightness-110 transition-all active:scale-95 flex items-center gap-1.5"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
							</svg>
							Start Free Trial
						</a>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative pt-16 pb-20 md:pt-24 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
					<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
						<span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
						<span>WhatsApp Automation for Shopify & Judge.me</span>
					</div>

					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
						Turn Abandoned Carts into <span className="whatsapp-text-gradient">Instant Sales</span> on WhatsApp
					</h1>

					<p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
						Automate abandoned checkout recovery, Judge.me photo review requests, customer broadcasts, and custom Shopify Flow triggers with real-time WhatsApp messaging.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
						<a
							href="#workflows"
							className="w-full sm:w-auto px-8 py-4 text-base font-bold text-black whatsapp-gradient rounded-xl shadow-xl shadow-emerald-500/25 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2"
						>
							See Live Workflows
							<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</a>

						<a
							href="/admin"
							className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-200 bg-gray-800/80 hover:bg-gray-800 border border-gray-700/80 rounded-xl transition-all flex items-center justify-center gap-2"
						>
							<svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
							Payload CMS Backend
						</a>
					</div>

					<div className="flex items-center gap-6 pt-4 text-xs text-gray-400 font-medium">
						<span className="flex items-center gap-1.5">
							<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							No credit card required
						</span>
						<span className="flex items-center gap-1.5">
							<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							Official Shopify Partner
						</span>
						<span className="flex items-center gap-1.5 hidden sm:flex">
							<svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
							2-Minute Setup
						</span>
					</div>
				</div>

				{/* Interactive Hero Visual */}
				<div className="mt-16 relative max-w-4xl mx-auto">
					<div className="glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-800/80 relative overflow-hidden">
						<div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6">
							<div className="flex items-center gap-3">
								<div className="w-3 h-3 rounded-full bg-red-500/80" />
								<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
								<div className="w-3 h-3 rounded-full bg-green-500/80" />
								<span className="text-xs font-mono text-gray-400 ml-2">WhatFlow Engine • Active Session</span>
							</div>
							<div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
								Live Event Triggered
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
							<div className="space-y-4">
								<div className="inline-block px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 text-xs font-mono">
									Shopify Event: checkouts/create
								</div>
								<h3 className="text-xl font-bold text-white">Cart Abandoned by Sarah M.</h3>
								<p className="text-sm text-gray-300">
									WhatFlow automatically generated a short URL with an applied 10% discount code and dispatched a WhatsApp message via Cloudflare Workers.
								</p>

								<div className="pt-2 space-y-2 text-xs">
									<div className="flex justify-between py-1.5 border-b border-gray-800">
										<span className="text-gray-400">Response Time:</span>
										<span className="font-mono text-emerald-400 font-bold">142ms</span>
									</div>
									<div className="flex justify-between py-1.5 border-b border-gray-800">
										<span className="text-gray-400">Short Link ID:</span>
										<span className="font-mono text-gray-200">wf.link/s8x92</span>
									</div>
									<div className="flex justify-between py-1.5">
										<span className="text-gray-400">Status:</span>
										<span className="text-emerald-400 font-semibold flex items-center gap-1">
											✓ Delivered to WhatsApp
										</span>
									</div>
								</div>
							</div>

							{/* WhatsApp Phone Mockup */}
							<div className="bg-[#0b141a] rounded-xl p-4 border border-gray-800 shadow-inner flex flex-col justify-between min-h-[300px]">
								<div className="flex items-center gap-3 pb-3 border-b border-gray-800 text-xs text-gray-300">
									<div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
										W
									</div>
									<div>
										<div className="font-semibold text-white">WhatFlow Recovery</div>
										<div className="text-[10px] text-emerald-400">Official Business Account</div>
									</div>
								</div>

								<div className="my-4 space-y-3">
									<div className="bg-[#1f2c34] rounded-lg p-3 text-xs text-gray-200 shadow-sm border-l-4 border-emerald-500">
										<div className="font-bold text-emerald-400 mb-1">TrendStore Notification</div>
										<p>Hi Sarah! 👋 Your Wireless Headphones are waiting in your cart.</p>
										<p className="mt-1 text-gray-300">Complete purchase now & get 10% off automatically!</p>

										<div className="mt-3 pt-2 border-t border-gray-700/60 flex items-center justify-between text-[11px]">
											<span className="text-gray-400">Order Total: $116.10</span>
											<span className="text-emerald-400 font-mono font-bold">SAVE10</span>
										</div>

										<div className="mt-3 bg-emerald-500 hover:bg-emerald-400 text-black text-center font-bold py-2 rounded-md transition-colors cursor-pointer text-xs">
											⚡ Complete Purchase ($116.10)
										</div>
									</div>
								</div>

								<div className="text-[10px] text-gray-400 text-right">10:14 AM • Read ✓✓</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Bar */}
			<section className="border-y border-gray-800/80 bg-gray-900/40 backdrop-blur-md py-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div>
						<div className="text-3xl sm:text-4xl font-extrabold text-white font-mono whatsapp-text-gradient">98%</div>
						<div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Average Open Rate</div>
					</div>
					<div>
						<div className="text-3xl sm:text-4xl font-extrabold text-white font-mono whatsapp-text-gradient">45%</div>
						<div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">Cart Recovery Rate</div>
					</div>
					<div>
						<div className="text-3xl sm:text-4xl font-extrabold text-white font-mono whatsapp-text-gradient">3.8x</div>
						<div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">More Photo Reviews</div>
					</div>
					<div>
						<div className="text-3xl sm:text-4xl font-extrabold text-white font-mono whatsapp-text-gradient">&lt; 2 min</div>
						<div className="text-xs sm:text-sm text-gray-400 font-medium mt-1">One-Click Setup</div>
					</div>
				</div>
			</section>

			{/* Features Bento Grid */}
			<section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
						Built for Modern E-Commerce Growth
					</h2>
					<p className="text-gray-400 text-base sm:text-lg">
						Everything you need to automate customer conversations, drive repeat sales, and leverage Shopify data on WhatsApp.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1 */}
					<div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between md:col-span-2">
						<div>
							<div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Automated Abandoned Cart Recovery</h3>
							<p className="text-gray-400 text-sm leading-relaxed mb-4">
								Send timely WhatsApp checkout reminders with pre-filled cart links and dynamic discount codes. Turn lost visitors into paying customers automatically.
							</p>
						</div>
						<div className="bg-gray-950/60 rounded-xl p-4 border border-gray-800 text-xs font-mono text-gray-300 flex items-center justify-between">
							<span>⚡ Average Recovery Time: <strong className="text-emerald-400">15 mins</strong></span>
							<span className="text-gray-500">Shopify Webhook</span>
						</div>
					</div>

					{/* Card 2 */}
					<div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Shopify Flow Integration</h3>
							<p className="text-gray-400 text-sm leading-relaxed mb-4">
								Trigger custom WhatsApp template messages from any native Shopify Flow condition—order updates, VIP tags, back-in-stock, or custom customer events.
							</p>
						</div>
						<div className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
							<span>Native Flow Action</span> →
						</div>
					</div>

					{/* Card 3 */}
					<div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
						<div>
							<div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Judge.me Review Requests</h3>
							<p className="text-gray-400 text-sm leading-relaxed mb-4">
								Automate post-delivery review requests with direct links to your Judge.me store widget. Boost user-generated content and authentic photo reviews.
							</p>
						</div>
						<div className="text-xs font-mono text-yellow-400 flex items-center gap-1 font-semibold">
							<span>Judge.me Integration</span> →
						</div>
					</div>

					{/* Card 4 */}
					<div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between md:col-span-2">
						<div>
							<div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
								<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-white mb-2">Targeted Segment Broadcasts</h3>
							<p className="text-gray-400 text-sm leading-relaxed mb-4">
								Run high-ROI WhatsApp broadcast marketing campaigns directly targeted to your Shopify customer segments. Broadcast special VIP discounts, seasonal sales, and new arrivals.
							</p>
						</div>
						<div className="bg-gray-950/60 rounded-xl p-4 border border-gray-800 text-xs font-mono text-gray-300 flex items-center justify-between">
							<span>🎯 Open Rate: <strong className="text-purple-400">98%</strong></span>
							<span>Click Rate: <strong className="text-purple-400">35%</strong></span>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Workflow Simulator */}
			<section id="workflows" className="py-20 bg-gray-900/30 border-y border-gray-800/60">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
							Interactive Simulator
						</div>
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
							Experience WhatFlow Workflows in Action
						</h2>
						<p className="text-gray-400 text-base">
							Select a scenario below to preview live WhatsApp messaging templates and automated triggers.
						</p>
					</div>

					{/* Tab Navigation */}
					<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
						{(["cart", "reviews", "flow", "broadcast"] as const).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
									activeTab === tab
										? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105"
										: "bg-gray-800/80 text-gray-300 hover:bg-gray-800 border border-gray-700/60"
								}`}
							>
								{tab === "cart" && "🛒 Abandoned Cart"}
								{tab === "reviews" && "⭐ Judge.me Reviews"}
								{tab === "flow" && "⚡ Shopify Flow"}
								{tab === "broadcast" && "📢 Customer Broadcast"}
							</button>
						))}
					</div>

					{/* Active Tab Preview */}
					<div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-10 border border-gray-800">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
									{currentWorkflow.badge}
								</div>
								<h3 className="text-2xl font-bold text-white">{currentWorkflow.title}</h3>
								<p className="text-sm text-gray-300 leading-relaxed">
									{currentWorkflow.subtitle}
								</p>

								<div className="pt-4 border-t border-gray-800 space-y-3">
									<div className="flex items-center justify-between text-xs text-gray-400">
										<span>Target Performance:</span>
										<span className="font-semibold text-emerald-400 font-mono">{currentWorkflow.stat}</span>
									</div>
									<div className="flex items-center justify-between text-xs text-gray-400">
										<span>Integration Type:</span>
										<span className="font-semibold text-gray-200">Shopify Webhooks & Payload CMS</span>
									</div>
								</div>
							</div>

							{/* WhatsApp Chat Simulation Card */}
							<div className="bg-[#0b141a] rounded-xl p-5 border border-gray-800 shadow-2xl flex flex-col justify-between min-h-[320px]">
								<div className="flex items-center justify-between pb-3 border-b border-gray-800/80">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-extrabold text-xs">
											WF
										</div>
										<div>
											<div className="text-xs font-bold text-white">{currentWorkflow.sender}</div>
											<div className="text-[10px] text-emerald-400">Verified Shopify Automation</div>
										</div>
									</div>
									<span className="text-[10px] text-gray-500 font-mono">{currentWorkflow.time}</span>
								</div>

								<div className="my-4 bg-[#1f2c34] rounded-xl p-4 text-xs text-gray-200 space-y-3 border-l-4 border-emerald-500 shadow-md">
									<p className="whitespace-pre-line text-gray-100 font-sans leading-relaxed">
										{currentWorkflow.message}
									</p>

									<div className="bg-black/30 rounded-lg p-2.5 border border-gray-700/50 space-y-1 text-[11px]">
										<div className="text-gray-400">{currentWorkflow.cartDetails.items}</div>
										<div className="flex justify-between font-bold text-gray-200">
											<span>{currentWorkflow.cartDetails.total}</span>
											<span className="text-emerald-400">{currentWorkflow.cartDetails.discount}</span>
										</div>
									</div>

									<div className="bg-emerald-500 hover:bg-emerald-400 text-black text-center font-bold py-2.5 rounded-lg transition-colors cursor-pointer text-xs shadow-md">
										{currentWorkflow.buttonText}
									</div>
								</div>

								<div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
									<span>Encryption: Meta API End-to-End</span>
									<span>Delivered ✓✓</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Payload CMS Integration Section */}
			<section id="cms" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/20 relative overflow-hidden">
					<div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
						<div className="space-y-6">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
								Powered by Payload CMS 3.0
							</div>

							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
								Headless Content & Media Management Built Right In
							</h2>

							<p className="text-gray-300 text-base leading-relaxed">
								WhatFlow includes Payload CMS hosted natively on Cloudflare D1 SQLite database & R2 Object Storage. Easily edit promotional media assets, broadcast content, and template text without developer intervention.
							</p>

							<ul className="space-y-3 text-sm text-gray-300">
								<li className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
									<span>Cloudflare D1 & R2 native storage architecture</span>
								</li>
								<li className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
									<span>Custom collections for Media & WhatsApp Templates</span>
								</li>
								<li className="flex items-center gap-3">
									<div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
									<span>Instant CMS Admin Access at <code className="text-emerald-400 bg-gray-900 px-1.5 py-0.5 rounded">/admin</code></span>
								</li>
							</ul>

							<div className="pt-2">
								<a
									href="/admin"
									className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-black whatsapp-gradient rounded-xl shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
								>
									Open Payload CMS Dashboard
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
									</svg>
								</a>
							</div>
						</div>

						<div className="bg-gray-950/80 rounded-2xl p-6 border border-gray-800 font-mono text-xs text-gray-300 space-y-4">
							<div className="flex items-center justify-between pb-3 border-b border-gray-800 text-gray-400">
								<span>payload.config.ts</span>
								<span className="text-emerald-400">Cloudflare D1 & R2</span>
							</div>

							<pre className="text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
{`export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media],
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
  }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
});`}
							</pre>

							<div className="pt-3 border-t border-gray-800 flex items-center justify-between text-gray-400 text-[11px]">
								<span>Database Status: Connected</span>
								<span className="text-emerald-400 font-bold">D1 Ready</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
						Simple, Transparent Pricing
					</h2>
					<p className="text-gray-400 text-base">
						Start with a 14-day free trial. Scale as your WhatsApp store revenue grows.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Plan 1 */}
					<div className="glass-card rounded-2xl p-8 border border-gray-800 flex flex-col justify-between">
						<div>
							<div className="text-sm font-semibold text-gray-400">Starter</div>
							<div className="mt-4 flex items-baseline gap-1">
								<span className="text-4xl font-extrabold text-white font-mono">$29</span>
								<span className="text-gray-400 text-sm">/month</span>
							</div>
							<p className="text-xs text-gray-400 mt-2">Perfect for new stores starting with WhatsApp recovery.</p>

							<ul className="mt-8 space-y-3 text-xs text-gray-300">
								<li className="flex items-center gap-2">✓ Up to 500 Recovered Checkouts</li>
								<li className="flex items-center gap-2">✓ Abandoned Cart Recovery</li>
								<li className="flex items-center gap-2">✓ Standard WhatsApp Templates</li>
								<li className="flex items-center gap-2 text-gray-500">✕ Shopify Flow Integration</li>
							</ul>
						</div>
						<button className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold text-gray-200 bg-gray-800 hover:bg-gray-700 transition-colors">
							Start 14-Day Free Trial
						</button>
					</div>

					{/* Plan 2 - Featured */}
					<div className="glass-card rounded-2xl p-8 border-2 border-emerald-500 relative shadow-2xl flex flex-col justify-between scale-105 bg-gray-900/80">
						<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
							Most Popular
						</div>
						<div>
							<div className="text-sm font-semibold text-emerald-400">Growth</div>
							<div className="mt-4 flex items-baseline gap-1">
								<span className="text-4xl font-extrabold text-white font-mono">$79</span>
								<span className="text-gray-400 text-sm">/month</span>
							</div>
							<p className="text-xs text-gray-400 mt-2">For growing brands wanting full automation & reviews.</p>

							<ul className="mt-8 space-y-3 text-xs text-gray-200">
								<li className="flex items-center gap-2 text-emerald-400 font-semibold">✓ Unlimited Cart Recoveries</li>
								<li className="flex items-center gap-2">✓ Judge.me Review Request Automation</li>
								<li className="flex items-center gap-2">✓ Shopify Flow Extensions</li>
								<li className="flex items-center gap-2">✓ Targeted Segment Broadcasts</li>
								<li className="flex items-center gap-2">✓ Built-in URL Shortener & Analytics</li>
							</ul>
						</div>
						<button className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold text-black whatsapp-gradient hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20">
							Start 14-Day Free Trial
						</button>
					</div>

					{/* Plan 3 */}
					<div className="glass-card rounded-2xl p-8 border border-gray-800 flex flex-col justify-between">
						<div>
							<div className="text-sm font-semibold text-gray-400">Enterprise</div>
							<div className="mt-4 flex items-baseline gap-1">
								<span className="text-4xl font-extrabold text-white font-mono">$199</span>
								<span className="text-gray-400 text-sm">/month</span>
							</div>
							<p className="text-xs text-gray-400 mt-2">For high-volume merchants with custom workflows.</p>

							<ul className="mt-8 space-y-3 text-xs text-gray-300">
								<li className="flex items-center gap-2">✓ Everything in Growth</li>
								<li className="flex items-center gap-2">✓ Dedicated WhatsApp Phone Number</li>
								<li className="flex items-center gap-2">✓ Custom Payload CMS Schema</li>
								<li className="flex items-center gap-2">✓ 1-on-1 Strategy & Setup Support</li>
							</ul>
						</div>
						<button className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold text-gray-200 bg-gray-800 hover:bg-gray-700 transition-colors">
							Contact Sales
						</button>
					</div>
				</div>
			</section>

			{/* FAQ Accordion */}
			<section id="faq" className="py-20 bg-gray-900/20 border-t border-gray-800/60">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 space-y-3">
						<h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
						<p className="text-gray-400 text-sm">Have questions about WhatFlow? We've got answers.</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, idx) => (
							<div
								key={idx}
								className="glass-card rounded-xl border border-gray-800 overflow-hidden transition-all"
							>
								<button
									onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
									className="w-full text-left p-5 text-sm font-semibold text-white flex items-center justify-between gap-4"
								>
									<span>{faq.q}</span>
									<span className="text-emerald-400 font-mono text-base">{faqOpen === idx ? "−" : "+"}</span>
								</button>
								{faqOpen === idx && (
									<div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-gray-800/60 pt-3">
										{faq.a}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-gray-800/80 py-12 bg-black/40 text-xs text-gray-400">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<div className="w-7 h-7 rounded-lg whatsapp-gradient flex items-center justify-center text-black font-bold text-xs">
							W
						</div>
						<span className="font-bold text-white text-sm">WhatFlow</span>
						<span className="text-gray-600">|</span>
						<span>Automated WhatsApp Marketing for Shopify</span>
					</div>

					<div className="flex items-center gap-6">
						<a href="#features" className="hover:text-gray-200">Features</a>
						<a href="#workflows" className="hover:text-gray-200">Workflows</a>
						<a href="/admin" className="hover:text-emerald-400">Payload CMS Admin</a>
						<a href="#pricing" className="hover:text-gray-200">Pricing</a>
					</div>

					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
						<span>Systems Operational • Next.js 16 + Payload CMS</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
