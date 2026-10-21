// Manual content (PT-PT). Markup: [[Label]] = on-screen label (lime), **x** = bold.
// For step pages, `phones[].marks` maps a step number to a target captured in
// shots.mjs (optionally [target, position]); step N's text is steps[N-1].

export const META = {
  title: 'Guia de utilização',
  subtitle: 'App ion · PT ’27',
  appUrl: 'https://rgvduarte.github.io/ionAPP/',
  edition: 'Outubro 2026',
};

export const CHAPTERS = [
  { n: '01', title: 'Bem-vindo à app ion' },
  { n: '02', title: 'Primeiro acesso' },
  { n: '03', title: 'Navegar na app' },
  { n: '04', title: 'Início' },
  { n: '05', title: 'Agenda' },
  { n: '06', title: 'Oradores' },
  { n: '07', title: 'Credencial' },
  { n: '08', title: 'Networking' },
  { n: '09', title: 'Notícias' },
  { n: '10', title: 'Mais' },
  { n: '11', title: 'Dicas e resolução de problemas' },
  { n: '12', title: 'Referência rápida' },
];

export const PAGES = [
  { type: 'cover' },
  { type: 'toc' },

  // 01 ─────────────────────────────────────────────
  { type: 'overview', chapter: '01', opener: true },
  { type: 'install', chapter: '01' },

  // 02 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '02', opener: true,
    title: 'Escolher o idioma e começar',
    intro: 'Na primeira vez que abre a app aparece o ecrã de boas-vindas. A app usa automaticamente o idioma do seu telemóvel — português ou inglês.',
    phones: [{ shot: 'welcome', marks: { 1: 'lang', 2: 'cta' } }],
    steps: [
      'Para mudar de idioma, toque em [[PT]] ou [[EN]], no canto superior direito.',
      'Toque em [[Obter a minha credencial]] para começar o registo.',
    ],
    tip: 'Pode mudar o idioma em qualquer momento em [[Mais]] › [[Idioma]].',
  },
  {
    type: 'steps', chapter: '02',
    title: 'Criar o seu perfil',
    intro: 'Preencha os seus dados. Com eles, a app cria a sua credencial de acesso e o seu perfil de networking.',
    phones: [{ shot: 'register', marks: { 1: 'name', 2: 'email', 3: 'company', 4: 'sector', 5: 'ticket', 6: ['submit', 'tr'] } }],
    steps: [
      'Escreva o seu [[Nome completo]]. É o nome que aparece na credencial e que os outros participantes veem.',
      'Indique o seu [[Email]].',
      'Preencha a [[Empresa]] e o [[Cargo]].',
      'Escolha o seu [[Setor]] na lista — por exemplo, Clubes & Ligas, Investimento ou Media. Ajuda os outros participantes a encontrá-lo no Networking.',
      'Em [[Tipo de acesso]], escolha [[Passe VIP]] ou [[Passe Conferência]].',
      'Toque em [[Entrar]]. A sua credencial é criada e a app abre no ecrã [[Início]].',
    ],
    note: 'Todos os campos de texto são obrigatórios. Nesta versão de demonstração é o utilizador que escolhe o tipo de acesso e os dados ficam guardados apenas neste dispositivo. Na versão final, o passe é atribuído pela organização de acordo com o seu bilhete.',
  },

  // 03 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '03', opener: true,
    title: 'A barra de navegação',
    intro: 'A barra de navegação, na parte de baixo do ecrã, está sempre visível e tem cinco separadores. O separador ativo fica destacado a verde-lima.',
    phones: [{ shot: 'nav', marks: { 1: 'home', 2: 'agenda', 3: ['pass', 'tr'], 4: 'network', 5: 'more', 6: ['badge', 'tr'] } }],
    steps: [
      '[[Início]] — resumo do evento, contagem decrescente e atalhos.',
      '[[Agenda]] — programa completo dos dois dias.',
      '[[Credencial]] — o botão central, em forma de balão, abre o seu código QR de acesso.',
      '[[Networking]] — pessoas, ligações e reuniões.',
      '[[Mais]] — perfil, oradores, parceiros, notícias, informações e definições.',
      'O número vermelho indica quantos pedidos de ligação ou de reunião aguardam a sua resposta.',
    ],
    tip: 'Nos ecrãs de detalhe (uma sessão, um orador, uma pessoa, uma notícia) aparece uma seta [[‹]] no canto superior esquerdo para voltar ao ecrã anterior.',
  },

  // 04 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '04', opener: true,
    title: 'O ecrã Início',
    intro: 'O Início é o primeiro ecrã depois de entrar. Para lá voltar, toque em [[Início]] na barra de navegação.',
    phones: [{ shot: 'home', marks: { 1: 'hero', 2: 'countdown', 3: 'alert', 4: 'quick', 5: ['bell', 'tr'] } }],
    steps: [
      'No topo vê a identidade do evento: ion PT ’27, com a Liga Portugal como parceiro institucional, em março de 2027.',
      'A contagem decrescente mostra os dias, horas, minutos e segundos que faltam para o arranque, a 22 de março.',
      'Se tiver pedidos por responder, aparece este aviso. Toque nele para ir diretamente às [[Ligações]] do Networking.',
      'Atalhos rápidos para [[Credencial]], [[Agenda]], [[Networking]] e [[Oradores]] (deslize para ver os dois de baixo).',
      'O sino abre as [[Notícias]].',
    ],
  },
  {
    type: 'steps', chapter: '04',
    title: 'Os dois dias e as suas sessões',
    intro: 'Deslize para baixo para ver o resto do ecrã Início.',
    phones: [
      { shot: 'home-days', marks: { 1: 'about', 2: 'day22' } },
      { shot: 'home-sessions', marks: { 3: 'stats', 4: 'card', 5: ['star', 'tr'], 6: ['seeAll', 'tr'] } },
    ],
    steps: [
      'Conheça a história da ion: de evento anual em Portugal, desde 2021, a encontros de networking em quatro mercados em 2027.',
      'Em [[Dois dias. Um ecossistema.]], toque no cartão do dia 22 (VIP Gala Dinner e Awards Ceremony) ou do dia 23 (ion Conference e VIP Lunch) para abrir a agenda desse dia.',
      'Os números do evento: 5 palcos temáticos, mais de 90 oradores e 650 convidados.',
      '[[As minhas sessões]] mostra até três das sessões que marcou com estrela, por ordem de horário. Toque numa para ver o detalhe.',
      'Toque na estrela para retirar a sessão da sua agenda.',
      '[[Ver tudo]] abre a Agenda apenas com as suas sessões.',
    ],
  },
  {
    type: 'steps', chapter: '04',
    title: 'Citações, notícias e galeria',
    phones: [
      { shot: 'home-news', marks: { 1: 'quotes', 2: 'news', 3: ['seeAll', 'tr'] } },
      { shot: 'home-gallery', marks: { 4: 'gallery', 5: 'partner' } },
    ],
    steps: [
      'Deslize as citações para o lado para ler as mensagens que inspiram a ion.',
      'Em [[Notícias]], deslize os cartões e toque num para ler a notícia completa.',
      '[[Ver tudo]] abre a lista com todas as notícias.',
      '[[Pieces of 2026]] reúne fotografias da edição anterior.',
      'No fim do ecrã, toque em [[Liga Portugal]] para abrir o site do parceiro institucional.',
    ],
  },

  // 05 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '05', opener: true,
    title: 'Consultar o programa',
    intro: 'Toque em [[Agenda]] na barra de navegação. A agenda abre no dia da conferência, 23 de março.',
    phones: [{ shot: 'agenda', marks: { 1: 'days', 2: 'time', 3: 'card', 4: ['star', 'tr'], 5: 'mine', 6: ['stages', 'tr'] } }],
    steps: [
      'Escolha o dia: [[22]] (noite VIP: Gala Dinner e Awards Ceremony) ou [[23]] (ion Conference).',
      'As sessões estão agrupadas pela hora de início. À mesma hora podem decorrer sessões em palcos diferentes.',
      'Cada cartão mostra o horário, o título, o palco (com a cor do palco), a etiqueta [[VIP]] quando a sessão é exclusiva e os oradores. Toque no cartão para ver o detalhe.',
      'Toque na estrela ☆ para adicionar a sessão à sua agenda. A estrela fica preenchida a verde-lima; toque de novo para retirar.',
      '[[A minha agenda]] mostra apenas as sessões que marcou com estrela.',
      'Os filtros seguintes mostram as sessões de cada palco (página seguinte).',
    ],
    tip: 'Os horários estão sempre na hora de Lisboa, mesmo que o seu telemóvel esteja noutro fuso horário.',
  },
  {
    type: 'steps', chapter: '05',
    title: 'Filtrar por palco e ver a sua agenda',
    phones: [
      { shot: 'agenda-filter', marks: { 1: 'chip', 2: 'card' } },
      { shot: 'agenda-mine', marks: { 3: 'mine', 4: 'list', 5: 'day22' } },
    ],
    steps: [
      'Deslize a fila de filtros para o lado e toque num palco — por exemplo, [[Business of Football]]. O filtro ativo fica a branco.',
      'A lista mostra apenas as sessões desse palco. Para ver tudo de novo, toque em [[Todos]].',
      'Toque em [[A minha agenda]] para ver só as sessões que marcou com estrela.',
      'As suas sessões aparecem por ordem de horário.',
      'Pode mudar de dia sem desligar o filtro [[A minha agenda]]. Ao mudar de dia, o filtro de palco volta a [[Todos]].',
    ],
    note: 'Palcos da conferência: ion Main Stage, Business of Football, Capital & Ownership, Media, Tech & Fans e Performance & Health. Os momentos sociais decorrem no Networking Lounge e, a 22 de março, na Gala Venue.',
  },
  {
    type: 'steps', chapter: '05',
    title: 'Detalhe da sessão e calendário',
    phones: [{ shot: 'session', marks: { 1: 'facts', 2: 'fav', 3: 'cal', 4: 'speaker', 5: ['back', 'tr'] } }],
    steps: [
      'Veja o dia, o horário e o palco da sessão, seguidos da descrição.',
      '[[Adicionar à minha agenda]] marca a sessão com estrela (o botão passa a [[Na minha agenda]]). Toque de novo para retirar.',
      '[[Adicionar ao calendário]] descarrega a sessão num ficheiro de calendário (.ics). Veja abaixo como abri-lo.',
      'Em [[Oradores]], toque num nome para abrir o perfil do orador.',
      'Toque na seta para voltar à agenda.',
    ],
    box: {
      title: 'Guardar a sessão no calendário do telemóvel',
      items: [
        '**iPhone:** depois de tocar em [[Adicionar ao calendário]], o iPhone mostra a sessão — toque em [[Adicionar]] para a guardar no Calendário.',
        '**Android:** abra o ficheiro descarregado (na notificação ou na pasta Transferências) e escolha a app de calendário, por exemplo o Google Calendar.',
        '**Computador:** abra o ficheiro .ics para o importar no Outlook, no Calendário da Apple ou no Google Calendar.',
      ],
    },
    note: 'Nas sessões exclusivas VIP aparece a indicação [[Exclusivo para titulares de passe VIP]].',
  },

  // 06 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '06', opener: true,
    title: 'Conhecer os oradores',
    intro: 'Abra a lista em [[Início]] › [[Oradores]] ou em [[Mais]] › [[Oradores]].',
    phones: [
      { shot: 'speakers', marks: { 1: 'search', 2: 'card' } },
      { shot: 'speaker', marks: { 3: 'head', 4: 'bio', 5: 'session' } },
    ],
    steps: [
      'Pesquise por nome, empresa ou cargo.',
      'Toque num orador para abrir o perfil.',
      'Veja o nome, o cargo, a empresa e o país.',
      'Leia a biografia do orador.',
      'Em [[Sessões]] encontra todas as intervenções do orador: toque na estrela para as adicionar à sua agenda ou no cartão para ver o detalhe.',
    ],
  },

  // 07 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '07', opener: true,
    title: 'A sua credencial de acesso',
    intro: 'A credencial é o seu bilhete para o evento. É nominal e intransmissível.',
    phones: [
      { shot: 'credential', marks: { 1: ['tab', 'tr'], 2: 'type', 3: 'qr', 4: 'name', 5: 'id' } },
      { shot: 'credential-access', marks: { 6: 'hint', 7: 'access' } },
    ],
    steps: [
      'Toque no botão central [[Credencial]] da barra de navegação, a partir de qualquer ecrã.',
      'No topo vê o tipo de passe: [[Passe VIP]] ou [[Passe Conferência]].',
      'À entrada, mostre este código QR à equipa de acreditação.',
      'Por baixo aparecem o seu nome, cargo e empresa.',
      'O [[ID da credencial]] identifica-o se o código não puder ser lido.',
      'Aumente o brilho do ecrã antes de apresentar o código.',
      'Em [[Acesso]] vê os momentos incluídos no seu passe.',
    ],
    passes: true,
  },

  // 08 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '08', opener: true,
    title: 'Encontrar pessoas',
    intro: 'O Networking tem três separadores: [[Pessoas]], [[Ligações]] e [[Reuniões]]. Os números vermelhos indicam pedidos por responder.',
    phones: [{ shot: 'net-people', marks: { 1: 'tabs', 2: 'search', 3: 'chips', 4: 'person', 5: ['connect', 'tr'], 6: ['incoming', 'tr'] } }],
    steps: [
      'Toque em [[Pessoas]] para ver o diretório de participantes.',
      'Pesquise por nome, empresa, cargo ou interesse — por exemplo, «Sponsorship».',
      'Filtre por setor: [[Clubes & Ligas]], [[Investimento]], [[Media]], [[Marcas]], [[Tecnologia]], [[Saúde]] ou [[Setor público & Recintos]]. Deslize a fila para ver todos.',
      'Toque no nome de uma pessoa para abrir o perfil.',
      '[[Ligar]] envia um pedido de ligação (página seguinte).',
      'Quando alguém lhe envia um pedido, aparecem os botões ✓ (aceitar) e ✕ (recusar).',
    ],
  },
  {
    type: 'steps', chapter: '08',
    title: 'Enviar um pedido de ligação',
    intro: 'Uma ligação é um contacto aceite pelas duas partes.',
    phones: [{ shot: 'net-sent', marks: { 2: ['pending', 'tr'], 3: 'toast' } }],
    steps: [
      'Toque em [[Ligar]] ao lado da pessoa, ou no perfil dela.',
      'O botão passa a mostrar uma ampulheta ⌛: o pedido fica [[Pendente]] até a outra pessoa responder.',
      'Aparece a confirmação [[Pedido de ligação enviado]].',
    ],
    legend: true,
  },
  {
    type: 'steps', chapter: '08',
    title: 'Responder a pedidos de ligação',
    phones: [{ shot: 'net-connections', marks: { 1: 'tab', 2: 'label', 3: ['accept', 'tr'], 4: ['decline', 'tr'], 5: ['pending', 'tr'], 6: ['connected', 'tr'] } }],
    steps: [
      'Toque em [[Ligações]] — ou no aviso de pedidos pendentes do Início.',
      'Os pedidos recebidos aparecem primeiro, com a indicação [[Quer ligar-se a si]].',
      'Toque em ✓ para aceitar. A pessoa passa a [[Ligado]] e aparece a confirmação [[Aceite]].',
      'Toque em ✕ para recusar. O pedido desaparece da lista.',
      'Os pedidos que enviou e que aguardam resposta mostram a ampulheta ⌛.',
      'As ligações aceites mostram o ícone de pessoa com visto.',
    ],
  },
  {
    type: 'steps', chapter: '08',
    title: 'Pedir uma reunião 1:1',
    intro: 'As reuniões 1:1 decorrem no Networking Lounge, a 23 de março. Não precisa de estar ligado à pessoa para pedir uma reunião.',
    phones: [
      { shot: 'attendee', marks: { 1: 'head', 2: 'meet' } },
      { shot: 'slot', marks: { 3: 'chosen', 4: ['send', 'tr'], 5: 'cancel' } },
      { shot: 'slot-sent', marks: { 6: 'meeting', 7: 'toast' } },
    ],
    steps: [
      'Abra o perfil da pessoa (em [[Pessoas]] ou [[Ligações]]) e veja o setor, a descrição e os interesses.',
      'Toque em [[Pedir reunião 1:1]].',
      'Escolha um horário. Os horários em que já tem uma reunião aparecem esbatidos e não podem ser escolhidos.',
      'Toque em [[Enviar pedido]].',
      '[[Cancelar]] fecha a escolha de horários sem enviar nada.',
      'A reunião aparece no perfil da pessoa, em [[Reuniões]], com o estado [[A aguardar resposta]].',
      'Aparece a confirmação [[Pedido de reunião enviado]].',
    ],
  },
  {
    type: 'steps', chapter: '08',
    title: 'Gerir as suas reuniões',
    phones: [
      { shot: 'meetings', marks: { 1: ['tab', 'tr'], 2: 'outgoing', 3: 'incoming', 4: ['accept', 'tr'], 5: ['decline', 'tr'] } },
      { shot: 'meetings-confirmed', marks: { 6: 'confirmed', 7: ['badge', 'tr'] } },
    ],
    steps: [
      'Toque em [[Reuniões]]. As reuniões aparecem por ordem de horário.',
      'Pedidos que enviou: [[Reunião com]] e o estado [[A aguardar resposta]].',
      'Pedidos recebidos: [[Pedido de reunião]], com contorno vermelho.',
      'Toque em [[Aceitar]] para confirmar a reunião.',
      'Toque em [[Recusar]] para a rejeitar. O pedido é removido.',
      'A reunião aceite fica com contorno verde-lima e o estado [[Confirmada]].',
      'O número vermelho do Networking diminui à medida que responde aos pedidos.',
    ],
    tip: 'Toque no nome da pessoa num cartão de reunião para abrir o perfil dela.',
  },

  // 09 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '09', opener: true,
    title: 'Ler as notícias',
    intro: 'Abra as notícias pelo sino no topo do Início, por [[Ver tudo]] na secção Notícias, ou em [[Mais]] › [[Notícias]].',
    phones: [
      { shot: 'news', marks: { 1: 'item' } },
      { shot: 'news-detail', marks: { 2: 'title', 3: ['back', 'tr'] } },
    ],
    steps: [
      'Toque numa notícia da lista. Cada uma mostra a data, o título e um resumo.',
      'Leia a notícia completa.',
      'Toque na seta para voltar.',
    ],
    note: 'As notícias e o programa são publicados em inglês, a língua oficial da conferência.',
  },

  // 10 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '10', opener: true,
    title: 'O menu Mais',
    intro: 'Toque em [[Mais]] na barra de navegação.',
    phones: [{ shot: 'more', marks: { 1: 'me', 2: 'menu', 3: ['lang', 'tr'], 4: 'site', 5: 'contact', 6: 'logout' } }],
    steps: [
      'O cartão de perfil mostra o seu nome, cargo, empresa e tipo de passe. Toque nele para editar os seus dados.',
      'Atalhos para [[A minha agenda]], [[Oradores]], [[Parceiros]], [[Notícias]] e [[Informações & FAQ]].',
      '[[Idioma]]: escolha PT ou EN.',
      '[[ionsportsbiz.com]] abre o site oficial da ion.',
      '[[Contactar a organização]] abre a página de contactos.',
      '[[Terminar sessão]] apaga os seus dados neste dispositivo e volta ao ecrã de boas-vindas.',
    ],
    note: 'Ao terminar sessão perde as sessões marcadas, as ligações e as reuniões guardadas neste dispositivo — nesta versão os dados não são guardados num servidor. A preferência de idioma mantém-se.',
  },
  {
    type: 'steps', chapter: '10',
    title: 'Editar o perfil e mudar o idioma',
    phones: [
      { shot: 'profile', marks: { 1: 'fields', 2: 'save' } },
      { shot: 'more-en', marks: { 3: ['lang', 'tr'], 4: 'tabbar' } },
    ],
    steps: [
      'Em [[Editar perfil]], altere o nome, o email, a empresa, o cargo ou o setor.',
      'Toque em [[Guardar]]. Aparece a confirmação [[Guardado]] e volta ao menu. A credencial passa a mostrar os novos dados.',
      'Em [[Idioma]], toque em [[EN]] para usar a app em inglês, ou em [[PT]] para português.',
      'A mudança é imediata em todos os ecrãs, incluindo a barra de navegação.',
    ],
    note: 'O tipo de passe não se altera no perfil.',
  },
  {
    type: 'steps', chapter: '10',
    title: 'Parceiros e Informações & FAQ',
    phones: [
      { shot: 'partners', marks: { 1: 'card', 2: 'tba' } },
      { shot: 'info', marks: { 3: 'when', 4: 'faq', 5: 'more' } },
    ],
    steps: [
      'Em [[Parceiros]], toque no cartão da Liga Portugal, parceiro institucional, para abrir o site.',
      'Os restantes parceiros serão anunciados.',
      'Em [[Informações & FAQ]] vê quando e onde decorre o evento.',
      'Toque numa pergunta para ver a resposta e toque de novo para a fechar.',
      'Há respostas sobre como entrar, o que inclui cada passe, como funcionam as reuniões e onde acontece a ion além de Portugal.',
    ],
  },

  // 11 ─────────────────────────────────────────────
  { type: 'troubleshooting', chapter: '11', opener: true },

  // 12 ─────────────────────────────────────────────
  { type: 'reference', chapter: '12', opener: true },

  { type: 'back' },
];

export const FEATURES = [
  { icon: 'QrCode', title: 'Credencial digital', text: 'O seu bilhete de entrada, sempre no telemóvel.' },
  { icon: 'CalendarDays', title: 'Agenda', text: 'O programa dos dois dias, filtros por palco e a sua agenda pessoal.' },
  { icon: 'Mic', title: 'Oradores', text: 'Perfis, biografias e sessões de cada orador.' },
  { icon: 'Users', title: 'Networking', text: 'Encontre participantes por setor e crie ligações.' },
  { icon: 'CalendarCheck', title: 'Reuniões 1:1', text: 'Marque reuniões no Networking Lounge.' },
  { icon: 'Newspaper', title: 'Notícias e informações', text: 'Novidades, parceiros e perguntas frequentes.' },
];

export const PASSES = [
  { name: 'Passe VIP', items: ['VIP Gala Dinner · 22/03', 'Awards Ceremony · 22/03', 'ion Conference · 23/03', 'VIP Lunch · 23/03'] },
  { name: 'Passe Conferência', items: ['ion Conference · 23/03', 'Networking Lunch · 23/03', 'Closing Cocktail · 23/03'] },
];

export const LEGEND = [
  { icon: 'UserPlus', label: 'Ligar', text: 'Ainda não está ligado. Toque para enviar um pedido.', style: 'outline' },
  { icon: 'Hourglass', label: 'Pendente', text: 'Pedido enviado, a aguardar resposta.', style: 'pill' },
  { icon: 'UserCheck', label: 'Ligado', text: 'Ligação aceite pelas duas partes.', style: 'pill-on' },
  { icon: 'Check', label: '✓  ✕', text: 'Pedido recebido: aceite (✓) ou recuse (✕).', style: 'pair' },
];

export const TROUBLESHOOTING = [
  { q: 'O código QR não é lido à entrada', a: 'Aumente o brilho do ecrã, limpe o ecrã e segure o telemóvel a 15–20 cm do leitor, sem reflexos. Se mesmo assim não funcionar, indique à equipa de acreditação o [[ID da credencial]] que aparece por baixo do código.' },
  { q: 'A app voltou ao ecrã de boas-vindas', a: 'Terminou sessão, ou os dados do browser foram apagados — também acontece em navegação privada. Registe-se de novo. Nesta versão, as sessões marcadas e o networking ficam guardados apenas no dispositivo.' },
  { q: 'Não vejo as minhas sessões noutro dispositivo', a: 'Os seus dados ficam no telemóvel ou computador onde se registou. Use sempre o mesmo dispositivo e o mesmo browser.' },
  { q: 'Os horários parecem diferentes', a: 'Todos os horários estão na hora de Lisboa, para coincidirem com o evento, mesmo que o seu telemóvel esteja noutro fuso horário.' },
  { q: 'O ficheiro do calendário não abre', a: 'Abra o ficheiro .ics a partir das Transferências (ou da notificação de download) e escolha a app de calendário.' },
  { q: 'A app está noutro idioma', a: 'Vá a [[Mais]] › [[Idioma]] e toque em [[PT]] ou [[EN]].' },
  { q: 'Aparece um número vermelho no Networking', a: 'Tem pedidos de ligação ou de reunião por responder. Veja os separadores [[Ligações]] e [[Reuniões]].' },
  { q: 'Não consigo escolher um horário de reunião', a: 'Os horários esbatidos já estão ocupados por outra reunião sua. Escolha outro horário.' },
  { q: 'Preciso de ajuda', a: 'Em [[Mais]] › [[Contactar a organização]] encontra os contactos da equipa da ion.' },
];

export const REFERENCE = [
  ['Mostrar o meu código de acesso', ['Credencial']],
  ['Ver o programa de um dia', ['Agenda', '22 ou 23']],
  ['Guardar uma sessão', ['Agenda', '☆ na sessão']],
  ['Ver só as minhas sessões', ['Agenda', 'A minha agenda']],
  ['Ver as sessões de um palco', ['Agenda', 'filtro do palco']],
  ['Pôr uma sessão no calendário', ['Sessão', 'Adicionar ao calendário']],
  ['Conhecer um orador', ['Mais', 'Oradores']],
  ['Encontrar pessoas de um setor', ['Networking', 'Pessoas', 'filtro do setor']],
  ['Pedir uma ligação', ['Networking', 'Ligar']],
  ['Aceitar ou recusar um pedido', ['Networking', 'Ligações', '✓ / ✕']],
  ['Marcar uma reunião', ['Perfil da pessoa', 'Pedir reunião 1:1']],
  ['Responder a um pedido de reunião', ['Networking', 'Reuniões', 'Aceitar / Recusar']],
  ['Ler as notícias', ['Início', 'sino']],
  ['Atualizar os meus dados', ['Mais', 'cartão de perfil']],
  ['Mudar o idioma', ['Mais', 'Idioma']],
  ['Tirar dúvidas', ['Mais', 'Informações & FAQ']],
  ['Contactar a organização', ['Mais', 'Contactar a organização']],
];
