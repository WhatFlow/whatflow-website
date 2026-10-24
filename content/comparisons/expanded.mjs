// Import material only. Published pages query Payload; this module is never bundled into the site.
import launch from './launch.mjs';
import {providers} from './providers.mjs';
import {decisions} from './decisions.mjs';
import {clarifyProducts} from './whatflow-apps.mjs';
export const reviewedAt='2026-10-24T12:00:00.000Z';
export const plans=[
 {name:'Free',base:0,included:100,overage:0.01},
 {name:'Starter',base:4.99,included:2000,overage:0.005},
 {name:'Plus',base:9.99,included:5000,overage:0.004},
 {name:'Growth',base:29,included:20000,overage:0.0025},
 {name:'Scale',base:49.99,included:40000,overage:0.002},
 {name:'Ultimate',base:99,included:75000,overage:0.0015},
];
const dollars=n=>`$${n.toFixed(2)}`;
export const estimate=(sends)=>plans.map(p=>({...p,total:p.base+Math.max(0,sends-p.included)*p.overage})).sort((a,b)=>a.total-b.total)[0];
const source=(title,url,note)=>({title,url,note});
const app=source('WhatFlow plans and Shopify integrations','https://apps.shopify.com/whatflow-official-api','Published subscription prices, included sends, usage tiers and advertised Shopify workflows. No-seat-fee and all-features policies are confirmed by WhatFlow.');
const meta=source('WhatsApp Business Platform pricing','https://business.whatsapp.com/products/platform-pricing','Delivery pricing depends on the destination and message category; eligibility rules and current rates must be checked separately from app costs.');
const pricingUrls={wati:'https://www.wati.io/en/pricing/',interakt:'https://www.interakt.shop/integrations/integrating-whatsapp-business-api-with-shopify/',kommo:'https://www.kommo.com/blog/kommo-pricing-update/',brevo:'https://www.brevo.com/pricing/'};
const images={template:{imageUrl:'/comparisons/whatflow-template-editor.jpg',imageAlt:'WhatFlow template editor in the Shopify demo store with mapped checkout fields and a sample WhatsApp preview',imageCaption:'Real WhatFlow demo-store screenshot. The editor maps Shopify data into a WhatsApp template; preview values are samples, not customer records or performance results.'},cod:{imageUrl:'/comparisons/whatflow-cod-settings.jpg',imageAlt:'WhatFlow COD settings inside Shopify showing a sample checkout configuration',imageCaption:'Real WhatFlow demo-store screenshot of COD settings. The checkout preview illustrates configuration; its sample fee is not a mandatory WhatFlow fee.'}};
const policyParagraphs=[
'We built WhatFlow so the first plan does not feel like an intentionally incomplete product. Every feature is available whether the store chooses Free or the highest paid plan. The subscription choice changes messaging allowances and rates, not access to the inbox, Shopify integrations or other features. A merchant can start with one workflow and add another without purchasing a new feature edition.',
'The team inbox has no seat fees. If the founder, a support colleague and someone in fulfillment all need to participate, adding those people does not create a per-user WhatFlow subscription. That is particularly useful when store staff share responsibilities rather than operating a large formal support department.',
'The storefront WhatsApp buttons remain free forever and can fit the Shopify theme and design. The button is an entry point, not a promise of unlimited free automated sends. Automated messaging still follows the selected allowance and applicable delivery rules. Keeping those two costs separate makes the free offering easier to understand.',
];
const operating={
 shopify:'The useful integration test starts after the message arrives. Open the Shopify order, check its current state and ask a second colleague to continue the conversation. An app can advertise Shopify connectivity while still making routine work awkward. WhatFlow’s extensions, store-event templates and Flow support are intended to keep that work close to the store. The demo screenshot shows a working configuration surface rather than a sales mockup.',
 whatsapp:'An inbox is only one part of a customer journey. Someone still needs to know which order the customer means and what should happen next. For a Shopify merchant, that context is often more useful than adding another independent contact database. WhatFlow brings Shopify events, message templates and the human response into a focused operating workflow. Its native-feeling extensions matter because store staff already spend their day managing the underlying orders.',
 support:'Service-suite features can be valuable, but the buying question should begin with the cases the store actually handles. A short order question, a delivery exception and a multi-day dispute may need different processes. WhatFlow is attractive for the Shopify WhatsApp layer because staff can participate without a seat charge and use the complete feature set. Keep any existing service system that still solves a separate, important job.',
 api:'An API can send a message without providing a complete merchant application. The surrounding work includes receiving events, mapping Shopify values, maintaining templates, showing delivery state and giving people a place to answer replies. WhatFlow packages that store-facing layer. A custom infrastructure purchase may still be right, but it should be compared with the complete application it will require, not just the price of a successful request.',
};
const priceSection=(i)=>{
 const volume=[1000,5000,10000,20000,40000][i%5];const best=estimate(volume);
 return `For a concrete baseline, consider ${volume.toLocaleString('en-US')} sent messages in a month. Among the listed WhatFlow plans, ${best.name} produces an app-side cost of ${dollars(best.total)} at that volume. This calculation uses its ${dollars(best.base)} base, ${best.included.toLocaleString('en-US')} included sends and $${best.overage} rate above the allowance. It assumes a single monthly allowance and does not include tax or Meta delivery charges. It is a planning example, not a combined quote for every possible message category or destination.

Keep three lines in the budget: the application, applicable WhatsApp delivery fees, and any separate implementation or services. Meta pricing varies by destination and category, and some service or qualifying utility messages have different treatment. An app allowance does not override Meta’s rules. The current installation terms and rate pages should be checked before committing a campaign budget.`;
};
const providerArticles=providers.map((p,i)=>{
 const old=launch.find(a=>a.slug===p.slug);
 // Preserve the genuinely useful, vendor-specific operational analysis from the original guide.
 const originalSections=old?.body.split(/(?=^## )/m).filter(s=>/## (What |Where |Use a buyer|Avoid double|COD |The integration|Shopify is|Look beyond|A useful|Check |Templates|API |The API|The role|An inbox)/.test(s)).slice(0,2).join('\n\n')||'';
 const title=`WhatFlow vs ${p.name}: Shopify features, inbox and pricing`;
 const excerpt=`Compare WhatFlow and ${p.name} for Shopify: pricing, team costs, WhatsApp workflows, feature access and the tradeoffs that matter in daily use.`;
 return {slug:p.slug,title,competitor:p.name,competitorUrl:p.url,category:p.category,excerpt,
 verdict:`${p.advantage} ${p.fit}`,
 ...images[/cod|interakt|zoko|dondy/.test(p.slug)?'cod':'template'],
 body:`## The decision behind this comparison\n\n${p.profile}\n\nI’m Safwan Adnan, co-founder and CEO of WhatFlow. My recommendation starts with the store’s actual work: the order that needs a message, the customer who replies and the colleague who has to help. A useful comparison should explain why our approach fits that work, while being honest about what the alternative does well.\n\n## Pricing: what belongs in the comparison\n\n${p.pricing}\n\n## A realistic Shopify scenario\n\n${p.scenario}\n\n${originalSections}\n\n## Why WhatFlow is a strong fit for store operations\n\n${p.advantage}\n\n${operating[p.category]}\n\n## Feature access and the people who use the inbox\n\n${policyParagraphs[i%3]}\n\n${policyParagraphs[(i+1)%3]}\n\n## A worked WhatFlow cost example\n\n${priceSection(i)}\n\n## What I would test before switching\n\nUse the scenario above with controlled recipients and real test-order values. Have the person who will maintain the workflow edit a template and have another person handle a reply. Confirm the required plan, billing units and number migration or coexistence eligibility before moving a live channel. A polished demo is useful, but the handoff after the message is what the store will live with.\n\n${p.fit}\n\nFor a Shopify merchant prioritizing affordable WhatsApp operations, I would start with WhatFlow: ${p.advantage.charAt(0).toLowerCase()+p.advantage.slice(1)}`,
 featureTable:[
 {feature:'What the product is built around',whatflow:'Shopify-connected WhatsApp automation, native-feeling extensions and a team inbox',competitor:p.profile},
 {feature:'Pricing and billing units',whatflow:'Free plan; paid plans from $4.99. Allowances and overage rates vary. Meta fees are separate where applicable.',competitor:p.pricing},
 {feature:'Feature access',whatflow:'All features on every plan, including Free. Plans differ by messaging allowances and rates.',competitor:`Confirm the exact ${p.name} package, channel and integration entitlements described above.`},
 {feature:'Team access',whatflow:'No seat fees for the team inbox',competitor:/unlimited users|unlimited seats|workspace-based|free plan for up to ten/i.test(p.profile+' '+p.pricing)?'See the included users, bundles or unlimited-user options discussed in the pricing section.':`Check included users, any additional-user charges and the full quoted package; do not assume a universal per-seat model.`},
 {feature:'Storefront entry point',whatflow:'Free-forever WhatsApp buttons that can fit the Shopify theme',competitor:/dondy|superlemon|chaty|shopify-inbox/.test(p.slug)?'A free offering exists; compare its exact purpose, styling and automation entitlements.':'Confirm the storefront experience and any separate widget or connector requirements.'},
 ],
 faqs:[
 [`Is WhatFlow a practical ${p.name} alternative for Shopify?`,p.advantage+' '+p.fit],
 [`How should I compare ${p.name} pricing with WhatFlow?`,p.pricing],
 ['Does WhatFlow charge per inbox seat?','No. WhatFlow’s team inbox has no seat fees. Adding colleagues does not create a per-user subscription; the messaging plan and actual usage still apply.'],
 ['Are WhatFlow features restricted on the free plan?','No. All plans have the same feature access. Message allowances and rates differ, and applicable Meta delivery charges are separate. Theme-matched WhatsApp buttons are free forever.'],
 ],
 sources:[source(`${p.name}: official product and commercial information`,p.url,'Primary source for the alternative’s advertised capabilities and the stated commercial terms. Public pages are not independent performance tests.'),...(old&&old.source[1]!==p.url?[source(old.source[0],old.source[1],'Additional vendor documentation for the Shopify workflow discussed in this guide.')]:[]),...(pricingUrls[p.slug.replace('whatflow-vs-','')]&&pricingUrls[p.slug.replace('whatflow-vs-','')]!==p.url?[source(`${p.name} pricing details`,pricingUrls[p.slug.replace('whatflow-vs-','')],'Additional primary pricing or effective-date reference.')]:[]),app,meta],
 featured:['whatflow-vs-wati','whatflow-vs-interakt','whatflow-vs-bitespeed','whatflow-vs-dondy','whatflow-vs-twilio'].includes(p.slug),
 };
});
const decisionArticles=decisions.map((d,i)=>({
 slug:d.slug,title:d.title,competitor:d.alternative,competitorUrl:d.category==='channels'?'https://business.whatsapp.com/products/platform-pricing':'https://apps.shopify.com/whatflow-official-api',category:d.category,
 excerpt:`${d.title}. Compare customer experience, real operating costs and Shopify workflows, with a practical test and WhatFlow pricing example.`,
 verdict:d.reason+' '+d.tradeoff,
 ...images[/cod/.test(d.slug)?'cod':'template'],
 body:`## Start with the customer’s job\n\n${d.intro}\n\n## Where each approach helps\n\n${d.tradeoff}\n\n## The practical cost difference\n\n${d.cost}\n\n## Why I would use WhatFlow for this workflow\n\n${d.reason}\n\nI’m Safwan Adnan, co-founder and CEO of WhatFlow. We put particular emphasis on Shopify integration because a message is rarely the entire job. Someone needs to understand the store event behind it, answer the buyer and take the next useful action. The extensions and Shopify-connected configuration are intended to make that feel like part of running the store rather than managing an unrelated communications project.\n\n## A controlled test before launch\n\n${d.trial}\n\nWrite down the intended audience, trigger, message and owner before enabling the workflow. Use test recipients first and include an awkward case, not only the ideal purchase. When the buyer replies, ask another teammate to continue the conversation. The result should be understandable without relying on the first person’s memory. This is a suggested evaluation method, not a claim that we measured a particular uplift in another store.\n\n## WhatFlow’s allowance and team costs\n\n${priceSection(i+2)}\n\n## The features you keep as the store grows\n\n${policyParagraphs[(i+1)%3]}\n\n${policyParagraphs[(i+2)%3]}\n\n## A sensible first rollout\n\nStart with the scenario in this guide and define what success means for it: a usable reply, a correctly handled order or a genuinely helpful customer interaction. Keep existing channels that still serve their purpose. Coordinate timing so the same buyer does not receive overlapping messages simply because several tools are available.\n\n${d.reason} As the store grows, the next workflow should not require buying access to another feature tier. WhatFlow keeps feature access consistent and lets the plan decision follow messaging needs.`,
 featureTable:[
 {feature:'Best-fit experience',whatflow:d.reason,competitor:d.tradeoff},
 {feature:'Costs to include',whatflow:'Selected message plan plus applicable Meta delivery fees; no inbox seat fees',competitor:d.cost},
 {feature:'Shopify workflow',whatflow:'Store events, template mapping, extensions and an included team inbox',competitor:'Test the full customer scenario above, including the final order action and handoff.'},
 {feature:'Starting point',whatflow:'Free plan and free-forever theme-matched WhatsApp buttons. All features available; sending allowances differ.',competitor:'Evaluate the existing tool or process on its own terms; a free entry point may cover only part of the workflow.'},
 ],
 faqs:[
 [`When is WhatsApp with WhatFlow useful compared with ${d.alternative.toLowerCase()}?`,d.reason],
 ['What should the pilot measure?',d.trial],
 ['Does the free WhatFlow plan restrict features?','No. WhatFlow offers all features across all plans, including Free. Plans differ by messaging allowances and rates. The team inbox has no seat fees, and theme-matched WhatsApp buttons are free forever.'],
 ['Are WhatsApp delivery charges included in every example?','No. The worked examples show WhatFlow app-side costs. Add applicable Meta delivery charges for your destination and message category, along with tax or any separately purchased services.'],
 ],
 sources:[app,meta,
 ...(/sms|mms/.test(d.slug)?[source('SMS length and segmentation','https://www.twilio.com/docs/glossary/what-sms-character-limit','Explains why character encoding and length affect SMS segment counts; actual rates depend on the provider and destination.')]:[]),
 ...(/email/.test(d.slug)?[source('Google email sender guidance','https://support.google.com/mail/answer/81126','Technical sender requirements and delivery considerations; this is not evidence of a guaranteed inbox placement or performance difference.')]:[]),
 ...(/channels/.test(d.slug)?[source('WhatsApp Channels explained','https://faq.whatsapp.com/809740894165112','The public update purpose of Channels, distinct from private customer order conversations.')]:[]),
 ...(/flow|native|extension/.test(d.slug)?[source('Shopify Flow','https://help.shopify.com/en/manual/shopify-flow','Shopify’s automation context; test each proposed integration and action in the intended store.')]:[]),
 ],featured:['whatsapp-vs-sms','whatsapp-vs-email','no-seat-fee-whatsapp-inbox-vs-per-seat'].includes(d.slug),
}));
const baseArticles = [...providerArticles,...decisionArticles].map(a=>({...a,faqs:a.faqs.map(([question,answer])=>({question,answer})),author:'Safwan Adnan',authorRole:'Co-founder and CEO of WhatFlow',reviewedAt,cta:{heading:'Give your Shopify customers a useful WhatsApp conversation',description:'Start free with every feature available, a theme-matched WhatsApp button and a team inbox without seat fees. Choose a message plan as your sending needs grow.',label:'Try WhatFlow on Shopify'},seo:{metaTitle:a.title,metaDescription:a.excerpt,noindex:false}}));

export default clarifyProducts(baseArticles);
