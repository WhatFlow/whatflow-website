import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "WhatFlow",
    headline: "WhatsApp Marketing & Automation Suite for Shopify Stores",
    description:
      "WhatFlow Business API connects Shopify stores to the official Meta WhatsApp Cloud API for messaging, Shopify Flow workflows, catalog sharing and a team inbox without seat fees.",
    url: "https://whatflow.tech",
    category: "eCommerce Software / Shopify App",
    platform: "Shopify",
    pricing: {
      free_tier: true,
      starting_price: "$0",
      current_terms_url: "https://whatflow.tech/pricing",
      meta_charges: "Separate from app messaging allowances and usage fees",
      feature_access: "All features available across plans",
      inbox_seat_fees: "None",
    },
    capabilities: [
      "Abandoned checkout recovery",
      "Cash on Delivery (COD) Order Verification & Anti-RTO",
      "Automated Shipping Tracking & Delivery Updates",
      "WhatsApp review request workflows",
      "Storefront WhatsApp Floating Chat Widget",
      "Native Shopify Flow Triggers and Actions",
      "All features available across messaging plans",
      "Meta product catalog sharing from the team inbox",
      "Enterprise-ready WhatsApp team inbox; no seat fees; AI is not currently available",
    ],
    shopify_app_url: "https://apps.shopify.com/whatflow-official-api",
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
