import {readFile,writeFile} from 'node:fs/promises';
import articles from '../content/blog/growth/index.mjs';
const inventory=JSON.parse(await readFile(new URL('../content/blog/judgeme-live-inventory.json',import.meta.url),'utf8'));
const rules=[
 [/shopify vs|selling on shopify/i,'choose-ecommerce-platform-customer-workflows'],
 [/influencer/i,'influencer-campaign-small-store-plan'],
 [/product variants/i,'product-variant-review-context'],
 [/brand growth|review marketing/i,'customer-review-insights-product-copy'],
 [/building a great brand|niche|winning f&b/i,'define-store-audience-brand-promise'],
 [/better reviews|product review examples/i,'collect-first-product-reviews-shopify'],
 [/reviews dashboard/i,'review-collection-rate-measurement-shopify'],
 [/review videos|youtube/i,'photo-video-reviews-customer-permission'],
 [/profile image/i,'review-moderation-policy-small-store'],
 [/app.*upgrade|revamped our settings|duda store|integrated with square/i,'evaluate-shopify-app-workflow-connectors'],
 [/new visitors|stealing.*ideas/i,'shopify-content-plan-customer-questions'],
 [/face to face/i,'product-questions-whatsapp-prepurchase-support'],
 [/stop or scale/i,'small-shopify-store-metrics-review-routine'],
 [/\b(qr|qr codes)\b/i,'qr-code-review-requests-product-packaging'],
 [/loyalty|rewards?|coupons?|gameball|kangaroo|gratisfaction|offerwhere/i,'loyalty-messages-customer-value-shopify'],
 [/refer|referral/i,'customer-referral-messages-shopify'],
 [/language|translat|localization|weglot|hextom/i,'multilingual-customer-messaging-shopify'],
 [/social media|social push|instagram|ugc|media grid|review cards|facebook reviews/i,'reuse-customer-reviews-social-media'],
 [/negative|reply to reviews|update their reviews/i,'respond-negative-product-reviews-shopify'],
 [/import|migrat|sync|syndicat|sunsetting.*reviews/i,'migrate-review-app-preserve-customer-feedback'],
 [/review.*app|product reviews app|yotpo vs loox/i,'choose-review-app-and-messaging-app-shopify'],
 [/benchmark|collection rate|reports|reporting|review dashboard|dashboard.*review/i,'review-collection-rate-measurement-shopify'],
 [/schema|seo|google.*ratings/i,'product-review-schema-rich-results-explained'],
 [/ai|tone of voice/i,'ai-support-drafts-small-shopify-team'],
 [/flow|zapier|mechanic|integration|make\b/i,'evaluate-shopify-app-workflow-connectors'],
 [/support|ticket|service|customer relationships/i,'shared-team-inbox-small-shopify-business'],
 [/black friday|bfcm|cyber monday/i,'prepare-customer-support-black-friday-shopify'],
 [/dropship/i,'dropshipping-customer-trust-communication'],
 [/content|keyword/i,'shopify-content-plan-customer-questions'],
 [/upsell|bundle|bought together|recommendations/i,'helpful-cross-sell-product-recommendations'],
 [/profanity|censor|privacy|personal identifiable|compliant|consumer protection/i,'review-moderation-policy-small-store'],
 [/custom forms|q&a|questions/i,'write-useful-product-faqs-shopify'],
 [/email|sms|messenger|whatsapp/i,'coordinate-email-sms-whatsapp-customer-messages'],
 [/first reviews|collect.*reviews|more reviews|review requests|request order/i,'collect-first-product-reviews-shopify'],
 [/store reviews/i,'product-reviews-vs-store-reviews'],
 [/widget|carousel|pop-up|snippets|rating icons/i,'mobile-store-review-widget-chat-button-layout'],
 [/social proof|trust|badges|medals|review site/i,'shopify-product-page-trust-checklist'],
 [/pricing|prices|economics|metrics|numbers|revenue/i,'small-shopify-store-metrics-review-routine'],
];
const rows=inventory.articles.map(source=>{
 const isInterview=/\||spotlight|advice from|roundup|how (?:fit kit|beardbrand)|line friends|bundlebums|vikle liv|headphone zone|osinachi|elena greensill|valentina chirico/i.test(source.title);
 const isCompanyNews=source.category==='News'||/what.s new|newly launched|new feature|improvement:|new app:|badge|our.*vision/i.test(source.title);
 const match=rules.find(([pattern])=>pattern.test(source.title));
 if((isInterview||isCompanyNews)&&!match)return {source,...{disposition:'source-specific-reference',target:null,reason:'A company event, interview, case study or award cannot be rewritten as a WhatFlow experience. Preserve attribution; no invented substitute was published.'}};
 if(match){const target=articles.find(a=>a.slug===match[1]);if(!target)throw new Error(match[1]);return {source,disposition:'related-original-guide',target:`/blog/${target.slug}`,reason:isCompanyNews?'An original guide covers the reusable merchant task. It does not claim the source announcement is a WhatFlow feature.':'An original guide addresses a related reader task. This is a topic adaptation, not a rewrite or a claim of equivalent scope.'};}
 return {source,disposition:'needs-editorial-scope',target:null,reason:'No sufficiently close original guide in this batch. Keep visible for follow-up rather than claim complete adaptation.'};
});
const counts=rows.reduce((r,row)=>(r[row.disposition]=(r[row.disposition]||0)+1,r),{});
await writeFile(new URL('../content/blog/judgeme-topic-map.json',import.meta.url),JSON.stringify({checkedAt:new Date().toISOString(),sourceEntries:rows.length,originalArticles:articles.length,oneToOneReplication:false,counts,entries:rows},null,2));
console.log(JSON.stringify({sourceEntries:rows.length,originalArticles:articles.length,counts}));
