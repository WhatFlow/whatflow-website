"""Run the editorial release against a restricted local copy before publishing."""
import json
import os
import sqlite3
from pathlib import Path

work = Path(os.environ["WORKFLOW_PUBLICATION_WORK"])
db = sqlite3.connect(":memory:")
db.row_factory = sqlite3.Row
db.executescript((work / "before.sql").read_text())
db.execute("PRAGMA foreign_keys=ON")
tables = ["posts", "comparisons", "media", "_comparisons_v", "posts_tags", "posts_sources", "posts_faqs"]
def snapshot():
    return {t: {r["id"]: dict(r) for r in db.execute(f'SELECT * FROM "{t}"')} for t in tables}
def load(name):
    return json.loads((work / (name + ".json")).read_text())
before = snapshot()
patch = (work / "publish.sql").read_text()
db.executescript(patch)
after = snapshot()
for table, key in (("posts", "post-candidates"), ("comparisons", "candidate-documents")):
    changes = {r["id"]: r for r in load(key)}
    for ident, old in before[table].items():
        new = after[table][ident]
        if ident not in changes:
            assert old == new, (table, ident)
            continue
        expected = changes[ident]
        assert expected["content"] == json.loads(new["content"])
        assert expected["updatedAt"] == new["updated_at"]
        assert all(v == new[k] for k, v in old.items() if k not in {"content", "updated_at"})
        if table == "comparisons":
            latest = db.execute("SELECT version_content,version__status FROM _comparisons_v WHERE parent_id=? AND latest=1", (ident,)).fetchall()
            assert len(latest) == 1 and latest[0]["version__status"] == "published"
            assert json.loads(latest[0]["version_content"]) == expected["content"]
changed_comparisons = {r["id"] for r in load("candidate-documents")}
for ident, old in before["_comparisons_v"].items():
    assert after["_comparisons_v"][ident] == (dict(old, latest=0) if old["parent_id"] in changed_comparisons and old["latest"] else old)
assert len(after["_comparisons_v"]) - len(before["_comparisons_v"]) == len(changed_comparisons)
for t in ("posts_tags", "posts_sources", "posts_faqs", "media"):
    assert all(after[t][ident] == row for ident, row in before[t].items())
fresh = load("new-posts")
assert len(after["posts"]) - len(before["posts"]) == len(fresh)
assert len(after["media"]) - len(before["media"]) == len(fresh)
for d in fresh:
    rows = db.execute("SELECT p.content,p.author,p.status,m.filename FROM posts p JOIN media m ON m.id=p.cover_image_id WHERE p.slug=?", (d["slug"],)).fetchall()
    assert len(rows) == 1 and rows[0]["filename"] == d["cover"]
    assert rows[0]["author"] == "Safwan Adnan" and rows[0]["status"] == "published"
    assert json.loads(rows[0]["content"]) == d["content"]
assert not db.execute("PRAGMA foreign_key_check").fetchall()
db.executescript(patch)
assert snapshot() == after
result = {"existingPosts":len(load("post-candidates")), "comparisons":len(changed_comparisons), "newPosts":len(fresh), "foreignKeys":"ok", "repeatRun":"identical"}
(work / "rehearsal.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result))
