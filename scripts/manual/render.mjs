// Builds the user guide HTML from content.mjs + captured shots and prints it to PDF.
// Usage: node scripts/manual/render.mjs   (after capture.mjs)
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Icons from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { chromium } from 'playwright';
import { CHAPTERS, FEATURES, LEGEND, META, PAGES, PASSES, REFERENCE, TROUBLESHOOTING } from './content.mjs';

const root = new URL('../../', import.meta.url);
const build = new URL('docs/manual/build/', root);
const OUT_PDF = fileURLToPath(new URL('docs/manual/ion-guia-de-utilizacao.pdf', root));
const shots = JSON.parse(await readFile(new URL('shots.json', build), 'utf8'));
const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

const asset = (p) => new URL(`public/${p}`, root).href;
const shotUrl = (id) => new URL(shots[id].file, build).href;
const icon = (name, size = 24) => renderToStaticMarkup(createElement(Icons[name], { size, strokeWidth: 2 }));
const qr = (value) => renderToStaticMarkup(createElement(QRCodeSVG, { value, level: 'M', marginSize: 0, bgColor: '#FFFFFF', fgColor: '#000000' }));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) =>
  esc(s)
    .replace(/\[\[(.+?)\]\]/g, '<span class="ui">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\{\{icon:(\w+)\}\}/g, (_, n) => `<span class="glyph">${icon(n)}</span>`);
const chapterOf = (n) => CHAPTERS.find((c) => c.n === n);

// Page numbers (1-based, cover = 1) for the table of contents.
const firstPage = {};
PAGES.forEach((p, i) => { if (p.chapter && !(p.chapter in firstPage)) firstPage[p.chapter] = i + 1; });

function shell(page, index, body) {
  const ch = page.chapter && chapterOf(page.chapter);
  return `<section class="page">
    <header class="page-head">
      <img src="${new URL('assets/logo-header.png', import.meta.url).href}" alt="ion" />
      <span class="chapter-label">${ch ? `<b>${ch.n}</b>${keepIon(esc(ch.title))}` : ''}</span>
    </header>
    <div class="page-body">${page.opener && ch ? opener(ch) : ''}${body}</div>
    <footer class="page-foot"><span>${META.title} · ${META.subtitle}</span><span class="num">${String(index + 1).padStart(2, '0')}</span></footer>
  </section>`;
}

const keepIon = (html) => html.replace(/\bion\b/g, '<span class="nocase">ion</span>');
const GRAD_DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="ion-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#ccff00"/><stop offset=".55" stop-color="#daac1b"/><stop offset="1" stop-color="#eb473d"/></linearGradient></defs></svg>';
const gnum = (t) => `<svg class="gnum" viewBox="0 0 ${(t.length * 0.62).toFixed(2)} 0.74" overflow="visible"><text x="0" y="0.72" font-size="1" font-weight="800" letter-spacing="-0.05" fill="url(#ion-grad)">${t}</text></svg>`;
const opener = (ch) => `<div class="opener">${gnum(ch.n)}<h1>${esc(ch.title)}</h1></div>`;

function phone(spec, width, min) {
  const s = shots[spec.shot];
  if (!s) throw new Error(`unknown shot ${spec.shot}`);
  const marks = Object.entries(spec.marks ?? {})
    .map(([n, t]) => {
      const [key, pos] = Array.isArray(t) ? t : [t, 'tl'];
      const b = s.targets[key];
      if (!b) throw new Error(`shot ${spec.shot} has no target ${key}`);
      const clamp = (v) => Math.max(0, Math.min(100, v));
      const x = clamp(b.x), y = clamp(b.y), w = clamp(b.x + b.w) - x, h = clamp(b.y + b.h) - y;
      const below = pos === 'br' || ((pos === 'tl' || pos === 'tr') && y < 5);
      const bx = pos === 'tr' || pos === 'br' ? x + w : pos === 'above' ? x + w / 2 : x;
      const by = pos === 'l' ? y + h / 2 : below ? y + h : y;
      const cls = pos === 'br' ? 'tr' : pos;
      return `<div class="hl" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></div>
        <span class="bubble ${cls}${below ? ' below' : ''}" style="left:${bx}%;top:${by}%">${n}</span>`;
    })
    .join('');
  return `<div class="phone" data-max="${width}" data-min="${min}" style="width:${width}mm"><div class="screen-wrap">
    <div class="screen"><img src="${shotUrl(spec.shot)}" alt="" /></div>
    <div class="marks">${marks}</div></div></div>`;
}

const stepList = (steps, cls = '') =>
  `<ol class="steps ${cls}">${steps.map((t, i) => `<li><span class="bubble">${i + 1}</span><span>${md(t)}</span></li>`).join('')}</ol>`;

const extras = (p) =>
  [
    p.box && `<div class="box"><h3>${esc(p.box.title)}</h3><ul>${p.box.items.map((i) => `<li>${md(i)}</li>`).join('')}</ul></div>`,
    p.passes &&
      `<div class="passes">${PASSES.map(
        (ps, i) => `<div class="pass-card ${i === 0 ? 'vip' : ''}"><span class="tag">${esc(ps.name)}</span><ul>${ps.items
          .map((it) => `<li>${icon('Check')}${esc(it)}</li>`)
          .join('')}</ul></div>`,
      ).join('')}</div>`,
    p.legend &&
      `<div class="legend"><span class="kicker">Estados de uma ligação</span>${LEGEND.map(
        (l) => `<div class="item">${
          l.style === 'pair'
            ? `<span class="pair"><span class="ok">${icon('Check')}</span><span class="no">${icon('X')}</span></span>`
            : `<span class="chipish ${l.style}">${icon(l.icon)}${esc(l.label)}</span>`
        }<span>${md(l.text)}</span></div>`,
      ).join('')}</div>`,
    p.tip && `<div class="tip"><span class="kicker">Dica</span>${md(p.tip)}</div>`,
    p.note && `<div class="note"><span class="kicker">Nota</span>${md(p.note)}</div>`,
  ]
    .filter(Boolean)
    .join('');

function stepsPage(p) {
  const head = `<h2 class="section-title">${esc(p.title)}</h2>${p.intro ? `<p class="intro">${md(p.intro)}</p>` : ''}`;
  const n = p.phones.length;
  if (n === 1) {
    return `${head}<div class="layout-side">${phone(p.phones[0], p.phoneWidth ?? 88, 60)}<div>${stepList(p.steps)}${extras(p)}</div></div>`;
  }
  const [max, min] = n === 3 ? [57, 44] : [80, 44];
  const perPhone = p.phones.map((ph) => Object.keys(ph.marks ?? {}).map(Number).sort((a, b) => a - b));
  const listed = new Set(perPhone.flat());
  p.steps.forEach((_, i) => { if (!listed.has(i + 1)) perPhone[0].push(i + 1); });
  perPhone[0].sort((a, b) => a - b);
  const cols = perPhone
    .map((ks) => `<ol class="steps">${ks.map((k) => `<li><span class="bubble">${k}</span><span>${md(p.steps[k - 1])}</span></li>`).join('')}</ol>`)
    .join('');
  return `${head}<div class="layout-row n${n}">${p.phones.map((ph) => phone(ph, p.phoneWidth ?? max, min)).join('')}</div><div class="step-cols n${n}">${cols}</div>${extras(p)}`;
}

const pages = {
  cover: () => `<section class="page cover">
    <span class="edition">${META.edition} · app v${pkg.version}</span>
    <img class="map" src="${asset('images/world-map.webp')}" alt="" />
    <img class="logo" src="${asset('images/logo-liga-portugal.webp')}" alt="ion · Liga Portugal" />
    <img class="march" src="${asset('images/march-27.webp')}" alt="March ’27" />
    <div class="text"><h1>${META.title}</h1><p>${META.subtitle}<br/>Todas as funcionalidades, passo a passo</p></div>
    <div class="qr"><div class="code">${qr(META.appUrl)}</div><span>Abrir a app</span></div>
    <img class="markets" src="${asset('images/markets-strip.webp')}" alt="PT · UAE · WW · HK" />
  </section>`,

  toc: (p, i) =>
    shell(p, i, `<div class="opener"><h1>Índice</h1></div>
      <nav class="toc">${CHAPTERS.map(
        (c) => `<a>${gnum(c.n)}<span>${esc(c.title)}</span><span class="p">${firstPage[c.n]}</span></a>`,
      ).join('')}</nav>`),

  overview: (p, i) =>
    shell(p, i, `<p class="about-ion">A ion é uma plataforma internacional de negócios onde o desporto é o ponto de partida para conversas que geram parcerias, influência, investimento e crescimento.</p>
      <p class="intro">A app oficial reúne num só lugar tudo o que precisa para o PT ’27, a 22 e 23 de março de 2027: o programa, os oradores, o networking com outros participantes e a sua credencial de acesso.</p>
      <div class="features">${FEATURES.map((f) => `<div class="feature">${icon(f.icon)}<h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('')}</div>
      <h2 class="section-title">Como ler este guia</h2>
      <div class="howto">
        <div><div class="row"><span class="bubble">1</span><strong>Marcadores numerados</strong></div><p>Cada número desenhado sobre um ecrã corresponde ao passo com o mesmo número na lista de passos.</p></div>
        <div><div class="row"><span class="ui">Texto verde-lima</span></div><p>Indica um texto que aparece no ecrã — o nome de um botão, separador ou opção, ou uma mensagem — tal como surge na app.</p></div>
      </div>
      <div class="note"><span class="kicker">Nota</span>As imagens deste guia são ilustrativas. O programa, os oradores e os participantes apresentados são de demonstração e serão substituídos pelos dados reais do evento.</div>`),

  install: (p, i) =>
    shell(p, i, `<h2 class="section-title">Aceder e instalar a app</h2>
      <p class="intro">A app funciona em qualquer telemóvel, tablet ou computador com um browser atualizado e ligação à internet. Não precisa de palavra-passe.</p>
      <div class="access"><div><span class="kicker">Abrir no browser</span><p class="url">${esc(META.appUrl.replace('https://', ''))}</p><p>Aponte a câmara do telemóvel para o código QR ou escreva o endereço no browser.</p></div><div class="code">${qr(META.appUrl)}</div></div>
      <div class="platforms">
        <div class="platform"><h3>iPhone</h3><span class="kicker">Safari</span>${stepList([
          'Abra o endereço da app no Safari.',
          'Toque no botão Partilhar {{icon:Share}} na barra do Safari. Nas versões mais recentes do iOS, toque primeiro em ⋯ e depois em [[Partilhar]].',
          'Escolha [[Adicionar ao ecrã principal]] (pode ter de deslizar a lista de opções).',
          'Toque em [[Adicionar]]. O ícone da ion aparece no ecrã principal e a app abre em ecrã inteiro.',
        ])}</div>
        <div class="platform"><h3>Android</h3><span class="kicker">Chrome</span>${stepList([
          'Abra o endereço da app no Chrome.',
          'Toque no menu {{icon:EllipsisVertical}}, no canto superior direito.',
          'Escolha [[Instalar app]] ou [[Adicionar ao ecrã principal]].',
          'Confirme. O ícone da ion aparece no ecrã principal, como qualquer outra app.',
        ])}</div>
      </div>
      <div class="note"><span class="kicker">Antes de se registar</span>Registe-se no telemóvel que vai levar ao evento: a credencial fica guardada apenas nesse dispositivo. No iPhone, adicione primeiro a app ao ecrã principal e registe-se a partir do ícone da ion — o Safari e a app do ecrã principal guardam os dados em separado, e cada novo registo cria uma credencial com outro ID.</div>
      <div class="note"><span class="kicker">Sem rede à entrada?</span>Nesta versão, a app precisa de ligação à internet para abrir. Antes de chegar à acreditação, abra a <span class="ui">Credencial</span> enquanto tem rede e não feche a app.</div>
      <div class="tip"><span class="kicker">Apps nativas</span>Estão previstas versões nativas da app nas lojas de aplicações para iPhone e Android, com as mesmas funcionalidades descritas neste guia.</div>`),

  steps: (p, i) => shell(p, i, stepsPage(p)),

  troubleshooting: (p, i) =>
    shell(p, i, `<div class="faq">${TROUBLESHOOTING.map(
      (t) => `<div class="qa">${icon('CircleHelp')}<div><h3>${esc(t.q)}</h3><p>${md(t.a)}</p></div></div>`,
    ).join('')}</div>`),

  reference: (p, i) =>
    shell(p, i, `<table class="ref"><thead><tr><th>Quero…</th><th>Onde</th></tr></thead><tbody>${REFERENCE.map(
      ([want, path]) => `<tr><td>${esc(want)}</td><td>${path.map((x) => (x.startsWith('~') ? `<span>${esc(x.slice(1))}</span>` : `<span class="ui">${esc(x)}</span>`)).join('<span class="sep">›</span>')}</td></tr>`,
    ).join('')}</tbody></table>`),

  back: () => `<section class="page back">
    <img class="bubble-logo" src="${asset('images/logo-bubble.webp')}" alt="ion" />
    <h2>the best in sports unite with the best in business</h2>
    <p class="site">ionsportsbiz.com</p>
    <img class="markets" src="${asset('images/markets-strip.webp')}" alt="PT · UAE · WW · HK" />
    <p class="small">ion — International Business & Sports Conference · ${META.title} da app · ${META.edition}</p>
  </section>`,
};

const fontCss = [400, 500, 700, 800]
  .map((w) => `<link rel="stylesheet" href="${new URL(`node_modules/@fontsource/inter-tight/latin-${w}.css`, root).href}" />`)
  .join('');
const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8" /><title>ion — ${META.title}</title>
  ${fontCss}<link rel="stylesheet" href="${new URL('manual.css', import.meta.url).href}" /></head>
  <body>${GRAD_DEFS}${PAGES.map((p, i) => pages[p.type](p, i)).join('\n')}</body></html>`;

const htmlPath = new URL('manual.html', build);
await writeFile(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(htmlPath.href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Biggest phones that still fit: shrink each page's phones 1mm at a time until its body stops overflowing.
await page.evaluate(() => {
  for (const p of document.querySelectorAll('.page')) {
    const body = p.querySelector('.page-body');
    const phones = [...p.querySelectorAll('.phone')];
    if (!body || !phones.length) continue;
    let w = Number(phones[0].dataset.max);
    const min = Number(phones[0].dataset.min);
    while (body.scrollHeight > body.clientHeight + 1 && w > min) {
      w -= 1;
      phones.forEach((ph) => (ph.style.width = `${w}mm`));
    }
  }
});
// Fixed-size pages: anything taller than its page body would be clipped, so fail loudly.
const overflow = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].flatMap((p, i) => {
    const b = p.querySelector('.page-body');
    return b && b.scrollHeight > b.clientHeight + 1 ? [`page ${i + 1}: +${b.scrollHeight - b.clientHeight}px`] : [];
  }),
);
const broken = await page.evaluate(() => [...document.images].filter((im) => !im.naturalWidth).map((im) => im.src));
await page.pdf({ path: OUT_PDF, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();

console.log(`PDF: ${OUT_PDF} (${PAGES.length} pages)`);
if (broken.length) console.error('Broken images:', broken);
if (overflow.length) console.error('Overflowing pages:', overflow);
if (broken.length || overflow.length) process.exit(1);
