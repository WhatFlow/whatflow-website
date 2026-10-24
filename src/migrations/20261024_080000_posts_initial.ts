import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite';

// Narrow blog provisioning only; never reconciles unrelated production schema.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`-- Only the currently absent Payload blog tables. No existing tables are altered.
CREATE TABLE IF NOT EXISTS posts (
 id integer PRIMARY KEY NOT NULL,
 title text NOT NULL,
 slug text NOT NULL,
 excerpt text NOT NULL,
 cover_image_id integer,
 cover_image_url text,
 cover_image_alt text,
 cover_image_caption text,
 reviewed_at text,
 category text NOT NULL DEFAULT 'guides',
 author text NOT NULL DEFAULT 'Safwan Adnan',
 author_role text DEFAULT 'Co-founder and CEO of WhatFlow',
 published_at text,
 status text NOT NULL DEFAULT 'draft',
 featured integer DEFAULT false,
 content text NOT NULL,
 seo_meta_title text,
 seo_meta_description text,
 updated_at text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 created_at text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 FOREIGN KEY (cover_image_id) REFERENCES media(id) ON DELETE SET NULL
);`);
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_cover_image_idx ON posts(cover_image_id);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_updated_at_idx ON posts(updated_at);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at);`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS posts_tags (
 _order integer NOT NULL,
 _parent_id integer NOT NULL,
 id text PRIMARY KEY NOT NULL,
 tag text NOT NULL,
 FOREIGN KEY (_parent_id) REFERENCES posts(id) ON DELETE CASCADE
);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_tags_order_idx ON posts_tags(_order);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_tags_parent_id_idx ON posts_tags(_parent_id);`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS posts_faqs (
 _order integer NOT NULL,
 _parent_id integer NOT NULL,
 id text PRIMARY KEY NOT NULL,
 question text NOT NULL,
 answer text NOT NULL,
 FOREIGN KEY (_parent_id) REFERENCES posts(id) ON DELETE CASCADE
);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_faqs_order_idx ON posts_faqs(_order);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_faqs_parent_id_idx ON posts_faqs(_parent_id);`);
  await db.run(sql`CREATE TABLE IF NOT EXISTS posts_sources (
 _order integer NOT NULL,
 _parent_id integer NOT NULL,
 id text PRIMARY KEY NOT NULL,
 title text NOT NULL,
 url text NOT NULL,
 note text,
 FOREIGN KEY (_parent_id) REFERENCES posts(id) ON DELETE CASCADE
);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_sources_order_idx ON posts_sources(_order);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS posts_sources_parent_id_idx ON posts_sources(_parent_id);`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS posts_sources;`);
  await db.run(sql`DROP TABLE IF EXISTS posts_faqs;`);
  await db.run(sql`DROP TABLE IF EXISTS posts_tags;`);
  await db.run(sql`DROP TABLE IF EXISTS posts;`);
}
