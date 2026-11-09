"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll-linked progress for a section.
 * - "pin": 0 when the section top reaches the sticky offset, 1 when its bottom leaves the viewport.
 * - "pass": 0 when the section enters the bottom of the viewport, 1 when it leaves the top.
 * - "exit": 0 while the section sits at the top, 1 once it has scrolled fully out under the nav.
 * Writes `--p` on the element every frame it moves and returns a discrete step for React.
 */
export function useScrollScene<T extends HTMLElement>(
	{ mode = "pin", steps = 0, offset = 72 }: { mode?: "pin" | "pass" | "exit"; steps?: number; offset?: number } = {},
): [RefObject<T | null>, number] {
	const ref = useRef<T>(null);
	const [step, setStep] = useState(0);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		let frame = 0;
		let lastStep = -1;
		let visible = true;

		const update = () => {
			frame = 0;
			const rect = element.getBoundingClientRect();
			const viewport = window.innerHeight;
			const progress =
				mode === "pin"
					? clamp((offset - rect.top) / Math.max(1, rect.height - (viewport - offset)))
					: mode === "exit"
						? clamp((offset - rect.top) / rect.height)
						: clamp((viewport - rect.top) / (viewport + rect.height));
			element.style.setProperty("--p", progress.toFixed(4));
			if (steps > 0) {
				const next = Math.min(steps - 1, Math.floor(progress * steps));
				if (next !== lastStep) {
					lastStep = next;
					setStep(next);
				}
			}
		};
		const schedule = () => {
			if (visible && !frame) frame = requestAnimationFrame(update);
		};
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) schedule();
		}, { rootMargin: "200px 0px" });

		observer.observe(element);
		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [mode, steps, offset]);

	return [ref, step];
}

/** Becomes true once the element scrolls into view (and stays true). */
export function useInView<T extends HTMLElement>(threshold = 0.3): [RefObject<T | null>, boolean] {
	const ref = useRef<T>(null);
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setInView(true);
				observer.disconnect();
			}
		}, { threshold });
		observer.observe(element);
		return () => observer.disconnect();
	}, [threshold]);
	return [ref, inView];
}
