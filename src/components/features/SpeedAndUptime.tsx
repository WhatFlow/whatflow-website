"use client";

import React from "react";

export function SpeedAndUptime() {
  return (
    <section id="edge-architecture" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#FFC107] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            HIGH-VOLUME RELIABILITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            BUILT FOR PEAK SALES: <span className="text-[#00D261]">99.9% UPTIME &amp; SPEED.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            While legacy WhatsApp apps lag or crash during flash sales, WhatFlow is engineered
            to handle high-traffic surges without dropping a single order or message.
          </p>
        </div>

        {/* 4 Merchant Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-display font-black text-lg uppercase text-white">Sub-Second Delivery</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Order confirmations and cart recovery alerts dispatch the exact instant an event happens in your Shopify store.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Instant Dispatch</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-display font-black text-lg uppercase text-white">BFCM &amp; Flash Sales</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tested to handle massive Black Friday &amp; Cyber Monday order volumes with zero backlogs or delayed customer messages.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Unlimited Scale</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-display font-black text-lg uppercase text-white">99.9% Uptime SLA</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Redundant infrastructure ensures your automations, COD verifications, and customer chat never go offline.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Enterprise Reliability</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-display font-black text-lg uppercase text-white">Global Reach</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Reliable delivery to shoppers across 100+ countries with direct Meta carrier routing for maximum open rates.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Worldwide Coverage</div>
          </div>
        </div>

        {/* Speed Comparison Strip */}
        <div className="bg-white text-black p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-black uppercase text-[#0A6B56]">Benchmarked Message Dispatch Speed</div>
            <div className="text-xl sm:text-2xl font-display font-black text-black uppercase">
              WhatFlow vs. Legacy WhatsApp Apps
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#00D261]">&lt; 1 Second</div>
              <div className="text-[10px] uppercase font-bold text-gray-600">WhatFlow</div>
            </div>
            <div className="text-gray-400 font-bold">vs</div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-gray-400">15 - 45 Seconds</div>
              <div className="text-[10px] uppercase font-bold text-gray-600">Legacy Competitors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
