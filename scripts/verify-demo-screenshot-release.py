"""Verify the live Payload content and the bytes of each approved demo capture."""
import concurrent.futures
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

work = Path(os.environ["SCREENSHOT_REFRESH_WORK"])
root = Path("content/engineering/demo-screenshot-coverage")
manifest = json.loads((root / "capture-manifest.json").read_text())
assets = {m["key"]: m for m in manifest}
plan = json.loads((work / "plan.json").read_text())
base = "https://whatflow.io"
def fetch(path):
    return subprocess.check_output(
        ["curl", "-fsS", "--retry", "2", "--max-time", "35", "-H", "Cache-Control: no-cache", base + path]
    )
for kind, file in (("posts", "post-candidates.json"), ("comparisons", "candidate-documents.json")):
    prior = json.loads((work / (kind + ".json")).read_text())
    expected = {d["slug"]: d for d in json.loads((work / file).read_text())}
    actual = json.loads(fetch("/api/" + kind + "?limit=250&depth=0"))
    assert actual["totalDocs"] == prior["totalDocs"] == len(actual["docs"])
    actual = {d["slug"]: d for d in actual["docs"]}
    for old in prior["docs"]:
        slug = old["slug"]
        assert actual[slug] == expected.get(slug, old), (kind, slug)
def check_media(m):
    data = fetch(m["url"])
    assert hashlib.sha256(data).hexdigest() == m["sha256"], m["key"]
    return m["key"]
def check_page(change):
    path = ("/blog/" if change["kind"] == "posts" else "/compare/") + change["slug"]
    html = fetch(path).decode()
    assert assets[change["asset"]]["filename"] in html, path
    assert re.search(r'<link[^>]+rel="canonical"[^>]+href="' + re.escape(base + path) + r'"', html), path
    assert len(re.findall(r"<h1(?:\s|>)", html)) == 1, path
    return path
samples = {}
for change in plan["changes"]:
    samples.setdefault((change["kind"], change["asset"]), change)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    verified = list(pool.map(check_media, manifest))
    rendered = list(pool.map(check_page, samples.values()))
result = {
    "posts": plan["updatedPosts"], "comparisons": plan["updatedComparisons"],
    "unchangedArticles": len(plan["skipped"]), "verifiedMedia": len(verified),
    "representativePublicPages": rendered,
}
(work / "live-verification.json").write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps({**result, "representativePublicPages": len(rendered)}))
