"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

interface AutomationItem {
  id: string;
  name: string;
  tag: string;
  badgeColor: string;
  trigger: string;
  description: string;
  features: string[];
  templatePreview: {
    header: string;
    body: string;
    footer?: string;
    buttons?: { text: string; highlight?: boolean }[];
    media?: { type: "image" | "document"; title: string; subtitle: string };
  };
}

const AUTOMATIONS: AutomationItem[] = [
  {
    id: "confirmation",
    name: "Order Confirmation",
    tag: "ANTI-RTO VERIFICATION",
    badgeColor: "bg-[#00D261] text-black",
    trigger: "New Order Placed",
    description:
      "Send an immediate WhatsApp message the second an order is placed. For Cash on Delivery (COD) merchants, interactive buttons allow customers to verify or cancel their purchase in 1 tap, automatically syncing tags to Shopify.",
    features: [
      "1-tap 'Confirm' and 'Cancel' interactive buttons",
      "Automatic Shopify order tags: 'COD-Confirmed', 'COD-Cancelled'",
      "Personalized order summary, shipping address, and order total",
      "Cut fake orders and Return to Origin (RTO) rates by up to 38%",
    ],
    templatePreview: {
      header: "ORDER #1042 CONFIRMED",
      body: "Hi Alex! 👋 Thank you for placing your order with Lumiere Studio.\n\nItems: 1x Organic Linen Shirt ($65.00)\nShipping To: 742 Evergreen Terrace\nPayment: Cash on Delivery ($65.00)\n\nPlease tap below to confirm your order so we can dispatch it right away!",
      footer: "Lumiere Studio • Reply STOP to unsubscribe",
      buttons: [
        { text: "Confirm My Order (COD)", highlight: true },
        { text: "Cancel Order" },
      ],
    },
  },
  {
    id: "fulfillment",
    name: "Order Fulfillment",
    tag: "LIVE TRACKING",
    badgeColor: "bg-[#2563EB] text-white",
    trigger: "Fulfillment Created",
    description:
      "The instant a tracking number is added in Shopify, WhatFlow sends the customer an alert with the carrier name, real-time tracking link, and expected delivery date.",
    features: [
      "Dynamic tracking URLs that open the carrier page in 1 click",
      "Carrier auto-detection (FedEx, DHL, USPS, BlueDart, Delhivery, etc.)",
      "Itemized list of fulfilled items in split-shipment orders",
      "Reduces 'Where is my order?' (WISMO) support queries by 70%",
    ],
    templatePreview: {
      header: "YOUR ORDER HAS SHIPPED! 🚀",
      body: "Exciting news Alex! Your order #1042 is on its way via FedEx Express.\n\nTracking Number: FX-992014881\nEstimated Delivery: Thursday, Oct 12\n\nTap below to track your delivery status in real-time.",
      media: {
        type: "image",
        title: "FedEx Express Dispatch",
        subtitle: "Package en route to sorting hub",
      },
      buttons: [
        { text: "Track Package 📍", highlight: true },
        { text: "Contact Support" },
      ],
    },
  },
  {
    id: "notification",
    name: "Order Notification",
    tag: "STATUS UPDATES",
    badgeColor: "bg-[#FFC107] text-black",
    trigger: "Order / Address Updated",
    description:
      "Keep buyers informed when order details change — such as shipping address updates, item substitutions, or partial shipments.",
    features: [
      "Real-time event synchronization the moment order details change",
      "Detailed changelog sent cleanly into the existing WhatsApp thread",
      "Builds trust and eliminates customer anxiety post-purchase",
      "Includes customer service contact button for questions",
    ],
    templatePreview: {
      header: "ORDER UPDATE: #1042",
      body: "Hello Alex! Your order details have been updated:\n\n• Delivery Address: 742 Evergreen Terrace, Apt 4B\n• Special Notes: Leave with doorman\n\nIf you did not request this update, please let us know immediately.",
      buttons: [{ text: "Chat with an Agent 💬" }],
    },
  },
  {
    id: "cancellation",
    name: "Order Cancellation",
    tag: "RETENTION & REFUND",
    badgeColor: "bg-[#FF4B4B] text-white",
    trigger: "Order Cancelled",
    description:
      "Turn a cancelled order into a retention opportunity. Send transparent refund timelines, restock notifications, and an optional recovery discount code.",
    features: [
      "Clear explanation of refund processing timelines (3-5 business days)",
      "Instant inventory restock in Shopify admin",
      "Automated feedback collection survey",
      "Optional win-back discount code to recover the customer",
    ],
    templatePreview: {
      header: "ORDER #1042 CANCELLED",
      body: "Hi Alex, your order #1042 has been cancelled as requested. If payment was made, your refund of $65.00 will appear in your bank account within 3-5 business days.\n\nWe would love to know why you cancelled so we can improve.",
      buttons: [
        { text: "Give Quick Feedback" },
        { text: "Browse Alternative Items" },
      ],
    },
  },
  {
    id: "paid",
    name: "Order Paid",
    tag: "PAID-ONLY GATE",
    badgeColor: "bg-[#0A6B56] text-white",
    trigger: "Payment Captured",
    description:
      "A dedicated automation that specifically waits until an order has been marked as fully paid in Shopify — preventing messages from firing on pending or draft checkouts.",
    features: [
      "Filters out pending or unpaid orders automatically",
      "Attaches official digital PDF receipt / VAT invoice",
      "Triggers VIP welcome workflows for high-value purchases",
      "Ideal for pre-paid discounts and digital product delivery",
    ],
    templatePreview: {
      header: "PAYMENT RECEIVED • $65.00",
      body: "Thank you Alex! We have received your payment for order #1042. Your official digital receipt is attached below.",
      media: {
        type: "document",
        title: "Lumiere-Invoice-1042.pdf",
        subtitle: "Tax Invoice • 182 KB",
      },
      buttons: [{ text: "Download PDF" }, { text: "View Order in Account" }],
    },
  },
  {
    id: "admin",
    name: "Admin Notification",
    tag: "INTERNAL ALERTS",
    badgeColor: "bg-[#091E17] text-[#00D261]",
    trigger: "High-Value Order Alert",
    description:
      "Alert your warehouse team, store manager, or fraud analyst directly on WhatsApp the moment a high-value or high-risk order is detected in Shopify.",
    features: [
      "Configurable thresholds: orders > $500, bulk quantities, fraud risk",
      "Direct link to the order in the Shopify Admin mobile app",
      "Support for multiple staff WhatsApp phone numbers",
      "Instant reaction to urgent order issues before dispatch",
    ],
    templatePreview: {
      header: "⚠️ ADMIN ALERT: HIGH VALUE ORDER",
      body: "Store Manager Alert! 🚨\n\nNew Order #1043\nCustomer: Michael S.\nAmount: $1,420.00 (5 items)\nRisk Level: Low\nShipping: Expedited Overnight\n\nPlease prioritize packing for morning courier pickup.",
      buttons: [
        { text: "Open in Shopify Admin", highlight: true },
        { text: "Message Customer" },
      ],
    },
  },
];

export function AutomationsTabs() {
  const [activeTab, setActiveTab] = useState<string>(AUTOMATIONS[0].id);
  const current = AUTOMATIONS.find((a) => a.id === activeTab) || AUTOMATIONS[0];

  return (
    <section id="automations" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            FULL-LIFECYCLE TRIGGERS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            6 CORE ORDER AUTOMATIONS, <span className="text-stroke-green">ZERO MANUAL WORK.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Every step from order placement to fulfillment, status updates, and staff alerts is handled automatically
            with official Meta pre-approved WhatsApp templates.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {AUTOMATIONS.map((a) => {
            const isActive = a.id === activeTab;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setActiveTab(a.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#091E17] text-[#00D261] border-2 border-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-gray-800 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-gray-100"
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <div className="neo-box bg-white p-6 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`neo-pill px-3 py-1 text-xs font-black uppercase tracking-wider border border-black ${current.badgeColor}`}>
                {current.tag}
              </span>
              <span className="text-xs font-mono bg-gray-100 text-gray-700 px-3 py-1 rounded-md border border-gray-300">
                Shopify Event: {current.trigger}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-black">
              {current.name}
            </h3>

            <p className="text-base text-gray-700 font-medium leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-black uppercase tracking-wider text-[#0A6B56]">
                Key Automation Capabilities:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-bold text-black">
                    <span className="w-5 h-5 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs font-black">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <a
                href={getShopifyAppUrl(`automation_${current.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
              >
                <span>SETUP THIS AUTOMATION</span>
                <span>➔</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Mockup Bubble */}
          <div className="lg:col-span-5 bg-[#ECE5DD] p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00A884] flex items-center justify-center text-white text-[10px] font-black">
                  WA
                </div>
                <span className="text-xs font-bold text-gray-800">WhatFlow Live Preview</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Meta Approved
              </span>
            </div>

            <WhatsAppBubble
              sender="bot"
              time="Just now"
              headerBadge={current.templatePreview.header}
              footerText={current.templatePreview.footer}
              buttons={current.templatePreview.buttons}
              media={current.templatePreview.media}
            >
              <div className="whitespace-pre-line">
                {current.templatePreview.body}
              </div>
            </WhatsAppBubble>
          </div>
        </div>
      </div>
    </section>
  );
}
