import type { CSSProperties } from "react";
import Link from "next/link";
import { CHANGELOG_SEED, releaseDateToISO } from "@/lib/changelog-data";
import {
  CHANGELOG_APP_LABELS,
  CHANGELOG_TYPE_BADGE,
  formatReleaseDate,
  type ChangelogApp,
} from "@/lib/changelog";

interface LatestUpdatesProps {
  /** Only show entries for this app (entries for both apps are always included). */
  app?: Exclude<ChangelogApp, "all">;
  /** Only show entries whose title or summary mentions one of these words. */
  keywords?: string[];
  limit?: number;
  heading?: string;
}

/**
 * Compact "what's new" strip linking into the changelog.
 *
 * Reads the curated release list at build time (no CMS fetch), because the pages
 * that use it (/features, /inbox) are served as immutable static templates; see
 * src/edge/static-public-pages.ts. New entries appear on the next deploy.
 */
export function LatestUpdates({ app, keywords, limit = 3, heading = "Latest product updates" }: LatestUpdatesProps) {
  const entries = CHANGELOG_SEED.map((e) => ({ ...e, releaseDate: releaseDateToISO(e.releaseDate) }))
    .filter((e) => !app || e.app === app || e.app === "all")
    .filter((e) => !keywords?.length || keywords.some((k) => `${e.title} ${e.summary}`.toLowerCase().includes(k.toLowerCase())))
    .slice(0, limit);
  if (entries.length === 0) return null;

  const allHref = app ? `/changelog?app=${app}` : "/changelog";

  return (
    <section className="wf-section" data-tone="white" aria-labelledby="latest-updates-heading">
      <div className="wf-shell">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10" data-reveal>
          <div className="wf-head">
            <h2 id="latest-updates-heading" className="wf-h2 text-[clamp(1.9rem,4vw,3rem)]!">
              {heading}
            </h2>
          </div>
          <Link href={allHref} className="wf-btn wf-btn-ghost wf-btn-sm">
            See all updates
          </Link>
        </div>
        <ul className="wf-grid wf-grid-3 list-none p-0 m-0">
          {entries.map((entry, index) => (
            <li key={entry.slug} data-reveal style={{ "--d": `${index * 80}ms` } as CSSProperties}>
              <Link href={`/changelog/${entry.slug}`} className="wf-card h-full bg-[var(--paper)]! hover:bg-[var(--mint)]!">
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className={`px-2.5 py-1 rounded-full border-[1.5px] border-[var(--ink)] text-[11px] font-bold ${CHANGELOG_TYPE_BADGE[entry.type].className}`}>
                    {CHANGELOG_TYPE_BADGE[entry.type].label}
                  </span>
                  <time dateTime={entry.releaseDate} className="text-xs font-semibold text-[var(--text-muted)]">
                    {formatReleaseDate(entry.releaseDate, "short")}
                  </time>
                </div>
                <h3 className="text-[1.2rem]!">{entry.title}</h3>
                <p className="line-clamp-3">{entry.summary}</p>
                <span className="mt-auto pt-4 block text-xs font-semibold text-[var(--text-muted)]">{CHANGELOG_APP_LABELS[entry.app]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
