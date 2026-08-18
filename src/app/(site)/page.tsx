// Server Component — no "use client" directive
import Image from "next/image";
import Link from "next/link";

// ─── Client Components (interactive) ─────────────────────────────────────────
import { HeroSection } from "@/components/HeroSection";
import { FeaturesStatusSection } from "@/components/FeaturesStatusSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";

// ─── Server-side data fetching ────────────────────────────────────────────────
import {
	getPosts,
	getCaseStudies,
	formatDate,
	CATEGORY_LABELS,
	CATEGORY_COLORS,
	type Post,
	type CaseStudy,
} from "@/lib/payload-api";

// ─── SVG Icon Components ──────────────────────────────────────────────────────
function ChatBubbleIcon({ className = "w-6 h-6" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2.2]`} strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
		</svg>
	);
}

function LightningBoltIcon({ className = "w-6 h-6" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2.2]`} strokeLinecap="round" strokeLinejoin="round">
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
	);
}

function RobotAIIcon({ className = "w-6 h-6" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2.2]`} strokeLinecap="round" strokeLinejoin="round">
			<rect x="3" y="11" width="18" height="10" rx="2" />
			<circle cx="8.5" cy="16" r="1.5" fill="currentColor" />
			<circle cx="15.5" cy="16" r="1.5" fill="currentColor" />
			<path d="M12 2v6M9 4h6" />
		</svg>
	);
}

// ─── Data Definitions ─────────────────────────────────────────────────────────
const APPS = [
	{
		id: "chat",
		name: "WHATFLOW CHAT",
		tag: "UNOFFICIAL API",
		tagColor: "bg-[#FFF3CD] text-[#856404] border-black",
		description: "Order confirmations, cart recovery & real-time updates via WhatsApp.",
		icon: <ChatBubbleIcon className="w-8 h-8 text-black" />,
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
		icon: <LightningBoltIcon className="w-8 h-8 text-black" />,
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
		icon: <RobotAIIcon className="w-8 h-8 text-black" />,
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

				<nav className="hidden lg:flex items-center gap-6">
					<a href="#hero" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HOME
					</a>
					<a href="#products" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors relative py-1 border-b-2 border-transparent hover:border-black">
						PRODUCTS
					</a>
					<Link href="/pricing" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						PRICING
					</Link>
					<a href="#features" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						FEATURES
					</a>
					<Link href="/blog" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						BLOG
					</Link>
					<Link href="/case-studies" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						CASE STUDIES
					</Link>
					<a href="#faq" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HELP
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

// ─── Official API Section ─────────────────────────────────────────────────────
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
								href="https://apps.shopify.com"
								target="_blank"
								rel="noreferrer"
								className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								INSTALL OFFICIAL API
							</a>
							<Link
								href="/pricing"
								className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg"
							>
								VIEW PRICING & PLANS
							</Link>
						</div>
					</div>

					{/* Right Visual Box */}
					<div className="lg:col-span-6">
						<div className="neo-box-teal p-6 sm:p-8 relative">
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

				{/* Lower Dark Banner */}
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

// ─── All Apps Grid Section ────────────────────────────────────────────────────
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
									<div className="w-12 h-12 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-center justify-center">
										{app.icon}
									</div>
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

// ─── Blog Preview Section (server-rendered) ───────────────────────────────────
function BlogPreviewCard({ post }: { post: Post }) {
	const colorClass = CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
	const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

	return (
		<Link
			href={`/blog/${post.slug}`}
			className="neo-box bg-white flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-200"
		>
			<div className="relative w-full h-44 bg-[#D5F5E3] border-b-[2.5px] border-black overflow-hidden">
				{post.coverImage?.url ? (
					<Image
						src={post.coverImage.url}
						alt={post.coverImage.alt || post.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<span className="text-4xl">✍️</span>
					</div>
				)}
			</div>
			<div className="p-5 flex flex-col flex-1 gap-2.5">
				<div className="flex items-center justify-between gap-2">
					<span className={`neo-pill px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${colorClass}`}>
						{categoryLabel}
					</span>
					<span className="text-[10px] font-bold text-gray-400 uppercase">{formatDate(post.publishedAt)}</span>
				</div>
				<h3 className="font-display font-black text-black text-base uppercase leading-tight group-hover:text-[#0A6B56] transition-colors">
					{post.title}
				</h3>
				<p className="text-xs text-gray-500 font-medium leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
				<span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] group-hover:text-[#00D261] transition-colors mt-auto">
					READ MORE →
				</span>
			</div>
		</Link>
	);
}

function CaseStudyPreviewCard({ study }: { study: CaseStudy }) {
	const primaryMetric = study.metrics?.[0];
	return (
		<Link
			href={`/case-studies/${study.slug}`}
			className="neo-box-teal flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-200 relative"
		>
			{primaryMetric && (
				<div className="absolute top-4 right-4 neo-box bg-[#00D261] px-3 py-2 text-center z-10">
					<div className="font-display font-black text-2xl text-black leading-none">{primaryMetric.value}</div>
					<div className="text-[9px] font-extrabold uppercase tracking-wider text-black/70">{primaryMetric.label}</div>
				</div>
			)}
			<div className="relative h-52 bg-[#0A6B56]/50 overflow-hidden">
				{study.coverImage?.url ? (
					<Image
						src={study.coverImage.url}
						alt={study.coverImage.alt || study.title}
						fill
						className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-5xl">📈</div>
				)}
			</div>
			<div className="p-6 space-y-2">
				<div className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">{study.storeName}</div>
				<h3 className="font-display font-black text-white text-lg uppercase leading-tight group-hover:text-[#00D261] transition-colors">
					{study.title}
				</h3>
				<p className="text-xs text-[#A7F3D0] font-medium leading-relaxed line-clamp-2">{study.excerpt}</p>
				<span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00D261] group-hover:text-white transition-colors inline-block pt-1">
					READ CASE STUDY →
				</span>
			</div>
		</Link>
	);
}

async function BlogAndCaseStudiesSection() {
	// Fetch in parallel; gracefully degrade on error
	const [postsResult, studiesResult] = await Promise.allSettled([
		getPosts({ limit: 3, featured: false }),
		getCaseStudies({ limit: 1, featured: true }),
	]);

	const posts = postsResult.status === "fulfilled" ? postsResult.value.docs : [];
	const featuredStudy = studiesResult.status === "fulfilled" ? studiesResult.value.docs[0] ?? null : null;

	// If no content at all, don't render the section
	if (posts.length === 0 && !featuredStudy) return null;

	return (
		<section id="blog-preview" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto space-y-14">
				{/* Blog Posts */}
				{posts.length > 0 && (
					<div className="space-y-8">
						<div className="flex items-center justify-between gap-4">
							<div>
								<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-2">
									FROM THE BLOG
								</div>
								<h2 className="text-[28px] sm:text-[38px] font-display font-black uppercase text-black tracking-tight">
									LATEST ARTICLES
								</h2>
							</div>
							<Link
								href="/blog"
								className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hidden sm:inline-flex items-center gap-1 whitespace-nowrap"
							>
								VIEW ALL →
							</Link>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{posts.map((post) => (
								<BlogPreviewCard key={post.id} post={post} />
							))}
						</div>

						<div className="sm:hidden">
							<Link href="/blog" className="neo-btn w-full text-center bg-white text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg block">
								VIEW ALL POSTS →
							</Link>
						</div>
					</div>
				)}

				{/* Featured Case Study */}
				{featuredStudy && (
					<div className="space-y-8">
						<div className="flex items-center justify-between gap-4">
							<div>
								<div className="neo-box inline-block bg-[#091E17] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#00D261] mb-2">
									SUCCESS STORY
								</div>
								<h2 className="text-[28px] sm:text-[38px] font-display font-black uppercase text-black tracking-tight">
									REAL RESULTS
								</h2>
							</div>
							<Link
								href="/case-studies"
								className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hidden sm:inline-flex items-center gap-1 whitespace-nowrap"
							>
								ALL STORIES →
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
							<CaseStudyPreviewCard study={featuredStudy} />
							<div className="space-y-4">
								{featuredStudy.metrics && featuredStudy.metrics.length > 0 && (
									<div className="grid grid-cols-2 gap-4">
										{featuredStudy.metrics.slice(0, 4).map((m) => (
											<div key={m.label} className="neo-box bg-white p-4 text-center">
												<div className="font-display font-black text-2xl text-black">{m.value}</div>
												<div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{m.label}</div>
												{m.description && <div className="text-[9px] text-gray-400 font-bold">{m.description}</div>}
											</div>
										))}
									</div>
								)}
								<Link
									href="/case-studies"
									className="neo-btn bg-[#091E17] text-[#00D261] font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-lg block text-center"
								>
									VIEW ALL CASE STUDIES →
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

// ─── Footer Component ─────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer className="bg-[#091E17] text-white py-12 px-4 sm:px-6">
			<div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-white/20">
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
						<li><Link href="/pricing" className="hover:text-[#00D261]">Pricing & Calculator</Link></li>
					</ul>
				</div>

				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">RESOURCES</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><Link href="/blog" className="hover:text-[#00D261]">Blog</Link></li>
						<li><Link href="/case-studies" className="hover:text-[#00D261]">Case Studies</Link></li>
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

// ─── Main Page Export (Server Component) ─────────────────────────────────────
export default async function HomePage() {
	return (
		<div className="min-h-screen bg-[#FAF7F0] text-black selection:bg-[#00D261] selection:text-black">
			<Navbar />
			<HeroSection />
			<OfficialApiSection />
			<FeaturesStatusSection />
			<AllAppsSection />
			<ReviewsSection />
			<BlogAndCaseStudiesSection />
			<FAQSection />
			<CTABanner />
			<Footer />
		</div>
	);
}
