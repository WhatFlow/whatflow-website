#!/usr/bin/env python3
"""Rehearse comparison-only enhancement SQL in isolated in-memory SQLite.

Never connects to a remote database. The authorizer rejects schema changes,
non-comparison writes, attachments and extension loading in the candidate SQL.
"""
import argparse
import hashlib
import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
WORK = REPO / 'content/comparisons/enhancement-2026-10-25'
TABLES = {
    'comparisons', 'comparisons_feature_table', 'comparisons_faqs',
    'comparisons_sources', 'comparisons_rels', '_comparisons_v',
    '_comparisons_v_version_feature_table', '_comparisons_v_version_faqs',
    '_comparisons_v_version_sources', '_comparisons_v_rels',
}
ARRAYS = {
    'featureTable': ('feature_table', ('feature', 'whatflow', 'competitor')),
    'faqs': ('faqs', ('question', 'answer')),
    'sources': ('sources', ('title', 'url', 'note')),
}
FIELDS = {
    'title': 'title', 'slug': 'slug', 'competitor': 'competitor',
    'competitorUrl': 'competitor_url', 'category': 'category',
    'excerpt': 'excerpt', 'verdict': 'verdict', 'author': 'author',
    'authorRole': 'author_role', 'publishedAt': 'published_at',
    'reviewedAt': 'reviewed_at', 'featured': 'featured', 'imageUrl': 'image_url',
    'imageAlt': 'image_alt', 'imageCaption': 'image_caption',
    'imageSourceUrl': 'image_source_url', 'updatedAt': 'updated_at',
    'createdAt': 'created_at', 'status': '_status',
}


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def rows(db, table, where='', args=()):
    require(table in TABLES, 'Unexpected table: ' + table)
    return [dict(row) for row in db.execute(f'SELECT * FROM "{table}" ' + where, args)]


def stable(values):
    return sorted(values, key=lambda row: json.dumps(row, sort_keys=True))


def normalized_json(value):
    return json.loads(value) if isinstance(value, str) else value


def snapshot(db):
    return {table: stable(rows(db, table)) for table in sorted(TABLES)}


def verify(db, candidates, before, phase):
    current = rows(db, 'comparisons')
    require(len(current) == 106, f'{phase}: expected 106 main rows')
    require(0 < len(candidates) <= len(current), 'Expected a nonempty candidate subset')
    by_id = {row['id']: row for row in current}
    original = {row['id']: row for row in before['comparisons']}
    require(set(by_id) == set(original), f'{phase}: main IDs changed')
    candidate_ids = {doc['id'] for doc in candidates}
    require(len(candidate_ids) == len(candidates) and candidate_ids <= set(by_id), 'Candidate IDs differ from backup')
    for row_id in set(by_id) - candidate_ids:
        require(by_id[row_id] == original[row_id], f'{phase}: untouched comparison changed: {row_id}')
    for suffix in ['feature_table', 'faqs', 'sources']:
        table = 'comparisons_' + suffix
        untouched = lambda values: stable([r for r in values if r['_parent_id'] not in candidate_ids])
        require(untouched(rows(db, table)) == untouched(before[table]), f'{phase}: untouched child rows changed: {table}')
    version_rows = rows(db, '_comparisons_v')
    expected_versions = len(before['_comparisons_v']) + len(candidates)
    require(len(version_rows) == expected_versions, f'{phase}: expected {expected_versions} versions, got {len(version_rows)}')
    versions = {row['id']: row for row in version_rows}
    old_versions = {row['id']: row for row in before['_comparisons_v']}
    require(len(set(versions) - set(old_versions)) == len(candidates), f'{phase}: wrong new version count')
    for version_id, old in old_versions.items():
        require(version_id in versions, f'{phase}: historical version removed: {version_id}')
        require({k:v for k,v in old.items() if k != 'latest'} ==
                {k:v for k,v in versions[version_id].items() if k != 'latest'},
                f'{phase}: historical version content/metadata altered: {version_id}')
    for suffix in ['version_feature_table', 'version_faqs', 'version_sources', 'rels']:
        table = '_comparisons_v_' + suffix
        parent = 'parent_id' if suffix == 'rels' else '_parent_id'
        preserved = [row for row in rows(db, table) if row[parent] in old_versions]
        require(stable(preserved) == before[table], f'{phase}: historical child rows changed: {table}')
    require(stable(rows(db, 'comparisons_rels')) == before['comparisons_rels'],
            f'{phase}: original related comparison relations changed')
    checked_cells = 0
    for doc in candidates:
        row = by_id[doc['id']]
        label = f'{phase}: {doc["slug"]}'
        for field in ['slug', 'published_at', 'created_at', 'author', 'author_role', '_status']:
            require(row[field] == original[doc['id']][field], label + ': protected field changed: ' + field)
        require(normalized_json(row['content']) == doc['content'], label + ': content mismatch')
        for native, column in FIELDS.items():
            if native in doc:
                require(row[column] == doc[native], label + ': candidate scalar mismatch: ' + native)
        seo = doc.get('seo') or {}
        for native, column in [('metaTitle','seo_meta_title'), ('metaDescription','seo_meta_description'), ('noindex','seo_noindex')]:
            if native in seo:
                require(row[column] == seo[native], label + ': candidate SEO mismatch: ' + native)
        cta = doc.get('cta') or {}
        for native, column in [('heading','cta_heading'), ('description','cta_description'), ('label','cta_label')]:
            if native in cta:
                require(row[column] == cta[native], label + ': candidate CTA mismatch: ' + native)
        latest = [v for v in version_rows if v['parent_id'] == row['id'] and v['latest'] == 1]
        require(len(latest) == 1, label + ': expected exactly one latest version')
        version = latest[0]
        require(version['id'] not in old_versions, label + ': latest is not a new snapshot')
        require(row['_status'] == version['version__status'] == 'published', label + ': latest/main not published')
        for column, value in row.items():
            if column == 'id':
                continue
            vcolumn = 'version_' + column
            if vcolumn in version:
                actual = version[vcolumn]
                if column == 'content':
                    require(normalized_json(actual) == normalized_json(value), label + ': latest version content differs')
                else:
                    require(actual == value, label + ': latest version differs: ' + column)
        for native, (suffix, columns) in ARRAYS.items():
            expected = doc.get(native) or []
            main = sorted(rows(db, 'comparisons_' + suffix, 'WHERE _parent_id=?', (row['id'],)), key=lambda a:a['_order'])
            history = sorted(rows(db, '_comparisons_v_version_' + suffix, 'WHERE _parent_id=?', (version['id'],)), key=lambda a:a['_order'])
            require(len(main) == len(history) == len(expected), label + ': array count mismatch: ' + native)
            for index, (item, live, saved) in enumerate(zip(expected, main, history), 1):
                require(live['_order'] == saved['_order'] == index, label + ': invalid array order: ' + native)
                if item.get('id') is not None:
                    require(live['id'] == item['id'], label + ': array ID mismatch: ' + native)
                require(saved['_uuid'] == live['id'], label + ': version array UUID mismatch: ' + native)
                for column in columns:
                    require(live[column] == saved[column] == item.get(column), label + ': array cell mismatch: ' + native + '.' + column)
                    checked_cells += 1
        main_rels = rows(db, 'comparisons_rels', 'WHERE parent_id=?', (row['id'],))
        version_rels = rows(db, '_comparisons_v_rels', 'WHERE parent_id=?', (version['id'],))
        relation = lambda values: stable([{k:v for k,v in item.items() if k not in {'id','parent_id'}} for item in values])
        require(relation(main_rels) == relation(version_rels), label + ': latest relations differ from main')
    violations = list(db.execute('PRAGMA foreign_key_check'))
    require(not violations, f'{phase}: foreign-key violations: {violations[:5]}')
    return {'phase': phase, 'comparisons':len(current), 'historicalVersionsPreserved':len(old_versions),
            'newVersions':len(candidates), 'totalVersions':len(version_rows), 'arrayCellsChecked':checked_cells,
            'foreignKeyViolations':0, 'latestPublishedSnapshotsMatched':len(candidates)}


def guard(db, audit):
    writes = {sqlite3.SQLITE_INSERT, sqlite3.SQLITE_UPDATE, sqlite3.SQLITE_DELETE}
    denied = {getattr(sqlite3, name) for name in [
        'SQLITE_CREATE_INDEX','SQLITE_CREATE_TABLE','SQLITE_CREATE_TEMP_INDEX',
        'SQLITE_CREATE_TEMP_TABLE','SQLITE_CREATE_TEMP_TRIGGER','SQLITE_CREATE_TEMP_VIEW',
        'SQLITE_CREATE_TRIGGER','SQLITE_CREATE_VIEW','SQLITE_DROP_INDEX','SQLITE_DROP_TABLE',
        'SQLITE_DROP_TEMP_INDEX','SQLITE_DROP_TEMP_TABLE','SQLITE_DROP_TEMP_TRIGGER',
        'SQLITE_DROP_TEMP_VIEW','SQLITE_DROP_TRIGGER','SQLITE_DROP_VIEW','SQLITE_ALTER_TABLE',
        'SQLITE_ATTACH','SQLITE_DETACH','SQLITE_CREATE_VTABLE','SQLITE_DROP_VTABLE','SQLITE_REINDEX',
    ]}
    def authorize(action, first, second, database, trigger):
        if action in denied:
            audit['denied'].append([action,first,second])
            return sqlite3.SQLITE_DENY
        if action in writes:
            if first not in TABLES or database != 'main' or trigger:
                audit['denied'].append([action,first,second])
                return sqlite3.SQLITE_DENY
            audit['writtenTables'].add(first)
        if action == sqlite3.SQLITE_PRAGMA and first not in {'defer_foreign_keys', 'foreign_key_check'}:
            audit['denied'].append([action,first,second])
            return sqlite3.SQLITE_DENY
        if action == sqlite3.SQLITE_FUNCTION and str(second).lower() in {'load_extension','writefile','readfile'}:
            audit['denied'].append([action,first,second])
            return sqlite3.SQLITE_DENY
        return sqlite3.SQLITE_OK
    db.set_authorizer(authorize)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sql', type=Path, default=Path('/tmp/whatflow-comparison-enhancements.sql'))
    parser.add_argument('--backup', type=Path, default=Path('/tmp/whatflow-before-comparison-enhancement.sql'))
    parser.add_argument('--schema', type=Path, default=REPO/'scripts/comparisons-schema.sql')
    parser.add_argument('--candidates', type=Path, default=WORK/'candidate-documents.json')
    parser.add_argument('--report', type=Path, default=WORK/'sql-rehearsal.json')
    parser.add_argument('--expected-history', type=int, default=219)
    args = parser.parse_args()
    for path in [args.sql,args.backup,args.schema,args.candidates]:
        if not path.is_file():
            parser.error('Required input not yet available: ' + str(path))
    report = {'passed':False,'checkedAt':datetime.now(timezone.utc).isoformat(),'database':'isolated in-memory SQLite',
              'inputs':{key:{'path':str(path),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
                        for key,path in [('sql',args.sql),('backup',args.backup),('schema',args.schema),('candidates',args.candidates)]}}
    db = sqlite3.connect(':memory:')
    db.row_factory = sqlite3.Row
    try:
        db.execute('CREATE TABLE media (id INTEGER PRIMARY KEY)')
        db.executescript(args.schema.read_text())
        db.executescript(args.backup.read_text())
        # Media is an external collection; stub only its referenced identities.
        ids = {row[0] for row in db.execute('SELECT cover_image_id FROM comparisons WHERE cover_image_id IS NOT NULL UNION SELECT version_cover_image_id FROM _comparisons_v WHERE version_cover_image_id IS NOT NULL')}
        db.executemany('INSERT INTO media(id) VALUES (?)', [(i,) for i in sorted(ids)])
        db.commit()
        db.execute('PRAGMA foreign_keys=ON')
        require(not list(db.execute('PRAGMA foreign_key_check')), 'Backup has invalid comparison foreign keys')
        before = snapshot(db)
        require(len(before['_comparisons_v']) == args.expected_history, 'Unexpected backup revision count')
        candidate_docs = json.loads(args.candidates.read_text())
        require(isinstance(candidate_docs,list), 'Candidate JSON must be a document array')
        audit={'writtenTables':set(),'denied':[]}
        guard(db,audit)
        db.executescript(args.sql.read_text())
        db.set_authorizer(None)
        first=verify(db,candidate_docs,before,'first apply')
        first_state=snapshot(db)
        guard(db,audit)
        db.executescript(args.sql.read_text())
        db.set_authorizer(None)
        second=verify(db,candidate_docs,before,'repeat apply')
        require(snapshot(db)==first_state, 'Rerun changed the comparison state; SQL is not idempotent')
        report.update({'passed':True,'firstApply':first,'repeatApply':second,
                       'idempotent':True,'sqlScope':{'writtenTables':sorted(audit['writtenTables']),'rejectedOperations':audit['denied'],
                       'schemaWritesAllowed':False,'nonComparisonWritesAllowed':False},
                       'protected':['original IDs/slugs/publication and creation dates/authors/status',
                       'all original comparison relations','all historical version content and metadata except latest flags',
                       'all historical version child arrays and relations']})
    except Exception as exc:
        db.set_authorizer(None)
        report['error']=str(exc)
    finally:
        db.close()
        args.report.parent.mkdir(parents=True,exist_ok=True)
        args.report.write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    sys.exit(main())
