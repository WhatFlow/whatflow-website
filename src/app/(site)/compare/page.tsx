import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare WhatFlow vs Competitors | WhatsApp for Shopify",
  description: "See how WhatFlow compares to Wati, Interakt, BiteSpeed, and Klaviyo SMS for Shopify WhatsApp marketing.",
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
];

export default function CompareHubPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="max-w-[1280px] mx-auto">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            COMPETITOR COMPARISONS
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            WHY SHOPIFY STORES <br />
            <span className="text-stroke-green">CHOOSE WHATFLOW.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Honest, side-by-side feature and pricing breakdowns to help you choose the best WhatsApp marketing platform for your eCommerce store.
          </p>
        </div>
      </section>

      {/* ─── Comparison Cards Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="neo-box bg-white p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="neo-pill bg-[#00D261] text-black text-[10px] font-black uppercase px-3 py-1 border border-black shadow-[1px_1px_0px_#000]">
                    VS {comp.competitor.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    COMPREHENSIVE GUIDE
                  </span>
                </div>

                <h2 className="text-2xl font-display font-black uppercase text-black group-hover:text-[#0A6B56] transition-colors leading-tight">
                  {comp.headline}
                </h2>

                <div className="text-xs font-extrabold text-[#00D261] uppercase tracking-wider">
                  {comp.tagline}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {comp.keyDiffs.map((diff) => (
                    <div key={diff} className="text-xs font-bold text-gray-700 flex items-start gap-2">
                      <span className="text-[#00D261] font-black mt-0.5">✓</span>
                      <span>{diff}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#2563EB] group-hover:text-[#00D261] transition-colors">
                <span>READ DETAILED BREAKDOWN</span>
                <span>➔</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Global Comparison Matrix Table ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1280px] mx-auto">
        <div className="neo-box bg-white p-6 sm:p-10 rounded-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-black">
              QUICK FEATURE MATRIX
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
              WhatFlow vs Legacy WhatsApp Aggregators
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-[#FAF7F0]">
                  <th className="p-3.5 font-display font-black uppercase text-black">Feature / Capability</th>
                  <th className="p-3.5 font-display font-black uppercase text-[#0A6B56] bg-[#00D261]/20 border-x-2 border-black">WhatFlow</th>
                  <th className="p-3.5 font-display font-black uppercase text-gray-700">Wati</th>
                  <th className="p-3.5 font-display font-black uppercase text-gray-700">Interakt</th>
                  <th className="p-3.5 font-display font-black uppercase text-gray-700">BiteSpeed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3.5 font-bold text-black">Meta Conversation Markup</td>
                  <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">0% (Zero Markup)</td>
                  <td className="p-3.5 text-gray-600 font-medium">+20-30% markup</td>
                  <td className="p-3.5 text-gray-600 font-medium">+15-25% markup</td>
                  <td className="p-3.5 text-gray-600 font-medium">+20% markup</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-black">Native Shopify Flow Triggers</td>
                  <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">✓ Included Free</td>
                  <td className="p-3.5 text-gray-600 font-medium">✕ Limited</td>
                  <td className="p-3.5 text-gray-600 font-medium">✕ Add-on fee</td>
                  <td className="p-3.5 text-gray-600 font-medium">✓ Included</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-black">Interactive Quick Reply Tags</td>
                  <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">✓ Automatic</td>
                  <td className="p-3.5 text-gray-600 font-medium">Manual setup</td>
                  <td className="p-3.5 text-gray-600 font-medium">Manual setup</td>
                  <td className="p-3.5 text-gray-600 font-medium">✓ Automatic</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-black">Direct Shopify App Billing</td>
                  <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">✓ 1-Click</td>
                  <td className="p-3.5 text-gray-600 font-medium">✕ External invoice</td>
                  <td className="p-3.5 text-gray-600 font-medium">✕ External gateway</td>
                  <td className="p-3.5 text-gray-600 font-medium">✓ 1-Click</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-black">Official Meta Cloud API v25.0</td>
                  <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">✓ Direct</td>
                  <td className="p-3.5 text-gray-600 font-medium">Shared BSP</td>
                  <td className="p-3.5 text-gray-600 font-medium">Shared BSP</td>
                  <td className="p-3.5 text-gray-600 font-medium">Shared BSP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
