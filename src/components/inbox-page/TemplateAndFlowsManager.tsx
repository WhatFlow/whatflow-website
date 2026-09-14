"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

export function TemplateAndFlowsManager() {
  const [activeTab, setActiveTab] = useState<"templates" | "flows">("flows");

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
            ADVANCED WHATSAPP CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            META TEMPLATES &amp; <span className="text-[#1ed760]">NATIVE WHATSAPP FLOWS.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Re-engage customers outside the 24-hour window using pre-approved Meta templates,
            or launch interactive, multi-screen native forms right inside WhatsApp chat.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center">
          <div className="flex p-1 rounded-2xl bg-[#181818] border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("flows")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "flows" ? "bg-[#1ed760] text-black shadow-[0_0_12px_rgba(30,215,96,0.3)]" : "text-gray-400 hover:text-white"
              }`}
            >
              📝 Native WhatsApp Flows (Forms)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("templates")}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "templates" ? "bg-[#1ed760] text-black shadow-[0_0_12px_rgba(30,215,96,0.3)]" : "text-gray-400 hover:text-white"
              }`}
            >
              📑 Meta Pre-Approved Templates
            </button>
          </div>
        </div>

        <div className="bg-[#181818] p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-5">
            {activeTab === "flows" ? (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  JSON Flow Engine • Meta Cloud API
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Multi-Screen Native Forms In-Chat
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  WhatsApp Flows allow merchants to build complex customer journeys — such as booking appointments,
                  processing product returns, or submitting feedback — entirely inside WhatsApp without directing users to external web pages.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> 8 supported categories: Survey, Lead Gen, Return, Appointment, etc.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> End-to-end encrypted data exchange with Cloudflare Worker endpoint
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> Built-in JSON flow schema editor with live validator
                  </li>
                </ul>
              </>
            ) : (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  Meta WABA Template Catalog
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Pre-Approved Template Picker
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  When the 24-hour customer care window expires, choose from your library of pre-approved Meta templates.
                  WhatFlow automatically fills in customer names, order numbers, and tracking links before dispatch.
                </p>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> Filter by Utility, Marketing, or Authentication categories
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> Live variable mapping with preview before sending
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✔</span> Protects your WABA phone quality rating from spam flags
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-6 bg-[#0b141a] p-6 sm:p-8 rounded-2xl border border-white/10">
            {activeTab === "flows" ? (
              <WhatsAppBubble
                sender="bot"
                time="12:05 PM"
                headerBadge="WHATSAPP FLOW"
                buttons={[
                  { text: "Open Return & Exchange Form 📝", highlight: true },
                ]}
              >
                We are sorry the item did not fit perfectly! Tap below to open our interactive return form.
                Select your order items, reason for return, and preferred refund method directly inside WhatsApp:
              </WhatsAppBubble>
            ) : (
              <WhatsAppBubble
                sender="bot"
                time="12:06 PM"
                headerBadge="UTILITY TEMPLATE"
                buttons={[
                  { text: "Confirm My Order (COD)", highlight: true },
                  { text: "Cancel Order" },
                ]}
              >
                Hi Sarah! 👋 This is an automated update from Lumiere Store regarding your pending order <strong>#1042</strong>.
                <br /><br />
                Please tap below to verify your Cash on Delivery shipment:
              </WhatsAppBubble>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
