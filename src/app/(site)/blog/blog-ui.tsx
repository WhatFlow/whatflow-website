import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogCategory } from "@/lib/blog-taxonomy";
import { formatDate, calculateReadingTime, CATEGORY_LABELS, type Post } from "@/lib/payload-api";

/** Pill tone per blog category, picked from the site palette. */
const CATEGORY_TONES: Record<string, string> = {
  reviews: "wfc-tone-yellow",
  tips: "wfc-tone-yellow",
  conversion: "wfc-tone-sky",
  shopify: "wfc-tone-sky",
  retention: "wfc-tone-lilac",
  updates: "wfc-tone-pink",
  operations: "wfc-tone-mint",
  guides: "wfc-tone-mint",
  seo: "wfc-tone-mint",
  whatsapp: "wfc-tone-green",
};

/** Metric tile colours, cycled. */
export const METRIC_TONES = ["wfc-tone-green", "wfc-tone-yellow", "wfc-tone-sky", "wfc-tone-lilac", "wfc-tone-pink"];

export function categoryLabel(category: string) {
  return getBlogCategory(category)?.label ?? CATEGORY_LABELS[category] ?? category;
}

export function CategoryPill({ category }: { category: string }) {
  return <span className={`wf-pill ${CATEGORY_TONES[category] ?? "wfc-tone-white"}`}>{categoryLabel(category)}</span>;
}

export const ICONS = {
  doc: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export function RssIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

/** Rounded cover; falls back to a dotted mint panel. */
export function Cover({
  src,
  media,
  alt,
  priority = false,
  fit,
  icon = ICONS.doc,
  children,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
}: {
  /** Plain URL (legacy field); rendered with <img>. */
  src?: string;
  /** Payload media URL; rendered with next/image. */
  media?: string;
  alt: string;
  priority?: boolean;
  fit?: "contain";
  icon?: ReactNode;
  children?: ReactNode;
  sizes?: string;
}) {
  return (
    <div className="wfc-cover" data-fit={fit}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={1200} height={630} loading={priority ? undefined : "lazy"} fetchPriority={priority ? "high" : undefined} />
      ) : media ? (
        <Image src={media} alt={alt} fill sizes={sizes} priority={priority} />
      ) : (
        <div className="wfc-cover-empty">{icon}</div>
      )}
      {children}
    </div>
  );
}

function PostCoverFor({ post, priority, sizes }: { post: Post; priority?: boolean; sizes?: string }) {
  return (
    <Cover
      src={post.coverImageUrl}
      media={post.coverImage?.url}
      alt={post.coverImageUrl ? post.coverImageAlt || post.title : post.coverImage?.alt || post.title}
      priority={priority}
      sizes={sizes}
    >
      {post.featured && (
        <div className="wfc-cover-badges">
          <span className="wf-pill wfc-tone-yellow">Featured</span>
        </div>
      )}
    </Cover>
  );
}

export function PostMeta({ post }: { post: Post }) {
  const readingTime = calculateReadingTime(post.content, post.excerpt);
  return (
    <div className="wfc-meta">
      {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
      <span>{readingTime} min read</span>
    </div>
  );
}

export function PostCard({ post, index = 0, headingLevel = "h2" }: { post: Post; index?: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="wf-card wfc-card" data-reveal style={{ "--d": `${(index % 3) * 80}ms` } as CSSProperties}>
      <PostCoverFor post={post} />
      <div className="wfc-card-body">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CategoryPill category={post.category} />
          <PostMeta post={post} />
        </div>
        <Heading>{post.title}</Heading>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="wfc-card-foot">
          <span className="flex items-center gap-2">
            <span className="wfc-avatar" aria-hidden="true">{post.author.charAt(0).toUpperCase()}</span>
            {post.author}
          </span>
          <span className="wfc-more">Read</span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="wf-card wfc-feature" data-reveal>
      <PostCoverFor post={post} priority sizes="(min-width: 900px) 640px, 100vw" />
      <div className="wfc-card-body">
        <div className="flex items-center gap-3 flex-wrap">
          <CategoryPill category={post.category} />
        </div>
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="wfc-card-foot">
          <span className="flex items-center gap-3">
            <span className="wfc-avatar" aria-hidden="true">{post.author.charAt(0).toUpperCase()}</span>
            <PostMeta post={post} />
          </span>
          <span className="wfc-more">Read the story</span>
        </div>
      </div>
    </Link>
  );
}

export function EmptyCard({ icon, title, children, as: Tag = "h2" }: { icon: ReactNode; title: string; children: ReactNode; as?: "h2" | "h3" }) {
  return (
    <div className="wf-card wfc-empty" data-reveal>
      <div className="wfc-empty-icon">{icon}</div>
      <Tag>{title}</Tag>
      <p>{children}</p>
    </div>
  );
}

/** Skeleton shaped like PostCard. */
export function CardSkeleton({ metrics = false }: { metrics?: boolean }) {
  return (
    <div className="wf-card wfc-card" aria-hidden="true">
      <div className="wfc-skel" style={{ aspectRatio: "1200 / 630", borderRadius: 16 }} />
      <div className="wfc-card-body">
        <div className="flex justify-between">
          <div className="wfc-skel" data-round style={{ height: 24, width: 96 }} />
          <div className="wfc-skel" style={{ height: 14, width: 110, marginTop: 5 }} />
        </div>
        <div className="wfc-skel" style={{ height: 24, width: "92%" }} />
        <div className="wfc-skel" style={{ height: 24, width: "70%" }} />
        <div className="wfc-skel" style={{ height: 14, width: "100%" }} />
        <div className="wfc-skel" style={{ height: 14, width: "80%" }} />
        {metrics && (
          <div className="grid grid-cols-2 gap-2">
            <div className="wfc-skel" style={{ height: 64, borderRadius: 18 }} />
            <div className="wfc-skel" style={{ height: 64, borderRadius: 18 }} />
          </div>
        )}
        <div className="wfc-card-foot">
          <div className="wfc-skel" data-round style={{ height: 32, width: 120 }} />
          <div className="wfc-skel" style={{ height: 14, width: 50 }} />
        </div>
      </div>
    </div>
  );
}

export function ListingSkeleton({ tone = "paper", metrics = false }: { tone?: "paper" | "dark"; metrics?: boolean }) {
  const dark = tone === "dark";
  const bar = dark ? { background: "rgb(255 255 255 / 0.1)", animation: "none" } : undefined;
  return (
    <div className="min-h-screen bg-[var(--paper)]" aria-busy="true">
      <section className="wf-hero" data-tone={tone}>
        <div className="wf-shell grid gap-5">
          <div className="wfc-skel" data-round style={{ height: 32, width: 180, ...bar }} />
          <div className="wfc-skel" style={{ height: "clamp(48px, 7vw, 88px)", width: "min(100%, 720px)", borderRadius: 20, ...bar }} />
          <div className="wfc-skel" style={{ height: 20, width: "min(100%, 480px)", ...bar }} />
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="wf-shell">
          <div className="wfc-skel" data-round style={{ height: 52, width: "min(100%, 640px)" }} />
          <div className="wf-card wfc-feature mt-8" aria-hidden="true">
            <div className="wfc-skel" style={{ aspectRatio: "1200 / 630", borderRadius: 16 }} />
            <div className="wfc-card-body">
              <div className="wfc-skel" data-round style={{ height: 24, width: 140 }} />
              <div className="wfc-skel" style={{ height: 40, width: "90%" }} />
              <div className="wfc-skel" style={{ height: 40, width: "60%" }} />
              <div className="wfc-skel" style={{ height: 16, width: "100%" }} />
            </div>
          </div>
          <div className="wf-grid wf-grid-3 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} metrics={metrics} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
