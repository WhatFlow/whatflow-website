/** Offline: place verified demo captures against matching article sections; generate guarded CMS updates. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const root = 'content/engineering/demo-screenshot-coverage';
const work = process.env.SCREENSHOT_REFRESH_WORK;
if (!work) throw Error('Set SCREENSHOT_REFRESH_WORK to a folder with live posts.json and comparisons.json');
const manifest = JSON.parse(await fs.readFile(root + '/capture-manifest.json', 'utf8'));
const caps = manifest.map(m => ({...m, re: new RegExp(m.pattern, 'ig')}));
const plain = n => n.text ?? (n.children || []).map(plain).join(' ');
const isShot = n => n.type === 'block' && n.fields?.blockType === 'screenshot';
const count = (t, re) => [...t.matchAll(re)].length;
const digest = s => createHash('sha256').update(s).digest('hex').slice(0,24);
const q = s => "'" + String(s).replaceAll("'","''") + "'";
const date = new Date().toISOString();
const reuse = new Map();
const oldGeneric = /template-editor|inbox-assignment-filters|flow-triggers|flow-order-reply|flow-text-routing/;
const limits = {'billing-meta':10,'ai-connections':10,'inbox-mine-queue':14,'cod-checkout':12};
const published = {posts:[],comparisons:[]};
const changes = [];
const skipped = [];
const all = [];
for (const kind of ['posts','comparisons']){
 const data = JSON.parse(await fs.readFile(work+'/'+kind+'.json','utf8'));
 assert.equal(data.docs.length, data.totalDocs);
 for (const doc of data.docs){
  if ((kind==='posts' ? doc.status : doc._status)!=='published') continue;
  all.push({kind,doc});
 }
}
const headline = doc => (doc.title+' '+doc.slug.replaceAll('-',' '));
const candidates = ({kind,doc}) => {
 const nodes = doc.content?.root?.children ?? [];
 const title = headline(doc);
 const isLinkedOnly = /linked.device|chat automation/.test(title.toLowerCase()) && !/vs|business api|migrat/.test(title.toLowerCase());
 if (isLinkedOnly) return [];
 const sections = [{heading:'', start:0, end:nodes.length, text:''}];
 nodes.forEach((n,i)=>{
  if(n.type==='heading'){
   sections.at(-1).end=i;
   sections.push({heading:plain(n),start:i,end:nodes.length,text:''});
  }else if(n.type!=='block') sections.at(-1).text+=' '+plain(n);
 });
 const scoped = /whatflow|whatsapp|shopify flow/i.test(title);
 const opts = [];
 for (const m of caps){
  let best;
  for (const s of sections) {
   const th = count(title,m.re), hh = count(s.heading,m.re), bb = count(s.text,m.re);
   const firstParty = /whatflow|our (app|inbox|workflow|shopify)|business api/i.test(s.text+' '+s.heading);
   if (!bb&&!hh) continue;
   if (m.key==='ai-connections' && !/mcp|sidekick|whatflow.{0,100}(claude|chatgpt|cursor)|ai (replies|support|connect)/i.test(s.text+' '+s.heading)) continue;
   if (m.key==='billing-meta' && !th && !hh && !/meta (fees|charges)|whatflow (starter|free|billing)/i.test(s.text)) continue;
   if (m.key==='cod-checkout' && /confirmation|reply/.test(s.heading.toLowerCase()) &&
       !/checkout|shipping rate|payment method|cod rule/i.test(s.text)) continue;
   if (kind==='posts'&&!scoped&&!firstParty) continue;
   if (!firstParty&&!th&&!scoped) continue;
   // Words like "price" or "label" can describe other products. Require explicit
   // first-party/WhatsApp context when they are the only reason for selecting an image.
   if (!firstParty && !th && bb<2 && !hh) continue;
   const score = Math.min(th,2)*8 + Math.min(hh,2)*5 + Math.min(bb,4)*2 + (firstParty ? 5 : 0);
   if (score < (kind==='posts'?10:8)) continue;
   if(!best||score>best.score)best={m,s,score};
  }
  if(best)opts.push(best);
 }
 return opts;
};
// Give specialist guides first choice. Among similarly relevant assets, prefer
// the less-used view so dozens of comparisons do not repeat one panel.
const prepared = all.map(item=>({...item,opts:candidates(item)})).sort((a,b)=>
  Math.max(0,...b.opts.map(x=>x.score))-Math.max(0,...a.opts.map(x=>x.score)));
for (const {kind,doc,opts} of prepared){
 if(!opts.length){skipped.push({kind,slug:doc.slug,reason:'No verified capture matches a section closely enough'});continue;}
 const choices=opts.filter(({m})=>(reuse.get(m.key)||0)<(limits[m.key]??14))
   .sort((a,b)=>(b.score-(reuse.get(b.m.key)||0)*1.65)-(a.score-(reuse.get(a.m.key)||0)*1.65));
 if(!choices.length){skipped.push({kind,slug:doc.slug,reason:'No remaining strong match without repeating the same capture excessively'});continue;}
 const {m,s,score}=choices[0];
 if (score < Math.max(...opts.map(x=>x.score))-16) {
  skipped.push({kind,slug:doc.slug,reason:'Remaining captures do not match the main workflow closely enough'});continue;
 }
 const after=structuredClone(doc);
 const nodes=after.content.root.children;
 const beforeShots=nodes.filter(isShot).map(n=>n.fields.url);
 const oldNodes=nodes.filter(n=>!isShot(n));
 const sectionNodes=nodes.slice(s.start,s.end);
 // Insert after the first matching explanatory paragraph. Place inside the
 // selected section even if none of its individual paragraphs matches (e.g. table).
 const anchor=sectionNodes.find(n=>n.type==='paragraph'&&count(plain(n),m.re)>0)
     ?? sectionNodes.find(n=>n.type==='paragraph') ?? sectionNodes.at(-1);
 if(!anchor){skipped.push({kind,slug:doc.slug,reason:'No suitable insertion point'});continue;}
 const newBlock={type:'block',version:2,format:'',fields:{id:digest(doc.slug+m.filename),blockType:'screenshot',url:m.url,alt:m.alt,caption:m.caption,width:m.width,height:m.height}};
 // Remove generic repetitive shots; preserve purpose-built images and any
 // non-screenshot nodes in place. Do not alter titles, bylines, covers or text.
 nodes.splice(nodes.indexOf(anchor)+1,0,newBlock);
 after.content.root.children=nodes.filter(n=>!isShot(n)||n===newBlock||!oldGeneric.test(n.fields.url));
 assert.deepEqual(after.content.root.children.filter(n=>!isShot(n)),oldNodes);
 after.updatedAt=date;
 const retained=after.content.root.children.filter(isShot).map(n=>n.fields.url);
 changes.push({kind,slug:doc.slug,asset:m.key,section:s.heading||'Opening',score,removed:beforeShots.filter(u=>!retained.includes(u)),priorImages:beforeShots.length});
 reuse.set(m.key,(reuse.get(m.key)||0)+1);
 published[kind].push({doc,after});
}
const stmts=[];
for(const m of manifest){
 assert.match(m.filename,/^whatflow-demo-2026-11-08-[a-z0-9-]+\.webp$/);
 const vals=[m.filename,m.url,'image/webp',m.bytes,m.width,m.height,m.alt,date,date].map(x=>typeof x==='number'?String(x):q(x));
 stmts.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${vals.join(',')} WHERE NOT EXISTS(SELECT 1 FROM media WHERE filename=${q(m.filename)});`);
}
const postSql=published.posts.map(({doc,after})=>{
 assert(Number.isSafeInteger(doc.id));
 return `UPDATE posts SET content=${q(JSON.stringify(after.content))},updated_at=${q(date)} WHERE id=${doc.id} AND slug=${q(doc.slug)} AND status='published' AND updated_at=${q(doc.updatedAt)};`;
});
for(const [file,value] of [
 ['media.sql',stmts.join('\n')+'\n'],['posts.sql',postSql.join('\n')+'\n'],
 ['post-candidates.json',JSON.stringify(published.posts.map(x=>x.after))],
 ['source-documents.json',JSON.stringify(published.comparisons.map(x=>x.doc))],
 ['candidate-documents.json',JSON.stringify(published.comparisons.map(x=>x.after))],
 ['new-comparison-docs.json','[]'],
 ['plan.json',JSON.stringify({capturedAssets:manifest.length,updatedPosts:published.posts.length,updatedComparisons:published.comparisons.length,usage:Object.fromEntries(reuse),changes,skipped},null,2)+'\n']
])await fs.writeFile(work+'/'+file,value);
console.log(JSON.stringify({total:all.length,posts:published.posts.length,comparisons:published.comparisons.length,skipped:skipped.length,assetsUsed:reuse.size,topReuse:[...reuse.entries()].sort((a,b)=>b[1]-a[1]).slice(0,6)}));
