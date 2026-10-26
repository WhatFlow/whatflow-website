/** Offline preparation of audited Markdown for native Payload; never runtime fallback. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {marked} from 'marked';
import {fileURLToPath} from 'node:url';
const root='content/library-quality-2026-10-27';
const outputRoot=process.env.QUALITY_OUTPUT_ROOT||root+'/publication';
const base={version:1,direction:'ltr',format:'',indent:0};
const decode=value=>String(value).replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&(amp|quot|apos|lt|gt);/g,(_,n)=>({amp:'&',quot:'"',apos:"'",lt:'<',gt:'>'}[n]));
const text=(value,format=0)=>({type:'text',version:1,text:decode(value),format,detail:0,mode:'normal',style:''});
const uid=value=>createHash('sha256').update(value).digest('hex').slice(0,24);
const link=(label,url)=>({type:'link',...base,version:3,fields:{linkType:'custom',newTab:false,url},children:[text(label)]});
function inline(tokens=[],format=0){return tokens.flatMap(t=>{
 if(t.type==='strong')return inline(t.tokens,format|1);
 if(t.type==='em')return inline(t.tokens,format|2);
 if(t.type==='codespan')return [text(t.text,format|16)];
 if(t.type==='br')return [{type:'linebreak',version:1}];
 if(t.type==='link'){if(!/^(https?:|mailto:|\/|#)/.test(t.href)||t.href.startsWith('//'))throw Error('Unsafe link');return [{...link('',t.href),children:inline(t.tokens,format)}];}
 if(t.type==='text'||t.type==='escape')return t.tokens?inline(t.tokens,format):[text(t.text,format)];
 if(t.type==='image')throw Error('Images must occupy their own paragraph');
 throw Error('Unsupported inline Markdown: '+t.type);
 });}
const para=children=>({type:'paragraph',...base,textFormat:0,textStyle:'',children});
export function markdownToLexical(markdown){
 function blocks(tokens){return tokens.flatMap(t=>{
  if(t.type==='space')return [];
  if(t.type==='heading')return t.depth===1?[]:[{type:'heading',...base,tag:'h'+t.depth,children:inline(t.tokens)}];
  if(t.type==='paragraph'||t.type==='text'){
   if(t.tokens?.length===1&&t.tokens[0].type==='image'){
    const i=t.tokens[0]; if(/^[a-z0-9-]+\.(jpg|webp|png)$/.test(i.href)) i.href='/blog/product-proof/'+i.href; if(!i.href.startsWith('/')||i.href.startsWith('//'))throw Error('Only owned screenshot assets');
    return [{type:'block',version:2,format:'',fields:{id:uid(i.href+i.text),blockType:'screenshot',url:i.href,alt:i.text,caption:i.title||'',sourceUrl:''}}];
   }return [para(inline(t.tokens||marked.Lexer.lexInline(t.text)))];
  }
  if(t.type==='blockquote')return blocks(t.tokens).map(n=>n.type==='paragraph'?{...n,type:'quote'}:n);
  if(t.type==='list')return [{type:'list',...base,listType:t.ordered?'number':'bullet',tag:t.ordered?'ol':'ul',start:t.start||1,children:t.items.map((item,i)=>({type:'listitem',...base,value:i+1,children:blocks(item.tokens).flatMap(n=>n.type==='paragraph'?n.children:[n])}))}];
  if(t.type==='table')return [{type:'table',...base,children:[t.header,...t.rows].map((row,index)=>({type:'tablerow',...base,children:row.map(cell=>({type:'tablecell',...base,headerState:index===0?1:0,colSpan:1,rowSpan:1,children:[para(inline(cell.tokens))]}))}))}];
  throw Error('Unsupported block Markdown: '+t.type);
 });}
 return {root:{type:'root',...base,children:blocks(marked.lexer(markdown))}};
}
export function frontmatter(source){
 const match=source.match(/^---\n([\s\S]*?)\n---\n/);if(!match)throw Error('Missing frontmatter');
 const meta={};for(const line of match[1].split('\n')){const m=line.match(/^(\w+):\s*(.+)$/);if(!m)throw Error('Unsupported frontmatter');meta[m[1]]=JSON.parse(m[2]);}
 return {meta,body:source.slice(match[0].length)};
}
async function build(){
 const now=new Date().toISOString(),postBefore=JSON.parse(await readFile(root+'/live-posts.json')),compBefore=JSON.parse(await readFile(root+'/live-comparisons.json'));
 const covers=JSON.parse(await readFile(root+'/covers/manifest.json')).records;
 const posts=[];
 for(const cover of covers){
  const {meta,body}=frontmatter(await readFile(`${root}/new-guides/${cover.slug}/${cover.slug}.md`,'utf8'));
  if(postBefore.some(p=>p.slug===cover.slug))throw Error('New slug exists');
  const sources=[...new Map([...body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)].filter(m=>!new URL(m[2]).hostname.endsWith('whatflow.tech')).map(m=>[m[2],{id:uid(cover.slug+m[2]),title:m[1],url:m[2],note:'Primary documentation checked October 27, 2026.'}])).values()];
  posts.push({slug:cover.slug,title:meta.title,excerpt:meta.description,category:'guides',author:'Safwan Adnan',authorRole:'Co-founder and CEO of WhatFlow',publishedAt:now,reviewedAt:now,createdAt:now,updatedAt:now,status:'published',featured:false,coverImageUrl:cover.url,coverImageAlt:meta.og_image_alt,coverImageCaption:'Original WhatFlow illustrated guide cover.',content:markdownToLexical(body),seo:{metaTitle:meta.title,metaDescription:meta.description},tags:meta.tags.map(tag=>({id:uid(cover.slug+tag),tag})),faqs:[],sources});
 }
 const comparisons=[];
 const overrides=JSON.parse(await readFile(root+'/comparison-overrides.json')); 
 for(const slug of ['wati','interakt','zoko','dondy','bitespeed','aisensy','respond-io','gorgias']){
  const key='whatflow-vs-'+slug;
  const path=`${root}/comparisons/${key}/${key}.md`;
  const {meta,body}=frontmatter(await readFile(path,'utf8'));
  const old=compBefore.find(d=>d.slug===key);if(!old)throw Error('Missing comparison');
  const doc=structuredClone(old);doc.title=meta.title;doc.excerpt=meta.description;doc.seo={...doc.seo,metaTitle:meta.title,metaDescription:meta.description};doc.content=markdownToLexical(body);doc.updatedAt=now;doc.reviewedAt=now;
  // Add newly verified citations while preserving existing source UUIDs/history.
  for(const m of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g))if(!new URL(m[2]).hostname.endsWith('whatflow.tech')&&!doc.sources.some(s=>s.url===m[2]))doc.sources.push({id:uid(key+m[2]),title:m[1],url:m[2],note:'Official provider documentation checked October 27, 2026.'});
  const correction=overrides[key];
  if(correction){
   if(correction.verdict)doc.verdict=correction.verdict;
   for(const row of doc.featureTable){
    if(row.feature==='Pricing and billing units')row.competitor=correction.pricing;
    if(row.feature==='Team access'&&correction.team)row.competitor=correction.team;
    if(row.feature==='Feature access'&&correction.features)row.competitor=correction.features;
    if(row.feature==='Ownership and announced direction'&&correction.ownership)row.competitor=correction.ownership;
   }
   for(const faq of doc.faqs){
    if(faq.question.startsWith('How should I compare')&&faq.question.includes('pricing'))faq.answer=correction.pricingFaq||correction.pricing;
    if(faq.question.startsWith('Was Dondy acquired')&&correction.acquisitionFaq)faq.answer=correction.acquisitionFaq;
   }
   for(const source of doc.sources)if(source.note?.includes('Replace a generic pricing instruction'))source.note='Verifies tier-dependent agent allowances, usage charges and custom-flow pricing.';
  }
  comparisons.push(doc);
 }
 // Explicit availability boundaries on existing segmentation articles.
 const boundary='Native Shopify customer-segment/audience sync is upcoming in WhatFlow and is not currently available. Select recipients through the supported customer-selection or messaging workflow you use today; do not assume Shopify segments continuously synchronize into the inbox.';
 const post=structuredClone(postBefore.find(p=>p.slug==='whatsapp-campaign-segmentation-shopify'));
 post.content.root.children.splice(1,0,para([text(boundary)]));post.updatedAt=now;posts.push(post);
 const comp=structuredClone(compBefore.find(p=>p.slug==='whatsapp-customer-segments-vs-generic-bulk-sending'));
 comp.content.root.children.splice(1,0,para([text(boundary)]));comp.updatedAt=now;comparisons.push(comp);
 await mkdir(outputRoot,{recursive:true});
 await writeFile(outputRoot+'/posts.json',JSON.stringify(posts,null,2));await writeFile(outputRoot+'/comparisons.json',JSON.stringify(comparisons,null,2));
 console.log(JSON.stringify({newPosts:3,updatedPosts:1,updatedComparisons:comparisons.length,preparedAt:now}));
}
if(process.argv[1]===fileURLToPath(import.meta.url))await build();
