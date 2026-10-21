// Every screenshot used in the manual, in capture order (one browser session,
// so state carries over: register → favourites → networking requests…).
// `targets` maps a name to a Playwright locator; capture.mjs records each
// target's box so the manual can draw numbered callouts over the image.

const scrollTo = (selector, offset = 72) => async (page) => {
  await page.locator(selector).first().evaluate((el, off) => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off), offset);
};

const go = (hash) => async (page) => {
  await page.evaluate((h) => { location.hash = h; }, hash);
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));
};

export const SHOTS = [
  {
    id: 'welcome',
    setup: async () => {},
    targets: {
      lang: (p) => p.locator('.welcome-lang'),
      cta: (p) => p.getByRole('button', { name: 'Obter a minha credencial' }),
    },
  },
  {
    id: 'register',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Obter a minha credencial' }).click();
      await p.fill('input[autocomplete=name]', 'Ana Costa');
      await p.fill('input[type=email]', 'ana.costa@exemplo.pt');
      await p.fill('input[autocomplete=organization]', 'Exemplo Sports');
      await p.fill('input[autocomplete=organization-title]', 'Head of Partnerships');
      await p.locator('select').first().selectOption('brands');
      await p.locator('input[autocomplete=name]').blur();
      await p.locator('input[autocomplete=organization-title]').evaluate((el) => { el.setSelectionRange(0, 0); el.scrollLeft = 0; });
      await scrollTo('.form', 24)(p);
    },
    targets: {
      name: (p) => p.locator('.form label', { hasText: 'Nome completo' }),
      email: (p) => p.locator('.form label', { hasText: 'Email' }),
      company: (p) => p.locator('.form-row'),
      sector: (p) => p.locator('.form label', { hasText: 'Setor' }),
      ticket: (p) => p.locator('.form label', { hasText: 'Tipo de acesso' }),
      submit: (p) => p.getByRole('button', { name: 'Entrar' }),
    },
  },
  {
    id: 'home',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Entrar' }).click();
      await p.waitForSelector('.countdown');
      await p.waitForTimeout(400);
    },
    targets: {
      bell: (p) => p.locator('.topbar a[aria-label="Notícias"]'),
      countdown: (p) => p.locator('.countdown'),
      alert: (p) => p.locator('.alert'),
      quick: (p) => p.locator('.quick'),
      hero: (p) => p.locator('.hero'),
    },
  },
  {
    id: 'nav',
    setup: async () => {},
    targets: {
      home: (p) => p.locator('.tabbar a').nth(0),
      agenda: (p) => p.locator('.tabbar a').nth(1),
      pass: (p) => p.locator('.tabbar a').nth(2),
      network: (p) => p.locator('.tabbar a').nth(3),
      more: (p) => p.locator('.tabbar a').nth(4),
      badge: (p) => p.locator('.tabbar .badge'),
    },
  },
  {
    id: 'home-days',
    setup: scrollTo('.about'),
    targets: {
      about: (p) => p.locator('.about'),
      day22: (p) => p.locator('.day-card').nth(0),
    },
  },
  {
    id: 'home-sessions',
    setup: scrollTo('.stats'),
    targets: {
      stats: (p) => p.locator('.stats'),
      seeAll: (p) => p.locator('a.link[href="#/agenda?mine=1"]'),
      card: (p) => p.locator('.home .session-card').nth(0).locator('.session-main'),
      star: (p) => p.locator('.home .session-card').nth(0).locator('.fav-btn'),
    },
  },
  {
    id: 'home-news',
    setup: scrollTo('.quotes', 64),
    targets: {
      quotes: (p) => p.locator('.quotes'),
      seeAll: (p) => p.locator('a.link[href="#/news"]'),
      news: (p) => p.locator('.news-card').nth(0).locator('img'),
    },
  },
  {
    id: 'home-gallery',
    setup: scrollTo('.partner-strip', 500),
    targets: {
      gallery: (p) => p.locator('.gallery'),
      partner: (p) => p.locator('.partner-name'),
    },
  },
  {
    id: 'agenda',
    setup: go('#/agenda'),
    targets: {
      days: (p) => p.locator('.day-tabs'),
      mine: (p) => p.locator('.chips .chip').nth(0),
      stages: (p) => p.locator('.chips .chip').nth(2),
      card: (p) => p.locator('.session-card').nth(1).locator('.session-main'),
      star: (p) => p.locator('.session-card').nth(2).locator('.fav-btn'),
      time: (p) => p.locator('.time-label').nth(1),
    },
  },
  {
    id: 'agenda-filter',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Business of Football' }).click();
      await p.waitForTimeout(200);
      await p.evaluate(() => window.scrollTo(0, 0));
    },
    targets: {
      chip: (p) => p.locator('.chips .chip.active'),
      card: (p) => p.locator('.session-card').nth(0),
    },
  },
  {
    id: 'agenda-mine',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Todos' }).click();
      await p.locator('.chips .chip').nth(0).click();
      await p.waitForTimeout(200);
    },
    targets: {
      mine: (p) => p.locator('.chips .chip').nth(0),
      list: (p) => p.locator('.time-group').nth(0),
      day22: (p) => p.locator('.day-tab').nth(0),
    },
  },
  {
    id: 'session',
    setup: async (p) => {
      await p.locator('.chips .chip').nth(0).click(); // leave "my agenda" filter off
      await go('#/agenda/c3')(p);
    },
    targets: {
      back: (p) => p.locator('.topbar .icon-btn'),
      facts: (p) => p.locator('.facts'),
      fav: (p) => p.locator('.detail .actions .btn').nth(0),
      cal: (p) => p.locator('.detail .actions .btn').nth(1),
      speaker: (p) => p.locator('.detail .row-card').nth(0),
    },
  },
  {
    id: 'speakers',
    setup: go('#/speakers'),
    targets: {
      search: (p) => p.locator('.search'),
      card: (p) => p.locator('.speaker-card').nth(0),
    },
  },
  {
    id: 'speaker',
    setup: go('#/speakers/sp1'),
    targets: {
      head: (p) => p.locator('.profile-head'),
      bio: (p) => p.locator('.detail .lead'),
      session: (p) => p.locator('.detail .session-card').nth(0),
    },
  },
  {
    id: 'credential',
    setup: go('#/credential'),
    targets: {
      tab: (p) => p.locator('.tabbar .tab-pass'),
      type: (p) => p.locator('.pass-type'),
      qr: (p) => p.locator('.pass-qr'),
      name: (p) => p.locator('.pass-name'),
      id: (p) => p.locator('.pass-id'),
      hint: (p) => p.locator('.hint'),
    },
  },
  {
    id: 'credential-access',
    setup: scrollTo('.hint', 260),
    targets: {
      access: (p) => p.locator('.access-list'),
      hint: (p) => p.locator('.hint'),
    },
  },
  {
    id: 'net-people',
    setup: go('#/networking'),
    targets: {
      tabs: (p) => p.locator('.segmented'),
      search: (p) => p.locator('.search'),
      chips: (p) => p.locator('.chips'),
      person: (p) => p.locator('.row-card').nth(0).locator('.row-link'),
      connect: (p) => p.locator('.row-card').nth(0).getByRole('button', { name: 'Ligar' }),
      incoming: (p) => p.locator('.row-card').nth(1).locator('.row-actions'),
    },
  },
  {
    id: 'net-sent',
    setup: async (p) => {
      await p.locator('.row-card').nth(0).getByRole('button', { name: 'Ligar' }).click();
      await p.waitForTimeout(350);
    },
    targets: {
      pending: (p) => p.locator('.row-card').nth(0).locator('.pill'),
      toast: (p) => p.locator('.toast'),
    },
  },
  {
    id: 'net-connections',
    setup: async (p) => {
      await p.waitForTimeout(2300); // let the toast go away
      await p.getByRole('tab', { name: /Ligações/ }).click();
      await p.waitForTimeout(200);
    },
    targets: {
      tab: (p) => p.getByRole('tab', { name: /Ligações/ }),
      label: (p) => p.locator('.row-card').nth(0).locator('.lime'),
      accept: (p) => p.locator('.row-card').nth(0).locator('button.btn-primary'),
      decline: (p) => p.locator('.row-card').nth(0).locator('button.btn-ghost'),
      pending: (p) => p.locator('.row-card').nth(1).locator('.pill'),
      connected: (p) => p.locator('.row-card').nth(2).locator('.pill'),
    },
  },
  {
    id: 'attendee',
    setup: go('#/networking/a3'),
    targets: {
      head: (p) => p.locator('.profile-head'),
      tags: (p) => p.locator('.tags'),
      connect: (p) => p.locator('.detail .actions').first().getByRole('button', { name: 'Ligar' }),
      meet: (p) => p.getByRole('button', { name: 'Pedir reunião 1:1' }),
    },
  },
  {
    id: 'slot',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Pedir reunião 1:1' }).click();
      await p.getByRole('button', { name: '11:30', exact: true }).click();
      await scrollTo('.detail .actions', 90)(p);
    },
    targets: {
      slots: (p) => p.locator('.slots'),
      chosen: (p) => p.locator('.slot.on'),
      send: (p) => p.getByRole('button', { name: 'Enviar pedido' }),
      cancel: (p) => p.getByRole('button', { name: 'Cancelar' }),
    },
  },
  {
    id: 'slot-sent',
    setup: async (p) => {
      await p.getByRole('button', { name: 'Enviar pedido' }).click();
      await p.waitForTimeout(300);
      await scrollTo('.meeting-card', 330)(p);
    },
    targets: {
      meeting: (p) => p.locator('.meeting-card').nth(0),
      toast: (p) => p.locator('.toast'),
    },
  },
  {
    id: 'meetings',
    setup: async (p) => {
      await p.waitForTimeout(2300);
      await go('#/networking?tab=meetings')(p);
    },
    targets: {
      tab: (p) => p.getByRole('tab', { name: /Reuniões/ }),
      outgoing: (p) => p.locator('.meeting-card.m-outgoing'),
      incoming: (p) => p.locator('.meeting-card.m-incoming'),
      accept: (p) => p.locator('.meeting-card.m-incoming').getByRole('button', { name: 'Aceitar' }),
      decline: (p) => p.locator('.meeting-card.m-incoming').getByRole('button', { name: 'Recusar' }),
    },
  },
  {
    id: 'meetings-confirmed',
    setup: async (p) => {
      await p.locator('.meeting-card.m-incoming').getByRole('button', { name: 'Aceitar' }).click();
      await p.waitForTimeout(350);
    },
    targets: {
      confirmed: (p) => p.locator('.meeting-card.m-confirmed'),
      toast: (p) => p.locator('.toast'),
      tab: (p) => p.locator('.tabbar a').nth(3),
    },
  },
  {
    id: 'news',
    setup: async (p) => {
      await p.waitForTimeout(2300);
      await go('#/news')(p);
    },
    targets: {
      item: (p) => p.locator('.news-item').nth(0),
      back: (p) => p.locator('.topbar .icon-btn'),
    },
  },
  {
    id: 'news-detail',
    setup: go('#/news/n1'),
    targets: {
      back: (p) => p.locator('.topbar .icon-btn'),
      title: (p) => p.locator('.detail h1'),
    },
  },
  {
    id: 'more',
    setup: go('#/more'),
    targets: {
      me: (p) => p.locator('.me-card'),
      menu: (p) => p.locator('nav.menu').nth(0),
      lang: (p) => p.locator('.lang-switch'),
      site: (p) => p.locator('nav.menu').nth(1).locator('a').nth(0),
      contact: (p) => p.locator('nav.menu').nth(1).locator('a').nth(1),
      logout: (p) => p.locator('nav.menu').nth(1).locator('button'),
    },
  },
  {
    id: 'profile',
    setup: go('#/more/profile'),
    targets: {
      form: (p) => p.locator('.form label').nth(0),
      fields: (p) => p.locator('.form'),
      save: (p) => p.getByRole('button', { name: 'Guardar' }),
    },
  },
  {
    id: 'more-en',
    setup: async (p) => {
      await go('#/more')(p);
      await p.locator('.lang-switch').getByRole('button', { name: 'EN' }).click();
      await p.waitForTimeout(200);
    },
    teardown: async (p) => {
      await p.locator('.lang-switch').getByRole('button', { name: 'PT' }).click();
    },
    targets: {
      lang: (p) => p.locator('.lang-switch'),
      tabbar: (p) => p.locator('.tabbar'),
    },
  },
  {
    id: 'partners',
    setup: go('#/partners'),
    targets: {
      card: (p) => p.locator('.partner-card'),
      tba: (p) => p.locator('.tba'),
    },
  },
  {
    id: 'info',
    setup: async (p) => {
      await go('#/info')(p);
      await p.locator('.faq summary').nth(0).click();
      await scrollTo('.info-grid', 72)(p);
    },
    targets: {
      when: (p) => p.locator('.info-grid'),
      faq: (p) => p.locator('.faq details').nth(0),
      more: (p) => p.locator('.faq details').nth(1),
    },
  },
];
