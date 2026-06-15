'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { GeneratedContent, ContentType } from '@/types'
import PageHeader from '../ui/PageHeader'
import Badge from '../ui/Badge'

const TYPE_ICON: Record<ContentType,string> = {carrossel:'🎠',post:'🖼',story:'📱',reel:'🎬',thread:'🧵'}

export default function Biblioteca() {
  const [content, setContent] = useState<GeneratedContent[]>([])
  const [filter, setFilter] = useState<ContentType|'todos'>('todos')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<GeneratedContent|null>(null)

  useEffect(()=>{ setContent(storage.getContent()) },[])

  const filtered = content.filter(c => {
    if (filter !== 'todos' && c.type !== filter) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function del(id: string) { storage.deleteContent(id); setContent(storage.getContent()); if(selected?.id===id) setSelected(null) }

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col">
        <div className="p-4 border-b border-white/[0.08]">
          <h1 className="font-display text-lg font-bold text-white mb-3">Biblioteca</h1>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Buscar conteúdo…"
            className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] mb-2" />
          <div className="flex gap-1 flex-wrap">
            {(['todos','carrossel','post','story','reel','thread'] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border transition-all
                  ${filter===f?'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]':'border-white/[0.08] text-[rgba(237,218,186,0.4)]'}`}>
                {f==='todos'?'Todos':f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[10px] text-[rgba(237,218,186,0.25)]">
              {content.length === 0 ? 'Nenhum conteúdo gerado ainda' : 'Nenhum resultado'}
            </div>
          ) : filtered.map(c=>(
            <button key={c.id} onClick={()=>setSelected(c)}
              className={`w-full text-left px-4 py-3 border-b border-white/[0.05] transition-colors
                ${selected?.id===c.id?'bg-[rgba(255,84,4,0.08)]':'hover:bg-[rgba(237,218,186,0.04)]'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{TYPE_ICON[c.type]}</span>
                <span className="text-[11px] font-semibold text-white truncate flex-1">{c.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="brand">{c.type}</Badge>
                <span className="text-[8px] text-[rgba(237,218,186,0.25)]">{new Date(c.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-4">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-4 opacity-20">📚</div>
            <div className="font-display text-lg text-white opacity-30">Selecione um conteúdo</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{selected.title}</h2>
                <div className="flex gap-1.5 mt-1">
                  <Badge variant="brand">{selected.type}</Badge>
                  <Badge variant="muted">{selected.tone}</Badge>
                  <Badge variant="muted">{selected.textModel}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>{
                  const text = selected.slides ? selected.slides.map((s,i)=>`Slide ${i+1}\n${s.heading}\n${s.body}`).join('\n\n') : selected.body||''
                  navigator.clipboard.writeText(text)
                }} className="text-[10px] text-[rgba(237,218,186,0.45)] hover:text-[#FF5404]">📋 Copiar</button>
                <button onClick={()=>del(selected.id)} className="text-[10px] text-[rgba(239,68,68,0.5)] hover:text-[#ef4444]">🗑 Excluir</button>
              </div>
            </div>

            {selected.slides && (
              <div className="grid grid-cols-3 gap-3">
                {selected.slides.map((s,i)=>(
                  <div key={s.id} className="bg-[#071925] rounded-[8px] overflow-hidden" style={{aspectRatio:'4/5',position:'relative'}}>
                    {s.imageUrl && <img src={s.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />}
                    <div className="absolute inset-0 flex flex-col justify-end p-3" style={{background:'linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)'}}>
                      <div className="text-[10px] font-bold text-white leading-tight mb-1">{s.heading}</div>
                      <div className="text-[8px] text-white/70 leading-snug">{s.body}</div>
                      <div className="text-[7px] text-white/30 mt-2">{i+1}/{selected.slides!.length}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selected.body && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <pre className="text-[11px] text-[rgba(237,218,186,0.7)] whitespace-pre-wrap leading-relaxed font-body">{selected.body}</pre>
              </div>
            )}

            {selected.hashtags && selected.hashtags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-2">Hashtags</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.hashtags.map(h=>(
                    <span key={h} className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[9px]">{h}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
