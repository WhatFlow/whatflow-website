/**
 * Follow-up patch for already-published refresh content. Offline; writes files only.
 * Compares every refresh Markdown file with a fresh live snapshot and emits updates only for
 * documents whose visible text, metadata or arrays changed.
 *  - Posts: guarded UPDATE (id + current updated_at) and array replacement.
 *  - Comparisons: source/candidate documents for scripts/build-comparison-enhancement-sql.mjs.
 * Usage: node scripts/build-refresh-patch.mjs <live-posts.json> <live-comparisons.json> <outDir>
 */
import {writeFile,readFile,mkdir} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {readDoc,listMarkdown,bodyToLexical,uid} from './lib/refresh-content.mjs';
import {markdownToLexical} from './build-quality-content.mjs';

const [postsFile,compsFile,out]=process.argv.slice(2);
if(!out)throw Error('usage: build-refresh-patch.mjs <live-posts.json> <live-comparisons.json> <outDir>');
const root='content/blog/refresh-2026-11-05',compRoot='content/comparisons/refresh-2026-11-05';
const now=new Date().toISOString();
const q=v=>v===null||v===undefined?'NULL':typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const rid=()=>randomBytes(12).toString('hex');
const text=n=>n.type==='text'?n.text:n.type==='block'?[n.fields.blockType,n.fields.url,n.fields.alt,n.fields.caption,n.fields.heading].map(v=>v??'').join('|'):(n.children||[]).map(text).join(n.type==='root'?'\n':' ');
const norm=s=>String(s??'').replace(/\s+/g,' ').trim();
const same=(a,b)=>norm(a)===norm(b);
const rows=(arr,fields)=>JSON.stringify((arr||[]).map(r=>fields.map(f=>norm(r[f]))));

const livePosts=new Map(JSON.parse(await readFile(postsFile,'utf8')).docs.map(d=>[d.slug,d]));
const liveComps=new Map(JSON.parse(await readFile(compsFile,'utf8')).docs.map(d=>[d.slug,d]));
const statements=[],postDocs=[],report={posts:[],comparisons:[]};

for(const dir of [root+'/rewritten',root+'/new'])for(const f of await listMarkdown(dir)){
 const slug=f.slice(0,-3),{meta,body}=await readDoc(`${dir}/${f}`),live=livePosts.get(slug);
 if(!live)throw Error('post not live: '+slug);
 const content=bodyToLexical(body,slug);
 const changed=!same(text(content.root),text(live.content.root))||!same(meta.title,live.title)||!same(meta.excerpt,live.excerpt)||!same(meta.metaTitle,live.seo?.metaTitle)||!same(meta.metaDescription,live.seo?.metaDescription)
  ||rows(meta.faqs,['question','answer'])!==rows(live.faqs,['question','answer'])||rows(meta.sources,['title','url','note'])!==rows(live.sources,['title','url','note'])||JSON.stringify((meta.tags||[]).map(norm))!==JSON.stringify((live.tags||[]).map(t=>norm(t.tag)));
 if(!changed)continue;
 const set={title:meta.title,excerpt:meta.excerpt,category:meta.category,reviewed_at:now,content:JSON.stringify(content),seo_meta_title:meta.metaTitle,seo_meta_description:meta.metaDescription,updated_at:now};
 statements.push(`UPDATE posts SET ${Object.entries(set).map(([c,v])=>`${c}=${q(v)}`).join(',')} WHERE slug=${q(slug)} AND id=${live.id} AND updated_at=${q(live.updatedAt)};`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(slug)} AND updated_at=${q(now)})`;
 for(const a of [{table:'tags',fields:['tag'],rows:(meta.tags||[]).map(tag=>({tag}))},{table:'faqs',fields:['question','answer'],rows:meta.faqs||[]},{table:'sources',fields:['title','url','note'],rows:meta.sources||[]}]){
  statements.push(`DELETE FROM posts_${a.table} WHERE _parent_id=${parent};`);
  a.rows.forEach((r,i)=>statements.push(`INSERT INTO posts_${a.table} (_order,_parent_id,id,${a.fields.join(',')}) SELECT ${i+1},${parent},${q(rid())},${a.fields.map(k=>q(r[k]??null)).join(',')} WHERE ${parent} IS NOT NULL;`));
 }
 postDocs.push({slug,content});report.posts.push(slug);
}
for(const s of statements){const t=s.match(/^(?:INSERT INTO|DELETE FROM|UPDATE)\s+([^\s(]+)/)?.[1];if(!['posts','posts_tags','posts_faqs','posts_sources'].includes(t))throw Error('Unexpected SQL target '+t);}

const source=[],candidate=[];
for(const dir of [compRoot+'/edited',compRoot+'/new'])for(const f of await listMarkdown(dir)){
 const slug=f.slice(0,-3),{meta,body}=await readDoc(`${dir}/${f}`),old=liveComps.get(slug);
 if(!old)throw Error('comparison not live: '+slug);
 const content=markdownToLexical(body);
 const d=structuredClone(old);
 Object.assign(d,{title:meta.title,excerpt:meta.excerpt,verdict:meta.verdict,content});
 d.seo={...d.seo,metaTitle:meta.metaTitle,metaDescription:meta.metaDescription};
 if(meta.cta)d.cta={...d.cta,...Object.fromEntries(Object.entries(meta.cta).filter(([,v])=>v))};
 for(const key of ['featureTable','faqs','sources']){
  const incoming=meta[key]||[];const explicit=new Set(incoming.filter(r=>r.id).map(r=>r.id));
  // Rows without an id keep the live row id at the same position (they were inserted with generated ids).
  const mapped=incoming.map((r,i)=>r.id?r:{...r,id:(old[key][i]&&!explicit.has(old[key][i].id))?old[key][i].id:uid(slug+key+JSON.stringify(r))});
  const missing=old[key].filter(r=>!mapped.some(n=>n.id===r.id));
  if(missing.length)throw Error(`${slug}: ${key} rows removed ${missing.map(r=>r.id)}`);
  d[key]=mapped.map(r=>{const o=old[key].find(x=>x.id===r.id);return o?{...o,...r}:r;});
 }
 const changed=!same(text(content.root),text(old.content.root))||['title','excerpt','verdict'].some(k=>!same(d[k],old[k]))||!same(d.seo.metaTitle,old.seo?.metaTitle)||!same(d.seo.metaDescription,old.seo?.metaDescription)
  ||rows(d.featureTable,['feature','whatflow','competitor'])!==rows(old.featureTable,['feature','whatflow','competitor'])||rows(d.faqs,['question','answer'])!==rows(old.faqs,['question','answer'])||rows(d.sources,['title','url','note'])!==rows(old.sources,['title','url','note']);
 if(!changed)continue;
 d.updatedAt=now;d.reviewedAt=now;source.push(old);candidate.push(d);report.comparisons.push(slug);
}
await mkdir(out,{recursive:true});
await writeFile(out+'/posts.sql',statements.join('\n'));
await writeFile(out+'/posts.json',JSON.stringify(postDocs));
await writeFile(out+'/source-documents.json',JSON.stringify(source));
await writeFile(out+'/candidate-documents.json',JSON.stringify(candidate));
await writeFile(out+'/new-comparison-docs.json','[]');
await writeFile(out+'/report.json',JSON.stringify({builtAt:now,...report},null,1));
console.log(JSON.stringify({out,posts:report.posts.length,comparisons:report.comparisons.length}));
