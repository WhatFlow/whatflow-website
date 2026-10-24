/** Enhance a live Payload comparison snapshot; these exports are not runtime fallbacks. */
import {readFile,writeFile,stat} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
const root='content/comparisons/enhancement-2026-10-25';
const source=JSON.parse(await readFile(`${root}/source-documents.json`));
const docs=structuredClone(source);
const enhancements=(await Promise.all(['a','b','c'].map(async k=>JSON.parse(await readFile(`${root}/enhancements-${k}.json`))))).flat();
const research=(await Promise.all(['a','b','c'].map(async k=>JSON.parse(await readFile(`${root}/research-${k}.json`))))).flat();
const bySlug=new Map(enhancements.map(e=>[e.slug,e]));
if(docs.length!==106||bySlug.size!==106)throw Error('Expected106 unique comparison enhancements');
const t=value=>({type:'text',version:1,text:value,format:0,detail:0,mode:'normal',style:''});
const p=value=>({type:'paragraph',version:1,direction:'ltr',format:'',indent:0,textFormat:0,textStyle:'',children:typeof value==='string'?[t(value)]:value});
const h=value=>({type:'heading',version:1,tag:'h2',direction:'ltr',format:'',indent:0,children:[t(value)]});
const link=(label,url)=>({type:'link',version:3,direction:'ltr',format:'',indent:0,fields:{linkType:'custom',newTab:false,url},children:[t(label)]});
const list=items=>({type:'list',version:1,listType:'bullet',tag:'ul',start:1,direction:'ltr',format:'',indent:0,children:items.map((v,i)=>({type:'listitem',version:1,value:i+1,direction:'ltr',format:'',indent:0,children:[t(v)]}))});
const plain=n=>n.text??(n.children||[]).map(plain).join('');
const redundantStarts=[
 'I’m Safwan Adnan, co-founder and CEO of WhatFlow.',
 'We built WhatFlow so the first plan does not feel',
 'The team inbox has no seat fees. If the founder,',
 'Use the scenario above with controlled recipients',
 'Write down the intended audience, trigger, message and owner',
 'Start with the scenario in this guide and define what success',
 'For a Shopify merchant prioritizing affordable WhatsApp operations, I would start with WhatFlow:'
];
const now=new Date().toISOString();const changes=[];let trimmed=0;let inlineLinks=0;
const blogDocs=JSON.parse(await readFile('content/blog/enhancement-2026-10-25/source-documents.json'));
for(const d of docs){
 const e=bySlug.get(d.slug);if(!e)throw Error(d.slug);
 const applied=[];
 for(const correction of e.corrections||[]){
  if(!correction.find||typeof correction.replace!=='string'||!correction.reason||!correction.url)throw Error('Incomplete correction '+d.slug);
  let count=0;
  const replace=v=>{if(typeof v==='string'){if(v.includes(correction.find)){count++;return v.replaceAll(correction.find,correction.replace);}return v;}if(Array.isArray(v))return v.map(replace);if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,v])=>[k,['id','slug','publishedAt','createdAt','updatedAt','author','authorRole','relatedComparisons'].includes(k)?v:replace(v)]));return v;};
  Object.assign(d,replace(d));if(!count)throw Error(`Correction text not found ${d.slug}: ${correction.find}`);applied.push({...correction,matches:count});
  if(!d.sources.some(s=>s.url===correction.url)){const evidence=research.find(s=>s.url===correction.url);if(!evidence)throw Error('Unresearched correction source '+correction.url);d.sources.push({id:randomBytes(12).toString('hex'),title:evidence.title||`${d.competitor} primary documentation`,url:correction.url,note:correction.reason});}
 }
 const original=d.content.root.children;
 const headings=new Set(original.filter(n=>n.type==='heading').map(plain));const insert=new Map();
 const requested=[...e.contextualLinks,...e.sourceLinks,...(e.blogLink?[e.blogLink]:[])];
 for(const l of requested){
  if(!headings.has(l.afterHeading))throw Error(`${d.slug}: unknown heading ${l.afterHeading}`);
  let url=l.url;if(url?.startsWith('https://whatflow.tech/'))url=url.slice('https://whatflow.tech'.length);
  if(l.slug&&!url){if(!docs.some(p=>p.slug===l.slug))throw Error('Missing comparison '+l.slug);url=`/compare/${l.slug}`;}
  if(url?.startsWith('/blog/')&&!blogDocs.some(p=>url===`/blog/${p.slug}`))throw Error('Missing blog '+url);
  if(!url)throw Error('Missing link URL');
  if(url.startsWith('https:')&&!d.sources.some(s=>s.url===url)){
   const verified=research.find(s=>s.url===url);if(!verified)throw Error('Unresearched new source '+url);
   d.sources.push({id:randomBytes(12).toString('hex'),title:l.label||l.anchor,url,note:'Primary reference used for this comparison. See the source and research record for scope and limitations.'});
  }
  if(!insert.has(l.afterHeading))insert.set(l.afterHeading,[]);
  insert.get(l.afterHeading).push(p([t(l.sentenceBefore),link(l.anchor||l.label,url),t(l.sentenceAfter)]));inlineLinks++;
 }
 const body=[];let section=null;let sectionNodes=[];let kept=0;let exercisePlaced=false;
 const flush=()=>{if(section){const added=insert.get(section)||[];if(['What I would test before switching','A controlled test before launch'].includes(section)){body.push(h(e.practicalHeading),...e.practicalParagraphs.map(p),...sectionNodes,...added);exercisePlaced=true;}else if(kept)body.push(h(section),...sectionNodes,...added);else body.push(...added);insert.delete(section);}else body.push(...sectionNodes);sectionNodes=[];kept=0;};
 let removed=0;
 for(const n of original){if(n.type==='heading'){flush();section=plain(n);continue;}if(n.type==='paragraph'&&redundantStarts.some(s=>plain(n).startsWith(s))){removed++;continue;}sectionNodes.push(n);kept++;}flush();
 if(insert.size)throw Error('Unplaced link');
 if(!exercisePlaced)body.push(h(e.practicalHeading),...e.practicalParagraphs.map(p));
 body.push(h('Before you choose a platform'),list(e.checklist));
 body.push(h('About the author'),p([t('Safwan Adnan is co-founder and CEO of WhatFlow. This comparison explains our product’s fit and the alternative’s tradeoffs. '),link('About WhatFlow','/about'),t(' · '),link('Contact the team','/contact'),t(' with a question or correction.')]));
 d.content.root.children=[h('Key takeaways'),list(e.takeaways),...body];
 for(const u of e.tableUpdates||[]){const row=d.featureTable.find(r=>r.feature===u.feature);if(!row)throw Error('Unknown table feature '+u.feature);row.competitor=u.competitor;}
 d.verdict=e.verdict;d.seo={...d.seo,metaTitle:e.metaTitle,metaDescription:e.metaDescription};d.updatedAt=now;d.reviewedAt=now;
 if(d.imageUrl==='/comparisons/whatflow-template-editor.jpg')d.imageUrl='/blog/enhancement/whatflow-template-editor.webp';
 await stat('public'+d.imageUrl);
 // Normalize a generation-era typo in the brand name, without altering facts or URLs.
 const fix=n=>{if(n.type==='text')n.text=n.text.replaceAll('whatFlow','WhatFlow');for(const c of n.children||[])fix(c);};fix(d.content.root);
 trimmed+=removed;changes.push({slug:d.slug,boilerplateParagraphsRemoved:removed,corrections:applied,tableCellsUpdated:e.tableUpdates?.length||0,editorialChanges:e.changes});
}
// Each comparison must have an in-body incoming link, independent of directory cards.
const incoming=new Map(docs.map(d=>[d.slug,0]));
for(const e of enhancements)for(const l of e.contextualLinks){if(!incoming.has(l.slug))throw Error('Unknown target '+l.slug);incoming.set(l.slug,incoming.get(l.slug)+1);}
const used=new Set();const orphans=[...incoming].filter(([,n])=>!n).map(([slug])=>slug);
for(const slug of orphans){const target=docs.find(d=>d.slug===slug);let parent=docs.find(d=>d.category===target.category&&d.slug!==slug&&!used.has(d.slug));if(!parent)parent=docs.find(d=>d.slug!==slug&&!used.has(d.slug));used.add(parent.slug);const i=parent.content.root.children.findIndex(n=>n.type==='heading'&&plain(n)==='Before you choose a platform');parent.content.root.children.splice(i,0,p([t('For a related decision, compare '),link(target.competitor,`/compare/${target.slug}`),t(`: ${target.excerpt}`)]));}
for(const key of ['metaTitle','metaDescription'])if(new Set(docs.map(d=>d.seo[key])).size!==106)throw Error('Duplicate SEO '+key);
await writeFile(`${root}/candidate-documents.json`,JSON.stringify(docs,null,2));
await writeFile(`${root}/change-manifest.json`,JSON.stringify({generatedAt:now,posts:106,boilerplateParagraphsRemoved:trimmed,inlineLinks,contextualOrphansRepaired:orphans,changes,preserved:['id','slug','publishedAt','createdAt','author','authorRole','relatedComparisons','_status'],unchangedCollections:['posts']},null,2));
console.log(JSON.stringify({comparisons:docs.length,boilerplateParagraphsRemoved:trimmed,inlineLinks,orphansRepaired:orphans.length}));
