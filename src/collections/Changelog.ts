import type { CollectionConfig } from "payload";

export const Changelog: CollectionConfig = {
  slug: "changelog",
  labels: {
    singular: "Changelog Entry",
    plural: "Changelog Entries",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["version", "title", "type", "app", "releaseDate", "status"],
    description: "Product release notes, feature launches, and automated git commit syncs.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
    },
    create: ({ req: { user, headers } }) => {
      if (user) return true;
      const apiKey = headers.get("x-changelog-api-key") || headers.get("authorization");
      const secret = process.env.CHANGELOG_SYNC_SECRET || process.env.PAYLOAD_SECRET;
      if (secret && apiKey && apiKey.replace("Bearer ", "") === secret) {
        return true;
      }
      return false;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "version",
      type: "text",
      required: true,
      label: "Version / Release Tag (e.g. 'v2.5.0')",
      defaultValue: "v1.0.0",
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Release Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
    },
    {
      name: "releaseDate",
      type: "date",
      required: true,
      label: "Release Date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMMM d, yyyy",
        },
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "feature",
      options: [
        { label: "New Feature", value: "feature" },
        { label: "Improvement / Performance", value: "improvement" },
        { label: "Fix / Patch", value: "fix" },
        { label: "Security & Compliance", value: "security" },
      ],
    },
    {
      name: "app",
      type: "select",
      required: true,
      defaultValue: "all",
      options: [
        { label: "All Apps / Platform", value: "all" },
        { label: "WhatFlow Business API", value: "business-api" },
        { label: "WhatFlow Chat", value: "chat" },
        { label: "WhatFlow AI", value: "ai" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      label: "Summary / Highlights",
      admin: {
        description: "Brief 1-2 sentence overview of what changed.",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Full Release Notes (Optional)",
    },
    {
      name: "gitCommitHash",
      type: "text",
      label: "Git Commit SHA (Optional)",
      admin: {
        description: "e.g. 7f3a9bc — automatically populated via CI/CD sync",
      },
    },
    {
      name: "gitCommitMessage",
      type: "text",
      label: "Raw Commit Message (Optional)",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
  ],
};
