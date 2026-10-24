/** Read-only verification of the actual published Payload documents and native pages. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const root='content/thumbnails-2026-10-25';
const base=process.env.VERIFY_SITE_URL||'https://whatflow.tech';
async function get(path){for(let attempt=0;;attempt++){try{const r=await fetch(new URL(path,base),{signal:AbortSignal.timeout(45000)});assert.equal(r.status,200,path);return r;}catch(e){if(attempt>=2)throw e;await new Promise(r=>setTimeout(r,2000));}}}
async function collection(name){const docs=[];for(let page=1;;page++){const data=await(await get(`/api/${name}?limit=50&depth=0&page=${page}`)).json();docs.push(...data.docs);if(!data.hasNextPage)break;assert(data.docs.length);}return docs;}
const groups=[{collection:'posts',route:'blog',root:'content/blog/thumbnails-2026-10-25',cover:'coverImageUrl',fields:['content','seo','coverImageUrl','coverImageAlt','coverImageCaption','reviewedAt'],preserved:['title','slug','author','authorRole','publishedAt','createdAt','faqs','sources','tags','status','category'],schema:'BlogPosting'},
{collection:'comparisons',route:'compare',root:'content/comparisons/whatsapp-first-2026-10-25',cover:'imageUrl',fields:['content','verdict','seo','featureTable','faqs','sources','imageUrl','imageAlt','imageCaption','reviewedAt'],preserved:['title','slug','author','authorRole','publishedAt','createdAt','relatedComparisons','_status','category'],schema:'Article'}];
const manifest=JSON.parse(await readFile(root+'/manifest.json'));const results=[];
for(const group of groups){
 const wanted=JSON.parse(await readFile(group.root+'/candidate-documents.json'));const before=JSON.parse(await readFile(group.root+'/source-documents.json'));const live=await collection(group.collection);assert.equal(live.length,wanted.length);
 const queue=[...wanted];await Promise.all(Array.from({length:2},async()=>{while(queue.length){const d=queue.shift();const actual=live.find(p=>p.slug===d.slug);const old=before.find(p=>p.slug===d.slug);assert(actual,d.slug);
 for(const k of group.fields)assert.deepEqual(actual[k],d[k],`${d.slug} ${k}`);
 for(const k of group.preserved)assert.deepEqual(actual[k],old[k],`${d.slug} preserved ${k}`);
 const html=await(await get(`/${group.route}/${d.slug}`)).text();
 assert(html.includes(`rel="canonical" href="${base}/${group.route}/${d.slug}"`),d.slug+' canonical');
 const cover=new URL(d[group.cover],base).href;
 assert(html.includes(`property="og:image" content="${cover}"`),d.slug+' OG');assert(html.includes(`name="twitter:image" content="${cover}"`),d.slug+' Twitter');
 assert(!/name="robots" content="[^"]*noindex/.test(html));assert(html.includes('Key takeaways'));assert(html.includes('About the author'));
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));const article=schemas.find(s=>s['@type']===group.schema);assert(article,d.slug+' schema');assert.equal(article.author.name,'Safwan Adnan');assert.equal(article.datePublished,old.publishedAt);assert.equal(article.dateModified,d.updatedAt);assert(schemas.some(s=>s['@type']==='BreadcrumbList'));assert.equal(article.publisher['@type'],'Organization');
 for(const source of d.sources||[])assert(html.includes(source.url),d.slug+' source');
 const record=manifest.records.find(r=>r.slug===d.slug);assert(record);const response=await get(record.url);assert(response.headers.get('content-type')?.includes('image/webp'));const bytes=Buffer.from(await response.arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256,d.slug+' cover bytes');const meta=await sharp(bytes).metadata();assert.equal(meta.width,1200);assert.equal(meta.height,630);
 results.push({slug:d.slug,collection:group.collection,nativeCMS:true,preservedFields:true,schema:true,socialCover:true,coverHash:true});
 }}));
}
assert.equal(new Set(manifest.records.map(r=>r.url)).size,164);
const sitemap=await(await get('/sitemap.xml')).text();for(const g of groups)for(const d of JSON.parse(await readFile(g.root+'/candidate-documents.json')))assert(sitemap.includes(`/${g.route}/${d.slug}`));
for(const path of ['/blog?q=Shopify+Flow+triggers','/blog?q=customer+reply+handoff','/compare?q=no+seat+fee','/compare?q=Wati']){const html=await(await get(path)).text();assert(!html.includes('No matching comparisons'),path);assert(!html.includes('No matching articles'),path);assert(html.includes('role="status"'),path);assert(html.includes('noindex'),path);assert(path.startsWith('/blog') ? /class="font-display[^"]*"/.test(html)&&html.includes('READ MORE') : /<article\b/.test(html),path+' results');}
const categorySearch=await(await get('/compare?q=seat&category=support')).text();assert(categorySearch.includes('q=seat'));assert(/<article\b/.test(categorySearch));
const noResults=await(await get('/compare?q=zzzznonexistentquery73191')).text();assert(noResults.includes('No matching comparisons'));
const drafts=await(await get('/api/comparisons?draft=true&where%5B_status%5D%5Bequals%5D=draft')).json();assert.equal(drafts.totalDocs,0);
assert.equal((await fetch(base+'/compare/nonexistent-thumbnail-release-check')).status,404);
const report={checkedAt:new Date().toISOString(),site:base,passed:results.length,uniqueCovers:164,dimensions:'1200×630',sitemap:true,multiwordBodySearch:true,categorySearch:true,emptySearch:true,draftProtection:true,results};await writeFile(root+'/live-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify({...report,results:undefined}));
