import {SQLiteSyncDialect} from 'drizzle-orm/sqlite-core';
import {migrations} from '../../src/migrations/index.ts';

export function assertCMSShape(db, expected) {
  const missing = [];
  for (const [name, table] of Object.entries(expected.tables)) {
    const columns = db.prepare(`PRAGMA table_info("${name}")`).all();
    if (!columns.length) {missing.push(name); continue;}
    for (const column of Object.keys(table.columns)) if (!columns.some(c => c.name === column)) missing.push(name + '.' + column);
  }
  if (missing.length) throw new Error('CMS schema is incomplete: ' + missing.join(', '));
}

export async function planCMSMigrations(db, expected, now = new Date().toISOString()) {
  const applied = new Set((db.prepare('SELECT name FROM payload_migrations').all()).map(r => r.name));
  const pending = migrations.filter(m => !applied.has(m.name));
  const statements = [];
  const dialect = new SQLiteSyncDialect();
  const batch = Number(db.prepare('SELECT COALESCE(MAX(batch),0)+1 AS batch FROM payload_migrations').get().batch);
  const literal = (value) => "'" + value.replaceAll("'", "''") + "'";
  const facade = {
    async run(query) {
      const {sql, params} = dialect.sqlToQuery(query);
      if (params.length) throw new Error('Schema migrations must use static, unbound SQL');
      const normalized = sql.replace(/^(?:\s*--[^\n]*(?:\n|$))+/, '').trim();
      if (!/^\s*(CREATE (?:UNIQUE )?(?:TABLE|INDEX) IF NOT EXISTS |ALTER TABLE ["\w]+ ADD COLUMN |UPDATE media SET alt = COALESCE\(alt_text, ''\) WHERE alt = '';?\s*$)/i.test(normalized)) throw new Error('Non-additive migration statement rejected');
      db.exec(sql);
      statements.push(sql);
    },
    async all(query) {
      const {sql, params} = dialect.sqlToQuery(query);
      if (params.length || !/^PRAGMA table_info\("(?:media|payload_locked_documents_rels|payload_preferences_rels)"\)$/.test(sql)) throw new Error('Unexpected migration schema read');
      return db.prepare(sql).all();
    },
  };
  // The facade executes only migration SQL in an isolated local SQLite database.
  // Production execution happens once through Wrangler after shape verification.
  for (const migration of pending) {
    await migration.up({db: facade});
    const marker = `INSERT INTO payload_migrations(name,batch,updated_at,created_at) SELECT ${literal(migration.name)},${batch},${literal(now)},${literal(now)} WHERE NOT EXISTS(SELECT 1 FROM payload_migrations WHERE name=${literal(migration.name)});`;
    db.exec(marker);
    statements.push(marker);
  }
  assertCMSShape(db, expected);
  return {pending: pending.map(m => m.name), statements};
}
