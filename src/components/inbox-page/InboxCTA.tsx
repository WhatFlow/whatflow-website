"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function InboxCTA() {
  return (
    <section className="bg-[#121212] py-20 px-4 sm:px-6 text-center text-white border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1ed760]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <div className="flex justify-center">
          <Image
            src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg"
            width={52}
            height={52}
            alt="WhatsApp"
          />
        </div>

        <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
          14-DAY FREE TRIAL • NO CREDIT CARD REQUIRED
        </div>

        <h2 className="text-[34px] sm:text-[50px] font-display font-black uppercase tracking-tight leading-tight">
          CONNECT YOUR SHOPIFY STORE TO <span className="text-[#1ed760]">WHATFLOW INBOX.</span>
        </h2>

        <p className="text-gray-400 font-normal text-base sm:text-lg max-w-xl mx-auto">
          Start chatting with customers, recovering checkouts, and verifying COD orders in 3 minutes.
          Zero Meta markup, enterprise Cloudflare edge reliability.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={getShopifyAppUrl("inbox_bottom_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#1ed760] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#1abc54] hover:scale-105 transition-all shadow-[0_0_24px_rgba(30,215,96,0.3)]"
          >
            INSTALL ON SHOPIFY ➔
          </a>

          <Link
            href="/features"
            className="px-8 py-4 rounded-full bg-[#242424] text-white hover:bg-[#2a2a2a] border border-white/10 font-extrabold text-sm uppercase tracking-wider transition-all"
          >
            VIEW ALL 11 AUTOMATIONS ➔
          </Link>
        </div>
      </div>
    </section>
  );
}
