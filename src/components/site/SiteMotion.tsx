"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let lenis: Lenis | null = null;

/** Smooth-scrolls to a page offset, through Lenis when it is running. */
export function scrollToY(top: number) {
	if (lenis) lenis.scrollTo(top, { duration: 1.2 });
	else window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Site-wide motion: inertial smooth scrolling (Lenis keeps the native scroll position,
 * so sticky scenes still work) and `data-in` on every `[data-reveal]` element as it
 * scrolls into view (an attribute React doesn't render, so streamed content still
 * hydrates cleanly). Content is only hidden once `.wf-js` is on <html>, so pages stay
 * readable without JS.
 */
export function SiteMotion() {
	const pathname = usePathname();

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -72 } });
		let frame = requestAnimationFrame(function raf(time) {
			lenis?.raf(time);
			frame = requestAnimationFrame(raf);
		});
		return () => {
			cancelAnimationFrame(frame);
			lenis?.destroy();
			lenis = null;
		};
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.add("wf-js");
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.setAttribute("data-in", "");
				observer.unobserve(entry.target);
			}
		}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
		const scan = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((element) => observer.observe(element));
		scan();
		// Client-rendered sections (fetched reviews, tabs) can mount after navigation.
		let pending = 0;
		const mutations = new MutationObserver(() => {
			if (!pending) pending = requestAnimationFrame(() => { pending = 0; scan(); });
		});
		mutations.observe(document.body, { childList: true, subtree: true });
		// Keyboard users never land on hidden content.
		const reveal = (event: FocusEvent) => (event.target as HTMLElement).closest?.("[data-reveal]")?.setAttribute("data-in", "");
		document.addEventListener("focusin", reveal);
		return () => {
			observer.disconnect();
			mutations.disconnect();
			cancelAnimationFrame(pending);
			document.removeEventListener("focusin", reveal);
		};
	}, [pathname]);

	return null;
}
