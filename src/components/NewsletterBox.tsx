import Link from "next/link";

/**
 * Follow-the-blog card. There is no email newsletter service behind the site, so this
 * offers the RSS feed instead of a sign-up form that could not send anything.
 */
export function NewsletterBox({ className = "" }: { className?: string }) {
  return (
    <div className={`wf-card wfc-news ${className}`} data-reveal>
      <h3>Get new playbooks as they publish.</h3>
      <p>
        Guides on abandoned cart recovery, team inbox workflows and WhatsApp conversion, in your feed reader the
        day they go live.
      </p>
      <div className="wfc-news-form">
        <a href="/blog/rss.xml" className="wf-btn wf-btn-dark">Follow the RSS feed</a>
        <Link href="/blog" className="wf-btn wf-btn-ghost">Browse all posts</Link>
      </div>
    </div>
  );
}
