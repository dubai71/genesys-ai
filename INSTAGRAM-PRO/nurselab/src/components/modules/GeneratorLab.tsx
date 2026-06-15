'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { storage } from '@/lib/storage'
import type { Creative, CreativeType, CreativeSaveMode } from '@/types'
import PageHeader from '@/components/ui/PageHeader'

// Multi-provider generation endpoint with automatic fallback
const GENERATE_API = '/api/v1/generate'


// Unified generation - server handles provider fallback + polling internally
async function generateWithFallback(modelId: string, payload: any) {
  const res = await fetch(GENERATE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ modelId, payload })
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Erro ${res.status}: ${txt.slice(0, 200)}`)
  }
  return res.json()
}

// ─── Models list ───────────────────────────────────────────────────────────────

const IMAGE_MODELS = [
  { id: 'flux-1-dev', label: 'Flux 1 Dev', endpoint: 'flux-1-dev' },
  { id: 'flux-1-schnell', label: 'Flux 1 Schnell', endpoint: 'flux-1-schnell' },
  { id: 'flux-red', label: 'Flux Red', endpoint: 'flux-1-redux' },
  { id: 'nano-banana-2', label: 'Nano Banana 2', endpoint: 'nano-banana-2' },
  { id: 'sd-3-medium', label: 'SD 3 Medium', endpoint: 'stable-diffusion-3-medium' },
  { id: 'sd-2', label: 'SD 2', endpoint: 'stable-diffusion-2' },
  { id: 'playground-v2-5', label: 'Playground v2.5', endpoint: 'playground-v2-5' },
  { id: 'pixart-alpha', label: 'PixArt Alpha', endpoint: 'pixart-alpha' },
  { id: 'dalle-3', label: 'DALL-E 3', endpoint: 'dall-e-3' },
  { id: 'imagen-3', label: 'Gemini Imagen 3', endpoint: 'imagen-3' },
  { id: 'minimax-image-01', label: 'MiniMax Image 01', endpoint: 'minimax-image-01' },
  { id: 'florence-2', label: 'Florence 2', endpoint: 'florence-2' },
]

const VIDEO_MODELS = [
  { id: 'seedance-2', label: 'Seedance 2.0', endpoint: 'seedance-2' },
  { id: 'kling-1-6', label: 'Kling 1.6', endpoint: 'kling-1-6-standard' },
  { id: 'kling-1-5', label: 'Kling 1.5', endpoint: 'kling-1-5-standard' },
  { id: 'hailuo-2', label: 'MiniMax Hailuo 2', endpoint: 'hailuo-2' },
  { id: 'hunyuan-video', label: 'Hunyuan Video', endpoint: 'hunyuan-video' },
  { id: 'ltx-video', label: 'LTX Video', endpoint: 'ltx-video' },
  { id: 'mochi-1', label: 'Mochi 1', endpoint: 'mochi-1' },
  { id: 'wan-2-2-t2v', label: 'Wan 2.2 T2V', endpoint: 'wan-2-2-t2v' },
  { id: 'cog-3-video', label: 'Cog 3 Video', endpoint: 'cog-3-video' },
  { id: 'f8-video', label: 'F8 Video', endpoint: 'f8-video' },
  { id: 'grok-imagine-t2v', label: 'Grok Imagine T2V', endpoint: 'grok-imagine-t2v' },
  { id: 'f8s-video', label: 'F8-S Video', endpoint: 'f8s-video' },
]

const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 (Square)' },
  { id: '16:9', label: '16:9 (Landscape)' },
  { id: '9:16', label: '9:16 (Vertical)' },
  { id: '4:3', label: '4:3' },
  { id: '3:4', label: '3:4 (Portrait)' },
  { id: '2:3', label: '2:3' },
  { id: '3:2', label: '3:2' },
  { id: '21:9', label: '21:9 (Ultrawide)' },
]

const I2I_MODELS = [
  { id: 'flux-kontext', label: 'Flux Kontext', endpoint: 'flux-kontext-dev-i2i' },
  { id: 'nano-banana-edit', label: 'Nano Banana Edit', endpoint: 'nano-banana-2-edit' },
  { id: 'flux-redux', label: 'Flux Redux', endpoint: 'flux-1-redux' },
  { id: 'kling-o1-edit', label: 'Kling O1 Edit', endpoint: 'kling-o1-edit-image' },
  { id: 'sd-3-edit', label: 'SD 3 Edit', endpoint: 'stable-diffusion-3-medium-edit' },
]

const I2V_MODELS = [
  { id: 'seedance-2-i2v', label: 'Seedance 2.0 I2V', endpoint: 'seedance-2-i2v' },
  { id: 'kling-1-6-i2v', label: 'Kling 1.6 I2V', endpoint: 'kling-1-6-i2v' },
  { id: 'wan-2-2-i2v', label: 'Wan 2.2 I2V', endpoint: 'wan-2-2-i2v' },
  { id: 'hailuo-2-i2v', label: 'Hailuo 2 I2V', endpoint: 'hailuo-2-i2v' },
  { id: 'ltx-2-3-i2v', label: 'LTX 2.3 I2V', endpoint: 'ltx-2-3-i2v' },
]

const V2V_MODELS = [
  { id: 'video-watermark-remover', label: 'AI Watermark Remover', endpoint: 'video-watermark-remover', family: 'tools' },
  { id: 'kling-v2.6-std-motion-control', label: 'Kling 2.6 Motion Control', endpoint: 'kling-v2.6-std-motion-control', family: 'kling' },
  { id: 'kling-v3.0-std-motion-control', label: 'Kling 3.0 Motion Control', endpoint: 'kling-v3.0-std-motion-control', family: 'kling' },
  { id: 'kling-v3.0-pro-motion-control', label: 'Kling 3.0 Pro Motion Control', endpoint: 'kling-v3.0-pro-motion-control', family: 'kling' },
]

const LIPSYNC_MODELS = [
  // Image-based (portrait + audio → talking video)
  { id: 'infinitetalk-image-to-video', label: 'Infinite Talk (Img)', endpoint: 'infinitetalk-image-to-video', category: 'image' },
  { id: 'wan2.2-speech-to-video', label: 'Wan 2.2 Speech', endpoint: 'wan2.2-speech-to-video', category: 'image' },
  { id: 'ltx-2.3-lipsync', label: 'LTX 2.3 Lipsync', endpoint: 'ltx-2.3-lipsync', category: 'image' },
  { id: 'ltx-2-19b-lipsync', label: 'LTX 2 19B Lipsync', endpoint: 'ltx-2-19b-lipsync', category: 'image' },
  // Video-based (video + audio → lipsync)
  { id: 'sync-lipsync', label: 'Sync Lipsync', endpoint: 'sync-lipsync', category: 'video' },
  { id: 'latent-sync', label: 'LatentSync', endpoint: 'latentsync-video', category: 'video' },
  { id: 'creatify-lipsync', label: 'Creatify Lipsync', endpoint: 'creatify-lipsync', category: 'video' },
  { id: 'veed-lipsync', label: 'Veed Lipsync', endpoint: 'veed-lipsync', category: 'video' },
  { id: 'infinitetalk-video-to-video', label: 'Infinite Talk V2V', endpoint: 'infinitetalk-video-to-video', category: 'video' },
]

const AUDIO_MODELS = [
  { id: 'suno-create-music', label: 'Suno Music', endpoint: 'suno-create-music' },
]


// ─── Save Modal ───────────────────────────────────────────────────────────────

function SaveModal({ result, onSave, onClose }: { result: any; onSave: (c: Omit<Creative, 'id'>) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [tags, setTags] = useState('')
  const [mode, setMode] = useState<CreativeSaveMode>('creative')

  function handleSave() {
    if (!name.trim()) return
    onSave({
      type: result.type,
      url: result.url,
      thumbnail: result.thumbnail,
      prompt: result.prompt,
      model: result.model,
      aspectRatio: result.aspectRatio,
      resolution: result.resolution,
      duration: result.duration,
      name: name.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      sourceType: result.sourceType,
      savedAs: mode,
      createdAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d] border border-white/[0.1] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <h3 className="text-sm font-semibold text-[#EDDABA]">Salvar criativo</h3>
          <button onClick={onClose} className="text-[rgba(237,218,186,0.4)] hover:text-white text-lg">×</button>
        </div>
        <div className="p-4 space-y-4">
          {result?.url && (
            <img src={result.url} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-white/[0.08]" />
          )}
          <input
            type="text"
            placeholder="Nome do criativo"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.25)] focus:outline-none focus:border-[rgba(255,84,4,0.4)]"
          />
          <input
            type="text"
            placeholder="Tags (separadas por vírgula)"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.25)] focus:outline-none focus:border-[rgba(255,84,4,0.4)]"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode('creative')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${mode === 'creative' ? 'bg-[rgba(255,84,4,0.15)] border-[#FF5404] text-[#FF5404]' : 'border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2]'}`}
            >
              💎 Banco de Criativos
            </button>
            <button
              onClick={() => setMode('template')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${mode === 'template' ? 'bg-[rgba(255,84,4,0.15)] border-[#FF5404] text-[#FF5404]' : 'border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2]'}`}
            >
              📋 Template
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg text-xs text-[rgba(237,218,186,0.5)] border border-white/[0.08] hover:border-white/[0.15] transition-colors">Cancelar</button>
            <button onClick={handleSave} disabled={!name.trim()} className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#FF5404] text-white hover:bg-[#e64a00] transition-colors disabled:opacity-40">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

type Tab = 'image' | 'video' | 'process' | 'lipsync' | 'audio' | 'bank'

export default function GeneratorLab() {
  const [tab, setTab] = useState<Tab>('image')
  const [genMode, setGenMode] = useState<'t2i' | 'i2i'>('t2i')
  const [vidMode, setVidMode] = useState<'t2v' | 'i2v'>('t2v')
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('minimax-image-01')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [duration, setDuration] = useState(5)
  const [refImage, setRefImage] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)
  const [showSave, setShowSave] = useState(false)
  const [activeProfileId, setActiveProfileId] = useState<string>('default')

  const [bankFilter, setBankFilter] = useState<'all' | CreativeType | CreativeSaveMode>('all')
  const [creatives, setCreatives] = useState<Creative[]>([])

  const fileRef = useRef<HTMLInputElement>(null)
  const i2iRef = useRef<HTMLInputElement>(null)
  // Upload refs
  const videoFileRef = useRef<HTMLInputElement>(null)
  const lipImageRef = useRef<HTMLInputElement>(null)
  const lipVideoRef = useRef<HTMLInputElement>(null)
  const lipAudioRef = useRef<HTMLInputElement>(null)
  const audioStyleRef = useRef<HTMLInputElement>(null)

  // Upload state for new tabs
  const [processVideoUrl, setProcessVideoUrl] = useState<string | null>(null)
  const [processImageUrl, setProcessImageUrl] = useState<string | null>(null)
  const [lipMode, setLipMode] = useState<'image' | 'video'>('image')
  const [lipImageUrl, setLipImageUrl] = useState<string | null>(null)
  const [lipVideoUrl, setLipVideoUrl] = useState<string | null>(null)
  const [lipAudioUrl, setLipAudioUrl] = useState<string | null>(null)
  const [audioStyle, setAudioStyle] = useState('')
  const [audioLyrics, setAudioLyrics] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')
  const [resolution, setResolution] = useState('720p')

  useEffect(() => {
    setActiveProfileId(storage.getActiveProfile()?.id || 'default')
    setCreatives(storage.getCreatives())
  }, [])

  // Switch to free model default when tab changes
  useEffect(() => {
    if (tab === 'image') setModel('minimax-image-01')
    else if (tab === 'video') setModel('hailuo-2')
    else if (tab === 'process') setModel('video-watermark-remover')
    else if (tab === 'lipsync') setModel('infinitetalk-image-to-video')
    else if (tab === 'audio') setModel('suno-create-music')
  }, [tab])

  function addCreative(c: Omit<Creative, 'id'>) {
    const creative: Creative = { ...c, id: Date.now().toString(36) + Math.random().toString(36).slice(2) }
    storage.addCreative(creative)
    setCreatives(storage.getCreatives())
  }

  async function handleGenerate() {
    if (!prompt.trim()) { setStatus('Digite um prompt'); return }
    setLoading(true)
    setStatus('Gerando...')
    setPreviewUrl(null)
    setLastResult(null)
    try {
      let result: any = {}
      if (tab === 'image') {
        const m = IMAGE_MODELS.find(m => m.id === model)
        const payload: any = { prompt }
        if (aspectRatio) payload.aspect_ratio = aspectRatio
        if (genMode === 'i2i' && refImage) {
          payload.image_url = refImage
          const i2iM = I2I_MODELS.find(m => m.id === model)
          result = await generateWithFallback(model, payload)
          result.type = 'image'
          result.sourceType = 'i2i'
        } else {
          result = await generateWithFallback(model, payload)
          result.type = 'image'
          result.sourceType = 't2i'
        }
      } else if (tab === 'process') {
        // V2V: Video processing (watermark removal, motion control)
        const m = V2V_MODELS.find(m => m.id === model)
        const payload: any = {}
        if (!processVideoUrl) throw new Error('Upload um vídeo primeiro')
        payload.video_url = processVideoUrl
        if (m?.family === 'kling' && processImageUrl) {
          payload.image_url = processImageUrl
        }
        if (prompt.trim()) payload.prompt = prompt
        result = await generateWithFallback(model, payload)
        result.type = 'video'
        result.sourceType = 'v2v'
      } else if (tab === 'lipsync') {
        // LipSync: portrait/video + audio → talking video
        const m = LIPSYNC_MODELS.find(m => m.id === model)
        if (!lipAudioUrl) throw new Error('Upload um arquivo de áudio primeiro')
        if (lipMode === 'image' && !lipImageUrl) throw new Error('Upload uma imagem primeiro')
        if (lipMode === 'video' && !lipVideoUrl) throw new Error('Upload um vídeo primeiro')
        const payload: any = { audio_url: lipAudioUrl }
        if (lipMode === 'image') {
          payload.image_url = lipImageUrl
        } else {
          payload.video_url = lipVideoUrl
        }
        if (prompt.trim()) payload.prompt = prompt
        if (resolution) payload.resolution = resolution
        result = await generateWithFallback(model, payload)
        result.type = 'video'
        result.sourceType = 'lipsync'
      } else if (tab === 'audio') {
        // Audio: text → music
        const m = AUDIO_MODELS.find(m => m.id === model)
        const payload: any = { style: audioStyle || prompt || 'upbeat pop music' }
        if (audioLyrics.trim()) payload.lyrics = audioLyrics
        if (prompt.trim()) payload.prompt = prompt
        result = await generateWithFallback(model, payload)
        result.type = 'audio'
        result.sourceType = 't2a'
      } else {
        const m = VIDEO_MODELS.find(m => m.id === model)
        const payload: any = { prompt }
        if (aspectRatio) payload.aspect_ratio = aspectRatio
        payload.duration = duration
        if (vidMode === 'i2v' && refImage) {
          payload.image_url = refImage
          const i2vM = I2V_MODELS.find(m => m.id === model)
          result = await generateWithFallback(model, payload)
          result.type = 'video'
          result.sourceType = 'i2v'
        } else {
          result = await generateWithFallback(model, payload)
          result.type = 'video'
          result.sourceType = 't2v'
        }
      }
      const url = result.outputs?.[0] || result.url || result.output?.url
      if (!url) throw new Error('Nenhuma URL de saída retornada')
      result.url = url
      result.prompt = prompt
      result.model = model
      result.aspectRatio = aspectRatio
      result.duration = duration
      setPreviewUrl(url)
      setLastResult(result)
      setStatus(tab === 'image' ? '✓ Imagem gerada' : tab === 'process' ? '✓ Vídeo processado' : tab === 'lipsync' ? '✓ LipSync gerado' : tab === 'audio' ? '✓ Áudio gerado' : '✓ Vídeo gerado')
    } catch (err: any) {
      setStatus(`Erro: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, forI2i = false) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      if (forI2i) {
        setRefImage(dataUrl)
        setGenMode('i2i')
      } else {
        // upload for video/image generation
        setRefImage(dataUrl)
        if (tab === 'video') setVidMode('i2v')
        else setGenMode('i2i')
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const filteredCreatives = creatives.filter(c => {
    if (bankFilter === 'all') return true
    if (bankFilter === 'image' || bankFilter === 'video') return c.type === bankFilter
    return c.savedAs === bankFilter
  })

  const activeModels = tab === 'image'
    ? (genMode === 'i2i' ? I2I_MODELS : IMAGE_MODELS)
    : (vidMode === 'i2v' ? I2V_MODELS : VIDEO_MODELS)

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="GeneratorLab" subtitle="Gere imagens e vídeos com IA · Salve como template ou banco de criativos" />
      
      {/* TABS */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-white/[0.06]">
        {(['image', 'video', 'process', 'lipsync', 'audio', 'bank'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setStatus(''); setPreviewUrl(null); setLastResult(null) }}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${tab === t ? 'bg-[rgba(255,84,4,0.15)] text-[#FF5404]' : 'text-[rgba(237,218,186,0.4)] hover:text-[#EDDABA] hover:bg-white/[0.04]'}`}
          >
            {t === 'image' ? '🖼️ Imagem' : t === 'video' ? '🎬 Vídeo' : t === 'process' ? '🔄 Processar' : t === 'lipsync' ? '🎙️ LipSync' : t === 'audio' ? '🎵 Áudio' : `📚 Banco (${creatives.length})`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'bank' ? (
          /* ── BANK VIEW ── */
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['all', 'image', 'video', 'creative', 'template'] as const).map(f => (
                <button key={f} onClick={() => setBankFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${bankFilter === f ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)] hover:border-white/[0.15]'}`}>
                  {f === 'all' ? 'Todos' : f === 'image' ? '🖼️ Imagens' : f === 'video' ? '🎬 Vídeos' : f === 'creative' ? '💎 Criativos' : '📋 Templates'}
                </button>
              ))}
            </div>
            {filteredCreatives.length === 0 ? (
              <div className="text-center py-16 text-[rgba(237,218,186,0.25)] text-sm">
                Nenhum criativo salvo ainda.<br />Gere algo e clique em "Salvar" para adicionar aqui.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredCreatives.map(c => (
                  <div key={c.id} className="group relative bg-[#0a0a0a] border border-white/[0.07] rounded-xl overflow-hidden">
                    {c.type === 'video' ? (
                      <video src={c.url} className="w-full aspect-video object-cover" muted loop />
                    ) : (
                      <img src={c.url} alt={c.name} className="w-full aspect-square object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      <div className="text-[10px] font-semibold text-white truncate">{c.name}</div>
                      <div className="text-[9px] text-[rgba(255,255,255,0.6)] truncate">{c.model}</div>
                      <div className="flex gap-1 mt-1.5">
                        <span className={`text-[8px] px-1.5 py-0.5 rounded ${c.savedAs === 'template' ? 'bg-purple-500/30 text-purple-300' : 'bg-[#FF5404]/30 text-[#FF5404]'}`}>
                          {c.savedAs === 'template' ? '📋' : '💎'}
                        </span>
                        <button onClick={() => { storage.deleteCreative(c.id); setCreatives(storage.getCreatives()) }}
                          className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-red-500/30 text-red-300 hover:bg-red-500/50">🗑</button>
                      </div>
                    </div>
                    {c.savedAs === 'template' && (
                      <div className="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded bg-purple-500/80 text-white">📋</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : tab === 'process' ? (
          /* ── V2V / PROCESS VIEW ── */
          <div className="max-w-3xl mx-auto space-y-4">
            <PageHeader title="Processar Vídeo" subtitle="Remova marcas d'água, controle de movimento e mais" />
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Modelo</label>
                <select value={model} onChange={e => setModel(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none focus:border-[rgba(255,84,4,0.35)]">
                  {V2V_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Video upload */}
            <div>
              <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Vídeo *</label>
              {processVideoUrl ? (
                <div className="relative inline-block">
                  <video src={processVideoUrl} className="h-20 rounded-lg border border-white/[0.1]" muted />
                  <button onClick={() => { setProcessVideoUrl(null); setProcessImageUrl(null) }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
                </div>
              ) : (
                <button onClick={() => videoFileRef.current?.click()}
                  className="w-full py-8 rounded-xl border border-dashed border-white/[0.15] text-[rgba(237,218,186,0.3)] text-xs hover:border-white/[0.3] transition-colors">
                  📹 Upload vídeo (MP4, MOV)
                </button>
              )}
              <input ref={videoFileRef} type="file" accept="video/*" className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  setUploadStatus('Fazendo upload...')
                  try {
                    const formData = new FormData()
                    formData.append('file', file)
                    const res = await fetch('/api/v1/upload', { method: 'POST', body: formData })
                    const data = await res.json()
                    if (!data.url) throw new Error(data.error || 'Upload falhou')
                    setProcessVideoUrl(data.url)
                    setUploadStatus('')
                  } catch(err: any) { setUploadStatus('Erro: ' + err.message) }
                  e.target.value = ''
                }} />
            </div>

            {/* Motion control image (for Kling motion control) */}
            {model.includes('motion-control') && (
              <div>
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">🎬 Imagem de Referência (opcional)</label>
                {processImageUrl ? (
                  <div className="relative inline-block">
                    <img src={processImageUrl} className="h-20 rounded-lg border border-white/[0.1]" />
                    <button onClick={() => setProcessImageUrl(null)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
                  </div>
                ) : (
                  <button onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = async (ev: any) => {
                      const file = ev.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = (e: any) => setProcessImageUrl(e.target.result)
                      reader.readAsDataURL(file)
                    }
                    input.click()
                  }}
                    className="w-full py-4 rounded-xl border border-dashed border-white/[0.15] text-[rgba(237,218,186,0.3)] text-xs hover:border-white/[0.3] transition-colors">
                    🖼️ Upload imagem de referência
                  </button>
                )}
              </div>
            )}

            {/* Prompt */}
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder="Descreva o movimento ou efeito desejado... Ex: Camera slowly pans left, subject walks forward"
              className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.2)] focus:outline-none focus:border-[rgba(255,84,4,0.35)] resize-none"
              rows={3} disabled={loading} />

            {uploadStatus && <div className="text-xs text-center py-2 rounded-lg text-yellow-400 bg-yellow-400/10">{uploadStatus}</div>}

            <button onClick={handleGenerate} disabled={loading || !processVideoUrl}
              className="w-full py-3 rounded-xl bg-[#FF5404] text-white text-sm font-semibold hover:bg-[#e64900] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
              {loading ? <><span className="animate-spin">⚙️</span> {status || 'Processando...'}</> : '🔄 Processar Vídeo'}
            </button>

            {status && !loading && (
              <div className={`text-xs text-center py-2 rounded-lg ${status.startsWith('Erro') ? 'text-red-400 bg-red-500/10' : 'text-[#3ecf8e] bg-[#3ecf8e]/10'}`}>{status}</div>
            )}

            {previewUrl && (
              <div className="space-y-3">
                <video src={previewUrl} controls className="w-full rounded-xl border border-white/[0.08]" />
                <div className="flex gap-2">
                  <a href={previewUrl} download target="_blank" rel="noopener"
                    className="flex-1 py-2 rounded-lg text-xs text-center border border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2] transition-colors">⬇️ Download</a>
                  <button onClick={() => setShowSave(true)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#FF5404]/15 text-[#FF5404] hover:bg-[#FF5404]/25 transition-colors">💾 Salvar</button>
                </div>
              </div>
            )}
          </div>
        ) : tab === 'lipsync' ? (
          /* ── LIPSYNC VIEW ── */
          <div className="max-w-3xl mx-auto space-y-4">
            <PageHeader title="LipSync" subtitle="Faça uma pessoa falar com áudio — retrato + voz ou vídeo + voz" />

            <div className="flex gap-2">
              <button onClick={() => { setLipMode('image'); setLipVideoUrl(null) }}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${lipMode === 'image' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                🖼️ Imagem + Áudio
              </button>
              <button onClick={() => { setLipMode('video'); setLipImageUrl(null) }}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${lipMode === 'video' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                📹 Vídeo + Áudio
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Source media */}
              <div>
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">
                  {lipMode === 'image' ? '🖼️ Retrato (imagem)' : '📹 Vídeo'}
                </label>
                {lipMode === 'image' ? (
                  lipImageUrl ? (
                    <div className="relative">
                      <img src={lipImageUrl} className="w-full aspect-square object-cover rounded-xl border border-white/[0.1]" />
                      <button onClick={() => setLipImageUrl(null)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
                    </div>
                  ) : (
                    <button onClick={() => lipImageRef.current?.click()}
                      className="w-full py-10 rounded-xl border border-dashed border-white/[0.15] text-[rgba(237,218,186,0.3)] text-xs hover:border-white/[0.3] transition-colors">
                      🖼️ Upload retrato
                    </button>
                  )
                ) : (
                  lipVideoUrl ? (
                    <div className="relative">
                      <video src={lipVideoUrl} className="w-full aspect-video object-cover rounded-xl border border-white/[0.1]" muted />
                      <button onClick={() => setLipVideoUrl(null)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
                    </div>
                  ) : (
                    <button onClick={() => lipVideoRef.current?.click()}
                      className="w-full py-10 rounded-xl border border-dashed border-white/[0.15] text-[rgba(237,218,186,0.3)] text-xs hover:border-white/[0.3] transition-colors">
                      📹 Upload vídeo
                    </button>
                  )
                )}
              </div>

              {/* Audio */}
              <div>
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">🎙️ Áudio (MP3, WAV) *</label>
                {lipAudioUrl ? (
                  <div className="bg-[#0a0a0a] rounded-xl border border-white/[0.1] p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎙️</span>
                      <span className="text-xs text-[#EDDABA] truncate flex-1">Áudio carregado</span>
                      <button onClick={() => setLipAudioUrl(null)} className="text-red-400 text-xs hover:text-red-300">×</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => lipAudioRef.current?.click()}
                    className="w-full py-10 rounded-xl border border-dashed border-white/[0.15] text-[rgba(237,218,186,0.3)] text-xs hover:border-white/[0.3] transition-colors">
                    🎙️ Upload áudio
                  </button>
                )}
              </div>
            </div>

            {/* Hidden file inputs */}
            <input ref={lipImageRef} type="file" accept="image/*" className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (ev: any) => setLipImageUrl(ev.target.result)
                reader.readAsDataURL(file)
                e.target.value = ''
              }} />
            <input ref={lipVideoRef} type="file" accept="video/*" className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploadStatus('Fazendo upload...')
                try {
                  const formData = new FormData()
                  formData.append('file', file)
                  const res = await fetch('/api/v1/upload', { method: 'POST', body: formData })
                  const data = await res.json()
                  if (!data.url) throw new Error(data.error || 'Upload falhou')
                  setLipVideoUrl(data.url)
                  setUploadStatus('')
                } catch(err: any) { setUploadStatus('Erro: ' + err.message) }
                e.target.value = ''
              }} />
            <input ref={lipAudioRef} type="file" accept="audio/*" className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploadStatus('Fazendo upload...')
                try {
                  const formData = new FormData()
                  formData.append('file', file)
                  const res = await fetch('/api/v1/upload', { method: 'POST', body: formData })
                  const data = await res.json()
                  if (!data.url) throw new Error(data.error || 'Upload falhou')
                  setLipAudioUrl(data.url)
                  setUploadStatus('')
                } catch(err: any) { setUploadStatus('Erro: ' + err.message) }
                e.target.value = ''
              }} />

            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Modelo</label>
                <select value={model} onChange={e => setModel(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none">
                  {LIPSYNC_MODELS.filter(m => m.category === lipMode).map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Resolução</label>
                <select value={resolution} onChange={e => setResolution(e.target.value)}
                  className="bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none">
                  <option value="480p">480p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>
              </div>
            </div>

            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder="Instruções opcionais... Ex: Speak with a calm, professional tone"
              className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.2)] focus:outline-none resize-none"
              rows={2} disabled={loading} />

            {uploadStatus && <div className="text-xs text-center py-2 rounded-lg text-yellow-400 bg-yellow-400/10">{uploadStatus}</div>}

            <button onClick={handleGenerate} disabled={loading || !lipAudioUrl || (lipMode === 'image' ? !lipImageUrl : !lipVideoUrl)}
              className="w-full py-3 rounded-xl bg-[#FF5404] text-white text-sm font-semibold hover:bg-[#e64900] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
              {loading ? <><span className="animate-spin">⚙️</span> {status || 'Gerando...'}</> : '🎙️ Gerar LipSync'}
            </button>

            {status && !loading && (
              <div className={`text-xs text-center py-2 rounded-lg ${status.startsWith('Erro') ? 'text-red-400 bg-red-500/10' : 'text-[#3ecf8e] bg-[#3ecf8e]/10'}`}>{status}</div>
            )}

            {previewUrl && (
              <div className="space-y-3">
                <video src={previewUrl} controls className="w-full rounded-xl border border-white/[0.08]" />
                <div className="flex gap-2">
                  <a href={previewUrl} download target="_blank" rel="noopener"
                    className="flex-1 py-2 rounded-lg text-xs text-center border border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2] transition-colors">⬇️ Download</a>
                  <button onClick={() => setShowSave(true)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#FF5404]/15 text-[#FF5404] hover:bg-[#FF5404]/25 transition-colors">💾 Salvar</button>
                </div>
              </div>
            )}
          </div>
        ) : tab === 'audio' ? (
          /* ── AUDIO VIEW ── */
          <div className="max-w-3xl mx-auto space-y-4">
            <PageHeader title="🎵 Gerar Áudio" subtitle="Crie músicas com IA a partir de texto" />

            <input type="text" value={audioStyle} onChange={e => setAudioStyle(e.target.value)}
              placeholder="Estilo musical... Ex: Relaxing lo-fi beat, uptempo pop, epic orchestral soundtrack"
              className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.2)] focus:outline-none focus:border-[rgba(255,84,4,0.35)]"
              disabled={loading} />

            <textarea value={audioLyrics} onChange={e => setAudioLyrics(e.target.value)}
              placeholder="Letras (opcional)... Ex: [Verse] Walking through the hospital corridors..."
              className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.2)] focus:outline-none resize-none"
              rows={4} disabled={loading} />

            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Modelo</label>
                <select value={model} onChange={e => setModel(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none">
                  {AUDIO_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleGenerate} disabled={loading || !audioStyle.trim()}
              className="w-full py-3 rounded-xl bg-[#FF5404] text-white text-sm font-semibold hover:bg-[#e64900] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
              {loading ? <><span className="animate-spin">⚙️</span> {status || 'Gerando...'}</> : '🎵 Gerar Música'}
            </button>

            {status && !loading && (
              <div className={`text-xs text-center py-2 rounded-lg ${status.startsWith('Erro') ? 'text-red-400 bg-red-500/10' : 'text-[#3ecf8e] bg-[#3ecf8e]/10'}`}>{status}</div>
            )}

            {previewUrl && (
              <div className="space-y-3">
                <audio src={previewUrl} controls className="w-full" />
                <div className="flex gap-2">
                  <a href={previewUrl} download target="_blank" rel="noopener"
                    className="flex-1 py-2 rounded-lg text-xs text-center border border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2] transition-colors">⬇️ Download</a>
                  <button onClick={() => setShowSave(true)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#FF5404]/15 text-[#FF5404] hover:bg-[#FF5404]/25 transition-colors">💾 Salvar</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── GENERATOR VIEW (T2I + T2V) ── */
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Mode selector (t2i/i2i for images, t2v/i2v for video) */}
            <div className="flex gap-2">
              {tab === 'image' ? (
                <>
                  <button onClick={() => { setGenMode('t2i'); setRefImage(null) }}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${genMode === 't2i' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                    ✏️ Texto → Imagem
                  </button>
                  <button onClick={() => setGenMode('i2i')}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${genMode === 'i2i' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                    🖼️ Imagem → Imagem
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setVidMode('t2v'); setRefImage(null) }}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${vidMode === 't2v' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                    ✏️ Texto → Vídeo
                  </button>
                  <button onClick={() => setVidMode('i2v')}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${vidMode === 'i2v' ? 'border-[#FF5404] bg-[rgba(255,84,4,0.12)] text-[#FF5404]' : 'border-white/[0.08] text-[rgba(237,218,186,0.45)]'}`}>
                    🖼️ Imagem → Vídeo
                  </button>
                </>
              )}
            </div>

            {/* Ref image preview */}
            {refImage && (
              <div className="relative inline-block">
                <img src={refImage} alt="Referência" className="h-20 rounded-lg border border-white/[0.1]" />
                <button onClick={() => { setRefImage(null); setGenMode('t2i'); setVidMode('t2v') }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
              </div>
            )}

            {/* Prompt */}
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={tab === 'image' 
                ? 'Descreva a imagem que deseja gerar... Ex: A nurse holding a tablet with holographic medical data, soft lighting, editorial style'
                : 'Descreva o vídeo que deseja gerar... Ex: A aerial shot of a modern hospital at sunset with flying drones'}
              className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#EDDABA] placeholder:text-[rgba(237,218,186,0.2)] focus:outline-none focus:border-[rgba(255,84,4,0.35)] resize-none"
              rows={4}
              disabled={loading}
            />

            {/* Model + Options row */}
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Modelo</label>
                <select value={model} onChange={e => setModel(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none focus:border-[rgba(255,84,4,0.35)]">
                  {activeModels.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Aspect Ratio</label>
                <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value)}
                  className="bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none">
                  {ASPECT_RATIOS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
              </div>
              {tab === 'video' && (
                <div>
                  <label className="text-[9px] text-[rgba(237,218,186,0.35)] uppercase tracking-wider mb-1 block">Duração</label>
                  <select value={duration} onChange={e => setDuration(Number(e.target.value))}
                    className="bg-[#0a0a0a] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-[#EDDABA] focus:outline-none">
                    <option value={5}>5s</option>
                    <option value={10}>10s</option>
                    <option value={15}>15s</option>
                  </select>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="flex-1 py-3 rounded-xl bg-[#FF5404] text-white text-sm font-semibold hover:bg-[#e64900] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="animate-spin">⚙️</span> {status || 'Gerando...'}</>
                ) : (
                  <>{tab === 'image' ? '🖼️ Gerar Imagem' : '🎬 Gerar Vídeo'}</>
                )}
              </button>
              {(genMode === 'i2i' || vidMode === 'i2v') ? (
                <button onClick={() => tab === 'image' ? i2iRef.current?.click() : fileRef.current?.click()}
                  className="px-4 py-3 rounded-xl border border-white/[0.1] text-[rgba(237,218,186,0.5)] text-xs hover:border-white/[0.2] transition-colors">
                  📷 Imagem
                </button>
              ) : (
                <button onClick={() => fileRef.current?.click()}
                  className="px-4 py-3 rounded-xl border border-white/[0.1] text-[rgba(237,218,186,0.5)] text-xs hover:border-white/[0.2] transition-colors">
                  + Ref
                </button>
              )}
            </div>

            {/* Status */}
            {status && !loading && (
              <div className={`text-xs text-center py-2 rounded-lg ${status.startsWith('Erro') ? 'text-red-400 bg-red-500/10' : 'text-[#3ecf8e] bg-[#3ecf8e]/10'}`}>
                {status}
              </div>
            )}

            {/* Result */}
            {previewUrl && (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08]">
                  {tab === 'image' ? (
                    <img src={previewUrl} alt="Generated" className="w-full" />
                  ) : (
                    <video src={previewUrl} controls className="w-full" />
                  )}
                </div>
                <div className="flex gap-2">
                  <a href={previewUrl} download target="_blank" rel="noopener"
                    className="flex-1 py-2 rounded-lg text-xs text-center border border-white/[0.1] text-[rgba(237,218,186,0.5)] hover:border-white/[0.2] transition-colors">
                    ⬇️ Download
                  </a>
                  <button onClick={() => setShowSave(true)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#FF5404]/15 text-[#FF5404] hover:bg-[#FF5404]/25 transition-colors">
                    💾 Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e)} />
      <input ref={i2iRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, true)} />

      {/* Save modal */}
      {showSave && lastResult && (
        <SaveModal
          result={lastResult}
          onSave={addCreative}
          onClose={() => setShowSave(false)}
        />
      )}
    </div>
  )
}