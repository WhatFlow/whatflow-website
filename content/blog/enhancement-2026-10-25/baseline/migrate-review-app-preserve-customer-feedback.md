---
title: "Plan a review-app migration without losing the meaning of the data"
description: "Check exports, product matching, review sources and storefront behavior before replacing a review provider."
date: "2026-10-24"
lastUpdated: "2026-10-24T11:34:27.444Z"
author: "Safwan Adnan"
authorRole: "Co-founder and CEO of WhatFlow"
canonical: "https://whatflow.tech/blog/migrate-review-app-preserve-customer-feedback"
slug: "migrate-review-app-preserve-customer-feedback"
site_name: "WhatFlow"
lang: "en"
og_image_alt: "Plan a review-app migration without losing the meaning of the data"
reviewedAt: "2026-10-24T00:00:00.000Z"
category: "operations"
sourceDocumentId: "48"
tags:
  - "Review migration"
  - "Data quality"
  - "App changes"
---

Moving reviews is more than transferring a spreadsheet. A review has a product association, a source, a date and sometimes a verification status or media reference. The new provider may interpret those fields differently. Plan the migration around preserving meaning, not merely matching a total count.

Begin with a supported export and a recovery plan. Keep the old configuration available until the replacement has been checked. Avoid deleting the previous setup just because the first import screen reports that some rows were accepted.

## Inventory the data you actually have
List product reviews, store reviews, media, merchant replies and relevant metadata. Confirm what the current provider can export through its normal tools. Do not assume every visible feature has an equivalent portable field or that an export includes every attachment permanently.

Keep a protected copy of the supported export and record when it was created. Review whether the file contains private contact details and limit access appropriately. A migration worksheet should not become a broadly shared customer database.

## Match products deliberately
Decide how the destination identifies the correct item. Handles, IDs and variant references can change across stores or migrations. A row importing successfully does not prove that it appears beside the intended product on the storefront.

Test representative examples, including deleted products, variants and items with similar names. Do not merge materially different products simply to preserve a larger visible count. If a review cannot be matched reliably, keep it for investigation rather than guessing the destination.

## Preserve source and verification distinctions
An imported review is not automatically a verified purchase review in the new system. The destination provider applies its own requirements. Keep original source information where supported and do not relabel the evidence to make the imported set look more authoritative.

Judge.me’s verification documentation describes several different sources and qualifying conditions. Consult the current destination policy for your actual migration. A generic promise that all imported reviews keep every badge can be misleading.

## Check media and replies
Open imported photos and videos and confirm that the references remain accessible through the supported process. A temporary URL is not a permanent archive. Check that any retained merchant reply still belongs to the correct review and has not become detached from its context.

Review permissions for the intended continued use of customer material. A technical migration does not create broader marketing rights. Keep private support attachments distinct from public review media rather than using one folder to fill missing assets in the other.

## Test the storefront before switching fully
Check rating counts, written feedback, filters and the mobile experience on representative products. Inspect relevant structured data through the appropriate tools and identify which theme or app component owns it. Avoid leaving several competing widgets in place without understanding the effect.

Review existing review-request messages and printed links. WhatFlow may send customers to a form supplied by the review provider; those destinations need updating when the provider changes. Messaging and review storage are separate responsibilities even when the customer journey connects them.

## Switch in a controlled sequence
Choose a practical cutover point, document what changed and monitor early submissions. Keep a way to identify feedback collected during the transition so it is not omitted or duplicated. Decide when the previous tool can be retired only after the relevant checks pass.

The useful outcome is a coherent customer feedback history displayed accurately in the new system. Counts matter, but correct associations, source labels and working links matter just as much. A careful migration avoids turning a valuable review archive into a collection of unexplained stars.

## Related guides for your store

[Set up a shared team inbox without losing conversation ownership](https://whatflow.tech/blog/shared-team-inbox-small-shopify-business)

[Write saved replies that still answer the customer’s question](https://whatflow.tech/blog/customer-service-saved-replies-without-robotic-tone)

[A practical WhatsApp marketing plan for a small Shopify store](https://whatflow.tech/blog/whatsapp-marketing-plan-small-shopify-store)

## Bring the customer conversation into Shopify

Free plan available

Explore WhatFlow Business API for WhatsApp messaging and a team inbox with no seat fees. Features are included across plans, including Free; message allowances and rates differ.

[Explore WhatFlow on Shopify](https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=merchant_guides)


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
