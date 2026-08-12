"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Apps Data ───────────────────────────────────────────────────────────────
const APPS = [
	{
		id: "chat",
		name: "WhatFlow Chat",
		tag: "Unofficial API",
		tagColor: "bg-orange-100 text-orange-700",
		description: "Order confirmations, cart recovery & real-time updates via WhatsApp.",
		icon: "💬",
		link: "https://apps.shopify.com/whatflow",
		color: "#f0fdf4",
	},
	{
		id: "business",
		name: "WhatFlow Business",
		tag: "Meta Cloud API",
		tagColor: "bg-green-100 text-green-700",
		description: "Official WhatsApp API with AI chat, broadcasts & back-in-stock alerts.",
		icon: "⚡",
		link: "https://apps.shopify.com/whatflow-official-api",
		color: "#f0fdf4",
	},
	{
		id: "ai",
		name: "WhatFlow AI",
		tag: "AI Chatbot",
		tagColor: "bg-purple-100 text-purple-700",
		description: "AI chat widget for your Shopify storefront — support, upsells & order tracking.",
		icon: "🤖",
		link: "https://apps.shopify.com/whatflow-ai",
		color: "#faf5ff",
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
			{ threshold: 0.12 }
		);

		document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const started = useRef(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started.current) {
					started.current = true;
					const start = performance.now();
					const animate = (now: number) => {
						const elapsed = now - start;
						const progress = Math.min(elapsed / duration, 1);
						const ease = 1 - Math.pow(1 - progress, 3);
						setCount(Math.floor(ease * end));
						if (progress < 1) requestAnimationFrame(animate);
					};
					requestAnimationFrame(animate);
				}
			},
			{ threshold: 0.5 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [end, duration]);

	return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Logo Component ───────────────────────────────────────────────────────────
function WhatFlowLogo() {
	return (
		<a href="/" className="flex items-center gap-2.5 group" id="nav-logo">
			<div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
				<svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
					<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
				</svg>
			</div>
			<span className="text-xl font-bold tracking-tight text-[#111111]">WhatFlow</span>
		</a>
	);
}

// ─── Apps Dropdown ────────────────────────────────────────────────────────────
function AppsDropdown() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div ref={ref} className="relative">
			<button
				id="nav-apps-btn"
				onClick={() => setOpen((o) => !o)}
				className="flex items-center gap-1.5 text-[15px] font-medium text-[#111111] hover:text-[#25D366] transition-colors py-1.5 px-1"
				aria-expanded={open}
				aria-haspopup="true"
			>
				Apps
				<svg
					className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{open && (
				<div
					id="nav-apps-dropdown"
					className="dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-[#e8e8e8] z-50 overflow-hidden"
				>
					<div className="p-2">
						<p className="text-[11px] font-semibold uppercase tracking-widest text-[#999] px-3 py-2">Our Apps</p>
						{APPS.map((app) => (
							<a
								key={app.id}
								href={app.link}
								target="_blank"
								rel="noopener noreferrer"
								id={`nav-app-${app.id}`}
								className="flex items-start gap-4 px-4 py-4 rounded-xl hover:bg-[#f6f6f6] transition-colors group"
								onClick={() => setOpen(false)}
							>
								<div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center text-xl flex-shrink-0 border border-[#e5e5e5] group-hover:scale-105 transition-transform">
									{app.icon}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<span className="font-semibold text-[14px] text-[#111111]">{app.name}</span>
										<span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${app.tagColor}`}>{app.tag}</span>
									</div>
									<p className="text-[13px] text-[#666] leading-snug">{app.description}</p>
								</div>
								<svg className="w-4 h-4 text-[#bbb] group-hover:text-[#25D366] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						))}
					</div>

					<div className="bg-[#f9f9f9] border-t border-[#eee] px-5 py-3 flex items-center justify-between">
						<p className="text-[12px] text-[#999]">Trusted by 1,000+ Shopify merchants</p>
						<a href="#pricing" className="text-[12px] font-semibold text-[#25D366] hover:underline" onClick={() => setOpen(false)}>View pricing →</a>
					</div>
				</div>
			)}
		</div>
	);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			id="main-nav"
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 animate-fade-in ${
				scrolled
					? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e5e5e5]"
					: "bg-white border-b border-[#e5e5e5]"
			}`}
		>
			<div className="max-w-[1240px] mx-auto px-6 h-[70px] flex items-center justify-between">
				<WhatFlowLogo />

				<div className="hidden md:flex items-center gap-6">
					<AppsDropdown />
					<a id="nav-features" href="#features" className="text-[15px] font-medium text-[#111111] hover:text-[#25D366] transition-colors">Features</a>
					<a id="nav-pricing" href="#pricing" className="text-[15px] font-medium text-[#111111] hover:text-[#25D366] transition-colors">Pricing</a>
					<a id="nav-blog" href="#faq" className="text-[15px] font-medium text-[#111111] hover:text-[#25D366] transition-colors">FAQ</a>
				</div>

				<div className="flex items-center gap-3">
					<a
						id="nav-admin"
						href="/admin"
						className="text-[14px] font-medium text-[#444] hover:text-[#111] transition-colors hidden sm:block"
					>
						Log in
					</a>
					<a
						id="nav-explore"
						href="#apps"
						className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-[14px] font-semibold hover:bg-[#25D366] hover:text-[#111111] transition-all shadow-sm border border-[#111111] hover:border-[#25D366]"
					>
						Explore apps
					</a>
				</div>
			</div>
		</nav>
	);
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
	return (
		<section id="hero" className="pt-[70px] min-h-screen flex">
			<div className="flex w-full flex-col lg:flex-row">
				{/* Left Panel */}
				<div className="flex-1 bg-white flex items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-0">
					<div className="max-w-lg">
						<div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#e5e5e5] bg-[#fafafa] text-[13px] font-medium text-[#444] mb-8 animate-fade-up">
							<span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse inline-block"></span>
							New — WhatFlow AI Chatbot is live!
							<a href="https://apps.shopify.com/whatflow-ai" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold hover:underline">Try it →</a>
						</div>

						<h1 className="text-[44px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.05] tracking-tight text-[#111111] mb-6">
							<span className="animate-fade-up delay-100 block">Grow your store</span>
							<span className="animate-fade-up delay-200 block">with our{" "}
								<span className="relative inline-block">
									<span className="text-[#25D366]">WhatsApp</span>
									<svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
										<path d="M2 4 Q50 1 100 4 Q150 1 198 4" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" fill="none" />
									</svg>
								</span>
							</span>
							<span className="animate-fade-up delay-300 block">apps</span>
						</h1>

						<p className="text-[17px] sm:text-[18px] text-[#555] leading-relaxed mb-8 animate-fade-up delay-400 max-w-sm">
							Join 1,000+ Shopify merchants using WhatFlow to recover carts, automate notifications, and grow with AI.
						</p>

						<div className="flex flex-wrap items-center gap-4 animate-fade-up delay-500">
							<a
								id="hero-cta"
								href="#apps"
								className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111111] text-white text-[15px] font-semibold hover:bg-[#25D366] hover:text-[#111111] transition-all border border-[#111111] hover:border-[#25D366] shadow-sm"
							>
								Explore apps
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</a>
							<a
								id="hero-demo"
								href="#features"
								className="text-[15px] font-medium text-[#444] hover:text-[#111] underline underline-offset-4 decoration-[#e5e5e5] hover:decoration-[#111] transition-all"
							>
								See how it works
							</a>
						</div>

						<p className="text-[13px] text-[#aaa] mt-10 animate-fade-up delay-600">
							Some of the best eCommerce brands are using our apps
						</p>
					</div>
				</div>

				{/* Right Panel — Green with Illustration */}
				<div className="lg:w-[50%] xl:w-[52%] bg-[#25D366] flex items-center justify-center p-12 lg:p-16 min-h-[50vh] lg:min-h-0 relative overflow-hidden">
					{/* Subtle background circles */}
					<div className="absolute w-64 h-64 rounded-full bg-white/10 -top-12 -right-12" />
					<div className="absolute w-40 h-40 rounded-full bg-white/10 bottom-8 left-8" />
					<div className="absolute w-20 h-20 rounded-full bg-white/15 top-1/2 right-8" />

					<div className="relative z-10 animate-float max-w-md w-full">
						<Image
							src="/hero-illustration.png"
							alt="Person watering a WhatsApp plant — grow your store with WhatFlow"
							width={520}
							height={520}
							className="w-full h-auto drop-shadow-xl"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function Stats() {
	const stats = [
		{ value: 1000, suffix: "+", label: "Shopify Merchants" },
		{ value: 98, suffix: "%", label: "Message Open Rate" },
		{ value: 35, suffix: "%", label: "Cart Recovery Rate" },
		{ value: 3, suffix: " apps", label: "WhatsApp Solutions" },
	];

	return (
		<section className="bg-[#111111] text-white py-14 px-6">
			<div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				{stats.map((stat, i) => (
					<div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
						<div className="text-3xl sm:text-4xl font-bold text-[#25D366] mb-1">
							<AnimatedCounter end={stat.value} suffix={stat.suffix} />
						</div>
						<div className="text-[13px] text-[#888]">{stat.label}</div>
					</div>
				))}
			</div>
		</section>
	);
}

// ─── Apps Showcase ────────────────────────────────────────────────────────────
function AppsSection() {
	const panels: Array<{
		id: string; name: string; tag: string; tagColor: string; description: string;
		icon: string; link: string; color: string;
		bgColor: string; accentColor: string; features: string[]; badge: string; featured: boolean;
	}> = [
		{
			...APPS[0],
			bgColor: "#fff9f0",
			accentColor: "#f59e0b",
			features: ["Order confirmations", "Cart recovery", "Shipping updates", "Cancel notifications"],
			badge: "Quick Setup",
			featured: false,
		},
		{
			...APPS[1],
			bgColor: "#f0fdf4",
			accentColor: "#25D366",
			features: ["Meta Cloud API certified", "AI auto-reply chat", "Segment broadcasts", "Back-in-stock alerts"],
			badge: "Most Popular",
			featured: true,
		},
		{
			...APPS[2],
			bgColor: "#faf5ff",
			accentColor: "#8b5cf6",
			features: ["AI product recommendations", "Order tracking widget", "Multilingual support", "Upsell suggestions"],
			badge: "Newest",
			featured: false,
		},
	];

	return (
		<section id="apps" className="py-20 md:py-28 px-6 bg-white">
			<div className="max-w-[1240px] mx-auto">
				<div className="text-center mb-16 reveal">
					<h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-[#111111] mb-4">
						Three apps. One WhatsApp suite.
					</h2>
					<p className="text-[17px] text-[#666] max-w-xl mx-auto">
						Start with the right app for your store — all built on the same reliable WhatFlow platform.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					{panels.map((app, i) => (
						<div
							key={app.id}
							id={`app-card-${app.id}`}
							className={`reveal rounded-3xl overflow-hidden border flex flex-col ${
								app.featured
									? "border-[#25D366] shadow-xl ring-1 ring-[#25D366]/30"
									: "border-[#e8e8e8]"
							}`}
							style={{ transitionDelay: `${i * 0.15}s` }}
						>
							{/* Card Header */}
							<div className="p-8 pb-6" style={{ backgroundColor: app.bgColor }}>
								{app.featured && (
									<div className="inline-block px-3 py-1 rounded-full bg-[#25D366] text-[#111] text-[11px] font-bold uppercase tracking-wider mb-4">
										{app.badge}
									</div>
								)}
								{!app.featured && (
									<div className="inline-block px-3 py-1 rounded-full bg-white border border-[#e5e5e5] text-[#666] text-[11px] font-semibold uppercase tracking-wider mb-4">
										{app.badge}
									</div>
								)}
								<div className="text-4xl mb-4">{app.icon}</div>
								<h3 className="text-[22px] font-bold text-[#111111] mb-2">{app.name}</h3>
								<p className="text-[14px] text-[#666] leading-relaxed">{app.description}</p>
							</div>

							{/* Card Body */}
							<div className="flex-1 p-8 pt-6 bg-white flex flex-col">
								<ul className="space-y-2.5 mb-8 flex-1">
									{app.features.map((f) => (
										<li key={f} className="flex items-center gap-2.5 text-[14px] text-[#444]">
											<span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${app.accentColor}20` }}>
												<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={app.accentColor} strokeWidth={3}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
												</svg>
											</span>
											{f}
										</li>
									))}
								</ul>

								<a
									href={app.link}
									target="_blank"
									rel="noopener noreferrer"
									id={`app-install-${app.id}`}
									className={`w-full py-3 rounded-full text-center text-[14px] font-semibold transition-all border ${
										app.featured
											? "bg-[#25D366] text-[#111111] border-[#25D366] hover:bg-[#111111] hover:text-white hover:border-[#111111]"
											: "bg-white text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white"
									}`}
								>
									Install on Shopify →
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Features Section ─────────────────────────────────────────────────────────
function Features() {
	const features = [
		{
			icon: "🛒",
			title: "Abandoned Cart Recovery",
			desc: "Send WhatsApp messages 15 minutes after cart abandonment. Recover up to 35% of lost revenue automatically.",
		},
		{
			icon: "📦",
			title: "Order Notifications",
			desc: "Keep customers informed at every step — confirmations, fulfillment updates, and delivery alerts via WhatsApp.",
		},
		{
			icon: "⭐",
			title: "Review Requests",
			desc: "Collect photo & video reviews from customers on Judge.me via WhatsApp. Get 4x more reviews.",
		},
		{
			icon: "📢",
			title: "Broadcast Campaigns",
			desc: "Send targeted WhatsApp campaigns to customer segments with custom templates and UTM tracking.",
		},
		{
			icon: "🤖",
			title: "AI Auto-Reply",
			desc: "Let AI handle common customer questions about orders, shipping, and products — 24/7.",
		},
		{
			icon: "⚡",
			title: "Shopify Flow Native",
			desc: "Use WhatFlow as a native action inside Shopify Flow for fully custom automation workflows.",
		},
	];

	return (
		<section id="features" className="py-20 md:py-28 px-6 bg-[#fafafa] border-t border-[#e5e5e5]">
			<div className="max-w-[1240px] mx-auto">
				<div className="text-center mb-16 reveal">
					<h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-[#111111] mb-4">
						Everything your store needs on WhatsApp.
					</h2>
					<p className="text-[17px] text-[#666] max-w-xl mx-auto">
						Powerful features built specifically for Shopify merchants.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
					{features.map((f, i) => (
						<div
							key={f.title}
							id={`feature-${i}`}
							className="reveal bg-white rounded-2xl p-7 border border-[#e8e8e8] hover:border-[#25D366] hover:shadow-md transition-all cursor-default"
							style={{ transitionDelay: `${i * 0.08}s` }}
						>
							<div className="text-3xl mb-4">{f.icon}</div>
							<h3 className="text-[17px] font-bold text-[#111111] mb-2">{f.title}</h3>
							<p className="text-[14px] text-[#666] leading-relaxed">{f.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Social Proof ─────────────────────────────────────────────────────────────
function SocialProof() {
	const reviews = [
		{ name: "Ahmed K.", store: "Trendify Store", text: "WhatFlow recovered 3 carts in the first week. Incredible ROI from Day 1.", stars: 5 },
		{ name: "Sara M.", store: "GlowBox Beauty", text: "The Business API plan is fantastic. Our customers love getting WhatsApp updates.", stars: 5 },
		{ name: "James R.", store: "SportsDrop", text: "The AI chatbot handles 80% of our support tickets. We reduced our support team workload massively.", stars: 5 },
	];

	return (
		<section className="py-20 md:py-24 px-6 bg-white border-t border-[#e5e5e5]">
			<div className="max-w-[1240px] mx-auto">
				<div className="text-center mb-14 reveal">
					<h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#111111] mb-4">
						Merchants love WhatFlow.
					</h2>
					<div className="flex items-center justify-center gap-1 text-[#f59e0b]">
						{"★★★★★"} <span className="text-[#666] ml-2 text-sm font-medium">5.0 on Shopify App Store</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{reviews.map((r, i) => (
						<div
							key={r.name}
							id={`review-${i}`}
							className="reveal bg-[#fafafa] border border-[#e8e8e8] rounded-2xl p-7"
							style={{ transitionDelay: `${i * 0.12}s` }}
						>
							<div className="flex text-[#f59e0b] text-lg mb-4">{"★".repeat(r.stars)}</div>
							<p className="text-[15px] text-[#333] leading-relaxed mb-5">"{r.text}"</p>
							<div>
								<div className="font-semibold text-[14px] text-[#111111]">{r.name}</div>
								<div className="text-[13px] text-[#888]">{r.store}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
	const plans: Array<{
		name: string; sub: string; price: string; desc: string;
		features: string[]; cta: string; link: string; featured: boolean;
	}> = [
		{
			name: "WhatFlow Chat",
			sub: "Unofficial API",
			price: "$9",
			desc: "Start automating WhatsApp for your store without the setup complexity of a Meta account.",
			features: ["500 messages / month", "Order confirmations", "Cart recovery sequences", "Shipping updates"],
			cta: "Install Free",
			link: "https://apps.shopify.com/whatflow",
			featured: false,
		},
		{
			name: "WhatFlow Business",
			sub: "Meta Cloud API",
			price: "$49",
			desc: "The full power of the official WhatsApp Business API with AI, broadcasts, and Shopify Flow.",
			features: ["Unlimited messages", "Official Meta verification", "AI auto-reply chat", "Broadcasts & segments", "Shopify Flow integration", "Judge.me reviews"],
			cta: "Start Free Trial",
			link: "https://apps.shopify.com/whatflow-official-api",
			featured: true,
		},
		{
			name: "WhatFlow AI",
			sub: "Storefront Widget",
			price: "$19",
			desc: "Add a smart AI chat widget to your Shopify storefront to drive sales and reduce support load.",
			features: ["AI product recommendations", "Order lookup & tracking", "Multilingual AI", "Size & fit assistant", "Upsell engine"],
			cta: "Install Free",
			link: "https://apps.shopify.com/whatflow-ai",
			featured: false,
		},
	];


	return (
		<section id="pricing" className="py-20 md:py-28 px-6 bg-[#fafafa] border-t border-[#e5e5e5]">
			<div className="max-w-[1240px] mx-auto">
				<div className="text-center mb-16 reveal">
					<h2 className="text-[36px] sm:text-[44px] font-bold tracking-tight text-[#111111] mb-4">
						Simple pricing. No surprises.
					</h2>
					<p className="text-[17px] text-[#666]">14-day free trial on all plans. No credit card required.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					{plans.map((plan, i) => (
						<div
							key={plan.name}
							id={`pricing-${i}`}
							className={`reveal rounded-3xl overflow-hidden border flex flex-col bg-white ${
								plan.featured ? "border-[#25D366] shadow-xl ring-1 ring-[#25D366]/30" : "border-[#e8e8e8]"
							}`}
							style={{ transitionDelay: `${i * 0.15}s` }}
						>
							{plan.featured && (
								<div className="bg-[#25D366] text-[#111111] text-center text-[12px] font-bold py-1.5 uppercase tracking-wider">
									Most Popular
								</div>
							)}
							<div className="p-8 flex-1 flex flex-col">
								<div className="mb-6">
									<div className="text-[11px] font-semibold uppercase tracking-widest text-[#888] mb-1">{plan.sub}</div>
									<h3 className="text-[20px] font-bold text-[#111111] mb-2">{plan.name}</h3>
									<div className="flex items-baseline gap-1 mb-3">
										<span className="text-[40px] font-bold text-[#111111]">{plan.price}</span>
										<span className="text-[#888] text-sm">/month</span>
									</div>
									<p className="text-[13px] text-[#666] leading-relaxed">{plan.desc}</p>
								</div>

								<ul className="space-y-2.5 mb-8 flex-1">
									{plan.features.map((f) => (
										<li key={f} className="flex items-center gap-2.5 text-[14px] text-[#444]">
											<span className="w-4 h-4 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
												<svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth={3}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
												</svg>
											</span>
											{f}
										</li>
									))}
								</ul>

								<a
									href={plan.link}
									target="_blank"
									rel="noopener noreferrer"
									id={`pricing-cta-${i}`}
									className={`w-full py-3 rounded-full text-center text-[14px] font-semibold transition-all border ${
										plan.featured
											? "bg-[#25D366] text-[#111111] border-[#25D366] hover:bg-[#111111] hover:text-white hover:border-[#111111]"
											: "bg-white text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white"
									}`}
								>
									{plan.cta} →
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
	const [open, setOpen] = useState<number | null>(null);

	const faqs = [
		{ q: "Which app should I start with?", a: "If you're just getting started, WhatFlow Chat is the simplest way to begin. For serious merchants wanting official Meta verification and advanced features, WhatFlow Business API is the best choice. WhatFlow AI is great as an add-on for your storefront." },
		{ q: "Do I need a Meta WhatsApp Business Account?", a: "Only for WhatFlow Business API, which connects to the official Meta Cloud API for certified message delivery. WhatFlow Chat uses an unofficial approach requiring no Meta account. WhatFlow AI is entirely independent of WhatsApp." },
		{ q: "Can I install multiple apps?", a: "Yes! Many merchants use WhatFlow Chat or Business API alongside WhatFlow AI to cover both automated messaging and storefront customer support." },
		{ q: "Is there a free trial?", a: "All plans include a 14-day free trial. No credit card is required to start." },
		{ q: "Does it work with Shopify Flow?", a: "Yes — WhatFlow Business API includes a native Shopify Flow action block so you can trigger WhatsApp messages in any custom automation workflow." },
	];

	return (
		<section id="faq" className="py-20 md:py-24 px-6 bg-white border-t border-[#e5e5e5]">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-14 reveal">
					<h2 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-[#111111] mb-4">
						Frequently Asked Questions
					</h2>
				</div>

				<div className="space-y-3">
					{faqs.map((item, idx) => (
						<div key={idx} id={`faq-${idx}`} className="reveal border border-[#e8e8e8] rounded-2xl overflow-hidden" style={{ transitionDelay: `${idx * 0.07}s` }}>
							<button
								onClick={() => setOpen(open === idx ? null : idx)}
								className="w-full flex items-center justify-between p-6 text-left font-semibold text-[16px] text-[#111111] hover:bg-[#fafafa] transition-colors"
								aria-expanded={open === idx}
							>
								<span>{item.q}</span>
								<span className={`text-2xl font-bold text-[#25D366] transition-transform duration-200 ${open === idx ? "rotate-45" : ""}`}>+</span>
							</button>
							{open === idx && (
								<div className="px-6 pb-5 text-[14px] text-[#555] leading-relaxed border-t border-[#f0f0f0] pt-4 animate-fade-in">
									{item.a}
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
		<section className="bg-[#111111] py-20 px-6 text-center">
			<div className="max-w-2xl mx-auto reveal">
				<div className="text-5xl mb-6">💬</div>
				<h2 className="text-[32px] sm:text-[42px] font-bold text-white mb-4 tracking-tight">
					Ready to grow your store with WhatsApp?
				</h2>
				<p className="text-[#888] text-[16px] mb-8">
					Join 1,000+ Shopify merchants. Start your free trial today.
				</p>
				<a
					id="cta-final"
					href="#apps"
					className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-[#111111] font-bold text-[16px] hover:bg-white transition-all shadow-lg"
				>
					Explore all apps
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer className="bg-[#111111] text-white border-t border-white/10 py-14 px-6">
			<div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
				<div>
					<div className="flex items-center gap-2 mb-4">
						<div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center">
							<svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
								<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24z" />
							</svg>
						</div>
						<span className="font-bold text-base">WhatFlow</span>
					</div>
					<p className="text-[12px] text-[#666] leading-relaxed">WhatsApp automation apps built for Shopify merchants.</p>
				</div>

				<div>
					<h4 className="font-semibold text-sm mb-4">Our Apps</h4>
					<ul className="space-y-2.5 text-[13px] text-[#888]">
						<li><a href="https://apps.shopify.com/whatflow" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatFlow Chat</a></li>
						<li><a href="https://apps.shopify.com/whatflow-official-api" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatFlow Business API</a></li>
						<li><a href="https://apps.shopify.com/whatflow-ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatFlow AI Chatbot</a></li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold text-sm mb-4">Features</h4>
					<ul className="space-y-2.5 text-[13px] text-[#888]">
						<li><a href="#features" className="hover:text-[#25D366] transition-colors">Cart Recovery</a></li>
						<li><a href="#features" className="hover:text-[#25D366] transition-colors">Order Notifications</a></li>
						<li><a href="#features" className="hover:text-[#25D366] transition-colors">AI Chat Widget</a></li>
						<li><a href="#features" className="hover:text-[#25D366] transition-colors">Shopify Flow</a></li>
					</ul>
				</div>

				<div>
					<h4 className="font-semibold text-sm mb-4">Support</h4>
					<ul className="space-y-2.5 text-[13px] text-[#888]">
						<li><a href="#faq" className="hover:text-[#25D366] transition-colors">FAQ</a></li>
						<li><a href="/admin" className="hover:text-[#25D366] transition-colors">Admin Panel</a></li>
						<li><a href="#" className="hover:text-[#25D366] transition-colors">Privacy Policy</a></li>
						<li><a href="#" className="hover:text-[#25D366] transition-colors">Terms of Service</a></li>
					</ul>
				</div>
			</div>

			<div className="max-w-[1240px] mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#555]">
				<span>© {new Date().getFullYear()} WhatFlow. All rights reserved.</span>
				<span>Built on Cloudflare Workers & Payload CMS.</span>
			</div>
		</footer>
	);
}

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Home() {
	useReveal();

	return (
		<div className="min-h-screen bg-white text-[#111111] flex flex-col">
			<Navbar />
			<Hero />
			<Stats />
			<AppsSection />
			<Features />
			<SocialProof />
			<Pricing />
			<FAQ />
			<CTABanner />
			<Footer />
		</div>
	);
}
