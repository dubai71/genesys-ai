'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { Competitor, ViralPost, ViralFormat } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import StatCard from '../ui/StatCard'

const FORMAT_ICONS: Record<ViralFormat, string> = {
  carousel: '🎠',
  reel: '🎬',
  post: '📷',
  story: '📱',
}

const FORMAT_LABELS: Record<ViralFormat, string> = {
  carousel: 'Carrossel',
  reel: 'Reel',
  post: 'Post',
  story: 'Story',
}

export default function Concorrentes() {
  const [comps, setComps] = useState<Competitor[]>([])
  const [viralPosts, setViralPosts] = useState<ViralPost[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showViralForm, setShowViralForm] = useState(false)
  const [form, setForm] = useState({ handle:'', seg:'', eng:'', freq:3, trend:'+0%', nicho:'Saúde Digital', cor:'#FF5404' })
  const [viralForm, setViralForm] = useState({
    competitorId: '', competitorHandle: '', title: '', format: 'carousel' as ViralFormat,
    likes: '', comments: '', saves: '', date: new Date().toISOString().split('T')[0], url: '', notes: ''
  })

  useEffect(() => {
    setComps(storage.getCompetitors())
    setViralPosts(storage.getViralPosts())
  }, [])
  const refresh = () => {
    setComps(storage.getCompetitors())
    setViralPosts(storage.getViralPosts())
  }

  function add() {
    if (!form.handle.trim()) return
    const c: Competitor = {
      ...form,
      handle: form.handle.startsWith('@') ? form.handle : '@' + form.handle,
      id: Date.now().toString(),
    }
    storage.addCompetitor(c); refresh()
    setForm({ handle:'', seg:'', eng:'', freq:3, trend:'+0%', nicho:'Saúde Digital', cor:'#FF5404' })
    setShowForm(false)
  }
  function del(id: string) { storage.deleteCompetitor(id); refresh() }

  function addViral() {
    if (!viralForm.title.trim()) return
    const comp = comps.find(c => c.id === viralForm.competitorId)
    const post: ViralPost = {
      id: Date.now().toString(),
      competitorId: viralForm.competitorId || undefined,
      competitorHandle: comp?.handle || viralForm.competitorHandle || 'Anônimo',
      title: viralForm.title,
      format: viralForm.format,
      likes: viralForm.likes ? parseInt(viralForm.likes) : undefined,
      comments: viralForm.comments ? parseInt(viralForm.comments) : undefined,
      saves: viralForm.saves ? parseInt(viralForm.saves) : undefined,
      date: viralForm.date,
      url: viralForm.url || undefined,
      notes: viralForm.notes || undefined,
      createdAt: new Date().toISOString(),
    }
    storage.addViralPost(post); refresh()
    setViralForm({ competitorId: '', competitorHandle: '', title: '', format: 'carousel', likes: '', comments: '', saves: '', date: new Date().toISOString().split('T')[0], url: '', notes: '' })
    setShowViralForm(false)
  }
  function delViral(id: string) { storage.deleteViralPost(id); refresh() }

  // Stats
  const carouselCount = viralPosts.filter(p => p.format === 'carousel').length
  const reelCount = viralPosts.filter(p => p.format === 'reel').length
  const totalLikes = viralPosts.reduce((acc, p) => acc + (p.likes || 0), 0)
  const totalSaves = viralPosts.reduce((acc, p) => acc + (p.saves || 0), 0)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Concorrentes"
        subtitle="Rastreie perfis do nicho de Enfermagem + IA"
        actions={[
          { label:'+ Adicionar', onClick:()=>setShowForm(!showForm) },
          { label:'+ Post Viral', onClick:()=>setShowViralForm(!showViralForm) },
        ]}
      />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Perfis rastreados" value={comps.length} sub="Ativos" accent="#FF5404" />
          <StatCard label="Posts virais" value={viralPosts.length} sub={`🎠${carouselCount} 🎬${reelCount}`} accent="#f59e0b" />
          <StatCard label="Total engajamento" value={totalLikes.toLocaleString('pt-BR')} sub={`❤ ${totalSaves} saves`} accent="#22c55e" />
        </div>

        {/* Form Competitor */}
        {showForm && (
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 flex flex-col gap-3">
            <div className="text-[12px] font-semibold text-white">Adicionar Concorrente</div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="@ Instagram" value={form.handle} onChange={e=>setForm({...form,handle:e.target.value})} placeholder="@perfil" />
              <Select label="Nicho" value={form.nicho} onChange={e=>setForm({...form,nicho:e.target.value})}
                options={['Saúde Digital','Enfermagem + IA','Empreendedorismo','Educação em Saúde'].map(v=>({value:v,label:v}))} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <Input label="Seguidores" value={form.seg} onChange={e=>setForm({...form,seg:e.target.value})} placeholder="12.4K" />
              <Input label="Engajamento" value={form.eng} onChange={e=>setForm({...form,eng:e.target.value})} placeholder="3.8%" />
              <Input label="Freq./sem" type="number" value={String(form.freq)} onChange={e=>setForm({...form,freq:Number(e.target.value)})} />
              <Input label="Crescimento" value={form.trend} onChange={e=>setForm({...form,trend:e.target.value})} placeholder="+2.1%" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={()=>setShowForm(false)}>Cancelar</Button>
              <Button size="sm" onClick={add}>Salvar</Button>
            </div>
          </div>
        )}

        {/* Form Viral Post */}
        {showViralForm && (
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4 flex flex-col gap-3">
            <div className="text-[12px] font-semibold text-white">Registrar Post Viral</div>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Título" value={viralForm.title} onChange={e=>setViralForm({...viralForm,title:e.target.value})} placeholder="Assunto do post" />
              <Select label="Formato" value={viralForm.format} onChange={e=>setViralForm({...viralForm,format:e.target.value as ViralFormat})}
                options={(['carousel','reel','post','story'] as ViralFormat[]).map(v=>({value:v,label:`${FORMAT_ICONS[v]} ${FORMAT_LABELS[v]}`}))} />
              <Input label="Data" type="date" value={viralForm.date} onChange={e=>setViralForm({...viralForm,date:e.target.value})} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <Input label="Curtidas" type="number" value={viralForm.likes} onChange={e=>setViralForm({...viralForm,likes:e.target.value})} placeholder="1200" />
              <Input label="Comentarios" type="number" value={viralForm.comments} onChange={e=>setViralForm({...viralForm,comments:e.target.value})} placeholder="45" />
              <Input label="Salvamentos" type="number" value={viralForm.saves} onChange={e=>setViralForm({...viralForm,saves:e.target.value})} placeholder="340" />
              <Input label="Concorrente" value={viralForm.competitorHandle || comps.find(c=>c.id===viralForm.competitorId)?.handle || ''} 
                onChange={e=>setViralForm({...viralForm,competitorHandle:e.target.value})} placeholder="@perfil" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="URL" value={viralForm.url} onChange={e=>setViralForm({...viralForm,url:e.target.value})} placeholder="https://..." />
              <Input label="Notas" value={viralForm.notes || ''} onChange={e=>setViralForm({...viralForm,notes:e.target.value})} placeholder="O que fez funcionar?" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" size="sm" onClick={()=>setShowViralForm(false)}>Cancelar</Button>
              <Button size="sm" onClick={addViral}>Salvar</Button>
            </div>
          </div>
        )}

        {/* Table Competitors */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] overflow-hidden">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                {['Perfil','Seguidores','Eng.','Freq./sem','Crescimento',''].map(h => (
                  <th key={h} className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] px-4 py-2.5 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-[rgba(237,218,186,0.25)] text-[11px]">
                    Nenhum concorrente ainda. Clique em + Adicionar.
                  </td>
                </tr>
              ) : comps.map(c => (
                <tr key={c.id} className="border-b border-white/[0.04] hover:bg-[rgba(237,218,186,0.03)] transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{background:c.cor+'22',color:c.cor}}>
                        {(c.handle?.[1] || '?').toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white">{c.handle}</div>
                        <div className="text-[9px] text-[rgba(237,218,186,0.4)]">{c.nicho}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-[rgba(237,218,186,0.7)]">{c.seg || '—'}</td>
                  <td className="px-4 py-2.5 text-[rgba(237,218,186,0.7)]">{c.eng || '—'}</td>
                  <td className="px-4 py-2.5">
                    <div className="text-[rgba(237,218,186,0.7)]">{c.freq}x/sem</div>
                    <div className="w-12 h-0.5 bg-[rgba(255,84,4,0.15)] rounded mt-1">
                      <div className="h-full bg-[#FF5404] rounded" style={{width:`${Math.min((c.freq/7)*100,100)}%`}} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-bold ${c.trend?.startsWith('+') ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                      {c.trend || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => del(c.id)} className="text-[rgba(237,218,186,0.25)] hover:text-[#ef4444] transition-colors">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Viral Posts Section */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Posts Virais Rastreados</div>
          
          {viralPosts.length === 0 ? (
            <div className="text-center py-6 text-[rgba(237,218,186,0.25)] text-[11px]">
              Nenhum post viral rastreado. Use + Post Viral para registrar.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {viralPosts.map(post => (
                <div key={post.id} className="bg-[#111] rounded-[7px] p-3 border border-white/[0.04] hover:border-[rgba(255,84,4,0.2)] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{FORMAT_ICONS[post.format]}</span>
                      <span className="text-[9px] font-bold tracking-wide uppercase text-[#FF5404]">{FORMAT_LABELS[post.format]}</span>
                    </div>
                    <button onClick={() => delViral(post.id)} className="text-[rgba(237,218,186,0.2)] hover:text-[#ef4444] text-[10px]">✕</button>
                  </div>
                  <div className="text-[11px] font-semibold text-white mb-1 leading-snug">{post.title}</div>
                  <div className="text-[9px] text-[rgba(237,218,186,0.5)] mb-2">@{post.competitorHandle}</div>
                  <div className="flex gap-3 text-[9px] text-[rgba(237,218,186,0.5)]">
                    {post.likes && <span>❤ {post.likes.toLocaleString('pt-BR')}</span>}
                    {post.comments && <span>💬 {post.comments}</span>}
                    {post.saves && <span>🔖 {post.saves}</span>}
                  </div>
                  {post.notes && (
                    <div className="text-[9px] text-[rgba(237,218,186,0.35)] mt-2 italic border-t border-white/[0.04] pt-2">{post.notes}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Insights do nicho</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon:'📅', label:'Melhor dia', value:'Terça e Quinta', desc:'Maior engajamento no nicho saúde' },
              { icon:'⏰', label:'Melhor horário', value:'18h–20h', desc:'Enfermeiros saindo do plantão' },
              { icon:'🎯', label:'Formato top', value: carouselCount > reelCount ? 'Carrossel' : 'Reel', desc:`${carouselCount} carrosséis · ${reelCount} reels rastreados` },
            ].map(tip => (
              <div key={tip.label} className="bg-[#111] rounded-[7px] p-3">
                <div className="text-base mb-1">{tip.icon}</div>
                <div className="text-[9px] text-[rgba(237,218,186,0.35)] mb-0.5">{tip.label}</div>
                <div className="text-[11px] font-semibold text-white">{tip.value}</div>
                <div className="text-[9px] text-[rgba(237,218,186,0.35)] mt-1">{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}