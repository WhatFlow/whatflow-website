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
    <section className="bg-white border-t-[2.5px] border-black px-4 sm:px-6 py-14" aria-labelledby="latest-updates-heading">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="neo-box inline-block bg-[#00D261] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black mb-3">
              Changelog
            </div>
            <h2 id="latest-updates-heading" className="text-2xl sm:text-4xl font-display font-black uppercase text-black tracking-tight">
              {heading}
            </h2>
          </div>
          <Link href={allHref} className="text-xs font-extrabold uppercase tracking-wider text-black underline underline-offset-4">
            See all updates →
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/changelog/${entry.slug}`}
                className="neo-box block h-full bg-[#FAF7F0] p-5 rounded-xl hover:bg-[#F2FFF7] transition-colors"
              >
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`neo-pill px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border-black ${CHANGELOG_TYPE_BADGE[entry.type].className}`}>
                    {CHANGELOG_TYPE_BADGE[entry.type].label}
                  </span>
                  <time dateTime={entry.releaseDate} className="text-[11px] font-bold text-gray-500 uppercase">
                    {formatReleaseDate(entry.releaseDate, "short")}
                  </time>
                </div>
                <h3 className="text-base font-extrabold text-black leading-snug">{entry.title}</h3>
                <p className="mt-2 text-xs text-gray-600 font-medium leading-relaxed line-clamp-3">{entry.summary}</p>
                <span className="mt-3 block text-[10px] font-bold uppercase text-gray-500">{CHANGELOG_APP_LABELS[entry.app]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
