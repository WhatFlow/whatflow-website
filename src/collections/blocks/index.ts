import type { Block } from "payload";

export const CalloutBlock: Block = {
  slug: "callout",
  labels: {
    singular: "Callout / Alert",
    plural: "Callouts / Alerts",
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "tip",
      options: [
        { label: "Tip / Recommendation (Green)", value: "tip" },
        { label: "Info / Notice (Blue)", value: "info" },
        { label: "Warning / Heads-up (Yellow)", value: "warning" },
        { label: "Critical / Note (Red)", value: "alert" },
      ],
    },
    {
      name: "title",
      type: "text",
      label: "Heading / Title (Optional)",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Callout Message",
    },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: {
    singular: "CTA Banner",
    plural: "CTA Banners",
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      label: "Heading",
      defaultValue: "Automate your Shopify store with WhatsApp",
    },
    {
      name: "description",
      type: "textarea",
      label: "Subtitle / Description",
      defaultValue: "Join 1,000+ merchants recovering abandoned carts and delighting customers.",
    },
    {
      name: "buttonText",
      type: "text",
      required: true,
      label: "Button Label",
      defaultValue: "Install on Shopify ➔",
    },
    {
      name: "buttonUrl",
      type: "text",
      required: true,
      label: "Button URL",
      defaultValue: "https://apps.shopify.com/whatflow-official-api?utm_source=whatflow_website&utm_medium=blog_cta&utm_campaign=website_direct",
    },
    {
      name: "badge",
      type: "text",
      label: "Top Badge (Optional)",
      defaultValue: "14-Day Free Trial",
    },
    {
      name: "style",
      type: "select",
      defaultValue: "green",
      options: [
        { label: "Neo-Green Accent", value: "green" },
        { label: "Dark Forest", value: "dark" },
        { label: "Clean White", value: "white" },
      ],
    },
  ],
};

export const WhatsAppMockupBlock: Block = {
  slug: "whatsappMockup",
  labels: {
    singular: "WhatsApp Message Mockup",
    plural: "WhatsApp Message Mockups",
  },
  fields: [
    {
      name: "storeName",
      type: "text",
      required: true,
      defaultValue: "Your Store",
      label: "Store / Sender Name",
    },
    {
      name: "verified",
      type: "checkbox",
      defaultValue: true,
      label: "Show Official Green Verification Checkmark",
    },
    {
      name: "customerName",
      type: "text",
      label: "Customer Greeting (e.g. Alex)",
      defaultValue: "Alex",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Message Body",
      defaultValue: "Hi Alex, thanks for your order! We've received order #1027 and are getting it ready to ship.",
    },
    {
      name: "orderSummary",
      type: "text",
      label: "Order Info Tag (e.g. 'Order #1027 • 2 items • $89.00')",
      defaultValue: "Order #1027 • 2 items • $89.00",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Quick Action Button (e.g. 'Track Order' or 'Confirm Order')",
      defaultValue: "CONFIRM ORDER",
    },
    {
      name: "time",
      type: "text",
      label: "Timestamp",
      defaultValue: "10:30 AM",
    },
  ],
};

export const StatHighlightBlock: Block = {
  slug: "statHighlight",
  labels: {
    singular: "Stat / Metric Highlight",
    plural: "Stat / Metric Highlights",
  },
  fields: [
    {
      name: "value",
      type: "text",
      required: true,
      label: "Big Stat Number (e.g. '98%', '$14,200', '4.9/5')",
    },
    {
      name: "label",
      type: "text",
      required: true,
      label: "Stat Label",
    },
    {
      name: "description",
      type: "text",
      label: "Sub-description (Optional)",
    },
  ],
};

export const VideoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: {
    singular: "Video Embed",
    plural: "Video Embeds",
  },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
      label: "Video URL (YouTube, Vimeo, or Loom embed link)",
    },
    {
      name: "caption",
      type: "text",
      label: "Caption / Video Title",
    },
  ],
};

export const CodeSnippetBlock: Block = {
  slug: "codeSnippet",
  labels: {
    singular: "Code Snippet",
    plural: "Code Snippets",
  },
  fields: [
    {
      name: "filename",
      type: "text",
      label: "Filename / Tab Title (e.g. 'shopify.liquid')",
    },
    {
      name: "language",
      type: "select",
      defaultValue: "liquid",
      options: [
        { label: "Liquid (Shopify)", value: "liquid" },
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "JSON", value: "json" },
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "Bash / Shell", value: "bash" },
      ],
    },
    {
      name: "code",
      type: "textarea",
      required: true,
      label: "Code Content",
    },
  ],
};

export const allEditorBlocks: Block[] = [
  CalloutBlock,
  CtaBlock,
  WhatsAppMockupBlock,
  StatHighlightBlock,
  VideoEmbedBlock,
  CodeSnippetBlock,
];
