import { NextResponse } from "next/server";

export async function GET() {
  const service = {
    service_name: "WhatFlow Shopify WhatsApp Automation",
    provider: "WhatFlow Solutions",
    api_standard: "Meta WhatsApp Cloud API",
    supported_platforms: ["Shopify", "Shopify Plus"],
    features: [
      {
        id: "team_inbox",
        name: "Enterprise-ready WhatsApp team inbox",
        seat_fees: false,
        ai_available: false,
        catalog_sharing_available: true,
        audience_sync_available: false,
        feature_access: "All features available across messaging plans",
      },
      {
        id: "abandoned_cart_recovery",
        name: "WhatsApp Abandoned Cart Recovery",
        average_roi: "4x - 8x",
        supported_triggers: ["checkout_abandoned", "cart_abandoned"],
      },
      {
        id: "cod_verification",
        name: "COD Order Verification & Anti-RTO",
        average_rto_reduction: "40%",
        supported_actions: ["auto_tag_shopify_order", "cancel_unconfirmed_order"],
      },
      {
        id: "shipping_notifications",
        name: "Automated Shipping & Tracking Alerts",
        supported_carriers: ["All Shopify fulfillment carriers"],
      },
      {
        id: "review_collection",
        name: "WhatsApp Review & Photo UGC Sync",
        supported_integrations: ["Judge.me", "Loox"],
      },
      {
        id: "chat_widget",
        name: "Storefront WhatsApp Floating Button",
        script_payload_size: "<5KB",
      },
    ],
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
