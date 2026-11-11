/** Export live Payload posts or comparisons (REST JSON) to editable Markdown with frontmatter. Offline tool. */
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const [input,outDir]=process.argv.slice(2);
if(!input||!outDir)throw Error('usage: export-posts-markdown.mjs <posts.json> <outDir>');
const docs=JSON.parse(await readFile(input,'utf8')).docs;
const esc=s=>s.replace(/([*_`\[\]])/g,'\\$1');
const merge=nodes=>nodes.reduce((a,n)=>{const p=a[a.length-1];if(p&&p.type==='text'&&n.type==='text'&&p.format===n.format)a[a.length-1]={...p,text:p.text+n.text};else a.push(n);return a;},[]);
function inline(nodes=[]){return merge(nodes).map(n=>{
 if(n.type==='text'){if(!(n.format&19))return esc(n.text);const [,lead,core,trail]=n.text.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!core)return n.text;let t=n.format&16?'`'+core+'`':esc(core);if(n.format&1)t='**'+t+'**';if(n.format&2)t='*'+t+'*';return lead+t+trail;}
 if(n.type==='link')return `[${inline(n.children)}](${n.fields?.url})`;
 if(n.type==='linebreak')return '  \n';
 throw Error('inline '+n.type);}).join('');}
function block(n){
 switch(n.type){
  case 'heading':return '#'.repeat(Number(n.tag.slice(1)))+' '+inline(n.children);
  case 'paragraph':return inline(n.children);
  case 'quote':return '> '+inline(n.children);
  case 'list':return n.children.map((li,i)=>(n.listType==='number'?`${i+1}. `:'- ')+li.children.map(c=>c.type==='list'?'\n'+block(c).split('\n').map(l=>'   '+l).join('\n'):inline([c])).join('')).join('\n');
  case 'table':{const rows=n.children.map(r=>'| '+r.children.map(c=>c.children.map(p=>inline(p.children)).join(' ')).join(' | ')+' |');rows.splice(1,0,'|'+n.children[0].children.map(()=>' --- |').join(''));return rows.join('\n');}
  case 'block':{const f=n.fields;if(f.blockType==='cta')return '<!-- CTA -->';if(f.blockType==='screenshot')return `![${f.alt}](${f.url}${f.caption?` "${f.caption.replaceAll('"',"'")}"`:''})`;throw Error('block '+f.blockType);}
 }
 throw Error('block type '+n.type);
}
await mkdir(outDir,{recursive:true});
const kind=process.argv[4]||'posts';
for(const d of docs){
 const fm=kind==='comparisons'?{id:d.id,title:d.title,slug:d.slug,competitor:d.competitor,competitorUrl:d.competitorUrl,category:d.category,excerpt:d.excerpt,verdict:d.verdict,metaTitle:d.seo?.metaTitle,metaDescription:d.seo?.metaDescription,cta:{heading:d.cta?.heading,description:d.cta?.description,label:d.cta?.label},featureTable:d.featureTable,faqs:d.faqs,sources:d.sources}:{title:d.title,slug:d.slug,category:d.category,excerpt:d.excerpt,metaTitle:d.seo?.metaTitle,metaDescription:d.seo?.metaDescription,tags:(d.tags||[]).map(t=>t.tag),coverImageUrl:d.coverImageUrl||null,coverImageAlt:d.coverImageAlt||null,publishedAt:d.publishedAt,faqs:(d.faqs||[]).map(({question,answer})=>({question,answer})),sources:(d.sources||[]).map(({title,url,note})=>({title,url,note}))};
 const body=d.content.root.children.map(block).join('\n\n');
 await writeFile(`${outDir}/${d.slug}.md`,'---\n'+JSON.stringify(fm,null,2)+'\n---\n\n'+body+'\n');
}
console.log('exported',docs.length);
