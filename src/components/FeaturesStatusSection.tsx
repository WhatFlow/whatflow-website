"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2.5]`} strokeLinecap="round" strokeLinejoin="round">
			<circle cx="12" cy="12" r="9" />
			<path d="M12 6v6l4 2" />
		</svg>
	);
}

function TShirtIcon({ className = "w-4 h-4" }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current stroke-[2]`} strokeLinecap="round" strokeLinejoin="round">
			<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
			<path d="M16 2a4 4 0 01-8 0" />
		</svg>
	);
}

export function FeaturesStatusSection() {
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
							<a href="#products" className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg">
								INSTALL WHATFLOW
							</a>
							<a href="#faq" className="neo-btn bg-white text-[#2563EB] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg">
								VIEW SETUP GUIDE
							</a>
						</div>
					</div>

					{/* Right Visual Box */}
					<div className="lg:col-span-6">
						<div className="neo-box-teal p-6 sm:p-8 relative">
							<div className="absolute top-0 left-6 -translate-y-1/2 neo-pill bg-[#FFC107] px-4 py-1 font-extrabold text-xs uppercase tracking-wider text-black">
								ONE-TAP RESPONSE
							</div>

							<div className="bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_#000] space-y-4">
								<div className="flex items-center gap-3 border-b border-gray-200 pb-3">
									<Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg" width={28} height={28} alt="WhatsApp" />
									<div className="flex-1">
										<div className="font-extrabold text-black text-xs">Alex Johnson</div>
										<div className="text-[10px] text-gray-500">10:30 AM</div>
									</div>
								</div>

								<div className="bg-[#FAF7F0] border border-black p-3.5 rounded-lg text-xs font-medium text-black">
									Hi Alex! Please confirm or cancel your order so we can prepare it.
								</div>

								<div className="bg-gray-50 border border-gray-300 p-3 rounded-lg flex items-center justify-between text-xs">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-white border border-black rounded flex items-center justify-center">
											<TShirtIcon className="w-5 h-5 text-black" />
										</div>
										<div>
											<div className="font-bold text-black">Order #1027</div>
											<div className="text-[10px] text-gray-500">Essentials Tee • Black / M • Qty: 1</div>
										</div>
									</div>
									<div className="font-extrabold text-black">$39.00</div>
								</div>

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

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<button
							onClick={() => setSelectedStatus("pending")}
							className={`neo-pill p-4 flex items-center justify-center gap-3 transition-all ${
								selectedStatus === "pending"
									? "bg-[#FFC107] text-black shadow-[4px_4px_0px_#000] scale-[1.02]"
									: "bg-[#FFF9E6] text-black hover:bg-[#FFC107]/20"
							}`}
						>
							<span className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center">
								<ClockIcon className="w-4 h-4 text-black" />
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
