/** Public rendered responses only. Payload/app reads never enter this cache. */
const PAGES = new Set([
  '/', '/about', '/affiliate', '/affiliates', '/partners', '/features', '/inbox',
  '/pricing', '/security', '/terms', '/privacy', '/blog', '/compare',
  '/integrations', '/solutions', '/case-studies', '/changelog',
]);
const FEEDS = new Set(['/sitemap.xml', '/robots.txt', '/blog/rss.xml']);
const SHORT_TTL = new Set(['/pricing', '/blog', '/compare', '/changelog']);
const PRIVATE_HEADERS = [
  'authorization', 'cookie', 'rsc', 'next-action', 'next-router-state-tree',
  'next-router-prefetch', 'next-router-segment-prefetch', 'next-url', 'range',
  'x-middleware-prefetch', 'x-prerender-revalidate', 'x-nextjs-data', 'upgrade',
  'x-http-method-override', 'x-http-method', 'x-method-override',
  'x-forwarded-host', 'x-host', 'x-original-url', 'x-rewrite-url', 'forwarded',
];

export function marketingCacheTTL(request: Request): number | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  if (PRIVATE_HEADERS.some(name => request.headers.has(name))) return null;
  if (/text\/x-component|application\/json/i.test(request.headers.get('accept') || '')) return null;
  if (/no-cache|no-store|max-age\s*=\s*0/i.test(request.headers.get('cache-control') || '')
      || /no-cache/i.test(request.headers.get('pragma') || '')) return null;
  const url = new URL(request.url);
  if (url.protocol !== 'https:') return null;
  const path = url.pathname;
  if (!PAGES.has(path) && !FEEDS.has(path)
      && !/^\/(blog|compare|integrations|solutions|case-studies)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path)) return null;
  // Only finite, non-personalized directory variants. Queries and previews bypass.
  const allowedParams = path === '/blog' || path === '/compare';
  for (const [key, value] of url.searchParams) {
    if (!allowedParams || url.searchParams.getAll(key).length !== 1) return null;
    if (key === 'page' && /^[1-9]\d{0,2}$/.test(value)) continue;
    if (key === 'category' && /^[a-z][a-z0-9-]{0,39}$/.test(value)) continue;
    return null;
  }
  return SHORT_TTL.has(path) ? 60 : 300;
}

export function marketingCacheKey(request: Request, version: string): Request {
  const url = new URL(request.url);
  url.searchParams.sort();
  url.searchParams.set('__whatflow_render_version', version);
  // Next streams metadata differently for some user agents. Match the actual
  // representation rather than sharing browser HTML with social preview bots.
  for (const name of ['user-agent', 'accept', 'accept-encoding', 'sec-ch-prefers-color-scheme']) {
    url.searchParams.set(`__whatflow_render_${name}`, request.headers.get(name) || '');
  }
  return new Request(url.href, {method: 'GET'});
}

type EdgeCache = Pick<Cache, 'match' | 'put'>;
type Background = {waitUntil(promise: Promise<unknown>): void};

function visibleResponse(response: Response, status: string, request: Request): Response {
  const headers = new Headers(response.headers);
  headers.set('X-WhatFlow-Page-Cache', status);
  if (status === 'HIT' || status === 'MISS') {
    // The shared copy has its own TTL. Browsers always consult the edge.
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    headers.delete('Age');
  }
  return new Response(request.method === 'HEAD' ? null : response.body, {
    status: response.status, statusText: response.statusText, headers,
  });
}

export async function serveMarketingPage(options: {
  request: Request; version?: string; cache: EdgeCache; context: Background;
  render: () => Promise<Response>;
}): Promise<Response> {
  const {request, version, cache, context, render} = options;
  const ttl = marketingCacheTTL(request);
  if (!ttl || !version) return visibleResponse(await render(), 'BYPASS', request);
  const key = marketingCacheKey(request, version);
  try {
    const hit = await cache.match(key);
    if (hit) return visibleResponse(hit, 'HIT', request);
  } catch {
    // A cache outage must not take the public site down.
  }
  const response = await render();
  const type = response.headers.get('content-type') || '';
  const vary = (response.headers.get('vary') || '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
  const safeVary = new Set(['rsc', 'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch', 'next-url', 'accept-encoding', 'accept', 'user-agent', 'sec-ch-prefers-color-scheme']);
  const isFeed = FEEDS.has(new URL(request.url).pathname);
  const eligible = request.method === 'GET' && response.status === 200
    && !response.headers.has('set-cookie')
    && !response.headers.has('location')
    && (type.startsWith('text/html') || (isFeed && /^(application\/(rss\+xml|xml)|text\/(xml|plain))\b/.test(type)))
    && vary.every(v => safeVary.has(v));
  if (!eligible) return visibleResponse(response, 'BYPASS', request);
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', `public, max-age=${ttl}`);
  // Navigation variants are excluded before lookup; content negotiation is
  // encoded in the key. Preserve Vary for downstream browsers and proxies.
  headers.delete('Cloudflare-CDN-Cache-Control');
  headers.delete('CDN-Cache-Control');
  const stored = new Response(response.clone().body, {status: 200, headers});
  context.waitUntil(cache.put(key, stored).catch(() => {console.warn('Marketing page cache write failed');}));
  return visibleResponse(response, 'MISS', request);
}
