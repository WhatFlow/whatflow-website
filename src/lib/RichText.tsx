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
} from "@/components/rich-text-blocks";

interface RichTextProps {
  content: unknown;
  className?: string;
}

export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  const customConverters = {
    ...defaultJSXConverters,
    // Custom block converters
    blocks: {
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
