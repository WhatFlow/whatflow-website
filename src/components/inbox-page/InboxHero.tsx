"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function InboxHero() {
  return (
    <section className="bg-[#121212] text-white pt-16 pb-20 px-4 sm:px-6 relative overflow-hidden border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1ed760]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1280px] mx-auto space-y-10 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-1.5 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1ed760] animate-ping" />
            STANDALONE CLOUDFLARE WORKER INBOX
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2">
            <Image
              src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg"
              width={38}
              height={12}
              alt="Meta"
              className="h-3 w-auto invert"
            />
            <span>OFFICIAL CLOUD API ENGINE</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.05] uppercase">
            THE FASTEST 2-WAY <span className="text-[#1ed760]">WHATSAPP INBOX</span> FOR SHOPIFY.
          </h1>

          <p className="text-base sm:text-xl text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Real-time WebSockets, sub-15ms edge latency via Hyperdrive, seamless 1-click Shopify Admin SSO,
            and full customer order context at your fingertips.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={getShopifyAppUrl("inbox_hero_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#1ed760] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#1abc54] hover:scale-105 transition-all shadow-[0_0_24px_rgba(30,215,96,0.3)] flex items-center gap-2"
            >
              <span>INSTALL ON SHOPIFY FREE</span>
              <span>➔</span>
            </a>

            <a
              href="#live-mock"
              className="px-8 py-4 rounded-full bg-[#242424] text-white hover:bg-[#2a2a2a] border border-white/10 font-extrabold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>TRY INTERACTIVE DEMO</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* 4 Feature Spec Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
          <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-black font-display text-[#1ed760]">&lt; 15ms</div>
            <div className="text-[11px] uppercase font-bold text-gray-400">WebSocket Latency</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-black font-display text-white">11 Types</div>
            <div className="text-[11px] uppercase font-bold text-gray-400">WhatsApp Bubbles</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-black font-display text-[#1ed760]">1-Click</div>
            <div className="text-[11px] uppercase font-bold text-gray-400">Shopify SSO Token</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#181818] border border-white/10 text-center space-y-1">
            <div className="text-2xl font-black font-display text-white">24-Hour</div>
            <div className="text-[11px] uppercase font-bold text-gray-400">Meta Care Window</div>
          </div>
        </div>
      </div>
    </section>
  );
}
