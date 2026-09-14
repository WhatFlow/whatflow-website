"use client";

import React, { useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function BroadcastGuide() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: "Smart Shopify Segmentation",
      desc: "Filter your audience by Shopify tags (e.g. VIP, Repeat Buyer, High LTV), total spend, order count, or CSV uploads.",
      tag: "TARGETING",
    },
    {
      num: 2,
      title: "Template & Variable Mapping",
      desc: "Select an official Meta pre-approved marketing template and dynamically map variables like {{first_name}} and {{discount_code}}.",
      tag: "PERSONALIZATION",
    },
    {
      num: 3,
      title: "Anti-Ban Safety Delay Pacing",
      desc: "Intelligent rate pacing spaces outbound messages automatically to comply with Meta throughput limits and keep your WhatsApp number 100% safe.",
      tag: "PHONE PROTECTION",
    },
    {
      num: 4,
      title: "Real-Time Conversion Audit",
      desc: "Track Sent, Delivered, Read, and Button Click metrics down to individual customer phone numbers in real-time.",
      tag: "ROI ANALYTICS",
    },
  ];

  return (
    <section id="broadcasts" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            REVENUE-DRIVING CAMPAIGNS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            HIGH-VOLUME BROADCASTS, <span className="text-stroke-green">ZERO BAN RISK.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Launch promotional campaigns, flash sales, and product drops to thousands of opted-in customers.
            Protected by our intelligent queuing and pacing algorithm.
          </p>
        </div>

        {/* 4 Step Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const isActive = step.num === activeStep;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`p-6 rounded-2xl border-2 border-black transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#091E17] text-white shadow-[4px_4px_0px_#000] scale-[1.02]"
                    : "bg-white text-black hover:bg-gray-50 shadow-[2px_2px_0px_#000]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-display font-black text-sm flex items-center justify-center border border-black ${
                      isActive ? "bg-[#00D261] text-black" : "bg-[#FAF7F0] text-black"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? "bg-[#00D261] text-black" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-display font-black text-base uppercase mb-1">{step.title}</h3>
                <p className={`text-xs leading-relaxed ${isActive ? "text-gray-300" : "text-gray-600"}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Broadcast Engine Mockup */}
        <div className="neo-box bg-white p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-black/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00D261] animate-ping" />
                <span className="text-xs font-mono text-gray-500 uppercase">Campaign ID: #CAMP-8891</span>
              </div>
              <div className="text-xl sm:text-2xl font-display font-black uppercase text-black mt-1">
                Black Friday Early VIP Access • Segment: &quot;Top 10% Spenders&quot;
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="neo-pill bg-[#00D261] text-black px-3 py-1 text-xs font-black">
                ACTIVE SENDING
              </span>
            </div>
          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/10">
              <div className="text-xs font-bold text-gray-500 uppercase">Recipients</div>
              <div className="text-2xl sm:text-3xl font-display font-black text-black">8,450</div>
              <div className="text-[10px] text-[#0A6B56] font-bold">100% Target Matched</div>
            </div>
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/10">
              <div className="text-xs font-bold text-gray-500 uppercase">Delivered</div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#2563EB]">98.7%</div>
              <div className="text-[10px] text-gray-600 font-bold">8,340 Verified Deliv.</div>
            </div>
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/10">
              <div className="text-xs font-bold text-gray-500 uppercase">Read Rate</div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#00D261]">89.4%</div>
              <div className="text-[10px] text-gray-600 font-bold">Double Blue Checks</div>
            </div>
            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/10">
              <div className="text-xs font-bold text-gray-500 uppercase">Button CTR</div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#FFC107]">31.2%</div>
              <div className="text-[10px] text-green-700 font-bold">2,604 Orders Triggered</div>
            </div>
          </div>

          {/* Detailed Row Breakdown */}
          <div className="bg-[#091E17] text-white p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
              <span className="flex items-center gap-2">
                <span className="text-[#00D261]">⚡</span> Anti-Ban Safety Throttle Active
              </span>
              <span className="font-mono text-[#00D261]">Pacing: 45 msgs / sec</span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#00D261] h-full rounded-full transition-all duration-500 w-[84%]" />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>7,100 of 8,450 processed</span>
              <span>Estimated finish: 28 seconds</span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-gray-600 font-medium max-w-xl">
              * WhatFlow passes official Meta per-conversation rates with <strong>$0 markup</strong>. You only pay standard Meta API rates directly to Meta Business Manager.
            </div>
            <a
              href={getShopifyAppUrl("broadcast_engine_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
            >
              LAUNCH FIRST BROADCAST ➔
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
