"use client";

import { useState } from "react";

type Scenario = "abandoned_checkout" | "order_confirmation" | "order_fulfilled" | "review_request";

export function WhatsAppSimulator() {
  const [scenario, setScenario] = useState<Scenario>("abandoned_checkout");
  const [customerName, setCustomerName] = useState("Sarah");
  const [storeName, setStoreName] = useState("Velvet & Oak");
  const [productName, setProductName] = useState("Linen Summer Dress");
  const [discountCode, setDiscountCode] = useState("SAVE10");

  const scenarios: Record<
    Scenario,
    {
      label: string;
      category: string;
      header: string;
      body: string;
      ctaText: string;
      interactiveType: "buttons" | "quick_reply" | "link";
      secondaryCta?: string;
    }
  > = {
    abandoned_checkout: {
      label: "Abandoned Cart",
      category: "Marketing",
      header: "You left something behind!",
      body: `Hey ${customerName}! We noticed you left the *${productName}* in your cart at *${storeName}*.\n\nItems are selling fast! Complete your purchase now and use code *${discountCode}* for 10% off today:`,
      ctaText: "Complete Checkout ➔",
      interactiveType: "link",
    },
    order_confirmation: {
      label: "COD / Order Confirmation",
      category: "Utility",
      header: "Confirm Your Order #4892",
      body: `Hi ${customerName}, thank you for ordering with *${storeName}*! Please confirm your Cash on Delivery order to expedite shipping:\n\n*Item:* ${productName}\n*Total:* $68.00\n*Address:* 42 Maple Ave, Brooklyn NY`,
      ctaText: "✓ Confirm Order",
      secondaryCta: "✕ Cancel Order",
      interactiveType: "quick_reply",
    },
    order_fulfilled: {
      label: "Tracking & Delivery",
      category: "Utility",
      header: "Your Order Has Shipped!",
      body: `Great news, ${customerName}! Your order from *${storeName}* is on its way with DHL Express.\n\n*Tracking Number:* 9400111899562810\n*Estimated Delivery:* Thursday, 3 PM`,
      ctaText: "Track Package ➔",
      interactiveType: "link",
    },
    review_request: {
      label: "Review Request",
      category: "Marketing",
      header: "How was your order?",
      body: `Hey ${customerName}, how are you enjoying your new *${productName}* from *${storeName}*?\n\nLeave a quick review and photo to get $10 off your next order:`,
      ctaText: "Leave a Review ➔",
      interactiveType: "link",
    },
  };

  const current = scenarios[scenario];

  return (
    <div className="neo-box bg-[#FAF7F0] p-6 sm:p-10 rounded-2xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-3">
          INTERACTIVE SIMULATOR
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-black tracking-tight leading-tight">
          PREVIEW WHATSAPP AUTOMATIONS LIVE
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-2">
          Select an automation trigger and customize variables to see how your customers experience WhatFlow on their phones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Scenario Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-black block">
              Choose Automation Event
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(scenarios) as Scenario[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenario(key)}
                  className={`neo-btn text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider border-2 border-black transition-all ${
                    scenario === key
                      ? "bg-[#00D261] text-black shadow-[2px_2px_0px_#000]"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  {scenarios[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Variable Inputs */}
          <div className="neo-box bg-white p-5 rounded-xl space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-wider text-black border-b border-gray-100 pb-2">
              Template Variables
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="sim-customer-name" className="text-[10px] font-extrabold uppercase text-gray-600 block mb-1">
                  Customer Name
                </label>
                <input
                  id="sim-customer-name"
                  name="customerName"
                  aria-label="Sample Customer Name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs font-bold p-2 border border-black rounded bg-[#FAF7F0] focus:bg-white outline-none"
                />
              </div>
              <div>
                <label htmlFor="sim-store-name" className="text-[10px] font-extrabold uppercase text-gray-600 block mb-1">
                  Store Name
                </label>
                <input
                  id="sim-store-name"
                  name="storeName"
                  aria-label="Sample Store Name"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full text-xs font-bold p-2 border border-black rounded bg-[#FAF7F0] focus:bg-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="sim-product-name" className="text-[10px] font-extrabold uppercase text-gray-600 block mb-1">
                  Product Name
                </label>
                <input
                  id="sim-product-name"
                  name="productName"
                  aria-label="Sample Product Name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs font-bold p-2 border border-black rounded bg-[#FAF7F0] focus:bg-white outline-none"
                />
              </div>
              <div>
                <label htmlFor="sim-discount-code" className="text-[10px] font-extrabold uppercase text-gray-600 block mb-1">
                  Discount Code
                </label>
                <input
                  id="sim-discount-code"
                  name="discountCode"
                  aria-label="Sample Discount Code"
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="w-full text-xs font-bold p-2 border border-black rounded bg-[#FAF7F0] focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Column */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[340px] bg-[#1F2C34] rounded-[36px] border-[4px] border-black p-3 shadow-[8px_8px_0px_#000]">
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-black rounded-full mx-auto mb-2" />

            {/* WhatsApp App Header */}
            <div className="bg-[#0B141A] text-white px-3 py-2 rounded-t-2xl flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00D261] border border-black flex items-center justify-center font-black text-[10px] text-black">
                  {storeName.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-white leading-tight flex items-center gap-1">
                    <span>{storeName}</span>
                    <span className="text-[#00D261] text-[10px]">✓</span>
                  </div>
                  <div className="text-[9px] text-gray-400">Official Business Account</div>
                </div>
              </div>
              <span className="neo-pill bg-[#00D261]/20 text-[#00D261] text-[8px] font-black uppercase px-2 py-0.5 border border-[#00D261]/40">
                {current.category}
              </span>
            </div>

            {/* Chat Body */}
            <div className="bg-[#0B141A]/90 p-3 min-h-[300px] flex flex-col justify-end space-y-2 rounded-b-2xl">
              {/* Message Bubble */}
              <div className="bg-[#005C4B] text-white rounded-2xl rounded-tl-sm p-3.5 space-y-2.5 shadow-md border border-[#008069]/40">
                <div className="whitespace-pre-line text-xs font-medium leading-relaxed text-[#E9EDEF]">
                  {current.body}
                </div>

                {/* Buttons Inside Bubble */}
                <div className="pt-2 space-y-1.5 border-t border-[#008069]/60">
                  <button
                    type="button"
                    className="w-full py-2 bg-[#00A884] hover:bg-[#008F6F] text-black font-extrabold text-xs rounded uppercase tracking-wider transition-colors shadow-sm"
                  >
                    {current.ctaText}
                  </button>
                  {current.secondaryCta && (
                    <button
                      type="button"
                      className="w-full py-1.5 bg-black/30 hover:bg-black/40 text-gray-300 font-bold text-[11px] rounded uppercase tracking-wider transition-colors"
                    >
                      {current.secondaryCta}
                    </button>
                  )}
                </div>

                <div className="text-[8px] text-right text-gray-300 font-bold flex items-center justify-end gap-1">
                  <span>10:42 AM</span>
                  <span className="text-[#53BDEB]">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
