/** Read-only public release verification; no credentials or CMS writes. */
import {readFile,writeFile}from'node:fs/promises';
import assert from'node:assert/strict';
import {createHash}from'node:crypto';
const root='content/library-quality-2026-10-27',origin='https://whatflow.tech';
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
// Payload applies the collection's documented screenshot defaults on reads.
const defaults=v=>Array.isArray(v)?v.map(defaults):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,k==='relatedComparisons'&&Array.isArray(x)?x.map(d=>d&&typeof d==='object'?d.id:d):defaults(k==='fields'&&v.type==='block'&&x.blockType==='screenshot'?{width:1440,height:900,...x}:x)])):v;
const equal=(a,b)=>JSON.stringify(stable(defaults(a)))===JSON.stringify(stable(defaults(b)));
async function get(path,html=false){const response=await fetch(origin+path,{signal:AbortSignal.timeout(45000),headers:html?{Cookie:'whatflow_quality_probe=1'}:{}});assert.equal(response.status,200,path);return html?response.text():response.json();}
async function collection(name){let docs=[];for(let page=1;;page++){const data=await get(`/api/${name}?limit=100&depth=0&page=${page}`);docs.push(...data.docs);if(!data.hasNextPage)break;}return docs;}
const report={checkedAt:new Date().toISOString(),passed:false,collections:[],pages:[],assets:[]};
for(const name of ['posts','comparisons']){
 const before=JSON.parse(await readFile(`${root}/live-${name}.json`));const after=await collection(name);const candidates=JSON.parse(await readFile(`${root}/publication/${name}.json`));const bySlug=new Map(after.map(d=>[d.slug,d]));const selected=new Set(candidates.map(d=>d.slug));
 assert.equal(after.length,name==='posts'?61:106);
 for(const old of before)if(!selected.has(old.slug))assert(equal(old,bySlug.get(old.slug)),name+': untouched record changed '+old.slug);
 for(const candidate of candidates){const actual=bySlug.get(candidate.slug);assert(actual,candidate.slug);for(const field of Object.keys(candidate))if(field!=='id'||candidate.id)assert(equal({[field]:candidate[field]},{[field]:actual[field]}),candidate.slug+': field differs '+field);}
 report.collections.push({collection:name,count:after.length,verifiedCandidates:candidates.length,untouchedExisting:before.length-candidates.filter(d=>d.id).length});
 for(const candidate of candidates){
  const path=`/${name==='posts'?'blog':'compare'}/${candidate.slug}`;const html=await get(path,true);assert.equal((html.match(/<h1\b/g)||[]).length,1,path);assert(html.includes(`href="${origin+path}"`),path+': canonical missing');assert(!/name="robots"[^>]*content="[^"]*noindex/.test(html),path+': noindex');
  const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const article=scripts.find(d=>['Article','BlogPosting'].includes(d['@type']));assert(article,path+': missing article schema');assert.equal(article.dateModified,candidate.updatedAt);assert.equal(article.author.name,'Safwan Adnan');
  assert(!html.includes('+1-800-WHATFLOW')&&!html.includes('https://en.wikipedia.org/wiki/Shopify'),path+': stale organization claims');
  report.pages.push({path,status:200,oneH1:true,selfCanonical:true,indexable:true,modifiedTime:article.dateModified,sha256:createHash('sha256').update(html).digest('hex')});
 }
}
for(const path of ['/blog/product-proof/catalog-sync-controls.jpg','/blog/product-proof/return-reply-draft.jpg','/blog/product-proof/shipping-reply-draft.jpg','/blog/product-proof/theme-button-controls.jpg','/blog/product-proof/inbox-assignment-filters.jpg','/thumbnails/blog/shopify-whatsapp-catalog-support.webp','/thumbnails/blog/whatsapp-returns-exchanges-shopify.webp','/thumbnails/blog/whatsapp-shipping-delays-shopify.webp']){const r=await fetch(origin+path);assert.equal(r.status,200,path);const bytes=Buffer.from(await r.arrayBuffer());report.assets.push({path,status:200,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
const sitemap=await get('/sitemap.xml',true);for(const page of report.pages)assert(sitemap.includes(origin+page.path),'sitemap missing '+page.path);
const pricing=await get('/pricing',true);assert(pricing.includes('WhatFlow subtotal:')&&pricing.includes('Not included — rate unavailable'),'missing-rate estimate misleading');assert(!pricing.includes('POST /api/rates/sync'),'internal implementation instructions in pricing');
const llms=await get('/llms.txt',true);assert(!llms.includes('98%')&&!llms.includes('25%'),'unsupported result in machine summary');
report.payloadReadDefaults={screenshot:{width:1440,height:900},relationships:'compared by native IDs across API population depths'};report.passed=true;report.sitemapCoverage=true;report.missingRateEstimate='software subtotal, Meta excluded';await writeFile(root+'/publication/live-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
