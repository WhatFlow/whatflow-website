import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {planCMSMigrations, assertCMSShape} from './lib/cms-migration-plan.mjs';
const before = JSON.parse(readFileSync(new URL('../content/cms-schema-repair-2026-10-26/schema-before.json', import.meta.url)));
const expected = JSON.parse(readFileSync(new URL('../src/migrations/20261026_170000_cms_schema_repair.json', import.meta.url)));
function fixture() {
  const db = new DatabaseSync(':memory:');
  for (const row of before) if (!row.name.startsWith('sqlite_')) db.exec(row.sql);
  return db;
}
test('the production schema gap is repaired without changing published rows or revision history', async () => {
  const db = fixture();
  db.exec("INSERT INTO posts(id,title,slug,excerpt,content,status) VALUES(1,'Original','original','Existing excerpt','{}','published'); INSERT INTO comparisons(id,slug,title,content,_status) VALUES(1,'original','Original','{}','published'); INSERT INTO _comparisons_v(parent_id,version_slug,version_title,version_content,version__status,latest) VALUES(1,'original','Original','{}','published',1);");
  const snapshot = () => ['posts','comparisons','_comparisons_v'].map(table => db.prepare('SELECT * FROM '+table).all());
  const original = snapshot();
  assert.throws(() => assertCMSShape(db, expected), /case_studies/);
  const plan = await planCMSMigrations(db, expected);
  assert.equal(plan.pending.length, 3);
  assertCMSShape(db, expected);
  assert.deepEqual(snapshot(), original);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM payload_migrations').get().n, 3);
  assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(), []);
  const repeat = await planCMSMigrations(db, expected);
  assert.deepEqual(repeat, {pending: [], statements: []});
  db.close();
});
test('legacy media alt text is copied while existing files and IDs are preserved', async () => {
  const db = fixture();
  db.exec("ALTER TABLE media ADD COLUMN alt_text text; INSERT INTO media(id,filename,alt_text) VALUES(1,'demo.webp','A real demo image');");
  await planCMSMigrations(db, expected);
  assert.deepEqual({...db.prepare('SELECT id,filename,alt,alt_text FROM media').get()}, {id:1,filename:'demo.webp',alt:'A real demo image',alt_text:'A real demo image'});
  db.close();
});
test('schema validation blocks a deployment when migration history hides a missing table', async () => {
  const db = fixture();
  await planCMSMigrations(db, expected);
  db.exec('DROP TABLE changelog');
  await assert.rejects(planCMSMigrations(db, expected), /changelog/);
  db.close();
});
