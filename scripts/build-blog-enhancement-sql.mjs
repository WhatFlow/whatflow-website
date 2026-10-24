import {readFile,writeFile} from 'node:fs/promises';
const root=process.env.BLOG_ENHANCEMENT_ROOT||'content/blog/enhancement-2026-10-25';
const before=JSON.parse(await readFile(`${root}/source-documents.json`));
const after=JSON.parse(await readFile(`${root}/candidate-documents.json`));
const q=v=>v==null?'NULL':`'${String(v).replaceAll("'","''")}'`;
const sql=[];
for(const p of after){
 const old=before.find(d=>d.id===p.id&&d.slug===p.slug);if(!old)throw Error('Unexpected post');
 for(const key of ['slug','publishedAt','createdAt','author','authorRole','status','faqs','sources','tags'])if(JSON.stringify(old[key])!==JSON.stringify(p[key]))throw Error('Unexpected change '+key);
 const values={content:JSON.stringify(p.content),seo_meta_title:p.seo.metaTitle,seo_meta_description:p.seo.metaDescription,cover_image_url:p.coverImageUrl,cover_image_alt:p.coverImageAlt,cover_image_caption:p.coverImageCaption,reviewed_at:p.reviewedAt,updated_at:p.updatedAt};
 sql.push(`UPDATE posts SET ${Object.entries(values).map(([k,v])=>`${k}=${q(v)}`).join(',')} WHERE id=${Number(p.id)} AND slug=${q(p.slug)} AND updated_at=${q(old.updatedAt)} AND status='published';`);
}
await writeFile(process.env.BLOG_ENHANCEMENT_SQL||'/tmp/whatflow-blog-enhancements.sql',sql.join('\n'));
console.log(JSON.stringify({updates:sql.length,scope:'posts only',guard:'id, slug, previous updated_at, published status'}));
