/** Read-only production probes with a header-filtered, bounded Worker tail. */
import {spawn} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import assert from 'node:assert/strict';
const base = process.env.VERIFY_SITE_URL || 'https://whatflow.tech';
const probe = randomUUID();
const tail = spawn(process.execPath, ['node_modules/wrangler/bin/wrangler.js','tail','whatflow','--format','json','--header',`x-whatflow-schema-probe:${probe}`], {stdio:['ignore','pipe','pipe']});
let output = '', diagnostic = '';
tail.stdout.setEncoding('utf8'); tail.stderr.setEncoding('utf8');
tail.stdout.on('data', chunk => {output += chunk;}); tail.stderr.on('data', chunk => {diagnostic += chunk;});
const close = new Promise(resolve => tail.on('close', resolve));
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
const results = [];
try {
  for (let attempt=0; attempt<30 && !/Connected|waiting for logs/i.test(output+diagnostic); attempt++) {
    if (tail.exitCode !== null) throw new Error('Worker tail ended before verification');
    await sleep(500);
  }
  for (const [path,count] of [['/api/case-studies?limit=1',0],['/api/posts?limit=1',58],['/api/comparisons?limit=1',106],['/api/integrations?limit=1',0],['/api/changelog?limit=1',0],['/api/country-rates?limit=1',0],['/api/media?limit=1',0],['/case-studies',null],['/blog',null],['/compare',null],['/',null]]) {
    const url = new URL(path,base); url.searchParams.set('cms_schema_probe',probe);
    const response = await fetch(url,{headers:{'x-whatflow-schema-probe':probe,'cache-control':'no-cache'},signal:AbortSignal.timeout(45000)});
    assert.equal(response.status,200,path);
    const body = await response.text();
    assert(!/D1_ERROR|no such table/.test(body),path);
    if (count !== null) {const json=JSON.parse(body); assert.equal(json.totalDocs,count,path); assert(!json.errors);}
    results.push({path,status:response.status,cache:response.headers.get('x-whatflow-page-cache')});
  }
  await sleep(3000);
} finally {
  tail.kill('SIGINT');
  await Promise.race([close,sleep(2000)]);
  if(tail.exitCode===null) tail.kill('SIGTERM');
}
const events=[];
let start=-1,depth=0,inString=false,escaped=false;
for(let i=0;i<output.length;i++) {
  const c=output[i];
  if(start<0) {if(c==='{'){start=i;depth=1;inString=false;escaped=false;} continue;}
  if(inString){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')inString=false;continue;}
  if(c==='"')inString=true;
  else if(c==='{')depth++;
  else if(c==='}' && --depth===0){try{const event=JSON.parse(output.slice(start,i+1));if(event.event?.request)events.push(event);}catch{}start=-1;}
}
// Cloudflare redacts URL query values in tails; correlate by our unique header.
const own=events.filter(e=>e.event.request.headers?.['x-whatflow-schema-probe']===probe);
assert(own.length>=results.length,`Only ${own.length}/${results.length} live Worker probes observed`);
const invocations=own.map(e=>({path:new URL(e.event.request.url).pathname,outcome:e.outcome,cpuTimeMs:e.cpuTime,wallTimeMs:e.wallTime,consoleEvents:e.logs?.length||0,exceptions:e.exceptions?.length||0}));
assert(invocations.every(e=>e.outcome==='ok' && e.exceptions===0));
assert(!JSON.stringify(own.map(e=>e.logs)).includes('no such table'));
const report={verifiedAt:new Date().toISOString(),site:base,passed:true,requests:results.length,defaultPopulationDepth:true,observedInvocations:own.length,totalConsoleEvents:invocations.reduce((sum,e)=>sum+e.consoleEvents,0),missingTableErrors:0,results,invocations};
await writeFile('content/cms-schema-repair-2026-10-26/live-verification.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,results:undefined,invocations:undefined}));
