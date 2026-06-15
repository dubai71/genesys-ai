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

### Texto (LLMs)
- **Anthropic Claude** (Sonnet 4.5, Opus 4.5) — alta qualidade
- **OpenAI GPT** (GPT-4o, GPT-4 Turbo) — versátil, confiável
- **Google Gemini** (1.5 Flash, 1.5 Pro) — rápido, contexto longo
- **DeepSeek** (V3, Chat) — alta qualidade, baixo custo
- **Groq** (Llama 3 70B/8B, Mixtral) — ultra-rápido (free tier)
- **Together AI** (Llama 3, Mixtral) — baixo custo
- **HuggingFace** (Mixtral, Llama 3) — free tier disponível

### Imagens
- **OpenAI DALL-E** (3 e 2) — qualidade premium
- **Replicate** (Stable Diffusion 3, FLUX.dev, FLUX.schnell) — flexível
- **Stability AI** (SDXL Turbo, SD XL) — controle fino
- **Google Gemini Imagen 2** — qualidade Google
- **HuggingFace** (SDXL base) — free tier
- **Ideogram** — tipografia embutida, ótimo para posts
- **Leonardo AI** — modelos artísticos

### Vídeos
- **Higgsfield Seedance** — cinematográfico (free tier)
- **Segmind Seedance 2.0** — alta qualidade
- **Replicate** (Stable Video Diffusion, ZeroScope) — confiável
- **Pika** (v1 e v2) — animação de imagens
- **Runway ML** (Gen-2, Gen-3 Alpha) — profissional
- **Kling AI** — alta qualidade
- **Haiper** — Motion controllable
- **Luma Dream Machine** — 5s cinematic
- **HuggingFace** (Zero-shot) — free tier
- **fal.ai Minimax** — qualidade alta

### Stock & Utilitários
- **Perplexity AI** — notícias em tempo real
- **Freepik** — imagens stock
- **Unsplash** — fotografias (em breve)
- **Pexels** — vídeos stock (em breve)
- **Remove.bg** — remoção de fundo (em breve)

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
