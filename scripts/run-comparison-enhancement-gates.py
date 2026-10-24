#!/usr/bin/env python3
"""Orchestrate trusted claude-blog helpers without modifying them or review results."""
import subprocess,json,os,concurrent.futures,pathlib,time,argparse
ROOT=pathlib.Path(os.environ.get('COMPARISON_DELIVERY_ROOT','/tmp/whatflow-comparison-delivery'))/'candidate';PYTHON='/tmp/whatflow-blog-runtime/bin/python';HELPERS=pathlib.Path('/tmp/whatflow-claude-blog/scripts')
ap=argparse.ArgumentParser();ap.add_argument('phase',choices=['prepare','strict','repair']);ap.add_argument('--workers',type=int,default=1);ap.add_argument('--slug',action='append');args=ap.parse_args()
env=dict(os.environ,CLAUDE_BLOG_REVIEW_STATE_DIR=os.environ.get('CLAUDE_BLOG_REVIEW_STATE_DIR','/tmp/whatflow-comparison-review-state'))
def run(d):
 logs=[]
 def call(name,*opts):
  p=subprocess.run([PYTHON,str(HELPERS/name),*map(str,opts)],capture_output=True,text=True,env=env);logs.append(p.stdout+p.stderr);return p
 if args.phase=='prepare':
  commands=[('blog_preflight.py','--draft',d,'--gate','1','--tools-json','["mcp__node_repl__js","collaboration.followup_task"]'),('blog_render.py','--md',d/(d.name+'.md'),'--out-dir',d,'--pdf-engine','playwright','--json'),('blog_preflight.py','--draft',d,'--gate','2','--json'),('blog_preflight.py','--draft',d,'--gate','3','--json')]
  for command in commands:
   p=call(*command)
   if p.returncode:(d/'preparation.log').write_text('\n'.join(logs));return {'slug':d.name,'ok':False,'diagnostic':logs[-1][-3000:]}
  p=call('blog_preflight.py','--draft',d,'--init-review-nonce');nonce=p.stdout.strip();(d/'preparation.log').write_text('\n'.join(logs));return {'slug':d.name,'ok':p.returncode==0,'nonce':nonce}
 options=['--draft',d,'--strict','--json','--tools-json','["mcp__node_repl__js","collaboration.followup_task"]']
 if args.phase=='repair':options+=['--repair-attempt']
 p=call('blog_preflight.py',*options);(d/'strict.log').write_text('\n'.join(logs));time.sleep(3)
 return {'slug':d.name,'ok':p.returncode==0,'diagnostic':p.stdout[-5000:] if p.returncode else ''}
dirs=sorted(d for d in ROOT.iterdir() if d.is_dir())
if args.slug:dirs=[d for d in dirs if d.name in args.slug]
if args.phase=='repair':dirs=[d for d in dirs if json.loads((d/'preflight-report.json').read_text()).get('blocked',True)]
results=[];output=pathlib.Path(os.environ.get('COMPARISON_GATE_RESULT_PREFIX','/tmp/whatflow-comparison')+'-'+args.phase+'-results.json')
with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
 for r in pool.map(run,dirs):results.append(r);output.write_text(json.dumps(results,indent=2));print(json.dumps(r),flush=True)
