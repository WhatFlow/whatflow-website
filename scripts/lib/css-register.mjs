/** Usage: NODE_OPTIONS="--import ./scripts/lib/css-register.mjs" npx tsx scripts/verify-refresh-render.tsx */
import { register } from 'node:module';
register(new URL('./css-hooks.mjs', import.meta.url));
