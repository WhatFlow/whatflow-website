"use client";

import React from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function ShopifyFlowIntegration() {
  return (
    <section id="flows-integration" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            ECOSYSTEM AUTOMATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            NATIVE SHOPIFY FLOW ACTIONS: <span className="text-stroke-green">INFINITE POSSIBILITIES.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Trigger custom WhatsApp messages directly from Shopify Flow workflows without writing a single line of code.
            Connect WhatFlow with over 50+ Shopify App Store partners.
          </p>
        </div>

        {/* Visual Flow Canvas Mockup */}
        <div className="neo-box bg-[#091E17] text-white p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#00D261] text-black flex items-center justify-center font-black text-sm border border-black">
                ☍
              </span>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase">Shopify Flow Canvas</div>
                <div className="text-sm font-display font-black text-white">VIP Repeat Customer Loyalty Flow</div>
              </div>
            </div>
            <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-[#00D261]">
              Status: Active Workflow
            </span>
          </div>

          {/* Node Diagram Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Node 1: Trigger */}
            <div className="bg-[#132A22] p-5 rounded-2xl border-2 border-white/20 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  1. TRIGGER
                </span>
                <span className="text-xs font-mono text-gray-400">Shopify</span>
              </div>
              <div className="font-display font-black text-base uppercase text-white">Order Created</div>
              <p className="text-xs text-gray-300 leading-relaxed">
                When a new order is successfully placed in your Shopify storefront.
              </p>
            </div>

            {/* Node 2: Condition */}
            <div className="bg-[#132A22] p-5 rounded-2xl border-2 border-white/20 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                  2. CONDITION
                </span>
                <span className="text-xs font-mono text-gray-400">Shopify Flow</span>
              </div>
              <div className="font-display font-black text-base uppercase text-white">Check Customer Tags</div>
              <p className="text-xs text-gray-300 leading-relaxed">
                If customer tags include <code>&quot;VIP-Tier&quot;</code> OR total orders &gt; 3.
              </p>
            </div>

            {/* Node 3: WhatFlow Action */}
            <div className="bg-[#00D261] text-black p-5 rounded-2xl border-2 border-black space-y-3 relative shadow-[4px_4px_0px_#fff]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-black text-white">
                  3. WHATFLOW ACTION
                </span>
                <span className="text-xs font-bold text-black/70">WhatFlow Official</span>
              </div>
              <div className="font-display font-black text-base uppercase text-black">
                Send WhatsApp Template
              </div>
              <p className="text-xs font-bold text-black/80 leading-relaxed">
                Template: <code>vip_welcome_gift</code> with variable <code>20% OFF</code> exclusive loyalty voucher.
              </p>
            </div>
          </div>

          {/* Compatible Apps Badges */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Compatible With All Major Shopify Apps:
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Judge.me Reviews",
                "Loox Photo Reviews",
                "Recharge Subscriptions",
                "Appstle Subscriptions",
                "Gorgias Helpdesk",
                "Klaviyo",
                "ShipStation",
                "Smile.io Loyalty",
                "Yotpo",
              ].map((app) => (
                <span
                  key={app}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-gray-200 border border-white/15 hover:border-[#00D261] hover:text-[#00D261] transition-colors"
                >
                  ⚡ {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={getShopifyAppUrl("shopify_flow_section_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
          >
            <span>CONNECT SHOPIFY FLOW ACTIONS</span>
            <span>➔</span>
          </a>
        </div>
      </div>
    </section>
  );
}
