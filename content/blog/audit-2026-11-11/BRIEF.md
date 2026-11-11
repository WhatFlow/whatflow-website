# WhatFlow editorial brief — November 11, 2026 content audit

Every article in this audit follows this file. Read all of it before writing. Working folder: `content/blog/audit-2026-11-11/` (posts) and `content/comparisons/audit-2026-11-11/` (comparisons). The site now lives at **https://whatflow.io** (whatflow.tech redirects there). Never link whatflow.tech.

## Who is writing

Byline: **Safwan Adnan, co-founder and CEO of WhatFlow**. Write as him: a founder who builds a WhatsApp app for Shopify, talks to merchants every week, and has opinions. First person is fine ("I'd start with…", "we built X because…", "the mistake I see most often…"). "We" means the WhatFlow team.

Readers: Shopify store owners and small ecommerce teams (1–20 people), often outside the US — India, Pakistan, the Gulf, Brazil, Indonesia, Europe, Latin America — where WhatsApp is how customers actually talk to shops. Many run COD. Most are busy and skim on a phone.

## Voice: sound like a person, not a compliance memo

The existing library reads like it was written by a nervous lawyer. Every paragraph hedges ("Do not assume…", "does not necessarily prove…", "where supported…", "appropriate…"). Kill that.

Do:
- Be direct and opinionated. Give a recommendation, then the reason.
- Use contractions (you'll, don't, it's, I'd).
- Vary sentence length. Short punchy lines are fine. So are fragments, occasionally.
- Use concrete, specific scenarios: "Say you sell skincare and a customer messages at 11pm asking whether the serum is safe during pregnancy…" Name products, times, amounts. Hypothetical scenarios are great — just frame them as "say…", "imagine…", "for example" rather than presenting them as real merchants.
- Show real example messages in blockquotes (`>`) — WhatsApp templates, replies, saved responses. These are the most useful, most quoted parts of an article.
- Use numbered steps, short bullet lists and tables where they genuinely help scanning.
- Admit trade-offs plainly and briefly, then move on. One honest caveat, stated once, beats ten scattered hedges.
- Address the reader as "you".

Don't (these are AI tells — a reviewer will search for them):
- Banned words/phrases: delve, landscape, navigate (figurative), leverage, robust, seamless(ly), unlock, empower, elevate, game-changer, in today's (fast-paced / digital) world, it's important to note, it's worth noting, crucial, pivotal, foster, holistic, synergy, tapestry, realm, ever-evolving, at the end of the day, look no further, whether you're X or Y, "Not just X — it's Y", supercharge, streamline (max once per article), "In conclusion", "In summary".
- Don't open sections with "When it comes to…".
- Don't use em-dashes more than about once per 300 words. Prefer commas, full stops, colons or parentheses.
- Don't make every list exactly three items. Don't end every section with a neat one-line moral.
- Don't repeat the same disclaimer in multiple sections. Don't say "appropriate" or "relevant" every other sentence.
- No "Key takeaways" box copied from a template, no "Before you put this into practice" boilerplate, no "About the author" section (the page template already renders the author box, FAQs, sources and related posts).

## Honesty rules (non-negotiable)

Opinionated is good. Made-up is not.
- No invented statistics, percentages, survey results, benchmarks, open rates, ROI, or "studies show". If you want a number, either cite a primary source you have actually opened, or use a clearly hypothetical worked example ("say 400 abandoned checkouts a month…").
- No fake merchant stories, quotes, testimonials or case studies. Hypothetical scenarios must read as hypothetical.
- No claims about features WhatFlow doesn't have (see facts below).
- Competitor facts: only what's on their public pages/docs. Never invent a competitor weakness. It's fine to emphasise what WhatFlow does better.
- Legal/policy statements (GDPR, FTC, WhatsApp policy, Meta pricing): keep them accurate and link the primary source. Say "this isn't legal advice" once at most, only in genuinely legal posts.

## Positioning to get across (important)

Many merchants still think of WhatFlow as "the unofficial-API WhatsApp app for small shops" because the older Chat Automation app came first. That image is out of date. WhatFlow WhatsApp Business API is built on the **official Meta WhatsApp Cloud API** and is **enterprise-ready**: official templates and green-tick-eligible business profiles via Meta, a shared team inbox with assignment and filters and no seat fees (so a 50-person team costs the same in seats as a 2-person team), native Shopify Flow triggers/actions for automation at scale, COD confirmation, catalog sharing, Shopify admin extensions, and a 4.9/5 rating from 59 ratings. Wherever it fits naturally, make it clear WhatFlow serves growing and large Shopify teams, not just side hustles, while staying a great choice for small stores too (Free plan, everything included).

## WhatFlow product facts (the only product claims you may make)

- **WhatFlow WhatsApp Business API** — Shopify app at https://apps.shopify.com/whatflow-official-api. Uses the **official Meta WhatsApp Cloud API**. Connects via Meta Embedded Signup from Shopify admin. Rated **4.9/5 from 59 ratings** on the Shopify App Store (checked Nov 11, 2026).
- **WhatFlow Chat Automation** — separate, older Shopify app at https://apps.shopify.com/whatflow. **Linked-device** connection (no Meta Business account needed), suited to small/startup stores. Rated **4.0/5 from 329 ratings** (checked Nov 11, 2026). Never mix the two apps' ratings or connection methods.
- Business API features: shared **team inbox with no seat fees**; **all features included on every plan, including the Free plan** (plans differ only by messaging allowances and rates; plans as of November 11, 2026: Free $0 (first 100 messages sent, then $0.01 each), Starter $4.99/mo (2,000), Plus $9.99 (5,000), Growth $29 (20,000), Scale $49.99 (40,000), Ultimate $99 (75,000); paid plans have a 7-day free trial; overage rates fall from $0.005 to $0.0015 per message on higher plans; link /pricing); WhatsApp **message templates** with a template editor; broadcasts/campaigns; abandoned checkout recovery messages; **COD order confirmation** with reply buttons that can tag/cancel orders via Flow; order/shipping update messages; review-request workflows (send a link to your review app's form); **live catalog sharing** (Meta product catalog from the inbox); **saved/canned replies**; inbox **assignment and filters**; **theme-matched WhatsApp chat buttons that are free forever**; **native Shopify Flow triggers and actions** (incoming-message and order-reply triggers; template, text, media/video message actions); works with Shopify Sidekick for drafting Flow workflows; MCP connector for Claude/ChatGPT/Cursor (/docs/mcp); Shopify admin extensions.
- Meta's WhatsApp charges are separate from WhatFlow's app pricing and passed through with zero markup (Meta bills them). The /pricing page has a country rate table and a cost calculator.
- **More shipped features, documented in the WhatFlow help-centre posts** (`/blog/whatflow-business-api-help-center` and the `whatflow-business-api-*` posts — read the relevant ones in `baseline/` before describing a feature): back-in-stock (restock) request button and alerts; COD rules, confirmation and **OTP verification** at checkout with order tagging; **FlowSense** COD order review; abandoned checkout and **draft-order reminders**; shipping-journey updates (label, pickup, in transit, delivered) and review-request timing; **Store Report** and WhatsApp keyword setup; auto-replies; opt-outs and a **blocklist**; manual one-off messaging from a Shopify record; Inbox **labels**, custom attributes, canned responses, assignment queues; Inbox **WhatsApp Flows** workspace; Inbox **workflows** library and **signed webhooks**; an API-triggered workflow; broadcasts dashboard with delivery overview; template library, message editor and template manager with language/status filters; CSV/Excel audience mapping for campaigns. Describe these only as the docs do.
- **AI (confirmed by the owner, Nov 5 2026):** WhatFlow has **no built-in/native AI** (no AI chatbot, no AI auto-replies inside the app). Instead it **connects to the AI you already use**: (1) deep **Shopify Sidekick** integration — Sidekick can draft WhatFlow workflows in Shopify Flow; (2) a **WhatFlow MCP connector** (guide: /docs/mcp) that lets **Claude, ChatGPT or Cursor** read Live Inbox chats, draft replies (with a **draft mode** so a person approves before anything is sent), send approved templates, look up Shopify orders, add labels/notes, share catalog items, create broadcast drafts (never sends them) and read WhatsApp analytics. Frame this positively: bring your own AI, no per-resolution AI fees, a human stays in control. Never say "WhatFlow has no AI" flatly; say "no built-in AI bot, but it plugs into Sidekick and your AI apps over MCP".
- **Templates are language-agnostic:** templates can be created in any language WhatsApp supports; a store can keep language versions of the same template.
- **Not available — never claim:** a native AI chatbot/auto-reply inside WhatFlow, native Shopify customer-segment/audience sync (it's **upcoming** — you may say "coming soon"), automatic carrier exception detection, return label generation, refunds processing, payments inside chat, guaranteed delivery/open/recovery rates.
- When you mention WhatFlow, be confident and specific about why it's a good fit (Shopify-native, no seat fees, everything on every plan, Free plan, Flow integration). Mention it where it naturally helps — usually 2–4 times in a post, plus the CTA. Don't turn general guides into ads.

## WhatsApp platform facts you can rely on (link the source)

- Business-initiated messages outside an open **24-hour customer service window** must use a Meta-approved **template**. Customer messages open/refresh the window; free-form replies are allowed inside it. Source: https://business.whatsapp.com/policy and https://developers.facebook.com/docs/whatsapp/pricing
- Template categories: **marketing, utility, authentication**. Meta can recategorise templates.
- Meta charges **per delivered template message** (per-message pricing replaced conversation pricing on July 1, 2025; rates vary by category and recipient country). **Changed October 1, 2026:** service (non-template) replies are free only for the first **1,000 delivered service messages per business phone number per month**, then charged; **utility templates sent inside an open customer service window are now charged** (they were free from July 2025 until October 2026). Never say "service replies are always free" or "utility is free in the window". Check https://developers.facebook.com/docs/whatsapp/pricing. Only quote the rates listed below.
- **Opt-in** is required before business-initiated messages; opt-outs must be honoured. Policy: https://business.whatsapp.com/policy
- Phone number **quality rating** and **messaging limits** (tiers that cap unique business-initiated conversations/recipients per 24h, which rise with good quality and volume) exist; don't quote exact tier numbers unless you've opened the current Meta doc: https://developers.facebook.com/docs/whatsapp/messaging-limits
- Conversations that start from a click-to-WhatsApp ad (or Facebook Page call-to-action) on the WhatsApp mobile app open a **free entry point (FEP) window** once the business replies inside the 24-hour customer service window. Meta says the FEP window **may remain open for up to 7 days**; while it's open Meta doesn't charge for marketing, utility, authentication or service messages to that customer (Meta Business Agent messages are still charged). Older material said "72 hours" — that is out of date. Source: https://developers.facebook.com/docs/whatsapp/pricing
- **Meta rate card (USD, effective October 1, 2026)**: the service-message rate equals the utility rate in every market (charged from the 1,001st service message per number per month). Examples per message: India marketing $0.0118 / utility $0.0014; North America $0.025 / $0.0034; UK $0.0635 / $0.022; Brazil $0.0625 / $0.0068; Pakistan $0.0473 / $0.015; Saudi Arabia $0.0576 / $0.0107; UAE $0.0576 / $0.0157; Indonesia $0.0411 / $0.025; Germany $0.1365 / $0.055. You may quote these with "as of November 2026" and link https://whatflow.io/pricing (country table) or Meta's pricing doc. Utility and authentication have monthly volume tiers (discounts at higher volume): https://developers.facebook.com/docs/whatsapp/pricing/volume-tier
- WhatsApp Channels are one-to-many broadcast channels separate from the Business API.
If you're unsure about a platform detail, leave it out or phrase it generally and link the doc.

## SEO rules

- One clear primary keyword/intent per article (given in your assignment). Use it naturally in the title, the first 100 words, at least one H2, the meta title and meta description. No stuffing.
- **Title** (H1, `title`): specific and clickable, ideally under ~65 characters. Numbers and years are fine where real ("2026"). No clickbait.
- **metaTitle**: ≤ 60 characters, primary keyword near the front. Don't append "| WhatFlow" (the site adds branding).
- **metaDescription**: 140–155 characters, includes the keyword, says what the reader gets.
- **excerpt**: ≤ 155 characters, plain and human; shown on listing cards.
- Headings: `##` for sections, `###` for sub-sections. Never `#` in the body (the title is the H1). Make many H2s questions people actually search ("How much does the WhatsApp Business API cost?").
- Internal links: 4–8 contextual links to other WhatFlow pages using descriptive anchor text, woven into sentences (not a list at the end). Only link slugs listed in `SLUGS.md`. Useful site pages: /pricing, /inbox, /features, /solutions/chat-button, /integrations/shopify-flow, /compare, /about, /docs/mcp, /security, /changelog, /compare/whatflow-chat-automation-vs-business-api. There is **no /contact page**.
- External links: link primary sources inline (Meta, WhatsApp, Shopify Help Center, Google Search Central, FTC, EUR-Lex, etc.). Every URL you cite in `sources` must be one you've actually confirmed exists (fetch it) or one listed in this brief.

## GEO rules (getting quoted by ChatGPT, Perplexity, Google AI Overviews)

- **Answer first.** The first paragraph (40–70 words) directly answers the title's question or states the core recommendation in plain, quotable language. No throat-clearing intro.
- Make key statements self-contained and specific so they can be lifted out of context: "Outside the 24-hour window, WhatsApp only lets a business send a pre-approved template message." Name the entities (WhatsApp Business API, Meta, Shopify Flow, WhatFlow) rather than "it" or "the tool".
- Include at least one structured element an AI can extract: a step list, a comparison table, a checklist or a set of example messages.
- Definitions: when you introduce a term (utility template, customer service window, COD confirmation), define it in one sentence.
- Freshness: say "as of November 2026" where a fact can change (pricing, policy, ratings).
- Google stopped showing FAQ rich results on May 7, 2026; FAQs still matter for readers and AI answers, so write them for people.
- FAQs: 3–5 questions phrased the way people type them into Google/ChatGPT, each answered in 1–3 standalone sentences. Don't repeat body text word for word.

## Output format

Write one Markdown file per article. The file starts with a JSON frontmatter block between `---` lines, exactly like the baseline files:

```
---
{
  "title": "…",
  "slug": "…",
  "category": "whatsapp",
  "excerpt": "…",
  "metaTitle": "…",
  "metaDescription": "…",
  "tags": ["…", "…", "…"],
  "coverImageUrl": null,
  "coverImageAlt": null,
  "faqs": [{"question": "…", "answer": "…"}],
  "sources": [{"title": "…", "url": "https://…", "note": "What this source supports, one sentence."}]
}
---

Answer-first opening paragraph…

## First section
…

<!-- CTA -->

## Final section (optional short wrap-up)
```

- Valid JSON only (double quotes, no trailing commas). Use straight quotes or typographic apostrophes consistently.
- `category` must be one of: reviews, conversion, retention, whatsapp, operations, seo, guides, tips, shopify.
- 3–5 tags, Title Case-ish short phrases.
- Put exactly one `<!-- CTA -->` line in the body: after the main content, before the last section (or at the very end). It becomes the "Try WhatFlow" call-to-action box.
- Markdown allowed: `##`/`###` headings, paragraphs, **bold**, *italic*, `[links](url)`, `-` and `1.` lists, `>` blockquotes, tables, and images. Not allowed: raw HTML (except the CTA comment), `#` H1, nested blockquotes, code blocks, footnotes, images inside paragraphs.
- Images: only the real WhatFlow screenshots below, each on its own line, in the form `![alt](url "caption")`. Use one only where it shows exactly what the paragraph describes. Keep captions honest (it's a demo store; nothing was sent).
- No body links to Judge.me articles, and never copy text from Judge.me or any other site.

## Real screenshots you may use

Real WhatFlow demo-store screenshots in the Payload media library. Use the exact URL, on its own line: `![alt](/api/media/file/<name> "caption")`. Only use one where it shows exactly what the paragraph describes; captions must be honest (demo store, sample data, nothing sent). Never invent an image path.

- `/api/media/file/blog-enhancement-judge-me-widgets-demo.webp` — Judge.me widget settings in a WhatFlow demo store
- `/api/media/file/blog-enhancement-shopify-product-search-demo.webp` — Shopify search engine listing fields for a demo product
- `/api/media/file/blog-enhancement-whatflow-flow-order-reply.webp` — Shopify Flow workflow reacting to a WhatsApp order reply in WhatFlow
- `/api/media/file/blog-enhancement-whatflow-template-editor.webp` — WhatFlow WhatsApp template editor in Shopify admin
- `/api/media/file/blog-product-proof-catalog-sync-controls.jpg` — WhatFlow catalog settings with manual sync, skip out-of-stock items and collection scope options
- `/api/media/file/blog-product-proof-inbox-assignment-filters.jpg` — WhatFlow inbox assignment filters
- `/api/media/file/blog-product-proof-return-reply-draft.jpg` — WhatFlow canned reply draft asking for an order reference
- `/api/media/file/blog-product-proof-shipping-reply-draft.jpg` — Unsaved shipping-delay saved reply in the WhatFlow inbox
- `/api/media/file/blog-product-proof-theme-button-controls.jpg` — WhatFlow WhatsApp Chat Button settings with floating chat button and product-page WhatsApp button, each linking to the Theme Editor
- `/api/media/file/blog-shopify-flow-whatflow-flow-actions-more.jpg` — Rest of the WhatFlow action list in Shopify Flow, including text and video actions
- `/api/media/file/blog-shopify-flow-whatflow-flow-actions.jpg` — Shopify Flow action picker listing WhatFlow WhatsApp message actions
- `/api/media/file/blog-shopify-flow-whatflow-flow-ecosystem.jpg` — Shopify Add order tags action using the order from a WhatFlow reply event
- `/api/media/file/blog-shopify-flow-whatflow-flow-order-reply.jpg` — Inactive Shopify Flow workflow branching on a WhatsApp order reply and adding an order tag
- `/api/media/file/blog-shopify-flow-whatflow-flow-sidekick.jpg` — Shopify Sidekick drafting an inactive WhatFlow workflow from a plain-language request
- `/api/media/file/blog-shopify-flow-whatflow-flow-template-mapping.jpg` — WhatFlow Send WhatsApp Template action in Shopify Flow with template and recipient fields
- `/api/media/file/blog-shopify-flow-whatflow-flow-template-variables.jpg` — WhatFlow template body variables mapped to Shopify order fields in Flow
- `/api/media/file/blog-shopify-flow-whatflow-flow-text-fields.jpg` — WhatFlow text message action with the recipient mapped from the incoming sender
- `/api/media/file/blog-shopify-flow-whatflow-flow-text-routing.jpg` — Inactive Shopify Flow workflow checking an incoming WhatsApp message before replying
- `/api/media/file/blog-shopify-flow-whatflow-flow-triggers.jpg` — WhatFlow trigger picker in Shopify Flow showing incoming WhatsApp events
- `/api/media/file/comparisons-whatflow-cod-settings.jpg` — WhatFlow COD settings inside Shopify showing a sample checkout configuration
- `/api/media/file/whatflow-demo-2026-11-08-ai-connections.webp` — WhatFlow AI Connections setup for ChatGPT, Claude and Cursor
- `/api/media/file/whatflow-demo-2026-11-08-analytics-funnel.webp` — WhatFlow message funnel and automation reports in Shopify
- `/api/media/file/whatflow-demo-2026-11-08-billing-meta.webp` — Separate Meta messaging charges and app subscription in WhatFlow Billing
- `/api/media/file/whatflow-demo-2026-11-08-broadcast-from-shopify.webp` — WhatFlow customer broadcast guide showing template creation and Shopify customer selection
- `/api/media/file/whatflow-demo-2026-11-08-checkout-reminders.webp` — Abandoned checkout reminder delay and example message in WhatFlow
- `/api/media/file/whatflow-demo-2026-11-08-cod-checkout.webp` — WhatFlow cash-on-delivery rules with a Shopify checkout preview
- `/api/media/file/whatflow-demo-2026-11-08-draft-reminders.webp` — WhatFlow draft-order recovery reminder settings
- `/api/media/file/whatflow-demo-2026-11-08-feature-board.webp` — WhatFlow feature request board in Shopify Admin
- `/api/media/file/whatflow-demo-2026-11-08-flow-judgeme.webp` — Judge.me review request workflow preview in Shopify Flow
- `/api/media/file/whatflow-demo-2026-11-08-flow-template-browser.webp` — Shopify Flow template browser filtered to WhatFlow
- `/api/media/file/whatflow-demo-2026-11-08-inbox-attributes.webp` — WhatFlow Inbox custom attributes for contacts and conversations
- `/api/media/file/whatflow-demo-2026-11-08-inbox-broadcasts.webp` — WhatFlow Inbox broadcast dashboard with campaign status and delivery overview
- `/api/media/file/whatflow-demo-2026-11-08-inbox-canned-responses.webp` — WhatFlow Inbox canned responses screen
- `/api/media/file/whatflow-demo-2026-11-08-inbox-catalog.webp` — WhatFlow Inbox catalog sync options for products and collections
- `/api/media/file/whatflow-demo-2026-11-08-inbox-flows.webp` — WhatFlow Inbox WhatsApp Flows workspace
- `/api/media/file/whatflow-demo-2026-11-08-inbox-labels.webp` — WhatFlow Inbox labels manager for conversations
- `/api/media/file/whatflow-demo-2026-11-08-inbox-mine-queue.webp` — WhatFlow Inbox assignment queue with the empty Mine filter selected
- `/api/media/file/whatflow-demo-2026-11-08-inbox-templates.webp` — WhatFlow Inbox WhatsApp templates with language and status filters
- `/api/media/file/whatflow-demo-2026-11-08-inbox-webhooks.webp` — WhatFlow Inbox webhook endpoint manager
- `/api/media/file/whatflow-demo-2026-11-08-inbox-workflows.webp` — WhatFlow Inbox workflow library and run tabs
- `/api/media/file/whatflow-demo-2026-11-08-otp-checkout.webp` — WhatFlow OTP verification placement and order tagging controls
- `/api/media/file/whatflow-demo-2026-11-08-restock-setup.webp` — WhatFlow back-in-stock product button, request queue and template setup
- `/api/media/file/whatflow-demo-2026-11-08-review-request-timing.webp` — WhatFlow review request timing and message selection controls
- `/api/media/file/whatflow-demo-2026-11-08-shipping-journey.webp` — WhatFlow shipping stages including label, carrier pickup and in transit
- `/api/media/file/whatflow-demo-2026-11-08-shopify-flow-guide.webp` — WhatFlow Shopify Flow integration guide with actions and starter templates
- `/api/media/file/whatflow-demo-2026-11-08-store-report.webp` — WhatFlow Store Report settings and WhatsApp keyword setup
- `/api/media/file/whatflow-demo-2026-11-08-template-event-picker.webp` — WhatFlow message editor with event choices for order updates and reminders
- `/api/media/file/whatflow-demo-2026-11-08-template-library.webp` — WhatFlow template library with examples organized by event and category
- `/api/media/file/whatflow-demo-2026-11-08-template-status.webp` — WhatFlow template manager with category, approval and preview controls
- `/api/media/file/whatflow-demo-2026-11-10-auto-replies.webp` — WhatFlow Demo Store Auto-replies list and Create auto-reply control
- `/api/media/file/whatflow-demo-2026-11-10-blocklist.webp` — WhatFlow WhatsApp Blocklist settings and warning when suppression is off
- `/api/media/file/whatflow-demo-2026-11-10-connections.webp` — WhatFlow Demo Store Connections screen showing the connected sender status
- `/api/media/file/whatflow-demo-2026-11-10-flow-sense.webp` — FlowSense screen in the WhatFlow Demo Store with the feature inactive
- `/api/media/file/whatflow-demo-2026-11-10-manual-messaging.webp` — WhatFlow Manual Messaging screen describing a one-off send from a Shopify record

## Length

- Expanding a short guide: 1,000–1,500 words. Keep everything accurate from the original (its steps, screenshots, sources), then add substance: a worked example, message samples, a checklist or table, common mistakes, FAQs. Never pad.
- Roundups ("best apps"): 1,400–2,200 words, every third-party app fact checked on its Shopify App Store listing today.
- Product help docs (`whatflow-business-api-*`): 450–800 words; they are task docs, keep them tight.

## Self-check before saving each file

1. First paragraph answers the question in under 70 words.
2. Search your draft for the banned words list and fix any hits.
3. Count em-dashes; trim.
4. Every product claim matches the facts above. No invented numbers.
5. 4–8 internal links, all from SLUGS.md. One `<!-- CTA -->`.
6. Frontmatter is valid JSON; metaTitle ≤ 60 chars; metaDescription ≤ 155 chars; excerpt ≤ 155 chars.
7. Read it once out loud in your head. If a sentence sounds like a terms-of-service page, rewrite it.
