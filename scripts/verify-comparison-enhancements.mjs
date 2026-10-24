import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=process.env.COMPARISON_ENHANCEMENT_ROOT||'content/comparisons/enhancement-2026-10-25';
const candidates=JSON.parse(await readFile(root+'/candidate-documents.json'));
const before=JSON.parse(await readFile(root+'/source-documents.json'));
const protectedBlogs=JSON.parse(await readFile(root+'/protected-blog-hashes.json'));
const base=process.env.VERIFY_SITE_URL||'https://whatflow.tech';
const get=async path=>{for(let n=0;n<3;n++){try{const r=await fetch(base+path,{signal:AbortSignal.timeout(45000)});assert.equal(r.status,200,path);return r;}catch(e){if(n===2)throw e;}}};
const docs=[];for(let page=1;;page++){const j=await(await get(`/api/comparisons?limit=100&depth=0&page=${page}`)).json();docs.push(...j.docs);if(!j.hasNextPage)break;}
assert.equal(docs.length,106);
const blogs=await(await get('/api/posts?limit=100&depth=0')).json();assert.equal(blogs.totalDocs,58);
for(const p of blogs.docs){const expected=protectedBlogs.find(d=>d.id===p.id);assert(expected);assert.equal(createHash('sha256').update(JSON.stringify(p)).digest('hex'),expected.sha256,'Blog changed '+p.slug);}
const drafts=await(await get('/api/comparisons?draft=true&where%5B_status%5D%5Bequals%5D=draft')).json();assert.equal(drafts.totalDocs,0,'Anonymous draft exposure');
const q=[...candidates],results=[],assets=new Set();
await Promise.all(Array.from({length:3},async()=>{while(q.length){const p=q.shift(),actual=docs.find(d=>d.id===p.id),prior=before.find(d=>d.id===p.id);assert(actual,p.slug);
 for(const key of ['content','verdict','seo','featureTable','faqs','sources','imageUrl','imageCaption','reviewedAt'])assert.deepEqual(actual[key],p[key],p.slug+' '+key);
 for(const key of ['slug','author','authorRole','publishedAt','createdAt','relatedComparisons','_status'])assert.deepEqual(actual[key],prior[key],p.slug+' preserved '+key);
 let html='';for(let a=0;a<4;a++){html=await(await get('/compare/'+p.slug)).text();if(html.includes('Key takeaways')&&html.includes(p.seo.metaTitle.replaceAll('&','&amp;')))break;await new Promise(r=>setTimeout(r,3000));}
 assert(html.includes('Key takeaways'),p.slug+' new content');assert(html.includes('Before you choose a platform'));assert(html.includes('About the author'));
 assert(html.includes(`rel="canonical" href="${base}/compare/${p.slug}"`),p.slug+' canonical');
 assert(html.includes(`property="og:image" content="${new URL(p.imageUrl,base).href}"`),p.slug+' social cover');
 assert(html.includes('aria-labelledby="comparison-title"'));assert(html.includes('tabindex="0"'));assert(!/name="robots" content="[^"]*noindex/.test(html));
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const article=schemas.find(s=>s['@type']==='Article');assert(article);assert.equal(article.author.name,'Safwan Adnan');assert.equal(article.datePublished,publishedDate(prior));assert.equal(article.dateModified,p.updatedAt);assert(schemas.some(s=>s['@type']==='FAQPage'));assert(schemas.some(s=>s['@type']==='BreadcrumbList'));assert.equal(article.citation.length,p.sources.length);assets.add(p.imageUrl);
 results.push({slug:p.slug,nativeCMS:true,byline:true,datesPreserved:true,metadata:true,schemas:true,cover:true});
}}));
function publishedDate(p){return p.publishedAt;}
for(const a of assets){const r=await get(a);assert(r.headers.get('content-type')?.startsWith('image/'));assert((await r.arrayBuffer()).byteLength>10000);}
const sitemap=await(await get('/sitemap.xml')).text();for(const p of candidates)assert(sitemap.includes('/compare/'+p.slug));
let directory='';for(let page=1;page<=5;page++)directory+=await(await get('/compare'+(page>1?'?page='+page:''))).text();for(const p of candidates)assert(directory.includes('/compare/'+p.slug));
const search=await(await get('/compare?q=Wati')).text();assert(search.includes('/compare/whatflow-vs-wati'));assert(search.includes('noindex'));
assert.equal((await fetch(base+'/compare/unknown-comparison-enhancement-test')).status,404);
const report={checkedAt:new Date().toISOString(),comparisons:106,passed:results.length,blogsPreserved:58,assets:assets.size,sitemap:true,directory:true,search:true,draftProtection:true,results};
await writeFile(root+'/publication-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({...report,results:undefined}));
