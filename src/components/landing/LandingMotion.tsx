"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds `.is-in` to every `[data-reveal]` element as it scrolls into view.
 * Content is only hidden once this runs (`.lp-js`), so it stays visible without JS.
 */
export function LandingMotion({ children }: { children: ReactNode }) {
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = root.current;
		if (!element) return;
		const targets = element.querySelectorAll<HTMLElement>("[data-reveal]");
		if (!("IntersectionObserver" in window)) {
			targets.forEach((target) => target.classList.add("is-in"));
			return;
		}
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
		};
	}, []);

	return <div ref={root} className="lp">{children}</div>;
}
