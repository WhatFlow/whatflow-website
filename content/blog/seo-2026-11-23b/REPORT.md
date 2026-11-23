# Second SEO batch — November 23, 2026

Follows the Search Console batch (`content/blog/gsc-2026-11-23/`). Same pattern Google's AI answers already cite: copy-ready message libraries, country guides with Meta's rates, platform comparisons and plain-language setup explainers.

## Shipped (CMS, live)

**21 new posts** (live total 255 posts, 1,087 post FAQs):

- **Message libraries (20–25 examples each):** order-cancellation-message-examples, payment-reminder-message-examples, out-for-delivery-message-examples, refund-message-examples, apology-message-to-customers-examples, whatsapp-promotional-message-examples.
- **Country guides:** Nigeria, Mexico, Bangladesh, Germany, Spain, Turkey. Each has Meta's Oct 2026 USD rates, worked costs and the local data-protection and marketing rules.
- **Platform comparisons:** shopify-vs-amazon, shopify-vs-magento, shopify-vs-ecwid.
- **Setup explainers:** meta-business-verification-whatsapp, whatsapp-business-display-name-rules, use-existing-number-whatsapp-business-api, whatsapp-template-components-explained.
- **Alternatives:** bitespeed-alternatives, respond-io-alternatives.

**Ratings refresh:** the Business API listing moved to **5.0 from 84 ratings** and Chat Automation to **4.0 from 349** (checked Nov 23). 37 posts and 144 comparisons were updated, along with the llms files, the AI JSON routes and the marketing FAQ. The lint now flags 4.9/72 and 341.

**Release checks:** rehearsed twice on a fresh D1 export, and the second run was a no-op. Render checks passed (21 new and 181 patched documents).

## Worth knowing

- **Scale plan price:** the Shopify App Store listing shows Scale at **$49**, but `/pricing` shows **$49.99**. One of them should change. No post states the Scale price.
- **Netherlands:** its marketing rate ($0.1597) is higher than Germany's. Germany's utility rate ($0.055) is the highest on the card.
- **US numbers:** Meta's per-user marketing limits page says marketing templates aren't currently delivered to US numbers. The promotional post says so.
- **Weaker legal sources** (each post says so):
  - Nigeria's GAID text (scanned PDF).
  - Mexico's REPEP and WhatsApp (PROFECO unreachable).
  - Bangladesh's 2026 Act (no gazette copy).
  - Whether Turkey's İYS covers WhatsApp (unresolved; the post advises asking a lawyer).
  - Germany's UWG §7 and WhatsApp (IHK guidance).
- **Meta Help Center:** its pages didn't load for the writers, so the verification and display-name posts link Meta's guidelines rather than paraphrase them.
- **Translations:** the Catalan, Turkish, German, Spanish, Bangla and Hausa examples need a native-speaker check.
- **Pre-existing lint warning:** `migrating-whatflow-from-gadget-to-cloudflare` has an excerpt over 160 characters and no internal links.
