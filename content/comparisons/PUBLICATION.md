# Publication record — 24 October 2026

- Published 105 comparisons: 65 provider guides, 12 channel guides and 28 Shopify workflow/cost guides.
- Replaced the original 24 comparison bodies and added 81 new documents, retaining existing slugs, document IDs and publication dates.
- All current documents use Safwan Adnan / Co-founder and CEO of WhatFlow.
- Editorial audit: 75,077 body words, 639–873 per guide, four FAQs per article, primary-source lists and real owned demo screenshots.
- Confirmed WhatFlow policies: all features on all plans, no inbox seat fees, free-forever theme-matched buttons. App-side pricing examples exclude applicable Meta delivery charges and tax.

## Data validation

The complete comparison and revision tables were exported before the bulk import to `/tmp/whatflow-comparisons-before-expansion.sql`. The generated collection-only import was tested against that export in a temporary SQLite database, including existing IDs/dates, current and version FAQ counts, one latest revision per article, matching revision content and foreign-key integrity. All 105 documents passed. The import retains historical revisions and touches no schema or unrelated collections.

Wrangler confirmed that the production import executed all 1,365 statements successfully. Before the interface deployment, the live public Payload API returned all 105 published documents and passed the verifier's content, author, table, FAQ, source and indexability checks. The then-old directory canonical on page 2 correctly caused the navigation portion of the verifier to fail, prompting the interface deployment.

## Interface deployment

Cloudflare confirmed version `a86f7c03-d639-4b50-8133-a9d0e6661bec`, including comparison search, channel/workflow categories, self-canonical paginated listings, and channel-appropriate table headings. Deployment used the existing build with `wrangler deploy --no-autoconfig --minify --upload-source-maps=false` after the larger upload failed. Source maps were omitted only for this invocation to reduce transfer size.

Type checking, focused lint, the editorial audit and `git diff --check` passed. The final post-deployment live route/navigation/screenshot sweep was interrupted by connection timeouts from this environment. Re-run `npm run verify:comparisons` once connectivity is restored; do not treat this record as a claim that the entire post-deployment sweep passed.

All article content is served from Payload and remains editable there. The editorial modules are import archives, not runtime fallbacks. Future full imports overwrite matching CMS content and should be intentional.

## Product clarification update

Published a 106th guide, `whatflow-chat-automation-vs-business-api`, with ten FAQs explaining the separate apps, ratings and review context. Updated `whatflow-vs-dondy` with two primary acquisition announcements, Dondy's continuity statements, and the published roadmap. The apps are cross-linked through Payload relationships.

The two-document SQL update was validated against a fresh 105-document/217-revision backup. All other 104 documents remained identical in the validation, existing Dondy publication details were retained, FAQ and relationship arrays matched their versions, and foreign keys passed. Wrangler confirmed all 34 update statements succeeded. Owner-reported support history is attributed; future rankings are ambitions and future competitor commercial changes are not asserted as facts.

Final verification after this update completed successfully for all 106 live article routes and all five library pages. Checks passed for content/bylines, current FAQ/table/source arrays, pricing examples, anonymous draft protection, canonical URLs, Article/FAQ schemas, demo images, sitemap coverage, search, category navigation and unknown-slug 404. The earlier connectivity-related verification limitation is resolved. The rendered two-app guide was visually inspected and a proof screenshot saved to `/private/tmp/whatflow-two-apps-comparison.jpg`.

## Skill-based enhancement — 25 October 2026

All 106 existing comparisons were enhanced and republished using claude-blog v2.3.1. Each received a distinct verdict, takeaways and practical evaluation guidance; repeated boilerplate was removed, provider-specific pricing/feature details were corrected, and contextual links and search metadata were improved. All five strict checks passed for every article, including independent review. Existing URLs, Safwan Adnan bylines, publication dates, relationships and 219 historical revisions were retained. There are now 325 revisions and 106 latest published snapshots, with no foreign-key errors.

Final live verification passed for all 106 CMS documents/routes, metadata, structured data, citations, images, sitemap, directory/search and draft protection. All 58 published blog documents remained identical to their pre-update hash snapshots. The native template now labels the article and provides a keyboard-focusable horizontal table region. Worker: `f70db1c3-d5fc-4dcd-9d6e-40415819ca83`.

The full change record, research, exact reviews, gate evidence and publication verification are in [the enhancement report](enhancement-2026-10-25/REPORT.md).
