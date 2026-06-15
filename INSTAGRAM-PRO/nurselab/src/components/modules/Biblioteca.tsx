'use client'
import { useState, useEffect, useRef } from 'react'
import { storage } from '@/lib/storage'
import type { GeneratedContent, ContentType } from '@/types'
import PageHeader from '../ui/PageHeader'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const TYPE_ICON: Record<ContentType, string> = { carrossel:'🎠', post:'🖼', story:'📱', reel:'🎬', thread:'🧵', video:'🎬' }

export default function Biblioteca() {
  const [content, setContent] = useState<GeneratedContent[]>([])
  const [filter, setFilter] = useState<ContentType | 'todos'>('todos')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<GeneratedContent | null>(null)
  const [exporting, setExporting] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setContent(storage.getContent()) }, [])

  const filtered = content.filter(c => {
    if (filter !== 'todos' && c.type !== filter) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function del(id: string) {
    storage.deleteContent(id)
    setContent(storage.getContent())
    if (selected?.id === id) setSelected(null)
  }

  function copyContent(c: GeneratedContent) {
    const text = c.slides
      ? c.slides.map((s, i) => `Slide ${i+1}\n${s.heading}\n${s.body}`).join('\n\n')
      : c.body || ''
    const withTags = text + (c.hashtags?.length ? '\n\n' + c.hashtags.join(' ') : '')
    navigator.clipboard.writeText(withTags)
  }

  async function exportSlideAsPNG(slide: any, idx: number, total: number) {
    // Create a canvas-based export
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1350
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = idx % 2 === 0 ? '#071925' : '#F5EDE0'
    ctx.fillRect(0, 0, 1080, 1350)

    // Accent bar
    ctx.fillStyle = '#FF5404'
    ctx.fillRect(64, 320, 68, 6)

    // Heading text
    ctx.fillStyle = idx % 2 === 0 ? '#EDDABA' : '#071925'
    ctx.font = 'bold 64px serif'
    ctx.fillText(slide.heading?.substring(0, 40) || '', 64, 420)

    // Body text
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(237,218,186,0.6)' : 'rgba(7,25,37,0.6)'
    ctx.font = '28px sans-serif'
    const words = (slide.body || '').split(' ')
    let line = '', y = 500
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > 950 && line) {
        ctx.fillText(line, 64, y)
        line = word + ' '
        y += 42
        if (y > 1200) break
      } else { line = test }
    }
    if (line) ctx.fillText(line, 64, y)

    // Progress bar
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
    ctx.beginPath()
    ctx.roundRect(54, 1298, 970, 6, 3)
    ctx.fill()
    ctx.fillStyle = idx % 2 === 0 ? '#fff' : '#FF5404'
    ctx.beginPath()
    ctx.roundRect(54, 1298, 970 * ((idx+1)/total), 6, 3)
    ctx.fill()

    // Slide number
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'
    ctx.font = '22px sans-serif'
    ctx.fillText(`${idx+1}/${total}`, 990, 1330)

    return canvas.toDataURL('image/png')
  }

  async function exportAllSlides() {
    if (!selected?.slides) return
    setExporting(true)

    try {
      for (let i = 0; i < selected.slides.length; i++) {
        const dataUrl = await exportSlideAsPNG(selected.slides[i], i, selected.slides.length)
        const link = document.createElement('a')
        link.download = `${selected.title.replace(/\s+/g, '_')}_slide_${String(i+1).padStart(2,'0')}.png`
        link.href = dataUrl
        link.click()
        await new Promise(r => setTimeout(r, 300))
      }
    } catch (e) {
      console.error('Export error:', e)
    }

    setExporting(false)
  }

  const statusColor: Record<string, string> = {
    draft: 'muted', approved: 'green', scheduled: 'blue', published: 'green',
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col bg-[#050505]">
        <div className="p-4 border-b border-white/[0.08]">
          <h1 className="font-display text-lg font-bold text-white mb-2">Biblioteca</h1>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar conteúdo…"
            className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] mb-2" />
          <div className="flex gap-1 flex-wrap">
            {(['todos','carrossel','post','story','reel','thread','video'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border transition-all
                  ${filter===f?'bg-[rgba(255,84,4,0.13)] border-[#FF5404] text-[#FF5404]':'border-white/[0.08] text-[rgba(237,218,186,0.35)]'}`}>
                {f === 'todos' ? 'Todos' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[rgba(237,218,186,0.2)] text-[11px] px-4">
              {content.length === 0
                ? 'Nenhum conteúdo gerado ainda.\nVá em Criar Conteúdo →'
                : 'Nenhum resultado para sua busca'}
            </div>
          ) : filtered.map(c => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left px-4 py-3 border-b border-white/[0.04] transition-colors
                ${selected?.id===c.id ? 'bg-[rgba(255,84,4,0.08)]' : 'hover:bg-[rgba(237,218,186,0.03)]'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{TYPE_ICON[c.type]}</span>
                <span className="text-[11px] font-semibold text-white truncate flex-1">{c.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="brand">{c.type}</Badge>
                <Badge variant={statusColor[c.status] as any || 'muted'}>{c.status}</Badge>
                <span className="text-[8px] text-[rgba(237,218,186,0.2)] ml-auto">
                  {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-5" ref={previewRef}>
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="text-5xl opacity-10">📚</div>
            <div className="font-display text-xl text-white opacity-25">Selecione um conteúdo</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)]">Veja o preview, edite e exporte</div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{selected.title}</h2>
                <div className="text-[10px] text-[rgba(237,218,186,0.4)] mt-1">
                  {new Date(selected.createdAt).toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <Badge variant="brand">{selected.type}</Badge>
                  <Badge variant="muted">{selected.tone}</Badge>
                  <Badge variant="muted">{selected.textModel}</Badge>
                  {selected.imageModel && <Badge variant="amber">{selected.imageModel}</Badge>}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={() => copyContent(selected)}>📋 Copiar</Button>
                {selected.slides && (
                  <Button variant="ghost" size="sm" onClick={exportAllSlides} disabled={exporting}>
                    {exporting ? '⏳ Exportando…' : '⬇ Exportar PNGs'}
                  </Button>
                )}
                <Button variant="danger" size="sm" onClick={() => del(selected.id)}>🗑 Excluir</Button>
              </div>
            </div>

            {/* Slides */}
            {selected.slides && (
              <>
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)]">
                  {selected.slides.length} slides
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {selected.slides.map((s, i) => (
                    <div key={s.id || i} className="relative rounded-[8px] overflow-hidden"
                      style={{ aspectRatio: '4/5', background: i % 2 === 0 ? 'linear-gradient(165deg, #071925 0%, #0d2438 100%)' : '#F5EDE0' }}>
                      {s.imageUrl && (
                        <img src={s.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-3"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)' }}>
                        <div className="text-[10px] font-bold text-white leading-tight mb-1">{s.heading}</div>
                        <div className="text-[8px] text-white/65 leading-snug line-clamp-3">{s.body}</div>
                        <div className="text-[7px] text-white/30 mt-2">{i+1}/{selected.slides!.length}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Body */}
            {selected.body && !selected.slides && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Conteúdo</div>
                {selected.type === 'thread' ? (
                  <div className="flex flex-col gap-3">
                    {selected.body.split('---').filter(t => t.trim()).map((tweet, i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b border-white/[0.05] last:border-0">
                        <div className="w-6 h-6 rounded-full bg-[rgba(255,84,4,0.15)] flex items-center justify-center text-[9px] text-[#FF5404] font-bold flex-shrink-0">{i+1}</div>
                        <pre className="text-[11px] text-[rgba(237,218,186,0.7)] whitespace-pre-wrap leading-relaxed font-body flex-1">{tweet.trim()}</pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="text-[11px] text-[rgba(237,218,186,0.7)] whitespace-pre-wrap leading-relaxed font-body">{selected.body}</pre>
                )}
              </div>
            )}

            {/* Hashtags */}
            {selected.hashtags && selected.hashtags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)]">
                    Hashtags · {selected.hashtags.length}
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(selected.hashtags!.join(' '))}
                    className="text-[9px] text-[rgba(237,218,186,0.35)] hover:text-[#FF5404]">📋 copiar todas</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.hashtags.map(h => (
                    <span key={h} onClick={() => navigator.clipboard.writeText(h)}
                      className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[9px] font-medium cursor-pointer hover:bg-[rgba(255,84,4,0.15)]">
                      {h}
                    </span>
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
