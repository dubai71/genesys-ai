// lib/types.ts

export interface Post {
  id: number
  title: string
  caption: string
  type: 'Carrossel' | 'Reel' | 'Story' | 'Post único'
  status: 'Publicado' | 'Agendado' | 'Rascunho' | 'Backlog'
  date: string
  img: 'none' | 'freepik' | 'ai'
  imageUrl?: string
}

export interface Competitor {
  id: number
  handle: string
  followers: string
  engagement: string
  frequency: number
  trend: string
  niche: string
  color: string
}

export interface NewsItem {
  id: number
  source: string
  title: string
  summary: string
  category: 'ia' | 'neg' | 'fer' | 'enf'
  date: string
  url?: string
}

export interface Carousel {
  id: number
  title: string
  slides: number
  editorial: string
  status: 'Pronto' | 'Rascunho'
  date: string
  zipUrl?: string
}
