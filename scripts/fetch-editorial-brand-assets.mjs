/** Retrieve only original marks declared by official pages/listings. No guessed logo URLs. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {execFileSync} from 'node:child_process';
const root='content/thumbnails-2026-10-25';
const additional=process.argv.includes('--additional');
const research=JSON.parse(await readFile(process.env.EDITORIAL_BRAND_RESEARCH||root+(additional?'/brand-research-additional.json':'/brand-research.json')));
const editorial=JSON.parse(await readFile(root+'/editorial.json'));
await mkdir('public/thumbnails/brands',{recursive:true});
const assets=additional?JSON.parse(await readFile(root+'/brand-assets.json')):{},results=[];
const attr=(tag,name)=>tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`,'i'))?.[2]?.replaceAll('&amp;','&');
async function get(url){const u=new URL(url);if(u.protocol!=='https:'||u.username||u.password)throw Error('Unexpected URL');const r=await fetch(u,{signal:AbortSignal.timeout(18000)});if(!r.ok)throw Error(`HTTP ${r.status}`);return r;}
async function save(brand,url,source){
 const response=await get(url);const original=Buffer.from(await response.arrayBuffer());if(original.length>5000000)throw Error('Oversized logo');
 const type=response.headers.get('content-type')||'';
 if(type.includes('svg')||original.subarray(0,300).toString().includes('<svg')){
  const svg=original.toString();
  if(/<!DOCTYPE|<!ENTITY|<script|<foreignObject|(?:href|src)\s*=\s*["'](?:https?:|file:|\/)|url\(\s*["']?(?:https?:|file:|\/)/i.test(svg))throw Error('SVG has external/active references');
 }
 let decoded=original;
 if(original.readUInt32LE(0)===0x00010000)decoded=execFileSync('/tmp/whatflow-blog-runtime/bin/python',['-c','import sys,io;from PIL import Image; im=Image.open(io.BytesIO(sys.stdin.buffer.read()));im=im.ico.getimage(max(im.ico.sizes())) if hasattr(im,"ico") else im;im.save(sys.stdout.buffer,format="PNG")'],{input:original,maxBuffer:6000000});
 const sourceImage=sharp(decoded,{limitInputPixels:16000000});const meta=await sourceImage.metadata();
 if(!meta.width||!meta.height||Math.max(meta.width,meta.height)<32)throw Error('Logo too small');
 const bytes=await sourceImage.trim().resize(256,256,{fit:'inside'}).png().toBuffer();
 const key=brand.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');const path=`public/thumbnails/brands/${key}.png`;await writeFile(path,bytes);
 assets[brand]={path,source,assetURL:url,verified:true,sha256:createHash('sha256').update(bytes).digest('hex'),sourceWidth:meta.width,sourceHeight:meta.height};
}
const queue=research.filter(r=>r.slug&&!r.brand?.startsWith('WhatFlow'));
await Promise.all(Array.from({length:4},async()=>{while(queue.length){
 const r=queue.shift();const brand=editorial.find(e=>e.slug===r.slug)?.secondaryBrandLabel||r.brand;if(!brand||assets[brand])continue;
 const candidates=[];if(r.assetURL&&!/\.zip(?:\?|$)/i.test(r.assetURL))candidates.push({url:r.assetURL,source:r.officialURL});
 let htmlError;
 if(!candidates.length){
  try{
   const source=r.officialURL||r.providerURL;const response=await get(source);const html=await response.text();
   if(new URL(source).hostname==='apps.shopify.com'){
    // Related-app icons occur later in this page. Match the primary app's named image.
    const image=[...html.matchAll(/<img\b[^>]*>/gi)].map(m=>m[0]).find(tag=>(attr(tag,'alt')||'').toLowerCase().includes(r.brand.toLowerCase()));
    const icon=image&&attr(image,'src');if(icon)candidates.push({url:new URL(icon,response.url).href,source});
   }else{
    const links=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
    const ordered=links.filter(t=>/apple-touch-icon/i.test(attr(t,'rel')||'')).concat(links.filter(t=>/^(?:shortcut )?icon$/i.test(attr(t,'rel')||'')));
    for(const tag of ordered){const href=attr(tag,'href');if(href)candidates.push({url:new URL(href,response.url).href,source});}
    for(const match of html.matchAll(/<img\b[^>]*>/gi)){const tag=match[0];if(!/logo/i.test((attr(tag,'alt')||'')+' '+(attr(tag,'class')||'')+' '+(attr(tag,'src')||'')))continue;const src=attr(tag,'src');if(src)candidates.push({url:new URL(src,response.url).href,source});if(candidates.length>=8)break;}
   }
  }catch(e){htmlError=e.message;}
 }
 const errors=[];
 for(const c of candidates.slice(0,8)){try{await save(brand,c.url,c.source);break;}catch(e){errors.push(e.message);}}
 results.push({brand,slug:r.slug,verified:Boolean(assets[brand]),...(assets[brand]?{asset:assets[brand]}:{fallback:'Ordinary brand name with a clearly thematic illustration; no invented mark',errors,htmlError})});
 console.log(JSON.stringify({brand,verified:Boolean(assets[brand])}));
}}));
await writeFile(root+'/brand-assets.json',JSON.stringify(assets,null,2));await writeFile(root+(additional?'/brand-fetch-additional-results.json':'/brand-fetch-results.json'),JSON.stringify(results,null,2));
console.log(JSON.stringify({verifiedOriginalMarks:Object.keys(assets).length,fallbacks:results.filter(r=>!r.verified).length}));
