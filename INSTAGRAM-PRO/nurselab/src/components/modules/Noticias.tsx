'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import { fetchNews } from '@/lib/ai'
import PageHeader from '../ui/PageHeader'
import Badge from '../ui/Badge'

type Category = 'todos' | 'ia' | 'enfermagem' | 'saude_digital' | 'negocios'

const CAT_LABEL: Record<string, string> = { ia:'IA', enfermagem:'Enfermagem', saude_digital:'Saude Digital', negocios:'Negocios' }
const CAT_BADGE: Record<string, 'brand'|'green'|'blue'|'purple'> = { ia:'brand', enfermagem:'purple', negocios:'green', saude_digital:'blue' }

const FALLBACK = [
  { id:'n1', title:'IA generativa transforma protocolos de triagem em UTIs', summary:'Reducao de tempo de triagem com modelos de linguagem integrados a sistemas hospitalares brasileiros.', source:'NurseLab', url:'#', date:'Exemplo', category:'ia' },
  { id:'n2', title:'COFEN discute regulamentacao do uso de IA na enfermagem', summary:'Diretrizes para uso responsavel de IA em decisoes clinicas de enfermagem seguem em debate.', source:'NurseLab', url:'#', date:'Exemplo', category:'enfermagem' },
  { id:'n3', title:'Telemedicina expanso apos resolucao CFM 2296/2025', summary:'Consulta remota se consolida como recurso legitimo para acompanhamento de casos crônicos.', source:'NurseLab', url:'#', date:'Exemplo', category:'saude_digital' },
  { id:'n4', title:'Enfermeiros ampliam renda com infoprodutos e consultorias', summary:'Cursos, mentorias e consultorias digitais seguem como principais caminhos de monetizacao.', source:'NurseLab', url:'#', date:'Exemplo', category:'negocios' },
]

export default function Noticias() {
  const [news, setNews] = useState(FALLBACK)
  const [filter, setFilter] = useState<Category>('todos')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastFetch, setLastFetch] = useState<string | null>(null)
  const [provider, setProvider] = useState('Perplexica')
  const [usingFallback, setUsingFallback] = useState(true)
  const [hasSearchProvider, setHasSearchProvider] = useState(false)

  useEffect(() => {
    const cfg = storage.getConfig()
    const configured = !!(cfg.apiKeys.tavily || cfg.apiKeys.perplexicaUrl || cfg.apiKeys.perplexity)
    setHasSearchProvider(configured)
    if (configured) handleFetch('todos')
  }, [])

  async function handleFetch(cat: Category) {
    const cfg = storage.getConfig()

    if (!cfg.apiKeys.tavily && !cfg.apiKeys.perplexicaUrl && !cfg.apiKeys.perplexity) {
      setHasSearchProvider(false)
      setError('Configure Tavily API key em APIs & Configuracoes (gratuita em app.tavily.com).')
      setUsingFallback(true)
      return
    }

    setHasSearchProvider(true)
    setLoading(true)
    setError('')

    try {
      const data = await fetchNews({ category: cat, apiKeys: cfg.apiKeys as Record<string, string> })
      const items = Array.isArray(data) ? data : data.news || []

      if (items.length > 0) {
        setNews(items)
        setProvider(data.provider === 'tavily' ? 'Tavily' : data.provider === 'perplexity' ? 'Perplexity' : 'Perplexica')
        setUsingFallback(false)
        setLastFetch(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
      }
    } catch (e: any) {
      setError(e.message || 'Erro ao buscar noticias. Exibindo exemplos locais.')
      setNews(FALLBACK)
      setProvider('Perplexica')
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  function changeFilter(f: Category) {
    setFilter(f)
    handleFetch(f)
  }

  const filtered = filter === 'todos' ? news : news.filter(n => n.category === filter)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Noticias"
        subtitle="IA · Enfermagem · Saude Digital · Negocios"
        actions={[{
          label: loading ? 'Buscando...' : 'Atualizar',
          onClick: () => handleFetch(filter),
          variant: 'primary',
        }]}
      />

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <div className="flex items-start gap-2 bg-[rgba(62,207,142,0.08)] border border-[rgba(62,207,142,0.2)] rounded-[7px] px-3 py-2.5">
          <div className="text-[10px] text-[rgba(237,218,186,0.6)] leading-relaxed">
            <strong className="text-[#3ecf8e]">{hasSearchProvider ? 'Tavily configurado.' : 'Busca ainda nao configurada.'}</strong>{' '}
            Em <strong>APIs</strong>, configure a Tavily API key (gratuita em app.tavily.com). Tavily busca em 4 categorias: IA, Enfermagem, Saude Digital e Negocios.
          </div>
        </div>

        {!usingFallback && lastFetch && (
          <div className="flex items-center gap-2 text-[9px] text-[rgba(237,218,186,0.3)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e]" />
            {provider} · ultima busca: {lastFetch}
          </div>
        )}

        {error && (
          <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[6px] px-3 py-2">
            {error}
          </div>
        )}

        {usingFallback && !loading && (
          <div className="text-[9px] text-[rgba(237,218,186,0.25)] italic">Exibindo exemplos locais enquanto o Perplexica nao responde.</div>
        )}

        <div className="flex gap-1.5 flex-wrap">
          {(['todos', 'ia', 'enfermagem', 'saude_digital', 'negocios'] as Category[]).map(f => (
            <button key={f} onClick={() => changeFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all
                ${filter === f ? 'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]'
                  : 'border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20'}`}>
              {f === 'todos' ? 'Todos' : CAT_LABEL[f]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-7 h-7 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
            <div className="text-[11px] text-[rgba(237,218,186,0.4)]">Buscando noticias...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filtered.map(n => (
              <a key={n.id}
                href={n.url !== '#' ? n.url : undefined}
                target={n.url !== '#' ? '_blank' : undefined}
                rel="noreferrer"
                className="block bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 hover:border-[rgba(255,84,4,0.22)] transition-colors group cursor-pointer">
                <div className="text-[8px] font-bold tracking-[1px] uppercase text-[#FF5404] mb-1.5">{n.source}</div>
                <div className="text-[12px] font-semibold text-white mb-1.5 leading-snug group-hover:text-[#FF5404] transition-colors">{n.title}</div>
                <div className="text-[10px] text-[rgba(237,218,186,0.5)] leading-relaxed mb-2.5">{n.summary}</div>
                <div className="flex items-center gap-2">
                  <Badge variant={CAT_BADGE[n.category] || 'muted'}>{CAT_LABEL[n.category] || n.category}</Badge>
                  <span className="text-[9px] text-[rgba(237,218,186,0.25)] ml-auto">{n.date}</span>
                  {n.url !== '#' && <span className="text-[9px] text-[rgba(237,218,186,0.3)] group-hover:text-[#FF5404]">abrir</span>}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
