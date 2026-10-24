# Comparison publishing

Comparison articles are served exclusively from Payload's `comparisons` collection. `launch.mjs` is an editorial import archive, not a frontend fallback. Edit future content in Payload; changing the archive does not change published pages.

The collection supports native drafts and revision history, editable author details, rich text, screenshots or uploaded media, comparison rows, FAQs, source links, related articles and SEO metadata. Anonymous collection reads are restricted to published documents. Pages use a 60-second fetch revalidation interval.

## Import and publish

- `npm run seed:comparisons` imports launch material as drafts using local bindings.
- `PAYLOAD_REMOTE_BINDINGS=true npm run seed:comparisons` explicitly selects the configured remote bindings. Existing slugs are preserved.
- `PAYLOAD_REMOTE_BINDINGS=true npm run publish:comparisons` publishes the reviewed launch slugs. It also repairs the initial import's malformed heading nodes, if present, without replacing properly formatted editorial content.
- `node scripts/verify-comparisons.mjs` checks the live launch batch, schemas, sitemap, images and draft access. Set `COMPARISON_TEST_URL` to verify a different deployment. The current verification checks all 105 expanded articles across API and directory pagination, plus pricing calculations, search, categories and self-canonical URLs.

The launch uses Safwan Adnan / Co-founder and CEO of WhatFlow, matching the requested byline. The two screenshots are owned WhatFlow demo-store captures, deployed under `/comparisons/`; their paths and captions are editable in Payload. They illustrate configuration and sample values, not measured customer results.

## Database scope

`scripts/comparisons-schema.sql` and the matching Payload migration create only new comparison tables and indexes. The SQL has already been applied to production. It never alters existing CMS tables. Schema push is disabled because the project uses remote bindings.

The existing production database does not match all the other collections in this checkout. That pre-existing discrepancy was observed before this work and is intentionally outside this migration. The generated schema snapshot represents the checkout's complete model, not a claim that unrelated production tables have been reconciled. Review production schema separately before generating or applying subsequent broad migrations.

## Expanded editorial library (24 October 2026)

`expanded.mjs` assembles 65 provider guides, 12 channel comparisons and 28 workflow/cost comparisons from researched editorial dossiers. This is import material, never a runtime content fallback. All 105 published documents can be edited independently in Payload, including their prices, sources, bylines, CTA, tables and images. Subsequent changes to these files do not change the website until explicitly republished.

- `npm run audit:comparisons` validates the import, word counts, bylines and pricing arithmetic.
- `PAYLOAD_REMOTE_BINDINGS=true npm run expand:comparisons` stages each complete article through Payload, then publishes it. Existing publication dates are retained and revisions are preserved. A public-content backup and a fingerprinted completion checkpoint are written to `/tmp`.
- A rerun resumes the same fingerprint. Use `--fresh` only for an intentional full rewrite. Importing again replaces CMS edits for matching slugs, so review any later editorial changes first.
- `npm run verify:comparisons` verifies the live published library.

WhatFlow prices are a dated snapshot of the official Shopify listing: Free (100 sends, then $0.01), Starter $4.99 (2,000, then $0.005), Plus $9.99 (5,000, then $0.004), Growth $29 (20,000, then $0.0025), Scale $49.99 (40,000, then $0.002), Ultimate $99 (75,000, then $0.0015). The examples calculate the lowest app-side bill among these plans; Meta delivery fees and tax are separate. The owner confirms all-features access, no inbox seat fees and free-forever theme-matched buttons. Competitor figures retain their currency, term and allowance definitions. Quote-only providers are not assigned invented prices.

The two added select values (`channels`, `usecases`) use the existing text column; no existing database table needs alteration.

### Wrangler import fallback

When the remote development proxy is unstable, `node --import tsx scripts/build-comparison-import.ts` generates a collection-only SQL import at `/tmp/whatflow-comparisons-expanded.sql`. Back up the ten comparison tables first with normal `wrangler d1 export` authentication, validate the generated import against that backup in a temporary SQLite database, then apply it with `wrangler d1 execute --remote --file ... --yes`. It preserves existing IDs, publication/creation dates, cover images, relationships and historical revisions, and adds a complete published revision with matching child arrays. It changes no schema or unrelated collection. Do not run the native publisher and SQL import concurrently.

## Two-app clarification

The library now has 106 articles. `whatflow-apps.mjs` adds the detailed Chat Automation vs Business API guide and updates Dondy with primary acquisition sources. Ratings and review counts are snapshots checked on 24 October 2026; app-side pricing belongs to the specifically named app. Linked-device enforcement history is attributed to the founder's account rather than presented as an independent causal study. The 2027 position is an ambition, not a verified growth forecast. Dondy's own continuity commitments and published roadmap are included rather than asserting an unsupported change in service or pricing.

Generate only these two documents with `node --import tsx scripts/build-comparison-import.ts --slugs=whatflow-chat-automation-vs-business-api,whatflow-vs-dondy`. This writes `/tmp/whatflow-comparisons-update.sql`, preserves existing dates/history and creates the cross-links in current and version relationships. Put the new guide first so its ID exists when Dondy's relation is saved. Back up and validate before applying through normal Wrangler authentication.
