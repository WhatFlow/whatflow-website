/**
 * Help-center table of contents. Each page's body lives in src/content/docs/<slug>.mdx;
 * its title and description live here so the sidebar, search, metadata and
 * prev/next links all read from one place.
 */

export type DocPage = {
	slug: string;
	title: string;
	description: string;
	/** Extra words people search for that the page may not use in its title. */
	keywords?: string[];
	/** Link to a page that is not an MDX article (for example /docs/mcp). */
	href?: string;
};

export type DocGroup = {
	title: string;
	pages: DocPage[];
};

export const DOCS_NAV: DocGroup[] = [
	{
		title: "Get started",
		pages: [
			{ slug: "introduction", title: "Introduction", description: "What WhatFlow does for a Shopify store, and how the pieces fit together.", keywords: ["overview", "what is whatflow"] },
			{ slug: "getting-started/install", title: "Install WhatFlow", description: "Install WhatFlow from the Shopify App Store, find your way around Home and the app menu, and choose a plan.", keywords: ["install", "app store", "home screen", "setup guide", "navigation", "subscription"] },
			{ slug: "getting-started/connect-whatsapp", title: "Connect WhatsApp", description: "Connect your WhatsApp business number with Meta's sign-up window, and manage it on the Connections page.", keywords: ["embedded signup", "connect with facebook", "two-step verification pin", "display name", "waba", "coexistence"] },
			{ slug: "getting-started/quickstart", title: "Quickstart", description: "Connect, choose a plan, turn on order confirmation and send a test order to your own phone.", keywords: ["first message", "test order", "order confirmation", "starter template", "order tags"] },
			{ slug: "getting-started/whatsapp-basics", title: "WhatsApp rules to know", description: "Templates, the 24-hour window, message categories, opt-in and quality rating.", keywords: ["24 hour window", "customer service window", "opt in", "quality rating", "marketing", "utility"] },
		],
	},
	{
		title: "Templates",
		pages: [
			{ slug: "templates/overview", title: "Message templates", description: "How templates work, Meta approval and statuses, categories, the library, and editing or deleting templates.", keywords: ["approval", "rejected", "template library", "trigger event", "quality", "categories"] },
			{ slug: "templates/editor", title: "Template editor and variables", description: "Every field in the template editor: variables per event, buttons, headers and media limits, footer and submitting.", keywords: ["variables", "personalization", "buttons", "header image", "footer", "rejection"] },
		],
	},
	{
		title: "Order automations",
		pages: [
			{ slug: "automations/order-confirmation", title: "Order confirmation", description: "Ask customers to confirm or cancel each new order on WhatsApp, with tags, reminders and delivery tracking.", keywords: ["order confirmation", "confirm order", "delivery tags", "failure tags", "reminders", "follow-up"] },
			{ slug: "automations/cod-verification", title: "COD confirmation", description: "Verify cash on delivery orders with Confirm and Cancel buttons or a one-time code, then act on the tags.", keywords: ["cod", "cash on delivery", "confirm cancel buttons", "fake orders", "order canceled tag", "rto"] },
			{ slug: "automations/cod-checkout", title: "COD fees and checkout rules", description: "Charge a COD fee through a linked shipping rate and hide Cash on Delivery at checkout with rules.", keywords: ["cod fee", "cash on delivery", "payment customization", "hide cod", "shipping rate", "checkout rules"] },
			{ slug: "automations/otp-verification", title: "OTP verification", description: "Customers confirm orders on the Thank you page with a 6-digit code sent to their WhatsApp.", keywords: ["otp", "one-time code", "thank you page", "authentication template", "verify order"] },
			{ slug: "automations/order-updates", title: "Paid, cancelled and other order messages", description: "Order Notification, Order Paid, Order Fulfillment, Order Cancellation and Admin Notification: what each sends.", keywords: ["order notification", "order paid", "fulfillment message", "cancellation", "admin alert", "team numbers"] },
			{ slug: "automations/shipping-updates", title: "Shipping updates", description: "Send a WhatsApp message at each of 11 shipping steps, from label purchased to delivered.", keywords: ["shipping journey", "tracking", "out for delivery", "delivered", "fulfillment events", "carrier"] },
			{ slug: "automations/review-requests", title: "Review requests", description: "Ask for a product review on WhatsApp after delivery, fulfillment, payment or order, once per order.", keywords: ["reviews", "review request", "star rating", "judge.me", "ugc"] },
			{ slug: "automations/back-in-stock", title: "Back in stock alerts", description: "Let shoppers ask for a WhatsApp alert on sold-out products and message them when the variant is restocked.", keywords: ["back in stock", "restock alert", "notify me", "out of stock", "waitlist"] },
		],
	},
	{
		title: "Recovery",
		pages: [
			{ slug: "recovery/abandoned-checkout", title: "Abandoned checkout", description: "Send up to 3 WhatsApp reminders to customers who leave checkout without ordering.", keywords: ["abandoned cart", "abandoned checkout", "cart recovery", "reminders", "discount code"] },
			{ slug: "recovery/draft-orders", title: "Draft order recovery", description: "Remind customers on WhatsApp to pay a draft order invoice, with up to 3 reminders.", keywords: ["draft order", "invoice", "payment reminder", "draft order recovery"] },
		],
	},
	{
		title: "Conversations",
		pages: [
			{ slug: "inbox/overview", title: "Live Inbox", description: "Turn on the shared WhatsApp inbox, open it from Shopify, and find your way around chats.", keywords: ["live inbox", "shared inbox", "turn on inbox", "direct link", "24-hour window", "ai drafts"] },
			{ slug: "inbox/replying", title: "Replying to customers", description: "Send text, media, templates, buttons, products and checkout links, and see the customer's latest Shopify orders.", keywords: ["composer", "canned responses", "quick replies", "interactive message", "checkout link", "undo send"] },
			{ slug: "inbox/organising", title: "Assign, label and note", description: "Assign chats, mark them done, add labels, notes and attributes, set follow-ups and save views.", keywords: ["assign", "claim", "labels", "private notes", "follow-ups", "saved views"] },
			{ slug: "inbox/team", title: "Team members and roles", description: "Create agent logins, see what owners and agents can do, and sign in with a username.", keywords: ["agents", "roles", "permissions", "team login", "password", "seats"] },
			{ slug: "inbox/broadcasts", title: "Inbox broadcasts", description: "Send an approved template to many customers from Live Inbox, schedule it, and track delivery and clicks.", keywords: ["broadcast wizard", "whatsapp-opt-in", "schedule broadcast", "csv audience", "broadcast report"] },
			{ slug: "inbox/automation", title: "Workflows, Flows and webhooks", description: "Workflows, WhatsApp Flows forms, webhooks, icebreakers and commands, and automatic replies to carts.", keywords: ["workflows", "whatsapp flows", "webhooks", "icebreakers", "commands", "cart reply"] },
			{ slug: "inbox/reports", title: "Inbox reports", description: "First response time, team activity, busiest hours and click-to-WhatsApp ad attribution.", keywords: ["reports", "first response time", "team performance", "ad attribution", "click-to-whatsapp"] },
			{ slug: "inbox/settings", title: "Inbox settings and shortcuts", description: "Push notifications, chat preferences, keyboard shortcuts, number health and installing the inbox on your phone.", keywords: ["push notifications", "keyboard shortcuts", "install app", "home screen", "quality rating", "preferences"] },
			{ slug: "conversations/auto-replies", title: "Auto-replies", description: "Answer common WhatsApp questions instantly with keyword rules: match types, starter replies, reply types and rule order.", keywords: ["auto-reply", "keyword rules", "auto replier", "opening hours", "regex", "faq"] },
			{ slug: "conversations/manual-messaging", title: "Manual messages", description: "Message customers by hand from Shopify admin, with the WhatsApp Message Block or the Send WhatsApp template actions.", keywords: ["manual send", "admin block", "wa.me", "send whatsapp confirmation", "bulk send", "more actions"] },
		],
	},
	{
		title: "Marketing",
		pages: [
			{ slug: "marketing/broadcasts", title: "Broadcasts", description: "Send an approved template to selected customers or a segment from Shopify admin, then track it in Broadcast Queue.", keywords: ["broadcast", "customer segment", "bulk whatsapp", "broadcast queue", "campaign", "retry failed"] },
		],
	},
	{
		title: "Storefront",
		pages: [
			{ slug: "storefront/chat-button", title: "WhatsApp chat button", description: "Add a floating WhatsApp chat button to your store and set its number, look and prefilled message.", keywords: ["chat button", "app embed", "wa.me", "theme editor", "prefilled message", "floating button"] },
			{ slug: "storefront/theme-blocks", title: "Storefront and checkout blocks", description: "The Order via WhatsApp, Stock Notification and OTP order confirmation blocks for your store and checkout.", keywords: ["order via whatsapp", "stock notification", "thank you page", "otp block", "theme blocks"] },
		],
	},
	{
		title: "Integrations",
		pages: [
			{ slug: "integrations/shopify-flow", title: "Shopify Flow", description: "WhatsApp actions and triggers for Shopify Flow: send templates and media, react to replies, buttons and opt-outs.", keywords: ["shopify flow", "send whatsapp template", "triggers", "order reply", "judge.me", "body variable"] },
			{ slug: "integrations/sidekick", title: "Shopify Sidekick", description: "Ask Shopify Sidekick about your WhatFlow setup and templates, and let it draft template wording.", keywords: ["sidekick", "shopify ai", "setup health", "template rejected", "generate with ai"] },
			{ slug: "integrations/ai-apps", title: "Claude, ChatGPT and Cursor (MCP)", description: "Connect an AI app to your inbox and store.", href: "/docs/mcp", keywords: ["mcp", "claude", "chatgpt", "cursor", "api key"] },
		],
	},
	{
		title: "Account",
		pages: [
			{ slug: "account/analytics", title: "Analytics", description: "Delivery, read and button rates, template performance, Meta cost estimates and recovered revenue, tab by tab.", keywords: ["analytics", "delivery rate", "template insights", "recovery revenue", "message usage", "meta costs"] },
			{ slug: "account/store-report", title: "Store Report", description: "Get your store's sales summary on WhatsApp by sending a keyword from an authorized number.", keywords: ["store report", "sales report", "report keyword", "pin", "authorized numbers"] },
			{ slug: "account/billing", title: "Plans and billing", description: "How plans, usage charges, trials and cancellation work, what counts as a message, and Meta's separate charges.", keywords: ["billing", "plans", "pricing", "usage charges", "cancel subscription", "meta charges"] },
			{ slug: "account/blocklist", title: "Blocklist", description: "Stop automated templates to customers who opted out: STOP and START keywords, scope, manual blocks and CSV import.", keywords: ["blocklist", "opt-out", "stop", "unsubscribe", "opt-in", "csv import"] },
			{ slug: "account/data-and-privacy", title: "Data, privacy and uninstalling", description: "What happens to your WhatsApp connection and data when you uninstall, and how deletion requests are handled.", keywords: ["uninstall", "data deletion", "gdpr", "redact", "privacy", "disconnect whatsapp"] },
			{ slug: "account/troubleshooting", title: "Troubleshooting", description: "Why messages didn't send or arrive, what each order tag and Meta error means, and how to fix it.", keywords: ["not sending", "failure tags", "meta error codes", "subscription required", "quality rating", "delivery failed"] },
		],
	},
];

export type FlatDocPage = DocPage & { group: string; url: string };

export const DOCS_PAGES: FlatDocPage[] = DOCS_NAV.flatMap((group) =>
	group.pages.map((page) => ({ ...page, group: group.title, url: page.href ?? `/docs/${page.slug}` })),
);

/** Pages whose body is an MDX file in src/content/docs. */
export const DOCS_ARTICLES = DOCS_PAGES.filter((page) => !page.href);

export function getDocPage(slug: string): FlatDocPage | undefined {
	return DOCS_ARTICLES.find((page) => page.slug === slug);
}

export function getDocNeighbours(slug: string): { prev?: FlatDocPage; next?: FlatDocPage } {
	const index = DOCS_PAGES.findIndex((page) => page.slug === slug);
	if (index === -1) return {};
	return { prev: DOCS_PAGES[index - 1], next: DOCS_PAGES[index + 1] };
}
