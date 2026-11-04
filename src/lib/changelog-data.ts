/**
 * Curated WhatFlow release notes.
 *
 * Written for merchants from the Business API (Official), Chat Automation
 * and Team Inbox release history. Plain language only: no source code,
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
  "business-api": "Business API",
  chat: "Chat Automation",
  ai: "WhatFlow AI",
};

export const CHANGELOG_APP_FULL_NAMES: Record<ChangelogApp, string> = {
  all: "WhatFlow Business API and WhatFlow Chat Automation",
  "business-api": "WhatFlow Business API (official Meta Cloud API app)",
  chat: "WhatFlow Chat Automation",
  ai: "WhatFlow AI",
};

/** Earliest date covered by the curated history. */
export const CHANGELOG_HISTORY_START = "2026-08-27";

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
      "Business API: create and edit WhatsApp message templates by describing what you need.",
      "Chat Automation: Sidekick can work with all your app settings and sends, and shows buttons that open the right WhatFlow page.",
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
      "Chat Automation queues bulk manual messages and sends them in steady batches.",
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
    title: "Chat Automation: New Home, Quick Toggles and Setup Guide",
    releaseDate: "2026-10-13",
    type: "feature",
    app: "chat",
    summary:
      "WhatFlow Chat Automation has a redesigned Home with quick on/off toggles for every feature and a step-by-step setup guide.",
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
    title: "Chat Automation: Automations Pause When WhatsApp Disconnects",
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
    title: "Chat Automation: Order Actions with Previews and Paced Broadcasts",
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
    title: "Chat Automation Rebuilt on a Faster WhatsApp Engine",
    releaseDate: "2026-10-05",
    type: "improvement",
    app: "chat",
    summary:
      "WhatFlow Chat Automation now runs on a new WhatsApp engine and faster infrastructure. The interface stays the same, and your settings carried over.",
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

export const CHANGELOG_SEED: ChangelogSeedEntry[] = [...entries].sort((a, b) =>
  a.releaseDate === b.releaseDate ? 0 : a.releaseDate < b.releaseDate ? 1 : -1,
);

/** Store dates at midday UTC so the calendar day never shifts with time zones. */
export function releaseDateToISO(date: string): string {
  return `${date}T12:00:00.000Z`;
}
