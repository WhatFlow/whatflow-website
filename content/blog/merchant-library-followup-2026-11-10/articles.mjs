const base='https://whatsappbusiness.com';
const policy=base+'/policy/';
const features=base+'/products/business-platform-features/';
const pricing=base+'/products/platform-pricing/';
export const articles=[
{
 slug:'whatsapp-qr-code-product-packaging-shopify',title:'Put a WhatsApp support QR code on your Shopify packaging',
 excerpt:'Help customers open the right WhatsApp chat from a parcel insert, and give your team enough context to answer.',
 cover:['WhatsApp QR codes','for Shopify parcels'],motif:'conversation',
 sources:[[features,'WhatsApp Business Platform features'],[policy,'WhatsApp Business Messaging Policy']],
 body:`Print a WhatsApp QR code on the small card where you already explain returns or setup. Give the customer a reason to scan it, such as “Need help fitting your strap?” Put the store name and a second way to reach support beside the code.

## Test the first message before printing

Scan the proof from a second phone. Check that WhatsApp opens the right number, then send a message to see where it arrives. If your link opens a suggested message, use a short prompt that tells the agent what the customer needs. “I need help with the strap on my order” works better than an empty greeting.

Keep account details off the printed link. The agent can ask for the order reference when the customer writes in. Try scanning the actual proof under indoor lighting and check it after folding the card.

## Assign someone to watch the replies

Decide who sees the first reply when someone scans after hours. Create a saved response for a question you expect, such as changing a return pickup date, and make it easy to reach a person when the issue is more complicated.

Give the customer a separate choice if you also want to send promotions. Use the [WhatFlow Inbox setup guide](/blog/whatflow-business-api-inbox-settings-and-replies) to test the handoff between two staff members.`
},
{
 slug:'whatsapp-list-messages-vs-reply-buttons-shopify',title:'WhatsApp list messages vs reply buttons for Shopify support',
 excerpt:'Choose an interactive WhatsApp format by the number of choices the shopper needs and what should happen after they tap.',
 cover:['WhatsApp lists','and reply buttons'],motif:'automation',
 sources:[[features,'WhatsApp interactive message formats'],[policy,'WhatsApp Business Messaging Policy']],
 body:`Use reply buttons for a short decision the customer can make immediately. A COD confirmation is a good example: confirm, cancel or ask for help. A list is easier to scan when there are several different jobs, such as checking a delivery, changing an address, or asking about a return.

## Decide what each choice should do

A button labelled “Confirm” should have one consequence. Before release, have a teammate tap it from a test number and check the intended Shopify order. Try it with two orders on the same number. If the workflow cannot tell which order the reply belongs to, send the case for manual review.

For a list of support topics, make the labels short enough to read on a phone. Add a route for a customer who cannot find their issue. Test what happens if they type the topic in chat instead of tapping it.

## Check the send context

A reply in an open service window and a business-initiated template are different send types. Check which interactive format the composer or approved template supports before planning the workflow. Try the full sequence once with the window open and once with a test case outside it.

The [WhatFlow Shopify Flow guide](/blog/whatflow-shopify-flow-whatsapp-automation-guide) covers how an incoming reply can lead to a Shopify action.`
},
{
 slug:'whatsapp-free-entry-window-vs-service-window-shopify',title:'WhatsApp’s 72-hour free entry window and 24-hour service window',
 excerpt:'Understand what starts each WhatsApp window, and estimate charges for conversations that begin with an eligible ad.',
 cover:['72-hour entry','and 24-hour service'],motif:'pricing',
 sources:[[pricing,'WhatsApp pricing and eligible free entry points'],[policy,'WhatsApp template and reply rules']],
 body:`The 24-hour service window starts or resets when a customer messages your business. Meta also describes a 72-hour free entry window for conversations that meet its eligible entry point conditions, such as a click-to-WhatsApp ad. Keep the windows separate when you train an agent or budget a campaign.

## Walk through one conversation

A customer messages on Monday morning after opening an ad. First, check whether the conversation met Meta’s free entry conditions. Then check when the customer last wrote to you. If you want to reply on Tuesday afternoon, that last inbound message matters for the template requirement. Check the current rules before deciding that a normal chat reply is available or that a template is free.

A customer who opens chat from a normal link on your product page can start a service window by writing to you. Use the source of the conversation and Meta’s conditions to determine whether free entry pricing applies.

## Keep ad cost and messaging cost in separate columns

Record the ad spend, Meta messaging fees and any WhatFlow plan charges. A message may qualify for a Meta pricing exception while still falling within your app’s own usage terms. Pull actual delivery results before reconciling the bill.

For planning a Shopify campaign, use [WhatFlow’s pricing calculator](/pricing) and the [guide to campaign cost per order](/blog/whatsapp-marketing-cost-per-order-shopify).`
},
{
 slug:'whatsapp-media-messages-shopify-support',title:'When to send photos, files and links in WhatsApp support',
 excerpt:'Choose the lightest way to show a Shopify customer what they need and check that it works on their phone.',
 cover:['Photos and files','in WhatsApp support'],motif:'inbox',
 sources:[[features,'WhatsApp Business Platform media messages'],[policy,'WhatsApp Business Messaging Policy']],
 body:`A photo can answer “Which clip goes here?” faster than a paragraph. A link is easier to maintain when you expect the instructions to change. Choose the format based on what the customer needs to do next.

## Use the shortest useful attachment

For a setup question, send a single labelled photo and explain what to look for. For an ongoing issue, link to the guide that matches the product version. For an order-specific file, confirm who you are talking to and share only the information they need. Keep payment collection on your normal secure checkout.

## Check the preview and the link

Send the reply to a test number. Look at it on a small screen and check what someone sees before they tap. If the file is hard to read, send the most useful instruction in the message body too. If the link leads to an account page, make sure the customer knows what they need to sign in.

## Pick an approved template when required

Check whether the customer service window is open. If it has closed, review the approved template and the kind of header or link it accepts. Test the exact template you will use before connecting it to an automation.

Use the [WhatFlow template guide](/blog/whatflow-business-api-template-guide) for the editor and approval workflow.`
},
{
 slug:'whatsapp-catalog-shopify-publish-checklist',title:'Check your WhatsApp catalog before sharing it with Shopify customers',
 excerpt:'Rehearse price, variant, stock and checkout handoffs before asking agents to sell from a WhatsApp catalog.',
 cover:['WhatsApp catalog','publish checklist'],motif:'cart',
 sources:[[features,'WhatsApp Business Platform product messages'],[policy,'WhatsApp commerce requirements']],
 body:`Start with one collection the team knows well. Open a product from a test chat and compare what the customer sees with the Shopify product page. Check a product with two colours, a product on sale and one that is out of stock.

## Check the item your agent will share

Verify the name, photo, price, and destination link. If the customer needs a particular variant, check whether that exact choice carries through to the next screen. A clear product link is helpful even when the agent still needs to explain the size or delivery option.

## Test the order handoff

Ask someone on another phone to send back a sample cart if your catalog workflow supports it. The person replying should be able to see which items the shopper chose and guide them to Shopify checkout. Check payment and fulfillment in Shopify before acting on the order.

## Give the team a way to catch stale data

Pick who checks the catalog when stock or prices change. If an item has the wrong price in chat, check Shopify and the catalog before offering a correction. Review the applicable Meta commerce rules for the products you plan to share.

Use [WhatFlow’s catalog and WhatsApp Flows guide](/blog/whatflow-business-api-inbox-catalog-and-flows) for the sync and testing steps.`
},
{
 slug:'whatsapp-support-human-handoff-shopify-automation',title:'Add a human handoff to WhatsApp support automation on Shopify',
 excerpt:'Test how shoppers reach an agent when an automated reply cannot resolve an order problem.',
 cover:['Human handoff','in WhatsApp support'],motif:'inbox',
 sources:[[policy,'WhatsApp Business Messaging Policy on automation and escalation'],[base+'/products/business-platform/','WhatsApp Business Platform use cases']],
 body:`A shipping auto-reply can answer “Where is my order?” if the tracking link works. It needs a handoff when the customer says the parcel shows as delivered and they never received it. Plan that second message while you set up the first.

## Decide when automation should stop

List the issues that need a person, such as a disputed delivery or a request to change an order after it was packed. Put the way to reach support in the automated response where it is easy to find. Meta’s messaging policy describes the need for a clear escalation path when using automation to respond in the service window.

## Give the agent enough context

Use the Shopify order reference and a brief note about what already happened. Avoid asking the customer to repeat the tracking number if the agent can verify it on the order. Assign the conversation and check that the next person can see it in their queue.

## Rehearse the bad cases

Test an exact keyword, a misspelling, a reply outside working hours and a case in which the order cannot be matched. Check where each message goes and who owns the follow-up. If a person has to reply after the service window closes, prepare the appropriate approved template for that situation.

See the [WhatFlow message controls walkthrough](/blog/whatflow-business-api-message-controls-and-store-report) to set up and test a rule.`
},
];
