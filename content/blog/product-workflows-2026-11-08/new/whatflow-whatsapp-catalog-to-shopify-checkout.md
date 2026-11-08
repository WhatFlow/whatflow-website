---
{"title":"Sell from a WhatsApp Catalog and Check Out on Shopify","category":"conversion","excerpt":"Show products in WhatFlow Team Inbox, handle a WhatsApp cart, and send shoppers to Shopify checkout without treating a chat cart as an order.","metaTitle":"WhatsApp Catalog to Shopify Checkout with WhatFlow","metaDescription":"Use WhatFlow to share Shopify products in WhatsApp, receive a catalog cart and follow up with a Shopify checkout link. Includes setup and test steps.","tags":["WhatsApp catalog","Shopify checkout","Conversational commerce"]}
---

The useful part of a WhatsApp catalog is what happens after a customer asks for advice. A shopper can look at a product you share, send back a cart, and continue to Shopify checkout. WhatFlow connects those steps so the conversation can help the sale without turning the chat into your payment system.

Imagine a customer asks which travel bag fits their airline’s personal-item limit. You need to check dimensions, recommend one variant, and get the customer to checkout with the correct item. I’d test that exact journey before adding a catalog to a campaign.

## Connect the catalog you want to use

Open **Meta Catalog** in WhatFlow Team Inbox. If you’re using a WhatFlow-managed catalog, choose the products or Shopify collections you want included and run the sync. If you already use an externally managed catalog, check what’s connected and who owns its data before choosing a sync route. Our [catalog support guide](/blog/shopify-whatsapp-catalog-support) explains the setup options in more detail.

Pick a sample product that has two variants with different availability. Check what WhatsApp shows for each variant, including image, price, and stock. When details change in Shopify, verify the catalog reflects the new data before you send that item in a launch.

![WhatFlow Inbox catalog setup with Shopify collection selection](/api/media/file/whatflow-demo-2026-11-08-inbox-catalog.webp "The demo catalog page shows collection and sync controls before products have been synced.")

## Share a recommendation in the conversation

Answer the buyer’s question first, then send the product. If one model fits and the other doesn’t, explain the difference instead of sharing the entire collection.

> I’d go with the 18 L Weekender. It’s 40 × 25 × 18 cm. Check that against your airline’s current limit, and tell me if you’d like the olive version.

Use the product picker in Team Inbox to send the relevant item. The buyer can open the product details in WhatsApp. If they change their mind about the color or size, confirm the variant before asking them to check out.

## Treat the cart reply and paid order as separate events

A customer sending a cart on WhatsApp shows purchase intent. It’s still not a paid Shopify order. With the catalog cart follow-up configured, WhatFlow can respond with a Shopify checkout link. The buyer completes payment through Shopify. Your team should check Shopify for order and payment status before confirming shipment.

For automation beyond the default follow-up, Business API has a **catalog order received** trigger for Shopify Flow. Use it when you need a workflow to react to the WhatsApp catalog event. Treat that event separately from Shopify’s order-paid event. [WhatFlow release history](https://whatflow.tech/changelog)

## Test before adding the catalog to a campaign

1. Open a test conversation using a number you control.
2. Share one catalog product and verify the exact variant shown.
3. Send a sample cart back from WhatsApp and open the Shopify checkout link.
4. Confirm that item and quantity match. Check what happens if the product is unavailable.
5. Make sure staff know how to respond if the shopper asks for another variant or sends a second cart.

Once that works, use the same process for replies to a [Shopify WhatsApp campaign](/blog/whatflow-shopify-whatsapp-campaign-walkthrough). A broadcast can start the conversation; the catalog and checkout path give the team something useful to do when a shopper answers.
