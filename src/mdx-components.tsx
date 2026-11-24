import type { MDXComponents } from "mdx/types";
import { docsMdxComponents } from "@/components/docs/mdx";

// Required by @next/mdx in the App Router.
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return { ...docsMdxComponents, ...components } as MDXComponents;
}
