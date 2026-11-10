const hub = 'https://whatsappbusiness.com/developers/developer-hub/';
const postman = 'https://www.postman.com/meta/whatsapp-business-platform/';
const pricing = 'https://whatsappbusiness.com/products/platform-pricing/';
const shot = (file, alt, caption) => `![${alt}](/api/media/file/${file}.webp "${caption}")`;

export const articles = [
  {
    slug: 'whatsapp-account-vs-messaging-account-shopify',
    title: 'WhatsApp Account vs Messaging Account for Shopify stores',
    excerpt: 'Find which Meta account holds your WhatsApp number, templates and billing before connecting or changing a Shopify integration.',
    cover: ['WhatsApp Accounts','and Messaging Accounts'],
    motif: 'integration',
    sources: [
      ['https://developers.meta.com/resources/videos/whatsapp-account-model-evolution/', 'Meta’s WhatsApp account model briefing'],
      [hub, 'WhatsApp Developer Hub'],
    ],
    body: `Your store can recognise its WhatsApp number and still be looking at the wrong place for an invoice. In Meta’s newer account model, the **WhatsApp Account** holds the phone number, while a **Messaging Account** holds templates and billing. Older instructions may refer to a WhatsApp Business Account, often shortened to WABA.

## Write down what each connection uses

For each Shopify store, record the sender number, the Meta business that controls it, and the messaging account the provider uses for templates and billing. Record who receives the Meta invoice and who can view the template approvals. Store account details in your internal runbook so they are available when the person who did the setup is away.

Meta designed this model to let a number work with multiple partners or integrations while keeping billing separate. Ask each provider which setup it supports and how it handles replies before connecting a second integration. Give one teammate responsibility for each order notification so two tools do not send the same update.

${shot('whatflow-demo-2026-11-10-connections','WhatFlow Connections screen showing sender status','This is WhatFlow’s sender screen. Use Meta’s business tools to check the account that owns billing and templates.')}

## Verify the account with one order

Choose a test order, send an approved template and check the number that appears on the recipient’s phone. Reply and see which inbox receives it. Match the selected template to the messaging account you intended to use. If a template appears under a different account, ask the account owner where it is managed before creating another copy.

Use the [WhatFlow connection and billing guide](/blog/whatflow-business-api-connection-and-billing) for the screens inside Shopify Admin.`,
  },
  {
    slug: 'meta-whatsapp-test-number-vs-live-shopify-pilot',
    title: 'Use a Meta test number before a live Shopify WhatsApp pilot',
    excerpt: 'Decide what to test with Meta’s sample sender and what to verify again on your actual Shopify WhatsApp number.',
    cover: ['Meta test number','to live Shopify pilot'],
    motif: 'automation',
    sources: [
      [hub, 'Meta’s test number and sandbox overview'],
      [postman+'documentation/wlk6lh4/whatsapp-cloud-api?entity=folder-3880d23a-495c-4c5e-9146-2d9db8afb629','Meta Cloud API test-message example'],
    ],
    body: `Meta’s test sender is useful when you want to see a WhatsApp message arrive before you involve customers. Meta provides a sample template in its developer materials. If you have a developer, ask them to send the sample to a test recipient they control and check the received message on the phone.

## Separate the two checks

The sandbox answers whether the sample send works in the test setup. For your Shopify pilot, use the real business sender with an internal recipient and a test order. Confirm the sender name, selected template, order variables, button destinations and where a reply lands. Check the billing setup before you schedule an automation that can reach customers.

${shot('whatflow-demo-2026-11-08-template-status','WhatFlow template manager showing approval and preview controls','Use the demo template list as a reference for the status to check on the real sender.')}

## Rehearse a case that should skip the send

Create one test order with the data the message needs and another with a missing phone or tracking link. The first should send to your test recipient. The second should follow your exception process. If the action runs from Shopify Flow, open the run history for both cases and verify what happened.

Keep the order reference and the result together. When the workflow goes live, use the same checks on the first eligible order. The [WhatFlow guide to sending templates from Shopify Flow](/blog/send-whatsapp-templates-shopify-flow) covers variable mapping and test sends.`,
  },
  {
    slug: 'whatsapp-template-languages-shopify-order-updates',
    title: 'Choose WhatsApp template languages for Shopify order updates',
    excerpt: 'Map a shopper’s language to an approved WhatsApp template and decide what happens when there is no matching version.',
    cover: ['WhatsApp template','languages for Shopify'],
    motif: 'review',
    sources: [
      [postman+'request/o65u5m5/send-message-template-text','Meta’s template send reference'],
      ['https://whatsappbusiness.com/blog/manage-message-templates-whatsapp-business-api/','Meta’s template management guide'],
    ],
    body: `A Shopify store can offer checkout in French and English while sending WhatsApp shipping updates in only one language. The template you select for the send controls the wording. Meta’s send example includes a language code alongside the template name.

## Decide where the language comes from

Use a customer preference you can explain and inspect. If the workflow has access to a reliable language field, map it to the approved version you intend to send. A phone country code helps with routing and pricing. It tells you little about which language the customer wants to read.

Review each translation with a fluent speaker. Test a delivery estimate, a tracking link and a short order reference in both versions. Check dates, currency and button text on the recipient’s phone. Verify the approval status for each version before using it in a workflow.

${shot('whatflow-demo-2026-11-08-inbox-templates','WhatFlow Inbox template list with language and status filters','Filter by language and status to find the version the agent intends to send.')}

## Decide how to handle an unknown language

Choose a default that fits your store or send the case for review when the language is unclear. Add a test order with no language and one with a preference you do not support. Record the expected branch for both cases, then check which template was selected. For setup, see the [WhatFlow template guide](/blog/whatflow-business-api-template-guide).`,
  },
  {
    slug: 'whatsapp-platform-outage-shopify-merchant-runbook',
    title: 'What to do during a WhatsApp Business Platform outage',
    excerpt: 'Give Shopify support and fulfillment staff a shared plan for affected WhatsApp orders, fallback channels and safe resends.',
    cover: ['WhatsApp outage','runbook for Shopify'],
    motif: 'inbox',
    sources: [
      [hub,'WhatsApp Developer Hub and API status link'],
      ['https://metastatus.com/whatsapp-business-api','Meta’s WhatsApp Business Platform status page'],
    ],
    body: `If order confirmations stop coming through during a sale, first decide who owns the incident and when the warehouse needs a decision. Record when the problem began, what the team observed and which Shopify automations are affected. Check Meta’s status page and compare it with the activity in your app. Leave room for a store-specific issue even if there is a platform incident.

## Keep the dispatch queue moving

List the orders with decisions due before the next courier pickup. Use Shopify to confirm their current state. If a buyer can be reached through another channel and your process allows it, ask for the specific decision you need. Give the support team one place to record the answer so a recovered WhatsApp reply does not restart work on the same order.

## Resume by checking order state and delivery state together

When sending recovers, inspect a few orders that were affected. Compare the message record with the current order status and any manual follow-up. Exclude orders that have already been cancelled, confirmed or reached through another channel. Send one internal test before you resume a broader batch.

${shot('whatflow-demo-2026-11-08-inbox-broadcasts','WhatFlow Inbox broadcast dashboard','Use your own delivery records to decide which recipients still need an update.')}

After the incident, record the first symptom and the step that confirmed recovery. Keep the [WhatFlow failure and retry guide](/blog/whatflow-whatsapp-broadcast-failure-retry) beside the runbook for recipient-level checks.`,
  },
  {
    slug: 'meta-whatsapp-volume-tiers-shopify-billing-reconciliation',
    title: 'Reconcile Meta WhatsApp volume tiers with Shopify message costs',
    excerpt: 'Read Meta’s utility and authentication tiers alongside WhatFlow billing and check which messages fall in each price band.',
    cover: ['Meta volume tiers','and Shopify billing'],
    motif: 'pricing',
    sources: [[pricing,'Meta’s pricing and volume tier calculator']],
    body: `If you sent 50,000 WhatsApp shipping updates last month, start by comparing the volume used for your WhatFlow app bill with the delivered messages and charges on Meta’s side. The reports answer different questions. Meta publishes volume tiers for utility and authentication messages. Check its rate table for the market and category you actually sent to.

## Read the bands as separate slices

Meta’s calculator explains that each rate applies to messages within that tier. For a simple illustration, suppose a hypothetical schedule charges $0.020 for the first 1,000 eligible deliveries and $0.015 for the next deliveries. At 1,500, the first 1,000 cost $20 and the next 500 cost $7.50. The blended rate is about $0.0183. Use Meta’s published thresholds and rates for a real estimate.

## Match the invoice before explaining a difference

Use the same dates, market, category and currency on both sides of the reconciliation. Check whether the delivery qualified for a free period before counting it as billable. If your team combined marketing, authentication and shipping messages in one report, split the rows before comparing them with the tier table.

${shot('whatflow-demo-2026-11-08-billing-meta','WhatFlow Billing screen separating app charges from Meta fees','The app plan and Meta’s delivery fees appear as separate costs.')}

For a list-rate estimate and the app allowance, start with [WhatFlow pricing](/pricing). For the tier calculation and the matching thresholds, use the Meta pricing reference below.`,
  },
];
