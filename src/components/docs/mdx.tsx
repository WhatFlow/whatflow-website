import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CopyButton } from "./CopyButton";

/* Building blocks available inside every src/content/docs/*.mdx file. */

const CALLOUT_LABELS = { note: "Note", tip: "Tip", warning: "Warning", danger: "Important" } as const;
type CalloutType = keyof typeof CALLOUT_LABELS;

function CalloutIcon({ type }: { type: CalloutType }) {
	const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
	if (type === "tip") return <svg {...common}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" /></svg>;
	if (type === "warning" || type === "danger") return <svg {...common}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01" /></svg>;
	return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>;
}

export function Callout({ type = "note", title, children }: { type?: CalloutType; title?: string; children: ReactNode }) {
	return (
		<aside className="docs-callout" data-type={type}>
			<span className="docs-callout-icon"><CalloutIcon type={type} /></span>
			<div className="docs-callout-body">
				<strong className="docs-callout-title">{title ?? CALLOUT_LABELS[type]}</strong>
				{children}
			</div>
		</aside>
	);
}

export const Note = (props: { title?: string; children: ReactNode }) => <Callout type="note" {...props} />;
export const Tip = (props: { title?: string; children: ReactNode }) => <Callout type="tip" {...props} />;
export const Warning = (props: { title?: string; children: ReactNode }) => <Callout type="warning" {...props} />;

export function Steps({ children }: { children: ReactNode }) {
	return <ol className="docs-steps">{children}</ol>;
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
	return (
		<li className="docs-step">
			<h3 className="docs-step-title">{title}</h3>
			{children && <div className="docs-step-body">{children}</div>}
		</li>
	);
}

export function Cards({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
	return <div className="docs-cards" data-cols={cols}>{children}</div>;
}

export function Card({ title, href, children }: { title: string; href: string; children?: ReactNode }) {
	return (
		<Link href={href} className="docs-card">
			<strong className="docs-card-title">{title}<span aria-hidden="true"> →</span></strong>
			{children && <span className="docs-card-body">{children}</span>}
		</Link>
	);
}

/** A click path through the app, e.g. <Path>WhatFlow › Settings › Billing</Path>. */
export function Path({ children }: { children: ReactNode }) {
	return <span className="docs-path">{children}</span>;
}

/** A setting reference row: label, default, and what it does. */
export function Setting({ name, value, children }: { name: string; value?: string; children: ReactNode }) {
	return (
		<div className="docs-setting">
			<div className="docs-setting-head">
				<strong>{name}</strong>
				{value && <span className="docs-setting-default">Default: {value}</span>}
			</div>
			<div className="docs-setting-body">{children}</div>
		</div>
	);
}

export function Settings({ children }: { children: ReactNode }) {
	return <div className="docs-settings">{children}</div>;
}

/** A WhatsApp-style message preview. */
export function Preview({ children, buttons }: { children: ReactNode; buttons?: string[] }) {
	return (
		<figure className="docs-preview" aria-label="Example WhatsApp message">
			<div className="docs-preview-bubble">
				<div className="docs-preview-text">{children}</div>
				{buttons && buttons.length > 0 && (
					<div className="docs-preview-buttons">
						{buttons.map((label) => <span key={label}>{label}</span>)}
					</div>
				)}
			</div>
		</figure>
	);
}

function textOf(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(textOf).join("");
	if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
	return "";
}

function Heading({ as: Tag, id, children, ...rest }: { as: "h2" | "h3" } & ComponentPropsWithoutRef<"h2">) {
	return (
		<Tag id={id} {...rest}>
			{id ? <a href={`#${id}`} className="docs-anchor">{children}</a> : children}
		</Tag>
	);
}

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
	if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...rest}>{children}</Link>;
	return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

function Pre({ children, ...rest }: ComponentPropsWithoutRef<"pre">) {
	return (
		<div className="docs-code">
			<CopyButton text={textOf(children).replace(/\n$/, "")} />
			<pre {...rest}>{children}</pre>
		</div>
	);
}

function Table(props: ComponentPropsWithoutRef<"table">) {
	return <div className="docs-table"><table {...props} /></div>;
}

export const docsMdxComponents = {
	h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading as="h2" {...props} />,
	h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading as="h3" {...props} />,
	a: Anchor,
	pre: Pre,
	table: Table,
	Callout,
	Note,
	Tip,
	Warning,
	Steps,
	Step,
	Cards,
	Card,
	Path,
	Setting,
	Settings,
	Preview,
};
