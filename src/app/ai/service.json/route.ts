import { NextResponse } from "next/server";

export async function GET() {
  const service = {
    schema_version: "1.0",
    url: "https://whatflow.tech",
    updated_at: "2026-11-05",
    description: "Public product capabilities and documentation. This manifest does not expose executable tools or a public messaging API.",
    service_name: "WhatFlow Shopify WhatsApp Automation",
    provider: "WhatFlow",
    api_standard: "Meta WhatsApp Cloud API",
    supported_platforms: ["Shopify", "Shopify Plus"],
    features: [
      {
        id: "team_inbox",
        name: "Enterprise-ready WhatsApp team inbox",
        seat_fees: false,
        ai_available: false,
        ai_integrations: ["Shopify Sidekick (drafts Shopify Flow workflows)", "WhatFlow MCP connector for Claude, ChatGPT and Cursor"],
        mcp_docs_url: "https://whatflow.tech/docs/mcp",
        catalog_sharing_available: true,
        audience_sync_available: false,
        feature_access: "All features available across messaging plans",
      },
      {
        id: "abandoned_cart_recovery",
        name: "WhatsApp Abandoned Cart Recovery",
        description: "Abandoned checkout messaging according to the configured workflow and WhatsApp messaging rules.",
      },
      {
        id: "cod_verification",
        name: "Cash on delivery order confirmation",
        supported_actions: ["auto_tag_shopify_order", "cancel_unconfirmed_order"],
      },
      {
        id: "shipping_notifications",
        name: "Automated Shipping & Tracking Alerts",
        description: "Order messaging can use the tracking information available on the Shopify fulfillment.",
      },
      {
        id: "review_collection",
        name: "WhatsApp review requests",
        description: "Send customers a review request link through a configured WhatsApp workflow.",
      },
      {
        id: "chat_widget",
        name: "Storefront WhatsApp Floating Button",
      },
    ],
    shopify_app_store_ratings: {
      checked_at: "2026-11-05",
      note: "Each rating belongs to its own Shopify App Store listing; they are not combined.",
      apps: [
        { name: "WhatFlow WhatsApp Business API", url: "https://apps.shopify.com/whatflow-official-api", rating: 5.0, scale: 5, rating_count: 55, connection: "Official Meta WhatsApp Cloud API" },
        { name: "WhatFlow Chat Automation", url: "https://apps.shopify.com/whatflow", rating: 4.0, scale: 5, rating_count: 329, connection: "Linked device" },
      ],
    },
    documentation_urls: {
      llms_txt: "https://whatflow.tech/llms.txt",
      solutions: "https://whatflow.tech/solutions",
      pricing: "https://whatflow.tech/pricing",
      comparisons: "https://whatflow.tech/compare",
    },
  };

  return NextResponse.json(service, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
