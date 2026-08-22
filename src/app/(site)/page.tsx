// Server Component — no "use client" directive
import Image from "next/image";
import Link from "next/link";

// ─── Client Components (interactive) ─────────────────────────────────────────
import { HeroSection } from "@/components/HeroSection";
import { FeaturesStatusSection } from "@/components/FeaturesStatusSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { RoiCalculator } from "@/components/RoiCalculator";

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

import { getShopifyAppUrl } from "@/lib/shopify-app";



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
					Join 10,000+ Shopify merchants worldwide using WhatFlow to recover carts, verify orders, and delight customers.
				</p>
				<div>
					<a
						href={getShopifyAppUrl("bottom_cta_banner")}
						target="_blank"
						rel="noopener noreferrer"
						className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg inline-block shadow-[4px_4px_0px_#000]"
					>
						INSTALL ON SHOPIFY ➔
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
						<svg viewBox="0 0 24 24" className="w-8 h-8 text-black/40 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
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
					<div className="w-full h-full flex items-center justify-center">
						<svg viewBox="0 0 24 24" className="w-10 h-10 text-white/40 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
							<polyline points="17 6 23 6 23 12" />
						</svg>
					</div>
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
	let posts: Post[] = [];
	let featuredStudy: CaseStudy | null = null;

	try {
		const [postsData, studiesData] = await Promise.all([
			getPosts({ limit: 3, featured: true }).catch(() => getPosts({ limit: 3 })),
			getCaseStudies({ limit: 1, featured: true }).catch(() => getCaseStudies({ limit: 1 })),
		]);
		posts = postsData.docs;
		featuredStudy = studiesData.docs[0] ?? null;
	} catch {
		posts = [];
		featuredStudy = null;
	}

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

// ─── Main Page Export (Server Component) ─────────────────────────────────────
export default async function HomePage() {
	return (
		<div className="bg-[#FAF7F0] text-black selection:bg-[#00D261] selection:text-black">
			<HeroSection />
			<FeaturesStatusSection />
			{/* Interactive ROI Calculator on Homepage */}
			<section className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
				<div className="max-w-[1280px] mx-auto">
					<RoiCalculator />
				</div>
			</section>
			<ReviewsSection />
			<BlogAndCaseStudiesSection />
			<FAQSection />
			<CTABanner />
		</div>
	);
}
