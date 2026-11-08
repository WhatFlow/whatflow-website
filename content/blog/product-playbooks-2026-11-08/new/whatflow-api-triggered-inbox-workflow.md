---
{"title":"Build an API-Triggered WhatsApp Workflow in WhatFlow","category":"guides","excerpt":"Map event data to an approved WhatsApp template, branch on a field, and test an API-triggered Team Inbox workflow before enabling it.","metaTitle":"API-Triggered WhatsApp Workflows in WhatFlow","metaDescription":"Set up an API-triggered WhatFlow Inbox workflow with a sample JSON mapping, a decision step, an approved template, and a safe test run.","tags":["Inbox Workflows","WhatsApp API","Automation"]}
---

Use a WhatFlow Inbox Workflow when an event starts in a system that can call your workflow endpoint. For example, a repair portal could notify a customer on WhatsApp when a repair is ready for pickup. For a Shopify-native event, start by checking whether [Shopify Flow](/blog/whatflow-shopify-flow-whatsapp-automation-guide) already has the trigger you need.

Inbox Workflows and WhatsApp Flows are different. Inbox Workflows run steps and decisions in the background. WhatsApp Flows are forms customers fill out inside WhatsApp.

## Start with one example event

Create a workflow in Team Inbox and open **Configure Triggers**. Enable the API call trigger with an API key for your server-side integration. Keep the key on the server and out of screenshots, spreadsheets, storefront JavaScript and example documentation.

Use the workflow builder’s sample JSON mapping. A test event might contain these fields:

- `recipient`: a WhatsApp test number you control
- `reference`: a sample repair reference, such as `TEST-1048`
- `stage`: the event state, such as `ready`
- `location`: the pickup point shown in the customer message

Map the recipient field and use the example values to preview the rest. These are illustrative field names. Use the endpoint and request format shown for your workflow rather than assuming a universal payload.

![WhatFlow Team Inbox workflow library with workflows and runs tabs](/api/media/file/whatflow-demo-2026-11-08-inbox-workflows.webp "The demo workflow library is where you create a workflow and check its runs.")

## Branch before sending

Add a decision that checks whether the repair is ready. End the other branch without sending a message. On the ready branch, choose an approved template for the pickup update and map the reference and pickup location to its variables. For business-initiated messaging, follow [WhatsApp’s policy](https://business.whatsapp.com/policy) and check that the recipient can receive the message.

If the timing matters, the builder offers waits. Check whether a short delay, a scheduled timestamp, or an event from your own system makes sense. Start with no wait while you verify the mapping.

## Test both branches before connecting the real system

Run a test with a number you control. Check that the ready branch renders the right template and that the non-ready branch sends nothing. Then try a missing reference and a repeated event. Have the source integration prevent duplicate notifications if the same event is delivered more than once. Review the run before enabling real traffic.

If the shopper replies with a pickup question, route that conversation to a person rather than building an increasingly complex branch tree. The [Team Inbox support guide](/blog/whatflow-team-inbox-shopify-support-workflow) covers the handoff.
