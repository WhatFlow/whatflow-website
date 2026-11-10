import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {markdownToLexical} from './build-quality-content.mjs';
import {uid} from './lib/refresh-content.mjs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const [work,stage,articleModule] = process.argv.slice(2);
assert(work && ['editorial','publication'].includes(stage));
const {articles} = articleModule
  ? await import(pathToFileURL(resolve(articleModule)).href)
  : await import('../content/blog/merchant-library-followup-2026-11-10/articles.mjs');
const {helpPatches} = articleModule
  ? {helpPatches: []}
  : await import('../content/blog/merchant-library-followup-2026-11-10/help-patches.mjs');
const {docs,totalDocs} = JSON.parse(await readFile(work+'/posts.json'));
assert.equal(docs.length,totalDocs);
const bySlug = new Map(docs.map(doc=>[doc.slug,doc]));
for (const article of articles) {
  assert(!bySlug.has(article.slug),article.slug);
  assert(article.body.split(/\s+/).length>200,article.slug);
  for(const [,slug] of article.body.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) assert(bySlug.has(slug),slug);
}
await writeFile(work+'/editorial.json',JSON.stringify(articles.map(d=>({
  slug:d.slug,title:d.title,collection:'blog',lines:d.cover,eyebrow:'WhatsApp explained',motif:d.motif,
}))));
if(stage==='editorial') process.exit(0);

const covers = JSON.parse(await readFile(work+'/manifest.json')).records;
const sql = [];
const now = new Date().toISOString();
const q = v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
const plain = node=>node.text ?? (node.children ?? []).map(plain).join('');
function media(filename,size,width,height,alt) {
  const values=[filename,'/api/media/file/'+filename,'image/webp',size,width,height,alt,now,now];
  sql.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${values.map(q).join(',')} WHERE NOT EXISTS (SELECT 1 FROM media WHERE filename=${q(filename)});`);
}
const changed = new Map();
for(const {slug,anchor,screen,alt,markdown} of helpPatches){
  const old = bySlug.get(slug);
  assert(old?.status==='published',slug);
  const next = changed.get(slug) ?? structuredClone(old.content);
  const nodes = next.root.children;
  const position = nodes.findIndex(n=>n.type==='heading'&&plain(n)===anchor);
  assert(position>=0,slug+' '+anchor);
  const filename='whatflow-demo-2026-11-10-'+screen+'.webp';
  const {size}=await stat(work+'/'+filename);
  media(filename,size,726,screen==='connections'?870:1120,alt);
  assert(!JSON.stringify(next).includes(filename),filename);
  nodes.splice(position,0,...markdownToLexical(markdown).root.children);
  changed.set(slug,next);
}
for(const [slug,content] of changed){
  const old=bySlug.get(slug);
  sql.push(`UPDATE posts SET content=${q(JSON.stringify(content))},reviewed_at=${q(now)},updated_at=${q(now)} WHERE slug=${q(slug)} AND status='published' AND updated_at=${q(old.updatedAt)};`);
}
for(const d of articles){
  const cover=covers.find(c=>c.slug===d.slug);
  assert(cover);
  const filename='blog-'+d.slug+'.webp';
  media(filename,cover.bytes,cover.width,cover.height,cover.alt);
  const row={title:d.title,slug:d.slug,excerpt:d.excerpt,category:'whatsapp',status:'published',
    author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',
    published_at:now,created_at:now,updated_at:now,reviewed_at:now,
    seo_meta_title:d.title,seo_meta_description:d.excerpt,cover_image_alt:cover.alt,
    content:JSON.stringify(markdownToLexical(d.body))};
  sql.push(`INSERT INTO posts (${Object.keys(row).join(',')},cover_image_id) SELECT ${Object.values(row).map(q).join(',')},(SELECT id FROM media WHERE filename=${q(filename)}) WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug=${q(d.slug)});`);
  const parent=`(SELECT id FROM posts WHERE slug=${q(d.slug)} AND created_at=${q(now)})`;
  for(const [i,[url,title]] of d.sources.entries()){
    const id=q(uid(d.slug+url));
    sql.push(`INSERT INTO posts_sources (_order,_parent_id,id,title,url) SELECT ${i+1},${parent},${id},${q(title)},${q(url)} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM posts_sources WHERE id=${id});`);
  }
}
await writeFile(work+'/release.sql',sql.join('\n')+'\n');
console.log(JSON.stringify({updated:changed.size,screenshots:helpPatches.length,newPosts:articles.length}));
