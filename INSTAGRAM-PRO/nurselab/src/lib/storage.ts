import type {
  Post, Competitor, GeneratedContent, BusinessProfile,
  AppConfig, ScheduledDay, Profile, BrandTemplate, VideoGeneration,
  ViralPost, Creative
} from '@/types'

const KEYS = {
  posts: 'nl_posts', competitors: 'nl_competitors', content: 'nl_content',
  business: 'nl_business', config: 'nl_config', schedule: 'nl_schedule',
  profiles: 'nl_profiles', templates: 'nl_templates', videos: 'nl_videos',
  viralPosts: 'nl_viral_posts', creatives: 'nl_creatives',
}

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch { return fallback }
}

function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    const s = JSON.stringify(value)
    localStorage.setItem(key, s)
  } catch (e: any) {
    // QuotaExceededError: try removing thumbnails from templates/profiles
    if (e?.name === 'QuotaExceededError') {
      try {
        const templates = get<BrandTemplate[]>(KEYS.templates, [])
        const stripped = templates.map(t => ({ ...t, thumbnail: '' }))
        localStorage.setItem(KEYS.templates, JSON.stringify(stripped))
        localStorage.setItem(key, JSON.stringify(value))
      } catch {}
    }
  }
}

export const storage = {
  getPosts:          ()             => get<Post[]>('nl_posts', []),
  setPosts:          (v: Post[])    => set('nl_posts', v),
  addPost:           (p: Post)      => storage.setPosts([p, ...storage.getPosts()]),
  deletePost:        (id: string)   => storage.setPosts(storage.getPosts().filter(p => p.id !== id)),

  getCompetitors:    ()                  => get<Competitor[]>('nl_competitors', []),
  setCompetitors:    (v: Competitor[])   => set('nl_competitors', v),
  addCompetitor:     (c: Competitor)     => storage.setCompetitors([c, ...storage.getCompetitors()]),
  deleteCompetitor:  (id: string)        => storage.setCompetitors(storage.getCompetitors().filter(c => c.id !== id)),

  getContent:        ()                        => get<GeneratedContent[]>('nl_content', []),
  setContent:        (v: GeneratedContent[])   => set('nl_content', v),
  addContent:        (c: GeneratedContent)     => storage.setContent([c, ...storage.getContent()]),
  deleteContent:     (id: string)              => storage.setContent(storage.getContent().filter(c => c.id !== id)),

  getBusiness: (): BusinessProfile => get<BusinessProfile>('nl_business', {
    name: 'enfermagemcom.ia', description: '', niche: 'Enfermagem + IA',
    audience: 'Enfermeiros e técnicos', tone: 'profissional',
    keywords: ['enfermagem', 'IA', 'saude'], brandColors: ['#FF5404', '#071925', '#EDDABA'],
    socialNetworks: ['instagram'], competitors: [], instagramHandle: '@enfermagemcom.ia',
  }),
  setBusiness: (v: BusinessProfile) => set('nl_business', v),

  getConfig: (): AppConfig => get<AppConfig>('nl_config', {
    apiKeys: {}, textModel: 'claude-sonnet-4-5',
    imageModel: 'fal-flux', videoModel: 'seedance-v1',
    theme: 'dark', activeProfileId: 'default',
  }),
  setConfig: (v: AppConfig) => set('nl_config', v),

  getSchedule:       ()                  => get<ScheduledDay[]>('nl_schedule', []),
  setSchedule:       (v: ScheduledDay[]) => set('nl_schedule', v),

  getProfiles:       ()              => get<Profile[]>('nl_profiles', []),
  setProfiles:       (v: Profile[])  => set('nl_profiles', v),
  addProfile:        (p: Profile)    => storage.setProfiles([...storage.getProfiles(), p]),
  updateProfile:     (p: Profile)    => storage.setProfiles(storage.getProfiles().map(x => x.id === p.id ? p : x)),
  deleteProfile:     (id: string)    => storage.setProfiles(storage.getProfiles().filter(p => p.id !== id)),

  getActiveProfileId: (): string => storage.getConfig().activeProfileId || 'default',
  setActiveProfile:   (id: string) => {
    const cfg = storage.getConfig()
    storage.setConfig({ ...cfg, activeProfileId: id })
  },
  getActiveProfile: (): Profile => {
    const profiles = storage.getProfiles()
    const id = storage.getActiveProfileId()
    return profiles.find(p => p.id === id) || profiles[0] || DEFAULT_PROFILE
  },

  getTemplates:      ()                    => get<BrandTemplate[]>('nl_templates', []),
  setTemplates:      (v: BrandTemplate[])  => set('nl_templates', v),
  addTemplate:       (t: BrandTemplate)    => storage.setTemplates([t, ...storage.getTemplates()]),
  updateTemplate:    (t: BrandTemplate)    => storage.setTemplates(storage.getTemplates().map(x => x.id === t.id ? t : x)),
  deleteTemplate:    (id: string)          => storage.setTemplates(storage.getTemplates().filter(t => t.id !== id)),

  // Videos
  getVideos:      ()                    => get<VideoGeneration[]>('nl_videos', []),
  setVideos:      (v: VideoGeneration[]) => set('nl_videos', v),
  addVideo:       (v: VideoGeneration)  => storage.setVideos([v, ...storage.getVideos()]),
  updateVideo:    (v: VideoGeneration)  => storage.setVideos(storage.getVideos().map(x => x.id === v.id ? v : x)),
  deleteVideo:    (id: string)          => storage.setVideos(storage.getVideos().filter(v => v.id !== id)),

  // Viral Posts
  getViralPosts:      ()                    => get<ViralPost[]>('nl_viral_posts', []),
  setViralPosts:       (v: ViralPost[])      => set('nl_viral_posts', v),
  addViralPost:        (v: ViralPost)        => storage.setViralPosts([v, ...storage.getViralPosts()]),
  updateViralPost:     (v: ViralPost)        => storage.setViralPosts(storage.getViralPosts().map(x => x.id === v.id ? v : x)),
  deleteViralPost:     (id: string)          => storage.setViralPosts(storage.getViralPosts().filter(v => v.id !== id)),
  getViralPostsByFormat: (format: string)    => storage.getViralPosts().filter(v => v.format === format),

  // Creatives Bank (GeneratorLab)
  getCreatives:       ()                    => get<Creative[]>('nl_creatives', []),
  setCreatives:        (v: Creative[])      => set('nl_creatives', v),
  addCreative:         (c: Creative)        => storage.setCreatives([c, ...storage.getCreatives()]),
  updateCreative:      (c: Creative)        => storage.setCreatives(storage.getCreatives().map(x => x.id === c.id ? c : x)),
  deleteCreative:      (id: string)          => storage.setCreatives(storage.getCreatives().filter(c => c.id !== id)),
  getCreativesByType:  (type: string)       => storage.getCreatives().filter(c => c.type === type),
  getCreativesBySaveMode: (mode: string)    => storage.getCreatives().filter(c => c.savedAs === mode),

  // Visual DNA
  getDNA:            ()                     => get<VisualDNA[]>('nl_dna', []),
  setDNA:            (v: VisualDNA[])       => set('nl_dna', v),
  addDNA:            (d: VisualDNA)         => storage.setDNA([d, ...storage.getDNA()]),
  deleteDNA:         (id: string)           => storage.setDNA(storage.getDNA().filter(d => d.id !== id)),

  // Prompt Templates
  getPromptTemplates: ()                     => get<PromptTemplate[]>('nl_prompt_templates', []),
  setPromptTemplates: (v: PromptTemplate[])  => set('nl_prompt_templates', v),
  addPromptTemplate:  (t: PromptTemplate)    => storage.setPromptTemplates([t, ...storage.getPromptTemplates()]),
  updatePromptTemplate:(t: PromptTemplate)   => storage.setPromptTemplates(storage.getPromptTemplates().map(x => x.id === t.id ? t : x)),
  deletePromptTemplate:(id: string)          => storage.setPromptTemplates(storage.getPromptTemplates().filter(t => t.id !== id)),
}

export const SAMPLE_POSTS: Post[] = [
  { id: 's1', title: 'Carrossel Despertar', caption: 'Voce salva vidas. Mas quem esta salvando a sua?', type: 'Carrossel', status: 'Publicado', date: '2026-04-05', img: 'none' },
  { id: 's2', title: 'IA na triagem', caption: 'Como usar Claude para protocolos de triagem mais rapidos', type: 'Carrossel', status: 'Agendado', date: '2026-04-08', img: 'freepik' },
  { id: 's3', title: '3 formas de monetizar', caption: 'Ebook, mentoria ou consultoria', type: 'Reel', status: 'Rascunho', date: '', img: 'ai' },
  { id: 's4', title: 'Burnout ou falta de estratégia?', caption: 'A diferença entre quem esgota e quem constrói', type: 'Post único', status: 'Backlog', date: '', img: 'none' },
]

export const SAMPLE_COMPETITORS: Competitor[] = [
  { id: 'c1', handle: '@enfermagem.digital', seg: '18.4K', eng: '3.8%', freq: 4, trend: '+2.1%', nicho: 'Saude Digital', cor: '#FF5404' },
  { id: 'c2', handle: '@enf.empreendedor', seg: '12.1K', eng: '4.2%', freq: 3, trend: '+1.8%', nicho: 'Empreendedorismo', cor: '#3b82f6' },
]

export const DEFAULT_PROFILE: Profile = {
  id: 'default',
  name: 'Arthur Moreira',
  handle: '@enfermagemcom.ia',
  description: 'Enfermeiro estratégico usando IA para crescer',
  niche: 'Enfermagem + IA',
  audience: 'Técnicos e enfermeiros assistenciais',
  tone: 'profissional',
  keywords: ['enfermagem', 'IA', 'saúde', 'estratégia'],
  brandColors: ['#FF5404', '#071925', '#EDDABA'],
  fontDisplay: 'Fraunces',
  fontBody: 'Outfit',
  socialNetworks: ['instagram'],
  competitors: [],
  isDefault: true,
  createdAt: new Date().toISOString(),
}
