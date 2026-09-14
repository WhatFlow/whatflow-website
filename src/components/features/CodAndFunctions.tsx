"use client";

import React, { useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function CodAndFunctions() {
  const [codFeeEnabled, setCodFeeEnabled] = useState(true);
  const [blocklistActive, setBlocklistActive] = useState(true);
  const [confirmedOrder, setConfirmedOrder] = useState(false);

  return (
    <section id="shopify-functions" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#FF4B4B] text-white px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            ANTI-RTO &amp; SHOPIFY FUNCTIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            STOP COD LOSSES WITH <span className="text-stroke-green">NATIVE EXTENSIONS.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Cash on Delivery (COD) returns cost merchants millions in freight. WhatFlow combines native
            Shopify Functions at checkout with 1-click WhatsApp order confirmation to eliminate fake orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Function Settings Simulator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="neo-box bg-white p-6 sm:p-8 rounded-3xl border-2 border-black shadow-[5px_5px_0px_#000] space-y-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-black uppercase text-black">
                    Shopify Function: COD Rules Engine
                  </h3>
                  <div className="text-xs text-gray-500 font-medium">Executes at Shopify checkout in &lt;5ms</div>
                </div>
                <span className="neo-pill bg-[#00D261] text-black px-2.5 py-0.5 text-[10px] font-black">
                  ACTIVE
                </span>
              </div>

              {/* Setting 1: COD Fee */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF7F0] rounded-xl border border-black/10">
                <div>
                  <div className="text-xs font-black text-black">Dynamic Cash on Delivery Handling Fee</div>
                  <div className="text-[11px] text-gray-600">Adds $3.50 surcharge when COD is selected</div>
                </div>
                <button
                  type="button"
                  onClick={() => setCodFeeEnabled(!codFeeEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors p-0.5 border border-black relative cursor-pointer ${
                    codFeeEnabled ? "bg-[#00D261]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white border border-black transition-transform ${
                      codFeeEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Setting 2: Postal Blocklist */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF7F0] rounded-xl border border-black/10">
                <div>
                  <div className="text-xs font-black text-black">High-RTO Postal Code Blocklist</div>
                  <div className="text-[11px] text-gray-600">Hides COD method in 420 flagged zip codes</div>
                </div>
                <button
                  type="button"
                  onClick={() => setBlocklistActive(!blocklistActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-0.5 border border-black relative cursor-pointer ${
                    blocklistActive ? "bg-[#00D261]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white border border-black transition-transform ${
                      blocklistActive ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Setting 3: Min / Max Order limits */}
              <div className="p-3.5 bg-[#FAF7F0] rounded-xl border border-black/10 space-y-2">
                <div className="text-xs font-black text-black">Order Value Boundaries</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-white rounded border border-black/20">
                    <span className="text-[10px] text-gray-500 font-bold block">MIN ORDER VALUE</span>
                    <strong className="text-sm font-mono">$15.00</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-black/20">
                    <span className="text-[10px] text-gray-500 font-bold block">MAX ORDER VALUE</span>
                    <strong className="text-sm font-mono">$250.00</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 1-Click Verification in Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="neo-box bg-[#091E17] text-white p-6 sm:p-8 rounded-3xl border-2 border-black shadow-[5px_5px_0px_#000] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-display font-black uppercase text-white">
                    Shopify Order Tagger Sync
                  </h3>
                  <div className="text-xs text-gray-400 font-medium">Automatic tags applied in Shopify Admin</div>
                </div>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-[#00D261]">
                  Order #1042
                </span>
              </div>

              {/* Order Status Preview */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Customer:</span>
                  <span className="font-bold text-white">Alex Rivera (+1 555-0192)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Payment Gateway:</span>
                  <span className="font-bold text-yellow-400">Cash on Delivery (COD)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Shopify Order Tags:</span>
                  <div className="flex gap-2">
                    {confirmedOrder ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00D261] text-black text-[10px] font-black animate-pulse">
                        COD-Confirmed
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black">
                        COD-Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive verification button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmedOrder(!confirmedOrder)}
                  className="w-full py-3.5 rounded-xl bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider transition-transform hover:scale-[1.02] cursor-pointer shadow-[3px_3px_0px_#fff]"
                >
                  {confirmedOrder
                    ? "✓ Order Confirmed! (Click to Reset)"
                    : "Simulate Customer Tapping 'Confirm Order' ➔"}
                </button>
                <div className="text-center text-[11px] text-gray-400 mt-2">
                  Tags update in Shopify Admin within 200ms of WhatsApp button press.
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href={getShopifyAppUrl("cod_functions_cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
              >
                <span>ENABLE COD VERIFICATION FREE</span>
                <span>➔</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
