import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import articles,{estimate} from '../content/comparisons/expanded.mjs';
const base=process.env.COMPARISON_TEST_URL||'https://whatflow.tech';
const contentOnly=process.env.COMPARISON_CONTENT_ONLY==='true';
const get=async(path)=>{
 for(let attempt=1;attempt<=3;attempt++){
  try{
   const r=await fetch(base+path,{signal:AbortSignal.timeout(45000)});assert.equal(r.status,200,path);
   return new Response(await r.arrayBuffer(),{status:r.status,headers:r.headers});
  }catch(error){if(attempt===3)throw error;await new Promise(resolve=>setTimeout(resolve,750));}
 }
};
const docs=[];let page=1,more=true;
while(more){const data=await (await get(`/api/comparisons?limit=100&page=${page}`)).json();docs.push(...data.docs);more=data.hasNextPage;page++;}
assert(docs.length>=articles.length,'Expected the complete published library');
const expected=new Set(articles.map(a=>a.slug));
for(const a of articles){
 const doc=docs.find(d=>d.slug===a.slug);assert(doc,a.slug);
 assert.equal(doc._status,'published');assert.equal(doc.author,'Safwan Adnan');
 assert.equal(doc.title,a.title);assert.equal(doc.faqs.length,a.faqs.length);assert.equal(doc.featureTable.length,a.featureTable.length);
 const nodes=doc.content.root.children;
 const actualBody=nodes.flatMap(n=>n.children?.map(c=>c.text||'')||[]).join(' ');
 assert(actualBody.split(/\s+/).length>=600,a.slug+' has insufficient editorial content');
 assert(nodes.filter(n=>n.type==='heading').every(n=>!JSON.stringify(n).includes('\\n')),a.slug+' has malformed headings');
 assert.equal(doc.sources.length,a.sources.length,a.slug+' missing sources');
 assert.equal(doc.seo.noindex,false);
}
assert.equal(estimate(1000).total,4.99);assert.equal(estimate(5000).total,9.99);assert.equal(estimate(10000).total,29);assert.equal(estimate(40000).total,49.99);
const hidden=await (await get('/api/comparisons?draft=true&where%5B_status%5D%5Bequals%5D=draft')).json();
assert.equal(hidden.totalDocs,0,'Anonymous draft query must not expose drafts');
const sitemap=await (await get('/sitemap.xml')).text();
const directoryPages=Math.ceil(docs.length/24);
if(!contentOnly){
let directory='';
for(let n=1;n<=directoryPages;n++){
 const html=await (await get(n===1?'/compare':`/compare?page=${n}`)).text();directory+=html;
 assert(html.includes(`href="${base}/compare${n===1?'':`?page=${n}`}"`),'Directory canonical '+n);
}
for(const a of articles){assert(sitemap.includes(`/compare/${a.slug}`),a.slug+' absent from sitemap');assert(directory.includes(`/compare/${a.slug}`),a.slug+' absent from paginated library');}
const search=await (await get('/compare?q=Twilio')).text();assert(search.includes('/compare/whatflow-vs-twilio'));assert(search.includes('noindex'));
for(const category of ['channels','usecases']){const html=await (await get(`/compare?category=${category}`)).text();assert(html.includes(`category=${category}`));}
}
const queue=[...articles],results=[];
await Promise.all(Array.from({length:4},async()=>{while(queue.length){
 const a=queue.shift(),r=await get(`/compare/${a.slug}`),html=await r.text();
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
 const article=schemas.find(x=>x['@type']==='Article');assert(article,a.slug+' Article schema');
 assert.equal(article.author.name,'Safwan Adnan');assert.equal(article.mainEntityOfPage,`${base}/compare/${a.slug}`);
 assert(schemas.some(x=>x['@type']==='FAQPage'));assert(html.includes(`href="${base}/compare/${a.slug}"`));
 assert(html.includes('Sources and methodology'));assert(html.includes(a.imageUrl));
 assert(html.includes(a.sources[0].url.replaceAll('&','&amp;')));
 if(!contentOnly&&a.category==='channels')assert(html.includes('WhatsApp with WhatFlow'));
 results.push({slug:a.slug,status:r.status,bytes:html.length});expected.delete(a.slug);
 if(results.length%20===0)console.log(`Verified ${results.length}/${articles.length} article routes`);
}}));
assert.equal(expected.size,0);
for(const file of ['whatflow-template-editor.jpg','whatflow-cod-settings.jpg']){const r=await get(`/comparisons/${file}`);assert(r.headers.get('content-type')?.startsWith('image/'));}
assert.equal((await fetch(`${base}/compare/this-comparison-does-not-exist`)).status,404);
for(const a of articles)assert(sitemap.includes(`/compare/${a.slug}`),a.slug+' absent from sitemap');
const report={scope:contentOnly?'content and article routes':'full library',passed:results.length,published:docs.length,directoryPages,checks:['correct bylines','full content and arrays','pricing examples','draft protection','all routes','self canonicals','Article and FAQ schemas','primary sources','real demo images','complete sitemap','404',...(!contentOnly?['paginated directory','search','categories']:[])],results};
await writeFile('/tmp/whatflow-comparisons-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,results:undefined},null,2));
