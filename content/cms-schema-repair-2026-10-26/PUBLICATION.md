# CMS schema repair and production logging

Published to [WhatFlow](https://whatflow.tech) on 26 October 2026.

Worker `96a31dfb-1243-4a58-9628-fac4b28e1d50`, runtime source `393845c`.

The production schema was behind the registered Payload collections, and the
native migration history was empty. The repair created eight absent tables:
`case_studies`, `case_studies_metrics`, `case_studies_apps_used`, `integrations`,
`integrations_key_features`, `changelog`, `country_rates` and `payload_mcp_api_keys`.
It also added `media.alt` and the two missing MCP relation columns. Existing
legacy tables and columns remain intact. Production's media table was empty.

All three registered migrations were applied additively and recorded in Payload's
native history. An isolated backup rehearsal preserved existing values across
26 original tables, including 58 posts, 106 comparisons and all 443 revisions.
Production has zero foreign-key violations and zero pending comparison drafts.
No merchant stories or other content were seeded.

The supported migration command rehearses registered `up` functions locally,
checks them against the current Payload configuration, rejects non-additive SQL,
applies the plan to the explicit D1 target and checks convergence. Repeat runs
perform no writes. `npm run deploy` now invokes it before the build. The guard
blocked a check before repair and passed afterward, including the actual
production predeploy run. See [migration operating notes](../../docs/cms-migrations.md).

Production Payload warnings and errors now emit single-line JSON, preserving
error stacks without multiline pretty-printing. Routine informational logs are
filtered in production; CLI and development logging stay available. Cloudflare
sampling was not reduced. A retained production warning confirmed JSON output.

## Verification

- 19 tests passed; TypeScript, focused ESLint and the production build passed.
- Seven APIs returned 200 using normal population depth: case studies, posts,
  comparisons, integrations, changelog, country rates and media.
- Eleven uncached origin API/page probes were individually observed through a
  uniquely header-filtered Worker tail: 11 successful invocations, zero console
  events and zero exceptions. Unrelated visitors' requests were excluded; raw
  request headers are not archived here.
- Missing-table log entries: 66 in the five-minute baseline, then zero in the
  five-minute post-repair observation. Exact time windows are in the receipt.
  These observations do not establish a daily log-volume or CPU reduction;
  ongoing production traffic is needed for those measurements.

Organized implementation commits:

1. `e038947` — Additive schema repair, native migration records and deployment guard.
2. `393845c` — Compact production Payload logging and logger tests.

The final verification commit records the read-only probe tool and receipts.
Public-content/system-relation and media backups remain outside the repository;
their hashes are archived in `rehearsal.json`. Private credential/session data
were not exported. That partial backup's offline foreign-key check confirms no
new violations; the complete production database separately passed its FK check.
