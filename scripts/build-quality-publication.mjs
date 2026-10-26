/** Guarded publication input; never reads credentials or invokes a remote service. */
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='content/library-quality-2026-10-27';
const docs=JSON.parse(await readFile(root+'/publication/posts.json'));
const before=JSON.parse(await readFile(root+'/live-posts.json'));
const q=v=>v==null?'NULL':typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const statements=[];
for(const p of docs){
 const old=before.find(x=>x.slug===p.slug);
 if(old){
  if(p.id!==old.id||p.publishedAt!==old.publishedAt||p.author!==old.author)throw Error('Identity changed');
  for(const field of ['sources','tags','faqs'])if(JSON.stringify(p[field])!==JSON.stringify(old[field]))throw Error('Existing children changed');
  statements.push(`UPDATE posts SET content=${q(JSON.stringify(p.content))},updated_at=${q(p.updatedAt)} WHERE id=${Number(p.id)} AND slug=${q(p.slug)} AND status='published' AND updated_at=${q(old.updatedAt)};`);
  continue;
 }
 const flat={title:p.title,slug:p.slug,excerpt:p.excerpt,category:p.category,author:p.author,author_role:p.authorRole,reviewed_at:p.reviewedAt,published_at:p.publishedAt,status:p.status,featured:p.featured,cover_image_url:p.coverImageUrl,cover_image_alt:p.coverImageAlt,cover_image_caption:p.coverImageCaption,content:JSON.stringify(p.content),seo_meta_title:p.seo.metaTitle,seo_meta_description:p.seo.metaDescription,created_at:p.createdAt,updated_at:p.updatedAt};
 statements.push(`INSERT INTO posts (${Object.keys(flat).join(',')}) SELECT ${Object.values(flat).map(q).join(',')} WHERE NOT EXISTS(SELECT 1 FROM posts WHERE slug=${q(p.slug)});`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(p.slug)} AND created_at=${q(p.createdAt)} AND updated_at=${q(p.updatedAt)} AND content=${q(JSON.stringify(p.content))} AND status='published')`;
 for(const [table,fields] of [['tags',['tag']],['sources',['title','url','note']],['faqs',['question','answer']]])for(const [i,row]of p[table].entries())statements.push(`INSERT INTO posts_${table} (_order,_parent_id,id,${fields.join(',')}) SELECT ${i+1},${parent},${q(row.id)},${fields.map(f=>q(row[f])).join(',')} WHERE ${parent} IS NOT NULL AND NOT EXISTS(SELECT 1 FROM posts_${table} WHERE id=${q(row.id)});`);
}
for(const s of statements)if(!/^(UPDATE posts SET |INSERT INTO posts(?:_tags|_sources|_faqs)? \()/.test(s))throw Error('Unexpected mutation');
const sql=statements.join('\n');await writeFile('/tmp/whatflow-quality-posts.sql',sql);
await writeFile(root+'/publication/sql-manifest.json',JSON.stringify({posts:docs.map(d=>({slug:d.slug,operation:before.some(x=>x.slug===d.slug)?'update':'insert'})),statements:statements.length,sha256:createHash('sha256').update(sql).digest('hex')},null,2));
console.log(JSON.stringify({posts:docs.length,statements:statements.length,output:'/tmp/whatflow-quality-posts.sql'}));
