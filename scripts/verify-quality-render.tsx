/** Validate the exact native CMS bodies before any remote publication. */
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {RichText} from '../src/lib/RichText';
const root='content/library-quality-2026-10-27';
const docs=[...JSON.parse(await readFile(root+'/publication/posts.json','utf8')),...JSON.parse(await readFile(root+'/publication/comparisons.json','utf8'))];
const decode=(s:string)=>s.replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const normal=(s:string)=>decode(s).replace(/\s+/g,' ').trim();
type ContentNode={type:string;text?:string;children?:ContentNode[];fields?:{blockType?:string;url?:string}};
const report=[];
await mkdir('/tmp/whatflow-quality-native-render',{recursive:true});
for(const doc of docs){
 const html=renderToStaticMarkup(<RichText content={doc.content}/>);
 const visible=normal(html.replace(/<[^>]*>/g,''));
 let textNodes=0,tables=0,images=0;
 function check(node:ContentNode){
  if(node.type==='text'&&node.text?.trim()){assert(visible.includes(normal(node.text)),doc.slug+': dropped text '+node.text.slice(0,60));textNodes++;}
  if(node.type==='table'){assert(html.includes('lexical-table'),doc.slug+': missing table');tables++;}
  if(node.type==='block'&&node.fields?.blockType==='screenshot'){assert(node.fields.url&&html.includes(node.fields.url),doc.slug+': missing screenshot');images++;}
  for(const child of node.children||[])check(child);
 }
 check(doc.content.root);assert(!/<h1\b/.test(html),doc.slug+': duplicate H1');
 await writeFile('/tmp/whatflow-quality-native-render/'+doc.slug+'.html',html);
 report.push({slug:doc.slug,textNodes,tables,images,passed:true});
}
await writeFile(root+'/publication/native-render-verification.json',JSON.stringify({passed:true,articles:report},null,2));console.log(JSON.stringify({passed:true,articles:report.length,nativeTables:report.reduce((n,r)=>n+r.tables,0),nativeScreenshots:report.reduce((n,r)=>n+r.images,0)}));
