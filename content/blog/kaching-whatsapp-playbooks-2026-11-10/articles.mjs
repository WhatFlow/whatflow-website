const shopify = 'https://help.shopify.com/en/manual/';
const kaching = 'https://www.kachingappz.com/blog/';
const policy = ['https://whatsappbusiness.com/policy/', 'WhatsApp Business Messaging Policy'];
const shot = (screen, alt, caption) =>
  `![${alt}](/api/media/file/whatflow-demo-${screen}.webp "${caption}")`;

export const articles = [
  {
    slug: 'shopify-bundle-quantity-breaks-whatsapp',
    title: 'Sell Shopify bundles and quantity breaks through WhatsApp',
    excerpt: 'Answer mix-and-match questions in WhatsApp, then send shoppers to the Shopify page where their bundle price actually applies.',
    cover: ['Bundles and','quantity breaks'], motif: 'cart',
    sources: [
      [kaching+'how-to-create-bundles-on-shopify/', 'Kaching’s guide to Shopify bundle options'],
      ['https://support.kachingappz.com/en/articles/11320910-different-bundle-types-quantity-break-bxgy-discount-and-bundle-upsell', 'Kaching Bundles deal types'],
      [shopify+'products/bundles/eligibility-and-considerations', 'Shopify bundle types and eligibility'],
    ],
    body: `“Can I get two medium tees and one large and still get the three-pack price?” A link to your bestseller leaves that question unanswered. Check how the deal counts items, confirm which sizes qualify, and send the shopper to the page where they can build the pack.

## Check how the offer counts products

A quantity break rewards buying a certain number of eligible items. A fixed bundle has a set of products, sometimes with a choice of variants. A mix-and-match offer lets the shopper pick from a set of products within the rules you configure. A bundle app such as Kaching Bundles can offer multiple deal types, so test the exact deal you published.

Try three copies of one variant, then three different eligible variants. Remove one item and check that the discount drops away as expected. If the deal depends on a product-page widget, share that page. If you let customers build the deal across several products, test the collection and the cart together before sharing the collection link.

## Give your inbox team a reply they can finish in one message

Write down the minimum quantity, eligible items and link. Add a saved reply in WhatFlow Team Inbox, then have agents confirm the requested variants before sending it. If you have synced a catalog, you can show the shopper the individual options in the chat and send them to Shopify to select the bundle.

${shot('2026-11-08-inbox-catalog','WhatFlow demo catalog with the Shopify collection picker','Choose which collection to sync for sharing products in chat. The bundle rules are configured in Shopify or your bundle app.')}

For a verified mix-and-match deal, try “Yes, those sizes count together. Pick the three sizes from this page and check that the three-pack price appears before you pay. If it shows a different price, send me a screenshot of the cart totals with your details hidden.”

## Decide what to do when a variant sells out

Offer a replacement only after testing that it still qualifies. When nothing suitable is available, say which size is out of stock and let the customer decide whether to buy the rest. Use the [WhatFlow catalog setup guide](/blog/whatflow-business-api-inbox-catalog-and-flows) to check what your team can currently share from the inbox.`,
  },
  {
    slug: 'shopify-free-gift-missing-whatsapp',
    title: 'Free gift missing from Shopify checkout? A WhatsApp support guide',
    excerpt: 'Work out why a Shopify Buy X Get Y gift is missing, give shoppers a clear fix, and catch repeat issues before the next campaign.',
    cover: ['Free gift missing','at checkout?'], motif: 'conversation',
    sources: [
      [shopify+'discounts/discount-types/buy-x-get-y', 'Shopify Buy X Get Y requirements'],
      [shopify+'discounts/discount-combinations', 'Shopify discount combination rules'],
      ['https://support.kachingappz.com/en/articles/14955587-buy-x-get-y-every-bogo-variant-setup', 'Kaching Bundles Buy X Get Y settings'],
    ],
    body: `A shopper adds the two products from your offer and messages, “Where’s my free gift?” Ask which products and variants are in the cart and whether the gift is visible. Those details tell you whether to fix a missing cart line, check the discount, or flag an inventory issue.

## Reproduce the cart before replying

Start with the same market and qualifying items. With Shopify’s native Buy X Get Y discount, shoppers add the qualifying products and the reward item themselves. If you use a bundle or gift app, check how that specific offer is set up. Some app configurations have a different path for adding the gift.

If the gift is visible at full price, look at the dates, qualifying items, minimum and any discount already applied. Test the cart with and without the other discount. Check stock for the exact gift variant. A missing gift and a gift priced at full price often need different fixes.

## Save two replies in WhatFlow

For a gift that needs adding, try “Your cart qualifies. Add the mini cleanser from this link before checking out. You should see its price drop to zero once both items are in your cart.” Send that only after confirming the rule for the shopper’s cart.

If the gift appears at full price, try “I can see why you paused. Which scent did you choose, and is another code already showing in checkout? I’ll check what’s applying before you pay.” For a completed order, verify the order and follow your store’s promotion and fulfillment policy before promising a shipment or credit.

${shot('2026-11-08-inbox-canned-responses','WhatFlow Inbox Canned Responses workspace','Keep separate replies for a gift missing from the cart and a gift showing at full price.')}

## Fix the wording when the same question keeps coming back

Label gift issues in the inbox and review them by offer. If three shoppers assumed the gift would appear on its own, add “Add the gift to your cart” to the product page and the campaign. Use the [WhatFlow support queue guide](/blog/whatflow-business-api-inbox-settings-and-replies) to set up labels your teammates will use consistently.`,
  },
  {
    slug: 'shopify-mobile-cart-drawer-whatsapp-links',
    title: 'Test Shopify cart drawer offers before sending WhatsApp links',
    excerpt: 'Check whether a WhatsApp link opens the right Shopify offer on mobile, especially when it depends on your cart drawer.',
    cover: ['Test cart offers','from WhatsApp'], motif: 'cart',
    sources: [
      [kaching+'shopify-mobile-cart-optimization/', 'Kaching’s Shopify mobile cart guide'],
      ['https://support.kachingappz.com/en/articles/11378412-quickstart-guide-setting-up-kaching-cart', 'Kaching Cart setup and theme compatibility'],
      [shopify+'checkout-settings/cart-permalink', 'Shopify cart permalinks'],
    ],
    body: `Your WhatsApp campaign says “Pick your free sample in the cart.” The link takes the shopper straight to checkout. They never see the sample picker. This is easy to miss if the team only tests by adding items from the product page on a laptop.

## Pick a link based on what the shopper needs to do

Send shoppers to the product or offer page when they need to pick a size, build a bundle or open a cart drawer. A Shopify cart permalink is useful when you can specify the exact variants and quantities up front. Shopify documents versions that open a populated cart page or go to checkout. A cart page and a cart drawer are separate experiences, so test the actual link with your theme.

If you are reminding someone about an existing checkout, check the reminder’s own link. A new prefilled cart link serves a different purpose and can leave the shopper wondering where their earlier choices went.

## Open the link the way the shopper will

1. Send the real campaign template to a test phone. Tap the link from WhatsApp.
2. Start with an empty cart, then repeat with a product already in it. Check what the customer sees both times.
3. Add and remove a qualifying item. Check the discount, reward, and final checkout total. Repeat in each market you plan to message if the rules vary by market.
4. If the cart drawer fails to appear, test the published theme and check whether more than one drawer is active. Use a product-page link until you can verify the shorter route.

${shot('2026-11-08-checkout-reminders','WhatFlow demo checkout reminders settings','Test a checkout reminder from its own settings and verify its destination separately from a campaign offer link.')}

## Leave agents a fallback link

Keep one tested offer page in a saved WhatFlow reply. If a shopper says the drawer is blank or the reward is missing, agents have a working link and can ask for the device and market to help reproduce the problem. For a discount where shoppers paste a code instead, see [how to test a WhatsApp copy-code button](/blog/whatsapp-copy-code-button-shopify-discounts).`,
  },
  {
    slug: 'shopify-free-shipping-threshold-whatsapp-markets',
    title: 'Explain Shopify free shipping thresholds on WhatsApp',
    excerpt: 'Check free shipping thresholds by market, currency and discount, then give your WhatsApp team a reply they can verify.',
    cover: ['Free shipping','by market'], motif: 'shipping',
    sources: [
      [shopify+'markets/discounts-and-gift-cards', 'Shopify discounts and currency in Markets'],
      [shopify+'discounts/discount-combinations', 'Shopify discount combinations'],
      ['https://support.kachingappz.com/en/articles/17566657-how-to-set-up-a-free-shipping-progress-bar-with-a-threshold-in-kaching-cart', 'Kaching Cart progress bar thresholds'],
    ],
    body: `A customer in Toronto taps a message that promises free delivery over $60. Their checkout still shows a delivery charge. Before telling them to add something, check which currency the offer was written in, where the order is going and which rule is meant to remove the shipping charge.

## Find the rule behind the message

The offer might come from a Shopify shipping rate, a shipping discount, or an app that shows a progress bar and applies a reward. Write down the source. For example, Shopify says a free shipping discount’s minimum purchase amount is set in the store’s default currency and converted at checkout. A cart app can also have market-specific thresholds. Look at the published setup and test it in the shopper’s market.

Use one cart just below the threshold and one just above it. Add the shipping postcode and try the test again with the promotional code from your WhatsApp message. Record which shipping options are eligible and whether the discounts can combine. If a free shipping message was written in one currency, show the currency explicitly in the copy.

## Reply with what the shopper can check

“Can you tell me the delivery country and postcode, and which code you applied? I’ll check the free delivery threshold for that checkout.” You generally don’t need the full address or a screenshot containing payment details to start.

${shot('2026-11-08-inbox-labels','WhatFlow demo Inbox Labels settings','A shared shipping-offer label helps the team spot repeated questions from the same promotion.')}

## Update the cart, campaign and inbox together

Put the verified terms on the offer page, in the cart and in the saved WhatsApp reply. If your store has several markets, keep a short internal list with one example cart per market. When the offer changes, retest those carts before approving the next message. The [WhatFlow broadcast guide](/blog/whatflow-business-api-broadcast-and-reporting) covers sending a test and reviewing the campaign after it goes out.`,
  },
  {
    slug: 'shopify-post-purchase-upsell-whatsapp-confirmation',
    title: 'Check WhatsApp order confirmations after a Shopify post-purchase upsell',
    excerpt: 'Test accepted, declined and skipped offers so your WhatsApp confirmation and support team use the right Shopify order details.',
    cover: ['Post-purchase offers','and order messages'], motif: 'automation',
    sources: [
      ['https://shopify.dev/docs/apps/build/checkout/product-offers', 'Shopify post-purchase offers and fulfillment timing'],
      ['https://support.kachingappz.com/en/articles/17780075-funnels-connect-your-upsell-offers-across-checkout-post-purchase-and-thank-you-page', 'Kaching’s checkout, post-purchase and thank-you offer guide'],
      policy,
    ],
    body: `A shopper accepts an extra filter after paying for a coffee maker. Their WhatsApp confirmation lists only the machine. Before sending a second message, open Shopify to see whether the filter was added to the original order or purchased in a separate one. The answer depends on where the offer ran and how the upsell app handles it.

## Test three orders before changing your confirmation

Place eligible test orders. Accept the upsell in one, decline it in another, and close the page in a third. For each one, write down the order ID, line items and total when the WhatsApp message arrived, then check what Shopify shows once the offer flow has finished. Run a separate test for a thank-you page offer if you use one. An accepted offer there can create a separate order with some setups.

## Keep an early confirmation short if the order may still change

An acknowledgement such as “We received order #1234. Check your order page for the latest details” can work better than a list that might already be out of date. Use the verified order link your workflow supports and preview the message with a test order. If you add a separate update after an order changes, check that it fires only when the change is recorded and that one accepted offer cannot trigger the message twice.

${shot('2026-11-08-shopify-flow-guide','WhatFlow demo Shopify Flow guide','Check the event and conditions in Shopify Flow if that is what sends your confirmation.')}

## Give support a clear answer for each outcome

When someone asks about an add-on, verify the line item and fulfillment status in Shopify. If it is a separate order, use both order numbers when explaining the status. Keep product offers out of the order update template. The [WhatFlow Shopify Flow guide](/blog/whatflow-business-api-flow-and-admin-actions) explains how to connect WhatFlow’s send actions to an event your workflow actually receives.`,
  },
  {
    slug: 'shopify-popup-whatsapp-welcome-offer',
    title: 'Connect a Shopify welcome popup to WhatsApp without sending twice',
    excerpt: 'Test your popup’s WhatsApp permission, discount delivery and inbox handoff before shoppers see the welcome offer.',
    cover: ['Welcome popups','and WhatsApp'], motif: 'integration',
    sources: [
      [kaching+'shopify-discount-popup/', 'Kaching’s welcome and discount popup guide'],
      [shopify+'promoting-marketing/create-marketing/forms-app/settings/all-forms', 'Shopify Forms marketing consent settings'],
      [shopify+'promoting-marketing/create-marketing/shopify-messaging/marketing-automations/create', 'Shopify marketing automations'],
      policy,
    ],
    body: `If your popup shows a welcome code and an automation sends the same code over WhatsApp, the shopper has two places to look and your team has two places to fix it next time. Decide where the code arrives and what the WhatsApp conversation adds before you switch the popup on.

## Decide how the shopper gets the promised offer

One approach is to show the code on the popup’s success screen and invite the shopper to start a chat if they need help. Another is to say upfront that the store will send the code on WhatsApp, ask for the right marketing permission, then have one workflow send the approved marketing template. An email-only signup or a customer opening a support conversation should stay out of the WhatsApp promotion audience unless there is separate permission for it.

Shopify Forms offers WhatsApp consent settings. If you use a different popup app, test which channel it records and where the permission ends up. Check how your own consent records get into the audience you use. When using a spreadsheet in WhatFlow, export the eligible audience first and check it against current opt-outs before sending.

## Test four paths with a real phone

Submit once as a new WhatsApp subscriber, once as someone who has already received the offer, and once without WhatsApp permission. Then submit and complete a purchase before any scheduled reminder. Check whether each path sends the message you intended and whether the code remains valid. Check your other automations for the same welcome offer and decide which one owns it.

${shot('2026-11-08-inbox-broadcasts','WhatFlow demo Inbox Broadcasts workspace','Review the audience and the scheduled send in WhatFlow if you use a broadcast to deliver an offer.')}

Use [WhatFlow’s audience spreadsheet guide](/blog/whatflow-whatsapp-campaign-spreadsheet-mapping) if you are sending to a verified list. Leave your support team a short reply for “I signed up but never got the code” so they can help without subscribing the shopper again.`,
  },
  {
    slug: 'shopify-subscription-first-order-renewal-price-whatsapp',
    title: 'Explain first-order and renewal prices for Shopify subscriptions on WhatsApp',
    excerpt: 'Answer subscription pricing questions with the first charge, renewal price and delivery cadence before sending the Shopify link.',
    cover: ['Subscription price','before checkout'], motif: 'pricing',
    sources: [
      [kaching+'how-to-set-up-subscriptions-on-shopify/', 'Kaching’s Shopify subscription setup guide'],
      ['https://support.kachingappz.com/en/articles/11712899-kaching-subscriptions-explained', 'Kaching subscription plans and discounts'],
      [shopify+'products/purchase-options/subscriptions/shopify-subscriptions/customer-experience', 'Shopify Subscriptions checkout and customer accounts'],
    ],
    body: `“Is it $24 every month?” is a fair question when the product page leads with an introductory price. Answer with what comes out of the customer’s account today, when the next charge is due, and what they will pay then. Use the actual plan in Shopify as your reference.

## Open the product as a new shopper

Check the one-time purchase, the first subscription checkout and the stated renewal terms for the right product variant. Look at the billing and delivery cadence separately, especially if your store offers prepaid plans. Record what your answer includes, such as whether shipping is extra. When an introductory code is involved, verify how many orders it applies to. Do the same checks on a phone in the market you sell to.

An example reply for a fictional coffee plan could read “The first monthly shipment is $24 before shipping. After that it’s $30 before shipping every month unless you change or cancel the plan. Here’s the page with both the one-time and monthly options.” Use the figures and terms from your actual plan.

## Save the structure in WhatFlow, then fill in the current terms

Store a short reply skeleton with placeholders for today’s charge, the next charge and delivery frequency. Have agents fill those fields from the current plan before sending. When a shopper asks about an existing subscription, check their plan and order history instead of quoting the current storefront offer. Send them to the account or portal link for their plan when they ask where to manage it.

${shot('2026-11-08-inbox-canned-responses','Canned Responses settings in the WhatFlow demo inbox','Save a reply that prompts agents to verify the renewal price before sharing it.')}

If agents keep answering the same question, add the renewal price beside the first-order price on the product page. The [subscription retention guide](/blog/subscription-churn-whatsapp-shopify) covers what to do after the shopper subscribes.`,
  },
  {
    slug: 'shopify-bundle-partial-return-whatsapp',
    title: 'Handle a partial Shopify bundle return over WhatsApp',
    excerpt: 'Check the bundle type, discounted order lines and return policy before quoting a refund for one item from a set.',
    cover: ['Bundle returns','in Team Inbox'], motif: 'inbox',
    sources: [
      [shopify+'products/bundles/eligibility-and-considerations', 'Shopify bundle return and exchange considerations'],
      [shopify+'fulfillment/managing-orders/returns', 'Shopify order returns and refunds'],
      policy,
    ],
    body: `A shopper bought a two-piece set and wants to keep the jacket but send back the trousers. Before telling them how much they’ll get back, check the original order. A fixed bundle, two separately discounted items and a gift offer can leave different lines and discounts on the order.

## Check the component and the policy

Verify the order, the exact item and whether it was marked final sale. For Shopify Bundles, Shopify describes return eligibility at the component level and lists limitations on bundle exchanges. If a third-party app created the offer, check how it represented the sale on the order. Also check the terms you showed the shopper at the time, particularly when a free gift was included.

Look up the amount associated with the return in Shopify and follow the store’s approval process. The current product page price can differ from what the customer paid for the item. If the exchange needs a separate purchase or another action, explain how the customer will be charged before they agree.

## Keep the WhatsApp reply short and specific

“I can check the trousers for you. What’s the order number and the size you want to return? I’ll confirm the options and the refund amount before you send anything back.” After verifying the order, explain what to return, what they can keep, and when you can confirm the refund. Send your secure returns link if you have one.

${shot('2026-11-08-inbox-attributes','WhatFlow Inbox Custom Attributes settings','If your team uses a field for return status, keep the detailed refund and payment records in Shopify.')}

If a case involves a disputed refund or a promotion exception, assign the chat to the teammate who can approve it and record the handoff. Read the [WhatFlow inbox setup guide](/blog/whatflow-business-api-inbox-settings-and-replies) for shared queue and assignment controls.`,
  },
  {
    slug: 'measure-whatsapp-bundle-campaign-aov-margin-shopify',
    title: 'Measure AOV and margin on a Shopify WhatsApp bundle campaign',
    excerpt: 'Use Shopify orders and WhatFlow delivery records to see whether a bundle campaign increased order value and left money after costs.',
    cover: ['Bundle campaign','AOV and margin'], motif: 'growth',
    sources: [
      [kaching+'aov-in-shopify/', 'Kaching’s guide to average order value'],
      [shopify+'promoting-marketing/analyze-marketing/marketing-performance', 'Shopify marketing performance and attribution'],
      [shopify+'reports-and-analytics/shopify-reports/report-types/default-reports/marketing-reports', 'Shopify marketing report metrics'],
    ],
    body: `A WhatsApp offer can turn a $40 order into a $55 order and leave you with less money per sale. The extra items cost money, and discounts, packing and shipping can eat the difference. Record order value and contribution per order before deciding whether to run the same offer again.

## Keep the comparison narrow

Pick one bundle, one campaign link and one reporting window. Tag the Shopify destination with a campaign name and use a discount code unique to the send if your offer allows it. Check Shopify’s campaign report and discount redemptions. Some buyers will come back another way, and some will share the code. State the attribution rule you used so the next campaign can be compared on the same basis.

For the offer group, divide the chosen sales total by the number of eligible orders. Use the same sales definition and period rules for the comparison group. If a comparable group was held out from the send, compare against it. Without a holdout, describe the result as an observed difference.

## Check what the extra items cost you

Take a hypothetical order with $55 in merchandise revenue after discounts. Subtract $29 in product cost, $8 in packing and shipping subsidies, and $3 in payment and allocated messaging costs. That leaves $15 in contribution. If an ordinary $40 order leaves $18 on the same basis, the offer needs to generate enough extra orders to make up the difference. Add refunds once the reporting window allows them to settle.

${shot('2026-11-08-analytics-funnel','WhatFlow demo message funnel and reply analytics','Use WhatFlow to check delivery and replies. Use Shopify orders and your cost records to calculate order value and margin.')}

The [WhatsApp campaign budget guide](/blog/whatsapp-marketing-cost-per-order-shopify) has a worked example for message cost per order. Keep that number beside the margin calculation when you review the send.`,
  },
  {
    slug: 'shopify-exit-popup-whatsapp-product-question',
    title: 'Use a Shopify exit popup to offer WhatsApp product help',
    excerpt: 'Give shoppers a way to ask about fit, compatibility or delivery before leaving, and measure whether your team resolves the question.',
    cover: ['Exit popups for','product questions'], motif: 'conversation',
    sources: [
      [kaching+'shopify-exit-intent-popup/', 'Kaching’s desktop and mobile exit popup guide'],
      [shopify+'promoting-marketing/create-marketing/forms-app/settings/popup', 'Shopify popup display and timing settings'],
      policy,
    ],
    body: `A shopper spends a minute on a replacement filter page and starts to leave. They may need to know whether it fits their machine. A popup that says “Ask us if it fits” gives them a way to check before they buy the wrong item.

## Start on pages where a short answer can help

Pick a few products with recurring fit, compatibility or dispatch questions. If your popup supports a custom link, use your store’s WhatsApp link and prefill a plain opening line such as “Hi, does the S2 filter fit my machine?” Leave the text editable. Skip the phone field if all you need to do is open a chat. If you need a sitewide alternative, put the WhatFlow chat button where shoppers can reach it without opening the popup.

Test the popup after it has been dismissed and test a phone separately. Some desktop exit triggers rely on cursor movement. On a phone, consider a quieter trigger or just the chat button. Keep the offer off the checkout path unless you have a specific need and can verify the behavior there.

${shot('2026-11-10-auto-replies','WhatFlow demo Auto-replies screen','Test a narrowly matched reply if you want to acknowledge chats started from the popup.')}

## Review the questions as well as the orders

Try the link on a phone and have someone else answer the test chat. Check whether the agent knows which product the shopper means and can give a useful answer. Track chats that start with your product prompt and review how many got a clear answer. If several shoppers ask the same question, update the page with the answer and see whether the question gets less frequent.

See [how to write a WhatsApp chat link](/blog/whatsapp-links-qr-codes-store) for the link format and a phone test. Treat the conversation as support unless the customer separately gives permission for marketing.`,
  },
];
