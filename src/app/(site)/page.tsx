// Server Component — the interactive sections live in components/landing.
import { LandingPage } from "@/components/landing/LandingPage";
import { HOMEPAGE_FAQS } from "@/lib/marketing-faqs";
import { getFAQSchema, getHomePageSchema, getSoftwareApplicationSchema } from "@/lib/schema-org";

export default function HomePage() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSoftwareApplicationSchema()) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(HOMEPAGE_FAQS)) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomePageSchema()) }} />
			<LandingPage />
		</>
	);
}
