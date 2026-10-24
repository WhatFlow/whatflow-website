import assert from 'node:assert/strict';
import articles,{plans,estimate} from '../content/comparisons/expanded.mjs';
assert.equal(articles.length,106);assert.equal(new Set(articles.map(a=>a.slug)).size,106);
const words=[];
for(const a of articles){
 const count=a.body.split(/\s+/).length;words.push(count);assert(count>=600,a.slug);
 assert.equal(a.author,'Safwan Adnan');assert(!/Safwan Adna\b/.test(JSON.stringify(a)));
 assert(a.sources.length>=2);for(const s of a.sources)assert.equal(new URL(s.url).protocol,'https:');
 assert(a.featureTable.length>=4);assert(a.faqs.length>=4);for(const faq of a.faqs){assert.equal(typeof faq.question,"string");assert.equal(typeof faq.answer,"string");}
 assert(/no seat fees|no-seat-fee|no seat charges|seat charge|without seat|no inbox seat|no-seat-fee/i.test(JSON.stringify(a)),a.slug);
 assert(!/98%|10x|cheapest in|upsell is/.test(a.body),a.slug);
}
for(const [sends,total]of [[0,0],[100,0],[1000,4.99],[2000,4.99],[5000,9.99],[10000,29],[20000,29],[40000,49.99],[75000,99],[100000,136.5]])assert.equal(estimate(sends).total,total);
assert.equal(plans.length,6);
console.log(JSON.stringify({articles:articles.length,providers:articles.filter(a=>a.slug.startsWith('whatflow-vs-')).length,channelGuides:articles.filter(a=>a.category==='channels').length,workflowGuides:articles.filter(a=>a.category==='usecases').length,words:words.reduce((a,b)=>a+b,0),minimumWords:Math.min(...words),maximumWords:Math.max(...words)},null,2));
