/**
 * Update WhatFlow's own Shopify App Store rating figures in Markdown working copies.
 * Only touches figures attached to WhatFlow's two listings; competitor ratings are left alone.
 * On a changed line, "checked <old date>" style dates for WhatFlow's figure move to the new check date.
 * Usage: node scripts/update-whatflow-ratings.mjs <dir> --api <old>:<new> --ca <old>:<new> --from "November 11, 2026" --to "November 18, 2026" [--short-from "Nov 11" --short-to "Nov 18"]
 */
import fs from 'node:fs';import path from 'node:path';
const args=process.argv.slice(2);const dir=args[0];const opt=k=>{const i=args.indexOf(k);return i>0?args[i+1]:undefined;};
const [apiOld,apiNew]=(opt('--api')||'').split(':');const [caOld,caNew]=(opt('--ca')||'').split(':');
const from=opt('--from'),to=opt('--to'),sFrom=opt('--short-from'),sTo=opt('--short-to');
if(!dir||!apiOld||!caOld||!from||!to)throw Error('see usage');
const api=new RegExp(`(4\\.9(?:\\/5| out of 5)?(?: rating)? (?:from |\\()(?:its first )?)${apiOld}( (?:ratings|reviews))`,'g');
const ca=new RegExp(`(\\b4\\.0(?:\\/5| out of 5)?(?: rating)? (?:from |\\())${caOld}( (?:ratings|reviews))|\\b${caOld} ratings\\b`,'g');
const stats={files:0,changed:0,api:0,ca:0,dates:0};
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))){
 stats.files++;const p=path.join(dir,f);const lines=fs.readFileSync(p,'utf8').split('\n');let changed=false;
 for(let i=0;i<lines.length;i++){let l=lines[i];const o=l;
  l=l.replace(api,(m,a,b)=>{stats.api++;return a+apiNew+b;});
  l=l.replace(ca,(m,a,b)=>{stats.ca++;return a!==undefined?a+caNew+b:`${caNew} ratings`;});
  if(l!==o&&!/\bboth\b/i.test(l)){const before=l;l=l.split(from).join(to);if(sFrom)l=l.split(sFrom+',').join(sTo+',').replace(new RegExp(`\\b${sFrom}\\b(?!,? 20)`,'g'),sTo).replace(new RegExp(`${sFrom}, 2026`,'g'),`${sTo}, 2026`);if(l!==before)stats.dates++;}
  if(l!==o){lines[i]=l;changed=true;}}
 if(changed){stats.changed++;fs.writeFileSync(p,lines.join('\n'));}
}
console.log(JSON.stringify(stats));
