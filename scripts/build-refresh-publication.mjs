/**
 * Build the November 2026 content refresh for native Payload tables. Offline; writes files only.
 *  - Posts: scoped SQL (posts, posts_tags, posts_faqs, posts_sources) updating rewritten posts by slug and inserting new posts.
 *  - Comparisons: source/candidate documents for scripts/build-comparison-enhancement-sql.mjs (keeps revision history).
 * Usage: node scripts/build-refresh-publication.mjs [--draft-new]
 */
import {writeFile,readFile,mkdir,stat} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {readDoc,listMarkdown,bodyToLexical,uid} from './lib/refresh-content.mjs';
import {markdownToLexical} from './build-quality-content.mjs';

const root='content/blog/refresh-2026-11-05';
const compRoot='content/comparisons/refresh-2026-11-05';
const out=process.env.REFRESH_OUTPUT||root+'/publication';
const draftNew=process.argv.includes('--draft-new');
const now=new Date().toISOString();
const q=v=>v===null||v===undefined?'NULL':typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const rid=()=>randomBytes(12).toString('hex');

const livePosts=JSON.parse(await readFile(root+'/live-snapshot.json','utf8')).docs;
const liveBySlug=new Map(livePosts.map(p=>[p.slug,p]));
const statements=[];const postDocs=[];const report={rewritten:[],created:[],comparisons:[]};

async function postStatements(dir,isNew){
 for(const f of await listMarkdown(dir)){
  const slug=f.slice(0,-3);const {meta,body}=await readDoc(`${dir}/${f}`);
  const live=liveBySlug.get(slug);
  if(isNew&&live)throw Error(`new post slug already live: ${slug}`);
  if(!isNew&&!live)throw Error(`rewritten post not live: ${slug}`);
  const content=bodyToLexical(body,slug);
  let cover=null;if(isNew){try{await stat(`public/thumbnails/blog/${slug}.webp`);cover=`/thumbnails/blog/${slug}.webp`;}catch{}}
  const status=isNew&&draftNew?'draft':'published';
  const row={title:meta.title,slug,excerpt:meta.excerpt,category:meta.category,author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',reviewed_at:now,
   published_at:live?.publishedAt??(status==='published'?now:null),status:live?.status??status,featured:live?.featured??false,
   cover_image_url:live?live.coverImageUrl:cover,cover_image_alt:live?live.coverImageAlt:(cover?`${meta.title} - WhatFlow guide cover`:null),cover_image_caption:live?live.coverImageCaption:(cover?'Illustrated cover by WhatFlow. App screenshots and examples appear in the guide.':null),
   content:JSON.stringify(content),seo_meta_title:meta.metaTitle,seo_meta_description:meta.metaDescription,created_at:live?.createdAt??now,updated_at:now};
  const cols=Object.keys(row);
  if(live){
   const set=cols.filter(c=>!['slug','created_at','published_at','status','featured','author','author_role'].includes(c));
   // Guard: only touch the exact live row we exported.
   statements.push(`UPDATE posts SET ${set.map(c=>`${c}=${q(row[c])}`).join(',')} WHERE slug=${q(slug)} AND id=${live.id} AND updated_at=${q(live.updatedAt)};`);
  }else{
   statements.push(`INSERT INTO posts (${cols.join(',')}) SELECT ${cols.map(c=>q(row[c])).join(',')} WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug=${q(slug)});`);
  }
  const parent=`(SELECT id FROM posts WHERE slug=${q(slug)} AND updated_at=${q(now)})`;
  const arrays=[{table:'tags',fields:['tag'],rows:(meta.tags||[]).map(tag=>({tag}))},{table:'faqs',fields:['question','answer'],rows:meta.faqs||[]},{table:'sources',fields:['title','url','note'],rows:meta.sources||[]}];
  for(const a of arrays){
   statements.push(`DELETE FROM posts_${a.table} WHERE _parent_id=${parent};`);
   a.rows.forEach((r,i)=>statements.push(`INSERT INTO posts_${a.table} (_order,_parent_id,id,${a.fields.join(',')}) SELECT ${i+1},${parent},${q(rid())},${a.fields.map(k=>q(r[k]??null)).join(',')} WHERE ${parent} IS NOT NULL;`));
  }
  postDocs.push({slug,content});
  (isNew?report.created:report.rewritten).push({slug,title:meta.title,category:meta.category,status:row.status});
 }
}
await postStatements(root+'/rewritten',false);
await postStatements(root+'/new',true);
for(const s of statements){const t=s.match(/^(?:INSERT INTO|DELETE FROM|UPDATE)\s+([^\s(]+)/)?.[1];if(!['posts','posts_tags','posts_faqs','posts_sources'].includes(t))throw Error('Unexpected SQL target '+t);}

// Comparisons → documents for the revision-preserving SQL builder.
const liveComps=JSON.parse(await readFile(compRoot+'/live-snapshot.json','utf8')).docs;
const source=[],candidate=[];
for(const f of await listMarkdown(compRoot+'/edited')){
 const slug=f.slice(0,-3);const {meta,body}=await readDoc(`${compRoot}/edited/${f}`);
 const old=liveComps.find(d=>d.slug===slug);if(!old)throw Error('unknown comparison '+slug);
 if(meta.id!==old.id)throw Error('id changed '+slug);
 const d=structuredClone(old);
 Object.assign(d,{title:meta.title,excerpt:meta.excerpt,verdict:meta.verdict,content:markdownToLexical(body),updatedAt:now,reviewedAt:now});
 d.seo={...d.seo,metaTitle:meta.metaTitle,metaDescription:meta.metaDescription};
 if(meta.cta)d.cta={...d.cta,...Object.fromEntries(Object.entries(meta.cta).filter(([,v])=>v))};
 for(const key of ['featureTable','faqs','sources']){
  const rows=(meta[key]||[]).map(r=>({...r,id:r.id||uid(slug+key+JSON.stringify(r))}));
  const missing=old[key].filter(r=>!rows.some(n=>n.id===r.id));
  if(missing.length)throw Error(`${slug}: ${key} rows removed ${missing.map(r=>r.id)}`);
  d[key]=rows.map(r=>{const o=old[key].find(x=>x.id===r.id);return o?{...o,...r}:r;});
 }
 source.push(old);candidate.push(d);report.comparisons.push({slug,title:meta.title});
}
await mkdir(out,{recursive:true});
await writeFile(out+'/posts.sql',statements.join('\n'));
await writeFile(out+'/posts.json',JSON.stringify(postDocs));
await writeFile(out+'/source-documents.json',JSON.stringify(source));
await writeFile(out+'/candidate-documents.json',JSON.stringify(candidate));
await writeFile(out+'/report.json',JSON.stringify({builtAt:now,...report},null,1));
console.log(JSON.stringify({out,rewritten:report.rewritten.length,created:report.created.length,comparisons:report.comparisons.length,postStatements:statements.length}));
