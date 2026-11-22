# Search Console batch — November 23, 2026

**Input:** the "Performance on Search generative AI features" exports (last 3 months) for whatflow.tech and whatflow.io. They give AI Overview and AI Mode impressions by page, country, device and date. There is no queries file.

## What the data says

- **The domain move is working.** whatflow.tech fell from about 290 to about 60 AI-feature impressions a day after Nov 9, and whatflow.io rose from 0 to about 100–120. The combined total held fairly steady.
- **Where impressions land:** blog about 2,300, comparisons 900, `/pricing` 680 (the top single page), solutions 580. The most-cited posts are answer-shaped: review-request message examples, Shopify vs Wix, free plan vs free trial, App-to-API migration, incentivized review rules and GDPR consent.
- **Countries:** Pakistan and India are about 45%, then the US, UK, Belgium, Egypt, UAE, South Africa and Brazil. Desktop is about 75%.
- **Dead URLs:** only 3 of the 305 surfaced URLs failed: `/official-api-pricing`, `/privacy-policy` and `/resources`.

## Shipped

### Site code (deploy 225aa86f)

- **Redirects:**
  - `/official-api-pricing` → `/pricing`
  - `/privacy-policy` → `/privacy`
  - `/resources` → `/blog`
  - `/integrations/{klaviyo,gorgias,loox,recharge}` → `/integrations`
- **Integrations:**
  - Every integration is now real and documented: Shopify Flow, Shopify Sidekick, the Judge.me Flow template, MCP (Claude/ChatGPT/Cursor), the Meta catalog, and webhooks with API triggers. They live in one data file, `src/lib/integrations-data.ts`.
  - Removed: claimed Klaviyo sync, Gorgias routing, Loox, Recharge skips, and "up to 4x" Judge.me reviews.
  - The integration pages are now in the sitemap.
- **Solution pages and index:**
  - Removed unbacked statistics: 98% open rate, 25% recovery, 40% RTO cut, 60% fewer WISMO and 5x reviews.
  - Removed undocumented features: Loox, star-rating buttons syncing to review apps, address correction, multi-agent routing on the button, the <5KB and 100/100 PageSpeed claims, tiered smart discounts and cross-sell receipts.
  - Copy now follows the Business API help docs. The only statistic left is Baymard's sourced 70% cart abandonment average.
- **Titles:** removed the doubled "| WhatFlow | WhatFlow" suffix from 13 page titles (the layout already appends it). The blog, integrations and pricing pages got descriptive titles.
- **llms files:** `llms.txt` and `llms-full.txt` list the new hub pages and country guides.

### CMS (live)

- **21 new posts:**
  - 10 country guides (Pakistan, India, Indonesia, UAE, Saudi Arabia, Egypt, South Africa, Brazil, UK, Malaysia). Each has Meta's Oct 2026 rates, billing-currency notes and the local privacy law linked to official or reputable text.
  - 8 message-example libraries (order confirmation, shipping confirmation, COD, abandoned cart, auto-reply, greeting, thank-you, back-in-stock), with 21–25 copy-ready examples each.
  - 3 platform comparisons (Squarespace, BigCommerce, Etsy).
- **12 existing posts:**
  - The AI-cited posts now link to the new ones.
  - `back-in-stock-whatsapp-alerts-setup` no longer says WhatFlow has no back-in-stock feature. It now leads with the built-in Back in stock feature.
- **Release checks:** rehearsed twice on a fresh D1 export, and the second run was a no-op. All 33 bodies render with RichText. Live: 234 posts and 983 FAQs.

## Worth knowing

- **India:** Meta requires India-based businesses to bill in INR by Dec 31, 2026, or messages stop on Jan 1, 2027. The India guide leads with this.
- **Brazil:** the BRL billing deadline is June 30, 2027.
- **Translations:** Urdu, Hindi, Arabic, Portuguese, Indonesian and Malay example messages were written by the writers and should get a native-speaker check.
- **Weaker sources:** some legal sources are secondary because official sites refused automated access (Pakistan's PDP bill status, Egypt's Law 151 translation, Saudi PDPL via MISA). Each post says so.
- **Search Console setup:** add a whatflow.io domain property and run Change of Address from whatflow.tech. Both need the property owner's account.
