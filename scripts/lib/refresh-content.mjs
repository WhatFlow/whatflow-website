/** Shared parsing/validation for the November 2026 blog and comparison refresh. Offline only. */
import {readFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {markdownToLexical} from '../build-quality-content.mjs';

export const CTA_MARKER='<!-- CTA -->';
export const CATEGORIES=['reviews','conversion','retention','whatsapp','operations','seo','guides','tips','updates','shopify'];
export const BANNED=['delve','landscape','leverage','robust','seamless','unlock','empower','elevate','game-changer','game changer',"in today's",'it’s important to note',"it's important to note",'it’s worth noting',"it's worth noting",'crucial','pivotal','foster','holistic','synergy','tapestry','realm','ever-evolving','at the end of the day','look no further','supercharge','in conclusion','in summary','when it comes to'];
export const uid=value=>createHash('sha256').update(value).digest('hex').slice(0,24);

export async function readDoc(path){
 const source=await readFile(path,'utf8');
 const m=source.match(/^---\n([\s\S]*?)\n---\n/);
 if(!m)throw Error(`${path}: missing frontmatter`);
 let meta;try{meta=JSON.parse(m[1]);}catch(e){throw Error(`${path}: invalid JSON frontmatter: ${e.message}`);}
 return {meta,body:source.slice(m[0].length).trim()};
}

export async function listMarkdown(dir){
 try{return (await readdir(dir)).filter(f=>f.endsWith('.md')).sort();}catch{return [];}
}

export function ctaBlock(slug){
 return {type:'block',version:2,format:'',fields:{id:uid('cta-'+slug),blockType:'cta',heading:'Run WhatsApp for your Shopify store with WhatFlow',description:'Templates, COD confirmation, Shopify Flow automations and a shared team inbox with no seat fees. Every feature is included on every plan, including Free.',buttonText:'Install WhatFlow free',buttonUrl:'https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=merchant_guides',badge:'Free plan available',style:'green'}};
}

/** Convert a body with an optional CTA marker into Lexical. */
export function bodyToLexical(body,slug,{allowCta=true}={}){
 const parts=body.split(CTA_MARKER);
 if(parts.length>2)throw Error(`${slug}: more than one CTA marker`);
 if(!allowCta&&parts.length>1)throw Error(`${slug}: CTA marker not allowed`);
 const children=[];
 parts.forEach((part,i)=>{
  if(i>0)children.push(ctaBlock(slug));
  if(part.trim())children.push(...markdownToLexical(part).root.children);
 });
 if(allowCta&&parts.length===1)children.push(ctaBlock(slug));
 return {root:{type:'root',version:1,direction:'ltr',format:'',indent:0,children}};
}

export function plainText(markdown){
 return markdown.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[#>*_`|-]/g,' ');
}

/** Returns {errors,warnings,stats} for one document. */
export async function checkDoc({meta,body},{kind,slug,linkable,root='.'}){
 const errors=[],warnings=[];
 const isComp=kind==='comparison'||kind==='newcomparison';
 const need=kind==='newcomparison'?['title','slug','competitor','competitorUrl','category','excerpt','verdict','metaTitle','metaDescription','featureTable','faqs','sources']:kind==='comparison'?['id','title','slug','excerpt','verdict','metaTitle','metaDescription','featureTable','faqs','sources']:['title','slug','category','excerpt','metaTitle','metaDescription','tags','faqs','sources'];
 for(const k of need)if(meta[k]===undefined||meta[k]===null||meta[k]==='')errors.push(`missing ${k}`);
 if(meta.slug!==slug)errors.push(`slug mismatch ${meta.slug}`);
 if(!isComp&&!CATEGORIES.includes(meta.category))errors.push(`bad category ${meta.category}`);
 const len=(k,max,min=0)=>{const n=(meta[k]||'').length;if(n>max)warnings.push(`${k} ${n} chars > ${max}`);if(n<min)warnings.push(`${k} ${n} chars < ${min}`);};
 len('metaTitle',62);len('metaDescription',160,110);len('excerpt',160);len('title',80);
 if(!isComp){
  if(!Array.isArray(meta.tags)||meta.tags.length<2)warnings.push('few tags');
  if(!Array.isArray(meta.faqs)||meta.faqs.length<3)warnings.push(`faqs ${meta.faqs?.length}`);
  const ctas=body.split(CTA_MARKER).length-1;if(ctas!==1)warnings.push(`CTA markers: ${ctas}`);
 }else if(body.includes(CTA_MARKER))errors.push('CTA marker in comparison');
 for(const f of meta.faqs||[])if(!f.question||!f.answer)errors.push('empty faq');
 for(const s of meta.sources||[]){if(!/^https:\/\//.test(s.url||''))errors.push(`bad source url ${s.url}`);if(!s.title)errors.push('source missing title');}
 if(/^# /m.test(body))errors.push('H1 in body');
 if(/<(?!!-- CTA -->)[a-z!/]/i.test(body.replaceAll(CTA_MARKER,'')))errors.push('raw HTML in body');
 if(/judge\.me\/blog/i.test(body))errors.push('links to Judge.me blog');
 // links
 const internal=[...body.matchAll(/\]\((\/[^)\s]*)(?:\s+"[^"]*")?\)/g)].map(m=>m[1]);
 const links=internal.filter(u=>!/\.(webp|jpg|png)$/.test(u));
 for(const u of links){const p=u.split('#')[0].replace(/\/$/,'');if(!linkable.has(p))errors.push(`unknown internal link ${u}`);}
 if(!isComp&&links.length<3)warnings.push(`only ${links.length} internal links`);
 // Media-library images live in R2 (see scripts/build-media-migration-sql.mjs); only public/ files can be checked offline.
 for(const u of internal.filter(u=>/\.(webp|jpe?g|png|svg)$/.test(u)&&!u.startsWith('/api/media/file/'))){try{await stat(root+'/public'+u);}catch{errors.push(`missing image ${u}`);}}
 // voice
 const text=plainText(body).toLowerCase();
 const words=text.split(/\s+/).filter(Boolean).length;
 const banned=BANNED.filter(w=>text.includes(w.toLowerCase())||(meta.title||'').toLowerCase().includes(w));
 if(banned.length)warnings.push(`banned: ${banned.join(', ')}`);
 const dashes=(body.match(/—/g)||[]).length;
 if(dashes>Math.max(3,words/250))warnings.push(`em-dashes ${dashes} in ${words} words`);
 if(/\b3\.9\b|\b336 reviews|\b332 reviews|\b51 reviews/.test(body+JSON.stringify(meta)))errors.push('stale rating figure');
 if(/\b5[58] ratings|5\.0\/5 from 5[58] |5\.0 out of 5 from 5[58] |331 ratings/.test(body+JSON.stringify(meta)))errors.push('stale WhatFlow Business API rating (now 4.9/5 from 59 ratings, Nov 11 2026)');
 if(/whatflow\.tech\//i.test(body+JSON.stringify(meta)))errors.push('links the old whatflow.tech domain');
 if(/72[- ]hour (free entry|FEP)|free entry[^.]{0,40}72[- ]hours?/i.test(body.replace(/"72 hours"[^.]*older/gi,'')+JSON.stringify(meta)))errors.push('free entry point window is now up to 7 days');
 if(/\]\(\/contact\b/.test(body))errors.push('/contact does not exist');
 if(/\bAI (reply|replies|chatbot|agent|assistant)\b/i.test(body)&&/whatflow('s)? (ai|has ai|includes ai)/i.test(body))warnings.push('possible AI feature claim');
 // conversion
 try{bodyToLexical(body,slug,{allowCta:!isComp});}catch(e){errors.push('markdown: '+e.message);}
 return {errors,warnings,stats:{words,links:links.length,faqs:meta.faqs?.length||0,dashes}};
}

export async function linkableSet(root='.'){
 const s=await readFile(root+'/'+(process.env.REFRESH_ROOT||'content/blog/refresh-2026-11-05')+'/SLUGS.md','utf8');
 return new Set([...s.matchAll(/^- (\/[^\s]+)/gm)].map(m=>m[1]));
}
