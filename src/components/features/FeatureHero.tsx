"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { WhatsAppBubble } from "./WhatsAppBubble";

export function FeatureHero() {
  const [step, setStep] = useState(1);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#FAF7F0] border-b-[2.5px] border-black pt-12 pb-16 lg:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex flex-wrap items-center gap-3">
            <div className="neo-pill bg-[#00D261] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              COMPLETE WHATSAPP COMMERCE STACK
            </div>
            <div className="neo-pill bg-[#F0F4FF] px-3 py-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1877F2]">
              <Image
                src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg"
                width={40}
                height={12}
                alt="Meta"
                className="h-3 w-auto"
              />
              <span>OFFICIAL TECH PARTNER</span>
            </div>
          </div>

          <h1 className="text-[38px] sm:text-[54px] lg:text-[64px] font-display font-black uppercase text-black tracking-tight leading-[1.03]">
            EVERY ORDER. EVERY RECOVERY.{" "}
            <span className="text-stroke-green">AUTOMATED ON WHATSAPP.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#222222] font-medium leading-relaxed max-w-2xl">
            From 1-click COD confirmation and 11-step fulfillment tracking to AI-powered auto-replies,
            3-sequence cart recovery, and Shopify Functions. Powered by Cloudflare edge workers with zero cold starts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-2xl font-black font-display text-[#0A6B56]">11+</div>
              <div className="text-[10px] font-extrabold uppercase text-gray-600">Shopify Automations</div>
            </div>
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-2xl font-black font-display text-[#00D261]">98%</div>
              <div className="text-[10px] font-extrabold uppercase text-gray-600">Avg. Open Rate</div>
            </div>
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-2xl font-black font-display text-[#2563EB]">&lt;15ms</div>
              <div className="text-[10px] font-extrabold uppercase text-gray-600">Edge Latency</div>
            </div>
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="text-2xl font-black font-display text-[#FFC107]">$0</div>
              <div className="text-[10px] font-extrabold uppercase text-gray-600">Meta Markup</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href={getShopifyAppUrl("features_hero_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-7 py-4 rounded-xl flex items-center gap-2 hover:bg-[#00be57]"
            >
              <span>INSTALL ON SHOPIFY</span>
              <span className="text-base">➔</span>
            </a>

            <Link
              href="/inbox"
              className="neo-btn bg-[#121212] text-white font-extrabold text-sm uppercase tracking-wider px-7 py-4 rounded-xl flex items-center gap-2 hover:bg-black"
            >
              <span className="w-2 h-2 rounded-full bg-[#1ed760] animate-pulse" />
              <span>EXPLORE 2-WAY INBOX</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Live Interactive Smartphone Simulator */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[360px] bg-[#0c1317] rounded-[40px] p-3 border-[3px] border-black shadow-[8px_8px_0px_#000] relative">
            {/* Phone Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20" />

            {/* Chat Screen */}
            <div className="bg-[#0b141a] rounded-[32px] overflow-hidden pt-7 pb-3 flex flex-col h-[540px] relative">
              {/* Chat Header */}
              <div className="bg-[#202c33] px-3.5 py-2.5 flex items-center justify-between border-b border-white/10 z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00A884] border border-white/20 flex items-center justify-center font-bold text-white text-xs">
                    WF
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Lumiere Store</span>
                      <span className="text-[#00D261] text-[10px]">✓</span>
                    </div>
                    <div className="text-[10px] text-[#00D261] font-semibold">Official Business Account</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-black/40 text-gray-300 px-2 py-0.5 rounded-full">
                    Step {step}/4
                  </span>
                </div>
              </div>

              {/* Chat Messages Timeline */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                <WhatsAppBubble sender="system">
                  🔒 Messages are end-to-end encrypted with Meta Cloud API.
                </WhatsAppBubble>

                {step >= 1 && (
                  <WhatsAppBubble
                    sender="bot"
                    time="10:30 AM"
                    headerBadge="ORDER CONFIRMED"
                    buttons={[
                      {
                        text: buttonClicked ? "✓ Confirmed by Customer" : "Confirm My Order (COD)",
                        highlight: !buttonClicked,
                        onClick: () => setButtonClicked(true),
                      },
                      {
                        text: "Cancel Order",
                        onClick: () => alert("Cancellation flow triggers restock!"),
                      },
                    ]}
                  >
                    Hi Sarah! 🎉 Thank you for shopping with <strong>Lumiere</strong>!
                    <br /><br />
                    Order <strong>#1042</strong> ($84.00) is confirmed. Please tap below to verify your Cash on Delivery order:
                  </WhatsAppBubble>
                )}

                {step >= 2 && (
                  <WhatsAppBubble sender="user" time="10:31 AM">
                    ✅ Confirm My Order (COD)
                  </WhatsAppBubble>
                )}

                {step >= 3 && (
                  <WhatsAppBubble
                    sender="bot"
                    time="11:15 AM"
                    headerBadge="OUT FOR DELIVERY"
                    media={{
                      type: "image",
                      title: "FedEx Express #FX-882941",
                      subtitle: "Driver assigned • Expected by 2:00 PM",
                    }}
                    buttons={[
                      {
                        text: "Live GPS Tracking 📍",
                        onClick: () => alert("Opens carrier tracking page!"),
                      },
                    ]}
                  >
                    Great news! Your package is with our courier and will arrive today.
                  </WhatsAppBubble>
                )}

                {step >= 4 && (
                  <WhatsAppBubble
                    sender="bot"
                    time="1:48 PM"
                    headerBadge="DELIVERED"
                    buttons={[
                      {
                        text: "Leave 5★ Review ⭐",
                        onClick: () => alert("Direct Judge.me/Loox review integration!"),
                      },
                    ]}
                  >
                    Package marked as <strong>Delivered</strong> at your front door! We hope you love your new items.
                  </WhatsAppBubble>
                )}
              </div>

              {/* Step Navigation Pills */}
              <div className="px-3 pt-2 flex items-center justify-between gap-1 border-t border-white/10 bg-[#202c33]/70">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStep(s);
                      if (s === 1) setButtonClicked(false);
                    }}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-colors ${
                      step === s ? "bg-[#00D261] text-black" : "bg-black/30 text-gray-400 hover:text-white"
                    }`}
                  >
                    {s === 1 ? "Confirm" : s === 2 ? "Verify" : s === 3 ? "Shipping" : "Delivered"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
