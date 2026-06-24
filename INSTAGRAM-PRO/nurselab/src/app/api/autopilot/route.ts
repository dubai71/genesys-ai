import { NextRequest, NextResponse } from 'next/server'
import type { PromptTemplate } from '@/types'

// Tavily news fetching (reused from news route)
const QUERIES: Record<string, string> = {
  ia: 'inteligencia artificial machine learning automacao IA aplicada saude 2026 Brasil',
  enfermagem: 'enfermagem Brasil COFEN regulamentacao noticias recentes plantao',
  saude_digital: 'saude digital telemedicina prontuario eletronico inovacao hospital 2026 Brasil',
  negocios: 'empreendedorismo saude infoproduto monetizacao enfermeiro rendaextra',
  ferramentas: 'ferramentas IA saude software enfermagem app prontuario eletronico triagem automacao',
  todos: 'enfermagem saude IA inteligencia artificial tecnologia saude digital Brasil 2026 noticias',
}

const VALID_CATS = ['ia', 'enfermagem', 'saude_digital', 'negocios', 'ferramentas']

// Default templates for autopilot (inline, no storage dependency)
const AUTOPILOT_TEMPLATES: Record<string, { promptTemplate: string; variables: string[]; systemPrompt: string }> = {
  'twitter-vibe-01': {
    promptTemplate: 'Create a social media image in Twitter/X style. Topic: {{topic}}. Style: clean editorial layout with bold typography. Use colors {{color1}} and {{color2}}. Text: "{{headline}}". Subtitle: "{{subtitle}}".',
    variables: ['topic', 'headline', 'subtitle', 'color1', 'color2'],
    systemPrompt: 'You are a social media creative director specializing in Twitter/X style content for healthcare professionals.',
  },
  'windows-editorial-01': {
    promptTemplate: 'Create a Windows 11 editorial style card. Topic: {{topic}}. Use glassmorphism with backdrop blur, rounded corners 8px. Colors: {{color1}} (accent), {{color2}} (background). Typography: Segoe UI variable, weight 600 for headline. Text: "{{headline}}". Body: "{{body}}".',
    variables: ['topic', 'headline', 'body', 'color1', 'color2'],
    systemPrompt: 'You are a creative director for Windows-style editorial content about healthcare.',
  },
  'minimal-health-01': {
    promptTemplate: 'Professional healthcare social media post. Topic: {{topic}}. Clinical setting, soft white lighting. Serif font for title, clean sans-serif for body. Colors: {{color1}}, {{color2}}, {{color3}}. Layout: centered headline above waist-up medical professional photo. Text: "{{headline}}". Include subtle medical iconography.',
    variables: ['topic', 'headline', 'color1', 'color2', 'color3'],
    systemPrompt: 'You are a healthcare content creator focused on professional, clean medical education posts.',
  },
  'viral-carousel-01': {
    promptTemplate: 'Instagram carousel design. Topic: {{topic}}. Slide {{currentSlide}} of {{totalSlides}}. Bold gradient background ({{color1}} to {{color2}}). High-contrast typography in white. Number indicator top-right. Main text: "{{text}}" centered. Include downward arrow hint. For each slide, change the composition while keeping visual consistency.',
    variables: ['topic', 'text', 'currentSlide', 'totalSlides', 'color1', 'color2'],
    systemPrompt: 'You create viral Instagram carousel content for healthcare professionals. Each slide must be engaging and build on the previous one.',
  },
  'bold-medical-01': {
    promptTemplate: 'Bold medical Instagram post. Topic: {{topic}}. Dramatic lighting, high contrast. Orange (#FF5404) as accent on dark (#071925) background. Sans-serif bold condensed for main text. Image: medical professional in action, shallow depth of field. Text overlay: "{{headline}}". Subtitle: "{{subtitle}}". Style: editorial fashion meets healthcare.',
    variables: ['topic', 'headline', 'subtitle'],
    systemPrompt: 'You create bold, high-impact medical content that commands attention. Think editorial fashion meets healthcare.',
  },
  'thread-style-01': {
    promptTemplate: 'X/Twitter thread card. Tweet {{tweetNumber}} of {{totalTweets}}. Clean light background with subtle border-radius 12px. Topic: {{topic}}. Left-aligned text, sans-serif. Show thread number as subtle badge top-left. Content: "{{content}}" No heavy graphics — keep focus on text. Minimal design with brand accent line on left edge in {{color}}.',
    variables: ['topic', 'content', 'tweetNumber', 'totalTweets', 'color'],
    systemPrompt: 'You write viral Twitter/X threads about healthcare and nursing that educate and engage.',
  },
  'ad-creative-01': {
    promptTemplate: 'Meta ad creative. Product/service: {{topic}}. Headline: "{{headline}}" in bold white text. CTA: "{{cta}}" in accent button bottom-right. Image: product or service in use, warm lighting, lifestyle context. Colors: {{color1}} (accent) on {{color2}} (bg). Include subtle price mention "{{price}}" if applicable. High conversion layout with clear value proposition.',
    variables: ['topic', 'headline', 'cta', 'price', 'color1', 'color2'],
    systemPrompt: 'You create high-converting Meta ad creative for healthcare products and services.',
  },
}

function inferCategory(text: string): string {
  const value = text.toLowerCase()
  if (/empreendedor|negocio|monetiza|renda|infoproduto|marketing|venda/.test(value)) return 'negocios'
  if (/ferramenta|software|app|saas|plataforma|modelo|flux|claude|chatgpt|api/.test(value)) return 'ferramentas'
  if (/enferm|cofen|coren|hospital|clinic|paciente|saude/.test(value)) return 'enfermagem'
  return 'ia'
}

async function fetchTavilyNews(category: string, key: string, maxResults = 15) {
  const query = QUERIES[category] || QUERIES.ia
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: key,
      query: `${query} - Brasil - enfermagem - IA - saúde digital`,
      search_depth: 'basic',
      max_results: maxResults,
      include_answer: false,
      include_raw_content: false,
    }),
  })

  if (!res.ok) throw new Error(`Tavily erro ${res.status}: ${await res.text()}`)

  const data = await res.json()
  const results = data.results || []

  return results.map((r: any, i: number) => ({
    id: `tvly-${Date.now()}-${i}`,
    title: r.title || '',
    summary: (r.content || '').slice(0, 200),
    source: r.source || 'Tavily',
    url: r.url || '#',
    date: r.published_date || 'Recente',
    category: inferCategory(`${r.title || ''} ${r.content || ''}`),
  }))
}

// Fetch from all categories
async function fetchAllTavilyCategories(tavilyKey: string): Promise<any[]> {
  const results: any[] = []
  const seen = new Set<string>()

  for (const cat of VALID_CATS) {
    try {
      const news = await fetchTavilyNews(cat, tavilyKey, 15)
      for (const item of news) {
        if (!seen.has(item.url) && item.url !== '#') {
          seen.add(item.url)
          results.push(item)
        }
      }
      await new Promise(r => setTimeout(r, 500 + Math.floor(Math.random() * 300)))
    } catch (err: any) {
      console.warn(`Tavily ${cat} error:`, err.message)
    }
  }

  return results
}

// Build prompt from template + news item
function buildPromptFromTemplate(templateId: string, newsItem: any, slideNumber = 1, totalSlides = 7): string {
  const tmpl = AUTOPILOT_TEMPLATES[templateId] || AUTOPILOT_TEMPLATES['bold-medical-01']

  // Generate headline from news title
  let headline = newsItem.title
  if (headline.length > 60) {
    headline = headline.slice(0, 57) + '...'
  }

  // Build variable substitutions
  const subs: Record<string, string> = {
    topic: newsItem.title,
    headline,
    subtitle: `Fonte: ${newsItem.source} | ${newsItem.date}`,
    body: newsItem.summary,
    text: newsItem.summary,
    content: newsItem.summary,
    cta: 'Saiba mais',
    price: '',
    color: '#FF5404',
    color1: '#FF5404',
    color2: '#071925',
    color3: '#F8F9FA',
    currentSlide: String(slideNumber),
    totalSlides: String(totalSlides),
  }

  // Replace all variables in template
  let prompt = tmpl.promptTemplate
  for (const [key, value] of Object.entries(subs)) {
    const pattern = new RegExp(`{{${key}}}`, 'g')
    prompt = prompt.replace(pattern, value)
  }

  return prompt
}

// Main suggestion system
interface AutopilotSuggestion {
  id: string
  newsId: string
  topic: string
  headline: string
  category: string
  source: string
  url: string
  generatedPrompt: string
  templateId: string
  templateName: string
  slideCount: number
  aspectRatio: string
}

export async function POST(req: NextRequest) {
  try {
    const { source, topic, templateId, count, category, apiKeys } = await req.json()

    const tavilyKey = apiKeys?.tavily || process.env.TAVILY_API_KEY

    if (!tavilyKey) {
      return NextResponse.json({ error: 'Chave Tavily não encontrada. Configure em APIs & Configurações.' }, { status: 400 })
    }

    const selectedTemplateId = templateId || 'bold-medical-01'
    const templateConfig = AUTOPILOT_TEMPLATES[selectedTemplateId] || AUTOPILOT_TEMPLATES['bold-medical-01']
    const requestedCount = Math.min(count || 5, 20)
    const selectedCategory = VALID_CATS.includes(category) ? category : 'todos'

    // Fetch news
    let newsItems: any[] = []
    if (source === 'manual' && topic) {
      // Manual topic - create one suggestion from the topic
      newsItems = [{
        id: `manual-${Date.now()}`,
        title: topic,
        summary: `Conteúdo sobre ${topic} para profissionais de enfermagem`,
        source: 'NurseLab',
        url: '#',
        date: 'Agora',
        category: inferCategory(topic),
      }]
    } else {
      // Fetch from Tavily
      if (selectedCategory === 'todos') {
        newsItems = await fetchAllTavilyCategories(tavilyKey)
      } else {
        newsItems = await fetchTavilyNews(selectedCategory, tavilyKey, 30)
      }
    }

    // Limit to requested count
    newsItems = newsItems.slice(0, requestedCount * 3) // fetch more to have variety

    // Generate suggestions
    const suggestions: AutopilotSuggestion[] = []
    const usedTitles = new Set<string>()

    // Template metadata
    const templateMeta: Record<string, { name: string; aspectRatio: string; slideCount: number }> = {
      'twitter-vibe-01': { name: 'Twitter Vibe', aspectRatio: '1:1', slideCount: 1 },
      'windows-editorial-01': { name: 'Windows Editorial', aspectRatio: '4:5', slideCount: 5 },
      'minimal-health-01': { name: 'Minimal Health', aspectRatio: '4:5', slideCount: 1 },
      'viral-carousel-01': { name: 'Viral Carrossel', aspectRatio: '4:5', slideCount: 7 },
      'bold-medical-01': { name: 'Bold Medical', aspectRatio: '4:5', slideCount: 1 },
      'thread-style-01': { name: 'Thread X Style', aspectRatio: '4:5', slideCount: 8 },
      'ad-creative-01': { name: 'AD Creative', aspectRatio: '1:1', slideCount: 1 },
    }

    const meta = templateMeta[selectedTemplateId] || templateMeta['bold-medical-01']

    for (let i = 0; i < Math.min(newsItems.length, requestedCount); i++) {
      const news = newsItems[i]
      const titleKey = news.title.slice(0, 30)

      // Skip duplicate titles
      if (usedTitles.has(titleKey)) continue
      usedTitles.add(titleKey)

      // Vary slide count for carousel templates
      let slideCount = meta.slideCount
      if (selectedTemplateId === 'viral-carousel-01') {
        slideCount = Math.floor(Math.random() * 3) + 6 // 6-8 slides
      }

      const prompt = buildPromptFromTemplate(selectedTemplateId, news, 1, slideCount)

      suggestions.push({
        id: `sug-${Date.now()}-${i}`,
        newsId: news.id,
        topic: news.title,
        headline: news.title.length > 60 ? news.title.slice(0, 57) + '...' : news.title,
        category: news.category,
        source: news.source,
        url: news.url,
        generatedPrompt: prompt,
        templateId: selectedTemplateId,
        templateName: meta.name,
        slideCount,
        aspectRatio: meta.aspectRatio,
      })

      if (suggestions.length >= requestedCount) break
    }

    return NextResponse.json({
      suggestions,
      meta: {
        total: suggestions.length,
        provider: 'tavily',
        templateId: selectedTemplateId,
        templateName: meta.name,
        newsFetched: newsItems.length,
      },
    })

  } catch (e: any) {
    console.error('Autopilot error:', e)
    return NextResponse.json({ error: e.message || 'Erro interno' }, { status: 500 })
  }
}