'use client'
import { useState } from 'react'
import StatCard from '../ui/StatCard'
import PageHeader from '../ui/PageHeader'

const DATA = {
  7:  { i:'8.2K', e:'4.8%', s:'+89',  a:'6.1K',  bars:[320,410,280,520,390,610,480],       seg:[23100,23180,23240,23290,23350,23410,23480], dates:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'] },
  30: { i:'2.1M', e:'6.73%',s:'+500', a:'1.4M',  bars:[28,35,42,31,58,49,62,39,45,51,38,64,42,49,35,58,43,61,37,52,48,64,39,55,42,58,49,61,53,62].map(v=>v*1000), seg:[23100,23200,23300,23250,23400,23500,23600,23700,23800,23900,24000,24100,24200,24300,24400,24500,24600,24700,24800,24900,25000,25100,25200,25300,25400,25500,25600,25700,25800,24900], dates:['16 Fev','24 Fev','2 Mar','8 Mar','15 Mar'] },
  90: { i:'68.4K',e:'3.9%', s:'+891', a:'52K',  bars:Array.from({length:30},(_,i)=>Math.round(180000+i*5000+Math.sin(i/3)*30000)), seg:Array.from({length:30},(_,i)=>23000+Math.round(i*40)), dates:['Jan','Fev','Mar'] },
}
const TP = [{t:'Carrossel Despertar',tp:'Carrossel',e:'6.2%',r:'4.1K'},{t:'IA na triagem',tp:'Carrossel',e:'5.8%',r:'3.8K'},{t:'3 formas de monetizar',tp:'Reel',e:'4.9%',r:'5.2K'}]

function fmt(n:number){if(n>=1e6)return(n/1e6).toFixed(1)+'M';if(n>=1000)return(n/1000).toFixed(0)+'k';return Math.round(n).toString()}

export default function Analytics() {
  const [range, setRange] = useState<7|30|90>(30)
  const d = DATA[range]
  const mx = Math.max(...d.bars)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader title="Analytics" subtitle="Performance de conteúdo — Instagram" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Alert */}
        <div className="flex items-start gap-2 bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.16)] rounded-[7px] px-3 py-2 text-[10px] text-[rgba(237,218,186,0.5)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1 flex-shrink-0" />
          <div>Dados simulados com estrutura da <strong className="text-[#FF5404]">API Metricool</strong>. Configure seu token para dados reais.</div>
        </div>

        {/* Range selector */}
        <div className="flex gap-1.5">
          {([7,30,90] as const).map(r => (
            <button key={r} onClick={()=>setRange(r)}
              className={`px-3 py-1.5 rounded-[5px] text-[10px] font-semibold border transition-all
                ${range===r ? 'bg-[#FF5404] border-[#FF5404] text-white' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/20'}`}>
              {r} dias
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="Impressões Totais" value={d.i} sub="+2% vs anterior" accent="#FF5404" />
          <StatCard label="Taxa Engajamento" value={d.e} sub="+0.9pp média" accent="#3ecf8e" />
          <StatCard label="Novos Seguidores" value={d.s} sub="total: 24.8k" accent="#3b82f6" />
          <StatCard label="Alcance Total" value={d.a} sub="-1.6% vs anterior" accent="#f59e0b" />
        </div>

        {/* Charts 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Impressões bar */}
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
            <div className="text-[11px] font-semibold text-white mb-1">Impressões Diárias</div>
            <div className="text-[9px] text-[rgba(237,218,186,0.3)] mb-3">Últimos {range} dias</div>
            <div className="flex items-end gap-0.5 h-24">
              {d.bars.filter((_,i)=>i%Math.ceil(d.bars.length/20)===0).map((v,i,arr)=>(
                <div key={i} className="flex-1 rounded-t-sm min-w-0 transition-all hover:opacity-70 cursor-pointer"
                  style={{height:`${Math.round((v/mx)*100)}%`,background:i===arr.length-1?'#FF5404':'rgba(255,84,4,0.38)'}} />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {d.dates.map(dt=><span key={dt} className="text-[7px] text-[rgba(237,218,186,0.2)]">{dt}</span>)}
            </div>
          </div>

          {/* Seguidores line */}
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
            <div className="text-[11px] font-semibold text-white mb-1">Crescimento de Seguidores</div>
            <div className="text-[9px] text-[rgba(237,218,186,0.3)] mb-3">Últimos {range} dias</div>
            <svg viewBox="0 0 300 96" className="w-full h-24" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5404" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#FF5404" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {(() => {
                const mn=Math.min(...d.seg),mx2=Math.max(...d.seg),rng=mx2-mn||1
                const pts=d.seg.map((v,i)=>`${Math.round((i/(d.seg.length-1))*294+3)},${Math.round(90-((v-mn)/rng)*84)}`).join(' ')
                return <>
                  <polygon points={`${pts} 297,96 3,96`} fill="url(#sg)"/>
                  <polyline points={pts} fill="none" stroke="#FF5404" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
                </>
              })()}
            </svg>
          </div>
        </div>

        {/* Top posts */}
        <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
          <div className="text-[11px] font-semibold text-white mb-3">Top Posts · Melhor desempenho</div>
          {TP.map((p,i)=>(
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0">
              <span className="font-display text-[13px] font-semibold text-[rgba(237,218,186,0.22)] w-4">{i+1}</span>
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
