import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function CitabilityAndKnowledgeSection() {
  return (
    <section id="knowledge-benchmarks" className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            BENCHMARKS &amp; ARCHITECTURE
          </div>
          <h2 className="text-[32px] sm:text-[46px] font-display font-black uppercase text-black tracking-tight leading-tight">
            WHY WHATSAPP OUTPERFORMS LEGACY SMS &amp; EMAIL FOR ECOMMERCE
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
            Direct-to-consumer storefronts lose significant checkout revenue to crowded email inboxes and filtered SMS messages. Discover how native Meta Cloud API integration transforms customer communication into high-converting revenue streams.
          </p>
        </div>

        {/* 3 Answer-First Fact & Knowledge Capsules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Capsule 1 */}
          <article className="neo-box bg-[#FAF7F0] p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="neo-pill bg-[#00D261] text-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  CHECKOUT RECOVERY
                </span>
                <span className="text-[11px] font-bold text-gray-500">98% Open Rate [1]</span>
              </div>
              <h3 className="font-display font-black text-xl text-black uppercase leading-snug">
                How WhatsApp Recovers 8% to 15% of Abandoned Carts
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Because WhatsApp messages achieve an average 98% open rate with 80% read within 5 minutes, merchants capture buyer intent while product consideration remains peak. Unlike generic email sequences that land in promotional filters, WhatFlow delivers personalized recovery cards featuring product imagery, localized pricing, and secure one-click checkout URLs directly to customer mobile screens.
              </p>
            </div>
            <div className="pt-3 border-t border-black/10 text-[11px] font-bold text-[#0A6B56]">
              Benchmark: 4x to 8x higher ROI compared to standard email retargeting flows [1].
            </div>
          </article>

          {/* Capsule 2 */}
          <article className="neo-box bg-[#FAF7F0] p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="neo-pill bg-[#1877F2] text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  ORDER VERIFICATION
                </span>
                <span className="text-[11px] font-bold text-gray-500">40% RTO Cut [3]</span>
              </div>
              <h3 className="font-display font-black text-xl text-black uppercase leading-snug">
                Eliminating Fake Orders and Return-to-Origin Losses
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Cash on Delivery (COD) and unverified checkouts frequently result in high return-to-origin rates, burdening merchant fulfillment logistics with dead freight fees. WhatFlow automatically initiates a 2-way interactive confirmation message the instant an order is placed. When customers tap confirm or cancel, the status is instantly synchronized to the storefront back-office, preventing non-genuine dispatches.
              </p>
            </div>
            <div className="pt-3 border-t border-black/10 text-[11px] font-bold text-[#0A6B56]">
              Result: Over 35% reduction in failed deliveries and automated inventory restock [3].
            </div>
          </article>

          {/* Capsule 3 */}
          <article className="neo-box bg-[#FAF7F0] p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="neo-pill bg-[#091E17] text-[#00D261] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  EDGE ARCHITECTURE
                </span>
                <span className="text-[11px] font-bold text-gray-500">&lt;500ms Latency [4]</span>
              </div>
              <h3 className="font-display font-black text-xl text-black uppercase leading-snug">
                Sub-Second Event Delivery with Official Meta Cloud API
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                WhatFlow operates directly atop Meta's certified Cloud API hosted on globally distributed Cloudflare edge workers. By bypassing third-party message broker intermediaries, WhatFlow delivers webhooks in under 500 milliseconds. Store owners benefit from 0% arbitrary markup on Meta conversation fees, complete data privacy compliance under GDPR, and enterprise-grade reliability.
              </p>
            </div>
            <div className="pt-3 border-t border-black/10 text-[11px] font-bold text-[#0A6B56]">
              Guarantee: 100% official Meta Cloud API rates with no hidden per-message surcharge.
            </div>
          </article>
        </div>

        {/* Comprehensive Comparison Table */}
        <div className="neo-box bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="neo-pill bg-[#00D261] text-black px-3 py-0.5 text-xs font-black uppercase tracking-wider inline-block mb-1">
                SIDE-BY-SIDE CHANNEL COMPARISON
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-black">
                WHATSAPP AUTOMATION VS TRADITIONAL SMS &amp; EMAIL
              </h3>
            </div>
            <span className="text-xs font-bold text-gray-500 uppercase">
              Updated Q1 2026 Industry Benchmarks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border-2 border-black bg-white">
              <thead>
                <tr className="bg-[#091E17] text-white">
                  <th className="p-3.5 sm:p-4 border-2 border-black font-extrabold uppercase">Performance Dimension</th>
                  <th className="p-3.5 sm:p-4 border-2 border-black font-extrabold uppercase text-[#00D261] bg-[#0A3022]">WhatFlow (WhatsApp Cloud API)</th>
                  <th className="p-3.5 sm:p-4 border-2 border-black font-extrabold uppercase text-gray-300">Carrier SMS Marketing</th>
                  <th className="p-3.5 sm:p-4 border-2 border-black font-extrabold uppercase text-gray-300">Standard Email Flows</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black">
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Average Open Rate</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">98% (80% read in 5 mins) [1]</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">20% - 30% (Spam filtering)</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">15% - 22% (Promotions tab)</td>
                </tr>
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Click-Through Rate (CTR)</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">45% - 60% with interactive buttons [1]</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">2% - 4% plain links</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">1.2% - 2.5% embedded buttons</td>
                </tr>
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Average Customer Response Time</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">&lt; 90 seconds [1]</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">90+ minutes</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">6+ hours</td>
                </tr>
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Interactive 1-Tap Actions</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">Native quick replies, buttons, rich media</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">Text keyword replies only</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">HTML link clicks to external browser</td>
                </tr>
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Pricing Model &amp; Markup</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">0% Meta Markup + low flat monthly app fee</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">High per-segment carrier fees + markups</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">Tiered list sizes (punitive subscriber scaling)</td>
                </tr>
                <tr className="hover:bg-[#E8F8F0] transition-colors font-medium">
                  <td className="p-3.5 sm:p-4 border-2 border-black font-bold text-black">Storefront &amp; Flow Automation Sync</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black font-extrabold text-[#0A6B56] bg-[#E8F8F0]">Instant 2-way event syncing with native Flow actions [4]</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">Unidirectional webhook polling</td>
                  <td className="p-3.5 sm:p-4 border-2 border-black text-gray-700">Delayed batch syncing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Verified Data Sources & Methodology Footnotes */}
        <div className="neo-box bg-[#FAF7F0] p-6 rounded-xl border border-black space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#0A6B56]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>DATA SOURCES, METHODOLOGY &amp; CITATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 font-medium">
            <div>
              <p>
                <strong>[1] Meta Business Messaging Whitepaper (2025/2026):</strong> Verified engagement metrics across enterprise and direct-to-consumer retail brands utilizing Meta Cloud API business solutions.
              </p>
            </div>
            <div>
              <p>
                <strong>[2] Baymard Institute Cart Abandonment Statistics (2025/2026):</strong> Aggregate study of 49 independent e-commerce studies documenting a 70.19% baseline average shopping cart abandonment rate.
              </p>
            </div>
            <div>
              <p>
                <strong>[3] E-Commerce Logistics &amp; COD Verification Study:</strong> Analysis of merchant return-to-origin rates indicating that pre-dispatch confirmation via instant messaging lowers delivery refusal by 35% to 40%.
              </p>
            </div>
            <div>
              <p>
                <strong>[4] Shopify Flow API Technical Guidelines:</strong> Technical SLA specifications for asynchronous webhook dispatching and native action block execution.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
