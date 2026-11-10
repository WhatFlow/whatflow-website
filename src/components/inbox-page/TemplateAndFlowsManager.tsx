"use client";

import React, { useState } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

export function TemplateAndFlowsManager() {
  const [activeTab, setActiveTab] = useState<"templates" | "flows">("flows");

  return (
    <Section tone="dark" className="ib-glow">
      <SectionHead
        center light
        kicker="Advanced WhatsApp capabilities"
        title={<>Meta templates &amp; <span className="text-[var(--green)]">native WhatsApp Flows.</span></>}
        sub={<>Re-engage customers outside the 24-hour window using pre-approved Meta templates, or launch interactive, multi-screen native forms right inside WhatsApp chat.</>}
      />
      <div className="mt-14 space-y-10">

        {/* Tab Toggle */}
        <div className="flex justify-center">
          <div className="ib-tabs" data-light data-reveal>
            <button
              type="button"
              onClick={() => setActiveTab("flows")}
              aria-pressed={activeTab === "flows"}
              className="ib-tab"
            >
              Native WhatsApp Flows (forms)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("templates")}
              aria-pressed={activeTab === "templates"}
              className="ib-tab"
            >
              Meta pre-approved templates
            </button>
          </div>
        </div>

        <div data-reveal className="ib-panel p-6 sm:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Description */}
          <div key={activeTab} className="ib-swap lg:col-span-6 space-y-5">
            {activeTab === "flows" ? (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Multi-screen native forms in-chat
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  WhatsApp Flows allow merchants to build complex customer journeys, such as booking appointments,
                  processing product returns, or submitting feedback, entirely inside WhatsApp without directing users to external web pages.
                </p>
                <ul className="space-y-2 text-sm text-white/75">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> 8 supported categories: Survey, Lead Gen, Return, Appointment, etc.
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Secure in-chat data submission directly to your store
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Interactive flow creator with pre-built form templates
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-2xl sm:text-4xl font-display font-bold tracking-[-0.035em] text-white">
                  Pre-approved template picker
                </h3>
                <p className="text-[15px] text-white/65 leading-relaxed">
                  When the 24-hour customer care window expires, choose from your library of pre-approved Meta templates.
                  WhatFlow automatically fills in customer names, order numbers, and tracking links before dispatch.
                </p>
                <ul className="space-y-2 text-sm text-white/75">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Filter by Utility, Marketing, or Authentication categories
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Live variable mapping with preview before sending
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[var(--green)]">✓</span> Protects your WABA phone quality rating from spam flags
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Right Mockup */}
          <div key={`mock-${activeTab}`} className="ib-swap ib-chat lg:col-span-6 p-6 sm:p-8">
            {activeTab === "flows" ? (
              <WhatsAppBubble
                sender="bot"
                time="12:05 PM"
                headerBadge="WhatsApp Flow"
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
                headerBadge="Utility template"
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
    </Section>
  );
}
