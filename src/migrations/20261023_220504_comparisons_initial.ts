import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

// Only creates the comparison collection; never alters existing CMS tables.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`comparisons_feature_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	\`whatflow\` text,
  	\`competitor\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_feature_table_order_idx\` ON \`comparisons_feature_table\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_feature_table_parent_id_idx\` ON \`comparisons_feature_table\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`comparisons_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_faqs_order_idx\` ON \`comparisons_faqs\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_faqs_parent_id_idx\` ON \`comparisons_faqs\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`comparisons_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`url\` text,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_sources_order_idx\` ON \`comparisons_sources\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_sources_parent_id_idx\` ON \`comparisons_sources\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`comparisons\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`competitor\` text,
  	\`competitor_url\` text,
  	\`category\` text,
  	\`excerpt\` text,
  	\`verdict\` text,
  	\`author\` text DEFAULT 'Safwan Adnan',
  	\`author_role\` text DEFAULT 'Co-founder and CEO of WhatFlow',
  	\`published_at\` text,
  	\`reviewed_at\` text,
  	\`featured\` integer DEFAULT false,
  	\`cover_image_id\` integer,
  	\`image_url\` text,
  	\`image_alt\` text,
  	\`image_caption\` text,
  	\`image_source_url\` text,
  	\`content\` text,
  	\`cta_heading\` text DEFAULT 'Try your own Shopify workflow',
  	\`cta_description\` text DEFAULT 'Start with one template and test the complete journey before switching platforms.',
  	\`cta_label\` text DEFAULT 'Explore WhatFlow on Shopify',
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`seo_noindex\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)

  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`comparisons_slug_idx\` ON \`comparisons\` (\`slug\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_cover_image_idx\` ON \`comparisons\` (\`cover_image_id\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_updated_at_idx\` ON \`comparisons\` (\`updated_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_created_at_idx\` ON \`comparisons\` (\`created_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons__status_idx\` ON \`comparisons\` (\`_status\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`comparisons_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`comparisons_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`comparisons_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_rels_order_idx\` ON \`comparisons_rels\` (\`order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_rels_parent_idx\` ON \`comparisons_rels\` (\`parent_id\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_rels_path_idx\` ON \`comparisons_rels\` (\`path\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`comparisons_rels_comparisons_id_idx\` ON \`comparisons_rels\` (\`comparisons_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_comparisons_v_version_feature_table\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	\`whatflow\` text,
  	\`competitor\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_comparisons_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_feature_table_order_idx\` ON \`_comparisons_v_version_feature_table\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_feature_table_parent_id_idx\` ON \`_comparisons_v_version_feature_table\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_comparisons_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_comparisons_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_faqs_order_idx\` ON \`_comparisons_v_version_faqs\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_faqs_parent_id_idx\` ON \`_comparisons_v_version_faqs\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_comparisons_v_version_sources\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`url\` text,
  	\`note\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_comparisons_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_sources_order_idx\` ON \`_comparisons_v_version_sources\` (\`_order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_sources_parent_id_idx\` ON \`_comparisons_v_version_sources\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_comparisons_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_competitor\` text,
  	\`version_competitor_url\` text,
  	\`version_category\` text,
  	\`version_excerpt\` text,
  	\`version_verdict\` text,
  	\`version_author\` text DEFAULT 'Safwan Adnan',
  	\`version_author_role\` text DEFAULT 'Co-founder and CEO of WhatFlow',
  	\`version_published_at\` text,
  	\`version_reviewed_at\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_cover_image_id\` integer,
  	\`version_image_url\` text,
  	\`version_image_alt\` text,
  	\`version_image_caption\` text,
  	\`version_image_source_url\` text,
  	\`version_content\` text,
  	\`version_cta_heading\` text DEFAULT 'Try your own Shopify workflow',
  	\`version_cta_description\` text DEFAULT 'Start with one template and test the complete journey before switching platforms.',
  	\`version_cta_label\` text DEFAULT 'Explore WhatFlow on Shopify',
  	\`version_seo_meta_title\` text,
  	\`version_seo_meta_description\` text,
  	\`version_seo_noindex\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_parent_idx\` ON \`_comparisons_v\` (\`parent_id\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_version_slug_idx\` ON \`_comparisons_v\` (\`version_slug\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_version_cover_image_idx\` ON \`_comparisons_v\` (\`version_cover_image_id\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_version_updated_at_idx\` ON \`_comparisons_v\` (\`version_updated_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_version_created_at_idx\` ON \`_comparisons_v\` (\`version_created_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_version_version__status_idx\` ON \`_comparisons_v\` (\`version__status\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_created_at_idx\` ON \`_comparisons_v\` (\`created_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_updated_at_idx\` ON \`_comparisons_v\` (\`updated_at\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_latest_idx\` ON \`_comparisons_v\` (\`latest\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_comparisons_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`comparisons_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_comparisons_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`comparisons_id\`) REFERENCES \`comparisons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_rels_order_idx\` ON \`_comparisons_v_rels\` (\`order\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_rels_parent_idx\` ON \`_comparisons_v_rels\` (\`parent_id\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_rels_path_idx\` ON \`_comparisons_v_rels\` (\`path\`);`)

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_comparisons_v_rels_comparisons_id_idx\` ON \`_comparisons_v_rels\` (\`comparisons_id\`);`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  throw new Error('Comparison content must be backed up before removing its tables.');
}
