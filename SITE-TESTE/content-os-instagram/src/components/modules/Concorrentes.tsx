'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { Competitor } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import StatCard from '../ui/StatCard'

export default function Concorrentes() {
  const [comps, setComps] = useState<Competitor[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ handle:'', seg:'', eng:'', freq:3, trend:'+0%', nicho:'Saúde Digital', cor:'#FF5404' })

  useEffect(() => { setComps(storage.getCompetitors()) }, [])
  const refresh = () => setComps(storage.getCompetitors())

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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Concorrentes"
        subtitle="Rastreie perfis do nicho de Enfermagem + IA"
        actions={[{ label:'+ Adicionar', onClick:()=>setShowForm(!showForm) }]}
      />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Perfis rastreados" value={comps.length} sub="Ativos" accent="#FF5404" />
          <StatCard label="Avg eng. nicho" value="3.2%" sub="Benchmark" accent="#f59e0b" />
          <StatCard label="Seu engajamento" value="4.3%" sub="↑ Acima da média" accent="#22c55e" />
        </div>

        {/* Form */}
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

        {/* Table */}
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
                  <td colSpan={6} className="text-center py-10 text-[rgba(237,218,186,0.25)] text-[11px]">
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

        {/* Tips */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Insights do nicho</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon:'📅', label:'Melhor dia', value:'Terça e Quinta', desc:'Maior engajamento no nicho saúde' },
              { icon:'⏰', label:'Melhor horário', value:'18h–20h', desc:'Enfermeiros saindo do plantão' },
              { icon:'🎯', label:'Formato top', value:'Carrossel', desc:'3x mais salvamentos que posts únicos' },
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
