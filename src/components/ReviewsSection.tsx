"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ReviewItem = {
	id: string | number;
	author: string;
	rating: number;
	body: string;
	faviconUrl?: string;
	favicon?: { url?: string };
};

function ReviewCard({ review, darkMode = false }: { review: ReviewItem; darkMode?: boolean }) {
	const avatarUrl = review.favicon?.url || review.faviconUrl;
	const initials = review.author
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();

	return (
		<figure
			className={`w-[310px] sm:w-[360px] flex-shrink-0 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:-translate-y-1.5 transition-all duration-200 cursor-default select-none ${
				darkMode
					? "bg-[#121212] border border-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
					: "neo-box bg-white text-black hover:shadow-[6px_6px_0px_0px_#000000]"
			}`}
		>
			<div className="space-y-3">
				<div
					className="flex items-center gap-1 text-[#FFC107] text-sm tracking-widest font-black"
					aria-label={`Rating: ${review.rating || 5} out of 5 stars`}
				>
					{"★".repeat(Math.min(5, Math.max(1, review.rating || 5)))}
				</div>
				<blockquote
					className={`text-xs sm:text-sm font-medium leading-relaxed ${
						darkMode ? "text-gray-200" : "text-black"
					}`}
				>
					&quot;{review.body}&quot;
				</blockquote>
			</div>

			<figcaption
				className={`flex items-center gap-3 border-t pt-3 ${
					darkMode ? "border-white/10" : "border-gray-100"
				}`}
			>
				{avatarUrl ? (
					<Image
						src={avatarUrl}
						alt={`${review.author} avatar`}
						width={36}
						height={36}
						className={`w-9 h-9 rounded-xl object-contain p-1 ${
							darkMode ? "bg-white/10 border border-white/20" : "neo-box bg-white"
						}`}
					/>
				) : (
					<div className="w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center neo-box bg-[#00D261] text-black shadow-[1px_1px_0px_#000]">
						{initials}
					</div>
				)}
				<div>
					<cite
						className={`font-extrabold text-xs uppercase tracking-wider not-italic ${
							darkMode ? "text-white" : "text-black"
						}`}
					>
						{review.author}
					</cite>
				</div>
			</figcaption>
		</figure>
	);
}

export function ReviewsSection({ darkMode = false }: { darkMode?: boolean } = {}) {
	const [reviews, setReviews] = useState<ReviewItem[]>([]);

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
	const row2 = reviews.slice(half).length > 0 ? reviews.slice(half) : row1;

	return (
		<section
			className={`py-16 sm:py-20 overflow-hidden ${
				darkMode
					? "bg-[#181818] border-b border-white/10 text-white"
					: "bg-[#FAF7F0] border-b-[2.5px] border-black"
			}`}
		>
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-12 text-center space-y-4">
				<div
					className={`inline-block px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider ${
						darkMode
							? "rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760]"
							: "neo-box bg-[#00D261] text-black"
					}`}
				>
					MERCHANT REVIEWS
				</div>
				<h2
					className={`text-[36px] sm:text-[48px] font-display font-black uppercase tracking-tight ${
						darkMode ? "text-white" : "text-black"
					}`}
				>
					LOVED BY SHOPIFY STORES.
				</h2>
				<div
					className={`flex items-center justify-center gap-2 text-xs font-extrabold uppercase ${
						darkMode ? "text-gray-300" : "text-black"
					}`}
				>
					<span className="text-[#FFC107] text-base">★★★★★</span>
					<a href="https://apps.shopify.com/whatflow-official-api#reviews">READ MERCHANT REVIEWS ON THE SHOPIFY APP STORE</a>
				</div>
			</div>

			{/* Row 1: Forward Marquee */}
			<div className="mb-6 overflow-hidden py-2 group">
				<div className="animate-marquee-slow group-hover:[animation-play-state:paused] flex gap-6">
					{[...row1, ...row1, ...row1].map((review, i) => (
						<ReviewCard key={`r1-${review.id}-${i}`} review={review} darkMode={darkMode} />
					))}
				</div>
			</div>

			{/* Row 2: Reverse Marquee */}
			<div className="overflow-hidden py-2 group">
				<div className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex gap-6">
					{[...row2, ...row2, ...row2].map((review, i) => (
						<ReviewCard key={`r2-${review.id}-${i}`} review={review} darkMode={darkMode} />
					))}
				</div>
			</div>
		</section>
	);
}
