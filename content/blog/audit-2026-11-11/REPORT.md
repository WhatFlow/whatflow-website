# CMS content audit — November 11, 2026

The audit covered every Payload collection except changelog: 190 posts, 145 comparisons, 235 reviews and 47 country rates. Case studies and integrations have no documents.

## What the audit found

| Area | Finding | Fix |
|---|---|---|
| WhatFlow Business API rating | The Shopify listing shows **4.9/5 from 59 ratings** (Nov 11). The CMS, `llms*.txt`, `/ai/*.json` and FAQs said 5.0 from 55 (some pages said 58). Chat Automation is 4.0 from 329; one page said 331. | Updated across 131 comparisons, 3 posts, both llms files, both AI JSON routes and the marketing FAQ. The check date only changed where WhatFlow's own figure changed; competitor dates were kept. |
| Meta country rates | Every market showed a **$0 service rate**. Meta's USD rate card effective Oct 1, 2026 charges service at the utility rate after the first 1,000 messages per number per month. | The service column is now set from Meta's rate card for all 47 markets; every other column already matched. The pricing table header and intro now explain the 1,000 free tier. |
| Thin content | All 65 posts published Nov 8–10 were 180–650 words, with no FAQs or tags and usually no CTA. The 13 comparisons from Nov 8 were 356–406 words. | Rewritten: 51 guides to about 1,000–1,500 words, 14 help docs to 450–750 words, 13 comparisons to 900–1,000 words. Each now has FAQs, tags, sources, internal links and fixed meta. |
| Free entry point window | The post `whatsapp-free-entry-window-vs-service-window-shopify` said "72-hour" in its title, meta and body. | It now says the window can stay open "up to 7 days" (Meta pricing doc). |
| Older Meta pricing claims | The support-shifts post said service replies are free inside the window. | Corrected to the October 2026 rules. |
| Competitor facts | Plans had changed for Squadkin, wava, Whapi, Whatomation, CA and Reco, and app names had changed in the roundups. | Fixed from today's listings and pricing pages. |
| Shopify behaviour | The upsell post implied an accepted post-purchase upsell creates a separate order. | Shopify docs say it modifies the original order; the post now says that. |
| Broken link | `/contact` doesn't exist. | It now points to `/about`. |
| AI-sounding phrasing | There were 41 flagged "not X, it's Y" constructions on older pages. | 30 sentences rewritten plainly; literal uses kept. |
| Reviews | 235 rows held only 78 unique reviews, because of repeated imports. | 157 duplicate copies set to inactive. Nothing was deleted; the earliest copy of each review stays live. |

No issues were found on the 125 posts and 132 comparisons from the Nov 5 refresh, beyond the rating date. There were no broken article links and no stale AI claims.

## Release

- Rehearsed on a fresh `wrangler d1 export --remote` copy, then run twice: the second run was a no-op.
- Live D1 result: 74 posts updated, 144 comparisons with one new published revision each (854 → 998 version rows, one `latest` per comparison), 244 FAQs added, 78 reviews active, 47 service rates set.
- `verify-refresh-render.tsx` rendered all 218 bodies without dropping text. It now needs a CSS-ignoring Node loader because of the redesign's `blocks.css` import.
- `verify-markdown-roundtrip.mjs`: all 335 live documents export to Markdown and convert back with identical text, formatting and blocks.

Tooling fixes:
- The exporter now merges adjacent same-format text and keeps spaces outside bold markers. Before, `**A shared **` round-tripped as literal asterisks.
- The refresh tools take the `REFRESH_ROOT` and `REFRESH_COMP_ROOT` env vars.
- Lint now catches stale ratings, `whatflow.tech` links, the 72-hour claim and `/contact`.

## Open questions for the team

- **Free trial on Starter:** one listing check showed a 7-day trial on paid plans and another showed none on Starter. Confirm, then align `/pricing` FAQ and copy.
- **Features stated in the original posts but missing from the help docs:** an "Ask for the customer's location" auto-reply type, and a "Copy code" button option in the Message Editor. They were kept; confirm both exist.
- **Inconsistencies across the help docs:**
  - The inbox is called Inbox, Team Inbox and Live Inbox.
  - There are two broadcast routes (Customer Broadcast vs Inbox Broadcasts) and two template surfaces, and no doc says which to use when.
  - It's unclear whether Admin Blocks send through the API.
  - The Flow trigger is called both "catalog order received" and "WhatsApp catalog order trigger".
- **Content source files:** `content/blog/*-2026-11-0x` and `content/comparisons/shopify-top-apps-2026-11-08` hold the original source modules for the Nov 8–10 posts. Their publish scripts skip slugs that already exist, but a few one-off patch scripts run `UPDATE posts`. Don't re-run those, or they'll revert this audit.
