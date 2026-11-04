# Content refresh — November 5, 2026 (published)

Author byline: Safwan Adnan. Editorial rules: [STYLE.md](STYLE.md); comparison rules: [../../comparisons/refresh-2026-11-05/BRIEF.md](../../comparisons/refresh-2026-11-05/BRIEF.md).

## Scope

- **61 existing posts rewritten** (`rewritten/`): direct first-person voice, answer-first openings, question-style H2s, real example messages, boilerplate removed, misused screenshots removed. Slugs, categories, publish dates and covers unchanged.
- **63 new posts** (`new/`), topics modelled on Judge.me's blog catalogue (273 titles inventoried Oct 24 + 2 newer) and re-angled for WhatsApp/WhatFlow. No Judge.me text copied. Original covers in `public/thumbnails/blog/`.
- **106 comparisons reworked** (`../../comparisons/refresh-2026-11-05/edited/`): decisive WhatFlow-first verdicts and titles, cost math from competitors' published pricing, official-Cloud-API / enterprise-ready positioning, corrected ratings. All existing row IDs kept; native revision history preserved.
- **25 new competitor comparisons** (`../../comparisons/refresh-2026-11-05/new/`), each researched on the competitor's own site/listing on Nov 5, 2026.
- **Ratings/GEO:** Chat Automation 4.0/5 (329), Business API 5.0/5 (55) added to llms.txt, llms-full.txt, /ai/summary.json, /ai/service.json, /ai/faq.json and a homepage FAQ.

## Fact corrections applied during the refresh

- Meta pricing changed Oct 1, 2026: service replies free only for the first 1,000 per number per month; utility templates inside the window now charged. Click-to-WhatsApp free entry point window is up to 7 days.
- Google stopped showing FAQ rich results on May 7, 2026.

## Verification (local rehearsal on a fresh production export)

- `node scripts/lint-refresh-content.mjs`: 0 errors, 0 warnings across 255 documents (banned phrasing, links, metadata lengths, stale ratings, CTA, images).
- Posts: 61 updated in place, 63 inserted; comparisons: 106 updated with a new latest revision, 25 inserted with revision rows; new-comparison SQL safe to re-run; foreign keys clean.
- `npx tsx scripts/verify-refresh-render.tsx`: all 255 bodies render through the site's RichText with no dropped text.
- `npm run build` passed.

## Publication record

- Worker deployed: version `a56aaf38-a26d-47e8-beae-39f87d169670` (migration guard: schema complete, nothing applied).
- Pre-publish D1 backup (62 posts, 106 comparisons) sha256 `e0e2aa817a84f211ec3651a09aa065b039e8f8ea722f4f0ca136b3491bc546c8`, kept in the session scratchpad.
- A post created outside this release shortly before publishing (`migrating-whatflow-from-gadget-to-cloudflare`) was left untouched.
- Remote D1 after import: 125 published posts (124 refreshed), 131 published comparisons, each with exactly one latest published revision.
- Live check of all 255 changed/new URLs: HTTP 200, the new title in the single H1, self-canonical, sitemap entry. RSS lists the 50 newest posts by design.

## Publish order (as executed)

1. `npm run deploy` (code changes + 88 new cover images; runs the migration guard).
2. Back up D1, then execute on remote D1: `publication/posts.sql`, `publication/comparisons.sql` (from `scripts/build-comparison-enhancement-sql.mjs` with `COMPARISON_ENHANCEMENT_ROOT=publication`), `publication/new-comparisons.sql`.
3. Verify live pages, sitemap and RSS.

## Open questions for the owner

- The Shopify App Store listing description mentions **AI chat** and **back-in-stock alerts**; all content currently says AI is not available and describes back-in-stock via Shopify Flow. Confirm which is correct.
- Multilingual post: confirm the WhatFlow template action can send a specific language version of a template.
- GDPR post tells merchants to request every app's data processing terms, WhatFlow included; confirm WhatFlow has a DPA to offer.

## New posts

- `ab-test-whatsapp-messages-small-list` — How to A/B test WhatsApp messages when your list is small
- `add-whatsapp-chat-button-shopify` — How to add a WhatsApp chat button to your Shopify store
- `ai-search-visibility-shopify-geo` — How to get your Shopify store mentioned in AI answers (GEO)
- `back-in-stock-whatsapp-alerts-setup` — Back-in-stock alerts on WhatsApp: Shopify setup and examples
- `birthday-anniversary-messages-shopify` — Birthday messages for customers that don't feel automated
- `black-friday-whatsapp-playbook-shopify` — The Black Friday WhatsApp playbook for Shopify stores (2026)
- `click-to-whatsapp-ads-shopify` — Click-to-WhatsApp ads for Shopify: setup and handling the chats
- `collect-whatsapp-opt-ins-shopify` — How to collect WhatsApp opt-ins on Shopify (the right way)
- `customer-photos-ugc-whatsapp` — Collecting customer photos and UGC through WhatsApp
- `customer-service-playbook-shopify` — Write a customer service SOP for your Shopify store
- `customer-survey-whatsapp-csat-nps` — Run a quick customer survey on WhatsApp (CSAT and NPS examples)
- `first-black-friday-new-shopify-store` — Your first Black Friday as a new Shopify store: trust first
- `handle-angry-customer-whatsapp` — How to handle an angry customer on WhatsApp (with reply examples)
- `high-ticket-products-whatsapp-sales` — How to sell high-ticket products online over WhatsApp
- `hire-first-customer-support-shopify` — Hiring your first customer support person for a Shopify store
- `holiday-shipping-cutoff-messages` — Holiday shipping cut-off messages: what to send and when
- `incentivized-reviews-rules` — Can you offer incentives for reviews? The rules and safer options
- `order-edits-address-changes-whatsapp` — Change a Shopify shipping address after an order (WhatsApp guide)
- `pre-order-updates-whatsapp-shopify` — Shopify pre-order updates: keep customers happy on WhatsApp
- `product-launch-whatsapp-waitlist` — Product launch waitlist on WhatsApp: early access to launch day
- `raise-prices-tell-customers` — How to raise prices without losing your best customers
- `ramadan-eid-diwali-whatsapp-campaigns` — Ramadan, Eid and Diwali WhatsApp campaigns: a planning guide
- `schema-markup-shopify-beginners` — Schema markup for Shopify stores: a beginner's guide
- `selling-over-chat-sales-techniques` — Selling on WhatsApp: shop-floor sales habits that work in chat
- `shopify-app-stack-audit` — The lean Shopify app stack: what a small store actually needs
- `shopify-collection-page-seo` — Shopify collection pages that rank: copy, filters and internal links
- `shopify-seo-checklist-merchants` — How to improve SEO on Shopify: a practical checklist for 2026
- `shopify-vs-wix-ecommerce` — Shopify vs Wix for selling online in 2026
- `shopify-vs-woocommerce-customer-messaging` — Shopify vs WooCommerce in 2026: which is easier to run and support?
- `start-shopify-store-first-30-days` — Starting a Shopify store: your first 30 days, step by step
- `subscription-churn-whatsapp-shopify` — Reduce subscription churn on WhatsApp: skips, swaps, payments
- `trust-badges-shopify-what-works` — Do trust badges work on Shopify? What to show instead of badge clutter
- `use-ai-small-shopify-business` — How to use AI in a small Shopify business (and where not to)
- `validate-product-niche-customer-conversations` — How to validate a product idea by talking to customers on WhatsApp
- `vip-customers-whatsapp-shopify` — VIP customers on Shopify: how to treat them on WhatsApp
- `what-is-whatsapp-business-api` — What is the WhatsApp Business API? A plain-English guide
- `whatsapp-24-hour-customer-service-window` — The WhatsApp 24-hour window, explained for store owners
- `whatsapp-away-messages-business-hours` — WhatsApp away messages: 14 examples for after hours and holidays
- `whatsapp-broadcast-best-practices` — WhatsApp broadcasts customers don't block: 12 rules
- `whatsapp-business-api-pricing` — WhatsApp Business API pricing explained (as of November 2026)
- `whatsapp-business-app-to-api-migration` — Moving from the WhatsApp Business app to the API: what changes
- `whatsapp-channels-for-brands` — WhatsApp Channels for Shopify brands: when they're worth it
- `whatsapp-conversations-content-ideas` — Mine your WhatsApp chats for SEO content ideas
- `whatsapp-customer-service-etiquette` — WhatsApp business etiquette: tone, emoji, voice notes and timing
- `whatsapp-for-beauty-skincare-brands` — WhatsApp marketing for beauty brands: routines, refills and advice
- `whatsapp-for-fashion-stores` — WhatsApp for fashion brands: sizing, drops and returns
- `whatsapp-for-food-beverage-brands` — WhatsApp for food business: freshness, delivery slots and reorders
- `whatsapp-for-furniture-home-stores` — WhatsApp for furniture stores: delivery booking and buyer questions
- `whatsapp-gdpr-marketing-consent` — Is WhatsApp marketing GDPR-compliant? A store owner's checklist
- `whatsapp-green-tick-verified-business` — How to get the WhatsApp green tick (verified badge guide)
- `whatsapp-links-qr-codes-store` — WhatsApp links and QR codes for your store, packaging and pop-ups
- `whatsapp-marketing-metrics-shopify` — WhatsApp marketing metrics that actually matter for Shopify
- `whatsapp-marketing-shopify-guide` — WhatsApp marketing for Shopify: the complete 2026 guide
- `whatsapp-message-frequency-ecommerce` — How often should your store message customers on WhatsApp?
- `whatsapp-message-not-delivered-reasons` — WhatsApp message not delivered? 9 reasons and what you can fix
- `whatsapp-message-templates-shopify-examples` — 40 WhatsApp message templates for Shopify stores (copy and adapt)
- `whatsapp-opt-in-rate-measure` — How to measure (and improve) your WhatsApp opt-in rate
- `whatsapp-quality-rating-messaging-limits` — WhatsApp quality rating and messaging limits, explained
- `whatsapp-response-time-small-team` — WhatsApp response time: how fast should a small team reply?
- `whatsapp-scams-impersonating-your-store` — Stop WhatsApp scams that impersonate your store
- `whatsapp-template-categories-marketing-utility` — Marketing vs utility vs authentication templates on WhatsApp
- `whatsapp-template-rejected-fixes` — Why Meta rejects WhatsApp templates (and how to fix yours)
- `wholesale-b2b-enquiries-whatsapp` — How to handle wholesale enquiries on WhatsApp

## New comparisons

- `whatflow-vs-aitrillion` — WhatFlow vs AiTrillion: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-callbell` — WhatFlow vs Callbell: the better WhatsApp choice for Shopify in 2026
- `whatflow-vs-clevertap` — WhatFlow vs CleverTap: the Shopify-native WhatsApp choice in 2026
- `whatflow-vs-ctx` — WhatFlow vs Ctx (Chatix): the better WhatsApp API app for Shopify
- `whatflow-vs-edesk` — WhatFlow vs eDesk: the better WhatsApp tool for Shopify stores
- `whatflow-vs-getgabs` — WhatFlow vs Getgabs: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-haptik` — WhatFlow vs Haptik: Shopify WhatsApp without the implementation project
- `whatflow-vs-kaleyra` — WhatFlow vs Kaleyra: a ready Shopify WhatsApp app vs a CPaaS build
- `whatflow-vs-kanal` — WhatFlow vs Kanal: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-kommunicate` — WhatFlow vs Kommunicate: WhatsApp for Shopify without per-member fees
- `whatflow-vs-kustomer` — WhatFlow vs Kustomer: enterprise WhatsApp for Shopify without seat fees
- `whatflow-vs-netcore` — WhatFlow vs Netcore Cloud: WhatsApp for Shopify without a custom quote
- `whatflow-vs-periskope` — WhatFlow vs Periskope: official WhatsApp API for Shopify or linked devices?
- `whatflow-vs-reamaze` — WhatFlow vs Re:amaze: the better WhatsApp setup for Shopify in 2026
- `whatflow-vs-recart` — WhatFlow vs Recart: WhatsApp or SMS for your Shopify store in 2026?
- `whatflow-vs-retainful` — WhatFlow vs Retainful: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-richpanel` — WhatFlow vs Richpanel: the better WhatsApp choice for Shopify teams
- `whatflow-vs-shopify-messaging` — WhatFlow vs Shopify Messaging: which WhatsApp tool should your store use?
- `whatflow-vs-sprinklr` — WhatFlow vs Sprinklr: enterprise WhatsApp for Shopify in minutes, not months
- `whatflow-vs-spur` — WhatFlow vs Spur: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-superchat` — WhatFlow vs Superchat: the better WhatsApp choice for Shopify in 2026
- `whatflow-vs-wassenger` — WhatFlow vs Wassenger: the better WhatsApp app for Shopify in 2026
- `whatflow-vs-whatsapp-for-shopify-by-meta` — WhatFlow vs Meta's WhatsApp app for Shopify: same official API, more features
- `whatflow-vs-yellow-ai` — WhatFlow vs Yellow.ai: the faster WhatsApp route for Shopify in 2026
- `whatflow-vs-zixflow` — WhatFlow vs Zixflow: the Shopify-native WhatsApp pick for 2026
