import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import articles from '../content/blog/growth/index.mjs';
const base=process.env.VERIFY_SITE_URL||'https://whatflow.tech';
const get=async path=>{for(let attempt=1;attempt<=3;attempt++){try{const r=await fetch(base+path,{signal:AbortSignal.timeout(45000)});assert.equal(r.status,200,path);return new Response(await r.arrayBuffer(),{status:r.status,headers:r.headers});}catch(error){if(attempt===3)throw error;await new Promise(resolve=>setTimeout(resolve,1000));}}};
const docs=[];let page=1,more=true;
while(more){const data=await (await get(`/api/posts?limit=100&depth=0&page=${page}`)).json();docs.push(...data.docs);more=data.hasNextPage;page++;}
for(const article of articles){const doc=docs.find(d=>d.slug===article.slug);assert(doc,article.slug);assert.equal(doc.status,'published');assert.equal(doc.author,'Safwan Adnan');assert.equal(doc.authorRole,'Co-founder and CEO of WhatFlow');assert.equal(doc.category,article.category);assert.equal(doc.faqs.length,article.faqs.length);assert.equal(doc.sources.length,article.sources.length);}
const sitemap=await (await get('/sitemap.xml')).text();const rss=await (await get('/blog/rss.xml')).text();
for(const article of articles){assert(sitemap.includes(`/blog/${article.slug}`),`Sitemap ${article.slug}`);}
assert.equal((rss.match(/<item>/g)||[]).length,Math.min(docs.length,50),'RSS latest article count');
let directory='';
for(let p=1;p<=Math.ceil(docs.length/12);p++){const html=await (await get(p===1?'/blog':`/blog?page=${p}`)).text();directory+=html;assert(html.includes(`rel="canonical" href="${base}/blog${p===1?'':`?page=${p}`}"`));}
for(const article of articles)assert(directory.includes(`/blog/${article.slug}`),`Directory ${article.slug}`);
for(const category of new Set(articles.map(a=>a.category))){let html='';const members=articles.filter(a=>a.category===category);for(let page=1;page<=Math.ceil(members.length/12);page++)html+=await (await get(`/blog?category=${category}${page>1?`&page=${page}`:''}`)).text();for(const article of members)assert(html.includes(`/blog/${article.slug}`),`Category ${article.slug}`);}
const search=await (await get('/blog?q=replenishment')).text();assert(search.includes('/blog/replenishment-reminders-shopify-consumables'));assert(/name="robots" content="[^"]*noindex/.test(search));
const queue=[...articles],results=[];
await Promise.all(Array.from({length:3},async()=>{while(queue.length){const a=queue.shift();const html=await (await get(`/blog/${a.slug}`)).text();
 assert(html.includes(`rel="canonical" href="${base}/blog/${a.slug}"`),a.slug);
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const post=schemas.find(s=>s['@type']==='BlogPosting');assert(post,a.slug);assert.equal(post.headline,a.title);assert.equal(post.author.name,'Safwan Adnan');assert.equal(post.author.jobTitle,'Co-founder and CEO of WhatFlow');
 assert.equal(post.citation.length,a.sources.length);assert(schemas.some(s=>s['@type']==='FAQPage'),a.slug);
 for(const source of a.sources)assert(html.includes(source.url),`Missing source ${a.slug}`);
 assert(html.includes('Explore WhatFlow on Shopify'),a.slug);
 assert(!html.includes('14-day free trial'),a.slug);
 const body=html.replace(/<[^>]*>/g,' ');assert(body.includes('Safwan Adnan'),a.slug);
 results.push({slug:a.slug,canonical:true,articleSchema:true,faqSchema:true,author:true,sources:a.sources.length});
 }}));
const report={checkedAt:new Date().toISOString(),publishedArticles:articles.length,totalPublicPosts:docs.length,directory:true,categories:true,search:true,rss:true,sitemap:true,results};
await writeFile('/tmp/whatflow-growth-live-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({publishedArticles:articles.length,passedRoutes:results.length,directory:true,categories:true,search:true,rss:true,sitemap:true}));
