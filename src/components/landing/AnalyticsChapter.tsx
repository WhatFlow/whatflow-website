"use client";

import { ClipReveal } from "./ScrollPrimitives";
import { useInView } from "./useScrollScene";

const revenue = [12, 18, 15, 24, 22, 31, 28, 36, 34, 42, 39, 48, 46, 55];
const funnel = [
	{ label: "Sent", value: 100 },
	{ label: "Delivered", value: 96 },
	{ label: "Read", value: 81 },
	{ label: "Clicked", value: 34 },
];
const byAutomation = [
	{ label: "Abandoned checkout", value: 92 },
	{ label: "Order confirmation", value: 64 },
	{ label: "Back in stock", value: 41 },
	{ label: "Draft orders", value: 23 },
];

function linePath(points: number[], width: number, height: number) {
	const max = Math.max(...points);
	return points.map((value, index) => `${index === 0 ? "M" : "L"}${((index / (points.length - 1)) * width).toFixed(1)},${(height - (value / max) * height * 0.9).toFixed(1)}`).join(" ");
}

export function AnalyticsChapter() {
	const [ref, inView] = useInView<HTMLDivElement>(0.35);
	const path = linePath(revenue, 600, 180);

	return (
		<ClipReveal className="lp-analytics">
			<div className="lp-shell lp-analytics-grid">
				<div className="lp-analytics-copy" data-reveal>
					<h2 className="lp-h2 text-white">See what WhatsApp earns you.</h2>
					<p className="lp-lead"><b className="wf-leadin">Analytics.</b> Recovered revenue and orders, delivery and read rates, button clicks, and Meta conversation costs, broken down by automation.</p>
				</div>
				<div ref={ref} className={`lp-dash ${inView ? "is-in" : ""}`} role="img" aria-label="Illustrative analytics dashboard showing recovered revenue over time, a message funnel, and revenue by automation">
					<div className="lp-dash-top">
						<span>Demo store, last 14 days</span>
						<span className="lp-dash-pill">Date range ▾</span>
					</div>
					<div className="lp-dash-kpis">
						<div><small>Recovered revenue</small><b>$12,480</b><em>▲ 18%</em></div>
						<div><small>Recovered orders</small><b>214</b><em>▲ 11%</em></div>
						<div><small>Delivery rate</small><b>96%</b></div>
						<div><small>Read by customers</small><b>81%</b></div>
					</div>
					<div className="lp-dash-chart">
						<small>Recovered revenue over time</small>
						<svg viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true">
							<defs>
								<linearGradient id="lp-area" x1="0" x2="0" y1="0" y2="1">
									<stop offset="0" stopColor="#00D261" stopOpacity="0.45" />
									<stop offset="1" stopColor="#00D261" stopOpacity="0" />
								</linearGradient>
							</defs>
							<path className="lp-dash-area" d={`${path} L600,190 L0,190 Z`} fill="url(#lp-area)" />
							<path className="lp-dash-line" d={path} pathLength={1} />
						</svg>
					</div>
					<div className="lp-dash-split">
						<div>
							<small>Message funnel</small>
							{funnel.map((row, index) => (
								<div key={row.label} className="lp-dash-bar" style={{ "--v": row.value / 100, "--i": index } as React.CSSProperties}>
									<span>{row.label}</span><i /><b>{row.value}%</b>
								</div>
							))}
						</div>
						<div>
							<small>Revenue by automation</small>
							{byAutomation.map((row, index) => (
								<div key={row.label} className="lp-dash-bar lp-dash-bar-alt" style={{ "--v": row.value / 100, "--i": index + 4 } as React.CSSProperties}>
									<span>{row.label}</span><i />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</ClipReveal>
	);
}
