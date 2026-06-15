export type PostStatus = 'Publicado' | 'Agendado' | 'Rascunho' | 'Backlog'
export type PostType = 'Carrossel' | 'Reel' | 'Story' | 'Post único'
export type PostImage = 'none' | 'freepik' | 'ai'
export type ContentTone = 'profissional' | 'informal' | 'divertido' | 'educativo' | 'inspirador'
export type ContentType = 'carrossel' | 'post' | 'story' | 'reel' | 'thread'
export type TextModel = 'claude-sonnet-4-5' | 'claude-opus-4-5' | 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gpt-4o'
export type ImageModel = 'fal-flux' | 'fal-sdxl' | 'gemini-imagen' | 'dall-e-3'

export interface Post {
  id: string
  title: string
  caption: string
  type: PostType
  status: PostStatus
  date: string
  img: PostImage
  created_at?: string
}

export interface Competitor {
  id: string
  handle: string
  seg: string
  eng: string
  freq: number
  trend: string
  nicho: string
  cor: string
  created_at?: string
}

export interface Slide {
  id: string
  heading: string
  body: string
  imagePrompt?: string
  imageUrl?: string
}

export interface GeneratedContent {
  id: string
  type: ContentType
  title: string
  topic: string
  tone: ContentTone
  platform: string
  slides?: Slide[]
  body?: string
  hashtags?: string[]
  textModel: TextModel
  imageModel?: ImageModel
  createdAt: string
  status: 'draft' | 'approved' | 'scheduled' | 'published'
}

export interface BusinessProfile {
  name: string
  description: string
  niche: string
  audience: string
  tone: ContentTone
  keywords: string[]
  brandColors: string[]
  socialNetworks: string[]
  competitors: string[]
  instagramHandle: string
}

export interface ApiKeys {
  anthropic?: string
  gemini?: string
  openai?: string
  freepik?: string
  falai?: string
  supabaseUrl?: string
  supabaseKey?: string
  perplexity?: string
}

export interface AppConfig {
  apiKeys: ApiKeys
  textModel: TextModel
  imageModel: ImageModel
  theme: 'dark' | 'light'
}

export interface ScheduledDay {
  date: string
  contentId?: string
  contentType?: ContentType
  topic?: string
  status: 'empty' | 'planned' | 'published'
}
