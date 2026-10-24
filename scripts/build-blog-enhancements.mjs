/** Enhance a verified snapshot of native Payload posts; never a runtime fallback. */
import {readFile,writeFile,stat} from 'node:fs/promises';
const root='content/blog/enhancement-2026-10-25';
const docs=JSON.parse(await readFile(`${root}/source-documents.json`,'utf8'));
const enhancements=(await Promise.all(['a','b','flow'].map(async k=>JSON.parse(await readFile(`${root}/enhancements-${k}.json`,'utf8'))))).flat();
const bySlug=new Map(enhancements.map(e=>[e.slug,e]));
if(docs.length!==58||bySlug.size!==58)throw Error('Expected exactly58 unique enhancements');
const text=t=>({type:'text',version:1,text:t,format:0,detail:0,mode:'normal',style:''});
const paragraph=t=>({type:'paragraph',version:1,direction:'ltr',format:'',indent:0,textFormat:0,textStyle:'',children:typeof t==='string'?[text(t)]:t});
const heading=t=>({type:'heading',version:1,tag:'h2',direction:'ltr',format:'',indent:0,children:[text(t)]});
const link=(label,url)=>({type:'link',version:3,direction:'ltr',format:'',indent:0,fields:{linkType:'custom',newTab:false,url},children:[text(label)]});
const list=items=>({type:'list',version:1,listType:'bullet',tag:'ul',start:1,direction:'ltr',format:'',indent:0,children:items.map((t,i)=>({type:'listitem',version:1,value:i+1,direction:'ltr',format:'',indent:0,children:[text(t)]}))});
const plain=n=>n.text??(n.children||[]).map(plain).join('');
const now=new Date().toISOString();
let normalized=0;let links=0;
const covers={
 reviews:['/blog/enhancement/judge-me-widgets-demo.webp','Judge.me widget settings inside the WhatFlow demo store','Judge.me widget configuration in the WhatFlow demo store. This setup view has no live theme embed enabled; ratings in the widget cards are interface examples.'],
 seo:['/blog/enhancement/shopify-product-search-demo.webp','Search engine listing fields for a Shopify demo product','Shopify search-engine listing fields for a demo product. This editor preview does not demonstrate a Google ranking or rich result.'],
 operations:['/blog/enhancement/whatflow-flow-order-reply.webp','WhatFlow WhatsApp order reply trigger and condition in Shopify Flow','An inactive workflow in the WhatFlow demo store illustrates order-reply configuration. No customer messages or order changes were made.'],
 default:['/blog/enhancement/whatflow-template-editor.webp','WhatFlow WhatsApp message template configuration in Shopify admin','WhatFlow template editor in the demo store. Sample message data illustrates configuration, not a completed send or measured campaign outcome.']
};
for(const p of docs){
 const e=bySlug.get(p.slug);if(!e)throw Error(p.slug);
 const original=p.content.root.children.flatMap(n=>{
  if(n.type==='heading'&&plain(n).includes('\n')){normalized++;const [title,...rest]=plain(n).split('\n');return [heading(title.trim()),paragraph(rest.join(' ').trim())];}return [n];
 });
 const headings=new Set(original.filter(n=>n.type==='heading').map(plain));
 const insert=new Map();
 for(const l of [...e.contextualLinks,...e.sourceLinks]){
  if(!headings.has(l.afterHeading))throw Error(`${p.slug}: missing heading ${l.afterHeading}`);
  if(l.slug&&!docs.some(d=>d.slug===l.slug))throw Error('Missing destination');
  if(l.url&&!p.sources.some(s=>s.url===l.url))throw Error('Unverified new source');
  const n=paragraph([text(l.sentenceBefore),link(l.anchor||l.label,l.slug?`/blog/${l.slug}`:l.url),text(l.sentenceAfter)]);
  if(!insert.has(l.afterHeading))insert.set(l.afterHeading,[]);insert.get(l.afterHeading).push(n);links++;
 }
 const body=[];let section=null;
 const flush=()=>{if(section&&insert.has(section)){body.push(...insert.get(section));insert.delete(section);}};
 for(const n of original){if(n.type==='heading'){flush();section=plain(n);}if(n.type==='block'){flush();section=null;}body.push(n);}flush();
 const extra=[heading(e.practicalHeading),...e.practicalParagraphs.map(paragraph),heading('Before you put this into practice'),list(e.checklist)];
 const relatedIndex=body.findIndex(n=>n.type==='heading'&&/^(Related guides|Continue building)/.test(plain(n)));
 body.splice(relatedIndex<0?body.length:relatedIndex,0,...extra);
 body.push(heading('About the author'),paragraph('Safwan Adnan is co-founder and CEO of WhatFlow. This guide is published by WhatFlow and includes its product where relevant. Worked examples are illustrative unless a caption identifies an actual demo-store configuration; they are not merchant performance results.'),paragraph([text('Learn more '),link('about WhatFlow','/about'),text(' or '),link('contact our team','/contact'),text(' with a question or correction.')]));
 p.content.root.children=[paragraph(e.answer),heading('Key takeaways'),list(e.takeaways),...body];
 p.seo={...p.seo,metaTitle:e.metaTitle,metaDescription:e.metaDescription};
 p.reviewedAt=now;p.updatedAt=now;
 if(!p.coverImageUrl&&!p.coverImage?.url){[p.coverImageUrl,p.coverImageAlt,p.coverImageCaption]=covers[p.category]||covers.default;}
 await stat(`public${p.coverImageUrl||p.coverImage.url}`);
}
// A contextual incoming link should not depend on a sidebar or directory index.
const incoming=new Map(docs.map(p=>[p.slug,0]));
for(const e of enhancements)for(const l of e.contextualLinks)incoming.set(l.slug,incoming.get(l.slug)+1);
const orphans=[...incoming].filter(([,count])=>!count).map(([slug])=>slug);
const usedParents=new Set();
for(const slug of orphans){const target=docs.find(p=>p.slug===slug);const parent=docs.find(p=>p.category===target.category&&p.slug!==slug&&!usedParents.has(p.slug));if(!parent)throw Error('No contextual parent');
 usedParents.add(parent.slug);
 const i=parent.content.root.children.findIndex(n=>n.type==='heading'&&plain(n)==='Before you put this into practice');
 parent.content.root.children.splice(i,0,paragraph([text(`${target.excerpt} Read `),link(target.title,`/blog/${slug}`),text('.') ]));}
await writeFile(`${root}/candidate-documents.json`,JSON.stringify(docs,null,2));
await writeFile(`${root}/change-manifest.json`,JSON.stringify({generatedAt:now,posts:58,normalizedHeadings:normalized,inlineLinks:links,contextualOrphansRepaired:orphans,unchangedCollections:['comparisons'],preserved:['id','slug','publishedAt','createdAt','author','authorRole','status','faqs','sources','tags']},null,2));
console.log(JSON.stringify({posts:docs.length,normalizedHeadings:normalized,orphansRepaired:orphans.length}));
