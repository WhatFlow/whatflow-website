/** Apply registered Payload migrations with explicit D1 targeting and no schema push. */
import {DatabaseSync} from 'node:sqlite';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {planCMSMigrations} from './lib/cms-migration-plan.mjs';

const remote = process.argv.includes('--remote');
const local = process.argv.includes('--local');
if (remote === local) throw new Error('Choose exactly one D1 target: --local or --remote');
const check = process.argv.includes('--check');
const database = 'whatflow-payload-cms';
const wrangler = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
function execute(args) {
  const result = spawnSync(process.execPath, [wrangler, 'd1', 'execute', database, remote ? '--remote' : '--local', ...args, '--json'], {encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
  if (result.status !== 0) {
    const logPath = join(tmpdir(), `whatflow-cms-migration-error-${Date.now()}.log`);
    writeFileSync(logPath, result.stderr + '\n' + result.stdout, {mode: 0o600});
    throw new Error(`D1 command failed (exit ${result.status}). Private diagnostic log: ${logPath}`);
  }
  // File execution may prepend progress text; keep provider credentials/URLs out of logs.
  for (let i = 0; i < result.stdout.length; i++) {
    if (result.stdout[i] !== '[') continue;
    try {
      const parsed = JSON.parse(result.stdout.slice(i));
      if (Array.isArray(parsed) && parsed.every(r => r.success)) return parsed;
    } catch { /* find the actual JSON result after Wrangler progress */ }
  }
  throw new Error('Wrangler did not return a successful JSON result');
}
const schemaSQL = "SELECT name,sql FROM sqlite_master WHERE type IN ('table','index') AND sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY type DESC,name; SELECT name,batch,created_at,updated_at FROM payload_migrations;";
function inspect() {
  const result = execute(['--command', schemaSQL]);
  const db = new DatabaseSync(':memory:');
  for (const row of result[0].results) db.exec(row.sql);
  for (const row of result[1].results) db.prepare('INSERT INTO payload_migrations(name,batch,created_at,updated_at) VALUES(?,?,?,?)').run(row.name,row.batch,row.created_at,row.updated_at);
  return db;
}
// Derive expected tables/columns from current registered collections, not a stale
// migration snapshot. Schema drift with no matching migration blocks deployment.
process.env.PAYLOAD_SECRET ||= 'offline-schema-inspection-only';
const {getPayload} = await import('payload');
const {default: config} = await import('../src/payload.config.ts');
const sanitized = await config;
const payload = await getPayload({config: {...sanitized, typescript: {...sanitized.typescript, autoGenerate: false}}, disableDBConnect: true, disableOnInit: true});
const {generateDrizzleJson} = payload.db.requireDrizzleKit();
const expected = await generateDrizzleJson(payload.db.schema);
const db = inspect();
const plan = await planCMSMigrations(db, expected);
db.close();
if (check && plan.pending.length) throw new Error('Pending CMS migrations: ' + plan.pending.join(', '));
if (!check && plan.pending.length) {
  const directory = mkdtempSync(join(tmpdir(), 'whatflow-cms-migrate-'));
  try {
    const path = join(directory, 'migration.sql');
    writeFileSync(path, plan.statements.join('\n'));
    execute(['--file', path]);
  } finally {rmSync(directory, {recursive: true, force: true});}
  const verified = inspect();
  const second = await planCMSMigrations(verified, expected);
  verified.close();
  if (second.pending.length || second.statements.length) throw new Error('Migration did not converge');
}
console.log(JSON.stringify({database, target: remote ? 'remote' : 'local', mode: check ? 'check' : 'migrate', applied: check ? [] : plan.pending, schemaComplete: true}));
