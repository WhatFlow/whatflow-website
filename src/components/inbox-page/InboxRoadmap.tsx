"use client";

import React from "react";

export function InboxRoadmap() {
  return (
    <>
    <section aria-labelledby="catalog-sharing-heading" className="py-16 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#1ed760]/5 border border-[#1ed760]/30 space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-[#1ed760]/15 text-[#1ed760] text-xs font-bold uppercase tracking-wider">AVAILABLE NOW</span>
        <h2 id="catalog-sharing-heading" className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight">SHARE YOUR <span className="text-[#1ed760]">PRODUCT CATALOG IN CHAT.</span></h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">Share products from your Meta catalog in customer conversations, without leaving WhatFlow Inbox.</p>
      </div>
    </section>
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            UPCOMING
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            UP NEXT FOR <span className="text-[#1ed760]">WHATFLOW INBOX.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Audience sync and AI assistance are planned enhancements. They are not available in the current inbox.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 space-y-3 relative">
            <span className="text-2xl mb-2 block">👥</span>
            <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded">
              UPCOMING
            </span>
            <h3 className="font-display font-black text-lg uppercase text-white">Dynamic Audience Sync</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Planned synchronization between Shopify customer segments and WhatFlow broadcast audiences.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 space-y-3 relative">
            <span className="text-2xl mb-2 block">🤖</span>
            <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded">
              PLANNED
            </span>
            <h3 className="font-display font-black text-lg uppercase text-white">AI Agent Copilot</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI is not available in the current inbox. Suggested replies are a planned enhancement; availability has not been announced.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
