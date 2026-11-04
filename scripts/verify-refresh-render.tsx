/** Render every refreshed post/comparison body with the site's RichText component and assert no text is dropped. */
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {RichText} from '../src/lib/RichText';
const root=process.env.RENDER_ROOT||'content/blog/refresh-2026-11-05/publication';
const docs=[...JSON.parse(await readFile(root+'/posts.json','utf8')),...JSON.parse(await readFile(root+'/candidate-documents.json','utf8')),...JSON.parse(await readFile(root+'/new-comparison-docs.json','utf8'))];
const decode=(s:string)=>s.replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const normal=(s:string)=>decode(s).replace(/\s+/g,' ').trim();
type N={type:string;text?:string;children?:N[];fields?:{blockType?:string;url?:string;buttonUrl?:string}};
let n=0,ctas=0,images=0,tables=0;
for(const doc of docs){
 const html=renderToStaticMarkup(<RichText content={doc.content}/>);
 const visible=normal(html.replace(/<[^>]*>/g,' '));
 const check=(node:N)=>{
  if(node.type==='text'&&node.text?.trim())assert(visible.includes(normal(node.text)),doc.slug+': dropped text '+node.text.slice(0,60));
  if(node.type==='table'){tables++;}
  if(node.type==='block'&&node.fields?.blockType==='screenshot'){images++;assert(html.includes(node.fields.url!),doc.slug+': missing screenshot');}
  if(node.type==='block'&&node.fields?.blockType==='cta'){ctas++;assert(html.includes('apps.shopify.com/whatflow-official-api'),doc.slug+': CTA not rendered');}
  for(const c of node.children||[])check(c);
 };
 check(doc.content.root);assert(!/<h1\b/.test(html),doc.slug+': H1 in body');n++;
}
console.log(JSON.stringify({passed:true,documents:n,ctas,images,tables}));
