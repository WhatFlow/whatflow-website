"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

const MESSAGE_TYPES = [
  { id: "text", name: "1. Text & Formatting", icon: "💬" },
  { id: "image", name: "2. Photo & Caption", icon: "📷" },
  { id: "video", name: "3. Video Preview", icon: "🎥" },
  { id: "audio", name: "4. Voice Note Waveform", icon: "🎙️" },
  { id: "document", name: "5. PDF Document", icon: "📄" },
  { id: "sticker", name: "6. Animated Sticker", icon: "🏷️" },
  { id: "location", name: "7. Geolocation Pin", icon: "📍" },
  { id: "contact", name: "8. vCard Contact", icon: "👤" },
  { id: "buttons", name: "9. Interactive Buttons", icon: "🔘" },
  { id: "list", name: "10. Section List Menu", icon: "📋" },
  { id: "flow", name: "11. WhatsApp Flow", icon: "📝" },
];

export function MessageTypeGallery() {
  const [activeType, setActiveType] = useState<string>("audio");

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#181818] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider inline-block">
            META CLOUD API COMPLIANT
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            11 MESSAGE BUBBLE TYPES, <span className="text-[#1ed760]">1 POWERFUL INBOX.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Whether your customer sends a voice note, a photo of a damaged box, or an interactive button click,
            WhatFlow renders every native WhatsApp message format seamlessly.
          </p>
        </div>

        {/* Horizontal Type Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
          {MESSAGE_TYPES.map((type) => {
            const isSelected = activeType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1ed760] text-black shadow-[0_0_16px_rgba(30,215,96,0.3)] scale-105"
                    : "bg-[#121212] text-gray-300 hover:bg-[#202020] border border-white/10"
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Bubble Showcase Card */}
        <div className="max-w-2xl mx-auto bg-[#0b141a] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="text-xs font-mono text-gray-400 mb-4 pb-2 border-b border-white/10 flex justify-between">
            <span>Rendering: {MESSAGE_TYPES.find((m) => m.id === activeType)?.name}</span>
            <span className="text-[#1ed760]">Official Spec</span>
          </div>

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
              <div className="bg-[#D9FDD3] p-3 rounded-2xl border border-[#C1ECC0] text-center">
                <div className="text-5xl my-1 animate-bounce">🎉</div>
                <div className="text-[10px] text-gray-500 font-mono">Animated Sticker • WebP</div>
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
              headerBadge="SELECT ACTION"
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
              headerBadge="CUSTOMER MENU"
              buttons={[{ text: "Select Service Option 📋", highlight: true }]}
            >
              Tap below to choose from our 10 service categories including Order Tracking, Exchanges, and Sizing Advice.
            </WhatsAppBubble>
          )}

          {activeType === "flow" && (
            <WhatsAppBubble
              sender="bot"
              time="10:24 AM"
              headerBadge="WHATSAPP FLOW"
              buttons={[{ text: "Open Interactive Return Form 📝", highlight: true }]}
            >
              Start your return inside WhatsApp! Fill in your return reason and upload a photo directly in this chat.
            </WhatsAppBubble>
          )}
        </div>
      </div>
    </section>
  );
}
