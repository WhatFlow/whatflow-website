/**
 * RichText renderer for Payload CMS lexical rich text.
 *
 * Uses the official @payloadcms/richtext-lexical/react package to render
 * Lexical JSON to JSX, with custom styling applied via a wrapper class.
 */

import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

interface RichTextProps {
  content: unknown;
  className?: string;
}

export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  return (
    <div className={`prose-whatflow ${className}`}>
      {/* @ts-expect-error — Payload lexical content type is opaque */}
      <PayloadRichText data={content} />
    </div>
  );
}
