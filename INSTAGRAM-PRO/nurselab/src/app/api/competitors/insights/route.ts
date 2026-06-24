import { NextRequest, NextResponse } from 'next/server'

// ─── Types ───────────────────────────────────────────────────────────────
interface Competitor {
  id: string
  handle: string
  nicho: string
  cor: string
  seg?: string
  eng?: string
  freq?: number
  trend?: string
}

interface ViralPost {
  id: string
  competitorId: string
  competitorHandle: string
  title: string
  format: 'carousel' | 'reel' | 'post' | 'story' | string
  likes: number
  comments: number
  saves: number
  date?: string
  notes: string
  url?: string
}

interface PostWithEngagement extends ViralPost {
  engagement: number
  dayOfWeek?: number
  isRecent?: boolean
}

// ─── Format mappings ─────────────────────────────────────────────────────
const FORMAT_LABELS: Record<string, { icon: string; desc: string }> = {
  carousel:  { icon: '🎠', desc: 'Carrossel — melhor para storytelling e tutorial' },
  reel:      { icon: '🎬', desc: 'Reel — melhor para alcance e demonstração' },
  post:      { icon: '📷', desc: 'Post único — rápido e direto' },
  story:     { icon: '📱', desc: 'Story — enquetes e bastidores' },
  thread:    { icon: '🧵', desc: 'Thread — profundidade e autoridade' },
}

const FORMAT_PROMPTS: Record<string, (topic: string, h: string) => string> = {
  carousel: (t, h) =>
    `Instagram carousel about: "${t}". ` +
    `Cover slide: bold headline, gradient #FF5404→#071925. ` +
    `Content: practical tips, statistics, steps (3-5 slides). ` +
    `CTA: "Salva pra não esquecer" + follow @${h}.`,
  reel: (t, h) =>
    `Instagram Reel about: "${t}". ` +
    `Start with hook in first 3 seconds. ` +
    `Show process/step-by-step. End with CTA to follow @${h}. ` +
    `Style: dynamic, fast cuts, text overlay, trending audio suggestion.`,
  post: (t, h) =>
    `Instagram post about: "${t}". ` +
    `Bold single headline, clean layout, lifestyle or flat-lay photo. ` +
    `Orange accent (#FF5404), dark background. ` +
    `Hashtags: #enfermagem #saude #enfermagemcomIA`,
  story: (t, h) =>
    `Instagram Story about: "${t}". ` +
    `Series of 3-5 story cards. ` +
    `Use polls/stickers for engagement. ` +
    `End with link to post. Follow @${h}.`,
  thread: (t, h) =>
    `Twitter/X thread about: "${t}". ` +
    `Start with bold claim. 5-8 numbered tweets. ` +
    `End with CTA: "Siga @${h} para mais".`,
}

const FORMAT_TO_TEMPLATE: Record<string, string> = {
  carousel:  'viral-carousel-01',
  reel:      'bold-medical-01',
  post:      'bold-medical-01',
  story:     'minimal-health-01',
  thread:    'thread-style-01',
}

// ─── Topic expansion engine ───────────────────────────────────────────────
const TOPIC_TEMPLATES: Array<{ keywords: string[]; expansions: string[] }> = [
  {
    keywords: ['erro', 'medicação', 'medicamento', 'administração'],
    expansions: [
      '5 erros mais comuns na administração de medicamentos na emergência',
      'Como evitar erros de medicação na UTI',
      'Checklist de verificação de medicamentos para enfermeiros',
    ],
  },
  {
    keywords: ['automação', 'automatizar', 'automat'],
    expansions: [
      'Automação vs trabalho manual na enfermagem: vale a pena?',
      'Como automatizar a triagem de emergência com IA',
      'Ferramentas que todo enfermeiro deveria conhecer em 2026',
    ],
  },
  {
    keywords: ['triagem', 'emergência', 'urgência'],
    expansions: [
      'IA na triagem do SUS: o que está mudando',
      'Protocolo de classificação de risco: como funciona na prática',
      'Como reduzir filas na emergência com automação',
    ],
  },
  {
    keywords: ['protocolo', 'sepse', 'mortalidade'],
    expansions: [
      'Protocolo de sepse: passo a passo que salva vidas',
      'Como reduzir mortalidade com protocolo de sepse na emergência',
      'Checklist de sepse: o que o enfermeiro precisa avaliar',
    ],
  },
  {
    keywords: ['chatbot', 'whatsapp', 'mensagem'],
    expansions: [
      'Chatbot para enfermeiros: como funciona na prática',
      'Automação de respostas no WhatsApp para consultórios',
      'Como usar IA para triagem via WhatsApp',
    ],
  },
  {
    keywords: ['currículo', 'emprego', 'contratação'],
    expansions: [
      'Currículo de enfermeiro que ninguém abre — e o que fazer',
      'Como se destacar no mercado de enfermagem em 2026',
      '5 dicas para primeira entrevista de emprego na área hospitalar',
    ],
  },
  {
    keywords: ['prescrição', 'prescrever'],
    expansions: [
      'O que a enfermagem pode prescrever hoje no Brasil',
      'Automação de prescrição de enfermagem: o futuro',
      'Prescrição de medicamentos pelo enfermeiro: protocolo completo',
    ],
  },
  {
    keywords: ['plantão', 'horário', 'escala'],
    expansions: [
      'Como sobreviver ao plantão de 12h sem perder a sanidade',
      'Escala de plantão: o que o enfermeiro precisa saber',
      'Rotina do enfermeiro plantonista: o que fazer na chegada',
    ],
  },
]

function expandTopics(title: string): string[] {
  const topics: string[] = []
  const lower = title.toLowerCase()
  if (title.trim().length > 8) topics.push(title.trim())
  for (const group of TOPIC_TEMPLATES) {
    const matches = group.keywords.filter(kw => lower.includes(kw))
    if (matches.length > 0) topics.push(...group.expansions.slice(0, 2))
  }
  return [...new Set(topics)].slice(0, 4)
}

// ─── Core insight extractor ───────────────────────────────────────────────
function extractInsights(comps: Competitor[], posts: ViralPost[]) {
  if (!comps.length && !posts.length) return null

  // Add engagement scores and temporal features
  const withEng: PostWithEngagement[] = posts.map(p => {
    const likes    = Number(p.likes) || 0
    const comments = Number(p.comments) || 0
    const saves    = Number(p.saves) || 0
    const engagement = likes + comments * 3 + saves * 5
    let dayOfWeek: number | undefined
    let isRecent: boolean | undefined
    if (p.date) {
      const d = new Date(p.date)
      if (!isNaN(d.getTime())) {
        dayOfWeek = d.getDay()
      }
      // Posts from last 180 days = "recent"
      const sixMonthsAgo = Date.now() - 180 * 24 * 60 * 60 * 1000
      isRecent = d.getTime() > sixMonthsAgo
    }
    return { ...p, engagement, dayOfWeek, isRecent }
  })

  const sorted = withEng.sort((a, b) => b.engagement - a.engagement)
  const topPosts = sorted.slice(0, 8)

  // ── Top handles ──
  const handleScores: Record<string, number> = {}
  withEng.forEach(p => {
    if (!handleScores[p.competitorHandle]) handleScores[p.competitorHandle] = 0
    handleScores[p.competitorHandle] += p.engagement
  })
  const topHandles = Object.entries(handleScores)
    .sort((a, b) => b[1] - a[1]).slice(0, 3).map(([h]) => h)

  // ── Format analysis (per-format engagement breakdown) ──
  const formatBreakdown: Record<string, { count: number; totalEng: number; avgEng: number; topPost: string }> = {}
  withEng.forEach(p => {
    const fmt = p.format || 'post'
    if (!formatBreakdown[fmt]) formatBreakdown[fmt] = { count: 0, totalEng: 0, avgEng: 0, topPost: '' }
    formatBreakdown[fmt].count++
    formatBreakdown[fmt].totalEng += p.engagement
    if (!formatBreakdown[fmt].topPost || p.engagement > (withEng.find(w => w.title === formatBreakdown[fmt].topPost)?.engagement || 0)) {
      formatBreakdown[fmt].topPost = p.title
    }
  })
  for (const fmt in formatBreakdown) {
    const b = formatBreakdown[fmt]
    b.avgEng = Math.round(b.totalEng / b.count)
  }

  // Top formats ranked by avg engagement
  const topFormats = Object.entries(formatBreakdown)
    .sort((a, b) => b[1].avgEng - a[1].avgEng)
    .map(([f]) => f)

  // Best format (most used + good engagement)
  const bestFormat = topFormats[0] || 'carousel'

  // ── Trending topics (keywords from viral titles) ──
  const topicKeywords = [
    'IA', 'automação', 'triagem', 'emergência', 'enfermagem', 'digital',
    'chatbot', 'whatsapp', 'prontuário', 'hospital', 'plantão', 'enfermeiro',
    'técnico', 'mortalidade', 'SUS', 'UTI', 'CME', 'protocolo', 'medicação',
    'prescrição', 'punção', 'curativo', 'sepse', 'vacina', 'currículo',
    'contratação', 'salário', 'remoto', 'ferramentas', 'aplicativo',
    'triage', 'enfermaria', 'SAMU', 'UPH',
  ]
  const trendingTopicsSet = new Set<string>()
  withEng.forEach(p => {
    topicKeywords.forEach(kw => {
      if (p.title.toLowerCase().includes(kw.toLowerCase())) trendingTopicsSet.add(kw)
    })
  })
  const trendingTopics = Array.from(trendingTopicsSet).slice(0, 8)

  // ── Content angles ──
  const contentAngles = new Set<string>()
  withEng.forEach(p => {
    if (p.notes) {
      const n = p.notes.toLowerCase()
      if (n.includes('educativo') || n.includes('educação')) contentAngles.add('educativo')
      if (n.includes('dados') || n.includes('estat') || n.includes('número')) contentAngles.add('dados/estatísticas')
      if (n.includes('passo') || n.includes('how to') || n.includes('como fazer')) contentAngles.add('passo-a-passo')
      if (n.includes('antes') || n.includes('depois') || n.includes('comparação')) contentAngles.add('antes e depois')
      if (n.includes('storytelling') || n.includes('história')) contentAngles.add('storytelling')
      if (n.includes('viral') || n.includes('engajamento')) contentAngles.add('viral')
      if (n.includes('lista') || n.includes('dicas')) contentAngles.add('lista/dicas')
      if (n.includes('mistérios') || n.includes('surpresa')) contentAngles.add('curiosidade')
    }
    const t = p.title.toLowerCase()
    if (t.includes('?')) contentAngles.add('pergunta-engajamento')
    if (t.includes('%') || /\d+/.test(p.title)) contentAngles.add('dados/estatísticas')
    if (t.includes('como') || t.includes('como fazer')) contentAngles.add('passo a passo')
    if (t.includes('lista') || t.includes('dicas') || t.includes('5 ') || t.includes('10 ')) contentAngles.add('lista/dicas')
  })

  // ── Temporal insights ──
  const postsWithDay = withEng.filter(p => p.dayOfWeek !== undefined)
  const dayScores: Record<number, number> = {}
  postsWithDay.forEach(p => {
    dayScores[p.dayOfWeek!] = (dayScores[p.dayOfWeek!] || 0) + p.engagement
  })
  const bestDaysNums = Object.entries(dayScores)
    .sort((a, b) => b[1] - a[1]).slice(0, 2).map(([d]) => parseInt(d))
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const bestDays = bestDaysNums.map(d => dayNames[d] || `Dia ${d}`)

  const recentPosts = withEng.filter(p => p.isRecent)
  const oldPosts = withEng.filter(p => !p.isRecent)
  const recentAvg = recentPosts.length ? recentPosts.reduce((s, p) => s + p.engagement, 0) / recentPosts.length : 0
  const oldAvg = oldPosts.length ? oldPosts.reduce((s, p) => s + p.engagement, 0) / oldPosts.length : 0
  let temporalInsight: { label: string; icon: string; note: string }
  if (oldPosts.length > 0 && recentPosts.length > 0) {
    if (oldAvg > recentAvg * 1.2) {
      temporalInsight = { label: 'evergreen', icon: '♻️', note: `Posts antigos (${oldPosts.length}) engajam ${Math.round(oldAvg / recentAvg)}x mais que recentes — conteúdo atemporal funciona` }
    } else {
      temporalInsight = { label: 'hot', icon: '🔥', note: `Posts recentes (${recentPosts.length}) estão engajando mais — publique agora` }
    }
  } else if (recentPosts.length > 0) {
    temporalInsight = { label: 'hot', icon: '🔥', note: `Concorrentes publicando conteúdo novo que engaja bem` }
  } else {
    temporalInsight = { label: 'evergreen', icon: '♻️', note: `Conteúdo antigo performando — invista em posts duradouros` }
  }

  // ── Evergreen topics (ANTIGOS com alto engajamento — conteúdo atemporal) ──
  const evergreenThreshold = withEng.length >= 3
    ? withEng[Math.floor(withEng.length * 0.3)].engagement : 0
  // EVERGREEN = posts antigos (não recentes) com bom engajamento
  const evergreenPosts = sorted.filter(p => {
    const isOld = !p.isRecent  // > 180 days
    return isOld && p.engagement >= evergreenThreshold * 0.8
  })
  const evergreenTopicsClean = [...new Set(evergreenPosts.map(p => {
    let t = p.title.trim()
    t = t.replace(/^(?:\d+\s*(?:erros?|dicas?|passos?|coisas?|motivos?|sinais?|tips?|things?|reasons?)\s*(?:de|na|em|para|que|to)?\s*)/i, '')
    t = t.replace(/\s*(?:completo|definitivo|guia|explicado|detalhado)?\s*$/i, '')
    return t.length > 6 ? t : p.title.trim()
  }))].slice(0, 5)

  // Fallback: if not enough "old" posts, use lowest-engagement + oldest posts
  let finalEvergreen = evergreenTopicsClean
  if (finalEvergreen.length < 2) {
    const fallback = sorted.filter(p => !p.isRecent).slice(0, 3).map(p => {
      let t = p.title.trim().slice(0, 60)
      t = t.replace(/^(?:\d+\s*(?:erros?|dicas?|passos?)\s*(?:de|na)?\s*)/i, '')
      return t
    })
    finalEvergreen = [...new Set([...finalEvergreen, ...fallback])].slice(0, 4)
  }

  // ── Format insight text ──
  const formatInsight = topFormats.length > 1
    ? `${FORMAT_LABELS[bestFormat]?.icon || '📊'} ${FORMAT_LABELS[bestFormat]?.desc || bestFormat} é o formato que mais engaja (média ${formatBreakdown[bestFormat]?.avgEng || 0} pts). ` +
        topFormats.slice(1, 3).map(f =>
          `${FORMAT_LABELS[f]?.icon || ''} ${f} (${formatBreakdown[f]?.count || 0} posts, média ${formatBreakdown[f]?.avgEng || 0} pts)`
        ).join(' | ')
    : `${FORMAT_LABELS[bestFormat]?.icon || '📊'} ${FORMAT_LABELS[bestFormat]?.desc || bestFormat} é dominante no nicho (${formatBreakdown[bestFormat]?.count || 0} posts)`

  return {
    topPosts: sorted.slice(0, 8),
    topHandles,
    bestFormat,
    formatBreakdown,
    topFormats,
    trendingTopics,
    contentAngles: Array.from(contentAngles).slice(0, 6),
    totalPosts: withEng.length,
    temporalInsight,
    bestDays,
    evergreenTopics: finalEvergreen,
    formatInsight,
  }
}

// ─── Generate suggestions ───────────────────────────────────────────────────
function generateSuggestions(
  insights: NonNullable<ReturnType<typeof extractInsights>>,
  topHandle: string,
  count: number
) {
  const suggestions: Array<{
    id: string
    topic: string
    angle: string
    format: string
    suggestedTemplateId: string
    source: string
    engagement: number
    type: 'trend' | 'evergreen' | 'explore'
    prompt: string
    insight?: string
  }> = []

  const { topPosts, topFormats, bestFormat, formatBreakdown, evergreenTopics, trendingTopics, contentAngles, formatInsight, temporalInsight } = insights

  // Distribute count: 50% trends, 25% evergreen, 25% explore (min 1 each if data allows)
  const trendCount     = Math.max(1, Math.floor(count * 0.5))
  const evergreenCount = Math.max(1, Math.floor(count * 0.25))
  const exploreCount   = Math.max(1, count - trendCount - evergreenCount)

  // ── TYPE 1: Trend suggestions (from recent viral posts) ──
  const recentViral = topPosts.filter(p => p.isRecent !== false).slice(0, trendCount + 2)
  recentViral.forEach(post => {
    if (suggestions.filter(s => s.type === 'trend').length >= trendCount) return
    const expanded = expandTopics(post.title)
    expanded.forEach(topic => {
      const trends = suggestions.filter(s => s.type === 'trend')
      if (trends.length >= trendCount) return
      const fmt = post.format || bestFormat
      suggestions.push({
        id: `trend-${suggestions.length}`,
        topic,
        angle: contentAngles[0] || 'educativo',
        format: fmt,
        suggestedTemplateId: FORMAT_TO_TEMPLATE[fmt] || 'bold-medical-01',
        source: `🔥 @${post.competitorHandle} — ${post.engagement.toLocaleString()} eng.`,
        engagement: post.engagement,
        type: 'trend',
        prompt: (FORMAT_PROMPTS[fmt] || FORMAT_PROMPTS['post'])(topic, topHandle),
        insight: `Copy this format because ${post.competitorHandle} uses ${fmt} and got ${post.engagement.toLocaleString()} engagement`,
      })
    })
  })

  // ── TYPE 2: Evergreen suggestions (old high-engagement posts — timeless content) ──
  if (evergreenTopics.length > 0) {
    evergreenTopics.slice(0, evergreenCount + 1).forEach(topic => {
      const ev = suggestions.filter(s => s.type === 'evergreen')
      if (ev.length >= evergreenCount) return
      suggestions.push({
        id: `evergreen-${suggestions.length}`,
        topic,
        angle: 'educativo',
        format: bestFormat,
        suggestedTemplateId: FORMAT_TO_TEMPLATE[bestFormat] || 'bold-medical-01',
        source: `♻️ Conteúdo atemporal — funciona o ano inteiro`,
        engagement: 0,
        type: 'evergreen',
        prompt: FORMAT_PROMPTS[bestFormat]?.(topic, topHandle) ||
                `Instagram post about: "${topic}". Bold headline, orange accent. Follow @${topHandle}.`,
        insight: `Evergreen content — keep working long-term despite algorithm changes`,
      })
    })
  }

  // ── TYPE 3: Explore suggestions (test other formats concorrentes use) ──
  const otherFormats = topFormats.filter(f => f !== bestFormat).slice(0, 2)
  otherFormats.forEach(fmt => {
    if (suggestions.filter(s => s.type === 'explore').length >= exploreCount) return
    // Use a top viral post's title to get meaningful expansions
    const topicFromFmt = topPosts[0]?.title || trendingTopics[0] || 'Automação na enfermagem'
    const expanded = expandTopics(topicFromFmt)
    expanded.slice(0, 2).forEach(topic => {
      if (suggestions.filter(s => s.type === 'explore').length >= exploreCount) return
      suggestions.push({
        id: `explore-${suggestions.length}`,
        topic,
        angle: 'dados/estatísticas',
        format: fmt,
        suggestedTemplateId: FORMAT_TO_TEMPLATE[fmt] || 'bold-medical-01',
        source: `🧪 Testar ${FORMAT_LABELS[fmt]?.icon || '📊'} ${fmt} — ${formatBreakdown[fmt]?.count || 0} posts concorrentes. ${formatInsight}`,
        engagement: 0,
        type: 'explore',
        prompt: FORMAT_PROMPTS[fmt]?.(topic, topHandle) ||
                `Instagram ${fmt} about: "${topic}". Bold headline. Follow @${topHandle}.`,
        insight: `${FORMAT_LABELS[fmt]?.icon || ''} ${FORMAT_LABELS[fmt]?.desc || fmt}. ${temporalInsight.note}`,
      })
    })
  })

  // Fill remaining slots with trend topics if we still have room
  if (suggestions.length < count) {
    trendingTopics.forEach(topic => {
      if (suggestions.length >= count) return
      if (suggestions.some(s => s.topic === topic)) return
      suggestions.push({
        id: `trend-fill-${suggestions.length}`,
        topic,
        angle: contentAngles[0] || 'educativo',
        format: bestFormat,
        suggestedTemplateId: FORMAT_TO_TEMPLATE[bestFormat] || 'bold-medical-01',
        source: `📈 Tendência: ${topic}`,
        engagement: 0,
        type: 'trend',
        prompt: FORMAT_PROMPTS[bestFormat]?.(topic, topHandle) ||
                `Instagram post about: "${topic}". Bold headline. Follow @${topHandle}.`,
        insight: `Trending topic from competitor analysis`,
      })
    })
  }

  return suggestions.slice(0, count)
}

// ─── Handlers ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { templateId } = await req.json().catch(() => ({}))
    return NextResponse.json({
      message: 'Use PUT com competitors[] e viralPosts[] no body',
      format: {
        competitors: 'Array<{ id, handle, nicho, cor }>',
        viralPosts:  'Array<{ id, competitorId, competitorHandle, title, format, likes, comments, saves, date?, notes?, url? }>',
        count:       'number (default 8)',
      },
      formats: FORMAT_LABELS,
      suggestionTypes: {
        trend:     'Baseado em posts virais recentes — copie o que está funcionando',
        evergreen: 'Tópicos que engajam consistentemente — conteúdo atemporal',
        explore:   'Teste novos formatos que concorrentes usam pouco',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { competitors, viralPosts, count = 8 } = await req.json()

    const comps: Competitor[] = competitors || []
    const posts: ViralPost[]   = viralPosts   || []

    if (!comps.length && !posts.length) {
      return NextResponse.json({ error: 'Nenhum dado de concorrentes fornecido' }, { status: 400 })
    }

    const insights = extractInsights(comps, posts)

    if (!insights) {
      return NextResponse.json({
        error: 'Dados insuficientes para análise',
        hint: 'Cadastre pelo menos 1 concorrente com posts virais em 🔍 Concorrentes',
      }, { status: 422 })
    }

    const topHandle = insights.topHandles[0] || 'enfermagemcom.ia'
    const suggestions = generateSuggestions(insights, topHandle, count)

    const byType = {
      trend: suggestions.filter(s => s.type === 'trend'),
      evergreen: suggestions.filter(s => s.type === 'evergreen'),
      explore: suggestions.filter(s => s.type === 'explore'),
    }

    return NextResponse.json({
      insights,
      formatInsight: insights.formatInsight,
      summary: {
        totalCompetitors: comps.length,
        totalViralPosts:  posts.length,
        topHandle,
        bestFormat:       insights.bestFormat,
        topTopics:        insights.trendingTopics.slice(0, 3),
        contentAngles:    insights.contentAngles,
        bestDays:         insights.bestDays,
        temporalLabel:    insights.temporalInsight.label,
        suggestionTypes: {
          trend:     byType.trend.length,
          evergreen: byType.evergreen.length,
          explore:   byType.explore.length,
        },
      },
      byType,
      suggestions,
    })
  } catch (err) {
    console.error('Competitors insight error:', err)
    return NextResponse.json({ error: 'Erro ao processar concorrentes' }, { status: 500 })
  }
}