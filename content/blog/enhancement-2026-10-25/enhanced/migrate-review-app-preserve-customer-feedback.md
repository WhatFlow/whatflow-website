---
title: "Plan a review-app migration without losing the meaning of the data"
description: "Plan a Shopify review migration around product matching, source labels, media and working destinations. Check sample records before retiring the old tool."
date: "2026-10-24"
lastUpdated: "2026-10-24T21:47:46.236Z"
author: "Safwan Adnan"
authorRole: "Co-founder and CEO of WhatFlow"
canonical: "https://whatflow.tech/blog/migrate-review-app-preserve-customer-feedback"
slug: "migrate-review-app-preserve-customer-feedback"
site_name: "WhatFlow"
lang: "en"
og_image_alt: "WhatFlow WhatsApp order reply trigger and condition in Shopify Flow"
reviewedAt: "2026-10-24T21:47:46.236Z"
category: "operations"
sourceDocumentId: "48"
tags:
  - "Review migration"
  - "Data quality"
  - "App changes"
---

Migrate Shopify reviews by preserving supported exports, matching products deliberately and checking how the destination handles sources, verification, media and merchant replies. Validate representative records on the storefront before completing the switch. Update message and printed destinations, and reconcile feedback collected during the transition so an accepted row count does not conceal incorrect associations or missing context.

## Key takeaways

- Preserve review meaning alongside the export count.
- Check product and variant associations on the destination storefront.
- Update invitation links and reconcile cutover-period submissions.

Moving reviews is more than transferring a spreadsheet. A review has a product association, a source, a date and sometimes a verification status or media reference. The new provider may interpret those fields differently. Plan the migration around preserving meaning, not merely matching a total count.

Begin with a supported export and a recovery plan. Keep the old configuration available until the replacement has been checked. Avoid deleting the previous setup just because the first import screen reports that some rows were accepted.

## Inventory the data you actually have

List product reviews, store reviews, media, merchant replies and relevant metadata. Confirm what the current provider can export through its normal tools. Do not assume every visible feature has an equivalent portable field or that an export includes every attachment permanently.

Keep a protected copy of the supported export and record when it was created. Review whether the file contains private contact details and limit access appropriately. A migration worksheet should not become a broadly shared customer database.

## Match products deliberately

Decide how the destination identifies the correct item. Handles, IDs and variant references can change across stores or migrations. A row importing successfully does not prove that it appears beside the intended product on the storefront.

Test representative examples, including deleted products, variants and items with similar names. Do not merge materially different products simply to preserve a larger visible count. If a review cannot be matched reliably, keep it for investigation rather than guessing the destination.

Review [variant review associations](https://whatflow.tech/blog/product-variant-review-context) before deciding where older product feedback belongs.

## Preserve source and verification distinctions

An imported review is not automatically a verified purchase review in the new system. The destination provider applies its own requirements. Keep original source information where supported and do not relabel the evidence to make the imported set look more authoritative.

Judge.me’s verification documentation describes several different sources and qualifying conditions. Consult the current destination policy for your actual migration. A generic promise that all imported reviews keep every badge can be misleading.

Consult [Judge.me verified-review requirements](https://judge.me/help/en/articles/8376284-verified-reviews) when comparing the meaning of badges before and after import.

## Check media and replies

Open imported photos and videos and confirm that the references remain accessible through the supported process. A temporary URL is not a permanent archive. Check that any retained merchant reply still belongs to the correct review and has not become detached from its context.

Review permissions for the intended continued use of customer material. A technical migration does not create broader marketing rights. Keep private support attachments distinct from public review media rather than using one folder to fill missing assets in the other.

## Test the storefront before switching fully

Check rating counts, written feedback, filters and the mobile experience on representative products. Inspect relevant structured data through the appropriate tools and identify which theme or app component owns it. Avoid leaving several competing widgets in place without understanding the effect.

Review existing review-request messages and printed links. WhatFlow may send customers to a form supplied by the review provider; those destinations need updating when the provider changes. Messaging and review storage are separate responsibilities even when the customer journey connects them.

Check [printed review QR destinations](https://whatflow.tech/blog/qr-code-review-requests-product-packaging) alongside app-generated invitation links.

## Switch in a controlled sequence

Choose a practical cutover point, document what changed and monitor early submissions. Keep a way to identify feedback collected during the transition so it is not omitted or duplicated. Decide when the previous tool can be retired only after the relevant checks pass.

The useful outcome is a coherent customer feedback history displayed accurately in the new system. Counts matter, but correct associations, source labels and working links matter just as much. A careful migration avoids turning a valuable review archive into a collection of unexplained stars.

## Reconcile a small sample before switching providers

Hypothetical example: a migration file contains a current product review, an older variant review, one photo review and a store-level review. Build a sample ledger with the original record, destination record, product association, date, source label and media result. Check each independently; the same total count can conceal a review attached to the wrong item or a photo that no longer opens.

Set a cutover point and record submissions that arrive in either tool around that time. Update the supported review destinations used by WhatFlow Business API invitations and any printed QR routes before retiring the previous collection path. Keep the original supported export protected while discrepancies are investigated. Verification badges should follow the destination provider’s criteria rather than a desire to keep the old page looking unchanged.

## Before you put this into practice

- Check current, old-variant, media and store-review examples.
- Compare source labels and working media after import.
- Reconcile transition submissions and update customer-facing destinations.

## Related guides for your store

[Set up a shared team inbox without losing conversation ownership](https://whatflow.tech/blog/shared-team-inbox-small-shopify-business)

[Write saved replies that still answer the customer’s question](https://whatflow.tech/blog/customer-service-saved-replies-without-robotic-tone)

[A practical WhatsApp marketing plan for a small Shopify store](https://whatflow.tech/blog/whatsapp-marketing-plan-small-shopify-store)

## Bring the customer conversation into Shopify

Free plan available

Explore WhatFlow Business API for WhatsApp messaging and a team inbox with no seat fees. Features are included across plans, including Free; message allowances and rates differ.

[Explore WhatFlow on Shopify](https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=merchant_guides)

## About the author

Safwan Adnan is co-founder and CEO of WhatFlow. This guide is published by WhatFlow and includes its product where relevant. Worked examples are illustrative unless a caption identifies an actual demo-store configuration; they are not merchant performance results.

Learn more [about WhatFlow](https://whatflow.tech/about) or [contact our team](https://whatflow.tech/contact) with a question or correction.


<script type="application/ld+json">{"@context": "https://schema.org", "@type": "Organization", "name": "WhatFlow", "url": "https://whatflow.tech"}</script>

## Frequently asked questions

### Does a successful import prove every review is on the correct product?

No. Validate product matching and representative storefront pages after import, including variants and similar product names.

### Will every imported review retain a verified badge?

Not necessarily. Verification depends on the destination provider’s current criteria and the available source and purchase data.

## Sources

- [Judge.me verified-review requirements](https://judge.me/help/en/articles/8376284-verified-reviews): Verification depends on the review provider’s criteria; sending a WhatsApp link does not itself create verified status.
- [Judge.me review content guidelines](https://judge.me/help/en/articles/8287316-guidelines-on-reviews-content): Review authenticity, ownership and permission to use text or media.
- [Judge.me widget reference](https://judge.me/help/en/articles/8415708-judge-me-widgets): Reference for review widget types and supported storefront placements; WhatFlow does not replace the review provider.
- [WhatFlow Business API on Shopify](https://apps.shopify.com/whatflow-official-api): WhatFlow product identity and Shopify integration. WhatFlow plan descriptions in these articles are first-party product information.


An inactive workflow in the WhatFlow demo store illustrates order-reply configuration. No customer messages or order changes were made.
