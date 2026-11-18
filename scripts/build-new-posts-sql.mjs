/**
 * Publish brand-new Markdown posts as native Payload rows, with covers from the media library.
 * Offline: writes SQL and render files only. Cover objects must already be in R2 under `blog-<slug>.webp`.
 *  - media: one row per cover (skips existing filenames)
 *  - posts: INSERT guarded by slug (never overwrites an existing post)
 *  - posts_tags / posts_faqs / posts_sources: inserted only for the row this run created
 * Usage: node scripts/build-new-posts-sql.mjs <newDir> <live-posts.json> <covers-manifest.json> <outDir>
 */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {readDoc,listMarkdown,bodyToLexical,CATEGORIES} from './lib/refresh-content.mjs';

const [dir,liveFile,coversFile,out]=process.argv.slice(2);
if(!out)throw Error('usage: build-new-posts-sql.mjs <newDir> <live-posts.json> <covers-manifest.json> <outDir>');
const q=v=>v===null||v===undefined?'NULL':typeof v==='number'?String(v):typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const rid=v=>createHash('sha256').update(v).digest('hex').slice(0,24);
const now=new Date().toISOString();
const live=new Set(JSON.parse(await readFile(liveFile,'utf8')).docs.map(d=>d.slug));
const covers=new Map(JSON.parse(await readFile(coversFile,'utf8')).records.map(r=>[r.slug,r]));
const sql=[],docs=[],report=[];
for(const f of await listMarkdown(dir)){
 const slug=f.slice(0,-3);const {meta,body}=await readDoc(`${dir}/${f}`);
 if(live.has(slug))throw Error('already live: '+slug);
 if(!CATEGORIES.includes(meta.category))throw Error(`${slug}: category ${meta.category}`);
 const cover=covers.get(slug);if(!cover)throw Error('no cover for '+slug);
 const filename=`blog-${slug}.webp`,alt=`${meta.title} - WhatFlow guide cover`;
 sql.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${[filename,'/api/media/file/'+filename,'image/webp',cover.bytes,cover.width,cover.height,alt,now,now].map(q).join(',')} WHERE NOT EXISTS (SELECT 1 FROM media WHERE filename=${q(filename)});`);
 const content=bodyToLexical(body,slug);
 const row={title:meta.title,slug,excerpt:meta.excerpt,category:meta.category,author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',reviewed_at:now,published_at:now,status:'published',featured:false,cover_image_url:null,cover_image_alt:alt,cover_image_caption:null,content:JSON.stringify(content),seo_meta_title:meta.metaTitle,seo_meta_description:meta.metaDescription,created_at:now,updated_at:now};
 const cols=Object.keys(row);
 sql.push(`INSERT INTO posts (${cols.join(',')},cover_image_id) SELECT ${cols.map(c=>q(row[c])).join(',')},(SELECT id FROM media WHERE filename=${q(filename)}) WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug=${q(slug)});`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(slug)} AND created_at=${q(now)})`;
 for(const a of [{t:'tags',f:['tag'],rows:(meta.tags||[]).map(tag=>({tag}))},{t:'faqs',f:['question','answer'],rows:meta.faqs||[]},{t:'sources',f:['title','url','note'],rows:meta.sources||[]}])
  a.rows.forEach((r,i)=>{const id=q(rid(slug+a.t+i+JSON.stringify(r)));sql.push(`INSERT INTO posts_${a.t} (_order,_parent_id,id,${a.f.join(',')}) SELECT ${i+1},${parent},${id},${a.f.map(k=>q(r[k]??null)).join(',')} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM posts_${a.t} WHERE id=${id});`);});
 docs.push({slug,content});report.push({slug,title:meta.title,category:meta.category,faqs:(meta.faqs||[]).length,sources:(meta.sources||[]).length});
}
for(const s of sql){const t=s.match(/^INSERT INTO\s+([^\s(]+)/)?.[1];if(!['media','posts','posts_tags','posts_faqs','posts_sources'].includes(t))throw Error('Unexpected SQL target '+t);}
await mkdir(out,{recursive:true});
await writeFile(out+'/new-posts.sql',sql.join('\n')+'\n');
await writeFile(out+'/posts.json',JSON.stringify(docs));
await writeFile(out+'/candidate-documents.json','[]');await writeFile(out+'/new-comparison-docs.json','[]');
await writeFile(out+'/report.json',JSON.stringify({builtAt:now,posts:report},null,1));
console.log(JSON.stringify({posts:report.length,statements:sql.length,out}));
