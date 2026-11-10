"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useScrollScene } from "./useScrollScene";

/** Apple-style manifesto: a pinned paragraph whose words light up as you scroll. */
export function WordReveal({ text, accent = [], id }: { text: string; accent?: string[]; id?: string }) {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pin" });
	const words = text.split(" ");
	return (
		<section ref={ref} id={id} className="lp-words" aria-label={text}>
			<div className="lp-words-sticky">
				<div className="lp-shell">
					<p className="lp-words-text" aria-hidden="true" style={{ "--n": words.length } as CSSProperties}>
						{words.map((word, index) => (
							<span key={index} style={{ "--i": index } as CSSProperties} className={accent.includes(word.replace(/[.,]/g, "")) ? "is-accent" : undefined}>
								{word}{" "}
							</span>
						))}
					</p>
				</div>
			</div>
		</section>
	);
}

/**
 * Pinned horizontal gallery: vertical scroll moves the track sideways.
 * The section height is set so one pixel of scroll moves the track one pixel.
 */
export function HorizontalGallery({ children, head, className = "" }: { children: ReactNode; head: ReactNode; className?: string }) {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pin" });
	const track = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = ref.current;
		const element = track.current;
		if (!section || !element) return;
		const measure = () => {
			const distance = Math.max(0, element.scrollWidth - window.innerWidth + 40);
			section.style.setProperty("--dist", `${distance}px`);
			section.style.height = `${distance + window.innerHeight}px`;
		};
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		window.addEventListener("resize", measure);
		measure();
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [ref]);

	return (
		<section ref={ref} className={`lp-hgallery ${className}`}>
			<div className="lp-hgallery-sticky">
				<div className="lp-shell lp-hgallery-head">{head}</div>
				<div ref={track} tabIndex={0} role="region" aria-label="Product gallery" className="lp-hgallery-track">{children}</div>
				<div className="lp-hgallery-bar" aria-hidden="true"><span /></div>
			</div>
		</section>
	);
}

/** Media that grows from an inset rounded card to full-bleed as it scrolls into place. */
export function ClipReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
	const [ref] = useScrollScene<HTMLElement>({ mode: "pass" });
	return (
		<section ref={ref} className={`lp-clip ${className}`}>
			<div className="lp-clip-inner">{children}</div>
		</section>
	);
}

/** Cards that pin and stack; earlier cards shrink back as later ones arrive. */
export function StackCards({ children }: { children: ReactNode[] }) {
	const [ref] = useScrollScene<HTMLDivElement>({ mode: "pin" });
	return (
		<div ref={ref} className="lp-stack" style={{ "--n": children.length } as CSSProperties}>
			{children.map((child, index) => (
				<div key={index} className="lp-stack-card" style={{ "--i": index } as CSSProperties}>
					{child}
				</div>
			))}
		</div>
	);
}
