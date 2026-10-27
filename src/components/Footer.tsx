import Link from "next/link";
import { WhatFlowLogo } from "./Navbar";

export function Footer() {
	return (
		<footer className="bg-[#091E17] text-white py-14 px-4 sm:px-6 border-t-[2.5px] border-black">
			<div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-white/20">
				{/* Brand Column */}
				<div className="col-span-2 md:col-span-1 space-y-3">
					<WhatFlowLogo lightMode={false} />
					<p className="text-xs text-gray-400 font-medium leading-relaxed">
						WhatsApp marketing, customer support, and order automation tools for Shopify stores.
					</p>
					<div className="pt-2">
						<span className="neo-pill bg-[#00D261] text-black text-[9px] font-black uppercase px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
							OFFICIAL META TECH PARTNER
						</span>
					</div>
				</div>

				{/* Column 1: Features & Automations */}
				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">PRODUCT</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><Link href="/features" className="hover:text-[#00D261] transition-colors">Features &amp; Apps</Link></li>
						<li><Link href="/inbox" className="hover:text-[#00D261] transition-colors text-white font-bold">WhatFlow 2-Way Inbox ➔</Link></li>
						<li><Link href="/features#recovery" className="hover:text-[#00D261] transition-colors">Abandoned Cart Recovery</Link></li>
						<li><Link href="/features#automations" className="hover:text-[#00D261] transition-colors">Order Confirmations &amp; COD</Link></li>
						<li><Link href="/features#auto-replies" className="hover:text-[#00D261] transition-colors">Auto-Replies &amp; Inbox</Link></li>
					</ul>
				</div>

				{/* Column 2: Solutions & Integrations */}
				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">SOLUTIONS</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><Link href="/solutions" className="hover:text-[#00D261] transition-colors font-bold text-white">All Solutions ➔</Link></li>
						<li><Link href="/solutions/abandoned-cart-recovery" className="hover:text-[#00D261] transition-colors">Abandoned Cart Recovery</Link></li>
						<li><Link href="/solutions/cod-order-verification" className="hover:text-[#00D261] transition-colors">COD Anti-RTO Verification</Link></li>
						<li><Link href="/solutions/order-tracking-notifications" className="hover:text-[#00D261] transition-colors">Order Tracking &amp; Shipping</Link></li>
						<li><Link href="/solutions/whatsapp-reviews-ugc" className="hover:text-[#00D261] transition-colors">Reviews &amp; UGC Collection</Link></li>
						<li><Link href="/compare" className="hover:text-[#00D261] transition-colors">Compare Alternatives</Link></li>
					</ul>
				</div>

				{/* Column 3: Resources */}
				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">RESOURCES</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><Link href="/affiliate" className="hover:text-[#00D261] transition-colors">Affiliate Plan</Link></li>
						<li><Link href="/blog" className="hover:text-[#00D261] transition-colors">Blog &amp; Guides</Link></li>
						<li><Link href="/case-studies" className="hover:text-[#00D261] transition-colors">Case Studies</Link></li>
						<li><Link href="/changelog" className="hover:text-[#00D261] transition-colors">Product Changelog</Link></li>
						<li><Link href="/admin" className="hover:text-[#00D261] transition-colors">Merchant Portal</Link></li>
					</ul>
				</div>

				{/* Column 4: Legal & Trust */}
				<div className="space-y-3">
					<h4 className="font-extrabold text-xs uppercase tracking-wider text-[#00D261]">COMPANY &amp; TRUST</h4>
					<ul className="space-y-2 text-xs font-semibold text-gray-300">
						<li><a href="https://www.linkedin.com/company/whatflow" className="hover:text-[#00D261] transition-colors">WhatFlow on LinkedIn</a></li>
						<li><Link href="/about" className="hover:text-[#00D261] transition-colors">About WhatFlow</Link></li>
						<li><a href="mailto:support@whatflow.tech" className="hover:text-[#00D261] transition-colors">Contact Support</a></li>
						<li><Link href="/privacy" className="hover:text-[#00D261] transition-colors">Privacy Policy</Link></li>
						<li><Link href="/terms" className="hover:text-[#00D261] transition-colors">Terms of Service</Link></li>
						<li><Link href="/security" className="hover:text-[#00D261] transition-colors">Security &amp; GDPR</Link></li>
					</ul>
				</div>
			</div>

			<div className="max-w-[1280px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium gap-2">
				<span>© {new Date().getFullYear()} WhatFlow Solutions.</span>
				<span>Official Meta Tech Partner • Zero Markup Guarantee</span>
			</div>
		</footer>
	);
}
