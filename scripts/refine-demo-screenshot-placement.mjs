/** Three editorial corrections following the live demo screenshot review. Offline only. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const work=process.env.SCREENSHOT_REFRESH_WORK;
assert(work,'Set SCREENSHOT_REFRESH_WORK');
const root='content/engineering/demo-screenshot-coverage';
const shots=JSON.parse(await fs.readFile(root+'/capture-manifest.json','utf8'));
const plan=JSON.parse(await fs.readFile(work+'/plan.json','utf8'));
const docs=JSON.parse(await fs.readFile(work+'/post-candidates.json','utf8'));
const date=new Date().toISOString();
const q=s=>"'"+s.replaceAll("'","''")+"'";
const existing={
 key:'flow-quick-reply-trigger',filename:'blog-shopify-flow-whatflow-flow-triggers.jpg',
 url:'/api/media/file/blog-shopify-flow-whatflow-flow-triggers.jpg',width:1512,height:787,
 alt:'WhatFlow WhatsApp trigger choices in Shopify Flow, including button replies',
 caption:'The Shopify Flow trigger picker shows the WhatFlow button-reply trigger. This is a demo configuration view.',
};
const adjustments=[
 ['whatsapp-quick-reply-buttons-customer-choices','How to connect button replies to Shopify Flow',existing],
 ['small-shopify-store-metrics-review-routine','Keep raw counts next to every rate',shots.find(x=>x.key==='analytics-funnel')],
 ['high-ticket-products-whatsapp-sales','Who owns the deal?',shots.find(x=>x.key==='inbox-labels')],
];
const statements=[];
const plain=n=>n.text??(n.children||[]).map(plain).join('');
const fixes=[];
for(const [slug,heading,m] of adjustments){
 const change=plan.changes.find(x=>x.kind==='posts'&&x.slug===slug);
 const previous=shots.find(x=>x.key===change.asset);
 const d=docs.find(x=>x.slug===slug);
 const nodes=d.content.root.children;
 const index=nodes.findIndex(n=>n.type==='block'&&n.fields?.url===previous.url);
 assert(index>=0,slug);
 const [block]=nodes.splice(index,1);
 const head=nodes.findIndex(n=>n.type==='heading'&&plain(n)===heading);
 assert(head>=0,heading);
 const para=nodes.findIndex((n,i)=>i>head&&n.type==='paragraph');
 assert(para>=0,heading);
 Object.assign(block.fields,{url:m.url,alt:m.alt,caption:m.caption,width:m.width,height:m.height});
 nodes.splice(para+1,0,block);
 assert(Number.isSafeInteger(d.id));
 statements.push(`UPDATE posts SET content=${q(JSON.stringify(d.content))},updated_at=${q(date)} WHERE id=${d.id} AND slug=${q(d.slug)} AND status='published' AND updated_at=${q(d.updatedAt)};`);
 d.updatedAt=date;
 plan.usage[change.asset]--;
 plan.usage[m.key]=(plan.usage[m.key]||0)+1;
 Object.assign(change,{asset:m.key,section:heading,editorialOverride:true});
 fixes.push({slug,heading,asset:m.key});
}
plan.existingAssets=[existing];
await fs.writeFile(work+'/refinement.sql',statements.join('\n')+'\n');
await fs.writeFile(work+'/post-candidates-final.json',JSON.stringify(docs));
await fs.writeFile(work+'/plan-final.json',JSON.stringify(plan,null,2)+'\n');
console.log(JSON.stringify(fixes));
