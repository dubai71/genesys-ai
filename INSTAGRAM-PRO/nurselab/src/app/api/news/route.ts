import { NextRequest, NextResponse } from 'next/server'

const QUERIES: Record<string, string> = {
  ia: 'inteligencia artificial machine learning automacao IA aplicada saude 2026 Brasil',
  enfermagem: 'enfermagem Brasil COFEN regulamentacao noticias recentes plantao',
  saude_digital: 'saude digital telemedicina prontuario eletronico inovacao hospital 2026 Brasil',
  negocios: 'empreendedorismo saude infoproduto monetizacao enfermeiro rendaextra',
  ferramentas: 'ferramentas IA saude software enfermagem app prontuario eletronico triagem automacao',
  todos: 'enfermagem saude IA inteligencia artificial tecnologia saude digital Brasil 2026 noticias',
}

const VALID_CATS = ['ia', 'enfermagem', 'saude_digital', 'negocios', 'ferramentas']

// Deduplicate by URL keeping first occurrence
function deduplicateByUrl(news: any[]): any[] {
  const seen = new Set<string>()
  return news.filter(item => {
    const url = item?.url || ''
    if (!url || url === '#' || seen.has(url)) return false
    seen.add(url)
    return true
  })
}

// Busca todas categorias e combina (60+ noticias)
async function fetchAllCategories(tavilyKey: string): Promise<any[]> {
  const results: any[] = []
  const errors: string[] = []

  for (const cat of VALID_CATS) {
    try {
      const news = await fetchTavilyNews(cat, tavilyKey, 20)
      if (Array.isArray(news) && news.length > 0) {
        results.push(...news)
      }
      // Rate limit friendly: 400-800ms between requests
      await new Promise(r => setTimeout(r, 400 + Math.floor(Math.random() * 400)))
    } catch (err: any) {
      errors.push(`${cat}: ${err.message || 'erro desconhecido'}`)
      // Continue with next category
    }
  }

  // Deduplicate results by URL before returning
  const deduped = deduplicateByUrl(results)

  // Log errors for debugging
  if (errors.length > 0) {
    console.warn('fetchAllCategories errors:', errors)
  }

  return deduped
}

type PerplexicaProvider = {
  id: string
  name?: string
  chatModels?: { key: string; name?: string }[]
  embeddingModels?: { key: string; name?: string }[]
}

function perplexicaSearchUrl(apiUrl?: string) {
  const base = apiUrl || process.env.PERPLEXICA_API_URL
  if (!base) throw new Error('Configure a URL do Perplexica Local em APIs antes de buscar noticias.')
  return base.endsWith('/api/search') ? base : `${base.replace(/\/$/, '')}/api/search`
}

function providerUrl(searchUrl: string) {
  return searchUrl.replace(/\/api\/search$/, '/api/providers')
}

function sourceName(url: string, fallback = 'Perplexica') {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return fallback
  }
}

function inferCategory(text: string) {
  const value = text.toLowerCase()
  if (/empreendedor|negocio|monetiza|renda|infoproduto|marketing|venda/.test(value)) return 'negocios'
  if (/ferramenta|software|app|saas|plataforma|modelo|flux|claude|chatgpt|api/.test(value)) return 'ferramentas'
  if (/enferm|cofen|coren|hospital|clinic|paciente|saude/.test(value)) return 'enfermagem'
  return 'ia'
}

async function getPerplexicaModels(searchUrl: string) {
  const chatProviderId = process.env.PERPLEXICA_CHAT_PROVIDER_ID
  const chatModelKey = process.env.PERPLEXICA_CHAT_MODEL
  const embeddingProviderId = process.env.PERPLEXICA_EMBEDDING_PROVIDER_ID
  const embeddingModelKey = process.env.PERPLEXICA_EMBEDDING_MODEL

  if (chatProviderId && chatModelKey && embeddingProviderId && embeddingModelKey) {
    return {
      chatModel: { providerId: chatProviderId, key: chatModelKey },
      embeddingModel: { providerId: embeddingProviderId, key: embeddingModelKey },
    }
  }

  const res = await fetch(providerUrl(searchUrl), { cache: 'no-store' })
  if (!res.ok) throw new Error(`Perplexica providers erro ${res.status}: ${await res.text()}`)

  const data = await res.json()
  const providers: PerplexicaProvider[] = data.providers || []
  const chatProvider = providers.find(p => p.chatModels?.length) || providers[0]
  const embeddingProvider = chatProvider?.embeddingModels?.length
    ? chatProvider
    : providers.find(p => p.embeddingModels?.length) || chatProvider
  const chatModel = chatProvider?.chatModels?.find(m => !chatModelKey || m.key === chatModelKey) || chatProvider?.chatModels?.[0]
  const embeddingModel = embeddingProvider?.embeddingModels?.find(m => !embeddingModelKey || m.key === embeddingModelKey) || embeddingProvider?.embeddingModels?.[0]

  if (!chatProvider?.id || !chatModel?.key || !embeddingProvider?.id || !embeddingModel?.key) {
    throw new Error('Perplexica sem modelos ativos em /api/providers.')
  }

  return {
    chatModel: { providerId: chatProvider.id, key: chatModel.key },
    embeddingModel: { providerId: embeddingProvider.id, key: embeddingModel.key },
  }
}

function normalizePerplexicaNews(data: any) {
  const sources = Array.isArray(data.sources) ? data.sources : []

  if (sources.length > 0) {
    return sources.slice(0, 8).map((source: any, i: number) => {
      const metadata = source.metadata || {}
      const title = metadata.title || source.title || `Fonte ${i + 1}`
      const url = metadata.url || source.url || '#'
      const summary = String(source.content || data.message || '').replace(/\s+/g, ' ').slice(0, 180)
      const category = inferCategory(`${title} ${summary}`)

      return {
        id: `px-${Date.now()}-${i}`,
        title,
        summary,
        source: sourceName(url),
        url,
        date: 'Recente',
        category,
      }
    })
  }

  const clean = String(data.message || '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  let parsed: any

  try {
    parsed = JSON.parse(clean.match(/\{[\s\S]*\}/)?.[0] || clean)
  } catch {
    return [{
      id: `px-${Date.now()}-0`,
      title: 'Resumo gerado pelo Perplexica',
      summary: clean.replace(/\s+/g, ' ').slice(0, 220),
      source: data.warning ? 'Perplexica sem busca web' : 'Perplexica',
      url: '#',
      date: 'Agora',
      category: inferCategory(clean),
    }]
  }

  return (parsed.news || []).map((n: any, i: number) => ({
    id: `px-${Date.now()}-${i}`,
    title: n.title || '',
    summary: n.summary || '',
    source: n.source || 'Perplexica',
    url: n.url || '#',
    date: n.date || 'Recente',
    category: VALID_CATS.includes(n.category) ? n.category : inferCategory(`${n.title || ''} ${n.summary || ''}`),
  }))
}

async function fetchPerplexicaNews(category: string, apiUrl?: string) {
  const searchUrl = perplexicaSearchUrl(apiUrl)
  const query = QUERIES[category] || QUERIES.todos
  const models = await getPerplexicaModels(searchUrl)

  const res = await fetch(searchUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...models,
      optimizationMode: 'balanced',
      sources: ['web', 'academic'],
      stream: false,
      query: `Busque 8 noticias recentes e relevantes sobre ${query}. Priorize Brasil, enfermagem, saude digital, IA aplicada a pratica clinica e negocios para profissionais de enfermagem.`,
      systemInstructions: 'Responda em portugues do Brasil. Use fontes recentes quando possivel. Retorne uma sintese objetiva com fontes confiaveis; as fontes serao usadas pelo NurseLab para montar cards de noticias.',
    }),
  })

  if (!res.ok) throw new Error(`Perplexica erro ${res.status}: ${await res.text()}`)

  const data = await res.json()
  return normalizePerplexicaNews(data)
}

async function fetchPerplexityNews(category: string, key: string) {
  const query = QUERIES[category] || QUERIES.todos
  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-large-128k-online',
      messages: [
        {
          role: 'system',
          content: `Voce e um agregador de noticias especializado em enfermagem, saude e IA no Brasil.
Retorne APENAS JSON valido, sem markdown, sem texto antes ou depois.
Formato obrigatorio:
{"news":[{"title":"string","summary":"string max 180 chars","source":"string","url":"string","category":"ia|enfermagem|negocios|ferramentas","date":"string ex: Ha 2h"}]}`,
        },
        {
          role: 'user',
          content: `Busque as 8 noticias mais recentes e relevantes sobre: ${query}.
Foque em conteudo publicado nas ultimas 72 horas.
Categorize cada uma: ia, enfermagem, negocios, ou ferramentas.
Retorne APENAS o JSON, sem nenhum texto adicional.`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
      return_citations: true,
      search_recency_filter: 'week',
    }),
  })

  if (!res.ok) throw new Error(`Perplexity erro ${res.status}: ${await res.text()}`)

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content || ''
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  const parsed = JSON.parse(clean.match(/\{[\s\S]*\}/)?.[0] || clean)

  return (parsed.news || []).map((n: any, i: number) => ({
    id: `p-${Date.now()}-${i}`,
    title: n.title || '',
    summary: n.summary || '',
    source: n.source || 'Perplexity',
    url: n.url || '#',
    date: n.date || 'Recente',
    category: VALID_CATS.includes(n.category) ? n.category : 'ia',
  }))
}

async function fetchTavilyNews(category: string, key: string, maxResults = 15) {
  const query = QUERIES[category] || QUERIES.ia
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: key,
      query: `${query} - Brasil - enfermagem - IA - saúde digital`,
      search_depth: 'basic',
      max_results: maxResults,
      include_answer: false,
      include_raw_content: false,
    },
  )
  })

  if (!res.ok) throw new Error(`Tavily erro ${res.status}: ${await res.text()}`)

  const data = await res.json()
  const results = data.results || []

  return results.map((r: any, i: number) => ({
    id: `tvly-${Date.now()}-${i}`,
    title: r.title || '',
    summary: (r.content || '').slice(0, 180),
    source: r.source || 'Tavily',
    url: r.url || '#',
    date: r.published_date || 'Recente',
    category: VALID_CATS.includes(category) ? category : inferCategory(`${r.title || ''} ${r.content || ''}`),
  }))
}

export async function POST(req: NextRequest) {
  try {
    const { category, apiKeys } = await req.json()
    const key = apiKeys?.perplexity || process.env.PERPLEXITY_API_KEY
    const perplexicaUrl = apiKeys?.perplexicaUrl
    const tavilyKey = apiKeys?.tavily || process.env.TAVILY_API_KEY

    // Try Tavily first (primary)
    if (tavilyKey) {
      try {
        if (category === 'todos') {
          const allNews = await fetchAllCategories(tavilyKey)
          return NextResponse.json({ news: allNews, provider: 'tavily', total: allNews.length })
        }
        return NextResponse.json({ news: await fetchTavilyNews(category, tavilyKey), provider: 'tavily' })
      } catch (tavilyError: any) {
        // Fall through to other providers
      }
    }

    // Try Perplexica fallback
    if (perplexicaUrl || process.env.PERPLEXICA_API_URL) {
      try {
        return NextResponse.json({ news: await fetchPerplexicaNews(category, perplexicaUrl), provider: 'perplexica' })
      } catch (perplexicaError: any) {
        // Fall through to next provider
      }
    }

    // Try Perplexity API
    if (key) {
      try {
        return NextResponse.json({ news: await fetchPerplexityNews(category, key), provider: 'perplexity' })
      } catch (pplxError: any) {
        // Fall through
      }
    }

    return NextResponse.json({ error: 'Configure Tavily API key em APIs & Configurações (gratuita em app.tavily.com).' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erro interno' }, { status: 500 })
  }
}
