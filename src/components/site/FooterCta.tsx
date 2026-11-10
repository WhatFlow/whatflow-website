"use client";

import { usePathname } from "next/navigation";
import { CtaBand } from "./CtaBand";

/** Closing CTA for every page except the homepage, which ends with its own. */
export function FooterCta() {
	const pathname = usePathname();
	if (pathname === "/") return null;
	return <CtaBand placement={`footer_cta${pathname.replace(/[^a-z0-9]+/gi, "_")}`} />;
}
