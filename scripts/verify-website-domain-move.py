"""Smoke-test the new canonical domain, CMS URLs, and permanent host redirects."""
import concurrent.futures
import json
import os
import re
import subprocess
import sys

new = "https://whatflow.io"
legacy_host = re.compile(r"(?<![\w@.-])(?:www\.)?whatflow\.tech\b", re.I)
def fetch(path):
    headers = ["-H", "Cache-Control: no-cache"]
    if version := os.getenv("WHATFLOW_SMOKE_VERSION"):
        headers += ["-H", f'Cloudflare-Workers-Version-Overrides: whatflow="{version}"']
    return subprocess.check_output(["curl", "-fsS", "--max-time", "25", *headers, new + path]).decode()
pages = ["/", "/pricing", "/blog", "/compare", "/inbox", "/docs/mcp",
         "/blog/whatflow-shopify-whatsapp-campaign-walkthrough", "/compare/whatflow-vs-dondy",
         "/about", "/features", "/integrations", "/integrations/shopify-flow", "/solutions",
         "/case-studies", "/security", "/privacy", "/terms", "/affiliate", "/changelog"]
discovery = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/.well-known/ai.txt",
             "/ai/service.json", "/ai/summary.json", "/blog/rss.xml", "/changelog/rss.xml"]
def page(path):
    html = fetch(path)
    found = re.findall(r'<link\s+rel="canonical"\s+href="([^"]+)"', html)
    assert found == [new + path.rstrip("/")], (path, found)
    assert "WhatFlow" in html
    return path
def check_metadata(path):
    body = fetch(path)
    assert new in body and not legacy_host.search(body), path
    return path
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    list(executor.map(page, pages))
    list(executor.map(check_metadata, discovery))
result = {"pages": len(pages), "discovery":len(discovery)}
if "--cms" in sys.argv:
    counts = {}
    for kind in ("posts", "comparisons", "case-studies", "integrations", "changelog"):
        data = json.loads(fetch("/api/" + kind + "?limit=250&depth=0"))
        docs = data["docs"]
        assert len(docs) == data["totalDocs"], kind
        for doc in docs:
            assert not legacy_host.search(json.dumps(doc)), (kind,doc.get("slug"))
        counts[kind] = len(docs)
    result["cms"] = counts
if "--redirects" in sys.argv:
    paths = ["/", "/blog?q=whatsapp%20inbox&tag=a%2Bb", "/compare/whatflow-vs-dondy?utm_source=old",
             "/llms.txt", "/sitemap.xml", "/logo.svg", "/ai/service.json"]
    def redirect(pair):
        host, path = pair
        # Optional authoritative A record when the local resolver has a stale NXDOMAIN.
        address = os.getenv("WHATFLOW_WWW_ADDRESS") if host == "www.whatflow.io" else None
        resolve = ["--resolve", f"{host}:443:{address}"] if address else []
        result = subprocess.check_output([
            "curl", "-sS", "--max-time", "20", "-o", "/dev/null", "-w", "%{http_code} %{redirect_url}",
            *resolve, "https://" + host + path
        ]).decode().strip()
        assert result == "301 " + new + path, (host,path,result)
    hosts = ("whatflow.tech", "www.whatflow.tech", "www.whatflow.io")
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        list(executor.map(redirect, [(host,path) for host in hosts for path in paths]))
    result["redirects"] = len(paths)*len(hosts)
print(json.dumps(result))
