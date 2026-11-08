---
{"title":"Run a Shopify WhatsApp Campaign with WhatFlow","category":"whatsapp","excerpt":"Build a Shopify WhatsApp product launch: choose an audience, personalize and test your message, schedule the send, and work the replies.","metaTitle":"Shopify WhatsApp Campaign Setup with WhatFlow","metaDescription":"Run a Shopify WhatsApp campaign with WhatFlow. Compare Shopify segment sends and scheduled Inbox broadcasts, then test, launch and track replies.","tags":["WhatsApp marketing","Shopify","Broadcasts"]}
---

The first decision in a Shopify WhatsApp campaign is where the audience lives. If you already have a customer segment in Shopify, start there. If you have an opted-in spreadsheet or want to reach people from existing WhatsApp conversations, build the broadcast in WhatFlow Team Inbox. I’d choose the route before writing the message: it determines what you can personalize and how you’ll run the send.

Say you’re launching a new color of a popular backpack. The audience you want is people who explicitly asked to hear about the launch. Your goal is to get those customers to the product, answer questions about the new color, and see which messages failed. You can do that without treating the entire Shopify customer list as a marketing audience.

## Route 1: Start from Shopify customers or a segment

In Shopify Admin, select the customers you want to message and choose the WhatFlow broadcast action. If you already have a saved segment, open it and use Shopify’s **Use segment** action to start the WhatFlow broadcast builder. Pick the approved template, review who will receive the send, and use the WhatFlow queue to check progress.

This is a campaign launched from Shopify. It doesn’t create an automatically refreshed Shopify segment inside the Inbox audience picker. If you’re running another send a month later, review the audience again before you submit it.

![WhatFlow broadcast guide showing a Shopify customer selection workflow](/api/media/file/whatflow-demo-2026-11-08-broadcast-from-shopify.webp "The Business API guide shows where the Shopify customer-selection route begins.")

## Route 2: Build a scheduled campaign in Team Inbox

Open **Broadcasts** in Team Inbox and start a draft. Pick the sending number and an approved marketing template. For the audience, upload a CSV or Excel file or choose eligible contacts from existing conversations on that channel. Map spreadsheet columns to the fields in your template, then check the preview with a real example row from your test data.

For a launch, I’d make the action obvious:

> Hi {{first_name}}, the olive Trail Pack you asked about is available. Tap View backpack for sizes and stock. If you’re unsure what fits, reply and we’ll help you choose.

That’s example copy for a marketing template, not a message we sent. Before scheduling, send a test to a number your team controls. Check the first-name field, the button link, and what happens when you reply. Check the time zone shown in the scheduler, and make sure someone is available to answer after the send. Review consent and opt-outs under [WhatsApp’s messaging policy](https://business.whatsapp.com/policy).

![WhatFlow Team Inbox Broadcasts page with campaign states](/api/media/file/whatflow-demo-2026-11-08-inbox-broadcasts.webp "This is the demo campaign workspace. Its counts are not a performance benchmark.")

## Decide what happens after customers reply

A shopper who asks “Will a 16-inch laptop fit?” is giving you a chance to help, not asking for a second sales reminder. Claim the conversation in Team Inbox and answer with the actual dimensions. If a different product fits better, share that catalog item and explain why. The [catalog selling walkthrough](/blog/whatflow-whatsapp-catalog-to-shopify-checkout) explains what happens if they send a cart back.

Agree on who covers product questions and order issues before launch. Use the [Team Inbox triage guide](/blog/whatflow-team-inbox-shopify-support-workflow) to set up the handoff, especially if the launch runs outside your normal support hours.

## Review delivery before you plan the next send

Look at the recipient report for sent, delivered, read, and failed statuses. Read isn’t a sale, and an absent read status doesn’t prove the shopper ignored you. Investigate why failed messages failed; fix a correctable cause before using the retry action. Don’t retry a contact who opted out.

If your goal is sales, measure the Shopify orders attributed to your campaign with the tracking setup you actually used. Keep that separate from message delivery and from recovery attribution. For cost, count your WhatFlow sends and applicable Meta charges separately using [WhatFlow pricing](/pricing).

I’d keep the first launch small. If the test message, reply handoff, and recipient report all work, you have a process you can reuse for the next product drop.
