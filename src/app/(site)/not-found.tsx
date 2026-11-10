import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageKit";
import { Bubble, Phone } from "@/components/landing/Phone";
import "@/components/landing/landing.css";
import "./not-found.css";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist on WhatFlow.",
};

export default function NotFound() {
  return (
    <div className="bg-[var(--paper)]">
      <PageHero
        title="This page never got delivered."
        accent={["never"]}
        sub={
          <>
            <p>We tried sending your requested page, but it returned a 404 error.</p>
            <p className="mt-2 text-[var(--text-muted)]">The link might be broken, or the page has been permanently relocated.</p>
          </>
        }
        actions={
          <>
            <Link href="/" className="wf-btn wf-btn-green">Go back home</Link>
            <Link href="/solutions" className="wf-btn wf-btn-ghost">View solutions</Link>
          </>
        }
      >
        <div className="nf-stage">
          <div className="lp">
            <Phone label="A WhatsApp message that could not be delivered">
              <Bubble message={{ id: "ask", from: "customer", text: "Hi! Can you send me this page? 🙏", time: "10:24" }} />
              <Bubble
                message={{
                  id: "fail",
                  from: "store",
                  text: <>Hmm, that page returned a <span className="nf-failed">404 error</span>. Try one of these instead:</>,
                  buttons: ["Go back home", "View solutions"],
                  time: "10:24",
                }}
              />
            </Phone>
          </div>
          <div className="nf-stamp" aria-hidden="true">404<small>Undelivered</small></div>
        </div>
      </PageHero>
    </div>
  );
}
