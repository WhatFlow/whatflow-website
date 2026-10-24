/** Import original merchant guides into native Payload posts; no runtime fallback. */
import {writeFile,stat} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import articles from '../content/blog/growth/index.mjs';
const publish=process.argv.includes('--publish');
const timestamp=new Date().toISOString();
const id=()=>randomBytes(12).toString('hex');
const q=value=>value===null||value===undefined?'NULL':typeof value==='boolean'?(value?'1':'0'):`'${String(value).replaceAll("'","''")}'`;
const text=value=>({type:'text',version:1,text:value,format:0,detail:0,mode:'normal',style:''});
const paragraph=children=>({type:'paragraph',version:1,direction:'ltr',format:'',indent:0,textFormat:0,textStyle:'',children:typeof children==='string'?[text(children)]:children});
const heading=value=>({type:'heading',version:1,tag:'h2',direction:'ltr',format:'',indent:0,children:[text(value)]});
const link=(label,url)=>({type:'link',version:3,direction:'ltr',format:'',indent:0,fields:{linkType:'custom',newTab:false,url},children:[text(label)]});
const featured=new Set(['collect-first-product-reviews-shopify','shopify-product-page-trust-checklist','post-purchase-customer-journey-shopify','whatsapp-marketing-plan-small-shopify-store','shared-team-inbox-small-shopify-business','shopify-content-plan-customer-questions']);
const screenshotSlugs=new Set(['abandoned-checkout-whatsapp-conversation','whatsapp-campaign-preflight-checklist']);
const screenshot={url:'/comparisons/whatflow-template-editor.jpg',alt:'WhatFlow template editor inside Shopify admin showing an abandoned-checkout message preview',caption:'Real WhatFlow demo-store template editor. The preview uses sample data and illustrates configuration, not a completed send or a measured recovery result.'};
const statements=[];const docs=[];
for(const a of articles){
 const children=a.body.trim().split(/\n\s*\n/).flatMap(block=>{if(!block.startsWith('## '))return [paragraph(block.replaceAll('\n',' '))];const [title,...body]=block.slice(3).split('\n');return [heading(title),...(body.join(' ').trim()?[paragraph(body.join(' ').trim())]:[])];});
 const same=articles.filter(p=>p.category===a.category&&p.slug!==a.slug);
 const cross=articles.find(p=>p.slug===(a.category==='whatsapp'?'post-purchase-customer-journey-shopify':'whatsapp-marketing-plan-small-shopify-store'));
 const related=[...same.slice(0,2),cross];
 children.push(heading('Related guides for your store'));
 for(const p of related)children.push(paragraph([link(p.title,`/blog/${p.slug}`)]));
 children.push({type:'block',version:2,format:'',fields:{id:id(),blockType:'cta',heading:'Bring the customer conversation into Shopify',description:'Explore WhatFlow Business API for WhatsApp messaging and a team inbox with no seat fees. Features are included across plans, including Free; message allowances and rates differ.',buttonText:'Explore WhatFlow on Shopify',buttonUrl:'https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=merchant_guides',badge:'Free plan available',style:'green'}});
 const content={root:{type:'root',version:1,direction:'ltr',format:'',indent:0,children}};
 const cover=screenshotSlugs.has(a.slug)?screenshot:null;
 if(cover)await stat(`public${cover.url}`);
 const flat={title:a.title,slug:a.slug,excerpt:a.excerpt,category:a.category,author:a.author,author_role:a.authorRole,reviewed_at:a.reviewedAt,published_at:publish?timestamp:null,status:publish?'published':'draft',featured:featured.has(a.slug),cover_image_url:cover?.url,cover_image_alt:cover?.alt,cover_image_caption:cover?.caption,content:JSON.stringify(content),seo_meta_title:a.title,seo_meta_description:a.excerpt,created_at:timestamp,updated_at:timestamp};
 const columns=Object.keys(flat);
 statements.push(`INSERT INTO posts (${columns.join(',')}) VALUES (${Object.values(flat).map(q).join(',')}) ON CONFLICT(slug) DO UPDATE SET ${columns.filter(c=>!['slug','created_at','published_at'].includes(c)).map(c=>`${c}=excluded.${c}`).join(',')},published_at=COALESCE(posts.published_at,excluded.published_at) WHERE posts.status='draft' OR excluded.status='published';`);
 const parent=`(SELECT id FROM posts WHERE slug=${q(a.slug)} AND status=${q(flat.status)})`;
 for(const array of [{table:'tags',fields:['tag'],rows:a.tags.map(tag=>({tag}))},{table:'faqs',fields:['question','answer'],rows:a.faqs},{table:'sources',fields:['title','url','note'],rows:a.sources}]){
  statements.push(`DELETE FROM posts_${array.table} WHERE _parent_id=${parent};`);
  for(const [i,row] of array.rows.entries())statements.push(`INSERT INTO posts_${array.table} (_order,_parent_id,id,${array.fields.join(',')}) SELECT ${i+1},${parent},${q(id())},${array.fields.map(f=>q(row[f])).join(',')} WHERE ${parent} IS NOT NULL;`);
 }
 docs.push({...a,status:flat.status,featured:flat.featured,content,coverImageUrl:cover?.url});
}
for(const statement of statements){const target=statement.match(/^(?:INSERT INTO|DELETE FROM)\s+([^\s(]+)/)?.[1];if(!['posts','posts_tags','posts_faqs','posts_sources'].includes(target))throw new Error(`Unexpected target ${target}`);}
const output=`/tmp/whatflow-growth-${publish?'publish':'drafts'}.sql`;
await writeFile(output,statements.join('\n'));
await writeFile('/tmp/whatflow-growth-documents.json',JSON.stringify(docs));
console.log(JSON.stringify({output,documents:docs.length,status:publish?'published':'draft',bytes:Buffer.byteLength(statements.join('\n'))}));
