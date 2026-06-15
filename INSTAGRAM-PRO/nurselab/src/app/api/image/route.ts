import { NextRequest, NextResponse } from 'next/server'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { model, prompt, negativePrompt, aspectRatio = '1:1', apiKeys } = body
    const keys = apiKeys || {}

    let imageUrl: string

    // OpenAI DALL-E
    if (model.startsWith('openai-dall-e')) {
      const key = keys.openai || process.env.OPENAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave OpenAI não configurada.' }, { status: 400 })

      const dalleModel = model === 'openai-dall-e-3' ? 'dall-e-3' : 'dall-e-2'
      const size = aspectRatio === '16:9' ? '1792x1024' : aspectRatio === '9:16' ? '1024x1792' : '1024x1024'
      const payload: any = { model: dalleModel, prompt, n: 1, size }
      if (dalleModel === 'dall-e-3') payload.quality = 'standard'

      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `OpenAI DALL-E erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      imageUrl = data.data?.[0]?.url || ''
    }

    // Replicate (SD3, FLUX)
    else if (model.startsWith('replicate')) {
      const key = keys.replicate || process.env.REPLICATE_API_TOKEN
      if (!key) return NextResponse.json({ error: 'Chave Replicate não configurada.' }, { status: 400 })

      let replicateModel: string
      if (model === 'replicate-sd3') replicateModel = 'stability-ai/stable-diffusion-3'
      else if (model === 'replicate-flux-dev') replicateModel = 'black-forest-labs/flux-dev'
      else if (model === 'replicate-flux-schnell') replicateModel = 'black-forest-labs/flux-schnell'
      else replicateModel = model.replace('replicate-', '')

      const createRes = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: replicateModel,
          input: { prompt, ...(negativePrompt && { negative_prompt: negativePrompt }) },
        }),
      })
      const createData = await createRes.json()
      if (!createRes.ok) {
        return NextResponse.json({ error: `Replicate erro ${createRes.status}: ${JSON.stringify(createData)}` }, { status: createRes.status })
      }

      let prediction = createData
      for (let i = 0; i < 60; i++) {
        const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: { 'Authorization': `Token ${key}` },
        })
        prediction = await pollRes.json()
        if (prediction.status === 'succeeded') break
        if (prediction.status === 'failed') {
          return NextResponse.json({ error: `Replicate falhou: ${JSON.stringify(prediction.error)}` }, { status: 500 })
        }
        await delay(2000)
      }

      if (prediction.status !== 'succeeded') {
        return NextResponse.json({ error: 'Replicate timeout aguardando geração.' }, { status: 504 })
      }

      const output = prediction.output
      imageUrl = Array.isArray(output) ? output[0] : output
    }

    // Stability AI
    else if (model.startsWith('stability')) {
      const key = keys.stability || process.env.STABILITY_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Stability AI não configurada.' }, { status: 400 })

      let engine: string
      if (model === 'stability-sdxl-turbo') engine = 'stable-diffusion-xl-1024-turbo'
      else if (model === 'stability-sd-xl') engine = 'stable-diffusion-xl-1024-v1-0'
      else engine = model.replace('stability-', '')

      const sizeMap: Record<string, [number, number]> = {
        '1:1': [1024, 1024],
        '16:9': [1152, 640],
        '9:16': [640, 1152],
      }
      const [width, height] = sizeMap[aspectRatio] || [1024, 1024]

      const res = await fetch(`https://api.stability.ai/v1/generation/${engine}/text-to-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          width,
          height,
          steps: 30,
          samples: 1,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Stability AI erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const base64 = data.artifacts?.[0]?.base64
      if (base64) {
        imageUrl = `data:image/png;base64,${base64}`
      } else {
        return NextResponse.json({ error: 'Stability AI não retornou imagem.' }, { status: 500 })
      }
    }

    // Gemini Imagen
    else if (model.startsWith('gemini-imagen')) {
      const key = keys.gemini || process.env.GEMINI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Gemini não configurada.' }, { status: 400 })

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-2.0:generate?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: { text: prompt },
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Gemini Imagen erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const base64 = data.generated_images?.[0]?.base64
      if (base64) {
        imageUrl = `data:image/png;base64,${base64}`
      } else {
        return NextResponse.json({ error: 'Gemini Imagen não retornou imagem.' }, { status: 500 })
      }
    }

    // HuggingFace Stable Diffusion
    else if (model === 'huggingface-stable-diffusion') {
      const key = keys.huggingface || process.env.HUGGINGFACE_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave HuggingFace não configurada.' }, { status: 400 })

      const modelId = 'stabilityai/stable-diffusion-xl-base-1.0'
      const res = await fetch(
        `https://api-inference.huggingface.co/models/${modelId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      )

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `HuggingFace erro ${res.status}: ${err}` }, { status: res.status })
      }

      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString('base64')
      imageUrl = `data:image/png;base64,${base64}`
    }

    // Ideogram
    else if (model.startsWith('ideogram')) {
      const key = keys.ideogram || process.env.IDEOGRAM_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Ideogram não configurada.' }, { status: 400 })

      const res = await fetch('https://api.ideogram.ai/v1/images/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          ...(negativePrompt && { negative_prompt: negativePrompt }),
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Ideogram erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      imageUrl = data.data?.[0]?.url || ''
    }

    // Leonardo AI
    else if (model.startsWith('leonardo')) {
      const key = keys.leonardo || process.env.LEONARDO_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Leonardo AI não configurada.' }, { status: 400 })

      const genRes = await fetch('https://api.leonardo.ai/v1/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          num_images: 1,
        }),
      })
      const genData = await genRes.json()
      if (!genRes.ok) {
        return NextResponse.json({ error: `Leonardo erro ${genRes.status}: ${JSON.stringify(genData)}` }, { status: genRes.status })
      }
      const genId = genData.generation_id || genData.id
      if (!genId) return NextResponse.json({ error: 'Leonardo não retornou ID de geração.' }, { status: 500 })

      imageUrl = ''
      for (let i = 0; i < 60; i++) {
        const statusRes = await fetch(`https://api.leonardo.ai/v1/generations/${genId}`, {
          headers: { 'Authorization': `Bearer ${key}` },
        })
        const statusData = await statusRes.json()
        if (!statusRes.ok) {
          return NextResponse.json({ error: `Leonardo status erro ${statusRes.status}: ${JSON.stringify(statusData)}` }, { status: statusRes.status })
        }
        const generation = statusData.generations?.[0]
        if (generation?.status === 'COMPLETE') {
          imageUrl = generation.images?.[0]?.url || ''
          break
        }
        if (generation?.status === 'FAILED') {
          return NextResponse.json({ error: 'Leonardo generation failed' }, { status: 500 })
        }
        await delay(2000)
      }

      if (!imageUrl) {
        return NextResponse.json({ error: 'Leonardo timeout aguardando imagem.' }, { status: 504 })
      }
    }

    // Existing fal.ai handlers (preserve)
    else if (model === 'fal-flux' || model === 'fal-flux-pro') {
      const key = keys.falai || process.env.FALAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave fal.ai não configurada.' }, { status: 400 })
      const endpoint = model === 'fal-flux-pro' ? 'fal-ai/flux-pro' : 'fal-ai/flux/schnell'
      const res = await fetch(`https://queue.fal.run/${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, enable_safety: false }),
      })
      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `fal.ai erro ${res.status}: ${err}` }, { status: res.status })
      }
      const data = await res.json()
      imageUrl = data.images?.[0]?.url || ''
    }
    else if (model === 'fal-sdxl') {
      const key = keys.falai || process.env.FALAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave fal.ai não configurada.' }, { status: 400 })
      const res = await fetch('https://queue.fal.run/fal-ai/sdxl', {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, enable_safety: false }),
      })
      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `fal.ai erro ${res.status}: ${err}` }, { status: res.status })
      }
      const data = await res.json()
      imageUrl = data.images?.[0]?.url || ''
    }

    else {
      return NextResponse.json({ error: `Modelo de imagem "${model}" não suportado.` }, { status: 400 })
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'URL da imagem não gerada.' }, { status: 500 })
    }

    return NextResponse.json({ url: imageUrl })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Erro interno no servidor.' }, { status: 500 })
  }
}
