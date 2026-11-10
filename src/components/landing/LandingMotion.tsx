import type { ReactNode } from "react";

export { scrollToY } from "@/components/site/SiteMotion";

/** Homepage wrapper. Smooth scrolling and `[data-reveal]` reveals come from the site-wide SiteMotion. */
export function LandingMotion({ children }: { children: ReactNode }) {
	return <div className="lp">{children}</div>;
}
