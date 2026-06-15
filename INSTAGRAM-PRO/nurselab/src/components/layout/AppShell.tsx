'use client'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../modules/Dashboard'
import Instagram from '../modules/Instagram'
import Analytics from '../modules/Analytics'
import Calendario from '../modules/Calendario'
import Conteudo from '../modules/Conteudo'
import Biblioteca from '../modules/Biblioteca'
import GeneratorLab from '../modules/GeneratorLab'
import Concorrentes from '../modules/Concorrentes'
import Noticias from '../modules/Noticias'
import Negocio from '../modules/Negocio'
import Templates from '../modules/Templates'
import Perfis from '../modules/Perfis'
import Apis from '../modules/Apis'
import { storage, SAMPLE_POSTS, SAMPLE_COMPETITORS, DEFAULT_PROFILE } from '@/lib/storage'
import type { Profile } from '@/types'

export type Page = 'dashboard'|'instagram'|'analytics'|'calendario'|'conteudo'|'generatorlab'|'biblioteca'|'concorrentes'|'noticias'|'negocio'|'templates'|'perfis'|'apis'

export default function AppShell() {
  const [page, setPage] = useState<Page>('dashboard')
  const [logoSrc, setLogoSrc] = useState('')
  const [sbStatus, setSbStatus] = useState('Iniciando…')
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([])

  function loadProfiles() {
    let profs = storage.getProfiles()
    if (profs.length === 0) { storage.addProfile(DEFAULT_PROFILE); profs = [DEFAULT_PROFILE] }
    setProfiles(profs)
    setActiveProfile(storage.getActiveProfile())
  }

  useEffect(() => {
    fetch('/logo_data.txt').then(r => r.text()).then(setLogoSrc).catch(() => {})
    if (storage.getPosts().length === 0) storage.setPosts(SAMPLE_POSTS)
    if (storage.getCompetitors().length === 0) storage.setCompetitors(SAMPLE_COMPETITORS)
    loadProfiles()
    setSbStatus('✓ NurseLab pronto')
  }, [])

  useEffect(() => { loadProfiles() }, [page])

  function switchProfile(p: Profile) {
    storage.setActiveProfile(p.id)
    setActiveProfile(p)
    setShowProfileMenu(false)
  }

  function initials(name: string) {
    return name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
  }

  const pages: Record<Page, React.ReactNode> = {
    dashboard:    <Dashboard onNavigate={setPage} />,
    instagram:    <Instagram />,
    analytics:    <Analytics />,
    calendario:   <Calendario />,
    conteudo:     <Conteudo />,
    generatorlab: <GeneratorLab />,
    biblioteca:   <Biblioteca />,
    concorrentes: <Concorrentes />,
    noticias:     <Noticias />,
    negocio:      <Negocio />,
    templates:    <Templates />,
    perfis:       <Perfis />,
    apis:         <Apis />,
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* TOP BAR */}
      <header className="flex items-center justify-between px-4 h-12 bg-[#050505] border-b border-white/[0.08] flex-shrink-0">
        <button onClick={() => setPage('dashboard')} className="flex items-center gap-2.5">
          {logoSrc
            ? <img src={logoSrc} alt="NurseLab" className="w-8 h-8 rounded-lg object-cover border border-[rgba(255,84,4,0.3)]" />
            : <div className="w-8 h-8 rounded-lg bg-[#FF5404] flex items-center justify-center font-display font-bold text-white text-sm">N</div>
          }
          <span className="font-display font-bold text-white text-base tracking-tight">NurseLab</span>
          <span className="text-[8px] text-[rgba(237,218,186,0.28)] tracking-[1.2px] uppercase">Content OS</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] animate-pulse" />
          <span className="text-[9px] text-[rgba(237,218,186,0.3)]">{sbStatus}</span>

          {/* Profile switcher */}
          {activeProfile && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-[7px] border border-white/[0.08] hover:border-[rgba(255,84,4,0.3)] transition-colors">
                {activeProfile.avatar
                  ? <img src={activeProfile.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                  : <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: activeProfile.brandColors?.[0] || '#FF5404' }}>
                      {initials(activeProfile.name)}
                    </div>
                }
                <span className="text-[10px] text-[rgba(237,218,186,0.7)]">{activeProfile.handle}</span>
                <span className="text-[8px] text-[rgba(237,218,186,0.3)]">▾</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] overflow-hidden z-50">
                  <div className="p-2">
                    {profiles.map(p => (
                      <button key={p.id} onClick={() => switchProfile(p)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-left transition-colors
                          ${p.id === activeProfile.id ? 'bg-[rgba(255,84,4,0.13)]' : 'hover:bg-white/[0.04]'}`}>
                        {p.avatar
                          ? <img src={p.avatar} alt="" className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                          : <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: p.brandColors?.[0] || '#FF5404' }}>
                              {initials(p.name)}
                            </div>
                        }
                        <div className="min-w-0 flex-1">
                          <div className={`text-[11px] font-semibold truncate ${p.id === activeProfile.id ? 'text-[#FF5404]' : 'text-[#EDDABA]'}`}>{p.name}</div>
                          <div className="text-[9px] text-[rgba(237,218,186,0.35)] truncate">{p.handle}</div>
                        </div>
                        {p.id === activeProfile.id && <div className="w-1.5 h-1.5 rounded-full bg-[#FF5404] flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.08] p-2">
                    <button onClick={() => { setPage('perfis'); setShowProfileMenu(false) }}
                      className="w-full text-left px-3 py-1.5 rounded-[6px] text-[10px] text-[rgba(237,218,186,0.45)] hover:bg-white/[0.04] hover:text-[#FF5404] transition-colors">
                      + Gerenciar perfis
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar current={page} onChange={setPage} />
        <main className="flex-1 overflow-hidden flex flex-col bg-black">
          <div className="flex-1 overflow-y-auto" key={page}>
            {pages[page]}
          </div>
          <div className="flex items-center gap-2 px-4 py-1 bg-black border-t border-white/[0.08] text-[9px] text-[rgba(237,218,186,0.25)] flex-shrink-0">
            <div className="w-1 h-1 rounded-full bg-[#3ecf8e]" />
            <span>{sbStatus}</span>
            <span className="ml-auto">NurseLab v3 · {activeProfile?.handle || '@enfermagemcom.ia'} · Content OS</span>
          </div>
        </main>
      </div>

      {showProfileMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
      )}
    </div>
  )
}
