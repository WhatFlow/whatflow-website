# Published marketing cache and enterprise inbox correction

Live at [WhatFlow](https://whatflow.tech), [Inbox](https://whatflow.tech/inbox) and [Comparisons](https://whatflow.tech/compare). Verified on 26 October 2026.

Worker version: `b3130827-c24b-42ca-b357-3595eee37dc8`, built from runtime commit `0f52e79`.

## Public page caching

Successful anonymous public HTML and feeds now use Cloudflare's edge Cache API: pricing and article listings expire after 60 seconds; other public pages expire after 300 seconds. Browser copies must revalidate. Worker-version keys isolate deployments, and representation keys separate user agents, content negotiation and the color-scheme client hint.

Production verification confirmed MISS → HIT transitions with identical response bodies on 11 routes, including article pages, directories, pricing, RSS and sitemap. Cookies, authorization, searches, previews, admin/API routes and Next.js Flight/navigation requests bypass the HTML cache. HEAD reuse and representation isolation passed. Cache failures fail open.

Eleven explicitly listed static public templates also use OpenNext's read-only Static Assets provider. The wrapper rejects fetch/composable entries, the revalidated homepage, CMS article routes and private/API/admin paths; runtime writes are disabled. This resolved stalled static-page Flight/prefetch requests observed during live verification. OpenNext's deploy command populates these build assets before uploading the Worker. No application database-read cache was introduced.

CMS article changes can remain in the edge cache for up to five minutes, plus the existing 60-second CMS fetch window. See [cache operating notes](../../docs/marketing-page-cache.md) for scope and deployment invalidation.

The approximately 28% CPU share was supplied as the baseline. Cache operation and render avoidance are verified; a production CPU reduction has not yet been measured.

## Enterprise inbox content

Twenty exact wording corrections were published to 12 comparisons and one team-inbox blog. They establish Business API's enterprise-ready inbox, all-plan feature access and no seat fees, with AI explicitly unavailable. They remove unsupported assumptions that a larger support team or multi-day case requires a competitor, while preserving genuine multichannel, CRM and AI differences.

Homepage, inbox, feature demos, article sidebar, FAQs, structured data and machine-readable summaries now agree with that positioning. Shared homepage FAQ data keeps visible answers and schema consistent. Old static JSON assets that shadowed the AI-summary routes were removed. The LLM documents also state the AI exclusion and full-feature pricing model.

The other 151 Payload documents matched their pre-publication hashes exactly. All article covers, source links, original publication dates and Safwan Adnan bylines were retained. All 431 prior comparison revisions remain, with 12 new revisions: 443 total, 106 latest published snapshots, zero pending drafts and zero foreign-key errors. Publication was rehearsed offline and verified to be idempotent before execution.

## Validation and commits

- 14 cache-isolation, static-template and content-search tests passed; TypeScript and focused ESLint passed; production build passed.
- All 13 independent editorial reviews passed at 90–92/100, with all five strict skill gates passed. Exact nonce-bound reports and artifact hashes are archived beside this file. Two Shopify App Store rate-limit failures passed on spaced retries; no link-check exception was added.
- Live CMS/article/schema/cover checks passed for the 13 updates, and all 151 untouched documents matched their hashes.
- Live inbox and features pages passed at 375, 768 and 1280 pixels without horizontal overflow. Actual client-side article navigation passed with no JavaScript errors.

Implementation commits:

1. `6292cef` — Public rendered-page cache and isolation tests.
2. `7af1055` — Read-only production cache verifier.
3. `9a1e5ab` — Enterprise inbox positioning, approved article candidates and exact editorial evidence.
4. `b3ea3ef` — Read-only public static templates, excluding app/fetch data.
5. `0f52e79` — Remove shadowing machine-summary assets and correct LLM product information.

The final evidence commit records this deployment and live verification. Fresh native SQL backup and execution files remain outside the repository; their hashes and sanitized execution results are in `publication-receipt.json`. Existing genuine demo screenshots were retained; this release adds no new Shopify-admin captures.
