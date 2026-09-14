"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

interface ShippingStatusItem {
  key: string;
  label: string;
  badgeColor: string;
  category: "pre_transit" | "transit" | "delivery" | "issue";
  triggerDesc: string;
  bubbleText: string;
  headerBadge: string;
  buttons?: { text: string; highlight?: boolean }[];
}

const SHIPPING_STATUSES: ShippingStatusItem[] = [
  {
    key: "LABEL_PURCHASED",
    label: "Label Purchased",
    badgeColor: "bg-blue-100 text-blue-800",
    category: "pre_transit",
    triggerDesc: "Fired when shipping label is generated in Shopify or 3PL warehouse.",
    headerBadge: "SHIPPING LABEL CREATED",
    bubbleText: "Your shipping label has been generated! Tracking Number: FX-889123. The warehouse is preparing your parcel.",
    buttons: [{ text: "View Tracking 📍" }],
  },
  {
    key: "LABEL_PRINTED",
    label: "Label Printed",
    badgeColor: "bg-indigo-100 text-indigo-800",
    category: "pre_transit",
    triggerDesc: "Packing slip and courier barcode printed on packaging.",
    headerBadge: "PACKAGE PACKED",
    bubbleText: "All items in order #1042 have been boxed and inspected. Awaiting carrier vehicle pickup.",
    buttons: [{ text: "Order Details" }],
  },
  {
    key: "READY_FOR_PICKUP",
    label: "Ready for Pickup",
    badgeColor: "bg-cyan-100 text-cyan-800",
    category: "pre_transit",
    triggerDesc: "Stored at local facility or pickup locker for courier handover.",
    headerBadge: "READY FOR PICKUP",
    bubbleText: "Your package is ready for courier collection at our fulfillment hub.",
    buttons: [{ text: "Track Status" }],
  },
  {
    key: "PICKED_UP",
    label: "Picked Up",
    badgeColor: "bg-purple-100 text-purple-800",
    category: "transit",
    triggerDesc: "Carrier courier scanned package onto outbound transport vehicle.",
    headerBadge: "PICKED UP BY CARRIER",
    bubbleText: "FedEx Express has received your parcel and it is heading to the regional sorting facility!",
    buttons: [{ text: "Live Carrier Tracking", highlight: true }],
  },
  {
    key: "IN_TRANSIT",
    label: "In Transit",
    badgeColor: "bg-amber-100 text-amber-800",
    category: "transit",
    triggerDesc: "Package moving between sorting hubs or airport terminals.",
    headerBadge: "PACKAGE IN TRANSIT",
    bubbleText: "Your parcel has arrived at the regional logistics center and is on schedule for delivery tomorrow.",
    buttons: [{ text: "Track Location 🗺️" }],
  },
  {
    key: "OUT_FOR_DELIVERY",
    label: "Out for Delivery",
    badgeColor: "bg-emerald-100 text-emerald-800",
    category: "delivery",
    triggerDesc: "Loaded onto local driver vehicle for final drop-off today.",
    headerBadge: "OUT FOR DELIVERY TODAY! 🚚",
    bubbleText: "Your order is out for delivery! Driver Michael will arrive between 1:00 PM and 4:00 PM. Please ensure someone is available at your address.",
    buttons: [
      { text: "Track Driver Location 📍", highlight: true },
      { text: "Delivery Instructions" },
    ],
  },
  {
    key: "DELIVERY_ATTEMPTED",
    label: "Attempted",
    badgeColor: "bg-orange-100 text-orange-800",
    category: "issue",
    triggerDesc: "Driver arrived but could not complete delivery (gate code/unreachable).",
    headerBadge: "DELIVERY ATTEMPTED ⚠️",
    bubbleText: "The driver tried to deliver your parcel at 2:15 PM but could not access the building. Courier will re-attempt tomorrow.",
    buttons: [
      { text: "Provide Gate Code / Note", highlight: true },
      { text: "Reschedule Delivery" },
    ],
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    badgeColor: "bg-green-100 text-green-800",
    category: "delivery",
    triggerDesc: "Final proof of delivery signed or package left in safe place.",
    headerBadge: "PACKAGE DELIVERED! 🎁",
    bubbleText: "Delivered! Your package was placed at your front door. Thank you for shopping with us — we hope you love everything!",
    buttons: [
      { text: "Rate Your Experience ⭐", highlight: true },
      { text: "Report an Issue" },
    ],
  },
  {
    key: "RETURN_TO_SENDER",
    label: "Return to Sender",
    badgeColor: "bg-rose-100 text-rose-800",
    category: "issue",
    triggerDesc: "Unclaimed or incorrect address returned to store warehouse.",
    headerBadge: "PARCEL RETURNING TO SENDER",
    bubbleText: "Notice: Package #1042 was returned due to an invalid shipping address. Our support team is here to help reship it.",
    buttons: [{ text: "Update Address with Support", highlight: true }],
  },
  {
    key: "FAILURE",
    label: "Delivery Failure",
    badgeColor: "bg-red-100 text-red-800",
    category: "issue",
    triggerDesc: "Critical shipment error or damaged package detected.",
    headerBadge: "SHIPMENT EXCEPTION",
    bubbleText: "An issue occurred during transit with your parcel. We have automatically triggered a replacement dispatch for you.",
    buttons: [{ text: "Speak to Manager" }],
  },
  {
    key: "EXCEPTION",
    label: "Carrier Exception",
    badgeColor: "bg-yellow-100 text-yellow-800",
    category: "issue",
    triggerDesc: "Weather delay, customs hold, or public holiday reschedule.",
    headerBadge: "CARRIER WEATHER DELAY ⏳",
    bubbleText: "Due to severe local weather conditions, transit has been delayed by 24 hours. Your updated ETA is Friday, Oct 13.",
    buttons: [{ text: "Check New ETA" }],
  },
];

export function ShippingJourney() {
  const [activeKey, setActiveKey] = useState<string>("OUT_FOR_DELIVERY");
  const activeStatus = SHIPPING_STATUSES.find((s) => s.key === activeKey) || SHIPPING_STATUSES[5];

  return (
    <section id="shipping" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#2563EB] text-white px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            REAL-TIME FULFILLMENT ALERTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            11-STATUS SHIPPING JOURNEY: <span className="text-stroke-green">NO MORE WISMO.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Keep customers informed from warehouse label creation all the way to final front-door delivery.
            Click any milestone below to see the automated WhatsApp message sent.
          </p>
        </div>

        {/* Status Pills Carousel / Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
          {SHIPPING_STATUSES.map((status, index) => {
            const isCurrent = status.key === activeKey;
            return (
              <button
                key={status.key}
                type="button"
                onClick={() => setActiveKey(status.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#00D261] text-black border-2 border-black shadow-[3px_3px_0px_#000] scale-105"
                    : "bg-white text-gray-700 border-2 border-black/30 hover:border-black hover:bg-gray-50"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                  {index + 1}
                </span>
                <span>{status.label}</span>
              </button>
            );
          })}
        </div>

        {/* Detail Visual Card */}
        <div className="neo-box bg-white p-6 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-[6px_6px_0px_#000]">
          {/* Left Info */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <span className={`neo-pill px-3 py-1 text-xs font-black uppercase tracking-wider ${activeStatus.badgeColor}`}>
                {activeStatus.key}
              </span>
              <span className="text-xs font-extrabold uppercase text-gray-500">
                Milestone #{SHIPPING_STATUSES.findIndex((s) => s.key === activeKey) + 1} of 11
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display font-black uppercase text-black">
              {activeStatus.label} Alert
            </h3>

            <p className="text-base text-gray-700 font-medium leading-relaxed">
              {activeStatus.triggerDesc}
            </p>

            <div className="p-4 bg-[#FAF7F0] rounded-xl border border-black/15 space-y-2">
              <div className="text-xs font-black uppercase text-[#0A6B56]">Why this matters:</div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">
                Over 70% of customer support tickets are &quot;Where is my order?&quot; questions. Proactive, branded WhatsApp notifications eliminate buyer anxiety and turn fulfillment updates into delightful customer retention moments.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={getShopifyAppUrl("shipping_journey_cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-[#2563EB] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <span>AUTOMATE SHIPPING ALERTS</span>
                <span>➔</span>
              </a>
            </div>
          </div>

          {/* Right Bubble Preview */}
          <div className="lg:col-span-6 bg-[#ECE5DD] p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="text-xs font-bold text-gray-600 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D261] animate-ping" />
                <span>Live Event: {activeStatus.key}</span>
              </div>
              <span className="text-[10px] font-mono bg-black/10 px-2 py-0.5 rounded">
                Cloudflare Worker Webhook
              </span>
            </div>

            <WhatsAppBubble
              sender="bot"
              time="Just now"
              headerBadge={activeStatus.headerBadge}
              buttons={activeStatus.buttons}
              footerText="Lumiere Tracking • Automated via WhatFlow"
            >
              <div className="text-xs sm:text-[13px] leading-relaxed">
                {activeStatus.bubbleText}
              </div>
            </WhatsAppBubble>
          </div>
        </div>
      </div>
    </section>
  );
}
