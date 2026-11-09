"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useScrollScene";

export function AiSection() {
	const [ref, inView] = useInView<HTMLDivElement>(0.35);
	const [beat, setBeat] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const delays = prefersReducedMotion() ? [0, 0, 0, 0] : [400, 1500, 2700, 4000];
		const timers = delays.map((ms, index) => window.setTimeout(() => setBeat(index + 1), ms));
		return () => timers.forEach(clearTimeout);
	}, [inView]);

	return (
		<section className="lp-ai" aria-labelledby="lp-ai-title">
			<div className="lp-shell lp-ai-grid">
				<div data-reveal className="lp-ai-copy">
					<span className="lp-eyebrow lp-eyebrow-light">MCP connector</span>
					<h2 id="lp-ai-title" className="lp-h2 text-white">Bring the AI <span className="text-[#00D261]">you already use.</span></h2>
					<p className="lp-lead">
						Connect Claude, ChatGPT, n8n or Make to WhatFlow. Your assistant can read inbox chats, label and assign them, search your catalog and draft replies — and in draft mode, a person presses Send.
					</p>
					<Link href="/docs/mcp" className="lp-btn lp-btn-green">Set up MCP <span aria-hidden="true">→</span></Link>
				</div>
				<div ref={ref} className="lp-ai-chat" role="img" aria-label="An AI assistant using the WhatFlow connector to find chats that need a reply and drafting one for approval">
					<div className={`lp-ai-row lp-ai-user ${beat >= 1 ? "is-shown" : ""}`}>Which customers are waiting on a reply?</div>
					<div className={`lp-ai-tool ${beat >= 2 ? "is-shown" : ""}`}><span className="lp-spin" /> whatflow · list_conversations <em>needs_reply</em></div>
					<div className={`lp-ai-row lp-ai-bot ${beat >= 3 ? "is-shown" : ""}`}>
						Two chats need a reply. <b>Maya Chen</b>{" "}wants to swap the shirt on order #1027 to size L — it hasn&apos;t shipped yet. Here&apos;s a draft:
					</div>
					<div className={`lp-ai-draft ${beat >= 4 ? "is-shown" : ""}`}>
						<small>Draft for approval · to Maya Chen</small>
						<p>Hi Maya! Happy to help — I&apos;ve swapped your shirt to size L before it ships. 🙌</p>
						<div><span className="lp-ai-approve">Approve &amp; send</span><span>Edit</span></div>
					</div>
				</div>
			</div>
		</section>
	);
}
