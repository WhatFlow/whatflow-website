"use client";

import React, { useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function StorefrontWidgets() {
  const [buttonPosition, setButtonPosition] = useState<"right" | "left">("right");
  const [greetingText, setGreetingText] = useState<string>("Hi! Need help picking a size?");

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            CONVERSION TOOLS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            HIGH-INTENT STOREFRONT WIDGETS: <span className="text-stroke-green">CHAT &amp; BUY.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Turn passive store visitors into active WhatsApp conversations. Native Shopify theme app embeds with zero theme code modifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Widget 1: Floating WhatsApp Button */}
          <div className="neo-box bg-white p-8 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neo-pill bg-[#00D261] text-black text-xs font-black px-3 py-1">
                  THEME APP EMBED
                </span>
                <span className="text-xs font-mono text-gray-500">Zero JS bloat (&lt;8KB)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                Floating WhatsApp Chat Button
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Connect visitors directly with your customer support team. Features customizable greetings, agent avatar, online status indicator, and pre-filled message prompts.
              </p>

              {/* Widget Config Mini Playground */}
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-black/10 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Screen Position:</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setButtonPosition("left")}
                      className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                        buttonPosition === "left" ? "bg-black text-white" : "bg-white border border-gray-300"
                      }`}
                    >
                      Bottom Left
                    </button>
                    <button
                      type="button"
                      onClick={() => setButtonPosition("right")}
                      className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                        buttonPosition === "right" ? "bg-black text-white" : "bg-white border border-gray-300"
                      }`}
                    >
                      Bottom Right
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-gray-700">Callout Bubble Greeting:</span>
                  <input
                    type="text"
                    value={greetingText}
                    onChange={(e) => setGreetingText(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-gray-300 bg-white text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Visual preview of button on a storefront corner */}
            <div className="p-6 bg-gray-100 rounded-2xl border border-black/15 relative h-40 flex items-end">
              <div
                className={`absolute bottom-4 flex items-end gap-3 transition-all ${
                  buttonPosition === "right" ? "right-4 flex-row-reverse" : "left-4 flex-row"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#00D261] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-black text-2xl relative cursor-pointer hover:scale-105 transition-transform">
                  💬
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00D261] border-2 border-white animate-ping" />
                </div>
                {greetingText && (
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-bold max-w-[200px]">
                    {greetingText}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Widget 2: Order via WhatsApp on Product Page */}
          <div className="neo-box bg-white p-8 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="neo-pill bg-[#2563EB] text-white text-xs font-black px-3 py-1">
                  DIRECT 1-CLICK CHECKOUT
                </span>
                <span className="text-xs font-mono text-gray-500">Product Page Embed</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                &quot;Order via WhatsApp&quot; Button
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Allow mobile shoppers to order immediately via WhatsApp without going through traditional cart checkout steps. Automatically passes the product title, selected variant, price, and product URL into chat.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-bold text-gray-900">
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> Captures phone numbers before payment drop-off
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> Ideal for cash-on-delivery and assisted sales
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> 40% higher conversion on mobile traffic
                </li>
              </ul>
            </div>

            {/* Product Page Button Mockup */}
            <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-black/15 space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-black/10">
                <span className="font-bold text-black">Product Page Preview</span>
                <span className="text-gray-500 font-mono">$68.00 • Size L</span>
              </div>
              <button
                type="button"
                className="w-full py-3.5 rounded-xl bg-[#00D261] text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 hover:bg-[#00be57] cursor-pointer"
              >
                <span>💬 ORDER VIA WHATSAPP (1-TAP)</span>
              </button>
              <div className="text-[10px] text-gray-500 text-center font-medium">
                Opens customer WhatsApp with pre-filled message: &quot;Hi, I want to order Linen Shirt (Size L)&quot;
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href={getShopifyAppUrl("storefront_widgets_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-[#00be57]"
          >
            <span>ACTIVATE STOREFRONT WIDGETS FREE</span>
            <span>➔</span>
          </a>
        </div>
      </div>
    </section>
  );
}
