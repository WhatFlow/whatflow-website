const wa = 'https://whatsappbusiness.com';
const policy = wa+'/policy/';
const pricing = wa+'/products/platform-pricing/';
const cats = wa+'/products/conversation-categories/';
const related = '/blog/whatflow-business-api-help-center';

export const metaGuides = [
{
 slug:'whatsapp-template-category-shopify-examples', title:'Which WhatsApp template category should your Shopify message use?', cover:['WhatsApp template','categories in practice'], motif:'pricing',
 excerpt:'Classify a shipping update, checkout reminder or one-time code before submitting the template to Meta.',
 body:`A tracking link and a discount code can fit in the same message, but they do different jobs. If you need to send both, write two messages. A shopper who opted into delivery updates may never have asked for sale reminders.

## Start with the reason for the message

- A shipping update for order #1042 is a utility use case. Give the shopper the status and tracking link.
- A reminder about an unfinished checkout, a coupon, or a recommendation is marketing. Use the marketing category and reach only customers whose permission covers it.
- A one-time verification code belongs in an authentication template. Keep the message focused on the code.
- A support reply within the customer service window can use normal chat. If the window has closed, choose an approved template that fits the purpose.

## Try classifying two drafts

“Your package is with the carrier. Track order #1042 here” has a clear service purpose. “Your package is with the carrier. Get 15% off your next order” adds promotion. Separate the promotion before submitting the order update. The Meta review can still classify the template differently, so check the final status before enabling the automation.

## Budget by category and market

Use the recipient market and the approved category to estimate the Meta fee. Keep WhatFlow’s app allowance on a separate line. If a draft is rejected or its category changes, review the cause before sending a replacement.

Read Meta’s [marketing](${cats}marketing/), [utility](${cats}utility/) and [authentication](${cats}authentication/) examples, and check [platform pricing](${pricing}) before scheduling your first send.`
},
{
 slug:'whatsapp-opt-in-copy-shopify-checkout',title:'WhatsApp opt-in wording for Shopify stores',cover:['WhatsApp opt-in','wording for Shopify'],motif:'conversation',
 excerpt:'Give shoppers a clear choice about WhatsApp order updates and marketing, and keep an opt-out process your team can follow.',
 body:`If a phone field is needed for the courier, say so. If you also want to send WhatsApp messages, tell the shopper who will message them and what they can expect before they agree. Keep the wording close to the control that records the choice.

## Two prompts I would test

For order updates: “Send shipping updates for this order on WhatsApp from [store name].” For promotions: “Send occasional offers and new product announcements on WhatsApp from [store name].” Use wording that matches your process and review the consent requirements that apply to your store.

## Keep a record your teammate can use

Save when and where permission was collected and what the customer agreed to. Before a sale, remove everyone who opted out and confirm the remaining list matches the purpose of the send. A spreadsheet from an old promotion needs the same check as a list collected yesterday.

## Test an opt-out

Use your own test number to join the list, then ask the store to stop. Check whether the agent knows where to record the request and whether the next send excludes that number. If customers can opt out by another channel, give that team a way to update the same record.

See the [WhatsApp Business Messaging Policy](${policy}) and the [WhatFlow guide to preparing a campaign spreadsheet](/blog/whatflow-whatsapp-campaign-spreadsheet-mapping).`
},
{
 slug:'whatsapp-24-hour-window-support-shifts',title:'How the WhatsApp 24-hour window works across support shifts',cover:['The WhatsApp','24-hour window'],motif:'inbox',
 excerpt:'Work out when your support team can send a normal reply and when it needs an approved WhatsApp template.',
 body:`A customer messages at 4 p.m. Monday. Your Tuesday morning shift can usually reply in the open customer service window. If the customer sends a follow-up at 10 a.m. Tuesday, that inbound message resets the clock. A message sent by the business does not reset it.

## Make the deadline visible to your team

At shift change, assign chats that need a reply. Keep the last customer message visible and record what the next agent needs to answer. For example, if the warehouse owes you a tracking update, leave the order number and the promised follow-up time in a private note.

## Prepare one template for the work you do most often

A delivery case may still need an update after the window expires. Prepare an approved template for that use case. If it contains a link or an order reference, check both on a test order. Send it only where you have the appropriate permission. When the customer replies, your team can continue in chat.

## Separate time limits and charges

Meta describes ordinary service replies as free during the window. A marketing template can still have a charge. Review [WhatsApp service messaging](${cats}service/), [the policy](${policy}) and [Meta pricing](${pricing}) if you need to budget a mix of replies and templates.

The [WhatFlow team inbox guide](/blog/whatflow-team-inbox-shopify-support-workflow) shows how to hand over conversations without asking the customer to repeat the problem.`
},
{
 slug:'click-to-whatsapp-ads-shopify-first-conversation',title:'Click-to-WhatsApp ads for Shopify: plan the first conversation',cover:['Click-to-WhatsApp','ads for Shopify'],motif:'growth',
 excerpt:'Test the ad, first reply, product recommendation and Shopify purchase handoff from a shopper’s phone.',
 body:`Choose an ad that makes sense to answer in chat. “Need help choosing a size?” gives your team a specific question to handle. A generic sale ad with no clear next step can leave an agent guessing which product the shopper saw.

## Preview the path from ad to inbox

Open the ad on a test phone and tap its WhatsApp button. Check the business name and number. Send the suggested opening message if the ad has one, then verify who sees it and who can respond. The customer’s tap alone does not tell your team the order size or delivery city.

## Give the agent a useful next step

For a shoe-size ad, ask for the model and the shopper’s usual size. If your store has synced a Meta catalog in WhatFlow, share the relevant item in chat. Give the shopper a Shopify link where they can check the price and finish checkout. Test the link on mobile, including the variant selection.

## Measure from ad click to completed order

Count ad clicks, conversations started and completed Shopify orders separately. Meta describes a free entry window for eligible conversations. Check its conditions and pricing before you use it in a budget. Get the right permission before adding a shopper who asked a sizing question to a marketing list.

Sources: [Meta’s click-to-WhatsApp ad guide](${wa}/products/ads-that-click-to-whatsapp/), [pricing](${pricing}) and [messaging policy](${policy}).`
},
{
 slug:'whatsapp-flows-product-fit-quiz-shopify',title:'Build a simple product fit quiz with WhatsApp Flows',cover:['A product fit quiz','in WhatsApp'],motif:'automation',
 excerpt:'Turn a long WhatsApp sizing conversation into a short in-chat form, with a clear route to a human when someone needs help.',
 body:`A fit quiz is useful if the same three questions come up every day. For a shop selling running shoes, ask what the shopper needs the shoe for, their usual size, and whether they prefer a wide fit. Give a teammate the answers so the recommendation has some context.

## Start with the shortest form that helps

Build one screen for the questions and another for the result or handoff. Use labels a customer understands. If the recommendation needs a foot measurement you cannot verify, give the customer a way to ask for help. Keep payment details in Shopify checkout.

## Test the branches before publishing

Use a phone to submit every answer combination that changes the recommendation. Try leaving a required field blank, closing the form, and replying in chat. Have a teammate open the result and check what they can see. If the business sends the form through a template, test that template in the situation where it will be used.

## Choose the right Flow

Meta’s [WhatsApp Flows](${wa}/products/whatsapp-flows/) are the forms shoppers open in chat. Shopify Flow runs store automations in Shopify Admin. In WhatFlow, use the Team Inbox Flows workspace for the former, and the [Shopify Flow integration](/integrations/shopify-flow) for store events such as a reply that should trigger an order action.`
},
{
 slug:'whatsapp-marketing-cost-per-order-shopify',title:'How to budget a Shopify WhatsApp campaign by cost per order',cover:['WhatsApp campaign','cost per order'],motif:'pricing',
 excerpt:'Estimate WhatsApp campaign costs from the app plan, eligible deliveries and real Shopify orders.',
 body:`A campaign sent to 1,000 people can cost more or less depending on how many messages Meta delivers, where those people live, and the approved template category. Make a simple estimate before scheduling it. You can replace the assumptions with actual numbers the next day.

## Keep three numbers on the worksheet

1. Your WhatFlow plan and any sending overage.
2. The applicable Meta fees, estimated per market and category.
3. Any extra time you paid staff to handle replies.

Add the three. Divide by the Shopify orders you can attribute under a rule you chose before the send. If your campaign cost $60 and generated 12 attributed orders, that is $5 per attributed order. That arithmetic is an example, and a matched order is not necessarily an incremental one.

## Use an eligible group that does not receive the message

Where your audience size allows, keep a small comparison group. Use the same purchase window for both groups and exclude cancelled or refunded orders from both totals. That helps you distinguish customers who bought anyway from the extra purchases the message may have prompted.

## Check the bill against the delivery report

Compare delivered counts with your estimate, then look at failures and market mix. Use [Meta’s pricing rules](${pricing}) and [WhatFlow’s rate calculator](/pricing). If you sell in multiple currencies, record the exchange rate and date you used rather than mixing totals from separate billing periods.`
},
{
 slug:'whatsapp-business-profile-shopify-checklist',title:'Set up a WhatsApp business profile shoppers can recognise',cover:['WhatsApp business','profile checklist'],motif:'conversation',
 excerpt:'Check the number, display name, website and help details shoppers see when they open a Shopify WhatsApp conversation.',
 body:`A customer gets a message about an order. The first thing they should be able to work out is who sent it. Use a recognisable store name, keep support details current and point the profile at the same site the shopper ordered from.

## Test the profile from a separate phone

Open the storefront chat button on mobile and look at the profile it leads to. Compare the number with the one your team uses in the inbox. Then check the WhatsApp button on the order status page if your store uses one. A stale number on one of those surfaces sends the customer to a dead end.

## Check what Meta has approved

A pending name change may mean customers see a different name than you expect. Check the display-name status before promoting the number. If you are considering a verified badge, check which option applies to the account. The [WhatsApp blue badge guide](/blog/whatsapp-blue-badge-for-shopify) explains those routes.

## Keep a handoff path visible

A shopper asking to change an address needs a person or a clear way to request one. Check the contact details in the business profile and your team’s response to a test message after hours. Meta describes business profile and escalation expectations in the [WhatsApp Business Messaging Policy](${policy}).`
},
{
 slug:'whatsapp-marketing-delivery-drop-shopify',title:'Why WhatsApp campaign delivery can drop on Shopify',cover:['Why WhatsApp','delivery drops'],motif:'growth',
 excerpt:'Use recipient reports to distinguish send errors, delivery outcomes, audience problems and missing read receipts.',
 body:`When a campaign report shows fewer deliveries than you expected, start with one batch. Record its sending number, template, category, audience, time and any visible failure codes. A read rate cannot explain a message that never reached the device.

## Compare failures with the audience you meant to send to

Check the numbers, market and opt-in records. Look for duplicates if the list came from a spreadsheet. If most failures use the same template or number, check the template status and connection first. For scattered failures, read the reported reasons before changing the entire campaign.

## Retry only where a retry makes sense

Separate temporary failures from customers you should remove or suppress. A queued send and an opted-out contact call for different actions. Start with a test send after correcting the cause, then retry eligible failures only where the app and Meta allow it. Keep successful recipients out of the retry audience.

## Watch quality signals across campaigns

If people are blocking the number or complaining, check how they joined the list and what you promised them. Give them a clear way to stop receiving messages. See the [WhatsApp messaging policy](${policy}), [Meta’s Developer Hub](${wa}/developers/developer-hub/) and the [WhatFlow broadcast troubleshooting guide](/blog/whatflow-whatsapp-broadcast-failure-retry).`
},
].map(item=>({...item,group:'WhatsApp explained',category:'whatsapp',body:item.body+`\n\nFor setup in Shopify Admin, see the [WhatFlow Business API help centre](${related}).`}));
