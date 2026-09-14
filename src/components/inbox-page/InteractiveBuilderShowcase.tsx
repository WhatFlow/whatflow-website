"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

type BuilderTab = "buttons" | "cta" | "list" | "carousel";

export function InteractiveBuilderShowcase() {
  const [activeTab, setActiveTab] = useState<BuilderTab>("buttons");

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            4-IN-1 INTERACTIVE TOOL
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            INTERACTIVE BUILDER: <span className="text-[#1ed760]">ZERO CODE REQUIRED.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Construct tap-friendly WhatsApp interactive components right inside the composer.
            Higher engagement, fewer typos, and higher checkout conversion.
          </p>
        </div>

        {/* 4 Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {[
            { id: "buttons", label: "Quick Reply Buttons", icon: "🔘" },
            { id: "cta", label: "CTA (Phone & Web URL)", icon: "🔗" },
            { id: "list", label: "Section List Menu", icon: "📋" },
            { id: "carousel", label: "Product Carousel", icon: "🛍️" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as BuilderTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1ed760] text-black shadow-[0_0_16px_rgba(30,215,96,0.3)] scale-105"
                    : "bg-[#121212] text-gray-300 hover:bg-[#222222] border border-white/10"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Builder Display Card */}
        <div className="bg-[#121212] p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Spec Breakdown */}
          <div className="lg:col-span-6 space-y-5">
            {activeTab === "buttons" && (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  type: &quot;button&quot; (Meta API Spec)
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Quick Reply Buttons (Up to 3)
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Present up to 3 interactive pill buttons underneath any message. When the customer taps a button,
                  their choice sends back instantly as a reply payload — eliminating typing on mobile keyboards.
                </p>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Maximum 20 characters per button label
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Immediate callback webhook received by Cloudflare Worker
                  </div>
                </div>
              </>
            )}

            {activeTab === "cta" && (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  type: &quot;cta_url&quot; &amp; &quot;cta_phone&quot;
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Call-to-Action Buttons
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Launch the phone dialer or open an external browser URL directly from WhatsApp.
                  Dynamically personalize the URL with pre-filled customer tokens or coupon codes.
                </p>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Supports HTTPS checkout recovery links
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Supports direct one-tap phone dialing
                  </div>
                </div>
              </>
            )}

            {activeTab === "list" && (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  type: &quot;list&quot; (Up to 10 options)
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Interactive Section List Menu
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  When you have more than 3 options, Section Lists provide a native WhatsApp bottom sheet
                  with up to 10 organized rows, each with title and description.
                </p>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Organized by custom section titles
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Cleanest format for FAQs and product catalogs
                  </div>
                </div>
              </>
            )}

            {activeTab === "carousel" && (
              <>
                <span className="text-xs font-mono bg-[#1ed760]/20 text-[#1ed760] px-2.5 py-1 rounded">
                  type: &quot;carousel&quot; (Up to 10 cards)
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
                  Product Carousel Cards
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Showcase multiple products side-by-side. Each card contains a high-res image,
                  title, price, description, and direct &quot;Buy Now&quot; button.
                </p>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Swipeable native card UI on iOS and Android
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1ed760]">✓</span> Synchronizes with Shopify product images &amp; pricing
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Live Mockup */}
          <div className="lg:col-span-6 bg-[#0b141a] p-6 sm:p-8 rounded-2xl border border-white/10">
            {activeTab === "buttons" && (
              <WhatsAppBubble
                sender="bot"
                time="11:30 AM"
                headerBadge="ORDER #1042"
                buttons={[
                  { text: "Confirm My Order (COD)", highlight: true },
                  { text: "Change Address" },
                  { text: "Cancel Order" },
                ]}
              >
                Hi Sarah! Please confirm your Cash on Delivery purchase for <strong>$84.00</strong>:
              </WhatsAppBubble>
            )}

            {activeTab === "cta" && (
              <WhatsAppBubble
                sender="bot"
                time="11:31 AM"
                headerBadge="SPECIAL PROMO"
                buttons={[
                  { text: "Claim 15% Off Checkout 🛍️", highlight: true },
                  { text: "Call Support (+1 800 555 0199)" },
                ]}
              >
                Exclusive offer for you Sarah! Complete your order today and get 15% off with free expedited delivery.
              </WhatsAppBubble>
            )}

            {activeTab === "list" && (
              <WhatsAppBubble
                sender="bot"
                time="11:32 AM"
                headerBadge="HELP MENU"
                buttons={[{ text: "Browse Options (10 Available) 📋", highlight: true }]}
              >
                Tap below to choose how our customer support team can assist you:
              </WhatsAppBubble>
            )}

            {activeTab === "carousel" && (
              <WhatsAppBubble
                sender="bot"
                time="11:33 AM"
                media={{
                  type: "image",
                  title: "Linen Trench Coat • $120.00",
                  subtitle: "Card 1 of 4 • Swipe to see more",
                }}
                buttons={[{ text: "Add to Bag ($120.00) 🛒", highlight: true }]}
              >
                Here are the newest pieces from our Autumn Capsule that match your size:
              </WhatsAppBubble>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
