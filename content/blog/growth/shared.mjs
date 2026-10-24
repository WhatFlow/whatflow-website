export const sources = {
  widgets:{title:'Judge.me widget reference',url:'https://judge.me/help/en/articles/8415708-judge-me-widgets',note:'Reference for review widget types and supported storefront placements; WhatFlow does not replace the review provider.'},
  collection:{title:'How Judge.me collects reviews',url:'https://judge.me/help/en/articles/8287254-how-do-we-collect-reviews',note:'Distinguishes invited, web and imported review sources.'},
  verification:{title:'Judge.me verified-review requirements',url:'https://judge.me/help/en/articles/8376284-verified-reviews',note:'Verification depends on the review provider’s criteria; sending a WhatsApp link does not itself create verified status.'},
  moderation:{title:'Publishing and hiding reviews',url:'https://judge.me/help/en/articles/8368681-publishing-and-hiding-reviews',note:'Reference for review statuses and transparent moderation.'},
  ownership:{title:'Judge.me review content guidelines',url:'https://judge.me/help/en/articles/8287316-guidelines-on-reviews-content',note:'Review authenticity, ownership and permission to use text or media.'},
  form:{title:'Customizing the review form',url:'https://judge.me/help/en/articles/11419250-customizing-your-review-form',note:'Provider-specific settings and availability can change; consult the current app interface.'},
  seo:{title:'Google Search: creating helpful content',url:'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',note:'Primary guidance for useful content written for people.'},
  schema:{title:'Google product snippet structured data',url:'https://developers.google.com/search/docs/appearance/structured-data/product-snippet',note:'Product markup requirements and eligibility; search enhancements are not guaranteed.'},
  flow:{title:'Shopify Flow overview',url:'https://help.shopify.com/en/manual/shopify-flow',note:'Visual workflows and app capabilities depend on supported installed connectors and data.'},
  policy:{title:'WhatsApp Business messaging policy',url:'https://business.whatsapp.com/policy',note:'Messaging permission and channel requirements apply to campaigns and automations.'},
  pricing:{title:'WhatsApp Platform pricing',url:'https://business.whatsapp.com/products/platform-pricing',note:'Check applicable country, category and message charges before budgeting.'},
  app:{title:'WhatFlow Business API on Shopify',url:'https://apps.shopify.com/whatflow-official-api',note:'WhatFlow product identity and Shopify integration. WhatFlow plan descriptions in these articles are first-party product information.'},
};
export function article(slug,title,excerpt,category,tags,body,sourceKeys,faqs){
 return {slug,title,excerpt,category,tags,body,sources:sourceKeys.map(key=>sources[key]),faqs,author:'Safwan Adnan',authorRole:'Co-founder and CEO of WhatFlow',reviewedAt:'2026-10-24T00:00:00.000Z'};
}
