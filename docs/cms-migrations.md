# Payload CMS migrations on D1

Use Node.js 22.13+ (24 is used for this site's deployments) and the installed
Wrangler authentication. The migration runner uses Node's built-in SQLite only
for an isolated local rehearsal; it never caches application database reads.

```sh
npm run cms:check -- --remote
npm run migrate -- --remote
npm run deploy
```

`--local` is also supported; exactly one target must be supplied. Production is
always the explicit `whatflow-payload-cms` database from `wrangler.jsonc`.

The runner reads production schema metadata and Payload's migration names,
rehearses registered `up` functions in an isolated SQLite database, and validates
all expected tables and columns against the current Payload configuration with
database connection and onInit hooks disabled. It rejects non-additive migration
SQL. It then sends one planned SQL file through Wrangler, records the migrations
in Payload's native `payload_migrations` table, and verifies convergence. A
repeat run is a no-op. Diagnostic failures are saved to a private temporary log.

`npm run deploy` runs this migration command as `predeploy`, before the build.
Direct OpenNext/Wrangler commands bypass npm lifecycle hooks; run the migration
command explicitly first when using them. New schema changes require a registered
migration in `src/migrations/index.ts`; missing tables/columns block deployment
rather than enabling schema push or silently returning empty content.

The October 26 repair adds eight absent tables, the required `media.alt` column,
and the two MCP relation columns. Legacy tables and extra columns remain intact.
Media alt descriptions are copied from `alt_text` if that legacy column exists;
production's media table was empty. No case studies or other merchant content are
fabricated. Destructive rollback is intentionally not automatic; retain a backup
and review any future removal separately.

Production Payload logs use single-line JSON at warning/error level. Warnings
and full error stacks remain available; pretty-printing and routine info logs
stay available for CLI and development. Cloudflare's logging sampling remains
unchanged. Fix schema errors before treating log formatting as a volume fix.

Validation:

```sh
node --import tsx --test scripts/cms-migration-plan.test.mjs scripts/payload-logger.test.ts
```

The recorded production backup rehearsal excludes private user/preference parent
rows. Its FK check verifies no additional violations relative to that partial
backup; production itself is checked with `PRAGMA foreign_key_check`.
