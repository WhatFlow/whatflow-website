# Kaching's content strategy and the WhatFlow version

On November 18, 2026, I crawled kachingappz.com from its sitemap: 353 URLs, all allowed by robots.txt. I fetched every page except the changelog archive, plus 20 changelog entries. This file records what their site does and what WhatFlow takes from it. It is analysis only: no Kaching text is reused anywhere.

## What Kaching does

### Site architecture: product first, blog second

- **Product landing pages.** There are 6 product pages (`/apps/bundles`, `/apps/cart`, `/apps/popup`, `/apps/subscriptions`, `/apps/post-purchase`, `/apps/email`). Each is about 2,700–3,300 words with `SoftwareApplication` schema. The blog clusters feed these pages.
- **Blog.** There are only 27 posts, but they're long:
  - median about 2,000 words, range 630–4,600;
  - 5–35 images each, mostly product screenshots;
  - 8–17 internal links;
  - 4–28 external links.
- **One named author** (Erikas Mališauskas) on every post. Each post has an author page and an "About the author" block, `BlogPosting` and `BreadcrumbList` schema, and visible published and updated dates.
- **Case studies.** There are 9, all with a hard number in the title ("From €38 to €60", "$609,000 in additional sales", "€4.97M"), 400–740 words each, with `Article` schema.
- **Integration how-tos.** There are 5 (PageFly, GemPages, Replo, Klaviyo, Checkout Links). These are setup guides for integrations that actually exist, and they capture "Kaching + [tool]" searches.
- **Changelog.** It has 257 individually indexed entries.
- **Other pages:** an MCP page ("ask Claude and ChatGPT about your store"), an affiliate program page (about 1,500 words), a brand kit, and careers pages with `JobPosting` schema.

### Blog formats, in proportion

| Format | Examples | Share |
|---|---|---|
| "Best X apps for Shopify" listicles: their app first, a comparison table, an H2 per app, App Store links, "how to choose" and "which to pick" | bundle, upsell, popup, subscription, AI product photography, **WhatsApp** apps | about 30% |
| "[Competitor] alternatives" | Fast Bundle alternatives, Recharge alternatives | about 7% |
| "How to [job] on Shopify" pillar how-tos | create bundles, add a popup, set up subscriptions, upsell | about 20% |
| Metric explainers | AOV in Shopify, AOV vs ACV, increase AOV, conversion rate, subscription churn | about 20% |
| Sub-type deep dives | exit-intent, discount, upsell and newsletter popups; mobile cart optimisation | about 20% |
| Adjacent, high-volume topics | AdSpy tools, Shopify Premier Partners | about 7% |

### Freshness

Every post's `dateModified` falls between November 16 and 18, 2026. They refresh the whole library on a cadence rather than letting posts age. Publishing happens in topical bursts: 9 popup and upsell posts in one week of September, and 4 subscription posts in the first week of November, when they launched Subscriptions.

### WhatsApp

Kaching published "Best WhatsApp apps for Shopify" on November 17, 2026. It ranks Kanal, Zoko, Dondy, Spur, DelightChat, Carthike, Shopify Messaging, WhatsApp by Meta, Interakt and KwikEngage. **WhatFlow isn't listed.**

## How WhatFlow compares

| Area | Kaching | WhatFlow today |
|---|---|---|
| Blog volume | 27 long posts | 190 posts and 145 comparisons. We're far ahead on volume and head-to-heads. |
| Alternatives listicles | yes | **none**. This is the biggest format gap. |
| Category "best apps" roundups | 6, each in their product's category | 7 general roundups; **none** for WhatsApp apps, COD confirmation, live chat, helpdesk, back-in-stock, order tracking or SMS |
| Metric explainers | AOV, ACV, churn, conversion | few (no RTO, cart recovery rate or support metrics) |
| Product landing pages with app schema | 6 | `/features`, `/inbox`, `/solutions/*`; worth checking for `SoftwareApplication` schema |
| Case studies with numbers | 9 | collection is empty. Needs real merchant data. |
| Integration how-tos | 5, all real | the `/integrations` fallback list names Klaviyo, Gorgias, Loox and Recharge integrations that our product facts don't document. **Needs owner confirmation.** |
| Author page | yes | author box only, no author page |
| Library-wide refresh cadence | weekly | Nov 5 refresh and Nov 11 audit; the Nov 26 search check is scheduled |

## This batch (November 18)

23 new posts in Kaching's formats, re-angled for WhatsApp on Shopify. WhatFlow goes first wherever WhatsApp is the job. Every third-party fact is checked on the app's listing today.

1. **Alternatives (10):**
   - wati-alternatives
   - interakt-alternatives
   - zoko-alternatives
   - aisensy-alternatives
   - gallabox-alternatives
   - delightchat-alternatives
   - superlemon-alternatives
   - shopify-inbox-alternatives
   - gorgias-alternatives-whatsapp
   - tidio-alternatives
2. **Category roundups (8):**
   - best-whatsapp-apps-for-shopify (the head term Kaching just targeted)
   - best-whatsapp-chat-button-apps-shopify
   - best-cod-confirmation-apps-shopify
   - best-back-in-stock-apps-shopify
   - best-shopify-live-chat-apps
   - best-shopify-helpdesk-apps
   - best-shopify-sms-marketing-apps
   - best-shopify-order-tracking-apps
3. **Pillar how-tos and metric explainers (5):**
   - how-to-add-whatsapp-to-shopify
   - shopify-whatsapp-order-notifications
   - rto-rate-shopify-cod
   - abandoned-cart-recovery-rate-shopify
   - shopify-customer-support-metrics

Each new post links into the matching head-to-head comparisons, so the 145 comparison pages gain hub pages.

## Next, needs the owner

- **Search Console:** the last 3 months of queries and pages (CSV), and the page-indexing report. These decide which existing posts to refresh first.
- **Case studies:** real merchants willing to share a before/after number (COD confirmation rate, RTO, recovered checkouts, response time).
- **Integrations:** confirm which listed integrations exist, so real setup guides can replace any that don't.
- **Author page** for Safwan Adnan, plus `SoftwareApplication` schema on the product pages. These are code changes, ready to do once you approve.
