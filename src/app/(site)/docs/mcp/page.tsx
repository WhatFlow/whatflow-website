import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { PageHero, Section as PageSection } from "@/components/site/PageKit";
import "./mcp.css";

export const metadata: Metadata = {
  title: "Connect Claude, ChatGPT or Cursor to WhatFlow (MCP) | WhatFlow",
  description:
    "Set up the WhatFlow MCP server so an AI app can read Live Inbox chats, draft replies, send approved templates, look up Shopify orders and read WhatsApp analytics.",
  alternates: { canonical: "/docs/mcp" },
};

const MCP_URL = "https://mcp.whatflow.tech/mcp";

const CURSOR_CONFIG = `{
  "mcpServers": {
    "whatflow": {
      "url": "${MCP_URL}"
    }
  }
}`;

const API_KEY_CONFIG = `{
  "mcpServers": {
    "whatflow": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer wf_live_…"
      }
    }
  }
}`;

const SECTIONS: Array<[string, string]> = [
  ["before-you-start", "Before you start"],
  ["claude", "Claude"],
  ["chatgpt", "ChatGPT"],
  ["cursor", "Cursor"],
  ["sign-in", "Signing in"],
  ["tools", "What the AI can do"],
  ["draft-mode", "Draft mode"],
  ["free-text-vs-templates", "Free text vs templates"],
  ["billing", "Billing"],
  ["api-keys", "API keys (n8n, scripts)"],
  ["disconnect", "Disconnect & activity log"],
  ["troubleshooting", "Troubleshooting"],
];

const INBOX_TOOLS: Array<[string, string]> = [
  ["list_conversations", "Lists your Live Inbox chats, newest first. Can filter by unread, assigned to me, unassigned, label, or chats where the 24-hour reply window is open."],
  ["get_conversation", "Reads the latest messages in one chat, with its labels, who it is assigned to, the 24-hour window state and any drafts waiting for review."],
  ["search_messages", "Searches message text from the last 30 days."],
  ["send_message", "Replies to a customer with text, reply buttons, a list, a link button or a catalog product. Only works while the 24-hour window is open."],
  ["send_template", "Sends one of your approved WhatsApp templates in a chat. Works after the 24-hour window has closed."],
  ["set_labels", "Adds or removes labels on a chat. It can only use labels an admin already created in Live Inbox."],
  ["assign_conversation", "Assigns a chat to yourself, unassigns it, or (store owner only) assigns it to a team member."],
  ["add_note", "Adds a private note to a chat. Notes are only visible to your team, never to the customer."],
  ["search_products", "Searches your WhatsApp catalog, so the AI can share a product in a reply."],
  ["create_broadcast_draft", "Creates a broadcast draft from an approved template. It never sends or schedules it: a person picks the audience and sends it from Live Inbox."],
];

const STORE_TOOLS: Array<[string, string]> = [
  ["get_shop_context", "Tells the AI which store it is connected to, your WhatsApp number and quality rating, whether Live Inbox is on, what this connection is allowed to do and whether draft mode is on."],
  ["list_templates", "Lists your WhatsApp templates (approved ones by default) with their text, language, category and how many variables each needs."],
  ["lookup_order", "Finds a Shopify order by its name (for example #1042), or the latest 5 orders for a customer's phone number. Shows payment and fulfillment status, total, tags, tracking and the WhatsApp automations sent for it."],
  ["get_messaging_analytics", "Messages sent and delivered from your WhatsApp number, for today, 7 days or 30 days."],
  ["get_failed_messages", "Recent messages that failed, with Meta's error code, a plain-language reason, the automation and order involved, plus the most common reasons."],
  ["get_automation_status", "Which WhatsApp automations are on (order confirmation, abandoned checkout, shipping updates and more), plus account restrictions and alerts."],
];

const PERMISSIONS = [
  "Read Live Inbox conversations",
  "Label, assign and add private notes",
  "Reply to customers",
  "Read WhatsApp templates",
  "Send approved templates",
  "Create broadcast drafts (never sends them)",
  "Search the WhatsApp catalog",
  "Look up Shopify orders",
  "Read messaging analytics and failures",
  "Read automation status",
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div id={id} className="mcp-section" data-reveal>
      <h2>{title}</h2>
      <div className="mcp-body">{children}</div>
    </div>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="mcp-code">{children}</code>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre tabIndex={0} className="mcp-pre">
      <code>{children}</code>
    </pre>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mcp-steps">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ol>
  );
}

const TOOL_TONES = ["var(--mint)", "var(--sky)", "#fff1c2", "var(--pink)", "var(--lilac)"];

function ToolTable({ heading, tools }: { heading: string; tools: Array<[string, string]> }) {
  return (
    <div>
      <h3>{heading}</h3>
      <div className="mcp-tools">
        {tools.map(([name, description], index) => (
          <div key={name} className="mcp-tool" style={{ "--mcp-tone": TOOL_TONES[index % TOOL_TONES.length] } as CSSProperties}>
            <code>{name}</code>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function McpDocsPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <PageHero
        title="Connect your AI to WhatFlow."
        accent={["WhatFlow"]}
        sub={
          <p>
            Let Claude, ChatGPT or Cursor read your WhatsApp chats, draft replies, send approved templates, look up Shopify orders
            and check your messaging results. It works over MCP (Model Context Protocol), and connecting is free.
          </p>
        }
        actions={
          <>
            <a href="#claude" className="wf-btn wf-btn-green">Start setup</a>
            <a href="#tools" className="wf-btn wf-btn-ghost">See what the AI can do</a>
          </>
        }
      >
        <div className="mcp-demo">
          <div className="mcp-url">
            <span className="mcp-url-label">MCP server URL</span>
            <code>{MCP_URL}</code>
          </div>
          <div className="mcp-chat" aria-hidden="true">
            <span className="mcp-chat-you">Which WhatsApp chats are unread?</span>
            <span className="mcp-chat-tool">list_conversations</span>
            <span className="mcp-chat-ai">Reading your Live Inbox…</span>
          </div>
        </div>
      </PageHero>

      {/* ─── Body ─── */}
      <PageSection tone="paper">
        <div className="mcp-layout">
          <nav aria-label="On this page" className="mcp-toc">
            <span className="mcp-toc-title">On this page</span>
            <ul>
              {SECTIONS.map(([id, label]) => (
                <li key={id}><a href={`#${id}`}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="mcp-content">
            <Section id="before-you-start" title="Before you start">
              <ul>
                <li>Install the WhatFlow app on your Shopify store and connect your WhatsApp number.</li>
                <li>
                  Open <strong>AI Connections</strong> in the WhatFlow Shopify app. It shows the MCP server URL, lets you create a
                  connect code, lists connected AI apps and shows recent AI activity.
                </li>
                <li>
                  Chat tools (reading conversations, replying, labels, notes, catalog and broadcast drafts) need <strong>Live Inbox</strong> to
                  be turned on. Without it, the AI can still look up orders, list templates and read analytics and automation status.
                </li>
              </ul>
            </Section>

            <Section id="claude" title="Connect Claude">
              <Steps items={[
                <>In Claude, open <strong>Settings → Connectors</strong>.</>,
                <>Choose <strong>Add custom connector</strong>.</>,
                <>Name it <strong>WhatFlow</strong> and paste the URL <Code>{MCP_URL}</Code>.</>,
                <>Click <strong>Connect</strong>. A WhatFlow sign-in page opens: <a href="#sign-in">sign in</a> and choose what Claude may do.</>,
                <>Back in Claude, enable the WhatFlow connector in a chat and ask something like &quot;Which WhatsApp chats are unread?&quot;</>,
              ]} />
            </Section>

            <Section id="chatgpt" title="Connect ChatGPT">
              <Steps items={[
                <>Open ChatGPT on the web and go to <strong>Settings → Apps &amp; Connectors → Advanced</strong>. Turn on <strong>Developer mode</strong>. On Business or Enterprise plans a workspace admin may need to allow it first, and some plans only allow read-only custom apps.</>,
                <>Back in <strong>Apps &amp; Connectors</strong>, click <strong>Create</strong>.</>,
                <>Name it <strong>WhatFlow</strong>, paste <Code>{MCP_URL}</Code> as the MCP server URL and choose <strong>OAuth</strong>.</>,
                <>Click <strong>Create</strong>, then <strong>Connect</strong>. A WhatFlow sign-in page opens: <a href="#sign-in">sign in</a> and choose what ChatGPT may do.</>,
                <>In a new chat, turn on WhatFlow from the <strong>+</strong> menu and ask, for example, &quot;Triage my unread WhatsApp chats&quot;.</>,
              ]} />
            </Section>

            <Section id="cursor" title="Connect Cursor">
              <p>
                Add WhatFlow to your <Code>mcp.json</Code>: <Code>~/.cursor/mcp.json</Code> for all projects, or <Code>.cursor/mcp.json</Code> inside
                one project.
              </p>
              <CodeBlock>{CURSOR_CONFIG}</CodeBlock>
              <p>
                Save the file. WhatFlow appears in Cursor&apos;s MCP settings; when Cursor asks you to sign in, the WhatFlow sign-in page opens in
                your browser.
              </p>
              <p>
                Prefer not to sign in through the browser? Use an <a href="#api-keys">API key</a> instead.
              </p>
            </Section>

            <Section id="sign-in" title="Signing in">
              <p>When an AI app connects, WhatFlow shows its own sign-in page. There are two ways in:</p>
              <ul>
                <li>
                  <strong>Live Inbox login.</strong> Enter your store (<Code>your-store.myshopify.com</Code>), your Live Inbox username or email,
                  and your password. The AI app then acts as you, with your role.
                </li>
                <li>
                  <strong>Connect code.</strong> In the Shopify app, go to <strong>AI Connections → Generate connect code</strong> and type the
                  8-character code (like <Code>K7F2-9QXD</Code>). A code works once and expires after 10 minutes. It connects as the store admin, which is
                  useful if you don&apos;t use Live Inbox.
                </li>
              </ul>
              <p>Then pick what the app is allowed to do:</p>
              <ul>
                <li><strong>Assistant (recommended).</strong> Read chats, orders and templates, label and assign chats, and write replies. With draft mode on (the default), replies wait in Live Inbox until a team member presses Send.</li>
                <li><strong>Read only.</strong> Look at chats, orders, templates and analytics, but never reply. The Shopify app lists the connection as &quot;Read only&quot;.</li>
                <li><strong>Choose exactly.</strong> Pick individual permissions from this list:</li>
              </ul>
              <ul className="mcp-perms">
                {PERMISSIONS.map((permission) => <li key={permission}>{permission}</li>)}
              </ul>
              <p>
                Team members with the <strong>agent</strong> role can only allow conversation and reply access (reading and organising chats,
                replying, and reading or sending templates).
              </p>
            </Section>

            <Section id="tools" title="What the AI can do">
              <p>
                WhatFlow gives the AI 16 tools. It only sees the ones you allowed when signing in, and chat tools only appear when Live Inbox is on.
                The AI picks the right tool from your request, so you can simply ask in your own words.
              </p>
              <ToolTable heading="Store, orders & analytics" tools={STORE_TOOLS} />
              <ToolTable heading="Live Inbox chats" tools={INBOX_TOOLS} />
              <div className="grid gap-3">
                <h3>Ready-made prompts</h3>
                <p>Some AI apps show these as shortcuts (for example in a prompt or slash-command menu):</p>
                <ul>
                  <li>
                    <strong>triage_inbox</strong>: goes through your unread chats (20 by default), applies fitting labels, drafts short replies where
                    the 24-hour window is open, and finishes with a table of each customer, what they want, and what you still need to handle yourself.
                    It is told never to send templates or broadcasts without asking you first.
                  </li>
                  <li>
                    <strong>daily_report</strong>: a short WhatsApp report for today, 7 days or 30 days: message volume and delivery rate, the top 3
                    failure reasons with a fix for each, account health, and useful automations that are turned off.
                  </li>
                </ul>
              </div>
              <p>
                Messages written by customers are passed to the AI as untrusted content, and the AI is told never to follow instructions inside them.
              </p>
            </Section>

            <Section id="draft-mode" title="Draft mode">
              <div className="mcp-callout">
                <p>
                  With draft mode on, nothing the AI writes reaches your customer until a person on your team presses Send.
                </p>
              </div>
              <ul>
                <li>When the AI replies or sends a template, the message is checked like a real send, then saved as a draft in that chat in Live Inbox.</li>
                <li>A team member can edit the draft, send it, or discard it.</li>
                <li>Draft mode is <strong>on by default</strong> for every new connection and API key.</li>
                <li>Only <strong>admins</strong> can turn it off. Connections made by agent-role team members always use draft mode.</li>
                <li>The AI Connections page shows each app as <strong>Drafts</strong>, <strong>Sends directly</strong> or <strong>Read only</strong>.</li>
              </ul>
            </Section>

            <Section id="free-text-vs-templates" title="Free text vs templates">
              <p>WhatsApp has two kinds of outgoing messages, and the AI follows the same rules your team does:</p>
              <ul>
                <li>
                  <strong>Free-text replies</strong> (text, buttons, lists, links, products) only work within <strong>24 hours of the customer&apos;s last
                  message</strong>. They do not check your blocklist, the same as replies from your team.
                </li>
                <li>
                  <strong>Templates</strong> are your Meta-approved messages and can be sent after the 24-hour window has closed. Templates sent by an
                  AI app <strong>respect your blocklist</strong>: numbers on it are skipped.
                </li>
              </ul>
              <p>If the AI sends a lot of messages in a short time, WhatFlow pauses it and asks it to wait a minute before sending again.</p>
            </Section>

            <Section id="billing" title="Billing">
              <p>
                <strong>Connecting an AI app is free.</strong> Reading chats, looking up orders, checking analytics and creating drafts cost nothing.
              </p>
              <p>
                Only WhatsApp messages that are <strong>actually sent</strong> count toward your plan, the same as messages your team sends. A draft
                that a team member approves counts as that person&apos;s reply. A discarded draft is never sent and never counted.
              </p>
            </Section>

            <Section id="api-keys" title="API keys for n8n and scripts">
              <p>
                For n8n, Make or your own scripts, create an API key in <strong>AI Connections → API keys</strong>. Give it a name, choose its allowed
                actions and decide on draft mode (on by default). The key starts with <Code>wf_live_</Code> and is shown only once, so copy it somewhere safe.
              </p>
              <p>Send it with every request to <Code>{MCP_URL}</Code> as a header:</p>
              <CodeBlock>{"Authorization: Bearer wf_live_…"}</CodeBlock>
              <p>For Cursor or any other app that reads an <Code>mcp.json</Code> file, the same key goes in <Code>headers</Code>:</p>
              <CodeBlock>{API_KEY_CONFIG}</CodeBlock>
              <p>Treat the key like a password. Anyone who has it can use the actions you allowed.</p>
            </Section>

            <Section id="disconnect" title="Disconnect & activity log">
              <p>Everything is managed in the Shopify app under <strong>AI Connections</strong>:</p>
              <ul>
                <li>
                  <strong>Connected AI apps</strong> lists each app, who signed in (or &quot;Store admin&quot; for a connect code), whether it sends
                  drafts, sends directly or is read only, when it was last used, and whether its last call failed. Press <strong>Disconnect</strong> to cut it off.
                  Reconnecting the same app replaces its old entry.
                </li>
                <li>Under <strong>API keys</strong>, press <strong>Revoke</strong> to stop a key from working.</li>
                <li>Uninstalling WhatFlow from Shopify disconnects every AI app and revokes every key.</li>
              </ul>
              <p>
                <strong>Recent AI activity</strong> lists every action an AI app takes: what it did (for example &quot;send message · conversation
                123&quot; or &quot;lookup order · #1042&quot;), which app did it, the result (ok, drafted or an error such as rate limited) and when.
              </p>
            </Section>

            <Section id="troubleshooting" title="Troubleshooting">
              <ul>
                <li>
                  <strong>Opening the MCP URL in a browser shows 401.</strong> That&apos;s expected: the server only answers signed-in AI apps.
                </li>
                <li>
                  <strong>The AI app keeps loading after you press Allow.</strong> Disconnect WhatFlow in the Shopify app under AI Connections, remove
                  it in the AI app, then connect again. A fix for this went live on 29 October 2026.
                </li>
                <li>
                  <strong>The AI can see data but can&apos;t reply.</strong> The connection is read only. Reconnect and choose <strong>Assistant</strong>.
                  In ChatGPT, also check whether your plan allows write actions in custom apps.
                </li>
                <li>
                  <strong>No chat tools appear.</strong> Live Inbox is turned off for your store. Turn it on in the WhatFlow Shopify app.
                </li>
                <li>
                  <strong>&quot;Connect code is wrong, expired or already used&quot;.</strong> Codes work once, for 10 minutes. Generate a new one.
                </li>
              </ul>
            </Section>

            {/* ─── Help ─── */}
            <div className="mcp-help" data-reveal>
              <div>
                <h2>Need help connecting?</h2>
                <p>Tell us which AI app you are using and what you see, and we&apos;ll help you get set up.</p>
              </div>
              <a href="mailto:support@whatflow.tech" className="wf-btn wf-btn-dark">
                Contact support
              </a>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
