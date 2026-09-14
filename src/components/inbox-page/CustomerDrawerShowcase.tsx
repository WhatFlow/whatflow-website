"use client";

import React, { useState } from "react";

export function CustomerDrawerShowcase() {
  const [activeTab, setActiveTab] = useState<"overview" | "media" | "docs" | "links">("overview");

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            SHOPIFY 360° CONTEXT
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            CUSTOMER PROFILE DRAWER: <span className="text-[#1ed760]">ZERO TAB SWITCHING.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Support agents no longer need to open 5 browser tabs to find an order or issue a refund.
            All Shopify customer data lives directly alongside the live WhatsApp conversation.
          </p>
        </div>

        {/* Mock Drawer Visual */}
        <div className="max-w-4xl mx-auto bg-[#121212] rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1ed760] text-black font-black text-sm flex items-center justify-center">
                SJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-display font-black uppercase text-white">Sarah Jenkins</h3>
                  <span className="text-[10px] font-mono bg-[#1ed760]/20 text-[#1ed760] px-2 py-0.5 rounded-full">
                    VIP Customer
                  </span>
                </div>
                <div className="text-xs text-gray-400">sarah.jenkins@example.com • +1 (555) 382-9104</div>
              </div>
            </div>

            {/* 4 Tabs */}
            <div className="flex rounded-xl bg-[#181818] p-1 border border-white/10 text-xs">
              {(["overview", "media", "docs", "links"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                    activeTab === t ? "bg-[#242424] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">TOTAL SPENT</span>
                  <strong className="text-xl font-display font-black text-[#1ed760]">$482.00</strong>
                </div>
                <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">ORDERS COUNT</span>
                  <strong className="text-xl font-display font-black text-white">3 Orders</strong>
                </div>
                <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">AVG ORDER VALUE</span>
                  <strong className="text-xl font-display font-black text-white">$160.66</strong>
                </div>
                <div className="p-4 bg-[#181818] rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">RETURNS / RTO</span>
                  <strong className="text-xl font-display font-black text-green-400">0 Returns</strong>
                </div>
              </div>

              {/* Active Order Breakdown */}
              <div className="p-5 bg-[#181818] rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-sm uppercase text-white">
                    Active Order: #1042 ($84.00)
                  </span>
                  <span className="text-xs font-bold text-[#1ed760] bg-[#1ed760]/10 px-2.5 py-0.5 rounded-full">
                    Out for Delivery
                  </span>
                </div>
                <div className="text-xs text-gray-300">
                  Items: 1x Organic Linen Robe (M / Sage), 1x Silk Eye Mask
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  Shipping: 742 Evergreen Terrace, Apt 4B • FedEx Express (FX-88912)
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert("Generates a personalized Shopify discount code!")}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  🏷️ Create 10% Discount Code
                </button>
                <button
                  type="button"
                  onClick={() => alert("Sends digital PDF invoice into WhatsApp chat!")}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  📄 Send PDF Invoice
                </button>
                <button
                  type="button"
                  onClick={() => alert("Opens order in official Shopify Admin!")}
                  className="px-4 py-2 rounded-xl bg-[#1ed760]/20 hover:bg-[#1ed760]/30 text-[#1ed760] text-xs font-bold transition-colors cursor-pointer"
                >
                  ↗ View in Shopify Admin
                </button>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square bg-[#181818] rounded-xl border border-white/10 flex items-center justify-center text-xs text-gray-400">
                Photo 1 (Packaging)
              </div>
              <div className="aspect-square bg-[#181818] rounded-xl border border-white/10 flex items-center justify-center text-xs text-gray-400">
                Photo 2 (Barcode)
              </div>
              <div className="aspect-square bg-[#181818] rounded-xl border border-white/10 flex items-center justify-center text-xs text-gray-400">
                Photo 3 (Fit Check)
              </div>
            </div>
          )}

          {activeTab === "docs" && (
            <div className="space-y-2">
              <div className="p-3 bg-[#181818] rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <span className="font-mono">Order-1042-Tax-Invoice.pdf</span>
                <span className="text-[#1ed760] font-bold cursor-pointer">Download</span>
              </div>
              <div className="p-3 bg-[#181818] rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <span className="font-mono">Order-1035-Receipt.pdf</span>
                <span className="text-[#1ed760] font-bold cursor-pointer">Download</span>
              </div>
            </div>
          )}

          {activeTab === "links" && (
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#181818] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-gray-300">FedEx Live GPS Tracking URL</span>
                <span className="text-[#1ed760] font-mono">Open Link ↗</span>
              </div>
              <div className="p-3 bg-[#181818] rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-gray-300">Shopify Checkout Pre-filled Cart</span>
                <span className="text-[#1ed760] font-mono">Open Link ↗</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
