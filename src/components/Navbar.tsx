"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function WhatFlowLogo({ lightMode = true }: { lightMode?: boolean }) {
	return (
		<Link href="/" className="wf-logo" id="nav-logo" data-light={lightMode}>
			<span className="wf-logo-mark">
				<Image src="/brand/whatflow-mark.webp" unoptimized alt="" width={28} height={28} />
			</span>
			<span className="wf-logo-word">WhatFlow</span>
		</Link>
	);
}

const primary = [
	{ href: "/features", label: "Features" },
	{ href: "/inbox", label: "Inbox", live: true },
	{ href: "/integrations", label: "Integrations" },
	{ href: "/pricing", label: "Pricing" },
	{ href: "/affiliate", label: "Affiliate" },
];

const resources = [
	{ href: "/solutions", label: "Solutions", body: "Cart recovery, COD verification and tracking" },
	{ href: "/compare", label: "Compare apps", body: "WhatFlow vs Wati, Interakt, Bitespeed and more" },
	{ href: "/blog", label: "Blog and guides", body: "Strategies and tutorials for Shopify" },
	{ href: "/case-studies", label: "Case studies", body: "Merchant stories and results" },
	{ href: "/changelog", label: "Changelog", body: "New features, improvements and fixes" },
	{ href: "/docs/mcp", label: "Connect your AI", body: "Use WhatFlow from Claude, ChatGPT and more" },
];

function isActive(pathname: string, href: string) {
	return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
	const pathname = usePathname();
	return <NavbarMenu key={pathname} pathname={pathname} />;
}

function NavbarMenu({ pathname }: { pathname: string }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [resourcesOpen, setResourcesOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const resourcesActive = resources.some((item) => isActive(pathname, item.href));

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (closeTimer.current) clearTimeout(closeTimer.current);
		};
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("wf-menu-open", mobileOpen);
		return () => document.documentElement.classList.remove("wf-menu-open");
	}, [mobileOpen]);

	const openResources = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		setResourcesOpen(true);
	};
	const closeResources = () => {
		closeTimer.current = setTimeout(() => setResourcesOpen(false), 150);
	};

	return (
		<header className="wf-nav" data-scrolled={scrolled || mobileOpen}>
			<div className="wf-nav-inner">
				<WhatFlowLogo />

				<nav className="wf-nav-links" aria-label="Main">
					{primary.map((item) => (
						<Link key={item.href} href={item.href} className="wf-nav-link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
							{item.label}
							{item.live && <span className="wf-nav-live" aria-hidden="true" />}
						</Link>
					))}
					<div className="wf-nav-drop" onMouseEnter={openResources} onMouseLeave={closeResources}>
						<button
							type="button"
							className="wf-nav-link"
							aria-expanded={resourcesOpen}
							aria-controls="wf-resources"
							data-active={resourcesActive}
							onClick={() => setResourcesOpen((open) => !open)}
						>
							Resources
							<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
						</button>
						<div id="wf-resources" className="wf-nav-menu" data-open={resourcesOpen} hidden={!resourcesOpen}>
							{resources.map((item) => (
								<Link key={item.href} href={item.href} className="wf-nav-menu-item" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
									<span>
										<b>{item.label}</b>
										<small>{item.body}</small>
									</span>
								</Link>
							))}
						</div>
					</div>
				</nav>

				<a href={getShopifyAppUrl("navbar_cta")} target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-green wf-nav-cta">
					Install app
				</a>

				<button
					type="button"
					className="wf-nav-burger"
					aria-expanded={mobileOpen}
					aria-controls="wf-mobile-menu"
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					onClick={() => setMobileOpen((open) => !open)}
				>
					<span /><span />
				</button>
			</div>

			<div id="wf-mobile-menu" className="wf-mobile" data-open={mobileOpen} hidden={!mobileOpen}>
				<nav aria-label="Mobile">
					{[...primary, ...resources].map((item, index) => (
						<Link key={item.href} href={item.href} className="wf-mobile-link" style={{ "--i": index } as React.CSSProperties} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
							{item.label}
						</Link>
					))}
				</nav>
				<a href={getShopifyAppUrl("mobile_nav_cta")} target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-green wf-mobile-cta">
					Install on Shopify
				</a>
			</div>
		</header>
	);
}
