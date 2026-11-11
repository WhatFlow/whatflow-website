import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "WhatFlow",
    headline: "WhatsApp Marketing & Automation Suite for Shopify Stores",
    description:
      "WhatFlow Business API connects Shopify stores to the official Meta WhatsApp Cloud API for messaging, Shopify Flow workflows, catalog sharing and a team inbox without seat fees.",
    url: "https://whatflow.io",
    category: "eCommerce Software / Shopify App",
    platform: "Shopify",
    pricing: {
      free_tier: true,
      starting_price: "$0",
      current_terms_url: "https://whatflow.io/pricing",
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
      "Enterprise-ready WhatsApp team inbox; no seat fees",
      "No built-in AI bot; connects to Shopify Sidekick and to Claude, ChatGPT or Cursor through the WhatFlow MCP connector (https://whatflow.io/docs/mcp)",
    ],
    shopify_app_store_ratings: {
      checked_at: "2026-11-11",
      note: "Each rating belongs to its own Shopify App Store listing; they are not combined.",
      apps: [
        { name: "WhatFlow WhatsApp Business API", url: "https://apps.shopify.com/whatflow-official-api", rating: 4.9, scale: 5, rating_count: 59, connection: "Official Meta WhatsApp Cloud API" },
        { name: "WhatFlow Chat Automation", url: "https://apps.shopify.com/whatflow", rating: 4.0, scale: 5, rating_count: 329, connection: "Linked device" },
      ],
    },
    shopify_app_url: "https://apps.shopify.com/whatflow-official-api",
  };

  return NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
