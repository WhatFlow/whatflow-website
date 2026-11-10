"use client";

import { ReviewRotationButton } from "@/components/ReviewRotationButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionHead } from "@/components/site/PageKit";

type ReviewItem = {
	id: string | number;
	author: string;
	rating: number;
	body: string;
	faviconUrl?: string;
	favicon?: { url?: string };
};

function ReviewCard({ review, darkMode = false, duplicate = false }: { review: ReviewItem; darkMode?: boolean; duplicate?: boolean }) {
	const avatarUrl = review.favicon?.url || review.faviconUrl;
	const initials = review.author
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();

	return (
		<figure
			aria-hidden={duplicate || undefined}
			data-review-copy={duplicate || undefined}
			className={`w-[310px] sm:w-[360px] flex-shrink-0 p-6 rounded-[24px] flex flex-col justify-between gap-5 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 cursor-default select-none ${
				darkMode
					? "bg-white/[0.04] border border-white/10 text-white hover:border-[var(--green)]/40"
					: "bg-white border-[2.5px] border-[var(--ink,#0b0f0c)] text-[var(--ink,#0b0f0c)] hover:shadow-[6px_6px_0_var(--ink,#0b0f0c)]"
			}`}
		>
			<div className="space-y-3">
				<div
					className="flex items-center gap-1 text-[var(--yellow)] text-base"
					aria-label={`Rating: ${review.rating || 5} out of 5 stars`}
				>
					{"★".repeat(Math.min(5, Math.max(1, review.rating || 5)))}
				</div>
				<blockquote
					className={`text-sm sm:text-[15px] leading-relaxed ${
						darkMode ? "text-white/80" : "text-[var(--text-body)]"
					}`}
				>
					&ldquo;{review.body}&rdquo;
				</blockquote>
			</div>

			<figcaption
				className={`flex items-center gap-3 border-t pt-4 ${
					darkMode ? "border-white/10" : "border-[var(--ink)]/10"
				}`}
			>
				{avatarUrl ? (
					<Image
						src={avatarUrl}
						alt=""
						width={36}
						height={36}
						className={`w-9 h-9 rounded-full object-contain p-1 ${
							darkMode ? "bg-white/10 border border-white/20" : "bg-white border-2 border-[var(--ink,#0b0f0c)]"
						}`}
					/>
				) : (
					<div
						className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center bg-[var(--green)] text-black ${
							darkMode ? "" : "border-2 border-[var(--ink,#0b0f0c)]"
						}`}
					>
						{initials}
					</div>
				)}
				<div>
					<cite className={`font-bold text-sm not-italic ${darkMode ? "text-white" : "text-[var(--ink,#0b0f0c)]"}`}>
						{review.author}
					</cite>
				</div>
			</figcaption>
		</figure>
	);
}

export function ReviewsSection({ darkMode = false }: { darkMode?: boolean } = {}) {
	const [reviews, setReviews] = useState<ReviewItem[]>([]);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		fetch("/api/reviews?limit=50&where[active][equals]=true")
			.then((res) => res.json() as Promise<{ docs?: ReviewItem[] }>)
			.then((data) => {
				if (data && Array.isArray(data.docs) && data.docs.length > 0) {
					const fiveStar = data.docs.filter((r: ReviewItem) => (r.rating || 5) >= 5);
					if (fiveStar.length > 0) {
						setReviews(fiveStar);
					}
				}
			})
			.catch(() => {
				// Leave testimonials empty when no published reviews are available.
			});
	}, []);

	if (reviews.length === 0) return null;

	const half = Math.ceil(reviews.length / 2);
	const row1 = reviews.slice(0, half);
	const row2 = reviews.slice(half);

	return (
		<section
			className="wf-section wf-review-marquee overflow-hidden"
			data-paused={paused}
			data-tone={darkMode ? "dark" : "paper"}
		>
			<div className="wf-shell mb-4">
				<SectionHead
					center
					light={darkMode}
					kicker="Merchant reviews"
					title="Loved by Shopify stores."
					sub={
						<span className="inline-flex flex-wrap items-center justify-center gap-2">
							<span className="text-[var(--yellow)]" aria-hidden="true">★★★★★</span>
							<a
								href="https://apps.shopify.com/whatflow-official-api#reviews"
								className={`font-bold underline underline-offset-4 decoration-2 ${darkMode ? "decoration-[var(--green)]" : "decoration-[var(--green-rich)]"}`}
							>
								Read merchant reviews on the Shopify App Store
							</a>
						</span>
					}
				/>
				<div className="wf-review-controls">
					<ReviewRotationButton paused={paused} onToggle={() => setPaused((value) => !value)} />
				</div>
			</div>

			{/* Row 1: Forward Marquee */}
			<div role="region" aria-label="Merchant reviews, first row" tabIndex={0} className="wf-review-viewport mb-6 overflow-hidden py-2 group">
				<div className="animate-marquee-slow group-hover:[animation-play-state:paused] flex gap-6">
					{[...row1, ...row1, ...row1].map((review, i) => (
						<ReviewCard key={`r1-${review.id}-${i}`} review={review} darkMode={darkMode} duplicate={i >= row1.length} />
					))}
				</div>
			</div>

			{/* Row 2: Reverse Marquee */}
			{row2.length > 0 && <div role="region" aria-label="Merchant reviews, second row" tabIndex={0} className="wf-review-viewport overflow-hidden py-2 group">
				<div className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex gap-6">
					{[...row2, ...row2, ...row2].map((review, i) => (
						<ReviewCard key={`r2-${review.id}-${i}`} review={review} darkMode={darkMode} duplicate={i >= row2.length} />
					))}
				</div>
			</div>}
		</section>
	);
}
