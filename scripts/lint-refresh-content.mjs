/** Validate refreshed blog posts and comparisons before building SQL. Usage: node scripts/lint-refresh-content.mjs [--quiet] */
import {readDoc,listMarkdown,checkDoc,linkableSet} from './lib/refresh-content.mjs';
const quiet=process.argv.includes('--quiet');
const linkable=await linkableSet();
const sets=[['post','content/blog/refresh-2026-11-05/rewritten'],['post','content/blog/refresh-2026-11-05/new'],['comparison','content/comparisons/refresh-2026-11-05/edited'],['newcomparison','content/comparisons/refresh-2026-11-05/new']];
let errorCount=0,warnCount=0;const summary={};
for(const [kind,dir] of sets){
 const files=await listMarkdown(dir);summary[dir]={files:files.length,words:0,errors:0,warnings:0};
 for(const f of files){
  const slug=f.slice(0,-3);let r;
  try{r=await checkDoc(await readDoc(`${dir}/${f}`),{kind,slug,linkable});}catch(e){r={errors:[e.message],warnings:[],stats:{words:0}};}
  summary[dir].words+=r.stats.words;summary[dir].errors+=r.errors.length;summary[dir].warnings+=r.warnings.length;
  errorCount+=r.errors.length;warnCount+=r.warnings.length;
  if(r.errors.length||(!quiet&&r.warnings.length))console.log(`${dir.split('/').pop()}/${slug} [${r.stats.words}w] ${r.errors.map(e=>'ERROR '+e).concat(r.warnings).join(' | ')}`);
 }
}
console.log(JSON.stringify(summary,null,1));console.log({errorCount,warnCount});
process.exitCode=errorCount?1:0;
