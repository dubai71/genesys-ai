'use client'
import { useState } from 'react'
import { storage } from '@/lib/storage'
import { generateContent, generateImage, generateHashtags } from '@/lib/ai'
import type { ContentType, ContentTone, TextModel, ImageModel, Slide, GeneratedContent } from '@/types'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import PageHeader from '../ui/PageHeader'
import Badge from '../ui/Badge'

const TEXT_MODELS: {value:TextModel;label:string}[] = [
  {value:'claude-sonnet-4-5',label:'Claude Sonnet 4.5 (recomendado)'},
  {value:'claude-opus-4-5',label:'Claude Opus 4.5 (mais poderoso)'},
  {value:'gemini-1.5-flash',label:'Gemini 1.5 Flash (rápido)'},
  {value:'gemini-1.5-pro',label:'Gemini 1.5 Pro'},
]
const IMAGE_MODELS: {value:ImageModel;label:string}[] = [
  {value:'fal-flux',label:'Flux Schnell via fal.ai (rápido)'},
  {value:'fal-sdxl',label:'SDXL via fal.ai (qualidade)'},
  {value:'gemini-imagen',label:'Gemini Imagen (em breve)'},
]
const TYPES: {value:ContentType;label:string;icon:string}[] = [
  {value:'carrossel',label:'Carrossel Instagram',icon:'🎠'},
  {value:'post',label:'Post único',icon:'🖼'},
  {value:'story',label:'Story/Ideia',icon:'📱'},
  {value:'reel',label:'Reel/TikTok',icon:'🎬'},
  {value:'thread',label:'Thread Twitter/X',icon:'🧵'},
]
const TONES: {value:ContentTone;label:string}[] = [
  {value:'profissional',label:'Profissional'},
  {value:'educativo',label:'Educativo'},
  {value:'inspirador',label:'Inspirador'},
  {value:'informal',label:'Informal'},
  {value:'divertido',label:'Divertido'},
]

export default function Conteudo() {
  const [type, setType] = useState<ContentType>('carrossel')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState<ContentTone>('profissional')
  const [textModel, setTextModel] = useState<TextModel>('claude-sonnet-4-5')
  const [imageModel, setImageModel] = useState<ImageModel>('fal-flux')
  const [slidesCount, setSlidesCount] = useState(7)
  const [genImages, setGenImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [result, setResult] = useState<GeneratedContent|null>(null)
  const [editSlide, setEditSlide] = useState<number|null>(null)
  const [error, setError] = useState('')
  const [genHashtags, setGenHashtags] = useState(true)

  async function handleGenerate() {
    if (!topic.trim()) { setError('Digite o tema do conteúdo'); return }
    setError('')
    setLoading(true)
    setLoadingMsg('Gerando conteúdo com IA…')
    try {
      const cfg = storage.getConfig()
      const biz = storage.getBusiness()
      const data = await generateContent({ type, topic, tone, textModel, business: biz, apiKeys: cfg.apiKeys as Record<string,string>, slidesCount })

      let slides = data.slides
      let hashtags = data.hashtags || []

      // Generate images for slides
      if (genImages && slides && cfg.apiKeys.falai) {
        for (let i = 0; i < slides.length; i++) {
          if (slides[i].imagePrompt) {
            setLoadingMsg(`Gerando imagem ${i+1}/${slides.length}…`)
            try {
              const url = await generateImage({ prompt: slides[i].imagePrompt!, imageModel, apiKeys: cfg.apiKeys as Record<string,string> })
              slides[i] = { ...slides[i], imageUrl: url }
            } catch {}
          }
        }
      }

      // Generate hashtags
      if (genHashtags && cfg.apiKeys.anthropic) {
        setLoadingMsg('Gerando hashtags…')
        try {
          const tags = await generateHashtags(topic, biz.niche, cfg.apiKeys.anthropic)
          hashtags = [...(tags.high||[]), ...(tags.medium||[]), ...(tags.niche||[])]
        } catch {}
      }

      const content: GeneratedContent = {
        id: Date.now().toString(),
        type, title: topic, topic, tone, platform: 'instagram',
        slides, body: data.body, hashtags,
        textModel, imageModel: genImages ? imageModel : undefined,
        createdAt: new Date().toISOString(),
        status: 'draft',
      }
      storage.addContent(content)
      setResult(content)
    } catch(e:any) {
      setError(e.message || 'Erro ao gerar conteúdo. Verifique suas API keys em Configurações.')
    }
    setLoading(false)
    setLoadingMsg('')
  }

  function copyAll() {
    if (!result) return
    const text = result.slides
      ? result.slides.map((s,i) => `Slide ${i+1}\n${s.heading}\n${s.body}`).join('\n\n')
      : result.body || ''
    navigator.clipboard.writeText(text + (result.hashtags?.length ? '\n\n' + result.hashtags.join(' ') : ''))
  }

  function saveAsDraft() {
    if (!result) return
    storage.addPost({
      id: Date.now().toString(),
      title: result.title,
      caption: result.slides?.[0]?.body || result.body || '',
      type: type === 'carrossel' ? 'Carrossel' : type === 'reel' ? 'Reel' : type === 'story' ? 'Story' : 'Post único',
      status: 'Rascunho',
      date: '',
      img: 'none',
    })
    alert('Salvo como rascunho no Instagram!')
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left panel - config */}
      <div className="w-80 flex-shrink-0 border-r border-white/[0.08] flex flex-col overflow-y-auto">
        <PageHeader title="Criar Conteúdo" subtitle="IA para enfermagem" />
        <div className="p-4 flex flex-col gap-4">
          {/* Type selector */}
          <div>
            <div className="text-[8px] font-bold tracking-[1px] uppercase text-[rgba(237,218,186,0.25)] mb-2">Tipo de conteúdo</div>
            <div className="grid grid-cols-1 gap-1">
              {TYPES.map(t => (
                <button key={t.value} onClick={() => setType(t.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[6px] text-[11px] text-left transition-all
                    ${type===t.value ? 'bg-[rgba(255,84,4,0.13)] text-[#FF5404] border border-[rgba(255,84,4,0.3)]' : 'bg-[#0a0a0a] text-[rgba(237,218,186,0.45)] border border-white/[0.08] hover:border-white/20'}`}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <Input label="Tema / Assunto" value={topic} onChange={e=>setTopic(e.target.value)}
            placeholder="Ex: IA na triagem de enfermagem" />

          {/* Tone */}
          <Select label="Tom de voz" value={tone} onChange={e=>setTone(e.target.value as ContentTone)}
            options={TONES} />

          {/* Slides count */}
          {type === 'carrossel' && (
            <Select label="Quantidade de slides" value={String(slidesCount)} onChange={e=>setSlidesCount(Number(e.target.value))}
              options={[5,7,9,10].map(n=>({value:String(n),label:`${n} slides`}))} />
          )}

          {/* Models */}
          <Select label="Modelo de texto" value={textModel} onChange={e=>setTextModel(e.target.value as TextModel)} options={TEXT_MODELS} />

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={genImages} onChange={e=>setGenImages(e.target.checked)}
                className="accent-[#FF5404]" />
              <span className="text-[11px] text-[rgba(237,218,186,0.6)]">Gerar imagens com IA</span>
            </label>
            {genImages && (
              <Select label="Modelo de imagem" value={imageModel} onChange={e=>setImageModel(e.target.value as ImageModel)} options={IMAGE_MODELS} />
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={genHashtags} onChange={e=>setGenHashtags(e.target.checked)}
                className="accent-[#FF5404]" />
              <span className="text-[11px] text-[rgba(237,218,186,0.6)]">Gerar hashtags</span>
            </label>
          </div>

          {error && <div className="text-[10px] text-[#ef4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[6px] px-3 py-2">{error}</div>}

          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? `${loadingMsg}` : '✨ Gerar Conteúdo'}
          </Button>
        </div>
      </div>

      {/* Right panel - preview */}
      <div className="flex-1 overflow-y-auto p-4">
        {!result && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-4xl mb-4 opacity-20">✨</div>
            <div className="font-display text-lg text-white opacity-30">Configure e clique em Gerar</div>
            <div className="text-[11px] text-[rgba(237,218,186,0.25)] mt-2">O conteúdo aparecerá aqui com preview</div>
          </div>
        )}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#FF5404] rounded-full spin" />
            <div className="text-[12px] text-[rgba(237,218,186,0.5)]">{loadingMsg}</div>
          </div>
        )}
        {result && !loading && (
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-white">{result.title}</h2>
                <div className="flex gap-1.5 mt-1">
                  <Badge variant="brand">{result.type}</Badge>
                  <Badge variant="muted">{result.tone}</Badge>
                  <Badge variant="muted">{result.textModel}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyAll}>📋 Copiar tudo</Button>
                <Button variant="ghost" size="sm" onClick={saveAsDraft}>💾 Salvar rascunho</Button>
                <Button size="sm" onClick={() => setResult(null)}>+ Novo</Button>
              </div>
            </div>

            {/* Slides */}
            {result.slides && (
              <div className="grid grid-cols-3 gap-3">
                {result.slides.map((slide, idx) => (
                  <div key={slide.id} className="relative">
                    {/* Instagram 4:5 card */}
                    <div className="slide-card bg-[#071925] border border-white/[0.08] rounded-[8px] overflow-hidden relative"
                      style={{aspectRatio:'4/5'}}>
                      {slide.imageUrl && (
                        <img src={slide.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-3"
                        style={{background:'linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)'}}>
                        {editSlide === idx ? (
                          <div className="flex flex-col gap-1">
                            <textarea defaultValue={slide.heading}
                              className="bg-black/50 border border-white/20 rounded px-2 py-1 text-[10px] text-white w-full resize-none"
                              rows={2}
                              onChange={e => { const s=[...result.slides!]; s[idx]={...s[idx],heading:e.target.value}; setResult({...result,slides:s}) }} />
                            <textarea defaultValue={slide.body}
                              className="bg-black/50 border border-white/20 rounded px-2 py-1 text-[9px] text-white/70 w-full resize-none"
                              rows={3}
                              onChange={e => { const s=[...result.slides!]; s[idx]={...s[idx],body:e.target.value}; setResult({...result,slides:s}) }} />
                            <button onClick={() => setEditSlide(null)} className="text-[9px] text-[#FF5404]">✓ Salvar</button>
                          </div>
                        ) : (
                          <>
                            <div className="text-[11px] font-bold text-white leading-tight mb-1">{slide.heading}</div>
                            <div className="text-[9px] text-white/70 leading-snug">{slide.body}</div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[8px] text-white/40">{idx+1}/{result.slides!.length}</span>
                              <button onClick={() => setEditSlide(idx)} className="text-[8px] text-[#FF5404]">✏️ Editar</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Thread / Post body */}
            {result.body && !result.slides && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <pre className="text-[11px] text-[rgba(237,218,186,0.7)] whitespace-pre-wrap leading-relaxed font-body">
                  {result.body}
                </pre>
              </div>
            )}

            {/* Hashtags */}
            {result.hashtags && result.hashtags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-[9px] p-4">
                <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-[rgba(237,218,186,0.25)] mb-2">Hashtags</div>
                <div className="flex flex-wrap gap-1.5">
                  {result.hashtags.map(h => (
                    <span key={h} className="px-2 py-0.5 bg-[rgba(255,84,4,0.08)] text-[#FF5404] rounded text-[9px] font-medium">{h}</span>
                  ))}
                </div>
                <button onClick={() => navigator.clipboard.writeText(result.hashtags!.join(' '))}
                  className="text-[9px] text-[rgba(237,218,186,0.4)] hover:text-[#FF5404] mt-2 block">
                  📋 Copiar hashtags
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
