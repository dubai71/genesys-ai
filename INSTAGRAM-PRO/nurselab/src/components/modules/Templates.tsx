'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { storage } from '@/lib/storage'
import type { BrandTemplate, ContentTone } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const STYLE_FONTS: Record<string, {display:string;body:string}> = {
  editorial: {display:'Fraunces',      body:'Outfit'},
  bold:      {display:'Playfair Display', body:'DM Sans'},
  minimal:   {display:'Plus Jakarta Sans', body:'Plus Jakarta Sans'},
  warm:      {display:'Lora',          body:'Nunito Sans'},
  tech:      {display:'Space Grotesk', body:'Space Grotesk'},
  medical:   {display:'Libre Baskerville', body:'Work Sans'},
}

function extractColors(img: HTMLImageElement, count = 7): string[] {
  const canvas = document.createElement('canvas')
  const SIZE = 160
  canvas.width = SIZE; canvas.height = SIZE
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, SIZE, SIZE)
  const { data } = ctx.getImageData(0, 0, SIZE, SIZE)
  const buckets: Record<string, number> = {}
  for (let i = 0; i < data.length; i += 12) {
    if (data[i+3] < 100) continue
    const r = Math.round(data[i]   / 24) * 24
    const g = Math.round(data[i+1] / 24) * 24
    const b = Math.round(data[i+2] / 24) * 24
    const k = `${r},${g},${b}`
    buckets[k] = (buckets[k] || 0) + 1
  }
  return Object.entries(buckets)
    .sort((a,b) => b[1]-a[1])
    .slice(0, count)
    .map(([k]) => {
      const [r,g,b] = k.split(',').map(Number)
      return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')
    })
}

function makeThumbnail(img: HTMLImageElement, max=320): string {
  const canvas = document.createElement('canvas')
  const r = Math.min(max/img.width, max/img.height)
  canvas.width = Math.round(img.width*r)
  canvas.height = Math.round(img.height*r)
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.83)
}

function detectStyle(colors: string[]): BrandTemplate['style'] {
  const lum = (c: string) => {
    const r=parseInt(c.slice(1,3),16), g=parseInt(c.slice(3,5),16), b=parseInt(c.slice(5,7),16)
    return 0.299*r + 0.587*g + 0.114*b
  }
  const sat = (c: string) => {
    const r=parseInt(c.slice(1,3),16), g=parseInt(c.slice(3,5),16), b=parseInt(c.slice(5,7),16)
    return Math.max(r,g,b)-Math.min(r,g,b)
  }
  const dark = colors.filter(c=>lum(c)<80).length
  const bright = colors.filter(c=>sat(c)>120).length
  const light = colors.filter(c=>lum(c)>200).length
  if (dark>=2 && bright>=1) return 'editorial'
  if (bright>=3) return 'bold'
  if (light>=4) return 'minimal'
  if (dark<=1 && bright<=1) return 'warm'
  return 'tech'
}

export default function Templates() {
  const [templates, setTemplates] = useState<BrandTemplate[]>([])
  const [selected, setSelected] = useState<BrandTemplate|null>(null)
  const [status, setStatus] = useState('')
  const [dragging, setDragging] = useState(false)
  const [newName, setNewName] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setTemplates(storage.getTemplates()) }, [])

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setStatus('Apenas imagens PNG, JPG ou WEBP'); return }
    setStatus('Extraindo cores...')
    const src = await new Promise<string>(res => {
      const r = new FileReader()
      r.onload = e => res(e.target!.result as string)
      r.readAsDataURL(file)
    })
    const img = await new Promise<HTMLImageElement>(res => {
      const i = new Image()
      i.onload = () => res(i)
      i.src = src
    })
    const colors = extractColors(img)
    const thumbnail = makeThumbnail(img)
    const style = detectStyle(colors)
    const baseFonts = STYLE_FONTS[style]

    // AI analysis (non-blocking)
    let notes = `Estilo ${style} detectado automaticamente.`
    let tone: ContentTone = 'profissional'
    let fontDisplay = baseFonts.display
    let fontBody = baseFonts.body

    const cfg = storage.getConfig()
    if (cfg.apiKeys.anthropic) {
      setStatus('Analisando com Claude Vision...')
      try {
        const res = await fetch('/api/analyze-template', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ thumbnail, colors, apiKey: cfg.apiKeys.anthropic }),
        })
        if (res.ok) {
          const d = await res.json()
          notes = d.notes || notes
          tone = d.tone || tone
          fontDisplay = d.fontDisplay || fontDisplay
          fontBody = d.fontBody || fontBody
        }
      } catch {}
    }

    // Upload to Supabase Storage if configured
    let originalUrl: string | undefined
    if (cfg.apiKeys.supabaseUrl && cfg.apiKeys.supabaseKey) {
      setStatus('Enviando para Supabase Storage...')
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('apiKeys', JSON.stringify(cfg.apiKeys))
        const res = await fetch('/api/upload-template', { method: 'POST', body: fd })
        if (res.ok) { const d = await res.json(); originalUrl = d.url }
      } catch {}
    }

    const findByLum = (threshold: number, above: boolean) =>
      colors.find(c => {
        const r=parseInt(c.slice(1,3),16), g=parseInt(c.slice(3,5),16), b=parseInt(c.slice(5,7),16)
        const l = 0.299*r+0.587*g+0.114*b
        return above ? l > threshold : l < threshold
      }) || colors[0]

    const t: BrandTemplate = {
      id: Date.now().toString(),
      name: file.name.replace(/\.[^.]+$/,'').replace(/[-_]/g,' '),
      thumbnail,
      originalUrl,
      colors,
      primaryColor:   colors[0] || '#FF5404',
      secondaryColor: colors[1] || '#071925',
      accentColor:    colors[2] || '#EDDABA',
      darkColor:      findByLum(80,false),
      lightColor:     findByLum(180,true),
      fontDisplay, fontBody, style, tone, notes,
      profileId: storage.getActiveProfileId(),
      createdAt: new Date().toISOString(),
    }
    storage.addTemplate(t)
    setTemplates(storage.getTemplates())
    setSelected(t)
    setStatus('')
  }, [])

  function applyToProfile(t: BrandTemplate) {
    const p = storage.getActiveProfile()
    storage.updateProfile({
      ...p,
      brandColors: t.colors.slice(0,4),
      fontDisplay: t.fontDisplay,
      fontBody: t.fontBody,
      tone: t.tone,
    })
    alert(`Paleta "${t.name}" aplicada ao perfil "${p.name}"`)
  }

  function del(id: string) {
    storage.deleteTemplate(id)
    setTemplates(storage.getTemplates())
    if (selected?.id===id) setSelected(null)
  }

  const COLOR_LABELS = ['Primária','Secundária','Destaque','Escura','Clara']
  const selColors = selected ? [selected.primaryColor,selected.secondaryColor,selected.accentColor,selected.darkColor,selected.lightColor] : []

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col bg-[#050505]">
        <div className="p-4 border-b border-white/[0.08]">
          <h1 className="font-display text-lg font-bold text-white mb-3">Templates de Marca</h1>
          <div
            onDragOver={e=>{e.preventDefault();setDragging(true)}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);const f=e.dataTransfer.files[0];if(f)processFile(f)}}
            onClick={()=>fileRef.current?.click()}
            className={`border-2 border-dashed rounded-[8px] p-5 text-center cursor-pointer transition-colors ${dragging?'border-[#FF5404] bg-[rgba(255,84,4,0.06)]':'border-white/20 hover:border-[#FF5404]'}`}>
            {status ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin"/>
                <div className="text-[10px] text-[rgba(237,218,186,0.5)]">{status}</div>
              </div>
            ) : (
              <>
                <div className="text-2xl mb-1 opacity-25">+</div>
                <div className="text-[11px] text-[rgba(237,218,186,0.4)]">Arraste ou clique para enviar</div>
                <div className="text-[9px] text-[rgba(237,218,186,0.22)] mt-1">PNG · JPG · WEBP</div>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e=>{const f=e.target.files?.[0];if(f)processFile(f)}}/>
        </div>

        <div className="flex-1 overflow-y-auto">
          {templates.length===0 ? (
            <div className="text-center py-12 text-[rgba(237,218,186,0.2)] text-[11px] px-4">
              Nenhum template ainda.<br/>Envie uma imagem de referência.
            </div>
          ) : templates.map(t=>(
            <button key={t.id} onClick={()=>setSelected(t)}
              className={`w-full text-left px-4 py-3 border-b border-white/[0.04] transition-colors ${selected?.id===t.id?'bg-[rgba(255,84,4,0.08)]':'hover:bg-[rgba(237,218,186,0.03)]'}`}>
              <div className="flex items-center gap-3">
                <img src={t.thumbnail} alt="" className="w-10 h-10 rounded-[6px] object-cover flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate">{t.name}</div>
                  <div className="flex gap-1 mt-1">
                    {t.colors.slice(0,6).map(c=>(
                      <div key={c} title={c} className="w-3 h-3 rounded-full border border-white/10" style={{background:c}}/>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-5">
        {!selected ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="text-5xl opacity-10">🎨</div>
            <div className="font-display text-xl text-white opacity-25">Envie ou selecione um template</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)]">Extração automática de cores · Análise com Claude Vision</div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-white">{selected.name}</h2>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  <Badge variant="brand">{selected.style}</Badge>
                  <Badge variant="muted">{selected.tone}</Badge>
                  {selected.originalUrl && <Badge variant="green">Supabase</Badge>}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" onClick={()=>applyToProfile(selected)}>✓ Aplicar ao perfil</Button>
                <Button variant="danger" size="sm" onClick={()=>del(selected.id)}>🗑</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Preview</div>
                <img src={selected.thumbnail} alt="" className="w-full rounded-[9px] object-contain bg-[#0a0a0a]" style={{maxHeight:260}}/>
              </div>
              <div className="flex flex-col gap-3">
                {/* Full palette */}
                <div>
                  <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Paleta completa · {selected.colors.length} cores</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {selected.colors.map(c=>(
                      <div key={c} onClick={()=>navigator.clipboard.writeText(c)} className="cursor-pointer group relative">
                        <div className="h-10 rounded-[6px] border border-white/10 group-hover:scale-105 transition-transform" style={{background:c}}/>
                        <div className="text-[8px] text-[rgba(237,218,186,0.3)] text-center mt-0.5 font-mono group-hover:text-[#FF5404] transition-colors">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Key colors */}
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-3">
                  <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Cores chave</div>
                  {COLOR_LABELS.map((label,i)=>(
                    <div key={label} className="flex items-center gap-2 py-1 cursor-pointer" onClick={()=>navigator.clipboard.writeText(selColors[i])}>
                      <div className="w-4 h-4 rounded flex-shrink-0 border border-white/10" style={{background:selColors[i]}}/>
                      <span className="text-[9px] text-[rgba(237,218,186,0.4)] w-20">{label}</span>
                      <span className="text-[9px] font-mono text-[rgba(237,218,186,0.6)] hover:text-[#FF5404] transition-colors">{selColors[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-3">Tipografia sugerida</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[9px] text-[rgba(237,218,186,0.35)] mb-1.5">Display / Títulos</div>
                  <div className="text-white font-semibold" style={{fontFamily:selected.fontDisplay,fontSize:20}}>{selected.fontDisplay}</div>
                  <div className="text-[rgba(237,218,186,0.35)] text-sm mt-1">Aa Bb 123</div>
                </div>
                <div>
                  <div className="text-[9px] text-[rgba(237,218,186,0.35)] mb-1.5">Body / Texto</div>
                  <div className="text-[rgba(237,218,186,0.7)]" style={{fontFamily:selected.fontBody,fontSize:14}}>{selected.fontBody}</div>
                  <div className="text-[rgba(237,218,186,0.35)] text-sm mt-1">Aa Bb 123</div>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)] mb-2">Análise</div>
              <p className="text-[11px] text-[rgba(237,218,186,0.6)] leading-relaxed mb-3">{selected.notes}</p>
              <div className="flex gap-2 items-center">
                <input defaultValue={selected.name} id="tmpl-name"
                  className="flex-1 bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404]"/>
                <Button size="sm" variant="ghost" onClick={()=>{
                  const el=document.getElementById('tmpl-name') as HTMLInputElement
                  if(el?.value){ const u={...selected,name:el.value}; storage.updateTemplate(u); setTemplates(storage.getTemplates()); setSelected(u) }
                }}>Renomear</Button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[rgba(255,84,4,0.06)] border border-[rgba(255,84,4,0.2)] rounded-[9px] p-4">
              <div className="text-[11px] font-semibold text-white mb-1">Usar este template</div>
              <div className="text-[10px] text-[rgba(237,218,186,0.5)] mb-3">As cores e fontes serão aplicadas automaticamente no perfil ativo e usadas em todos os conteúdos gerados.</div>
              <Button onClick={()=>applyToProfile(selected)}>✓ Aplicar ao perfil ativo</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}