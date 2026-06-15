# NurseLab — CLAUDE.md

## Visão Geral
Content OS para @enfermagemcom.ia — sistema de gestão de conteúdo para enfermeiros estratégicos.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: TypeScript

## Paleta de Cores
```
--bg:      #000000   (fundo principal)
--bg2:     #0a0a0a   (cards)
--bg3:     #111111   (inputs)
--primary: #FF5404   (laranja marca)
--milk:    #EDDABA   (texto principal)
```

## Estrutura de Pastas
```
nurselab/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz com sidebar
│   │   ├── page.tsx            # Redirect → /instagram
│   │   ├── instagram/page.tsx  # Gestor de posts
│   │   ├── analytics/page.tsx  # Dashboard de métricas
│   │   ├── calendario/page.tsx # Calendário mensal
│   │   ├── concorrentes/page.tsx
│   │   ├── noticias/page.tsx
│   │   ├── imagens/page.tsx    # Banco de imagens (Freepik + fal.ai)
│   │   ├── carrosseis/page.tsx
│   │   └── apis/page.tsx       # Configuração de API keys
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── PostCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── NewsCard.tsx
│   │   └── CompetitorRow.tsx
│   └── lib/
│       ├── storage.ts          # LocalStorage helpers
│       ├── freepik.ts          # Freepik API client
│       ├── falai.ts            # fal.ai API client
│       └── types.ts            # TypeScript interfaces
├── public/
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md
```

## Padrões de Componentes
- Todos os componentes são Client Components quando têm estado
- Props sempre tipadas via interfaces em `lib/types.ts`
- Cores via CSS variables no `globals.css`
- Storage: localStorage para posts/concorrentes, nunca para API keys em produção

## APIs
### Freepik
- Base URL: `https://api.freepik.com/v1`
- Auth: Header `X-Freepik-API-Key`
- Endpoint busca: `GET /resources?term={query}&filters[content_type][photo]=1`

### fal.ai
- Base URL: `https://fal.run/fal-ai/flux/dev`
- Auth: Header `Authorization: Key {key}`
- Body: `{ prompt, image_size: "portrait_4_3", num_images: 1 }`

## Decisões Importantes
- API keys ficam em `.env.local` em produção (NUNCA commitar)
- Em dev, aceita keys via UI e salva em localStorage (apenas para testes)
- Posts salvos em localStorage com chave `nl_posts`
- Concorrentes em `nl_comps`
