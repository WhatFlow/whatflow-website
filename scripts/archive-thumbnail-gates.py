#!/usr/bin/env python3
"""Archive only actual successful trusted-helper reports and verbatim reviews."""
import json,pathlib,hashlib,shutil,datetime
root=pathlib.Path('content/thumbnails-2026-10-25');delivery=pathlib.Path('/tmp/whatflow-release-delivery/candidate');manifest=json.loads((root/'manifest.json').read_text());results=[];pending=[]
for record in manifest['records']:
 slug=record['slug'];d=delivery/slug;p=d/'preflight-report.json'
 if not p.exists():pending.append(slug);continue
 report=json.loads(p.read_text());gates=report.get('gates',[])
 if report.get('blocked',True)or len(gates)!=5 or not all(g.get('passed')for g in gates):pending.append(slug);continue
 target=root/'delivery'/slug;target.mkdir(parents=True,exist_ok=True)
 for name in ['preflight-report.json','review.md']:
  shutil.copyfile(d/name,target/name)
 if (d/'external-links.allowed').exists():shutil.copyfile(d/'external-links.allowed',target/'external-links.allowed')
 hashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in [d/(slug+'.md'),d/(slug+'.html'),d/(slug+'.pdf'),d/'hero.webp']}
 assert hashes['hero.webp']==record['sha256'],slug+' mismatched reviewed cover'
 review=(d/'review.md').read_text();assert 'zero P0 issues found'in review and 'BLOCKING: false'in review
 results.append({'slug':slug,'collection':record['collection'],'gatesPassed':[g['gate']for g in gates],'score':next(g['score']for g in gates if g['gate']==4),'artifactDirectory':str(d),'hashes':hashes})
summary={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'expected':164,'passed':len(results),'pending':pending,'allPassed':not pending,'results':results};(root/'gate-summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps({'passed':len(results),'pending':len(pending),'blogsPassed':sum(r['collection']=='blog'for r in results)}))
