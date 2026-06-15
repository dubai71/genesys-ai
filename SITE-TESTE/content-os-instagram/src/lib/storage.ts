import type { Post, Competitor, GeneratedContent, BusinessProfile, AppConfig, ScheduledDay } from '@/types'

const KEYS = {
  posts: 'nl_posts',
  competitors: 'nl_competitors',
  content: 'nl_content',
  business: 'nl_business',
  config: 'nl_config',
  schedule: 'nl_schedule',
}

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export const storage = {
  getPosts: () => get<Post[]>(KEYS.posts, []),
  setPosts: (v: Post[]) => set(KEYS.posts, v),
  addPost: (p: Post) => { const all = storage.getPosts(); storage.setPosts([p, ...all]) },
  deletePost: (id: string) => storage.setPosts(storage.getPosts().filter(p => p.id !== id)),

  getCompetitors: () => get<Competitor[]>(KEYS.competitors, []),
  setCompetitors: (v: Competitor[]) => set(KEYS.competitors, v),
  addCompetitor: (c: Competitor) => { const all = storage.getCompetitors(); storage.setCompetitors([c, ...all]) },
  deleteCompetitor: (id: string) => storage.setCompetitors(storage.getCompetitors().filter(c => c.id !== id)),

  getContent: () => get<GeneratedContent[]>(KEYS.content, []),
  setContent: (v: GeneratedContent[]) => set(KEYS.content, v),
  addContent: (c: GeneratedContent) => { const all = storage.getContent(); storage.setContent([c, ...all]) },
  deleteContent: (id: string) => storage.setContent(storage.getContent().filter(c => c.id !== id)),

  getBusiness: (): BusinessProfile => get<BusinessProfile>(KEYS.business, {
    name: 'enfermagemcom.ia', description: '', niche: 'Enfermagem + IA',
    audience: 'Enfermeiros e técnicos', tone: 'profissional',
    keywords: ['enfermagem', 'IA', 'saúde'], brandColors: ['#FF5404', '#071925', '#EDDABA'],
    socialNetworks: ['instagram'], competitors: [], instagramHandle: '@enfermagemcom.ia',
  }),
  setBusiness: (v: BusinessProfile) => set(KEYS.business, v),

  getConfig: (): AppConfig => get<AppConfig>(KEYS.config, {
    apiKeys: {}, textModel: 'claude-sonnet-4-5', imageModel: 'fal-flux', theme: 'dark',
  }),
  setConfig: (v: AppConfig) => set(KEYS.config, v),

  getSchedule: () => get<ScheduledDay[]>(KEYS.schedule, []),
  setSchedule: (v: ScheduledDay[]) => set(KEYS.schedule, v),
}

export const SAMPLE_POSTS: Post[] = [
  { id: 's1', title: 'Carrossel Despertar', caption: 'Você salva vidas. Mas quem está salvando a sua?', type: 'Carrossel', status: 'Publicado', date: '2026-04-05', img: 'none' },
  { id: 's2', title: 'IA na triagem', caption: 'Como usar Claude para protocolos de triagem mais rápidos', type: 'Carrossel', status: 'Agendado', date: '2026-04-08', img: 'freepik' },
  { id: 's3', title: '3 formas de monetizar', caption: 'Ebook, mentoria ou consultoria — qual começa primeiro?', type: 'Reel', status: 'Rascunho', date: '', img: 'ai' },
  { id: 's4', title: 'Burnout ou falta de estratégia?', caption: 'A diferença entre quem esgota e quem constrói', type: 'Post único', status: 'Backlog', date: '', img: 'none' },
  { id: 's5', title: 'Ferramentas gratuitas', caption: 'Notion, Claude, ChatGPT — como usar no dia a dia', type: 'Carrossel', status: 'Backlog', date: '', img: 'none' },
]

export const SAMPLE_COMPETITORS: Competitor[] = [
  { id: 'c1', handle: '@enfermagem.digital', seg: '18.4K', eng: '3.8%', freq: 4, trend: '+2.1%', nicho: 'Saúde Digital', cor: '#FF5404' },
  { id: 'c2', handle: '@enf.empreendedor', seg: '12.1K', eng: '4.2%', freq: 3, trend: '+1.8%', nicho: 'Empreendedorismo', cor: '#3b82f6' },
  { id: 'c3', handle: '@ia.nasaude', seg: '9.8K', eng: '2.9%', freq: 5, trend: '+3.4%', nicho: 'IA + Saúde', cor: '#a855f7' },
]

// Extend ApiKeys type for perplexity - patch at runtime
declare module '@/types' {
  interface ApiKeys {
    perplexity?: string
  }
}
