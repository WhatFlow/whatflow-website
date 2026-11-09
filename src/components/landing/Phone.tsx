import type { ReactNode } from "react";

export type ChatMessage = {
	id: string;
	from: "store" | "customer" | "agent";
	text: ReactNode;
	time?: string;
	buttons?: string[];
	/** Highlight one button as "tapped". */
	tapped?: number;
	card?: { title: string; meta: string; price: string; emoji: string };
};

export function Bubble({ message, shown = true }: { message: ChatMessage; shown?: boolean }) {
	const outgoing = message.from !== "customer";
	return (
		<div className={`lp-msg ${outgoing ? "lp-msg-in" : "lp-msg-out"} ${shown ? "is-shown" : ""}`} aria-hidden={!shown}>
			<div className="lp-msg-inner">
				<div className="lp-bubble">
					{message.from === "agent" && <span className="lp-bubble-agent">Sara · Support</span>}
					{message.card && (
						<span className="lp-bubble-card">
							<span className="lp-bubble-card-img" aria-hidden="true">{message.card.emoji}</span>
							<span className="min-w-0">
								<span className="block font-bold text-[12px] leading-tight">{message.card.title}</span>
								<span className="block text-[11px] text-black/55">{message.card.meta}</span>
							</span>
							<span className="ml-auto font-bold text-[12px]">{message.card.price}</span>
						</span>
					)}
					<span className="block">{message.text}</span>
					<span className="lp-bubble-time">{message.time ?? "10:24"}{outgoing ? "" : " ✓✓"}</span>
				</div>
				{message.buttons && (
					<div className="lp-bubble-buttons">
						{message.buttons.map((label, index) => (
							<span key={label} className={message.tapped === index ? "is-tapped" : ""}>{label}</span>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export function Phone({ children, className = "", label = "WhatsApp chat preview" }: { children: ReactNode; className?: string; label?: string }) {
	return (
		<div className={`lp-phone ${className}`} role="img" aria-label={label}>
			<div className="lp-phone-screen">
				<div className="lp-phone-bar">
					<span className="lp-phone-avatar" aria-hidden="true">J</span>
					<span className="min-w-0">
						<span className="flex items-center gap-1 text-[13px] font-bold leading-tight">
							Juniper Goods
							<svg viewBox="0 0 24 24" className="size-3.5 fill-[#00D261]" aria-hidden="true"><path d="M12 2l2.4 2.2 3.2-.4.9 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-.9 3.1-3.2-.4L12 22l-2.4-2.2-3.2.4-.9-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5.9-3.1 3.2.4z" /><path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" /></svg>
						</span>
						<span className="block text-[10.5px] text-white/70">Business account</span>
					</span>
				</div>
				<div className="lp-phone-chat">{children}</div>
				<div className="lp-phone-input" aria-hidden="true">
					<span>Message</span>
					<span className="lp-phone-send">➤</span>
				</div>
			</div>
		</div>
	);
}
