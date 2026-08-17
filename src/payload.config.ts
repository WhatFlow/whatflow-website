import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { r2Storage } from "@payloadcms/storage-r2";
import { buildConfig } from "payload";
import type { CloudflareContext } from "@opennextjs/cloudflare";
import { GetPlatformProxyOptions } from "wrangler";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Reviews } from "./collections/Reviews";
import { CountryRates } from "./collections/CountryRates";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : "");
const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join("payload", "bin.js")));
const isProduction = process.env.NODE_ENV === "production";

export default (async () => {
  const cloudflare = isCLI
    ? ({ env: {} } as unknown as CloudflareContext)
    : await (isProduction
        ? getCloudflareContext({ async: true })
        : getCloudflareContextFromWrangler());

  return buildConfig({
    admin: {
      user: Users.slug,
      importMap: {
        baseDir: path.resolve(dirname),
      },
    },
    collections: [Users, Media, Reviews, CountryRates],
    editor: lexicalEditor(),
    secret: (cloudflare.env as any)?.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET || "",
    typescript: {
      outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: sqliteD1Adapter({
      binding: cloudflare.env.whatflow_payload_cms,
    }),
    plugins: [
      r2Storage({
        bucket: cloudflare.env.whatflow_payload_cms_assets,
        collections: { media: true },
      }),
    ],
  });
})();

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  );
}
