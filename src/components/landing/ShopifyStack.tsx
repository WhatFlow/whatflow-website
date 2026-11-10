import Image from "next/image";
import type { ReactNode } from "react";
import { StackCards } from "./ScrollPrimitives";

function Panel({ kicker, title, body, note, tone, dark = false, children }: { kicker: string; title: string; body: string; note?: string; tone: string; dark?: boolean; children: ReactNode }) {
	return (
		<article className={`lp-panel ${dark ? "lp-panel-dark" : ""}`} style={{ "--tone": tone } as React.CSSProperties}>
			<div className="lp-panel-copy">
				<h3>{title}</h3>
				<p><b>{kicker}.</b> {body}</p>
				{note && <small>{note}</small>}
			</div>
			<div className="lp-panel-demo" aria-hidden="true">{children}</div>
		</article>
	);
}

export function ShopifyStack() {
	return (
		<section className="lp-shopify" aria-labelledby="lp-shopify-title">
			<div className="lp-shell">
				<div className="lp-shopify-head" data-reveal>
					<h2 id="lp-shopify-title" className="lp-h2">Lives where you already work.</h2>
				</div>
				<StackCards>
					{[
						<Panel key="admin" kicker="Admin actions" tone="var(--surface)" title="Send from anywhere in your admin." body="Confirm, notify or recover from any order, draft order or abandoned checkout, one at a time or in bulk. Broadcast to customers you select or a whole Shopify segment.">
							<div className="lp-admin-mock">
								<div className="lp-admin-mock-bar"><b>Orders</b><span>3 selected</span><span className="lp-admin-mock-more">More actions ▾</span></div>
								<ul className="lp-admin-mock-menu">
									<li className="is-hot">Send WhatsApp Order Confirmations</li>
									<li>Send WhatsApp Order Notifications</li>
									<li>Send WhatsApp Fulfillment Updates</li>
								</ul>
								{["#1029 · COD · $64.00", "#1030 · COD · $112.00", "#1031 · Paid · $48.00"].map((row) => <div key={row} className="lp-admin-mock-row"><i />{row}</div>)}
							</div>
						</Panel>,
						<Panel key="buttons" kicker="Storefront" tone="var(--mint-strong)" title="Buttons that match your theme." body="A floating chat button with a greeting bubble, and an “Order via WhatsApp” button on product pages: pill, rounded or square, with pulse and hover lift." note="Theme-matched buttons are free forever.">
							<div className="lp-pdp">
								<div className="lp-pdp-img">👕</div>
								<div className="lp-pdp-info">
									<b>Linen Shirt</b>
									<span>$48.00</span>
									<span className="lp-pdp-cart">Add to cart</span>
									<span className="lp-pdp-wa">Order via WhatsApp</span>
								</div>
								<span className="lp-pdp-greet">Hi! Need help choosing a size? 👋</span>
								<span className="lp-pdp-fab"><Image src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg" alt="" width={26} height={26} /></span>
							</div>
						</Panel>,
						<Panel key="otp" kicker="WhatsApp verification" tone="var(--yellow-soft)" title="Real numbers. Fewer fake orders." body="Customers verify their WhatsApp number with a 6-digit code on the thank-you page, and the order is tagged “✓ WhatsApp Verified”." note="The checkout version of the block needs Shopify Plus.">
							<div className="lp-otp">
								<b>Verify your WhatsApp number</b>
								<span className="lp-otp-phone">+1 (415) 555-0148</span>
								<div className="lp-otp-boxes">{"482913".split("").map((digit, index) => <span key={index} style={{ "--i": index } as React.CSSProperties}>{digit}</span>)}</div>
								<span className="lp-otp-btn">Verify code</span>
								<small>Resend code · Not now</small>
							</div>
						</Panel>,
						<Panel key="cod" kicker="Cash on delivery" tone="var(--pink)" title="Decide who gets cash on delivery." body="Hide COD at checkout by cart total, customer tags, products, collections, country, city or postal code, and charge a COD fee through shipping rates.">
							<div className="lp-rules">
								<b>Limit Cash on Delivery</b>
								{[["Cart total", "is more than", "$500"], ["Customer tags", "has", "fraud-risk"], ["Postal code", "is not", "54000, 54810"], ["Discount", "any discount applied", ""]].map(([field, op, value], index) => (
									<div key={field} className="lp-rule" style={{ "--i": index } as React.CSSProperties}>
										<span>{field}</span><em>{op}</em>{value && <code>{value}</code>}
									</div>
								))}
								<span className="lp-rules-result">Then hide Cash on Delivery</span>
							</div>
						</Panel>,
						<Panel key="report" kicker="Store Report" tone="var(--forest)" dark title="Your numbers, by text." body="Text “report week” from an authorized number and get sales, top products, returns, traffic and WhatsApp recovery back on WhatsApp, powered by ShopifyQL.">
							<div className="lp-report">
								<span className="lp-report-ask">report week</span>
								<div className="lp-report-reply">
									<b>📊 Last 7 days</b>
									<span>Sales <strong>$18,240</strong> <em>▲ 12%</em></span>
									<span>Orders <strong>312</strong></span>
									<span>Top product <strong>Linen Shirt</strong></span>
									<span>Online store sessions <strong>9,870</strong></span>
									<span>WhatsApp recovery <strong>$2,130</strong></span>
								</div>
							</div>
						</Panel>,
						<Panel key="templates" kicker="Templates" tone="var(--lilac)" title="46 templates. No blank pages." body="Start from a ready-made library, then personalize with about 50 order variables, product images from the order, and quick-reply, link, call or copy-code buttons.">
							<div className="lp-tpl">
								<div className="lp-tpl-card">
									<span className="lp-tpl-img">📦</span>
									<p>Hi <i>{"{{First Name}}"}</i>, order <i>{"{{Order Name}}"}</i> is on its way! Track it here: <i>{"{{Tracking URL}}"}</i></p>
									<span className="lp-tpl-btn">Track order</span>
								</div>
								<div className="lp-tpl-vars">
									{["Products x Quantity", "Recovery URL", "Invoice URL", "Estimated Delivery", "Cancel Reason", "Order Name"].map((name, index) => <span key={name} style={{ "--i": index } as React.CSSProperties}>{name}</span>)}
								</div>
							</div>
						</Panel>,
					]}
				</StackCards>
			</div>
		</section>
	);
}
