export const refreshes = {
  "review-request-messages-examples-whatsapp-email": {
    anchor: "1. The standard first ask",
    title: "WhatsApp Review Request Messages for Shopify (+ Email)",
    description: "Copy WhatsApp and email review request messages for Shopify. See when to send the first ask, what variables to use, and how to test a Judge.me workflow.",
    copy: `### Three Shopify messages you can adapt today

- **After delivery:** “Hi {{1}}, how did {{2}} work out for you? If you have a minute, tell us what you thought: {{3}}. Thanks, the {{4}} team.”
- **One reminder:** “Hi {{1}}, a quick follow-up about {{2}}. If you’ve already shared a review, thank you. Otherwise, here’s the link: {{3}}.”
- **With an optional photo:** “Hi {{1}}, could you leave an honest review of {{2}}? If a photo would help another shopper, you can add one here: {{3}}.”

Use the same invitation for eligible shoppers regardless of whether you expect a positive review. In the Judge.me workflow shown above, send to an internal test number first. Check that the product name matches the order and the link opens the intended review form. If the review link is blank, stop the send and investigate the mapping.`,
  },
  "whatflow-shopify-flow-whatsapp-automation-guide": {
    anchor: "How do you test a WhatsApp workflow in Flow?",
    title: "WhatsApp Automation in Shopify Flow: Reply to Order Tag",
    description: "Build Shopify Flow automations with WhatFlow. Turn WhatsApp replies or button clicks into order tags, choose message actions, and test in a demo store.",
    copy: `### A complete button-to-order workflow for COD

Start from a test Shopify order that needs COD confirmation. Send an approved WhatFlow template with distinct confirm and cancel buttons. In Shopify Flow, select the WhatFlow button-click trigger and add a condition for the confirm button. Use the order context your workflow can verify, then add Shopify’s **Add order tags** action with \`cod_confirmed\`. If the event cannot be tied to exactly one order, send the case for manual review instead.

Test a confirm click, a cancel click, a repeated click and a case where one phone number has two pending orders. The confirm branch should tag only the intended order. Leave cancellation and fulfillment as separate decisions until you’ve verified how the branches behave.`,
  },
  "send-whatsapp-templates-shopify-flow": {
    anchor: "Template or one of the other seven WhatFlow actions?",
    title: "Send WhatsApp Templates from Shopify Flow: Setup & Test",
    description: "Pick an approved WhatsApp template, map Shopify phone and template variables, and test the send in Shopify Flow with WhatFlow.",
    copy: `### Walk through one fulfillment update

Use a test fulfillment with a contact number you control and a known tracking value. Select the approved fulfillment template in **Send WhatsApp Template**. Map the recipient from the trigger data, then map the variables in exactly the same order as the approved template. For example, if the first placeholder is the order reference and the second is the tracking value, pick those two fields in that order.

Add a condition before the send for any required phone or tracking field. Open the test message and compare it with the test order, then check the Flow run for the action result. Test once more with the tracking field empty so you can confirm the send is skipped. The template picker and variable screenshots above show where to check both mappings.`,
  },
  "whatsapp-free-plan-vs-free-trial": {
    anchor: "At a glance",
    title: "Free Shopify WhatsApp Apps: Free Plan vs Free Trial",
    description: "Compare free plans and free trials for Shopify WhatsApp apps. See what stays free, how app allowances work, and when Meta charges apply.",
    copy: `If you’re choosing a WhatsApp app for Shopify, compare three things before you install: how long the software plan stays free, how much messaging the plan includes, and who bills for WhatsApp messages. A free trial ends on a date. A free plan continues under its published limits.

WhatFlow Business API offers a free software tier, a theme-matched WhatsApp button and a team inbox with no per-seat charges. Software tiers differ by messaging allowance. Meta can still bill for eligible messages according to its own rules and rates. The [WhatFlow pricing page](https://whatflow.io/pricing) separates the software plan from Meta’s charges.`,
  },
};
