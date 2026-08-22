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

function ReviewCard({ review }: { review: ReviewItem }) {
	const avatarUrl = review.favicon?.url || review.faviconUrl;
	const initials = review.author
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();

	return (
		<div className="w-[310px] sm:w-[360px] flex-shrink-0 neo-box bg-white p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_#000000] transition-all duration-200 cursor-default select-none">
			<div className="space-y-3">
				<div className="flex items-center gap-1 text-[#FFC107] text-sm tracking-widest font-black">
					{"★".repeat(Math.min(5, Math.max(1, review.rating || 5)))}
				</div>
				<p className="text-xs sm:text-sm font-medium text-black leading-relaxed">
					"{review.body}"
				</p>
			</div>

			<div className="flex items-center gap-3 border-t border-gray-100 pt-3">
				{avatarUrl ? (
					<Image
						src={avatarUrl}
						alt={review.author}
						width={36}
						height={36}
						className="w-9 h-9 rounded-xl neo-box object-contain bg-white p-1"
					/>
				) : (
					<div className="w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center neo-box bg-[#00D261] text-black shadow-[1px_1px_0px_#000]">
						{initials}
					</div>
				)}
				<div>
					<div className="font-extrabold text-xs text-black uppercase tracking-wider">
						{review.author}
					</div>
				</div>
			</div>
		</div>
	);
}

export function ReviewsSection() {
	const [reviews, setReviews] = useState<ReviewItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch("/api/reviews?limit=50&where[active][equals]=true")
			.then((res) => res.json())
			.then((data: any) => {
				if (data && Array.isArray(data.docs)) {
					const fiveStar = data.docs.filter((r: ReviewItem) => (r.rating || 5) >= 5);
					setReviews(fiveStar);
				}
				setLoading(false);
			})
			.catch(() => {
				setReviews([]);
				setLoading(false);
			});
	}, []);

	if (loading || reviews.length === 0) {
		return null;
	}

	const half = Math.ceil(reviews.length / 2);
	const row1 = reviews.slice(0, half);
	const row2 = reviews.slice(half).length > 0 ? reviews.slice(half) : row1;

	return (
		<section className="bg-[#FAF7F0] py-16 sm:py-20 border-b-[2.5px] border-black overflow-hidden">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-12 text-center space-y-4">
				<div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
					MERCHANT REVIEWS
				</div>
				<h2 className="text-[36px] sm:text-[48px] font-display font-black uppercase text-black tracking-tight">
					LOVED BY SHOPIFY STORES.
				</h2>
				<div className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase text-black">
					<span className="text-[#FFC107] text-base">★★★★★</span>
					<span>5.0 RATING ON SHOPIFY APP STORE</span>
				</div>
			</div>

			{/* Row 1: Forward Marquee */}
			<div className="mb-6 overflow-hidden py-2 group">
				<div className="animate-marquee-slow group-hover:[animation-play-state:paused] flex gap-6">
					{[...row1, ...row1, ...row1].map((review, i) => (
						<ReviewCard key={`r1-${review.id}-${i}`} review={review} />
					))}
				</div>
			</div>

			{/* Row 2: Reverse Marquee */}
			<div className="overflow-hidden py-2 group">
				<div className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex gap-6">
					{[...row2, ...row2, ...row2].map((review, i) => (
						<ReviewCard key={`r2-${review.id}-${i}`} review={review} />
					))}
				</div>
			</div>
		</section>
	);
}
