'use client'
import { useState, useEffect } from 'react'
import { storage } from '@/lib/storage'
import type { VideoGeneration, VideoModel } from '@/types'
import PageHeader from '../ui/PageHeader'
import Button from '../ui/Button'
import Select from '../ui/Select'
import Badge from '../ui/Badge'

const VIDEO_MODELS = [
  { value: 'higgsfield-seedance', label: '🎬 Seedance v1 — Higgs Field (grátis)' },
  { value: 'seedance-v1', label: '🎬 Seedance v1 — API direta' },
  { value: 'seedance-v1-lite', label: '⚡ Seedance v1 Lite (mais rápido)' },
  { value: 'fal-minimax', label: '🎥 Minimax — fal.ai' },
  { value: 'replicate-svd', label: 'Stable Video Diffusion — Replicate' },
  { value: 'replicate-zeroscope', label: 'ZeroScope XL — Replicate' },
  { value: 'pika', label: 'Pika v1' },
  { value: 'pika-v2', label: 'Pika v2' },
  { value: 'runway-gen-3', label: 'Runway Gen-3 Alpha' },
  { value: 'runway-gen-2', label: 'Runway Gen-2' },
  { value: 'kling', label: 'Kling AI' },
  { value: 'haiper', label: 'Haiper' },
  { value: 'luma-dream-machine', label: 'Luma Dream Machine' },
  { value: 'huggingface-zero-shot', label: 'Zero-shot Video — HuggingFace (free tier)' },
]
const ASPECTS = [
  { value: '9:16', label: '9:16 — Reels/TikTok (vertical)' },
  { value: '1:1', label: '1:1 — Instagram Feed (quadrado)' },
  { value: '16:9', label: '16:9 — YouTube/Landscape' },
]

export default function Videos() {
  const [videos, setVideos] = useState<VideoGeneration[]>([])
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [model, setModel] = useState<VideoModel>('seedance-v1')
  const [aspect, setAspect] = useState('9:16')
  const [duration, setDuration] = useState(5)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<VideoGeneration | null>(null)

  useEffect(() => { setVideos(storage.getVideos()) }, [])

  function getProviderFromModel(m: string): string {
    if (m === 'higgsfield-seedance' || m === 'seedance-v1' || m === 'seedance-v1-lite') return m
    if (m.startsWith('replicate')) return 'replicate'
    if (m.startsWith('pika')) return 'pika'
    if (m.startsWith('runway')) return 'runway'
    if (m.startsWith('kling')) return 'kling'
    if (m.startsWith('haiper')) return 'haiper'
    if (m.startsWith('luma')) return 'luma'
    if (m.startsWith('fal-minimax')) return 'fal-minimax'
    if (m.startsWith('huggingface')) return 'huggingface'
    return m
  }

  async function generate() {
    if (!prompt.trim()) { setError('Digite o prompt do vídeo'); return }
    setError(''); setLoading(true)
    setLoadingMsg('Enviando para geração de vídeo…')

    const cfg = storage.getConfig()
    const vid: VideoGeneration = {
      id: Date.now().toString(),
      prompt, imageUrl: imageUrl || undefined,
      model, duration, aspectRatio: aspect,
      status: 'processing',
      profileId: cfg.activeProfileId,
      createdAt: new Date().toISOString(),
    }
    storage.addVideo(vid)
    setVideos(storage.getVideos())
    setSelected(vid)

    const doPoll = (jobId: string) => {
      let attempts = 0
      const interval = setInterval(async () => {
        attempts++
        try {
          const pollRes = await fetch('/api/video/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId, provider: getProviderFromModel(vid.model), model: vid.model, apiKeys: cfg.apiKeys }),
          })
          const pollData = await pollRes.json()

          if (pollData.status === 'done' && pollData.url) {
            clearInterval(interval)
            const updated: VideoGeneration = { ...vid, status: 'done', videoUrl: pollData.url }
            storage.updateVideo(updated)
            setVideos(storage.getVideos())
            setSelected(updated)
            setLoading(false)
            setLoadingMsg('')
          } else if (pollData.status === 'error') {
            clearInterval(interval)
            const failed: VideoGeneration = { ...vid, status: 'error', error: pollData.error || 'Falha na geração' }
            storage.updateVideo(failed)
            setVideos(storage.getVideos())
            setSelected(failed)
            setLoading(false)
            setError(pollData.error || 'Falha na geração')
            setLoadingMsg('')
          } else {
            setLoadingMsg(`Gerando vídeo… (${attempts * 5}s) — status: ${pollData.status}`)
          }
        } catch (e: any) {
          console.error(e)
        }

        if (attempts >= 72) {
          clearInterval(interval)
          const timeout: VideoGeneration = { ...vid, status: 'error', error: 'Timeout de geração (6 min)' }
          storage.updateVideo(timeout)
          setVideos(storage.getVideos())
          setSelected(timeout)
          setLoading(false)
          setError('Timeout de geração')
          setLoadingMsg('')
        }
      }, 5000)
    }

    try {
      const res = await fetch('/api/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, imageUrl: imageUrl || undefined, model, duration, aspectRatio: aspect, apiKeys: cfg.apiKeys }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      if (data.jobId && data.status === 'processing') {
        setLoadingMsg('Geração assíncrona iniciada. Verifique o progresso...')
        doPoll(data.jobId)
      } else if (data.url) {
        const done: VideoGeneration = { ...vid, status: 'done', videoUrl: data.url }
        storage.updateVideo(done)
        setVideos(storage.getVideos())
        setSelected(done)
        setLoading(false)
        setLoadingMsg('')
      } else {
        throw new Error('Resposta inválida do servidor')
      }
    } catch (e: any) {
      const failed: VideoGeneration = { ...vid, status: 'error', error: e.message }
      storage.updateVideo(failed)
      setVideos(storage.getVideos())
      setSelected(failed)
      setError(e.message)
      setLoading(false)
      setLoadingMsg('')
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: config */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col bg-[#050505] overflow-y-auto">
        <div className="p-4 border-b border-white/[0.08]">
          <h1 className="font-display text-lg font-bold text-white mb-0.5">Gerar Vídeos</h1>
          <p className="text-[10px] text-[rgba(237,218,186,0.4)]">Seedance 2.0 · Higgsfield · Minimax</p>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <Select label="Modelo de vídeo" value={model} onChange={e => setModel(e.target.value as VideoModel)} options={VIDEO_MODELS} />

          <div>
            <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Prompt</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder="Ex: Enfermeiro estratégico caminhando em corredor de hospital moderno, câmera lenta, fundo laranja e preto, cinematográfico"
              className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none h-24" />
          </div>

          <div>
            <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">
              Imagem de referência (opcional)
            </label>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)}
              placeholder="URL da imagem para animar"
              className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404]" />
            <div className="text-[9px] text-[rgba(237,218,186,0.25)] mt-1">Cole a URL de uma foto para converter em vídeo</div>
          </div>

          <Select label="Formato" value={aspect} onChange={e => setAspect(e.target.value)} options={ASPECTS} />

          <div>
            <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">
              Duração: {duration}s
            </label>
            <input type="range" min={4} max={10} value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full" />
          </div>

          {/* Key check */}
          {model === 'seedance-v1' && (
            <div className="text-[9px] text-[rgba(237,218,186,0.35)] bg-[rgba(255,84,4,0.06)] border border-[rgba(255,84,4,0.15)] rounded-[6px] px-3 py-2">
              Chave: <span className="font-mono text-[#FF5404]">SEGMIND_API_KEY</span><br/>
              Obter em: segmind.com → API Keys
            </div>
          )}
          {model === 'higgsfield-seedance' && (
            <div className="text-[9px] text-[rgba(237,218,186,0.35)] bg-[rgba(255,84,4,0.06)] border border-[rgba(255,84,4,0.15)] rounded-[6px] px-3 py-2">
              Chave: <span className="font-mono text-[#FF5404]">HIGGSFIELD_API_KEY</span><br/>
              Obter em: cloud.higgsfield.ai → API Keys
            </div>
          )}

          {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[6px] px-3 py-2">{error}</div>}

          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? `⏳ ${loadingMsg}` : '🎬 Gerar Vídeo'}
          </Button>

          <div className="text-[9px] text-[rgba(237,218,186,0.25)] leading-relaxed">
            Seedance 2.0 suporta texto, imagem e vídeo como referência. Gera vídeos cinematográficos de até 10s em 720p–4K.
          </div>
        </div>
      </div>

      {/* Right: history + player */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {selected && (
          <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] overflow-hidden">
            {selected.status === 'done' && selected.videoUrl ? (
              <video src={selected.videoUrl} controls autoPlay loop className="w-full max-h-96 object-contain bg-black" />
            ) : selected.status === 'processing' ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
                <div className="text-[11px] text-[rgba(237,218,186,0.5)]">{loadingMsg || 'Processando…'}</div>
              </div>
            ) : (
              <div className="p-4 text-[11px] text-[#ef4444]">Erro: {selected.error}</div>
            )}
            <div className="p-4">
              <div className="text-[11px] text-[rgba(237,218,186,0.5)] line-clamp-2">{selected.prompt}</div>
              <div className="flex gap-1.5 mt-2">
                <Badge variant="brand">{selected.model}</Badge>
                <Badge variant="muted">{selected.aspectRatio}</Badge>
                <Badge variant="muted">{selected.duration}s</Badge>
                <Badge variant={selected.status==='done'?'green':selected.status==='error'?'brand':'muted'}>
                  {selected.status}
                </Badge>
              </div>
              {selected.status === 'done' && selected.videoUrl && (
                <a href={selected.videoUrl} download={`video_${selected.id}.mp4`}
                  className="text-[10px] text-[#FF5404] hover:underline mt-2 block">⬇ Baixar vídeo</a>
              )}
            </div>
          </div>
        )}

        {/* History */}
        {videos.length > 0 && (
          <>
            <div className="text-[9px] font-bold tracking-[2px] uppercase text-[rgba(237,218,186,0.2)]">Histórico</div>
            <div className="grid grid-cols-3 gap-2">
              {videos.map(v => (
                <button key={v.id} onClick={() => setSelected(v)}
                  className={`bg-[#0a0a0a] border rounded-[8px] overflow-hidden text-left transition-all
                    ${selected?.id === v.id ? 'border-[#FF5404]' : 'border-white/[0.08] hover:border-white/20'}`}>
                  {v.videoUrl && v.status === 'done'
                    ? <video src={v.videoUrl} muted className="w-full h-20 object-cover bg-black" />
                    : <div className="h-20 flex items-center justify-center bg-black/50 text-[rgba(237,218,186,0.2)] text-xs">
                        {v.status === 'processing' ? '⏳' : v.status === 'error' ? '✕' : '🎬'}
                      </div>
                  }
                  <div className="p-2">
                    <div className="text-[9px] text-[rgba(237,218,186,0.5)] truncate">{v.prompt.substring(0, 40)}</div>
                    <Badge variant={v.status==='done'?'green':v.status==='error'?'brand':'muted'} >
                      {v.status}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {!selected && videos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="text-5xl opacity-10">🎬</div>
            <div className="font-display text-xl text-white opacity-25">Configure e gere seu vídeo</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)]">Seedance 2.0 · vídeos cinematográficos para Reels</div>
          </div>
        )}
      </div>
    </div>
  )
}
