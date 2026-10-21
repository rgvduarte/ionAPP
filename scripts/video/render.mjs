// Renders the Apple-style app film: serves the built app + stage, drives the
// stage timeline frame by frame (deterministic) and pipes frames into ffmpeg.
// Usage: npm run build && node scripts/video/render.mjs [--lang=pt|en] [--fps=30] [--scale=2] [--from=0 --to=58.5] [--preview]
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1] ?? d;
const LANG = arg('lang', 'pt');
const FPS = Number(arg('fps', 30));
const SCALE = Number(arg('scale', 2)); // supersampling: frames captured at 1920*SCALE then downscaled
const FROM = Number(arg('from', 0));
const TO = Number(arg('to', 58.6));
const PREVIEW = process.argv.includes('--preview'); // writes a few stills instead of a video

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const BUILD = join(ROOT, 'docs/video/build');
const OUT = join(ROOT, `docs/video/ion-app-film${LANG === 'pt' ? '' : '-' + LANG}.mp4`);
// Fixed clock: countdown reads "30 days 08:59:50" when the home screen appears (t = 10 s).
const CLOCK_BASE = Date.parse('2027-02-20T09:30:00Z');

const COPY = {
  pt: {
    intro: 'A app oficial do PT ’27.',
    captions: [
      { in: 7.9, out: 9.9, title: 'Tudo o PT ’27.\n<em>Numa só app.</em>', sub: 'Agenda, credencial e networking — no seu telemóvel.' },
      { in: 10.5, out: 15.8, title: 'O evento à distância\nde <em>um toque.</em>', sub: 'Contagem decrescente, atalhos e as suas sessões.' },
      { in: 16.7, out: 20.5, title: 'A sua agenda.\n<em>Feita por si.</em>', sub: 'Marque com uma estrela as sessões que não quer perder.' },
      { in: 20.9, out: 24.3, title: 'Cinco palcos.\n<em>Um toque</em> para filtrar.', sub: 'Veja apenas o que lhe interessa.' },
      { in: 25.5, out: 29.9, title: 'O seu bilhete.\n<em>Sempre consigo.</em>', sub: 'Mostre o código QR à entrada. Mais nada.' },
      { in: 31.3, out: 37.6, title: 'Conheça quem\n<em>move o mercado.</em>', sub: 'Encontre participantes por setor e ligue-se num toque.' },
      { in: 38.3, out: 44.4, title: 'Reuniões 1:1.\n<em>Em dois toques.</em>', sub: 'Escolha o horário. A outra pessoa confirma.' },
    ],
    montage: ['Agenda.', 'Credencial.', 'Networking.'],
    when: '22–23 março 2027 · Portugal',
    avail: 'Disponível na web · Em breve para iOS e Android',
    url: 'rgvduarte.github.io/ionAPP',
    toastConnect: 'Pedido de ligação enviado',
    toastMeeting: 'Pedido de reunião enviado',
    meetButton: 'Pedir reunião 1:1',
    sendButton: 'Enviar pedido',
  },
  en: {
    intro: 'The official PT ’27 app.',
    captions: [
      { in: 7.9, out: 9.9, title: 'All of PT ’27.\n<em>One app.</em>', sub: 'Agenda, pass and networking — on your phone.' },
      { in: 10.5, out: 15.8, title: 'The whole event,\n<em>one tap away.</em>', sub: 'Countdown, shortcuts and your sessions.' },
      { in: 16.7, out: 20.5, title: 'Your agenda.\n<em>Made by you.</em>', sub: 'Star the sessions you don’t want to miss.' },
      { in: 20.9, out: 24.3, title: 'Five stages.\n<em>One tap</em> to filter.', sub: 'See only what matters to you.' },
      { in: 25.5, out: 29.9, title: 'Your pass.\n<em>Always with you.</em>', sub: 'Show the QR code at the door. That’s it.' },
      { in: 31.3, out: 37.6, title: 'Meet the people\n<em>who move markets.</em>', sub: 'Find attendees by sector and connect in one tap.' },
      { in: 38.3, out: 44.4, title: '1:1 meetings.\n<em>In two taps.</em>', sub: 'Pick a time. They confirm.' },
    ],
    montage: ['Agenda.', 'Pass.', 'Networking.'],
    when: '22–23 March 2027 · Portugal',
    avail: 'Available on the web · Coming soon to iOS and Android',
    url: 'rgvduarte.github.io/ionAPP',
    toastConnect: 'Connection request sent',
    toastMeeting: 'Meeting request sent',
    meetButton: 'Request 1:1 meeting',
    sendButton: 'Send request',
  },
}[LANG];

// ---------- static server: /app → dist, /stage → scripts/video, /fonts → Inter Tight, /build → docs/video/build ----------
const MOUNTS = {
  '/app/': join(ROOT, 'dist'),
  '/stage/': join(ROOT, 'scripts/video'),
  '/fonts/': join(ROOT, 'node_modules/@fontsource/inter-tight'),
  '/build/': BUILD,
};
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const mount = Object.keys(MOUNTS).find((m) => url.startsWith(m));
  if (!mount) return res.writeHead(404).end();
  const file = normalize(join(MOUNTS[mount], url.slice(mount.length) || 'index.html'));
  if (!file.startsWith(MOUNTS[mount])) return res.writeHead(403).end();
  try {
    await stat(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// ---------- app setup shared by stills and the live phone ----------
const SEED = {
  profile: { id: 'ION27-7KQ2-M8TD', name: 'Ana Costa', email: 'ana.costa@exemplo.pt', company: 'Exemplo Sports', role: 'Head of Partnerships', sector: 'brands', ticket: 'vip' },
  favorites: ['c2', 'c8'],
  connections: { a2: 'incoming', a9: 'connected' },
  meetings: [{ id: 'm-seed', attendeeId: 'a5', slot: '2027-03-23T13:00:00+00:00', status: 'incoming' }],
};
function appInit({ seed, lang }) {
  if (!location.pathname.startsWith('/app/')) return;
  try {
    localStorage.setItem('ion:lang', JSON.stringify(lang));
    if (seed) localStorage.setItem('ion:state', JSON.stringify(seed));
    else localStorage.removeItem('ion:state');
  } catch {}
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    // iPhone safe areas, no scrollbars, no timer-driven UI (toasts are drawn by the stage)
    s.textContent = `:root{--safe-top:54px!important;--safe-bottom:26px!important}
      html{scrollbar-width:none}::-webkit-scrollbar{display:none}
      .demo-note,.toast{display:none!important}
      *{transition:none!important;animation:none!important;caret-color:transparent!important}`;
    document.head.appendChild(s);
  });
}

const browser = await chromium.launch();
await mkdir(join(BUILD, 'static'), { recursive: true });

// Stills for the welcome screen (signed out) and the montage phones.
async function still(name, hash, seed) {
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 3, locale: LANG === 'pt' ? 'pt-PT' : 'en-GB', timezoneId: 'Europe/Lisbon' });
  await ctx.clock.setFixedTime(CLOCK_BASE);
  await ctx.addInitScript(appInit, { seed, lang: LANG });
  const p = await ctx.newPage();
  await p.goto(`${base}/app/index.html${hash}`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(BUILD, 'static', `${name}.png`) });
  const qr = name === 'credential' ? await p.locator('.pass-qr').boundingBox() : null;
  await ctx.close();
  return qr;
}
await still('welcome', '#/welcome', null);
await still('agenda', '#/agenda', SEED);
await still('networking', '#/networking', SEED);
const qrBox = await still('credential', '#/credential', SEED);

// ---------- stage ----------
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: SCALE, locale: LANG === 'pt' ? 'pt-PT' : 'en-GB', timezoneId: 'Europe/Lisbon' });
await ctx.clock.setFixedTime(CLOCK_BASE);
await ctx.addInitScript(appInit, { seed: SEED, lang: LANG });
await ctx.addInitScript((cfg) => { window.CONFIG = cfg; }, {
  copy: COPY,
  qr: { x: qrBox.x + qrBox.width / 2, y: qrBox.y + qrBox.height / 2 },
  static: { welcome: '/build/static/welcome.png', agenda: '/build/static/agenda.png', networking: '/build/static/networking.png', credential: '/build/static/credential.png' },
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await page.goto(`${base}/stage/stage.html`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.stageReady && document.getElementById('app').contentDocument?.querySelector('.countdown'));
await page.evaluate(async () => {
  await document.fonts.ready;
  await document.getElementById('app').contentDocument.fonts.ready;
});

// Replays every frame up to `from` without capturing, so app state (taps) matches.
async function step(t) {
  await page.clock.setFixedTime(CLOCK_BASE + t * 1000);
  const { changed } = await page.evaluate((tt) => window.render(tt), t);
  if (changed) {
    await page.waitForTimeout(120);
    await page.evaluate((tt) => window.render(tt), t);
  }
}

const total = Math.round(TO * FPS);
const first = Math.round(FROM * FPS);

if (PREVIEW) {
  const times = (arg('at', '') || '').split(',').filter(Boolean).map(Number);
  await mkdir(join(BUILD, 'preview'), { recursive: true });
  let k = 0;
  for (let f = 0; f <= total && k < times.length; f++) {
    const t = f / FPS;
    await step(t);
    if (Math.abs(t - times[k]) < 0.5 / FPS) {
      await page.screenshot({ path: join(BUILD, 'preview', `t${times[k].toFixed(1)}.jpg`), type: 'jpeg', quality: 88 });
      k++;
    }
  }
  console.log('preview stills in', join(BUILD, 'preview'));
} else {
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-vf', 'scale=1920:1080:flags=lanczos,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-profile:v', 'high', '-tune', 'animation',
    '-movflags', '+faststart', '-r', String(FPS), OUT,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const write = (buf) => new Promise((r) => (ff.stdin.write(buf) ? r() : ff.stdin.once('drain', r)));
  const started = Date.now();
  for (let f = 0; f < total; f++) {
    const t = f / FPS;
    await step(t);
    if (f < first) continue;
    await write(await page.screenshot({ type: 'jpeg', quality: 93 }));
    if (f % (FPS * 5) === 0) console.log(`t=${t.toFixed(1)}s  (${Math.round((Date.now() - started) / 1000)}s elapsed)`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('video:', OUT);
}

await writeFile(join(BUILD, 'errors.json'), JSON.stringify(errors, null, 2));
await browser.close();
server.close();
if (errors.length) {
  console.error('page errors:', errors);
  process.exit(1);
}
