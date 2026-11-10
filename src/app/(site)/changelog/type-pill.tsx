import type { ChangelogItem } from "@/lib/changelog";

/** Display label and tone per release type (sentence case, short). */
const TYPE_PILLS: Record<ChangelogItem["type"], { label: string; tone: string; color: string }> = {
  feature: { label: "New", tone: "wfc-tone-green", color: "var(--green)" },
  improvement: { label: "Improved", tone: "wfc-tone-sky", color: "#7da2f0" },
  fix: { label: "Fixed", tone: "wfc-tone-yellow", color: "var(--yellow)" },
  security: { label: "Security", tone: "wfc-tone-pink", color: "#ff7aa0" },
};

export function typeColor(type: ChangelogItem["type"]) {
  return TYPE_PILLS[type]?.color ?? "var(--green)";
}

export function TypePill({ type }: { type: ChangelogItem["type"] }) {
  const pill = TYPE_PILLS[type] ?? TYPE_PILLS.feature;
  return <span className={`wf-pill ${pill.tone}`}>{pill.label}</span>;
}

export function typeLabel(type: ChangelogItem["type"]) {
  return (TYPE_PILLS[type] ?? TYPE_PILLS.feature).label;
}
