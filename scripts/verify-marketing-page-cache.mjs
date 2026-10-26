/** Read-only production checks: public cache hits and private/navigation isolation. */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
const base = process.env.VERIFY_SITE_URL || 'https://whatflow.tech';
const userAgent = `WhatFlowCacheVerification/${Date.now()}`;
const results = [];
async function get(path, headers = {}, method = 'GET') {
  const r = await fetch(new URL(path, base), {method, redirect: 'manual', headers: {'user-agent': userAgent, accept: 'text/html', ...headers}, signal: AbortSignal.timeout(45000)});
  const body = await r.text();
  return {status: r.status, cache: r.headers.get('x-whatflow-page-cache'), type: r.headers.get('content-type'), control: r.headers.get('cache-control'), colo: r.headers.get('cf-ray')?.split('-').at(-1), hash: createHash('sha256').update(body).digest('hex'), body};
}
for (const path of ['/', '/inbox', '/pricing', '/blog', '/compare', '/compare/whatflow-vs-zendesk', '/blog/shared-team-inbox-small-shopify-business', '/blog?page=2', '/compare?category=support', '/sitemap.xml', '/blog/rss.xml']) {
  const first = await get(path);
  assert.equal(first.status, 200, path);
  assert.equal(first.cache, 'MISS', path + ' cold request');
  let second;
  for (let attempt = 0; attempt < 5; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 300));
    second = await get(path);
    if (second.cache === 'HIT') break;
  }
  assert.equal(second.cache, 'HIT', path + ' repeat request');
  assert.equal(second.hash, first.hash, path + ' body changed');
  assert.equal(second.control, 'public, max-age=0, must-revalidate');
  results.push({path, first: first.cache, repeated: second.cache, sameBody: true, colo: second.colo});
}
const seed = await get('/inbox');
for (const headers of [{cookie: 'whatflow_cache_probe=1'}, {authorization: 'Bearer cache-isolation-probe'}, {'cache-control': 'no-cache'}, {'next-router-prefetch': '1'}]) {
  const r = await get('/inbox', headers);
  assert.equal(r.cache, 'BYPASS', JSON.stringify(headers));
  results.push({path: '/inbox', bypassHeader: Object.keys(headers)[0], cache: r.cache});
}
const stillPublic = await get('/inbox');
assert.equal(stillPublic.cache, 'HIT');
assert.equal(stillPublic.hash, seed.hash);
const head = await get('/inbox', {}, 'HEAD');
assert.equal(head.cache, 'HIT');
assert.equal(head.body, '');
for (const path of ['/blog?q=Shopify+Flow+triggers', '/compare?q=no+seat+fee', '/inbox?preview=1', '/admin', '/api/comparisons?limit=1&depth=0', '/compare/nonexistent-cache-isolation-check']) {
  const r = await get(path);
  assert.equal(r.cache, 'BYPASS', path);
  if (path.includes('?q=')) {assert.equal(r.status, 200); assert(r.body.includes('noindex')); assert(!r.body.includes('No matching comparisons') && !r.body.includes('No matching articles'));}
  results.push({path, status: r.status, cache: r.cache});
}
const rsc = await get('/blog', {rsc: '1', accept: 'text/x-component'});
assert.equal(rsc.cache, 'BYPASS');
assert(rsc.type?.startsWith('text/x-component'));
results.push({path: '/blog', rsc: true, cache: rsc.cache, type: rsc.type});
for (const headers of [{'user-agent': userAgent + '-social'}, {'sec-ch-prefers-color-scheme': 'dark'}, {accept: 'text/html,application/xhtml+xml'}]) {
  assert.equal((await get('/inbox', headers)).cache, 'MISS', 'representation isolation');
}
const report = {checkedAt: new Date().toISOString(), site: base, passed: true, publicRoutes: 11, representationIsolation: true, headReuse: true, privateRequestsCannotOverwritePublicCopy: true, results};
await writeFile(process.env.CACHE_VERIFICATION_REPORT || 'content/inbox-enterprise-2026-10-26/cache-live-verification.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({...report, results: undefined}));
