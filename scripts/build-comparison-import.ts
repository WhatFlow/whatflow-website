/** Generate a collection-only D1 import for use with normal authenticated Wrangler tooling.
 * Preserves existing document IDs/dates/relationships and all historical revisions.
 * Adds a Payload-compatible published version with matching child arrays per article.
 * No schema changes, credential handling or writes to unrelated collections.
 */
import {writeFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import allArticles from '../content/comparisons/expanded.mjs';
const selected = process.argv.find(arg=>arg.startsWith('--slugs='))?.slice(8).split(',');
const articles = selected ? selected.map(slug=>{const article=allArticles.find(a=>a.slug===slug);if(!article)throw new Error(`Unknown comparison: ${slug}`);return article;}) : allArticles;
import {comparisonLexical} from './comparison-lexical';
const q=(v:unknown):string=>v===null||v===undefined?'NULL':typeof v==='number'?String(v):typeof v==='boolean'?(v?'1':'0'):`'${String(v).replaceAll("'","''")}'`;
const name=(v:string)=>`"${v}"`;
const timestamp=new Date().toISOString();
const sql:string[]=[];
for(const a of articles){
 const flat:Record<string,unknown>={title:a.title,slug:a.slug,competitor:a.competitor,competitor_url:a.competitorUrl,category:a.category,excerpt:a.excerpt,verdict:a.verdict,author:a.author,author_role:a.authorRole,published_at:timestamp,reviewed_at:a.reviewedAt,featured:Boolean(a.featured),image_url:a.imageUrl,image_alt:a.imageAlt,image_caption:a.imageCaption,image_source_url:'https://apps.shopify.com/whatflow-official-api',content:JSON.stringify(comparisonLexical(a.body)),cta_heading:a.cta?.heading,cta_description:a.cta?.description,cta_label:a.cta?.label,seo_meta_title:a.seo?.metaTitle,seo_meta_description:a.seo?.metaDescription,seo_noindex:false,updated_at:timestamp,created_at:timestamp,_status:'published'};
 const columns=Object.keys(flat);
 sql.push(`INSERT INTO comparisons (${columns.map(name).join(',')}) VALUES (${Object.values(flat).map(q).join(',')}) ON CONFLICT(slug) DO UPDATE SET ${columns.filter(c=>!['slug','created_at','published_at'].includes(c)).map(c=>`${name(c)}=excluded.${name(c)}`).join(',')};`);
 const parent=`(SELECT id FROM comparisons WHERE slug=${q(a.slug)})`;
 const arrays=[{table:'feature_table',values:a.featureTable!,fields:['feature','whatflow','competitor']},{table:'faqs',values:a.faqs!,fields:['question','answer']},{table:'sources',values:a.sources,fields:['title','url','note']}];
  for(const array of arrays){
  sql.push(`DELETE FROM comparisons_${array.table} WHERE _parent_id=${parent};`);
  const rowIds=array.values.map(()=>randomBytes(12).toString('hex'));
  sql.push(`INSERT INTO comparisons_${array.table} (_order,_parent_id,id,${array.fields.map(name).join(',')}) VALUES ${array.values.map((row,i)=>`(${i+1},${parent},${q(rowIds[i])},${array.fields.map(f=>q((row as unknown as Record<string,unknown>)[f])).join(',')})`).join(',')};`);
 }
 if(a.relatedSlugs){
  sql.push(`DELETE FROM comparisons_rels WHERE parent_id=${parent} AND path='relatedComparisons';`);
  for(const [index,slug] of a.relatedSlugs.entries())sql.push(`INSERT INTO comparisons_rels (${name('order')},parent_id,path,comparisons_id) VALUES (${index+1},${parent},'relatedComparisons',(SELECT id FROM comparisons WHERE slug=${q(slug)}));`);
 }
 sql.push(`UPDATE _comparisons_v SET latest=0 WHERE parent_id=${parent};`);
 // Copy the saved published row so retained creation/publication dates and cover image stay exact.
 const versionColumns=[...columns,'cover_image_id'];
 sql.push(`INSERT INTO _comparisons_v (parent_id,${versionColumns.map(c=>name('version_'+c)).join(',')},created_at,updated_at,latest) SELECT id,${versionColumns.map(name).join(',')},${q(timestamp)},${q(timestamp)},1 FROM comparisons WHERE slug=${q(a.slug)};`);
 const version=`(SELECT id FROM _comparisons_v WHERE parent_id=${parent} AND latest=1 ORDER BY id DESC LIMIT 1)`;
 for(const array of arrays){
  sql.push(`INSERT INTO _comparisons_v_version_${array.table} (_order,_parent_id,${array.fields.map(name).join(',')},_uuid) SELECT _order,${version},${array.fields.map(name).join(',')},id FROM comparisons_${array.table} WHERE _parent_id=${parent};`);
 }
 sql.push(`INSERT INTO _comparisons_v_rels ("order",parent_id,path,comparisons_id) SELECT "order",${version},path,comparisons_id FROM comparisons_rels WHERE parent_id=${parent};`);
}
// Defense against accidentally broadening this one-time data operation.
for(const statement of sql){
 const leading=statement.match(/^(?:INSERT INTO|UPDATE|DELETE FROM)\s+([^\s(]+)/)?.[1];
 if(!leading||!/^_?comparisons(?:_v)?(?:_version)?(?:_feature_table|_faqs|_sources|_rels)?$/.test(leading))throw new Error(`Unexpected mutation target: ${leading}`);
}
const output=selected?'/tmp/whatflow-comparisons-update.sql':'/tmp/whatflow-comparisons-expanded.sql';
await writeFile(output,sql.join('\n'));
console.log(JSON.stringify({output,articles:articles.length,statements:sql.length,bytes:Buffer.byteLength(sql.join('\n'))}));
