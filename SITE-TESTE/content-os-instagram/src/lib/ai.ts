import type { TextModel, ImageModel, ContentTone, ContentType, Slide, BusinessProfile } from '@/types'

export async function generateContent(params: {
  type: ContentType
  topic: string
  tone: ContentTone
  textModel: TextModel
  business: BusinessProfile
  apiKeys: Record<string, string>
  slidesCount?: number
}): Promise<{ slides?: Slide[]; body?: string; hashtags?: string[] }> {
  const { type, topic, tone, textModel, business, apiKeys, slidesCount = 7 } = params

  const systemPrompt = `Você é um especialista em marketing de conteúdo para ${business.name}.
Nicho: ${business.niche}. Público: ${business.audience}. Tom: ${tone}.
Palavras-chave: ${business.keywords.join(', ')}.
Responda APENAS com JSON válido, sem markdown, sem explicações.`

  const userPrompt = type === 'carrossel'
    ? `Crie um carrossel Instagram de ${slidesCount} slides sobre: "${topic}".
JSON: {"slides":[{"id":"1","heading":"título impactante","body":"texto do slide (máx 100 chars)","imagePrompt":"descrição para gerar imagem"}],"hashtags":["tag1","tag2"]}`
    : type === 'thread'
    ? `Crie uma thread Twitter de 8 tweets sobre: "${topic}".
JSON: {"body":"tweet1\\n---\\ntweet2\\n---\\n...","hashtags":["tag1"]}`
    : `Crie um ${type} Instagram sobre: "${topic}".
JSON: {"body":"texto completo do post","hashtags":["tag1","tag2","tag3"]}`

  if (textModel.startsWith('claude')) {
    const key = apiKeys.anthropic
    if (!key) throw new Error('Chave Anthropic não configurada')
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: textModel, max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })
    const data = await res.json()
    const text = data.content?.[0]?.text || ''
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  }

  if (textModel.startsWith('gemini')) {
    const key = apiKeys.gemini
    if (!key) throw new Error('Chave Gemini não configurada')
    const model = textModel === 'gemini-1.5-pro' ? 'gemini-1.5-pro' : 'gemini-1.5-flash'
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2000 },
      }),
    })
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  }

  throw new Error(`Modelo ${textModel} não suportado ainda`)
}

export async function generateImage(params: {
  prompt: string
  imageModel: ImageModel
  apiKeys: Record<string, string>
}): Promise<string> {
  const { prompt, imageModel, apiKeys } = params

  if (imageModel.startsWith('fal')) {
    const key = apiKeys.falai
    if (!key) throw new Error('Chave fal.ai não configurada')
    const modelId = imageModel === 'fal-flux' ? 'fal-ai/flux/schnell' : 'fal-ai/stable-diffusion-xl'
    const res = await fetch(`https://fal.run/${modelId}`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ prompt, image_size: 'square_hd', num_images: 1 }),
    })
    const data = await res.json()
    return data.images?.[0]?.url || ''
  }

  throw new Error(`Modelo de imagem ${imageModel} não suportado ainda`)
}

export async function generateHashtags(content: string, niche: string, apiKey?: string): Promise<{ high: string[], medium: string[], niche: string[] }> {
  if (!apiKey) return { high: [], medium: [], niche: [] }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', max_tokens: 500,
      messages: [{ role: 'user', content: `Sugira 30 hashtags para: "${content}" no nicho "${niche}". Responda JSON: {"high":["#tag"],"medium":["#tag"],"niche":["#tag"]} com 10 em cada categoria.` }],
    }),
  })
  const data = await res.json()
  try { return JSON.parse(data.content?.[0]?.text?.replace(/```json|```/g, '').trim() || '{}') }
  catch { return { high: [], medium: [], niche: [] } }
}
