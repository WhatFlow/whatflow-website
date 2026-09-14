"use client";

import React from "react";

export function SSOFlowDiagram() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            ENTERPRISE ACCESS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            SEAMLESS 1-CLICK <span className="text-[#1ed760]">SHOPIFY LOGIN.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Zero passwords to manage. Your customer support agents launch the dedicated WhatFlow Inbox
            directly from Shopify Admin with instant, secure authentication.
          </p>
        </div>

        {/* 3 Step Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3 relative group hover:border-[#1ed760]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-display font-black text-white text-base">
              1
            </div>
            <h3 className="font-display font-black text-lg uppercase text-white">Shopify Admin Launch</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Staff members open the inbox in 1 click directly from the Shopify Admin sidebar.
            </p>
            <div className="text-[10px] font-mono text-[#1ed760] font-bold">1-Click Launch</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3 relative group hover:border-[#1ed760]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#1ed760]/20 text-[#1ed760] flex items-center justify-center font-display font-black text-base">
              2
            </div>
            <h3 className="font-display font-black text-lg uppercase text-white">Verified Store Security</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automatically verifies store ownership and staff permissions with end-to-end encryption.
            </p>
            <div className="text-[10px] font-mono text-[#1ed760] font-bold">Encrypted Authorization</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3 relative group hover:border-[#1ed760]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-display font-black text-white text-base">
              3
            </div>
            <h3 className="font-display font-black text-lg uppercase text-white">Multi-Agent Workspace</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your whole support team collaborates in real time with shared conversation assignments.
            </p>
            <div className="text-[10px] font-mono text-[#1ed760] font-bold">Team Collaboration</div>
          </div>
        </div>
      </div>
    </section>
  );
}
