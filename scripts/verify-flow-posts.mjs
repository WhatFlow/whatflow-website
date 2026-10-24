import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {posts,screenshots} from '../content/blog/shopify-flow.mjs';

const base=process.env.VERIFY_SITE_URL||'https://whatflow.tech';
const get=async path=>{
 for(let attempt=0;attempt<3;attempt++){
  try{
   const response=await fetch(base+path,{signal:AbortSignal.timeout(45000)});
   assert.equal(response.status,200,path);
   return new Response(await response.arrayBuffer(),{status:response.status,headers:response.headers});
  }catch(error){if(attempt===2)throw error;}
 }
};
const publicPosts=await (await get('/api/posts?limit=100&depth=0')).json();
assert.equal(publicPosts.totalDocs,58);
const results=[];
for(const post of posts){
 const document=publicPosts.docs.find(doc=>doc.slug===post.slug);
 assert(document,post.slug);
 assert.equal(document.status,'published');
 assert.equal(document.author,'Safwan Adnan');
 assert.equal(document.authorRole,'Co-founder and CEO of WhatFlow');
 assert.equal(document.faqs.length,post.faqs.length);
 assert.equal(document.sources.length,post.sources.length);
 const html=await (await get('/blog/'+post.slug)).text();
 assert(html.includes(`rel="canonical" href="${base}/blog/${post.slug}"`));
 assert(!/name="robots" content="[^"]*noindex/.test(html));
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
 const article=schemas.find(schema=>schema['@type']==='BlogPosting');
 assert.equal(article.headline,post.title);
 assert.equal(article.author.name,'Safwan Adnan');
 assert.equal(article.author.jobTitle,'Co-founder and CEO of WhatFlow');
 assert(schemas.some(schema=>schema['@type']==='FAQPage'));
 assert(html.includes('Explore WhatFlow on Shopify'));
 for(const source of post.sources)assert(html.includes(source.url));
 for(const key of new Set([post.cover,...post.sections.filter(section=>section.kind==='screenshot').map(section=>section.key)])){
  assert(html.includes(screenshots[key].filename),`${post.slug}: missing ${key}`);
 }
 results.push({slug:post.slug,canonical:true,author:true,articleSchema:true,faqSchema:true,screenshots:true});
}
for(const screenshot of Object.values(screenshots)){
 const response=await get('/blog/shopify-flow/'+screenshot.filename);
 assert(response.headers.get('content-type')?.includes('image/jpeg'));
 const bytes=new Uint8Array(await response.arrayBuffer());
 assert(bytes.length>10000);
 assert.equal(bytes[0],0xff);assert.equal(bytes[1],0xd8);
}
for(const path of ['/sitemap.xml','/blog/rss.xml']){
 const html=await (await get(path)).text();
 for(const post of posts)assert(html.includes('/blog/'+post.slug),path+': '+post.slug);
}
const directory=await (await get('/blog?category=guides')).text();
for(const post of posts)assert(directory.includes('/blog/'+post.slug));
const comparisons=await (await get('/api/comparisons?depth=0&limit=1')).json();
assert.equal(comparisons.totalDocs,106);
const report={checkedAt:new Date().toISOString(),publishedFlowGuides:posts.length,totalPublicPosts:publicPosts.totalDocs,screenshots:Object.keys(screenshots).length,comparisons:comparisons.totalDocs,results};
await writeFile('/tmp/whatflow-flow-live-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
