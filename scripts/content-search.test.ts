import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearch,rankContent,searchPublishedContent} from '../src/lib/content-search';
import {getPosts} from '../src/lib/payload-api';
import {getComparisons} from '../src/lib/comparisons-api';

const body=(value:string)=>({root:{children:[{type:'paragraph',children:[{type:'text',text:value}]}]}});
test('matches words across title, body, FAQs and tags and ranks the exact title first',()=>{
 const docs=[{title:'Shopify setup',slug:'setup',content:body('Flow supports triggers'),tags:[{tag:'retention'}],faqs:[{question:'Replies?',answer:'An inbox handoff.'}]},{title:'Shopify Flow triggers',slug:'flow',content:body('Build a workflow')}];
 assert.deepEqual(rankContent(docs,'SHOPIFY Flow triggers').map(d=>d.slug),['flow','setup']);
 assert.equal(rankContent(docs,'retention handoff')[0].slug,'setup');
 assert.equal(rankContent(docs,'Flow unicorn').length,0);
});
test('normalizes punctuation and accents without discarding non-English words',()=>{
 assert.equal(normalizeSearch('  Judge.me — Café  '),'judge me cafe');
 assert.equal(normalizeSearch('اردو WhatsApp'),'اردو whatsapp');
 assert.equal(rankContent([{title:'Judge.me reviews',slug:'reviews'}],'judge me').length,1);
});
test('searches later CMS pages before paginating results and clamps stale page numbers',async()=>{
 const calls:number[]=[];
 const result=await searchPublishedContent({query:'inbox',page:99,limit:1,fetchPage:async page=>{calls.push(page);return {docs:[{title:page===1?'First article':'Inbox guide',slug:String(page)}],hasNextPage:page===1};}});
 assert.deepEqual(calls,[1,2]);assert.equal(result.totalDocs,1);assert.equal(result.page,1);assert.equal(result.docs[0].slug,'2');assert.equal(result.hasNextPage,false);
});
test('empty matches and broken pagination do not invent results or loop forever',async()=>{
 const result=await searchPublishedContent({query:'absent',page:1,limit:12,fetchPage:async()=>({docs:[{title:'Guide',slug:'guide'}],hasNextPage:false})});
 assert.equal(result.totalDocs,0);assert.deepEqual(result.docs,[]);
 await assert.rejects(searchPublishedContent({query:'x',page:1,limit:12,fetchPage:async()=>({docs:[],hasNextPage:true})}),/did not advance/);
});
test('blog and comparison searches retain published/category filters and use bounded shared CMS pages',async()=>{
 const original=globalThis.fetch;const requests:URL[]=[];
 globalThis.fetch=async input=>{const url=new URL(String(input));requests.push(url);return new Response(JSON.stringify({docs:[{title:'Shopify workflows',slug:'workflow',content:body('Flow trigger inbox')}],hasNextPage:false}),{headers:{'content-type':'application/json'}});};
 try{
  assert.equal((await getPosts({q:'Flow trigger',category:'whatsapp',limit:12})).docs.length,1);
  assert.equal((await getComparisons({query:'Flow inbox',category:'api',limit:24})).docs.length,1);
  assert.equal(requests[0].searchParams.get('where[status][equals]'),'published');
  assert.equal(requests[1].searchParams.get('where[_status][equals]'),'published');
  assert.equal(requests[0].searchParams.get('where[category][equals]'),'whatsapp');
  assert.equal(requests[1].searchParams.get('where[category][equals]'),'api');
  for(const u of requests){assert.equal(u.searchParams.get('limit'),'50');assert.equal(u.searchParams.get('page'),'1');assert(!u.search.includes('[contains]'));}
 }finally{globalThis.fetch=original;}
});
