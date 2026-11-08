---
{"title":"Fix Failed WhatsApp Broadcasts in WhatFlow","category":"whatsapp","excerpt":"Use WhatFlow’s recipient report to diagnose failed WhatsApp messages, pause a live broadcast when needed, and retry the right recipients.","metaTitle":"Fix Failed WhatsApp Broadcasts in WhatFlow","metaDescription":"Diagnose failed WhatsApp broadcast recipients in WhatFlow. Learn when to pause, what to check in the report, and which failures to retry.","tags":["WhatsApp broadcasts","Campaign reporting","Troubleshooting"]}
---

When a WhatsApp broadcast has failures, open the recipient report before you retry anything. A missing template value, an opted-out recipient, and a temporary sending error call for different responses. Sending the campaign again to everyone can duplicate messages for customers who already got them.

Say your Shopify store schedules a launch to 300 opted-in customers. The first deliveries look right, but several failures show up in the recipient table. Treat those rows as an investigation, not an instruction to push the retry button.

## Pause if the problem could affect the rest of the audience

Open the campaign in WhatFlow Team Inbox. If it is still sending and you find a broken product link, incorrect personalization, or an audience mistake, pause the campaign where the control is available. Messages already sent cannot be taken back through that pause. Check one affected example and confirm whether the fault applies to the whole campaign or a few rows.

If the report just shows some messages pending, give the queue time to progress. Pending and failed are different. Compare the timestamps and statuses before you decide that the sender is stuck.

![Campaign status and delivery overview in the WhatFlow demo inbox](/api/media/file/whatflow-demo-2026-11-08-inbox-broadcasts.webp "The demo shows the broadcast workspace. The visible numbers are not delivery benchmarks.")

## Read the failure and check the input

Use the recipient-level failure detail and export if you need to reconcile the audience against the source file. Check the phone format, mapped variables, template approval and sending account. If the recipient was blocked or opted out, keep them excluded. Don’t substitute another number from your CRM without verifying that it belongs to the right customer and can receive the message.

A simple triage sheet can have three columns: **reason**, **fix**, and **retry decision**. “Wrong template link” means the campaign needs a corrected message. “Missing product name” means checking the mapping and the original row. A permission or opt-out issue is a stop sign.

## Retry selectively, then verify the outcome

After you correct a retryable failure, use the individual retry option and check the new status. WhatFlow also has a failed-recipient retry action where available. Reserve it for a group with the same known, corrected cause. If the approved template or audience itself needs to change, rebuild the affected portion rather than retrying bad input.

Check delivered, read and failed counts after the retry. A read receipt is not a sale. If you’re measuring orders, use the Shopify campaign tracking you set up before the launch. For the next send, follow the [WhatFlow campaign walkthrough](/blog/whatflow-shopify-whatsapp-campaign-walkthrough) and test a representative row before scheduling.
