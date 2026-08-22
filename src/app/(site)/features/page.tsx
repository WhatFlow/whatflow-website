import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export const metadata: Metadata = {
  title: "Features — WhatsApp Marketing & Order Automations | WhatFlow",
  description:
    "Explore WhatFlow features for Shopify: Abandoned cart recovery, automated COD verification, order tracking, 2-way live chat, 24/7 AI auto-replier, and native Shopify Flow triggers.",
  keywords: [
    "WhatsApp Shopify features",
    "abandoned cart WhatsApp",
    "Shopify COD verification WhatsApp",
    "WhatsApp order confirmation",
    "Shopify Flow WhatsApp integration",
    "WhatsApp live chat Shopify",
    "WhatFlow features",
  ],
};

const FEATURES_LIST = [
  {
    id: "abandoned-carts",
    tag: "CART RECOVERY",
    tagColor: "bg-[#FFC107] text-black",
    title: "ABANDONED CART RECOVERY THAT ACTUALLY CONVERTS",
    subtitle: "Recover up to 25% of lost checkouts with 98% open-rate WhatsApp messages.",
    description:
      "When shoppers leave items in their cart, WhatFlow automatically triggers a personalized WhatsApp message with their exact cart items, a 1-click checkout recovery link, and optional dynamic discounts. Send sequenced follow-ups at timed intervals for maximum conversion.",
    bullets: [
      "1-click pre-filled checkout link directly to Shopify checkout",
      "Dynamic discount codes tailored to cart value",
      "Multi-message sequence (e.g., 30 mins, 6 hours, 24 hours)",
      "Automatic opt-out and quiet-hours compliance",
    ],
    stats: { value: "25%", label: "Average Cart Recovery Rate" },
    iconColor: "bg-[#FFC107]",
  },
  {
    id: "order-confirmations",
    tag: "ORDER VERIFICATION",
    tagColor: "bg-[#00D261] text-black",
    title: "AUTOMATED ORDER CONFIRMATION & COD VERIFICATION",
    subtitle: "Cut return-to-origin (RTO) and fake orders by over 35% with interactive buttons.",
    description:
      "Send immediate WhatsApp confirmation messages whenever a customer places an order. For Cash on Delivery (COD) stores, include 1-click interactive 'Confirm Order' and 'Cancel Order' buttons that automatically tag and update the order in Shopify.",
    bullets: [
      "Interactive WhatsApp buttons for instant 1-tap customer confirmation",
      "Automatic Shopify order tagging ('COD-Confirmed', 'COD-Cancelled')",
      "Customizable order summary with item images, address, and totals",
      "Eliminates hours of manual phone call verification",
    ],
    stats: { value: "35%+", label: "RTO Reduction for COD Stores" },
    iconColor: "bg-[#00D261]",
  },
  {
    id: "shipping-updates",
    tag: "ORDER TRACKING",
    tagColor: "bg-[#2563EB] text-white",
    title: "REAL-TIME FULFILLMENT & SHIPPING ALERTS",
    subtitle: "Turn WISMO ('Where Is My Order?') inquiries into delighted, repeat customers.",
    description:
      "Keep customers in the loop at every milestone from warehouse packing to out-for-delivery and final drop-off. Automatically trigger live tracking links and carrier updates directly inside their active WhatsApp conversation.",
    bullets: [
      "Real-time triggers on fulfillment create, update, and delivery",
      "Carrier tracking links embedded directly in message",
      "Post-purchase upsell offers and re-order recommendations",
      "Builds unmatched trust and lowers customer support ticket volume",
    ],
    stats: { value: "70%", label: "Fewer 'Where is my order?' Tickets" },
    iconColor: "bg-[#2563EB]",
  },
  {
    id: "chat-support",
    tag: "LIVE INBOX",
    tagColor: "bg-[#FAF7F0] text-black",
    title: "2-WAY CUSTOMER SUPPORT INBOX WITH SHOPIFY CONTEXT",
    subtitle: "Chat with customers in real-time with their full order history at your fingertips.",
    description:
      "A dedicated, team-ready WhatsApp customer inbox built directly for eCommerce. When a customer replies, agents see their Shopify customer profile, recent order history, tracking status, and lifetime value without switching tabs.",
    bullets: [
      "Multi-agent team assignment and shared inbox",
      "Embedded Shopify customer sidebar with order history & LTV",
      "Canned quick-replies for instant resolution of common questions",
      "Send custom discount codes or checkout links directly in chat",
    ],
    stats: { value: "98%", label: "WhatsApp Message Open Rate" },
    iconColor: "bg-[#D5F5E3]",
  },
  {
    id: "ai-bot",
    tag: "AI AUTOMATION",
    tagColor: "bg-[#0A6B56] text-white",
    title: "24/7 AI SMART BOT & INSTANT AUTO-REPLIER",
    subtitle: "Resolve 60%+ of customer inquiries automatically, day or night.",
    description:
      "Train WhatFlow's smart AI on your Shopify product catalog, shipping policies, and store FAQs. The AI bot answers customer questions accurately in seconds, recommends matching products, and routes complex inquiries to your human agents.",
    bullets: [
      "Trained on your store policies, FAQ pages, and product catalog",
      "Instant product recommendations with direct checkout links",
      "Seamless escalation to human agents when needed",
      "24/7 coverage across all international timezones",
    ],
    stats: { value: "60%+", label: "Inquiries Resolved Autonomously" },
    iconColor: "bg-[#0A6B56]",
  },
  {
    id: "shopify-flow",
    tag: "ECOSYSTEM INTEGRATION",
    tagColor: "bg-[#00D261] text-black",
    title: "NATIVE SHOPIFY FLOW TRIGGERS & 1-CLICK INTEGRATIONS",
    subtitle: "Trigger custom WhatsApp workflows from any app in the Shopify ecosystem.",
    description:
      "WhatFlow connects natively with Shopify Flow and leading eCommerce apps including Judge.me, Loox, Klaviyo, Gorgias, Recharge, and ShipStation. Trigger tailored WhatsApp messages whenever an event fires in any of your connected tools.",
    bullets: [
      "Native Shopify Flow action blocks and custom trigger variables",
      "1-click review collection on WhatsApp via Judge.me & Loox",
      "Sync subscription reminders with Recharge & Appstle",
      "Zero complex webhook setups or custom coding required",
    ],
    stats: { value: "50+", label: "Supported App Integrations" },
    iconColor: "bg-[#00D261]",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero Section ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="neo-pill bg-[#00D261] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black">
              WHATFLOW FEATURE SUITE
            </div>
            <div className="neo-pill bg-[#F0F4FF] px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1877F2]">
              <Image src="/meta-brand-assets/1 Positive Primary/RGB/Meta_lockup_positive primary_RGB.svg" width={44} height={14} alt="Meta" className="h-3 w-auto" />
              <span>OFFICIAL META TECH PARTNER</span>
            </div>
          </div>

          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-[1.02] max-w-5xl mx-auto">
            EVERYTHING YOU NEED TO{" "}
            <span className="text-stroke-green">SCALE REVENUE</span> ON WHATSAPP.
          </h1>

          <p className="text-base sm:text-xl text-[#222222] font-medium max-w-2xl mx-auto leading-relaxed">
            Automate checkout recovery, verify orders, provide 24/7 AI chat support, and connect your entire Shopify ecosystem with zero code.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={getShopifyAppUrl("features_hero_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              START 14-DAY FREE TRIAL ➔
            </a>
            <Link
              href="/pricing"
              className="neo-btn bg-white text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-[4px_4px_0px_#000] hover:bg-gray-50"
            >
              VIEW PRICING &amp; RATES
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Highlights Stats Strip ─── */}
      <section className="bg-[#091E17] text-white py-10 px-4 sm:px-6 border-b-[2.5px] border-black">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#00D261]">98%</div>
            <div className="text-xs uppercase font-extrabold text-gray-300 tracking-wider">Average Open Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#FFC107]">25%</div>
            <div className="text-xs uppercase font-extrabold text-gray-300 tracking-wider">Cart Recovery Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-[#00D261]">10,000+</div>
            <div className="text-xs uppercase font-extrabold text-gray-300 tracking-wider">Merchants Worldwide</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-display font-black text-white">$0</div>
            <div className="text-xs uppercase font-extrabold text-gray-300 tracking-wider">Meta Rate Markup</div>
          </div>
        </div>
      </section>

      {/* ─── Detailed Features Grid ─── */}
      <section className="py-20 px-4 sm:px-6 max-w-[1280px] mx-auto space-y-16">
        {FEATURES_LIST.map((feature, idx) => {
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={feature.id}
              id={feature.id}
              className={`neo-box bg-white p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-[6px_6px_0px_0px_#000000]`}
            >
              {/* Text Side */}
              <div className={`lg:col-span-7 space-y-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex items-center gap-3">
                  <span className={`neo-pill px-3 py-1 text-xs font-black uppercase tracking-wider border border-black ${feature.tagColor}`}>
                    {feature.tag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black uppercase text-black tracking-tight leading-tight">
                  {feature.title}
                </h2>

                <p className="text-base sm:text-lg font-bold text-[#0A6B56] leading-snug">
                  {feature.subtitle}
                </p>

                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                  {feature.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 pt-2">
                  {feature.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                      <span className="w-5 h-5 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-black flex-shrink-0 text-xs font-black">
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Card / Stat Box */}
              <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                <div className="neo-box bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl border-2 border-black space-y-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
                    <Image
                      src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg"
                      width={36}
                      height={36}
                      alt="WhatsApp"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl sm:text-5xl font-display font-black text-black">
                      {feature.stats.value}
                    </div>
                    <div className="text-xs uppercase font-extrabold text-gray-600 tracking-wider">
                      {feature.stats.label}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10">
                    <a
                      href={getShopifyAppUrl(`feature_card_${feature.id}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn w-full bg-[#00D261] text-black font-black text-xs uppercase tracking-wider py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#00be57]"
                    >
                      TRY THIS FEATURE FREE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── Zero Markup Guarantee Banner ─── */}
      <section className="bg-[#0A6B56] text-white py-16 px-4 sm:px-6 border-y-[2.5px] border-black">
        <div className="max-w-[1000px] mx-auto text-center space-y-6">
          <div className="neo-pill bg-[#FFC107] text-black px-4 py-1.5 text-xs font-black uppercase tracking-wider inline-block">
            DIRECT META CLOUD API
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
            ZERO MARKUP ON META RATES. FOREVER.
          </h2>
          <p className="text-base sm:text-lg text-[#D5F5E3] font-medium leading-relaxed max-w-2xl mx-auto">
            Unlike legacy WhatsApp platforms that charge 20% to 100% markup on top of conversation rates, WhatFlow connects directly to your Meta WABA with $0 per-message hidden markup.
          </p>
          <div className="pt-2">
            <Link
              href="/pricing"
              className="neo-btn inline-block bg-white text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg shadow-[4px_4px_0px_#000] hover:bg-gray-100"
            >
              VIEW LIVE COUNTRY RATES ➔
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section className="bg-[#091E17] py-20 px-4 sm:px-6 text-center text-white border-b-[2.5px] border-black">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Image
              src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg"
              width={48}
              height={48}
              alt="WhatsApp"
            />
          </div>
          <h2 className="text-[34px] sm:text-[48px] font-display font-black uppercase tracking-tight">
            READY TO JOIN 10,000+ MERCHANTS GROWING ON <span className="text-stroke-green">WHATSAPP?</span>
          </h2>
          <p className="text-gray-300 font-medium text-base">
            Install WhatFlow on your Shopify store in 3 minutes. 14-day free trial, no credit card required.
          </p>
          <div>
            <a
              href={getShopifyAppUrl("features_bottom_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-lg inline-block shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              INSTALL ON SHOPIFY ➔
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
