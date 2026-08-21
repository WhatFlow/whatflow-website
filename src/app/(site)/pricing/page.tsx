"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CountryRateItem } from "@/lib/country-rates-data";
import { getShopifyAppUrl } from "@/lib/shopify-app";

// ─── Plan Data Definition ───────────────────────────────────────────────────
interface PricingPlan {
	id: string;
	name: string;
	price: number;
	priceDisplay: string;
	popular?: boolean;
	trialBadge?: string;
	freeAllowance: number;
	freeAllowanceText: string;
	overageThreshold: string;
	overageRate: number;
	overageRateDisplay: string;
}

const ALL_FEATURES = [
	"Automated Order Fulfillment Alerts",
	"Custom WhatsApp Message Templates",
	"Template Library with Quick Setup",
	"WhatsApp Chat Button for Storefront",
	"Meta Business API Integration",
	"Live Delivery & Read Rate Analytics",
	"WhatsApp Order Confirmations",
	"Smart Auto-Reply Rules",
];

const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		price: 0,
		priceDisplay: "$0",
		trialBadge: undefined,
		freeAllowance: 100,
		freeAllowanceText: "First 100 Messages Sent",
		overageThreshold: "101+ Messages Sent",
		overageRate: 0.01,
		overageRateDisplay: "$0.01",
	},
	{
		id: "starter",
		name: "Starter",
		price: 4.99,
		priceDisplay: "$4.99",
		trialBadge: "7-day free trial",
		freeAllowance: 2000,
		freeAllowanceText: "First 2,000 Messages Sent",
		overageThreshold: "2,001+ Messages Sent",
		overageRate: 0.005,
		overageRateDisplay: "$0.005",
	},
	{
		id: "plus",
		name: "Plus",
		price: 9.99,
		priceDisplay: "$9.99",
		trialBadge: "7-day free trial",
		popular: true,
		freeAllowance: 5000,
		freeAllowanceText: "First 5,000 Messages Sent",
		overageThreshold: "5,001+ Messages Sent",
		overageRate: 0.004,
		overageRateDisplay: "$0.004",
	},
	{
		id: "growth",
		name: "Growth",
		price: 29,
		priceDisplay: "$29",
		trialBadge: "7-day free trial",
		freeAllowance: 20000,
		freeAllowanceText: "First 20,000 Messages Sent",
		overageThreshold: "20,001+ Messages Sent",
		overageRate: 0.0025,
		overageRateDisplay: "$0.0025",
	},
	{
		id: "scale",
		name: "Scale",
		price: 49.99,
		priceDisplay: "$49.99",
		trialBadge: "7-day free trial",
		freeAllowance: 40000,
		freeAllowanceText: "First 40,000 Messages Sent",
		overageThreshold: "40,001+ Messages Sent",
		overageRate: 0.002,
		overageRateDisplay: "$0.002",
	},
	{
		id: "ultimate",
		name: "Ultimate",
		price: 99,
		priceDisplay: "$99",
		trialBadge: "7-day free trial",
		freeAllowance: 75000,
		freeAllowanceText: "First 75,000 Messages Sent",
		overageThreshold: "75,001+ Messages Sent",
		overageRate: 0.0015,
		overageRateDisplay: "$0.0015",
	},
];

function WhatFlowLogo({ lightMode = true }: { lightMode?: boolean }) {
	return (
		<Link href="/" className="flex items-center gap-2.5 group">
			<div className="w-9 h-9 neo-box bg-[#00D261] flex items-center justify-center p-1.5 transition-transform group-hover:rotate-6">
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
		</Link>
	);
}

function PricingNavbar() {
	return (
		<header className="sticky top-0 z-50 bg-[#FAF7F0] border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
				<WhatFlowLogo />

				<nav className="hidden lg:flex items-center gap-8">
					<Link href="/" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HOME
					</Link>
					<Link href="/#products" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						PRODUCTS
					</Link>
					<Link href="/pricing" className="text-xs font-extrabold uppercase tracking-wider text-[#00D261] relative py-1 border-b-2 border-black">
						PRICING
					</Link>
					<Link href="/#features" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						FEATURES
					</Link>
					<Link href="/#faq" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						HELP
					</Link>
					<Link href="/#about" className="text-xs font-extrabold uppercase tracking-wider text-black hover:text-[#00D261] transition-colors">
						ABOUT
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<a
						href={getShopifyAppUrl("pricing_nav")}
						target="_blank"
						rel="noopener noreferrer"
						className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2"
					>
						INSTALL APP
					</a>
				</div>
			</div>
		</header>
	);
}

export default function PricingPage() {
	// ─── Calculator State ───────────────────────────────────────────────────────
	const [orders, setOrders] = useState<number>(1000);
	const [msgPerOrder, setMsgPerOrder] = useState<number>(2);
	const [msgType, setMsgType] = useState<"utility" | "marketing" | "authentication" | "service">("utility");
	const [selectedMarketName, setSelectedMarketName] = useState<string>("");
	const [ratesList, setRatesList] = useState<CountryRateItem[]>([]);
	const [ratesLoading, setRatesLoading] = useState<boolean>(true);
	const [ratesSearch, setRatesSearch] = useState<string>("");
	const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({
		free: true,
		starter: true,
		plus: true,
		growth: true,
		scale: true,
		ultimate: true,
	});

	// Fetch dynamic rates directly from Payload CMS API
	useEffect(() => {
		setRatesLoading(true);
		fetch("/api/country-rates?limit=300")
			.then((res) => {
				if (!res.ok) throw new Error("CMS endpoint returned error");
				return res.json();
			})
			.then((data: any) => {
				if (data && data.docs && Array.isArray(data.docs) && data.docs.length > 0) {
					setRatesList(data.docs);
					if (!selectedMarketName && data.docs[0]?.market) {
						setSelectedMarketName(data.docs[0].market);
					}
				}
			})
			.catch(() => {
				fetch("/api/rates/sync")
					.then((res) => res.json())
					.then((data: any) => {
						if (data && data.docs && Array.isArray(data.docs) && data.docs.length > 0) {
							setRatesList(data.docs);
							if (!selectedMarketName && data.docs[0]?.market) {
								setSelectedMarketName(data.docs[0].market);
							}
						}
					})
					.catch((err) => {
						console.log("Country rates will be loaded from CMS API:", err);
					});
			})
			.finally(() => {
				setRatesLoading(false);
			});
	}, []);

	// Active country rate object
	const selectedCountryRate = useMemo(() => {
		if (ratesList.length === 0) return null;
		return (
			ratesList.find((r) => r.market === selectedMarketName) ||
			ratesList[0]
		);
	}, [ratesList, selectedMarketName]);

	// Total messages
	const totalMessages = Math.max(1, orders * msgPerOrder);

	// Meta Rate per message
	const metaRatePerMsg = useMemo(() => {
		if (!selectedCountryRate) return 0;
		if (msgType === "marketing") return Number(selectedCountryRate.marketing ?? 0);
		if (msgType === "utility") return Number(selectedCountryRate.utility ?? 0);
		if (msgType === "authentication") return Number(selectedCountryRate.authentication ?? selectedCountryRate.utility ?? 0);
		if (msgType === "service") return Number(selectedCountryRate.service ?? 0);
		return Number(selectedCountryRate.utility ?? 0);
	}, [selectedCountryRate, msgType]);

	const metaCostTotal = totalMessages * metaRatePerMsg;

	// Calculate optimal plan & cost breakdown for each plan
	const planCalculations = useMemo(() => {
		return PRICING_PLANS.map((plan) => {
			const overageMsgs = Math.max(0, totalMessages - plan.freeAllowance);
			const overageFee = overageMsgs * plan.overageRate;
			const whatflowTotal = plan.price + overageFee;
			const grandTotal = whatflowTotal + metaCostTotal;
			return {
				...plan,
				overageMsgs,
				overageFee,
				whatflowTotal,
				grandTotal,
			};
		});
	}, [totalMessages, metaCostTotal]);

	// Determine recommended plan (the one with lowest total whatflow cost that accommodates volume best)
	const recommendedPlan = useMemo(() => {
		if (totalMessages <= 100) return PRICING_PLANS[0];
		if (totalMessages <= 2000) return PRICING_PLANS[1];
		if (totalMessages <= 5000) return PRICING_PLANS[2];
		if (totalMessages <= 20000) return PRICING_PLANS[3];
		if (totalMessages <= 40000) return PRICING_PLANS[4];
		return PRICING_PLANS[5];
	}, [totalMessages]);

	const recCalc = planCalculations.find((p) => p.id === recommendedPlan.id) || planCalculations[1];

	const toggleTier = (planId: string) => {
		setOpenTiers((prev) => ({
			...prev,
			[planId]: !prev[planId],
		}));
	};

	// Filtered country rates for the table
	const filteredRates = useMemo(() => {
		if (!ratesSearch.trim()) return ratesList;
		const q = ratesSearch.toLowerCase();
		return ratesList.filter((r) => r.market.toLowerCase().includes(q));
	}, [ratesList, ratesSearch]);

	return (
		<div className="min-h-screen bg-[#FAF7F0] text-black selection:bg-[#00D261] selection:text-black">
			<PricingNavbar />

			{/* ─── Top Hero & Interactive Calculator Section ────────────────── */}
			<section className="py-12 sm:py-16 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
				<div className="max-w-[1280px] mx-auto space-y-10">
					{/* Header Content */}
					<div className="text-center max-w-3xl mx-auto space-y-4">
						<div className="inline-flex items-center gap-2">
							<span className="neo-box bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
								PRICING — OFFICIAL API
							</span>
							<span className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase text-black">
								PAY FOR YOUR USAGE
							</span>
							<span className="neo-pill bg-[#E8F8F0] px-3 py-1 text-xs font-extrabold uppercase text-black">
								ALL FEATURES INCLUDED
							</span>
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black uppercase leading-[1.05] tracking-tight">
							PRICING THAT SCALES WITH{" "}
							<span className="text-stroke-green">EVERY ORDER.</span>
						</h1>

						<p className="text-base sm:text-lg text-gray-800 font-medium max-w-2xl mx-auto">
							Estimate WhatFlow software tiers and Meta direct WhatsApp charges before you choose a plan.
							Transparent, predictable, and zero lock-in.
						</p>
					</div>

					{/* ─── Interactive Calculator Card ─── */}
					<div className="neo-box-teal p-6 sm:p-8 lg:p-10 relative">
						<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 neo-box bg-[#00D261] px-6 py-1.5 font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black whitespace-nowrap shadow-[3px_3px_0px_#000]">
							CALCULATE YOUR MONTHLY COST
						</div>

						<div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_#000] grid grid-cols-1 lg:grid-cols-12 mt-2">
							{/* Left: Interactive Input Controls */}
							<div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
								{/* Monthly Orders Input */}
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<label className="text-xs font-extrabold uppercase tracking-wider text-black">
											MONTHLY SHOPIFY ORDERS
										</label>
										<span className="neo-pill bg-[#FAF7F0] px-2.5 py-0.5 text-xs font-black text-black">
											{orders.toLocaleString()} orders
										</span>
									</div>
									<input
										type="range"
										min={100}
										max={50000}
										step={100}
										value={orders}
										onChange={(e) => setOrders(parseInt(e.target.value) || 100)}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D261]"
									/>
									<div className="flex gap-2 pt-1">
										{[500, 1000, 2500, 5000, 10000, 25000].map((preset) => (
											<button
												key={preset}
												type="button"
												onClick={() => setOrders(preset)}
												className={`text-[11px] font-bold px-2 py-1 rounded border border-black transition-all ${
													orders === preset
														? "bg-[#00D261] text-black shadow-[1px_1px_0px_#000]"
														: "bg-[#FAF7F0] text-gray-700 hover:bg-gray-100"
												}`}
											>
												{preset >= 1000 ? `${preset / 1000}k` : preset}
											</button>
										))}
									</div>
								</div>

								{/* Messages Per Order & Message Category */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-extrabold uppercase tracking-wider text-black mb-1.5">
											MESSAGES PER ORDER
										</label>
										<select
											value={msgPerOrder}
											onChange={(e) => setMsgPerOrder(parseInt(e.target.value) || 1)}
											className="w-full bg-[#FAF7F0] border-2 border-black rounded-lg px-3 py-2.5 text-xs font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261]"
										>
											<option value={1}>1 message (e.g. Order Confirmation)</option>
											<option value={2}>2 messages (Confirmation + Tracking)</option>
											<option value={3}>3 messages (Confirm + Shipped + Review)</option>
											<option value={4}>4 messages (Full lifecycle automation)</option>
										</select>
									</div>

									<div>
										<label className="block text-xs font-extrabold uppercase tracking-wider text-black mb-1.5">
											MESSAGE CATEGORY
										</label>
										<select
											value={msgType}
											onChange={(e) => setMsgType(e.target.value as any)}
											className="w-full bg-[#FAF7F0] border-2 border-black rounded-lg px-3 py-2.5 text-xs font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261]"
										>
											<option value="utility">Utility (Order alerts & updates)</option>
											<option value="marketing">Marketing (Promotions & broadcast)</option>
											<option value="authentication">Authentication (OTPs & codes)</option>
											<option value="service">Service (Customer support)</option>
										</select>
									</div>
								</div>

								{/* Country / Market Selection */}
								<div>
									<label className="block text-xs font-extrabold uppercase tracking-wider text-black mb-1.5">
										CUSTOMER MARKET / COUNTRY (META RATE)
									</label>
									{ratesList.length > 0 ? (
										<>
											<select
												value={selectedMarketName}
												onChange={(e) => setSelectedMarketName(e.target.value)}
												className="w-full bg-[#FAF7F0] border-2 border-black rounded-lg px-3 py-2.5 text-xs font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261]"
											>
												{ratesList.map((rate) => (
													<option key={rate.market} value={rate.market}>
														{rate.market} ({rate.currency} ${rate[msgType] !== null && rate[msgType] !== undefined ? Number(rate[msgType]).toFixed(4) : "0.0250"}/msg)
													</option>
												))}
											</select>
											<p className="text-[11px] text-gray-600 font-medium mt-1">
												Official Meta rate for {selectedMarketName || selectedCountryRate?.market || "Selected Market"} ({msgType}):{" "}
												<strong className="text-black">${metaRatePerMsg.toFixed(4)} / msg</strong>
											</p>
										</>
									) : (
										<div className="bg-[#FAF7F0] border-2 border-dashed border-gray-400 rounded-lg px-3 py-2.5 text-xs font-medium text-gray-700">
											{ratesLoading ? "Loading rates from CMS..." : "No country rates imported yet (Manage via API / Payload Admin)"}
										</div>
									)}
								</div>

								<div className="pt-2">
									<a
										href="#plans"
										className="neo-btn w-full bg-black text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-lg flex items-center justify-center gap-2"
									>
										<span>EXPLORE ALL 6 PLANS BELOW</span>
										<span>↓</span>
									</a>
								</div>
							</div>

							{/* Right: Live Calculation Breakdown Panel */}
							<div className="lg:col-span-5 p-6 sm:p-8 bg-[#D5F5E3] border-t-2 lg:border-t-0 lg:border-l-2 border-black flex flex-col justify-between space-y-6">
								<div className="space-y-4">
									<div>
										<div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-700 mb-0.5">
											TOTAL ESTIMATED MESSAGES
										</div>
										<div className="text-4xl sm:text-5xl font-display font-black text-black">
											{totalMessages.toLocaleString()}
											<span className="text-base font-bold text-gray-700 ml-1.5">/ mo</span>
										</div>
									</div>

									<div className="neo-box bg-white p-4 space-y-3">
										<div className="flex items-center justify-between border-b border-gray-200 pb-2">
											<span className="text-xs font-bold text-gray-700">Recommended Plan:</span>
											<span className="neo-pill bg-[#00D261] px-2.5 py-0.5 text-xs font-black text-black uppercase">
												{recommendedPlan.name}
											</span>
										</div>

										<div className="flex items-center justify-between text-xs">
											<span className="font-semibold text-gray-700">WhatFlow Base Fee:</span>
											<span className="font-extrabold text-black">
												{recCalc.price === 0 ? "Free ($0)" : `$${recCalc.price.toFixed(2)}/mo`}
											</span>
										</div>

										<div className="flex items-center justify-between text-xs">
											<span className="font-semibold text-gray-700">WhatFlow Usage Overages:</span>
											<span className="font-extrabold text-black">
												{recCalc.overageFee === 0 ? "$0.00" : `$${recCalc.overageFee.toFixed(2)}`}
											</span>
										</div>

										<div className="flex items-center justify-between text-xs">
											<span className="font-semibold text-gray-700">Meta WhatsApp Direct Fee:</span>
											<span className="font-extrabold text-black">
												${metaCostTotal.toFixed(2)}
											</span>
										</div>

										<div className="border-t-2 border-black pt-2 flex items-center justify-between">
											<span className="text-xs font-black uppercase text-black">
												Total Estimated:
											</span>
											<span className="text-xl font-display font-black text-black">
												${recCalc.grandTotal.toFixed(2)}
												<span className="text-xs font-semibold text-gray-600">/mo</span>
											</span>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<a
										href={getShopifyAppUrl("pricing_recommended_calculator")}
										target="_blank"
										rel="noopener noreferrer"
										className="neo-btn w-full bg-[#00D261] text-black font-display font-black text-center py-3 px-4 rounded-lg text-sm uppercase tracking-wider block"
									>
										START WITH {recommendedPlan.name.toUpperCase()} PLAN
									</a>
									<div className="neo-pill bg-white/90 p-2 text-[10px] text-center font-bold text-gray-800 border border-black">
										ⓘ 7-day free trial on all paid plans. Meta charges billed directly by Meta.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ─── Pricing Plans Grid Section (Matching Image 1) ───────────── */}
			<section id="plans" className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
				<div className="max-w-[1280px] mx-auto space-y-12">
					{/* Section Title */}
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
							ALL FEATURES. EVERY PLAN.
						</div>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-black">
							CHOOSE THE RIGHT PLAN FOR YOUR STORE
						</h2>
						<p className="text-sm sm:text-base text-gray-700 font-medium">
							Every tier gives you full access to all WhatsApp marketing, automation, and analytics features.
							Only messaging allowance limits differ.
						</p>
					</div>

					{/* 6 Plan Cards Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{PRICING_PLANS.map((plan) => {
							const isOpen = openTiers[plan.id] ?? true;
							const isRec = recommendedPlan.id === plan.id;

							return (
								<div
									key={plan.id}
									className={`neo-box bg-white flex flex-col justify-between transition-transform hover:-translate-y-1 relative ${
										isRec ? "ring-4 ring-[#00D261] shadow-[8px_8px_0px_#000]" : ""
									}`}
								>
									{/* Badges on card */}
									<div className="absolute -top-3 right-4 flex gap-2">
										{isRec && (
											<span className="neo-box bg-[#00D261] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000]">
												BEST FOR YOUR VOLUME
											</span>
										)}
										{plan.popular && !isRec && (
											<span className="neo-box bg-[#FFC107] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000]">
												MOST POPULAR
											</span>
										)}
									</div>

									{/* Card Top / Header */}
									<div className="p-6 sm:p-7 space-y-6">
										<div>
											<h3 className="text-2xl font-display font-black text-black">
												{plan.name}
											</h3>
											<div className="mt-2 flex items-baseline gap-1.5">
												<span className="text-4xl sm:text-5xl font-display font-black text-black">
													{plan.priceDisplay}
												</span>
												<span className="text-sm font-bold text-gray-600">/ month</span>
											</div>
											<p className="text-xs font-semibold text-gray-500 mt-1">
												Plus usage charges
											</p>
										</div>

										{/* Features List (8 identical items) */}
										<div className="space-y-3 pt-2 border-t border-gray-200">
											<div className="text-xs font-extrabold uppercase tracking-wider text-black">
												Features
											</div>
											<ul className="space-y-2 text-xs font-medium text-gray-800">
												{ALL_FEATURES.map((feat, idx) => (
													<li key={idx} className="flex items-start gap-2">
														<span className="text-black font-black">✓</span>
														<span>{feat}</span>
													</li>
												))}
											</ul>
										</div>

										{/* Usage Prices Accordion / Box */}
										<div className="pt-2">
											<button
												type="button"
												onClick={() => toggleTier(plan.id)}
												className="flex items-center justify-between w-full text-xs font-bold text-gray-700 hover:text-black py-1 transition-colors"
											>
												<span className="flex items-center gap-1.5">
													<span>ⓘ</span>
													<span>{isOpen ? "Hide usage prices" : "Show usage prices"}</span>
												</span>
												<span>{isOpen ? "▲" : "▼"}</span>
											</button>

											{isOpen && (
												<div className="mt-2 border border-gray-300 rounded-lg overflow-hidden text-xs">
													<div className="grid grid-cols-2 bg-gray-100 font-bold p-2 text-gray-800 border-b border-gray-200">
														<div>Monthly usage tier</div>
														<div className="text-right">Cost per unit</div>
													</div>
													<div className="grid grid-cols-2 p-2 bg-white border-b border-gray-100 text-gray-700">
														<div>{plan.freeAllowanceText}</div>
														<div className="text-right font-bold text-green-700">Free</div>
													</div>
													<div className="grid grid-cols-2 p-2 bg-white text-gray-700">
														<div>{plan.overageThreshold}</div>
														<div className="text-right font-bold text-black">
															{plan.overageRateDisplay}
														</div>
													</div>
												</div>
											)}
										</div>
									</div>

									{/* Card Bottom / Footer */}
									<div className="p-6 sm:p-7 pt-0 space-y-3">
										<a
											href={getShopifyAppUrl(`pricing_plan_${plan.id}`)}
											target="_blank"
											rel="noopener noreferrer"
											className={`neo-btn w-full text-center py-3 px-4 rounded-lg font-extrabold text-xs uppercase tracking-wider block ${
												isRec || plan.popular
													? "bg-[#00D261] text-black"
													: "bg-black text-white hover:bg-gray-800"
											}`}
										>
											{plan.price === 0 ? "GET STARTED FREE" : "START 7-DAY FREE TRIAL"}
										</a>

										{plan.trialBadge && (
											<p className="text-center text-[11px] font-bold text-gray-600">
												{plan.trialBadge}
											</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ─── WhatsApp Country Rates Reference Table ─────────────────── */}
			<section id="rates-table" className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#E8F8F0]">
				<div className="max-w-[1280px] mx-auto space-y-8">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
						<div className="space-y-2">
							<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
								META OFFICIAL RATES DIRECTORY
							</div>
							<h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-black tracking-tight">
								WHATSAPP RATES BY MARKET
							</h2>
							<p className="text-xs sm:text-sm text-gray-700 font-medium max-w-xl">
								Meta charges per 24-hour conversation based on recipient market and message category.
								Manageable dynamically via Payload CMS.
							</p>
						</div>

						{/* Search Input */}
						<div className="w-full md:w-72">
							<input
								type="text"
								placeholder="Search country or market..."
								value={ratesSearch}
								onChange={(e) => setRatesSearch(e.target.value)}
								className="w-full bg-white border-2 border-black rounded-lg px-3.5 py-2 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#00D261] shadow-[2px_2px_0px_#000]"
							/>
						</div>
					</div>

					{/* Rates Table Box */}
					<div className="neo-box bg-white overflow-x-auto">
						{filteredRates.length > 0 ? (
							<table className="w-full text-left text-xs border-collapse">
								<thead>
									<tr className="bg-gray-100 border-b-2 border-black font-display font-black text-black uppercase tracking-wider">
										<th className="p-3.5 sm:p-4">Market</th>
										<th className="p-3.5 sm:p-4">Currency</th>
										<th className="p-3.5 sm:p-4">Marketing</th>
										<th className="p-3.5 sm:p-4">Utility</th>
										<th className="p-3.5 sm:p-4">Authentication</th>
										<th className="p-3.5 sm:p-4">Authentication-Intl</th>
										<th className="p-3.5 sm:p-4">Service</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 font-medium text-gray-900">
									{filteredRates.map((item, idx) => (
										<tr
											key={item.market + idx}
											className={`hover:bg-[#F0FDF4] transition-colors ${
												selectedMarketName === item.market ? "bg-[#D5F5E3] font-bold" : ""
											}`}
										>
											<td className="p-3.5 sm:p-4 font-bold text-black">
												{item.market}
											</td>
											<td className="p-3.5 sm:p-4 text-gray-700">{item.currency || "USD"}</td>
											<td className="p-3.5 sm:p-4 font-mono font-bold text-black">
												${Number(item.marketing).toFixed(4)}
											</td>
											<td className="p-3.5 sm:p-4 font-mono font-bold text-black">
												${Number(item.utility).toFixed(4)}
											</td>
											<td className="p-3.5 sm:p-4 font-mono text-gray-700">
												{item.authentication !== undefined && item.authentication !== null
													? `$${Number(item.authentication).toFixed(4)}`
													: "n/a"}
											</td>
											<td className="p-3.5 sm:p-4 font-mono text-gray-700">
												{item.authenticationInternational !== undefined &&
												item.authenticationInternational !== null
													? `$${Number(item.authenticationInternational).toFixed(4)}`
													: "n/a"}
											</td>
											<td className="p-3.5 sm:p-4 font-mono text-gray-700">
												{item.service !== undefined && item.service !== null
													? `$${Number(item.service).toFixed(4)}`
													: "n/a"}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="p-8 text-center space-y-2">
								<p className="text-sm font-bold text-gray-800">
									{ratesLoading ? "Loading country rates from CMS..." : "No country rates found."}
								</p>
								<p className="text-xs text-gray-500">
									Rates can be imported via the API endpoint <code>POST /api/rates/sync</code> or managed in the Payload CMS Admin panel under <strong>Country Rates</strong>.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* ─── Frequently Asked Questions ──────────────────────────────── */}
			<section className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
				<div className="max-w-[1000px] mx-auto space-y-10">
					<div className="text-center space-y-2">
						<div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
							COMMON QUESTIONS
						</div>
						<h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-black tracking-tight">
							FREQUENTLY ASKED QUESTIONS
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="neo-box bg-white p-6 space-y-2">
							<h3 className="text-sm font-extrabold uppercase tracking-wide text-black">
								How does WhatsApp billing work?
							</h3>
							<p className="text-xs text-gray-700 leading-relaxed">
								There are two parts: WhatFlow's monthly software plan (which includes your message allowance and automation platform) and Meta's direct conversation fees, billed based on your recipients' countries.
							</p>
						</div>

						<div className="neo-box bg-white p-6 space-y-2">
							<h3 className="text-sm font-extrabold uppercase tracking-wide text-black">
								What is included in the 7-day free trial?
							</h3>
							<p className="text-xs text-gray-700 leading-relaxed">
								You get full unlimited access to all features and templates. You won't be charged your WhatFlow subscription until the 7-day trial period ends, and you can cancel anytime with 1 click.
							</p>
						</div>

						<div className="neo-box bg-white p-6 space-y-2">
							<h3 className="text-sm font-extrabold uppercase tracking-wide text-black">
								Can I upgrade or downgrade plans anytime?
							</h3>
							<p className="text-xs text-gray-700 leading-relaxed">
								Yes! You can switch tiers seamlessly in your WhatFlow dashboard or Shopify App settings as your store's order volume grows.
							</p>
						</div>

						<div className="neo-box bg-white p-6 space-y-2">
							<h3 className="text-sm font-extrabold uppercase tracking-wide text-black">
								Do I need my own Meta Business API account?
							</h3>
							<p className="text-xs text-gray-700 leading-relaxed">
								Yes, WhatFlow integrates directly with the Official Meta Cloud API. Our guided onboarding helps you connect your Meta Business account in under 3 minutes.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ─── CTA Banner ──────────────────────────────────────────────── */}
			<section className="bg-[#091E17] text-white py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
				<div className="max-w-[1280px] mx-auto text-center space-y-6">
					<div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
						READY TO SCALE YOUR STORE?
					</div>

					<h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight">
						START AUTOMATING WHATSAPP <span className="text-stroke-green">TODAY.</span>
					</h2>

					<p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-medium">
						Join fast-growing Shopify stores recovering carts and confirming orders on autopilot.
					</p>

					<div className="pt-2">
						<a
							href={getShopifyAppUrl("pricing_bottom_cta")}
							target="_blank"
							rel="noopener noreferrer"
							className="neo-btn bg-[#00D261] text-black font-display font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl inline-block"
						>
							INSTALL WHATFLOW ON SHOPIFY
						</a>
					</div>
				</div>
			</section>

			{/* ─── Footer ──────────────────────────────────────────────────── */}
			<footer className="bg-[#0A6B56] text-white py-12 px-4 sm:px-6">
				<div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/20">
					<div className="space-y-4 md:col-span-2">
						<WhatFlowLogo lightMode={false} />
						<p className="text-xs text-white/80 max-w-sm leading-relaxed">
							Official Meta Business API integration for Shopify. Automated WhatsApp order confirmations, cart recovery, and customer engagement.
						</p>
					</div>

					<div className="space-y-3">
						<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">
							NAVIGATION
						</h4>
						<ul className="space-y-2 text-xs font-semibold text-gray-300">
							<li><Link href="/" className="hover:text-[#00D261]">Home</Link></li>
							<li><Link href="/#products" className="hover:text-[#00D261]">Products</Link></li>
							<li><Link href="/pricing" className="hover:text-[#00D261]">Pricing & Plans</Link></li>
							<li><Link href="/#features" className="hover:text-[#00D261]">Features</Link></li>
						</ul>
					</div>

					<div className="space-y-3">
						<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">
							SUPPORT & CMS
						</h4>
						<ul className="space-y-2 text-xs font-semibold text-gray-300">
							<li><Link href="/#faq" className="hover:text-[#00D261]">FAQ & Help</Link></li>
							<li><Link href="/admin" className="hover:text-[#00D261]">Admin Panel</Link></li>
						</ul>
					</div>
				</div>

				<div className="max-w-[1280px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 font-medium gap-2">
					<span>© {new Date().getFullYear()} WhatFlow. All rights reserved.</span>
					<span>Neo-brutalist theme for Shopify WhatsApp Apps.</span>
				</div>
			</footer>
		</div>
	);
}
