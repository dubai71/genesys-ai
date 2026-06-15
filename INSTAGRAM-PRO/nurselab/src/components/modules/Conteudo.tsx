'use client'
import { useState, useRef } from 'react'
import { storage } from '@/lib/storage'
import type {
  ContentType, ContentTone, TextModel, ImageModel, VideoModel, GeneratedContent
} from '@/types'
import Button from '../ui/Button'
import Select from '../ui/Select'
import Input from '../ui/Input'
import Badge from '../ui/Badge'

// ─── MODEL OPTIONS ────────────────────────────────────────────────────────────
const TEXT_MODELS = [
  { value: 'claude-sonnet-4-5',  label: '✦ Claude Sonnet 4.5 (recomendado)' },
  { value: 'claude-opus-4-5',    label: '✦ Claude Opus 4.5 (poderoso)' },
  { value: 'gemini-1.5-flash',   label: '◆ Gemini 1.5 Flash (rápido)' },
  { value: 'gemini-1.5-pro',     label: '◆ Gemini 1.5 Pro' },
  { value: 'openai-gpt-4o',      label: 'GPT-4o — OpenAI (alta qualidade)' },
  { value: 'openai-gpt-4-turbo', label: 'GPT-4 Turbo — OpenAI' },
  { value: 'deepseek-v3',        label: 'DeepSeek V3 (barato, alta qualidade)' },
  { value: 'deepseek-chat',      label: 'DeepSeek Chat' },
  { value: 'groq-llama3-70b',    label: 'Llama 3 70B — Groq (ultra rápido)' },
  { value: 'groq-llama3-8b',     label: 'Llama 3 8B — Groq (free)' },
  { value: 'groq-mixtral',       label: 'Mixtral 8x7B — Groq' },
  { value: 'together-mixtral',   label: 'Mixtral — Together AI' },
  { value: 'together-llama3-70b', label: 'Llama 3 70B — Together AI' },
  { value: 'huggingface-mistral',label: 'Mixtral — HuggingFace (free tier)' },
  { value: 'huggingface-llama3', label: 'Llama 3 — HuggingFace (free tier)' },
]
const IMAGE_MODELS = [
  { value: 'fal-flux',      label: '⚡ Flux Schnell — fal.ai (rápido)' },
  { value: 'fal-sdxl',      label: '🎨 SDXL — fal.ai (qualidade)' },
  { value: 'fal-flux-pro',  label: '✦ Flux Pro — fal.ai (premium)' },
  { value: 'openai-dall-e-3',label: 'DALL-E 3 — OpenAI (alta qualidade)' },
  { value: 'openai-dall-e-2',label: 'DALL-E 2 — OpenAI' },
  { value: 'replicate-sd3',  label: 'Stable Diffusion 3 — Replicate' },
  { value: 'replicate-flux-dev', label: 'FLUX Dev — Replicate' },
  { value: 'replicate-flux-schnell', label: 'FLUX Schnell — Replicate' },
  { value: 'stability-sdxl-turbo', label: 'SDXL Turbo — Stability AI' },
  { value: 'stability-sd-xl', label: 'SDXL 1.0 — Stability AI' },
  { value: 'gemini-imagen',  label: 'Imagen — Gemini (em breve)' },
  { value: 'gemini-imagen-2', label: 'Imagen 2 — Gemini' },
  { value: 'huggingface-stable-diffusion', label: 'Stable Diffusion — HuggingFace (free)' },
  { value: 'ideogram',       label: 'Ideogram v1' },
  { value: 'ideogram-v2',    label: 'Ideogram v2' },
  { value: 'leonardo-xl',    label: 'Leonardo XL' },
  { value: 'leonardo-flux',  label: 'Leonardo Flux' },
]
const VIDEO_MODELS = [
  { value: 'higgsfield-seedance', label: '🎬 Seedance v1 — Higgs Field (grátis)' },
  { value: 'seedance-v1',         label: '🎬 Seedance v1 — API direta' },
  { value: 'seedance-v1-lite',    label: '⚡ Seedance v1 Lite (mais rápido)' },
  { value: 'fal-minimax',         label: '🎥 Minimax — fal.ai' },
  { value: 'replicate-svd',       label: 'Stable Video Diffusion — Replicate' },
  { value: 'replicate-zeroscope', label: 'ZeroScope XL — Replicate' },
  { value: 'pika',                label: 'Pika v1' },
  { value: 'pika-v2',             label: 'Pika v2' },
  { value: 'runway-gen-3',        label: 'Runway Gen-3 Alpha' },
  { value: 'runway-gen-2',        label: 'Runway Gen-2' },
  { value: 'kling',               label: 'Kling AI' },
  { value: 'haiper',              label: 'Haiper' },
  { value: 'luma-dream-machine', label: 'Luma Dream Machine' },
  { value: 'huggingface-zero-shot', label: 'Zero-shot Video — HuggingFace (free tier)' },
]
const CONTENT_TYPES = [
  { value: 'carrossel', icon: '🎠', label: 'Carrossel' },
  { value: 'post',      icon: '🖼', label: 'Post único' },
  { value: 'story',     icon: '📱', label: 'Story' },
  { value: 'reel',      icon: '🎬', label: 'Reel / Script' },
  { value: 'thread',    icon: '🧵', label: 'Thread / X' },
]
const TONES = [
  { value: 'profissional', label: 'Profissional' },
  { value: 'educativo',    label: 'Educativo' },
  { value: 'inspirador',   label: 'Inspirador' },
  { value: 'informal',     label: 'Informal' },
  { value: 'divertido',    label: 'Divertido' },
]
const TEMPLATES_QUICK = [
  'IA na prática da enfermagem',
  'Como usar Claude no plantão',
  'Mitos vs realidade sobre IA na saúde',
  '3 formas de monetizar seu conhecimento',
  'Antes e depois de usar IA na rotina',
]
const ASPECT_RATIOS = [
  { value: '9:16', label: '9:16 — Vertical (Reels/Stories)' },
  { value: '1:1',  label: '1:1 — Quadrado (Feed)' },
  { value: '16:9', label: '16:9 — Horizontal (YouTube)' },
]

type Tab = 'texto' | 'imagem' | 'video' | 'analisar'

export default function Conteudo() {
  const [tab, setTab] = useState<Tab>('texto')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-white/[0.08] flex-shrink-0 bg-[#050505]">
        {([
          { id: 'texto',    icon: '✨', label: 'Criar com texto' },
          { id: 'imagem',   icon: '🎨', label: 'Gerar imagem' },
          { id: 'video',    icon: '🎬', label: 'Gerar vídeo' },
          { id: 'analisar', icon: '🔍', label: 'Analisar imagem' },
        ] as { id: Tab; icon: string; label: string }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 text-[11px] font-semibold border-b-2 transition-all
              ${tab === t.id
                ? 'text-[#FF5404] border-[#FF5404]'
                : 'text-[rgba(237,218,186,0.4)] border-transparent hover:text-[rgba(237,218,186,0.7)]'}`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {tab === 'texto'    && <TabTexto />}
        {tab === 'imagem'   && <TabImagem />}
        {tab === 'video'    && <TabVideo />}
        {tab === 'analisar' && <TabAnalisar />}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1 — CRIAR COM TEXTO
// ═══════════════════════════════════════════════════════════════════════════════
function TabTexto() {
  const [type, setType] = useState<ContentType>('carrossel')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState<ContentTone>('profissional')
  const [textModel, setTextModel] = useState<TextModel>('claude-sonnet-4-5')
  const [imageModel, setImageModel] = useState<ImageModel>('fal-flux')
  const [slidesCount, setSlidesCount] = useState(7)
  const [genImages, setGenImages] = useState(false)
  const [genHashtags, setGenHashtags] = useState(true)
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState<{ msg: string; done: boolean }[]>([])
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [editSlide, setEditSlide] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function addStep(msg: string) { setSteps(p => [...p, { msg, done: false }]) }
  function doneStep() { setSteps(p => p.map((s, i) => i === p.length - 1 ? { ...s, done: true } : s)) }

  async function generate() {
    if (!topic.trim()) { setError('Digite o tema'); return }
    setError(''); setResult(null); setSteps([]); setLoading(true)
    try {
      const cfg = storage.getConfig()
      const biz = storage.getBusiness()
      const keys = cfg.apiKeys as Record<string, string>

      addStep(`Gerando ${type} com ${textModel}…`)
      const res = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: textModel, topic, type, tone, business: biz, slidesCount, apiKeys: keys }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar')
      doneStep()

      let slides = data.slides || []

      if (genImages && slides.length > 0 && keys.falai) {
        for (let i = 0; i < slides.length; i++) {
          addStep(`Gerando imagem ${i + 1}/${slides.length}…`)
          try {
            const imgRes = await fetch('/api/image', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: slides[i].imagePrompt || topic, model: imageModel, apiKeys: keys }),
            })
            const imgData = await imgRes.json()
            if (imgData.url) slides[i] = { ...slides[i], imageUrl: imgData.url }
          } catch {}
          doneStep()
        }
      }

      let hashtags = data.hashtags || []
      if (genHashtags && keys.anthropic) {
        addStep('Gerando hashtags…')
        try {
          const hRes = await fetch('/api/hashtags', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: topic, niche: biz.niche, apiKeys: keys }),
          })
          const hData = await hRes.json()
          hashtags = [...(hData.high || []), ...(hData.medium || []), ...(hData.niche || [])]
        } catch {}
        doneStep()
      }

      const content: GeneratedContent = {
        id: Date.now().toString(), type, title: topic, topic, tone,
        platform: 'instagram',
        slides: slides.length > 0 ? slides : undefined,
        body: data.body, hashtags,
        textModel,
        imageModel: genImages ? imageModel : undefined,
        createdAt: new Date().toISOString(), status: 'draft',
      }
      storage.addContent(content)
      setResult(content)

      // Auto-create post in Instagram tab
      const profile = storage.getActiveProfile()
      storage.addPost({
        id: Date.now().toString() + '-auto',
        title: topic,
        caption: content.slides?.[0]?.body || content.body || '',
        type: type === 'carrossel' ? 'Carrossel' : type === 'reel' ? 'Reel' : type === 'story' ? 'Story' : 'Post único',
        status: 'Rascunho',
        date: '',
        img: genImages ? 'ai' : 'none',
        profileId: profile?.id,
      })
    } catch (e: any) {
      setError(e.message || 'Erro. Verifique suas API keys.')
    }
    setLoading(false)
  }

  function copyAll() {
    if (!result) return
    let text = result.slides
      ? result.slides.map((s, i) => `Slide ${i + 1}\n${s.heading}\n${s.body}`).join('\n\n')
      : result.body || ''
    if (result.hashtags?.length) text += '\n\n' + result.hashtags.join(' ')
    navigator.clipboard.writeText(text)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  function updateSlide(idx: number, field: 'heading' | 'body', val: string) {
    if (!result?.slides) return
    const slides = [...result.slides]
    slides[idx] = { ...slides[idx], [field]: val }
    const updated = { ...result, slides }
    setResult(updated)
    storage.setContent(storage.getContent().map(c => c.id === result.id ? updated : c))
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left config */}
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col overflow-y-auto bg-[#050505]">
        <div className="p-4 flex flex-col gap-3">
          {/* Quick templates */}
          <div>
            <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-1.5">Templates rápidos</div>
            {TEMPLATES_QUICK.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className="w-full text-left px-2.5 py-1.5 rounded text-[10px] text-[rgba(237,218,186,0.45)] hover:text-[#FF5404] hover:bg-[rgba(255,84,4,0.06)] transition-all">
                {t}
              </button>
            ))}
          </div>

          {/* Content type */}
          <div>
            <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-1.5">Tipo</div>
            {CONTENT_TYPES.map(ct => (
              <button key={ct.value} onClick={() => setType(ct.value as ContentType)}
                className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-[6px] text-[11px] mb-0.5 border transition-all
                  ${type === ct.value
                    ? 'bg-[rgba(255,84,4,0.13)] text-[#FF5404] border-[rgba(255,84,4,0.3)]'
                    : 'text-[rgba(237,218,186,0.45)] border-white/[0.05] hover:border-white/20'}`}>
                <span>{ct.icon}</span>{ct.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Tema / Assunto</label>
            <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={3}
              placeholder="Ex: IA na triagem de enfermagem"
              className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none" />
          </div>

          <Select label="Tom de voz" value={tone} onChange={e => setTone(e.target.value as ContentTone)} options={TONES} />

          {type === 'carrossel' && (
            <Select label="Nº de slides" value={String(slidesCount)}
              onChange={e => setSlidesCount(Number(e.target.value))}
              options={[5, 7, 8, 10].map(n => ({ value: String(n), label: `${n} slides` }))} />
          )}

          <Select label="Modelo de texto" value={textModel}
            onChange={e => setTextModel(e.target.value as TextModel)} options={TEXT_MODELS} />

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={genImages} onChange={e => setGenImages(e.target.checked)} className="accent-[#FF5404]" />
              <span className="text-[11px] text-[rgba(237,218,186,0.6)]">Gerar imagens (fal.ai)</span>
            </label>
            {genImages && (
              <Select label="Modelo de imagem" value={imageModel}
                onChange={e => setImageModel(e.target.value as ImageModel)} options={IMAGE_MODELS} />
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={genHashtags} onChange={e => setGenHashtags(e.target.checked)} className="accent-[#FF5404]" />
              <span className="text-[11px] text-[rgba(237,218,186,0.6)]">Gerar 30 hashtags</span>
            </label>
          </div>

          {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded px-3 py-2">{error}</div>}
          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? '⏳ Gerando…' : '✨ Gerar Conteúdo'}
          </Button>
        </div>
      </div>

      {/* Right preview */}
      <div className="flex-1 overflow-y-auto p-5">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
            <div className="flex flex-col gap-2 min-w-[260px]">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center gap-2 text-[11px] ${s.done ? 'text-[#22c55e]' : 'text-[#FF5404]'}`}>
                  <span>{s.done ? '✓' : '⏳'}</span><span>{s.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl opacity-10 mb-3">✨</div>
            <div className="font-display text-xl text-white opacity-25">Configure e clique em Gerar</div>
          </div>
        )}

        {result && !loading && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{result.title}</h2>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <Badge variant="brand">{result.type}</Badge>
                  <Badge variant="muted">{result.tone}</Badge>
                  <Badge variant="muted">{result.textModel}</Badge>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm" onClick={copyAll}>{copied ? '✓ Copiado!' : '📋 Copiar'}</Button>
                <Button variant="ghost" size="sm" onClick={() => {
                  storage.addPost({
                    id: Date.now().toString(), title: result.title,
                    caption: result.slides?.[0]?.body || result.body || '',
                    type: result.type === 'carrossel' ? 'Carrossel' : result.type === 'reel' ? 'Reel' : result.type === 'story' ? 'Story' : 'Post único',
                    status: 'Rascunho', date: '', img: 'none',
                  }); alert('✓ Salvo como rascunho!')
                }}>💾 Rascunho</Button>
                <Button size="sm" onClick={() => { setResult(null); setSteps([]) }}>+ Novo</Button>
                <span className="text-[9px] text-[#22c55e] self-center">✓ Salvo no Instagram</span>
              </div>
            </div>

            {result.slides && (
              <div className="grid grid-cols-4 gap-3">
                {result.slides.map((slide, idx) => (
                  <div key={slide.id || idx} className="relative rounded-[8px] overflow-hidden cursor-pointer"
                    style={{ aspectRatio: '4/5', background: 'linear-gradient(165deg,#071925,#0d2438)' }}
                    onClick={() => setEditSlide(editSlide === idx ? null : idx)}>
                    {slide.imageUrl && <img src={slide.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9) 0%,transparent 55%)' }} />
                    <div className="absolute inset-0 flex flex-col justify-end p-3">
                      {editSlide === idx ? (
                        <div className="flex flex-col gap-1.5" onClick={e => e.stopPropagation()}>
                          <textarea value={slide.heading} rows={2}
                            className="bg-black/70 border border-white/20 rounded px-1.5 py-1 text-[10px] text-white w-full resize-none"
                            onChange={e => updateSlide(idx, 'heading', e.target.value)} />
                          <textarea value={slide.body} rows={3}
                            className="bg-black/70 border border-white/20 rounded px-1.5 py-1 text-[9px] text-white/70 w-full resize-none"
                            onChange={e => updateSlide(idx, 'body', e.target.value)} />
                          <button onClick={() => setEditSlide(null)} className="text-[9px] text-[#FF5404]">✓ OK</button>
                        </div>
                      ) : (
                        <>
                          <div className="text-[10px] font-bold text-white leading-tight mb-1">{slide.heading}</div>
                          <div className="text-[8px] text-white/65 line-clamp-3">{slide.body}</div>
                          <div className="flex justify-between mt-2">
                            <span className="text-[7px] text-white/30">{idx + 1}/{result.slides!.length}</span>
                            <span className="text-[7px] text-[#FF5404]">✏</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.body && !result.slides && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <pre className="text-[11px] text-[rgba(237,218,186,0.7)] whitespace-pre-wrap leading-relaxed font-body">{result.body}</pre>
              </div>
            )}

            {result.hashtags && result.hashtags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)]">
                    {result.hashtags.length} hashtags
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(result.hashtags!.join(' '))}
                    className="text-[9px] text-[rgba(237,218,186,0.35)] hover:text-[#FF5404]">📋 copiar</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.hashtags.map(h => (
                    <span key={h} onClick={() => navigator.clipboard.writeText(h)}
                      className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[9px] cursor-pointer hover:bg-[rgba(255,84,4,0.15)]">
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

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 2 — GERAR IMAGEM POR PROMPT
// ═══════════════════════════════════════════════════════════════════════════════
function TabImagem() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<ImageModel>('fal-flux')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<{ url: string; prompt: string }[]>([])

  const PRESETS = [
    { label: 'Enfermeiro estratégico', prompt: 'Professional nurse in dark blue uniform, confident pose, orange and dark blue color scheme, clinical environment, dramatic lighting, photorealistic, 4k' },
    { label: 'Hospital moderno', prompt: 'Modern hospital corridor, clean aesthetic, blue and white tones, professional medical environment, cinematic lighting' },
    { label: 'IA na saúde', prompt: 'Abstract visualization of artificial intelligence in healthcare, glowing neural network, dark background with orange and blue accents, futuristic medical technology' },
    { label: 'Slide dark', prompt: 'Dark background gradient #071925 to #0d2438, orange accent #FF5404, minimal design, text placeholder areas, Instagram carousel slide, professional design' },
  ]

  async function generate() {
    if (!prompt.trim()) { setError('Digite um prompt'); return }
    setError(''); setLoading(true)
    try {
      const cfg = storage.getConfig()
      const res = await fetch('/api/image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, apiKeys: cfg.apiKeys }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data.url)
      setHistory(h => [{ url: data.url, prompt }, ...h.slice(0, 7)])
    } catch (e: any) {
      setError(e.message || 'Erro. Verifique a chave fal.ai em APIs.')
    }
    setLoading(false)
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col overflow-y-auto bg-[#050505] p-4 gap-4">
        <div>
          <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-2">Presets rápidos</div>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => setPrompt(p.prompt)}
              className="w-full text-left px-2.5 py-1.5 rounded text-[10px] text-[rgba(237,218,186,0.45)] hover:text-[#FF5404] hover:bg-[rgba(255,84,4,0.06)] transition-all mb-0.5">
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Prompt (em inglês funciona melhor)</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={5}
            placeholder="professional nurse, dark moody lighting, orange accent color..."
            className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none" />
        </div>

        <Select label="Modelo" value={model} onChange={e => setModel(e.target.value as ImageModel)} options={IMAGE_MODELS} />

        {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded px-3 py-2">{error}</div>}

        <Button onClick={generate} disabled={loading} className="w-full">
          {loading ? '⏳ Gerando…' : '🎨 Gerar Imagem'}
        </Button>

        {/* History */}
        {history.length > 0 && (
          <div>
            <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-2">Histórico</div>
            <div className="grid grid-cols-3 gap-1.5">
              {history.map((h, i) => (
                <img key={i} src={h.url} alt="" onClick={() => setResult(h.url)}
                  className="aspect-square object-cover rounded-[5px] cursor-pointer hover:opacity-80 border border-white/[0.06]" />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
            <div className="text-[12px] text-[rgba(237,218,186,0.5)]">Gerando com {model}…</div>
          </div>
        )}
        {!loading && !result && (
          <div className="text-center">
            <div className="text-6xl opacity-10 mb-4">🎨</div>
            <div className="font-display text-xl text-white opacity-25">Escreva um prompt e gere</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)] mt-2">A imagem aparecerá aqui em alta resolução</div>
          </div>
        )}
        {result && !loading && (
          <div className="flex flex-col items-center gap-4 max-w-lg w-full">
            <img src={result} alt="" className="w-full rounded-[12px] border border-white/[0.08]" />
            <div className="flex gap-3">
              <a href={result} download="nurselab-image.png" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm">⬇ Baixar</Button>
              </a>
              <Button size="sm" onClick={() => navigator.clipboard.writeText(result)}>📋 Copiar URL</Button>
              <Button variant="ghost" size="sm" onClick={() => setResult(null)}>+ Nova</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 3 — GERAR VÍDEO POR PROMPT
// ═══════════════════════════════════════════════════════════════════════════════
function TabVideo() {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<VideoModel>('higgsfield-seedance')
  const [duration, setDuration] = useState(5)
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [jobId, setJobId] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [polling, setPolling] = useState(false)

  const PRESETS = [
    { label: 'Enfermeiro em ação', prompt: 'Professional nurse walking confidently through modern hospital corridor, cinematic, dark blue and orange color grade, smooth camera movement' },
    { label: 'Tech + saúde', prompt: 'Glowing AI neural network visualization transforming into medical symbols, dark background, orange and blue particles, futuristic healthcare' },
    { label: 'Motivacional', prompt: 'Sunrise over a hospital, nurse silhouette, dramatic sky, inspirational mood, warm orange tones, cinematic slow motion' },
    { label: 'Conteúdo digital', prompt: 'Person creating content on phone and laptop, cozy workspace, warm lighting, digital nomad nurse, productive and focused' },
  ]

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
    if (!prompt.trim()) { setError('Digite um prompt'); return }
    setError(''); setLoading(true); setVideoUrl(null); setJobId(null)
    setLoadingMsg('Enviando para Higgs Field…')
    try {
      const cfg = storage.getConfig()
      const res = await fetch('/api/video', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, duration, aspectRatio, apiKeys: cfg.apiKeys }),
      })
      const data = await res.json()

      if (res.status === 202 || data.status === 'processing') {
        // Video still generating — start polling
        setJobId(data.jobId)
        setLoadingMsg(`Vídeo em geração (job ${data.jobId?.slice(0, 8)}…). Isso pode levar 1-3 minutos.`)
        setPolling(true)
        pollStatus(data.jobId, cfg.apiKeys as Record<string, string>, model)
      } else if (data.url) {
        setVideoUrl(data.url)
        setLoading(false)
      } else {
        throw new Error(data.error || 'Resposta inesperada da API')
      }
    } catch (e: any) {
      setError(e.message || 'Erro. Verifique a chave Higgs Field em APIs.')
      setLoading(false)
    }
  }

  async function pollStatus(jid: string, keys: Record<string, string>, model: string) {
    let attempts = 0
    const interval = setInterval(async () => {
      attempts++
      try {
        const res = await fetch('/api/video/status', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: jid,
            provider: getProviderFromModel(model),
            model,
            apiKeys: keys
          }),
        })
        const data = await res.json()
        if (data.status === 'done' && data.url) {
          clearInterval(interval)
          setVideoUrl(data.url); setLoading(false); setPolling(false)
          setLoadingMsg('')
        } else if (data.status === 'error') {
          clearInterval(interval)
          setError(data.error || 'Geração falhou'); setLoading(false); setPolling(false)
        } else {
          setLoadingMsg(`Gerando… (${attempts * 5}s) — status: ${data.status}`)
        }
      } catch {}
      if (attempts > 36) { clearInterval(interval); setError('Timeout de 3 minutos'); setLoading(false) }
    }, 5000)
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col overflow-y-auto bg-[#050505] p-4 gap-4">
        <div>
          <div className="text-[8px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-2">Presets</div>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => setPrompt(p.prompt)}
              className="w-full text-left px-2.5 py-1.5 rounded text-[10px] text-[rgba(237,218,186,0.45)] hover:text-[#FF5404] hover:bg-[rgba(255,84,4,0.06)] transition-all mb-0.5">
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">Prompt</label>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={5}
            placeholder="Describe the video scene in English for best results..."
            className="w-full bg-[#111] border border-white/[0.08] rounded-[5px] px-2.5 py-2 text-[11px] text-[#EDDABA] outline-none focus:border-[#FF5404] resize-none" />
        </div>

        <Select label="Modelo" value={model} onChange={e => setModel(e.target.value as VideoModel)} options={VIDEO_MODELS} />

        <Select label="Proporção" value={aspectRatio} onChange={e => setAspectRatio(e.target.value)} options={ASPECT_RATIOS} />

        <div>
          <label className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-1 block">
            Duração: {duration}s
          </label>
          <input type="range" min={3} max={15} step={1} value={duration}
            onChange={e => setDuration(Number(e.target.value))}
            className="w-full accent-[#FF5404]" />
          <div className="flex justify-between text-[8px] text-[rgba(237,218,186,0.25)] mt-0.5">
            <span>3s</span><span>15s</span>
          </div>
        </div>

        {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded px-3 py-2">{error}</div>}

        <Button onClick={generate} disabled={loading} className="w-full">
          {loading ? '⏳ Gerando…' : '🎬 Gerar Vídeo'}
        </Button>

        <div className="text-[9px] text-[rgba(237,218,186,0.25)] leading-relaxed">
          Seedance via Higgs Field. Requer chave em APIs & Configurações. Geração leva 1–3 min.
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
            <div className="text-[12px] text-[rgba(237,218,186,0.6)] max-w-xs leading-relaxed">{loadingMsg}</div>
            {jobId && <div className="text-[9px] text-[rgba(237,218,186,0.3)] font-mono">Job ID: {jobId}</div>}
          </div>
        )}
        {!loading && !videoUrl && (
          <div className="text-center">
            <div className="text-6xl opacity-10 mb-4">🎬</div>
            <div className="font-display text-xl text-white opacity-25">Descreva a cena e gere</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)] mt-2">O vídeo aparecerá aqui quando pronto</div>
          </div>
        )}
        {videoUrl && !loading && (
          <div className="flex flex-col items-center gap-4 max-w-md w-full">
            <video src={videoUrl} controls autoPlay loop
              className="w-full rounded-[12px] border border-white/[0.08]"
              style={{ maxHeight: 500 }} />
            <div className="flex gap-3">
              <a href={videoUrl} download="nurselab-video.mp4" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm">⬇ Baixar</Button>
              </a>
              <Button size="sm" onClick={() => navigator.clipboard.writeText(videoUrl)}>📋 URL</Button>
              <Button variant="ghost" size="sm" onClick={() => setVideoUrl(null)}>+ Novo</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 4 — ANALISAR IMAGEM
// ═══════════════════════════════════════════════════════════════════════════════
function TabAnalisar() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    caption: string; hashtags: string[]; suggestions: string[]; tone: string; type: string
  } | null>(null)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = e => setImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function analyze() {
    if (!image) return
    setLoading(true); setError(''); setResult(null)
    try {
      const cfg = storage.getConfig()
      const key = (cfg.apiKeys as Record<string, string>).anthropic
      if (!key) throw new Error('Chave Anthropic não configurada. Vá em APIs & Configurações.')

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 800,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image.replace(/^data:image\/\w+;base64,/, '') } },
              { type: 'text', text: `Analise esta imagem para Instagram de um perfil de enfermagem e IA. 
Responda APENAS com JSON:
{"caption":"legenda completa em português max 200 chars, tom profissional e envolvente","hashtags":["#tag1","#tag2","#tag3","#tag4","#tag5"],"suggestions":["sugestão de melhoria 1","sugestão 2","sugestão 3"],"tone":"profissional|educativo|inspirador|informal","type":"carrossel|post|story|reel"}` }
            ]
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (e: any) {
      setError(e.message || 'Erro na análise')
    }
    setLoading(false)
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-72 flex-shrink-0 border-r border-white/[0.08] flex flex-col p-4 gap-4 bg-[#050505]">
        <div className="text-[10px] text-[rgba(237,218,186,0.5)] leading-relaxed">
          Envie qualquer imagem — Claude analisa e gera legenda, hashtags e sugestões de melhoria automaticamente.
        </div>

        <div
          className="border border-dashed border-white/20 rounded-[8px] p-6 text-center cursor-pointer hover:border-[#FF5404] transition-colors"
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}>
          {image ? (
            <img src={image} alt="" className="w-full rounded-[6px] object-cover max-h-40" />
          ) : (
            <>
              <div className="text-2xl mb-2 opacity-30">📸</div>
              <div className="text-[10px] text-[rgba(237,218,186,0.4)]">Arraste ou clique para enviar</div>
              <div className="text-[9px] text-[rgba(237,218,186,0.25)] mt-1">PNG · JPG · WEBP</div>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

        {image && (
          <Button onClick={analyze} disabled={loading} className="w-full">
            {loading ? '⏳ Analisando…' : '🔍 Analisar com Claude'}
          </Button>
        )}
        {image && <Button variant="ghost" size="sm" onClick={() => { setImage(null); setResult(null) }}>✕ Remover</Button>}
        {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded px-3 py-2">{error}</div>}
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#FF5404] rounded-full animate-spin" />
            <div className="text-[12px] text-[rgba(237,218,186,0.5)]">Analisando com Claude Vision…</div>
          </div>
        )}
        {!loading && !result && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-6xl opacity-10 mb-4">🔍</div>
            <div className="font-display text-xl text-white opacity-25">Envie uma imagem</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.2)] mt-2">Claude analisa e gera legenda, hashtags e sugestões</div>
          </div>
        )}
        {result && !loading && (
          <div className="flex flex-col gap-5 max-w-xl">
            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-5">
              <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Legenda sugerida</div>
              <p className="text-[13px] text-white leading-relaxed">{result.caption}</p>
              <button onClick={() => navigator.clipboard.writeText(result.caption)}
                className="text-[9px] text-[#FF5404] hover:underline mt-2 block">📋 Copiar legenda</button>
            </div>

            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)]">Hashtags</div>
                <button onClick={() => navigator.clipboard.writeText(result.hashtags.join(' '))}
                  className="text-[9px] text-[rgba(237,218,186,0.35)] hover:text-[#FF5404]">📋 copiar</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.hashtags.map(h => (
                  <span key={h} onClick={() => navigator.clipboard.writeText(h)}
                    className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[10px] cursor-pointer hover:bg-[rgba(255,84,4,0.15)]">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-5">
              <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.22)] mb-3">Sugestões de melhoria</div>
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <span className="text-[#FF5404] text-[10px] mt-0.5">→</span>
                  <span className="text-[11px] text-[rgba(237,218,186,0.65)]">{s}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <Badge variant="muted">{result.type}</Badge>
                <Badge variant="muted">{result.tone}</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
