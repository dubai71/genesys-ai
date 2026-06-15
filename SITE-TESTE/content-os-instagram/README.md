# NurseLab — Content OS

Dashboard de gestão de conteúdo para **@enfermagemcom.ia**.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **localStorage** (dados locais, sem servidor)
- **Supabase** (opcional, para sync entre dispositivos)

## Módulos
| Módulo | Função |
|--------|--------|
| Dashboard | Visão geral + acesso rápido |
| Instagram | Gestão de posts |
| Analytics | Métricas de performance |
| Calendário | Plano editorial mensal |
| **Criar Conteúdo** | **Geração com IA (Claude, Gemini)** |
| Biblioteca | Arquivo de conteúdos gerados |
| Concorrentes | Rastreamento de perfis |
| **Notícias** | **Tempo real via Perplexity AI** |
| Meu Negócio | Perfil da marca |
| APIs | Configuração de chaves |

## APIs suportadas
- **Anthropic** (Claude Sonnet/Opus) — geração de texto
- **Google Gemini** (Flash/Pro) — geração de texto
- **fal.ai** (Flux, SDXL) — geração de imagens
- **Perplexity AI** — notícias em tempo real
- **Freepik** — busca de imagens
- **Supabase** — sync opcional

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Deploy (Vercel)
```bash
npx vercel --yes
```

## Deploy (Netlify)
```bash
npm run build
# Upload pasta .next para Netlify
```

## Configuração de chaves
1. Abra o app → **APIs & Configurações**
2. Cole suas chaves (salvas localmente)
3. Para Perplexity: necessário conta Premium

## Dados locais
Todos os dados ficam no `localStorage` do browser:
- Posts: `nl_posts`
- Concorrentes: `nl_competitors`
- Conteúdos gerados: `nl_content`
- Perfil do negócio: `nl_business`
- Configurações: `nl_config`
