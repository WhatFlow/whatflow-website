/** Prepare a scoped editorial update and new native Payload posts. No network or writes to CMS. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {markdownToLexical} from './build-quality-content.mjs';
import {uid,readDoc,listMarkdown,bodyToLexical} from './lib/refresh-content.mjs';
import {tracks,postGroups,comparisonVendors,comparisonUseCases,sourceCorrection,correctionSlugs} from '../content/blog/product-workflows-2026-11-08/editorial.mjs';
const root='content/blog/product-workflows-2026-11-08',w=process.env.WORKFLOW_PUBLICATION_WORK;
assert(w);
const now=new Date().toISOString(),q=v=>v==null?'NULL':typeof v==='number'?String(v):typeof v==='boolean'?Number(v):"'"+String(v).replaceAll("'","''")+"'";
const plain=n=>n.text??(n.children||[]).map(plain).join(' ');
const groups=(source,prefix='')=>Object.entries(source).flatMap(([theme,slugs])=>slugs.split(' ').map(s=>[prefix+s,theme]));
const selection={posts:new Map(groups(postGroups)),comparisons:new Map([...groups(comparisonVendors,'whatflow-vs-'),...groups(comparisonUseCases)])};
const posts=[],source=[],candidate=[],audit=[],sql=[];
const append=(str)=>markdownToLexical(str).root.children;
const links={campaign:'/blog/whatflow-shopify-whatsapp-campaign-walkthrough',support:'/blog/whatflow-team-inbox-shopify-support-workflow',catalog:'/blog/whatflow-whatsapp-catalog-to-shopify-checkout'};
const testByTheme={
 campaign:['Which Shopify audience do you already use?', 'Can your team run a test and handle the replies after the send?', 'Can you explain which recipients failed and retry only the ones worth retrying?'],
 support:['Can a second agent tell who owns the conversation without asking?', 'Can an agent open a matching Shopify order while they reply?', 'How do you prioritize chats before their service window closes?'],
 catalog:['Can you send the right product variant from the same conversation?', 'What happens after a buyer sends back a WhatsApp cart?','Can the agent hand the buyer off to Shopify checkout and verify payment there?'],
 storefront:['Where does the shopper go after tapping the button?', 'Can staff share a relevant product when the shopper asks about sizing?', 'Who owns the conversation when it moves from sales to support?'],
 automation:['Can a WhatsApp reply start the Shopify workflow you need?', 'Which actions can you run inside Shopify Flow?', 'Can a catalog cart event start a workflow separately from an order-paid event?'],
 platform:['Can you run a launch and handle replies without swapping tools?', 'What happens between a first campaign message and a Shopify checkout?', 'Can one team manage messages, order context, and catalog sales?'],
};
const copyFor=(d,theme,kind)=>{
 if(d.slug==='back-in-stock-whatsapp-alerts-setup')return `A back-in-stock alert answers an individual request. A launch broadcast is a separate marketing send. Use WhatFlow’s request queue for the first, and the [campaign builder](${links.campaign}) for the second if the recipients have agreed to marketing.`;
 if(d.slug==='ab-test-whatsapp-messages-small-list')return `If you run a manual split test, create separate opted-in audiences and keep the send time and offer consistent. WhatFlow’s recipient reports let you export delivery results for each broadcast. Use your Shopify tracking setup to compare purchases. This workflow does not require an automated A/B test feature. See the [campaign walkthrough](${links.campaign}).`;
 if(kind==='posts')return tracks[theme].copy;
 const checks=testByTheme[theme],question=checks[parseInt(uid(d.slug).slice(0,6),16)%checks.length];
 const context=d.slug.startsWith('whatflow-vs-')?`When testing WhatFlow and ${d.competitor}, ask: ${question}`:`One practical check: ${question}`;
 const tail={
 campaign:` In WhatFlow, test a Shopify customer or segment send, then try scheduling a separate Inbox broadcast from a spreadsheet or existing conversations. The [campaign walkthrough](${links.campaign}) shows the test send, reply handoff and recipient report.`,
 support:` In WhatFlow, use Needs reply and Closing soon, claim a conversation, then check Shopify order context and leave a private note. The [team inbox walkthrough](${links.support}) gives you a repeatable test for two agents, with no per-seat fee.`,
 catalog:` In WhatFlow, share a catalog item in the inbox and test the Shopify checkout link from a sample WhatsApp cart. The [catalog walkthrough](${links.catalog}) shows the steps and where Shopify verifies payment.`,
 storefront:` In WhatFlow, the storefront button can lead into a shared inbox with Shopify order context and catalog sharing. Try the [product recommendation workflow](${links.catalog}) after testing the click itself.`,
 automation:` WhatFlow has separate Shopify Flow blocks, API-triggered Inbox Workflows and in-chat WhatsApp forms. Try the [catalog cart workflow](${links.catalog}) if you need to connect a buyer reply with a Shopify action.`,
 platform:` Use the [campaign](${links.campaign}), [team inbox](${links.support}) and [catalog checkout](${links.catalog}) walkthroughs to evaluate the broader WhatFlow Business API workflow alongside recovery and notifications.`,
 }[theme];
 return context+tail;
};
for(const kind of ['posts','comparisons']){
 const live=JSON.parse(await fs.readFile(w+'/'+kind+'.json'));
 assert.equal(live.docs.length,live.totalDocs);
 for(const old of live.docs){
  const theme=selection[kind].get(old.slug);
  if(!theme){audit.push({kind,slug:old.slug,action:'unchanged',reason:'No new workflow needed for primary intent'});continue;}
  assert.equal(kind==='posts'?old.status:old._status,'published');
  const d=structuredClone(old);
  const n=d.content.root.children;
  const j=correctionSlugs.has(d.slug)?n.findIndex(x=>x.type==='paragraph'&&/(native Shopify|segment sync|audience sync).{0,100}coming soon/i.test(plain(x))):-1;
  let heading,mode;
  if(j>=0){n.splice(j,1,...append(sourceCorrection));heading='Audience capability clarification';mode='clarified';}
  else{
   const relevant=tracks[theme].heading;
   const heads=n.map((v,i)=>({i,title:v.type==='heading'?plain(v):''})).filter(x=>x.title);
   const best=heads.find(x=>relevant.test(x.title)&&/whatflow|shopify|support|catalog|broadcast|campaign|inbox|automation|checkout/i.test(x.title))??heads.find(x=>relevant.test(x.title));
   let idx=best?.i??-1;
   const end=heads.find(x=>x.i>idx)?.i??n.length;
   const candidates=n.slice(idx+1,end).map((v,i)=>({v,i:idx+1+i})).filter(x=>x.v.type==='paragraph');
   const anchor=candidates.find(x=>/whatflow/i.test(plain(x.v)))??candidates.at(-1);
   if(!anchor){audit.push({kind,slug:old.slug,action:'unchanged',reason:'No suitable placement'});continue;}
   n.splice(anchor.i+1,0,...append(copyFor(d,theme,kind)));heading=best?.title??'Opening';mode='expanded';
  }
  d.updatedAt=now;
  if(kind==='posts'){
   sql.push(`UPDATE posts SET content=${q(JSON.stringify(d.content))},updated_at=${q(now)} WHERE id=${Number(old.id)} AND slug=${q(old.slug)} AND status='published' AND updated_at=${q(old.updatedAt)};`);
   posts.push(d);
  }else{source.push(old);candidate.push(d);}
  audit.push({kind,slug:old.slug,theme,heading,action:mode});
 }
}
const covers=JSON.parse(await fs.readFile(root+'/covers.json'));
const fresh=[];
for(const f of await listMarkdown(root+'/new')){
 const slug=f.slice(0,-3);const {meta,body}=await readDoc(root+'/new/'+f);
 assert(!audit.some(x=>x.kind==='posts'&&x.slug===slug));
 assert(meta.metaTitle.length<=62&&meta.metaDescription.length<=160);
 assert(body.split(/\s+/).length>=440);
 const cover=covers.find(x=>x.slug===slug);
 assert(cover);
 const mediaUrl='/api/media/file/'+cover.filename;
 const content=bodyToLexical(body,slug);
 const {title,excerpt,category}=meta;
 const row={slug,title,excerpt,category,author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',reviewed_at:now,published_at:now,status:'published',featured:0,cover_image_url:null,cover_image_alt:cover.alt,cover_image_caption:'Illustrated WhatFlow guide cover.',content:JSON.stringify(content),seo_meta_title:meta.metaTitle,seo_meta_description:meta.metaDescription,created_at:now,updated_at:now};
 const media=[cover.filename,mediaUrl,'image/webp',cover.bytes,cover.width,cover.height,cover.alt,now,now].map(q).join(',');
 sql.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${media} WHERE NOT EXISTS(SELECT 1 FROM media WHERE filename=${q(cover.filename)});`);
 sql.push(`INSERT INTO posts (${Object.keys(row).join(',')},cover_image_id) SELECT ${Object.values(row).map(q).join(',')},(SELECT id FROM media WHERE filename=${q(cover.filename)}) WHERE NOT EXISTS(SELECT 1 FROM posts WHERE slug=${q(slug)});`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(slug)} AND created_at=${q(now)})`;
 const sources=[
  {title:'WhatFlow release history',url:'https://whatflow.tech/changelog',note:'Verified features and product release notes.'},
  {title:'WhatFlow Business API on Shopify',url:'https://apps.shopify.com/whatflow-official-api',note:'App listing and plan details.'},
  {title:'WhatsApp Business Messaging Policy',url:'https://business.whatsapp.com/policy',note:'Requirements for sending WhatsApp messages.'},
 ];
 for(const [table,fields,rows] of [['tags',['tag'],meta.tags.map(tag=>({tag}))],['sources',['title','url','note'],sources]]){
  rows.forEach((r,i)=>{
   const id=q(uid(slug+table+i));
   sql.push(`INSERT INTO posts_${table} (_order,_parent_id,id,${fields.join(',')}) SELECT ${i+1},${parent},${id},${fields.map(k=>q(r[k])).join(',')} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM posts_${table} WHERE id=${id});`);
  });
 }
 fresh.push({slug,title,content,cover:cover.filename});
}
for(const [f,v] of [['source-documents.json',source],['candidate-documents.json',candidate],['post-candidates.json',posts],['new-posts.json',fresh],['audit.json',audit]])await fs.writeFile(w+'/'+f,JSON.stringify(v,null,2)+'\n');
await fs.writeFile(w+'/update-posts.sql',sql.join('\n')+'\n');
console.log(JSON.stringify({audited:audit.length,updatedPosts:posts.length,updatedComparisons:candidate.length,newPosts:fresh.length,clarifications:audit.filter(x=>x.action==='clarified').length}));
