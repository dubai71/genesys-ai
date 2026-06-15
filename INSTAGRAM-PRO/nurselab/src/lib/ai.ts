import type { TextModel, ImageModel, ContentTone, ContentType, BusinessProfile } from '@/types'

interface ApiKeys { [key: string]: string | undefined }

export async function generateContent(params: {
  type: ContentType; topic: string; tone: ContentTone; textModel: TextModel
  business: BusinessProfile; apiKeys: ApiKeys; slidesCount?: number
}) {
  const res = await fetch('/api/generate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: params.textModel, topic: params.topic, type: params.type,
      tone: params.tone, business: params.business, slidesCount: params.slidesCount || 7, apiKeys: params.apiKeys }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erro ao gerar conteúdo')
  return data
}

export async function generateImage(params: { prompt: string; imageModel: ImageModel; apiKeys: ApiKeys }) {
  const res = await fetch('/api/image', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: params.prompt, model: params.imageModel, apiKeys: params.apiKeys }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erro ao gerar imagem')
  return data.url || ''
}

export async function fetchNews(params: { category: string; apiKeys: ApiKeys }) {
  const res = await fetch('/api/news', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category: params.category, apiKeys: params.apiKeys }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Erro ao buscar notícias')
  return data
}

export async function generateHashtags(params: { content: string; niche: string; apiKeys: ApiKeys }) {
  const res = await fetch('/api/hashtags', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: params.content, niche: params.niche, apiKeys: params.apiKeys }),
  })
  const data = await res.json()
  return { high: data.high || [], medium: data.medium || [], niche: data.niche || [] }
}
