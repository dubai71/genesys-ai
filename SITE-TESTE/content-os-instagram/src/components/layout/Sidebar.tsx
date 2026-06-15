'use client'
import { useState } from 'react'
import type { Page } from './AppShell'

const NAV = [
  { id: 'dashboard', icon: '⬛', label: 'Dashboard' },
  { id: 'instagram', icon: '📱', label: 'Instagram' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'calendario', icon: '📅', label: 'Calendário' },
  { id: 'conteudo', icon: '✨', label: 'Criar Conteúdo' },
  { id: 'biblioteca', icon: '📚', label: 'Biblioteca' },
  { id: 'concorrentes', icon: '🔍', label: 'Concorrentes' },
  { id: 'noticias', icon: '📰', label: 'Notícias' },
  { id: 'negocio', icon: '🏢', label: 'Meu Negócio' },
] as const

const NAV_BOTTOM = [
  { id: 'apis', icon: '🔑', label: 'APIs & Config' },
] as const

type Props = { current: Page; onChange: (p: Page) => void }

export default function Sidebar({ current, onChange }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <aside
      className={`flex-shrink-0 bg-black border-r border-white/[0.08] flex flex-col py-2 transition-all duration-200 overflow-hidden ${hovered ? 'w-44' : 'w-12'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-0.5 flex-1">
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id as Page)}
            className={`flex items-center gap-2.5 w-full px-3 py-2 text-left transition-all duration-150 border-l-2 whitespace-nowrap
              ${current === item.id
                ? 'text-[#FF5404] border-[#FF5404] bg-[rgba(255,84,4,0.13)]'
                : 'text-[rgba(237,218,186,0.45)] border-transparent hover:bg-[rgba(237,218,186,0.07)] hover:text-[#EDDABA]'
              }`}
          >
            <span className="text-sm w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className={`text-[11px] transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-white/[0.08] pt-2">
        {NAV_BOTTOM.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id as Page)}
            className={`flex items-center gap-2.5 w-full px-3 py-2 text-left transition-all duration-150 border-l-2 whitespace-nowrap
              ${current === item.id
                ? 'text-[#FF5404] border-[#FF5404] bg-[rgba(255,84,4,0.13)]'
                : 'text-[rgba(237,218,186,0.45)] border-transparent hover:bg-[rgba(237,218,186,0.07)] hover:text-[#EDDABA]'
              }`}
          >
            <span className="text-sm w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className={`text-[11px] transition-opacity duration-150 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
