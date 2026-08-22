import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  lockDocuments: false,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "storeName", "industry", "status", "publishedAt"],
    description: "Merchant success stories and case studies.",
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
    // ─── Core ───────────────────────────────────────────────────────────────
    {
      name: "title",
      type: "text",
      required: true,
      label: "Case Study Title",
      admin: {
        description: "e.g. 'How Neon Panda Recovered $12,400 in Abandoned Carts'",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "e.g. 'neon-panda-cart-recovery'",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      label: "Excerpt",
      admin: {
        description: "A short teaser shown on the listing page and homepage preview.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Cover / Hero Image",
    },
    // ─── Store Info ────────────────────────────────────────────────────────
    {
      name: "storeName",
      type: "text",
      required: true,
      label: "Store Name",
    },
    {
      name: "storeUrl",
      type: "text",
      label: "Store URL",
      admin: {
        description: "e.g. https://neonpanda.com",
      },
    },
    {
      name: "storeLogo",
      type: "upload",
      relationTo: "media",
      label: "Store Logo",
    },
    {
      name: "industry",
      type: "select",
      required: true,
      label: "Industry",
      options: [
        { label: "Fashion & Apparel", value: "fashion" },
        { label: "Beauty & Cosmetics", value: "beauty" },
        { label: "Food & Beverage", value: "food" },
        { label: "Electronics", value: "electronics" },
        { label: "Home & Living", value: "home" },
        { label: "Sports & Fitness", value: "sports" },
        { label: "Pets", value: "pets" },
        { label: "Other", value: "other" },
      ],
    },
    // ─── Metrics ──────────────────────────────────────────────────────────
    {
      name: "metrics",
      type: "array",
      label: "Key Metrics / Stats",
      minRows: 1,
      maxRows: 4,
      admin: {
        description: "Highlight stats shown prominently on the case study page (e.g. 'Revenue Recovered / $12,400').",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "Label",
          admin: {
            description: "e.g. Revenue Recovered",
          },
        },
        {
          name: "value",
          type: "text",
          required: true,
          label: "Value",
          admin: {
            description: "e.g. $12,400",
          },
        },
        {
          name: "description",
          type: "text",
          label: "Short description",
          admin: {
            description: "Optional sub-text e.g. 'in 90 days'",
          },
        },
      ],
    },
    // ─── Apps Used ────────────────────────────────────────────────────────
    {
      name: "appsUsed",
      type: "select",
      hasMany: true,
      label: "WhatFlow Apps Used",
      options: [
        { label: "WhatFlow Chat", value: "chat" },
        { label: "WhatFlow Business API", value: "business" },
        { label: "WhatFlow AI", value: "ai" },
      ],
    },
    // ─── Publishing ───────────────────────────────────────────────────────
    {
      name: "publishedAt",
      type: "date",
      label: "Published Date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMMM d, yyyy",
        },
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      label: "Status",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Case Study",
      defaultValue: false,
      admin: {
        description: "Show this case study on the homepage preview.",
      },
    },
    // ─── Content ──────────────────────────────────────────────────────────
    {
      name: "content",
      type: "richText",
      label: "Full Case Study Content",
      required: true,
    },
    // ─── SEO ──────────────────────────────────────────────────────────────
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
