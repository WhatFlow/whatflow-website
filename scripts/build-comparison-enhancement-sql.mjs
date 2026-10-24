/** Collection-only guarded publication, preserving native Payload revision history. */
import {readFile,writeFile} from 'node:fs/promises';
const root=process.env.COMPARISON_ENHANCEMENT_ROOT||'content/comparisons/enhancement-2026-10-25';
const before=JSON.parse(await readFile(root+'/source-documents.json'));
const after=JSON.parse(await readFile(root+'/candidate-documents.json'));
const q=v=>v==null?'NULL':typeof v==='number'?String(v):typeof v==='boolean'?v?'1':'0':`'${String(v).replaceAll("'","''")}'`;
const name=v=>'"'+v+'"';const statements=[];
const fields={title:'title',competitor:'competitor',competitorUrl:'competitor_url',category:'category',excerpt:'excerpt',verdict:'verdict',author:'author',authorRole:'author_role',publishedAt:'published_at',reviewedAt:'reviewed_at',featured:'featured',imageUrl:'image_url',imageAlt:'image_alt',imageCaption:'image_caption',imageSourceUrl:'image_source_url',content:'content',updatedAt:'updated_at',createdAt:'created_at',_status:'_status'};
for(const d of after){
 const old=before.find(p=>p.id===d.id&&p.slug===d.slug);if(!old)throw Error('Unexpected document');
 for(const key of ['id','slug','publishedAt','createdAt','author','authorRole','_status','relatedComparisons'])if(JSON.stringify(old[key])!==JSON.stringify(d[key]))throw Error('Unexpected identity change '+key);
 const gate=`EXISTS(SELECT 1 FROM comparisons WHERE id=${d.id} AND slug=${q(d.slug)} AND updated_at=${q(d.updatedAt)} AND _status='published')`;
 const values={};for(const[k,c]of Object.entries(fields)){if(['id','slug','publishedAt','createdAt','author','authorRole','_status','featured','category','competitor'].includes(k))continue;if(JSON.stringify(old[k])!==JSON.stringify(d[k]))values[c]=k==='content'?JSON.stringify(d[k]):d[k];}
 for(const [group,columns]of [['seo',{metaTitle:'seo_meta_title',metaDescription:'seo_meta_description',noindex:'seo_noindex'}],['cta',{heading:'cta_heading',description:'cta_description',label:'cta_label'}]])for(const[k,c]of Object.entries(columns))if(old[group]?.[k]!==d[group]?.[k])values[c]=d[group]?.[k];
 statements.push(`UPDATE comparisons SET ${Object.entries(values).map(([k,v])=>name(k)+'='+q(v)).join(',')} WHERE id=${d.id} AND slug=${q(d.slug)} AND updated_at=${q(old.updatedAt)} AND _status='published' AND NOT EXISTS(SELECT 1 FROM _comparisons_v WHERE parent_id=${d.id} AND latest=1 AND version__status='draft');`);
 const arrays=[{table:'feature_table',key:'featureTable',fields:['feature','whatflow','competitor']},{table:'faqs',key:'faqs',fields:['question','answer']},{table:'sources',key:'sources',fields:['title','url','note']}];
 for(const a of arrays){
  const prior=new Map(old[a.key].map(r=>[r.id,r]));
  for(const row of d[a.key]){const b=prior.get(row.id);
   if(!b){statements.push(`INSERT INTO comparisons_${a.table} (_order,_parent_id,id,${a.fields.map(name).join(',')}) SELECT ${d[a.key].indexOf(row)+1},${d.id},${q(row.id)},${a.fields.map(k=>q(row[k])).join(',')} WHERE ${gate} AND NOT EXISTS(SELECT 1 FROM comparisons_${a.table} WHERE id=${q(row.id)});`);continue;}
   const changed=a.fields.filter(k=>row[k]!==b[k]);if(changed.length)statements.push(`UPDATE comparisons_${a.table} SET ${changed.map(k=>name(k)+'='+q(row[k])).join(',')} WHERE _parent_id=${d.id} AND id=${q(row.id)} AND ${gate};`);
  }
  if(old[a.key].some(r=>!d[a.key].some(n=>n.id===r.id)))throw Error('Existing array row removed');
 }
 const once=`${gate} AND NOT EXISTS(SELECT 1 FROM _comparisons_v WHERE parent_id=${d.id} AND version_updated_at=${q(d.updatedAt)})`;
 statements.push(`UPDATE _comparisons_v SET latest=0 WHERE parent_id=${d.id} AND latest=1 AND ${once};`);
 const columns=['title','slug','competitor','competitor_url','category','excerpt','verdict','author','author_role','published_at','reviewed_at','featured','cover_image_id','image_url','image_alt','image_caption','image_source_url','content','cta_heading','cta_description','cta_label','seo_meta_title','seo_meta_description','seo_noindex','updated_at','created_at','_status'];
 statements.push(`INSERT INTO _comparisons_v(parent_id,${columns.map(c=>name('version_'+c)).join(',')},created_at,updated_at,latest) SELECT id,${columns.map(name).join(',')},${q(d.updatedAt)},${q(d.updatedAt)},1 FROM comparisons WHERE id=${d.id} AND ${once};`);
 const v=`(SELECT id FROM _comparisons_v WHERE parent_id=${d.id} AND latest=1 AND version_updated_at=${q(d.updatedAt)} ORDER BY id DESC LIMIT 1)`;
 for(const a of arrays)statements.push(`INSERT INTO _comparisons_v_version_${a.table}(_order,_parent_id,${a.fields.map(name).join(',')},_uuid) SELECT _order,${v},${a.fields.map(name).join(',')},id FROM comparisons_${a.table} WHERE _parent_id=${d.id} AND ${gate} AND ${v} IS NOT NULL AND NOT EXISTS(SELECT 1 FROM _comparisons_v_version_${a.table} WHERE _parent_id=${v});`);
 statements.push(`INSERT INTO _comparisons_v_rels("order",parent_id,path,comparisons_id) SELECT "order",${v},path,comparisons_id FROM comparisons_rels WHERE parent_id=${d.id} AND ${gate} AND ${v} IS NOT NULL AND NOT EXISTS(SELECT 1 FROM _comparisons_v_rels WHERE parent_id=${v});`);
}
for(const s of statements){const target=s.match(/^(?:INSERT INTO|UPDATE|DELETE FROM)\s+([^\s(]+)/)?.[1];if(!/^comparisons(?:_feature_table|_faqs|_sources|_rels)?$|^_comparisons_v(?:_version_feature_table|_version_faqs|_version_sources|_rels)?$/.test(target))throw Error('Unexpected SQL target '+target);}
await writeFile(process.env.COMPARISON_ENHANCEMENT_SQL||'/tmp/whatflow-comparison-enhancements.sql',statements.join('\n'));
console.log(JSON.stringify({comparisons:after.length,statements:statements.length,scope:'comparisons and native versions only',guard:'identity, prior updated_at, published status, no unpublished latest draft'}));
