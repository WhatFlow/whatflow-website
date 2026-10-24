/** Public metadata inventory, with access errors retained rather than bypassed.
 * Run again when the public site is accessible. Does not store article bodies.
 */
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin='https://judge.me';
const report={checkedAt:new Date().toISOString(),complete:false,pages:[],errors:[],sitemaps:[]};
const get=async url=>{
 const response=await fetch(url,{signal:AbortSignal.timeout(30000),redirect:'follow'});
 if(!response.ok)throw new Error(`${response.status} ${response.statusText}`);
 return response.text();
};
const clean=s=>s.replace(/<[^>]*>/g,' ').replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&quot;','"').replace(/\s+/g,' ').trim();
const normalize=href=>{try{const u=new URL(href,origin);u.hash='';if(u.origin!==origin||!/^\/blog(?:\/|$)/.test(u.pathname))return null;return u.href;}catch{return null;}};
const queue=['https://judge.me/blog'];const seen=new Set();
try{
 const robots=await get(`${origin}/robots.txt`);
 // Conservative stop: review any blog-specific or site-wide disallow before crawling.
 if(/^Disallow:\s*(?:\/\s*$|\/blog)/mi.test(robots))throw new Error('robots.txt disallows the site or blog; review scope before crawling');
 const sitemapQueue=[...robots.matchAll(/^Sitemap:\s*(\S+)/gmi)].map(m=>m[1]);
 if(!sitemapQueue.length)sitemapQueue.push(`${origin}/sitemap.xml`);
 const seenMaps=new Set();
 while(sitemapQueue.length){
  const url=sitemapQueue.shift();if(seenMaps.has(url))continue;
  if(new URL(url).origin!==origin)throw new Error(`External sitemap requires explicit review: ${url}`);
  seenMaps.add(url);const xml=await get(url);report.sitemaps.push(url);
  const locations=[...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(m=>m[1].replaceAll('&amp;','&'));
  if(/<sitemapindex[\s>]/i.test(xml))sitemapQueue.push(...locations);
  else queue.push(...locations.map(normalize).filter(Boolean));
 }
 while(queue.length){
  const url=queue.shift();if(seen.has(url))continue;seen.add(url);
  if(seen.size>5000)throw new Error('Inventory reached its 5000-page safety limit; completeness is unverified');
  await new Promise(resolve=>setTimeout(resolve,1000));
  const html=await get(url);
  const title=clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'');
  const headings=[...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)].map(m=>clean(m[1]));
  report.pages.push({url,title,headings,htmlDigest:createHash('sha256').update(html).digest('hex')});
  queue.push(...[...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(m=>normalize(m[1])).filter(Boolean));
 }
 report.complete=true;
}catch(error){report.errors.push({message:error.message});}
await writeFile('/tmp/judgeme-blog-inventory.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({complete:report.complete,pages:report.pages.length,errors:report.errors}));
if(!report.complete)process.exitCode=1;
