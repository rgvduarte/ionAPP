/* Deterministic timeline: window.render(t) draws the frame at t seconds.
   The live app runs in an iframe inside the phone; render() drives its
   navigation, scrolling and taps on schedule. The Node driver
   (render.mjs) calls render(t) once per frame and screenshots the stage. */
(() => {
  const CFG = window.CONFIG;
  const COPY = CFG.copy;
  const W = 417, H = 876, SCREEN_X = 12, SCREEN_Y = 12;

  // ---------- easing / keyframes ----------
  const E = {
    linear: (x) => x,
    inOut: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    out: (x) => 1 - Math.pow(1 - x, 4),
    in: (x) => x * x * x,
    soft: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
  };
  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  // keys: [{t, ...values, e?}] — values interpolate, `e` is the easing INTO that key.
  function at(keys, t) {
    if (t <= keys[0].t) return keys[0];
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (t <= b.t) {
        const p = (E[b.e || 'inOut'])(clamp01((t - a.t) / (b.t - a.t)));
        const out = {};
        for (const k in b) if (k !== 't' && k !== 'e') out[k] = (a[k] ?? b[k]) + ((b[k] ?? a[k]) - (a[k] ?? b[k])) * p;
        for (const k in a) if (!(k in out) && k !== 't' && k !== 'e') out[k] = a[k];
        return out;
      }
    }
    return keys[keys.length - 1];
  }
  const fade = (t, tin, tout, din = 0.7, dout = 0.5) =>
    t < tin || t > tout + dout ? 0 : t < tin + din ? E.out((t - tin) / din) : t > tout ? 1 - E.inOut((t - tout) / dout) : 1;

  // ---------- devices ----------
  const SIGNAL = '<svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1" fill="#fff"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1" fill="#fff"/><rect x="10" y="3" width="3.2" height="9" rx="1" fill="#fff"/><rect x="15" y="0" width="3.2" height="12" rx="1" fill="#fff"/></svg>';
  const WIFI = '<svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8.5.5 10.6 10.6 0 0 0 1 3.5l1.2 1.3a8.9 8.9 0 0 1 6.3-2.5Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3a7.1 7.1 0 0 0-9.8 0l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c-.5 0-1 .2-1.3.5L8.5 11.3l1.3-1.4c-.3-.3-.8-.5-1.3-.5Z" fill="#fff"/></svg>';
  const BATT = '<svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#fff" stroke-opacity=".4" fill="none"/><rect x="2" y="2" width="19" height="9" rx="2.2" fill="#fff"/><path d="M24 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="#fff" fill-opacity=".45"/></svg>';

  function makeDevice(id, { live = false, img = null } = {}) {
    const d = document.createElement('div');
    d.className = 'device';
    d.id = id;
    d.innerHTML = `<div class="frame"></div>
      <div class="btn" style="left:-7px;top:180px;height:34px"></div>
      <div class="btn" style="left:-7px;top:240px;height:64px"></div>
      <div class="btn" style="left:-7px;top:318px;height:64px"></div>
      <div class="btn" style="right:-7px;top:260px;height:100px"></div>
      <div class="screen">
        ${live ? `<iframe id="app" src="/app/index.html#/"></iframe>` : ''}
        <img class="static" ${img ? `src="${img}"` : ''} alt="" />
        <div class="status"><span>9:41</span><span class="icons">${SIGNAL}${WIFI}${BATT}</span></div>
        <div class="island"></div>
        <div class="toast"></div>
        <div class="homebar"></div>
      </div>`;
    document.getElementById('devices').appendChild(d);
    return d;
  }

  const live = makeDevice('live', { live: true, img: CFG.static.welcome });
  const mLeft = makeDevice('m-left', { img: CFG.static.agenda });
  const mCenter = makeDevice('m-center', { img: CFG.static.credential });
  const mRight = makeDevice('m-right', { img: CFG.static.networking });
  [mLeft, mCenter, mRight].forEach((d) => (d.querySelector('.static').style.opacity = 1));

  const place = (el, v) => {
    el.style.opacity = v.o ?? 1;
    el.style.transform = `translate(${v.x - W / 2}px, ${v.y - H / 2}px) scale(${v.s}) rotateX(${v.rx || 0}deg) rotateY(${v.ry || 0}deg)`;
  };
  // Screen-local (iframe CSS px) → stage px, for an unrotated device at state v.
  const toStage = (v, lx, ly) => ({ x: v.x + (SCREEN_X + lx - W / 2) * v.s, y: v.y + (SCREEN_Y + ly - H / 2) * v.s });

  // ---------- captions ----------
  const capsEl = document.getElementById('captions');
  const caps = COPY.captions.map((c) => {
    const el = document.createElement('div');
    el.className = 'cap' + (c.center ? ' center' : '');
    el.innerHTML = `<h1>${c.title}</h1>${c.sub ? `<p>${c.sub}</p>` : ''}`;
    capsEl.appendChild(el);
    return { ...c, el };
  });
  document.getElementById('intro-cap').innerHTML = COPY.intro;
  const montageCap = document.getElementById('montage-cap');
  montageCap.innerHTML = COPY.montage.map((w) => `<span>${w}</span>`).join(' ');
  const outro = document.getElementById('outro');
  outro.querySelector('.when').textContent = COPY.when;
  outro.querySelector('.avail').textContent = COPY.avail;
  outro.querySelector('.url').textContent = COPY.url;

  // ---------- live app helpers ----------
  const frame = document.getElementById('app');
  const win = () => frame.contentWindow;
  const doc = () => frame.contentDocument;
  const find = (sel, text) => [...doc().querySelectorAll(sel)].find((e) => !text || e.textContent.includes(text));

  // ---------- schedule ----------
  const QR = CFG.qr; // centre of the QR code in screen px
  const RIGHT = { x: 1290, y: 548, s: 1, o: 1 };
  const ZOOM = 1.8;
  const zoomAt = { x: 1350 - (SCREEN_X + QR.x - W / 2) * ZOOM, y: 540 - (SCREEN_Y + QR.y - H / 2) * ZOOM, s: ZOOM, o: 1 };

  const LIVE = [
    { t: 0, x: 960, y: 1650, s: 0.9, rx: 24, o: 0 },
    { t: 4.9, x: 960, y: 1650, s: 0.9, rx: 24, o: 0 },
    { t: 5.2, x: 960, y: 1450, s: 0.9, rx: 24, o: 1, e: 'linear' },
    { t: 6.9, x: 960, y: 548, s: 1, rx: 0, o: 1, e: 'out' },
    { t: 7.5, ...RIGHT, x: 960, rx: 0 },
    { t: 8.6, ...RIGHT, rx: 0 },
    { t: 25.3, ...RIGHT, rx: 0 },
    { t: 26.8, ...zoomAt, rx: 0 },
    { t: 28.9, ...zoomAt, rx: 0 },
    { t: 30.2, ...RIGHT, rx: 0 },
    { t: 44.8, ...RIGHT, rx: 0 },
    { t: 45.9, x: 960, y: 560, s: 0.84, o: 1, rx: 0 },
    { t: 46.3, x: 960, y: 560, s: 0.84, o: 0, rx: 0, e: 'linear' },
  ];
  const M_CENTER = [
    { t: 45.6, x: 960, y: 560, s: 0.84, o: 0 },
    { t: 46.2, x: 960, y: 560, s: 0.84, o: 1, e: 'linear' },
    { t: 50.4, x: 960, y: 572, s: 0.8, o: 1, e: 'soft' },
    { t: 51.3, x: 960, y: 600, s: 0.76, o: 0 },
  ];
  const side = (dir) => [
    { t: 45.6, x: 960, y: 580, s: 0.8, ry: 0, o: 0 },
    { t: 46.0, x: 960 + dir * 120, y: 580, s: 0.8, ry: 0, o: 1, e: 'linear' },
    { t: 47.2, x: 960 + dir * 470, y: 600, s: 0.78, ry: -dir * 16, o: 1, e: 'out' },
    { t: 50.4, x: 960 + dir * 500, y: 606, s: 0.76, ry: -dir * 18, o: 1, e: 'soft' },
    { t: 51.3, x: 960 + dir * 540, y: 630, s: 0.74, ry: -dir * 18, o: 0 },
  ];
  const M_LEFT = side(-1), M_RIGHT = side(1);

  // Welcome is a still (signed-out state); it dissolves into the live app.
  const STATIC_ON = [{ t: 0, o: 1 }, { t: 9.7, o: 1 }, { t: 10.4, o: 0 }];

  // Scroll windows inside the app [t0, t1, y0, y1]
  const SCROLL = [
    [11.0, 15.6, 0, 1480],
    [17.0, 17.9, 0, 170],
    [19.5, 20.5, 170, 0],
    [34.6, 36.6, 0, 250],
    [39.6, 40.6, 0, 290],
    [42.7, 43.9, 290, 560],
  ];
  const CHIPS = [[20.9, 21.9, 0, 300]];

  // Taps: element resolver, optional toast
  const TAPS = [
    { t: 16.1, el: () => doc().querySelectorAll('.tabbar a')[1] },
    { t: 18.5, el: () => find('.session-card', 'Four Markets')?.querySelector('.fav-btn') },
    { t: 22.5, el: () => find('.chips .chip', 'Business of Football') },
    { t: 24.8, el: () => doc().querySelector('.tabbar .tab-pass') },
    { t: 30.9, el: () => doc().querySelectorAll('.tabbar a')[3] },
    { t: 32.5, el: () => doc().querySelectorAll('.row-card')[0]?.querySelector('button'), toast: COPY.toastConnect },
    { t: 37.3, el: () => find('.row-card', 'Mei Chen')?.querySelector('.row-link') },
    { t: 38.9, el: () => find('.detail .actions button', COPY.meetButton) },
    { t: 41.2, el: () => find('.slot', '11:30') },
    { t: 42.2, el: () => find('.slot-picker button', COPY.sendButton), toast: COPY.toastMeeting },
  ];
  const TOAST_LEN = 2.0;

  // ---------- render ----------
  const done = new Set();
  const tapRects = new Map();
  const tapEl = document.getElementById('tap');
  const toastEl = live.querySelector('.toast');
  const liveStatic = live.querySelector('.static');

  window.render = (t) => {
    let changed = false;

    // background
    const bgO = t < 1 ? 0 : Math.min(1, (t - 1) / 3) * (t > 51 ? Math.max(0.35, 1 - (t - 51) / 2) : 1);
    const bg = document.getElementById('bgmap');
    bg.style.opacity = 0.22 * bgO;
    bg.style.transform = `translateX(${-t * 2.2}px)`;
    const gA = document.getElementById('glowA'), gB = document.getElementById('glowB');
    gA.style.opacity = gB.style.opacity = bgO;
    gA.style.transform = `translate(${-300 + Math.sin(t / 9) * 120}px, ${-500 + Math.cos(t / 11) * 80}px)`;
    gB.style.transform = `translate(${1000 + Math.cos(t / 10) * 140}px, ${300 + Math.sin(t / 8) * 90}px)`;

    // intro
    const logo = document.getElementById('intro-logo');
    const lIn = E.out(clamp01((t - 0.5) / 1.6));
    const lOut = E.inOut(clamp01((t - 4.1) / 0.8));
    logo.style.opacity = lIn * (1 - lOut);
    logo.style.transform = `scale(${0.86 + 0.14 * lIn + 0.06 * lOut})`;
    logo.style.filter = `blur(${(1 - lIn) * 14}px)`;
    const ic = document.getElementById('intro-cap');
    const icO = fade(t, 2.1, 4.0, 0.8, 0.6);
    ic.style.opacity = icO;
    ic.style.transform = `translateY(${(1 - E.out(clamp01((t - 2.1) / 0.8))) * 26}px)`;
    ic.style.filter = `blur(${(1 - icO) * 8}px)`;

    // devices
    const lv = at(LIVE, t);
    place(live, lv);
    liveStatic.style.opacity = at(STATIC_ON, t).o;
    place(mCenter, at(M_CENTER, t));
    place(mLeft, at(M_LEFT, t));
    place(mRight, at(M_RIGHT, t));

    // captions
    for (const c of caps) {
      const o = fade(t, c.in, c.out);
      c.el.style.opacity = o;
      const rise = (1 - E.out(clamp01((t - c.in) / 0.8))) * 34 - E.inOut(clamp01((t - c.out) / 0.5)) * 18;
      c.el.style.transform = `translateY(${rise}px)`;
      c.el.style.filter = `blur(${(1 - o) * 10}px)`;
    }
    const mO = fade(t, 46.0, 50.3, 0.7, 0.6);
    montageCap.style.opacity = mO;
    montageCap.style.transform = `translateY(${(1 - E.out(clamp01((t - 46) / 0.8))) * 24}px)`;
    [...montageCap.children].forEach((s, i) => {
      const lit = t >= 46.6 + i * 0.75;
      s.style.color = lit ? (i === 1 ? '#ccff00' : '#ffffff') : '#3a3a3c';
    });

    // outro
    const oO = fade(t, 51.4, 57.2, 1.0, 0.9);
    outro.style.opacity = oO;
    outro.style.transform = `scale(${1.04 - 0.04 * E.out(clamp01((t - 51.4) / 1.4))})`;
    document.getElementById('fade').style.opacity = t > 58.1 ? 1 : 0;

    // ---------- live app ----------
    if (doc() && doc().readyState !== 'loading') {
      for (const [t0, t1, y0, y1] of SCROLL) {
        if (t >= t0 && t <= t1 + 0.05) win().scrollTo(0, y0 + (y1 - y0) * E.inOut(clamp01((t - t0) / (t1 - t0))));
      }
      for (const [t0, t1, x0, x1] of CHIPS) {
        if (t >= t0 && t <= t1 + 0.05) {
          const chips = doc().querySelector('.chips');
          if (chips) chips.scrollLeft = x0 + (x1 - x0) * E.inOut(clamp01((t - t0) / (t1 - t0)));
        }
      }
      TAPS.forEach((tap, i) => {
        // Remember where the finger lands (the element may vanish after the tap).
        if (t >= tap.t - 0.3 && t < tap.t && !done.has(i)) {
          const el = tap.el();
          if (el) {
            const r = el.getBoundingClientRect();
            tapRects.set(i, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }
        }
        if (t >= tap.t && !done.has(i)) {
          const el = tap.el();
          if (!el) throw new Error(`tap ${i} target missing at t=${t}`);
          const r = el.getBoundingClientRect();
          if (!tapRects.has(i)) tapRects.set(i, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
          el.click();
          done.add(i);
          changed = true;
        }
      });
    }

    // touch indicator
    let tapShown = false;
    TAPS.forEach((tap, i) => {
      const d = t - tap.t;
      if (d < -0.25 || d > 0.45 || !tapRects.has(i)) return;
      const p = toStage(lv, tapRects.get(i).x, tapRects.get(i).y);
      const o = d < 0 ? E.out((d + 0.25) / 0.25) : 1 - E.out(d / 0.45);
      const s = d < 0 ? 0.7 + 0.3 * E.out((d + 0.25) / 0.25) : 1 + 0.35 * E.out(d / 0.45);
      tapEl.style.left = `${p.x}px`;
      tapEl.style.top = `${p.y}px`;
      tapEl.style.opacity = o;
      tapEl.style.transform = `scale(${s * lv.s})`;
      tapShown = true;
    });
    if (!tapShown) tapEl.style.opacity = 0;

    // toast replica (the app's own toast is timer-based, which breaks frame-by-frame capture)
    let toast = null;
    for (const tap of TAPS) if (tap.toast && t >= tap.t + 0.08 && t <= tap.t + TOAST_LEN + 0.3) toast = tap;
    if (toast) {
      const d = t - toast.t - 0.08;
      const o = d < 0.25 ? E.out(d / 0.25) : d > TOAST_LEN ? 1 - E.inOut((d - TOAST_LEN) / 0.3) : 1;
      toastEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${toast.toast}`;
      toastEl.style.opacity = o;
      toastEl.style.transform = `translate(-50%, ${(1 - o) * 18}px)`;
    } else toastEl.style.opacity = 0;

    return { changed };
  };
  window.stageReady = true;
})();
