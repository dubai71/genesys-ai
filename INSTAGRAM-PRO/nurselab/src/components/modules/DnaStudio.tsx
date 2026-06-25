'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { storage } from '@/lib/storage'
import type {
  VisualDNA, PromptTemplate, PromptVariable, DNAStylePreset,
  ArtifactType, DNAColor, DNATextStyle, DNALayoutBlock, DNATextElement,
  DNAVisualEffect, DNATypography
} from '@/types'

// ─── DEFAULT TEMPLATES ─────────────────────────────────────────────────────

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'twitter-vibe-01',
    name: 'Twitter Vibe',
    description: 'Estilo Twitter/X moderno — imagem limpa, tipografia bold, design editorial minimalista',
    category: 'post',
    stylePreset: 'twitter-vibe',
    promptTemplate: 'Create a social media image in Twitter/X style. Topic: {{topic}}. Style: clean editorial layout with bold typography. Use colors {{color1}} and {{color2}}. Text: "{{headline}}". Subtitle: "{{subtitle}}".',
    variables: [
      { id: 'v1', name: 'topic', label: 'Tópico principal', type: 'text', required: true },
      { id: 'v2', name: 'headline', label: 'Headline (título)', type: 'text', required: true },
      { id: 'v3', name: 'subtitle', label: 'Subtítulo', type: 'text', required: false },
      { id: 'v4', name: 'color1', label: 'Cor principal', type: 'color', required: false, defaultValue: '#FF5404' },
      { id: 'v5', name: 'color2', label: 'Cor secundária', type: 'color', required: false, defaultValue: '#071925' },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '1:1',
    defaultSlideCount: 1,
    tags: ['twitter', 'editorial', 'clean'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'windows-editorial-01',
    name: 'Windows Editorial',
    description: 'Estilo Windows 11 editorial — cards, glassmorphism, fontes modernas',
    category: 'carrossel',
    stylePreset: 'windows-editorial',
    promptTemplate: 'Create a Windows 11 editorial style card. Topic: {{topic}}. Use glassmorphism with backdrop blur, rounded corners 8px. Colors: {{color1}} (accent), {{color2}} (background). Typography: Segoe UI variable, weight 600 for headline. Text: "{{headline}}". Body: "{{body}}". {{slideCount}} slides total.',
    defaultSlideCount: 5,
    variables: [
      { id: 'w1', name: 'topic', label: 'Tópico', type: 'text', required: true },
      { id: 'w2', name: 'headline', label: 'Título principal', type: 'text', required: true },
      { id: 'w3', name: 'body', label: 'Texto do slide', type: 'text', required: true },
      { id: 'w4', name: 'slideCount', label: 'Número de slides', type: 'text', required: false, defaultValue: '5' },
      { id: 'w5', name: 'color1', label: 'Cor de destaque', type: 'color', required: false, defaultValue: '#005FB8' },
      { id: 'w6', name: 'color2', label: 'Cor de fundo', type: 'color', required: false, defaultValue: '#F5F5F5' },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '4:5',
    tags: ['windows', 'editorial', 'cards', 'glassmorphism'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'minimal-health-01',
    name: 'Minimal Health',
    description: 'Estilo clean profissional para conteúdo de saúde — fotografia clínica, fontes serifadas, espaçamento generoso',
    category: 'post',
    stylePreset: 'minimal-health',
    promptTemplate: 'Professional healthcare social media post. Topic: {{topic}}. Clinical setting, soft white lighting. Serif font for title, clean sans-serif for body. Colors: {{color1}}, {{color2}}, {{color3}}. Layout: centered headline above waist-up medical professional photo. Text: "{{headline}}". Include subtle medical iconography.',
    defaultSlideCount: 1,
    variables: [
      { id: 'm1', name: 'topic', label: 'Tópico', type: 'text', required: true },
      { id: 'm2', name: 'headline', label: 'Headline', type: 'text', required: true },
      { id: 'm3', name: 'color1', label: 'Cor primária', type: 'color', required: false, defaultValue: '#1A6B4C' },
      { id: 'm4', name: 'color2', label: 'Cor neutra', type: 'color', required: false, defaultValue: '#F8F9FA' },
      { id: 'm5', name: 'color3', label: 'Cor de texto', type: 'color', required: false, defaultValue: '#212529' },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '4:5',
    tags: ['saúde', 'profissional', 'minimal', 'clinical'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'bold-medical-01',
    name: 'Bold Medical',
    description: 'Medical bold — cores fortes laranja+preto, fotografia dramática, tipografia impactante',
    category: 'post',
    stylePreset: 'bold-medical',
    promptTemplate: 'Bold medical Instagram post. Topic: {{topic}}. Dramatic lighting, high contrast. Orange (#FF5404) as accent on dark (#071925) background. Sans-serif bold condensed for main text. Image: medical professional in action, shallow depth of field. Text overlay: "{{headline}}". Subtitle: "{{subtitle}}". Style: editorial fashion meets healthcare.',
    defaultSlideCount: 1,
    variables: [
      { id: 'bm1', name: 'topic', label: 'Tópico', type: 'text', required: true },
      { id: 'bm2', name: 'headline', label: 'Headline', type: 'text', required: true },
      { id: 'bm3', name: 'subtitle', label: 'Subtítulo', type: 'text', required: false },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '4:5',
    tags: ['bold', 'medical', 'dramatic', 'editorial'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'thread-style-01',
    name: 'Thread X Style',
    description: 'Estilo Twitter Thread — cards individuais para cada tweet, número de tweet, design contínuo',
    category: 'thread',
    stylePreset: 'thread-style',
    promptTemplate: 'X/Twitter thread card. Tweet {{tweetNumber}} of {{totalTweets}}. Clean light background with subtle border-radius 12px. Topic: {{topic}}. Left-aligned text, sans-serif. Show thread number as subtle badge top-left. Content: "{{content}}" No heavy graphics — keep focus on text. Minimal design with brand accent line on left edge in {{color}}.',
    defaultSlideCount: 8,
    variables: [
      { id: 'ts1', name: 'topic', label: 'Tópico', type: 'text', required: true },
      { id: 'ts2', name: 'content', label: 'Conteúdo do tweet', type: 'text', required: true },
      { id: 'ts3', name: 'tweetNumber', label: 'Nº do tweet', type: 'text', required: false, defaultValue: '1' },
      { id: 'ts4', name: 'totalTweets', label: 'Total de tweets', type: 'text', required: false, defaultValue: '8' },
      { id: 'ts5', name: 'color', label: 'Cor de destaque', type: 'color', required: false, defaultValue: '#FF5404' },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '4:5',
    tags: ['thread', 'twitter', 'x', 'cards', 'minimal'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ad-creative-01',
    name: 'AD Creative',
    description: 'Criativo pago estilo Meta Ads — foco no produto, CTA claro, contraste alto',
    category: 'ads',
    stylePreset: 'viral-carousel',
    promptTemplate: 'Meta ad creative. Product/service: {{topic}}. Headline: "{{headline}}" in bold white text. CTA: "{{cta}}" in accent button bottom-right. Image: product or service in use, warm lighting, lifestyle context. Colors: {{color1}} (accent) on {{color2}} (bg). Include subtle price mention "{{price}}" if applicable. High conversion layout with clear value proposition.',
    defaultSlideCount: 1,
    variables: [
      { id: 'ad1', name: 'topic', label: 'Produto/serviço', type: 'text', required: true },
      { id: 'ad2', name: 'headline', label: 'Headline', type: 'text', required: true },
      { id: 'ad3', name: 'cta', label: 'CTA', type: 'text', required: false, defaultValue: 'Saiba mais' },
      { id: 'ad4', name: 'price', label: 'Preço (opcional)', type: 'text', required: false },
      { id: 'ad5', name: 'color1', label: 'Cor CTA', type: 'color', required: false, defaultValue: '#FF5404' },
      { id: 'ad6', name: 'color2', label: 'Cor fundo', type: 'color', required: false, defaultValue: '#071925' },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '1:1',
    tags: ['ads', 'meta', 'marketing', 'conversion'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'viral-carousel-01',
    name: 'Viral Carrossel',
    description: 'Carrossel viral Instagram — 7 slides pré-definidos com progressão de storytelling',
    category: 'carrossel',
    stylePreset: 'viral-carousel',
    promptTemplate: 'Instagram carousel design. Topic: {{topic}}. Slide {{currentSlide}} of {{totalSlides}}. Bold gradient background ({{color1}} to {{color2}}). High-contrast typography in white. Number indicator top-right. Main text: "{{text}}" centered. Include downward arrow hint. For each slide, change the composition while keeping visual consistency.',
    prompts: [
      'Cover slide. Bold gradient background (#FF5404 to #071925). Large headline text in white bold: "[[topic]]". Small subtitle below: "7 dicas que mudam tudo". Number badge top-right: "1/7". Downward arrow at bottom. Clean, high-impact, no images needed.',
      'Slide 2 of 7. Problem hook. Same gradient background but slightly different angle. Large number "1" top-left in semi-transparent white. Headline: "A enfermagem ainda trabalha manualmente". Subtitle: "Enquanto outras áreas já usam IA..." Center-focused text layout.',
      'Slide 3 of 7. Stat or fact. Gradient background. Number "2" badge. Bold number "85%" in huge white text. Headline: "dos profissionais perdem horas com planilhas". Subtitle in smaller text. Minimal, data-focused.',
      'Slide 4 of 7. Solution preview. Gradient background. Number "3" badge. Icon-like shape in center (circle with checkmark). Headline: "Automação já é realidade". Subtitle: "Triagem, prescrição e acompanhamento em um clique".',
      'Slide 5 of 7. Step-by-step. Gradient background. Number "4" badge. Three small numbered circles in a row (1→2→3). Headline: "Como funciona na prática". Short body text below each circle.',
      'Slide 6 of 7. Social proof/testimonial style. Gradient background. Number "5" badge. Quote marks large in background. Headline: "Nunca imaginei trabalhar assim". Subtitle: "— Enfermeira, 8 anos de experiência".',
      'Final slide / CTA. Gradient background. Number "7" badge. Large CTA text: "Quer saber mais?". Subtitle: "Acesse o link na bio". Small logo placeholder bottom-center. Clean closing slide.',
    ],
    variables: [
      { id: 'vc1', name: 'topic', label: 'Tópico principal', type: 'text', required: true },
    ],
    defaultModel: 'flux-1-dev',
    defaultAspectRatio: '4:5',
    defaultSlideCount: 7,
    tags: ['viral', 'carrossel', 'instagram', 'gradient', '7-slides'],
    useCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// ─── INIT ───────────────────────────────────────────────────────────────────

function ensureTemplates() {
  const existing = storage.getPromptTemplates()
  if (existing.length === 0) {
    storage.setPromptTemplates(DEFAULT_TEMPLATES)
    return DEFAULT_TEMPLATES
  }
  return existing
}

// ─── HEX HELPERS ────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace('#', '')
  return [parseInt(c.slice(0,2), 16), parseInt(c.slice(2,4), 16), parseInt(c.slice(4,6), 16)]
}

function hexToHsl(hex: string): [number, number, number] {
  let [r, g, b] = hexToRgb(hex).map(v => v / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

type SubTab = 'extract' | 'templates' | 'generator' | 'autopilot'

export default function DnaStudio() {

  // ── State ──
  const [subTab, setSubTab] = useState<SubTab>('extract')
  const [extractedDNA, setExtractedDNA] = useState<VisualDNA | null>(null)
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [templatesDna, setTemplatesDna] = useState<VisualDNA[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // ── Autopilot State ──
  const [autoSource, setAutoSource] = useState<'news' | 'competitors' | 'manual'>('news')
  const [autoTemplateId, setAutoTemplateId] = useState('bold-medical-01')
  const [autoCount, setAutoCount] = useState(5)
  const [autoCategory, setAutoCategory] = useState('todos')
  const [autoTopic, setAutoTopic] = useState('')
  const [autoSuggestions, setAutoSuggestions] = useState<any[]>([])
  const [autoLoading, setAutoLoading] = useState(false)
  const [autoError, setAutoError] = useState('')

  // Template options for autopilot
  const AUTOPILOT_TEMPLATE_OPTIONS = [
    { id: 'bold-medical-01', name: 'Bold Medical (laranja+preto)' },
    { id: 'viral-carousel-01', name: 'Viral Carrossel (gradiente)' },
    { id: 'twitter-vibe-01', name: 'Twitter Vibe (clean)' },
    { id: 'windows-editorial-01', name: 'Windows Editorial (glass)' },
    { id: 'minimal-health-01', name: 'Minimal Health (profissional)' },
    { id: 'thread-style-01', name: 'Thread X Style (cards)' },
    { id: 'ad-creative-01', name: 'AD Creative (anúncio)' },
  ]

  // ── Batch Generation State ──
  const [batchTopic, setBatchTopic] = useState('')
  const [batchGenerating, setBatchGenerating] = useState(false)
  const [batchImages, setBatchImages] = useState<{prompt: string; imageUrl?: string; error?: string}[]>([])
  const [batchProgress, setBatchProgress] = useState(0)

  // Generate ALL slides at once (batch)
  async function generateBatch() {
    if (!selectedTemplate?.prompts?.length) return
    if (!batchTopic.trim()) {
      setStatusMessage('⚠️ Informe o tópico principal para gerar os slides')
      return
    }

    setBatchGenerating(true)
    setBatchImages([])
    setBatchProgress(0)
    setStatusMessage('')

    const results: {prompt: string; imageUrl?: string; error?: string}[] = []
    const total = selectedTemplate.prompts.length

    for (let i = 0; i < selectedTemplate.prompts.length; i++) {
      const rawPrompt = selectedTemplate.prompts[i]
      // Substitute [[topic]] with actual topic
      const finalPrompt = rawPrompt.replace(/\[\[topic\]\]/gi, batchTopic.trim())

      results.push({ prompt: finalPrompt })
      setBatchImages([...results])

      try {
        const res = await fetch('/api/v1/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: finalPrompt,
            model: selectedTemplate.defaultModel,
            aspectRatio: selectedTemplate.defaultAspectRatio,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          results[i] = { ...results[i], imageUrl: data.url || data.imageUrl }
        } else {
          const err = await res.json().catch(() => ({}))
          results[i] = { ...results[i], error: err.error || `Erro ${res.status}` }
        }
      } catch (err: any) {
        results[i] = { ...results[i], error: err.message || 'Erro de rede' }
      }

      setBatchImages([...results])
      setBatchProgress(Math.round(((i + 1) / total) * 100))
      // Small delay to avoid rate limiting
      if (i < total - 1) await new Promise(r => setTimeout(r, 500))
    }

    setBatchGenerating(false)
    setBatchProgress(100)

    const successful = results.filter(r => r.imageUrl).length
    setStatusMessage(`✅ ${successful}/${total} slides gerados!`)

    // Save to creatives bank
    for (const r of results) {
      if (r.imageUrl) {
        storage.addCreative({
          id: `creative-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          type: 'image',
          url: r.imageUrl,
          prompt: r.prompt,
          model: selectedTemplate.defaultModel,
          aspectRatio: selectedTemplate.defaultAspectRatio,
          name: `${selectedTemplate.name} — Slide ${results.indexOf(r) + 1}`,
          tags: selectedTemplate.tags,
          savedAs: 'creative',
          createdAt: new Date().toISOString(),
        })
      }
    }
  }

  // Send ALL batch images to GeneratorLab as a session
  function sendBatchToGenerator() {
    if (!batchImages.length) return
    const urls = batchImages.filter(r => r.imageUrl).map(r => r.imageUrl!)
    const prompts = batchImages.filter(r => r.prompt).map(r => r.prompt)

    if (typeof window !== 'undefined' && selectedTemplate) {
      sessionStorage.setItem('nl_dna_batch_urls', JSON.stringify(urls))
      sessionStorage.setItem('nl_dna_batch_prompts', JSON.stringify(prompts))
      sessionStorage.setItem('nl_dna_model', selectedTemplate.defaultModel)
      sessionStorage.setItem('nl_dna_aspect', selectedTemplate.defaultAspectRatio)
      sessionStorage.setItem('nl_dna_template', selectedTemplate.name)
    }

    setStatusMessage(`📦 ${urls.length} slides enviados para o banco de criativos!`)
  }

  const fileRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // ── Init ──
  useEffect(() => {
    setTemplates(ensureTemplates())
    setTemplatesDna(storage.getDNA())
  }, [])

  function refreshTemplates() {
    setTemplates(storage.getPromptTemplates())
    setTemplatesDna(storage.getDNA())
  }

  // ── Autopilot: run all sources ──
  async function runAutopilot() {
    setAutoLoading(true)
    setAutoError('')
    setAutoSuggestions([])
    setStatusMessage('')

    try {
      if (autoSource === 'news') {
        await runAutopilotNews()
      } else if (autoSource === 'competitors') {
        await runAutopilotCompetitors()
      } else if (autoSource === 'manual') {
        await runAutopilotManual()
      }
    } catch (err: any) {
      setAutoError(err.message || 'Erro ao executar autopilot')
    } finally {
      setAutoLoading(false)
    }
  }

  // ── Autopilot: Notícias (Tavily) ──
  async function runAutopilotNews() {
    const res = await fetch('/api/autopilot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'news',
        category: autoCategory,
        count: autoCount,
        templateId: autoTemplateId,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `Erro ${res.status}`)
    }

    const data = await res.json()
    const suggestions = (data.suggestions || []).map((s: any, idx: number) => ({
      id: `auto-news-${idx}`,
      headline: s.headline || s.title || s.topic || 'Notícia',
      generatedPrompt: s.prompt || s.generatedPrompt || '',
      source: `📰 ${s.source || 'Tavily'}`,
      category: autoCategory,
      templateName: AUTOPILOT_TEMPLATE_OPTIONS.find(t => t.id === autoTemplateId)?.name || autoTemplateId,
    }))

    setAutoSuggestions(suggestions)
    setStatusMessage(`✅ ${suggestions.length} sugestões de notícias geradas!`)
  }

  // ── Autopilot: Concorrentes (localStorage + API) ──
  async function runAutopilotCompetitors() {
    // Read competitors data from localStorage
    const competitors = storage.getCompetitors?.() || []
    const viralPosts = storage.getViralPosts?.() || []

    if (!competitors.length && !viralPosts.length) {
      setAutoError('Nenhum concorrente cadastrado. Vá em 🔍 Concorrentes e adicione perfis com posts virais.')
      return
    }

    const res = await fetch('/api/competitors/insights', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        competitors,
        viralPosts,
        templateId: autoTemplateId,
        count: autoCount,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `Erro ${res.status}`)
    }

    const data = await res.json()
    const insights = data.insights || {}
    const rawSuggestions = data.suggestions || []

    const suggestions = rawSuggestions.map((s: any, idx: number) => ({
      id: `auto-comp-${idx}`,
      headline: s.topic || s.angle || 'Tendência',
      generatedPrompt: s.prompt || '',
      source: s.source || `🔍 Concorrentes`,
      category: insights.topFormats?.[0] || 'carousel',
      templateName: AUTOPILOT_TEMPLATE_OPTIONS.find(t => t.id === autoTemplateId)?.name || autoTemplateId,
    }))

    setAutoSuggestions(suggestions)

    // Show insights summary as status
    const summary = data.summary || {}
    if (summary.totalViralPosts > 0) {
      setStatusMessage(
        `✅ ${suggestions.length} sugestões baseadas em ${summary.totalViralPosts} posts virais de ${summary.totalCompetitors} concorrentes. ` +
        `Top: @${summary.topHandle} | Formato: ${summary.topFormat} | Ângulos: ${summary.contentAngles?.join(', ')}`
      )
    } else {
      setStatusMessage(`✅ ${suggestions.length} sugestões geradas!`)
    }
  }

  // ── Autopilot: Manual topic ──
  async function runAutopilotManual() {
    if (!autoTopic.trim()) {
      setAutoError('Informe o tema manual para gerar sugestões')
      return
    }

    const tpl = templates.find(t => t.id === autoTemplateId)
    let prompt = autoTopic

    if (tpl?.promptTemplate) {
      prompt = tpl.promptTemplate.replace(/\{\{topic\}\}/gi, autoTopic)
      // Replace other common variables with defaults
      prompt = prompt.replace(/\{\{headline\}\}/gi, autoTopic)
      prompt = prompt.replace(/\{\{color1\}\}/gi, '#FF5404')
      prompt = prompt.replace(/\{\{color2\}\}/gi, '#071925')
    }

    // Generate N variations of the same topic
    const variations = [
      `Edição edução: ${autoTopic}`,
      `Versão dados/estatísticas: ${autoTopic}`,
      `Versão comparação: ${autoTopic}`,
      `Versão passo-a-passo: ${autoTopic}`,
      `Versão storytelling: ${autoTopic}`,
      `Versão questionamento: ${autoTopic}`,
    ]

    const suggestions = variations.slice(0, autoCount).map((v, idx) => ({
      id: `auto-manual-${idx}`,
      headline: v,
      generatedPrompt: prompt,
      source: `✍️ Manual`,
      category: 'manual',
      templateName: tpl?.name || autoTemplateId,
    }))

    setAutoSuggestions(suggestions)
    setStatusMessage(`✅ ${suggestions.length} variações geradas para "${autoTopic}"`)
  }

  // ── Extract DNA from image ──

  async function extractDNAFromImage(file: File) {
    if (!file.type.startsWith('image/')) {
      setStatusMessage('Envie uma imagem PNG, JPG ou WEBP')
      return
    }

    setStatusMessage('🔄 Extraindo DNA visual...')

    // Read image as data URL
    const src = await new Promise<string>(res => {
      const r = new FileReader()
      r.onload = e => res(e.target!.result as string)
      r.readAsDataURL(file)
    })

    // Load to canvas for color analysis
    const img = await new Promise<HTMLImageElement>(res => {
      const i = new Image()
      i.onload = () => res(i)
      i.src = src
    })

    // Extract colors using canvas
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)

    // Sample colors from the image
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const colorBuckets: Record<string, number> = {}
    for (let i = 0; i < imageData.length; i += 8) {
      const [r, g, b] = [imageData[i], imageData[i+1], imageData[i+2]]
      const key = `${Math.round(r/32)*32},${Math.round(g/32)*32},${Math.round(b/32)*32}`
      colorBuckets[key] = (colorBuckets[key] || 0) + 1
    }

    const sortedColors = Object.entries(colorBuckets)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([k]) => {
        const [r, g, b] = k.split(',').map(Number)
        return '#' + [r, g, b].map(v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0')).join('')
      })

    const primaryHex = sortedColors[0] || '#FF5404'
    const secondaryHex = sortedColors[1] || '#071925'
    const accentHex = sortedColors[2] || '#EDDABA'
    const neutralColors = sortedColors.slice(3, 7)

    // Build full DNA object
    const aspectRatio = `${img.naturalWidth}:${img.naturalHeight}`

    const dna: VisualDNA = {
      id: `dna-${Date.now()}`,
      name: file.name.replace(/\.[^.]+$/, ''),
      version: '1.0',
      extractedFrom: file.name,
      artifactType: 'social-post',
      reconstructionTarget: 'chatgpt_image_2',

      canvas: {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio,
        background: { type: 'solid', value: neutralColors[neutralColors.length - 1] || '#FFFFFF' },
        grid: { columns: 12, gutter: 16, margin: 24 },
      },

      colorSystem: {
        primary: { hex: primaryHex, rgb: hexToRgb(primaryHex), hsl: hexToHsl(primaryHex), role: 'primary' },
        secondary: [
          ...neutralColors.slice(0, 2).map((hex, i) => ({
            hex, rgb: hexToRgb(hex), hsl: hexToHsl(hex),
            role: (i === 0 ? 'secondary' : 'accent') as 'secondary' | 'accent'
          }))
        ],
        neutrals: neutralColors.slice(2).map(hex => ({
          hex, rgb: hexToRgb(hex), hsl: hexToHsl(hex), role: 'neutral' as const
        })),
        gradients: [],
      },

      typography: {
        fontStack: [
          { family: 'Inter', weights: [400, 600, 700, 800], role: 'body' },
          { family: 'Fraunces', weights: [400, 600, 700], role: 'display' },
        ],
        textStyles: [
          { id: 'headline', family: 'Fraunces', weight: 700, sizePx: 42, lineHeight: 1.1, letterSpacingEm: -0.02, transform: 'none', color: primaryHex, align: 'start' },
          { id: 'subtitle', family: 'Inter', weight: 400, sizePx: 18, lineHeight: 1.4, letterSpacingEm: 0, transform: 'none', color: neutralColors[3] || '#666666', align: 'start' },
          { id: 'body', family: 'Inter', weight: 400, sizePx: 14, lineHeight: 1.5, letterSpacingEm: 0, transform: 'none', color: '#333333', align: 'start' },
        ],
      },

      layout: {
        structure: 'flex',
        blocks: [
          { id: 'container', type: 'container', position: { x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight }, padding: [24, 24, 24, 24], alignment: 'center', children: ['headline-block', 'body-block'] },
          { id: 'headline-block', type: 'text', position: { x: 24, y: 24, w: img.naturalWidth - 48, h: 100 }, padding: [0, 0, 0, 0], alignment: 'start', children: [] },
          { id: 'body-block', type: 'text', position: { x: 24, y: 140, w: img.naturalWidth - 48, h: 200 }, padding: [0, 0, 0, 0], alignment: 'start', children: [] },
        ],
      },

      elements: [
        { id: 'headline', type: 'text', styleRef: 'headline', content: 'Seu Título Aqui', maxChars: 60, role: 'main headline' },
        { id: 'body-text', type: 'text', styleRef: 'body', content: 'Seu texto complementar aqui. Substitua este texto pelo conteúdo desejado.', maxChars: 200, role: 'body content' },
      ],

      effects: { shadows: [], blurs: [], glows: [] },

      artDirection: {
        styleTags: ['editorial', 'clean', 'modern'],
        mood: 'Professional and trustworthy',
        era: 'modern',
        confidence: 'medium',
      },

      reconstructionRules: {
        fixedElements: ['headline'],
        constraints: ['Keep aspect ratio', 'Maintain color harmony extracted from original'],
      },

      chatgptImagePrompt: `Create a ${aspectRatio} social media image. ` +
        `Use colors: primary ${primaryHex}, secondary ${secondaryHex}, accent ${accentHex}. ` +
        `Typography: Fraunces 700 for headlines, Inter 400 for body. ` +
        `Style: clean editorial. Grid: 12 columns, 16px gutter, 24px margin. ` +
        `Text hierarchy: large headline top, body text below. ` +
        `Mood: Professional and trustworthy.`,

      createdAt: new Date().toISOString(),
    }

    setExtractedDNA(dna)
    storage.addDNA(dna)
    setStatusMessage('✅ DNA extraído com sucesso!')
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) extractDNAFromImage(file)
  }

  // ── Template Generator ──

  function selectTemplate(tpl: PromptTemplate) {
    setSelectedTemplate(tpl)
    setEditingTemplate(null)

    // Initialize variable values with defaults
    const vals: Record<string, string> = {}
    for (const v of tpl.variables) {
      vals[v.id] = v.defaultValue || ''
    }

    // If template has DNA, prefill from DNA colors
    const dna = templatesDna.find(d => d.id === tpl.visualDNAId)
    if (dna) {
      vals['color1'] = dna.colorSystem.primary.hex
      if (dna.colorSystem.secondary[0]) vals['color2'] = dna.colorSystem.secondary[0].hex
    }

    setVariableValues(vals)
    setGeneratedPrompt('')
  }

  function updateVariable(id: string, value: string) {
    setVariableValues(prev => {
      const next = { ...prev, [id]: value }
      generateFinalPrompt(next)
      return next
    })
  }

  function generateFinalPrompt(vals: Record<string, string>) {
    if (!selectedTemplate) return

    let prompt = selectedTemplate.promptTemplate
    for (const v of selectedTemplate.variables) {
      prompt = prompt.replace(new RegExp(`{{${v.name}}}`, 'g'), vals[v.id] || v.defaultValue || '')
    }

    setGeneratedPrompt(prompt)
  }

  function sendToGenerator() {
    if (!generatedPrompt || !selectedTemplate) return

    // Store in session so GeneratorLab can pick it up
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nl_dna_prompt', generatedPrompt)
      sessionStorage.setItem('nl_dna_model', selectedTemplate.defaultModel)
      sessionStorage.setItem('nl_dna_aspect', selectedTemplate.defaultAspectRatio)
    }

    // Increment use count
    const updated = { ...selectedTemplate, useCount: selectedTemplate.useCount + 1, updatedAt: new Date().toISOString() }
    storage.updatePromptTemplate(updated)
    setSelectedTemplate(updated)
    refreshTemplates()

    setStatusMessage('✅ Prompt enviado para o GeneratorLab! Vá na aba Imagem.')
  }

  // ── Edit / Create Template ──

  function startNewTemplate() {
    const empty: PromptTemplate = {
      id: `tpl-${Date.now()}`,
      name: '',
      description: '',
      category: 'generic',
      stylePreset: 'custom',
      promptTemplate: '',
      prompts: [], // array de prompts pré-definidos
      variables: [],
      defaultModel: 'flux-1-dev',
      defaultAspectRatio: '1:1',
      defaultSlideCount: 1,
      tags: [],
      useCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setEditingTemplate(empty)
    setSelectedTemplate(null)
    setIsEditing(true)
  }

  function saveEditedTemplate() {
    if (!editingTemplate) return
    if (!editingTemplate.name.trim()) {
      setStatusMessage('⚠️ Nome do template é obrigatório')
      return
    }
    // Require either promptTemplate or at least one pre-defined prompt
    if (!editingTemplate.promptTemplate?.trim() && (!editingTemplate.prompts || editingTemplate.prompts.length === 0)) {
      setStatusMessage('⚠️ Adicione um template de prompt ou pelo menos um slide pré-definido')
      return
    }

    const existing = storage.getPromptTemplates()
    const idx = existing.findIndex(t => t.id === editingTemplate.id)
    if (idx >= 0) {
      existing[idx] = { ...editingTemplate, updatedAt: new Date().toISOString() }
    } else {
      existing.unshift(editingTemplate)
    }
    storage.setPromptTemplates(existing)
    setEditingTemplate(null)
    setIsEditing(false)
    refreshTemplates()
    setStatusMessage('✅ Template salvo!')
  }

  function deleteTemplate(id: string) {
    if (confirm('Tem certeza que quer excluir este template?')) {
      storage.deletePromptTemplate(id)
      refreshTemplates()
      if (selectedTemplate?.id === id) setSelectedTemplate(null)
      setStatusMessage('🗑️ Template excluído')
    }
  }

  // ── Render ──

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#050505]">
      {/* Tab bar */}
      <div className="flex border-b border-white/[0.08] flex-shrink-0">
        {([
          { id: 'extract', icon: '🧬', label: 'Extrair DNA', desc: 'Extrair DNA visual de referências' },
          { id: 'templates', icon: '📋', label: 'Templates', desc: 'Gerenciar templates de prompt' },
          { id: 'generator', icon: '🔮', label: 'Gerador', desc: 'Preencher variáveis e gerar' },
          { id: 'autopilot', icon: '🤖', label: 'Autopilot', desc: 'Geração autônoma em massa' },
        ] as { id: SubTab; icon: string; label: string; desc: string }[]).map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 text-[11px] font-semibold border-b-2 transition-all
              ${subTab === t.id
                ? 'text-[#FF5404] border-[#FF5404]'
                : 'text-[rgba(237,218,186,0.4)] border-transparent hover:text-[rgba(237,218,186,0.7)]'}`}>
            <span className="text-sm">{t.icon}</span>
            <div className="text-left">
              <div>{t.label}</div>
              <div className="text-[8px] font-normal opacity-60">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">

        {/* ═══════════════════════ TAB: EXTRACT ═══════════════════════ */}
        {subTab === 'extract' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            <div className="border border-dashed border-[rgba(255,84,4,0.3)] bg-[rgba(255,84,4,0.03)] rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">🧬</div>
              <h2 className="font-display text-lg font-bold text-white mb-1">Extrair DNA Visual</h2>
              <p className="text-xs text-[rgba(237,218,186,0.5)] mb-4 max-w-md mx-auto">
                Envie uma imagem de referência (post, carrossel, anúncio) e o sistema vai extrair o DNA visual completo
                — cores, tipografia, layout, mood — e gerar um prompt otimizado para o ChatGPT Image 2.0.
              </p>
              <label className="inline-block px-6 py-2.5 bg-[#FF5404] text-white text-xs font-semibold rounded-lg cursor-pointer hover:bg-[#E04A00] transition-colors">
                📤 Selecionar imagem
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>

            {extractedDNA && (
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧬</span>
                    <span className="text-sm font-bold text-white">{extractedDNA.name}</span>
                    <span className="text-[9px] text-[rgba(237,218,186,0.3)] bg-white/[0.05] px-2 py-0.5 rounded">
                      {extractedDNA.canvas.aspectRatio}
                    </span>
                  </div>
                  <button onClick={() => { setSubTab('templates'); startNewTemplate() }}
                    className="text-[10px] text-[#FF5404] hover:underline">
                    Salvar como template →
                  </button>
                </div>

                {/* Color swatches extracted */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/[0.2]" style={{ backgroundColor: extractedDNA.colorSystem.primary.hex }} />
                  {extractedDNA.colorSystem.secondary.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-white/[0.2]" style={{ backgroundColor: c.hex }} />
                  ))}
                  {extractedDNA.colorSystem.neutrals.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border border-white/[0.2]" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>

                {/* DNA JSON */}
                <details>
                  <summary className="text-[10px] text-[rgba(237,218,186,0.4)] cursor-pointer hover:text-[#EDDABA]">
                    👁️ Ver JSON completo do DNA
                  </summary>
                  <pre className="mt-2 bg-[#111] rounded-lg p-3 text-[9px] text-[rgba(237,218,186,0.6)] font-mono overflow-x-auto max-h-64 overflow-y-auto">
                    {JSON.stringify(extractedDNA, null, 2)}
                  </pre>
                </details>

                {/* ChatGPT Image Prompt */}
                <div className="bg-[#111] border border-[rgba(255,84,4,0.2)] rounded-lg p-4">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#FF5404] mb-2">
                    🎯 Prompt ChatGPT Image 2.0
                  </div>
                  <pre className="text-[11px] text-[#EDDABA] font-sans leading-relaxed whitespace-pre-wrap">
                    {extractedDNA.chatgptImagePrompt}
                  </pre>
                  <button onClick={() => navigator.clipboard.writeText(extractedDNA.chatgptImagePrompt)}
                    className="mt-2 text-[9px] text-[rgba(237,218,186,0.4)] hover:text-[#FF5404]">
                    📋 Copiar prompt
                  </button>
                </div>
              </div>
            )}

            {statusMessage && <div className="text-xs text-[#FF5404]">{statusMessage}</div>}
          </div>
        )}

        {/* ═══════════════════════ TAB: TEMPLATES ═══════════════════════ */}
        {subTab === 'templates' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-white">🧬 Templates de Prompt</h2>
              <button onClick={startNewTemplate}
                className="px-4 py-2 bg-[#FF5404] text-white text-xs font-semibold rounded-lg hover:bg-[#E04A00]">
                + Novo Template
              </button>
            </div>

            {/* Editor Mode */}
            {isEditing && editingTemplate && (
              <div className="bg-[#0a0a0a] border border-[rgba(255,84,4,0.3)] rounded-xl p-5 flex flex-col gap-3">
                <div className="text-xs font-bold text-[#FF5404] mb-1">
                  {editingTemplate.name ? '✏️ Editando' : '➕ Novo Template'}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Nome</label>
                    <input value={editingTemplate.name} onChange={e => setEditingTemplate({...editingTemplate, name: e.target.value})}
                      placeholder="Ex: Twitter Vibe" className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Categoria</label>
                    <select value={editingTemplate.category} onChange={e => setEditingTemplate({...editingTemplate, category: e.target.value as PromptTemplate['category']})}
                      className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                      <option value="carrossel">Carrossel</option>
                      <option value="post">Post único</option>
                      <option value="ads">Ads</option>
                      <option value="tweet">Tweet</option>
                      <option value="story">Story</option>
                      <option value="reel">Reel</option>
                      <option value="thread">Thread</option>
                      <option value="generic">Genérico</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Descrição</label>
                  <input value={editingTemplate.description} onChange={e => setEditingTemplate({...editingTemplate, description: e.target.value})}
                    placeholder="Descreva o estilo visual" className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">
                    Template de Prompt <span className="text-[#FF5404]">(use {'{{variavel}}'} para variáveis)</span>
                  </label>
                  <textarea value={editingTemplate.promptTemplate} onChange={e => setEditingTemplate({...editingTemplate, promptTemplate: e.target.value})}
                    rows={4} placeholder="Ex: Create a {{estilo}} Instagram post about {{tema}}..."
                    className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA] font-mono" />
                </div>

                {/* ── PRE-DEFINED PROMPTS (SLIDES) ── */}
                {editingTemplate.prompts && editingTemplate.prompts.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">
                        📄 Prompts pré-definidos ({editingTemplate.prompts.length} slides)
                      </label>
                      <button type="button" onClick={() => {
                        setEditingTemplate({
                          ...editingTemplate,
                          prompts: [...editingTemplate.prompts!, 'Novo slide...']
                        })
                      }} className="text-[9px] text-[#FF5404] hover:underline">
                        + Adicionar slide
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {editingTemplate.prompts.map((prompt, idx) => (
                        <div key={idx} className="flex gap-2">
                          <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[8px] text-[rgba(237,218,186,0.3)]">Slide {idx + 1}</label>
                            <textarea
                              value={prompt}
                              onChange={e => {
                                const newPrompts = [...editingTemplate.prompts!]
                                newPrompts[idx] = e.target.value
                                setEditingTemplate({ ...editingTemplate, prompts: newPrompts })
                              }}
                              rows={3}
                              className="bg-[#111] border border-white/[0.08] rounded px-2 py-2 text-[10px] text-[#EDDABA] font-mono"
                              placeholder="Prompt completo para este slide..."
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newPrompts = editingTemplate.prompts!.filter((_, i) => i !== idx)
                              setEditingTemplate({ ...editingTemplate, prompts: newPrompts })
                            }}
                            className="px-2 py-1 text-[9px] text-red-400 hover:text-red-300 self-start mt-5"
                            title="Remover slide"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-[rgba(237,218,186,0.3)]">
                      Use [[topic]] para inserir o tópico informado nas variáveis
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Tags <span className="normal-case">(separadas por vírgula)</span></label>
                  <input value={editingTemplate.tags.join(', ')} onChange={e => setEditingTemplate({...editingTemplate, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                    placeholder="saúde, editorial, clean" className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Modelo padrão</label>
                    <select value={editingTemplate.defaultModel} onChange={e => setEditingTemplate({...editingTemplate, defaultModel: e.target.value})}
                      className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                      <option value="flux-1-dev">Flux 1 Dev</option>
                      <option value="flux-1-schnell">Flux 1 Schnell</option>
                      <option value="nano-banana-2">Nano Banana 2</option>
                      <option value="sd-3-medium">Stable Diffusion 3</option>
                      <option value="dalle-3">DALL-E 3</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Aspect ratio</label>
                    <select value={editingTemplate.defaultAspectRatio} onChange={e => setEditingTemplate({...editingTemplate, defaultAspectRatio: e.target.value})}
                      className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                      <option value="1:1">1:1 Quadrado</option>
                      <option value="4:5">4:5 Instagram</option>
                      <option value="9:16">9:16 Vertical</option>
                      <option value="16:9">16:9 Horizontal</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Slides padrão (carrossel)</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={editingTemplate.defaultSlideCount || 1}
                      onChange={e => setEditingTemplate({...editingTemplate, defaultSlideCount: Number(e.target.value)})}
                      className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-2">
                  <button onClick={saveEditedTemplate}
                    className="px-4 py-2 bg-[#FF5404] text-white text-xs font-semibold rounded-lg hover:bg-[#E04A00]">
                    💾 Salvar Template
                  </button>
                  <button onClick={() => { setIsEditing(false); setEditingTemplate(null) }}
                    className="px-4 py-2 text-xs text-[rgba(237,218,186,0.5)] hover:text-[#EDDABA]">
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-3">
              {templates.map(tpl => (
                <div key={tpl.id}
                  className={`bg-[#0a0a0a] border rounded-xl p-4 flex flex-col gap-2 cursor-pointer transition-all
                    ${selectedTemplate?.id === tpl.id ? 'border-[#FF5404]' : 'border-white/[0.08] hover:border-white/[0.2]'}`}
                  onClick={() => { selectTemplate(tpl); setSubTab('generator') }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{tpl.name}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[rgba(237,218,186,0.3)] bg-white/[0.05] px-2 py-0.5 rounded">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-[rgba(237,218,186,0.45)] line-clamp-2">{tpl.description}</p>
                  <div className="flex gap-1 flex-wrap mt-auto">
                    {tpl.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-[7px] uppercase tracking-wider text-[rgba(237,218,186,0.3)] bg-white/[0.04] px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/[0.05]">
                    <span className="text-[9px] text-[rgba(237,218,186,0.3)]">Usado {tpl.useCount}x</span>
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); deleteTemplate(tpl.id) }}
                        className="text-[9px] text-[rgba(239,68,68,0.5)] hover:text-[#ef4444]">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════ TAB: GENERATOR ═══════════════════════ */}
        {subTab === 'generator' && !selectedTemplate && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="text-5xl opacity-15">🧬</div>
            <p className="text-sm text-[rgba(237,218,186,0.4)]">Selecione um template na aba Templates ou crie um novo</p>
          </div>
        )}

        {subTab === 'generator' && selectedTemplate && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-white">{selectedTemplate.name}</h2>
              <span className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.3)] bg-white/[0.05] px-2 py-0.5 rounded">
                {selectedTemplate.category}
              </span>
              {selectedTemplate.prompts && selectedTemplate.prompts.length > 0 && (
                <span className="text-[9px] text-[#FF5404] bg-[rgba(255,84,4,0.1)] px-2 py-0.5 rounded">
                  📄 {selectedTemplate.prompts.length} slides
                </span>
              )}
            </div>
            <p className="text-xs text-[rgba(237,218,186,0.5)]">{selectedTemplate.description}</p>

            {/* ── BATCH MODE (templates with predefined prompts) ── */}
            {selectedTemplate.prompts && selectedTemplate.prompts.length > 0 && (
              <div className="bg-[#0a0a0a] border border-[rgba(255,84,4,0.2)] rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎠</span>
                  <div>
                    <div className="text-xs font-bold text-white">Modo Carrossel — Geração em Lote</div>
                    <div className="text-[10px] text-[rgba(237,218,186,0.4)]">
                      Este template tem {selectedTemplate.prompts.length} prompts pré-definidos.
                      Informe o tópico e gere todos os slides de uma vez.
                    </div>
                  </div>
                </div>

                {/* Topic Input */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">
                    Tópico principal <span className="text-[#FF5404]">*</span>
                    <span className="normal-case font-normal ml-1">(substitui [[topic]] nos prompts)</span>
                  </label>
                  <input value={batchTopic} onChange={e => setBatchTopic(e.target.value)}
                    placeholder="Ex: Automação na triagem de emergência"
                    className="w-full bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                </div>

                {/* Preview of prompts (read-only list) */}
                <div className="flex flex-col gap-2">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[rgba(237,218,186,0.4)]">
                    📋 Slides que serão gerados ({selectedTemplate.prompts.length})
                  </div>
                  <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                    {selectedTemplate.prompts.map((p, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-[9px] text-[#FF5404] font-bold mt-0.5 w-5 flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <p className="text-[10px] text-[rgba(237,218,186,0.4)] leading-relaxed">
                          {p.replace(/\[\[topic\]\]/gi, batchTopic || '[[topic]]')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button onClick={generateBatch} disabled={batchGenerating || !batchTopic.trim()}
                  className="px-5 py-2.5 bg-[#FF5404] text-white text-xs font-semibold rounded-lg hover:bg-[#E04A00] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {batchGenerating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Gerando... {batchProgress}%
                    </>
                  ) : (
                    <>🚀 Gerar Todos os {selectedTemplate.prompts.length} Slides</>
                  )}
                </button>

                {/* Progress Bar */}
                {batchGenerating && (
                  <div className="w-full bg-[#111] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#FF5404] h-full rounded-full transition-all duration-300"
                      style={{ width: `${batchProgress}%` }} />
                  </div>
                )}

                {/* Batch Preview Grid */}
                {batchImages.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-white">
                        ✨ Prévia do Carrossel ({batchImages.filter(r => r.imageUrl).length}/{batchImages.length} gerados)
                      </h3>
                      <div className="flex gap-2">
                        <button onClick={sendBatchToGenerator}
                          className="text-[9px] text-[#FF5404] hover:underline">
                          📦 Salvar todos no banco
                        </button>
                        <button onClick={() => { setBatchImages([]); setBatchTopic(''); setBatchProgress(0) }}
                          className="text-[9px] text-[rgba(237,218,186,0.3)] hover:text-[#EDDABA]">
                          Limpar
                        </button>
                      </div>
                    </div>

                    {/* Horizontal scrollable carousel preview */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {batchImages.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 w-36 flex flex-col gap-1.5">
                          <div className="relative aspect-[4/5] bg-[#111] rounded-lg overflow-hidden border border-white/[0.08]">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={`Slide ${idx + 1}`}
                                className="w-full h-full object-cover" />
                            ) : item.error ? (
                              <div className="flex items-center justify-center h-full text-[9px] text-red-400 p-2 text-center">
                                ✕ {item.error}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <div className="w-5 h-5 border-2 border-[#FF5404] border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                            {/* Slide number badge */}
                            <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                              {idx + 1}
                            </div>
                          </div>
                          <p className="text-[8px] text-[rgba(237,218,186,0.3)] line-clamp-2 leading-tight">
                            {item.prompt.slice(0, 60)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {statusMessage && (
                  <div className="text-xs text-[#FF5404]">{statusMessage}</div>
                )}
              </div>
            )}

            {/* ── SINGLE MODE (templates without predefined prompts) ── */}
            {(!selectedTemplate.prompts || selectedTemplate.prompts.length === 0) && (
              <>
                {/* Variable Inputs */}
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-3">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[rgba(237,218,186,0.4)] mb-1">
                    Variáveis do template
                  </div>
                  {selectedTemplate.variables.map(v => (
                    <div key={v.id} className="flex flex-col gap-1">
                      <label className="text-[10px] text-[rgba(237,218,186,0.6)]">
                        {v.label}
                        {v.required && <span className="text-[#FF5404] ml-1">*</span>}
                      </label>
                      {v.type === 'color' ? (
                        <div className="flex gap-2 items-center">
                          <input type="color" value={variableValues[v.id] || v.defaultValue || '#FF5404'}
                            onChange={e => updateVariable(v.id, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border border-white/[0.1] bg-transparent" />
                          <input value={variableValues[v.id] || v.defaultValue || ''}
                            onChange={e => updateVariable(v.id, e.target.value)}
                            placeholder="#HEX" className="flex-1 bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                        </div>
                      ) : (
                        <input value={variableValues[v.id] || ''}
                          onChange={e => updateVariable(v.id, e.target.value)}
                          placeholder={v.label}
                          className="w-full bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Generated Prompt Preview */}
                {generatedPrompt && (
                  <div className="bg-[#111] border border-[rgba(255,84,4,0.2)] rounded-xl p-5 flex flex-col gap-2">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#FF5404]">🎯 Prompt gerado</div>
                    <pre className="text-[11px] text-[#EDDABA] font-sans leading-relaxed whitespace-pre-wrap">
                      {generatedPrompt}
                    </pre>
                    <div className="flex gap-2 mt-2">
                      <button onClick={sendToGenerator}
                        className="px-4 py-2 bg-[#FF5404] text-white text-xs font-semibold rounded-lg hover:bg-[#E04A00]">
                        🚀 Enviar para GeneratorLab
                      </button>
                      <button onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                        className="px-4 py-2 bg-white/[0.07] text-xs text-[rgba(237,218,186,0.6)] rounded-lg hover:text-[#EDDABA]">
                        📋 Copiar prompt
                      </button>
                    </div>
                  </div>
                )}

                {statusMessage && !batchImages.length && (
                  <div className="text-xs text-[#FF5404]">{statusMessage}</div>
                )}
              </>
            )}
          </div>
        )}

        {/* ═══════════════════════ TAB: AUTOPILOT ═══════════════════════ */}
        {subTab === 'autopilot' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="border border-dashed border-[rgba(255,84,4,0.3)] bg-[rgba(255,84,4,0.03)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🤖</span>
                <div>
                  <h2 className="font-display text-base font-bold text-white">Autopilot — Geração Autônoma</h2>
                  <p className="text-[10px] text-[rgba(237,218,186,0.5)]">
                    Busca tendências de notícias, concorrentes ou tema manual — gera prompts otimizados
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Fonte</label>
                  <select value={autoSource} onChange={e => setAutoSource(e.target.value as any)}
                    className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                    <option value="news">📰 Notícias (Tavily)</option>
                    <option value="competitors">🔍 Concorrentes</option>
                    <option value="manual">✍️ Tema manual</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Template</label>
                  <select value={autoTemplateId} onChange={e => setAutoTemplateId(e.target.value)}
                    className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                    {AUTOPILOT_TEMPLATE_OPTIONS.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Quantidade</label>
                  <input type="number" value={autoCount} onChange={e => setAutoCount(Number(e.target.value))}
                    min={1} max={15} className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Categoria</label>
                  <select value={autoCategory} onChange={e => setAutoCategory(e.target.value as any)}
                    className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]">
                    <option value="todos">📊 Todas</option>
                    <option value="ia">🤖 IA</option>
                    <option value="enfermagem">🏥 Enfermagem</option>
                    <option value="saude_digital">💻 Saúde Digital</option>
                    <option value="negocios">💰 Negócios</option>
                    <option value="ferramentas">🛠️ Ferramentas</option>
                  </select>
                </div>
                {autoSource === 'manual' && (
                  <div className="col-span-2 flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.4)]">Tema manual</label>
                    <input value={autoTopic} onChange={e => setAutoTopic(e.target.value)}
                      placeholder="Ex: Automação de triagem com IA na emergência"
                      className="bg-[#111] border border-white/[0.08] rounded px-2.5 py-2 text-xs text-[#EDDABA]" />
                  </div>
                )}
                {autoSource === 'competitors' && (() => {
                  const comps = (storage as any).getCompetitors?.() || []
                  const posts = (storage as any).getViralPosts?.() || []
                  return (
                    <div className="col-span-2 bg-[#111] border border-white/[0.08] rounded-lg p-3">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[rgba(237,218,186,0.4)] mb-2">🔍 Dados dos concorrentes</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-base font-bold text-[#FF5404]">{comps.length}</div>
                          <div className="text-[8px] text-[rgba(237,218,186,0.3)]">Concorrentes</div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#FF5404]">{posts.length}</div>
                          <div className="text-[8px] text-[rgba(237,218,186,0.3)]">Posts virais</div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#FF5404]">
                            {posts.length > 0 ? [...new Set(posts.map((p: any) => p.competitorHandle))].length : 0}
                          </div>
                          <div className="text-[8px] text-[rgba(237,218,186,0.3)]">Perfis únicos</div>
                        </div>
                      </div>
                      {comps.length === 0 && posts.length === 0 && (
                        <p className="text-[9px] text-red-400 mt-2 text-center">
                          Nenhum dado cadastrado. Vá em 🔍 Concorrentes para adicionar.
                        </p>
                      )}
                    </div>
                  )
                })()}
              </div>

              <button onClick={runAutopilot} disabled={autoLoading}
                className="w-full px-4 py-2.5 bg-[#FF5404] text-white text-xs font-semibold rounded-lg hover:bg-[#E04A00] disabled:opacity-50 disabled:cursor-not-allowed">
                {autoLoading ? '⏳ Buscando notícias e gerando prompts...' : `🚀 Gerar ${autoCount} criativos`}
              </button>

              {autoError && (
                <div className="mt-3 p-3 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg">
                  <p className="text-[11px] text-red-400">{autoError}</p>
                </div>
              )}

              {statusMessage && subTab === 'autopilot' && (
                <div className="mt-2 text-[11px] text-[#FF5404]">{statusMessage}</div>
              )}
            </div>

            {/* Suggestions Grid */}
            {autoSuggestions.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    ✨ {autoSuggestions.length} sugestões geradas
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => setAutoSuggestions([])}
                      className="text-[10px] text-[rgba(237,218,186,0.4)] hover:text-[#EDDABA]">
                      Limpar
                    </button>
                    <button onClick={() => {
                      const prompts = autoSuggestions.map(s => s.generatedPrompt).join('\n\n---\n\n')
                      navigator.clipboard.writeText(prompts)
                      setStatusMessage('📋 Todos os prompts copiados!')
                    }}
                      className="text-[10px] text-[#FF5404] hover:underline">
                      Copiar todos
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {autoSuggestions.map((sug, idx) => (
                    <div key={sug.id} className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-4 flex flex-col gap-3 hover:border-[rgba(255,84,4,0.3)] transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] uppercase tracking-wider text-[rgba(237,218,186,0.3)] bg-white/[0.05] px-2 py-0.5 rounded">
                              {sug.category}
                            </span>
                            <span className="text-[9px] text-[rgba(237,218,186,0.3)]">{sug.source}</span>
                            <span className="text-[9px] text-[#FF5404] bg-[rgba(255,84,4,0.1)] px-2 py-0.5 rounded">
                              {sug.templateName}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white leading-tight">{sug.headline}</h4>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => {
                            navigator.clipboard.writeText(sug.generatedPrompt)
                            setStatusMessage('📋 Prompt copiado!')
                          }}
                            className="px-2 py-1 text-[9px] bg-white/[0.06] text-[rgba(237,218,186,0.5)] rounded hover:text-[#EDDABA]">
                            📋
                          </button>
                          <button onClick={() => {
                            if (typeof window !== 'undefined') {
                              sessionStorage.setItem('nl_dna_prompt', sug.generatedPrompt)
                              sessionStorage.setItem('nl_dna_model', selectedTemplate?.defaultModel || 'flux-1-dev')
                              sessionStorage.setItem('nl_dna_aspect', sug.aspectRatio || '1:1')
                              setStatusMessage('⚡ Prompt enviado para o gerador!')
                            }
                          }}
                            className="px-2 py-1 text-[9px] bg-[#FF5404] text-white rounded hover:bg-[#E04A00]">
                            ⚡
                          </button>
                        </div>
                      </div>

                      {/* Prompt preview */}
                      <div className="bg-[#111] rounded-lg p-3 max-h-32 overflow-hidden relative">
                        <pre className="text-[10px] text-[rgba(237,218,186,0.5)] font-sans leading-relaxed whitespace-pre-wrap">
                          {sug.generatedPrompt.slice(0, 280)}{sug.generatedPrompt.length > 280 ? '...' : ''}
                        </pre>
                        {sug.generatedPrompt.length > 280 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#111] to-transparent" />
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-[rgba(237,218,186,0.3)]">
                        <span>{sug.slideCount} slide{sug.slideCount > 1 ? 's' : ''} • {sug.aspectRatio}</span>
                        {sug.url !== '#' && (
                          <a href={sug.url} target="_blank" rel="noopener noreferrer"
                            className="text-[#FF5404] hover:underline">
                            Ver fonte →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {autoSuggestions.length === 0 && !autoLoading && !autoError && (
              <div className="text-center py-12 text-[rgba(237,218,186,0.3)]">
                <div className="text-4xl mb-2 opacity-30">📰</div>
                <p className="text-xs">Clique "Gerar" para buscar notícias e criar sugestões</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}