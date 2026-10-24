import type { Comparison } from '../src/payload-types';

/** The launch sources put a heading and its first paragraph on adjacent lines. */
export function comparisonLexical(markdown: string): Comparison['content'] {
  const blocks = markdown.replace(/^(## [^\n]+)\n/gm, '$1\n\n').split(/\n\s*\n/).filter(Boolean);
  return { root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: blocks.map(block => {
    const heading = block.startsWith('## ');
    return {
      type: heading ? 'heading' : 'paragraph', version: 1,
      ...(heading ? { tag: 'h2' } : { textFormat: 0, textStyle: '' }),
      direction: 'ltr', format: '', indent: 0,
      children: [{ type: 'text', version: 1, text: heading ? block.slice(3) : block.replace(/\n/g, ' '), format: 0, detail: 0, mode: 'normal', style: '' }],
    };
  }) } };
}
