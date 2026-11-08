"""Generate and rehearse an optimistic, website-host-only update from a public D1 export."""
import json
import re
import sqlite3
import sys
from collections import Counter
from pathlib import Path

work = Path(sys.argv[1])
database = sqlite3.connect(":memory:")
database.executescript((work / "before.sql").read_text())
database.execute("PRAGMA foreign_keys=ON")
domain = re.compile(r"(?<![\w@.-])(?:www\.)?whatflow\.tech\b", re.I)
# Keep historical Payload revisions as they were; normalize the latest
# published snapshot alongside each affected public comparison source.
tables = {
    "posts": ["content", "title", "excerpt", "cover_image_url"],
    "posts_faqs": ["answer", "question"],
    "posts_sources": ["url", "title", "note"],
    "comparisons": ["content", "title", "excerpt", "verdict", "image_url", "image_source_url"],
    "comparisons_faqs": ["answer", "question"],
    "comparisons_sources": ["url", "title", "note"],
    "comparisons_feature_table": ["feature", "whatflow", "competitor"],
    "_comparisons_v": ["version_content", "version_title", "version_excerpt", "version_verdict", "version_image_url", "version_image_source_url"],
    "_comparisons_v_version_faqs": ["answer", "question"],
    "_comparisons_v_version_sources": ["url", "title", "note"],
    "_comparisons_v_version_feature_table": ["feature", "whatflow", "competitor"],
    "case_studies": None, "changelog": None, "integrations": None, "media": None,
}
def q(value):
    return str(value) if isinstance(value, int) else "'" + value.replace("'", "''") + "'"
def scope(table):
    if table == "_comparisons_v":
        return "latest=1 AND version__status='published'"
    if table.startswith("_comparisons_v_version_"):
        return "_parent_id IN (SELECT id FROM _comparisons_v WHERE latest=1 AND version__status='published')"
    return "1=1"
def normalize(value):
    return domain.sub("whatflow.io", value) if isinstance(value, str) else value
patch, reverse = [], []
counts = Counter()
for table, allowed in tables.items():
    columns = [row[1] for row in database.execute(f'PRAGMA table_info("{table}")')]
    if not columns:
        raise RuntimeError("Missing table " + table)
    for row in database.execute(f'SELECT * FROM "{table}" WHERE {scope(table)}'):
        doc = dict(zip(columns, row))
        old = {k: v for k, v in doc.items() if (allowed is None or k in allowed) and normalize(v) != v}
        if not old:
            continue
        new = {k: normalize(v) for k,v in old.items()}
        def statement(changes, expected):
            assignments = ",".join(f'"{k}"={q(v)}' for k,v in changes.items())
            guard = " AND ".join(f'"{k}"={q(v)}' for k,v in expected.items())
            return f'UPDATE "{table}" SET {assignments} WHERE id={q(doc["id"])} AND ({scope(table)}) AND {guard};'
        patch.append(statement(new, old))
        reverse.append(statement(old, new))
        counts[table] += 1
change_sql = "\n".join(patch)
def snapshot():
    return {t: database.execute(f'SELECT * FROM "{t}" ORDER BY id').fetchall() for t in tables}
baseline = snapshot()
database.executescript(change_sql)
after = snapshot()
for table in tables:
    remaining = list(database.execute(f'SELECT * FROM "{table}" WHERE {scope(table)}'))
    assert not any(normalize(v) != v for row in remaining for v in row), table
assert not database.execute("PRAGMA foreign_key_check").fetchall()
database.executescript(change_sql)
assert snapshot() == after
database.executescript("\n".join(reversed(reverse)))
assert snapshot() == baseline
(work / "update.sql").write_text(change_sql + "\n")
(work / "undo.sql").write_text("\n".join(reversed(reverse)) + "\n")
result = {"updatedRows": sum(counts.values()), "tables": dict(counts), "replay": "identical", "rollback": "identical"}
(work / "cms-rehearsal.json").write_text(json.dumps(result, indent=2)+"\n")
print(json.dumps(result))
