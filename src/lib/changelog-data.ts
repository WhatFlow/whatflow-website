/**
 * Curated WhatFlow release notes.
 *
 * Written for merchants from the Business API (Official), Chat Automation
 * and Team Inbox release history, including the releases before the move to Cloudflare. Plain language only: no source code,
 * commit identifiers, internal service names or security specifics.
 *
 * This list seeds the Payload `changelog` collection (scripts/seed-changelog.ts)
 * and is the page fallback if the CMS is unreachable or empty.
 */

export type ChangelogApp = "all" | "business-api" | "chat" | "ai";
export type ChangelogType = "feature" | "improvement" | "fix" | "security";

export type ChangelogSeedEntry = {
  slug: string;
  version: string;
  title: string;
  /** YYYY-MM-DD */
  releaseDate: string;
  type: ChangelogType;
  app: ChangelogApp;
  /** 1–2 sentences, used as the meta description. Keep under ~170 characters. */
  summary: string;
  highlights: string[];
  whyItMatters?: string;
};

export const CHANGELOG_APP_LABELS: Record<ChangelogApp, string> = {
  all: "Both apps",
  "business-api": "Official API App",
  chat: "Unofficial API App",
  ai: "WhatFlow AI",
};

export const CHANGELOG_APP_FULL_NAMES: Record<ChangelogApp, string> = {
  all: "WhatFlow Business API (official API app) and WhatFlow Chat Automation (unofficial API app)",
  "business-api": "WhatFlow Business API, the official Meta Cloud API app",
  chat: "WhatFlow Chat Automation, the unofficial API app",
  ai: "WhatFlow AI",
};

/** Earliest date covered by the curated history. */
export const CHANGELOG_HISTORY_START = "2024-12-18";

const entries: ChangelogSeedEntry[] = [
  // ─── November 2026 ────────────────────────────────────────────────────────
  {
    slug: "sidekick-whatsapp-message-formatting",
    version: "2026.11.05",
    title: "Shopify Sidekick Writes Better WhatsApp Messages",
    releaseDate: "2026-11-05",
    type: "improvement",
    app: "all",
    summary:
      "Messages drafted with Shopify Sidekick now use WhatsApp buttons by default, skip emojis unless you ask for them, and follow WhatsApp's formatting rules.",
    highlights: [
      "Sidekick suggests quick-reply and link buttons by default, so customers can respond with a single tap.",
      "No emojis unless you ask for them, for a cleaner, more professional tone.",
      "Bold, italics and line breaks are applied only where WhatsApp supports them, so drafts look the same on your customer's phone.",
      "Sidekick tools respond faster and stay within Shopify's limits, so requests no longer time out.",
    ],
    whyItMatters:
      "Drafts need fewer edits before you send, and messages with buttons are easier for customers to act on.",
  },
  {
    slug: "whatsapp-store-report",
    version: "2026.11.04",
    title: "Store Report: Get Your Shopify Sales Summary on WhatsApp",
    releaseDate: "2026-11-04",
    type: "feature",
    app: "business-api",
    summary:
      "Send a keyword to your WhatsApp Business number and get your Shopify store's sales summary back in the chat, without opening the admin.",
    highlights: [
      "Choose a keyword (\"report\" by default) and the phone numbers allowed to use it.",
      "When an authorized number sends the keyword, WhatFlow replies with a summary built from Shopify's own analytics.",
      "Messages from other numbers get your normal auto-replies, so the report stays private.",
      "Useful for owners and managers who want a quick daily check from their phone.",
    ],
    whyItMatters: "You can check how the store is doing from WhatsApp, wherever you are.",
  },
  {
    slug: "faster-app-home-and-install",
    version: "2026.11.04",
    title: "Faster App Home, Install and Sign-In",
    releaseDate: "2026-11-04",
    type: "improvement",
    app: "all",
    summary:
      "WhatFlow's Home page and first-time install now load noticeably faster, and returning merchants are no longer slowed down by background sign-in checks.",
    highlights: [
      "Home shows its layout right away, then fills in each section as its data arrives.",
      "Install shows your first page as soon as your shop profile is saved, and loads shop details and your logo at the same time.",
      "Background tasks such as renewing your Shopify session now run after the page has loaded.",
      "The support chat widget waits until the page has finished loading.",
      "Placeholders now match the size of the content they hold, so the page doesn't jump around while it loads.",
    ],
  },
  {
    slug: "team-inbox-triage-and-reply-window",
    version: "2026.11.03",
    title: "Team Inbox: Needs-Reply Triage, Reply Window Countdown and Undo Send",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary:
      "The WhatsApp Team Inbox now shows which chats need a reply, counts down each 24-hour customer service window, and lets agents undo a send.",
    highlights: [
      "A \"Needs reply\" view shows conversations that are waiting on your team.",
      "Each conversation shows a live countdown of WhatsApp's 24-hour customer service window, and you get an alert before it closes.",
      "Mark a conversation as done, undo a message you just sent, and search across chats.",
      "See the customer's Shopify orders next to the conversation, and act on several chats at once with bulk actions.",
      "Fixed voice note playback so long recordings play reliably.",
    ],
    whyItMatters:
      "Customers get answered while the reply window is still open, and fewer chats get missed.",
  },
  {
    slug: "team-inbox-outbound-webhooks",
    version: "2026.11.03",
    title: "Team Inbox: Signed Outbound Webhooks",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary:
      "Send Team Inbox events, such as new WhatsApp messages, to your own tools and automations using signed webhooks.",
    highlights: [
      "Add your own webhook address to receive Inbox activity as it happens.",
      "Every delivery is signed, so your system can confirm it came from WhatFlow.",
      "Events are grouped into small batches for efficient delivery.",
    ],
    whyItMatters:
      "You can connect WhatsApp conversations to your CRM, helpdesk or other tools without manual exports.",
  },
  {
    slug: "auto-disconnect-missing-whatsapp-numbers",
    version: "2026.11.02",
    title: "Automatic Disconnect for Removed WhatsApp Numbers",
    releaseDate: "2026-11-02",
    type: "improvement",
    app: "business-api",
    summary:
      "If Meta reports that your connected WhatsApp number no longer exists, WhatFlow disconnects it automatically and shows you how to reconnect.",
    highlights: [
      "Automations no longer try to send from a number Meta has removed.",
      "A Disconnect button is now on the WhatsApp number card, so you can switch numbers yourself.",
      "Connection status on the Connections page always shows your number's current state.",
    ],
  },
  {
    slug: "returning-merchant-page-speed-fix",
    version: "2026.11.02",
    title: "Fix: Pages Waiting on Session Renewal for Returning Merchants",
    releaseDate: "2026-11-02",
    type: "fix",
    app: "all",
    summary:
      "Fixed an issue where returning merchants sometimes saw slow page loads while their Shopify session was renewed in the background.",
    highlights: [
      "Expired sessions are now renewed after the page has loaded, not before.",
      "Stores that come back to the app after a while see their pages straight away.",
      "Back-in-stock sign-ups keep working while a store's session is being renewed.",
    ],
  },
  {
    slug: "review-request-timing-and-fallback",
    version: "2026.11.01",
    title: "Review Requests: Hourly Delays and Fulfillment Fallback",
    releaseDate: "2026-11-01",
    type: "improvement",
    app: "business-api",
    summary:
      "WhatsApp review requests can now wait a set number of hours, and can fall back to the fulfillment date when a delivery date isn't available.",
    highlights: [
      "Set review request delays in hours as well as days.",
      "Optional fallback: if a carrier never confirms delivery, the request is timed from fulfillment instead.",
      "Auto-reply buttons can now be added and removed the same way as in the template editor.",
    ],
  },

  // ─── October 2026 ─────────────────────────────────────────────────────────
  {
    slug: "whatsapp-in-shopify-analytics",
    version: "2026.10.31",
    title: "WhatsApp Activity in Shopify Analytics",
    releaseDate: "2026-10-31",
    type: "feature",
    app: "all",
    summary:
      "WhatsApp messages sent and failed now appear in Shopify Analytics, and WhatFlow's Home shows your WhatsApp numbers in Shopify's metrics bar.",
    highlights: [
      "WhatsApp message activity is reported to Shopify Analytics, so you can see it next to your other store metrics.",
      "Home shows your WhatsApp numbers in Shopify's native metrics bar and cards.",
      "Broadcast links are tagged with UTM parameters automatically, so you can track WhatsApp traffic and sales.",
      "Cart recovery reports now count recoveries started from admin action links.",
    ],
    whyItMatters:
      "You can measure what WhatsApp brings in using the Shopify reports you already know.",
  },
  {
    slug: "templates-move-with-whatsapp-account",
    version: "2026.10.31",
    title: "Templates Carry Over When You Switch WhatsApp Accounts",
    releaseDate: "2026-10-31",
    type: "improvement",
    app: "business-api",
    summary:
      "When your store connects a different WhatsApp Business account, WhatFlow now moves your message templates over so your automations keep working.",
    highlights: [
      "Your templates move to the new account automatically when you switch.",
      "Fixed button labels and emoji in review template drafts.",
      "Earlier review replies still match after the template update.",
    ],
  },
  {
    slug: "shopify-sidekick-integration",
    version: "2026.10.30",
    title: "Use WhatFlow from Shopify Sidekick",
    releaseDate: "2026-10-30",
    type: "feature",
    app: "all",
    summary:
      "Ask Shopify Sidekick to create and edit WhatsApp templates, change WhatFlow settings and get support, right in your Shopify admin.",
    highlights: [
      "Official API app: create and edit WhatsApp message templates by describing what you need.",
      "Unofficial API app: Sidekick can work with all your app settings and sends, and shows buttons that open the right WhatFlow page.",
      "A help dialog checks with you before acting and suggests prompts for the page you're on.",
      "Sidekick shows you each change to review before it is applied.",
    ],
    whyItMatters: "You can set up WhatsApp automations by describing what you want.",
  },
  {
    slug: "whatsapp-signup-and-payment-fixes",
    version: "2026.10.30",
    title: "Fix: WhatsApp Signup Saving and Meta Payment Reminders",
    releaseDate: "2026-10-30",
    type: "fix",
    app: "business-api",
    summary:
      "WhatsApp signup now saves your connection reliably and lets you restart a setup that failed. Meta payment method reminders are clearer.",
    highlights: [
      "Fixed signup sometimes not saving the connected number.",
      "A failed WhatsApp setup can be restarted from the Connections page.",
      "The Meta payment reminder now says when a payment method is already added.",
    ],
  },
  {
    slug: "lifecycle-emails",
    version: "2026.10.29",
    title: "Helpful Emails for Install, Trial and Billing",
    releaseDate: "2026-10-29",
    type: "feature",
    app: "all",
    summary:
      "WhatFlow now emails store owners at important moments, such as after install, before a trial ends and when billing changes.",
    highlights: [
      "A welcome email after install with your next setup steps.",
      "A reminder before your free trial ends.",
      "Confirmation emails when your plan or billing status changes.",
    ],
  },
  {
    slug: "connect-ai-assistants-with-mcp",
    version: "2026.10.29",
    title: "AI Connections: Connect AI Assistants to WhatsApp with MCP",
    releaseDate: "2026-10-29",
    type: "feature",
    app: "business-api",
    summary:
      "Connect MCP-compatible AI assistants, including ChatGPT, to your store's WhatsApp to read conversations and send messages. Connect with a short code.",
    highlights: [
      "A new AI Connections page lists every connected AI app.",
      "Connect using a short code, with setup steps for each app.",
      "See when each connection was last used, and reconnecting replaces the old connection.",
      "Template sends still follow your store's blocklist and opt-out rules.",
    ],
    whyItMatters:
      "Your team can work with WhatsApp from the AI tools they already use.",
  },
  {
    slug: "embedded-signup-v5-messaging-accounts",
    version: "2026.10.28",
    title: "Faster WhatsApp Setup with Embedded Signup and Messaging Accounts",
    releaseDate: "2026-10-28",
    type: "feature",
    app: "business-api",
    summary:
      "Connecting WhatsApp now uses Meta's latest Embedded Signup flow and supports Messaging accounts, including numbers already used in the WhatsApp Business app.",
    highlights: [
      "Updated to Meta's latest Embedded Signup for a shorter, clearer setup.",
      "Support for Meta Messaging accounts.",
      "If you keep using the WhatsApp Business app on your phone (coexistence), your recent chat history is imported into the Team Inbox.",
    ],
  },
  {
    slug: "shopify-flow-catalog-and-list-triggers",
    version: "2026.10.28",
    title: "New Shopify Flow Triggers: Catalog Orders, List Replies and Products",
    releaseDate: "2026-10-28",
    type: "feature",
    app: "business-api",
    summary:
      "Start Shopify Flow workflows when a customer orders from your WhatsApp catalog, picks an option from a list message, or shares a catalog product.",
    highlights: [
      "WhatsApp catalog order trigger: run a workflow when a customer sends a cart from your catalog.",
      "List selection trigger: react to the option a customer picks from an interactive list.",
      "Product trigger: run a workflow when a customer shares a product from your WhatsApp catalog.",
      "Trigger names now use consistent Title Case in Shopify Flow.",
    ],
    whyItMatters: "You can build more WhatsApp-driven automations in Shopify Flow without code.",
  },
  {
    slug: "simpler-message-editor-and-auto-replies",
    version: "2026.10.27",
    title: "Simpler Message Editor, Ready-Made Auto-Replies and Easier Connections",
    releaseDate: "2026-10-27",
    type: "feature",
    app: "business-api",
    summary:
      "The message editor now offers starting points for every message type, auto-replies come with ready-made answers and a live preview, and connecting is simpler.",
    highlights: [
      "Starter messages for every message type, grouped by category, so you don't start from a blank page.",
      "Ready-made auto-replies with keyword matching and a live WhatsApp preview.",
      "A simpler Connections page with a connection code.",
      "Order automations and abandoned checkout share one layout for status and message settings.",
      "Rule and template editors show Shopify's save bar when you have unsaved changes.",
      "Errors stay on screen as banners until you dismiss them, so you don't miss them.",
    ],
  },
  {
    slug: "built-for-shopify-ui-and-faster-pages",
    version: "2026.10.27",
    title: "Admin Pages Open With Data Loaded",
    releaseDate: "2026-10-27",
    type: "improvement",
    app: "all",
    summary:
      "WhatFlow admin pages now open with their data already loaded and no layout shift, in line with Shopify's Built for Shopify design requirements.",
    highlights: [
      "Pages load their data on the server, so you no longer see empty pages or spinners first.",
      "Removed late-appearing banners that pushed content down.",
      "The Home page meets Built for Shopify requirements.",
      "Stores in India are routed to a dedicated India support number.",
      "The storefront chat button reports its status correctly, and the AI promotion can be dismissed.",
    ],
  },
  {
    slug: "security-hardening-october-2026",
    version: "2026.10.31",
    title: "Security Hardening Across WhatFlow",
    releaseDate: "2026-10-31",
    type: "security",
    app: "all",
    summary:
      "A round of security improvements adds stronger checks on incoming WhatsApp events, tighter protection for merchant admin pages, and verification at signup.",
    highlights: [
      "Incoming WhatsApp events must pass signature checks before they are processed.",
      "Merchant admin pages are never stored in shared caches.",
      "Tighter checks on changes made from the admin.",
      "The WhatsApp Business account is verified during signup.",
    ],
    whyItMatters: "Your store data and WhatsApp connection are better protected.",
  },
  {
    slug: "whatsapp-broadcast-pacing",
    version: "2026.10.25",
    title: "More Reliable WhatsApp Broadcast Pacing",
    releaseDate: "2026-10-25",
    type: "improvement",
    app: "business-api",
    summary:
      "Large WhatsApp broadcasts now go out at a steady pace. Each message gets its own send slot, and stalled campaigns are completed or closed automatically.",
    highlights: [
      "Each broadcast message gets its own scheduled send time, so large campaigns go out evenly.",
      "No message is sent before its scheduled time.",
      "Messages stuck in a stalled campaign are completed automatically, and abandoned broadcast jobs are cancelled.",
    ],
    whyItMatters:
      "Pacing protects your number's quality rating and makes campaign results easier to read.",
  },
  {
    slug: "shipping-journey-fixes",
    version: "2026.10.23",
    title: "Fix: Shipping Journey Stages and Dashboard Summary",
    releaseDate: "2026-10-23",
    type: "fix",
    app: "business-api",
    summary:
      "Shipping Journey now places each message in the right stage, turns stages on and off consistently, and its dashboard summary matches each stage's setup.",
    highlights: [
      "Each shipping update message is placed in the correct stage.",
      "Turning a stage on or off now works the same way everywhere.",
      "The dashboard summary reflects which stages are ready to send.",
    ],
  },
  {
    slug: "polaris-2-refresh-and-contextual-help",
    version: "2026.10.22",
    title: "Refreshed Shopify-Native Design and Contextual Help",
    releaseDate: "2026-10-22",
    type: "improvement",
    app: "all",
    summary:
      "Both WhatFlow apps now use Shopify's latest Polaris design system, with built-in help tooltips that explain settings where you use them.",
    highlights: [
      "Moved to the stable release of Shopify's Polaris design system.",
      "Help tooltips explain settings and stay readable at larger text sizes.",
      "Tooltips no longer cause the page to shift.",
      "Prices in message previews no longer show unnecessary zero decimals.",
    ],
  },
  {
    slug: "whatsapp-review-requests",
    version: "2026.10.20",
    title: "WhatsApp Review Requests After Order, Payment, Fulfillment or Delivery",
    releaseDate: "2026-10-20",
    type: "feature",
    app: "business-api",
    summary:
      "Ask customers for a product review on WhatsApp at the right moment: after the order, after payment, at fulfillment, or once delivery is confirmed.",
    highlights: [
      "Choose the moment that triggers each review request.",
      "Customers leave their review right in WhatsApp, with no extra links to open.",
      "More review templates to start from, plus a link to ready-made Shopify Flow templates.",
    ],
    whyItMatters:
      "Asking at the right time on a channel customers already use can bring in more reviews.",
  },
  {
    slug: "faster-incoming-message-handling",
    version: "2026.10.20",
    title: "Faster Handling of Incoming WhatsApp Messages",
    releaseDate: "2026-10-20",
    type: "improvement",
    app: "all",
    summary:
      "Incoming WhatsApp messages and delivery updates are now processed as they arrive, so auto-replies, tags and Inbox updates happen sooner.",
    highlights: [
      "Customer replies and delivery receipts are handled as soon as they arrive, without waiting in a queue.",
      "Auto-replies and order tags react to customers sooner.",
      "Duplicate abandoned-cart recoveries are removed before they are scheduled.",
      "Delivery and read counters in the Team Inbox stay accurate when Meta repeats an update.",
    ],
  },
  {
    slug: "edited-order-totals-fix",
    version: "2026.10.19",
    title: "Fix: Messages Use Updated Totals After Order Edits",
    releaseDate: "2026-10-19",
    type: "fix",
    app: "all",
    summary:
      "When you edit an order in Shopify, automatic and manual WhatsApp messages now show the updated total. Cancellation messages show the quantities ordered.",
    highlights: [
      "Order confirmations and updates use the order's current total after any edit.",
      "Manual sends from the order page use the same updated amounts.",
      "Cancellation messages list items with the quantities ordered.",
      "Shopify Flow's Order Reply trigger now also fires for replies to messages sent by Flow actions.",
    ],
  },
  {
    slug: "marketing-messages-api-and-order-reply-trigger",
    version: "2026.10.16",
    title: "Marketing Messages API and Shopify Flow Order Reply Trigger",
    releaseDate: "2026-10-16",
    type: "feature",
    app: "business-api",
    summary:
      "Marketing templates now go through Meta's Marketing Messages API, and a new Shopify Flow trigger runs when a customer replies to an order message.",
    highlights: [
      "Marketing templates are sent through Meta's Marketing Messages API.",
      "New \"WhatsApp Order Reply\" trigger in Shopify Flow, with the order and customer included.",
      "Tags from a customer's reply now take priority over delivery receipts.",
    ],
    whyItMatters:
      "Meta built this API for marketing messages, and the new trigger lets you act on customer replies in Shopify Flow.",
  },
  {
    slug: "bulk-whatsapp-sends-from-shopify-admin",
    version: "2026.10.17",
    title: "Reliable Bulk WhatsApp Sends from the Shopify Admin",
    releaseDate: "2026-10-17",
    type: "improvement",
    app: "all",
    summary:
      "Select multiple orders or checkouts in the Shopify admin and send WhatsApp messages to all of them in one go, without accidental duplicates.",
    highlights: [
      "A bulk selection is sent as one operation, so a retry never messages a customer twice.",
      "Bulk sends have sensible size limits and report success accurately.",
      "The unofficial API app queues bulk manual messages and sends them in steady batches.",
    ],
  },
  {
    slug: "shared-blocklist-and-opt-out-handling",
    version: "2026.10.15",
    title: "Shared Blocklist with Automatic STOP and START Handling",
    releaseDate: "2026-10-15",
    type: "feature",
    app: "business-api",
    summary:
      "Manage one WhatsApp blocklist across automations and the Team Inbox. Customers who reply STOP are opted out, and START opts them back in.",
    highlights: [
      "One blocklist for automations, broadcasts and the Team Inbox.",
      "Replying STOP opts a customer out and START opts them back in, automatically.",
      "Keyword chips and a clear save bar make the blocklist easy to manage from the dashboard.",
      "Blocklist enforcement is off by default, so you choose when to turn it on.",
      "The template editor explains how to add a marketing opt-out.",
    ],
    whyItMatters: "Respecting opt-outs keeps you compliant and protects your WhatsApp number's quality rating.",
  },
  {
    slug: "whatsapp-catalog-and-checkout-links",
    version: "2026.10.14",
    title: "Sell in WhatsApp: Catalog Sync, Product Messages and Checkout Links",
    releaseDate: "2026-10-14",
    type: "feature",
    app: "business-api",
    summary:
      "Sync your Shopify catalog to WhatsApp, send products from the Team Inbox, and reply to WhatsApp carts automatically with a Shopify checkout link.",
    highlights: [
      "When a customer sends a cart from your WhatsApp catalog, they get a checkout link back automatically.",
      "Sync your WhatsApp catalog from Shopify whenever you need, including collections.",
      "Send products and checkout links from any Team Inbox conversation.",
      "Catalog and multi-product templates in chats and broadcasts.",
      "Contacts can be synced from Shopify manually and redacted for GDPR requests.",
    ],
    whyItMatters: "Customers can browse, choose and buy without leaving WhatsApp.",
  },
  {
    slug: "chat-automation-new-home",
    version: "2026.10.13",
    title: "Unofficial API App: New Home, Quick Toggles and Setup Guide",
    releaseDate: "2026-10-13",
    type: "feature",
    app: "chat",
    summary:
      "The unofficial API app (WhatFlow Chat Automation) has a redesigned Home with quick on/off toggles for every feature and a step-by-step setup guide.",
    highlights: [
      "Turn features on or off right from Home.",
      "A setup guide walks new stores through the first steps.",
      "Every settings page was rebuilt with Shopify's native components and works well on mobile.",
      "The billing page shows the same subscription details as the Business API app.",
    ],
  },
  {
    slug: "chat-automation-pause-and-failed-delivery-tags",
    version: "2026.10.12",
    title: "Unofficial API App: Automations Pause When WhatsApp Disconnects",
    releaseDate: "2026-10-12",
    type: "improvement",
    app: "chat",
    summary:
      "If your linked WhatsApp session drops, automations now pause instead of failing. Orders whose message may not have arrived are tagged in Shopify.",
    highlights: [
      "Automations pause while your WhatsApp session is disconnected and resume when you reconnect.",
      "Abandoned cart messages are skipped while the store needs to sign in to Shopify again.",
      "Orders are tagged when a WhatsApp message failed or its delivery is uncertain, so your team can follow up.",
    ],
    whyItMatters: "You can see which orders need a follow-up, and messages aren't sent while your connection is down.",
  },
  {
    slug: "shopify-flow-incoming-media-trigger",
    version: "2026.10.11",
    title: "Shopify Flow: Incoming WhatsApp Media Trigger and Safer Actions",
    releaseDate: "2026-10-11",
    type: "feature",
    app: "business-api",
    summary:
      "Start a Shopify Flow workflow when a customer sends a photo, video or file on WhatsApp. Flow actions now show clear errors and retry safely.",
    highlights: [
      "New trigger for incoming WhatsApp media, with a secure link to the file.",
      "Shopify Flow action errors are shown clearly, and failed actions retry without sending twice.",
      "Triggers waiting for a workflow you've turned off are cancelled automatically.",
      "Analytics date ranges apply exactly as selected, with easier refresh controls.",
    ],
  },
  {
    slug: "chat-automation-order-actions-and-broadcast-previews",
    version: "2026.10.10",
    title: "Unofficial API App: Order Actions with Previews and Paced Broadcasts",
    releaseDate: "2026-10-10",
    type: "feature",
    app: "chat",
    summary:
      "Sending WhatsApp messages from Shopify order pages now shows a preview first, bulk sends show a warning, and broadcasts are paced per store.",
    highlights: [
      "WhatsApp actions on order pages share one layout with a message preview.",
      "Preview a saved message before sending, and see a warning before bulk sends.",
      "Preview a broadcast as a real customer will see it.",
      "Broadcasts are paced per store to protect your WhatsApp account.",
      "Long confirmation messages are sent as text first, followed by a short poll.",
    ],
  },
  {
    slug: "trial-extensions-and-billing-period-usage",
    version: "2026.10.09",
    title: "Trial Extensions and Billing-Period Usage",
    releaseDate: "2026-10-09",
    type: "improvement",
    app: "all",
    summary:
      "The billing page now shows and applies trial extensions, and analytics report message usage for your current billing period.",
    highlights: [
      "See any trial extension on the billing and Home pages, and apply it in one click.",
      "Usage figures match your current billing period, so they line up with your invoice.",
      "Order confirmation reminders now each have their own settings.",
    ],
  },
  {
    slug: "order-confirmation-follow-ups",
    version: "2026.10.06",
    title: "Order Confirmation Follow-Ups",
    releaseDate: "2026-10-06",
    type: "feature",
    app: "business-api",
    summary:
      "If a customer hasn't confirmed their order on WhatsApp, WhatFlow can send a follow-up reminder automatically.",
    highlights: [
      "Send a follow-up if the customer hasn't replied to the confirmation.",
      "Choose the timing and message for each reminder.",
      "Useful for cash-on-delivery stores that confirm orders before shipping.",
    ],
    whyItMatters: "Confirming orders before you ship can reduce failed deliveries and returns.",
  },
  {
    slug: "chat-automation-new-whatsapp-engine",
    version: "2026.10.05",
    title: "Unofficial API App Rebuilt on a Faster WhatsApp Engine",
    releaseDate: "2026-10-05",
    type: "improvement",
    app: "chat",
    summary:
      "The unofficial API app (WhatFlow Chat Automation) now runs on a new WhatsApp engine and faster infrastructure. The interface stays the same, and your settings carried over.",
    highlights: [
      "A more stable linked-device WhatsApp connection.",
      "Faster pages and automations, with the same features and settings.",
      "Polls in order confirmations keep their references, so replies match the right order.",
    ],
  },
  {
    slug: "back-in-stock-alert-fixes",
    version: "2026.10.05",
    title: "Fix: Back-in-Stock Alerts After Restock and Variant Changes",
    releaseDate: "2026-10-05",
    type: "fix",
    app: "business-api",
    summary:
      "Customers can sign up again for back-in-stock WhatsApp alerts after a restock, and alerts track variant changes reliably.",
    highlights: [
      "Customers can subscribe again after a product comes back in stock.",
      "Alerts follow the right variant even when variants change.",
      "The back-in-stock widget shows a loading state and lets you customize error messages.",
    ],
  },

  // ─── September 2026 ───────────────────────────────────────────────────────
  {
    slug: "order-tags-and-subscription-required",
    version: "2026.09.30",
    title: "Clearer Shopify Order Tags",
    releaseDate: "2026-09-30",
    type: "improvement",
    app: "business-api",
    summary:
      "Order tags are now standardized and kept under Shopify's 40-character limit. Orders are tagged when a customer must opt in before they can receive messages.",
    highlights: [
      "All order tags follow one naming style and fit Shopify's 40-character limit.",
      "Orders are tagged only when a send was actually blocked by a missing opt-in.",
      "Order data includes items and quantities for use in messages.",
      "Order confirmations can skip your automation conditions when needed.",
    ],
  },
  {
    slug: "team-inbox-speed",
    version: "2026.09.29",
    title: "Team Inbox: Faster Loading and Smoother Long Chats",
    releaseDate: "2026-09-29",
    type: "improvement",
    app: "business-api",
    summary:
      "The Team Inbox loads faster, scrolls smoothly through long conversations, and catches up automatically after a dropped connection.",
    highlights: [
      "Long conversations scroll smoothly.",
      "After a dropped connection, the Inbox fetches missed messages automatically.",
      "Faster switching between conversations.",
      "Template URL buttons are shortened and show a link preview.",
    ],
  },
  {
    slug: "reinstall-restores-whatsapp-setup",
    version: "2026.09.23",
    title: "Reinstalling Restores Your WhatsApp Setup",
    releaseDate: "2026-09-23",
    type: "improvement",
    app: "business-api",
    summary:
      "If you uninstall and reinstall WhatFlow, your WhatsApp connection and settings are restored instead of starting from scratch.",
    highlights: [
      "Uninstalling no longer removes your WhatsApp setup right away.",
      "Reinstalling restores your WhatsApp connection and settings.",
    ],
  },
  {
    slug: "send-whatsapp-from-shopify-admin",
    version: "2026.09.22",
    title: "Send WhatsApp Messages from Orders and Abandoned Checkouts",
    releaseDate: "2026-09-22",
    type: "feature",
    app: "business-api",
    summary:
      "Send a WhatsApp message straight from a Shopify order or abandoned checkout, with a template preview, or message many abandoned checkouts in bulk.",
    highlights: [
      "Choose a message and preview it before sending from the order page.",
      "The same options are available on abandoned checkouts.",
      "New bulk action to message many abandoned checkouts at once.",
      "Shipping Journey templates gain a delivery progress message.",
    ],
  },
  {
    slug: "team-inbox-collaboration",
    version: "2026.09.17",
    title: "Team Inbox: Assignments, Private Notes and Canned Responses",
    releaseDate: "2026-09-17",
    type: "feature",
    app: "business-api",
    summary:
      "Work as a team in the WhatsApp Inbox: assign conversations, leave private notes, reuse canned responses, react to messages and store custom customer details.",
    highlights: [
      "Assign conversations to team members.",
      "Private notes that only your team can see.",
      "Canned responses and quick replies for common questions.",
      "Message reactions, labels and custom attributes on contacts.",
      "Inbox workflows that can be started from your own systems.",
      "Shared Inbox links ask for confirmation before opening.",
    ],
    whyItMatters: "Several people can handle WhatsApp support without stepping on each other.",
  },
  {
    slug: "cash-on-delivery-controls",
    version: "2026.09.16",
    title: "Cash on Delivery Controls and Payment-Method Filters",
    releaseDate: "2026-09-16",
    type: "feature",
    app: "business-api",
    summary:
      "Choose when cash on delivery is offered at checkout, link it to shipping rates, and run order automations only for the payment methods you choose.",
    highlights: [
      "Rules that decide when cash on delivery is offered.",
      "Link cash on delivery to specific shipping rates.",
      "See live rates and stats on the cash-on-delivery page.",
      "Filter order automations by payment method, such as only cash-on-delivery orders.",
    ],
    whyItMatters: "You can limit risky cash-on-delivery orders and confirm only the orders that need it.",
  },
  {
    slug: "whatsapp-broadcasts-in-team-inbox",
    version: "2026.09.14",
    title: "WhatsApp Broadcasts with Live Template Sync",
    releaseDate: "2026-09-14",
    type: "feature",
    app: "business-api",
    summary:
      "Send WhatsApp broadcasts from the Team Inbox. Templates sync live from Meta, so variables always match and broadcasts don't fail on mismatched parameters.",
    highlights: [
      "Create and send broadcasts to your WhatsApp contacts.",
      "Templates are always up to date with Meta.",
      "Fixed broadcasts failing when template variables didn't match Meta's latest version.",
      "Failed sends retry automatically after the template is corrected.",
    ],
  },
  {
    slug: "faster-media-and-opt-out-buttons",
    version: "2026.09.14",
    title: "Faster Media Delivery and STOP Opt-Out Buttons",
    releaseDate: "2026-09-14",
    type: "improvement",
    app: "business-api",
    summary:
      "Images and files in WhatsApp messages are now served from Shopify's CDN, and templates can include STOP opt-out buttons.",
    highlights: [
      "Media is served from Shopify Files for faster, more reliable delivery.",
      "Your shop logo is used as the header image when a product image isn't available.",
      "Add STOP opt-out instructions and buttons to marketing templates.",
      "Template status refreshes automatically, and old rejection reasons are cleared once a template is approved.",
      "Faster dashboard with responsive layouts on all screen sizes.",
    ],
  },
  {
    slug: "whatsapp-flows-management",
    version: "2026.09.11",
    title: "Manage WhatsApp Flows Forms",
    releaseDate: "2026-09-11",
    type: "feature",
    app: "business-api",
    summary:
      "Create and manage WhatsApp Flows, the interactive forms customers fill in inside WhatsApp, and collect their submissions securely.",
    highlights: [
      "Create, edit and publish WhatsApp Flows from WhatFlow.",
      "Manage Flow assets and keep their details in sync with Meta.",
      "Form submissions are encrypted, with automatic key rotation.",
    ],
  },
  {
    slug: "whatsapp-team-inbox-launch",
    version: "2026.09.07",
    title: "Introducing the WhatsApp Team Inbox",
    releaseDate: "2026-09-07",
    type: "feature",
    app: "business-api",
    summary:
      "A real-time shared WhatsApp inbox for Shopify stores, with templates, media, voice notes, quick replies, a mobile layout and no per-seat fees.",
    highlights: [
      "Real-time conversations with live delivery and read status.",
      "Send approved templates, images, documents, stickers and voice notes.",
      "A countdown shows how long you have left in each 24-hour customer service window.",
      "One-click sign-in from your Shopify admin.",
      "Works with the WhatsApp Business app (coexistence): messages you send from your phone appear in the Inbox, including edits and deletions.",
      "Mobile layout, dark mode, browser notifications and unread counts.",
    ],
    whyItMatters:
      "Your whole team can answer WhatsApp customers from one place, with each customer's Shopify context alongside.",
  },
  {
    slug: "business-api-rebuilt-for-speed",
    version: "2026.09.05",
    title: "WhatFlow Business API Rebuilt for Speed and Reliability",
    releaseDate: "2026-09-05",
    type: "improvement",
    app: "business-api",
    summary:
      "WhatFlow Business API was rebuilt on a faster global platform, with complete handling of Shopify events, subscription syncing and privacy requests.",
    highlights: [
      "Pages and automations run on a global network close to your customers.",
      "All Shopify app events are handled, including install, uninstall and plan changes.",
      "Subscriptions stay in sync with Shopify billing.",
      "Shopify GDPR data requests are processed and logged automatically.",
      "A built-in way to submit and vote on feature requests.",
    ],
  },
];

/**
 * Releases from before the move to Cloudflare (November 2025 – September 2026),
 * written from the earlier Chat Automation and Business API release history.
 */
const earlierEntries: ChangelogSeedEntry[] = [
  // ─── September 2026 ───────────────────────────────────────────────────────
  {
    slug: "order-notes-on-failed-whatsapp-delivery",
    version: "2026.09.04",
    title: "Order Notes When a WhatsApp Message Can't Be Delivered",
    releaseDate: "2026-09-04",
    type: "feature",
    app: "business-api",
    summary:
      "When Meta reports that a WhatsApp message couldn't be delivered, WhatFlow adds a note to the Shopify order or draft order so your team can follow up.",
    highlights: [
      "Failed WhatsApp deliveries are noted on the order or draft order automatically.",
      "Message images can come from the order's products, with a preview in the editor.",
      "New order status page link variable for order and shipping messages.",
    ],
  },
  {
    slug: "chat-automation-usage-dashboard",
    version: "2026.09.06",
    title: "Unofficial API App: Usage per Automation",
    releaseDate: "2026-09-06",
    type: "feature",
    app: "chat",
    summary:
      "The unofficial API app's Home now breaks down WhatsApp message usage by automation, with a date range picker to compare periods.",
    highlights: [
      "Message usage per automation, shown as simple stat boxes.",
      "Choose any date range to compare periods.",
    ],
  },

  // ─── August 2026 ──────────────────────────────────────────────────────────
  {
    slug: "store-whatsapp-number-for-notifications",
    version: "2026.08.26",
    title: "Set a WhatsApp Number for Store Notifications",
    releaseDate: "2026-08-26",
    type: "improvement",
    app: "all",
    summary:
      "Add the WhatsApp number your team uses, and WhatFlow sends store notifications there instead of the general shop phone number.",
    highlights: [
      "A short prompt asks for your store's WhatsApp number if it's missing.",
      "Admin notifications go to that number first.",
      "Back-in-stock product links include UTM tags, so you can track the sales they bring in.",
    ],
  },
  {
    slug: "manual-whatsapp-business-account-connection",
    version: "2026.08.24",
    title: "Connect an Existing WhatsApp Business Account Manually",
    releaseDate: "2026-08-24",
    type: "improvement",
    app: "business-api",
    summary:
      "Stores that already manage their own WhatsApp Business account can now connect it manually, instead of using Embedded Signup.",
    highlights: [
      "Connect using your existing WhatsApp Business account and phone number details.",
      "Helpful for agencies and stores with an established Meta setup.",
      "Embedded Signup now warns when it is opened on a mobile device, where Meta's flow may not work.",
    ],
  },
  {
    slug: "whatsapp-analytics-dashboard",
    version: "2026.08.20",
    title: "WhatsApp Analytics: Messages, Conversations, Costs and Recovered Revenue",
    releaseDate: "2026-08-20",
    type: "feature",
    app: "business-api",
    summary:
      "A new analytics dashboard shows WhatsApp messages, conversations, Meta pricing, template performance and revenue recovered from abandoned carts.",
    highlights: [
      "Messaging and conversation trends over time.",
      "Meta pricing breakdown, so you can see what WhatsApp costs you.",
      "Template performance, with links to each template in WhatsApp Manager.",
      "Recovered revenue from abandoned checkouts, using Shopify's own sales data.",
      "Recovery and invoice links get UTM tags for Shopify marketing reports.",
    ],
    whyItMatters: "You can see what WhatsApp costs and what it earns in one place.",
  },
  {
    slug: "abandoned-checkout-skip-after-order",
    version: "2026.08.19",
    title: "Fix: No Cart Reminders After the Customer Has Ordered",
    releaseDate: "2026-08-19",
    type: "fix",
    app: "business-api",
    summary:
      "Abandoned checkout follow-ups now stop automatically when the customer completes an order, so nobody gets a reminder for a cart they already bought.",
    highlights: [
      "Follow-ups are skipped if an order exists for the same cart.",
      "Follow-ups are also skipped if the customer placed a later order.",
      "Scheduled follow-ups are cancelled as soon as the order comes in.",
    ],
  },
  {
    slug: "order-via-whatsapp-chat-button",
    version: "2026.08.17",
    title: "Chat Button: Order via WhatsApp and Custom Icons",
    releaseDate: "2026-08-17",
    type: "feature",
    app: "business-api",
    summary:
      "The storefront WhatsApp button can now let shoppers order through WhatsApp, and you can upload your own button icon.",
    highlights: [
      "Add an \"Order via WhatsApp\" block to your theme and track its status in settings.",
      "Pick a custom icon for the chat button from your files.",
    ],
  },
  {
    slug: "marketing-messages-api-support",
    version: "2026.08.11",
    title: "Support for Meta's Marketing Messages API",
    releaseDate: "2026-08-11",
    type: "feature",
    app: "business-api",
    summary:
      "Marketing templates can be sent through Meta's Marketing Messages API, and fall back to the standard Cloud API automatically when needed.",
    highlights: [
      "Marketing templates use Meta's dedicated marketing API when your account supports it.",
      "Automatic fallback to the standard API, so sends don't fail.",
      "Create message templates from Shopify Sidekick.",
    ],
  },
  {
    slug: "admin-blocks-and-bulk-whatsapp-actions",
    version: "2026.08.10",
    title: "WhatsApp Blocks and Bulk Actions in the Shopify Admin",
    releaseDate: "2026-08-10",
    type: "feature",
    app: "business-api",
    summary:
      "Send WhatsApp confirmations, notifications, fulfillment updates and draft order reminders in bulk from Shopify admin lists, with French translations.",
    highlights: [
      "Bulk actions for order confirmations, notifications, fulfillment updates and draft orders.",
      "WhatsApp blocks on order, draft order and abandoned checkout pages.",
      "Extensions translated into French.",
    ],
  },
  {
    slug: "judgeme-review-request-flow-template",
    version: "2026.08.07",
    title: "Judge.me Review Requests on WhatsApp with Shopify Flow",
    releaseDate: "2026-08-07",
    type: "feature",
    app: "business-api",
    summary:
      "A ready-made Shopify Flow template sends Judge.me review requests on WhatsApp, so you can collect reviews without building the workflow yourself.",
    highlights: [
      "Install the Flow template and choose your WhatsApp review template.",
      "Works with your existing Judge.me setup.",
    ],
  },
  {
    slug: "smarter-whatsapp-template-editor",
    version: "2026.08.07",
    title: "Smarter WhatsApp Template Editor",
    releaseDate: "2026-08-07",
    type: "improvement",
    app: "business-api",
    summary:
      "The template editor checks templates against Meta's rules before you submit, supports coupon code buttons, and locks templates while Meta reviews them.",
    highlights: [
      "Templates are checked and tidied before submission, and variables are renumbered automatically.",
      "Insert variables where your cursor is.",
      "Copy-code buttons that fill in a discount code.",
      "Long button links are shortened automatically.",
      "Templates under Meta review are read-only, so edits can't break the review.",
      "Duplicate names from the library get a suffix instead of failing.",
    ],
    whyItMatters: "Fewer templates get rejected by Meta, so you can start sending sooner.",
  },
  {
    slug: "merchant-welcome-messages",
    version: "2026.08.06",
    title: "WhatsApp Welcome Message When You Install",
    releaseDate: "2026-08-06",
    type: "feature",
    app: "all",
    summary:
      "Store owners now get a WhatsApp welcome message with setup help after installing WhatFlow, and a follow-up if they uninstall.",
    highlights: [
      "A welcome message with next steps after install.",
      "A short follow-up after uninstall to ask what went wrong.",
      "Auto-reply media and template header images are uploaded to Meta automatically.",
    ],
  },

  // ─── July 2026 ────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-customer-broadcasts",
    version: "2026.08.01",
    title: "WhatsApp Broadcasts to Selected Customers and Segments",
    releaseDate: "2026-08-01",
    type: "feature",
    app: "business-api",
    summary:
      "Send a WhatsApp broadcast to customers you select in Shopify, or to a whole customer segment, and track or cancel it from a broadcast queue.",
    highlights: [
      "Broadcast to selected customers or a Shopify customer segment.",
      "Duplicate phone numbers are removed automatically.",
      "Messages are spaced out (at least 10 seconds apart) to protect your number.",
      "A live broadcast queue shows progress, and you can cancel a whole broadcast or a single batch.",
    ],
  },
  {
    slug: "phone-number-health-status",
    version: "2026.07.31",
    title: "WhatsApp Number Health on the Connections Page",
    releaseDate: "2026-07-31",
    type: "improvement",
    app: "business-api",
    summary:
      "The Connections page now shows your WhatsApp number's health and any messaging limits Meta has applied.",
    highlights: [
      "See your number's status and messaging limits at a glance.",
      "Refresh templates from the template library on every feature page.",
      "Features turn off automatically when they have no approved template, instead of failing silently.",
    ],
  },
  {
    slug: "shopify-flow-whatsapp-triggers-and-actions",
    version: "2026.07.26",
    title: "Shopify Flow: WhatsApp Triggers, Media and Button Actions",
    releaseDate: "2026-07-26",
    type: "feature",
    app: "business-api",
    summary:
      "Start Shopify Flow workflows when customers tap a WhatsApp button or send a message, and send text, buttons, links, images, documents, video or voice notes from Flow.",
    highlights: [
      "Triggers for button taps and incoming text messages.",
      "Actions to send text, quick-reply buttons and call-to-action links.",
      "Actions to send images, documents, videos and audio, including voice notes.",
      "A dashboard overview shows usage and which automations are active.",
    ],
    whyItMatters: "You can build WhatsApp conversations into your Shopify Flow workflows without code.",
  },
  {
    slug: "shipping-and-fulfillment-tracking-messages",
    version: "2026.07.08",
    title: "Shipping Journey: Fulfillment and Tracking Updates on WhatsApp",
    releaseDate: "2026-07-08",
    type: "feature",
    app: "business-api",
    summary:
      "Keep customers updated on WhatsApp as their order ships, with tracking messages for each shipment status.",
    highlights: [
      "Choose which shipment statuses send a WhatsApp update.",
      "Tracking details are included in each message.",
      "Optionally hold shipping updates until a review step is complete.",
      "Expired Shopify access is refreshed automatically, so updates keep sending.",
    ],
  },

  // ─── June 2026 ────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-blocks-on-shopify-orders",
    version: "2026.06.29",
    title: "Send WhatsApp Messages from Order, Draft and Checkout Pages",
    releaseDate: "2026-06-29",
    type: "feature",
    app: "business-api",
    summary:
      "New Shopify admin blocks and actions let you send WhatsApp confirmations, notifications and recovery messages from orders, draft orders and checkouts.",
    highlights: [
      "WhatsApp blocks on order, draft order and abandoned checkout pages.",
      "Character counts and formatting tips while you write.",
      "A draggable WhatsApp chat button for your storefront with a configurable greeting.",
    ],
  },
  {
    slug: "shopify-flow-send-whatsapp-templates",
    version: "2026.06.25",
    title: "Shopify Flow: Send WhatsApp Templates",
    releaseDate: "2026-06-25",
    type: "feature",
    app: "business-api",
    summary:
      "Send approved WhatsApp templates from any Shopify Flow workflow, with variables filled from your store data and a preview before you save.",
    highlights: [
      "A Shopify Flow action that sends a WhatsApp template.",
      "Fill template variables from order, customer and product data.",
      "Preview and validate the message inside Shopify Flow.",
    ],
  },
  {
    slug: "abandoned-checkout-and-draft-order-recovery",
    version: "2026.06.26",
    title: "Abandoned Checkout and Draft Order Recovery on WhatsApp",
    releaseDate: "2026-06-26",
    type: "feature",
    app: "business-api",
    summary:
      "Recover abandoned checkouts and unpaid draft orders with scheduled WhatsApp reminders that check the cart is still open before sending.",
    highlights: [
      "Multi-step reminders on a schedule you choose.",
      "Each reminder checks that the checkout hasn't been completed.",
      "A recovery window so old carts aren't contacted.",
      "Product quantities and images in recovery messages.",
    ],
    whyItMatters: "Many shoppers come back to their cart when they get a timely reminder on WhatsApp.",
  },
  {
    slug: "order-paid-messages-and-delivery-tags",
    version: "2026.06.15",
    title: "Order Paid Messages and Clearer Delivery Tags",
    releaseDate: "2026-06-15",
    type: "feature",
    app: "business-api",
    summary:
      "Send a WhatsApp message when an order is paid, filter order messages by fulfillment status, and tag orders whose customer isn't on WhatsApp.",
    highlights: [
      "New order paid trigger.",
      "Only send order messages for the fulfillment statuses you choose.",
      "A separate tag for customers who don't use WhatsApp, apart from general delivery failures.",
      "Button links can include Shopify order details.",
    ],
  },
  {
    slug: "usage-analytics-dashboard-business-api",
    version: "2026.06.12",
    title: "Usage Analytics Dashboard",
    releaseDate: "2026-06-12",
    type: "feature",
    app: "business-api",
    summary:
      "See how many WhatsApp messages WhatFlow sent for you over any date range, broken down by automation.",
    highlights: [
      "Charts of messages sent over time.",
      "A date range filter to compare periods.",
      "Order cancellation details available in the message editor.",
    ],
  },
  {
    slug: "interactive-whatsapp-buttons",
    version: "2026.06.05",
    title: "Interactive WhatsApp Buttons and a Feature Request Board",
    releaseDate: "2026-06-05",
    type: "feature",
    app: "business-api",
    summary:
      "Messages can now include interactive WhatsApp buttons, and you can suggest and vote on features from inside the app.",
    highlights: [
      "Quick-reply and link buttons in WhatsApp messages.",
      "A feature request board where you can post ideas, vote and comment.",
      "New templates include a short footer by default.",
    ],
  },

  // ─── May 2026 ─────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-embedded-signup-and-phone-registration",
    version: "2026.05.29",
    title: "Connect WhatsApp with Embedded Signup",
    releaseDate: "2026-05-29",
    type: "feature",
    app: "business-api",
    summary:
      "Connect your WhatsApp Business account with Meta's Embedded Signup, register your phone number, and manage its display name from WhatFlow.",
    highlights: [
      "Sign up for the WhatsApp Business Platform without leaving Shopify.",
      "Register or re-register your phone number from the Connections page.",
      "Update your WhatsApp display name.",
      "Abandoned checkout and draft order events are captured as soon as they happen.",
    ],
  },
  {
    slug: "back-in-stock-whatsapp-alerts",
    version: "2026.05.26",
    title: "Back-in-Stock Alerts on WhatsApp",
    releaseDate: "2026-05-26",
    type: "feature",
    app: "business-api",
    summary:
      "Shoppers can sign up on a sold-out product page to get a WhatsApp message when it's back in stock.",
    highlights: [
      "A storefront widget you add with the theme editor.",
      "A WhatsApp message goes out automatically when the product is restocked.",
      "Manage subscriptions from the app.",
    ],
    whyItMatters: "You can win back sales you'd otherwise lose to out-of-stock products.",
  },
  {
    slug: "chat-automation-new-home-dashboard",
    version: "2026.05.22",
    title: "Unofficial API App: New Home with Connection Management",
    releaseDate: "2026-05-22",
    type: "feature",
    app: "chat",
    summary:
      "The unofficial API app (WhatFlow Chat Automation) has a new Home page with a dashboard, your WhatsApp connection status, and all feature settings in one place.",
    highlights: [
      "See your connection status and manage it from Home.",
      "All automations are listed with their settings.",
      "The chat button can show a text label and comes in more shapes.",
    ],
  },

  // ─── March 2026 ───────────────────────────────────────────────────────────
  {
    slug: "business-api-core-whatsapp-automations",
    version: "2026.03.28",
    title: "WhatFlow Business API: Core WhatsApp Automations",
    releaseDate: "2026-03-28",
    type: "feature",
    app: "business-api",
    summary:
      "The first WhatFlow Business API features: connect WhatsApp through Meta, design templates in a visual editor, message customers about orders and auto-reply to them.",
    highlights: [
      "Connect your WhatsApp Business account through Meta.",
      "A visual template editor with variables, buttons, headers and a live preview.",
      "Templates sync with Meta, including approval status.",
      "Automatic WhatsApp messages for Shopify order events.",
      "Keyword auto-replies, with tags based on customer replies.",
      "A setup guide that tracks your progress.",
    ],
  },

  // ─── February 2026 and earlier ────────────────────────────────────────────
  {
    slug: "chat-automation-confirmation-modes",
    version: "2026.02.03",
    title: "Unofficial API App: Confirmation Replies Work with Each Connection Type",
    releaseDate: "2026-02-03",
    type: "improvement",
    app: "chat",
    summary:
      "Order confirmation replies are now handled according to how your WhatsApp is connected, with tutorial links to help you set it up.",
    highlights: [
      "Poll replies are processed according to your connection type and confirmation settings.",
      "Tutorial links on settings pages.",
      "Back-in-stock alerts handle errors better and are simpler to set up.",
    ],
  },
  {
    slug: "chat-automation-sku-and-quantity-variables",
    version: "2025.12.29",
    title: "Unofficial API App: SKU, Quantity and Image Options in Order Messages",
    releaseDate: "2025-12-29",
    type: "improvement",
    app: "chat",
    summary:
      "Order confirmations can now include each item's SKU and quantity, and you choose whether order messages include product images.",
    highlights: [
      "New SKU and quantity placeholders.",
      "Turn product images in order messages on or off.",
      "Polls and lists adapt to your connection type.",
    ],
  },
  {
    slug: "chat-automation-fulfillment-message-action",
    version: "2025.12.17",
    title: "Unofficial API App: Send Fulfillment Messages from Shopify Admin",
    releaseDate: "2025-12-17",
    type: "feature",
    app: "chat",
    summary:
      "A new Shopify admin action sends a WhatsApp fulfillment message for an order with one click.",
    highlights: [
      "Send fulfillment updates from the order page.",
      "Uses your saved fulfillment message.",
    ],
  },
  {
    slug: "chat-automation-auto-replies-and-draft-orders",
    version: "2025.12.15",
    title: "Unofficial API App: Auto-Replies for More Message Types and Draft Order Messages",
    releaseDate: "2025-12-15",
    type: "feature",
    app: "chat",
    summary:
      "Auto-replies now respond to more kinds of incoming WhatsApp messages, and you can send messages for Shopify draft orders.",
    highlights: [
      "Auto-replies work with more incoming message types.",
      "Draft order messages can be turned on in message settings.",
      "Abandoned checkout recovery is sent more reliably.",
    ],
  },
  {
    slug: "chat-automation-poll-and-list-confirmations",
    version: "2025.12.02",
    title: "Unofficial API App: Smarter Poll and List Confirmations",
    releaseDate: "2025-12-02",
    type: "feature",
    app: "chat",
    summary:
      "Order confirmations are checked before sending and fall back to a poll automatically when a list can't be used, with consistent order tags.",
    highlights: [
      "Poll and list confirmations are checked before they are sent.",
      "Checks run before sending, with an automatic fallback to a poll.",
      "Consistent order tags for scheduled and confirmed orders.",
      "Store owner notifications check the admin number before sending.",
    ],
    whyItMatters: "One-tap confirmations get more replies than asking customers to type.",
  },
  {
    slug: "chat-automation-fulfillment-and-cancellation-messages",
    version: "2025.11.30",
    title: "Unofficial API App: Faster Fulfillment and Cancellation Messages",
    releaseDate: "2025-11-30",
    type: "improvement",
    app: "chat",
    summary:
      "Fulfillment and cancellation messages are now sent in the background, so they go out faster and a cancellation is only handled once.",
    highlights: [
      "Fulfillment updates are sent from a background queue.",
      "Each cancellation is processed only once.",
      "Order tags can be removed automatically when an order's status changes.",
    ],
  },
  {
    slug: "chat-automation-whatsapp-product-button",
    version: "2025.11.14",
    title: "Unofficial API App: WhatsApp Product Button and a Refreshed Chat Button",
    releaseDate: "2025-11-14",
    type: "feature",
    app: "chat",
    summary:
      "Add a WhatsApp button to product pages with a message you write, and use the refreshed storefront chat button with prefilled messages.",
    highlights: [
      "A product page button that opens WhatsApp with a message about that product.",
      "Prefilled chat messages with placeholders such as the product name.",
      "Updated chat button styles and footer.",
    ],
  },
  {
    slug: "chat-automation-connection-engines",
    version: "2025.11.07",
    title: "Unofficial API App: Choose Your WhatsApp Connection Engine",
    releaseDate: "2025-11-07",
    type: "feature",
    app: "chat",
    summary:
      "Pick between two WhatsApp connection engines, and switch between them from the connection page if one works better for your store.",
    highlights: [
      "Two connection engines to choose from.",
      "Switch engines with a confirmation step, and see what each one supports.",
      "Settings that don't work with your engine are disabled, with a warning.",
      "Messages retry automatically after brief connection problems.",
    ],
  },
];

/**
 * Original linked-account app history, reconstructed from the original repository.
 * Dates reflect recorded commits, not independently verified production deployments.
 * See docs/changelog-history-audit.md for evidence and curation rules.
 */
const originalAppEntries: ChangelogSeedEntry[] = [
  {
    slug: "chat-history-draft-images-and-typing-feedback",
    version: "2025.10.29",
    title: "Unofficial API App: More Reliable Draft Order Images and Typing Feedback",
    releaseDate: "2025-10-29",
    type: "fix",
    app: "chat",
    summary:
      "Draft order follow-ups handle product image formats more reliably, and typing indicators stop more consistently.",
    highlights: [
      "Send draft order images with the correct image format and filename.",
      "Improve contact checks and message error handling.",
      "Stop typing indicators more consistently after a message is prepared.",
    ],
  },
  {
    slug: "chat-history-admin-checkout-and-draft-recovery",
    version: "2025.10.27",
    title: "Unofficial API App: Send Checkout and Draft Order Reminders from Shopify",
    releaseDate: "2025-10-27",
    type: "feature",
    app: "chat",
    summary:
      "Start WhatsApp checkout recovery and draft order follow-ups directly from actions in the Shopify admin.",
    highlights: [
      "Send an abandoned checkout reminder from its Shopify admin action.",
      "Send a WhatsApp follow-up from a Shopify draft order.",
      "Use your configured recovery settings when preparing the message.",
    ],
  },
  {
    slug: "chat-history-send-order-messages-admin-action",
    version: "2025.10.24",
    title: "Unofficial API App: Send Order Messages from the Shopify Admin",
    releaseDate: "2025-10-24",
    type: "feature",
    app: "chat",
    summary:
      "Send WhatsApp order confirmations and notifications directly from a Shopify order action.",
    highlights: [
      "Open the send-order-messages action from an order in Shopify.",
      "Choose an order confirmation or notification message.",
    ],
  },
  {
    slug: "chat-history-confirmation-poll-fallback",
    version: "2025.10.23",
    title: "Unofficial API App: Fallback Handling for Confirmation Polls",
    releaseDate: "2025-10-23",
    type: "fix",
    app: "chat",
    summary:
      "Order confirmations handle poll failures more reliably and validate poll options before sending.",
    highlights: [
      "Use fallback handling when a confirmation poll cannot be sent normally.",
      "Validate confirmation poll options.",
      "Improve errors for unsuccessful confirmation attempts.",
    ],
  },
  {
    slug: "chat-history-chat-button-greetings-and-logos",
    version: "2025.10.22",
    title: "Unofficial API App: Custom Greetings and Better Chat Button Logos",
    releaseDate: "2025-10-22",
    type: "improvement",
    app: "chat",
    summary:
      "Customize the storefront chat greeting and get more consistent logo and visibility settings.",
    highlights: [
      "Set a greeting for the WhatsApp chat button.",
      "Improve logo display and visibility options.",
      "Restore chat button settings and improve customization behavior.",
    ],
  },
  {
    slug: "chat-history-direct-order-button-customization",
    version: "2025.10.17",
    title: "Unofficial API App: Customize Your WhatsApp Direct Order Button",
    releaseDate: "2025-10-17",
    type: "feature",
    app: "chat",
    summary:
      "Style the WhatsApp direct order button and customize the title and message shoppers see.",
    highlights: [
      "Customize button appearance and message content.",
      "Choose whether the order message includes its title and text.",
      "Open the theme editor from setup guidance.",
      "Save or discard unsaved button settings with the Shopify save bar.",
    ],
  },
  {
    slug: "chat-history-stock-widget-feedback-and-flow-lists",
    version: "2025.10.03",
    title: "Unofficial API App: Clearer Stock Sign-Up Feedback and Flow List Guidance",
    releaseDate: "2025-10-03",
    type: "improvement",
    app: "chat",
    summary:
      "The back-in-stock form gives shoppers clearer feedback, and the Flow guide explains list-message actions.",
    highlights: [
      "Show relevant subscription fields dynamically in the back-in-stock form.",
      "Improve form feedback when shoppers sign up.",
      "Follow in-app guidance for sending WhatsApp list messages with Shopify Flow.",
    ],
  },
  {
    slug: "chat-history-cart-whatsapp-order-button",
    version: "2025.09.29",
    title: "Unofficial API App: Start a WhatsApp Order from the Cart",
    releaseDate: "2025-09-29",
    type: "feature",
    app: "chat",
    summary:
      "Shoppers can start an order conversation on WhatsApp directly from their cart.",
    highlights: [
      "Add a WhatsApp ordering button to the cart.",
      "Bring cart details into the WhatsApp ordering conversation.",
    ],
  },
  {
    slug: "chat-history-early-message-usage-dashboard",
    version: "2025.09.24",
    title: "Unofficial API App: See WhatsApp Usage on the Dashboard",
    releaseDate: "2025-09-24",
    type: "feature",
    app: "chat",
    summary:
      "The dashboard shows message usage fetched for your store.",
    highlights: [
      "View WhatsApp usage metrics on the dashboard.",
    ],
  },
  {
    slug: "chat-history-automation-reliability-and-bulk-scheduling",
    version: "2025.09.23",
    title: "Unofficial API App: More Reliable Automations and Bulk Message Scheduling",
    releaseDate: "2025-09-23",
    type: "improvement",
    app: "chat",
    summary:
      "WhatsApp automations retrieve settings more consistently, and bulk sending improves phone-number parsing and scheduling.",
    highlights: [
      "Keep auto-reply and confirmation settings available more reliably.",
      "Improve phone-number parsing and scheduling for bulk messages.",
      "Trim extra spaces when matching confirmation poll responses.",
    ],
  },
  {
    slug: "chat-history-automatic-replies-and-list-responses",
    version: "2025.09.09",
    title: "Unofficial API App: Automatic Replies and Better List Response Handling",
    releaseDate: "2025-09-09",
    type: "feature",
    app: "chat",
    summary:
      "Configure automatic WhatsApp replies and process order confirmation list responses more reliably.",
    highlights: [
      "Configure auto-reply settings in the app.",
      "Update message handling when confirmation mode changes.",
      "Check for duplicate list responses before changing order tags.",
      "Support replies to WhatsApp messages.",
    ],
  },
  {
    slug: "chat-history-confirmation-list-messages",
    version: "2025.09.07",
    title: "Unofficial API App: List Messages for Order Confirmations",
    releaseDate: "2025-09-07",
    type: "feature",
    app: "chat",
    summary:
      "Offer order confirmation choices in a WhatsApp list, with configurable options and optional images.",
    highlights: [
      "Configure confirmation list choices in message settings.",
      "Send confirmation lists and optional product images.",
      "Use typing feedback before sending a message.",
    ],
  },
  {
    slug: "chat-history-stock-alert-delivery-and-positioning",
    version: "2025.09.07",
    title: "Unofficial API App: Back-in-Stock Delivery and Flexible Widget Positioning",
    releaseDate: "2025-09-07",
    type: "improvement",
    app: "chat",
    summary:
      "Restock alerts handle product variants more accurately, and shoppers get a more flexible subscription widget.",
    highlights: [
      "Handle restock events for the relevant product variant.",
      "Look up subscribers for back-in-stock messages.",
      "Customize widget positioning and improve subscription handling.",
    ],
  },
  {
    slug: "chat-history-stop-recovery-on-uninstall",
    version: "2025.08.28",
    title: "Unofficial API App: Stop Recovery Automations When the App Is Uninstalled",
    releaseDate: "2025-08-28",
    type: "fix",
    app: "chat",
    summary:
      "Abandoned checkout and draft order recovery settings are disabled when a store uninstalls the app.",
    highlights: [
      "Disable abandoned checkout recovery on uninstall.",
      "Disable draft order recovery on uninstall.",
      "Show clearer guidance about linking a regular WhatsApp account.",
    ],
  },
  {
    slug: "chat-history-manual-and-event-checkout-recovery",
    version: "2025.08.25",
    title: "Unofficial API App: More Ways to Manage Abandoned Checkout Recovery",
    releaseDate: "2025-08-25",
    type: "feature",
    app: "chat",
    summary:
      "Manage abandoned checkouts manually and use checkout events to start recovery messages with richer checkout details.",
    highlights: [
      "Review abandoned checkouts in a dedicated manual management view.",
      "Process checkout events for automated recovery.",
      "Use expanded checkout settings and message placeholders.",
      "Improve recovery images and typing feedback before messages.",
    ],
  },
  {
    slug: "chat-history-draft-order-recovery-launch",
    version: "2025.08.20",
    title: "Unofficial API App: Recover Draft Orders with Personalized WhatsApp Messages",
    releaseDate: "2025-08-20",
    type: "feature",
    app: "chat",
    summary:
      "Follow up on Shopify draft orders with delayed WhatsApp messages, personalized details and optional product images.",
    highlights: [
      "Configure a draft order recovery message and delay.",
      "Process draft order events and schedule the follow-up.",
      "Interpret customer phone numbers using country information.",
      "Include images in draft order recovery messages.",
    ],
  },
  {
    slug: "chat-history-inclusive-checkout-date-filters",
    version: "2025.08.15",
    title: "Unofficial API App: Checkout Date Filters Include the Whole Selected Range",
    releaseDate: "2025-08-15",
    type: "fix",
    app: "chat",
    summary:
      "Abandoned checkout date filtering includes the selected date range more consistently.",
    highlights: [
      "Normalize dates when fetching abandoned checkouts.",
      "Include checkouts across the full selected date range.",
    ],
  },
  {
    slug: "chat-history-back-in-stock-signup-widget",
    version: "2025.08.13",
    title: "Unofficial API App: Let Shoppers Sign Up for WhatsApp Back-in-Stock Alerts",
    releaseDate: "2025-08-13",
    type: "feature",
    app: "chat",
    summary:
      "Add a storefront widget that lets shoppers request a WhatsApp notification when a product is back in stock.",
    highlights: [
      "Show a back-in-stock subscription widget on product pages.",
      "Collect shopper contact details for restock notifications.",
      "Customize the widget from the app settings.",
    ],
  },
  {
    slug: "chat-history-chat-button-agent-manager",
    version: "2025.08.07",
    title: "Unofficial API App: Manage Agents for the Storefront Chat Button",
    releaseDate: "2025-08-07",
    type: "feature",
    app: "chat",
    summary:
      "Manage the agents shown in your storefront WhatsApp chat experience from the app.",
    highlights: [
      "Add and manage agents using a dedicated agent manager.",
      "Review agent details in compact cards.",
    ],
  },
  {
    slug: "chat-history-order-statistics-and-poll-tag-updates",
    version: "2025.07.28",
    title: "Unofficial API App: Order Statistics and Better Confirmation Tags",
    releaseDate: "2025-07-28",
    type: "improvement",
    app: "chat",
    summary:
      "The dashboard adds order statistics, while confirmation replies update tags and fill in message placeholders more consistently.",
    highlights: [
      "View order statistics from the dashboard.",
      "Match confirmation poll choices to the configured order tags.",
      "Improve placeholder replacement in messages sent after a poll response.",
    ],
  },
  {
    slug: "chat-history-fulfilled-item-message-details",
    version: "2025.07.24",
    title: "Unofficial API App: More Accurate Fulfillment Message Items and Tags",
    releaseDate: "2025-07-24",
    type: "improvement",
    app: "chat",
    summary:
      "Fulfillment messages use the items actually fulfilled and support tags for scheduled sends.",
    highlights: [
      "Limit fulfillment details to fulfilled line items.",
      "Track scheduled fulfillment messages with order tags.",
      "Improve WhatsApp contact matching for fulfillment messages.",
    ],
  },
  {
    slug: "chat-history-chat-button-page-visibility",
    version: "2025.07.21",
    title: "Unofficial API App: Control Where Your WhatsApp Chat Button Appears",
    releaseDate: "2025-07-21",
    type: "feature",
    app: "chat",
    summary:
      "Choose where the storefront WhatsApp button appears and include the current page address in the conversation.",
    highlights: [
      "Set page visibility options for the WhatsApp chat button.",
      "Include the current page address dynamically in the message.",
    ],
  },
  {
    slug: "chat-history-recovery-formatting-and-image-sending",
    version: "2025.07.16",
    title: "Unofficial API App: More Reliable Image Sends and Recovery Message Formatting",
    releaseDate: "2025-07-16",
    type: "fix",
    app: "chat",
    summary:
      "Text and image messages send more consistently, and abandoned checkout messages have cleaner formatting.",
    highlights: [
      "Improve handling of image messages and text-only messages.",
      "Check customer WhatsApp availability before sending order actions.",
      "Improve the formatting of abandoned checkout recovery messages.",
    ],
  },
  {
    slug: "chat-history-order-images-in-messages",
    version: "2025.07.12",
    title: "Unofficial API App: Product Images in Order Confirmations and Notifications",
    releaseDate: "2025-07-12",
    type: "feature",
    app: "chat",
    summary:
      "Add an order product image to confirmation and notification messages.",
    highlights: [
      "Choose whether order confirmations and notifications include an image.",
      "Use product variant images from the order.",
      "Display order information in the accompanying caption.",
    ],
  },
  {
    slug: "chat-history-abandoned-checkout-recovery-launch",
    version: "2025.07.10",
    title: "Unofficial API App: Abandoned Checkout Recovery on WhatsApp",
    releaseDate: "2025-07-10",
    type: "feature",
    app: "chat",
    summary:
      "Find abandoned checkouts and send personalized WhatsApp recovery messages after a configurable delay.",
    highlights: [
      "Fetch abandoned checkouts for a selected date range.",
      "Personalize recovery messages with checkout details and a return-to-checkout link.",
      "Review the recovery queue with pagination and a total count.",
    ],
  },
  {
    slug: "chat-history-csv-bulk-whatsapp-sender",
    version: "2025.07.06",
    title: "Unofficial API App: Send Personalized WhatsApp Messages from a CSV",
    releaseDate: "2025-07-06",
    type: "feature",
    app: "chat",
    summary:
      "Upload a CSV to send personalized text or image messages, with configurable spacing and a message queue.",
    highlights: [
      "Choose the phone-number column and use CSV columns as message placeholders.",
      "Add a fixed image or use an image address from each CSV row.",
      "Set country information and a gap between messages.",
      "Review queued messages and check that recipients are reachable on WhatsApp.",
    ],
  },
  {
    slug: "chat-history-whatsapp-send-validation",
    version: "2025.05.31",
    title: "Unofficial API App: Clearer WhatsApp Send Failures and Phone Validation",
    releaseDate: "2025-05-31",
    type: "fix",
    app: "chat",
    summary:
      "WhatsApp actions check connection status and validate phone numbers more consistently before sending.",
    highlights: [
      "Check that WhatsApp is connected before attempting an action.",
      "Return clearer errors when a send cannot proceed.",
      "Normalize customer phone numbers more consistently across message actions.",
    ],
  },
  {
    slug: "chat-history-multiline-confirmation-polls",
    version: "2025.05.08",
    title: "Unofficial API App: Multiline Confirmation Polls",
    releaseDate: "2025-05-08",
    type: "improvement",
    app: "chat",
    summary:
      "Order confirmation polls can display messages across multiple lines for easier reading.",
    highlights: [
      "Keep line breaks in confirmation poll messages.",
      "Separate order details and confirmation instructions more clearly.",
    ],
  },
  {
    slug: "chat-history-international-phone-support",
    version: "2025.05.04",
    title: "Unofficial API App: Better International Phone Number Handling",
    releaseDate: "2025-05-04",
    type: "improvement",
    app: "chat",
    summary:
      "WhatsApp sending uses country information when interpreting customer phone numbers and checks subscription access more consistently.",
    highlights: [
      "Use country information to interpret phone numbers that lack an international prefix.",
    ],
  },
  {
    slug: "chat-history-early-shopify-flow-guide",
    version: "2025.04.27",
    title: "Unofficial API App: Guidance for Building WhatsApp Automations with Shopify Flow",
    releaseDate: "2025-04-27",
    type: "improvement",
    app: "chat",
    summary:
      "An in-app guide helps merchants set up WhatsApp automations in Shopify Flow and understand sending precautions.",
    highlights: [
      "Open the Flow guide from the app home page.",
      "Follow setup steps for WhatsApp actions and automation templates.",
      "Read guidance on spacing messages and avoiding unwanted messages.",
    ],
  },
  {
    slug: "chat-history-storefront-whatsapp-chat-button",
    version: "2025.04.12",
    title: "Unofficial API App: Add a Customizable WhatsApp Chat Button to Your Store",
    releaseDate: "2025-04-12",
    type: "feature",
    app: "chat",
    summary:
      "Customers can start a WhatsApp conversation from a storefront chat button that you configure in WhatFlow.",
    highlights: [
      "Enable a WhatsApp chat button on your storefront.",
      "Customize its appearance and behavior from the app.",
      "Control the button with storefront settings and an on/off switch.",
    ],
  },
  {
    slug: "chat-history-customer-and-admin-order-notifications",
    version: "2025.04.05",
    title: "Unofficial API App: New Order Notifications for Customers and Your Team",
    releaseDate: "2025-04-05",
    type: "feature",
    app: "chat",
    summary:
      "Send order notifications without a confirmation poll, and notify multiple team members on WhatsApp when a new order arrives.",
    highlights: [
      "Send customers a plain order notification without asking for confirmation.",
      "Choose customer recipients by payment status and set a notification delay.",
      "Notify multiple admin WhatsApp numbers about new orders.",
      "Customize customer and admin messages and their order tags.",
    ],
  },
  {
    slug: "chat-history-normalized-confirmation-responses",
    version: "2025.04.02",
    title: "Unofficial API App: More Consistent Confirmation Response Matching",
    releaseDate: "2025-04-02",
    type: "fix",
    app: "chat",
    summary:
      "Confirmation poll replies are normalized more consistently so customer choices match the configured responses.",
    highlights: [
      "Normalize incoming poll choices before matching them to confirmation settings.",
      "Improve message handling when response text differs in formatting.",
    ],
  },
  {
    slug: "chat-history-fulfillment-and-cancellation-automation",
    version: "2025.03.29",
    title: "Unofficial API App: WhatsApp Fulfillment and Cancellation Messages",
    releaseDate: "2025-03-29",
    type: "feature",
    app: "chat",
    summary:
      "Send customizable WhatsApp messages when orders are fulfilled or cancelled, with optional delays.",
    highlights: [
      "Enable separate fulfillment and cancellation messages.",
      "Personalize each message using order details.",
      "Send immediately or choose a delay in minutes.",
      "Use order tags to track message handling.",
    ],
  },
  {
    slug: "chat-history-scheduled-order-confirmations",
    version: "2025.03.27",
    title: "Unofficial API App: Choose When Order Confirmations Are Sent",
    releaseDate: "2025-03-27",
    type: "feature",
    app: "chat",
    summary:
      "Set a delay before sending an order confirmation and track scheduled confirmations with order tags.",
    highlights: [
      "Choose a confirmation delay in minutes, or send immediately with a delay of zero.",
      "Schedule confirmation messages instead of sending every message as soon as the order arrives.",
      "Manage order tags as confirmations are scheduled and answered.",
    ],
  },
  {
    slug: "chat-history-confirmation-settings-editor",
    version: "2025.03.24",
    title: "Unofficial API App: A Dedicated Order Confirmation Editor",
    releaseDate: "2025-03-24",
    type: "improvement",
    app: "chat",
    summary:
      "Order confirmation settings get a dedicated editor with clearer validation, loading feedback and protection for unsaved changes.",
    highlights: [
      "Edit confirmation messages, response choices, tags and payment-status recipients in one place.",
      "See validation and loading feedback when saving.",
      "Use the Shopify save bar to save or discard unsaved changes.",
      "Get clearer feedback when WhatsApp is disconnected.",
    ],
  },
  {
    slug: "chat-history-confirmation-item-details",
    version: "2025.03.19",
    title: "Unofficial API App: Clearer Product Details and Fulfilled Order Checks",
    releaseDate: "2025-03-19",
    type: "improvement",
    app: "chat",
    summary:
      "Confirmation processing includes better product details and skips orders that have already been fulfilled.",
    highlights: [
      "Retrieve and validate order item details for confirmation messages.",
      "Skip already fulfilled orders when checking whether a confirmation is needed.",
      "Improve order detail placeholders and their guidance.",
    ],
  },
  {
    slug: "chat-history-order-age-filtering",
    version: "2025.02.11",
    title: "Unofficial API App: Order Age Checks Before Sending Confirmations",
    releaseDate: "2025-02-11",
    type: "improvement",
    app: "chat",
    summary:
      "Order processing checks timing and handles missing details more carefully before sending a confirmation.",
    highlights: [
      "Apply time-based checks when processing orders.",
      "Handle unavailable order details more carefully to avoid failed confirmation attempts.",
    ],
  },
  {
    slug: "chat-history-detailed-address-placeholders",
    version: "2025.02.10",
    title: "Unofficial API App: More Customer Name and Address Placeholders",
    releaseDate: "2025-02-10",
    type: "feature",
    app: "chat",
    summary:
      "Order confirmation messages can include more detailed customer names and address information.",
    highlights: [
      "Personalize confirmation messages with separate customer name and address details.",
      "Include more of the order address without writing it into every message manually.",
    ],
  },
  {
    slug: "chat-history-confirmation-order-matching",
    version: "2025.01.26",
    title: "Unofficial API App: More Accurate Order Matching and Personalized Replies",
    releaseDate: "2025-01-26",
    type: "fix",
    app: "chat",
    summary:
      "Confirmation replies match Shopify orders more reliably and fill in order details more consistently.",
    highlights: [
      "Validate the order number extracted from confirmation polls.",
      "Retrieve order details and tags together when handling a reply.",
      "Use order placeholders in confirmation response messages more consistently.",
      "Improve customer phone lookup across order and address fields.",
    ],
  },
  {
    slug: "chat-history-early-dashboard-loading",
    version: "2025.01.01",
    title: "Unofficial API App: Faster Dashboard Loading and Clearer Confirmation Settings",
    releaseDate: "2025-01-01",
    type: "improvement",
    app: "chat",
    summary:
      "The dashboard loads charts and images more efficiently, and confirmation settings are grouped more clearly.",
    highlights: [
      "Load dashboard pages and images more efficiently.",
      "Show chart loading states while data is being prepared.",
      "Group confirmation choices, response tags and recipient settings more clearly.",
    ],
  },
  {
    slug: "chat-history-confirmation-phone-and-connection-checks",
    version: "2024.12.31",
    title: "Unofficial API App: Better Customer Phone Lookup and Connection Checks",
    releaseDate: "2024-12-31",
    type: "fix",
    app: "chat",
    summary:
      "Confirmations use billing and shipping phone details more consistently and check that WhatsApp is connected before sending.",
    highlights: [
      "Look up missing customer phone numbers from Shopify order addresses.",
      "Prefer billing contact details and fall back to shipping details.",
      "Skip confirmation sending when the WhatsApp connection is inactive.",
    ],
  },
  {
    slug: "chat-history-confirmation-contact-checks",
    version: "2024.12.19",
    title: "Unofficial API App: More Reliable Confirmation Contacts and Replies",
    releaseDate: "2024-12-19",
    type: "fix",
    app: "chat",
    summary:
      "Order confirmations check customer WhatsApp availability more reliably, and replies are matched to their original confirmation message.",
    highlights: [
      "Check whether a customer can be reached on WhatsApp before sending.",
      "Retrieve the original confirmation message when processing a poll response.",
    ],
  },
  {
    slug: "chat-history-first-order-confirmation-history",
    version: "2024.12.18",
    title: "Unofficial API App: Order Confirmation Polls, Replies and Tags",
    releaseDate: "2024-12-18",
    type: "feature",
    app: "chat",
    summary:
      "The unofficial API app launched in October 2024. Our preserved release history starts in December, with WhatsApp order confirmation polls, replies and order tags.",
    highlights: [
      "Link a WhatsApp account and send customers a poll asking them to confirm or cancel an order.",
      "Customize confirmation messages, poll options, response messages and order tags.",
      "Choose recipients by payment status and see confirmation statistics on the dashboard.",
    ],
  },
];

/**
 * Detailed Team Inbox milestones, audited against the Inbox repository.
 * Extends existing umbrella releases without replacing their slugs or CMS edits.
 * Evidence, rollout qualifications and coverage: docs/inbox-changelog-audit.md.
 */
const inboxHistoryEntries: ChangelogSeedEntry[] = [
  {
    slug: "team-inbox-typing-and-unread-triage",
    version: "2026.11.03",
    title: "Team Inbox: Teammate Typing Warnings and Unread Markers",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary: "See when a teammate is drafting a reply, claim unassigned chats and jump to the first unread message.",
    highlights: [
      "Show a teammate typing warning to reduce overlapping replies.",
      "Claim and reply to an unassigned conversation from the chat.",
      "Use an unread divider to jump to the first unread message.",
      "Show unsent reply drafts in conversation rows."
    ]
  },
  {
    slug: "team-inbox-chat-search-and-shortcuts",
    version: "2026.11.03",
    title: "Team Inbox: Search Chat History and Navigate with Shortcuts",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary: "Find conversations by customer or message text, search inside a chat and move around the Inbox with keyboard shortcuts.",
    highlights: [
      "Open global search to find chats by name, number or message text as well as app pages.",
      "Search inside a conversation, load older history to locate matches and highlight results.",
      "Move between chats with keyboard shortcuts and open the shortcut reference.",
      "Remember conversation filters and scroll position for the current browser tab."
    ]
  },
  {
    slug: "team-inbox-personalized-responses-and-drafts",
    version: "2026.11.03",
    title: "Team Inbox: Personalized Canned Responses and Saved Reply Drafts",
    releaseDate: "2026-11-03",
    type: "improvement",
    app: "business-api",
    summary: "Canned responses fill in customer and agent details, while saved drafts and a character counter make longer replies easier to finish.",
    highlights: [
      "Fill in customer name, full name, phone, agent and store placeholders in canned responses.",
      "Select remaining placeholders so you can replace them before sending.",
      "Show a character counter near the WhatsApp text-message limit.",
      "Indicate when a reply draft is saved on your current device."
    ]
  },
  {
    slug: "team-inbox-delivery-status-and-retry",
    version: "2026.11.03",
    title: "Team Inbox: Clearer Message Status and Send Errors",
    releaseDate: "2026-11-03",
    type: "improvement",
    app: "business-api",
    summary: "Open a message status for a plain-language explanation and see practical next steps when WhatsApp rejects a message.",
    highlights: [
      "Open delivery ticks to see the message status in words.",
      "Show readable explanations for common WhatsApp send errors.",
      "Offer a retry action for eligible failed messages."
    ]
  },
  {
    slug: "team-inbox-template-copy-and-resubmit",
    version: "2026.11.03",
    title: "Team Inbox: Fix Rejected Templates and Copy Approved Ones",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary: "See why a WhatsApp template was rejected, start a revised submission or copy an approved template to make a new version.",
    highlights: [
      "Show the rejection reason on a template card.",
      "Use Fix and resubmit to open an editable version of a rejected template.",
      "Use Copy and edit to start from an approved template.",
      "Review broadcast reach, estimated send duration and template category before launching."
    ]
  },
  {
    slug: "team-inbox-media-viewer-and-downloads",
    version: "2026.11.03",
    title: "Team Inbox: Photo Viewer and Multiple Media Downloads",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary: "Browse shared photos in a keyboard-accessible viewer and select several media files to download.",
    highlights: [
      "Open photos in a viewer with previous and next controls and an image counter.",
      "Download a photo or close the viewer with Escape.",
      "Use Select mode to download several shared files.",
      "Reach media gallery tiles with the keyboard."
    ]
  },
  {
    slug: "team-inbox-accessibility-and-feedback",
    version: "2026.11.03",
    title: "Team Inbox: Clearer Contrast, Keyboard Focus and Mobile Feedback",
    releaseDate: "2026-11-03",
    type: "improvement",
    app: "business-api",
    summary: "The Inbox is easier to read and operate with a keyboard or phone, with clearer connection feedback and fewer interrupting dialogs.",
    highlights: [
      "Improve text contrast, field labels and names for icon buttons and switches.",
      "Respect reduced-motion preferences and show keyboard focus more consistently.",
      "Use brief notifications for successful actions, with Undo for eligible response or label deletions.",
      "Show clearer offline and reconnect messages, unread navigation badges and mobile swipe actions."
    ]
  },
  {
    slug: "team-inbox-webhook-delivery-management",
    version: "2026.11.03",
    title: "Team Inbox: Webhook Delivery Logs, Tests and Retries",
    releaseDate: "2026-11-03",
    type: "feature",
    app: "business-api",
    summary: "Manage webhook destinations from the Inbox, choose event types and inspect delivery attempts when an integration needs attention.",
    highlights: [
      "Add destinations and choose which Inbox events each receives.",
      "Send a test event and inspect recent delivery status, errors and attempts.",
      "Retry failed deliveries from the log and pause or resume a destination.",
      "Rotate the signing secret with a transition period for updating your receiver."
    ]
  },
  {
    slug: "team-inbox-voice-playback-and-seeking",
    version: "2026.11.02",
    title: "Team Inbox: Voice Playback, Seeking and Retry Fixed",
    releaseDate: "2026-11-02",
    type: "fix",
    app: "business-api",
    summary: "Voice messages show accurate playback progress, support seeking and offer retry or download when a recording cannot play.",
    highlights: [
      "Keep play, pause and progress indicators in sync with actual playback.",
      "Seek within supported voice messages and change playback speed.",
      "Reset the player when switching recordings and handle interrupted playback.",
      "Retry or download a recording after playback fails, with more reliable loading of long audio."
    ]
  },
  {
    slug: "team-inbox-coexistence-history-import-fix",
    version: "2026.10.31",
    title: "Team Inbox: More Reliable WhatsApp Business History Import",
    releaseDate: "2026-10-31",
    type: "fix",
    app: "business-api",
    summary: "Importing conversation history from the WhatsApp Business app handles message dates more reliably.",
    highlights: [
      "Fix date handling when saving imported chat history.",
      "Keep recent conversations from the phone app available in the Team Inbox when using coexistence."
    ]
  },
  {
    slug: "team-inbox-ai-draft-review",
    version: "2026.10.27",
    title: "Team Inbox: Review AI-Drafted Replies Before Sending",
    releaseDate: "2026-10-27",
    type: "feature",
    app: "business-api",
    summary: "Connected AI assistants can prepare WhatsApp replies for your team to review, edit, send or discard in the Inbox.",
    highlights: [
      "Keep message drafts in a review queue within the conversation.",
      "Edit a plain-text draft before approving it, or discard it.",
      "Agent connections use draft review; admins control whether a connection can send directly.",
      "Check conversation ownership and messaging-window rules again when a person approves a send."
    ]
  },
  {
    slug: "team-inbox-ai-inbox-tools",
    version: "2026.10.27",
    title: "Team Inbox: AI Tools for Labels, Notes and Broadcast Drafts",
    releaseDate: "2026-10-27",
    type: "feature",
    app: "business-api",
    summary: "Connected AI tools can help organize conversations, find products and prepare broadcast drafts with the permissions you grant.",
    highlights: [
      "Search conversations and message history from a connected AI tool.",
      "Apply labels, add internal notes and manage assignments within the connected user permissions.",
      "Search the store catalog for products.",
      "Create a broadcast draft for a person to review, choose its audience and launch from the Inbox."
    ]
  },
  {
    slug: "team-inbox-first-login-password-fix",
    version: "2026.10.22",
    title: "Team Inbox: First-Time Agent Password Setup Fixed",
    releaseDate: "2026-10-22",
    type: "fix",
    app: "business-api",
    summary: "New agents now see clear password setup instructions and enter the Inbox automatically after replacing their initial password.",
    highlights: [
      "Show a dedicated password setup screen instead of a failed-settings message.",
      "Wait to load conversations and connect live updates until setup is complete.",
      "Open the Inbox after the new password is saved.",
      "Explain expired sessions and failed settings requests more clearly."
    ]
  },
  {
    slug: "team-inbox-shopify-contact-sync",
    version: "2026.10.14",
    title: "Team Inbox: Shopify Contact Sync and Customer Privacy Requests",
    releaseDate: "2026-10-14",
    type: "feature",
    app: "business-api",
    summary: "Import customer contact details from Shopify, follow sync progress and refresh existing contacts without creating duplicate phone records.",
    highlights: [
      "Start a Shopify customer sync from Contacts and see progress and completion.",
      "Bring in customer names, email addresses, tags, order counts and spending details when available.",
      "Refresh an existing phone contact when you run the sync again.",
      "Apply customer privacy redaction to matching Inbox contact data."
    ]
  },
  {
    slug: "team-inbox-workflow-trigger-options",
    version: "2026.09.30",
    title: "Team Inbox: More Workflow Trigger Controls",
    releaseDate: "2026-09-30",
    type: "improvement",
    app: "business-api",
    summary: "Choose how your tools trigger an Inbox workflow and manage its access from the workflow settings.",
    highlights: [
      "Connect an external integration with a workflow API key or an allowed website origin.",
      "Explicitly choose open access when an integration needs a keyless webhook.",
      "Pause a workflow to stop new runs and prevent later sends in waiting runs.",
      "Rotate or disable trigger access from the workflow settings."
    ]
  },
  {
    slug: "team-inbox-owner-and-agent-access",
    version: "2026.09.17",
    title: "Team Inbox: Owner Controls, Agent Accounts and Chat Ownership",
    releaseDate: "2026-09-17",
    type: "feature",
    app: "business-api",
    summary: "Create separate agent accounts, claim conversations and manage assignments from the store owner account.",
    highlights: [
      "Owners create agent usernames and initial passwords without requiring an email address.",
      "Agents replace their initial password before accessing the live Inbox.",
      "Claim an unassigned chat or release your own; owners can reassign chats to another teammate.",
      "Disabling an agent revokes their access and releases their conversations for the team."
    ]
  },
  {
    slug: "team-inbox-private-note-drafts",
    version: "2026.09.17",
    title: "Team Inbox: Private Notes with Message References",
    releaseDate: "2026-09-17",
    type: "feature",
    app: "business-api",
    summary: "Leave internal notes in a conversation, quote the message they refer to and keep note drafts separate from customer replies.",
    highlights: [
      "Switch the composer between Reply and Private note.",
      "Attach a reference to an existing message; saved notes show their author and time.",
      "Add notes even after the customer reply window closes or the WhatsApp number disconnects.",
      "Keep separate reply and note drafts; private notes never send a customer message."
    ]
  },
  {
    slug: "team-inbox-workflow-builder",
    version: "2026.09.17",
    title: "Team Inbox: Build and Test API-Triggered Workflows",
    releaseDate: "2026-09-17",
    type: "feature",
    app: "business-api",
    summary: "Build Inbox workflows with messages, decisions and waits, then trigger them from your own systems.",
    highlights: [
      "Connect text sends, approved-template sends, decisions and wait steps in the workflow editor.",
      "Use input variables to personalize messages and choose decision branches.",
      "Simulate a workflow without sending messages and inspect the recorded step path.",
      "Activate, pause and review runs with their outcomes; sending still follows the customer service window."
    ]
  },
  {
    slug: "team-inbox-conversation-starters",
    version: "2026.09.15",
    title: "Team Inbox: WhatsApp Conversation Starters and Commands",
    releaseDate: "2026-09-15",
    type: "feature",
    app: "business-api",
    summary: "Manage the suggested questions and customer-facing slash commands shown for your WhatsApp number from the Inbox.",
    highlights: [
      "Set up to four conversation starter prompts for customers.",
      "Configure customer-facing commands and their descriptions.",
      "Preview and save changes, then read the saved settings back from WhatsApp.",
      "Store admins manage the settings; teammates can view them."
    ]
  },
  {
    slug: "team-inbox-message-reactions",
    version: "2026.09.15",
    title: "Team Inbox: React to Messages with Emoji",
    releaseDate: "2026-09-15",
    type: "feature",
    app: "business-api",
    summary: "Add, change or remove a WhatsApp reaction on a message and see customer reactions alongside the original message.",
    highlights: [
      "Choose an emoji from the message toolbar.",
      "Choose the same reaction again to remove it.",
      "See customer and business-number reactions separately beneath the message.",
      "Copy complete message text or select just the part you need."
    ]
  },
  {
    slug: "team-inbox-labels-and-filtering",
    version: "2026.09.15",
    title: "Team Inbox: Color Labels and Conversation Filters",
    releaseDate: "2026-09-15",
    type: "feature",
    app: "business-api",
    summary: "Organize conversations with shared color labels and combine label filters with search and conversation tabs.",
    highlights: [
      "Admins create a shared library of label names and colors.",
      "Teammates apply several labels to a conversation from its contact details.",
      "Filter by a label or find conversations that have no label.",
      "Keep label changes visible across teammates and connected store numbers."
    ]
  },
  {
    slug: "team-inbox-canned-response-library",
    version: "2026.09.15",
    title: "Team Inbox: Shared Canned Responses with Slash Shortcuts",
    releaseDate: "2026-09-15",
    type: "feature",
    app: "business-api",
    summary: "Save common answers in a shared response library and insert them into a draft with a slash shortcut.",
    highlights: [
      "Admins manage response titles, shortcuts and message text.",
      "Type a slash in the composer to search by title, shortcut or message.",
      "Use the keyboard to select a response and edit it before sending.",
      "Keep the surrounding draft text when inserting an answer at the cursor."
    ]
  },
  {
    slug: "team-inbox-typed-customer-fields",
    version: "2026.09.15",
    title: "Team Inbox: Custom Fields for Contacts and Conversations",
    releaseDate: "2026-09-15",
    type: "feature",
    app: "business-api",
    summary: "Save structured customer details as text, numbers, dates, checkboxes or dropdown choices inside the Inbox.",
    highlights: [
      "Admins define optional custom fields for contacts or individual conversations.",
      "Contact fields follow the same phone number across your store numbers; conversation fields stay with one chat.",
      "Teammates can update values in the contact drawer.",
      "Keep unsaved edits when a request fails and receive a notice when another teammate changes saved values."
    ]
  },
  {
    slug: "team-inbox-broadcast-audiences-and-scheduling",
    version: "2026.09.14",
    title: "Team Inbox: Spreadsheet Audiences and Scheduled Broadcasts",
    releaseDate: "2026-09-14",
    type: "feature",
    app: "business-api",
    summary: "Build a broadcast audience from a CSV, Excel file or existing conversations, personalize template fields and schedule the send.",
    highlights: [
      "Upload a CSV or Excel file and map its columns to phone numbers and template variables.",
      "Choose existing conversations as the audience, including selected customer numbers.",
      "Preview the template and send a test before launching.",
      "Send immediately or choose a later date and time."
    ]
  },
  {
    slug: "team-inbox-broadcast-reports-and-controls",
    version: "2026.09.14",
    title: "Team Inbox: Broadcast Reports, Pause and Retry",
    releaseDate: "2026-09-14",
    type: "feature",
    app: "business-api",
    summary: "Track broadcast delivery for each recipient, export results and manage sends without rebuilding the broadcast.",
    highlights: [
      "See sent, delivered, read and failed recipient counts and rates.",
      "Filter recipient results and export a CSV report.",
      "Pause or resume a broadcast and retry failed recipients.",
      "Duplicate a broadcast for another send or cancel a scheduled launch."
    ]
  },
  {
    slug: "team-inbox-stickers-and-voice-recording",
    version: "2026.09.09",
    title: "Team Inbox: Better Stickers and Voice Recordings",
    releaseDate: "2026-09-09",
    type: "fix",
    app: "business-api",
    summary: "Stickers display more reliably, and voice recording and media validation better match supported WhatsApp formats.",
    highlights: [
      "Receive and display WhatsApp stickers in conversations.",
      "Improve validation before sending media.",
      "Use more suitable audio recording formats for WhatsApp voice messages."
    ]
  }
];

export const CHANGELOG_SEED: ChangelogSeedEntry[] = [...entries, ...earlierEntries, ...originalAppEntries, ...inboxHistoryEntries].sort((a, b) =>
  a.releaseDate === b.releaseDate ? 0 : a.releaseDate < b.releaseDate ? 1 : -1,
);

/** Store dates at midday UTC so the calendar day never shifts with time zones. */
export function releaseDateToISO(date: string): string {
  return `${date}T12:00:00.000Z`;
}
