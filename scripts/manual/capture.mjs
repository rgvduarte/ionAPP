// Drives the built app (dist/) through every flow and saves screenshots plus
// the on-screen boxes of the elements the manual points at.
// Usage: npm run build && node scripts/manual/capture.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { chromium } from 'playwright';
import { SHOTS } from './shots.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const OUT = fileURLToPath(new URL('../../docs/manual/build/shots/', import.meta.url));
const VIEWPORT = { width: 390, height: 844 };
// Frozen clock so the countdown and dates are identical on every run.
const NOW = new Date('2027-01-20T09:30:00Z');

await mkdir(OUT, { recursive: true });
const server = await preview({ root: ROOT, logLevel: 'warn', preview: { port: 4319, strictPort: false } });
const base = server.resolvedUrls.local[0];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, locale: 'pt-PT', timezoneId: 'Europe/Lisbon' });
await ctx.clock.setFixedTime(NOW);
// The in-app "demo content" banner is noise in a user guide; the manual states it instead.
await ctx.addInitScript(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = '.demo-note{display:none!important} *{caret-color:transparent!important}';
    document.head.appendChild(s);
  });
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const manifest = {};
for (const shot of SHOTS) {
  await shot.setup(page);
  await page.waitForTimeout(250);
  const targets = {};
  for (const [key, loc] of Object.entries(shot.targets)) {
    const box = await loc(page).first().boundingBox({ timeout: 3000 }).catch(() => null);
    if (!box) throw new Error(`[${shot.id}] target "${key}" not found`);
    const visible = box.y + box.height > 0 && box.y < VIEWPORT.height && box.x < VIEWPORT.width;
    if (!visible) console.warn(`[${shot.id}] target "${key}" is off-screen`, box);
    targets[key] = {
      x: (box.x / VIEWPORT.width) * 100,
      y: (box.y / VIEWPORT.height) * 100,
      w: (box.width / VIEWPORT.width) * 100,
      h: (box.height / VIEWPORT.height) * 100,
    };
  }
  await page.screenshot({ path: `${OUT}${shot.id}.png` });
  manifest[shot.id] = { file: `shots/${shot.id}.png`, targets };
  if (shot.teardown) await shot.teardown(page);
  console.log('captured', shot.id);
}

await writeFile(new URL('../../docs/manual/build/shots.json', import.meta.url), JSON.stringify(manifest, null, 2));
await browser.close();
await server.close();
if (errors.length) {
  console.error('App errors during capture:', errors);
  process.exit(1);
}
