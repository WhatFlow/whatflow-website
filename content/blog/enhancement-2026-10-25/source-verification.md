# Source verification research packet

Retrieved: 2026-10-25. Researcher output, not a content-review scorecard or gate clearance.

Scope: official operational sources referenced by 58 existing WhatFlow posts. All 19 distinct source URLs produced readable official content through the web tool. URL readability alone does not establish that every article statement is factually correct. No challenged Judge.me blog pages were retried, no challenges were bypassed, and no source bodies were copied.

Pre-flight: no keyword traps. Named entities: Judge.me collection, ownership and verification; WhatsApp platform policy and pricing; Shopify Flow connectors and Sidekick; WhatFlow listing. This is an official-document check, not independent product testing or a quantitative outcome study. Most operational requirements necessarily depend on their controlling platform's documentation.

## Judge.me

| Source and exact URL | Status, date and supported scope |
|---|---|
| [Customizing your review form](https://judge.me/help/en/articles/11419250-customizing-your-review-form) | Readable; August 19, 2026. In-store and external forms, review links, request emails, QR codes and photo/video submission. Compact layout is an Early Users feature. Layouts differ; do not assume a single universal form. |
| [How do we collect reviews?](https://judge.me/help/en/articles/8287254-how-do-we-collect-reviews) | Readable; September 17, 2025. Invited reviews, organic forms on Judge.me/storefronts and imported reviews. Collection routes do not imply universal verification. |
| [Guidelines on Reviews content](https://judge.me/help/en/articles/8287316-guidelines-on-reviews-content) | Readable; August 19, 2026. Authors own their reviews. Merchants can suggest limited edits, subject to author approval; merchants cannot change star ratings. Media uploaders need rights or permission. |
| [Publishing and hiding reviews](https://judge.me/help/en/articles/8368681-publishing-and-hiding-reviews) | Readable; August 19, 2026. Automatic publication by default; manual moderation and several statuses exist. Pending reviews can publish automatically after 14 days. Shop app reviews have special restrictions. This does not support selective suppression of negative feedback as editorial best practice. |
| [Verified reviews](https://judge.me/help/en/articles/8376284-verified-reviews) | Readable; May 20, 2026. Verification depends on collection method and purchase/order linkage. Confirmed review-link, QR and widget submissions can qualify. Certain Loox/Yotpo/Stamped imports qualify when linked through metaobjects with customer, order and product IDs. Generic spreadsheet imports do not. Judge.me does not manually assign verification. Reviewbit WhatsApp submissions are listed as unverified; do not generalize that statement to every WhatsApp integration. |
| [Judge.me widgets](https://judge.me/help/en/articles/8415708-judge-me-widgets) | Readable; June 19, 2026. Review Widget and Star Rating Badge are Free. Other widgets/customizations vary by plan and theme/page support. |

## WhatsApp

| Source and original exact URL | Status and supported scope |
|---|---|
| [WhatsApp Business Messaging Policy](https://business.whatsapp.com/policy) | Readable; redirects to [current canonical policy](https://whatsappbusiness.com/policy/), updated September 23, 2026. Recipient must provide number/username and opt in; respect opt-outs. Business-initiated messages use approved templates. Free-form replies are allowed within the 24-hour customer-service window opened/reset by each user message; approved templates are required outside it. Automated responses require a clear escalation path. These platform requirements do not establish legal compliance. |
| [WhatsApp Business Platform Pricing](https://business.whatsapp.com/products/platform-pricing) | Readable; redirects to [current canonical pricing](https://whatsappbusiness.com/products/platform-pricing/). Per-delivered-message pricing depends on destination market and category. Service messages and utility responses to users have exceptions, and free-entry-point conditions vary. Avoid the retired conversation-charge model or a single worldwide rate. |

## Shopify Flow

| Source and original exact URL | Status and supported scope |
|---|---|
| [Shopify Flow](https://help.shopify.com/en/manual/shopify-flow) | Readable. Free app on Basic, Grow, Advanced and Plus. Send HTTP Request requires Grow or above; custom partner-app tasks require Plus; usage limits vary. |
| [Getting started with Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/getting-started) | Readable. Defines triggers, conditions and actions and the visual editor. |
| [Creating workflows manually or from a template](https://help.shopify.com/en/manual/shopify-flow/create/create-workflow) | Readable. Sidekick can generate workflows from plain-language descriptions on desktop. Drafts are inactive by default and require review, testing and manual activation. Complex business logic can be omitted. This does not establish support for generating every WhatFlow step. |
| [Testing a workflow in Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/manage/test-workflow) | Readable. Built-in tests evaluate logic/data without sending notifications or changing live store data. Recording events may involve separate live store actions; distinguish those from simulated tests. |
| [Actions in Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/reference/actions) | Readable. Actions require compatible data from a trigger or Get data action; missing required data causes errors. Customer data alone does not establish that an order action can run. |
| [Triggers in Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/reference/triggers) | Readable. Events start workflows; conditions and actions follow. |
| [Manage connections in Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/reference/connectors/manage-connections) | Readable. Connector app must be installed and configured in the store; accounts or paid subscriptions may be required. |
| [Apps that work with Shopify Flow](https://help.shopify.com/en/manual/shopify-flow/reference/flow-connectors) | Readable; redirects to [current connector catalog](https://help.shopify.com/en/manual/shopify-flow/reference/connectors/apps). Lists exposed triggers/actions. Does not establish that every installed app, or every capability of an app, works in Flow. |

## WhatFlow

[WhatFlow WhatsApp Business API on Shopify](https://apps.shopify.com/whatflow-official-api) was readable. The listing supports official API connection, order/fulfillment updates, checkout recovery, back-in-stock, broadcasts, Shopify-data templates, reply-driven tagging, storefront button, automated replies, OTP and Flow. It contains Free and paid plans with usage charges. Marketing copy does not establish guaranteed business outcomes.

Observed listing terms: Free $0 with first 100 sent messages included, then $0.01; Starter $4.99 with 2,000, then $0.005; Plus $9.99 with 5,000, then $0.004; Growth $29 with 20,000, then $0.0025; Scale $49.99 with 40,000, then $0.002; Ultimate $99 with 75,000, then $0.0015. Charges are USD. Paid-plan trial displayed as seven days. These are changeable vendor terms; avoid unnecessary numerical repetition across evergreen articles.

The listing's additional pricing link, [https://whatflow.tech/official-api-pricing](https://whatflow.tech/official-api-pricing), rendered a branded **404 page**. Its persistent header advertised a 14-day trial, conflicting with the listing's seven-day display. Fix the link and reconcile the trial language. Neither this unavailable pricing destination nor the listing independently substantiated the full “all features across every plan” and “no inbox seat fees” assertions. Those require internal product confirmation or an accessible current first-party pricing document.

## Google

| Source | Status and supported scope |
|---|---|
| [Product snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) | Readable. Product markup can establish eligibility for enhanced search appearance, including ratings. It guarantees neither display nor ranking improvement. |
| [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Readable. Supports original, useful content, transparent sourcing and real expertise. No preferred word count. Changing dates without substantive changes is discouraged. |

## Unsupported claims requiring removal or narrower wording

- Universal WhatsApp-versus-SMS open, conversion, click or recovery percentages without attributable comparable study data.
- Guaranteed sales, lower returns/RTO, rich-result appearance, ranking improvement, compliance or deliverability.
- Every review becoming verified after a WhatsApp link; all imports being unverified; merchants owning reviews or being permitted to rewrite customer ratings.
- Every installed Shopify app working with Flow; guaranteed immediate execution; automatic activation of Sidekick drafts.
- Approved templates substituting for opt-in; possession of a customer telephone number constituting consent.
- Equating a WhatFlow Free plan, included app messages, free Meta service messages and zero total messaging cost.

## Optional photo research

One official Openverse API request was inaccessible through the web tool. No suitable licensed photo candidates were established, no images were downloaded and no assets were marked verified. Unrelated search results should not be used to fill cover quotas.

## Research quality self-assessment

Groundedness 29/30; specificity 24/25; coverage 12/20; actionability 14/15; format 10/10: 89/100 for this bounded packet. The main coverage limitation is reliance on the controlling vendors for operational rules. This research score is not a blog-reviewer score or a claim that the articles passed delivery gates.
