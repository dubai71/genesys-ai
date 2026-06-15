'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { Post } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DAYS_LABEL = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

const STATUS_COLOR: Record<string, string> = {
  Publicado: 'rgba(34,197,94,0.15);color:#22c55e',
  Agendado:  'rgba(59,130,246,0.15);color:#3b82f6',
  Rascunho:  'rgba(237,218,186,0.07);color:rgba(237,218,186,.4)',
  Backlog:   'rgba(245,158,11,0.15);color:#f59e0b',
}

export default function Calendario() {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [posts, setPosts] = useState<Post[]>([])
  const [typeFilter, setTypeFilter] = useState('todos')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([])
  const [genLoading, setGenLoading] = useState(false)

  useEffect(() => { setPosts(storage.getPosts()) }, [])

  const today = new Date()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthPosts = posts.filter(p => {
    if (!p.date) return false
    if (typeFilter !== 'todos' && p.type !== typeFilter) return false
    const d = new Date(p.date + 'T00:00:00')
    return d.getFullYear() === year && d.getMonth() === month
  })

  const byDay: Record<number, Post[]> = {}
  monthPosts.forEach(p => {
    const d = new Date(p.date + 'T00:00:00').getDate()
    if (!byDay[d]) byDay[d] = []
    byDay[d].push(p)
  })

  function navMonth(dir: number) {
    let m = month + dir, y = year
    if (m > 11) { m = 0; y++ }
    if (m < 0)  { m = 11; y-- }
    setMonth(m); setYear(y); setSelectedDay(null)
  }

  function clickDay(day: number) {
    setSelectedDay(day)
    setSelectedPosts(byDay[day] || [])
  }

  async function generatePlan() {
    setGenLoading(true)
    const cfg = storage.getConfig()
    const biz = storage.getBusiness()

    const topics = [
      { type: 'Carrossel', topic: `IA na prática da ${biz.niche}` },
      { type: 'Post único', topic: `Motivação para o profissional estratégico` },
      { type: 'Reel', topic: `3 ferramentas de IA para ${biz.niche}` },
      { type: 'Carrossel', topic: `Como monetizar conhecimento em ${biz.niche}` },
      { type: 'Story', topic: `Enquete: qual é seu maior desafio?` },
      { type: 'Post único', topic: `Dado real sobre ${biz.niche} e IA` },
      { type: 'Reel', topic: `Rotina de quem trabalha com IA na saúde` },
    ]

    let added = 0
    for (let i = 0; i < daysInMonth; i++) {
      const d = new Date(year, month, i + 1)
      const dateStr = d.toISOString().split('T')[0]
      const existing = storage.getPosts().find(p => p.date === dateStr)
      if (!existing) {
        const item = topics[i % topics.length]
        storage.addPost({
          id: `plan-${Date.now()}-${i}`,
          title: item.topic,
          caption: '',
          type: item.type as any,
          status: 'Backlog',
          date: dateStr,
          img: 'none',
        })
        added++
      }
    }
    setPosts(storage.getPosts())
    setGenLoading(false)
    alert(`✓ Plano mensal gerado! ${added} posts adicionados ao backlog.`)
  }

  function deletePost(id: string) {
    storage.deletePost(id)
    const updated = storage.getPosts()
    setPosts(updated)
    setSelectedPosts(selectedPosts.filter(p => p.id !== id))
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main calendar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader title="Calendário" subtitle={`${MONTHS[month]} ${year}`}
          actions={[{ label: genLoading ? '⏳ Gerando…' : '✨ Plano Mensal', onClick: generatePlan }]} />

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {['todos','Carrossel','Reel','Story','Post único'].map(f => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all
                    ${typeFilter===f?'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]':'border-white/[0.08] text-[rgba(237,218,186,0.4)]'}`}>
                  {f === 'todos' ? 'Todos' : f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => navMonth(-1)} className="w-7 h-7 rounded border border-white/[0.08] text-[rgba(237,218,186,0.4)] hover:border-white/20 text-sm flex items-center justify-center">←</button>
              <button onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()) }}
                className="px-2.5 py-1 rounded border border-white/[0.08] text-[9px] text-[rgba(237,218,186,0.4)] hover:border-white/20">Hoje</button>
              <button onClick={() => navMonth(1)} className="w-7 h-7 rounded border border-white/[0.08] text-[rgba(237,218,186,0.4)] hover:border-white/20 text-sm flex items-center justify-center">→</button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1">
            {DAYS_LABEL.map(d => (
              <div key={d} className="text-center text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.2)] py-1">{d}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} className="min-h-[56px]" />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
              const isSelected = selectedDay === day
              const dayPosts = byDay[day] || []
              return (
                <button key={day} onClick={() => clickDay(day)}
                  className={`bg-[#0a0a0a] rounded-[6px] p-1.5 min-h-[56px] text-left border transition-all hover:border-[rgba(255,84,4,0.25)]
                    ${isSelected ? 'border-[#FF5404] bg-[rgba(255,84,4,0.06)]' : isToday ? 'border-[rgba(255,84,4,0.4)]' : 'border-white/[0.07]'}`}>
                  <div className={`text-[9px] font-bold mb-1 ${isToday || isSelected ? 'text-[#FF5404]' : 'text-[rgba(237,218,186,0.25)]'}`}>{day}</div>
                  {dayPosts.slice(0, 2).map(p => (
                    <div key={p.id} className="text-[7px] font-bold px-1 py-0.5 rounded mb-0.5 truncate"
                      style={{ background: STATUS_COLOR[p.status]?.split(';')[0] || 'rgba(237,218,186,0.07)',
                               color: STATUS_COLOR[p.status]?.split(';')[1]?.replace('color:','') || 'rgba(237,218,186,0.4)' }}>
                      {p.title.substring(0, 13)}
                    </div>
                  ))}
                  {dayPosts.length > 2 && (
                    <div className="text-[7px] text-[rgba(237,218,186,0.25)]">+{dayPosts.length - 2}</div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {(['Publicado','Agendado','Rascunho','Backlog'] as const).map(s => (
              <div key={s} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[7px] px-3 py-2 text-center">
                <div className="font-display text-lg font-bold text-white">{monthPosts.filter(p => p.status === s).length}</div>
                <div className="text-[9px] text-[rgba(237,218,186,0.35)] mt-0.5">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day detail panel */}
      {selectedDay && (
        <div className="w-64 flex-shrink-0 border-l border-white/[0.08] flex flex-col bg-[#050505]">
          <div className="p-4 border-b border-white/[0.08]">
            <div className="text-[10px] text-[rgba(237,218,186,0.35)] mb-0.5">{MONTHS[month]} {year}</div>
            <div className="font-display text-2xl font-bold text-white">Dia {selectedDay}</div>
            <div className="text-[10px] text-[rgba(237,218,186,0.35)] mt-0.5">{selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''}</div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {selectedPosts.length === 0 ? (
              <div className="text-center py-8 text-[rgba(237,218,186,0.25)] text-[11px]">
                Nenhum post neste dia
              </div>
            ) : selectedPosts.map(p => (
              <div key={p.id} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[8px] p-3">
                <div className="text-[11px] font-semibold text-white mb-1 leading-snug">{p.title}</div>
                {p.caption && <div className="text-[9px] text-[rgba(237,218,186,0.4)] mb-2 leading-snug line-clamp-2">{p.caption}</div>}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant={p.type==='Carrossel'?'brand':p.type==='Reel'?'blue':'muted'}>{p.type}</Badge>
                  <Badge variant={p.status==='Publicado'?'green':p.status==='Agendado'?'blue':'amber'}>{p.status}</Badge>
                </div>
                <button onClick={() => deletePost(p.id)}
                  className="text-[9px] text-[rgba(237,218,186,0.25)] hover:text-[#ef4444] mt-2 block">
                  ✕ remover
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/[0.08]">
            <button onClick={() => setSelectedDay(null)}
              className="text-[10px] text-[rgba(237,218,186,0.35)] hover:text-[#EDDABA] w-full text-center">
              ✕ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
