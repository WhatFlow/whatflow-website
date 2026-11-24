"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			type="button"
			className="docs-copy"
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
					setCopied(true);
					setTimeout(() => setCopied(false), 1600);
				} catch {
					/* Clipboard blocked: the text is still selectable. */
				}
			}}
		>
			{copied ? "Copied" : "Copy"}
		</button>
	);
}
