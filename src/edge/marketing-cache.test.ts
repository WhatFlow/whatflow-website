import {test} from 'node:test';
import assert from 'node:assert/strict';
import {marketingCacheKey, marketingCacheTTL, serveMarketingPage} from './marketing-cache';

const request = (path = '/inbox', headers: HeadersInit = {}, method = 'GET') =>
  new Request('https://whatflow.tech' + path, {headers, method});
function harness(response = () => new Response('rendered page', {headers: {'Content-Type': 'text/html', Vary: 'Sec-CH-Prefers-Color-Scheme', 'X-Frame-Options': 'DENY'}})) {
  const entries = new Map<string, Response>();
  const pending: Promise<unknown>[] = [];
  let renders = 0;
  const cache = {
    async match(key: RequestInfo | URL) {return entries.get(String(key instanceof Request ? key.url : key))?.clone();},
    async put(key: RequestInfo | URL, value: Response) {entries.set(String(key instanceof Request ? key.url : key), value);},
  };
  return {entries, cache, get renders() {return renders;}, async serve(req = request(), version: string | undefined = 'release-1') {
    const result = await serveMarketingPage({request: req, version, cache, context: {waitUntil(p) {pending.push(p);}}, render: async () => {renders++; return response();}});
    await Promise.all(pending);
    return result;
  }};
}

test('a repeated public page avoids rendering and preserves the body, Vary and security headers', async () => {
  const h = harness();
  const first = await h.serve();
  assert.equal(first.headers.get('X-WhatFlow-Page-Cache'), 'MISS');
  const second = await h.serve();
  assert.equal(second.headers.get('X-WhatFlow-Page-Cache'), 'HIT');
  assert.equal(await second.text(), await first.text());
  assert.equal(h.renders, 1);
  assert.equal(second.headers.get('vary'), 'Sec-CH-Prefers-Color-Scheme');
  assert.equal(second.headers.get('x-frame-options'), 'DENY');
  assert.equal(second.headers.get('cache-control'), 'public, max-age=0, must-revalidate');
  assert.equal([...h.entries.values()][0].headers.get('cache-control'), 'public, max-age=300');
});

test('navigation, authenticated, search, preview and unknown routes never read or populate the page cache', async () => {
  const h = harness();
  await h.serve();
  const headers = ['cookie', 'authorization', 'rsc', 'next-action', 'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch', 'next-url', 'range', 'x-forwarded-host', 'x-original-url'];
  const requests = headers.map(name => request('/inbox', {[name]: ''}));
  requests.push(request('/inbox', {accept: 'text/x-component'}), request('/inbox', {accept: 'application/json'}), request('/inbox', {'cache-control': 'no-cache'}), request('/inbox', {pragma: 'no-cache'}), request('/inbox', {}, 'POST'));
  for (const path of ['/api/posts', '/admin', '/blog?q=order', '/compare?search=wati', '/blog?preview=1', '/inbox?_rsc=1', '/inbox?utm_source=test', '/blog?page=1&page=2', '/blog?page=0', '/blog?category=../admin', '/unknown', '/blog/a/b']) requests.push(request(path));
  requests.push(new Request('http://whatflow.tech/inbox'));
  for (const req of requests) assert.equal((await h.serve(req)).headers.get('X-WhatFlow-Page-Cache'), 'BYPASS', req.url + JSON.stringify([...req.headers]));
  assert.equal(h.renders, requests.length + 1);
  assert.equal(h.entries.size, 1);
});

test('release, browser, content negotiation and theme variants cannot share rendered responses', async () => {
  const h = harness();
  const variants: HeadersInit[] = [{}, {'user-agent': 'Googlebot'}, {'user-agent': 'Twitterbot'}, {accept: 'text/html'}, {'accept-encoding': 'gzip'}, {'sec-ch-prefers-color-scheme': 'dark'}];
  for (const headers of variants) {
    assert.equal((await h.serve(request('/inbox', headers))).headers.get('X-WhatFlow-Page-Cache'), 'MISS');
    assert.equal((await h.serve(request('/inbox', headers))).headers.get('X-WhatFlow-Page-Cache'), 'HIT');
  }
  assert.equal((await h.serve(request(), 'release-2')).headers.get('X-WhatFlow-Page-Cache'), 'MISS');
  assert.equal(h.renders, 7);
  assert.equal(marketingCacheKey(request('/blog?category=guides&page=2'), 'r').url, marketingCacheKey(request('/blog?page=2&category=guides'), 'r').url);
  assert.notEqual(marketingCacheKey(request('/blog?page=2'), 'r').url, marketingCacheKey(request('/blog?page=3'), 'r').url);
});

test('only successful public representations are stored', async () => {
  for (const response of [
    () => new Response('error', {status: 500, headers: {'content-type': 'text/html'}}),
    () => new Response('missing', {status: 404, headers: {'content-type': 'text/html'}}),
    () => new Response(null, {status: 302, headers: {location: '/login'}}),
    () => new Response('personal', {headers: {'content-type': 'text/html', 'set-cookie': 'session=secret'}}),
    () => new Response('varies', {headers: {'content-type': 'text/html', vary: 'X-Unknown'}}),
    () => new Response('{}', {headers: {'content-type': 'application/json'}}),
  ]) {
    const h = harness(response);
    assert.equal((await h.serve()).headers.get('X-WhatFlow-Page-Cache'), 'BYPASS');
    assert.equal((await h.serve()).headers.get('X-WhatFlow-Page-Cache'), 'BYPASS');
    assert.equal(h.entries.size, 0);
  }
});

test('HEAD can reuse GET but cannot seed an empty page; missing versions bypass', async () => {
  const h = harness();
  await h.serve(request('/inbox', {}, 'HEAD'));
  assert.equal(h.entries.size, 0);
  await h.serve();
  const head = await h.serve(request('/inbox', {}, 'HEAD'));
  assert.equal(head.headers.get('X-WhatFlow-Page-Cache'), 'HIT');
  assert.equal(await head.text(), '');
  assert.equal((await h.serve(request(), '')).headers.get('X-WhatFlow-Page-Cache'), 'BYPASS');
});

test('cache outages fail open without losing a successful origin response', async () => {
  const response = await serveMarketingPage({request: request(), version: 'v', cache: {async match() {throw Error('offline');}, async put() {throw Error('offline');}}, context: {waitUntil(p) {void p;}}, render: async () => new Response('ok', {headers: {'content-type': 'text/html'}})});
  assert.equal(await response.text(), 'ok');
});

test('pricing and listings have shorter freshness windows; feeds and details are cacheable', async () => {
  for (const path of ['/pricing', '/blog?page=2', '/compare?category=platform', '/changelog']) assert.equal(marketingCacheTTL(request(path)), 60);
  for (const path of ['/', '/inbox', '/blog/example', '/compare/whatflow-vs-wati', '/sitemap.xml', '/blog/rss.xml']) assert.equal(marketingCacheTTL(request(path)), 300);
  const h = harness(() => new Response('<rss/>', {headers: {'content-type': 'application/rss+xml'}}));
  await h.serve(request('/blog/rss.xml'));
  assert.equal((await h.serve(request('/blog/rss.xml'))).headers.get('X-WhatFlow-Page-Cache'), 'HIT');
});
