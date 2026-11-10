"use client";

import React from "react";
import { Hl, Section, SectionHead } from "@/components/site/PageKit";

export function BroadcastAnalyticsDashboard() {
  return (
    <Section tone="paper">
      <SectionHead
        center
        kicker="Granular campaign audit"
        title={<>Delivery metrics &amp; <Hl>per-recipient logs.</Hl></>}
        sub={<>Know the exact second each customer received, opened, and tapped your WhatsApp message. Automated retry logic for temporary carrier failures.</>}
      />
      <div className="mt-14 space-y-10">

        {/* Analytics Container */}
        <div data-reveal className="ib-device max-w-5xl mx-auto p-6 sm:p-10 space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] font-mono text-white/65">Campaign performance</span>
              <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
                Summer Solstice VIP Drop 2026
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 text-xs font-bold text-white/85 whitespace-nowrap"
              >
                Export CSV
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full bg-[var(--green)] text-black text-xs font-bold whitespace-nowrap"
              >
                Retry failed (12)
              </button>
            </div>
          </div>

          {/* KPI Funnel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white/[0.04] rounded-[20px] border border-white/10 transition-colors duration-300 hover:border-[var(--green)]/40">
              <span className="text-[10px] font-bold text-white/65 block">Total sent</span>
              <div className="text-3xl font-display font-bold tracking-[-0.04em] tabular-nums text-white my-1">4,820</div>
              <span className="text-[10px] text-white/65 font-mono">100% dispatched</span>
            </div>
            <div className="p-5 bg-white/[0.04] rounded-[20px] border border-white/10 transition-colors duration-300 hover:border-[var(--green)]/40">
              <span className="text-[10px] font-bold text-white/65 block">Delivered</span>
              <div className="text-3xl font-display font-bold tracking-[-0.04em] tabular-nums text-[var(--green)] my-1">98.8%</div>
              <span className="text-[10px] text-white/65 font-mono">4,762 handsets</span>
            </div>
            <div className="p-5 bg-white/[0.04] rounded-[20px] border border-white/10 transition-colors duration-300 hover:border-[var(--green)]/40">
              <span className="text-[10px] font-bold text-white/65 block">Read rate</span>
              <div className="text-3xl font-display font-bold tracking-[-0.04em] tabular-nums text-[var(--green)] my-1">91.4%</div>
              <span className="text-[10px] text-white/65 font-mono">Double blue checks</span>
            </div>
            <div className="p-5 bg-white/[0.04] rounded-[20px] border border-white/10 transition-colors duration-300 hover:border-[var(--green)]/40">
              <span className="text-[10px] font-bold text-white/65 block">Button click (CTR)</span>
              <div className="text-3xl font-display font-bold tracking-[-0.04em] tabular-nums text-amber-400 my-1">32.8%</div>
              <span className="text-[10px] text-white/65 font-mono">1,581 checkout visits</span>
            </div>
          </div>

          {/* Granular Recipient Table */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white/65">Live recipient audit (sample)</div>
            <div role="region" aria-label="Broadcast delivery records" tabIndex={0} className="overflow-x-auto rounded-[20px] border border-white/10 focus-visible:outline-offset-[-4px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.04] text-white/65 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Delivery time</th>
                    <th className="p-3">Interaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  <tr className="transition-colors duration-200 hover:bg-white/[0.04]">
                    <td className="p-3 text-white font-sans font-bold">Sarah Jenkins</td>
                    <td className="p-3 text-white/65">+1 555-382-9104</td>
                    <td className="p-3"><span className="text-[var(--green)]">● Read</span></td>
                    <td className="p-3 text-white/65">10:02:14 AM</td>
                    <td className="p-3 text-amber-400 font-bold">Clicked &quot;Claim 20%&quot;</td>
                  </tr>
                  <tr className="transition-colors duration-200 hover:bg-white/[0.04]">
                    <td className="p-3 text-white font-sans font-bold">Marcus Vance</td>
                    <td className="p-3 text-white/65">+44 7911 123456</td>
                    <td className="p-3"><span className="text-[var(--green)]">● Read</span></td>
                    <td className="p-3 text-white/65">10:02:16 AM</td>
                    <td className="p-3 text-white/65">Viewed</td>
                  </tr>
                  <tr className="transition-colors duration-200 hover:bg-white/[0.04]">
                    <td className="p-3 text-white font-sans font-bold">Elena Rostova</td>
                    <td className="p-3 text-white/65">+1 555-902-1840</td>
                    <td className="p-3"><span className="text-[var(--green)]">● Read</span></td>
                    <td className="p-3 text-white/65">10:02:18 AM</td>
                    <td className="p-3 text-amber-400 font-bold">Clicked &quot;VIP Link&quot;</td>
                  </tr>
                  <tr className="transition-colors duration-200 hover:bg-white/[0.04]">
                    <td className="p-3 text-white font-sans font-bold">David Miller</td>
                    <td className="p-3 text-white/65">+1 555-401-8891</td>
                    <td className="p-3"><span className="text-white/65">○ Delivered</span></td>
                    <td className="p-3 text-white/65">10:02:22 AM</td>
                    <td className="p-3 text-white/65">Delivered to handset</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
