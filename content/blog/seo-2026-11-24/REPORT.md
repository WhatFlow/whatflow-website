# Third SEO batch — November 24, 2026

Same pattern as the two Nov 23 batches: message libraries, country guides with Meta's rates, platform comparisons, setup explainers and alternatives roundups.

## Shipped (CMS, live)

**19 new posts** (live total 274 posts, 1,174 post FAQs):

- **Message libraries:** christmas-message-to-customers-examples, new-year-message-to-customers-examples, welcome-message-for-new-customers-examples, out-of-stock-message-examples, follow-up-message-after-purchase-examples.
- **Country guides:** Italy, France, Netherlands, Colombia, Morocco, Kuwait (Meta's Oct 2026 USD rates, worked costs, local privacy and marketing rules).
- **Platform comparisons:** shopify-plus-vs-shopify, shopify-vs-prestashop.
- **Setup explainers:** whatsapp-business-api-requirements, whatsapp-marketing-message-limits-per-user, whatsapp-business-number-banned, whatsapp-cloud-api-vs-on-premises.
- **Alternatives:** manychat-alternatives, trengo-alternatives.

**Ratings refresh:** the Business API listing moved to **5.0 from 85 ratings** and Chat Automation to **4.0 from 351** (checked Nov 24). 47 posts and 144 comparisons were updated, along with the llms files, the AI JSON routes and the marketing FAQ. The lint now flags 84 and 349.

**Release checks:** rehearsed twice on a fresh D1 export (second run a no-op); render checks passed (19 new, 191 patched documents).

## Worth knowing

- **Weaker legal sources** (each post says so or tells readers to check the official text):
  - Kuwait: no official copy of CITRA's 2024 privacy regulation would load; the post relies on law-firm summaries and notes they disagree on scope.
  - France: Légifrance blocked fetches; the post relies on CNIL pages that cite L34-5.
  - Netherlands: wetten.overheid.nl blocked fetches; the post relies on ACM pages (which name WhatsApp) for Telecommunicatiewet 11.7.
  - Italy: Garante site timed out; Codice Privacy art. 130 was read on Normattiva.
  - Colombia: SIC site refused connections; Ley 1581, Ley 2300 and Ley 1480 were read on official normogramas.
  - Morocco: Loi 09-08 and the CNDP direct-marketing fiche were read; consumer-law return rules are not covered.
  - Whether WhatsApp counts as "electronic mail" under French, Italian and Moroccan rules is presented as the author's reading.
- **ManyChat:** manychat.com sits behind a bot check, so the post describes ManyChat from its own Apple App Store listing and quotes only its in-app prices.
- **Trengo:** its pricing page shows plan-card prices (Base €119, Boost €299, Pro €499) that differ from its own FAQ figures; the post gives both. The existing /compare/whatflow-vs-trengo uses the FAQ figures (Boost €349 monthly, €299 annual).
- **Plan fit in country examples** assumes sent templates count toward the WhatFlow plan allowance; confirm how service replies are counted.
- **Translations:** Italian, French, Dutch, Spanish (Colombia), Darija/Arabic and French (Morocco) and Arabic (Kuwait) samples need a native-speaker check.
