import {type MigrateUpArgs, sql} from '@payloadcms/db-d1-sqlite';

// Reconcile the registered CMS schema additively. Existing content/auth tables
// are never rebuilt or removed. Guards also support legacy manually provisioned DBs.
const createStatements = [
  "CREATE TABLE IF NOT EXISTS `country_rates` (\n\t`id` integer PRIMARY KEY NOT NULL,\n\t`market` text NOT NULL,\n\t`currency` text DEFAULT 'USD' NOT NULL,\n\t`marketing` numeric NOT NULL,\n\t`utility` numeric NOT NULL,\n\t`authentication` numeric,\n\t`authentication_international` numeric,\n\t`service` numeric,\n\t`active` integer DEFAULT true,\n\t`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL\n);\n",
  "CREATE UNIQUE INDEX IF NOT EXISTS `country_rates_market_idx` ON `country_rates` (`market`);",
  "CREATE INDEX IF NOT EXISTS `country_rates_updated_at_idx` ON `country_rates` (`updated_at`);",
  "CREATE INDEX IF NOT EXISTS `country_rates_created_at_idx` ON `country_rates` (`created_at`);",
  "CREATE TABLE IF NOT EXISTS `case_studies_metrics` (\n\t`_order` integer NOT NULL,\n\t`_parent_id` integer NOT NULL,\n\t`id` text PRIMARY KEY NOT NULL,\n\t`label` text NOT NULL,\n\t`value` text NOT NULL,\n\t`description` text,\n\tFOREIGN KEY (`_parent_id`) REFERENCES `case_studies`(`id`) ON UPDATE no action ON DELETE cascade\n);\n",
  "CREATE INDEX IF NOT EXISTS `case_studies_metrics_order_idx` ON `case_studies_metrics` (`_order`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_metrics_parent_id_idx` ON `case_studies_metrics` (`_parent_id`);",
  "CREATE TABLE IF NOT EXISTS `case_studies_apps_used` (\n\t`order` integer NOT NULL,\n\t`parent_id` integer NOT NULL,\n\t`value` text,\n\t`id` integer PRIMARY KEY NOT NULL,\n\tFOREIGN KEY (`parent_id`) REFERENCES `case_studies`(`id`) ON UPDATE no action ON DELETE cascade\n);\n",
  "CREATE INDEX IF NOT EXISTS `case_studies_apps_used_order_idx` ON `case_studies_apps_used` (`order`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_apps_used_parent_idx` ON `case_studies_apps_used` (`parent_id`);",
  "CREATE TABLE IF NOT EXISTS `case_studies` (\n\t`id` integer PRIMARY KEY NOT NULL,\n\t`title` text NOT NULL,\n\t`slug` text NOT NULL,\n\t`excerpt` text NOT NULL,\n\t`cover_image_id` integer,\n\t`store_name` text NOT NULL,\n\t`store_url` text,\n\t`store_logo_id` integer,\n\t`industry` text NOT NULL,\n\t`published_at` text,\n\t`status` text DEFAULT 'draft' NOT NULL,\n\t`featured` integer DEFAULT false,\n\t`content` text NOT NULL,\n\t`seo_meta_title` text,\n\t`seo_meta_description` text,\n\t`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\tFOREIGN KEY (`cover_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,\n\tFOREIGN KEY (`store_logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null\n);\n",
  "CREATE UNIQUE INDEX IF NOT EXISTS `case_studies_slug_idx` ON `case_studies` (`slug`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_cover_image_idx` ON `case_studies` (`cover_image_id`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_store_logo_idx` ON `case_studies` (`store_logo_id`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_updated_at_idx` ON `case_studies` (`updated_at`);",
  "CREATE INDEX IF NOT EXISTS `case_studies_created_at_idx` ON `case_studies` (`created_at`);",
  "CREATE TABLE IF NOT EXISTS `integrations_key_features` (\n\t`_order` integer NOT NULL,\n\t`_parent_id` integer NOT NULL,\n\t`id` text PRIMARY KEY NOT NULL,\n\t`feature` text NOT NULL,\n\tFOREIGN KEY (`_parent_id`) REFERENCES `integrations`(`id`) ON UPDATE no action ON DELETE cascade\n);\n",
  "CREATE INDEX IF NOT EXISTS `integrations_key_features_order_idx` ON `integrations_key_features` (`_order`);",
  "CREATE INDEX IF NOT EXISTS `integrations_key_features_parent_id_idx` ON `integrations_key_features` (`_parent_id`);",
  "CREATE TABLE IF NOT EXISTS `integrations` (\n\t`id` integer PRIMARY KEY NOT NULL,\n\t`name` text NOT NULL,\n\t`slug` text NOT NULL,\n\t`category` text DEFAULT 'automation' NOT NULL,\n\t`tagline` text NOT NULL,\n\t`description` text NOT NULL,\n\t`logo_id` integer,\n\t`featured` integer DEFAULT false,\n\t`guide_url` text,\n\t`docs_content` text,\n\t`status` text DEFAULT 'published' NOT NULL,\n\t`seo_meta_title` text,\n\t`seo_meta_description` text,\n\t`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\tFOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null\n);\n",
  "CREATE UNIQUE INDEX IF NOT EXISTS `integrations_slug_idx` ON `integrations` (`slug`);",
  "CREATE INDEX IF NOT EXISTS `integrations_logo_idx` ON `integrations` (`logo_id`);",
  "CREATE INDEX IF NOT EXISTS `integrations_updated_at_idx` ON `integrations` (`updated_at`);",
  "CREATE INDEX IF NOT EXISTS `integrations_created_at_idx` ON `integrations` (`created_at`);",
  "CREATE TABLE IF NOT EXISTS `changelog` (\n\t`id` integer PRIMARY KEY NOT NULL,\n\t`version` text DEFAULT 'v1.0.0' NOT NULL,\n\t`title` text NOT NULL,\n\t`slug` text NOT NULL,\n\t`release_date` text NOT NULL,\n\t`type` text DEFAULT 'feature' NOT NULL,\n\t`app` text DEFAULT 'all' NOT NULL,\n\t`summary` text NOT NULL,\n\t`content` text,\n\t`git_commit_hash` text,\n\t`git_commit_message` text,\n\t`status` text DEFAULT 'published' NOT NULL,\n\t`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL\n);\n",
  "CREATE UNIQUE INDEX IF NOT EXISTS `changelog_slug_idx` ON `changelog` (`slug`);",
  "CREATE INDEX IF NOT EXISTS `changelog_updated_at_idx` ON `changelog` (`updated_at`);",
  "CREATE INDEX IF NOT EXISTS `changelog_created_at_idx` ON `changelog` (`created_at`);",
  "CREATE TABLE IF NOT EXISTS `payload_mcp_api_keys` (\n\t`id` integer PRIMARY KEY NOT NULL,\n\t`user_id` integer NOT NULL,\n\t`label` text,\n\t`description` text,\n\t`comparisons_find` integer DEFAULT false,\n\t`comparisons_create` integer DEFAULT false,\n\t`comparisons_update` integer DEFAULT false,\n\t`comparisons_delete` integer DEFAULT false,\n\t`posts_find` integer DEFAULT false,\n\t`posts_create` integer DEFAULT false,\n\t`posts_update` integer DEFAULT false,\n\t`posts_delete` integer DEFAULT false,\n\t`case_studies_find` integer DEFAULT false,\n\t`case_studies_create` integer DEFAULT false,\n\t`case_studies_update` integer DEFAULT false,\n\t`case_studies_delete` integer DEFAULT false,\n\t`integrations_find` integer DEFAULT false,\n\t`integrations_create` integer DEFAULT false,\n\t`integrations_update` integer DEFAULT false,\n\t`integrations_delete` integer DEFAULT false,\n\t`changelog_find` integer DEFAULT false,\n\t`changelog_create` integer DEFAULT false,\n\t`changelog_update` integer DEFAULT false,\n\t`changelog_delete` integer DEFAULT false,\n\t`reviews_find` integer DEFAULT false,\n\t`reviews_create` integer DEFAULT false,\n\t`reviews_update` integer DEFAULT false,\n\t`reviews_delete` integer DEFAULT false,\n\t`country_rates_find` integer DEFAULT false,\n\t`country_rates_create` integer DEFAULT false,\n\t`country_rates_update` integer DEFAULT false,\n\t`country_rates_delete` integer DEFAULT false,\n\t`media_find` integer DEFAULT false,\n\t`media_create` integer DEFAULT false,\n\t`media_update` integer DEFAULT false,\n\t`media_delete` integer DEFAULT false,\n\t`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,\n\t`enable_a_p_i_key` integer,\n\t`api_key` text,\n\t`api_key_index` text,\n\tFOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null\n);\n",
  "CREATE INDEX IF NOT EXISTS `payload_mcp_api_keys_user_idx` ON `payload_mcp_api_keys` (`user_id`);",
  "CREATE INDEX IF NOT EXISTS `payload_mcp_api_keys_updated_at_idx` ON `payload_mcp_api_keys` (`updated_at`);",
  "CREATE INDEX IF NOT EXISTS `payload_mcp_api_keys_created_at_idx` ON `payload_mcp_api_keys` (`created_at`);"
];

export async function up({db}: MigrateUpArgs): Promise<void> {
  for (const statement of createStatements) await db.run(sql.raw(statement));
  const columns = async (table: string) => db.all<{name: string}>(sql.raw(`PRAGMA table_info("${table}")`));
  if (!(await columns('media')).some(column => column.name === 'alt')) {
    await db.run(sql`ALTER TABLE media ADD COLUMN alt text NOT NULL DEFAULT '';`);
    if ((await columns('media')).some(column => column.name === 'alt_text')) {
      await db.run(sql`UPDATE media SET alt = COALESCE(alt_text, '') WHERE alt = '';`);
    }
  }
  for (const table of ['payload_locked_documents_rels', 'payload_preferences_rels']) {
    if (!(await columns(table)).some(column => column.name === 'payload_mcp_api_keys_id')) {
      await db.run(sql.raw(`ALTER TABLE "${table}" ADD COLUMN payload_mcp_api_keys_id integer REFERENCES payload_mcp_api_keys(id) ON DELETE CASCADE;`));
    }
    await db.run(sql.raw(`CREATE INDEX IF NOT EXISTS "${table}_payload_mcp_api_keys_id_idx" ON "${table}" (payload_mcp_api_keys_id);`));
  }
}

export async function down(): Promise<void> {
  throw new Error('This additive repair preserves legacy data. Restore an approved backup for rollback; automatic table/column deletion is disabled.');
}
