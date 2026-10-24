#!/usr/bin/env python3
"""Export native blog documents, then optionally render using trusted skill helpers.

Offline only. Missing heroes remain reported deficiencies, never invented assets.
Review reports/nonces and strict delivery gates belong to the orchestrator.
"""
import argparse
import hashlib
import json
import re
import shutil
import subprocess
from pathlib import Path
from urllib.parse import unquote, urlsplit

REPO = Path(__file__).resolve().parents[1]
PYTHON = Path('/tmp/whatflow-blog-runtime/bin/python')
HELPERS = Path('/tmp/whatflow-claude-blog/scripts')
RASTERS = {'.png', '.jpg', '.jpeg', '.webp'}


def quoted(value):
    return json.dumps(str(value or ''), ensure_ascii=False)


def escape(text):
    return re.sub(r'([\\`*\[\]<>_])', r'\\\1', str(text or ''))


def safe_url(url):
    url = str(url or '')
    if url.startswith('/') and not url.startswith('//'):
        return 'https://whatflow.tech' + url
    if urlsplit(url).scheme not in {'https', 'http', 'mailto', 'tel'} and not url.startswith('#'):
        raise ValueError('Unsupported link URL: ' + url)
    return url.replace(' ', '%20').replace('(', '%28').replace(')', '%29')


class Exporter:
    def __init__(self, directory, asset_map):
        self.directory, self.asset_map = directory, asset_map
        self.issues, self.assets = [], []

    def asset(self, url, hero=False):
        if not url:
            if hero:
                self.issues.append('Missing cover image; hero required by delivery contract')
            return None
        parsed = urlsplit(str(url))
        source = self.asset_map.get(str(url))
        if source:
            source = Path(source).resolve()
        elif not parsed.scheme or parsed.hostname in {'whatflow.tech', 'www.whatflow.tech'}:
            source = (REPO / 'public' / unquote(parsed.path).lstrip('/')).resolve()
            if not source.is_relative_to((REPO / 'public').resolve()):
                raise ValueError('Asset escapes public root')
        else:
            self.issues.append('Remote image requires an already downloaded asset-map entry: ' + str(url))
            return None
        if not source.is_file() or source.suffix.lower() not in RASTERS:
            self.issues.append('Missing or unsupported raster: ' + str(source))
            return None
        from PIL import Image
        try:
            with Image.open(source) as image:
                image.load()
                width, height = image.size
                fmt = image.format
        except Exception as exc:
            self.issues.append('Undecodable raster: ' + str(source) + ': ' + str(exc))
            return None
        extension = {'JPEG': '.jpg', 'PNG': '.png', 'WEBP': '.webp'}.get(fmt)
        if not extension:
            self.issues.append('Raster format unsupported: ' + str(fmt))
            return None
        name = 'hero' + extension if hero else 'image-' + hashlib.sha256(str(url).encode()).hexdigest()[:12] + extension
        target = self.directory / name
        if hero:
            for stale in self.directory.glob('hero.*'):
                if stale.suffix in RASTERS and stale != target: stale.unlink()
        shutil.copyfile(source, target)
        self.assets.append({'sourceUrl': url, 'sourcePath': str(source), 'local': name, 'width': width, 'height': height})
        if hero and (width < 1200 or height < 630):
            self.issues.append(f'Hero is {width}x{height}; contract requires at least 1200x630')
        return name

    def node(self, node):
        kind = node.get('type', '')
        children = lambda: ''.join(self.node(child) for child in node.get('children', []))
        if kind == 'text':
            value = escape(node.get('text', ''))
            flags = node.get('format', 0)
            if isinstance(flags, int):
                if flags & 16:
                    return '<code>' + __import__('html').escape(node.get('text', '')) + '</code>'
                if flags & 1: value = '**' + value + '**'
                if flags & 2: value = '*' + value + '*'
                if flags & 4: value = '<s>' + value + '</s>'
                if flags & 8: value = '<u>' + value + '</u>'
            return value
        if kind == 'root': return children()
        if kind == 'paragraph': return children() + '\n\n'
        if kind == 'heading': return '#' * int(node.get('tag', 'h2')[1:]) + ' ' + children() + '\n\n'
        if kind in {'link', 'autolink'}:
            fields = node.get('fields', {})
            url = fields.get('url') or node.get('url')
            if not url:
                raise ValueError('Unresolved internal relationship link: ' + str(fields))
            return '[' + children() + '](' + safe_url(url) + ')'
        if kind == 'linebreak': return '  \n'
        if kind == 'quote': return '\n'.join('> ' + line for line in children().strip().splitlines()) + '\n\n'
        if kind == 'list':
            ordered = node.get('listType') == 'number'
            start = int(node.get('start', 1))
            lines = []
            for index, item in enumerate(node.get('children', [])):
                content = self.node(item).strip()
                marker = str(start + index) + '. ' if ordered else '- '
                if node.get('listType') == 'check':
                    marker += '[x] ' if item.get('checked') else '[ ] '
                lines.append(marker + content.replace('\n', '\n' + ' ' * len(marker)))
            return '\n'.join(lines) + '\n\n'
        if kind == 'listitem': return children()
        if kind in {'horizontalrule', 'horizontal-rule'}: return '\n---\n\n'
        if kind == 'block':
            fields = node.get('fields', {})
            block = fields.get('blockType')
            if block in {'screenshot', 'image'}:
                url = fields.get('url')
                local = self.asset(url)
                image = '![' + escape(fields.get('alt', '')) + '](' + (local or safe_url(url)) + ')\n\n'
                caption = fields.get('caption', '')
                source = fields.get('sourceUrl')
                return image + (escape(caption) + '\n\n' if caption else '') + ('[Screenshot reference](' + safe_url(source) + ')\n\n' if source else '')
            if block == 'cta':
                result = '## ' + escape(fields.get('heading', '')) + '\n\n'
                if fields.get('badge'): result += escape(fields['badge']) + '\n\n'
                if fields.get('description'): result += escape(fields['description']) + '\n\n'
                return result + '[' + escape(fields.get('buttonText', '')) + '](' + safe_url(fields.get('buttonUrl')) + ')\n\n'
            raise ValueError('Unsupported block type: ' + str(block))
        raise ValueError('Unsupported Lexical node: ' + kind)

    def document(self, doc):
        seo = doc.get('seo') or {}
        metadata = {
            'title': doc['title'], 'description': seo.get('metaDescription') or doc.get('excerpt', ''),
            'date': str(doc.get('publishedAt') or doc.get('createdAt', ''))[:10],
            'lastUpdated': doc.get('updatedAt', ''), 'author': doc.get('author', ''),
            'authorRole': doc.get('authorRole', ''), 'canonical': 'https://whatflow.tech/blog/' + doc['slug'],
            'slug': doc['slug'], 'site_name': 'WhatFlow', 'lang': 'en',
            'og_image_alt': doc.get('coverImageAlt') or doc['title'],
            'reviewedAt': doc.get('reviewedAt', ''), 'category': doc.get('category', ''),
            'sourceDocumentId': doc.get('id', ''),
        }
        fm = '\n'.join(key + ': ' + quoted(value) for key, value in metadata.items() if value)
        tags = [item.get('tag', '') if isinstance(item, dict) else str(item) for item in doc.get('tags', [])]
        if tags: fm += '\ntags:\n' + '\n'.join('  - ' + quoted(tag) for tag in tags)
        body = self.node(doc['content']['root'])
        body += '\n<script type="application/ld+json">' + json.dumps({'@context':'https://schema.org','@type':'Organization','name':'WhatFlow','url':'https://whatflow.tech'}) + '</script>\n\n'
        if doc.get('faqs'):
            body += '## Frequently asked questions\n\n'
            for faq in doc['faqs']:
                body += '### ' + escape(faq['question']) + '\n\n' + escape(faq['answer']) + '\n\n'
        if doc.get('sources'):
            body += '## Sources\n\n'
            for source in doc['sources']:
                body += '- [' + escape(source['title']) + '](' + safe_url(source['url']) + ')'
                if source.get('note'): body += ': ' + escape(source['note'])
                body += '\n'
        cover = doc.get('coverImageUrl')
        if not cover and isinstance(doc.get('coverImage'), dict): cover = doc['coverImage'].get('url')
        hero = self.asset(cover, hero=True)
        if doc.get('coverImageCaption'):
            body += '\n\n' + escape(doc['coverImageCaption']) + '\n'
        (self.directory / (doc['slug'] + '.md')).write_text('---\n' + fm + '\n---\n\n' + body.rstrip() + '\n')
        if hero:
            (self.directory / 'hero-credit.txt').write_text(str(doc.get('coverImageCaption') or 'Existing WhatFlow website asset; no new licensing assertion.') + '\nSource: ' + str(cover) + '\n')
        return hero


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=REPO / 'content/blog/enhancement-2026-10-25/source-documents.json')
    parser.add_argument('--candidates', type=Path, default=REPO / 'content/blog/enhancement-2026-10-25/candidate-documents.json')
    parser.add_argument('--out', type=Path, default=Path('/tmp/whatflow-blog-delivery'))
    parser.add_argument('--asset-map', type=Path, help='JSON object mapping exact image URL to already downloaded local raster')
    parser.add_argument('--render', action='store_true', help='Render HTML and PDF using trusted helper; does not imply gate clearance')
    parser.add_argument('--slug', action='append', help='Limit export to selected slug; may repeat')
    args = parser.parse_args()
    if not args.candidates.is_file(): parser.error('Candidates must exist before delivery export/render: ' + str(args.candidates))
    mapping = json.loads(args.asset_map.read_text()) if args.asset_map else {}
    results = []
    for label, input_path in [('baseline', args.source), ('candidate', args.candidates)]:
        for doc in json.loads(input_path.read_text()):
            slug = doc['slug']
            if not re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*', slug): raise ValueError('Unsafe slug: ' + slug)
            if args.slug and slug not in args.slug: continue
            directory = args.out / label / slug
            directory.mkdir(parents=True, exist_ok=True)
            exporter = Exporter(directory, mapping)
            hero = exporter.document(doc)
            result = {'variant': label, 'slug': slug, 'directory': str(directory), 'assets': exporter.assets, 'issues': exporter.issues, 'rendered': False, 'gatesPassed': False}
            if args.render:
                if not hero:
                    exporter.issues.append('Render skipped because no real local hero exists')
                else:
                    command = [str(PYTHON), str(HELPERS / 'blog_render.py'), '--md', str(directory / (slug + '.md')), '--out-dir', str(directory), '--hero', hero, '--json']
                    completed = subprocess.run(command, capture_output=True, text=True)
                    (directory / 'render.log').write_text(completed.stdout + completed.stderr)
                    result['rendered'] = completed.returncode == 0
                    if completed.returncode: exporter.issues.append('Trusted renderer failed; see render.log')
            (directory / 'export-report.json').write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n')
            results.append(result)
    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / 'export-manifest.json').write_text(json.dumps(results, indent=2, ensure_ascii=False) + '\n')
    print(json.dumps({'articles': len(results), 'rendered': sum(r['rendered'] for r in results), 'articlesWithIssues': sum(bool(r['issues']) for r in results), 'manifest': str(args.out / 'export-manifest.json')}, indent=2))


if __name__ == '__main__':
    main()
