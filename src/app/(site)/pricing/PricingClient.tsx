"use client";

import React, { useState, useEffect, useMemo, type CSSProperties } from "react";
import { Section, SectionHead, Hl } from "@/components/site/PageKit";
import type { CountryRateItem } from "@/lib/country-rates-data";
import { getShopifyAppUrl } from "@/lib/shopify-app";

const ORDER_PRESETS = [500, 1000, 2500, 5000, 10000, 25000];

const MSG_PER_ORDER_OPTIONS = [
	{ value: 1, hint: "e.g. order confirmation" },
	{ value: 2, hint: "Confirmation + tracking" },
	{ value: 3, hint: "Confirm + shipped + review" },
	{ value: 4, hint: "Full lifecycle automation" },
];

const MSG_TYPE_OPTIONS = [
	{ value: "utility", label: "Utility", hint: "Order alerts and updates" },
	{ value: "marketing", label: "Marketing", hint: "Promotions and broadcasts" },
	{ value: "authentication", label: "Authentication", hint: "OTPs and codes" },
	{ value: "service", label: "Service", hint: "Customer support" },
] as const;

const FAQ_TILES = [
	{
		q: "How does WhatsApp billing work?",
		a: "There are two parts: WhatFlow's monthly software plan (which includes your message allowance and automation platform) and applicable Meta messaging charges, which depend on market, category and messaging rules.",
		tone: "var(--mint)",
	},
	{
		q: "What is included in the 7-day free trial?",
		a: "You get full unlimited access to all features and templates. You won't be charged your WhatFlow subscription until the 7-day trial period ends, and you can cancel anytime with 1 click.",
		tone: "#fff3c4",
	},
	{
		q: "Can I upgrade or downgrade plans anytime?",
		a: "Yes. You can switch tiers in your WhatFlow dashboard or Shopify app settings as your store's order volume grows.",
		tone: "var(--sky)",
	},
	{
		q: "Do I need my own Meta Business API account?",
		a: "Yes, WhatFlow integrates directly with the official Meta Cloud API. Our guided onboarding helps you connect your Meta Business account. Setup time depends on account readiness and Meta verification.",
		tone: "var(--pink)",
	},
];

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
	"Automated order fulfillment alerts",
	"Custom WhatsApp message templates",
	"Template library with quick setup",
	"WhatsApp chat button for your storefront",
	"Meta Business API integration",
	"Live delivery and read rate analytics",
	"WhatsApp order confirmations",
	"Smart auto-reply rules",
];

const PRICING_PLANS: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		price: 0,
		priceDisplay: "$0",
		trialBadge: undefined,
		freeAllowance: 100,
		freeAllowanceText: "First 100 messages sent",
		overageThreshold: "101+ messages sent",
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
		freeAllowanceText: "First 2,000 messages sent",
		overageThreshold: "2,001+ messages sent",
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
		freeAllowanceText: "First 5,000 messages sent",
		overageThreshold: "5,001+ messages sent",
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
		freeAllowanceText: "First 20,000 messages sent",
		overageThreshold: "20,001+ messages sent",
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
		freeAllowanceText: "First 40,000 messages sent",
		overageThreshold: "40,001+ messages sent",
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
		freeAllowanceText: "First 75,000 messages sent",
		overageThreshold: "75,001+ messages sent",
		overageRate: 0.0015,
		overageRateDisplay: "$0.0015",
	},
];

export function PricingClient() {
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
		const controller = new AbortController();
		fetch("/api/country-rates?limit=300&where[active][equals]=true", { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error("Country rates unavailable");
				return res.json() as Promise<{ docs?: CountryRateItem[] }>;
			})
			.then((data) => {
				if (!controller.signal.aborted && Array.isArray(data.docs) && data.docs.length) {
					setRatesList(data.docs);
					setSelectedMarketName(previous => previous || data.docs![0].market);
				}
			})
			.catch(() => { /* Keep the software-only estimate when rates are unavailable. */ })
			.finally(() => { if (!controller.signal.aborted) setRatesLoading(false); });
		return () => controller.abort();
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
		if (!selectedCountryRate) return null;
		const raw = selectedCountryRate[msgType];
		if (raw == null || String(raw).trim() === "") return null;
		const rate = Number(raw);
		return Number.isFinite(rate) && rate >= 0 ? rate : null;
	}, [selectedCountryRate, msgType]);

	const metaCostTotal = metaRatePerMsg === null ? null : totalMessages * metaRatePerMsg;

	// Calculate optimal plan & cost breakdown for each plan
	const planCalculations = useMemo(() => {
		return PRICING_PLANS.map((plan) => {
			const overageMsgs = Math.max(0, totalMessages - plan.freeAllowance);
			const overageFee = overageMsgs * plan.overageRate;
			const whatflowTotal = plan.price + overageFee;
			const grandTotal = whatflowTotal + (metaCostTotal ?? 0);
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


	const ordersFill = `${((orders - 100) / (50000 - 100)) * 100}%`;
	const msgTypeHint = MSG_TYPE_OPTIONS.find((option) => option.value === msgType)?.hint;
	const msgPerOrderHint = MSG_PER_ORDER_OPTIONS.find((option) => option.value === msgPerOrder)?.hint;
	const formatRate = (value: number | string | null | undefined) =>
		value !== undefined && value !== null ? `$${Number(value).toFixed(4)}` : "n/a";

	return (
		<div className="bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--green)] selection:text-black">
      <header className="wf-shell wf-pricing-header">
        <div><h1>Shopify WhatsApp app pricing.</h1><p>Every plan includes the same features and unlimited team inbox seats. Meta bills applicable messaging charges separately, with zero WhatFlow markup.</p></div>
        <nav aria-label="Pricing sections">
          <a href="#plans" className="wf-btn wf-btn-green">Compare monthly plans</a>
          <a href="#calculator" className="wf-btn wf-btn-ghost">Estimate monthly cost</a>
          <a href="#rates-table" className="wf-btn wf-btn-ghost">See Meta messaging rates</a>
        </nav>
      </header>

			{/* ─── Plans ─── */}
			<Section tone="paper" id="plans" label="pr-plans-title">
				<SectionHead
					id="pr-plans-title"
					center
					title={<>Choose the right plan <Hl>for your store.</Hl></>}
					sub="Every tier gives you full access to all WhatsApp marketing, automation, and analytics features. Only messaging allowance limits differ."
				/>

				<div className="pr-plans">
					{PRICING_PLANS.map((plan, index) => {
						const isOpen = openTiers[plan.id] ?? true;
						const isRec = recommendedPlan.id === plan.id;
						const featured = Boolean(plan.popular);

						return (
							<article
								key={plan.id}
								className="pr-plan"
								data-featured={featured}
								data-rec={isRec}
								data-reveal
								style={{ "--d": `${(index % 3) * 80}ms` } as CSSProperties}
							>
								<div className="pr-plan-badges">
									{isRec && <span className="pr-badge pr-badge-rec">Best for your volume</span>}
									{plan.popular && !isRec && <span className="pr-badge pr-badge-pop">Most popular</span>}
								</div>

								<h3>{plan.name}</h3>
								<div className="pr-price">
									<b className="pr-num">{plan.priceDisplay}</b>
									<span>/ month</span>
								</div>
								<p className="pr-sub">Plus usage charges</p>
								<span className="pr-allow pr-num">{plan.freeAllowance.toLocaleString()} messages free</span>

								<a
									href={getShopifyAppUrl(`pricing_plan_${plan.id}`)}
									target="_blank"
									rel="noopener noreferrer"
									className={`wf-btn ${isRec || plan.popular ? "wf-btn-green" : "wf-btn-dark"}`}
								>
									{plan.price === 0 ? "Get started free" : "Start 7-day free trial"}
								</a>
								{plan.trialBadge && <p className="pr-trial">{plan.trialBadge}</p>}

								<ul className="pr-feats" aria-label={`${plan.name} plan features`}>
									{ALL_FEATURES.map((feat) => (
										<li key={feat}>
											<span className="pr-check" aria-hidden="true">✓</span>
											<span>{feat}</span>
										</li>
									))}
								</ul>

								<div className="pr-usage">
									<button
										type="button"
										onClick={() => toggleTier(plan.id)}
										className="pr-usage-toggle"
										aria-expanded={isOpen}
										aria-controls={`pr-usage-${plan.id}`}
									>
										<span>{isOpen ? "Hide usage prices" : "Show usage prices"}</span>
										<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
									</button>
									<div id={`pr-usage-${plan.id}`} className="pr-usage-panel" data-open={isOpen} inert={!isOpen}>
										<div>
											<div className="pr-usage-table">
												<div className="pr-usage-th">
													<span>Monthly usage tier</span>
													<span>Cost per unit</span>
												</div>
												<div>
													<span>{plan.freeAllowanceText}</span>
													<span className="pr-usage-free">Free</span>
												</div>
												<div>
													<span>{plan.overageThreshold}</span>
													<b className="pr-num">{plan.overageRateDisplay}</b>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</Section>

			{/* ─── Interactive calculator ─── */}
			<Section tone="white" id="calculator" label="pr-calc-title">
				<SectionHead
					id="pr-calc-title"
					title={<>Calculate your <Hl>monthly cost.</Hl></>}
					sub="Pick your order volume, messages per order and customer market. We'll match the plan and show the WhatFlow and Meta parts of your bill."
				/>

				<div className="pr-calc" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
					{/* Left: inputs */}
					<div className="pr-calc-inputs">
						<div>
							<div className="pr-label-row">
								<label htmlFor="pr-orders" className="pr-label">Monthly Shopify orders</label>
								<span className="pr-value pr-num">{orders.toLocaleString()} orders</span>
							</div>
							<input
								id="pr-orders"
								type="range"
								min={100}
								max={50000}
								step={100}
								value={orders}
								onChange={(e) => setOrders(parseInt(e.target.value) || 100)}
								className="pr-range"
								style={{ "--fill": ordersFill } as CSSProperties}
							/>
							<div className="pr-seg pr-seg-sm" role="group" aria-label="Order volume presets" style={{ marginTop: 14 }}>
								{ORDER_PRESETS.map((preset) => (
									<button key={preset} type="button" aria-pressed={orders === preset} onClick={() => setOrders(preset)}>
										{preset >= 1000 ? `${preset / 1000}k` : preset}
									</button>
								))}
							</div>
						</div>

						<div>
							<span id="pr-per-order" className="pr-label">Messages per order</span>
							<div className="pr-seg" role="radiogroup" aria-labelledby="pr-per-order">
								{MSG_PER_ORDER_OPTIONS.map((option) => (
									<button
										key={option.value}
										type="button"
										role="radio"
										aria-checked={msgPerOrder === option.value}
										aria-label={`${option.value} ${option.value === 1 ? "message" : "messages"} (${option.hint})`}
										onClick={() => setMsgPerOrder(option.value)}
									>
										{option.value} {option.value === 1 ? "message" : "messages"}
									</button>
								))}
							</div>
							<p className="pr-hint">{msgPerOrderHint}</p>
						</div>

						<div>
							<span id="pr-category" className="pr-label">Message category</span>
							<div className="pr-seg" role="radiogroup" aria-labelledby="pr-category">
								{MSG_TYPE_OPTIONS.map((option) => (
									<button
										key={option.value}
										type="button"
										role="radio"
										aria-checked={msgType === option.value}
										onClick={() => setMsgType(option.value)}
									>
										{option.label}
									</button>
								))}
							</div>
							<p className="pr-hint">{msgTypeHint}</p>
						</div>

						<div>
							<label htmlFor="pr-market" className="pr-label">Customer market / country (Meta rate)</label>
							{ratesList.length > 0 ? (
								<>
									<select
										id="pr-market"
										value={selectedMarketName}
										onChange={(e) => setSelectedMarketName(e.target.value)}
										className="pr-select"
									>
										{ratesList.map((rate) => (
											<option key={rate.market} value={rate.market}>
												{rate.market} ({rate.currency} ${rate[msgType] !== null && rate[msgType] !== undefined ? Number(rate[msgType]).toFixed(4) : "0.0250"}/msg)
											</option>
										))}
									</select>
									<p className="pr-hint">
										Official Meta rate for {selectedMarketName || selectedCountryRate?.market || "selected market"} ({msgType}):{" "}
										<strong className="pr-num">{metaRatePerMsg === null ? "Rate unavailable" : `$${metaRatePerMsg.toFixed(4)} / msg`}</strong>
									</p>
								</>
							) : (
								<div id="pr-market" className="pr-empty">
									{ratesLoading ? "Loading rates from CMS..." : "No country rates imported yet (manage via API / Payload admin)"}
								</div>
							)}
						</div>

						<a href="#plans" className="wf-btn wf-btn-dark">
							<span>Explore all 6 plans below</span>
						</a>
					</div>

					{/* Right: live breakdown */}
					<div className="pr-calc-out" aria-live="polite">
						<div>
							<div className="pr-out-label">Total estimated messages</div>
							<div className="pr-out-big pr-num">
								{totalMessages.toLocaleString()}
								<small>/ mo</small>
							</div>

							<div className="pr-bill">
								<div className="pr-bill-head">
									<span>Recommended plan</span>
									<span key={recommendedPlan.id} className="pr-bill-plan">{recommendedPlan.name}</span>
								</div>
								<div className="pr-bill-row">
									<span>WhatFlow base fee</span>
									<b className="pr-num">{recCalc.price === 0 ? "Free ($0)" : `$${recCalc.price.toFixed(2)}/mo`}</b>
								</div>
								<div className="pr-bill-row">
									<span>WhatFlow usage overages</span>
									<b className="pr-num">{recCalc.overageFee === 0 ? "$0.00" : `$${recCalc.overageFee.toFixed(2)}`}</b>
								</div>
								<div className="pr-bill-row">
									<span>Meta WhatsApp direct fee</span>
									<b className="pr-num">{metaCostTotal === null ? "Not included: rate unavailable" : `$${metaCostTotal.toFixed(2)}`}</b>
								</div>
								<div className="pr-bill-total">
									<span>{metaCostTotal === null ? "WhatFlow subtotal" : "Total estimated"}</span>
									<span>
										<b className="pr-num">${recCalc.grandTotal.toFixed(2)}</b>
										<small>/mo</small>
									</span>
								</div>
							</div>
						</div>

						<div>
							<a
								href={getShopifyAppUrl("pricing_recommended_calculator")}
								target="_blank"
								rel="noopener noreferrer"
								className="wf-btn wf-btn-green"
							>
								Start with {recommendedPlan.name} plan
							</a>
							<p className="pr-out-note">7-day free trial on all paid plans. Meta charges billed directly by Meta.</p>
						</div>
					</div>
				</div>
			</Section>

			{/* ─── Meta rates directory ─── */}
			<Section tone="mint" id="rates-table" label="pr-rates-title">
				<div className="pr-rates-head">
					<SectionHead
						id="pr-rates-title"
						title={<>WhatsApp rates <Hl>by market.</Hl></>}
						sub="Meta's USD list rates per delivered message, effective October 1, 2026. Service replies are free for the first 1,000 per business phone number each month, then charged at the service rate shown. Meta bills these directly, with zero WhatFlow markup."
					/>
					<div className="pr-search" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
						<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
						<input
							type="search"
							aria-label="Search country or market"
							placeholder="Search country or market..."
							value={ratesSearch}
							onChange={(e) => setRatesSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className="pr-table-wrap" role="region" aria-label="Country messaging rates" tabIndex={0} data-reveal style={{ "--d": "160ms" } as CSSProperties}>
					{filteredRates.length > 0 ? (
						<table className="pr-table">
							<thead>
								<tr>
									<th scope="col">Market</th>
									<th scope="col">Currency</th>
									<th scope="col">Marketing</th>
									<th scope="col">Utility</th>
									<th scope="col">Authentication</th>
									<th scope="col">Authentication-Intl</th>
									<th scope="col">Service (after 1,000/mo)</th>
								</tr>
							</thead>
							<tbody>
								{filteredRates.map((item, idx) => (
									<tr key={item.market + idx} data-selected={selectedMarketName === item.market}>
										<td><b>{item.market}</b></td>
										<td>{item.currency || "USD"}</td>
										<td className="pr-mono"><b>${Number(item.marketing).toFixed(4)}</b></td>
										<td className="pr-mono"><b>${Number(item.utility).toFixed(4)}</b></td>
										<td className="pr-mono">{formatRate(item.authentication)}</td>
										<td className="pr-mono">{formatRate(item.authenticationInternational)}</td>
										<td className="pr-mono">{formatRate(item.service)}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="pr-table-empty">
							<p><b>{ratesLoading ? "Loading country rates from CMS..." : "No country rates found."}</b></p>
							<p style={{ marginTop: 8, color: "#5a615c" }}>
								Current rates are available on the <a href="https://business.whatsapp.com/products/platform-pricing" rel="noopener noreferrer">official WhatsApp pricing page</a>. If a rate is unavailable here, the calculator shows WhatFlow charges only.
							</p>
						</div>
					)}
				</div>
			</Section>

			{/* ─── FAQ ─── */}
			<Section tone="paper" label="pr-faq-title">
				<SectionHead id="pr-faq-title" center title={<>Frequently asked <Hl>questions.</Hl></>} />
				<div className="wf-grid wf-grid-2 pr-faq">
					{FAQ_TILES.map((faq, index) => (
						<div
							key={faq.q}
							className="wf-card"
							data-reveal
							style={{ background: faq.tone, "--d": `${(index % 2) * 80}ms` } as CSSProperties}
						>
							<h3>{faq.q}</h3>
							<p>{faq.a}</p>
						</div>
					))}
				</div>
			</Section>
		</div>
	);
}
