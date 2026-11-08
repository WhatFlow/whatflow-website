import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import research from '../content/comparisons/shopify-top-apps-2026-11-08/research.mjs';
import {checkDoc,linkableSet,uid} from './lib/refresh-content.mjs';
import {markdownToLexical} from './build-quality-content.mjs';

const root='content/comparisons/shopify-top-apps-2026-11-08';
const work=process.env.TOP_APPS_WORK;
if(!work)throw Error('Set TOP_APPS_WORK to the directory containing evidence.json, listing icons and live.json');
const evidence=JSON.parse(await readFile(work+'/evidence.json'));
const live=JSON.parse(await readFile(work+'/live.json')).docs;
const links=await linkableSet();
const internal='whatflow-chat-automation-vs-business-api';
assert(live.some(d=>d.slug===internal));
for(const p of ['/pricing','/inbox','/compare/'+internal])links.add(p);
const media='/api/media/file/';
const shots={
 conversation:['blog-product-proof-theme-button-controls.jpg','WhatFlow theme editor showing WhatsApp button controls','WhatsApp button settings in the WhatFlow demo store.'],
 inbox:['blog-product-proof-inbox-assignment-filters.jpg','WhatFlow inbox assignment filters','Demo inbox showing assignment filters.'],
 cart:['blog-shopify-flow-whatflow-flow-template-mapping.jpg','WhatFlow template action with Shopify checkout fields in Flow','An inactive demo workflow maps Shopify data into a WhatsApp template.'],
 automation:['blog-shopify-flow-whatflow-flow-order-reply.jpg','Demo Flow workflow with an order reply trigger and order tag action','Inactive demo: an order reply can trigger a Shopify order tag.'],
 pricing:['blog-shopify-flow-whatflow-flow-actions-more.jpg','WhatFlow messaging actions in Shopify Flow','WhatFlow actions available from the Shopify Flow editor.'],
 shipping:['blog-enhancement-whatflow-template-editor.webp','WhatFlow Business API template editor','Example template editor in the Shopify demo store.'],
};
const wfPrice={title:'WhatFlow plans and messaging charges',url:'https://whatflow.io/pricing',note:'App allowance and overage pricing; Meta charges are separate.'};
const wfListing={title:'WhatFlow WhatsApp Business API on Shopify',url:'https://apps.shopify.com/whatflow-official-api',note:'Official API, listed capabilities and Shopify app pricing.'};
const budget={
 whachatcrm:'With three support staff and 40 active contacts, WhachatCRM’s free user cap is the first limit you’ll hit. Price the shared inbox on Pro. With WhatFlow you can invite all three on Free and price outbound sends separately.',
 moose:'Moose’s $0 listing is the right baseline. If the WhatFlow workflow needs 300 sends in a cycle, its Free plan app charge would be $2 in overages, before Meta fees and tax. I’d judge that small difference against the time saved by a repeatable order workflow.',
 wava:'At 800 sends in a billing cycle, WhatFlow Starter is $4.99 in app fees before Meta charges and tax. Compare that with wava’s own-number Lite plan rather than treating its shared-number free install as the same setup.',
 carthike:'If you plan to send 600 automated reminders a month, CK’s free manual allowance isn’t the right baseline. Price its VIP automation and any per-message fees; WhatFlow Starter includes that volume in its app allowance, with Meta charges still separate.',
 squadkin:'If your team doesn’t need an AI agent, price the order updates separately from the AI conversation allowance. WhatFlow charges for sends beyond the plan allowance, so your workload is easier to budget from the number of eligible orders.',
 click2chat:'For a storefront button alone, both can start at $0. The $6.99 Click2Chat tier buys the quote workflow; the $4.99 WhatFlow tier buys a larger message allowance. Pick the job first.',
 reco:'If Shopify Flow is the reason you’re switching, compare WhatFlow Free with Reco Pro. There’s a $49/month difference in base subscription at zero overage, before applicable messaging charges and tax. If you only need a built-in chatbot and a shared inbox, compare Reco Lite too.',
 ca:'Price the click-to-order controls and the automated sends separately. CA’s Advanced tier adds the ordering controls; Pro lists automation. WhatFlow’s paid tier increases message allowance and doesn’t add a separate charge for the team inbox.',
 kwikengage:'For an India store, use the $40 Growth quote in the worksheet. A UK store should use the regional Pro quote instead. In either case, compare the bundle against a WhatFlow app plan plus applicable Meta delivery fees, and count only the extra channels your staff will actually use.',
 seedgrow:'Two department numbers can already fit SeedGrow’s free widget tier. Paying for Pro makes sense if the schedule and click reporting matter. With WhatFlow, the paid plan increases sending allowance; staff assignments and the theme button don’t require an upgrade.',
 whapi:'If you need a staffed inbox, Whapi’s $45 Team plan is the monthly benchmark. WhatFlow can pilot the team on Free. At 1,200 sends in a billing cycle, WhatFlow Starter is $4.99 before Meta fees and tax; compare multiple-account needs separately.',
 'eaze-button':'EAZE Pro costs less than WhatFlow Starter, and that’s fine: one buys expanded button controls, the other buys a higher send allowance. For a shop that just wants a theme button, test both free options before paying for anything.',
 whatomation:'The $3 and $5 Whatomation plans list different sender options. Don’t price 2,000 sends against the $5 allowance until you’ve confirmed what number and connection you’ll be using. WhatFlow Starter includes 2,000 app sends; applicable Meta charges are a separate line.',
};
const editorial=[],brands={},stats=[];
await mkdir(work+'/icons',{recursive:true});
for(const r of research){
 const slug='whatflow-vs-'+r.key;
 const competitorUrl='https://apps.shopify.com/'+r.app;
 assert(!live.some(d=>d.slug===slug||d.competitorUrl?.split('?')[0].replace(/\/$/,'')===competitorUrl),'Duplicate '+slug);
 const label=r.name.replace(' WhatsApp Chat Button','').replace(' WhatsApp Chat Widget','').replace(' WhatsApp Chat Order Button','');
 const title='WhatFlow vs '+(r.key==='ca'?'CA Chat Order Button':r.name)+': '+r.angle;
 const meta={
  slug,title,competitor:r.name,competitorUrl,category:'shopify',
  excerpt:`Compare ${r.name} and WhatFlow Business API for Shopify: pricing, WhatsApp workflows and which app fits your store.`,
  verdict:r.win,metaTitle:`WhatFlow vs ${label}: WhatsApp for Shopify`,
  metaDescription:`WhatFlow vs ${r.name} for Shopify WhatsApp: compare pricing, chat, automation and team access. See what to test before switching.`,
  featureTable:[
   {feature:'Best fit',whatflow:'WhatsApp order automation and a shared inbox inside Shopify.',competitor:r.strength},
   {feature:'Published pricing',whatflow:'Free app plan with 100 sends included. Starter $4.99/month with 2,000 sends. Overage and applicable Meta charges are separate.',competitor:r.cost},
   {feature:'Decision',whatflow:r.win,competitor:r.trade},
  ],
  faqs:[
   {question:`How much does ${r.name} cost on Shopify?`,answer:r.cost},
   {question:`When should I choose ${r.name} over WhatFlow?`,answer:r.trade},
   {question:`What should I test before switching from ${r.name}?`,answer:r.check},
  ],
  sources:[{title:`${r.name} on the Shopify App Store`,url:competitorUrl,note:'Listing, feature descriptions and USD pricing checked November 8, 2026.'},wfListing,wfPrice],
  cta:{heading:'Try the WhatFlow workflow in your store',description:'Start with the official WhatsApp Cloud API, Shopify Flow and a team inbox with no seat fees. Every available feature is included on Free.',label:'Install WhatFlow Business API'},
 };
 const [file,alt,caption]=shots[r.motif];
 const body=`${r.win}

## What does ${r.name} do well?

${r.strength} [See the Shopify listing](${competitorUrl}).

## What does the setup cost?

${r.cost}

${budget[r.key]} Check [current WhatFlow pricing](/pricing) for allowances and overage rates.

## How would I test it in a Shopify store?

${r.example}

![${alt}](${media}${file} "${caption}")

${r.check}

## Which one would I choose?

${r.trade}

For WhatFlow in this comparison, I mean the [official Cloud API app](/compare/${internal}). I’d pilot it on Free with the [shared inbox](/inbox) and the Shopify Flow actions you expect to use. Once the customer journey works, size the messaging plan from the sends you actually expect.
`;
 const review=await checkDoc({meta,body},{kind:'newcomparison',slug,linkable:links});assert.deepEqual(review.errors,[],slug);assert(review.stats.words>=290,slug);
 stats.push({slug,...review.stats,warnings:review.warnings});
 await writeFile(root+'/new/'+slug+'.md',`---\n${JSON.stringify(meta,null,2)}\n---\n\n${body}`);
 const path=work+'/icons/'+r.key+'.png';
 await sharp(work+'/'+r.app+'.icon').resize(256,256,{fit:'inside'}).png().toFile(path);
 brands[label]={path,source:evidence[r.app].icon,verified:true};
 editorial.push({slug,collection:'compare',title,lines:['WhatFlow vs',label],eyebrow:'SHOPIFY APP COMPARISON',motif:r.motif,secondaryBrandLabel:label,primaryBrandLabel:'WhatFlow Business API'});
}
await writeFile(work+'/editorial.json',JSON.stringify(editorial,null,2));
await writeFile(work+'/brand-assets.json',JSON.stringify(brands,null,2));
await writeFile(root+'/editorial-review.json',JSON.stringify(stats,null,2)+'\n');

const before=live.find(d=>d.slug===internal);
const replace=s=>s.replaceAll('55 ratings','58 ratings').replaceAll('55 reviewers','58 reviewers').replaceAll('329 ratings','331 ratings').replaceAll('November 5, 2026','November 8, 2026').replaceAll('Nov 5, 2026','Nov 8, 2026');
const after=JSON.parse(JSON.stringify(before),(_,v)=>typeof v==='string'?replace(v):v);
const date=new Date().toISOString();after.updatedAt=date;after.reviewedAt=date;
after.verdict='I recommend WhatFlow Business API for most Shopify stores. It uses Meta’s official WhatsApp Cloud API and includes Shopify Flow, catalog sharing and a team inbox with no seat fees on every plan. WhatFlow Chat Automation is our older app: it uses an unofficial linked-device connection. I’d only recommend it for small or startup stores testing modest transactional sends.';
after.excerpt='Two Shopify apps from the same team: official Meta Cloud API or unofficial linked-device automation. Compare pricing, ratings and migration tradeoffs.';
after.seo.metaDescription='Compare WhatFlow Business API and Chat Automation: official Meta Cloud API vs an unofficial linked-device connection, Shopify features, fees and migration.';
after.featureTable.find(r=>r.feature==='Connection method').competitor='Unofficial linked-device integration to your existing WhatsApp account; no Meta Business setup.';
after.faqs[1].answer='They are separate Shopify apps by the same team. Chat Automation uses an unofficial linked-device integration. WhatFlow Business API uses Meta’s official WhatsApp Cloud API. Pricing, Shopify features and reviews belong to each app separately.';
after.faqs[2].answer='For modest transactional sending with minimal setup, Chat Automation can be a starting point. I recommend the official Business API if orders depend on those messages, or if your team needs Shopify Flow and a shared inbox. Business API has a Free plan.';
after.faqs[4].answer='We built Business API after merchants outgrew linked-device sending and some reported disconnections or account restrictions. The official API is our recommendation for important Shopify workflows. Its rules on opt-in, templates and message quality still apply.';
after.faqs.push({id:uid(internal+'unofficial-api'),question:'Is WhatFlow Chat Automation an unofficial WhatsApp API app?',answer:'Yes. Chat Automation connects as a linked device and does not use Meta’s official WhatsApp Cloud API. We recommend it only for small, low-volume transactional use. For important Shopify automations, use WhatFlow Business API.'});
const nodes=after.content.root.children;
const plain=n=>n.text??(n.children||[]).map(plain).join('');
const patch=(prefix,body)=>{
 const index=nodes.findIndex(n=>n.type==='paragraph'&&plain(n).startsWith(prefix));
 assert(index>=0,prefix);
 nodes.splice(index,1,...markdownToLexical(body).root.children);
};
patch('WhatFlow has two Shopify apps',after.verdict);
patch('Both ratings are healthy','The [Chat Automation listing](https://apps.shopify.com/whatflow) showed **4.0/5 from 331 ratings** on November 8, 2026. The [Business API listing](https://apps.shopify.com/whatflow-official-api) showed **5.0/5 from 58 ratings** on the same date. Each rating belongs to its own listing. The older app has a longer review history; its rating doesn’t describe the official API app.');
patch('A linked-device connection works','Chat Automation connects to your WhatsApp account as a linked device. It’s an unofficial integration, outside the Meta Cloud API, and has a lower setup barrier for a small shop. I’d keep it to modest transactional work, like a candle shop testing order updates from its existing number. If those messages are critical to shipping, I’d start on the official API.');
patch("Here's the honest reason",'Some merchants told us their linked sessions disconnected or their accounts faced restrictions as sending grew. That feedback helped shape Business API. It doesn’t explain every older review, and the official API isn’t a guarantee of delivery or account status. The advantage is using Meta’s supported business messaging platform and tools for templates, quality and limits.');
patch('The catch is Meta','The $15 difference in the 5,000-send example is only the gap in app fees. Business API can also incur Meta charges based on message type, destination and current rules. Chat Automation doesn’t use the Cloud API billing model. At low transactional volume, its total may be lower; compare the complete bill and the operational cost of losing a linked session. Use [Meta’s pricing page](https://business.whatsapp.com/products/platform-pricing) for current delivery charges.');
patch("You don't lose anything",'Before switching, confirm number eligibility, what history is available and whether the number can keep using the WhatsApp Business app. Don’t assume your templates or workflows transfer. Run one internal test order and disable the equivalent old automation before enabling the new one, so customers don’t get duplicate messages.');
await writeFile(work+'/source-documents.json',JSON.stringify([before],null,2));
await writeFile(work+'/candidate-documents.json',JSON.stringify([after],null,2));
await writeFile(root+'/two-app-revision.json',JSON.stringify({before:before.updatedAt,candidate:after},null,2)+'\n');
console.log(JSON.stringify({new:stats.length,reviewed:internal,words:stats.map(s=>s.words),warnings:stats.flatMap(s=>s.warnings)}));
