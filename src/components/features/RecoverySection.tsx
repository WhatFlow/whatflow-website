"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function RecoverySection() {
  const [selectedPillar, setSelectedPillar] = useState<"checkout" | "draft" | "stock">("checkout");
  const [sequenceStep, setSequenceStep] = useState<1 | 2 | 3>(1);

  return (
    <section id="recovery" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#FFC107] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            HIGH-CONVERSION RECOVERY ENGINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            RECOVER UP TO 25% OF LOST SALES WITH{" "}
            <span className="text-[#00D261]">TIMED SEQUENCES.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            Shoppers leave carts, draft orders expire, and out-of-stock items lose demand.
            WhatFlow turns every drop-off into a high-intent conversation on WhatsApp.
          </p>
        </div>

        {/* 3 Pillars Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setSelectedPillar("checkout")}
            className={`p-6 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
              selectedPillar === "checkout"
                ? "bg-[#00D261] text-black shadow-[4px_4px_0px_#fff]"
                : "bg-[#132A22] text-white hover:bg-[#18362b]"
            }`}
          >
            <div className="text-2xl mb-2">🛒</div>
            <div className="font-display font-black text-lg uppercase">Abandoned Checkouts</div>
            <div className={`text-xs mt-1 font-medium ${selectedPillar === "checkout" ? "text-black/80" : "text-gray-300"}`}>
              3-stage sequenced recovery with dynamic coupons & 1-click cart restore.
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-wider">
              Avg. 25% Recovery Rate ➔
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPillar("draft")}
            className={`p-6 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
              selectedPillar === "draft"
                ? "bg-[#00D261] text-black shadow-[4px_4px_0px_#fff]"
                : "bg-[#132A22] text-white hover:bg-[#18362b]"
            }`}
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-display font-black text-lg uppercase">Draft Order Invoicing</div>
            <div className={`text-xs mt-1 font-medium ${selectedPillar === "draft" ? "text-black/80" : "text-gray-300"}`}>
              B2B wholesale quotes, phone orders, and custom invoices sent with payment link.
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-wider">
              3x Faster Invoice Payment ➔
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPillar("stock")}
            className={`p-6 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
              selectedPillar === "stock"
                ? "bg-[#00D261] text-black shadow-[4px_4px_0px_#fff]"
                : "bg-[#132A22] text-white hover:bg-[#18362b]"
            }`}
          >
            <div className="text-2xl mb-2">🔔</div>
            <div className="font-display font-black text-lg uppercase">Back in Stock Alerts</div>
            <div className={`text-xs mt-1 font-medium ${selectedPillar === "stock" ? "text-black/80" : "text-gray-300"}`}>
              Storefront waitlist widget that triggers an instant WhatsApp blast on restock.
            </div>
            <div className="mt-4 text-xs font-black uppercase tracking-wider">
              Zero Lost Demand ➔
            </div>
          </button>
        </div>

        {/* Detailed Showcase Box */}
        <div className="bg-white text-black p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Sequence Explainer */}
          <div className="lg:col-span-7 space-y-6">
            {selectedPillar === "checkout" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="neo-pill bg-[#FFC107] text-black text-xs font-black px-3 py-1">
                    3-STAGE SMART SEQUENCE
                  </span>
                  <span className="text-xs text-gray-500 font-bold">Auto-stops once ordered</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                  TIMED ABANDONED CHECKOUT FOLLOW-UPS
                </h3>

                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                  Unlike single emails that end up in spam, WhatFlow sends a sequenced 3-message drip
                  directly to WhatsApp. If the customer completes checkout at any step, remaining messages cancel automatically.
                </p>

                {/* Sequence Step Toggle */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSequenceStep(1)}
                    className={`flex-1 p-3 rounded-xl border-2 border-black text-center text-xs font-black transition-all ${
                      sequenceStep === 1 ? "bg-[#00D261] shadow-[2px_2px_0px_#000]" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    1. 30 Mins (Gentle Reminder)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSequenceStep(2)}
                    className={`flex-1 p-3 rounded-xl border-2 border-black text-center text-xs font-black transition-all ${
                      sequenceStep === 2 ? "bg-[#00D261] shadow-[2px_2px_0px_#000]" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    2. 6 Hours (+ 10% Discount)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSequenceStep(3)}
                    className={`flex-1 p-3 rounded-xl border-2 border-black text-center text-xs font-black transition-all ${
                      sequenceStep === 3 ? "bg-[#00D261] shadow-[2px_2px_0px_#000]" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    3. 24 Hours (Final Urgency)
                  </button>
                </div>

                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-bold text-gray-900">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Direct 1-click URL pre-populates Shopify checkout with customer items
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Quiet-hours logic stops messages from triggering late at night
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Anti-spam safeguard respects customer opt-out preferences
                  </li>
                </ul>
              </>
            )}

            {selectedPillar === "draft" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="neo-pill bg-[#2563EB] text-white text-xs font-black px-3 py-1">
                    B2B & WHOLESALE READY
                  </span>
                  <span className="text-xs text-gray-500 font-bold">1-Click Invoice Checkout</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                  AUTOMATED DRAFT ORDER RECOVERY
                </h3>

                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                  Turn phone inquiries, B2B wholesale quotes, and custom orders created in Shopify Admin
                  into instant WhatsApp checkout links. Buyers tap, review their custom items, and pay securely.
                </p>

                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-bold text-gray-900">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Automatically grabs Shopify invoice URL and item breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> 3 customizable follow-up reminders before draft expiration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Eliminates back-and-forth bank transfers and manual wire receipts
                  </li>
                </ul>
              </>
            )}

            {selectedPillar === "stock" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="neo-pill bg-[#00D261] text-black text-xs font-black px-3 py-1">
                    STOREFRONT WIDGET INCLUDED
                  </span>
                  <span className="text-xs text-gray-500 font-bold">Instant Restock Triggers</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                  BACK IN STOCK WHATSAPP WAITLIST
                </h3>

                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                  When products sell out, customers subscribe via WhatsApp with 1 tap. As soon as you
                  update stock in Shopify, WhatFlow sends targeted alerts to eager waiting buyers.
                </p>

                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-bold text-gray-900">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Native Shopify App Embed widget matches your store theme
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> First-come, first-served queue management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00D261]">✔</span> Over 65% purchase conversion rate within the first hour of restock
                  </li>
                </ul>
              </>
            )}

            <div className="pt-2">
              <a
                href={getShopifyAppUrl(`recovery_${selectedPillar}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-block bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
              >
                ENABLE RECOVERY SUITE FREE ➔
              </a>
            </div>
          </div>

          {/* Right Column: Live WhatsApp Bubble Preview */}
          <div className="lg:col-span-5 bg-[#ECE5DD] p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]">
            <div className="text-[11px] font-bold text-gray-600 mb-3 flex items-center justify-between">
              <span>Customer View</span>
              <span className="bg-[#00A884] text-white px-2 py-0.5 rounded-full text-[10px]">
                {selectedPillar === "checkout"
                  ? `Stage ${sequenceStep} of 3`
                  : selectedPillar === "draft"
                  ? "Custom Invoice"
                  : "Restock Alert"}
              </span>
            </div>

            {selectedPillar === "checkout" && sequenceStep === 1 && (
              <WhatsAppBubble
                sender="bot"
                time="10:45 AM"
                headerBadge="FORGOT SOMETHING?"
                buttons={[
                  { text: "Complete Your Purchase 🛒", highlight: true },
                  { text: "Need Help?" },
                ]}
              >
                Hi Jessica! We noticed you left the <strong>Lumiere Silk Robe</strong> in your shopping bag.
                <br /><br />
                Items reserved for a limited time. Tap below to resume your checkout with free shipping!
              </WhatsAppBubble>
            )}

            {selectedPillar === "checkout" && sequenceStep === 2 && (
              <WhatsAppBubble
                sender="bot"
                time="4:15 PM"
                headerBadge="SPECIAL OFFER: 10% OFF"
                buttons={[
                  { text: "Apply SAVE10 & Checkout 🏷️", highlight: true },
                  { text: "Unsubscribe" },
                ]}
              >
                Still thinking about it, Jessica? We unlocked a special 10% coupon code just for you: <strong>SAVE10</strong>.
                <br /><br />
                Cart total: <del>$120.00</del> <strong>$108.00</strong>
              </WhatsAppBubble>
            )}

            {selectedPillar === "checkout" && sequenceStep === 3 && (
              <WhatsAppBubble
                sender="bot"
                time="10:15 AM (Next Day)"
                headerBadge="FINAL NOTICE ⏳"
                buttons={[{ text: "Claim Cart Before Restock", highlight: true }]}
              >
                Last call, Jessica! Your reserved items in order #CART-991 will be released back into public inventory in 2 hours.
              </WhatsAppBubble>
            )}

            {selectedPillar === "draft" && (
              <WhatsAppBubble
                sender="bot"
                time="2:10 PM"
                headerBadge="CUSTOM INVOICE #D-402"
                buttons={[
                  { text: "Review & Pay Invoice 💳", highlight: true },
                  { text: "Ask Question" },
                ]}
              >
                Hi David, here is the custom quote discussed with our team for <strong>50x Custom Embroidered Hoodies</strong>.
                <br /><br />
                Subtotal: $1,250.00 (Wholesale 20% discount applied).
              </WhatsAppBubble>
            )}

            {selectedPillar === "stock" && (
              <WhatsAppBubble
                sender="bot"
                time="1:00 PM"
                headerBadge="IT'S BACK IN STOCK! 🎉"
                media={{
                  type: "image",
                  title: "Classic Leather Tote (Caramel)",
                  subtitle: "Only 12 units remaining in stock",
                }}
                buttons={[
                  { text: "Buy Now (Before It Sells Out) ⚡", highlight: true },
                ]}
              >
                Good news! The item on your wishlist is back in inventory. As a waitlist member, you get first access!
              </WhatsAppBubble>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
