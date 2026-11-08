const guide = {
 campaign:'/blog/whatflow-shopify-whatsapp-campaign-walkthrough',
 inbox:'/blog/whatflow-team-inbox-shopify-support-workflow',
 catalog:'/blog/whatflow-whatsapp-catalog-to-shopify-checkout',
};
export const tracks = {
 campaign:{heading:/campaign|broadcast|audience|segment|marketing|launch/i,copy:`If you already have an opted-in Shopify audience, start a WhatFlow broadcast from selected customers or a Shopify segment in Admin. For a scheduled campaign built from CSV, Excel or existing conversations, use Team Inbox. Map the template fields, send a test, and make sure someone owns the replies. The [campaign walkthrough](${guide.campaign}) shows both routes.`},
 retention:{heading:/win.back|loyalty|repeat|replenish|subscribe|customer|audience|campaign/i,copy:`For a one-off retention send, start with the eligible repeat buyers you can actually identify in Shopify, or upload an opted-in spreadsheet to WhatFlow Team Inbox. Personalize an approved template and test the product link before scheduling. If someone replies with a question, pick up that conversation in the same inbox instead of sending another automatic reminder. See the [broadcast setup and checks](${guide.campaign}).`},
 reporting:{heading:/measure|metric|test|deliver|report|budget|cost/i,copy:`Use WhatFlow's recipient report to separate attempted, delivered, read and failed messages. Export the results before you change the audience, and investigate a failure before retrying it. If you want to measure purchases, compare against Shopify orders using the tracking you set up for that send; delivery or read status alone can't tell you what sold. See the [campaign measurement walkthrough](${guide.campaign}).`},
 support:{heading:/inbox|support|reply|replie|answer|team|handoff|response/i,copy:`In WhatFlow Team Inbox, **Needs reply** shows open conversations where the customer wrote last. **Closing soon** helps staff prioritize the service window. Claim a thread before replying, check the Shopify order if the phone number matches, and leave an internal note when the next shift needs to pick it up. The [agent walkthrough](${guide.inbox}) shows how that handoff works.`},
 orders:{heading:/order|shipping|customer|refund|return|delivery|repl/i,copy:`When a customer replies about an order, a WhatFlow agent can see matching Shopify orders, fulfillment status and available tracking links beside the conversation. Confirm which order the customer means, then use a private note and assignment to give the follow-up an owner. Any refund or order edit still happens in Shopify. See the [support queue walkthrough](${guide.inbox}).`},
 saved:{heading:/draft|support|repl|customer|answer/i,copy:`Save the repeatable part of a reply in WhatFlow, then check the facts before you send it. Agents can personalize a canned response, keep a draft in the thread, and put the internal context in a private note. Search inside the conversation if you need to verify what another agent promised. The [Inbox walkthrough](${guide.inbox}) shows when to use each tool.`},
 catalog:{heading:/catalog|product|sell|conversion|commerce|shopify/i,copy:`For a shopper asking which size or variant fits, use WhatFlow's product picker to share the relevant catalog item from the conversation. With catalog cart follow-up configured, WhatFlow can send back a Shopify checkout link. Check Shopify before treating the WhatsApp cart as a paid order. The [catalog-to-checkout walkthrough](${guide.catalog}) shows the test sequence.`},
 storefront:{heading:/button|widget|storefront|product|shopify/i,copy:`A storefront button starts the conversation. In WhatFlow Business API, the team can then claim the chat, check Shopify order context and share a catalog item if the buyer needs help choosing. That's the difference I'd test between a button-only app and a button with a commerce workspace behind it. See the [product-sharing walkthrough](${guide.catalog}).`},
 automation:{heading:/flow|workflow|automation|trigger|api/i,copy:`WhatFlow gives you three distinct tools: Shopify Flow for Shopify and WhatsApp events, Inbox Workflows for API-triggered sequences with waits and decisions, and WhatsApp Flows for forms customers fill out inside the chat. If the goal is a sale, a catalog cart event can start a Shopify Flow workflow, while payment is verified separately in Shopify. See the [catalog event and checkout example](${guide.catalog}).`},
 platform:{heading:/whatflow|shopify|compare|pick|choose|verdict|which/i,copy:`I'd evaluate WhatFlow Business API across a whole sales journey: run a [Shopify WhatsApp campaign](${guide.campaign}), work the replies in the [shared inbox](${guide.inbox}), then [share the right product and link to checkout](${guide.catalog}). Those jobs sit alongside recovery and order notifications. If you only test the first order message, you miss much of what the app replaces.`},
};
export const postGroups = {
 campaign:'whatsapp-marketing-shopify-guide whatsapp-broadcast-best-practices ramadan-eid-diwali-whatsapp-campaigns product-launch-whatsapp-waitlist first-black-friday-new-shopify-store black-friday-whatsapp-playbook-shopify whatsapp-campaign-preflight-checklist whatsapp-campaign-segmentation-shopify whatsapp-marketing-plan-small-shopify-store coordinate-email-sms-whatsapp-customer-messages click-to-whatsapp-ads-shopify',
 retention:'vip-customers-whatsapp-shopify subscription-churn-whatsapp-shopify birthday-anniversary-messages-shopify customer-referral-messages-shopify loyalty-messages-customer-value-shopify customer-winback-campaign-shopify replenishment-reminders-shopify-consumables repeat-purchase-campaign-without-constant-discounts back-in-stock-whatsapp-alerts-setup',
 reporting:'whatsapp-marketing-metrics-shopify whatsapp-message-not-delivered-reasons ab-test-whatsapp-messages-small-list small-shopify-store-metrics-review-routine whatsapp-message-budget-cost-per-outcome whatsapp-business-api-pricing',
 support:'whatsapp-response-time-small-team hire-first-customer-support-shopify prepare-customer-support-black-friday-shopify shared-team-inbox-small-shopify-business customer-service-playbook-shopify whatsapp-customer-service-etiquette',
 orders:'order-edits-address-changes-whatsapp whatsapp-returns-exchanges-shopify whatsapp-shipping-delays-shopify handle-angry-customer-whatsapp holiday-shipping-cutoff-messages post-purchase-customer-journey-shopify',
 saved:'customer-service-saved-replies-without-robotic-tone ai-support-drafts-small-shopify-team use-ai-small-shopify-business multilingual-customer-messaging-shopify whatsapp-away-messages-business-hours',
 catalog:'shopify-whatsapp-catalog-support selling-over-chat-sales-techniques helpful-cross-sell-product-recommendations product-questions-whatsapp-prepurchase-support high-ticket-products-whatsapp-sales wholesale-b2b-enquiries-whatsapp whatsapp-for-fashion-stores whatsapp-for-beauty-skincare-brands whatsapp-for-furniture-home-stores whatsapp-for-food-beverage-brands',
 storefront:'add-whatsapp-chat-button-shopify mobile-store-review-widget-chat-button-layout',
 automation:'evaluate-shopify-app-workflow-connectors sidekick-shopify-flow-whatsapp-workflows shopify-flow-whatsapp-app-integrations whatsapp-incoming-messages-shopify-flow-routing whatflow-shopify-flow-whatsapp-automation-guide',
 platform:'what-is-whatsapp-business-api whatsapp-business-app-to-api-migration shopify-app-stack-audit choose-first-automation-shopify-small-team audit-shopify-app-costs-feature-gates-seat-fees',
};
export const comparisonVendors = {
 campaign:'kwikengage carthike reco kanal recart retainful shopify-messaging omnisend brevo mailchimp attentive postscript aitrillion netcore moengage webengage insider braze gallabox quickreply wati bitespeed doubletick',
 support:'whachatcrm whapi edesk kustomer reamaze richpanel intercom gorgias tidio crisp chatwoot zendesk freshchat zoho-desk front help-scout livechat jivochat trengo callbell timelinesai kommo rasayel userlike sleekflow respond-io shopify-inbox delightchat',
 catalog:'zoko aisensy interakt dondy ca click2chat',
 storefront:'moose seedgrow eaze-button chaty squadkin',
 platform:'whatsapp-for-shopify-by-meta whatsapp-business-app getgabs ctx wava whatomation',
 automation:'periskope twilio infobip gupshup botpress landbot',
};
export const comparisonUseCases = {
 campaign:'whatsapp-segmented-broadcasts-vs-email-blasts whatsapp-customer-segments-vs-generic-bulk-sending whatsapp-vs-email whatsapp-vs-sms whatsapp-business-platform-vs-channels',
 support:'no-seat-fee-whatsapp-inbox-vs-per-seat shared-whatsapp-inbox-vs-personal-phones whatsapp-inbox-vs-helpdesk-tickets growing-shopify-team-whatsapp-vs-seat-upgrades whatsapp-vs-website-live-chat',
 storefront:'free-whatsapp-button-vs-paid-chat-widget theme-matched-whatsapp-button-vs-floating-widget',
 automation:'shopify-flow-whatsapp-vs-zapier shopify-whatsapp-app-vs-custom-cloud-api',
 platform:'whatflow-chat-automation-vs-business-api shopify-native-whatsapp-vs-external-dashboard all-features-whatsapp-plans-vs-feature-gating small-shopify-store-whatsapp-vs-enterprise-suite',
};
export const sourceCorrection=`You can launch a WhatFlow broadcast from selected Shopify customers or a Shopify segment using the Admin action. In Team Inbox, the audience builder instead uses a spreadsheet or existing conversation contacts. Launching from a Shopify segment does not keep that segment continuously synced into Inbox. [See the two campaign routes](${guide.campaign}).`;
export const correctionSlugs=new Set([
 'whatsapp-broadcast-best-practices','vip-customers-whatsapp-shopify','whatsapp-campaign-segmentation-shopify',
 'whatflow-vs-omnisend','whatsapp-segmented-broadcasts-vs-email-blasts','whatsapp-customer-segments-vs-generic-bulk-sending',
]);
