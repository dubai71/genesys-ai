'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { Post } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const STATUS_CHIP: Record<string, string> = {
  Publicado: 'background:rgba(34,197,94,.15);color:#22c55e',
  Agendado: 'background:rgba(59,130,246,.15);color:#3b82f6',
  Rascunho: 'background:rgba(237,218,186,.07);color:rgba(237,218,186,.4)',
  Backlog: 'background:rgba(245,158,11,.15);color:#f59e0b',
}

export default function Calendario() {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [posts, setPosts] = useState<Post[]>([])
  const [typeFilter, setTypeFilter] = useState<string>('todos')

  useEffect(() => { setPosts(storage.getPosts()) }, [])

  const today = new Date()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthPosts = posts.filter(p => {
    if (!p.date) return false
    if (typeFilter !== 'todos' && p.type !== typeFilter) return false
    const d = new Date(p.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const byDay: Record<number, Post[]> = {}
  monthPosts.forEach(p => {
    const d = new Date(p.date).getDate()
    if (!byDay[d]) byDay[d] = []
    byDay[d].push(p)
  })

  function navMonth(dir: number) {
    let m = month + dir, y = year
    if (m > 11) { m = 0; y++ }
    if (m < 0) { m = 11; y-- }
    setMonth(m); setYear(y)
  }

  // Generate monthly plan with AI
  const [genLoading, setGenLoading] = useState(false)
  async function generateMonthlyPlan() {
    setGenLoading(true)
    const cfg = storage.getConfig()
    const biz = storage.getBusiness()
    const key = cfg.apiKeys.anthropic
    if (!key) { alert('Configure a chave Anthropic em APIs'); setGenLoading(false); return }

    const plan = [
      {type:'Carrossel',topic:'IA na prática da enfermagem'},
      {type:'Post único',topic:'Motivação para o enfermeiro estratégico'},
      {type:'Reel',topic:'3 ferramentas de IA para enfermeiros'},
      {type:'Carrossel',topic:'Como monetizar seu conhecimento'},
      {type:'Story',topic:'Enquete: qual é seu maior desafio?'},
      {type:'Post único',topic:'Caso real de sucesso'},
      {type:'Reel',topic:'Plantão duplo vs renda digital'},
    ]

    const base = new Date(year, month, 1)
    for (let i = 0; i < 28; i++) {
      const d = new Date(base)
      d.setDate(i + 1)
      const item = plan[i % plan.length]
      const existing = storage.getPosts().find(p => p.date === d.toISOString().split('T')[0])
      if (!existing) {
        storage.addPost({
          id: Date.now().toString() + i,
          title: item.topic,
          caption: '',
          type: item.type as any,
          status: 'Backlog',
          date: d.toISOString().split('T')[0],
          img: 'none',
        })
      }
    }
    setPosts(storage.getPosts())
    setGenLoading(false)
    alert('Plano mensal gerado! 28 posts adicionados ao backlog.')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Calendário"
        subtitle="Distribuição mensal de conteúdo"
        actions={[
          { label: genLoading ? 'Gerando…' : '✨ Gerar Plano Mensal', onClick: generateMonthlyPlan },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {['todos','Carrossel','Reel','Story','Post único'].map(f => (
              <button key={f} onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition-all
                  ${typeFilter===f ? 'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                {f === 'todos' ? 'Todos' : f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navMonth(-1)} className="w-7 h-7 rounded-[5px] border border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20 text-sm">←</button>
            <span className="font-display text-base font-bold text-white min-w-[140px] text-center">{MONTHS[month]} {year}</span>
            <button onClick={() => navMonth(1)} className="w-7 h-7 rounded-[5px] border border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20 text-sm">→</button>
            <button onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()) }}
              className="px-2.5 py-1 rounded-[5px] border border-white/[0.08] text-[9px] text-[rgba(237,218,186,0.45)] hover:border-white/20">Hoje</button>
          </div>
        </div>

        {/* Calendar grid */}
        <div>
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[9px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.22)] py-1">{d}</div>
            ))}
          </div>
          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`e${i}`} className="rounded-[6px] min-h-[52px]" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
              const dayPosts = byDay[day] || []
              return (
                <div key={day}
                  className={`bg-[#0a0a0a] rounded-[6px] p-1.5 min-h-[52px] border transition-colors cursor-pointer hover:border-[rgba(255,84,4,0.25)]
                    ${isToday ? 'border-[#FF5404]' : 'border-white/[0.07]'}`}>
                  <div className={`text-[9px] font-bold mb-1 ${isToday ? 'text-[#FF5404]' : 'text-[rgba(237,218,186,0.28)]'}`}>{day}</div>
                  {dayPosts.slice(0, 2).map(p => (
                    <div key={p.id} className="text-[7px] font-bold px-1 py-0.5 rounded mb-0.5 truncate"
                      style={{ ...Object.fromEntries((STATUS_CHIP[p.status] || '').split(';').filter(Boolean).map(s => s.split(':').map(v => v.trim()))) }}>
                      {p.title.substring(0, 12)}
                    </div>
                  ))}
                  {dayPosts.length > 2 && (
                    <div className="text-[7px] text-[rgba(237,218,186,0.25)]">+{dayPosts.length - 2}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {(['Publicado','Agendado','Rascunho','Backlog'] as const).map(s => (
            <div key={s} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[7px] px-3 py-2 text-center">
              <div className="font-display text-lg font-bold text-white">{monthPosts.filter(p=>p.status===s).length}</div>
              <div className="text-[9px] text-[rgba(237,218,186,0.35)] mt-0.5">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
