import type { CollectionConfig } from "payload";

export const Integrations: CollectionConfig = {
  slug: "integrations",
  lockDocuments: false,
  labels: {
    singular: "Integration",
    plural: "Integrations",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "featured"],
    description: "Supported third-party apps and Shopify ecosystem integrations.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Integration Name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "e.g. 'shopify-flow', 'judge-me', 'klaviyo', 'gorgias'",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Category",
      defaultValue: "automation",
      options: [
        { label: "Automation & Workflows", value: "automation" },
        { label: "Reviews & Social Proof", value: "reviews" },
        { label: "Marketing & CRM", value: "marketing" },
        { label: "Customer Support & Helpdesk", value: "support" },
        { label: "Subscriptions & Recurring Orders", value: "subscriptions" },
        { label: "Shipping & Fulfillment", value: "shipping" },
      ],
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      label: "Short Tagline",
      admin: {
        description: "e.g. 'Trigger automated WhatsApp messages from any Shopify event'",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Overview Description",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Integration Logo",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured Integration",
      admin: {
        description: "Show in featured highlight sections on the site",
      },
    },
    {
      name: "keyFeatures",
      type: "array",
      label: "Key Features / Capabilities",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "guideUrl",
      type: "text",
      label: "Documentation / Setup Guide URL",
    },
    {
      name: "docsContent",
      type: "richText",
      label: "Full Setup Documentation / Guide",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Coming Soon", value: "coming-soon" },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
        },
      ],
    },
  ],
};
