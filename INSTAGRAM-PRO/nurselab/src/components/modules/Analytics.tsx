'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { Post } from '@/types'
import StatCard from '../ui/StatCard'
import PageHeader from '../ui/PageHeader'

const MOCK = {
  7:  { imp:'8.2K', eng:'4.8%', seg:'+89', alc:'6.1K', bars:[320,410,280,520,390,610,480], dates:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'] },
  30: { imp:'2.1M', eng:'6.73%',seg:'+500',alc:'1.4M', bars:[28,35,42,31,58,49,62,39,45,51,38,64,42,49,35,58,43,61,37,52,48,64,39,55,42,58,49,61,53,62].map(v=>v*1000), dates:['16 Fev','24 Fev','2 Mar','8 Mar','15 Mar'] },
  90: { imp:'68.4K',eng:'3.9%', seg:'+891',alc:'52K',  bars:Array.from({length:30},(_,i)=>Math.round(180000+i*5000+Math.sin(i/3)*30000)), dates:['Jan','Fev','Mar'] },
}
const TP = [
  {t:'Carrossel Despertar',tp:'Carrossel',e:'6.2%',r:'4.1K'},
  {t:'IA na triagem',tp:'Carrossel',e:'5.8%',r:'3.8K'},
  {t:'3 formas de monetizar',tp:'Reel',e:'4.9%',r:'5.2K'},
]

function fmt(n:number){if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1000)return(n/1000).toFixed(0)+'k';return Math.round(n).toString()}

export default function Analytics() {
  const [range, setRange] = useState<7|30|90>(30)
  const [posts, setPosts] = useState<Post[]>([])
  const d = MOCK[range]
  const mx = Math.max(...d.bars)

  useEffect(() => { setPosts(storage.getPosts()) }, [])

  // Real stats from localStorage
  const published = posts.filter(p => p.status === 'Publicado').length
  const scheduled = posts.filter(p => p.status === 'Agendado').length
  const totalPosts = posts.length
  const content = storage.getContent().length

  // Type breakdown for real data
  const byType: Record<string, number> = {}
  posts.forEach(p => { byType[p.type] = (byType[p.type] || 0) + 1 })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title="Analytics" subtitle="Performance de conteúdo — Instagram" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {/* Real data from local storage */}
        <div>
          <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Seus dados reais</div>
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="Posts publicados" value={published} sub="No seu Instagram" accent="#22c55e" />
            <StatCard label="Agendados" value={scheduled} sub="Próximos dias" accent="#3b82f6" />
            <StatCard label="Total de posts" value={totalPosts} sub="Todos os status" accent="#FF5404" />
            <StatCard label="Conteúdos gerados" value={content} sub="Com IA" accent="#a855f7" />
          </div>
        </div>

        {/* Type breakdown */}
        {totalPosts > 0 && (
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
            <div className="text-[10px] font-semibold text-white mb-3">Distribuição por tipo</div>
            <div className="flex flex-col gap-2">
              {Object.entries(byType).map(([type, count]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-[10px] text-[rgba(237,218,186,0.5)] w-24">{type}</span>
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded overflow-hidden">
                    <div className="h-full bg-[#FF5404] rounded" style={{width:`${(count/totalPosts)*100}%`}} />
                  </div>
                  <span className="text-[10px] font-bold text-[#FF5404] w-6">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Simulated Instagram metrics */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)]">
              Métricas simuladas
              <span className="ml-2 text-[rgba(237,218,186,0.15)] normal-case tracking-normal font-normal">(conecte Metricool para dados reais)</span>
            </div>
            <div className="flex gap-1.5">
              {([7,30,90] as const).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition-all
                    ${range===r?'bg-[#FF5404] border-[#FF5404] text-white':'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                  {r}d
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <StatCard label="Impressões" value={d.imp} sub="↑ período" accent="#FF5404" />
            <StatCard label="Engajamento" value={d.eng} sub="média" accent="#3ecf8e" />
            <StatCard label="Novos seguidores" value={d.seg} sub="período" accent="#3b82f6" />
            <StatCard label="Alcance" value={d.alc} sub="único" accent="#f59e0b" />
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[11px] font-semibold text-white mb-1">Impressões Diárias</div>
          <div className="text-[9px] text-[rgba(237,218,186,0.3)] mb-3">Últimos {range} dias</div>
          <div className="flex items-end gap-0.5 h-24 mb-1">
            {d.bars.filter((_,i) => i % Math.ceil(d.bars.length / 20) === 0).map((v, i, arr) => (
              <div key={i} className="flex-1 rounded-t-sm min-w-0 transition-all hover:opacity-75"
                style={{height:`${Math.round((v/mx)*100)}%`, background: i===arr.length-1?'#FF5404':'rgba(255,84,4,0.38)'}} />
            ))}
          </div>
          <div className="flex justify-between">
            {d.dates.map(dt => <span key={dt} className="text-[7px] text-[rgba(237,218,186,0.2)]">{dt}</span>)}
          </div>
        </div>

        {/* Top posts */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[11px] font-semibold text-white mb-3">Top Posts · Simulado</div>
          {TP.map((p, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0">
              <span className="font-display text-[13px] text-[rgba(237,218,186,0.22)] w-4">{i+1}</span>
              <span className="flex-1 text-[11px] text-white">{p.t}</span>
              <span className="text-[9px] font-bold text-[#22c55e]">{p.e}</span>
              <span className="text-[9px] text-[rgba(237,218,186,0.4)]">{p.r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
