"""Rehearse the exact 164-document publication against its native backup, offline."""
import sqlite3,json,pathlib,hashlib,datetime
repo=pathlib.Path(__file__).resolve().parents[1];root=repo/'content/thumbnails-2026-10-25'
backup=pathlib.Path('/tmp/whatflow-before-thumbnails.sql');comparison_sql=pathlib.Path('/tmp/whatflow-thumbnail-comparisons.sql');post_sql=pathlib.Path('/tmp/whatflow-thumbnail-posts.sql')
db=sqlite3.connect(':memory:');db.row_factory=sqlite3.Row;db.execute('CREATE TABLE media(id INTEGER PRIMARY KEY)');db.executescript(backup.read_text())
ids={r[0] for r in db.execute('SELECT cover_image_id FROM posts WHERE cover_image_id IS NOT NULL UNION SELECT cover_image_id FROM comparisons WHERE cover_image_id IS NOT NULL UNION SELECT version_cover_image_id FROM _comparisons_v WHERE version_cover_image_id IS NOT NULL')};db.executemany('INSERT INTO media(id) VALUES(?)',[(i,) for i in ids]);db.commit();db.execute('PRAGMA foreign_keys=ON');assert not list(db.execute('PRAGMA foreign_key_check'))
tables=[r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")]
def state():return {t:sorted([dict(r) for r in db.execute('SELECT * FROM "'+t+'"')],key=lambda r:json.dumps(r,sort_keys=True)) for t in tables}
before=state();assert len(before['posts'])==58 and len(before['comparisons'])==106 and len(before['_comparisons_v'])==325
allowed={'posts','comparisons','comparisons_faqs','comparisons_sources','comparisons_feature_table','_comparisons_v','_comparisons_v_rels','_comparisons_v_version_faqs','_comparisons_v_version_sources','_comparisons_v_version_feature_table'};writes=set()
def guard(action,a,b,c,d):
 if action in {sqlite3.SQLITE_INSERT,sqlite3.SQLITE_UPDATE,sqlite3.SQLITE_DELETE}:
  assert a in allowed,('Unexpected write',a);writes.add(a)
 elif action in {sqlite3.SQLITE_CREATE_TABLE,sqlite3.SQLITE_DROP_TABLE,sqlite3.SQLITE_ALTER_TABLE,sqlite3.SQLITE_ATTACH,sqlite3.SQLITE_DETACH}:return sqlite3.SQLITE_DENY
 return sqlite3.SQLITE_OK
db.set_authorizer(guard);db.executescript(comparison_sql.read_text());db.set_authorizer(None)
after_comparisons=state()
for t in tables:
 if t=='posts' or t.startswith('posts_') or t=='media':assert before[t]==after_comparisons[t],t
db.set_authorizer(guard);db.executescript(post_sql.read_text());db.set_authorizer(None)
after=state()
for t in tables:
 if t!='posts':assert after[t]==after_comparisons[t],t
posts=json.loads((repo/'content/blog/thumbnails-2026-10-25/candidate-documents.json').read_text());by_id={p['id']:p for p in after['posts']};old={p['id']:p for p in before['posts']}
mapping={'content':'content','coverImageUrl':'cover_image_url','coverImageAlt':'cover_image_alt','coverImageCaption':'cover_image_caption','updatedAt':'updated_at','reviewedAt':'reviewed_at'}
for p in posts:
 row=by_id[int(p['id'])]
 for key,col in mapping.items():assert (json.loads(row[col]) if key=='content' else row[col])==p.get(key),(p['slug'],key)
 for col in row:
  if col not in mapping.values():assert row[col]==old[row['id']][col],(p['slug'],'unexpected column change',col)
assert len(after['_comparisons_v'])==431;assert not list(db.execute('PRAGMA foreign_key_check'))
db.set_authorizer(guard);db.executescript(comparison_sql.read_text());db.executescript(post_sql.read_text());db.set_authorizer(None);assert state()==after,'Publication is not idempotent'
report={'passed':True,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'posts':58,'comparisons':106,'historicalComparisonRevisions':325,'totalComparisonRevisions':431,'newComparisonRevisions':106,'foreignKeyViolations':0,'blogChildArraysPreserved':True,'comparisonOnlyScopeVerifiedSeparately':'comparison-sql-rehearsal.json','idempotent':True,'writtenTables':sorted(writes),'schemaWrites':False,'inputs':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in [backup,comparison_sql,post_sql]}}
(root/'publication-rehearsal.json').write_text(json.dumps(report,indent=2));print(json.dumps(report));db.close()
