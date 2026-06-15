'use client'
import { useEffect, useState } from 'react'
import { storage } from '@/lib/storage'
import type { Page } from '../layout/AppShell'
import StatCard from '../ui/StatCard'
import type { Post, GeneratedContent } from '@/types'

const QUICK = [
  { id:'conteudo', icon:'✨', label:'Criar Conteúdo', desc:'Gerar posts, carrosséis e reels com IA' },
  { id:'instagram', icon:'📱', label:'Instagram', desc:'Gerenciar posts e agendamentos' },
  { id:'calendario', icon:'📅', label:'Calendário', desc:'Plano editorial mensal' },
  { id:'biblioteca', icon:'📚', label:'Biblioteca', desc:'Todo conteúdo gerado' },
]

type Props = { onNavigate: (p: Page) => void }
export default function Dashboard({ onNavigate }: Props) {
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState<GeneratedContent[]>([])
  const [business] = useState(() => storage.getBusiness())

  useEffect(() => {
    setPosts(storage.getPosts())
    setContent(storage.getContent())
  }, [])

  const published = posts.filter(p => p.status === 'Publicado').length
  const scheduled = posts.filter(p => p.status === 'Agendado').length

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-2xl font-bold text-white tracking-tight">
          Bom dia, Arthur 👋
        </h1>
        <p className="text-sm text-[rgba(237,218,186,0.45)] mt-1">
          {business.instagramHandle} · {new Date().toLocaleDateString('pt-BR', {weekday:'long',day:'numeric',month:'long'})}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Posts publicados" value={published} sub="Este mês" accent="#22c55e" />
        <StatCard label="Agendados" value={scheduled} sub="Próximos dias" accent="#3b82f6" />
        <StatCard label="Conteúdos gerados" value={content.length} sub="Com IA" accent="#FF5404" />
        <StatCard label="Backlog" value={posts.filter(p=>p.status==='Backlog').length} sub="Ideias salvas" accent="#f59e0b" />
      </div>

      {/* Quick access */}
      <div>
        <h2 className="text-[10px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Acesso rápido</h2>
        <div className="grid grid-cols-4 gap-2">
          {QUICK.map(q => (
            <button key={q.id} onClick={() => onNavigate(q.id as Page)}
              className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 text-left hover:border-[rgba(255,84,4,0.3)] transition-colors group">
              <div className="text-xl mb-2">{q.icon}</div>
              <div className="text-[12px] font-semibold text-white">{q.label}</div>
              <div className="text-[10px] text-[rgba(237,218,186,0.35)] mt-1 leading-tight">{q.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent content */}
      {content.length > 0 && (
        <div>
          <h2 className="text-[10px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Conteúdo recente</h2>
          <div className="flex flex-col gap-1.5">
            {content.slice(0,3).map(c => (
              <div key={c.id} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] px-4 py-3 flex items-center gap-3">
                <span className="text-sm">✨</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-white truncate">{c.title}</div>
                  <div className="text-[10px] text-[rgba(237,218,186,0.4)]">{c.type} · {c.tone} · {new Date(c.createdAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <button onClick={() => onNavigate('biblioteca')} className="text-[10px] text-[#FF5404] hover:underline">Ver →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly schedule recommendation */}
      <div>
        <h2 className="text-[10px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Programação semanal recomendada</h2>
        <div className="grid grid-cols-7 gap-1.5">
          {[
            {d:'Seg',t:'Carrossel',o:'Valor'},
            {d:'Ter',t:'Post',o:'Conexão'},
            {d:'Qua',t:'Reel',o:'Alcance'},
            {d:'Qui',t:'Carrossel',o:'Autoridade'},
            {d:'Sex',t:'Story',o:'Engaj.'},
            {d:'Sáb',t:'Post',o:'Social'},
            {d:'Dom',t:'Thread',o:'Liderança'},
          ].map(day => (
            <div key={day.d} className="bg-[#0a0a0a] border border-white/[0.08] rounded-[7px] p-2 text-center">
              <div className="text-[9px] font-bold text-[#FF5404]">{day.d}</div>
              <div className="text-[9px] text-white font-semibold mt-1">{day.t}</div>
              <div className="text-[8px] text-[rgba(237,218,186,0.35)] mt-0.5">{day.o}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
