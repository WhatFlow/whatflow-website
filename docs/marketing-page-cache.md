# Public rendered-page cache

The custom Cloudflare entry point in `worker.ts` caches successful public HTML
and sitemap/RSS/robots responses before loading the OpenNext renderer. This is
separate from Payload, app database reads and any application data cache.

- Pricing and article listings: 60 seconds.
- Public detail pages and feeds: 300 seconds.
- Browser copies must revalidate. Cloudflare Cache API copies use the TTL above.
- Keys include the Worker version, host, path, supported directory parameters,
  user agent, Accept, Accept-Encoding and the color-scheme client hint. Deploying
  a new Worker isolates its entries from the previous deployment.
- Cookies, authorization, RSC/Next navigation, actions, searches, previews,
  unsupported queries, non-public routes, mutation methods and explicit
  no-cache requests bypass lookup and storage. Responses with cookies, errors,
  redirects, unsupported content types or unknown Vary dimensions are not stored.
- A cache read/write failure falls back to the renderer. Cache writes run in
  `waitUntil`, and response bodies remain streamed.
- `X-WhatFlow-Page-Cache` reports HIT, MISS or BYPASS. A HIT skips the Next/Payload
  render. The Cache API is local to each Cloudflare location: the first request
  at another location can still miss. No global native Worker cache is enabled.

CMS edits can take up to five minutes to appear in a rendered article, plus any
existing CMS fetch freshness window (currently 60 seconds). Pricing/listing edge
entries expire after a minute. An explicit `Cache-Control: no-cache` request
bypasses this edge cache; it does not change the existing CMS fetch policy.
Deploy again for immediate isolation of all rendered entries after an urgent
content correction. Do not use this mechanism for private application pages.

Run `node --import tsx --test src/edge/marketing-cache.test.ts` to check request
isolation, representation keys, failed-response handling and repeated-render
avoidance. Production HIT/MISS verification demonstrates cache operation;
CPU savings require subsequent production measurements.

## Pre-rendered public templates

OpenNext also reads the build-time HTML/Flight templates for eleven explicitly
listed static public routes through the official Static Assets provider. The
wrapper rejects `fetch` and composable entries, the revalidated homepage, CMS
article routes and private/admin/API paths, and never writes runtime values.
This preserves static-page navigation without caching app database reads.
Use the existing `npm run deploy` / OpenNext deploy command so its built-in
asset population step uploads these templates before Wrangler deploys them.
The direct Wrangler command alone omits this required population step.
