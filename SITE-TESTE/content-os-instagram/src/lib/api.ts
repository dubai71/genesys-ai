// lib/freepik.ts
export async function searchFreepik(query: string, apiKey: string) {
  const url = `https://api.freepik.com/v1/resources?term=${encodeURIComponent(query)}&filters[content_type][photo]=1&limit=6`
  const res = await fetch(url, {
    headers: { 'X-Freepik-API-Key': apiKey, 'Accept': 'application/json' }
  })
  if (!res.ok) throw new Error('Freepik API error: ' + res.status)
  const data = await res.json()
  return data.data || []
}

// lib/falai.ts
export async function generateImage(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch('https://fal.run/fal-ai/flux/dev', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt,
      image_size: 'portrait_4_3',
      num_images: 1,
      enable_safety_checker: true
    })
  })
  if (!res.ok) throw new Error('fal.ai error: ' + res.status)
  const data = await res.json()
  return data.images?.[0]?.url || ''
}

// lib/storage.ts
const POSTS_KEY = 'nl_posts'
const COMPS_KEY = 'nl_comps'

export function getPosts() {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]') } catch { return [] }
}
export function savePosts(posts: unknown[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
}
export function getCompetitors() {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(COMPS_KEY) || '[]') } catch { return [] }
}
export function saveCompetitors(comps: unknown[]) {
  localStorage.setItem(COMPS_KEY, JSON.stringify(comps))
}
export function getApiKey(service: 'freepik' | 'falai'): string {
  return localStorage.getItem(`api_${service}`) || ''
}
export function saveApiKey(service: 'freepik' | 'falai', key: string) {
  localStorage.setItem(`api_${service}`, key)
}
