"use client";

import React, { useState } from "react";
import { Hl, Section, SectionHead } from "@/components/site/PageKit";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

const MESSAGE_TYPES = [
  { id: "text", name: "1. Text & formatting" },
  { id: "image", name: "2. Photo & caption" },
  { id: "video", name: "3. Video preview" },
  { id: "audio", name: "4. Voice note waveform" },
  { id: "document", name: "5. PDF document" },
  { id: "sticker", name: "6. Animated sticker" },
  { id: "location", name: "7. Geolocation pin" },
  { id: "contact", name: "8. vCard contact" },
  { id: "buttons", name: "9. Interactive buttons" },
  { id: "list", name: "10. Section list menu" },
  { id: "flow", name: "11. WhatsApp Flow" },
];

export function MessageTypeGallery() {
  const [activeType, setActiveType] = useState<string>("audio");

  return (
    <Section tone="mint">
      <SectionHead
        center
        kicker="Meta Cloud API compliant"
        title={<>11 message bubble types, <Hl>1 powerful inbox.</Hl></>}
        sub={<>Whether your customer sends a voice note, a photo of a damaged box, or an interactive button click, WhatFlow renders every native WhatsApp message format in the inbox.</>}
      />
      <div className="mt-14 space-y-10">

        {/* Horizontal Type Selector */}
        <div className="ib-tabs max-w-5xl mx-auto" data-reveal>
          {MESSAGE_TYPES.map((type) => {
            const isSelected = activeType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setActiveType(type.id)}
                aria-pressed={isSelected}
                className="ib-tab"
              >
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Bubble Showcase Card */}
        <div data-reveal className="ib-chat max-w-2xl mx-auto p-6 sm:p-8" data-framed>
          <div className="text-xs font-mono text-white/65 mb-4 pb-2 border-b border-white/10 flex justify-between">
            <span>Rendering: {MESSAGE_TYPES.find((m) => m.id === activeType)?.name}</span>
            <span className="text-[var(--green)]">Official spec</span>
          </div>
          <div key={activeType} className="ib-swap">
          {activeType === "text" && (
            <WhatsAppBubble sender="bot" time="10:14 AM">
              Hi Emma! Your <strong>Summer Capsule Order</strong> has been confirmed.
              <br /><br />
              Use code <em>VIPGIFT</em> at checkout. ~Expired yesterday~ Now extended!
            </WhatsAppBubble>
          )}

          {activeType === "image" && (
            <WhatsAppBubble
              sender="bot"
              time="10:15 AM"
              media={{
                type: "image",
                title: "Lumiere Silk Slip Dress",
                subtitle: "High resolution • Tap to expand full-screen",
              }}
            >
              Here is the updated photo of the sage green fabric under natural daylight as requested!
            </WhatsAppBubble>
          )}

          {activeType === "video" && (
            <WhatsAppBubble
              sender="bot"
              time="10:16 AM"
              media={{
                type: "image",
                title: "How to Style Your Linen Blazer (0:45)",
                subtitle: "MP4 Video • Tap to play in-chat",
              }}
            >
              Our stylist prepared this 45-second styling video for your new order.
            </WhatsAppBubble>
          )}

          {activeType === "audio" && (
            <WhatsAppBubble
              sender="bot"
              time="10:17 AM"
              media={{
                type: "audio",
                title: "Voice Note",
              }}
            >
              Voice message from Concierge Team (0:38).
            </WhatsAppBubble>
          )}

          {activeType === "document" && (
            <WhatsAppBubble
              sender="bot"
              time="10:18 AM"
              media={{
                type: "document",
                title: "Tax-Invoice-#1042.pdf",
                subtitle: "184 KB • Official Shopify Receipt",
              }}
            >
              Here is your official tax receipt for order #1042.
            </WhatsAppBubble>
          )}

          {activeType === "sticker" && (
            <div className="flex justify-end my-2">
              <div className="bg-[var(--wa-outgoing)] p-3 rounded-[20px] border border-[#C1ECC0] text-center">
                <div className="text-5xl my-1">🎉</div>
                <div className="text-[10px] text-[var(--text-neutral)] font-mono">Animated Sticker • WebP</div>
              </div>
            </div>
          )}

          {activeType === "location" && (
            <WhatsAppBubble
              sender="bot"
              time="10:20 AM"
              media={{
                type: "image",
                title: "Lumiere Flagship Store (SoHo, NY)",
                subtitle: "482 Broadway, New York, NY 10013",
              }}
              buttons={[{ text: "Open in Google Maps 🗺️", highlight: true }]}
            >
              Come visit our showroom! We are open until 8:00 PM today.
            </WhatsAppBubble>
          )}

          {activeType === "contact" && (
            <WhatsAppBubble
              sender="bot"
              time="10:21 AM"
              buttons={[{ text: "Save Contact to Phone 📇", highlight: true }]}
            >
              <strong>Lumiere Concierge Support</strong>
              <br />
              📞 +1 (800) 555-0199
              <br />
              ✉️ concierge@lumiere.com
            </WhatsAppBubble>
          )}

          {activeType === "buttons" && (
            <WhatsAppBubble
              sender="bot"
              time="10:22 AM"
              headerBadge="Select action"
              buttons={[
                { text: "Confirm My Order (COD)", highlight: true },
                { text: "Modify Shipping Address" },
                { text: "Cancel Order" },
              ]}
            >
              Please verify your Cash on Delivery purchase for order #1042:
            </WhatsAppBubble>
          )}

          {activeType === "list" && (
            <WhatsAppBubble
              sender="bot"
              time="10:23 AM"
              headerBadge="Customer menu"
              buttons={[{ text: "Select Service Option 📋", highlight: true }]}
            >
              Tap below to choose from our 10 service categories including Order Tracking, Exchanges, and Sizing Advice.
            </WhatsAppBubble>
          )}

          {activeType === "flow" && (
            <WhatsAppBubble
              sender="bot"
              time="10:24 AM"
              headerBadge="WhatsApp Flow"
              buttons={[{ text: "Open Interactive Return Form 📝", highlight: true }]}
            >
              Start your return inside WhatsApp! Fill in your return reason and upload a photo directly in this chat.
            </WhatsAppBubble>
          )}
          </div>
        </div>
      </div>
    </Section>
  );
}
