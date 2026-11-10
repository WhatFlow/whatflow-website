import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Page kit shared by every marketing page: a masked word-by-word headline on a dotted
 * ground, then a section rhythm of big heads and leads. Pure CSS motion, so it works in
 * Server Components.
 *
 * Headings announce themselves: no label pill above them and no single accented word
 * inside them (Hallmark gates 54 and 38iii). `kicker` and `accent` stay in the props so
 * existing pages compile; a SectionHead kicker becomes a bold lead-in on its sub.
 */

function Words({ text, baseDelay = 80 }: { text: string; baseDelay?: number }) {
	return (
		<>
			{text.split(" ").map((word, index) => (
				<Fragment key={index}>
					<span className="wf-word-mask">
						<span className="wf-word" style={{ "--d": `${baseDelay + index * 70}ms` } as CSSProperties}>
							{word}
						</span>
					</span>{" "}
				</Fragment>
			))}
		</>
	);
}

export function PageHero({
	title,
	sub,
	actions,
	children,
	tone = "paper",
	id,
	meta,
}: {
	/** Ignored: the headline announces the page. Kept so existing callers compile. */
	kicker?: ReactNode;
	/** Plain text; split into animated words. */
	title: string;
	/** Ignored: headlines are set in one colour. Kept so existing callers compile. */
	accent?: string[];
	sub?: ReactNode;
	actions?: ReactNode;
	/** Optional visual; switches the hero to a two-column layout. */
	children?: ReactNode;
	tone?: "paper" | "dark" | "mint";
	id?: string;
	/** Small row under the actions (trust badges, dates, tags). */
	meta?: ReactNode;
}) {
	return (
		<section id={id} className="wf-hero" data-tone={tone} data-split={Boolean(children)}>
			<div className="wf-shell wf-hero-grid">
				<div className="wf-hero-copy">
					<h1 className="wf-hero-title"><Words text={title} /></h1>
					{sub && <div className="wf-hero-sub wf-load" style={{ "--d": "450ms" } as CSSProperties}>{sub}</div>}
					{actions && <div className="wf-hero-actions wf-load" style={{ "--d": "560ms" } as CSSProperties}>{actions}</div>}
					{meta && <div className="wf-hero-meta wf-load" style={{ "--d": "660ms" } as CSSProperties}>{meta}</div>}
				</div>
				{children && <div className="wf-hero-visual wf-load" style={{ "--d": "250ms" } as CSSProperties}>{children}</div>}
			</div>
		</section>
	);
}

export function SectionHead({
	kicker,
	title,
	sub,
	center = false,
	light = false,
	id,
	as: Tag = "h2",
}: {
	/** Shown as a bold lead-in at the start of `sub`; dropped when there is no sub. */
	kicker?: ReactNode;
	title: ReactNode;
	sub?: ReactNode;
	center?: boolean;
	light?: boolean;
	id?: string;
	as?: "h2" | "h3";
}) {
	return (
		<div className="wf-head" data-center={center} data-light={light} data-reveal>
			<Tag id={id} className="wf-h2">{title}</Tag>
			{sub && (
				<p className="wf-lead">
					{kicker && <b className="wf-leadin">{kicker}.</b>} {sub}
				</p>
			)}
		</div>
	);
}

/** Formerly a highlighter band; headings are now one colour, so this renders plain text. */
export function Hl({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

/** Page section with consistent spacing and background tone. */
export function Section({ children, tone = "paper", id, className = "", label }: { children: ReactNode; tone?: "paper" | "white" | "mint" | "dark" | "green"; id?: string; className?: string; label?: string }) {
	return (
		<section id={id} className={`wf-section ${className}`} data-tone={tone} aria-labelledby={label}>
			<div className="wf-shell">{children}</div>
		</section>
	);
}
