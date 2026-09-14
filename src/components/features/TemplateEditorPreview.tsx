"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function TemplateEditorPreview() {
  const [headerType, setHeaderType] = useState<"text" | "image" | "document">("image");
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [customerName, setCustomerName] = useState<string>("Alex");

  return (
    <section id="message-editor" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            NO-CODE TEMPLATE BUILDER
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            WYSIWYG TEMPLATE BUILDER &amp; <span className="text-[#00D261]">30+ VARIABLES.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            Design compliant WhatsApp templates with dynamic Shopify data chips, rich media headers,
            and interactive action buttons. See changes update in real time.
          </p>
        </div>

        <div className="bg-white text-black p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Editor Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <h3 className="text-xl font-display font-black uppercase text-black">
                  Interactive Template Configurator
                </h3>
                <p className="text-xs text-gray-500">Live preview matches Meta Cloud API output</p>
              </div>
              <span className="neo-pill bg-[#FAF7F0] text-black border border-black px-3 py-1 text-xs font-black">
                WYSIWYG 2.0
              </span>
            </div>

            {/* Header Type */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-700">1. Select Header Format</label>
              <div className="flex gap-2">
                {[
                  { id: "text", label: "Text Header" },
                  { id: "image", label: "Product Image" },
                  { id: "document", label: "PDF Invoice" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHeaderType(item.id as "text" | "image" | "document")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      headerType === item.id
                        ? "bg-[#00D261] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variables Chips */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-700">
                2. Available Dynamic Shopify Variables (30+)
              </label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  "{{customer.first_name}}",
                  "{{order.name}}",
                  "{{order.total}}",
                  "{{tracking_url}}",
                  "{{discount_code}}",
                  "{{carrier_name}}",
                  "{{shipping_address.city}}",
                ].map((variable) => (
                  <span
                    key={variable}
                    className="px-2.5 py-1 rounded-md bg-[#FAF7F0] border border-black/20 font-mono text-[11px] text-[#0A6B56] font-bold"
                  >
                    {variable}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF7F0] rounded-2xl border border-black/10">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Customer Name Variable:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-black/30 text-xs font-bold bg-white"
                  placeholder="e.g. Alex"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  Dynamic Discount: {discountPercent}% OFF
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={5}
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full accent-[#00D261]"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getShopifyAppUrl("template_editor_cta")}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
              >
                <span>OPEN VISUAL TEMPLATE BUILDER</span>
                <span>➔</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real-Time Phone Preview */}
          <div className="lg:col-span-5 bg-[#ECE5DD] p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="text-xs font-bold text-gray-600 mb-3 flex items-center justify-between">
              <span>Live Phone Simulation</span>
              <span className="text-[10px] font-mono text-green-700 bg-green-100 px-2 py-0.5 rounded">
                Meta Cloud API Ready
              </span>
            </div>

            <WhatsAppBubble
              sender="bot"
              time="11:42 AM"
              headerBadge={headerType === "text" ? "SPECIAL OFFER FOR YOU" : undefined}
              media={
                headerType === "image"
                  ? {
                      type: "image",
                      title: "Lumiere Handcrafted Watch",
                      subtitle: "Limited Edition • Reserved for 24 hours",
                    }
                  : headerType === "document"
                  ? {
                      type: "document",
                      title: "Official-Tax-Invoice-1042.pdf",
                      subtitle: "182 KB • Verified Shopify Order",
                    }
                  : undefined
              }
              buttons={[
                { text: `Claim ${discountPercent}% Discount 🏷️`, highlight: true },
                { text: "View Order Details" },
              ]}
              footerText="Lumiere Official • Reply STOP to unsubscribe"
            >
              Hi {customerName || "there"}! We noticed you left order <strong>#1042</strong> in your cart.
              <br /><br />
              Use your personalized voucher code <strong>SAVE{discountPercent}</strong> at checkout to claim {discountPercent}% off your total.
            </WhatsAppBubble>
          </div>
        </div>
      </div>
    </section>
  );
}
