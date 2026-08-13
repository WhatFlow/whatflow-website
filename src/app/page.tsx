"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Data Definitions ─────────────────────────────────────────────────────────

const APPS = [
	{
		id: "chat",
		name: "WHATFLOW CHAT",
		tag: "UNOFFICIAL API",
		tagColor: "bg-[#FFF3CD] text-[#856404] border-black",
		description: "Order confirmations, cart recovery & real-time updates via WhatsApp.",
		icon: "💬",
		link: "https://apps.shopify.com/whatflow",
		price: "$9",
		badge: "QUICK SETUP",
		featured: false,
		features: [
			"500 messages / month",
			"Instant order confirmations",
			"Cart recovery sequences",
			"Shipping & delivery updates",
		],
	},
	{
		id: "business",
		name: "WHATFLOW BUSINESS",
		tag: "META CLOUD API",
		tagColor: "bg-[#D4EDDA] text-[#155724] border-black",
		description: "Official WhatsApp API with AI chat, broadcasts & back-in-stock alerts.",
		icon: "⚡",
		link: "https://apps.shopify.com/whatflow-official-api",
		price: "$49",
		badge: "MOST POPULAR",
		featured: true,
		features: [
			"Unlimited messages via Cloud API",
			"Official Meta verification badge",
			"AI auto-reply chatbot (24/7)",
			"Broadcast campaigns & segments",
			"Native Shopify Flow action",
			"Judge.me photo review requests",
		],
	},
	{
		id: "ai",
		name: "WHATFLOW AI",
		tag: "STOREFRONT WIDGET",
		tagColor: "bg-[#E2E3E5] text-[#383D41] border-black",
		description: "AI chat widget for your Shopify storefront — support, upsells & tracking.",
		icon: "🤖",
		link: "https://apps.shopify.com/whatflow-ai",
		price: "$19",
		badge: "NEWEST",
		featured: false,
		features: [
			"AI product recommendations",
			"Order lookup & tracking widget",
			"Multilingual AI support",
			"Smart upsells & cross-sells",
		],
	},
];

const FAQS = [
	{
		q: "Which app should I start with?",
		a: "If you want instant setup without a Meta business account, start with WhatFlow Chat. For official Meta verification, AI chatbots, and Shopify Flow integration, choose WhatFlow Business API.",
	},
	{
		q: "Do I need a Meta WhatsApp Business Account?",
		a: "Only for WhatFlow Business API, which connects directly to Meta's official Cloud API for certified message delivery. WhatFlow Chat requires no Meta account.",
	},
	{
		q: "Can I use multiple WhatFlow apps together?",
		a: "Yes! Many merchants pair WhatFlow Business API for post-purchase WhatsApp notifications with WhatFlow AI for storefront customer support.",
	},
	{
		q: "Is there a free trial for all plans?",
		a: "Yes, all plans come with a 14-day free trial. No credit card is required to get started.",
	},
	{
		q: "Does WhatFlow integrate with Shopify Flow?",
		a: "Yes — WhatFlow Business API provides a native Shopify Flow action block, allowing you to trigger WhatsApp workflows from any Shopify event.",
	},
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
}

// ─── Logo Component ───────────────────────────────────────────────────────────
function WhatFlowLogo({ lightMode = true }: { lightMode?: boolean }) {
	return (
		<a href="/" className="flex items-center gap-2.5 group" id="nav-logo">
			<div className="w-10 h-10 rounded-xl bg-[#00D261] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center relative p-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform overflow-hidden">
				<Image
					src="/logo.svg"
					alt="WhatFlow Logo"
					width={32}
					height={32}
					className="w-full h-full object-contain"
				/>
			</div>
			<span className={`text-2xl font-display font-black tracking-tight uppercase ${lightMode ? "text-black" : "text-white"}`}>
				WHATFLOW
			</span>
		</a>
	);
}

// ─── Navbar Component ─────────────────────────────────────────────────────────
function Navbar() {
	return (
		<header className="sticky top-0 z-50 bg-[#FAF7F0] border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
				<WhatFlowLogo />

				<nav className="hidden lg:flex items-center gap-8">
					<a href="#hero" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HOME
					</a>
					<a href="#products" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors relative py-1 border-b-2 border-transparent hover:border-black">
						PRODUCTS
					</a>
					<a href="#pricing" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						PRICING
					</a>
					<a href="#features" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						FEATURES
					</a>
					<a href="#faq" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HELP
					</a>
					<a href="#about" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						ABOUT
					</a>
				</nav>

				<div className="flex items-center gap-3">
					<a
						href="#products"
						className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2"
					>
						INSTALL APP
					</a>
				</div>
			</div>
		</header>
	);
}

// ─── Hero Section (Matching Image 1) ─────────────────────────────────────────
function HeroSection() {
	const [activeAction, setActiveAction] = useState<"confirm" | "cancel" | null>(null);

	return (
		<section id="hero" className="bg-[#FAF7F0] pt-10 pb-16 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
				{/* Left Hero Content */}
				<div className="lg:col-span-6 space-y-6">
					{/* Badges */}
					<div className="flex flex-wrap items-center gap-3">
						<div className="neo-pill bg-white px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
							<Image src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg" width={48} height={15} alt="Meta" className="h-3.5 w-auto" />
							<span>OFFICIAL META API</span>
						</div>
						<div className="neo-pill bg-[#F0F4FF] px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1877F2]">
							<Image src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg" width={48} height={15} alt="Meta" className="h-3.5 w-auto" />
							<span>TECH PARTNER</span>
						</div>
						<div className="neo-pill bg-[#E8F8F0] px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
							<Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={18} height={18} alt="Shopify" />
							<span>BUILT FOR SHOPIFY</span>
						</div>
					</div>

					{/* Heading */}
					<h1 className="text-[44px] sm:text-[58px] lg:text-[64px] font-display font-black leading-[1.02] uppercase text-black tracking-tight">
						TURN SHOPIFY EVENTS{" "}
						<span className="text-stroke-green block sm:inline">INTO WHATSAPP</span>{" "}
						CONVERSATIONS.
					</h1>

					{/* Subtitle */}
					<p className="text-[17px] sm:text-[18px] text-[#222222] font-medium leading-relaxed max-w-lg">
						Official WhatsApp automation for confirmations, recovery and order updates.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-wrap items-center gap-4 pt-2">
						<a
							href="#products"
							className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wide px-7 py-3.5 rounded-lg flex items-center gap-2"
						>
							INSTALL ON SHOPIFY
						</a>
						<a
							href="#features"
							className="neo-btn bg-white text-[#2563EB] font-extrabold text-sm uppercase tracking-wide px-7 py-3.5 rounded-lg"
						>
							SEE HOW IT WORKS
						</a>
					</div>
				</div>

				{/* Right Visual Box (Teal Container with Phone Mockup & Order Card) */}
				<div className="lg:col-span-6 relative">
					<div className="neo-box-teal p-6 sm:p-8 relative min-h-[460px] flex items-center justify-center">
						{/* Top Attached Badge */}
						<div className="absolute top-0 right-6 -translate-y-1/2 neo-pill bg-[#FFC107] px-4 py-1 font-extrabold text-xs uppercase tracking-wider text-black">
							ORDER #1027
						</div>

						<div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6">
							{/* Phone Mockup Frame */}
							<div className="w-full sm:w-[270px] bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_#000] overflow-hidden flex flex-col">
								{/* Phone Header */}
								<div className="bg-[#075E54] text-white p-3 flex items-center justify-between border-b-2 border-black">
									<div className="flex items-center gap-2">
										<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg" width={24} height={24} alt="WhatsApp" />
										<div>
											<div className="flex items-center gap-1 font-bold text-xs">
												<span>Store</span>
												<span className="text-[#00D261]">✓</span>
											</div>
											<div className="text-[9px] text-[#A7F3D0]">Business Account</div>
										</div>
									</div>
									<div className="flex items-center gap-2 text-xs">
										<span>📹</span>
										<span>📞</span>
										<span>⋮</span>
									</div>
								</div>

								{/* Phone Chat Body */}
								<div className="p-3 bg-[#EFEAE2] space-y-3 min-h-[280px] text-xs">
									<div className="text-center">
										<span className="bg-white border border-black px-2 py-0.5 rounded text-[10px] font-bold">Today</span>
									</div>

									{/* WhatsApp Order Bubble */}
									<div className="bg-[#E7FCE9] border border-black p-2.5 rounded-lg shadow-sm">
										<p className="font-medium text-[#111111] mb-1.5 leading-snug">
											Hi Alex 👋<br />
											Thanks for your order! We've received it and are getting it ready to ship.
										</p>
										<div className="bg-white border border-black p-2 rounded flex items-center gap-2 text-[11px]">
											<span className="text-base">📦</span>
											<div>
												<div className="font-bold text-black">Order #1027</div>
												<div className="text-[#555] text-[10px]">2 items • $89.00</div>
											</div>
										</div>
										<div className="text-[9px] text-right text-[#666] mt-1">10:30 AM</div>
									</div>

									{/* WhatsApp Action Bubble */}
									<div className="bg-white border border-black p-2.5 rounded-lg space-y-2">
										<p className="font-medium text-[#111111] text-[11px]">
											Please confirm your order to continue.
										</p>
										<div className="space-y-1.5">
											<button
												onClick={() => setActiveAction("confirm")}
												className={`w-full py-1.5 px-3 rounded-md font-bold text-[11px] border border-black transition-all ${
													activeAction === "confirm"
														? "bg-[#00D261] text-black"
														: "bg-white text-[#00D261] hover:bg-[#E7FCE9]"
												}`}
											>
												{activeAction === "confirm" ? "✓ CONFIRMED!" : "CONFIRM ORDER"}
											</button>
											<button
												onClick={() => setActiveAction("cancel")}
												className={`w-full py-1.5 px-3 rounded-md font-bold text-[11px] border border-black transition-all ${
													activeAction === "cancel"
														? "bg-[#FF4B4B] text-white"
														: "bg-white text-[#FF4B4B] hover:bg-[#FFEBEB]"
												}`}
											>
												{activeAction === "cancel" ? "✕ CANCELLED" : "CANCEL ORDER"}
											</button>
										</div>
										<div className="text-[9px] text-right text-[#666]">10:30 AM</div>
									</div>
								</div>

								{/* Phone Bottom Input */}
								<div className="bg-[#F0F0F0] p-2 border-t-2 border-black flex items-center gap-2">
									<span className="text-xs">😊</span>
									<div className="flex-1 bg-white border border-black px-2 py-1 rounded-full text-[10px] text-gray-400">
										Message
									</div>
									<span className="text-xs">📎</span>
									<span className="text-xs">📷</span>
									<div className="w-6 h-6 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-[10px] text-black font-bold">
										🎙️
									</div>
								</div>
							</div>

							{/* Shopify Receipt Card (Overlay side card) */}
							<div className="w-full sm:w-[220px] neo-box p-4 text-xs space-y-3 bg-white">
								<div className="flex items-center justify-between border-b border-gray-200 pb-2">
									<div className="flex items-center gap-1.5">
										<Image src="/shopify-brand-assets/01-logo/svg/logo-color-white-bg.svg" width={78} height={22} alt="Shopify" className="h-5 w-auto" />
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<div className="font-extrabold text-black text-sm">Order #1027</div>
										<div className="text-[10px] text-gray-500">May 12, 2024 at 10:30 AM</div>
									</div>
									<span className="neo-pill bg-[#FFC107] px-2 py-0.5 text-[9px] font-bold text-black">
										• Paid
									</span>
								</div>

								<div className="border-t border-gray-200 pt-2 space-y-2">
									<div className="text-[10px] font-bold uppercase text-gray-600">Order summary</div>

									<div className="flex items-center justify-between text-[11px]">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 bg-gray-100 border border-black rounded flex items-center justify-center">👕</div>
											<div>
												<div className="font-bold">Essentials Tee</div>
												<div className="text-[9px] text-gray-500">Black / M <span className="ml-2 font-bold text-black">x 1</span></div>
											</div>
										</div>
										<div className="font-bold">$39.00</div>
									</div>

									<div className="flex items-center justify-between text-[11px]">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 bg-gray-100 border border-black rounded flex items-center justify-center">🧢</div>
											<div>
												<div className="font-bold">Logo Cap</div>
												<div className="text-[9px] text-gray-500">Black <span className="ml-2 font-bold text-black">x 1</span></div>
											</div>
										</div>
										<div className="font-bold">$50.00</div>
									</div>
								</div>

								<div className="border-t border-gray-200 pt-2 space-y-1 text-[11px]">
									<div className="flex justify-between text-gray-600">
										<span>Subtotal</span>
										<span className="font-bold text-black">$89.00</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>Shipping</span>
										<span className="font-bold text-black">Free</span>
									</div>
									<div className="flex justify-between font-extrabold text-black text-sm pt-1 border-t border-gray-200">
										<span>Total</span>
										<span>$89.00</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Ticker Marquee Strip */}
			<div className="mt-12 -mx-4 sm:-mx-6 bg-[#091E17] border-y-[2.5px] border-black py-4 overflow-hidden">
				<div className="animate-marquee items-center gap-8 font-display font-extrabold text-sm sm:text-base uppercase tracking-widest text-white whitespace-nowrap">
					<span>ORDER CONFIRMATION</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>ABANDONED CHECKOUT</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>FULFILLMENT UPDATES</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>AUTO REPLIER</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>ORDER CONFIRMATION</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>ABANDONED CHECKOUT</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>FULFILLMENT UPDATES</span>
					<span className="text-[#00D261] text-xl">∞</span>
					<span>AUTO REPLIER</span>
					<span className="text-[#00D261] text-xl">∞</span>
				</div>
			</div>
		</section>
	);
}

// ─── Official API Section (Matching Image 2) ────────────────────────────────
function OfficialApiSection() {
	return (
		<section id="products" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto space-y-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					{/* Left Content */}
					<div className="lg:col-span-6 space-y-6">
						<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
							PRODUCT — OFFICIAL API
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<div className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-[#2563EB] flex items-center gap-1.5">
								<Image src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg" width={48} height={15} alt="Meta" className="h-3.5 w-auto" />
								<span>BUSINESS PLATFORM</span>
							</div>
							<div className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-black flex items-center gap-1.5">
								<Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={14} height={14} alt="Shopify" />
								<span>SHOPIFY NATIVE</span>
							</div>
						</div>

						<h2 className="text-[38px] sm:text-[50px] lg:text-[56px] font-display font-black leading-[1.05] uppercase text-black tracking-tight">
							THE <span className="text-stroke-blue">OFFICIAL</span> WAY TO AUTOMATE{" "}
							<span className="text-stroke-green">WHATSAPP.</span>
						</h2>

						<p className="text-[17px] text-[#222222] font-medium leading-relaxed max-w-md">
							Connect Shopify to the official WhatsApp Business Platform and automate every important order moment.
						</p>

						<div className="flex flex-wrap items-center gap-4 pt-2">
							<a
								href="#pricing"
								className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								INSTALL OFFICIAL API
							</a>
							<a
								href="#pricing"
								className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								VIEW PRICING
							</a>
						</div>
					</div>

					{/* Right Visual Box (Diagram: Shopify -> Arrow -> WhatsApp) */}
					<div className="lg:col-span-6">
						<div className="neo-box-teal p-6 sm:p-8 relative">
							{/* Top Badge */}
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 neo-box bg-[#E8F8F0] px-4 py-1 font-extrabold text-xs uppercase text-[#2563EB] tracking-wider">
								OFFICIAL CONNECTION
							</div>

							<div className="bg-[#E8F8F0] border-2 border-black p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
								{/* Shopify Card */}
								<div className="w-full sm:w-[190px] bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_#000] space-y-2 text-xs">
									<div className="flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
										<Image src="/shopify-brand-assets/01-logo/svg/logo-color-white-bg.svg" width={72} height={20} alt="Shopify" className="h-4.5 w-auto" />
									</div>
									<div className="text-[10px] text-gray-500">Order #1027<br />May 12, 2024</div>
									<div className="border-t border-black pt-1.5 flex justify-between items-center text-[10px]">
										<span>Essentials Tee</span>
										<span className="font-bold">$39.00</span>
									</div>
									<div className="border-t border-black pt-1 flex justify-between items-center font-bold text-xs">
										<span>Total</span>
										<span>$39.00</span>
									</div>
								</div>

								{/* Arrow */}
								<div className="text-2xl font-black text-black">➔</div>

								{/* WhatsApp Card */}
								<div className="w-full sm:w-[210px] bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] overflow-hidden text-xs">
									<div className="bg-[#00D261] text-black p-2 font-bold flex items-center justify-between border-b border-black">
										<div className="flex items-center gap-1.5">
											<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg" width={16} height={16} alt="WhatsApp" />
											<span>WhatsApp</span>
										</div>
										<span>⋮</span>
									</div>
									<div className="p-3 bg-[#E8F8F0] space-y-2">
										<div className="bg-white border border-black p-2.5 rounded-lg space-y-1">
											<div className="font-bold text-black flex items-center gap-1 text-[11px]">
												<span>Order confirmed</span>
												<span className="text-[#00D261]">✓</span>
											</div>
											<p className="text-[10px] text-gray-700 leading-snug">
												Hi Alex! Your order #1027 has been confirmed and will be shipped soon.
											</p>
											<div className="text-[8px] text-right text-gray-500 font-bold">10:30 AM ✓✓</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Lower Dark Banner: BUILT FOR RELIABILITY */}
				<div className="bg-[#091E17] neo-box p-8 sm:p-12 text-white space-y-4">
					<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
						WHY OFFICIAL?
					</div>
					<h2 className="text-[36px] sm:text-[54px] font-display font-black uppercase text-white tracking-tight leading-none">
						BUILT FOR <span className="text-stroke-green">RELIABILITY.</span>
					</h2>
				</div>
			</div>
		</section>
	);
}

// ─── Pricing & Calculator Section (Matching Image 3) ────────────────────────
function PricingCalculatorSection() {
	const [orders, setOrders] = useState<number>(1000);
	const [msgPerOrder, setMsgPerOrder] = useState<number>(2);
	const [msgType, setMsgType] = useState<string>("Utility");

	const estimatedMessages = orders * msgPerOrder;

	const recommendedPlan =
		estimatedMessages <= 1500 ? "STARTER" : estimatedMessages <= 5000 ? "GROWTH" : "PRO";

	return (
		<section id="pricing" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto space-y-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					{/* Left Content */}
					<div className="lg:col-span-6 space-y-6">
						<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
							PRICING — OFFICIAL API
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<div className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-black">
								PAY FOR YOUR USAGE
							</div>
							<div className="neo-pill bg-[#E8F8F0] px-3 py-1 text-xs font-extrabold uppercase text-black">
								ALL FEATURES INCLUDED
							</div>
						</div>

						<h2 className="text-[38px] sm:text-[50px] lg:text-[56px] font-display font-black leading-[1.05] uppercase text-black tracking-tight">
							PRICING THAT SCALES WITH{" "}
							<span className="text-stroke-green">EVERY ORDER.</span>
						</h2>

						<p className="text-[17px] text-[#222222] font-medium leading-relaxed max-w-md">
							Estimate WhatFlow and Meta charges before you choose a plan.
						</p>

						<div className="pt-2">
							<a
								href="#all-plans"
								className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg inline-block"
							>
								VIEW ALL PLANS
							</a>
						</div>
					</div>

					{/* Right Interactive Calculator Box */}
					<div className="lg:col-span-6">
						<div className="neo-box-teal p-6 sm:p-8 relative">
							{/* Top Attached Badge */}
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 neo-box bg-[#00D261] px-5 py-1 font-extrabold text-xs uppercase tracking-wider text-black">
								CALCULATE YOUR MONTHLY COST
							</div>

							<div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_#000] grid grid-cols-1 sm:grid-cols-12 mt-2">
								{/* Left Calculator Inputs */}
								<div className="sm:col-span-7 p-6 space-y-4 bg-white">
									<div>
										<label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
											MONTHLY ORDERS
										</label>
										<input
											type="number"
											min={100}
											step={100}
											value={orders}
											onChange={(e) => setOrders(Math.max(1, parseInt(e.target.value) || 0))}
											className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261]"
										/>
									</div>

									<div>
										<label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
											MESSAGES PER ORDER
										</label>
										<input
											type="number"
											min={1}
											max={10}
											value={msgPerOrder}
											onChange={(e) => setMsgPerOrder(Math.max(1, parseInt(e.target.value) || 1))}
											className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261]"
										/>
									</div>

									<div>
										<label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
											MESSAGE TYPE
										</label>
										<select
											value={msgType}
											onChange={(e) => setMsgType(e.target.value)}
											className="w-full bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-extrabold text-black focus:outline-none"
										>
											<option value="Utility">Utility</option>
											<option value="Marketing">Marketing</option>
											<option value="Authentication">Authentication</option>
										</select>
									</div>

									<button
										onClick={() => {}}
										className="w-full neo-btn bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 mt-2"
									>
										<span>CALCULATE</span>
										<span>➔</span>
									</button>
								</div>

								{/* Right Calculator Output Panel */}
								<div className="sm:col-span-5 p-6 bg-[#D5F5E3] border-t-2 sm:border-t-0 sm:border-l-2 border-black flex flex-col justify-between space-y-6">
									<div>
										<div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
											ESTIMATED MESSAGES
										</div>
										<div className="text-4xl font-display font-black text-black">
											{estimatedMessages.toLocaleString()}
										</div>
									</div>

									<div className="space-y-2">
										<div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-700">
											RECOMMENDED PLAN
										</div>
										<div className="neo-btn bg-[#00D261] text-black font-display font-black text-center py-2 px-4 rounded-lg text-lg uppercase tracking-wider">
											{recommendedPlan}
										</div>
									</div>

									<div className="neo-pill bg-white/80 p-2 text-[10px] text-center font-bold text-gray-800 border border-black">
										ⓘ Meta charges shown separately.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Lower Dark Banner: ALL FEATURES. EVERY PLAN. */}
				<div className="bg-[#091E17] neo-box p-8 sm:p-12 text-white space-y-4">
					<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
						SIMPLE BY DESIGN
					</div>
					<h2 className="text-[36px] sm:text-[54px] font-display font-black uppercase text-white tracking-tight leading-none">
						ALL FEATURES. <span className="text-stroke-green">EVERY PLAN.</span>
					</h2>
				</div>
			</div>
		</section>
	);
}

// ─── Features Section & Status Strip (Matching Image 4) ───────────────────────
function FeaturesStatusSection() {
	const [selectedStatus, setSelectedStatus] = useState<"pending" | "confirmed" | "cancelled">("confirmed");

	return (
		<section id="features" className="bg-[#E8F8F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto space-y-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					{/* Left Content */}
					<div className="lg:col-span-6 space-y-6">
						<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
							FEATURE — ORDER CONFIRMATION
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<div className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-[#2563EB]">
								AUTOMATIC
							</div>
							<div className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-black flex items-center gap-1.5">
								<Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={14} height={14} alt="Shopify" />
								<span>SHOPIFY SYNC</span>
							</div>
						</div>

						<h2 className="text-[38px] sm:text-[50px] lg:text-[56px] font-display font-black leading-[1.05] uppercase text-black tracking-tight">
							KNOW WHICH ORDERS ARE{" "}
							<span className="text-stroke-green">REAL.</span>
						</h2>

						<p className="text-[17px] text-[#222222] font-medium leading-relaxed max-w-md">
							Ask customers to confirm or cancel on WhatsApp before your team starts fulfillment.
						</p>

						<div className="flex flex-wrap items-center gap-4 pt-2">
							<a
								href="#products"
								className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								INSTALL WHATFLOW
							</a>
							<a
								href="#faq"
								className="neo-btn bg-white text-[#2563EB] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								VIEW SETUP GUIDE
							</a>
						</div>
					</div>

					{/* Right Visual Box (One-tap response mockup) */}
					<div className="lg:col-span-6">
						<div className="neo-box-teal p-6 sm:p-8 relative">
							{/* Top Attached Badge */}
							<div className="absolute top-0 left-6 -translate-y-1/2 neo-pill bg-[#FFC107] px-4 py-1 font-extrabold text-xs uppercase tracking-wider text-black">
								ONE-TAP RESPONSE
							</div>

							<div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000] space-y-4">
								{/* Chat Header */}
								<div className="flex items-center gap-3 border-b border-gray-200 pb-3">
									<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg" width={28} height={28} alt="WhatsApp" />
									<div className="flex-1">
										<div className="font-extrabold text-black text-xs">Alex Johnson</div>
										<div className="text-[10px] text-gray-500">10:30 AM</div>
									</div>
								</div>

								{/* Prompt Box */}
								<div className="bg-[#FAF7F0] border border-black p-3.5 rounded-lg text-xs font-medium text-black">
									Hi Alex! Please confirm or cancel your order so we can prepare it.
								</div>

								{/* Order Item Box */}
								<div className="bg-gray-50 border border-gray-300 p-3 rounded-lg flex items-center justify-between text-xs">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-white border border-black rounded flex items-center justify-center">👕</div>
										<div>
											<div className="font-bold text-black">Order #1027</div>
											<div className="text-[10px] text-gray-500">Essentials Tee • Black / M • Qty: 1</div>
										</div>
									</div>
									<div className="font-extrabold text-black">$39.00</div>
								</div>

								{/* Action Buttons */}
								<div className="space-y-2 pt-1">
									<button
										onClick={() => setSelectedStatus("confirmed")}
										className={`w-full py-2.5 px-4 rounded-lg font-extrabold text-xs border-2 border-black transition-all flex items-center justify-center gap-2 ${
											selectedStatus === "confirmed"
												? "bg-[#00D261] text-black shadow-[2px_2px_0px_#000]"
												: "bg-white text-[#00D261] hover:bg-[#E8F8F0]"
										}`}
									>
										<span>✓</span>
										<span>CONFIRM ORDER</span>
									</button>

									<button
										onClick={() => setSelectedStatus("cancelled")}
										className={`w-full py-2.5 px-4 rounded-lg font-extrabold text-xs border-2 border-black transition-all flex items-center justify-center gap-2 ${
											selectedStatus === "cancelled"
												? "bg-[#FF4B4B] text-white shadow-[2px_2px_0px_#000]"
												: "bg-white text-[#FF4B4B] hover:bg-[#FFEBEB]"
										}`}
									>
										<span>✕</span>
										<span>CANCEL ORDER</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Shopify Status Strip */}
				<div className="space-y-6 pt-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-2">
								SHOPIFY STATUS
							</div>
							<h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-black">
								ONE TAP. THREE CLEAR OUTCOMES.
							</h3>
						</div>
					</div>

					{/* 3 Status Pill Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<button
							onClick={() => setSelectedStatus("pending")}
							className={`neo-pill p-4 flex items-center justify-center gap-3 transition-all ${
								selectedStatus === "pending"
									? "bg-[#FFC107] text-black shadow-[4px_4px_0px_#000] scale-[1.02]"
									: "bg-[#FFF9E6] text-black hover:bg-[#FFC107]/20"
							}`}
						>
							<span className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center font-bold text-sm">
								⏳
							</span>
							<span className="font-extrabold text-xs uppercase tracking-wider">
								CONFIRMATION PENDING
							</span>
						</button>

						<button
							onClick={() => setSelectedStatus("confirmed")}
							className={`neo-pill p-4 flex items-center justify-center gap-3 transition-all ${
								selectedStatus === "confirmed"
									? "bg-[#00D261] text-black shadow-[4px_4px_0px_#000] scale-[1.02]"
									: "bg-[#E8F8F0] text-black hover:bg-[#00D261]/20"
							}`}
						>
							<span className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center font-bold text-sm text-[#00D261]">
								✓
							</span>
							<span className="font-extrabold text-xs uppercase tracking-wider">
								ORDER CONFIRMED
							</span>
						</button>

						<button
							onClick={() => setSelectedStatus("cancelled")}
							className={`neo-pill p-4 flex items-center justify-center gap-3 transition-all ${
								selectedStatus === "cancelled"
									? "bg-[#FF4B4B] text-white shadow-[4px_4px_0px_#000] scale-[1.02]"
									: "bg-[#FFEBEB] text-[#FF4B4B] hover:bg-[#FF4B4B]/20"
							}`}
						>
							<span className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center font-bold text-sm text-[#FF4B4B]">
								✕
							</span>
							<span className="font-extrabold text-xs uppercase tracking-wider">
								ORDER CANCELLED
							</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── All Apps Grid Section ───────────────────────────────────────────────────
function AllAppsSection() {
	return (
		<section id="all-plans" className="bg-[#FAF7F0] py-16 sm:py-24 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto space-y-12">
				<div className="text-center max-w-2xl mx-auto space-y-4">
					<div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
						OUR APPS
					</div>
					<h2 className="text-[36px] sm:text-[46px] font-display font-black uppercase text-black tracking-tight">
						CHOOSE THE PERFECT APP FOR YOUR STORE.
					</h2>
					<p className="text-gray-700 font-medium text-base">
						14-day free trial on all plans. No credit card required.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{APPS.map((app) => (
						<div
							key={app.id}
							className={`neo-box p-8 flex flex-col justify-between space-y-6 relative transition-all ${
								app.featured ? "bg-[#E8F8F0] shadow-[6px_6px_0px_#000] border-3" : "bg-white"
							}`}
						>
							{app.featured && (
								<div className="absolute top-0 right-6 -translate-y-1/2 neo-pill bg-[#00D261] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black">
									{app.badge}
								</div>
							)}

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-4xl">{app.icon}</span>
									<span className={`neo-pill px-2.5 py-0.5 text-[10px] font-bold ${app.tagColor}`}>
										{app.tag}
									</span>
								</div>

								<div>
									<h3 className="text-xl font-display font-black text-black">{app.name}</h3>
									<div className="flex items-baseline gap-1 mt-1">
										<span className="text-3xl font-display font-black text-black">{app.price}</span>
										<span className="text-gray-500 font-bold text-xs">/month</span>
									</div>
								</div>

								<p className="text-xs text-gray-700 font-medium leading-relaxed">
									{app.description}
								</p>

								<ul className="space-y-2 pt-2">
									{app.features.map((feat) => (
										<li key={feat} className="flex items-center gap-2 text-xs font-semibold text-black">
											<span className="text-[#00D261] font-bold">✓</span>
											<span>{feat}</span>
										</li>
									))}
								</ul>
							</div>

							<a
								href={app.link}
								target="_blank"
								rel="noopener noreferrer"
								className={`w-full neo-btn py-3 rounded-lg text-center font-extrabold text-xs uppercase tracking-wider ${
									app.featured ? "bg-[#00D261] text-black" : "bg-black text-white hover:bg-[#00D261] hover:text-black"
								}`}
							>
								INSTALL ON SHOPIFY ➔
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── FAQ Accordion Section ────────────────────────────────────────────────────
function FAQSection() {
	const [openIdx, setOpenIdx] = useState<number | null>(0);

	return (
		<section id="faq" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-3xl mx-auto space-y-10">
				<div className="text-center space-y-3">
					<div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
						FREQUENTLY ASKED
					</div>
					<h2 className="text-[34px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
						GOT QUESTIONS? WE HAVE ANSWERS.
					</h2>
				</div>

				<div className="space-y-4">
					{FAQS.map((faq, idx) => (
						<div key={idx} className="neo-box bg-white overflow-hidden">
							<button
								onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
								className="w-full p-5 text-left font-extrabold text-sm sm:text-base text-black flex items-center justify-between gap-4 hover:bg-[#FAF7F0]"
							>
								<span>{faq.q}</span>
								<span className="w-7 h-7 rounded-full bg-[#FAF7F0] border border-black flex items-center justify-center text-lg font-black">
									{openIdx === idx ? "−" : "+"}
								</span>
							</button>
							{openIdx === idx && (
								<div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-200">
									{faq.a}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
	return (
		<section className="bg-[#091E17] py-16 px-4 sm:px-6 text-center text-white border-b-[2.5px] border-black">
			<div className="max-w-3xl mx-auto space-y-6">
				<div className="flex justify-center">
					<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg" width={48} height={48} alt="WhatsApp" />
				</div>
				<h2 className="text-[34px] sm:text-[48px] font-display font-black uppercase tracking-tight">
					READY TO AUTOMATE YOUR STORE WITH <span className="text-stroke-green">WHATSAPP?</span>
				</h2>
				<p className="text-gray-300 font-medium text-base">
					Join 1,000+ Shopify merchants using WhatFlow to recover carts and delight customers.
				</p>
				<div>
					<a
						href="#products"
						className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg inline-block"
					>
						EXPLORE ALL APPS ➔
					</a>
				</div>
			</div>
		</section>
	);
}

// ─── Footer Component ─────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer className="bg-[#091E17] text-white py-12 px-4 sm:px-6">
			<div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/20">
				<div className="col-span-2 md:col-span-1 space-y-3">
					<WhatFlowLogo lightMode={false} />
					<p className="text-xs text-gray-400 font-medium">
						WhatsApp automation suite built specifically for Shopify merchants.
					</p>
				</div>

				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">PRODUCTS</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><a href="https://apps.shopify.com/whatflow" target="_blank" className="hover:text-[#00D261]">WhatFlow Chat</a></li>
						<li><a href="https://apps.shopify.com/whatflow-official-api" target="_blank" className="hover:text-[#00D261]">WhatFlow Business</a></li>
						<li><a href="https://apps.shopify.com/whatflow-ai" target="_blank" className="hover:text-[#00D261]">WhatFlow AI</a></li>
					</ul>
				</div>

				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">FEATURES</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><a href="#features" className="hover:text-[#00D261]">Order Confirmations</a></li>
						<li><a href="#features" className="hover:text-[#00D261]">Cart Recovery</a></li>
						<li><a href="#pricing" className="hover:text-[#00D261]">Cost Calculator</a></li>
					</ul>
				</div>

				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">SUPPORT</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><a href="#faq" className="hover:text-[#00D261]">FAQ & Help</a></li>
						<li><a href="/admin" className="hover:text-[#00D261]">Admin Panel</a></li>
					</ul>
				</div>
			</div>

			<div className="max-w-[1280px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium gap-2">
				<span>© {new Date().getFullYear()} WhatFlow. All rights reserved.</span>
				<span>Neo-brutalist theme for Shopify WhatsApp Apps.</span>
			</div>
		</footer>
	);
}

// ─── Main Page Export ─────────────────────────────────────────────────────────
export default function HomePage() {
	useReveal();

	return (
		<div className="min-h-screen bg-[#FAF7F0] text-black selection:bg-[#00D261] selection:text-black">
			<Navbar />
			<HeroSection />
			<OfficialApiSection />
			<PricingCalculatorSection />
			<FeaturesStatusSection />
			<AllAppsSection />
			<FAQSection />
			<CTABanner />
			<Footer />
		</div>
	);
}
