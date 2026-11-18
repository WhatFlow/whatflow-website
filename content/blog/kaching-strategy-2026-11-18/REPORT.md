# Kaching-style content expansion — November 18, 2026

The analysis and the plan are in `STRATEGY.md`. This file records what shipped.

## Published to the CMS (live)

**23 new posts.** Each is 1,800–3,400 words with 4–5 FAQs, 4 tags, a CTA, 2–7 WhatFlow screenshots, 8–25 internal links and a cover in the Payload media library. Every third-party rating and price was read on that app's Shopify App Store listing or pricing page on November 18, 2026.

| Group | Posts |
|---|---|
| Alternatives (10) | wati-, interakt-, zoko-, aisensy-, gallabox-, delightchat-, superlemon-, shopify-inbox-, tidio-alternatives; gorgias-alternatives-whatsapp |
| Category roundups (8) | best-whatsapp-apps-for-shopify, best-whatsapp-chat-button-apps-shopify, best-cod-confirmation-apps-shopify, best-back-in-stock-apps-shopify, best-shopify-live-chat-apps, best-shopify-helpdesk-apps, best-shopify-sms-marketing-apps, best-shopify-order-tracking-apps |
| Pillars and metric explainers (5) | how-to-add-whatsapp-to-shopify (the hub, 25 internal links), shopify-whatsapp-order-notifications, rto-rate-shopify-cod, abandoned-cart-recovery-rate-shopify, shopify-customer-support-metrics |

**Hub linking:**
- 10 head-to-head comparisons now link to their matching alternatives post.
- 9 existing posts link to the new pillars and roundups.
- The 23 new posts link to each other.

**Ratings (rechecked November 18):** WhatFlow Business API is **4.9 from 72** and Chat Automation is **4.0 from 341**. They are updated in 144 comparisons, the posts that quote them, `llms.txt`, `llms-full.txt`, `/ai/summary.json`, `/ai/service.json` and the marketing FAQ. The code-file changes need a deploy.

## Release checks

- Rehearsed on a fresh D1 export and run twice; the second run was a no-op.
- Live result: 213 posts (from 190), 38 posts touched, 144 comparisons with one new published revision each, one `latest` revision per comparison, and FAQs up from 768 to 879.
- All 253 bodies render through RichText with no dropped text: `NODE_OPTIONS="--import ./scripts/lib/css-register.mjs" npx tsx scripts/verify-refresh-render.tsx`.
- `verify-markdown-roundtrip.mjs`: 335 of 335 documents export and convert back identically.

## Tooling added or fixed

- `scripts/build-new-posts-sql.mjs`: guarded inserts for new posts, with media-library covers.
- `scripts/update-whatflow-ratings.mjs`: updates WhatFlow's two listing figures and their check dates in Markdown, leaving competitor ratings alone.
- `scripts/lib/css-register.mjs`: lets the render check load components that import CSS.
- `build-refresh-patch.mjs`: compares body text without whitespace. Separately stored text nodes (for example `[Shop the dress]`) were being flagged as changed.
- Lint now treats WhatFlow 4.9/59 and 4.0/329 as stale, and only flags old rating figures when they're attached to WhatFlow.

## Open items for the owner

- **Search Console exports.** See the strategy file for what to send.
- **`/integrations`:**
  - The fallback list describes Klaviyo opt-in sync, Gorgias chat routing, Loox, Recharge one-click skips and Judge.me one-click star ratings.
  - None of these appear in WhatFlow's documented features, and `/integrations/gorgias` and `/integrations/klaviyo` are live pages.
  - Confirm which exist.
- **Gallabox:** its Shopify listing says it isn't currently available on the App Store. `gallabox-alternatives` says so. The `whatflow-vs-gallabox` comparison should be rechecked.
- **Competitor prices differ between Shopify listings and vendor websites** for Wati, Interakt, Tidio, Spur, Gorgias and CA. The posts quote the listing and note the website figure where they differ.
