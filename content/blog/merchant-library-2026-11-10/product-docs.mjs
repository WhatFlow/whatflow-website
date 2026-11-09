const hub='/blog/whatflow-business-api-help-center';
const shot=(slug,alt,caption=alt)=>`![${alt}](/api/media/file/whatflow-demo-2026-11-08-${slug}.webp "${caption}")`;
const guides = [
{
 slug:'whatflow-business-api-connection-and-billing', title:'Connect WhatsApp and check billing in WhatFlow Business API', cover:['Connect WhatsApp','and check billing'], motif:'pricing',
 excerpt:'Connect the number you intend to use, check Meta billing and run your first approved template before enabling automations.',
 body:`## Connect the sending number

Open WhatFlow Business API in Shopify Admin and go to **Connections**. Start the WhatsApp setup and choose the Meta business portfolio and WhatsApp account you intend to use. Read the options shown for your number before authorizing a connection, especially if that number already runs in the WhatsApp Business app or another provider. Your Meta account needs the appropriate access.

Back in Connections, compare the number and display name with what you expect customers to see. Check the connection status and resolve any account or payment issue there before testing a send. If you see a pending display name, verify which name customers see from a separate phone.

## Review both parts of your bill

Open **Billing** and check your current app plan and send allowance. Keep the WhatFlow subscription and overage separate from Meta’s applicable messaging charges. Add or review the payment method where Meta directs you. A working app subscription does not settle a Meta payment issue.

${shot('billing-meta','WhatFlow demo Billing page showing app and Meta charges separately')}

## Send one test message

Pick an approved template that matches the purpose of the test. Use a number you control and check the delivered sender name, values and button destination. If delivery fails, check connection status, Meta billing and the selected template before enabling any automation. [See the current plans and market rates](/pricing).`
},
{
 slug:'whatflow-business-api-template-guide',title:'Create, approve and reuse WhatsApp templates in WhatFlow',cover:['WhatsApp templates','in WhatFlow'],motif:'review',
 excerpt:'Choose a starting template, map Shopify data, and confirm Meta approval before attaching it to an automation.',
 body:`## Pick the Shopify event first

Open **Template Library** if you want a starting draft. Choose the event you need, such as an order update or a reminder. The library helps you see what information the event can provide. A fulfillment update needs a tracking value. A new order confirmation may run before that value exists.

${shot('template-library','WhatFlow demo Template Library with examples grouped by event')}

## Edit the draft and check the examples

In **Message Editor**, pick the event, write the body and map the variables. Fill the examples with realistic test values and check the order of each placeholder. Give buttons clear labels. If a button uses a link, open it on a phone. Keep promotional copy out of a template intended for an existing order update.

${shot('template-event-picker','WhatFlow Message Editor showing available Shopify events')}

## Review approval before enabling the automation

Open **Templates** and check the language, category and status. Select an approved template in the target feature and send an internal test. When a draft is rejected, correct the reason and verify approval before switching the automation to it. Keep a record of which automations use a template before changing or retiring it.

${shot('template-status','Demo template manager showing approval and preview controls')}`
},
{
 slug:'whatflow-business-api-checkout-and-draft-reminders',title:'Set up checkout and draft-order reminders in WhatFlow',cover:['Checkout and','draft-order reminders'],motif:'cart',
 excerpt:'Set the wait time and message for an abandoned checkout or an open Shopify draft order, then rehearse each recovery path.',
 body:`## Recover an abandoned checkout

Open **Abandoned Checkout**. Choose an approved reminder template and set a delay that gives the shopper a chance to finish. Use the sample preview to check the message before switching the reminder on. On a test checkout, open the link on your phone and check that it takes you back to the right basket.

${shot('checkout-reminders','Demo abandoned checkout reminder showing delay and message preview')}

Run a second checkout to completion before the configured delay expires. Check whether the reminder still fires and review your settings before rollout if it does. Check that your WhatsApp permission covers this kind of follow-up.

## Follow up on a draft order

Use **Draft Order Recovery** when a staff member prepared an order or quote that the customer has yet to complete. Choose the draft reminder template, set a wait time and check the invoice or checkout link on an actual test draft. Include a way to ask for help if the customer needs a product or shipping change.

${shot('draft-reminders','Demo draft-order reminder settings with a template and wait time')}

## Keep the two queues distinct

A staff-created draft and a shopper’s abandoned checkout can involve the same person. Before enabling both, rehearse how your team handles overlap and decide when to stop reminding. Review the first few runs for duplicate outreach and invalid links.`
},
{
 slug:'whatflow-business-api-cod-and-otp',title:'Configure COD rules, confirmation and OTP in WhatFlow',cover:['COD and phone','verification setup'],motif:'automation',
 excerpt:'Set checkout payment rules, verify a buyer’s number and record their response before dispatch.',
 body:`## Choose where cash on delivery is available

Open **Cash on Delivery**. Check the manual payment method WhatFlow should manage. If your store uses a separate COD shipping rate or limits payment by shipping option, select the rates and preview eligible and ineligible checkouts. Use the checkout itself to confirm what buyers can select. The exact checkout surfaces depend on your Shopify setup.

${shot('cod-checkout','WhatFlow demo COD rules with a Shopify checkout preview')}

## Ask for a dispatch decision

Use an approved order confirmation template with clear confirm and cancel choices. On a test order, click confirm from a phone and check that the right Shopify order receives the expected update. Test cancel, no answer and a customer with two open orders. Decide who reviews unclear replies before automating cancellation or release to fulfillment.

## Decide where to verify the phone number

Open **OTP Verification** and check the available placement options. Choose a placement your store supports and review the Shopify order tag used for a successful verification. Test a correct code, a wrong code and an abandoned attempt. A verified phone number shows the shopper had access to the number during the test. Your team still needs a dispatch rule.

${shot('otp-checkout','Demo OTP placement options and the Shopify order tag')}

See the [button-to-order workflow](/blog/whatflow-shopify-flow-whatsapp-automation-guide) for a Flow example.`
},
{
 slug:'whatflow-business-api-shipping-and-reviews',title:'Set up shipping updates and review requests in WhatFlow',cover:['Shipping updates','and review requests'],motif:'shipping',
 excerpt:'Choose shipping events customers need and time review requests around delivery or your fulfillment fallback.',
 body:`## Pick the shipping stages you can verify

Open **Shipping Journey**. Start with one meaningful stage, such as carrier pickup or delivery. Select an approved message for that stage, then confirm the carrier and Shopify send the event your workflow expects. Test the tracking link from a phone. Check a split shipment if that happens in your store.

${shot('shipping-journey','Demo Shipping Journey settings with individual fulfillment stages')}

## Time the review request

Open **Review Requests**. Choose when to ask, who receives the message and which approved template to send. If you use fulfillment as a fallback, choose a delay that accounts for the actual time in transit. A message asking for feedback before the parcel arrives creates avoidable support work.

${shot('review-request-timing','WhatFlow review request timing and fulfillment fallback controls')}

## Use Judge.me through Shopify Flow

If you collect reviews with Judge.me, inspect the Flow template that begins with a Judge.me review request event. Check that the order and review link reach the WhatFlow send action. Test against an order you control and see that the link opens the intended review form. Choose one route for the same request so the customer gets a single invitation.

${shot('flow-judgeme','Judge.me workflow preview with the WhatFlow WhatsApp action','Inactive Shopify Flow preview in the WhatFlow demo store.')}`
},
{
 slug:'whatflow-business-api-storefront-and-restock',title:'Add a WhatsApp storefront button and restock alerts in WhatFlow',cover:['Storefront chat','and restock alerts'],motif:'conversation',
 excerpt:'Make the storefront chat button fit your theme, then test a restock request for one unavailable variant.',
 body:`## Add the WhatsApp chat button

Open WhatFlow’s chat button setup and use Shopify’s theme editor to place and style the button. Preview the theme on desktop and mobile. Tap the button on a phone to verify the number and opening message. Check it against other floating elements such as the cart or cookie controls before publishing.

![Shopify theme editor showing the WhatFlow WhatsApp button controls](/api/media/file/blog-product-proof-theme-button-controls.jpg "WhatsApp button controls in the WhatFlow demo theme.")

## Set up back-in-stock requests

Open **Back in stock**. Follow the instructions for adding its product-page button, then choose the approved message. On a test product, switch between an available variant and one that is out of stock. Submit a request using a number you control and find it in the request queue.

${shot('restock-setup','WhatFlow demo back-in-stock button, requests and message controls')}

## Rehearse the restock

Restock the test variant and check the alert points back to that exact product or variant. Review any opt-out and eligibility conditions before sending. Keep the restock subscription focused on the product the customer requested. Collect separate permission if you also want to send broader offers.`
},
{
 slug:'whatflow-business-api-flow-and-admin-actions',title:'Use WhatFlow in Shopify Flow and directly on Shopify records',cover:['Shopify Flow and','record actions'],motif:'integration',
 excerpt:'Connect a Shopify event to a WhatsApp message and find manual messaging actions on individual Shopify records.',
 body:`## Build an event and action in Shopify Flow

Open the WhatFlow **Shopify Flow** guide, then open Shopify Flow. Pick a trigger that gives you the data your action needs. For example, start with an order reply if the next step needs an order reference. Add a condition for the specific response and choose a Shopify action such as tagging the order. Keep the workflow inactive while you review it.

${shot('shopify-flow-guide','WhatFlow Shopify Flow guide with starter templates and setup instructions')}

For outbound messages, select a WhatFlow message action and map the phone and template fields. Check what happens if the phone or the order reference is missing. The [template setup walkthrough](/blog/send-whatsapp-templates-shopify-flow) goes through the picker and variable mapping.

## Send from a Shopify record

Open **Admin Blocks** for placement instructions. In Shopify Admin, open the supported order, draft order or abandoned checkout record and add the WhatFlow block where available. Use the send action only after checking the recipient and preview. Start with a single test record before using any bulk action.

${shot('admin-blocks','WhatFlow guide to blocks on orders, draft orders and abandoned checkouts')}

## Test one reply all the way through

Use the same test number for the outbound message and reply. Find the resulting Flow run and confirm the intended order changed. Check that a repeated reply cannot tag an unrelated order. Keep a manual review path if there is no unambiguous order match.`
},
{
 slug:'whatflow-business-api-broadcast-and-reporting',title:'Run and measure a WhatsApp broadcast in WhatFlow',cover:['WhatsApp broadcasts','and reporting'],motif:'growth',
 excerpt:'Choose a permitted Shopify or Inbox audience, test the send and read the campaign results before retrying failures.',
 body:`## Choose where to send from

For a broadcast starting with Shopify customers, open the **Customer Broadcast** guide and select the recipients through the Shopify workflow it shows. In **Team Inbox**, the **Broadcasts** workspace is a separate route for building and monitoring campaigns. Use the audience source your workflow supports. Check that everyone in the batch has permission for the message.

${shot('broadcast-from-shopify','WhatFlow demo Customer Broadcast guide showing Shopify selection')}

## Preview the template and the recipient fields

Pick an approved template and map the data it expects. If the audience comes from a spreadsheet, check the phone format, required variables and duplicates. Test-send to a number you control and open any buttons or links. Assign a teammate to handle replies before you schedule the batch.

${shot('inbox-broadcasts','WhatFlow Inbox broadcast dashboard showing campaign status and delivery overview')}

## Read the result before retrying

Compare sent, delivered, failed and reply counts. Inspect the actual failure codes before retrying. Keep successful recipients out of a retry batch. Treat completed Shopify orders as a separate outcome and decide up front how you will attribute them.

${shot('analytics-funnel','WhatFlow demo message funnel and button reply report','The dashboard shows demo activity. Use your own reports to measure a live campaign.')}

For the recipient worksheet, see [campaign spreadsheet mapping](/blog/whatflow-whatsapp-campaign-spreadsheet-mapping).`
},
{
 slug:'whatflow-business-api-inbox-settings-and-replies',title:'Set up a Shopify support queue in WhatFlow Team Inbox',cover:['Set up your','Team Inbox'],motif:'inbox',
 excerpt:'Organise assignments, private notes, saved replies, customer details and follow-ups in Team Inbox.',
 body:`## Give every open conversation an owner

Open WhatFlow’s Inbox from Shopify. Use the assignment filters to find chats that are yours or unassigned. Claim a test conversation and ask a second agent to check whether it appears in their queue. Leave a private note with the order reference, the action you took and who should follow up. Confirm the note stays internal.

${shot('inbox-mine-queue','WhatFlow demo Inbox with the Mine filter selected')}

## Make the customer’s order easy to find

Open the conversation’s Shopify order context and check the order belongs to the right customer before discussing it. Use labels to group work such as address changes or returns. If you need a piece of information a label cannot represent, create a custom attribute at the contact or conversation level that matches the job.

${shot('inbox-labels','Inbox Labels settings for shared tags')}

${shot('inbox-attributes','Inbox Custom Attributes settings for contacts and conversations')}

## Create a saved reply for a question you get every day

Open **Canned Responses** and save one short answer. Leave out details that change for each order. In a test thread, insert the reply and personalise it before sending. If the customer service window has expired, choose an approved WhatsApp template from the template picker instead.

${shot('inbox-canned-responses','WhatFlow Inbox Canned Responses workspace')}

${shot('inbox-templates','Inbox templates filtered by language and approval status')}

Close the loop by resolving a test chat and checking where your team would find it if the customer writes back.`
},
{
 slug:'whatflow-business-api-inbox-catalog-and-flows',title:'Set up catalog sharing and WhatsApp Flows in WhatFlow Inbox',cover:['Inbox catalog','and WhatsApp Flows'],motif:'cart',
 excerpt:'Sync a product collection, share the right item and test an interactive form or cart handoff.',
 body:`## Sync and share a product

In Inbox, open **Catalog** and review the sync options for the Meta catalog and Shopify collection. Start with a small test collection. Check names, images and variant availability after sync. From a test conversation, send the intended catalog item and confirm the shopper sees the correct product.

${shot('inbox-catalog','WhatFlow demo Catalog sync and collection picker')}

If you use the catalog cart workflow, send a sample cart back to the business and follow the handoff to Shopify checkout. Confirm payment status in Shopify. A WhatsApp cart is useful context for the agent while the shopper decides.

## Build a short form with WhatsApp Flows

Open **Flows** in Team Inbox. Use a form for a question that benefits from structured answers, such as size or pickup preference. Preview and test every branch that changes the answer, then check where submissions appear and who follows up. Keep sensitive payment information in Shopify checkout.

${shot('inbox-flows','WhatFlow Team Inbox WhatsApp Flows workspace')}

Use [the catalog checkout walkthrough](/blog/whatflow-whatsapp-catalog-to-shopify-checkout) for an example cart. If you need a workflow that updates Shopify when an order changes, use the Shopify Flow guide instead.`
},
{
 slug:'whatflow-business-api-workflows-and-ai-connections',title:'Set up Inbox workflows, webhooks and AI connections in WhatFlow',cover:['Inbox workflows','and AI connections'],motif:'automation',
 excerpt:'Choose the correct workspace for Inbox automations, event webhooks or an external AI assistant.',
 body:`## Build and check an Inbox workflow

Open **Workflows** in Team Inbox and pick the trigger you need. Start with one branch and one action, then inspect the run history to see where it succeeds or fails. An API-triggered workflow is useful when another system initiates a step. Test with a demo contact before sending to a customer.

${shot('inbox-workflows','WhatFlow Inbox workflow library and run tabs')}

## Send Inbox events to another system

Open **Webhooks** and configure an endpoint for the supported events you need. Verify signatures at the receiving service and treat repeated deliveries as possible. Use a test event and confirm the receiver records it once. See [signed Inbox webhooks](/blog/whatflow-team-inbox-signed-webhooks) for the implementation walkthrough.

${shot('inbox-webhooks','Inbox Webhooks manager for supported events')}

## Connect an AI client with the right access

Open **AI Connections** in the Shopify app. Choose a supported client and follow the setup instructions for that client. Begin with the smallest access level that lets you do the job. Try looking up an order or drafting a response and review the result before granting any capability that changes a conversation.

${shot('ai-connections','WhatFlow AI Connections setup instructions in Shopify Admin')}

See the [WhatFlow MCP documentation](/docs/mcp) for capabilities and permission boundaries.`
},
{
 slug:'whatflow-business-api-message-controls-and-store-report',title:'Manage auto-replies, opt-outs and Store Report in WhatFlow',cover:['Auto-replies and','message controls'],motif:'conversation',
 excerpt:'Set up keyword replies, respect opt-outs and limit store reports to authorised numbers.',
 body:`## Create one auto-reply

Open **Auto-replies** and create a rule for a common question, such as asking how to track an order. Configure what the customer must send, then choose the response and check the preview. Send the test phrase from a number you control and also try a similar phrase that should fall through to a teammate. Keep the rule narrow if broad matching catches questions it cannot answer.

## Test your WhatsApp blocklist

Open **WhatsApp Blocklist** to review opt-out and opt-in settings. Test a STOP message and confirm the test number appears where you expect. Review how your automation treats opted-out numbers and leave suppression enabled for the messages they asked to stop. A START message should restore only the permission the customer actually gave. Add a number manually when a legitimate opt-out arrives through another channel.

## Request a Store Report

Open **Store Report**, choose the keyword and report sections, and review the authorised numbers. Keep the list limited to staff who should see the store metrics. If the keyword overlaps an auto-reply, choose another one. Test from an authorised number and verify an unauthorised test number cannot see the report.

${shot('store-report','WhatFlow Store Report settings and WhatsApp keyword setup')}

The **Feature Board** is where you can review or request product changes. Keep customer numbers and order details out of public feature requests.

${shot('feature-board','WhatFlow Feature Board in Shopify Admin')}`
},
{
 slug:'whatflow-business-api-flowsense-order-review',title:'Review Shopify COD orders with WhatFlow FlowSense',cover:['Review COD orders','with FlowSense'],motif:'shipping',
 excerpt:'Understand what FlowSense can flag and decide how to review an order before dispatch.',
 body:`## Review the settings before enabling FlowSense

Open **FlowSense** in the WhatFlow Business API app. Review the description of how it uses order and delivery outcomes and the consent shown in the setup screen. Enable it only if it fits your store’s review policy. A teammate should know where to review the feature and how to turn it off.

## Give your team a decision they can explain

Use a flagged order to prompt an address check, a WhatsApp confirmation or another review step your store supports. A suspicious pattern is a reason to investigate. It does not establish that the customer is fraudulent. An unanswered message can also mean the customer was busy.

If the order needs prepayment or a deposit under your store policy, explain that in the payment instructions and record the decision in Shopify. When a buyer has two pending orders, verify which one they are discussing before changing either one.

## Check what the merchant sees

Review the example order insights on the FlowSense screen, then rehearse the response with a test order. Check the order record before and after an agent acts. Compare confirmed orders and returned deliveries using your own store history.

For the dispatch decision and the message buttons, use the [COD and OTP guide](/blog/whatflow-business-api-cod-and-otp). For a channel choice in Pakistan, see [WhatsApp vs robocalls](/compare/whatflow-vs-robocalls-pakistan).`
},

];

export const productDocs = guides.map(item=>({
 ...item, group:'WhatFlow Business API help',category:'guides',
 body:`${item.excerpt}

${item.body}

[Browse WhatFlow Business API documentation](${hub}).`,
}));
export const productHub = {
 slug:'whatflow-business-api-help-center',title:'WhatFlow Business API help centre for Shopify',cover:['WhatFlow Business','API help centre'],motif:'integration',group:'WhatFlow Business API help',category:'guides',
 excerpt:'Find setup instructions and WhatFlow Demo Store screenshots for Shopify messaging, checkout, campaigns and Team Inbox.',
 body:`Use this guide with WhatFlow Business API open in Shopify Admin. Start with Connections and Templates if you are setting up your first send. If your number is already connected, choose the guide for the job you want to test.

## Connect the account and send your first message

${guides.slice(0,2).map(x=>`- [${x.title}](/blog/${x.slug})`).join('\n')}

## Work with Shopify orders and the storefront

${guides.slice(2,7).map(x=>`- [${x.title}](/blog/${x.slug})`).join('\n')}

## Set up campaigns, Inbox and automation

${guides.slice(7).map(x=>`- [${x.title}](/blog/${x.slug})`).join('\n')}

## Look up a specific workflow

- [Fix failed WhatsApp broadcasts](/blog/whatflow-whatsapp-broadcast-failure-retry)
- [Map a campaign spreadsheet](/blog/whatflow-whatsapp-campaign-spreadsheet-mapping)
- [Connect an AI client](/docs/mcp)
- [Check app plans and Meta rates](/pricing)

Use a test number and demo order when following a walkthrough. If the screen offers a preview or test send, check the result before enabling the automation for customers.`,
};
