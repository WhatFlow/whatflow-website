# Shopify Flow guides — published

Published and verified on 2026-10-25 (Asia/Baku). All six guides are native Payload `posts`, authored by Safwan Adnan, Co-founder and CEO of WhatFlow. The site now has 58 published blog posts and 106 published comparisons.

## Published guides

- `/blog/whatflow-shopify-flow-whatsapp-automation-guide`
- `/blog/whatsapp-order-replies-shopify-flow-cod-confirmation`
- `/blog/whatsapp-incoming-messages-shopify-flow-routing`
- `/blog/send-whatsapp-templates-shopify-flow`
- `/blog/shopify-flow-whatsapp-app-integrations`
- `/blog/sidekick-shopify-flow-whatsapp-workflows`

The approximately 5,800 words include editable Lexical screenshot/CTA blocks and native FAQ, source and tag arrays. `shopify-flow.mjs` is an editorial import archive; the runtime reads Payload documents.

## Real screenshot evidence

Ten JPEG screenshots were captured through the user's existing logged-in Chrome session in WhatFlow Demo Store. They show the five incoming triggers, eight message actions across two views, order-reply conditions and order tagging, incoming-text routing and recipient mapping, Sidekick's generated preview, and approved-template/recipient/body mapping.

`shopify-flow-capture-record.json` records dimensions, hashes and the three demo workflow IDs. All screenshots are 1512 × 787. Each was visually inspected. None were fabricated or modified to simulate results. The demonstrations remain inactive; no WhatsApp messages were sent and no customer orders were changed. The template example demonstrates field mapping and still requires production permission, missing-data, currency-formatting and overlap rules before activation.

The live Judge.me task requires its paid Awesome plan and Send Verified Trigger setting. Its inspected variable list did not supply a buyer phone number. The guide explicitly explains that a supported recipient lookup is required and does not present the Shopify order-event screenshot as proof of a completed Judge.me send.

Sidekick generated the delivery-information trigger, condition and WhatFlow action. The action's sender-number mapping and sample message were inspected; the generated workflow was added to the store and left inactive.

## Deployment and checks

Worker version: `f4dcad62-ad8b-48ea-9b34-536594506dec`.

- Full OpenNext production build and packaging passed.
- All ten deployed screenshot URLs returned valid JPEGs before publication.
- Fresh backup: `/tmp/whatflow-posts-before-flow-publication.sql` (52 published posts and six drafts).
- Scoped SQL was checked in SQLite for preservation of all existing 52 published rows, foreign-key integrity and repeat-import safety. It mutates only the six posts and their tag/FAQ/source arrays.
- The six guides published through normal authenticated Wrangler tooling after assets were live.
- `scripts/verify-flow-posts.mjs` passed: six public routes, correct byline, self-canonical URLs, BlogPosting and FAQ structured data, screenshot references and live images, sources, CTA, guide directory, sitemap and RSS inclusion. Public counts: 58 posts and 106 comparisons.
- Live desktop article inspected. Mobile check at 390px confirmed document width 390px, readable title/byline and no horizontal overflow. Screenshot figures link to the original full-size images. The temporary viewport override was reset.
- Publication screenshots: `flow-publication-preview.jpg` and `flow-publication-mobile.jpg`.
- The completed screenshot reminder was deleted.

Do not use `verify-flow-drafts.mjs` after publication: it records the earlier draft-isolation checks. Use `verify-flow-posts.mjs` for the published state.
