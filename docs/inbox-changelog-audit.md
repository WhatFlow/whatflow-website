# Inbox changelog audit

## Scope

Audited all 112 commits on the current `whatflow-inbox` branch, from `48f5812` (2026-09-05) through `ec91c65` (2026-11-03). The repository is not shallow. Checked commit subjects, changed-file inventories, feature implementations and the repository feature/release documents. This audit changes the marketing changelog only; no Inbox code, accounts, messages, configuration or deployment are changed.

The marketing changelog already covered the launch, Flows forms, broadcasts, collaboration, performance, catalog, blocklist, AI connections, coexistence, analytics, November triage and outbound webhooks. Those stable entries and their published URLs are preserved. The detailed milestones below expose previously omitted capabilities rather than creating a second Inbox launch. Inbox remains part of the Official API App (`business-api`); it is not attributed to the unofficial app.

## Date and rollout rules

Dates are recorded author calendar dates for historical source milestones, not independently verified launch dates unless release receipts say so. Never infer production deployment from a feature commit or a development rollout alone.

- `docs/INBOX_TEAM_ROLLOUT.md` confirms the September 17 production rollout for accounts, assignments and workflows. Earlier library docs describe development-first work; the September 15 entries are implementation milestones, not claims that production launched that day.
- `docs/2026-10-13-test-send-new-chat-release.md` explicitly records development-only deployment. No separate public release claim is added for this change. It remains held pending a production-specific rollout record; later source presence alone does not establish an October 13 production release.
- `docs/incidents/2026-10-22-password-setup.md` confirms production rollout of the onboarding fix. Customer account details from that incident are not copied into public release notes.
- `docs/2026-11-02-voice-message-playback.md` confirms source-matched production/development releases and describes the limits of audio verification. The entry does not claim corrupt or unsupported audio is repaired.
- The outbound webhook feature has an October 28 author date but was integrated in the November 3 history with follow-up bounds and table setup. Preserve the existing November 3 public milestone; the additional entry explains its management tools.
- The September 6 interface port contained pages later marked Coming soon on September 7. These are not treated as launches; Flows, broadcasts, contacts and catalog use subsequent implemented milestones.

## Detailed additions

| Date | Public slug | Evidence commits | Implementation evidence |
| --- | --- | --- | --- |
| 2026-09-09 | team-inbox-stickers-and-voice-recording | `6d83c86` | Media rendering, validation and recording changes in the evidence commit |
| 2026-09-14 | team-inbox-broadcast-audiences-and-scheduling | `8f8b271` | CreateBroadcastWizard; upload/import APIs; scheduled broadcast runner |
| 2026-09-14 | team-inbox-broadcast-reports-and-controls | `8f8b271` | BroadcastAnalyticsPanel; recipient export; pause/retry/clone APIs |
| 2026-09-15 | team-inbox-conversation-starters | `a7dc96d` | conversational-components service, validation, page and feature document |
| 2026-09-15 | team-inbox-message-reactions | `a7dc96d` | message-reactions service, MessageBubble and feature document |
| 2026-09-15 | team-inbox-labels-and-filtering | `81d0d15` | inbox-library and conversation-list services; labels page and feature document |
| 2026-09-15 | team-inbox-canned-response-library | `0bce5a3`, `81d0d15` | Composer; inbox-library; canned responses page and feature document |
| 2026-09-15 | team-inbox-typed-customer-fields | `81d0d15` | custom-attributes service; CustomAttributeValues; feature document |
| 2026-09-17 | team-inbox-owner-and-agent-access | `dd3ee62` | team/assignment/account APIs; AccountTeamSettings; production rollout document |
| 2026-09-17 | team-inbox-private-note-drafts | `63a10b1` | private-notes service; composer and note drafts; feature document |
| 2026-09-17 | team-inbox-workflow-builder | `feb5e4a`, `dd3ee62` | workflow editor/graph; inbox-workflows service; WorkflowRunner; feature document |
| 2026-09-30 | team-inbox-workflow-trigger-options | `40c6eac`, `039dc48` | allowed-origin/open-access handling and API workflow document |
| 2026-10-14 | team-inbox-shopify-contact-sync | `9ec49cd` | contacts-sync service; Contacts page; privacy-redaction API |
| 2026-10-22 | team-inbox-first-login-password-fix | `f178fcc`, `344e8c0` | Settings gate; auth/socket contexts; production incident receipt |
| 2026-10-27 | team-inbox-ai-draft-review | `2064b03` | mcp service sendTool/decideDraft; drafts API; draft review component |
| 2026-10-27 | team-inbox-ai-inbox-tools | `2064b03` | mcp executeTool dispatch, assignment/label/note/product/broadcast-draft tools |
| 2026-10-31 | team-inbox-coexistence-history-import-fix | `6596609` | coexistence import timestamp handling |
| 2026-11-02 | team-inbox-voice-playback-and-seeking | `04b2302`, `ddbcbb4` | voice playback hook; authenticated media range handling; release receipt |
| 2026-11-03 | team-inbox-typing-and-unread-triage | `f2d4e65` | InboxSync typing relay; conversation header and unread timeline |
| 2026-11-03 | team-inbox-chat-search-and-shortcuts | `f2d4e65`, `1c00f94` | CommandPalette; conversation search; VirtualTimeline; shortcuts sheet |
| 2026-11-03 | team-inbox-personalized-responses-and-drafts | `1c00f94` | Composer variables/counter; reply-drafts helpers |
| 2026-11-03 | team-inbox-delivery-status-and-retry | `1c00f94` | MessageBubble; meta-errors helper |
| 2026-11-03 | team-inbox-template-copy-and-resubmit | `1c00f94` | TemplatesPage startFromTemplate; broadcast wizard launch summary |
| 2026-11-03 | team-inbox-media-viewer-and-downloads | `1c00f94` | ContactProfileDrawer media viewer and selection controls |
| 2026-11-03 | team-inbox-accessibility-and-feedback | `fe2b324`, `1c00f94` | UI polish document; named controls; AppDialogProvider; sidebar/mobile UI |
| 2026-11-03 | team-inbox-webhook-delivery-management | `87a262a`, `38c76b3`, `ec91c65` | outbound webhooks service; Webhooks page; feature document |

## Coverage already represented

| Repository work | Existing changelog entry |
| --- | --- |
| September 5–7 foundation, linked sign-in, coexistence echoes, realtime, mobile, notifications | `whatsapp-team-inbox-launch` |
| September 11 WhatsApp Flows forms and encryption | `whatsapp-flows-management` |
| September 14 template parameter alignment and send retries | `whatsapp-broadcasts-in-team-inbox` |
| September 17 assignments, notes, canned responses, reactions and attributes overview | `team-inbox-collaboration` |
| September 25/29 faster navigation, virtualized history and reconnect recovery; September 30 URL previews | `team-inbox-speed` |
| October 13–15 consent and opt-out enforcement | `shared-blocklist-and-opt-out-handling` |
| October 14 catalog sync, products, checkout links and multi-product templates | `whatsapp-catalog-and-checkout-links` |
| October 20 faster webhook handling and duplicate-safe status counts | `faster-incoming-message-handling` |
| October 27/29 AI connections and short codes | `connect-ai-assistants-with-mcp` |
| October 28 messaging accounts and history import | `embedded-signup-v5-messaging-accounts` |
| October 31 Shopify message events | `whatsapp-in-shopify-analytics` |
| November 3 done/undo/bulk/order context and reply-window triage overview | `team-inbox-triage-and-reply-window` |
| November 3 signed outbound events | `team-inbox-outbound-webhooks` |

## Claims deliberately not expanded

- Canned responses are internal draft snippets; WhatsApp customer slash commands are a separate feature. Neither entry claims the customer commands run automatic replies.
- Inbox workflows and WhatsApp Flows forms remain separate products and entries.
- The workflow editor supports a limited step set; the entry does not claim arbitrary integrations, cyclic graphs or unrestricted template parameter support.
- Drafting a broadcast with an AI connection does not choose an audience or send it.
- Photo/audio/document/video download preferences appear in Settings, but this audit did not establish consumers for all saved preferences. Do not promote every settings toggle as working automatic downloading based solely on its presence.
- Reactions belong to the WhatsApp business number rather than individual teammate identities.
- A generically titled September 30 logging refactor (`039dc48`) also introduced explicit open-access workflow triggers. That part of the workflow entry is dated September 30 rather than September 22.
- AI draft approval sends as the reviewing human and checks their ownership and messaging rules. Automated template blocklist enforcement is a separate path; no claim is made that approval repeats that automated check.
- No internal security exploit details, service names, migration instructions, incident customer data or commit identifiers enter public copy.

## Complete commit disposition

Every reachable commit is listed below. “Detailed” refers to the additions above; “existing umbrella / maintenance” means the source change is already covered at overview level, is supporting infrastructure, or has no separate merchant-facing release. Explicitly held development-only work is identified separately.

| Commit | Date | Disposition |
| --- | --- | --- |
| `48f5812` | 2026-09-05 | Repository template; not a public product launch |
| `0662757` | 2026-09-05 | Existing umbrella / maintenance |
| `55e3e3d` | 2026-09-05 | Existing umbrella / maintenance |
| `77a3761` | 2026-09-05 | Existing umbrella / maintenance |
| `969ed65` | 2026-09-06 | Existing umbrella / maintenance |
| `42b41d3` | 2026-09-06 | Existing umbrella / maintenance |
| `2f3b5c1` | 2026-09-06 | Existing umbrella / maintenance |
| `920b1c1` | 2026-09-06 | Existing umbrella / maintenance |
| `416f002` | 2026-09-06 | Interface port / Coming soon placeholders; use implemented launches |
| `54b6f85` | 2026-09-06 | Existing umbrella / maintenance |
| `7a8d4dd` | 2026-09-06 | Existing umbrella / maintenance |
| `8240a18` | 2026-09-06 | Existing umbrella / maintenance |
| `961f0ab` | 2026-09-07 | Existing umbrella / maintenance |
| `c6153ae` | 2026-09-07 | Existing umbrella / maintenance |
| `d36b219` | 2026-09-07 | Existing umbrella / maintenance |
| `7fd15d8` | 2026-09-07 | Existing umbrella / maintenance |
| `15e02a5` | 2026-09-07 | Existing umbrella / maintenance |
| `d7ba27d` | 2026-09-07 | Existing umbrella / maintenance |
| `7e726a9` | 2026-09-07 | Existing umbrella / maintenance |
| `ad6b004` | 2026-09-07 | Existing umbrella / maintenance |
| `3943fea` | 2026-09-07 | Existing umbrella / maintenance |
| `b666b5b` | 2026-09-07 | Interface port / Coming soon placeholders; use implemented launches |
| `6b9d8a8` | 2026-09-07 | Existing umbrella / maintenance |
| `60fa55a` | 2026-09-07 | Existing umbrella / maintenance |
| `1ae3cde` | 2026-09-07 | Existing umbrella / maintenance |
| `f33077f` | 2026-09-07 | Existing umbrella / maintenance |
| `0e8a38f` | 2026-09-07 | Existing umbrella / maintenance |
| `b46e73e` | 2026-09-07 | Existing umbrella / maintenance |
| `3a851ac` | 2026-09-07 | Existing umbrella / maintenance |
| `0ec3965` | 2026-09-07 | Existing umbrella / maintenance |
| `a1eb6ec` | 2026-09-07 | Existing umbrella / maintenance |
| `5124182` | 2026-09-07 | Existing umbrella / maintenance |
| `0bce5a3` | 2026-09-07 | Detailed milestone above |
| `b8caf93` | 2026-09-09 | Existing umbrella / maintenance |
| `6d83c86` | 2026-09-09 | Detailed milestone above |
| `4d89440` | 2026-09-10 | Existing umbrella / maintenance |
| `ae7a67a` | 2026-09-10 | Existing umbrella / maintenance |
| `c9d51a1` | 2026-09-10 | Existing umbrella / maintenance |
| `b41ade5` | 2026-09-11 | Existing umbrella / maintenance |
| `134e7aa` | 2026-09-11 | Existing umbrella / maintenance |
| `8f8b271` | 2026-09-14 | Detailed milestone above |
| `fdf76da` | 2026-09-14 | Existing umbrella / maintenance |
| `a73113b` | 2026-09-14 | Existing umbrella / maintenance |
| `f1eeaa4` | 2026-09-14 | Existing umbrella / maintenance |
| `bba6625` | 2026-09-14 | Existing umbrella / maintenance |
| `a84684c` | 2026-09-15 | Existing umbrella / maintenance |
| `a7dc96d` | 2026-09-15 | Detailed milestone above |
| `81d0d15` | 2026-09-15 | Detailed milestone above |
| `b156b8c` | 2026-09-15 | Existing umbrella / maintenance |
| `a38e5c6` | 2026-09-16 | Existing umbrella / maintenance |
| `0ca511e` | 2026-09-16 | Existing umbrella / maintenance |
| `cad3be5` | 2026-09-16 | Existing umbrella / maintenance |
| `feb5e4a` | 2026-09-17 | Detailed milestone above |
| `dd3ee62` | 2026-09-17 | Detailed milestone above |
| `b725cbd` | 2026-09-17 | Existing umbrella / maintenance |
| `db8dc58` | 2026-09-17 | Existing umbrella / maintenance |
| `96c53bb` | 2026-09-17 | Existing umbrella / maintenance |
| `2eac650` | 2026-09-17 | Existing umbrella / maintenance |
| `63a10b1` | 2026-09-17 | Detailed milestone above |
| `e246138` | 2026-09-17 | Existing umbrella / maintenance |
| `577fe3f` | 2026-09-17 | Existing umbrella / maintenance |
| `f766d0a` | 2026-09-18 | Existing umbrella / maintenance |
| `260196b` | 2026-09-18 | Existing umbrella / maintenance |
| `40c6eac` | 2026-09-22 | Detailed milestone above |
| `eca4bca` | 2026-09-22 | Existing umbrella / maintenance |
| `19a21d8` | 2026-09-23 | Existing umbrella / maintenance |
| `f7941cb` | 2026-09-22 | Existing umbrella / maintenance |
| `a00556c` | 2026-09-23 | Existing umbrella / maintenance |
| `abaed09` | 2026-09-25 | Existing umbrella / maintenance |
| `1c8a63a` | 2026-09-29 | Existing umbrella / maintenance |
| `039dc48` | 2026-09-30 | Detailed milestone above |
| `a291051` | 2026-09-30 | Existing umbrella / maintenance |
| `9531212` | 2026-10-10 | Existing umbrella / maintenance |
| `3aec562` | 2026-10-10 | Existing umbrella / maintenance |
| `ece1ccc` | 2026-10-10 | Existing umbrella / maintenance |
| `d8637ad` | 2026-10-10 | Existing umbrella / maintenance |
| `05bdc76` | 2026-10-10 | Existing umbrella / maintenance |
| `f63565d` | 2026-10-11 | Existing umbrella / maintenance |
| `d588c5f` | 2026-10-11 | Existing umbrella / maintenance |
| `7f41c12` | 2026-10-11 | Existing umbrella / maintenance |
| `c522453` | 2026-10-13 | Held: development-only new-chat and broadcast-test recording release |
| `69c619b` | 2026-10-13 | Existing umbrella / maintenance |
| `9ec49cd` | 2026-10-14 | Detailed milestone above |
| `c81a599` | 2026-10-14 | Existing umbrella / maintenance |
| `32f7665` | 2026-10-14 | Existing umbrella / maintenance |
| `1b3f7d8` | 2026-10-14 | Existing umbrella / maintenance |
| `9078ca8` | 2026-10-14 | Existing umbrella / maintenance |
| `c9ce593` | 2026-10-19 | Existing umbrella / maintenance |
| `f907c1e` | 2026-10-20 | Existing umbrella / maintenance |
| `db32535` | 2026-10-20 | Existing umbrella / maintenance |
| `60e9d9e` | 2026-10-20 | Existing umbrella / maintenance |
| `6c93ac9` | 2026-10-20 | Existing umbrella / maintenance |
| `493cf96` | 2026-10-20 | Existing umbrella / maintenance |
| `f178fcc` | 2026-10-22 | Detailed milestone above |
| `344e8c0` | 2026-10-22 | Detailed milestone above |
| `4aec86f` | 2026-10-26 | Existing umbrella / maintenance |
| `2064b03` | 2026-10-27 | Detailed milestone above |
| `03341bc` | 2026-10-27 | Existing umbrella / maintenance |
| `f9fc8e4` | 2026-10-28 | Existing umbrella / maintenance |
| `30111a0` | 2026-10-29 | Existing umbrella / maintenance |
| `e224019` | 2026-10-29 | Existing umbrella / maintenance |
| `d4bb73c` | 2026-10-31 | Existing umbrella / maintenance |
| `6596609` | 2026-10-31 | Detailed milestone above |
| `04b2302` | 2026-11-02 | Detailed milestone above |
| `ddbcbb4` | 2026-11-02 | Detailed milestone above |
| `f2d4e65` | 2026-11-03 | Detailed milestone above |
| `fe2b324` | 2026-11-03 | Detailed milestone above |
| `9ef738f` | 2026-11-03 | Existing umbrella / maintenance |
| `1c00f94` | 2026-11-03 | Detailed milestone above |
| `87a262a` | 2026-10-28 | Detailed milestone above |
| `38c76b3` | 2026-11-03 | Detailed milestone above |
| `ec91c65` | 2026-11-03 | Detailed milestone above |

## Publishing and verification

Use the existing insert-only seed; do not use `--update`. Verify existing entries remain unchanged, unique slugs, valid app/type/date values, plain-language copy and the production CMS before publishing. Public index/detail/AI routes read the CMS first. Source fallback changes require the normal marketing-site deployment. RSS intentionally contains the latest 50 entries only.

Audited source snapshot: `ec91c6591c5fa355c018a21f41292e40907a7fae`.

## Verification result (2026-11-05)

- Current curated/CMS baseline: 126 entries after the separate December-history review. Added 26 Inbox entries, for 152 total.
- Exact comparisons verified all 126 existing curated entries and all 126 public CMS documents remained unchanged.
- Scoped seed dry run and publication: 26 inserts, zero updates, zero removals.
- Offline CMS-failure verification returned the full curated fallback and all 26 new rich-text bodies yielded their expected bullet lists.
- Unique slugs, chronological sorting, date/version agreement, Official API app attribution and summary lengths passed. The seed public-copy guards, targeted ESLint and TypeScript check passed.
- TypeScript command: `node --stack-size=8192 node_modules/typescript/bin/tsc --noEmit`.
