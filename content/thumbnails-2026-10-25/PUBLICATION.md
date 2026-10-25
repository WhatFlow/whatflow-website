# Published release

Live at [WhatFlow Blog](https://whatflow.tech/blog) and [Comparisons](https://whatflow.tech/compare). Verification completed 2026-10-25T00:13:49.849Z.

- 164 unique 1200×630 WebP covers: 58 blogs and 106 comparisons. Exact deployed hashes, source logos and image dimensions verified.
- All 106 comparisons published with WhatsApp/WhatFlow-first recommendations. Competitor facts, FAQs, sources, authors and original publication dates preserved.
- Full article search fixed, including multiword body queries, category retention, clearing and empty results. Live browser checks passed at 375, 768 and 1280 pixels. Tablet navigation overflow and route-change menu reset are fixed.
- All 164 independent reviews passed at 90–94/100, with all five strict skill gates passed. Exact reviews and helper reports are archived in `delivery/`; full rendered artifacts remain in `/tmp/whatflow-release-delivery/candidate/<slug>/`.
- All 164 API documents and native article routes, directory cards, social images, schemas, author/date fields, sitemap and draft protection passed live verification. The blog batch also passed RSS checks.
- Native comparison history: all 325 prior revisions retained, 106 new revisions added, 431 total; 106 latest published versions, no pending drafts and no foreign-key errors. Guarded SQL was rehearsed and checked for safe repeated execution before publication.

Worker version: `afdff5e9-9177-46dd-b287-a4ab72a44c28`, built from runtime commit `32ee959`.

## Organized implementation commits

1. `e0aa4fd` — Payload comparison collection, article model, migrations and rich content blocks.
2. `fcbb60e` — Full content search, CMS-backed article routes, responsive cover presentation and search tests.
3. `82b635f` — Researched articles, 164 branded covers, source provenance and editorial publishing tools.
4. `32ee959` — Tablet navigation overflow, route-keyed menu reset and timer cleanup.

The final evidence commit records this publication, exact reviews, strict reports, native counts and live checks. SQL backups remain outside the repository; hashes and execution metadata are in `publication-receipt.json`.

## Verification limits and remaining capture work

Original marks were verified for 55 vendors. Sixteen placements use ordinary product names with thematic illustrations where an exact usable logo was unresolved or too small. Illustrations are labelled editorial covers, not app screenshots.

Existing genuine demo screenshots remain in the articles, with topic-specific Flow examples and honest inactive/configuration captions. Fresh inbox, campaigns, button/theme, plans and extension captures remain pending because the connected Chrome tab times out during focus initialization. No live messages or workflow configuration changes were made for this release.

Shopify Help returned automated 403 responses for four exact official URLs, independently opened and read during this release. The skill’s documented exact-URL 403/405 exception was used, preserving DNS and redirect validation. Shopify App Store rate limiting was handled by pausing and slowing checks; no 429 exception was used. Editorial scores are internal judgments, not ranking predictions. Live Core Web Vitals were not measured.
