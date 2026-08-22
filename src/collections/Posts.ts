import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  lockDocuments: false,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    description: "Blog posts and articles for the WhatFlow website.",
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can read published posts; admins can read all
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
      label: "Post Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "The URL path for this post. e.g. 'how-to-recover-carts'",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      label: "Excerpt",
      admin: {
        description: "A short summary shown on listing pages and in previews. Keep under 160 characters.",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Cover Image",
    },
    // ─── Taxonomy ───────────────────────────────────────────────────────────
    {
      name: "category",
      type: "select",
      required: true,
      label: "Category",
      options: [
        { label: "Tips & Tricks", value: "tips" },
        { label: "Guides", value: "guides" },
        { label: "Product Updates", value: "updates" },
        { label: "WhatsApp Marketing", value: "whatsapp" },
        { label: "Shopify", value: "shopify" },
      ],
      defaultValue: "guides",
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    // ─── Author & Date ────────────────────────────────────────────────────
    {
      name: "author",
      type: "text",
      required: true,
      label: "Author Name",
      defaultValue: "WhatFlow Team",
    },
    {
      name: "authorRole",
      type: "text",
      label: "Author Role / Title",
      defaultValue: "WhatFlow Team",
    },
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
    // ─── Publishing ───────────────────────────────────────────────────────
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
      label: "Featured Post",
      defaultValue: false,
      admin: {
        description: "Show this post in the homepage 'From The Blog' preview.",
      },
    },
    // ─── Content ──────────────────────────────────────────────────────────
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
    // ─── SEO ─────────────────────────────────────────────────────────────
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title",
          admin: {
            description: "Defaults to the post title if left blank.",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description",
          admin: {
            description: "Defaults to the excerpt if left blank. Keep under 160 characters.",
          },
        },
      ],
    },
  ],
};
