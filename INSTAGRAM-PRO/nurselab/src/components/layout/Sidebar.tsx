'use client'
import { useState } from 'react'
import type { Page } from './AppShell'

const NAV_TOP = [
  { id: 'dashboard',    icon: '⬛', label: 'Dashboard' },
  { id: 'instagram',    icon: '📱', label: 'Instagram' },
  { id: 'analytics',   icon: '📊', label: 'Analytics' },
  { id: 'calendario',  icon: '📅', label: 'Calendário' },
  { id: 'conteudo',    icon: '✨', label: 'Criar Conteúdo' },
  { id: 'generatorlab', icon: '⚡', label: 'GeneratorLab' },
  { id: 'dnastudio',   icon: '🧬', label: 'DNA Studio' },
  { id: 'biblioteca',  icon: '📚', label: 'Biblioteca' },
  { id: 'concorrentes',icon: '🔍', label: 'Concorrentes' },
  { id: 'noticias',    icon: '📰', label: 'Notícias' },
] as const

const NAV_BTM = [
  { id: 'templates',   icon: '🎨', label: 'Templates' },
  { id: 'perfis',      icon: '👤', label: 'Perfis' },
  { id: 'negocio',     icon: '🏢', label: 'Meu Negócio' },
  { id: 'apis',        icon: '🔑', label: 'APIs & Config' },
] as const

type Props = { current: Page; onChange: (p: Page) => void }

export default function Sidebar({ current, onChange }: Props) {
  const [hovered, setHovered] = useState(false)
  const item = (id: string, icon: string, label: string) => (
    <button key={id} onClick={() => onChange(id as Page)}
      className={`flex items-center gap-2.5 w-full px-3 py-2 text-left border-l-2 whitespace-nowrap transition-all
        ${current === id
          ? 'text-[#FF5404] border-[#FF5404] bg-[rgba(255,84,4,0.13)]'
          : 'text-[rgba(237,218,186,0.45)] border-transparent hover:bg-[rgba(237,218,186,0.07)] hover:text-[#EDDABA]'}`}>
      <span className="text-sm w-5 text-center flex-shrink-0">{icon}</span>
      <span className={`text-[11px] transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </button>
  )
  return (
    <aside
      className={`flex-shrink-0 bg-black border-r border-white/[0.08] flex flex-col py-2 transition-all duration-200 overflow-hidden ${hovered ? 'w-44' : 'w-12'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="flex flex-col gap-0.5 flex-1">
        {NAV_TOP.map(n => item(n.id, n.icon, n.label))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-white/[0.08] pt-2">
        {NAV_BTM.map(n => item(n.id, n.icon, n.label))}
      </div>
    </aside>
  )
}