const demo = (key, alt, caption) =>
  `![${alt}](/api/media/file/whatflow-demo-2026-11-10-${key}.webp "${caption}")`;
export const helpPatches = [
  ['whatflow-business-api-connection-and-billing','Review both parts of your bill', 'connections',
    'WhatFlow Demo Store Connections screen showing the connected sender status',
    'Demo sender number obscured. Connected identifies the link to WhatFlow. Check Meta sending status and billing before your first send.', ''],
  ['whatflow-business-api-flow-and-admin-actions','Test one reply all the way through','manual-messaging',
    'WhatFlow Manual Messaging screen describing a one-off send from a Shopify record',
    'The Manual Messaging guide explains what WhatFlow fills in and what the teammate sends in WhatsApp.',
    '### When to use Manual Messaging\n\nUse this route for an exception such as an open draft that needs a personal note. WhatFlow prepares the customer details and link from the Shopify record. Open the resulting message, check the recipient and text, then send it yourself in WhatsApp. For an unattended send, choose an approved template and configure the automation separately.'],
  ['whatflow-business-api-message-controls-and-store-report','Test your WhatsApp blocklist','auto-replies',
    'WhatFlow Demo Store Auto-replies list and Create auto-reply control',
    'The demo list shows where to find, edit or create a rule. Use a test number to check both matches and near misses.', ''],
  ['whatflow-business-api-message-controls-and-store-report','Request a Store Report','blocklist',
    'WhatFlow WhatsApp Blocklist settings and warning when suppression is off',
    'The demo shows the warning state. Enable Respect blocklist and review which message types it covers for your store.',
    'Check the message types selected under Respect blocklist. The feature covers automated sends such as broadcasts, order and shipping automations, template actions in Shopify Flow and Live Inbox workflows according to your settings. Verify manual follow-up separately so staff honour the same opt-outs.'],
  ['whatflow-business-api-flowsense-order-review','Give your team a decision they can explain','flow-sense',
    'FlowSense screen in the WhatFlow Demo Store with the feature inactive',
    'The demo shows where a merchant reviews FlowSense before enabling it. The feature was left inactive.', ''],
].map(([slug,anchor,screen,alt,caption,copy])=>({slug,anchor,screen,alt,markdown:[copy,demo(screen,alt,caption)].filter(Boolean).join('\n\n')}));
