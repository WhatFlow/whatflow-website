"use client";

import React, { useState } from "react";

export function BroadcastWizardShowcase() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
            INBOX-NATIVE BROADCASTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            4-STEP CAMPAIGN WIZARD: <span className="text-[#1ed760]">SEND IN MINUTES.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Launch targeted promotional blasts and newsletters directly from the WhatFlow Inbox.
            Complete audience segmentation, template variable testing, and scheduled sending.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="max-w-3xl mx-auto grid grid-cols-4 gap-2">
          {[
            { num: 1, title: "1. Setup" },
            { num: 2, title: "2. Template" },
            { num: 3, title: "3. Audience" },
            { num: 4, title: "4. Launch" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                currentStep === s.num
                  ? "bg-[#1ed760] text-black border-[#1ed760] font-black"
                  : "bg-[#181818] text-gray-400 border-white/10 font-bold hover:text-white"
              }`}
            >
              <div className="text-xs uppercase">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Wizard Box */}
        <div className="max-w-3xl mx-auto bg-[#181818] p-6 sm:p-10 rounded-3xl border border-white/15 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-display font-black uppercase text-white">
                Step 1: Campaign Configuration
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Campaign Name</label>
                <input
                  type="text"
                  defaultValue="Summer Solstice VIP Drop 2026"
                  className="w-full p-3 rounded-xl bg-[#121212] border border-white/15 text-xs text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Dispatch Mode</label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#121212] border border-[#1ed760] text-[#1ed760] font-bold">
                    ⚡ Instant Send (Anti-Ban Paced)
                  </div>
                  <div className="p-3 rounded-xl bg-[#121212] border border-white/10 text-gray-400">
                    📅 Schedule for Later
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-display font-black uppercase text-white">
                Step 2: Template &amp; Variable Mapping
              </h3>
              <div className="p-4 bg-[#121212] rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Template: vip_flash_sale_v2</span>
                  <span className="text-[#1ed760] font-mono">Status: Approved</span>
                </div>
                <div className="text-gray-400 font-mono text-[11px]">
                  &quot;Hi {'{{1}}'}, your private 20% discount code {'{{2}}'} is active!&quot;
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#121212] rounded-xl border border-white/10">
                  <span className="text-gray-400 text-[10px] block">MAP VARIABLE {'{{1}}'}</span>
                  <strong className="text-white">Shopify Customer First Name</strong>
                </div>
                <div className="p-3 bg-[#121212] rounded-xl border border-white/10">
                  <span className="text-gray-400 text-[10px] block">MAP VARIABLE {'{{2}}'}</span>
                  <strong className="text-white">Dynamic Coupon (SUMMER20)</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-display font-black uppercase text-white">
                Step 3: Audience Selection
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-[#121212] border border-[#1ed760] space-y-1">
                  <strong className="text-[#1ed760] block">Option A: Shopify Tags</strong>
                  <p className="text-gray-400 text-[11px]">
                    Filter by &quot;VIP-Tier&quot; (4,820 customers selected)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#121212] border border-white/10 space-y-1">
                  <strong className="text-white block">Option B: CSV Upload</strong>
                  <p className="text-gray-400 text-[11px]">
                    Upload custom spreadsheet with phone numbers
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-display font-black uppercase text-white">
                Step 4: Test Send &amp; Final Launch
              </h3>
              <div className="p-4 bg-[#121212] rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Recipients:</span>
                  <span className="font-bold text-white">4,820 Opted-in Buyers</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Estimated Time:</span>
                  <span className="font-bold text-[#1ed760]">1m 45s via Cloudflare Queue</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Estimated Meta Cost:</span>
                  <span className="font-bold text-white">Direct Meta API Rate ($0 Markup)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Broadcast launched successfully!")}
                className="w-full py-3.5 rounded-full bg-[#1ed760] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#1abc54] transition-all cursor-pointer shadow-[0_0_20px_rgba(30,215,96,0.3)]"
              >
                🚀 Launch Broadcast Campaign
              </button>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-white/10 text-xs">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((p) => p - 1)}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 cursor-pointer"
            >
              ← Previous Step
            </button>
            <button
              type="button"
              disabled={currentStep === 4}
              onClick={() => setCurrentStep((p) => p + 1)}
              className="px-4 py-2 rounded-lg bg-[#1ed760] text-black font-bold disabled:opacity-30 cursor-pointer"
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
