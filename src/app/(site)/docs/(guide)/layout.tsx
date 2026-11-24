import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import "@/components/docs/docs.css";

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="docs-shell">
			<DocsSidebar />
			<div className="docs-main">{children}</div>
		</div>
	);
}
