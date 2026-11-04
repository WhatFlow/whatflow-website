import type { CollectionConfig } from "payload";

export const Changelog: CollectionConfig = {
  slug: "changelog",
  lockDocuments: false,
  labels: {
    singular: "Changelog Entry",
    plural: "Changelog Entries",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["version", "title", "type", "app", "releaseDate", "status"],
    description:
      "Public, merchant-facing release notes shown at /changelog. Write in plain language: no code, internal service names, commit messages or security specifics.",
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
        { label: "WhatFlow Business API (incl. Team Inbox)", value: "business-api" },
        { label: "WhatFlow Chat Automation", value: "chat" },
        { label: "WhatFlow AI", value: "ai" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      label: "Summary / Highlights",
      admin: {
        description: "1–2 plain-language sentences (under ~170 characters). Used as the page's meta description and in the RSS feed.",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "Full Release Notes",
      admin: {
        description: "Use a \"What's new\" heading with a bullet list. Bullets are reused in the RSS feed and /ai/changelog.json.",
      },
    },
    {
      name: "gitCommitHash",
      type: "text",
      label: "Git Commit SHA (Internal)",
      access: { read: ({ req: { user } }) => Boolean(user) },
      admin: {
        description: "Internal reference only. Never returned by the public API or shown on the site.",
      },
    },
    {
      name: "gitCommitMessage",
      type: "text",
      label: "Raw Commit Message (Internal)",
      access: { read: ({ req: { user } }) => Boolean(user) },
      admin: {
        description: "Internal reference only. Never returned by the public API or shown on the site.",
      },
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
