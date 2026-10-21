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
// APP_DIST lets the manual be captured from a separate build (default: dist/).
const server = await preview({ root: ROOT, logLevel: 'warn', build: { outDir: process.env.APP_DIST ?? 'dist' }, preview: { port: 4319, strictPort: false } });
const base = server.resolvedUrls.local[0];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, locale: 'pt-PT', timezoneId: 'Europe/Lisbon' });
await ctx.clock.setFixedTime(NOW);
// The in-app "demo content" banner is noise in a user guide; the manual states it instead.
await ctx.addInitScript(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = '.demo-note{display:none!important} *{caret-color:transparent!important} ' +
      // Headless Chromium does not paint the bars' backdrop blur; on a device they read as solid black.
      '.topbar,.tabbar{background:#000!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}';
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
    // A target may be several locators: frame their union.
    const locs = [loc(page)].flat().map((l) => l.first());
    const boxes = await Promise.all(locs.map((l) => l.boundingBox({ timeout: 3000 }).catch(() => null)));
    if (boxes.some((b) => !b)) throw new Error(`[${shot.id}] target "${key}" not found`);
    const x0 = Math.min(...boxes.map((b) => b.x)), y0b = Math.min(...boxes.map((b) => b.y));
    let box = { x: x0, y: y0b, width: Math.max(...boxes.map((b) => b.x + b.width)) - x0, height: Math.max(...boxes.map((b) => b.y + b.height)) - y0b };
    // Content partly hidden under the top bar or tab bar: frame only its visible part.
    const inBar = await locs[0].evaluate((el) => !!el.closest('.topbar, .tabbar'));
    if (!inBar) {
      const [barTop, barBottom] = await page.evaluate(() => [
        document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0,
        document.querySelector('.tabbar')?.getBoundingClientRect().top ?? innerHeight,
      ]);
      const y0 = Math.max(box.y, barTop), y1 = Math.min(box.y + box.height, barBottom);
      box = { ...box, y: y0, height: Math.max(0, y1 - y0) };
    }
    const visible = box.y + box.height > 0 && box.y < VIEWPORT.height && box.x < VIEWPORT.width;
    if (!visible) console.warn(`[${shot.id}] target "${key}" is off-screen`, box);
    targets[key] = {
      x: (box.x / VIEWPORT.width) * 100,
      y: (box.y / VIEWPORT.height) * 100,
      w: (box.width / VIEWPORT.width) * 100,
      h: (box.height / VIEWPORT.height) * 100,
    };
  }
  // High-quality JPEG keeps the PDF small; the dark UI shows no visible artefacts at q88.
  await page.screenshot({ path: `${OUT}${shot.id}.jpg`, type: 'jpeg', quality: 88 });
  manifest[shot.id] = { file: `shots/${shot.id}.jpg`, targets };
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
