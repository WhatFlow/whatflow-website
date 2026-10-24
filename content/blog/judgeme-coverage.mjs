/** Discovery evidence only: no Judge.me article bodies are copied into the site. */
const coverage = {
 checkedAt:'2026-10-24',
 completeness:'main-index-exhausted-bodies-partial',
 limitation:'The normal browser eventually loaded the main blog. Its Load more pagination was exhausted and 273 unique article cards were inventoried in judgeme-live-inventory.json. Six article bodies were read before the site returned a challenge-attempts-exceeded page; further article reads stopped. judgeme-article-audit.json records successful and failed reads. This is a complete observed main-index inventory, not a complete body-level review of all articles.',
 categories:['Marketing','Entrepreneurship','Reviews','Features','Buyer insights','News'],
 evidence:[
  {url:'https://judge.me/blog',access:'search-indexed listing; direct HTTP 403',titles:[
   'How to improve SEO on Shopify: 10 strategies for merchants',
   'AI, systems & processes: scaling creative without hiring a big team',
   'Growth Unlocked presents Stop or scale: operator honesty at $1-10M',
   "Judge.me’s vision: what’s coming next for our customers",
   'How to get better reviews with Judge.me customization',
   'How to get more reviews: 5 ways to increase your review collection rate with Judge.me',
   'Everything you need to know about benchmarking review collection rate for Shopify businesses',
  ]},
  {url:'https://judge.me/blog/categories/reviews',access:'search-indexed listing',titles:[
   'What shoppers told us about trusting an online store',
   'Understanding how trust badges can increase your conversion rates',
   'How to add reviews to Shopify and start collecting social proof',
   'Yotpo vs Loox: Which product review app is best?',
   'How to get more reviews for your business with Email, SMS & QR Codes',
   'Review requests: 4 tips to get more responses and better reviews',
  ]},
  {url:'https://judge.me/blog/categories/features',access:'search-indexed listing',titles:[
   'Build trust faster: 3 easy ways to collect more reviews',
   'Judge.me Ali Reviews Importer secures Built for Shopify badge!',
   'What’s New at Judge.me: October Feature Highlights',
   'What’s New at Judge.me: September Feature Highlights',
   'What’s New at Judge.me: August 2025',
   'What’s New at Judge.me: July Feature Highlights',
  ]},
  {url:'https://judge.me/blog/categories/news',access:'search-indexed listing',titles:[
   'Farewell to Checkout Comments: Sunsetting Our Legacy App',
   'We’ve Been Awarded the Built for Shopify Badge!',
   'Shopify Is Sunsetting Its Product Reviews App. Judge.me Is a Great Alternative.',
   "November Shopify Tech Partners Event: ‘How to Grow Your E-commerce Store’ and ‘Black Friday Discounts’",
   "August Shopify Tech Partners Event: ‘The Power of Branding’ and ‘Creating Meaningful Partnerships’",
   "June Shopify Tech Partners Event: ‘Build, Analyze, Iterate’ for Shopify and ‘How to Lose $200k in One Day’",
  ]},
  {url:'https://judge.me/blog/categories/buyer-s-insights',access:'search-indexed category; no article titles returned',titles:[]},
 ],
 editorialRules:[
  'Write original WhatFlow articles for distinct merchant needs; do not paraphrase every paragraph of a competitor article.',
  'Do not invent WhatFlow versions of Judge.me news, events, research findings, app awards or customer case studies.',
  'Use current primary documentation for platform capabilities and keep review-provider responsibilities distinct from WhatFlow messaging.',
  'Keep the incomplete crawl explicit; this evidence does not establish that every Judge.me post was scanned.',
 ],
};
export default coverage;
