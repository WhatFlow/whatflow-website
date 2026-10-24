/** Scoped native Payload blog import. Runtime pages read CMS documents only. */
import {readFile,writeFile,stat} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {posts,screenshots} from '../content/blog/shopify-flow.mjs';
const publish=process.argv.includes('--publish');
const now=new Date().toISOString();
const id=()=>randomBytes(12).toString('hex');
const q=v=>v===null||v===undefined?'NULL':typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const text=value=>({type:'text',version:1,text:value,format:0,detail:0,mode:'normal',style:''});
const paragraph=children=>({type:'paragraph',version:1,direction:'ltr',format:'',indent:0,textFormat:0,textStyle:'',children:typeof children==='string'?[text(children)]:children});
const heading=value=>({type:'heading',tag:'h2',version:1,direction:'ltr',format:'',indent:0,children:[text(value)]});
const link=(label,url)=>({type:'link',version:3,direction:'ltr',format:'',indent:0,fields:{linkType:'custom',newTab:false,url},children:[text(label)]});
const imageUrl=key=>`/blog/shopify-flow/${screenshots[key].filename}`;
const used=new Set(posts.flatMap(p=>[p.cover,...p.sections.filter(s=>s.kind==='screenshot').map(s=>s.key)]));
const missing=[];
for(const key of used){
 const shot=screenshots[key];
 if(!shot)throw new Error(`Unknown screenshot ${key}`);
 try{
  const filename=`public${imageUrl(key)}`;
  const info=await stat(filename);
  const bytes=await readFile(filename);
  if(info.size<10000||bytes[0]!==0xff||bytes[1]!==0xd8)throw new Error('Expected a real JPEG screenshot');
 }catch(error){missing.push({key,message:error.message});}
}
if(publish&&missing.length)throw new Error(`Publication requires real, reviewed screenshots: ${missing.map(m=>m.key).join(', ')}`);
const sql=[];
const manifest=[];
for(const post of posts){
 const children=post.sections.flatMap(section=>section.kind==='screenshot'?[{
  type:'block',version:2,format:'',fields:{id:id(),blockType:'screenshot',url:imageUrl(section.key),alt:screenshots[section.key].alt,caption:screenshots[section.key].caption,sourceUrl:'https://apps.shopify.com/whatflow-official-api',width:screenshots[section.key].width||1440,height:screenshots[section.key].height||900},
 }]:[heading(section.heading),...section.paragraphs.map(paragraph)]);
 children.push(heading('Continue building your Shopify Flow setup'));
 for(const other of posts.filter(p=>p.slug!==post.slug).slice(0,3))children.push(paragraph([link(other.title,`/blog/${other.slug}`)]));
 children.push({type:'block',version:2,format:'',fields:{id:id(),blockType:'cta',heading:'Build your first WhatsApp workflow in Shopify',description:'WhatFlow Business API includes all features across plans, including Free, with no inbox seat fees. Choose your plan around messaging allowances and rates.',buttonText:'Explore WhatFlow on Shopify',buttonUrl:'https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=shopify_flow_guides',badge:'Free plan available',style:'green'}});
 const content={root:{type:'root',version:1,direction:'ltr',format:'',indent:0,children}};
 const flat={title:post.title,slug:post.slug,excerpt:post.excerpt,cover_image_url:imageUrl(post.cover),cover_image_alt:screenshots[post.cover].alt,cover_image_caption:screenshots[post.cover].caption,reviewed_at:now,category:'guides',author:'Safwan Adnan',author_role:'Co-founder and CEO of WhatFlow',published_at:publish?now:null,status:publish?'published':'draft',featured:Boolean(post.featured),content:JSON.stringify(content),seo_meta_title:post.title,seo_meta_description:post.excerpt,updated_at:now,created_at:now};
 const columns=Object.keys(flat);
 sql.push(`INSERT INTO posts (${columns.join(',')}) VALUES (${Object.values(flat).map(q).join(',')}) ON CONFLICT(slug) DO UPDATE SET ${columns.filter(c=>!['slug','created_at','published_at'].includes(c)).map(c=>`${c}=excluded.${c}`).join(',')},published_at=COALESCE(posts.published_at,excluded.published_at) WHERE posts.status='draft' OR excluded.status='published';`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(post.slug)} AND status=${q(flat.status)})`;
 for(const array of [{table:'tags',fields:['tag'],rows:post.tags.map(tag=>({tag}))},{table:'faqs',fields:['question','answer'],rows:post.faqs},{table:'sources',fields:['title','url','note'],rows:post.sources}]){
  sql.push(`DELETE FROM posts_${array.table} WHERE _parent_id=${parent};`);
  for(const [i,row] of array.rows.entries())sql.push(`INSERT INTO posts_${array.table} (_order,_parent_id,id,${array.fields.join(',')}) SELECT ${i+1},${parent},${q(id())},${array.fields.map(f=>q(row[f])).join(',')} WHERE ${parent} IS NOT NULL;`);
 }
 const wordCount=post.sections.filter(s=>s.kind==='section').flatMap(s=>[s.heading,...s.paragraphs]).join(' ').split(/\s+/).length;
 if(wordCount<650)throw new Error(`Article too short: ${post.slug} ${wordCount}`);
 manifest.push({slug:post.slug,title:post.title,status:flat.status,words:wordCount,faqs:post.faqs.length,screenshots:post.sections.filter(s=>s.kind==='screenshot').length,author:flat.author});
}
for(const statement of sql){
 const target=statement.match(/^(?:INSERT INTO|DELETE FROM)\s+([^\s(]+)/)?.[1];
 if(!['posts','posts_tags','posts_faqs','posts_sources'].includes(target))throw new Error(`Unexpected mutation: ${target}`);
}
const output=`/tmp/whatflow-flow-posts-${publish?'publish':'drafts'}.sql`;
await writeFile(output,sql.join('\n'));
await writeFile('/tmp/whatflow-flow-posts-manifest.json',JSON.stringify({generatedAt:now,publish,missingScreenshots:missing.map(m=>m.key),posts:manifest},null,2));
console.log(JSON.stringify({output,posts:manifest,missingScreenshots:missing.map(m=>m.key)},null,2));
