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
    intro: 'Da primeira vez que abre a app, aparece o ecrã de boas-vindas. A app abre em português se o seu telemóvel estiver em português e em inglês nos restantes casos.',
    phones: [{ shot: 'welcome', marks: { 1: ['lang', 'l'], 2: 'cta' } }],
    steps: [
      'Para mudar de idioma, toque em [[PT]] ou [[EN]], no canto superior direito.',
      'Toque em [[Obter a minha credencial]] para começar o registo.',
    ],
    tip: 'Pode mudar o idioma em qualquer momento em [[Mais]] › [[Idioma]].',
  },
  {
    type: 'steps', chapter: '02',
    title: 'Criar o seu perfil',
    intro: 'Preencha os seus dados. Com eles, a app cria a sua credencial de acesso.',
    phones: [{ shot: 'register', marks: { 1: ['name', 'tr'], 2: ['email', 'tr'], 3: ['company', 'tr'], 4: ['sector', 'tr'], 5: ['ticket', 'tr'], 6: ['submit', 'tr'] } }],
    steps: [
      'Escreva o seu [[Nome completo]]. É o nome que aparece na sua credencial.',
      'Indique o seu [[Email]].',
      'Preencha a [[Empresa]] e o [[Cargo]].',
      'Escolha o seu [[Setor]] na lista — por exemplo, Clubes & Ligas, Investimento ou Media.',
      'Em [[Tipo de acesso (demo)]], escolha [[Passe VIP]] ou [[Passe Conferência]].',
      'Toque em [[Entrar]]. A sua credencial é criada neste dispositivo e a app abre no ecrã [[Início]].',
    ],
    note: 'Todos os campos de texto são obrigatórios. Nesta versão de demonstração, escolhe o tipo de acesso no registo e os dados ficam guardados apenas neste dispositivo. Na versão final, o tipo de passe é atribuído pela organização de acordo com a sua inscrição.',
  },

  // 03 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '03', opener: true,
    title: 'A barra de navegação',
    intro: 'A barra de navegação, na parte de baixo do ecrã, está sempre visível e tem cinco separadores. O separador ativo fica destacado a verde-lima.',
    phones: [{ shot: 'nav', marks: { 1: 'home', 2: 'agenda', 3: 'pass', 4: 'network', 5: ['more', 'tr'], 6: ['badge', 'above'] } }],
    steps: [
      '[[Início]] — resumo do evento, contagem decrescente e atalhos.',
      '[[Agenda]] — programa completo dos dois dias.',
      '[[Credencial]] — o botão central, em forma de balão, abre o seu código QR de acesso.',
      '[[Networking]] — pessoas, ligações e reuniões.',
      '[[Mais]] — perfil, oradores, parceiros, notícias, informações e definições.',
      'O número vermelho indica quantos pedidos de ligação ou de reunião aguardam a sua resposta.',
    ],
    tip: 'Nos ecrãs abertos a partir de outro (detalhes, listas de Oradores e Notícias, Parceiros, Informações & FAQ e Editar perfil) aparece uma seta [[‹]] no canto superior esquerdo para voltar ao ecrã anterior.',
  },

  // 04 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '04', opener: true,
    title: 'O ecrã Início',
    intro: 'O Início é o primeiro ecrã depois de entrar. Para lá voltar, toque em [[Início]] na barra de navegação.',
    phones: [{ shot: 'home', marks: { 1: 'hero', 2: ['countdown', 'tr'], 3: 'alert', 4: 'quick', 5: ['bell', 'tr'] } }],
    steps: [
      'No topo vê a identidade do evento: ion PT ’27, com a Liga Portugal como parceiro institucional, em março de 2027.',
      'A contagem decrescente mostra os dias, horas, minutos e segundos que faltam para o arranque, a 22 de março às 18:30. Quando o evento começa, dá lugar à mensagem [[A ion está a decorrer]].',
      'Se tiver pedidos de ligação ou de reunião por responder, aparece este aviso com o total. Toque nele para abrir as [[Ligações]] do Networking; os pedidos de reunião estão no separador [[Reuniões]].',
      'Atalhos rápidos para [[Credencial]], [[Agenda]], [[Networking]] e [[Oradores]] (desloque o ecrã para baixo para ver os dois últimos).',
      'O sino abre as [[Notícias]].',
    ],
    note: 'Para que possa experimentar todas as funções, a conta de demonstração já inclui exemplos: duas sessões marcadas com estrela, um pedido de ligação de Faisal Rahman, uma ligação com Beatriz Nunes e um pedido de reunião de Sarah Collins.',
  },
  {
    type: 'steps', chapter: '04',
    title: 'Os dois dias e as suas sessões',
    intro: 'Desloque o ecrã para baixo para ver o resto do Início.',
    phones: [
      { shot: 'home-days', marks: { 1: 'about', 2: 'day22' } },
      { shot: 'home-sessions', marks: { 3: 'stats', 4: ['card', 'l'], 5: ['star', 'tr'], 6: ['seeAll', 'l'] } },
    ],
    steps: [
      'Conheça a história da ion: de evento anual em Portugal, desde 2021, a encontros de networking em quatro mercados em 2027.',
      'Toque no cartão do dia 22 (VIP Gala Dinner e Awards Ceremony) ou do dia 23 (ion Conference e VIP Lunch) para abrir a agenda desse dia. Os cartões estão na secção [[Dois dias. Um ecossistema.]]',
      'Os números do evento: 5 palcos temáticos, mais de 90 oradores e 650 convidados.',
      '[[As minhas sessões]] mostra até três das sessões que marcou com estrela, por ordem de horário. Toque numa para ver o detalhe.',
      'Toque na estrela para retirar a sessão da sua agenda.',
      '[[Ver tudo]] abre a Agenda só com as suas sessões do dia 23. Toque em [[22]] para ver as do dia 22.',
    ],
  },
  {
    type: 'steps', chapter: '04',
    title: 'Citações, notícias e galeria',
    phones: [
      { shot: 'home-news', marks: { 1: 'quotes', 2: 'news', 3: ['seeAll', 'l'] } },
      { shot: 'home-gallery', marks: { 4: 'gallery', 5: ['partner', 'tr'] } },
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
    phones: [{ shot: 'agenda', marks: { 1: 'days', 2: ['time', 'l'], 3: ['card', 'l'], 4: ['star', 'tr'], 5: 'mine', 6: ['stages', 'tr'] } }],
    steps: [
      'Escolha o dia: [[22]] (noite VIP: Gala Dinner e Awards Ceremony) ou [[23]] (ion Conference).',
      'As sessões estão agrupadas pela hora de início. À mesma hora podem decorrer sessões em palcos diferentes.',
      'Cada cartão mostra o horário, o título, o palco (com a cor do palco), a etiqueta [[VIP]] quando a sessão é exclusiva e os oradores. Toque no cartão para ver o detalhe.',
      'Toque na estrela ☆ para adicionar a sessão à sua agenda. A estrela fica preenchida a verde-lima; toque de novo para retirar.',
      '[[A minha agenda]] mostra apenas as sessões que marcou com estrela.',
      'Os filtros à direita de [[Todos]] mostram apenas as sessões de um palco (ver a página seguinte).',
    ],
    tip: 'Os horários estão sempre na hora de Lisboa, mesmo que o seu telemóvel esteja noutro fuso horário.',
  },
  {
    type: 'steps', chapter: '05',
    title: 'Filtrar por palco e ver a sua agenda',
    phones: [
      { shot: 'agenda-filter', marks: { 1: 'chip', 2: ['card', 'l'] } },
      { shot: 'agenda-mine', marks: { 3: 'mine', 4: ['list', 'l'], 5: 'day22' } },
    ],
    steps: [
      'Deslize a fila de filtros para o lado e toque num palco — por exemplo, [[Business of Football]]. O filtro ativo fica a branco.',
      'A lista mostra apenas as sessões desse palco. Para ver tudo de novo, toque em [[Todos]].',
      'Toque em [[A minha agenda]] para ver só as sessões do dia escolhido que marcou com estrela. Se tiver um palco selecionado, os dois filtros combinam-se.',
      'As suas sessões aparecem por ordem de horário.',
      'Pode mudar de dia sem desligar o filtro [[A minha agenda]]. Se não tiver sessões marcadas nesse dia, aparece a mensagem [[Nenhuma sessão corresponde a estes filtros.]] Ao mudar de dia, o filtro de palco volta a [[Todos]].',
    ],
    note: 'Os cinco palcos da conferência são [[ion Main Stage]], [[Business of Football]], [[Capital & Ownership]], [[Media, Tech & Fans]] e [[Performance & Health]]. Os momentos sociais decorrem no Networking Lounge e, a 22 de março, na Gala Venue.',
  },
  {
    type: 'steps', chapter: '05',
    title: 'Detalhe da sessão e calendário',
    phones: [{ shot: 'session', marks: { 1: 'facts', 2: 'fav', 3: 'cal', 4: ['speaker', 'tr'], 5: ['back', 'tr'] } }],
    steps: [
      'Veja o dia, o horário e o palco da sessão, seguidos da descrição.',
      '[[Adicionar à minha agenda]] marca a sessão com estrela (o botão passa a [[Na minha agenda]]). Toque de novo para retirar.',
      '[[Adicionar ao calendário]] descarrega a sessão num ficheiro de calendário (.ics). Veja abaixo como abrir o ficheiro.',
      'Em [[Oradores]], toque num nome para abrir o perfil do orador.',
      'Toque na seta [[‹]] para voltar ao ecrã anterior.',
    ],
    box: {
      title: 'Guardar a sessão no calendário do telemóvel',
      items: [
        '**iPhone:** depois de tocar em [[Adicionar ao calendário]], siga as indicações do iPhone para abrir o ficheiro e adicionar o evento ao Calendário.',
        '**Android:** abra o ficheiro descarregado (na notificação ou na pasta Transferências) e escolha a app de calendário, por exemplo o Google Calendar.',
        '**Computador:** abra o ficheiro .ics no Outlook ou no Calendário da Apple. No Google Calendar, importe-o em Definições › Importar e exportar.',
        '**Fuso horário:** no calendário, a sessão aparece na hora local do seu dispositivo; na app, os horários estão sempre na hora de Lisboa.',
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
      { shot: 'speaker', marks: { 3: 'head', 4: 'bio', 5: ['session', 'tr'] } },
    ],
    steps: [
      'Pesquise por nome, empresa ou cargo.',
      'Toque num orador para abrir o perfil.',
      'Veja o nome, o cargo, a empresa e o país.',
      'Leia a biografia do orador.',
      'Em [[Sessões]] encontra todas as intervenções do orador: toque na estrela de uma sessão para a adicionar à sua agenda ou no cartão para ver o detalhe.',
    ],
  },

  // 07 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '07', opener: true,
    title: 'A sua credencial de acesso',
    intro: 'A credencial é o seu bilhete para o evento. É nominal e intransmissível.',
    phones: [{ shot: 'credential', marks: { 1: ['tab', 'tr'], 2: ['type', 'tr'], 3: 'qr', 4: 'name', 5: ['id', 'l'] } }],
    steps: [
      'Toque no botão central [[Credencial]] da barra de navegação, a partir de qualquer ecrã.',
      'No topo vê o tipo de passe: [[Passe VIP]] ou [[Passe Conferência]].',
      'À entrada, mostre este código QR à equipa de acreditação.',
      'Por baixo aparecem o seu nome, cargo e empresa.',
      'O [[ID da credencial]] identifica-o se o código não puder ser lido.',
    ],
    tip: 'Abra a credencial antes de chegar à entrada, enquanto tem rede, e não feche a app: nesta versão, a app precisa de ligação à internet para abrir.',
  },
  {
    type: 'steps', chapter: '07',
    title: 'À entrada e o que inclui o seu passe',
    phones: [{ shot: 'credential-access', marks: { 1: 'hint', 2: ['access', 'tr'] } }],
    steps: [
      'Aumente o brilho do ecrã antes de apresentar o código.',
      'Em [[Acesso]] vê os momentos incluídos no seu passe.',
    ],
    passes: true,
  },

  // 08 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '08', opener: true,
    title: 'Encontrar pessoas',
    intro: 'O Networking tem três separadores: [[Pessoas]], [[Ligações]] e [[Reuniões]]. Os indicadores vermelhos mostram pedidos por responder: um número em [[Ligações]] e um ponto de exclamação em [[Reuniões]].',
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
      'O botão passa a mostrar uma ampulheta {{icon:Hourglass}} (no perfil da pessoa aparece [[Pendente]]): o pedido fica pendente até a outra pessoa responder.',
      'Aparece a confirmação [[Pedido de ligação enviado]].',
    ],
    legend: true,
    note: 'Nesta versão de demonstração ninguém responde aos pedidos que envia: os pedidos de ligação ficam pendentes e os de reunião ficam [[A aguardar resposta]]. Um pedido enviado não pode ser cancelado.',
  },
  {
    type: 'steps', chapter: '08',
    title: 'Responder a pedidos de ligação',
    phones: [{ shot: 'net-connections', marks: { 1: 'tab', 2: ['label', 'l'], 3: 'accept', 4: ['decline', 'tr'], 5: ['pending', 'tr'], 6: ['connected', 'tr'] } }],
    steps: [
      'Toque em [[Ligações]] — ou no aviso de pedidos pendentes do Início.',
      'Os pedidos recebidos aparecem primeiro, com a indicação [[Quer ligar-se a si]].',
      'Toque em ✓ para aceitar. Aparece a confirmação [[Aceite]] e a ligação passa ao estado [[Ligado]] (na lista, o ícone {{icon:UserCheck}}).',
      'Toque em ✕ para recusar. O pedido desaparece da lista.',
      'Os pedidos que enviou e que aguardam resposta mostram a ampulheta {{icon:Hourglass}}.',
      'As ligações aceites mostram o ícone {{icon:UserCheck}}.',
    ],
    tip: 'Também pode responder no perfil da pessoa: toque em [[Aceitar]] ou em ✕.',
  },
  {
    type: 'steps', chapter: '08',
    title: 'Pedir uma reunião 1:1',
    intro: 'As reuniões 1:1 decorrem no Networking Lounge, a 23 de março. Não precisa de estar ligado à pessoa para pedir uma reunião.',
    phones: [
      { shot: 'attendee', marks: { 1: 'head', 2: ['meet', 'tr'] } },
      { shot: 'slot', marks: { 3: 'chosen', 4: ['send', 'tr'], 5: 'cancel' } },
      { shot: 'slot-sent', marks: { 6: ['meeting', 'tr'], 7: 'toast' } },
    ],
    steps: [
      'Abra o perfil da pessoa (em [[Pessoas]] ou [[Ligações]]). No topo vê o nome, o cargo, a empresa e o país; por baixo, o setor, a descrição e os [[Interesses]].',
      'Toque em [[Pedir reunião 1:1]].',
      'Escolha um horário. Os horários em que já tem uma reunião ou um pedido de reunião (enviado ou recebido) aparecem esbatidos e não podem ser escolhidos.',
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
      { shot: 'meetings', marks: { 1: ['tab', 'tr'], 2: 'outgoing', 3: 'incoming', 4: ['accept', 'tr'], 5: ['decline', 'br'] } },
      { shot: 'meetings-confirmed', marks: { 6: 'confirmed', 7: ['tab', 'tr'] } },
    ],
    steps: [
      'Toque em [[Reuniões]]. As reuniões aparecem por ordem de horário.',
      'Pedidos que enviou: [[Reunião com]] e o estado [[A aguardar resposta]].',
      'Pedidos recebidos: [[Pedido de reunião]], com contorno vermelho.',
      'Toque em [[Aceitar]] para confirmar a reunião. Aparece a confirmação [[Aceite]].',
      'Toque em [[Recusar]] para a rejeitar. O pedido é removido.',
      'A reunião aceite fica com contorno verde-lima e o estado [[Confirmada]].',
      'O número vermelho do Networking diminui à medida que responde aos pedidos (aqui, de 2 para 1).',
    ],
    tip: 'Toque no nome da pessoa num cartão de reunião para abrir o perfil dela.',
  },

  // 09 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '09', opener: true,
    title: 'Ler as notícias',
    intro: 'Abra as notícias pelo sino no topo do Início, por [[Ver tudo]] na secção [[Notícias]] do Início, ou em [[Mais]] › [[Notícias]].',
    phones: [
      { shot: 'news', marks: { 1: 'item' } },
      { shot: 'news-detail', marks: { 2: ['title', 'tr'], 3: ['back', 'tr'] } },
    ],
    steps: [
      'Toque numa notícia da lista. Cada uma mostra a data, o título e um resumo.',
      'Leia a notícia completa.',
      'Toque na seta para voltar.',
    ],
    note: 'As notícias, o programa e os perfis de oradores e participantes estão em inglês, mesmo com a app em português.',
  },

  // 10 ─────────────────────────────────────────────
  {
    type: 'steps', chapter: '10', opener: true,
    title: 'O menu Mais',
    intro: 'Toque em [[Mais]] na barra de navegação.',
    phones: [{ shot: 'more', marks: { 1: 'me', 2: 'menu', 3: ['lang', 'l'], 4: 'site', 5: 'contact', 6: 'logout' } }],
    steps: [
      'O cartão de perfil mostra o seu nome, cargo, empresa e tipo de passe. Toque nele para editar os seus dados.',
      'Atalhos para [[A minha agenda]] (abre no dia 23), [[Oradores]], [[Parceiros]], [[Notícias]] e [[Informações & FAQ]].',
      '[[Idioma]]: toque em [[PT]] ou [[EN]].',
      '[[ionsportsbiz.com]] abre o site oficial da ion.',
      '[[Contactar a organização]] abre a página de contactos.',
      '[[Terminar sessão (apaga dados demo)]] apaga de imediato os seus dados neste dispositivo, sem pedir confirmação, e volta ao ecrã de boas-vindas.',
    ],
    note: 'Ao terminar sessão perde o perfil, a credencial, as sessões que marcou com estrela, as ligações e as reuniões guardadas neste dispositivo — nesta versão, os dados não são guardados num servidor. Se voltar a registar-se, é criada uma credencial nova, com outro [[ID da credencial]] e outro código QR, e a conta volta a ter os exemplos de demonstração. A preferência de idioma mantém-se.',
  },
  {
    type: 'steps', chapter: '10',
    title: 'Editar o perfil e mudar o idioma',
    phones: [
      { shot: 'profile', marks: { 1: 'fields', 2: 'save' } },
      { shot: 'more-en', marks: { 3: ['lang', 'l'], 4: 'tabbar' } },
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
  { icon: 'CalendarCheck', title: 'Reuniões 1:1', text: 'Peça reuniões 1:1 no Networking Lounge.' },
  { icon: 'Newspaper', title: 'Notícias e informações', text: 'Novidades, parceiros e perguntas frequentes.' },
];

export const PASSES = [
  { name: 'Passe VIP', items: ['VIP Gala Dinner · 22/03', 'Awards Ceremony · 22/03', 'ion Conference · 23/03', 'VIP Lunch · 23/03', 'Closing Cocktail · 23/03'] },
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
  { q: 'A app não abre sem internet', a: 'Nesta versão, a app precisa de ligação à internet para abrir. Abra a [[Credencial]] antes de chegar à entrada, enquanto tem rede, e não feche a app. Se não conseguir, indique o seu nome à equipa de acreditação.' },
  { q: 'A app voltou ao ecrã de boas-vindas', a: 'Pode ter tocado em [[Terminar sessão (apaga dados demo)]], os dados do browser podem ter sido apagados (também acontece em navegação privada) ou, no iPhone, pode ter aberto a app pelo ícone do ecrã principal depois de se ter registado no Safari — o ícone e o Safari não partilham dados. O Safari pode também apagar os dados de sites que não abre há vários dias. Registe-se de novo.' },
  { q: 'Não vejo as minhas sessões noutro dispositivo', a: 'Os seus dados ficam no dispositivo e no browser onde se registou. No iPhone, a app instalada no ecrã principal não partilha dados com o Safari: instale a app primeiro, registe-se a partir do ícone e use sempre o ícone.' },
  { q: 'Os horários parecem diferentes', a: 'Na app, todos os horários estão na hora de Lisboa, para coincidirem com o evento. No calendário do telemóvel (ficheiro .ics), a sessão aparece convertida para o fuso horário do telemóvel: é o mesmo momento, apresentado na sua hora local.' },
  { q: 'A app está noutro idioma', a: 'Vá a [[Mais]] › [[Idioma]] e toque em [[PT]] ou [[EN]].' },
  { q: 'Aparece um indicador vermelho no Networking', a: 'Tem pedidos de ligação ou de reunião por responder. Veja os separadores [[Ligações]] e [[Reuniões]].' },
  { q: 'Não consigo escolher um horário de reunião', a: 'Os horários esbatidos já estão ocupados por uma reunião sua ou por um pedido de reunião ainda sem resposta (enviado ou recebido). Escolha outro horário — se recusar um pedido recebido, esse horário fica livre.' },
  { q: 'Preciso de ajuda', a: 'Em [[Mais]] › [[Contactar a organização]] encontra os contactos da equipa da ion.' },
];

// Path entries starting with '~' are descriptions, not on-screen labels.
export const REFERENCE = [
  ['Mostrar o meu código de acesso', ['Credencial']],
  ['Ver o programa de um dia', ['Agenda', '~22 ou 23']],
  ['Adicionar uma sessão à minha agenda', ['Agenda', '~☆ na sessão']],
  ['Ver só as minhas sessões', ['Agenda', 'A minha agenda']],
  ['Ver as sessões de um palco', ['Agenda', '~filtro do palco']],
  ['Adicionar uma sessão ao calendário', ['Agenda', '~toque na sessão', 'Adicionar ao calendário']],
  ['Conhecer um orador', ['Mais', 'Oradores']],
  ['Encontrar pessoas de um setor', ['Networking', 'Pessoas', '~filtro do setor']],
  ['Pedir uma ligação', ['Networking', 'Ligar']],
  ['Aceitar ou recusar um pedido', ['Networking', 'Ligações', '~✓ ou ✕']],
  ['Pedir uma reunião 1:1', ['Networking', 'Pessoas', '~toque no nome', 'Pedir reunião 1:1']],
  ['Responder a um pedido de reunião', ['Networking', 'Reuniões', 'Aceitar / Recusar']],
  ['Ler as notícias', ['Início', '~sino']],
  ['Atualizar os meus dados', ['Mais', '~cartão de perfil']],
  ['Mudar o idioma', ['Mais', 'Idioma']],
  ['Tirar dúvidas', ['Mais', 'Informações & FAQ']],
  ['Contactar a organização', ['Mais', 'Contactar a organização']],
];
