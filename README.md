# ion app

App oficial da **ion — International Business & Sports Conference** (PT ’27, 22–23 março 2027).
Inspirada na app da EXPOFUT: agenda, oradores, networking com reuniões 1:1 e credencial QR para acesso ao evento.
Identidade visual e imagens retiradas de [ionsportsbiz.com](https://www.ionsportsbiz.com/).

Uma única base de código serve **web (GitHub Pages / PWA)**, **iOS** e **Android** (via Capacitor).

## Funcionalidades

| Separador | O que faz |
|---|---|
| **Início** | Hero da marca, contagem decrescente, mercados (PT · UAE · WW · HK), dias 22/23, números (5 palcos, 90+ oradores, 650 convidados), as minhas sessões, citações, notícias, galeria *Pieces of 2026*, parceiro institucional |
| **Agenda** | Dias 22 e 23, filtro por palco, "a minha agenda" (favoritos), detalhe da sessão, exportar para calendário (.ics) |
| **Credencial** | QR nominal com tipo de passe (VIP / Conferência) e acessos incluídos |
| **Networking** | Diretório de participantes com pesquisa e filtro por setor, pedidos de ligação (enviar/aceitar/recusar), pedidos de reunião 1:1 com escolha de horário |
| **Mais** | Perfil, oradores, parceiros, notícias, informações & FAQ, idioma PT/EN, links para o site |

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve dist/
```

Stack: React 19 + TypeScript + Vite, React Router (hash routing), Capacitor 8. Sem backend: o estado do utilizador fica em `localStorage`.

### Onde editar conteúdo

- `src/data/event.ts` — datas, palcos, sessões, oradores, parceiros, citações, galeria
- `src/data/people.ts` — participantes do networking e horários de reunião
- `src/data/news.ts` — notícias
- `src/lib/i18n.tsx` — textos da interface em PT e EN
- `public/images/` — imagens da marca (otimizadas em WebP)

> **Atenção:** oradores, sessões e participantes são **dados de demonstração** (a app mostra um aviso enquanto `DEMO_CONTENT = true` em `src/data/event.ts`). Substituir pelo programa oficial antes de publicar.

## Deploy — GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` faz build e publica em cada push para `main` (ou manualmente em *Actions → Deploy to GitHub Pages → Run workflow*).

Configuração única no GitHub:
1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Repositório privado: o GitHub Pages só funciona em repositórios privados com plano **Pro / Team / Enterprise**. Em plano Free é preciso tornar o repositório público.

URL: `https://rgvduarte.github.io/ionAPP/`

## iOS e Android (Capacitor)

O `capacitor.config.ts` já está configurado (`com.ionsportsbiz.app`, `webDir: dist`).

```bash
# Android (requer Android Studio)
npx cap add android
npm run cap:android

# iOS (requer macOS + Xcode)
npx cap add ios
npm run cap:ios
```

Ícones da app em `public/icons/` (1024 px para as lojas). Para gerar todos os tamanhos nativos: `npx @capacitor/assets generate`.

## Próximos passos para produção

1. **Backend** (ex.: Supabase/Firebase): autenticação por email, registo/credenciação, programa editável, networking e reuniões reais em tempo real.
2. **Credencial segura**: QR assinado pelo servidor (não gerado no dispositivo) + leitor de QR para a equipa de acreditação.
3. **Notificações push** (`@capacitor/push-notifications`) para mudanças de agenda e pedidos de reunião.
4. **Wallet**: passe Apple Wallet / Google Wallet.
5. Mapa do recinto e lista de expositores/parceiros quando estiverem fechados.
