---
{"title":"Map a CSV or Excel Audience to a WhatsApp Template","category":"whatsapp","excerpt":"Prepare an opted-in spreadsheet for WhatFlow broadcasts, map template variables, and test blank fields and links before scheduling.","metaTitle":"WhatsApp CSV and Excel Audience Mapping in WhatFlow","metaDescription":"Prepare an opted-in CSV or Excel audience for WhatFlow, map rows to WhatsApp template fields, and test the campaign before you schedule it.","tags":["WhatsApp broadcasts","CSV audiences","Message templates"]}
---

The fastest way to catch a bad WhatsApp campaign is to preview the row you least trust. A row with a missing first name, an old phone format, or a blank product field can expose problems a clean test row won’t show.

Use a spreadsheet audience in WhatFlow Team Inbox when you already have an eligible recipient list and want to personalize an approved template. If the audience already exists as a Shopify segment and you don’t need a spreadsheet, compare the [Shopify Admin broadcast route](/blog/whatflow-shopify-whatsapp-campaign-walkthrough) first.

## Make each row represent one intended recipient

Start with a column for the phone number and only the fields you intend to use. For example, a launch reminder might need a first name and a product name. Check country codes before importing and make sure your spreadsheet tool hasn’t removed important characters or reformatted the number as scientific notation.

Review duplicates and consent in the source file. Two rows for one number are often a data problem, especially when they contain different personalization. Resolve the conflict before uploading rather than relying on the importer to choose what the shopper should see.

## Match columns to the approved template

In WhatFlow **Broadcasts**, choose the sending channel and approved template, then upload the CSV or Excel file. Map each variable to the corresponding column. If your template has dynamic fields in a button or header, check those mappings as well as the body.

An illustrative row might have the name “Sam” and the product “olive Trail Pack.” Read the resulting message out loud. Does the product field include text like “SKU-402” that a shopper wouldn’t recognize? Does the message still make sense if the first name is missing? Fix the data or use an approved template that doesn’t need that variable.

![WhatFlow template manager with category and preview controls](/api/media/file/whatflow-demo-2026-11-08-template-status.webp "Check which templates are approved and preview the one you plan to use.")

## Test a normal row and a difficult one

Send a test to a number your team controls. Open the product link on a phone and reply to the test. Confirm the intended team can see the reply in the Inbox. Then repeat with your problematic row after correcting it. If your template uses a dynamic URL, verify the final destination rather than trusting the label.

Before scheduling, compare the audience count to the source file and review opt-outs under [WhatsApp’s policy](https://business.whatsapp.com/policy). After sending, use the recipient report to investigate failures and [retry only eligible recipients](/blog/whatflow-whatsapp-broadcast-failure-retry). Keep the cleaned audience and template version together so the next person can reproduce the send.
