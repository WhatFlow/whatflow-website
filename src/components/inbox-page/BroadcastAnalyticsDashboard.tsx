"use client";

import React from "react";

export function BroadcastAnalyticsDashboard() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            GRANULAR CAMPAIGN AUDIT
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            DELIVERY METRICS &amp; <span className="text-[#1ed760]">PER-RECIPIENT LOGS.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Know the exact second each customer received, opened, and tapped your WhatsApp message.
            Automated retry logic for temporary carrier failures.
          </p>
        </div>

        {/* Analytics Container */}
        <div className="max-w-5xl mx-auto bg-[#121212] p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase">Campaign Performance</span>
              <h3 className="text-xl font-display font-black uppercase text-white">
                Summer Solstice VIP Drop 2026
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200"
              >
                📋 Export CSV
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#1ed760] text-black text-xs font-bold"
              >
                🔄 Retry Failed (12)
              </button>
            </div>
          </div>

          {/* KPI Funnel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">TOTAL SENT</span>
              <div className="text-2xl font-display font-black text-white my-1">4,820</div>
              <span className="text-[10px] text-gray-400 font-mono">100% Dispatched</span>
            </div>
            <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">DELIVERED</span>
              <div className="text-2xl font-display font-black text-[#1ed760] my-1">98.8%</div>
              <span className="text-[10px] text-gray-400 font-mono">4,762 Handsets</span>
            </div>
            <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">READ RATE</span>
              <div className="text-2xl font-display font-black text-[#1ed760] my-1">91.4%</div>
              <span className="text-[10px] text-gray-400 font-mono">Double Blue Checks</span>
            </div>
            <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">BUTTON CLICK (CTR)</span>
              <div className="text-2xl font-display font-black text-amber-400 my-1">32.8%</div>
              <span className="text-[10px] text-gray-400 font-mono">1,581 Checkout Visits</span>
            </div>
          </div>

          {/* Granular Recipient Table */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase text-gray-400">Live Recipient Audit (Sample)</div>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] text-gray-400 font-mono text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Delivery Time</th>
                    <th className="p-3">Interaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 text-white font-sans font-bold">Sarah Jenkins</td>
                    <td className="p-3 text-gray-400">+1 555-382-9104</td>
                    <td className="p-3"><span className="text-[#1ed760]">● Read</span></td>
                    <td className="p-3 text-gray-400">10:02:14 AM</td>
                    <td className="p-3 text-amber-400 font-bold">Clicked &quot;Claim 20%&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-sans font-bold">Marcus Vance</td>
                    <td className="p-3 text-gray-400">+44 7911 123456</td>
                    <td className="p-3"><span className="text-[#1ed760]">● Read</span></td>
                    <td className="p-3 text-gray-400">10:02:16 AM</td>
                    <td className="p-3 text-gray-500">Viewed</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-sans font-bold">Elena Rostova</td>
                    <td className="p-3 text-gray-400">+1 555-902-1840</td>
                    <td className="p-3"><span className="text-[#1ed760]">● Read</span></td>
                    <td className="p-3 text-gray-400">10:02:18 AM</td>
                    <td className="p-3 text-amber-400 font-bold">Clicked &quot;VIP Link&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white font-sans font-bold">David Miller</td>
                    <td className="p-3 text-gray-400">+1 555-401-8891</td>
                    <td className="p-3"><span className="text-gray-400">○ Delivered</span></td>
                    <td className="p-3 text-gray-400">10:02:22 AM</td>
                    <td className="p-3 text-gray-500">Delivered to handset</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
