"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

type MessageType = "buttons" | "list" | "cta" | "flow" | "carousel" | "media";

export function AutoRepliesDemo() {
  const [selectedKeyword, setSelectedKeyword] = useState<string>("track");
  const [selectedFormat, setSelectedFormat] = useState<MessageType>("buttons");

  return (
    <section id="auto-replies" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            24/7 INTERACTIVE AUTOMATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            SMART AUTO-REPLIES & <span className="text-[#00D261]">RICH MESSAGE TYPES.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            Trigger lightning-fast responses based on keywords, regex rules, or AI intent.
            Deliver rich, tap-friendly interactive experiences instead of plain walls of text.
          </p>
        </div>

        {/* Format Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {[
            { id: "buttons", label: "Quick Reply Buttons", icon: "🔘" },
            { id: "list", label: "Interactive List Menu", icon: "📋" },
            { id: "cta", label: "CTA Links & Phone", icon: "🔗" },
            { id: "flow", label: "WhatsApp Flows (Forms)", icon: "📝" },
            { id: "carousel", label: "Product Carousel", icon: "🛍️" },
            { id: "media", label: "Rich Media & PDF", icon: "📎" },
          ].map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              onClick={() => setSelectedFormat(fmt.id as MessageType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                selectedFormat === fmt.id
                  ? "bg-[#00D261] text-black shadow-[3px_3px_0px_#fff]"
                  : "bg-[#132A22] text-gray-200 hover:bg-[#1b3a2f]"
              }`}
            >
              <span>{fmt.icon}</span>
              <span>{fmt.label}</span>
            </button>
          ))}
        </div>

        {/* Playground Container */}
        <div className="bg-white text-black p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Logic & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-[#0A6B56]">
                Simulate Customer Incoming Keyword:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { kw: "track", label: "Track my order" },
                  { kw: "menu", label: "Help menu" },
                  { kw: "return", label: "Exchange item" },
                  { kw: "catalog", label: "View catalog" },
                  { kw: "agent", label: "Talk to human" },
                ].map((item) => (
                  <button
                    key={item.kw}
                    type="button"
                    onClick={() => {
                      setSelectedKeyword(item.kw);
                      if (item.kw === "track") setSelectedFormat("buttons");
                      if (item.kw === "menu") setSelectedFormat("list");
                      if (item.kw === "return") setSelectedFormat("flow");
                      if (item.kw === "catalog") setSelectedFormat("carousel");
                      if (item.kw === "agent") setSelectedFormat("cta");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedKeyword === item.kw
                        ? "bg-black text-white border-2 border-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    &quot;{item.label}&quot;
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/15 space-y-3">
              <div className="text-xs font-black uppercase text-gray-900">4 Intelligent Matching Modes:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                <div className="p-2 bg-white rounded border border-gray-200">
                  <strong className="block text-black">Exact Match</strong> Matches keyword precisely
                </div>
                <div className="p-2 bg-white rounded border border-gray-200">
                  <strong className="block text-black">Contains Term</strong> Fires anywhere in message
                </div>
                <div className="p-2 bg-white rounded border border-gray-200">
                  <strong className="block text-black">Regex Patterns</strong> Complex syntax matching
                </div>
                <div className="p-2 bg-white rounded border border-gray-200">
                  <strong className="block text-black">AI Fallback</strong> Routes to agent if unknown
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getShopifyAppUrl("auto_replies_cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
              >
                <span>CREATE AUTO-REPLIES FREE</span>
                <span>➔</span>
              </a>
            </div>
          </div>

          {/* Right Column: Chat Preview */}
          <div className="lg:col-span-6 bg-[#ECE5DD] p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="text-xs font-bold text-gray-600 mb-3 flex items-center justify-between">
              <span>Interactive Chat Preview</span>
              <span className="text-[10px] font-mono bg-black/10 px-2 py-0.5 rounded">
                Format: {selectedFormat.toUpperCase()}
              </span>
            </div>

            <WhatsAppBubble sender="user" time="2:14 PM">
              {selectedKeyword === "track" && "Where is my order #1042?"}
              {selectedKeyword === "menu" && "Hi, I need assistance"}
              {selectedKeyword === "return" && "I would like to exchange my shoes"}
              {selectedKeyword === "catalog" && "Show me your newest summer arrivals"}
              {selectedKeyword === "agent" && "Can I talk to a real person?"}
            </WhatsAppBubble>

            {selectedFormat === "buttons" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="ORDER FOUND: #1042"
                buttons={[
                  { text: "Live GPS Tracking 📍", highlight: true },
                  { text: "Change Delivery Address" },
                  { text: "Call Courier" },
                ]}
              >
                We located your order! It is currently <strong>Out for Delivery</strong> with FedEx Express.
              </WhatsAppBubble>
            )}

            {selectedFormat === "list" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="MAIN MENU 📑"
                buttons={[
                  { text: "📋 View Options (3 Categories)", highlight: true },
                ]}
              >
                Welcome to <strong>Lumiere Support</strong>! Please choose an option from our service menu:
                <br /><br />
                1. 🚚 Order Status & Tracking<br />
                2. 🔄 Return & Refund Request<br />
                3. 🏷️ Active Promo Codes<br />
                4. 👤 Connect with an Agent
              </WhatsAppBubble>
            )}

            {selectedFormat === "cta" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="CUSTOMER CARE"
                buttons={[
                  { text: "📞 Call VIP Hotline (+1 800 555 0199)", highlight: true },
                  { text: "💬 Chat with Senior Specialist" },
                ]}
              >
                Our concierge team is available Monday through Friday (9 AM - 8 PM EST). Tap below to connect instantly:
              </WhatsAppBubble>
            )}

            {selectedFormat === "flow" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="NATIVE WHATSAPP FLOW"
                buttons={[
                  { text: "Start Return Request (In-Chat Form) 📝", highlight: true },
                ]}
              >
                We make exchanges hassle-free! Tap below to open our interactive return form directly inside WhatsApp — no external websites required.
              </WhatsAppBubble>
            )}

            {selectedFormat === "carousel" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="SUMMER DROP 2026 🌴"
                media={{
                  type: "image",
                  title: "Linen Resort Shirt • $48.00",
                  subtitle: "100% Organic European Linen",
                }}
                buttons={[
                  { text: "1-Tap Checkout 🛒", highlight: true },
                  { text: "Next Item ➔" },
                ]}
              >
                Swipe through our hand-picked summer essentials. Tap &quot;1-Tap Checkout&quot; to buy directly on WhatsApp!
              </WhatsAppBubble>
            )}

            {selectedFormat === "media" && (
              <WhatsAppBubble
                sender="bot"
                time="2:14 PM"
                headerBadge="DOCUMENT ATTACHED"
                media={{
                  type: "document",
                  title: "Lumiere-Return-Label.pdf",
                  subtitle: "Pre-paid USPS Return Label • 140 KB",
                }}
                buttons={[{ text: "Download & Print Label", highlight: true }]}
              >
                Here is your pre-paid shipping label. Print and affix it to your original box, then drop off at any post office.
              </WhatsAppBubble>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
