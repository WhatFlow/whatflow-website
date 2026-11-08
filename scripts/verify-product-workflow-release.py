"""Compare every live article with its expected content; check public guide pages and covers."""
import concurrent.futures
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

w = Path(os.environ["WORKFLOW_PUBLICATION_WORK"])
root = Path("content/blog/product-workflows-2026-11-08")
base = "https://whatflow.tech"
def read(name):
    return json.loads((w / (name + ".json")).read_text())
def fetch(path):
    return subprocess.check_output(["curl", "-fsS", "--retry", "1", "--max-time", "30", "-H", "Cache-Control: no-cache", base + path])
fresh = {d["slug"]:d for d in read("new-posts")}
audit = read("audit")
covers = json.loads((root / "covers.json").read_text())
for kind, candidates in (("posts", "post-candidates"), ("comparisons", "candidate-documents")):
    old = read(kind)
    expected = {d["slug"]:d for d in read(candidates)}
    live = json.loads(fetch("/api/" + kind + "?limit=250&depth=0"))
    assert live["totalDocs"] == old["totalDocs"] + (len(fresh) if kind == "posts" else 0)
    actual = {d["slug"]:d for d in live["docs"]}
    for d in old["docs"]:
        assert actual[d["slug"]] == expected.get(d["slug"],d), (kind,d["slug"])
    if kind == "posts":
        for slug, d in fresh.items():
            a = actual[slug]
            assert a["author"] == "Safwan Adnan" and a["status"] == "published" and a["coverImage"]
            assert a["title"] == d["title"]
            for n in a["content"]["root"]["children"]:
                if n.get("fields",{}).get("blockType") == "screenshot":
                    for k in ("width", "height"):
                        n["fields"].pop(k,None)
            assert a["content"] == d["content"], slug
def check_page(path, markers):
    html = fetch(path).decode()
    assert len(re.findall(r"<h1(?:\s|>)", html)) == 1, path
    assert re.search(r'<link[^>]+rel="canonical"[^>]+href="'+re.escape(base+path)+r'"',html),path
    assert all(marker in html for marker in markers),path
    return path
checks = [("/blog/"+d["slug"],[d["cover"],"Safwan Adnan"]) for d in fresh.values()]
checks += [(("/blog/" if a["kind"]=="posts" else "/compare/")+a["slug"],["does not keep that segment continuously synced"]) for a in audit if a["action"]=="clarified"]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(lambda x:check_page(*x),checks))
    for cover in covers:
        assert hashlib.sha256(fetch("/api/media/file/"+cover["filename"])).hexdigest()==cover["sha256"]
sitemap = fetch("/sitemap.xml").decode()
assert all(base+"/blog/"+slug in sitemap for slug in fresh)
result={"comparedCmsRecords":len(audit)+len(fresh),"publicPages":pages,"covers":len(covers),"newGuideSitemap":True}
(w/"live-verification.json").write_text(json.dumps(result,indent=2)+"\n")
print(json.dumps(result))
