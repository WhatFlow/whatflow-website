import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
const root='content/thumbnails-2026-10-25';
const manifest=JSON.parse(await readFile(root+'/manifest.json'));
const posts=JSON.parse(await readFile(root+'/source-posts.json'));
const comparisons=JSON.parse(await readFile(root+'/source-comparisons.json'));
const comparisonRoot='content/comparisons/whatsapp-first-2026-10-25',blogRoot='content/blog/thumbnails-2026-10-25';
const copyBefore=JSON.parse(await readFile(comparisonRoot+'/source-documents.json'));
const copyDrafts=JSON.parse(await readFile(comparisonRoot+'/draft-documents.json'));
const visualAudit=JSON.parse(await readFile(comparisonRoot+'/audit.json'));
const records=new Map(manifest.records.map(r=>[(r.collection==='blog'?'blog':'compare')+'/'+r.slug,r]));
assert.equal(posts.length,58);assert.equal(comparisons.length,106);assert.equal(records.size,164);
const now=new Date().toISOString();const changes=[];
const block=(url,alt,caption,width=1512,height=787)=>({type:'block',version:2,format:'',fields:{id:randomBytes(12).toString('hex'),blockType:'screenshot',url,alt,caption,width,height}});
const additional={
 flow:['/blog/shopify-flow/whatflow-flow-order-reply.jpg','WhatFlow order-reply trigger, confirmation condition and order-tag action in an inactive Shopify Flow demo.','Inactive WhatFlow demo workflow: a Confirm reply is configured to add an order tag. This is configuration evidence, not a delivered message or measured result.'],
 automation:['/blog/shopify-flow/whatflow-flow-triggers.jpg','WhatFlow WhatsApp trigger choices inside Shopify Flow.','WhatFlow triggers shown in Shopify Flow: button replies, opt-outs, order replies, text messages and media. This screen lists available triggers; it does not show a live execution.'],
 api:['/blog/shopify-flow/whatflow-flow-template-mapping.jpg','Shopify Flow mapping a demo order into WhatFlow Send WhatsApp Template fields.','Inactive demo configuration mapping an order/customer and recipient into WhatFlow’s template action. An approved template and eligible account are still required.'],
 inbox:['/blog/shopify-flow/whatflow-flow-text-routing.jpg','An inactive WhatsApp text-message routing workflow in Shopify Flow.','A Shopify Flow demo showing the automation side of incoming WhatsApp text routing. This is a workflow editor, not a screenshot of the team inbox.'],
 campaign:['/blog/shopify-flow/whatflow-flow-template-variables.jpg','Template variable fields in an inactive WhatFlow Shopify Flow action.','WhatFlow template-variable configuration in an inactive demo workflow. Sample mappings illustrate personalization; this screen does not demonstrate a sent campaign or campaign performance.'],
 cod:['/blog/shopify-flow/whatflow-flow-order-reply.jpg','Inactive COD confirmation workflow with a WhatsApp reply condition and Shopify order tag.','An inactive COD confirmation example: WhatFlow Order Reply, a Confirm-button condition and a Shopify order-tag action. No live delivery or order outcome is shown.'],
 native:['/blog/shopify-flow/whatflow-flow-ecosystem.jpg','Shopify Flow action selection in the WhatFlow demo store.','The Shopify Flow action picker in our demo store illustrates the app-workflow environment. Available actions depend on installed integrations and configuration.'],
};
for(const key of ['button','pricing','support','reporting','retention'])additional[key]=additional.automation;
function preserveScreenshot(doc,url,alt,caption,additionalShot){
 const nodes=doc.content.root.children;const serialized=JSON.stringify(nodes);
 if(url&&!serialized.includes(url)){
  const i=nodes.findIndex(n=>n.type==='heading');
  // Keep the former real cover as supporting evidence, after the opening section.
  const next=nodes.findIndex((n,index)=>index>i&&n.type==='heading');
  nodes.splice(next>=0?next:nodes.length,0,block(url,alt||'WhatFlow demo interface',caption||'Existing demo-store screenshot preserved from the previous article cover.'));
 }
 if(additionalShot&&!JSON.stringify(nodes).includes(additionalShot[0])){
  const plain=n=>n.text??(n.children||[]).map(plain).join('');
  let i=nodes.findIndex(n=>n.type==='heading'&&plain(n)==='Before you choose a platform');if(i<0)i=nodes.length;
  nodes.splice(i,0,block(...additionalShot));
 }
}
const newPosts=posts.map(before=>{
 const p=structuredClone(before),r=records.get('blog/'+p.slug);assert(r);
 preserveScreenshot(p,p.coverImageUrl||p.coverImage?.url,p.coverImageAlt||p.coverImage?.alt,p.coverImageCaption);
 p.coverImageUrl=r.url;p.coverImageAlt=r.alt;p.coverImageCaption=r.caption;p.updatedAt=now;
 for(const key of ['id','slug','title','excerpt','author','authorRole','publishedAt','createdAt','faqs','sources','tags','status','seo','reviewedAt'])assert.deepEqual(p[key],before[key],p.slug+' preserved '+key);
 changes.push({collection:'posts',slug:p.slug,thumbnail:r.url,previousCoverPreservedInBody:true});return p;
});
const newComparisons=comparisons.map(before=>{
 const original=copyBefore.find(d=>d.id===before.id);assert.equal(before.updatedAt,original.updatedAt,'Concurrent comparison edit: '+before.slug);assert.deepEqual(before.content,original.content);
 const p=structuredClone(copyDrafts.find(d=>d.id===before.id)),r=records.get('compare/'+p.slug);assert(r);
 const theme=visualAudit.screenshotAssignments.find(d=>d.slug===p.slug)?.theme;
 preserveScreenshot(p,before.imageUrl,before.imageAlt,before.imageCaption,additional[theme]||additional.automation);
 p.imageUrl=r.url;p.imageAlt=r.alt;p.imageCaption=r.caption;p.imageSourceUrl='/compare';p.updatedAt=now;
 for(const key of ['id','slug','title','author','authorRole','publishedAt','createdAt','faqs','sources','relatedComparisons','_status','seo','reviewedAt'])assert.deepEqual(p[key],before[key],p.slug+' preserved '+key);
 assert.deepEqual(p.featureTable.map(r=>r.competitor),before.featureTable.map(r=>r.competitor));
 changes.push({collection:'comparisons',slug:p.slug,thumbnail:r.url,previousCoverPreservedInBody:true,supportingScreenshotTheme:theme});return p;
});
await mkdir(blogRoot,{recursive:true});
await writeFile(blogRoot+'/source-documents.json',JSON.stringify(posts,null,2));await writeFile(blogRoot+'/candidate-documents.json',JSON.stringify(newPosts,null,2));
await writeFile(comparisonRoot+'/candidate-documents.json',JSON.stringify(newComparisons,null,2));
await writeFile(root+'/publication-manifest.json',JSON.stringify({preparedAt:now,posts:58,comparisons:106,thumbnails:164,changes,freshAppCaptures:'Chrome focus commands time out; existing verified demo captures are reused and labelled accurately. New inbox/campaign/button/plan views remain pending browser access.'},null,2));
console.log(JSON.stringify({posts:newPosts.length,comparisons:newComparisons.length,covers:records.size}));
