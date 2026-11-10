"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToY } from "@/components/site/SiteMotion";

export const featureSections = [
	{ id: "automations", label: "Order automations" },
	{ id: "recovery", label: "Recovery" },
	{ id: "shipping", label: "Shipping Journey" },
	{ id: "auto-replies", label: "Auto-replies" },
	{ id: "broadcasts", label: "Broadcasts" },
	{ id: "inbox", label: "Team inbox" },
	{ id: "analytics", label: "Analytics" },
	{ id: "flow", label: "Shopify Flow" },
	{ id: "shopify", label: "Built into Shopify" },
	{ id: "ai", label: "AI" },
];

/** Sticky pill navigation with scroll-spy for the features page. */
export function FeatureNav() {
	const [active, setActive] = useState(featureSections[0].id);
	const track = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const update = () => {
			const line = window.innerHeight * 0.35;
			let current = featureSections[0].id;
			for (const section of featureSections) {
				const element = document.getElementById(section.id);
				if (element && element.getBoundingClientRect().top <= line) current = section.id;
			}
			setActive(current);
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	useEffect(() => {
		track.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
	}, [active]);

	return (
		<nav className="wf-fnav" aria-label="Feature sections">
			<div ref={track} className="wf-fnav-track">
				{featureSections.map((section) => (
					<a
						key={section.id}
						href={`#${section.id}`}
						data-id={section.id}
						aria-current={active === section.id ? "true" : undefined}
						onClick={(event) => {
							const element = document.getElementById(section.id);
							if (!element) return;
							event.preventDefault();
							history.replaceState(null, "", `#${section.id}`);
							scrollToY(element.getBoundingClientRect().top + window.scrollY - 126);
						}}
					>
						{section.label}
					</a>
				))}
			</div>
		</nav>
	);
}
