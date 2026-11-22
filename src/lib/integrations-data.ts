import type { Integration } from "@/lib/payload-api";

/**
 * Integrations shown when the CMS has none. Every entry describes a connection WhatFlow actually ships
 * (see the changelog and the Business API help docs). Do not add a tool here until the connection exists.
 */
export const DEFAULT_INTEGRATIONS: Partial<Integration>[] = [
  {
    name: "Shopify Flow",
    slug: "shopify-flow",
    category: "automation",
    tagline: "WhatsApp triggers and actions inside Shopify Flow",
    description:
      "WhatFlow adds WhatsApp triggers and actions to Shopify Flow. Start a workflow when a customer messages you or replies to an order message, then send an approved template, a text, an image or a video, and tag or update the Shopify order from the reply.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Triggers for incoming WhatsApp messages and order replies" },
      { feature: "Send template, text, image and video message actions" },
      { feature: "Map Shopify order fields into template variables" },
      { feature: "Ready-made WhatFlow workflow templates in Flow" },
    ],
  },
  {
    name: "Shopify Sidekick",
    slug: "shopify-sidekick",
    category: "automation",
    tagline: "Run WhatFlow from Shopify's built-in assistant",
    description:
      "Ask Shopify Sidekick to create and edit WhatsApp templates, change WhatFlow settings, draft WhatsApp workflows in Shopify Flow and get help, without leaving Shopify admin. Sidekick suggests WhatsApp buttons and follows WhatsApp's formatting rules.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Create and edit WhatsApp templates by asking" },
      { feature: "Draft WhatFlow workflows in Shopify Flow" },
      { feature: "Change WhatFlow settings from Sidekick" },
    ],
  },
  {
    name: "Judge.me Reviews",
    slug: "judge-me",
    category: "reviews",
    tagline: "Send Judge.me review requests on WhatsApp",
    description:
      "A ready-made Shopify Flow template sends your Judge.me review request on WhatsApp after an order, so customers open the review form from a chat instead of an email. It works with your existing Judge.me setup; reviews are collected and published by Judge.me as usual.",
    featured: false,
    status: "published",
    keyFeatures: [
      { feature: "Ready-made Shopify Flow template" },
      { feature: "Works with your existing Judge.me setup" },
      { feature: "Choose when the request is sent after an order" },
    ],
  },
  {
    name: "Claude, ChatGPT and Cursor (MCP)",
    slug: "mcp-ai-assistants",
    category: "support",
    tagline: "Connect the AI you already use to your WhatsApp inbox",
    description:
      "WhatFlow has no built-in AI bot. Instead, its MCP connector lets Claude, ChatGPT or Cursor read Live Inbox chats, look up Shopify orders, draft replies for a person to approve, send approved templates and create broadcast drafts that a person sends.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Draft mode: a person approves every reply" },
      { feature: "Look up Shopify orders from a chat" },
      { feature: "Create broadcast drafts, never send them" },
      { feature: "Read WhatsApp analytics" },
    ],
  },
  {
    name: "Meta product catalog",
    slug: "meta-catalog",
    category: "marketing",
    tagline: "Share your Shopify products as a WhatsApp catalog",
    description:
      "Sync Shopify products to your Meta catalog and share them in WhatsApp chats. Send single products, catalog messages and multi-product templates from the WhatFlow inbox and in broadcasts, with checkout on Shopify.",
    featured: false,
    status: "published",
    keyFeatures: [
      { feature: "Sync products or chosen collections" },
      { feature: "Share products from the team inbox" },
      { feature: "Catalog and multi-product templates in broadcasts" },
    ],
  },
  {
    name: "Webhooks and API triggers",
    slug: "webhooks",
    category: "automation",
    tagline: "Send inbox events to your own tools",
    description:
      "Send Team Inbox events, such as new WhatsApp messages, to your own systems with signed webhooks, and start Inbox workflows from your own code with API triggers. Rotate signing secrets and pause destinations when you need to.",
    featured: false,
    status: "published",
    keyFeatures: [
      { feature: "Signed outbound webhooks" },
      { feature: "API-triggered Inbox workflows" },
      { feature: "Secret rotation and pause or resume" },
    ],
  },
];

export const DEFAULT_INTEGRATIONS_BY_SLUG: Record<string, Partial<Integration>> = Object.fromEntries(
  DEFAULT_INTEGRATIONS.map((item) => [item.slug as string, item]),
);

/** Integration pages that used to describe connections WhatFlow does not ship; they redirect to /integrations. */
export const RETIRED_INTEGRATION_SLUGS = ["klaviyo", "gorgias", "loox", "recharge"] as const;
