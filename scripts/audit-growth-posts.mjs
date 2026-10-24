import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import articles from '../content/blog/growth/index.mjs';
import discovery from '../content/blog/judgeme-coverage.mjs';
import {readFile} from 'node:fs/promises';
const liveInventory=JSON.parse(await readFile(new URL('../content/blog/judgeme-live-inventory.json',import.meta.url),'utf8'));
const bodyAudit=JSON.parse(await readFile(new URL('../content/blog/judgeme-article-audit.json',import.meta.url),'utf8'));
assert.equal(articles.length,52);
assert.equal(new Set(articles.map(a=>a.slug)).size,articles.length);
assert.equal(new Set(articles.map(a=>a.title)).size,articles.length);
const categories={};const seenParagraphs=new Map();const duplicates=[];let words=0;
for(const a of articles){
 const count=a.body.trim().split(/\s+/).length;words+=count;
 assert(count>=550,`${a.slug}: incomplete article`);
 assert(a.excerpt.length<=160,`${a.slug}: long excerpt ${a.excerpt.length}`);
 assert(a.faqs.length>=2&&a.sources.length>=2,a.slug);
 assert.equal(a.author,'Safwan Adnan');
 assert.equal(a.authorRole,'Co-founder and CEO of WhatFlow');
 assert(a.sources.every(s=>s.url.startsWith('https://')),a.slug);
 assert(!/\b(?:guaranteed rankings|guaranteed conversion|14.day free trial|10,000\+ Shopify merchants)\b/i.test(a.body),a.slug);
 for(const p of a.body.trim().split(/\n\s*\n/).filter(p=>!p.startsWith('## '))){
  const normalized=p.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
  if(seenParagraphs.has(normalized))duplicates.push({first:seenParagraphs.get(normalized),second:a.slug});
  seenParagraphs.set(normalized,a.slug);
 }
 categories[a.category]=(categories[a.category]||0)+1;
}
assert.equal(duplicates.length,0,'Exact duplicate body paragraphs');
const ngrams=s=>{const w=s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);return new Set(w.slice(0,-6).map((_,i)=>w.slice(i,i+7).join(' ')));};
const grams=articles.map(a=>ngrams(a.body));const overlap=[];
for(let i=0;i<articles.length;i++)for(let j=i+1;j<articles.length;j++){
 const shared=[...grams[i]].filter(g=>grams[j].has(g)).length/Math.min(grams[i].size,grams[j].size);
 if(shared>.1)overlap.push({a:articles[i].slug,b:articles[j].slug,sharedSevenWordPhrases:shared});
 assert(shared<.3,`Excessive body overlap ${articles[i].slug} / ${articles[j].slug}`);
}
const report={checkedAt:new Date().toISOString(),articles:articles.length,bodyWords:words,categories,duplicateBodyParagraphs:duplicates,overlap,judgeMeInventory:{mainIndexComplete:liveInventory.paginationExhausted,observedArticleCards:liveInventory.articles.length,bodiesRead:bodyAudit.articles.filter(a=>a.status==='read').length,allBodiesRead:false,limitation:discovery.limitation}};
await writeFile('/tmp/whatflow-growth-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
