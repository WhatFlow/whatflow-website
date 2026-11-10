"use client";

import React, { useState } from "react";
import { Hl, Section, SectionHead } from "@/components/site/PageKit";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

type BuilderTab = "buttons" | "cta" | "list" | "carousel";

export function InteractiveBuilderShowcase() {
  const [activeTab, setActiveTab] = useState<BuilderTab>("buttons");

  return (
    <Section tone="paper">
      <SectionHead
        center
        kicker="4-in-1 interactive tool"
        title={<>Interactive builder: <Hl>zero code required.</Hl></>}
        sub={<>Construct tap-friendly WhatsApp interactive components right inside the composer. Higher engagement, fewer typos, and higher checkout conversion.</>}
      />
      <div className="mt-14 space-y-10">

        {/* 4 Tabs Selector */}
        <div className="ib-tabs max-w-3xl mx-auto" data-reveal>
          {[
            { id: "buttons", label: "Quick reply buttons" },
            { id: "cta", label: "CTA (phone & web URL)" },
            { id: "list", label: "Section list menu" },
            { id: "carousel", label: "Product carousel" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as BuilderTab)}
                aria-pressed={isSelected}
                className="ib-tab"
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Builder Display Card */}
        <div data-reveal className="ib-device p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Spec Breakdown */}
          <div key={activeTab} className="ib-swap lg:col-span-6 space-y-5">
            {activeTab === "buttons" && (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Quick reply buttons (up to 3)
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  Present up to 3 interactive pill buttons underneath any message. When the customer taps a button,
                  their selection sends back instantly as a message, so they never have to type on a mobile keyboard.
                </p>
                <div className="space-y-2 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Maximum 20 characters per button label
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Customer selection registers immediately in chat
                  </div>
                </div>
              </>
            )}

            {activeTab === "cta" && (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Call-to-action buttons
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  Launch the phone dialer or open an external browser URL directly from WhatsApp.
                  Dynamically personalize the URL with pre-filled customer tokens or coupon codes.
                </p>
                <div className="space-y-2 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Supports HTTPS checkout recovery links
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Supports direct one-tap phone dialing
                  </div>
                </div>
              </>
            )}

            {activeTab === "list" && (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Interactive section list menu
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  When you have more than 3 options, Section Lists provide a native WhatsApp bottom sheet
                  with up to 10 organized rows, each with title and description.
                </p>
                <div className="space-y-2 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Organized by custom section titles
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Cleanest format for FAQs and product catalogs
                  </div>
                </div>
              </>
            )}

            {activeTab === "carousel" && (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Product carousel cards
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  Showcase multiple products side-by-side. Each card contains a high-res image,
                  title, price, description, and direct &quot;Buy Now&quot; button.
                </p>
                <div className="space-y-2 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Swipeable native card UI on iOS and Android
                  </div>
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Synchronizes with Shopify product images &amp; pricing
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Live Mockup */}
          <div key={`mock-${activeTab}`} className="ib-swap ib-chat lg:col-span-6 p-6 sm:p-8">
            {activeTab === "buttons" && (
              <WhatsAppBubble
                sender="bot"
                time="11:30 AM"
                headerBadge="Order #1042"
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
                headerBadge="Special promo"
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
                headerBadge="Help menu"
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
    </Section>
  );
}
