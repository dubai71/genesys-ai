import { NextRequest, NextResponse } from 'next/server'

// Map model IDs to MuAPI endpoints
type MuAPIModelMap = Record<string, { endpoint: string; provider: string }>

// Multi-provider config: tries in order, stops at first success
const PROVIDERS: Array<{
  name: string
  baseUrl: string
  apiKey: string
  modelMap: MuAPIModelMap
}> = [
  {
    name: 'muapi',
    baseUrl: 'https://api.muapi.ai',
    apiKey: process.env.MUAPI_KEY || 'd5d036ce326cdc9292dfab2658f365e0bacedf032cdeca05264262019911b522',
    // Map model IDs to MuAPI endpoints
    modelMap: {
      'flux-1-dev': { endpoint: 'flux-1-dev', provider: 'muapi' },
      'flux-1-schnell': { endpoint: 'flux-1-schnell', provider: 'muapi' },
      'flux-red': { endpoint: 'flux-1-redux', provider: 'muapi' },
      'nano-banana-2': { endpoint: 'nano-banana-2', provider: 'muapi' },
      'sd-3-medium': { endpoint: 'stable-diffusion-3-medium', provider: 'muapi' },
      'sd-2': { endpoint: 'stable-diffusion-2', provider: 'muapi' },
      'playground-v2-5': { endpoint: 'playground-v2-5', provider: 'muapi' },
      'pixart-alpha': { endpoint: 'pixart-alpha', provider: 'muapi' },
      'dalle-3': { endpoint: 'dall-e-3', provider: 'muapi' },
      'imagen-3': { endpoint: 'imagen-3', provider: 'muapi' },
      'minimax-image-01': { endpoint: 'minimax-image-01', provider: 'muapi' },
      'florence-2': { endpoint: 'florence-2', provider: 'muapi' },
      'seedance-2': { endpoint: 'seedance-2', provider: 'muapi' },
      'kling-1-6': { endpoint: 'kling-1-6-standard', provider: 'muapi' },
      'kling-1-5': { endpoint: 'kling-1-5-standard', provider: 'muapi' },
      'hailuo-2': { endpoint: 'hailuo-2', provider: 'muapi' },
      'hunyuan-video': { endpoint: 'hunyuan-video', provider: 'muapi' },
      'ltx-video': { endpoint: 'ltx-video', provider: 'muapi' },
      'mochi-1': { endpoint: 'mochi-1', provider: 'muapi' },
      'wan-2-2-t2v': { endpoint: 'wan-2-2-t2v', provider: 'muapi' },
      'cog-3-video': { endpoint: 'cog-3-video', provider: 'muapi' },
      'f8-video': { endpoint: 'f8-video', provider: 'muapi' },
      'grok-imagine-t2v': { endpoint: 'grok-imagine-t2v', provider: 'muapi' },
      'f8s-video': { endpoint: 'f8s-video', provider: 'muapi' },
      'flux-kontext': { endpoint: 'flux-kontext-dev-i2i', provider: 'muapi' },
      'nano-banana-edit': { endpoint: 'nano-banana-2-edit', provider: 'muapi' },
      'flux-redux': { endpoint: 'flux-1-redux', provider: 'muapi' },
      'kling-o1-edit': { endpoint: 'kling-o1-edit-image', provider: 'muapi' },
      'sd-3-edit': { endpoint: 'stable-diffusion-3-medium-edit', provider: 'muapi' },
      'seedance-2-i2v': { endpoint: 'seedance-2-i2v', provider: 'muapi' },
      'kling-1-6-i2v': { endpoint: 'kling-1-6-i2v', provider: 'muapi' },
      'wan-2-2-i2v': { endpoint: 'wan-2-2-i2v', provider: 'muapi' },
      'hailuo-2-i2v': { endpoint: 'hailuo-2-i2v', provider: 'muapi' },
      'ltx-2-3-i2v': { endpoint: 'ltx-2-3-i2v', provider: 'muapi' },
      'video-watermark-remover': { endpoint: 'video-watermark-remover', provider: 'muapi' },
      'kling-v2.6-std-motion-control': { endpoint: 'kling-v2.6-std-motion-control', provider: 'muapi' },
      'kling-v3.0-std-motion-control': { endpoint: 'kling-v3.0-std-motion-control', provider: 'muapi' },
      'kling-v3.0-pro-motion-control': { endpoint: 'kling-v3.0-pro-motion-control', provider: 'muapi' },
      'infinitetalk-image-to-video': { endpoint: 'infinitetalk-image-to-video', provider: 'muapi' },
      'wan2.2-speech-to-video': { endpoint: 'wan2.2-speech-to-video', provider: 'muapi' },
      'ltx-2.3-lipsync': { endpoint: 'ltx-2.3-lipsync', provider: 'muapi' },
      'ltx-2-19b-lipsync': { endpoint: 'ltx-2-19b-lipsync', provider: 'muapi' },
      'sync-lipsync': { endpoint: 'sync-lipsync', provider: 'muapi' },
      'latent-sync': { endpoint: 'latentsync-video', provider: 'muapi' },
      'creatify-lipsync': { endpoint: 'creatify-lipsync', provider: 'muapi' },
      'veed-lipsync': { endpoint: 'veed-lipsync', provider: 'muapi' },
      'infinitetalk-video-to-video': { endpoint: 'infinitetalk-video-to-video', provider: 'muapi' },
      'suno-create-music': { endpoint: 'suno-create-music', provider: 'muapi' },
    }
  },
  {
    name: 'nvidia-1',
    baseUrl: 'https://ai.api.nvidia.com/v1',
    apiKey: process.env.NVIDIA_API_KEY_1 || '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',
    // NVIDIA NIM endpoints for image gen
    modelMap: {
      // Placeholder - we'll discover endpoints
    }
  },
  {
    name: 'nvidia-2',
    baseUrl: 'https://ai.api.nvidia.com/v1',
    apiKey: process.env.NVIDIA_API_KEY_2 || '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',
    modelMap: {}
  }
]

// Poll for result
async function pollResult(baseUrl: string, requestId: string, apiKey: string, maxAttempts = 60, interval = 2000) {
  for (let i = 1; i <= maxAttempts; i++) {
    await new Promise(r => setTimeout(r, interval))
    try {
      const res = await fetch(`${baseUrl}/predictions/${requestId}/result`, {
        headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' }
      })
      if (!res.ok) continue
      const data = await res.json()
      const s = (data.status || '').toLowerCase()
      if (s === 'completed' || s === 'succeeded' || s === 'success') return data
      if (s === 'failed' || s === 'error') throw new Error(data.error || 'Generation failed')
    } catch { /* keep polling */ }
  }
  throw new Error('Timeout waiting for result')
}

// Submit generation to a provider
async function submitToProvider(provider: typeof PROVIDERS[0], modelId: string, payload: any) {
  const modelInfo = (provider.modelMap as Record<string, any>)[modelId]
  const endpoint = modelInfo?.endpoint || modelId

  // MuAPI uses /v1/{endpoint}
  if (provider.name === 'muapi') {
    const submitRes = await fetch(`${provider.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: { 'x-api-key': provider.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!submitRes.ok) {
      const txt = await submitRes.text()
      throw new Error(`MuAPI ${submitRes.status}: ${txt}`)
    }
    const json = await submitRes.json()
    const reqId = json.request_id || json.id
    if (!reqId) return json
    return pollResult(provider.baseUrl, reqId, provider.apiKey)
  }

  // NVIDIA NIM - different API structure
  // Try common NVIDIA image generation endpoints
  const nvidiaEndpoints = [
    `/infer/nvidia/flux-diffusion-onnx`,
    `/infer/nvidia/stable-diffusion-xl`,
    `/infer/stabilityai/stable-diffusion-xl`,
    `/infer/aitomatic/turbo`,
  ]

  for (const ep of nvidiaEndpoints) {
    try {
      const res = await fetch(`${provider.baseUrl}${ep}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          prompt: payload.prompt,
          num_images: 1,
          ...payload
        })
      })
      if (res.ok) {
        const json = await res.json()
        return { outputs: [json.image_url || json.outputs?.[0] || json.url], status: 'completed' }
      }
    } catch { /* try next */ }
  }

  throw new Error('NVIDIA: no working endpoint found')
}

export async function POST(req: NextRequest) {
  try {
    const { modelId, payload } = await req.json()
    if (!modelId) return NextResponse.json({ error: 'modelId required' }, { status: 400 })

    const errors: string[] = []

    // Try each provider in order
    for (const provider of PROVIDERS) {
      try {
        const result = await submitToProvider(provider, modelId, payload)
        return NextResponse.json({ ...result, _provider: provider.name })
      } catch (err: any) {
        errors.push(`${provider.name}: ${err.message}`)
        console.log(`[generate] ${provider.name} failed: ${err.message}`)
        // Try next provider
      }
    }

    // All failed
    return NextResponse.json({ 
      error: 'All providers failed', 
      details: errors 
    }, { status: 500 })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}