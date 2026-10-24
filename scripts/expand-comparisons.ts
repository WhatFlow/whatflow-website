/** User-authorized rewrite + publication. Uses Payload operations and native version history.
 * Run with PAYLOAD_REMOTE_BINDINGS=true to target the configured production D1 database.
 * Completed slugs are checkpointed; pass --fresh to deliberately republish the full set.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getPayload } from 'payload';
import config from '../src/payload.config';
import articles from '../content/comparisons/expanded.mjs';
import { comparisonLexical } from './comparison-lexical';

const fingerprint = createHash('sha256').update(JSON.stringify(articles)).digest('hex').slice(0,12);
const checkpoint = `/tmp/whatflow-comparisons-${process.env.PAYLOAD_REMOTE_BINDINGS === 'true' ? 'remote' : 'local'}-${fingerprint}.json`;
const done = new Set<string>();
if (!process.argv.includes('--fresh')) {
  try { for (const slug of JSON.parse(await readFile(checkpoint, 'utf8'))) done.add(slug); } catch { /* First run. */ }
}
if (articles.length < 101 || new Set(articles.map(a=>a.slug)).size !== articles.length) throw new Error('Expected at least 101 unique comparisons');
for (const a of articles) {
  if (a.body.split(/\s+/).length < 600 || !a.sources?.length || a.author !== 'Safwan Adnan') throw new Error(`Editorial check failed: ${a.slug}`);
}
const payload = await getPayload({ config });
const current = await payload.find({collection:'comparisons',limit:200,depth:0,draft:true});
await writeFile(`/tmp/whatflow-comparisons-backup-${Date.now()}.json`,JSON.stringify(current.docs,null,2));
const existing = new Map(current.docs.map(doc=>[doc.slug,doc]));
const queue=articles.filter(a=>!done.has(a.slug));
let failures=0;
let checkpointWrites=Promise.resolve();
const saveCheckpoint=()=>{ const snapshot=JSON.stringify([...done]); checkpointWrites=checkpointWrites.then(()=>writeFile(checkpoint,snapshot)); return checkpointWrites; };
console.log(`Publishing ${queue.length} comparisons; ${done.size} already completed. Checkpoint ${checkpoint}`);
await Promise.all(Array.from({length:4},async()=>{
  while(queue.length){
    const article=queue.shift()!;
    const {body,...fields}=article;
    let success=false;
    for(let attempt=1;attempt<=3&&!success;attempt++){
      try{
        // Re-query on retries: a prior attempt may have created the draft before a network failure.
        const prior=attempt===1?existing.get(article.slug):(await payload.find({collection:'comparisons',where:{slug:{equals:article.slug}},limit:1,depth:0,draft:true})).docs[0];
        const data={...fields,content:comparisonLexical(body),publishedAt:prior?.publishedAt||new Date().toISOString(),imageSourceUrl:'https://apps.shopify.com/whatflow-official-api',_status:'draft' as const};
        const staged=prior?await payload.update({collection:'comparisons',id:prior.id,draft:true,data}):await payload.create({collection:'comparisons',draft:true,data});
        if(staged.faqs?.length !== article.faqs?.length || staged.sources?.length !== article.sources.length || staged.featureTable?.length !== article.featureTable?.length) throw new Error('Incomplete staged arrays; preserving the published version');
        // Publish the complete staged version, preserving native rollback history for rewrites.
        const published=await payload.update({collection:'comparisons',id:staged.id,draft:false,data:{_status:'published'}});
        if(published.author!=='Safwan Adnan'||!published.sources?.length||!published.featureTable?.length||!published.faqs?.length) throw new Error('Incomplete published document');
        done.add(article.slug);await saveCheckpoint();success=true;
        console.log(`Published ${done.size}/${articles.length}: ${article.slug}`);
      }catch(error){
        console.error(`Attempt ${attempt} failed for ${article.slug}: ${error instanceof Error?error.message.slice(0,160):'Unknown error'}`);
        if(attempt<3) await new Promise(resolve=>setTimeout(resolve,attempt*1500));
      }
    }
    if(!success)failures++;
  }
}));
await checkpointWrites;
console.log(JSON.stringify({published:done.size,total:articles.length,failures,checkpoint}));
await payload.destroy();
process.exit(failures?1:0);
