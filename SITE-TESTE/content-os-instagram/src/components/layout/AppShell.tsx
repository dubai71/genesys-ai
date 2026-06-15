'use client'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Dashboard from '../modules/Dashboard'
import Instagram from '../modules/Instagram'
import Analytics from '../modules/Analytics'
import Calendario from '../modules/Calendario'
import Conteudo from '../modules/Conteudo'
import Biblioteca from '../modules/Biblioteca'
import Concorrentes from '../modules/Concorrentes'
import Noticias from '../modules/Noticias'
import Negocio from '../modules/Negocio'
import Apis from '../modules/Apis'
import { storage, SAMPLE_POSTS, SAMPLE_COMPETITORS } from '@/lib/storage'

export type Page = 'dashboard'|'instagram'|'analytics'|'calendario'|'conteudo'|'biblioteca'|'concorrentes'|'noticias'|'negocio'|'apis'

const LOGO = '/logo_data.txt'
const PHOTO = '/photo_data.txt'

export default function AppShell() {
  const [page, setPage] = useState<Page>('dashboard')
  const [logoSrc, setLogoSrc] = useState('')
  const [photoSrc, setPhotoSrc] = useState('')
  const [sbStatus, setSbStatus] = useState('Iniciando…')

  useEffect(() => {
    // Load embedded images
    fetch('/logo_data.txt').then(r=>r.text()).then(setLogoSrc).catch(()=>{})
    fetch('/photo_data.txt').then(r=>r.text()).then(setPhotoSrc).catch(()=>{})
    // Seed local storage if empty
    if (storage.getPosts().length === 0) storage.setPosts(SAMPLE_POSTS)
    if (storage.getCompetitors().length === 0) storage.setCompetitors(SAMPLE_COMPETITORS)
    setSbStatus('✓ NurseLab pronto · dados locais')
    // Try Supabase in background
    const cfg = storage.getConfig()
    if (cfg.apiKeys.supabaseUrl && cfg.apiKeys.supabaseKey) {
      setSbStatus('Conectando ao Supabase…')
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 5000)
      fetch(cfg.apiKeys.supabaseUrl + '/rest/v1/nl_posts?select=id&limit=1', {
        headers: { apikey: cfg.apiKeys.supabaseKey!, Authorization: 'Bearer ' + cfg.apiKeys.supabaseKey },
        signal: ctrl.signal,
      }).then(() => { clearTimeout(timer); setSbStatus('✓ Supabase conectado') })
        .catch(() => setSbStatus('✓ Modo local ativo'))
    }
  }, [])

  const pages: Record<Page, React.ReactNode> = {
    dashboard: <Dashboard onNavigate={setPage} />,
    instagram: <Instagram />,
    analytics: <Analytics />,
    calendario: <Calendario />,
    conteudo: <Conteudo />,
    biblioteca: <Biblioteca />,
    concorrentes: <Concorrentes />,
    noticias: <Noticias />,
    negocio: <Negocio />,
    apis: <Apis />,
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* TOP BAR - logo + status only, NO nav tabs */}
      <header className="flex items-center justify-between px-4 h-12 bg-[#050505] border-b border-white/[0.08] flex-shrink-0">
        <button onClick={() => setPage('dashboard')} className="flex items-center gap-2.5">
          {logoSrc
            ? <img src={logoSrc} alt="NurseLab" className="w-8 h-8 rounded-lg object-cover border border-[rgba(255,84,4,0.3)]" />
            : <div className="w-8 h-8 rounded-lg bg-[#FF5404] flex items-center justify-center font-display font-bold text-white text-sm">N</div>
          }
          <span className="font-display font-bold text-white text-base tracking-tight">NurseLab</span>
          <span className="text-[8px] text-[rgba(237,218,186,0.28)] tracking-[1.2px] uppercase">Content OS</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] pulse-dot" />
          <span className="text-[9px] text-[rgba(237,218,186,0.3)]" id="sb-status">{sbStatus}</span>
          <div className="flex gap-1.5 ml-2">
            {['Supabase','Freepik','fal.ai'].map(b => (
              <span key={b} className="px-1.5 py-0.5 rounded-full text-[8px] font-semibold border"
                style={b==='Supabase'?{background:'rgba(62,207,142,0.1)',color:'#3ecf8e',borderColor:'rgba(62,207,142,0.2)'}
                  :b==='Freepik'?{background:'rgba(0,177,255,0.1)',color:'#00b1ff',borderColor:'rgba(0,177,255,0.18)'}
                  :{background:'rgba(255,84,4,0.13)',color:'#FF5404',borderColor:'rgba(255,84,4,0.2)'}}>
                {b}
              </span>
            ))}
          </div>
          {photoSrc && (
            <button onClick={() => setPage('negocio')}>
              <img src={photoSrc} alt="Arthur" className="w-7 h-7 rounded-full object-cover border border-[#FF5404] ml-1" />
            </button>
          )}
        </div>
      </header>

      {/* BODY: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar current={page} onChange={setPage} />
        <main className="flex-1 overflow-hidden flex flex-col bg-black">
          <div className="flex-1 overflow-y-auto fade-in" key={page}>
            {pages[page]}
          </div>
          {/* Status bar */}
          <div className="flex items-center gap-2 px-4 py-1 bg-black border-t border-white/[0.08] text-[9px] text-[rgba(237,218,186,0.25)] flex-shrink-0">
            <div className="w-1 h-1 rounded-full bg-[#3ecf8e]" />
            <span>{sbStatus}</span>
            <span className="ml-auto">NurseLab v2.0 · @enfermagemcom.ia · Content OS</span>
          </div>
        </main>
      </div>
    </div>
  )
}
