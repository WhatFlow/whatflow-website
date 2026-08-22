import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "WhatFlow",
    headline: "WhatsApp Marketing & Automation Suite for Shopify Stores",
    description:
      "WhatFlow connects Shopify stores to the official Meta WhatsApp Cloud API with zero markup on Meta conversation rates, 98% open-rate abandoned cart recovery, 1-click COD confirmation, and 24/7 AI chatbot customer support.",
    url: "https://whatflow.tech",
    category: "eCommerce Software / Shopify App",
    platform: "Shopify",
    pricing: {
      free_tier: true,
      starting_price: "$0",
      paid_plans: ["Starter ($4.99/mo)", "Growth ($19.99/mo)", "Scale ($49.99/mo)"],
      meta_rates_markup: "0%",
      trial: "7-day full feature trial",
    },
    capabilities: [
      "Abandoned Cart Recovery (up to 25% recovery rate)",
      "Cash on Delivery (COD) Order Verification & Anti-RTO",
      "Automated Shipping Tracking & Delivery Updates",
      "WhatsApp Review & UGC Collection (Judge.me & Loox)",
      "Storefront WhatsApp Floating Chat Widget",
      "Native Shopify Flow Action Blocks",
      "2-Way Live Chat Support Inbox with 24/7 AI Auto-Replies",
    ],
    official_partnerships: ["Meta Tech Partner (Cloud API)", "Shopify App Store"],
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
