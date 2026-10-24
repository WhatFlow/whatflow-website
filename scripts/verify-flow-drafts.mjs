import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {posts} from '../content/blog/shopify-flow.mjs';
const base=process.env.VERIFY_SITE_URL||'https://whatflow.tech';
const results=[];
const request=async path=>{
 for(let attempt=0;attempt<3;attempt++){
  try{return await fetch(`${base}${path}`,{signal:AbortSignal.timeout(45000)});}catch(error){if(attempt===2)throw error;}
 }
};
for(const path of ['/api/posts?limit=100&depth=0','/api/posts?where[status][equals]=draft&depth=0']){
 const response=await request(path);assert.equal(response.status,200,path);
 const data=await response.json();assert.ok(Array.isArray(data.docs));
 for(const post of posts)assert.ok(!data.docs.some(d=>d.slug===post.slug),`Draft leaked in API ${post.slug}`);
 results.push({path,status:response.status,draftsExcluded:true});
}
for(let index=0;index<posts.length;index+=2){
 const batch=await Promise.all(posts.slice(index,index+2).map(async post=>{
  const response=await request(`/blog/${post.slug}`);const body=await response.text();
  // Next.js can stream notFound() after headers, producing a 200 soft 404.
  assert([200,404].includes(response.status),post.slug);
  assert(body.includes('noindex') && body.toLowerCase().includes('not found'),post.slug);
  assert(!body.includes(post.sections[0].paragraphs[0]),`Draft body leaked: ${post.slug}`);
  return {path:`/blog/${post.slug}`,status:response.status,notFound:true,noindex:true,draftBodyExcluded:true};
 }));results.push(...batch);
}
for(const path of ['/blog/rss.xml','/sitemap.xml']){
 const response=await request(path);assert.equal(response.status,200,path);const body=await response.text();
 for(const post of posts)assert.ok(!body.includes(`/blog/${post.slug}`),`Draft indexed in ${path}`);
 results.push({path,status:response.status,draftsExcluded:true});
}
const comparison=await request('/api/comparisons?depth=0&limit=1');assert.equal(comparison.status,200);const data=await comparison.json();assert.equal(data.totalDocs,106);
results.push({path:'/api/comparisons',publishedDocuments:data.totalDocs});
await writeFile('/tmp/whatflow-flow-drafts-verification.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2));
console.log(JSON.stringify({passed:results.length,posts:posts.length,comparisons:data.totalDocs}));
