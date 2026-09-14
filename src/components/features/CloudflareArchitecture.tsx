"use client";

import React from "react";

export function CloudflareArchitecture() {
  return (
    <section id="edge-architecture" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#FFC107] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            ENTERPRISE INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            POWERED BY CLOUDFLARE EDGE: <span className="text-[#00D261]">SUB-15MS LATENCY.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            While legacy Shopify apps run on monolithic servers with cold starts and lag,
            WhatFlow runs across 300+ global Cloudflare edge locations closest to your customers.
          </p>
        </div>

        {/* 4 Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-display font-black text-lg uppercase text-white">Zero Cold Starts</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              V8 isolate workers boot in under 5 milliseconds. Messages fire the exact millisecond a webhook is received from Shopify.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Cloudflare Workers Engine</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-display font-black text-lg uppercase text-white">Hyperdrive Pooling</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Maintains high-speed distributed database connection pooling to PostgreSQL, reducing roundtrip query latency from 80ms to 4ms.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Hyperdrive Accelerated</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="font-display font-black text-lg uppercase text-white">Cloudflare Queues</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Guaranteed message delivery with automated retries and dead-letter queues to withstand Black Friday and Cyber Monday spikes.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Queues &amp; Concurrency</div>
          </div>

          <div className="bg-[#132A22] p-6 rounded-2xl border-2 border-white/20 space-y-3">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="font-display font-black text-lg uppercase text-white">300+ Edge Locations</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your automations execute in the nearest datacenter to your shoppers across North America, Europe, Asia, and Latin America.
            </p>
            <div className="text-[10px] font-mono text-[#00D261] font-bold">Anycast Global Network</div>
          </div>
        </div>

        {/* Speed Comparison Strip */}
        <div className="bg-white text-black p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-black uppercase text-[#0A6B56]">Benchmarked Response Time</div>
            <div className="text-xl sm:text-2xl font-display font-black text-black uppercase">
              WhatFlow Edge vs. Legacy Shopify WhatsApp Apps
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#00D261]">&lt; 15 ms</div>
              <div className="text-[10px] uppercase font-bold text-gray-600">WhatFlow Edge</div>
            </div>
            <div className="text-gray-400 font-bold">vs</div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-gray-400">800 - 2,500 ms</div>
              <div className="text-[10px] uppercase font-bold text-gray-600">Legacy Competitors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
