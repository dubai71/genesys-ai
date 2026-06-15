# NURSEPRO FREEMIUM — IMPLEMENTATION PLAN

**Versão:** 1.0  
**Data:** 2026-05-15  
**Projeto:** NursePro — Sistema Operacional da Nova Enfermagem  
**Stack Atual:** React 18 + Vite + TypeScript + Tailwind + Supabase + Google OAuth  
**Branch Base:** `main` (v13) → Nova branch `freemium-v14`

---

## 1. VISÃO GERAL

Transformar o NursePro de "app de enfermagem" para "sistema operacional profissional" através de modelo freemium que cria hábito operacional e aceleração premium.

**Princípio Norte:**  
Todo elemento deve fazer o profissional sentir que o plantão ficou mais leve.

**Metameta psicológica:**  
"Não consigo mais fazer plantão sem isso."

---

## 2. OBJETIVOS

### Primários
- Criar dependência funcional no free (hábito operacional)
- Oferecer alívio real, não apenas funcionalidades
- Manter talk do premium como "modo profissional"
- Aumentar retenção D+7 de X% → 40%+
- Taxa de conversão free → premium: 3-5%

### Secundários
- Redesign visual para linguagem operacional (não gamer)
- Onboarding com micro-vitória pós-primeira ação
- Sistema de métricas interno (instalação, ativação, uso)
- Paywall emocional (benefício → função)

---

## 3. ARQUITETURA ATUAL (v13)

### Funcionalidades Existentes
- Autenticação: email/senha + Google OAuth → tabela `authorized_users`
- Gamificação completa: pontos, streaks, achievements, edge function `process_points_event`
- Módulos: Calculadora, Evoluções, Dicionário, Procedimentos (24), Cuidados, Referência (valores, medicações, procedimentos, emergências)
- Notificações motivacionais (50 frases, 3 horários)
- Widget de clima (Open-Meteo, geolocalização)
- Admin panel: gestão de usuários autorizados
- Build PWA (manifest, sw.js)

### Banco de Dados Supabase (atual)
- `user_profiles`
- `user_points`
- `user_streaks`
- `user_achievements`
- `motivational_quotes`
- `user_notifications_sent`
- `point_events`
- **Falta:** tabelas de assinatura, limites, usage tracking

### UI/UX Atual
- Tailwind com cores: primary (azul), secondary (verde), accent (amarelo), warning (laranja)
- Gradientes coloridos nos botões (blue/emerald/amber/rose/purple)
- Glassmorphism: `backdrop-blur-xl bg-white/30`
- Design: **gamificado colorido**, não "operacional premium"

---

## 4. DIRETRIZES DE REDESIGN

### Paleta Nova (Operacional)
- **Preto operacional:** `#0a0a0a` (fundo)
- **Azul profundo:** `#1a2a4a` (primary)
- **Âmbar cirúrgico:** `#d45a10` ou `#e8701a` (accent)
- **Branco limpo:** `#fafafa` / `#ffffff` (cards)
- **Neutro escuro:** `#1a1a1a` (bordas)

**Substituir:** primary (azul bright) → azul profundo, secondary (verde) → remover ou tons neutros, accent (amarelo) → âmbar cirúrgico, warning (laranja) → manter mas escurecer.

### Componentes
- Cards: `bg-neutral-900` ou `bg-white` com bordas sutis `border-neutral-800`
- Botões primários: gradiente `from-amber-600 to-amber-500` ou sólido `bg-amber-600`
- Botões secundários: `bg-neutral-800 text-white`
- Fonte: Inter permanece
- Espaçamento: respiro generoso (p-6, gap-6)

---

## 5. FASES DE IMPLEMENTAÇÃO

### FASE 0 — SETUP E INTELIGÊNCIA (1 dia)

**Objetivo:** Preparar ambiente, documentar estrutura, configurar análise.

**Tasks:**
1. Criar branch `freemium-v14` a partir de `main`
2. Instalar/verificar analytics (PostHog ou Mixpanel) — inicialização simples
3. Setup de feature flags (usar Supabase ouLaunchDarkly? Começar simples: tabela `user_features` booleana)
4. Documentar tabelas atuais e planejar migrações
5. Criar diretório `docs/` no projeto com plano, specs, decisions
6. Configurar `.env.local` (o usuário já tem chaves Supabase, verificar se precisamos de Stripe/Paddle)

**Dependencies:** Nenhuma  
**Responsável:** @developer (pixel)  
**Acceptance:** Branch criada, analytics inicializados, feature flags básico funcionando

---

### FASE 1 — MODELO DE DADOS FREEMIUM (2 dias)

**Objetivo:** Criar estrutura de assinaturas, limites, planos.

**Novas Tabelas Supabase:**

```sql
-- subscription_plans: planos free, premium (mensal, anual)
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, -- 'free', 'premium_monthly', 'premium_yearly'
  stripe_price_id text UNIQUE, -- integração futura
  monthly_price_cents integer,
  yearly_price_cents integer,
  features jsonb DEFAULT '{}', -- lista de features habilitadas
  limits jsonb DEFAULT '{}', -- { "calculator_unlimited": false, "history_days": 30, ... }
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- user_subscriptions: assinatura ativa por usuário
CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES subscription_plans(id),
  status text CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamptz,
  trial_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- user_usage_limits: tracking de uso por feature (reset diário/semanal)
CREATE TABLE user_usage_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  feature_key text NOT NULL, -- 'calculator_uses', 'evolution_generated', 'history_queries'
  used_today integer DEFAULT 0,
  used_weekly integer DEFAULT 0,
  last_reset_date date DEFAULT CURRENT_DATE,
  last_week_reset date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_key)
);

-- feature_flags: flags de acesso a features premium
CREATE TABLE feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  feature_name text NOT NULL, -- 'advanced_evolution', 'unlimited_history', 'ai_suggestions'
  enabled boolean DEFAULT false,
  expires_at timestamptz, -- para trials
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, feature_name)
);
```

**Seed Data:**
```sql
-- Plano free
INSERT INTO subscription_plans (name, monthly_price_cents, yearly_price_cents, features, limits) VALUES (
  'free',
  0, 0,
  '{"basic_calculator": true, "basic_dictionary": true, "basic_procedures": true, "basic_care": true, "basic_reference": true, "limited_history": true, "basic_gamification": true, "basic_notifications": true}',
  '{"calculator_uses_per_day": 10, "evolution_generated_per_day": 3, "history_days": 30, "procedures_view_unlimited": true, "reference_cards_unlimited": true, "care_articles_unlimited": true}'
);

-- Plano premium mensal
INSERT INTO subscription_plans (name, monthly_price_cents, yearly_price_cents, features, limits) VALUES (
  'premium_monthly',
  2970, -- R$29,70
  29700, -- R$29,70/mês x 12 (desconto 2 meses?)
  '{"advanced_evolution": true, "unlimited_history": true, "ai_contextual": true, "smart_templates": true, "operational_insights": true, "backup_total": true, "personalization": true, "priority_support": true, "advanced_gamification": true}',
  '{"calculator_uses_per_day": -1, "evolution_generated_per_day": -1, "history_days": -1, "procedures_view_unlimited": true, "reference_cards_unlimited": true, "care_articles_unlimited": true}'
);

-- Premium anual
INSERT INTO subscription_plans (name, monthly_price_cents, yearly_price_cents, features, limits) VALUES (
  'premium_yearly',
  0, -- não usado mensal
  27900, -- R$27,90/mês x 12 = R$334,80 (desconto ~6%)
  '{"advanced_evolution": true, "unlimited_history": true, "ai_contextual": true, "smart_templates": true, "operational_insights": true, "backup_total": true, "personalization": true, "priority_support": true, "advanced_gamification": true}',
  '{"calculator_uses_per_day": -1, "evolution_generated_per_day": -1, "history_days": -1, "procedures_view_unlimited": true, "reference_cards_unlimited": true, "care_articles_unlimited": true}'
);
```

**RLS Policies:** Garantir que usuários só acessam seus dados.

**Migração:** Criar arquivo `supabase/migrations/20260515_add_freemium_schema.sql`

**Responsável:** @data-engineer (Tensor)  
**Tempo:** 2 dias (criação + test + documentação)

---

### FASE 2 — SISTEMA DE LIMITES E FEATURE FLAGS (3 dias)

**Objetivo:** Middleware que verifica plano e limites antes de cada ação.

**Estrutura:**

1. **Supabase Helper: `lib/subscription.ts`**
   - `getUserPlan(userId): Promise<Plan>`
   - `checkFeatureAccess(userId, featureKey): Promise<boolean>`
   - `incrementUsage(userId, featureKey): Promise<void>` (controla limites)
   - `getRemainingQuota(userId, featureKey): Promise<{used, limit}>`

2. **Hook: `useSubscription`**
   - Expor `plan`, `features`, `remaining`
   - Auto-refresh quando limites mudam

3. **Proteção de Rotas/Componentes:**
   - Componente `<FeatureGate feature="advanced_evolution">` que mostra paywall se não permitido
   - Hook `useRequireFeature(feature)` que retorna null/redireciona

4. **Integração Pontos:**
   - Atualmente: pontos ilimitados (free). Premium: pontos dobrados?
   - Melhor: free ganha pontos normais. Premium: bônus 50% (1.5x). Isso incentiva upgrade.

**Lógica de Limites Diários:**
- `user_usage_limits` tem `used_today` e `last_reset_date`
- Reset automático quando `CURRENT_DATE != last_reset_date`
- Quando limite atinge, mostrar paywall contextual com "Faça upgrade para uso ilimitado"

**Implementação em Componentes Críticos:**

- **Calculator:** Cada cálculo conta como `calculator_use`. Free: 10/dia. Unlimited premium.
- **Evolution:** Gerar evolução conta como `evolution_generated`. Free: 3/dia.
- **Stats:** Histórico completo só premium. Free: últimos 30 dias.

**Responsável:** @developer (Pixel)  
**Dependencies:** Fase 1 completa  
**Teste:** Simular free user, atingir limites, validar bloqueio e mensagem

---

### FASE 3 — ONBOARDING E MICRO VITÓRIA (2 dias)

**Objetivo:** Primeira experiência levar a sensação de "plantão mais leve".

**Fluxo Atual:**
Login → Home (dashboard) → clica em algo → pontos adicionados (sem feedback forte)

**Novo Fluxo Após Login:**

1. **Tela de Carregamento Inicial (1 seg)** com: "Configurando seu plantão..."

2. **Onboarding Canvas ( swipeable, 3 telas )**
   - Tela 1: "Seu plantão acaba de ficar mais leve" + illustration de alívio
   - Tela 2: "Automáticas que economizam horas" + destaque Calculadora e Evolução
   - Tela 3: "Comece agora com sua primeira ação" + botão grande "Quero economizar tempo"

3. **Primeira Missão (pós-onboarding):**
   - Mostrar toast: "Parabéns! Você economizará ~15min hoje com estas ferramentas."
   - Guiar para Calculadora (destacar botão, pulse animation)
   - Após primeiro cálculo: **MICRO VITÓRIA** — tela cheia: "Você acabou de economizar 2 minutos! (Isso acumula)"
   - Adicionar 50 pontos bônus (evento `first_calculator_use`)

4. **Day+1 Push Notification (se opt-in):**
   - "Volte ao Plantão Pro e continue economizando tempo"

**Componentes Novos:**

- `OnboardingModal.tsx`:遮罩层 fullscreen com swiper (Framer Motion)
- `CelebrationOverlay.tsx`: tela de vitória após primeira ação
- Hook `useOnboardingStatus`: controla se user já completou

**Armazenamento:**
- Tabela `user_onboarding`:
  ```
  user_id, completed_at, first_calculator_at, first_evolution_at, day1_return_at
  ```

**Responsável:** @ux-design-expert (Mosaic) + @developer  
**Duração:** 2 dias (design + implementação + integração)

---

### FASE 4 — HOME SCREEN OPERACIONAL (2 dias)

**Objetivo:** Transformar home em painel operacional clínico, não menu de app.

**Design Atual (DashboardHome):**
- Título central "Plantão Pro"
- Cards de Gamificação + Streak
- Grid de ações coloridas (5 botões com gradientes)
- Muito "jogo", pouco "ferramenta"

**Nova Home (Painel Operacional):**

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Olá, Carla. Plantão de 12h em 25min.]      ⏰   │
│  Esta semana você economizou 2h 15min               │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │         AÇÃO RÁPIDA PRINCIPAL              │    │
│  │  [Calcular Medicação - Botão Âmbar Gigante]│    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Estado Operacional: ✅ Pronto para plantão        │
│  Última atividade: Calculadora às 14:32 (2min)    │
│                                                      │
│  Módulos Operacionais (grid 2x3 sem gradientes): │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Calcula │ │Evoluções│ │Procedim│            │
│  │dor      │ │         │ │entos   │            │
│  └─────────┘ └─────────┘ └─────────┘            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │Dicionário││Cuidados │ │Referência│           │
│  │          ││         │ │          │           │
│  └─────────┘ └─────────┘ └─────────┘            │
│                                                      │
│  [Widget tempo real: clima da cidade]              │
└─────────────────────────────────────────────────────┘
```

**Mudanças Técnicas:**
- Remover gradientes coloridos dos botões
- Estilo: bg-neutral-900 ou bg-white/90, border-neutral-800, hover:bg-neutral-800
- Botão principal: âmbar (`bg-amber-600`), shadow âmbar
- Adicionar "Tempo economizado" (soma de `user_usage_metrics.time_saved_seconds` ou calcular baseado em uso)
- Estado operacional: baseado em uso recente (última atividade <1h = "Pronto", >1h = "Inativo")
- Widget clima: manter mas repaginar (fundo escuro, texto claro)

**Responsável:** @ux-design-expert (Mosaic) + @developer  
**Duração:** 2 dias

---

### FASE 5 — PAYWALL E CONVERSÃO (3 dias)

**Objetivo:** Vender "alívio operacional", não features.

**Política Paywall:**

1. **Quando mostrar:**
   - Usuário atinge limite diário: "Você esgotou seu limite de 10 cálculos hoje. Upgrade para cálculo ilimitado."
   - Acesso a feature premium: "Evoluções avançadas exclusivas para assinantes premium."
   - Após 7 dias de uso free: modal "Já experimentou o modo premium?"

2. **Onde mostrar:**
   - Modal overlay ao tentar usar feature bloqueada
   - Banner sutil na home (após 3 dias de uso): "Desbloqueie o modo profissional"
   - Tela de stats: "Estatísticas avançadas apenas Premium"
   - Após atingir limite: tela cheia com benefícios + botão "Ver planos"

3. **Página de Pricing:**
   - Rota `/pricing` acessível via banner
   - Cards side-by-side: Free vs Premium
   - Free: lista de 5-6 benefícios realistas
   - Premium: 8-10 benefícios com ícones (clock com "+3h", brain com "IA contextual", shield com "backup")
   - Toggle mensal/anual (mostrar economia 2 meses grátis no anual)
   - Botão "Assinar Agora" (integrar Stripe/Paddle/MercadoPago futuramente — inicialmente mockup)

4. **Copy Emocional:**
   ```
   Título: Trabalhe com menos desgaste mental
   Subtítulo: Automatize tarefas repetitivas e recupere horas do seu plantão
   Bullets:
   - ✅ Cálculos ilimitados (sem contar por dia)
   - ✅ Histórico completo para sempre
   - ✅ IA contextual que sugere condutas
   - ✅ Templates inteligentes personalizados
   - ✅ Insights de produtividade
   - ✅ Backup total na nuvem
   ```

**Componentes:**

- `PaywallModal.tsx`: componente reutilizável
- `PricingPage.tsx`: rota `/pricing`
- `useSubscriptionActions`: hook para `openPricing()`, `handleUpgrade()`

**Responsável:** @product-lead (Axis) + @developer  
**Duração:** 3 dias

---

### FASE 6 — ANALYTICS E MÉTRICAS (2 dias)

**Objetivo:** Rastrear KPIs críticos (instalação, ativação, D+1, D+7, retenção, conversão).

**Tool:** PostHog (open-source auto-host) ou Mixpanel. Começar com PostHog para custo zero.

**Eventos a Implementar:**

```typescript
// Identificação
posthog.identify(userId, { email, plan, signup_date });

// Eventos
posthog.capture('app_installed', { platform: 'ios' | 'android' | 'web' });
posthog.capture('onboarding_started');
posthog.capture('onboarding_completed', { first_feature_used: 'calculator' });
posthog.capture('first_action_completed', { action: 'calculator', points_earned: 50 });
posthog.capture('day_1_return', { days_since_signup: 1 });
posthog.capture('day_7_return', { days_since_signup: 7 });
posthog.capture('feature_used', { feature: 'calculator', usage_count: 1 });
posthog.capture('limit_reached', { feature: 'calculator', limit: 10 });
posthog.capture('paywall_viewed', { feature: 'calculator' });
posthog.capture('pricing_page_viewed');
posthog.capture('upgrade_clicked', { plan: 'premium_monthly' });
posthog.capture('subscription_created', { plan: 'premium_monthly' });
posthog.capture('app_closed', { session_duration_seconds: 300 });
```

**Tabela Local (fallback se PostHing falhar):**
```sql
CREATE TABLE user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id),
  event_name text NOT NULL,
  properties jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
```

**Dashboard Interno (admin):**
- Adicionar tab `Stats` no admin panel com:
  - Usuários novos (last 7 days)
  - Ativação (onboarding completo %)
  - Retenção D+1 / D+7
  - Top features usadas
  - Conversão free→premium

**Responsável:** @data-engineer (Tensor) + @developer  
**Duração:** 2 dias

---

### FASE 7 — ADMIN AVANÇADO (2 dias)

**Objetivo:** Painel admin com métricas de negócio e gerenciamento premium.

**Novas Funcionalidades no Admin:**

1. **Dashboard de Métricas** (hoje está estático):
   - Usuários totais, ativos (7d), novo (30d)
   - Conversão free→premium (%)
   - Receita MRR (simulada, integração Stripe futura)
   - Retenção D+1, D+7 (gráfico simples com Chart.js já carregado)

2. **Gestão de Usuários:**
   - Lista completa com filtros (plano, ativo, D+7)
   - Ação rápida: "Conceder premium trial 7d"
   - Ver detalhes: usage por feature, pontos, streaks

3. **Gestão de Assinaturas:**
   - Lista de assinaturas ativas/canceladas
   - Criar assinatura manual (para testes/admin)
   - Estornar/modificar status

4. **Feature Flags:**
   - Ativar/desativar features globalmente (para lançamentos graduais)
   - Porcentagem rollout (ex: 10% dos usuários veem nova home)

**Tabela `admin_metrics_cache` para performance:**
- Agregar dados diariamente via edge function

**Responsável:** @developer + @devops  
**Duração:** 2 dias

---

### FASE 8 — TESTES E DEPLOY (2 dias)

**Objetivo:** Validar implementação, garantir performance e segurança.

**Checklist:**

### Testes Manuais
- [ ] Novo usuário free: onboarding completo → micro vitória → +50 pontos
- [ ] Free: atingir limite de calculator_uses (10) → paywall aparece
- [ ] Premium (mock): limites ilimitados, sem bloqueio
- [ ] Home nova: visual operacional, tempo economizado aparecendo
- [ ] Pricing page: layout responsivo, toggle funcionando
- [ ] Admin metrics: dados corretos

### Segurança
- ] RLS nas novas tabelas (`subscription_plans`, `user_subscriptions`, `user_usage_limits`, `feature_flags`)
- ] Feature gates no frontend **e** backend (edge function para critical features)
- ] Nenhum `service_role` exposto no código frontend
- ] Variáveis de ambiente no Supabase Vault: Stripe keys, PostHog API key

### Performance
- ] Dashboard home carrega <2s em 3G simulado
- ] Middleware de verificação de plano cacheado (evitar N+1 queries)
- ] Queries analíticas no admin usa `admin_metrics_cache`

### Deploy
- ] Build sem erros (`npm run build`)
- ] Preview deployment (Vercel ou similar)
- ] A/B test com 10% dos usuários (nova home) — setup opcional

**Responsável:** @quality-gate (Quinn) + @devops (Pipeline)  
**Duração:** 2 dias

---

## 6. CRONOGRAMA (DIAS ÚTEIS)

| Fase | Duração | Responsável Principal |
|------|---------|----------------------|
| 0 — Setup | 1 | @developer |
| 1 — Modelo de Dados | 2 | @data-engineer |
| 2 — Limites & Flags | 3 | @developer |
| 3 — Onboarding | 2 | @ux-design-expert + @developer |
| 4 — Home Redesign | 2 | @ux-design-expert + @developer |
| 5 — Paywall | 3 | @product-lead + @developer |
| 6 — Analytics | 2 | @data-engineer |
| 7 — Admin Avançado | 2 | @developer + @devops |
| 8 — Testes & Deploy | 2 | @quality-gate |
| **TOTAL** | **19 dias** (≈4 semanas) |

**Nota:** Fases podem rodar em paralelo (design antecipa desenvolvimento). spikes de arquitetura (Fase 1) são gated.

---

## 7. RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Resistência a mudança visual (cores escuras) | Média | Alta | A/B test 10% vs design atual por 2 semanas; coletar feedback NPS |
| Complexidade de middlewares de limite | Alta | Média | Cache agressivo (Redis/Supabase cache); design simples com `checkFeatureAccess` |
| Integração pagamento (Stripe/Paddle) atrasa | Média | Alta | Inicialmente mock; release v14.1 com pagamento real |
| Performance degrade em queries analíticas | Alta | Média | Usar materialized views + cache; admin só carrega dados sob demanda |
| Baixa conversão free→premium | Alta | Alta | Testar copy, posicionamento paywall, preço; iterate rapidamente |

---

## 8. CRITÉRIOS DE ACEITAÇÃO POR FASE

**Fase 1 (Modelo de Dados):**
- [ ] Migração aplicada sem erros
- [ ] RLS policies corretas (testar com dois usuários, garantir isolamento)
- [ ] Seeds: free e premium planos populados
- [ ] Documentação de schema atualizada

**Fase 2 (Limites & Flags):**
- [ ] `getUserPlan(userId)` retorna plano correto
- [ ] `checkFeatureAccess('advanced_evolution')` retorna false para free
- [ ] `incrementUsage` incrementa contador e falha ao atingir limite
- [ ] Componente calculator bloqueado quando limite atingido (mostra paywall)

**Fase 3 (Onboarding):**
- [ ] Novo user vê onboarding de 3 telas
- [ ] Após primeira ação (calculator), mostra CelebrationOverlay + +50 pontos
- [ ] `user_onboarding.completed_at` preenchido
- [ ] Dados persistem após reload

**Fase 4 (Home):**
- ] Nova home renderizada com cores operacionais (preto/azul/âmbar)
- [ ] "Tempo economizado" exibe valor acumulado
- [ ] Botão principal destaque âmbar
- [ ] Responsivo mobile/desktop

**Fase 5 (Paywall):**
- [ ] Modal aparece ao atingir limite
- [ ] Página `/pricing` acessível
- [ ] Copy segue diretriz: "Trabalhe com menos desgaste mental"
- [ ] Botão "Assinar" mockado (log no console)

**Fase 6 (Analytics):**
- [ ] PostHog capturando eventos (ver dashboard)
- [ ] Admin Stats mostra dados reais
- [ ] Fallback local表 funcionando

**Fase 7 (Admin):**
- [ ] Métricas: usuários ativos, retenção, conversão
- [ ] Ação "Grant premium trial" funciona
- [ ] Feature flags listadas e toggleável

**Fase 8 (Deploy):**
- ] Build passa (`npm run build`)
- ] Não há errors no lint
- ] Test smoke: login, navegação, uso básico
- ] RLS validado com sqlinspect

---

## 9. DECISÕES TÉCNICAS ABERTAS (para @architect)

1. **Gateway de Pagamento:** Stripe (global), Paddle (faturamento internacional), MercadoPago (Brasil)? **Recomendação:** Stripe por生态系统 completo, 6 meses para implementar.
2. **Feature Flags:** usar tabela `feature_flags` custom ou serviço externo (LaunchDarkly)? **Inicial:** tabela simple por custo.
3. **Cache de Plano/Features:** Redis? Supabase Realtime? **Option:** Supabase cache com `SELECT ...` + em memória por sessão (React context); invalidar em subscription change.
4. **Analytics:** PostHog self-host ou cloud? **Option:** PostHog cloud free tier (10k events/mês) para começar.

---

## 10. ANEXOS

- A. NursePro-Freemium-Strategy.md (diretrizes)
- B. NursePro-Freemium-Tech-Spec.md (especificações API, tipos TypeScript)
- C. NursePro-Freemium-Redesign-Spec.md (patches Tailwind, componentes)
- D. NursePro-Freemium-Subscription-Schema.md (SQL completo)
- E. NursePro-Freemium-Onboarding-Flow.md (screenshots de wireframes)
- F. NursePro-Freemium-KPIs.md (definição métricas, queries SQL)

---

## 11. PRÓXIMOS PASSOS IMEDIATOS

1. Aprovação deste plano pelo @product-lead
2. Criar branch `freemium-v14`
3. Executar Fase 0 (setup) e Fase 1 (modelo dados) em paralelo
4. Reunião de kickoff com todos os agentes (@developer, @data-engineer, @ux-design-expert)

---

**FIM DO PLANO DE IMPLEMENTAÇÃO**
