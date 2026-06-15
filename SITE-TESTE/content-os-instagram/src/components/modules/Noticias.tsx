'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

type NewsItem = {
  id: string
  title: string
  summary: string
  source: string
  url: string
  date: string
  category: 'ia' | 'enfermagem' | 'negocios' | 'ferramentas'
  published_date?: string
}

type Category = 'todos' | 'ia' | 'enfermagem' | 'negocios' | 'ferramentas'

const CAT_LABEL: Record<string, string> = { ia:'IA', enfermagem:'Enfermagem', negocios:'Negócios', ferramentas:'Ferramentas' }
const CAT_BADGE: Record<string, 'brand'|'green'|'blue'|'purple'> = { ia:'brand', enfermagem:'purple', negocios:'green', ferramentas:'blue' }

const FALLBACK_NEWS: NewsItem[] = [
  { id:'n1', title:'IA generativa transforma protocolos de triagem em UTIs', summary:'Pesquisadores documentaram redução de 31% no tempo de triagem com modelos de linguagem integrados a sistemas hospitalares.', source:'MIT Technology Review', url:'#', date:'Há 2h', category:'ia' },
  { id:'n2', title:'Conselho Federal discute regulamentação de IA na enfermagem', summary:'Grupo de trabalho analisa diretrizes para uso de IA em decisões clínicas de enfermagem assistencial.', source:'CFM Digital', url:'#', date:'Há 5h', category:'enfermagem' },
  { id:'n3', title:'Profissionais de saúde faturam R$40K/mês com infoprodutos', summary:'Crescimento de 180% na venda de cursos e mentorias por enfermeiros em 2025.', source:'Hotmart Blog', url:'#', date:'Há 8h', category:'negocios' },
  { id:'n4', title:'Flux Pro 1.1 gera imagens médicas fotorrealistas', summary:'Modelo especializado para contextos clínicos com suporte a material educativo.', source:'fal.ai Blog', url:'#', date:'Há 12h', category:'ferramentas' },
  { id:'n5', title:'Mercado para enfermeiros com competências digitais cresce 28%', summary:'Relatório aponta forte demanda por habilidades digitais e gestão até 2030.', source:'COFEN', url:'#', date:'Ontem', category:'enfermagem' },
  { id:'n6', title:'Claude para saúde: documentação clínica com IA', summary:'Times de enfermagem usam Claude para padronizar evoluções e reduzir carga administrativa.', source:'Anthropic', url:'#', date:'Ontem', category:'ia' },
  { id:'n7', title:'NurseTools lança versão gratuita para autônomos', summary:'500 automações/mês gratuitas para profissionais de saúde.', source:'Product Hunt', url:'#', date:'2 dias', category:'ferramentas' },
  { id:'n8', title:'Micro-SaaS para saúde: R$2B até 2027', summary:'Software para profissionais de saúde autônomos cresce 4x mais que o mercado.', source:'Sebrae', url:'#', date:'3 dias', category:'negocios' },
]

const QUERIES: Record<Category, string> = {
  todos: 'enfermagem IA saúde digital inteligência artificial healthcare',
  ia: 'inteligência artificial enfermagem saúde IA clínica',
  enfermagem: 'enfermagem Brasil COFEN notícias regulamentação',
  negocios: 'empreendedorismo saúde infoproduto monetização enfermeiro',
  ferramentas: 'ferramentas IA saúde tecnologia hospitalar SaaS',
}

export default function Noticias() {
  const [news, setNews] = useState<NewsItem[]>(FALLBACK_NEWS)
  const [filter, setFilter] = useState<Category>('todos')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastFetch, setLastFetch] = useState<string|null>(null)
  const [hasKey, setHasKey] = useState(false)

  useEffect(() => {
    const cfg = storage.getConfig()
    setHasKey(!!cfg.apiKeys.perplexity)
  }, [])

  async function fetchNews(cat: Category) {
    const cfg = storage.getConfig()
    const key = cfg.apiKeys.perplexity
    if (!key) { setError('Cole sua chave Perplexity em APIs & Configurações'); return }

    setLoading(true)
    setError('')
    try {
      const query = QUERIES[cat]
      const res = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: `Você é um agregador de notícias especializado em enfermagem, saúde e IA. 
Retorne APENAS JSON válido, sem markdown, sem explicações adicionais.
Formato: {"news":[{"title":"...","summary":"...","source":"...","url":"...","category":"ia|enfermagem|negocios|ferramentas","date":"..."}]}`
            },
            {
              role: 'user',
              content: `Busque as 8 notícias mais recentes e relevantes sobre: ${query}. 
Foque em conteúdo publicado nas últimas 72 horas.
Categorize cada uma como: ia, enfermagem, negocios, ou ferramentas.
Retorne apenas o JSON.`
            }
          ],
          max_tokens: 2000,
          temperature: 0.1,
          return_citations: true,
          search_recency_filter: 'week',
        })
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`Perplexity API error ${res.status}: ${err}`)
      }

      const data = await res.json()
      const text = data.choices?.[0]?.message?.content || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      if (parsed.news && Array.isArray(parsed.news)) {
        const items: NewsItem[] = parsed.news.map((n: any, i: number) => ({
          id: `p-${Date.now()}-${i}`,
          title: n.title || '',
          summary: n.summary || '',
          source: n.source || 'Perplexity',
          url: n.url || '#',
          date: n.date || 'Recente',
          category: (['ia','enfermagem','negocios','ferramentas'].includes(n.category) ? n.category : 'ia') as NewsItem['category'],
        }))
        setNews(items)
        setLastFetch(new Date().toLocaleTimeString('pt-BR'))
        setHasKey(true)
      }
    } catch (e: any) {
      setError(e.message || 'Erro ao buscar notícias')
      setNews(FALLBACK_NEWS)
    }
    setLoading(false)
  }

  const filtered = filter === 'todos' ? news : news.filter(n => n.category === filter)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Notícias"
        subtitle="IA · Enfermagem · Saúde Digital · Negócios"
        actions={[{
          label: loading ? 'Buscando…' : '🔄 Buscar com Perplexity',
          onClick: () => fetchNews(filter),
          variant: 'primary',
        }]}
      />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {/* Perplexity status */}
        {!hasKey && (
          <div className="flex items-start gap-2 bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-[7px] px-3 py-2.5 text-[10px] text-[rgba(237,218,186,0.6)]">
            <span>⚠️</span>
            <div>
              <strong className="text-[#f59e0b]">Perplexity AI não configurado.</strong>{' '}
              Vá em <strong>APIs & Configurações</strong> → cole sua chave Perplexity Premium.
              Enquanto isso, exibindo notícias de demonstração.
            </div>
          </div>
        )}

        {hasKey && lastFetch && (
          <div className="flex items-center gap-2 text-[9px] text-[rgba(237,218,186,0.3)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e]" />
            Última busca via Perplexity: {lastFetch}
          </div>
        )}

        {error && (
          <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[6px] px-3 py-2">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-1.5 flex-wrap">
          {(['todos','ia','enfermagem','negocios','ferramentas'] as Category[]).map(f => (
            <button key={f}
              onClick={() => { setFilter(f); if (hasKey) fetchNews(f) }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all
                ${filter===f ? 'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20'}`}>
              {f === 'todos' ? 'Todos' : CAT_LABEL[f]}
            </button>
          ))}
        </div>

        {/* News list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-7 h-7 border-2 border-white/10 border-t-[#FF5404] rounded-full spin" />
            <div className="text-[11px] text-[rgba(237,218,186,0.4)]">Buscando com Perplexity AI…</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(n => (
              <a key={n.id} href={n.url !== '#' ? n.url : undefined} target="_blank" rel="noreferrer"
                className="block bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 hover:border-[rgba(255,84,4,0.22)] transition-colors group">
                <div className="text-[8px] font-bold tracking-[1px] uppercase text-[#FF5404] mb-1.5">{n.source}</div>
                <div className="text-[12px] font-semibold text-white mb-1.5 leading-snug group-hover:text-[#FF5404] transition-colors">{n.title}</div>
                <div className="text-[10px] text-[rgba(237,218,186,0.5)] leading-relaxed mb-2.5">{n.summary}</div>
                <div className="flex items-center gap-2">
                  <Badge variant={CAT_BADGE[n.category]}>{CAT_LABEL[n.category]}</Badge>
                  <span className="text-[9px] text-[rgba(237,218,186,0.25)] ml-auto">{n.date}</span>
                  {n.url !== '#' && <span className="text-[9px] text-[rgba(237,218,186,0.3)]">↗</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
