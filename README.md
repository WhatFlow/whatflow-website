# OpenNext Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Development Worker

`wrangler.dev.jsonc` targets `whatflow-website-dev` with no production routes or
CMS, storage, or analytics bindings. It uses `worker.dev.ts` to serve the public
site, read public reviews, rates, and media from whatflow.io, disable indexing,
and reject CMS admin access and write requests.

Build a preview in a separate directory with the source, public assets,
package/config files, and dependencies. Use `wrangler.dev.jsonc` as that
copy’s `wrangler.jsonc`. Exclude the project’s `.env*` and `.dev.vars*` files;
set `NEXT_PUBLIC_SITE_URL=https://whatflow.io`, the public WhatsApp support
number, and a dummy `PAYLOAD_SECRET` for the build. Run
`opennextjs-cloudflare build`, then `opennextjs-cloudflare deploy` from the
preview copy. The ordinary `npm run deploy` command below targets production.

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
