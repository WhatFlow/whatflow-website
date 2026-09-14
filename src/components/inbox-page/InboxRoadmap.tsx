"use client";

import React from "react";

export function InboxRoadmap() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            COMING SOON
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            INBOX ROADMAP: <span className="text-[#1ed760]">THE FUTURE OF COMMERCE.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            We are actively engineering next-generation capabilities to turn WhatFlow Inbox into the world&apos;s most advanced conversational commerce workstation.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 space-y-3 relative">
            <span className="text-2xl mb-2 block">🛍️</span>
            <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded">
              Q4 2026
            </span>
            <h3 className="font-display font-black text-lg uppercase text-white">Meta Catalog in Inbox</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Search your entire Shopify product catalog directly from the composer toolbar and send multi-product cards with 1 click.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 space-y-3 relative">
            <span className="text-2xl mb-2 block">👥</span>
            <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded">
              Q4 2026
            </span>
            <h3 className="font-display font-black text-lg uppercase text-white">Dynamic Audience Sync</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Live bi-directional synchronization between Shopify Customer Segments and WhatFlow broadcast contact lists.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 space-y-3 relative">
            <span className="text-2xl mb-2 block">🤖</span>
            <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded">
              Q1 2027
            </span>
            <h3 className="font-display font-black text-lg uppercase text-white">AI Agent Copilot</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              One-click AI response suggestions based on your return policy, order status, and inventory levels in Shopify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
