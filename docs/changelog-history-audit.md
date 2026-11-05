# Changelog implementation and historical backfill audit

## Existing implementation

- `src/collections/Changelog.ts` defines Payload entries, publication status and internal commit fields. Public reads are restricted to published entries; commit fields are restricted to signed-in users.
- `src/lib/changelog-data.ts` supplies curated seeds, application labels and date conversion at midday UTC. Existing entries are preserved.
- `src/lib/changelog.ts` reads published CMS entries, sorted newest first, with a 500-entry limit. It uses the seed only when the CMS is empty or unavailable; adding seeds alone does not extend a populated CMS.
- The index supports app/type filters, monthly groups, counts, date range, metadata and structured data. Detail pages use the same data for neighboring entries and related updates.
- RSS, `/ai/changelog.json`, the sitemap and feature-page release cards share this data accessor. RSS intentionally includes only the latest 50 entries; the index, detail pages and AI endpoint expose the full history. The REST fetch cache revalidates after 60 seconds; see `marketing-page-cache.md` for page caching behavior.
- `scripts/seed-changelog.ts --remote` inserts missing slugs into the production CMS. Do not use `--update` for a historical backfill: existing editorial changes must survive. Public bodies are generated as Lexical headings and bullets.

## Scope and dating

Source: sibling `whatflow` Git repository, current branch ancestry. It is not shallow. The first commit is `3a90500` (2024-12-18); no earlier launch date is inferred. The old curated history began on 2025-11-07. This backfill covers the earlier linked-account/unofficial app only. No early entry is attributed to the later official API app.

Dates use the recorded author calendar date (the existing log convention). These are reconstructed development milestones, not independently verified production deployments. Date-like versions are editorial labels, not Git tags. The initial entry describes the first recorded version, not a claimed public launch. Related commits are consolidated into merchant-facing milestones. Existing November 7 engine-switching coverage absorbs November 5–6 implementation work instead of duplicating it.

Dependency updates, formatting, logging, configuration-only changes, merges, transient experiments/reverts and internal infrastructure changes without a distinct merchant outcome are not separate public releases. Later commits are checked to avoid announcing a settings screen as a fully working feature: stock sign-up and delivery are separate milestones; draft recovery is dated to the implemented send/image flow. No standalone review-request launch is inferred from July localization/template scaffolding.

## Milestone evidence

Commit references remain in this maintainer document and never enter public release copy.

| Date | Public slug | Evidence commits |
| --- | --- | --- |
| 2024-12-18 | chat-history-first-order-confirmation-history | `3a90500`, `37aff11`, `a0cc3d3` |
| 2024-12-19 | chat-history-confirmation-contact-checks | `a0cc3d3`, `6c365aa` |
| 2024-12-31 | chat-history-confirmation-phone-and-connection-checks | `f51e455`, `bc75b46`, `ff4853d` |
| 2025-01-01 | chat-history-early-dashboard-loading | `97aa3cc`, `be5e077` |
| 2025-01-26 | chat-history-confirmation-order-matching | `74638eb`, `27999b8`, `6131869`, `482eb0a`, `51494f5` |
| 2025-02-10 | chat-history-detailed-address-placeholders | `9dffa80` |
| 2025-02-11 | chat-history-order-age-filtering | `673ff02` |
| 2025-03-19 | chat-history-confirmation-item-details | `daca50a`, `5deb1f2`, `76dc7a5`, `1f31b53`, `bde7e4a` |
| 2025-03-24 | chat-history-confirmation-settings-editor | `d48a715`, `1edcc23`, `116f8b3`, `01b3078`, `ef4058d`, `9f4debe` |
| 2025-03-27 | chat-history-scheduled-order-confirmations | `6ce8444`, `d1281e8`, `f41be0c` |
| 2025-03-29 | chat-history-fulfillment-and-cancellation-automation | `2c8b256`, `b967d3e`, `e609d92`, `1e0b4ca`, `172d34b` |
| 2025-04-02 | chat-history-normalized-confirmation-responses | `7116f10` |
| 2025-04-05 | chat-history-customer-and-admin-order-notifications | `a7d9a6d`, `85b0ab8`, `c0fa5d9` |
| 2025-04-12 | chat-history-storefront-whatsapp-chat-button | `2d35525`, `236c3df`, `c5caf64`, `2f31078`, `7a428e1`, `5f91764`, `7bbcf3c` |
| 2025-04-27 | chat-history-early-shopify-flow-guide | `f61270d`, `f6105d5`, `dfa6b7a` |
| 2025-05-04 | chat-history-international-phone-support | `df331fe`, `28b23b7`, `978c87b` |
| 2025-05-08 | chat-history-multiline-confirmation-polls | `685e3ab` |
| 2025-05-20 | chat-history-queued-fulfillment-messages | `c4219c8` |
| 2025-05-31 | chat-history-whatsapp-send-validation | `d834b21`, `80e8142`, `3b56343` |
| 2025-06-29 | chat-history-shopify-integration-compatibility | `23709a9` |
| 2025-07-06 | chat-history-csv-bulk-whatsapp-sender | `915802a`, `d48c01e`, `6ccf8c9`, `5795d71`, `e2b9320`, `51a4846` |
| 2025-07-10 | chat-history-abandoned-checkout-recovery-launch | `7a6f297`, `12f759f`, `c37fe87`, `973f415`, `3637a56`, `2cbc0e4`, `eea5f6b`, `032fec8` |
| 2025-07-12 | chat-history-order-images-in-messages | `cb8406b`, `b8e55fe`, `44dab75` |
| 2025-07-16 | chat-history-recovery-formatting-and-image-sending | `77e46ff`, `131ea25`, `0aeaf0f` |
| 2025-07-21 | chat-history-chat-button-page-visibility | `85f30a8` |
| 2025-07-24 | chat-history-fulfilled-item-message-details | `8146674`, `3444b26`, `7597c2c` |
| 2025-07-28 | chat-history-order-statistics-and-poll-tag-updates | `57e2a31`, `9d3e384`, `646eac5`, `e264b81`, `9eb2955` |
| 2025-08-07 | chat-history-chat-button-agent-manager | `da1ab5e` |
| 2025-08-13 | chat-history-back-in-stock-signup-widget | `1cb6e36`, `c6007a3`, `af4df33` |
| 2025-08-14 | chat-history-early-webhook-verification | `8308f45` |
| 2025-08-15 | chat-history-inclusive-checkout-date-filters | `966028e` |
| 2025-08-20 | chat-history-draft-order-recovery-launch | `7dd91d6`, `318da95`, `d6cfdca`, `25e6eb0`, `5cce21a`, `89eaaeb`, `b944ae4` |
| 2025-08-25 | chat-history-manual-and-event-checkout-recovery | `e01e3ca`, `47e0caa`, `daba508`, `56711cf`, `544ccc0`, `ac6834b` |
| 2025-08-28 | chat-history-stop-recovery-on-uninstall | `8e0d600`, `31f6228` |
| 2025-09-07 | chat-history-stock-alert-delivery-and-positioning | `843db42`, `aec634b` |
| 2025-09-07 | chat-history-confirmation-list-messages | `9e98158`, `d521594`, `eb77c71` |
| 2025-09-09 | chat-history-automatic-replies-and-list-responses | `91c646b`, `77c4ecf`, `d358e7c`, `2a25a66`, `4a14ba3`, `efc5c72` |
| 2025-09-23 | chat-history-automation-reliability-and-bulk-scheduling | `13f4dd7`, `c5712ab`, `c5487ee`, `40e7064` |
| 2025-09-24 | chat-history-early-message-usage-dashboard | `843d9d3`, `799185d` |
| 2025-09-29 | chat-history-cart-whatsapp-order-button | `899d623` |
| 2025-10-03 | chat-history-stock-widget-feedback-and-flow-lists | `72b8dfb`, `5cd517f` |
| 2025-10-17 | chat-history-direct-order-button-customization | `9645919`, `f476b6a`, `ca1407d`, `d0ec3d4`, `1b3a8a2`, `acd0bf7` |
| 2025-10-22 | chat-history-chat-button-greetings-and-logos | `8c74e5b`, `3fa343c`, `857c5f0`, `4a3e77c` |
| 2025-10-23 | chat-history-confirmation-poll-fallback | `8e3672d` |
| 2025-10-24 | chat-history-send-order-messages-admin-action | `8a1a616`, `eaba27f`, `92063b0`, `b3838b0`, `893e01c`, `ea675cf` |
| 2025-10-25 | chat-history-connection-switch-and-order-images | `f2be6c0`, `cb22f4b` |
| 2025-11-05 | chat-history-dynamic-storefront-chat-messages | `4b05a30`, `e4eab19`, `f6a058d` |
| 2025-10-27 | chat-history-admin-checkout-and-draft-recovery | `e9758e0`, `1173674` |
| 2025-10-29 | chat-history-draft-images-and-typing-feedback | `ddd08c3`, `00f8412`, `fadee99`, `9c306e2` |

## History inventory

Reviewed the subjects and changed-file inventory across all 358 commits before the existing cutoff, including commits with generic refactor messages. Targeted patches and initial source snapshots establish the merchant-facing evidence above. In particular, generic October 27 refactors contained checkout/draft admin actions and are included, rather than dropped by message wording.

| Month | Recorded commits |
| --- | ---: |
| 2024-12 | 8 |
| 2025-01 | 9 |
| 2025-02 | 3 |
| 2025-03 | 44 |
| 2025-04 | 32 |
| 2025-05 | 20 |
| 2025-06 | 1 |
| 2025-07 | 71 |
| 2025-08 | 40 |
| 2025-09 | 50 |
| 2025-10 | 66 |
| 2025-11 | 14 |

## Maintenance procedure

1. Inspect original changes and subsequent fixes before dating a milestone; never infer a launch from a commit title alone.
2. Add merchant-facing entries to the curated data using unique stable slugs and the correct app label. Keep internal evidence here.
3. Run TypeScript, targeted lint and seed validation.
4. Run `npm run seed:changelog -- --remote --check`, review inserts, then run `npm run seed:changelog -- --remote` without `--update`.
5. Verify the public CMS response, detail page, RSS and AI feed after caches expire. A seed changes CMS data immediately; source fallback changes become active on the next website deployment.

## Backfill result (2026-11-05)

- Added 49 entries spanning 2024-12-18 through 2025-11-05; preserved all 82 existing seed entries unchanged.
- Production seed dry run: 82 existing, 49 inserts, zero updates. Insert completed with 131 published CMS entries.
- Validated unique slugs, chronological sorting, date/version consistency, unofficial-app attribution and existing-content preservation. Seed copy guards and targeted ESLint passed.
- TypeScript passed with `node --stack-size=8192 node_modules/typescript/bin/tsc --noEmit`; the default Node stack overflows in this repository type check.
- Source fallback data is ready for the next normal deployment; the live site receives the historical content immediately through the CMS.
- Live verification: public CMS returned 131 entries, including 49 backfill entries and the earliest date 2024-12-18, with no internal commit fields exposed. Index, earliest detail page and AI feed returned HTTP 200 and included the earliest milestone. RSS returned HTTP 200 and retained its latest-50 policy.
