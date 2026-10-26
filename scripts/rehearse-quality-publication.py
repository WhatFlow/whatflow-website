"""Rehearse only the proposed public article writes against an isolated backup."""
import datetime,hashlib,importlib.util,json,sqlite3,sys
if sys.version_info < (3,11): raise SystemExit("Python 3.11+ is required for the isolated rehearsal")
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
work=ROOT/'content/library-quality-2026-10-27'
backup=Path('/tmp/whatflow-before-quality-publication.sql')
spec=importlib.util.spec_from_file_location('comparison_verifier',ROOT/'scripts/verify-comparison-enhancement-sql.py')
v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
db=sqlite3.connect(':memory:');db.row_factory=sqlite3.Row;db.executescript(backup.read_text());db.execute('PRAGMA foreign_keys=ON')
assert not list(db.execute('PRAGMA foreign_key_check'))
tables=[r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")]
def state():return {t:v.stable([dict(r) for r in db.execute('SELECT * FROM "'+t+'"')])for t in tables}
before=state();assert len(before['posts'])==58 and len(before['comparisons'])==106 and len(before['_comparisons_v'])==443
comparisons=json.loads((work/'publication/comparisons.json').read_text());posts=json.loads((work/'publication/posts.json').read_text())
comp_sql=Path('/tmp/whatflow-quality-comparisons.sql').read_text();post_sql=Path('/tmp/whatflow-quality-posts.sql').read_text()
audit={'writtenTables':set(),'denied':[]};v.guard(db,audit);db.executescript(comp_sql);db.set_authorizer(None)
comparison_check=v.verify(db,comparisons,{t:before[t] for t in v.TABLES},'quality publication')
after_comps=state()
for t in tables:
 if t not in v.TABLES:assert before[t]==after_comps[t],t
writes=set()
def guard(action,a,b,database,trigger):
 if action in {sqlite3.SQLITE_INSERT,sqlite3.SQLITE_UPDATE,sqlite3.SQLITE_DELETE}:
  if a not in {'posts','posts_tags','posts_sources','posts_faqs'}or database!='main'or trigger:return sqlite3.SQLITE_DENY
  writes.add(a)
 if action in {sqlite3.SQLITE_CREATE_TABLE,sqlite3.SQLITE_DROP_TABLE,sqlite3.SQLITE_ALTER_TABLE,sqlite3.SQLITE_ATTACH,sqlite3.SQLITE_DETACH}:return sqlite3.SQLITE_DENY
 return sqlite3.SQLITE_OK
db.set_authorizer(guard);db.executescript(post_sql);db.set_authorizer(None);after=state()
for t in tables:
 if t not in {'posts','posts_tags','posts_sources','posts_faqs'}:assert after_comps[t]==after[t],t
old={p['slug']:p for p in before['posts']};current={p['slug']:p for p in after['posts']};selected={p['slug']:p for p in posts}
assert len(current)==61
for slug,p in old.items():
 if slug not in selected:assert current[slug]==p,slug
 else:
  for field in p:
   if field not in {'content','updated_at'}:assert current[slug][field]==p[field],(slug,field)
for p in posts:
 row=current[p['slug']];assert json.loads(row['content'])==p['content'];assert row['status']=='published';assert row['updated_at']==p['updatedAt'];assert row['author']=='Safwan Adnan'
 if p['slug']not in old:
  assert row['cover_image_url']==p['coverImageUrl']and row['seo_meta_title']==p['seo']['metaTitle']
  for table,fields in [('tags',['tag']),('sources',['title','url','note']),('faqs',['question','answer'])]:
   rows=[dict(r)for r in db.execute('SELECT * FROM posts_'+table+' WHERE _parent_id=? ORDER BY _order',(row['id'],))];assert len(rows)==len(p[table])
   for x,y in zip(rows,p[table]):
    assert x['id']==y['id']
    for f in fields:assert x[f]==y.get(f),(p['slug'],f)
assert not list(db.execute('PRAGMA foreign_key_check'))
v.guard(db,audit);db.executescript(comp_sql);db.set_authorizer(guard);db.executescript(post_sql);db.set_authorizer(None);assert state()==after,'repeat publication changed state'
report={'passed':True,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'beforePosts':58,'afterPosts':61,'newPosts':3,'updatedPosts':1,'untouchedExistingPosts':57,'updatedComparisons':9,'untouchedComparisons':97,'comparisonChecks':comparison_check,'idempotent':True,'foreignKeyViolations':0,'writtenTables':sorted(audit['writtenTables']|writes),'backupSha256':hashlib.sha256(backup.read_bytes()).hexdigest(),'postsSqlSha256':hashlib.sha256(post_sql.encode()).hexdigest(),'comparisonsSqlSha256':hashlib.sha256(comp_sql.encode()).hexdigest()}
(work/'publication/rehearsal.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
