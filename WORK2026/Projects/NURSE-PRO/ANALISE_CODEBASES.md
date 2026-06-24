# Análise Profunda dos Codebases: Plantão Pro e NursePro Dashboard

**Data da análise:** 2026-06-23
**Escopo:** Estrutura técnica completa de ambos os projetos

---

## 📱 PROJETO 1: Plantão Pro (plantao-pro2-main)

### 1. Stack Tecnológico Completo

| Camada            | Tecnologia                              |
|-------------------|-----------------------------------------|
| Framework         | React 18.3 (SPA, sem SSR)               |
| Build Tool        | Vite 5.4                                |
| Linguagem         | TypeScript 5.5                          |
| CSS               | Tailwind CSS 3.4 + PostCSS              |
| UI Icons          | lucide-react                            |
| Animações         | framer-motion 12.38                     |
| Backend/BaaS      | Supabase (client-side)                  |
| Analytics         | PostHog (planejado, código preparado)   |
| Autenticação      | Google OAuth (parcial)                  |
| PWA               | Service Worker + Web Manifest           |

**Arquivo de entrada:** `src/main.tsx` → renderiza `<App />` em `#root`
**HTML base:** `index.html` (lang="pt-BR", título "🟡 Plantão Pro")

---

### 2. Estrutura de Arquivos Principal

```
plantao-pro2-main/
├── index.html
├── package.json
├── vite.config.ts          # Vite com plugin React, exclude lucide-react
├── tailwind.config.js      # Paleta customizada (primary/secondary/accent/warning/neutral)
├── tsconfig.json
├── postcss.config.js
├── src/
│   ├── main.tsx            # Entry point com service worker
│   ├── App.tsx             # Componente raiz (SPA router interno)
│   ├── index.css
│   ├── data/               # Dados mockados/estáticos
│   │   ├── dictionary.ts
│   │   └── evolutionTemplates.ts
│   ├── components/
│   │   ├── Calculator.tsx          # Calculadora de medicação (gotas/min, diluição)
│   │   ├── Evolution.tsx           # Gerador de evoluções (16 categorias)
│   │   ├── Dictionary.tsx          # Dicionário de abreviações
│   │   ├── PricingPage.tsx         # Página de planos (Free/Premium R$29,90/mês)
│   │   ├── AdminAnalyticsDashboard.tsx
│   │   ├── Achievements.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNavigation.tsx
│   │   ├── DashboardHome.tsx
│   │   ├── GoogleLoginButton.tsx
│   │   ├── Onboarding.tsx + Onboarding/
│   │   ├── PaywallModal.tsx
│   │   ├── MissionsCard.tsx
│   │   ├── StreakCard.tsx
│   │   ├── GamificationCard.tsx
│   │   ├── MotivationalNotification.tsx
│   │   ├── NotificationScheduler.tsx
│   │   ├── UsageQuotaBar.tsx
│   │   └── WeatherWidget.tsx
│   ├── contexts/
│   │   └── SubscriptionContext.tsx  # Context de assinatura/freemium
│   ├── hooks/
│   │   ├── useGamification.ts      # Pontos, níveis, achievements
│   │   ├── useGoogleAuth.ts
│   │   ├── useNotifications.ts     # Notificações browser (Service Worker)
│   │   ├── useOnboardingStatus.ts
│   │   ├── useStreaks.ts
│   │   └── useWeather.ts
│   └── lib/
│       ├── supabaseClient.ts       # Cliente Supabase + interfaces TypeScript
│       ├── subscription.ts         # Lógica freemium (planos, limites, RPCs)
│       └── analytics.ts            # Wrapper PostHog
```

---

### 3. Funcionalidades Existentes (Módulos e Features)

#### Módulo: Calculadora (`Calculator.tsx`)
- **Modo Gotejamento:** Volume ÷ (Tempo × 3) → gotas/min
- **Modo Diluição:** Dose ÷ Concentração → ml
- Gating por freemium (`useFeature('calculator')`)
- Paywall quando limite excedido
- Integração com gamificação (awardFirstCalculationMission)
- Tracking de tempo economizado (localStorage)

#### Módulo: Evoluções (`Evolution.tsx`)
- 16 categorias clínicas: Plantão, Alta, Pós-Exame, Pós-Operatório, Cuidados Paliativos, Pediatria, Recepção, Manutenção, Neurologia, Cardiologia, Pneumologia, Gastrointestinal, Traumatologia, Hematologia, Dermatologia, Infecção
- Modo Categoria Única + Modo Múltiplas Categorias
- Templates pré-definidos (16 arquivos de templates em `data/evolutionTemplates.ts`)
- Copiar/Limpar rascunho
- Gating freemium (3 evoluções/dia no Free)

#### Módulo: Dicionário (`Dictionary.tsx`)
- Busca por abreviação ou termo completo
- Filtro por categoria
- Dados em `data/dictionary.ts`

#### Módulo: Gamificação (`Achievements.tsx`, `useGamification.ts`)
- Sistema de pontos: `app_open: 5`, `calculator_use: 10`, `evolution_use: 8`, `dictionary_use: 3`, etc.
- 4 níveis: Iniciante (0-199), Plantão Ativo (200-499), Profissional em Evolução (500-999), Elite do Plantão (1000+)
- Streak tracking (dias consecutivos)
- Achievements desbloqueáveis
- Tabelas Supabase: `user_points`, `user_streaks`, `user_achievements`, `point_events`

#### Módulo: Notificações Motivacionais (`useNotifications.ts`)
- Browser Notifications API
- Service Worker para push notifications
- Frases motivacionais por categoria
- Agendamento customizável (até 3 horários/dia)
- Anti-repetição: não repete quote em 3 dias
- Tabelas: `motivational_quotes`, `user_notifications_sent`, `user_profiles`

#### Módulo: Freemium / Assinatura (`SubscriptionContext.tsx`, `subscription.ts`)
- Plano FREE: 10 cálculos/dia, 3 evoluções/dia, histórico 30 dias
- Plano PREMIUM (R$29,90/mês ou R$299,90/ano): limites ilimitados
- Features premium: calculator_advanced, evolution_advanced, custom_templates, analytics, pdf_export
- RPCs Supabase: `get_current_user_subscription`, `is_feature_enabled`, `increment_feature_usage`
- Tabelas: `user_usage_limits`, `subscription_plans`
- Fallback localStorage para modo demo/sem Supabase
- Mock checkout via `nursepro_plan_override` no localStorage

#### Módulo: Onboarding
- Modal de boas-vindas
- Celebration overlay (canvas-confetti)
- Tracking: first_calculator_at, first_evolution_at, first_dictionary_at
- Tabela: `user_onboarding`

#### Módulo: Autenticação
- Google OAuth login (botão + hook `useGoogleAuth`)
- Google Client ID em variável de ambiente
- Sem login/senha tradicional (apenas Google)

#### Outros
- **WeatherWidget:** Widget de clima (OpenWeatherMap/MeteoAPI)
- **PricingPage:** Página de planos com toggle mensal/anual
- **AdminAnalyticsDashboard:** Dashboard de analytics básico
- **BottomNavigation:** Navegação inferior mobile

---

### 4. Banco de Dados / Backend (Supabase)

**Supabase Schema Esperado (inferido de código):**

```sql
-- Core Auth
auth.users (Supabase Auth padrão)

-- Perfil estendido
user_profiles (id, nome, email, foto, notification_hours[], created_at)

-- Gamificação
user_points (user_id, total_points, daily_points, level, last_update)
user_streaks (user_id, current_streak, longest_streak, last_activity_date)
user_achievements (user_id, achievement_id, achievement_name, achievement_icon, unlocked_at)
point_events (user_id, event_type, points_earned, created_at)

-- Freemium/Assinatura
subscription_plans (id, name, features[], limits{}, ativo)
user_usage_limits (user_id, feature_key, used_today, last_reset_date)

-- Notificações
motivational_quotes (id, phrase, category, created_at)
user_notifications_sent (user_id, quote_id, sent_date, created_at)

-- Onboarding
user_onboarding (user_id, current_step, completed_at, first_calculator_at, ...)
```

**RPC Functions necessárias:**
- `get_current_user_subscription()` → retorna JSON do plano do usuário
- `is_feature_enabled(p_user_id, p_feature_key)` → boolean
- `increment_feature_usage(p_feature_key)` → incrementa ou lança erro "Limit exceeded"

**Edge Functions:** Nenhuma (tudo client-side via Supabase JS)

---

### 5. Estado Atual

#### ✅ O que funciona:
- SPA funcional com todas as views principais
- Calculadora com modos gotejamento/diluição
- Gerador de evoluções com 16 categorias e templates
- Dicionário de abreviações
- Sistema de gamificação (pontos, níveis, streak)
- Notificações browser + service worker
- Context de assinatura/freemium com gating
- Pricing page (mock checkout via localStorage)
- Onboarding com confetti
- Google OAuth login (componente)
- PWA (manifest + service worker)
- Modo demo local sem Supabase configurado

#### ⚠️ O que está quebrado/incompleto:
- **Sem Stripe real:** checkout é mock (localStorage override), sem pagamento real
- **Sem migrações SQL:** schema não está versionado em arquivos SQL
- **Google Auth parcial:** botão existe mas fluxo completo pode não estar implementado
- **Analytics PostHog:** código preparado mas config opcional
- **Supabase não configurado por padrão:** `.env.local` deve ser criado
- **Schema do banco não confirmado:** RPCs esperadas podem não existir
- **Sem deploy configurado:** sem netlify.toml, vercel.json, CI/CD

---

### 6. Configurações de Deploy

- **Sem arquivo de deploy explícito** (netlify.toml, vercel.json, Dockerfile)
- **PWA ready:** manifest.json + service worker → pode ser deployado em qualquer host estático
- **Variáveis de ambiente necessárias:**
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_SUPABASE_SERVICE_ROLE_KEY`
  - `VITE_GOOGLE_CLIENT_ID`
  - `VITE_POSTHOG_KEY` (opcional)
- **Build output:** `dist/` (padrão Vite)
- **Deploy sugerido:** Netlify, Vercel, Cloudflare Pages, ou qualquer host estático

---

## 🔧 PROJETO 2: NursePro Dashboard (nursepro-dashboard)

### 1. Stack Tecnológico Completo

| Camada            | Tecnologia                                                      |
|-------------------|-----------------------------------------------------------------|
| Framework         | Next.js 15.1 (App Router)                                       |
| React             | React 19.0.0-rc.1 (Release Candidate!)                          |
| Linguagem         | TypeScript 5.4                                                  |
| Componentes UI    | shadcn/ui (Radix UI + Tailwind)                                 |
| CSS               | Tailwind CSS 3.4 + PostCSS                                      |
| Autenticação      | Supabase Auth (SSR) + Google OAuth                              |
| Banco de Dados    | Supabase (PostgreSQL)                                           |
| Pagamentos        | Stripe (checkout + webhooks)                                    |
| AI                | OpenAI GPT-4 (chat + essay streaming)                           |
| Storage           | AWS S3                                                          |
| Charts            | ApexCharts + React-ApexCharts                                   |
| Forms             | React Hook Form + Zod                                           |
| Editor            | CodeMirror (@uiw/react-codemirror)                              |
| Animações         | Framer Motion 11.2                                              |
| Hosting           | Vercel (configurado, deployado)                                 |

**Arquivo de entrada:** `app/page.tsx` (landing) / `app/dashboard/`
**Layout:** `app/layout.tsx` (ThemeProvider + SupabaseProvider)

---

### 2. Estrutura de Arquivos Principal

```
nursepro-dashboard/
├── .vercel/
│   └── project.json              # Vercel project ID: prj_90c3jtl1IjDCqaFc69POTsNmKk9d
├── .env.local                    # Configurado (Supabase, Stripe, OpenAI, AWS S3)
├── .env.local.example
├── next.config.js                # reactStrictMode: false, imagens remotas
├── tsconfig.json
├── tailwind.config.ts            # CSS variables HSL + dark mode class + RTL
├── postcss.config.js
├── package.json                  # "shadcn-nextjs-boilerplate" v3.0.0
├── schema.sql                    # Schema completo do Supabase (Stripe billing)
├── CHANGELOG.md
├── app/
│   ├── layout.tsx                # Root layout (Horizon UI boilerplate title)
│   ├── page.tsx                  # Landing page (redirect para /dashboard)
│   ├── supabase-provider.tsx
│   ├── supabase-server.ts
│   ├── theme-provider.tsx
│   ├── api/
│   │   ├── chatAPI/route.ts      # OpenAI chat streaming (Edge runtime)
│   │   ├── essayAPI/route.ts     # Essay generator (OpenAI)
│   │   └── webhooks/route.ts     # Stripe webhooks (produtos, preços, assinaturas)
│   ├── auth/
│   │   ├── callback/route.ts     # OAuth callback
│   │   └── reset_password/route.ts
│   └── dashboard/
│       ├── page.tsx              # Redirect para /dashboard/main (server-side)
│       ├── admin/                # ⚠️ DIRETÓRIO VAZIO (admin quebrado!)
│       ├── main/page.tsx         # Main Dashboard (server component)
│       ├── ai-chat/page.tsx      # AI Chat (OpenAI)
│       ├── settings/page.tsx     # Profile Settings
│       └── signin/               # Auth pages (email, OAuth, [id])
├── components/
│   ├── routes.tsx                # Definição de rotas do menu lateral
│   ├── dashboard/
│   │   ├── main/                 # Main dashboard content
│   │   │   ├── cards/MainChart.tsx
│   │   │   └── cards/MainDashboardTable.tsx
│   │   ├── ai-chat/              # Chat component
│   │   ├── settings/             # Settings page
│   │   │   └── components/notification-settings.tsx
│   │   └── admin/                # ⚠️ VAZIO
│   ├── auth-ui/                  # Formulários de autenticação
│   │   ├── EmailSignIn.tsx
│   │   ├── PasswordSignIn.tsx
│   │   ├── OauthSignIn.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── UpdatePassword.tsx
│   │   └── Signup.tsx
│   ├── charts/                   # LineChart (ApexCharts wrapper)
│   ├── navbar/                   # NavbarAdmin.tsx, NavbarLinksAdmin.tsx
│   ├── sidebar/                  # Sidebar.tsx, components/
│   ├── footer/                   # FooterAdmin.tsx, FooterAuthDefault.tsx
│   ├── layout/                   # Layout components
│   ├── ui/                       # shadcn/ui components (20+)
│   └── [hooks, hooks/use-toast]
├── contexts/
│   └── layout.ts
├── lib/
│   └── utils.ts                  # cn() helper
├── types/
│   ├── types.ts                  # TypeScript types (OpenAI, Stripe, IRoute, etc.)
│   ├── supabase.ts
│   └── types_db.ts
├── utils/
│   ├── supabase/
│   │   ├── client.ts             # Browser client (@supabase/ssr)
│   │   ├── server.ts             # Server client (cookies)
│   │   ├── middleware.ts         # Session refresh middleware
│   │   ├── queries.ts            # getUser, getUserDetails (React cache)
│   │   ├── admin.ts              # Supabase admin operations
│   │   └── client.ts
│   ├── auth-helpers/             # Client, server, settings
│   ├── streams/                  # chatStream.ts, essayStream.ts
│   ├── stripe/                   # Stripe config
│   ├── chatStream.ts
│   ├── supabase-admin.ts
│   └── navigation.tsx
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── variables/
│   ├── charts.ts
│   ├── tableDataInvoice.ts
│   └── tableDataUserReports.ts
└── public/
    └── img/
```

---

### 3. Funcionalidades Existentes (Rotas e Features)

#### Rotas Implementadas:
| Rota                        | Status    | Descrição                                         |
|-----------------------------|-----------|---------------------------------------------------|
| `/`                         | ✅        | Landing (redirect para /dashboard)                 |
| `/dashboard`                | ✅        | Redirect server-side para /dashboard/main          |
| `/dashboard/main`           | ✅        | Main Dashboard (MainChart + MainDashboardTable)   |
| `/dashboard/ai-chat`        | ✅        | AI Chat (OpenAI streaming, edge runtime)          |
| `/dashboard/settings`       | ✅        | Profile Settings + notification settings          |
| `/dashboard/signin`         | ✅        | Auth pages (email, Google OAuth)                  |
| `/dashboard/signin/[id]`    | ✅        | Magic link / invite                               |
| `/auth/callback`            | ✅        | OAuth callback                                    |
| `/auth/reset_password`      | ✅        | Password reset                                    |
| `/dashboard/admin`          | ❌ VAZIO  | Diretório existe mas sem page.tsx                  |
| `/dashboard/ai-generator`   | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/dashboard/ai-assistant`   | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/dashboard/users-list`     | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/dashboard/subscription`   | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/home`                      | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/pricing`                   | ⚠️ DISABLED | Desabilitado nas rotas                           |
| `/api/chatAPI`               | ✅        | OpenAI chat streaming (Edge runtime)              |
| `/api/essayAPI`              | ✅        | Essay generation API                              |
| `/api/webhooks`              | ✅        | Stripe webhooks (produtos, preços, assinaturas)   |

#### Rotas no Sidebar (routes.tsx):
- Main Dashboard ✅
- AI Chat ✅
- Profile Settings ✅
- AI Generator ⚠️ disabled
- AI Assistant ⚠️ disabled
- Users List ⚠️ disabled
- Subscription ⚠️ disabled
- Landing Page ⚠️ disabled
- Pricing Page ⚠️ disabled

#### Features Técnicas:
- **Shadcn/ui completo:** 20+ componentes (accordion, avatar, badge, button, card, checkbox, dialog, dropdown-menu, input, label, progress, select, separator, sheet, switch, table, tabs, textarea, toast, tooltip)
- **Stripe billing completo:** webhooks sincronizam produtos/preços/assinaturas no Supabase
- **OpenAI integrado:** chat streaming + essay generation
- **AWS S3:** upload de arquivos/avatar
- **Dark mode:** suporte via next-themes + CSS variables HSL
- **RTL support:** tailwindcss-rtl plugin
- **Responsivo:** mobile-first com breakpoints customizados

---

### 4. Banco de Dados / Backend (Supabase + Stripe)

#### Schema Supabase (`schema.sql`):

```sql
-- Tabelas principais
users (id, full_name, avatar_url, credits, trial_credits, billing_address, payment_method)
  → RLS: usuário só vê/edita próprio dados
  → Trigger: handle_new_user() cria registro ao signup

customers (id, stripe_customer_id)
  → Tabela privada (sem RLS policies de acesso)

products (id, active, name, description, image, metadata)
  → Sincronizado via Stripe webhooks

prices (id, product_id, active, description, unit_amount, currency, type, interval, interval_count, trial_period_days)
  → Enum: pricing_type (one_time, recurring), pricing_plan_interval

subscriptions (id, user_id, status, metadata, price_id, quantity, cancel_at_period_end, timestamps...)
  → Enum: subscription_status (trialing, active, canceled, incomplete, incomplete_expired, past_due, unpaid, paused)
  → RLS: usuário só vê próprias assinaturas

-- Realtime
supabase_realtime publication (products, prices)
```

#### Stripe Webhooks (`app/api/webhooks/route.ts`):
- `product.created/updated` → upsertProductRecord
- `price.created/updated` → upsertPriceRecord
- `customer.subscription.created/updated/deleted` → manageSubscriptionStatusChange
- `checkout.session.completed` → manageSubscriptionStatusChange

#### Utilitários:
- `utils/supabase/admin.ts` → operações admin Supabase (bypass RLS)
- `utils/supabase/queries.ts` → getUser, getUserDetails (React cache)
- `utils/supabase/client.ts` → browser client (SSR cookies)
- `utils/supabase/server.ts` → server client (Next.js cookies)
- `utils/supabase/middleware.ts` → session refresh

---

### 5. Estado Atual

#### ✅ O que funciona:
- Projeto Next.js 15 funcional
- Autenticação Supabase (SSR) completa
- AI Chat com streaming OpenAI (Edge runtime)
- Stripe webhooks funcionais
- Dashboard principal com gráficos e tabela
- Perfil de usuário + configurações
- Menu lateral com navegação
- shadcn/ui implementado
- Dark mode
- Vercel deploy configurado

#### ❌ O que está quebrado:
- **`/dashboard/admin` VAZIO** — diretório existe mas sem `page.tsx` → **admin quebrado conforme contexto**
- **Title do layout:** ainda diz "Horizon UI Boilerplate" (não foi atualizado para NursePro)
- **React 19 RC:** versão release candidate pode causar instabilidade
- **Várias rotas desabilitadas:** AI Generator, AI Assistant, Users List, Subscription, Landing Page, Pricing Page
- **Conflito de dependências:** tem tanto `@radix-ui/react-*` quanto `react-router-dom` (não usado no App Router)
- **No admin page:** `/app/dashboard/admin/` existe mas está vazio

#### ⚠️ Observações:
- Baseado em boilerplate "Horizon UI / shadcn-nextjs-boilerplate"
- Muitas dependências desnecessárias para o escopo de enfermagem
- Esquema Stripe+Billing está completo mas não há plano NursePro específico configurado
- Sem PWA/service worker
- Sem gamificação

---

### 6. Configurações de Deploy

#### Vercel:
- **Projeto Vercel:** Configurado (`.vercel/project.json`)
  - Project ID: `prj_90c3jtl1IjDCqaFc69POTsNmKk9d`
  - Org ID: `team_sQlsyTj5MDha7d49CE0dvf4A`
- **URL em produção:** `https://nurseprox.netlify.app/admin/` (está no Netlify mas o projeto é configurado para Vercel — possível deploy antigo no Netlify)
- **Build:** `next build` → `next start`
- **Scripts úteis no package.json:**
  - `supabase:start/stop/reset/link/generate-types/push/pull`
  - `stripe:login/listen/fixtures`

#### Variáveis de Ambiente:
```
NEXT_PUBLIC_SUPABASE_URL (configurado)
NEXT_PUBLIC_SUPABASE_ANON_KEY (configurado)
SUPABASE_SERVICE_ROLE_KEY (configurado)
NEXT_PUBLIC_OPENAI_API_KEY (configurado)
NEXT_PUBLIC_OPENAI_ASSISTANT_KEY (configurado)
STRIPE_SECRET_KEY (test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (test)
STRIPE_WEBHOOK_SECRET (configurado)
NEXT_PUBLIC_AWS_S3_REGION (eu-north-1)
NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID (configurado)
NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY (configurado)
NEXT_PUBLIC_AWS_S3_BUCKET_NAME (mybucket)
```

#### next.config.js:
```javascript
{
  reactStrictMode: false,         // Desligado (pode causar bugs)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },  // Ignora erros TypeScript!
  images: { domains: [...], remotePatterns: [...] }
}
```

---

## 🔄 Comparação Rápida

| Aspecto               | Plantão Pro                    | NursePro Dashboard                  |
|-----------------------|--------------------------------|-------------------------------------|
| Framework             | React + Vite (SPA)            | Next.js 15 + App Router             |
| React                 | 18.3 (estável)                | 19.0.0-rc.1 (instável!)            |
| Stack UI              | Tailwind + Framer Motion      | shadcn/ui + Tailwind                |
| Deploy                | Não configurado               | Vercel (configurado)                |
| Backend               | Supabase (client-only)        | Supabase (SSR) + Stripe + AWS S3   |
| Autenticação          | Google OAuth (parcial)        | Supabase Auth completo              |
| Pagamentos            | Mock/localStorage             | Stripe real com webhooks            |
| Freemium              | ✅ Implementado                | ❌ Não implementado                 |
| Gamificação           | ✅ Completo                    | ❌ Ausente                          |
| Notificações          | ✅ Browser push                | ❌ Ausente                          |
| AI                    | ❌ Ausente                     | ✅ OpenAI (chat + essay)            |
| Admin                 | ✅ Painel básico               | ❌ Quebrado (pasta vazia)           |
| Esquema DB            | Inferido do código            | Schema.sql completo                 |
| Idioma                | Português (pt-BR)             | Inglês (padrão boilerplate)         |

---

## 🎯 Recomendações Estratégicas

### Para implementar o Admin novo (nursepro-dashboard):
1. **Criar `/app/dashboard/admin/page.tsx`** — O diretório existe mas está vazio
2. **Atualizar `<title>`** no layout.tsx (remover "Horizon UI Boilerplate")
3. **Considerar downgrade do React 19 RC** para 18.x para estabilidade
4. **Remover dependências não usadas** (react-router-dom, @emotion, etc.)
5. **Traduzir UI para pt-BR** (o app é brasileiro)

### Para integrar Plantão Pro + NursePro Dashboard:
1. **Migrar features do Plantão Pro** para o NursePro Dashboard:
   - Calculadora, Evoluções, Dicionário
   - Gamificação (hooks)
   - Notificações motivacionais
   - Freemium (adaptar `subscription.ts` para Next.js)
2. **Substituir mock Stripe** do Plantão Pro pelo Stripe real do Dashboard
3. **Criar schema SQL** completo do Plantão Pro (migrações Supabase)
4. **Unificar auth:** usar Supabase Auth do Dashboard no lugar do Google OAuth parcial

### Para deploy:
1. Plantão Pro: escolher host (Netlify/Vercel/Cloudflare Pages) — build estático
2. NursePro Dashboard: já está no Vercel, só precisa do admin page funcionando
