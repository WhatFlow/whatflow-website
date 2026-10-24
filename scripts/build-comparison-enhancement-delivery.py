#!/usr/bin/env python3
"""Export real native comparison documents for the trusted claude-blog renderer.
No runtime content fallback; no edits to trusted skill helpers or review reports.
"""
import importlib.util,json,re,argparse
from pathlib import Path
spec=importlib.util.spec_from_file_location('native_export',Path(__file__).with_name('build-blog-enhancement-delivery.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class ComparisonExporter(module.Exporter):
 def document(self,d):
  metadata={'title':d['title'],'description':d.get('seo',{}).get('metaDescription') or d['excerpt'],'date':d['publishedAt'][:10],'lastUpdated':d['updatedAt'],'author':d['author'],'authorRole':d['authorRole'],'canonical':'https://whatflow.tech/compare/'+d['slug'],'slug':d['slug'],'site_name':'WhatFlow','lang':'en','og_image_alt':d['imageAlt'],'category':d['category']}
  fm='\n'.join(k+': '+module.quoted(v) for k,v in metadata.items())
  body='## The short answer\n\n'+module.escape(d['verdict'])+'\n\nPublisher disclosure: this comparison is written by WhatFlow. Competitor capabilities are based on linked public documentation. Screenshots show our demo store and examples are illustrative.\n\n'
  hero=self.asset(d.get('imageUrl') or (d.get('coverImage') or {}).get('url'),hero=True)
  if d.get('imageCaption'):body+=module.escape(d['imageCaption'])+'\n\n'
  if d.get('featureTable'):
   body+='## WhatFlow and '+module.escape(d['competitor'])+' at a glance\n\n| Consideration | WhatFlow | '+module.escape(d['competitor'])+' |\n|---|---|---|\n'
   cell=lambda v:module.escape(v).replace('|','&#124;').replace('\n',' ')
   for row in d['featureTable']:body+='| '+cell(row['feature'])+' | '+cell(row['whatflow'])+' | '+cell(row['competitor'])+' |\n'
   body+='\n'
  body+=self.node(d['content']['root'])
  if d.get('faqs'):
   body+='## Questions worth asking\n\n'
   for row in d['faqs']:body+='### '+module.escape(row['question'])+'\n\n'+module.escape(row['answer'])+'\n\n'
  body+='## Sources and methodology\n\nVendor pages describe advertised capabilities, not independent performance tests. Confirm current pricing, allowances and availability with the provider. Sources checked '+d['reviewedAt'][:10]+'.\n\n'
  for s in d['sources']:body+='- ['+module.escape(s['title'])+']('+module.safe_url(s['url'])+')'+(': '+module.escape(s['note']) if s.get('note') else '')+'\n'
  if d.get('cta',{}).get('heading'):
   c=d['cta'];body+='\n## '+module.escape(c['heading'])+'\n\n'+module.escape(c.get('description',''))+'\n\n['+module.escape(c.get('label','Explore WhatFlow'))+'](https://apps.shopify.com/whatflow-official-api)\n\n[Current WhatFlow pricing](https://whatflow.tech/pricing) · [WhatFlow features](https://whatflow.tech/features)\n'
  (self.directory/(d['slug']+'.md')).write_text('---\n'+fm+'\n---\n\n'+body.rstrip()+'\n')
  if hero:(self.directory/'hero-credit.txt').write_text(d.get('imageCaption','Existing owned WhatFlow demo screenshot')+'\nSource: '+d.get('imageUrl','')+'\n')
  return hero

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--variant',choices=['baseline','candidate','both'],default='both');ap.add_argument('--content-root',type=Path,default=Path(__file__).resolve().parents[1]/'content/comparisons/enhancement-2026-10-25');ap.add_argument('--output-root',type=Path,default=Path('/tmp/whatflow-comparison-delivery'));args=ap.parse_args()
 root=args.content_root;out=args.output_root;out.mkdir(parents=True,exist_ok=True);manifest=[]
 for variant in (['baseline','candidate'] if args.variant=='both' else [args.variant]):
  inputfile=root/('source-documents.json' if variant=='baseline' else 'candidate-documents.json')
  for d in json.loads(inputfile.read_text()):
   if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',d['slug']):raise ValueError('Unsafe slug')
   folder=out/variant/d['slug'];folder.mkdir(parents=True,exist_ok=True)
   e=ComparisonExporter(folder,{});hero=e.document(d)
   target=root/('baseline' if variant=='baseline' else 'enhanced');target.mkdir(exist_ok=True)
   (target/(d['slug']+'.md')).write_bytes((folder/(d['slug']+'.md')).read_bytes())
   manifest.append({'slug':d['slug'],'variant':variant,'directory':str(folder),'hero':hero,'assets':e.assets,'issues':e.issues})
 (out/('export-'+args.variant+'.json')).write_text(json.dumps(manifest,indent=2));print(json.dumps({'exported':len(manifest),'issues':sum(bool(x['issues']) for x in manifest)}))
if __name__=='__main__':main()
