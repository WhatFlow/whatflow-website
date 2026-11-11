/** Export fidelity check: every baseline Markdown file must convert back to the live Lexical text, formatting, links and blocks. Usage: node scripts/verify-markdown-roundtrip.mjs <postsRoot> <comparisonsRoot> */
import fs from 'node:fs';import {readDoc,bodyToLexical} from './lib/refresh-content.mjs';import {markdownToLexical} from './build-quality-content.mjs';
const [A,C]=process.argv.slice(2);
const t=n=>!n?'':n.type==='text'?(n.format&1?'«'+n.text.trim()+'»':n.text):n.type==='linebreak'?' ':n.type==='block'?(n.fields.blockType==='cta'?'':'['+n.fields.url+'|'+n.fields.alt+'|'+(n.fields.caption||'')+']'):n.type==='link'?'<'+n.fields?.url+'>'+(n.children||[]).map(t).join('')+'</>':(n.children||[]).map(t).join(' ');
const norm=s=>s.replace(/\s+/g,'').replace(/»«/g,'');
let bad=0,total=0;
for(const [dir,live,isComp] of [[A+'/baseline',A+'/live-snapshot.json',false],[C+'/baseline',C+'/live-snapshot.json',true]]){
 const docs=new Map(JSON.parse(fs.readFileSync(live)).docs.map(d=>[d.slug,d]));
 for(const f of fs.readdirSync(dir)){total++;const slug=f.slice(0,-3);const {body}=await readDoc(dir+'/'+f);let lex;try{lex=isComp?markdownToLexical(body):bodyToLexical(body,slug);}catch(e){bad++;console.log('ERR',slug,e.message);continue;}
  const a=norm(t(docs.get(slug).content.root)),b=norm(t(lex.root));if(a!==b){bad++;let k=0;while(a[k]===b[k])k++;console.log(slug,'|',a.slice(Math.max(0,k-50),k+50),'\n    vs',b.slice(Math.max(0,k-50),k+50));}}}
console.log('round-trip mismatches',bad,'of',total);
