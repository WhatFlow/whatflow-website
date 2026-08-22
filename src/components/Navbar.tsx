"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function WhatFlowLogo({ lightMode = true }: { lightMode?: boolean }) {
	return (
		<Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
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
		</Link>
	);
}

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const pathname = usePathname();

	// Close mobile menu on route change
	useEffect(() => {
		setMobileMenuOpen(false);
		setResourcesDropdownOpen(false);
	}, [pathname]);

	const handleMouseEnter = () => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
		}
		setResourcesDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		dropdownTimeoutRef.current = setTimeout(() => {
			setResourcesDropdownOpen(false);
		}, 150);
	};

	const isResourcesActive = pathname.startsWith("/blog") || pathname.startsWith("/case-studies");

	return (
		<header className="sticky top-0 z-50 bg-[#FAF7F0] border-b-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
				<WhatFlowLogo />

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-6 lg:gap-8">
					<Link
						href="/features"
						className={`text-xs font-extrabold uppercase tracking-wider transition-colors ${
							pathname === "/features" ? "text-[#00D261]" : "text-black hover:text-[#00D261]"
						}`}
					>
						FEATURES
					</Link>

					<Link
						href="/integrations"
						className={`text-xs font-extrabold uppercase tracking-wider transition-colors ${
							pathname.startsWith("/integrations") ? "text-[#00D261]" : "text-black hover:text-[#00D261]"
						}`}
					>
						INTEGRATIONS
					</Link>

					<Link
						href="/pricing"
						className={`text-xs font-extrabold uppercase tracking-wider transition-colors ${
							pathname === "/pricing" ? "text-[#00D261]" : "text-black hover:text-[#00D261]"
						}`}
					>
						PRICING
					</Link>

					{/* Resources Dropdown */}
					<div
						className="relative"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<button
							type="button"
							onClick={() => setResourcesDropdownOpen((prev) => !prev)}
							className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 py-2 transition-colors ${
								isResourcesActive ? "text-[#00D261]" : "text-black hover:text-[#00D261]"
							}`}
							aria-expanded={resourcesDropdownOpen}
						>
							<span>RESOURCES</span>
							<svg
								viewBox="0 0 24 24"
								className={`w-3.5 h-3.5 fill-none stroke-current stroke-[2.5] transition-transform duration-200 ${
									resourcesDropdownOpen ? "rotate-180 text-[#00D261]" : ""
								}`}
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>

						{/* Dropdown Menu */}
						{resourcesDropdownOpen && (
							<div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50">
								<div className="neo-box bg-white p-2.5 rounded-xl shadow-[4px_4px_0px_0px_#000000] border-2 border-black space-y-1">
									<Link
										href="/blog"
										className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAF7F0] transition-colors group"
									>
										<div className="w-8 h-8 rounded-lg bg-[#E8F8F0] border border-black flex items-center justify-center flex-shrink-0 group-hover:bg-[#00D261] transition-colors">
											<svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-black" strokeLinecap="round" strokeLinejoin="round">
												<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
												<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
											</svg>
										</div>
										<div>
											<div className="text-xs font-extrabold uppercase text-black group-hover:text-[#0A6B56] transition-colors">
												BLOG &amp; GUIDES
											</div>
											<div className="text-[11px] text-gray-500 font-medium">
												Strategies, tips, and tutorials for Shopify
											</div>
										</div>
									</Link>

									<Link
										href="/case-studies"
										className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAF7F0] transition-colors group"
									>
										<div className="w-8 h-8 rounded-lg bg-[#FFF3CD] border border-black flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC107] transition-colors">
											<svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-black" strokeLinecap="round" strokeLinejoin="round">
												<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
											</svg>
										</div>
										<div>
											<div className="text-xs font-extrabold uppercase text-black group-hover:text-[#0A6B56] transition-colors">
												CASE STUDIES
											</div>
											<div className="text-[11px] text-gray-500 font-medium">
												Merchant success stories &amp; revenue results
											</div>
										</div>
									</Link>
								</div>
							</div>
						)}
					</div>
				</nav>

				{/* Desktop Right CTA */}
				<div className="hidden md:flex items-center gap-3">
					<a
						href={getShopifyAppUrl("navbar_cta")}
						target="_blank"
						rel="noopener noreferrer"
						className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#00be57]"
					>
						INSTALL APP
					</a>
				</div>

				{/* Mobile Hamburger Button */}
				<div className="flex md:hidden items-center gap-2">
					<button
						type="button"
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="neo-box p-2 bg-white text-black rounded-lg"
						aria-label="Toggle navigation menu"
					>
						{mobileMenuOpen ? (
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						) : (
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-[#FAF7F0] border-t-2 border-black px-4 py-6 space-y-4 shadow-lg animate-slide-down">
					<div className="flex flex-col space-y-3">
						<Link
							href="/features"
							className={`text-sm font-extrabold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors ${
								pathname === "/features" ? "bg-[#00D261] text-black" : "text-black hover:bg-white"
							}`}
						>
							FEATURES
						</Link>
						<Link
							href="/integrations"
							className={`text-sm font-extrabold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors ${
								pathname.startsWith("/integrations") ? "bg-[#00D261] text-black" : "text-black hover:bg-white"
							}`}
						>
							INTEGRATIONS
						</Link>
						<Link
							href="/pricing"
							className={`text-sm font-extrabold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors ${
								pathname === "/pricing" ? "bg-[#00D261] text-black" : "text-black hover:bg-white"
							}`}
						>
							PRICING
						</Link>

						<div className="pt-2 border-t border-black/10">
							<div className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-3 mb-2">
								RESOURCES
							</div>
							<Link
								href="/blog"
								className="flex items-center gap-3 px-3 py-2 text-sm font-extrabold uppercase text-black hover:bg-white rounded-lg"
							>
								<span>📖</span>
								<span>BLOG &amp; GUIDES</span>
							</Link>
							<Link
								href="/case-studies"
								className="flex items-center gap-3 px-3 py-2 text-sm font-extrabold uppercase text-black hover:bg-white rounded-lg"
							>
								<span>⭐</span>
								<span>CASE STUDIES</span>
							</Link>
						</div>
					</div>

					<div className="pt-4 border-t-2 border-black">
						<a
							href={getShopifyAppUrl("mobile_nav_cta")}
							target="_blank"
							rel="noopener noreferrer"
							className="neo-btn w-full bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-lg flex items-center justify-center gap-2"
						>
							INSTALL APP ON SHOPIFY
						</a>
					</div>
				</div>
			)}
		</header>
	);
}
