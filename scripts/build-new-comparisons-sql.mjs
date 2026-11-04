/**
 * Insert brand-new published comparisons with a matching native Payload version row (latest=1),
 * mirroring how Payload stores a published document. Offline: writes SQL only.
 * Usage: node scripts/build-new-comparisons-sql.mjs
 */
import {writeFile,readFile,stat} from 'node:fs/promises';
import {readDoc,listMarkdown,uid} from './lib/refresh-content.mjs';
import {markdownToLexical} from './build-quality-content.mjs';

const compRoot='content/comparisons/refresh-2026-11-05';
const out=process.env.REFRESH_OUTPUT||'content/blog/refresh-2026-11-05/publication';
const now=new Date().toISOString();
const q=v=>v===null||v===undefined?'NULL':typeof v==='number'?String(v):typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const n=v=>'"'+v+'"';
const CATS=['shopify','whatsapp','api','support','channels','usecases'];
const live=JSON.parse(await readFile(compRoot+'/live-snapshot.json','utf8')).docs;
const statements=[];const report=[];
for(const f of await listMarkdown(compRoot+'/new')){
 const slug=f.slice(0,-3);const {meta,body}=await readDoc(`${compRoot}/new/${f}`);
 if(live.some(d=>d.slug===slug))throw Error('comparison already exists: '+slug);
 if(!CATS.includes(meta.category))throw Error(`${slug}: bad category ${meta.category}`);
 for(const k of ['title','competitor','competitorUrl','excerpt','verdict','metaTitle','metaDescription'])if(!meta[k])throw Error(`${slug}: missing ${k}`);
 if(!(meta.sources||[]).length)throw Error(`${slug}: sources required`);
 const cover=`/thumbnails/compare/${slug}.webp`;let hasCover=true;try{await stat('public'+cover);}catch{hasCover=false;}
 const row={title:meta.title,slug,competitor:meta.competitor,competitor_url:meta.competitorUrl,category:meta.category,excerpt:meta.excerpt,verdict:meta.verdict,
  author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',published_at:now,reviewed_at:now,featured:false,cover_image_id:null,
  image_url:hasCover?cover:null,image_alt:hasCover?`WhatFlow vs ${meta.competitor} — WhatFlow comparison cover`:null,image_caption:hasCover?'Illustrated cover by WhatFlow.':null,image_source_url:hasCover?'/compare':null,
  content:JSON.stringify(markdownToLexical(body)),cta_heading:meta.cta?.heading||'Try WhatFlow on your Shopify store',cta_description:meta.cta?.description||'Official Meta Cloud API, a team inbox with no seat fees and every feature on every plan, including Free.',cta_label:meta.cta?.label||'Install WhatFlow free',
  seo_meta_title:meta.metaTitle,seo_meta_description:meta.metaDescription,seo_noindex:false,updated_at:now,created_at:now,_status:'published'};
 const cols=Object.keys(row);
 statements.push(`INSERT INTO comparisons (${cols.map(n).join(',')}) SELECT ${cols.map(c=>q(row[c])).join(',')} WHERE NOT EXISTS (SELECT 1 FROM comparisons WHERE slug=${q(slug)});`);
 const parent=`(SELECT id FROM comparisons WHERE slug=${q(slug)} AND created_at=${q(now)})`;
 const arrays=[{table:'feature_table',key:'featureTable',fields:['feature','whatflow','competitor']},{table:'faqs',key:'faqs',fields:['question','answer']},{table:'sources',key:'sources',fields:['title','url','note']}];
 for(const a of arrays)(meta[a.key]||[]).forEach((r,i)=>{const rowId=q(uid(slug+a.key+i+JSON.stringify(r)));statements.push(`INSERT INTO comparisons_${a.table} (_order,_parent_id,id,${a.fields.map(n).join(',')}) SELECT ${i+1},${parent},${rowId},${a.fields.map(k=>q(r[k]??null)).join(',')} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM comparisons_${a.table} WHERE id=${rowId});`);});
 // Related: up to three published comparisons in the same category.
 const related=live.filter(d=>d.category===meta.category&&d._status==='published').slice(0,3);
 related.forEach((d,i)=>statements.push(`INSERT INTO comparisons_rels ("order",parent_id,path,comparisons_id) SELECT ${i+1},${parent},'relatedComparisons',${d.id} WHERE ${parent} IS NOT NULL AND EXISTS (SELECT 1 FROM comparisons WHERE id=${d.id}) AND NOT EXISTS (SELECT 1 FROM comparisons_rels WHERE parent_id=${parent} AND path='relatedComparisons' AND comparisons_id=${d.id});`));
 const vcols=['title','slug','competitor','competitor_url','category','excerpt','verdict','author','author_role','published_at','reviewed_at','featured','cover_image_id','image_url','image_alt','image_caption','image_source_url','content','cta_heading','cta_description','cta_label','seo_meta_title','seo_meta_description','seo_noindex','updated_at','created_at','_status'];
 const once=`${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM _comparisons_v WHERE parent_id=${parent})`;
 statements.push(`INSERT INTO _comparisons_v (parent_id,${vcols.map(c=>n('version_'+c)).join(',')},created_at,updated_at,latest) SELECT id,${vcols.map(n).join(',')},${q(now)},${q(now)},1 FROM comparisons WHERE slug=${q(slug)} AND ${once};`);
 const v=`(SELECT id FROM _comparisons_v WHERE parent_id=${parent} AND latest=1 ORDER BY id DESC LIMIT 1)`;
 for(const a of arrays)statements.push(`INSERT INTO _comparisons_v_version_${a.table} (_order,_parent_id,${a.fields.map(n).join(',')},_uuid) SELECT _order,${v},${a.fields.map(n).join(',')},id FROM comparisons_${a.table} WHERE _parent_id=${parent} AND ${v} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM _comparisons_v_version_${a.table} WHERE _parent_id=${v});`);
 statements.push(`INSERT INTO _comparisons_v_rels ("order",parent_id,path,comparisons_id) SELECT "order",${v},path,comparisons_id FROM comparisons_rels WHERE parent_id=${parent} AND ${v} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM _comparisons_v_rels WHERE parent_id=${v});`);
 report.push({slug,title:meta.title,competitor:meta.competitor,category:meta.category,cover:hasCover});
}
for(const s of statements){const t=s.match(/^INSERT INTO\s+([^\s(]+)/)?.[1];if(!/^comparisons(?:_feature_table|_faqs|_sources|_rels)?$|^_comparisons_v(?:_version_feature_table|_version_faqs|_version_sources|_rels)?$/.test(t))throw Error('Unexpected SQL target '+t);}
await writeFile(out+'/new-comparisons.sql',statements.join('\n'));
await writeFile(out+'/new-comparisons.json',JSON.stringify(report,null,1));
console.log(JSON.stringify({newComparisons:report.length,statements:statements.length}));
