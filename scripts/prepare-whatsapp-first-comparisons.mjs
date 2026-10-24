/** Prepare reviewable copy revisions; fresh visual assignments are required before publication. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const root='content/comparisons/whatsapp-first-2026-10-25';
const source=JSON.parse(await readFile(root+'/source-documents.json'));
const proposals=(await Promise.all(['a','b'].map(async k=>JSON.parse(await readFile(`${root}/editorial-${k}.json`))))).flat();
const edits=new Map(proposals.map(p=>[p.slug,p]));
const audit=JSON.parse(await readFile(root+'/audit.json'));
assert.equal(source.length,106);assert.equal(proposals.length,106);assert.equal(edits.size,106);
const text=value=>({type:'text',version:1,text:value,format:0,detail:0,mode:'normal',style:''});
const paragraph=value=>({type:'paragraph',version:1,direction:'ltr',format:'',indent:0,textFormat:0,textStyle:'',children:[text(value)]});
const heading=value=>({type:'heading',version:1,tag:'h2',direction:'ltr',format:'',indent:0,children:[text(value)]});
const bullets=values=>({type:'list',version:1,listType:'bullet',tag:'ul',start:1,direction:'ltr',format:'',indent:0,children:values.map((v,i)=>({type:'listitem',version:1,value:i+1,direction:'ltr',format:'',indent:0,children:[text(v)]}))});
const plain=n=>n.text??(n.children||[]).map(plain).join('');
const now=new Date().toISOString();const changes=[];
const drafts=source.map(before=>{
 const d=structuredClone(before),e=edits.get(d.slug);assert(e,d.slug);
 for(const key of ['verdict','recommendationParagraph'])assert(typeof e[key]==='string'&&e[key].trim().length>100,d.slug+' '+key);
 assert.equal(e.takeaways.length,3,d.slug+' takeaways');
 const original=d.content.root.children;const omissions=new Set();let toneReplacements=0;
 for(const f of audit.findings.filter(f=>f.slug===d.slug&&f.field.startsWith('content.root.children['))){
  const index=Number(f.field.match(/\[(\d+)\]/)[1]);assert.equal(plain(original[index]),f.exactText,d.slug+' audited passage');assert.equal(original[index].type,'paragraph');
  if(f.action.startsWith('omit '))omissions.add(index);
  else {assert.equal(f.action,'replace');assert(f.proposedCorrection);original[index]=paragraph(f.proposedCorrection);toneReplacements++;}
 }
 const nodes=original.filter((_,i)=>!omissions.has(i));
 for(let i=nodes.length-1;i>=0;i--)if(nodes[i].type==='heading'&&(!nodes[i+1]||nodes[i+1].type==='heading'))nodes.splice(i,1);
 d.content.root.children=nodes;const takeaways=nodes.findIndex(n=>n.type==='heading'&&plain(n)==='Key takeaways');
 assert(takeaways>=0&&nodes[takeaways+1]?.type==='list',d.slug+' existing takeaway list');nodes[takeaways+1]=bullets(e.takeaways);
 const recommendation=nodes.findIndex(n=>n.type==='heading'&&/^Why I would (?:use|start with|choose) WhatFlow/.test(plain(n)));
 let replaced=false;
 if(recommendation>=0){
  for(let i=recommendation+1;i<nodes.length&&nodes[i].type!=='heading';i++){
   if(nodes[i].type==='paragraph'){nodes[i]=paragraph(e.recommendationParagraph);replaced=true;break;}
  }
 }
 if(!replaced){const i=nodes.findIndex(n=>n.type==='heading'&&plain(n)==='Before you choose a platform');assert(i>=0,d.slug+' checklist');nodes.splice(i,0,heading('Why WhatFlow is my Shopify recommendation'),paragraph(e.recommendationParagraph));}
 let tableCells=0;
 for(const u of e.tableWhatflowUpdates||[]){const row=d.featureTable.find(r=>r.feature===u.feature);assert(row,d.slug+' unknown feature '+u.feature);const value=u.text??u.whatflow;assert(typeof value==='string'&&value.length>20);if(row.whatflow!==value){row.whatflow=value;tableCells++;}}
 d.verdict=e.verdict;d.updatedAt=now;
 // No source-review timestamp refresh: this stage changes editorial positioning, not provider research.
 for(const k of ['id','slug','author','authorRole','publishedAt','createdAt','relatedComparisons','faqs','sources','seo','_status'])assert.deepEqual(d[k],before[k],d.slug+' preserved '+k);
 assert.deepEqual(d.featureTable.map(r=>r.competitor),before.featureTable.map(r=>r.competitor),d.slug+' competitor facts');
 changes.push({slug:d.slug,verdict:true,takeaways:true,recommendation:true,tableCells,boilerplateParagraphsRemoved:omissions.size,toneReplacements,rationale:e.rationale});return d;
});
assert.equal(new Set(drafts.map(d=>d.verdict)).size,106,'Distinct verdicts required');
await writeFile(root+'/draft-documents.json',JSON.stringify(drafts,null,2));
await writeFile(root+'/draft-manifest.json',JSON.stringify({preparedAt:now,comparisons:drafts.length,published:false,stage:'Copy draft awaiting diverse app screenshots and final independent review',changed:changes,preserved:['IDs','URLs','bylines','publication dates','relationships','competitor table facts','FAQs','source arrays','SEO metadata','source-review timestamps'],protectedBlogs:58},null,2));
console.log(JSON.stringify({drafts:drafts.length,published:false,tableCells:changes.reduce((n,d)=>n+d.tableCells,0)}));
