import { HOMEPAGE_FAQS } from "@/lib/marketing-faqs";
import { AiSection } from "./AiSection";
import { FinalCta } from "./FinalCta";
import { FlowBuilder } from "./FlowBuilder";
import { Hero } from "./Hero";
import { InboxZoom } from "./InboxZoom";
import { LandingMotion } from "./LandingMotion";
import { OrderStory } from "./OrderStory";
import { Proof } from "./Proof";
import "./landing.css";

const ticker = ["Abandoned checkouts", "COD confirmation", "Shipping updates", "Back-in-stock alerts", "Broadcasts", "Team inbox", "Shopify Flow", "Sidekick", "MCP for your AI"];

function Ticker() {
	return (
		<div className="lp-ticker" aria-hidden="true">
			<div className="lp-ticker-track">
				{[0, 1].map((copy) => (
					<span key={copy} className="lp-ticker-group">
						{ticker.map((item) => <span key={item}>{item}<i>✳</i></span>)}
					</span>
				))}
			</div>
		</div>
	);
}

function Faq() {
	return (
		<section id="faq" className="lp-faq" aria-labelledby="lp-faq-title">
			<div className="lp-shell lp-faq-grid">
				<div data-reveal>
					<span className="lp-eyebrow">Before you install</span>
					<h2 id="lp-faq-title" className="lp-h2">Questions, answered.</h2>
				</div>
				<div className="lp-faq-list">
					{HOMEPAGE_FAQS.map(({ question, answer }, index) => (
						<details key={question} data-reveal style={{ "--d": `${index * 50}ms` } as React.CSSProperties}>
							<summary>{question}<span aria-hidden="true">+</span></summary>
							<p>{answer}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}

export function LandingPage() {
	return (
		<LandingMotion>
			<Hero />
			<Ticker />
			<OrderStory />
			<InboxZoom />
			<FlowBuilder />
			<AiSection />
			<Proof />
			<Faq />
			<FinalCta />
		</LandingMotion>
	);
}
