# WhatFlow published library audit — 27 October 2026

Read-only inventory: 58 blogs and 106 comparisons. All 164 published pages crawled.

## Verified technical baseline

All 164 returned HTTP 200, have exactly one H1, self-canonical URLs, indexable robots directives, sitemap coverage, Article/BlogPosting schema, authorship and breadcrumbs. Article dateModified matches CMS updatedAt/reviewedAt. No unknown internal article targets, article-graph orphans or dead ends were found. Robots allow principal search/AI crawlers.

## Canonical analyzer results

Mean **71.3/100**, from 164 successful parses. Buckets: {"90+":0,"70-89":136,"50-69":28,"<50":0}. These are mechanical editorial-readiness heuristics, **not review-gate scores or predicted SEO results**. Missing JSON-LD warnings reflect Markdown export limitations; rendered schema is present on all 164 pages. Do not apply those warnings as site defects.

## Prioritized findings

### P1-entity-schema

**Scope:** Global rendered Organization JSON-LD

**Evidence:** All 164 sampled article pages contain sameAs links to Shopify/WhatsApp Wikipedia/Wikidata entities, +1-800-WHATFLOW placeholder, US address and unverified organization profiles.

**Action:** Remove false identity equivalences and unverified contact/entity properties; keep confirmed WhatFlow identities. Root implementing.

### P1-search-schema

**Scope:** Global WebSite JSON-LD

**Evidence:** SearchAction target uses /blog?search= but real site search uses q.

**Action:** Use actual q parameter or remove unsupported action. Root implementing.

### P1-visual-proof

**Scope:** All 164 articles

**Evidence:** 339 body screenshot placements use 16 distinct screenshots. Template-editor WebP repeats 119 times; Flow order-reply JPG 60 times; Flow triggers JPG 37 times.

**Action:** Capture real inbox, catalog, customer/order extensions, buttons and broadcast configuration; use only screenshots that show the actual claim. Prioritize inbox and catalog pages. Preserve honest sample-data captions.

### P1-padded-comparisons

**Scope:** Comparison library

**Evidence:** 105 comparisons share the same generic budget caveat paragraph; 70 share free-button explanatory paragraph; 65 share four generic section headings; 64 titles end Shopify features, inbox and pricing.

**Action:** Retain short accurate common cost notes but replace unnecessary repetition with specific counterpart pricing inputs, concrete workflow boundaries and evidence. Give priority competitors unique titles/angles. Repeated legal/product truth alone is not proof of duplicate-content penalty.

### P2-segmentation-boundary

**Scope:** whatsapp-customer-segments-vs-generic-bulk-sending; whatsapp-campaign-segmentation-shopify

**Evidence:** Pages discuss Shopify-derived audiences and WhatFlow workflows without explicitly stating native audience/customer-segment sync remains upcoming. They do not explicitly claim sync is live.

**Action:** Add precise current boundary near product recommendation: audience/segment sync is upcoming; describe only presently supported recipient-selection/import/Flow paths after verifying actual interface. Do not promise automatic synchronization.

### P2-live-catalog-proof

**Scope:** Direct commerce competitors: Wati, Interakt, Zoko, AiSensy

**Evidence:** Vendor catalog features are described, but WhatFlow live catalog sharing has no dedicated genuine screenshot among16 body screenshot assets.

**Action:** Show current WhatFlow catalog-sharing workflow and distinguish catalog sharing from ongoing catalog or audience synchronization.

### P2-search-intent

**Scope:** Cart recovery comparison cluster

**Evidence:** Email/SMS/retargeting comparisons share cart-recovery topic; token overlap is only a candidate signal. No GSC query-to-URL evidence exists.

**Action:** Preserve distinct channel buying intent, cross-link to implementation guide, avoid new near-identical cart articles. Do not merge or redirect from title overlap alone.

### P2-conversion-evidence

**Scope:** Entire content library

**Evidence:** No merchant performance measurements validated in this audit; content correctly labels scenarios hypothetical.

**Action:** Add permissioned real merchant case studies and instrument article-to-install conversion; do not relabel hypothetical scenarios as merchant results.

### P3-preview-length

**Scope:** Metadata

**Evidence:** 9 meta titles exceed 60 characters;31 descriptions exceed 160 by 1–5 characters. These are preview warnings, not indexing failures.

**Action:** Adjust only where meaning improves; avoid padded templates and avoid enforcing rigid character quotas.

## Per-page action queue (ascending canonical heuristic score)

| Page | Score | Content /30 | SEO /25 | E-E-A-T /15 | Technical /15 | AI /15 | Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| evaluate-shopify-app-workflow-connectors | 64 | 15 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| multilingual-customer-messaging-shopify | 64 | 15 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| send-whatsapp-templates-shopify-flow | 64 | 15 | 20 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| sidekick-shopify-flow-whatsapp-workflows | 64 | 15 | 20 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| abandoned-checkout-whatsapp-conversation | 65 | 15 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| best-time-review-request-after-delivery | 65 | 15 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| customer-referral-messages-shopify | 65 | 15 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| customer-winback-campaign-shopify | 65 | 15 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| define-store-audience-brand-promise | 65 | 15 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| loyalty-messages-customer-value-shopify | 65 | 15 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| dropshipping-customer-trust-communication | 66 | 15 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| helpful-cross-sell-product-recommendations | 66 | 15 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| influencer-campaign-small-store-plan | 66 | 15 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| photo-video-reviews-customer-permission | 66 | 16 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| review-moderation-policy-small-store | 66 | 16 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| shopify-product-page-trust-checklist | 66 | 15 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-campaign-preflight-checklist | 66 | 16 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-customer-optouts-store-process | 66 | 16 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-message-budget-cost-per-outcome | 66 | 16 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| write-useful-product-faqs-shopify | 66 | 15 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| migrate-review-app-preserve-customer-feedback | 67 | 15 | 22 | 12 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| mobile-store-review-widget-chat-button-layout | 67 | 17 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| shared-team-inbox-small-shopify-business | 68 | 20 | 22 | 10 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| audit-shopify-app-costs-feature-gates-seat-fees | 69 | 20 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| choose-first-automation-shopify-small-team | 69 | 20 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| customer-service-saved-replies-without-robotic-tone | 69 | 21 | 22 | 10 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| review-request-messages-examples-whatsapp-email | 69 | 18 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| shopify-flow-whatsapp-app-integrations | 69 | 20 | 20 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| ai-support-drafts-small-shopify-team | 70 | 21 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| choose-ecommerce-platform-customer-workflows | 70 | 21 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| coordinate-email-sms-whatsapp-customer-messages | 70 | 20 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| prepare-customer-support-black-friday-shopify | 70 | 21 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| repeat-purchase-campaign-without-constant-discounts | 70 | 20 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| replenishment-reminders-shopify-consumables | 70 | 20 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| shopify-content-plan-customer-questions | 70 | 21 | 22 | 11 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-campaign-segmentation-shopify | 70 | 20 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-cod-rules-vs-confirmation-messages | 70 | 21 | 22 | 10 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-incoming-messages-shopify-flow-routing | 70 | 21 | 20 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-order-replies-shopify-flow-cod-confirmation | 70 | 20 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| post-purchase-customer-journey-shopify | 71 | 20 | 22 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| product-questions-whatsapp-prepurchase-support | 71 | 20 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| reuse-customer-reviews-social-media | 71 | 21 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| review-collection-rate-measurement-shopify | 71 | 22 | 22 | 10 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| shopify-whatsapp-app-vs-custom-cloud-api | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| small-shopify-store-metrics-review-routine | 71 | 21 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-automation-vs-manual-order-copying | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-cart-recovery-vs-retargeting-ads | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-customer-segments-vs-generic-bulk-sending | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-inbox-vs-helpdesk-tickets | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-marketing-plan-small-shopify-store | 71 | 21 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-volume-plans-vs-contact-pricing | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-facebook-messenger | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-instagram-dm | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-mobile-push | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-phone-calls | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-rcs | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-telegram | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-web-push | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-website-live-chat | 71 | 21 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| all-features-whatsapp-plans-vs-feature-gating | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| choose-review-app-and-messaging-app-shopify | 72 | 21 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| customer-feedback-loop-product-improvements | 72 | 21 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| customer-review-insights-product-copy | 72 | 20 | 22 | 13 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| growing-shopify-team-whatsapp-vs-seat-upgrades | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| no-seat-fee-whatsapp-inbox-vs-per-seat | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| product-reviews-vs-store-reviews | 72 | 21 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| reduce-cart-abandonment-with-clear-information | 72 | 21 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| respond-negative-product-reviews-shopify | 72 | 22 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| seasonal-shopify-whatsapp-vs-fixed-contract | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| shopify-flow-whatsapp-vs-zapier | 72 | 21 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| shopify-native-whatsapp-vs-external-dashboard | 72 | 21 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| small-shopify-store-whatsapp-vs-enterprise-suite | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatflow-shopify-flow-whatsapp-automation-guide | 72 | 23 | 20 | 13 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatflow-vs-360dialog | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-aisensy | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-bird | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-bitespeed | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-botpress | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-braze | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-chatwoot | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-chaty | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-engati | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-front | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-gallabox | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-infobip | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-insider | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-interakt | 72 | 21 | 22 | 11 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-jivochat | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-klaviyo | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-limechat | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-livechat | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-mailchimp | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-manychat | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-moengage | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-omnisend | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-pushowl | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-sleekflow | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-superlemon | 72 | 20 | 22 | 13 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-telnyx | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-tidio | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-vonage | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-webengage | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-whatsapp-business-app | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-zoho-desk | 72 | 21 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatsapp-cart-recovery-vs-sms | 72 | 21 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-cod-confirmation-vs-phone-calls | 72 | 23 | 22 | 10 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-cod-confirmation-vs-sms | 72 | 22 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-free-plan-vs-free-trial | 72 | 21 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-quick-reply-buttons-customer-choices | 72 | 22 | 22 | 12 | 6 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-shipping-updates-vs-sms | 72 | 21 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-sms | 72 | 21 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| collect-first-product-reviews-shopify | 73 | 23 | 22 | 11 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| maintain-shopify-blog-content-library | 73 | 23 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| product-review-schema-rich-results-explained | 73 | 20 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| shared-whatsapp-inbox-vs-personal-phones | 73 | 23 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| test-social-proof-product-page | 73 | 22 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatflow-vs-attentive | 73 | 22 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-charles | 73 | 22 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-chatarmin | 73 | 21 | 22 | 13 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-chatfuel | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-crisp | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-doubletick | 73 | 22 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-freshchat | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-gupshup | 73 | 22 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-help-scout | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-highlevel | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-hubspot | 73 | 21 | 22 | 13 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-intercom | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-landbot | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-onesignal | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-plivo | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-quickreply | 73 | 21 | 22 | 13 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-rasayel | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-shopify-inbox | 73 | 22 | 22 | 12 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-userlike | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-zendesk | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-zoko | 73 | 21 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatsapp-cod-confirmation-vs-email | 73 | 21 | 22 | 12 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-mms | 73 | 22 | 22 | 12 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| free-whatsapp-button-vs-paid-chat-widget | 74 | 23 | 22 | 11 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| product-variant-review-context | 74 | 21 | 22 | 12 | 7 | 12 | Distinct intent, concrete examples and relevant visuals |
| qr-code-review-requests-product-packaging | 74 | 23 | 22 | 12 | 6 | 11 | Distinct intent, concrete examples and relevant visuals |
| theme-matched-whatsapp-button-vs-floating-widget | 74 | 24 | 22 | 11 | 7 | 10 | Distinct intent, concrete examples and relevant visuals |
| whatflow-chat-automation-vs-business-api | 74 | 22 | 21 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatflow-vs-brevo | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-delightchat | 74 | 22 | 22 | 13 | 7 | 10 | Specific vendor evidence and workflow proof |
| whatflow-vs-gorgias | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-kommo | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-postscript | 74 | 22 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-saysimple | 74 | 22 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-sinch | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-timelinesai | 74 | 22 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-trengo | 74 | 22 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-twilio | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-wati | 74 | 21 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatsapp-business-platform-vs-channels | 74 | 21 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-cart-recovery-vs-email | 74 | 21 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-order-updates-vs-email | 74 | 21 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-review-requests-vs-email | 74 | 21 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-segmented-broadcasts-vs-email-blasts | 74 | 21 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatflow-vs-dondy | 75 | 23 | 22 | 12 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatflow-vs-respond-io | 75 | 22 | 22 | 13 | 7 | 11 | Specific vendor evidence and workflow proof |
| whatsapp-back-in-stock-vs-email | 75 | 22 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |
| whatsapp-vs-email | 75 | 22 | 22 | 13 | 7 | 11 | Distinct intent, concrete examples and relevant visuals |

## Limits and skipped checks

- Canonical analyzer scores are internal editorial-readiness heuristics, not independent factual audits, Google rankings, probabilities or delivery-gate editorial scores.
- Markdown exports omit runtime JSON-LD; all 164 rendered pages contain Article/BlogPosting, Person author and BreadcrumbList. Analyzer missing-schema penalties are export artifacts and are not valid website defects.
- CMS title rendered as sole H1 in exports; all 164 live pages have exactly one H1.
- No substantiated incorrect competitor quote was established by this audit; changing quotes were not exhaustively reverified. Do not represent this as a fresh commercial fact-check of106 comparisons.
- Technical health does not prove originality, search demand, product superiority or conversion performance.
- SKIPPED: GSC query-to-URL cannibalization, indexing, CTR, ranking decay — Credentials/data not supplied
- SKIPPED: GA4 conversion and attribution — Credentials/data not supplied
- SKIPPED: Core Web Vitals field metrics — No field data available in this audit
- SKIPPED: All external source URLs and each changing competitor quote — Not exhaustively reverified; review dates are recent, pricing remains volatile

## Evidence files

- audit.json: findings, score limitations and full 164-page action queue.
- live-inventory.json: public CMS snapshots.
- live-markdown/: faithful content exports for canonical analysis.
- canonical-analysis.json: unchanged analyzer output.
- crawl.json, site-checks.json: rendered technical checks and graphs.
- content-metrics.json: paragraph reuse, screenshot counts, links, source fields and claim candidates.
- live-html/: full public HTML captures (may be moved to local evidence archive to limit repository size).
