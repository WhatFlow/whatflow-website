"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getShopifyAppUrl } from "@/lib/shopify-app";

// ─── SVG Icon Components ──────────────────────────────────────────────────────
function TShirtIcon({ className = "w-4 h-4" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2]`} strokeLinecap="round" strokeLinejoin="round">
			<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
			<path d="M16 2a4 4 0 01-8 0" />
		</svg>
	);
}

function CapHatIcon({ className = "w-4 h-4" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2]`} strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 4a8 8 0 0 0-8 8v2h16v-2a8 8 0 0 0-8-8z" />
			<path d="M2 14h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" />
		</svg>
	);
}

export function HeroSection() {
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
							href={getShopifyAppUrl("hero_cta")}
							target="_blank"
							rel="noopener noreferrer"
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

				{/* Right Visual Box */}
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
									<div className="flex items-center gap-2 text-[#A7F3D0]">
										<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
										<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
										<span className="text-xs font-bold text-white">⋮</span>
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
											Hi Alex,<br />
											Thanks for your order! We've received it and are getting it ready to ship.
										</p>
										<div className="bg-white border border-black p-2 rounded flex items-center gap-2 text-[11px]">
											<svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
												<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
												<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
												<line x1="12" y1="22.08" x2="12" y2="12" />
											</svg>
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
									<svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500 fill-none stroke-current stroke-2"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
									<div className="flex-1 bg-white border border-black px-2 py-1 rounded-full text-[10px] text-gray-400">
										Message
									</div>
									<div className="w-6 h-6 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-black font-bold">
										<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
									</div>
								</div>
							</div>

							{/* Shopify Receipt Card */}
							<div className="w-full sm:w-[220px] neo-box p-4 text-xs space-y-3 bg-white">
								<div className="flex items-center justify-between border-b border-gray-200 pb-2">
									<Image src="/shopify-brand-assets/01-logo/svg/logo-color-white-bg.svg" width={78} height={22} alt="Shopify" className="h-5 w-auto" />
								</div>
								<div className="flex items-center justify-between">
									<div>
										<div className="font-extrabold text-black text-sm">Order #1027</div>
										<div className="text-[10px] text-gray-500">May 12, 2024 at 10:30 AM</div>
									</div>
									<span className="neo-pill bg-[#FFC107] px-2 py-0.5 text-[9px] font-bold text-black">• Paid</span>
								</div>
								<div className="border-t border-gray-200 pt-2 space-y-2">
									<div className="text-[10px] font-bold uppercase text-gray-600">Order summary</div>
									<div className="flex items-center justify-between text-[11px]">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 bg-gray-100 border border-black rounded flex items-center justify-center"><TShirtIcon className="w-4 h-4 text-black" /></div>
											<div>
												<div className="font-bold">Essentials Tee</div>
												<div className="text-[9px] text-gray-500">Black / M <span className="ml-2 font-bold text-black">x 1</span></div>
											</div>
										</div>
										<div className="font-bold">$39.00</div>
									</div>
									<div className="flex items-center justify-between text-[11px]">
										<div className="flex items-center gap-2">
											<div className="w-8 h-8 bg-gray-100 border border-black rounded flex items-center justify-center"><CapHatIcon className="w-4 h-4 text-black" /></div>
											<div>
												<div className="font-bold">Logo Cap</div>
												<div className="text-[9px] text-gray-500">Black <span className="ml-2 font-bold text-black">x 1</span></div>
											</div>
										</div>
										<div className="font-bold">$50.00</div>
									</div>
								</div>
								<div className="border-t border-gray-200 pt-2 space-y-1 text-[11px]">
									<div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-bold text-black">$89.00</span></div>
									<div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-bold text-black">Free</span></div>
									<div className="flex justify-between font-extrabold text-black text-sm pt-1 border-t border-gray-200"><span>Total</span><span>$89.00</span></div>
								</div>
							</div>
						</div>
					</div>

					{/* Ticker Marquee Strip */}
					<div className="mt-6 -mx-0 bg-[#091E17] border-y-[2.5px] border-black py-4 overflow-hidden">
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
				</div>
			</div>
		</section>
	);
}
