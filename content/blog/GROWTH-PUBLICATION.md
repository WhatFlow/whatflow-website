# Original WhatFlow merchant guide library

Prepared and published through native Payload `posts` on 2026-10-24. Author: Safwan Adnan, Co-founder and CEO of WhatFlow.

## Scope

52 original articles, 32,975 body words before FAQs, sources, related links and CTA blocks:

- 11 reviews and trust guides
- 8 conversion guides
- 8 retention guides
- 6 WhatsApp guides
- 14 store-operations guides
- 5 SEO and content guides

The website serves editable Payload documents. `growth/*.mjs` is the editorial source archive and is not a runtime fallback. Article metadata, byline, FAQs, sources, tags and rich text are native CMS fields. Two relevant articles reuse an actual owned WhatFlow demo-store template-editor screenshot, with a sample-data caption. No Judge.me images or article bodies were copied.

## Judge.me research evidence and limits

The public HTTP index and sitemap initially returned access errors. The normal in-app browser eventually loaded the live blog. Its Load more pagination was exhausted, exposing **273 unique article cards**. `judgeme-live-inventory.json` records every observed URL, title and category.

Six article bodies were read. Subsequent article navigation returned an automated challenge-attempts-exceeded page; further article requests stopped. `judgeme-article-audit.json` records successful and failed reads. This is a complete inventory of the observed main blog index, **not a complete body-level review of all 273 articles**, nor a claim that unlisted/orphaned pages were found.

`judgeme-topic-map.json` records an editorial disposition for every inventory entry. 208 entries map to related original guides; 65 remain attributed source-specific references, including interviews, case studies, awards and company announcements. A mapping means related merchant-task coverage, not a paragraph rewrite or equivalent one-to-one article. No Judge.me interview, growth statistic, event or award was fabricated as a WhatFlow experience.

## Publishing and recovery

Before the first import, the existing four post tables were exported to `/tmp/whatflow-posts-before-growth.sql` and validated locally. It contained the six pending Flow guides. Only the `posts`, `posts_tags`, `posts_faqs` and `posts_sources` tables are mutated by the scoped importer.

```
node scripts/audit-growth-posts.mjs
node scripts/map-judgeme-topics.mjs
node scripts/build-growth-posts-import.mjs --publish
```

The last command writes `/tmp/whatflow-growth-publish.sql`. Normal authenticated Wrangler executes that file. It preserves existing document IDs, original creation/publication dates, unrelated posts and the six pending Flow screenshot drafts. No credentials are extracted or manually handled.

The initial 48 guides were published, then the final four strategic guides expanded the library to 52. The six Flow screenshot guides remain drafts and require the real demo screenshots later. A one-time thread reminder was created for tomorrow at 10 AM local time (`finish-shopify-flow-screenshots`).

## Website changes

- Topic filters and native Payload select options for reviews, conversion, retention, WhatsApp, operations and SEO.
- Title/excerpt search with category-preserving pagination and noindex search results.
- Twelve articles per directory page, category metadata, self canonicals and existing article/FAQ structured data.
- Sitemap walks all published post pages instead of silently stopping at 100.
- Text-only articles omit the empty cover banner; relevant real screenshots retain captions.
- Blog CTAs and the shared announcement use the current Free-plan positioning rather than an old blanket 14-day-trial claim.

## Validation

- Original-content audit: 52 unique slugs and titles, distinct body paragraphs, no substantial seven-word phrase overlap between articles, excerpts within 160 characters, sources and FAQs present.
- Scoped SQLite import: foreign keys valid, existing Flow documents unchanged, repeated imports preserve IDs and array counts.
- Actual React rich-text rendering checked for all earlier 48 documents; final 52-body rendering is included in the final verification record.
- Separate TypeScript checks, focused ESLint and production/OpenNext builds pass. Existing dependency bundler warnings remain.
- Public Flow-draft verification passes: no anonymous draft documents, no draft bodies in public routes, no draft RSS/sitemap entries; 106 comparisons retained. Next.js streams a noindex not-found result with HTTP 200 for some missing post URLs, so the verifier checks the content and indexing directive as well as status.
- Final live article, taxonomy, search, RSS and sitemap results are recorded in `/tmp/whatflow-growth-live-verification.json` when complete.

## Deployment record

Blog taxonomy/search/sitemap deployment succeeded as worker version `bf43c251-f715-4322-8a79-7c6f95726455`. The first upload attempt failed before activation; a normal Wrangler retry through the configured network succeeded.

A final announcement/default-CTA correction deployment is in progress; append its confirmed version after completion.

Final announcement/default-CTA correction deployed successfully as worker version `76890d65-716f-4974-b1e5-e96a66ffedc0`. The confirmed normal Wrangler upload took about 155 seconds. All 52 stored Lexical bodies also passed rendering, heading, CTA and internal-link checks.

## Final live verification

Completed 2026-10-24:

- All 52 published article routes passed author, role, source links, self canonical, BlogPosting and FAQPage checks.
- All five directory pages and all topic pages, including the second operations page, expose the expected articles.
- Search works and its result pages are noindex.
- Sitemap contains all 52 articles. RSS correctly contains the latest 50 items.
- All six Flow drafts remain excluded from anonymous API responses, public article bodies, RSS and sitemap.
- All 106 comparisons remain published.
- Browser visibly confirmed `52 Posts`, the new category filters, search and the corrected Free-plan announcement. Screenshot: `/private/tmp/whatflow-blog-52-articles.jpg`.
- Final focused ESLint check passed without warnings for the new editorial modules, import/audit/mapping/verification scripts, taxonomy, collection, blog pages and announcement component.

Machine-readable reports: `/tmp/whatflow-growth-live-verification.json`, `/tmp/whatflow-flow-drafts-verification.json`, `/tmp/whatflow-growth-audit.json`, `/tmp/whatflow-growth-render-verification.json`.
