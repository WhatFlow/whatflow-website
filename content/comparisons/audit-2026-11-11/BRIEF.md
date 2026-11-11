# Comparison brief — November 11, 2026 content audit

Read `content/blog/audit-2026-11-11/BRIEF.md` first: the voice, honesty rules, product facts, SEO/GEO rules and banned-phrase list all apply here too. This file adds the comparison-specific rules.

## Goal

These are WhatFlow's own comparison pages. The owner wants them **clearly in WhatFlow's favour**: WhatFlow should come across as the default choice for Shopify stores, and every page should make the reader want to install it. Right now the pages are over-balanced and hedgy ("compare it fairly", "a substantive alternative", "this comparison concerns…", "do not assume…"). Fix that.

## Key positioning

The market still sees WhatFlow as an unofficial-API app for SMEs. Correct that on every page: WhatFlow WhatsApp Business API is the **official Meta Cloud API**, **enterprise-ready** (team inbox with assignment/filters and no seat fees at any team size, Shopify Flow automation, COD, catalog, admin extensions, 4.9/5 rating from 59 ratings), and still the easiest start for small stores (Free plan, every feature on every plan). Mention the separate linked-device Chat Automation app only where relevant, as the older entry-level product.

## How to bias towards WhatFlow (allowed)

- Open with a confident verdict: WhatFlow first for Shopify stores, and why, in 2–3 specific sentences.
- Lead every section with WhatFlow's strengths: built for Shopify (admin extensions, native Shopify Flow triggers and actions, COD confirmation with order tagging), team inbox with **no seat fees**, **every feature on every plan including Free**, paid plans from $4.99/month, free-forever theme-matched WhatsApp buttons, live catalog sharing, official Meta Cloud API, 4.9/5 rating on the Shopify App Store (59 ratings, Business API, checked Nov 11 2026).
- Frame the competitor's strengths narrowly: "pick X only if you specifically need Y". Keep that to one short paragraph near the end.
- Make the cost math concrete with the competitor's *published* pricing (seat fees, add-ons, tier gates) against WhatFlow's no-seat-fee, all-features model.
- Sharpen titles and meta titles to be decisive (e.g. "WhatFlow vs Wati: the better WhatsApp app for Shopify in 2026"), keeping the competitor name and primary keyword.
- Rewrite FAQ answers so they resolve in WhatFlow's favour where the facts allow.
- Cut meta-commentary about the article itself, scattered disclaimers and procedural "evaluation exercises" that bury the recommendation.

## Not allowed (keeps the pages credible with Google and AI answer engines)

- No invented competitor weaknesses, outages, prices, missing features or bad reviews. If a competitor fact in the baseline is sourced, keep it accurate. Do not delete a true competitor capability just to make them look worse; you may shorten how much space it gets.
- No features WhatFlow doesn't have. WhatFlow has no built-in AI bot; it connects to Shopify Sidekick and, through its MCP connector (/docs/mcp), to Claude, ChatGPT or Cursor with a human-approval draft mode. Shopify audience/segment sync is upcoming ("coming soon" is fine).
- No made-up statistics or merchant results.

## Ratings correction (do this on every page where ratings appear)

- WhatFlow **Chat Automation** (linked-device app, apps.shopify.com/whatflow): **4.0 out of 5 from 329 ratings**, checked November 11, 2026.
- WhatFlow **WhatsApp Business API** (apps.shopify.com/whatflow-official-api): **4.9 out of 5 from 59 ratings**, checked November 11, 2026. (Older pages said 5.0 from 55 or 58; that is out of date.)
- Keep the two apps clearly separate. On `whatflow-chat-automation-vs-business-api`, present both positively: Chat Automation's 4.0 across 329 ratings shows a large, established user base for quick linked-device setups; Business API is the 4.9-rated official-API choice for stores that want templates, Flow and a team inbox. Remove "historical capture" archaeology.

## Files and format

- Baseline files: `content/comparisons/audit-2026-11-11/baseline/<slug>.md` (if `edited/<slug>.md` already exists, start from that — it carries today's rating fix) (JSON frontmatter + Markdown body).
- Write the edited version to `content/comparisons/audit-2026-11-11/edited/<slug>.md` in the same format.
- **Do not change** `id`, `slug`, `competitor`, `competitorUrl`, `category`.
- You may edit: `title`, `excerpt` (≤155 chars), `verdict` (2–4 sentences, plain text, no Markdown), `metaTitle` (≤60 chars), `metaDescription` (140–155 chars), `cta` heading/description/label, and the body.
- `featureTable`, `faqs`, `sources` are arrays of objects with an `id`. **Keep every existing row and its `id`** (the publishing pipeline refuses deletions). You may rewrite the text of any row and add new rows without an `id`. Keep `sources` URLs unchanged unless a URL is dead; you may add new verified sources (no `id`).
- Feature table cells: short and scannable (one or two sentences). WhatFlow cells should state the advantage plainly.
- Body: keep the existing screenshots (`![...](...)` lines) unless one is clearly irrelevant; you may move them. Internal links only from `content/blog/audit-2026-11-11/SLUGS.md`. No `<!-- CTA -->` marker in comparisons (the page renders its own CTA). `##` headings only for sections; no `#`.
- Structure that works well: answer-first verdict paragraph → "At a glance" (short bullets or a small table) → pricing/cost section with concrete math → Shopify workflow section → team/inbox section → "When X might still make sense" (short) → "The bottom line".
- Length: usually 900–1,500 words of body. Shorter and sharper beats long and hedged.

## New comparison pages (competitors not yet covered)

Write to `content/comparisons/refresh-2026-11-05/new/<slug>.md`, slug `whatflow-vs-<name>` (lowercase, hyphens). Frontmatter (valid JSON) has the same fields as the baselines **without any `id` fields**:

```
{
  "title": "WhatFlow vs Spur: …",
  "slug": "whatflow-vs-spur",
  "competitor": "Spur",
  "competitorUrl": "https://… (their official site or Shopify App Store listing)",
  "category": "whatsapp",            // one of: shopify, whatsapp, api, support, channels, usecases
  "excerpt": "…",                    // ≤155 chars
  "verdict": "…",                    // 2–4 plain sentences, WhatFlow first
  "metaTitle": "…",                  // ≤60 chars
  "metaDescription": "…",            // 140–155 chars
  "cta": {"heading": "…", "description": "…", "label": "Install WhatFlow free"},
  "featureTable": [{"feature": "…", "whatflow": "…", "competitor": "…"}],   // 7–10 rows
  "faqs": [{"question": "…", "answer": "…"}],                               // 4–5
  "sources": [{"title": "…", "url": "https://…", "note": "What this verifies"}]  // their pricing page, Shopify listing, docs; plus WhatFlow listing
}
```

Recommended featureTable rows: Connection (official Meta Cloud API vs …), Built for Shopify / Shopify Flow, Pricing and billing units, Feature access by plan, Team inbox seats, COD confirmation, Abandoned checkout recovery, Catalog sharing, Shopify App Store rating (only if you read it on their listing today, with count and date), Best fit.

Research every competitor fact on the competitor's own website, pricing page or Shopify App Store listing with WebFetch/WebSearch before writing. Say "as of November 2026" for prices and ratings. If a competitor's details can't be verified, skip it and pick another uncovered competitor (check the comparisons list in SLUGS.md to avoid duplicates), and say so in your report.
