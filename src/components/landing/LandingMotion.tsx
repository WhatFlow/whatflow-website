"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, useRef, type ReactNode } from "react";

let lenis: Lenis | null = null;

/** Smooth-scrolls to a page offset, through Lenis when it is running. */
export function scrollToY(top: number) {
	if (lenis) lenis.scrollTo(top, { duration: 1.2 });
	else window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Inertial smooth scrolling (Lenis, native scroll position so sticky scenes keep working)
 * and `.is-in` on every `[data-reveal]` element as it scrolls into view.
 * Content is only hidden once this runs (`.lp-js`), so it stays visible without JS.
 */
export function LandingMotion({ children }: { children: ReactNode }) {
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = root.current;
		if (!element) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let frame = 0;
		if (!reduced) {
			lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -72 } });
			const raf = (time: number) => {
				lenis?.raf(time);
				frame = requestAnimationFrame(raf);
			};
			frame = requestAnimationFrame(raf);
		}

		const targets = element.querySelectorAll<HTMLElement>("[data-reveal]");
		element.classList.add("lp-js");
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				observer.unobserve(entry.target);
			}
		}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
		targets.forEach((target) => observer.observe(target));
		// Keyboard users never land on hidden content.
		const reveal = (event: FocusEvent) => (event.target as HTMLElement).closest?.("[data-reveal]")?.classList.add("is-in");
		element.addEventListener("focusin", reveal);

		return () => {
			observer.disconnect();
			element.removeEventListener("focusin", reveal);
			cancelAnimationFrame(frame);
			lenis?.destroy();
			lenis = null;
		};
	}, []);

	return <div ref={root} className="lp">{children}</div>;
}
