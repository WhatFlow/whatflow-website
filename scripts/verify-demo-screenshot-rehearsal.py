"""Rehearse the screenshot-only patch against an isolated, scoped D1 export."""
import json
import os
import sqlite3
from pathlib import Path

work = Path(os.environ["SCREENSHOT_REFRESH_WORK"])
db = sqlite3.connect(":memory:")
db.row_factory = sqlite3.Row
db.executescript((work / "before.sql").read_text())
db.execute("PRAGMA foreign_keys=ON")
manifest = json.loads(Path("content/engineering/demo-screenshot-coverage/capture-manifest.json").read_text())
plan = json.loads((work / "plan.json").read_text())
candidates = {
    "posts": json.loads((work / "post-candidates.json").read_text()),
    "comparisons": json.loads((work / "candidate-documents.json").read_text()),
}
def snapshot(table):
    return {r["id"]: dict(r) for r in db.execute(f'SELECT * FROM "{table}"')}
before = {table: snapshot(table) for table in (*candidates, "media", "_comparisons_v")}
new_filenames = {m["filename"] for m in manifest}
assert not new_filenames.intersection(r["filename"] for r in before["media"].values())
patch = (work / "publish.sql").read_text()
db.executescript(patch)
after = {table: snapshot(table) for table in before}
for table, docs in candidates.items():
    expected = {d["id"]: d for d in docs}
    assert before[table].keys() == after[table].keys()
    for ident, previous in before[table].items():
        actual = after[table][ident]
        if ident not in expected:
            assert actual == previous, (table, ident)
            continue
        doc = expected[ident]
        assert actual["updated_at"] == doc["updatedAt"]
        assert json.loads(actual["content"]) == doc["content"]
        assert {k: v for k, v in actual.items() if k not in ("content", "updated_at")} == {
            k: v for k, v in previous.items() if k not in ("content", "updated_at")
        }
        if table == "comparisons":
            latest = db.execute(
                "SELECT version_content,version__status FROM _comparisons_v WHERE parent_id=? AND latest=1", (ident,)
            ).fetchall()
            assert len(latest) == 1 and latest[0]["version__status"] == "published"
            assert json.loads(latest[0]["version_content"]) == doc["content"]
old_versions = before["_comparisons_v"]
updated_ids = {d["id"] for d in candidates["comparisons"]}
for ident, old in old_versions.items():
    actual = after["_comparisons_v"][ident]
    if old["parent_id"] in updated_ids and old["latest"] == 1:
        assert actual == dict(old, latest=0)
    else:
        assert actual == old
assert len(after["_comparisons_v"]) - len(old_versions) == len(updated_ids)
assert len(after["media"]) - len(before["media"]) == len(manifest)
assert not db.execute("PRAGMA foreign_key_check").fetchall()
db.executescript(patch)
assert {t: snapshot(t) for t in after} == after
result = {
    "posts": len(candidates["posts"]), "comparisons": len(candidates["comparisons"]),
    "media": len(manifest), "newComparisonRevisions": len(updated_ids),
    "unchangedArticles": len(plan["skipped"]), "foreignKeys": "ok", "repeatRun": "identical",
}
(work / "rehearsal.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result))
