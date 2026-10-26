"""Rehearse the targeted inbox correction against a fresh native backup, offline.

Run with Python >=3.11. This script never connects to a database service.
"""
import argparse
import datetime
import hashlib
import importlib.util
import json
import pathlib
import sqlite3

REPO = pathlib.Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--root', type=pathlib.Path, default=REPO/'content/inbox-enterprise-2026-10-26')
parser.add_argument('--backup', type=pathlib.Path, default=pathlib.Path('/tmp/whatflow-before-enterprise-inbox.sql'))
parser.add_argument('--comparisons-sql', type=pathlib.Path, default=pathlib.Path('/tmp/whatflow-enterprise-comparisons.sql'))
parser.add_argument('--posts-sql', type=pathlib.Path, default=pathlib.Path('/tmp/whatflow-enterprise-posts.sql'))
args = parser.parse_args()
spec = importlib.util.spec_from_file_location('comparison_verifier', REPO/'scripts/verify-comparison-enhancement-sql.py')
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
db = sqlite3.connect(':memory:')
db.row_factory = sqlite3.Row
db.execute('CREATE TABLE media(id INTEGER PRIMARY KEY)')
for name in ['comparisons', 'posts']:
    db.executescript((REPO/f'scripts/{name}-schema.sql').read_text())
db.executescript(args.backup.read_text())
ids = {r[0] for r in db.execute('SELECT cover_image_id FROM posts WHERE cover_image_id IS NOT NULL UNION SELECT cover_image_id FROM comparisons WHERE cover_image_id IS NOT NULL UNION SELECT version_cover_image_id FROM _comparisons_v WHERE version_cover_image_id IS NOT NULL')}
db.executemany('INSERT INTO media(id) VALUES(?)', [(i,) for i in ids])
db.commit()
db.execute('PRAGMA foreign_keys=ON')
assert not list(db.execute('PRAGMA foreign_key_check'))
tables = [r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")]
def state():
    return {t: v.stable([dict(r) for r in db.execute('SELECT * FROM "'+t+'"')]) for t in tables}
before = state()
assert len(before['comparisons']) == 106 and len(before['posts']) == 58 and len(before['_comparisons_v']) == 431
candidates = json.loads((args.root/'comparisons/candidate-documents.json').read_text())
posts = json.loads((args.root/'posts/candidate-documents.json').read_text())
audit = {'writtenTables': set(), 'denied': []}
v.guard(db, audit)
db.executescript(args.comparisons_sql.read_text())
db.set_authorizer(None)
comparison_check = v.verify(db, candidates, {t: before[t] for t in v.TABLES}, 'targeted publication')
after_comparisons = state()
for t in tables:
    if t == 'posts' or t.startswith('posts_') or t == 'media':
        assert before[t] == after_comparisons[t], t
writes = set()
def post_guard(action, a, b, database, trigger):
    if action in {sqlite3.SQLITE_INSERT, sqlite3.SQLITE_UPDATE, sqlite3.SQLITE_DELETE}:
        if a != 'posts' or database != 'main' or trigger:
            return sqlite3.SQLITE_DENY
        writes.add(a)
    if action in {sqlite3.SQLITE_CREATE_TABLE, sqlite3.SQLITE_DROP_TABLE, sqlite3.SQLITE_ALTER_TABLE, sqlite3.SQLITE_ATTACH, sqlite3.SQLITE_DETACH}:
        return sqlite3.SQLITE_DENY
    return sqlite3.SQLITE_OK
db.set_authorizer(post_guard)
db.executescript(args.posts_sql.read_text())
db.set_authorizer(None)
after = state()
for t in tables:
    if t != 'posts':
        assert after[t] == after_comparisons[t], t
by_id = {p['id']: p for p in after['posts']}
old = {p['id']: p for p in before['posts']}
changed = {p['id']: p for p in posts}
for identity, row in by_id.items():
    if identity not in changed:
        assert row == old[identity], row['slug']
    else:
        assert json.loads(row['content']) == changed[identity]['content']
        assert row['updated_at'] == changed[identity]['updatedAt']
        for col in row:
            if col not in {'content', 'updated_at'}:
                assert row[col] == old[identity][col], (row['slug'], col)
v.guard(db, audit)
db.executescript(args.comparisons_sql.read_text())
db.set_authorizer(post_guard)
db.executescript(args.posts_sql.read_text())
db.set_authorizer(None)
assert state() == after, 'Repeated publication changed native state'
assert not list(db.execute('PRAGMA foreign_key_check'))
report = {'passed': True, 'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'postsUpdated': len(posts), 'comparisonsUpdated': len(candidates), 'untouchedArticles': 164-len(posts)-len(candidates),
          'comparisonChecks': comparison_check, 'allBlogChildArraysPreserved': True, 'idempotent': True,
          'writtenTables': sorted(audit['writtenTables'] | writes), 'schemaWritesAllowed': False,
          'inputs': {str(p): hashlib.sha256(p.read_bytes()).hexdigest() for p in [args.backup, args.comparisons_sql, args.posts_sql]}}
(args.root/'publication-rehearsal.json').write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(report))
