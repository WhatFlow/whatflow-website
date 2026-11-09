const languages = ["English", "العربية", "Deutsch", "Español", "Français", "हिन्दी", "Italiano", "日本語", "Nederlands", "Português", "Türkçe", "简体中文", "繁體中文"];

export function Bento() {
	return (
		<section className="lp-bento-section" aria-labelledby="lp-bento-title">
			<div className="lp-shell">
				<div className="lp-bento-head" data-reveal>
					<span className="lp-eyebrow">And the details</span>
					<h2 id="lp-bento-title" className="lp-h2">Small things. <span className="lp-hl">Big difference.</span></h2>
				</div>
				<div className="lp-bento">
					<article className="lp-tile lp-tile-wide lp-tile-green" data-reveal>
						<span className="lp-tile-kicker">Coexistence</span>
						<h3>Keep the WhatsApp Business app.</h3>
						<p>Connect with Meta in a few clicks and keep using the app on your phone. History and contacts can come with you.</p>
						<div className="lp-coex" aria-hidden="true">
							<span className="lp-coex-phone">📱 WhatsApp Business app</span>
							<span className="lp-coex-link" />
							<span className="lp-coex-phone">🖥️ WhatFlow Inbox</span>
						</div>
					</article>
					<article className="lp-tile lp-tile-dark" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
						<span className="lp-tile-kicker">Opt-out, handled</span>
						<h3>STOP means stop.</h3>
						<p>Built-in and custom opt-out keywords, opt-in replies, and a blocklist that automations respect.</p>
						<div className="lp-stop" aria-hidden="true"><span>STOP</span><span>You won&apos;t get more messages from us. Reply START to opt back in.</span></div>
					</article>
					<article className="lp-tile" data-reveal style={{ "--d": "40ms" } as React.CSSProperties}>
						<span className="lp-tile-kicker">Shopify analytics</span>
						<h3>WhatsApp in your Shopify reports.</h3>
						<p>Sent, delivered, read, clicked, failed and unsubscribed events flow into Shopify&apos;s own marketing analytics.</p>
						<div className="lp-events" aria-hidden="true">{["sent", "delivered", "read", "clicked"].map((event, index) => <span key={event} style={{ "--i": index } as React.CSSProperties}>whatsapp_{event}</span>)}</div>
					</article>
					<article className="lp-tile lp-tile-yellow" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
						<span className="lp-tile-kicker">13 languages</span>
						<h3>Speaks your customers&apos; language.</h3>
						<p>Storefront, checkout and admin extensions are translated into 13 languages.</p>
						<div className="lp-langs" aria-hidden="true"><div>{[...languages, ...languages].map((language, index) => <span key={index}>{language}</span>)}</div></div>
					</article>
					<article className="lp-tile lp-tile-blue" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
						<span className="lp-tile-kicker">Multi-store</span>
						<h3>One number, many stores.</h3>
						<p>Share a connected WhatsApp number with another store using a connection code.</p>
					</article>
					<article className="lp-tile lp-tile-pink lp-tile-full" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
						<span className="lp-tile-kicker">Feature Board</span>
						<h3>You shape the roadmap.</h3>
						<p>Request features, comment, and watch them move up the public roadmap.</p>
					</article>
				</div>
			</div>
		</section>
	);
}
