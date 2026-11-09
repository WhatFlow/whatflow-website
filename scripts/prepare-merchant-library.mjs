import assert from 'node:assert/strict';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {markdownToLexical} from './build-quality-content.mjs';
import {uid} from './lib/refresh-content.mjs';
import {roundups} from '../content/blog/merchant-library-2026-11-10/roundups.mjs';
import {metaGuides} from '../content/blog/merchant-library-2026-11-10/meta-guides.mjs';
import {productDocs, productHub} from '../content/blog/merchant-library-2026-11-10/product-docs.mjs';
import {robocalls} from '../content/blog/merchant-library-2026-11-10/robocalls.mjs';

const [work, stage] = process.argv.slice(2);
assert(work && ['editorial','publication'].includes(stage));
const posts = [...roundups, ...metaGuides, ...productDocs, productHub];
const articles = [...posts, robocalls];
const priorPosts = JSON.parse(await readFile(work+'/posts.json')).docs;
const priorComparisons = JSON.parse(await readFile(work+'/comparisons.json')).docs;
const slugs = new Set(articles.map(d=>d.slug));
assert.equal(slugs.size, articles.length);
for (const d of articles) {
  assert(![...priorPosts,...priorComparisons].some(x=>x.slug===d.slug), d.slug);
  assert(d.body.trim().split(/\s+/).length >= 210, d.slug);
  assert(!/[—–]/.test(d.body), d.slug);
}
for (const d of roundups) assert(d.body.includes('## 1. WhatFlow Business API'));
const linkable = new Set([...priorPosts,...posts].map(d=>'/blog/'+d.slug));
for (const d of [...priorComparisons,robocalls]) linkable.add('/compare/'+d.slug);
for (const url of ['/pricing','/docs/mcp','/integrations/shopify-flow']) linkable.add(url);
for (const d of articles) {
  for (const [,link] of d.body.matchAll(/\]\((\/(?:blog|compare|pricing|docs|integrations)[^\s)]*)\)/g)) assert(linkable.has(link),d.slug+' -> '+link);
}
const editorial = articles.map(d=>({
  slug:d.slug,title:d.title,collection:d===robocalls?'compare':'blog',
  lines:d.cover,eyebrow:d.group,motif:d.motif,
}));
await writeFile(work+'/editorial.json', JSON.stringify(editorial,null,2)+'\n');
if (stage==='editorial') process.exit(0);

const covers = JSON.parse(await readFile(work+'/manifest.json')).records;
const now = new Date().toISOString();
const q = v=>v==null?'NULL':typeof v==='number'?String(v):"'"+String(v).replaceAll("'","''")+"'";
const sql = [];
for (const d of posts) {
  const m = covers.find(x=>x.slug===d.slug);
  assert(m && m.width===1200 && m.height===630);
  const filename = 'blog-'+d.slug+'.webp';
  const url = '/api/media/file/'+filename;
  const cover = [filename,url,'image/webp',m.bytes,m.width,m.height,m.alt,now,now];
  sql.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${cover.map(q).join(',')} WHERE NOT EXISTS (SELECT 1 FROM media WHERE filename=${q(filename)});`);
  const excerpt = d.excerpt.split(/(?<=\.)\s+/)[0];
  const row = {
    slug:d.slug,title:d.title,excerpt,category:d.category,
    author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',
    cover_image_id:null,cover_image_alt:m.alt,cover_image_caption:'Illustrated WhatFlow guide cover.',
    reviewed_at:now,published_at:now,created_at:now,updated_at:now,status:'published',featured:0,
    content:JSON.stringify(markdownToLexical(d.body)),seo_meta_title:d.title,
    seo_meta_description:excerpt.length<=159?excerpt:excerpt.slice(0,155).replace(/\s+\S*$/,'')+'…',
  };
  const columns=Object.keys(row);
  sql.push(`INSERT INTO posts (${columns.join(',')}) SELECT ${columns.map(c=>c==='cover_image_id'?`(SELECT id FROM media WHERE filename=${q(filename)})`:q(row[c])).join(',')} WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug=${q(d.slug)});`);
  const parent=`(SELECT id FROM posts WHERE slug=${q(d.slug)} AND created_at=${q(now)})`;
  const sources = [...new Map([...d.body.matchAll(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g)].map(x=>[x[2],x[1]])).entries()];
  for (const [i,[source,title]] of sources.entries()) {
    const id=q(uid(d.slug+source));
    sql.push(`INSERT INTO posts_sources (_order,_parent_id,id,title,url) SELECT ${i+1},${parent},${id},${q(title)},${q(source)} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM posts_sources WHERE id=${id});`);
  }
  for (const [i,tag] of ['shopify','whatsapp',d.group.toLowerCase().replaceAll(' ','-')].entries()) {
    const id=q(uid(d.slug+'tag'+tag));
    sql.push(`INSERT INTO posts_tags (_order,_parent_id,id,tag) SELECT ${i+1},${parent},${id},${q(tag)} WHERE ${parent} IS NOT NULL AND NOT EXISTS (SELECT 1 FROM posts_tags WHERE id=${id});`);
  }
}
await mkdir(work+'/new',{recursive:true});
const {body,cover,group,motif,...meta}=robocalls;
meta.metaTitle=meta.title;
meta.metaDescription=meta.excerpt;
await writeFile(work+'/new/'+robocalls.slug+'.md','---\n'+JSON.stringify(meta,null,2)+'\n---\n\n'+body);
const comparisonCover = covers.find(x=>x.slug===robocalls.slug);
await writeFile(work+'/comparison-media.json',JSON.stringify([{...comparisonCover,filename:'compare-'+robocalls.slug+'.webp'}]));
await writeFile(work+'/posts.sql',sql.join('\n')+'\n');
console.log(JSON.stringify({posts:posts.length,comparisons:1,covers:covers.length}));
