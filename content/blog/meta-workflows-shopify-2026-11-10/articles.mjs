const request = 'https://www.postman.com/meta/whatsapp-business-platform/request/';
const shot = (name, alt, caption) => `![${alt}](/api/media/file/${name}.webp "${caption}")`;

export const articles = [
  {
    slug: 'shopify-delivery-pin-whatsapp-auto-reply',
    title: 'Ask for a delivery pin on WhatsApp with a Shopify auto-reply',
    excerpt: 'Collect an optional map pin when an address needs clarification, then verify the right Shopify order before dispatch.',
    cover: ['Delivery pins','over WhatsApp'], motif: 'shipping',
    sources: [
      [request+'3pwqfn8/send-location-message','Meta’s Cloud API location message example'],
      ['https://whatsappbusiness.com/policy/','WhatsApp Business Messaging Policy'],
    ],
    body: `A courier is ready to leave, but the address ends at “near the pharmacy.” If the shopper messages you, ask for a pin at the place they want the parcel delivered. Give them the option to type a landmark or corrected address instead. A pin dropped from wherever they happen to be standing may send the courier to the wrong place.

## Set up a reply for an address question

In WhatFlow Business API, open **Auto-replies**. Create a rule for a specific phrase such as “share delivery location” and choose **Ask for the customer’s location** as the reply type. Write a short explanation of why you need the pin. Try the rule in an active conversation from a test phone. Use the button once, then try responding with a landmark instead and check who handles that reply.

${shot('whatflow-demo-2026-11-10-auto-replies','WhatFlow demo Auto-replies screen','Open Create auto-reply from this list and choose the location request when you configure the response.')}

## Verify the order before using the pin

Match the customer’s reply to the correct Shopify order and confirm the address with them. Have a teammate update the delivery record according to your dispatch process. If the number has two pending orders, ask which one the pin applies to. Share only the location details the delivery team needs.

Meta also documents an outbound location message. That can be useful for sending a shop’s pickup point. Test the two directions separately so the buyer knows whether to send their own pin or open yours.`,
  },
  {
    slug: 'whatsapp-copy-code-button-shopify-discounts',
    title: 'Use a WhatsApp copy-code button for a Shopify discount',
    excerpt: 'Create a Shopify discount, add a copy-code button to the WhatsApp marketing template, and test redemption on a phone.',
    cover: ['WhatsApp copy-code','buttons for Shopify'], motif: 'growth',
    sources: [
      ['https://whatsappbusiness.com/wp-content/uploads/2026/04/Best-Practices-for-Marketing-Messages-on-WhatsApp-.pdf','Meta’s marketing template examples and native coupon buttons'],
      ['https://help.shopify.com/en/manual/discounts/discount-types/percentage-fixed-amount','Shopify discount code setup'],
    ],
    body: `If a buyer has to switch back to WhatsApp and retype a discount at checkout, make the code easier to copy. A coupon button puts the code on the clipboard. The buyer still needs to apply it at Shopify checkout unless your link already applies the discount.

## Make the discount work in Shopify first

Create the discount in Shopify and set the qualifying products, dates and usage limits. Open a test cart that qualifies, then try one that does not. If there is a minimum spend, use the same wording in the message as you do on the offer page. Decide what the team should say if an order misses the cutoff.

## Set up the WhatsApp template

Open the WhatFlow Message Editor, choose an appropriate marketing template and add **Copy code** under the button options. Enter a sample code for review. After approval, verify the code used by the actual campaign and check that it matches the active Shopify discount. Send a test to your own phone, tap the button and paste the code into checkout.

${shot('whatflow-demo-2026-11-08-template-event-picker','WhatFlow Message Editor entry screen','Choose the message purpose in the editor, then open the button controls in the template setup.')}

## Check the offer from the buyer’s side

Use a phone to read the offer, copy the code and complete an eligible test checkout. If the campaign includes a shopping button, check that the link goes to the advertised collection. Send to shoppers whose permission covers promotions and use Shopify’s discount redemptions to see who used the code.`,
  },
  {
    slug: 'replace-published-whatsapp-flow-shopify',
    title: 'How to replace a published WhatsApp Flow in a Shopify campaign',
    excerpt: 'Prepare a new version of an in-chat form and update the messages that launch it before retiring the old one.',
    cover: ['Replace a live','WhatsApp Flow'], motif: 'automation',
    sources: [
      ['https://www.postman.com/meta/whatsapp-business-platform/documentation/y5swede/moved-whatsapp-flows-api?entity=request-24926895-3d6d3ad5-56f4-4549-b6d3-31e90fd6be88','Meta’s WhatsApp Flows API collection'],
      ['https://whatsappbusiness.com/products/whatsapp-flows/','Meta’s in-chat forms overview'],
    ],
    body: `Your pickup form is already in a WhatsApp campaign. A second shop opens, so you need to add a choice without leaving customers with a form that sends them to the wrong counter. Prepare a new version and move the entry points over one by one.

## Find the messages that launch the current form

List the templates, campaigns and reply shortcuts that open it. Record who owns each one and whether any sends are already scheduled. This matters for messages that are still in customers’ chat history. Keep the old experience usable while people can reasonably be expected to act on those messages.

## Test the replacement before switching

Open **Flows** in WhatFlow Inbox. Prepare a new draft, then preview it on a phone. Test both shop choices, the confirmation screen and where each submission appears. If an approved template opens the form, prepare and review the replacement template as part of the switch. Publishing the form is only one step in the change.

${shot('whatflow-demo-2026-11-08-inbox-flows','WhatFlow Inbox WhatsApp Flows workspace','Use the workspace to check which form you are working on before testing the template that opens it.')}

## Move the entry points before retiring the old form

Start with a single controlled send that opens the new form. Check the submitted answer with the person who handles pickup. Once the live entry points and scheduled sends point to the replacement, agree when it is safe to deprecate the old version. Update the handover notes so the next campaign uses the right form.`,
  },
  {
    slug: 'whatsapp-sends-work-but-shopify-inbox-replies-missing',
    title: 'WhatsApp sends work but replies are missing in your Shopify inbox',
    excerpt: 'Use one test conversation to distinguish an inbox routing issue from a missing inbound connection.',
    cover: ['Find missing','WhatsApp replies'], motif: 'inbox',
    sources: [
      [request+'0yubu4i/subscribe-app-to-whatsapp-business-account','Meta’s Embedded Signup subscription example'],
      ['https://www.postman.com/meta/whatsapp-business-platform/documentation/du6gzjv/embedded-signup','Meta’s Embedded Signup documentation'],
    ],
    body: `An order update arrives on your test phone, but the reply never appears in the inbox. The outbound send and the incoming reply take separate paths. Meta’s Embedded Signup documentation includes a separate step for an integration to subscribe to updates from the WhatsApp business account.

## Check the sender and inbox first

On your test phone, open the conversation and verify the sender number. Reply with a distinctive phrase and note the time. In the inbox, check the connected channel, then search across conversations and assignments. If another teammate can see the reply, look at routing or filters before changing the connection.

${shot('whatflow-demo-2026-11-08-inbox-mine-queue','WhatFlow Inbox filtered to the demo agent’s assignments','The Mine filter shows assigned chats. Search beyond this view when checking whether an inbound reply arrived.')}

## Give support a test they can trace

If the reply is missing for everyone, send support the store name, the connected business number through a private support channel, the test time and the result of the outbound send. Ask them to check whether Meta updates are reaching the integration for the intended account. This is particularly useful if the number was recently moved or a second tool was connected.

Wait for a second controlled reply before turning your reply-based automations back on. Then check a full test order so a reply that appears in the inbox also reaches the workflow that needs it.`,
  },
];
