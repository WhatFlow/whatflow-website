"use client";

import React, { useState } from "react";
import { Hl, Section, SectionHead } from "@/components/site/PageKit";

export function CustomerDrawerShowcase() {
  const [activeTab, setActiveTab] = useState<"overview" | "media" | "docs" | "links">("overview");

  return (
    <Section tone="mint">
      <SectionHead
        center
        kicker="Shopify 360° context"
        title={<>Customer profile drawer: <Hl>zero tab switching.</Hl></>}
        sub={<>Support agents no longer need to open 5 browser tabs to find an order or issue a refund. All Shopify customer data lives directly alongside the live WhatsApp conversation.</>}
      />
      <div className="mt-14 space-y-10">

        {/* Mock Drawer Visual */}
        <div data-reveal className="ib-device max-w-4xl mx-auto p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--green)] text-black font-bold text-sm flex items-center justify-center">
                SJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-display font-bold tracking-[-0.03em] text-white">Sarah Jenkins</h3>
                  <span className="text-[10px] font-mono bg-[var(--green)]/20 text-[var(--green)] px-2 py-0.5 rounded-full">VIP customer</span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-white/65">
                  <span>sarah.jenkins@example.com</span>
                  <span>+1 (555) 382-9104</span>
                </div>
              </div>
            </div>

            {/* 4 Tabs */}
            <div className="ib-seg">
              {(["overview", "media", "docs", "links"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  aria-pressed={activeTab === t}
                  className="capitalize"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="ib-swap space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 bg-white/[0.04] rounded-[20px] border border-white/10">
                  <span className="text-[10px] font-bold text-white/65 block">Total spent</span>
                  <strong className="text-xl font-display font-bold tabular-nums text-[var(--green)]">$482.00</strong>
                </div>
                <div className="p-4 bg-white/[0.04] rounded-[20px] border border-white/10">
                  <span className="text-[10px] font-bold text-white/65 block">Orders count</span>
                  <strong className="text-xl font-display font-bold tabular-nums text-white">3 orders</strong>
                </div>
                <div className="p-4 bg-white/[0.04] rounded-[20px] border border-white/10">
                  <span className="text-[10px] font-bold text-white/65 block">Avg. order value</span>
                  <strong className="text-xl font-display font-bold tabular-nums text-white">$160.66</strong>
                </div>
                <div className="p-4 bg-white/[0.04] rounded-[20px] border border-white/10">
                  <span className="text-[10px] font-bold text-white/65 block">Returns / RTO</span>
                  <strong className="text-xl font-display font-bold tabular-nums text-green-400">0 returns</strong>
                </div>
              </div>

              {/* Active Order Breakdown */}
              <div className="p-5 bg-white/[0.04] rounded-[20px] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-white">
                    Active order: #1042 ($84.00)
                  </span>
                  <span className="text-xs font-bold text-[var(--green)] bg-[var(--green)]/10 px-2.5 py-0.5 rounded-full">Out for delivery</span>
                </div>
                <div className="text-xs text-white/75">
                  Items: 1x Organic Linen Robe (M / Sage), 1x Silk Eye Mask
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-white/65 font-mono">
                  <span>Shipping: 742 Evergreen Terrace, Apt 4B</span>
                  <span>FedEx Express (FX-88912)</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert("Generates a personalized Shopify discount code!")}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors duration-300 cursor-pointer"
                >
                  Create 10% discount code
                </button>
                <button
                  type="button"
                  onClick={() => alert("Sends digital PDF invoice into WhatsApp chat!")}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors duration-300 cursor-pointer"
                >
                  Send PDF invoice
                </button>
                <button
                  type="button"
                  onClick={() => alert("Opens order in official Shopify Admin!")}
                  className="px-4 py-2 rounded-full bg-[var(--green)]/20 hover:bg-[var(--green)]/30 text-[var(--green)] text-xs font-bold transition-colors cursor-pointer"
                >
                  View in Shopify Admin
                </button>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="ib-swap grid grid-cols-3 gap-3">
              <div className="aspect-square bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center text-xs text-white/65">
                Photo 1 (packaging)
              </div>
              <div className="aspect-square bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center text-xs text-white/65">
                Photo 2 (barcode)
              </div>
              <div className="aspect-square bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center text-xs text-white/65">
                Photo 3 (fit check)
              </div>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="ib-swap space-y-2">
              <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <span className="font-mono">Order-1042-Tax-Invoice.pdf</span>
                <span className="text-[var(--green)] font-bold cursor-pointer">Download</span>
              </div>
              <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <span className="font-mono">Order-1035-Receipt.pdf</span>
                <span className="text-[var(--green)] font-bold cursor-pointer">Download</span>
              </div>
            </div>
          )}

          {activeTab === "links" && (
            <div className="ib-swap space-y-2 text-xs">
              <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-white/75">FedEx live GPS tracking URL</span>
                <span className="text-[var(--green)] font-mono">Open link</span>
              </div>
              <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-white/75">Shopify checkout pre-filled cart</span>
                <span className="text-[var(--green)] font-mono">Open link</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
