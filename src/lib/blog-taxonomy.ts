export const BLOG_CATEGORIES = [
  { value: 'reviews', label: 'Reviews & trust', description: 'Practical guides to collecting honest feedback, displaying social proof and turning customer questions into better shopping experiences.' },
  { value: 'conversion', label: 'Conversion', description: 'Improve product pages, checkout decisions and recovery conversations with clear information and useful customer support.' },
  { value: 'retention', label: 'Retention', description: 'Build thoughtful post-purchase journeys, repeat-purchase campaigns and customer relationships that respect attention.' },
  { value: 'whatsapp', label: 'WhatsApp', description: 'Plan WhatsApp campaigns, useful conversations and messaging costs for your Shopify store.' },
  { value: 'operations', label: 'Store operations', description: 'Create practical support processes, choose automation carefully and give your Shopify team a manageable workflow.' },
  { value: 'seo', label: 'SEO & content', description: 'Build useful Shopify content, product information and search visibility without relying on ranking promises.' },
  { value: 'guides', label: 'Guides', description: 'Step-by-step guides to Shopify messaging and WhatFlow workflows.' },
  { value: 'tips', label: 'Tips & tricks', description: 'Small, useful improvements for Shopify merchants.' },
  { value: 'updates', label: 'Product updates', description: 'Product news and updates from WhatFlow.' },
  { value: 'shopify', label: 'Shopify', description: 'Shopify tools, integrations and merchant workflows.' },
] as const;
export type BlogCategory = typeof BLOG_CATEGORIES[number]['value'];
export function getBlogCategory(value?: string) { return BLOG_CATEGORIES.find(category => category.value === value); }
