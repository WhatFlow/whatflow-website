/** Read-only rehearsal against public-content backups; never connects to D1. */
import {DatabaseSync} from 'node:sqlite';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {planCMSMigrations, assertCMSShape} from './lib/cms-migration-plan.mjs';
const root = 'content/cms-schema-repair-2026-10-26';
const beforeSchema = JSON.parse(readFileSync(root+'/schema-before.json'));
const expected = JSON.parse(readFileSync('src/migrations/20261026_170000_cms_schema_repair.json'));
const files = ['/tmp/whatflow-before-cms-schema-repair.sql','/tmp/whatflow-before-cms-schema-media.sql'];
const db = new DatabaseSync(':memory:');
// Private user/preference parents are intentionally not part of these backups.
db.exec('PRAGMA foreign_keys=OFF');
for (const file of files) db.exec(readFileSync(file,'utf8'));
for (const row of beforeSchema) if (!row.name.startsWith('sqlite_')) db.exec(row.sql.replace(/^CREATE TABLE /,'CREATE TABLE IF NOT EXISTS '));
const baselineForeignKeys = db.prepare('PRAGMA foreign_key_check').all();
const oldTables = beforeSchema.map(t=>t.name).filter(n=>!n.startsWith('sqlite_'));
const snapshot = () => Object.fromEntries(oldTables.map(name=>[name,db.prepare('SELECT * FROM "'+name+'"').all()]));
const original = snapshot();
assert.equal(original.posts.length,58); assert.equal(original.comparisons.length,106); assert.equal(original._comparisons_v.length,443);
assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),baselineForeignKeys);
const plan = await planCMSMigrations(db,expected);
const after = snapshot();
for (const name of oldTables) {
  if (name==='payload_migrations') continue;
  const oldColumns = Object.keys(original[name][0]||{});
  for (const [index,row] of after[name].entries()) assert.deepEqual(Object.fromEntries(oldColumns.map(c=>[c,row[c]])), {...original[name][index]}, name+' existing values changed');
  assert.equal(after[name].length, original[name].length, name+' row count changed');
}
assertCMSShape(db,expected);
assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),baselineForeignKeys);
const second = await planCMSMigrations(db,expected);
assert.deepEqual(second,{pending:[],statements:[]});
const report={checkedAt:new Date().toISOString(),passed:true,pending:plan.pending,statements:plan.statements.length,tablesCreated:Object.keys(expected.tables).filter(n=>!oldTables.includes(n)),originalTablesPreserved:oldTables.length,posts:58,comparisons:106,comparisonRevisions:443,newForeignKeyViolations:0,externalParentRowsExcludedFromBackup:true,repeatedPlanningIsNoOp:true,backupHashes:Object.fromEntries(files.map(p=>[p,createHash('sha256').update(readFileSync(p)).digest('hex')]))};
writeFileSync(root+'/rehearsal.json',JSON.stringify(report,null,2)+'\n');
writeFileSync('/tmp/whatflow-cms-schema-repair.sql',plan.statements.join('\n'));
console.log(JSON.stringify(report));db.close();
