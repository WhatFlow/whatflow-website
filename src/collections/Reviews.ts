import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  lockDocuments: false,
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "rating", "body", "active"],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "author",
      type: "text",
      required: true,
      label: "Author / Store Name",
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: "Star Rating (1-5)",
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      label: "Review Text",
    },
    {
      name: "faviconUrl",
      type: "text",
      label: "Favicon / Logo URL (External)",
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
      label: "Favicon / Logo Upload",
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      label: "Active / Published",
    },
  ],
};
