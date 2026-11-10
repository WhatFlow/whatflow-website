/* eslint-disable @typescript-eslint/no-explicit-any -- Payload lexical converter nodes are untyped. */
import React from "react";
import {
  RichText as PayloadRichText,
  defaultJSXConverters,
} from "@payloadcms/richtext-lexical/react";
import {
  CalloutRenderer,
  CtaRenderer,
  WhatsAppMockupRenderer,
  StatHighlightRenderer,
  VideoEmbedRenderer,
  CodeSnippetRenderer,
  InlineUploadRenderer,
  ScreenshotRenderer,
} from "@/components/rich-text-blocks";

interface RichTextProps {
  content: unknown;
  className?: string;
}

// Lexical marks blank corner cells as headers when a row is formatted as a header.
function isBlankTableContent(node: { type?: string; text?: string; children?: unknown[] }): boolean {
  if (node.type === "text") return !node.text?.trim();
  if (node.type === "linebreak") return true;
  if (node.type === "paragraph") return (node.children ?? []).every((child) => isBlankTableContent(child as Parameters<typeof isBlankTableContent>[0]));
  return false;
}

export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  const customConverters = {
    ...defaultJSXConverters,
    tablecell: (args: any) => {
      const renderCell = defaultJSXConverters.tablecell;
      if (typeof renderCell !== "function") return null;
      const { node } = args;
      return renderCell({
        ...args,
        node: node.headerState && node.children.every(isBlankTableContent)
          ? { ...node, headerState: 0 }
          : node,
      });
    },
    // Custom block converters
    blocks: {
      screenshot: ({ node }: any) => <ScreenshotRenderer {...(node?.fields || {})} />,
      callout: ({ node }: any) => <CalloutRenderer {...(node?.fields || {})} />,
      cta: ({ node }: any) => <CtaRenderer {...(node?.fields || {})} />,
      whatsappMockup: ({ node }: any) => (
        <WhatsAppMockupRenderer {...(node?.fields || {})} />
      ),
      statHighlight: ({ node }: any) => (
        <StatHighlightRenderer {...(node?.fields || {})} />
      ),
      videoEmbed: ({ node }: any) => (
        <VideoEmbedRenderer {...(node?.fields || {})} />
      ),
      codeSnippet: ({ node }: any) => (
        <CodeSnippetRenderer {...(node?.fields || {})} />
      ),
    },
    // Custom inline image/media upload converter
    upload: ({ node }: any) => <InlineUploadRenderer node={node} />,
  };

  return (
    <div className={`prose-whatflow ${className}`}>
      {/* @ts-expect-error — Payload lexical content type is opaque */}
      <PayloadRichText converters={customConverters} data={content} />
    </div>
  );
}
