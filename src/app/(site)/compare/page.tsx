import type { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Compare WhatFlow vs Top Shopify WhatsApp Alternatives",
  description:
    "See how WhatFlow compares to Wati, Interakt, BiteSpeed, Klaviyo SMS, QuickReply.ai, Tidio, AiSensy, and Gorgias for Shopify WhatsApp marketing.",
  keywords: [
    "Shopify WhatsApp app comparison",
    "WhatFlow vs Wati",
    "WhatFlow vs Interakt",
    "WhatFlow vs BiteSpeed",
    "WhatFlow vs Klaviyo",
    "WhatFlow vs QuickReply",
    "WhatFlow vs Tidio",
    "best Shopify WhatsApp app 2026",
  ],
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare WhatFlow vs Top Shopify WhatsApp Alternatives",
    description:
      "See how WhatFlow compares to Wati, Interakt, BiteSpeed, Klaviyo SMS, QuickReply.ai, Tidio, AiSensy, and Gorgias for Shopify WhatsApp marketing.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare WhatFlow vs Top Shopify WhatsApp Alternatives",
    description:
      "See how WhatFlow compares to Wati, Interakt, BiteSpeed, Klaviyo SMS, QuickReply.ai, Tidio, AiSensy, and Gorgias for Shopify WhatsApp marketing.",
  },
};

const COMPARISONS = [
  {
    slug: "whatflow-vs-wati",
    competitor: "Wati",
    headline: "Why Shopify Merchants Switch from Wati to WhatFlow",
    tagline: "Official Meta Cloud API • Zero Markup • Native Shopify Flow Triggers",
    keyDiffs: [
      "Zero markup on Meta conversation rates (Wati adds 20-30% markup)",
      "Native Shopify Flow Action triggers & automatic 1-click tagging",
      "No per-agent seat licenses or hidden overage fees",
      "Instant 3-minute Meta Embedded Signup onboarding",
    ],
  },
  {
    slug: "whatflow-vs-interakt",
    competitor: "Interakt",
    headline: "WhatFlow vs Interakt: The High-Performance Shopify Alternative",
    tagline: "Ultra-Fast Edge Architecture • Transparent Billing • Real-Time Webhooks",
    keyDiffs: [
      "Direct Shopify Billing integration (no separate Indian GST/credit card gateways)",
      "Automated COD verification and 1-click cancellation tagging",
      "Judge.me, Loox, and Klaviyo native ecosystem connectors",
      "Modern neo-brutalist interface designed exclusively for Shopify",
    ],
  },
  {
    slug: "whatflow-vs-bitespeed",
    competitor: "BiteSpeed",
    headline: "WhatFlow vs BiteSpeed: Built for Scale & Conversion",
    tagline: "Uncapped Workflows • Real-Time ROI Analytics • Transparent Pricing",
    keyDiffs: [
      "Transparent flat-rate pricing without punitive GMV commissions",
      "Unlimited automated workflows across all paid tiers",
      "Enterprise-grade AES-256 token encryption and 99.9% uptime SLA",
      "Official Meta Tech Partner infrastructure",
    ],
  },
  {
    slug: "whatflow-vs-klaviyo",
    competitor: "Klaviyo SMS",
    headline: "WhatFlow vs Klaviyo SMS & WhatsApp",
    tagline: "98% Open Rates • 4x Higher ROI • Global WhatsApp Reach",
    keyDiffs: [
      "Worldwide WhatsApp deliverability vs expensive US-only SMS carrier fees",
      "Interactive 2-way quick reply buttons and rich media cards",
      "Seamless two-way contact synchronization with your existing Klaviyo account",
      "Significantly lower cost per message delivered internationally",
    ],
  },
  {
    slug: "whatflow-vs-quickreply",
    competitor: "QuickReply.ai",
    headline: "WhatFlow vs QuickReply.ai: Modern, Clean & Affordable",
    tagline: "Zero Markup • 3-Min Onboarding • 1-Click Shopify App Store Billing",
    keyDiffs: [
      "Zero markups on official Meta conversation rates",
      "Direct unified Shopify App Store billing with no separate card needed",
      "Clean, intuitive neo-brutalist dashboard without overwhelming complexity",
      "Instant launch with 20+ pre-approved WhatsApp message templates",
    ],
  },
  {
    slug: "whatflow-vs-tidio",
    competitor: "Tidio",
    headline: "WhatFlow vs Tidio: Deep Shopify WhatsApp Automations",
    tagline: "Purpose-Built for eCommerce • COD Verification • Unlimited Seats",
    keyDiffs: [
      "Purpose-built for Shopify store workflows vs general live-chat widget",
      "Automated COD 1-click verification buttons with automatic order tagging",
      "Deep integration with Judge.me and Loox review platforms",
      "Unlimited agent seats included on all plans",
    ],
  },
  {
    slug: "whatflow-vs-aisensy",
    competitor: "AiSensy",
    headline: "WhatFlow vs AiSensy: Global Edge Speed for Shopify",
    tagline: "Sub-50ms Edge Webhooks • Dynamic Cart Recovery • Shopify Flow",
    keyDiffs: [
      "Direct Shopify App Store installation and currency billing",
      "Native Shopify Flow triggers and automated cart abandonment sequences",
      "Cloudflare edge computing ensuring global sub-50ms webhook responses",
      "Seamless customer review requests triggered on delivery",
    ],
  },
  {
    slug: "whatflow-vs-gorgias",
    competitor: "Gorgias WhatsApp",
    headline: "WhatFlow vs Gorgias: High-ROI Proactive Marketing",
    tagline: "Outbound Marketing Campaigns • Cart Recovery • Zero Per-Ticket Fees",
    keyDiffs: [
      "Full outbound marketing campaigns & automated cart recovery",
      "Predictable subscription tiers with zero per-ticket surcharges",
      "Direct Meta wholesale conversation pricing",
      "Can be used alongside Gorgias to power revenue-generating WhatsApp flows",
    ],
  },
];

export default function CompareHubPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1080px] mx-auto text-center space-y-4">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
            APP COMPARISONS
          </div>
          <h1 className="text-[36px] sm:text-[52px] lg:text-[64px] font-display font-black uppercase text-black tracking-tight leading-none">
            HOW WHATFLOW COMPARES.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            See how WhatFlow stacks up against other Shopify WhatsApp tools on pricing, features, and ease of use.
          </p>
        </div>
      </section>

      {/* ─── Cards Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPARISONS.map((item) => (
            <div
              key={item.slug}
              className="neo-box bg-white p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="neo-pill bg-[#FAF7F0] border-black px-3 py-1 text-xs font-black uppercase text-black">
                    VS {item.competitor.toUpperCase()}
                  </span>
                  <span className="text-xs font-extrabold text-[#0A6B56] uppercase tracking-wide">
                    SHOPIFY READY
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-black leading-tight">
                  {item.headline}
                </h2>

                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {item.tagline}
                </p>

                <ul className="space-y-2 pt-2 border-t border-gray-100">
                  {item.keyDiffs.map((diff, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-medium leading-relaxed">
                      <span className="text-[#00D261] font-black text-sm leading-none mt-0.5">✓</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  href={`/compare/${item.slug}`}
                  className="neo-btn w-full bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg text-center block shadow-[3px_3px_0px_#000] hover:bg-[#00be57] transition-colors"
                >
                  VIEW FULL COMPARISON ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
