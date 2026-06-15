import { NextRequest, NextResponse } from 'next/server'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(req: NextRequest) {
  try {
    const { prompt, model, duration = 5, aspectRatio = '9:16', apiKeys } = await req.json()
    const keys = apiKeys || {}

    let jobId: string
    let videoUrl: string

    // Higgsfield (preserve existing)
    if (model.startsWith('seedance') || model === 'higgsfield-seedance') {
      const key = keys.higgsfield || process.env.HIGGSFIELD_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Higgs Field não configurada. Va em APIs.' }, { status: 400 })

      const modelId = model === 'seedance-v1-lite' ? 'seedance-v1-lite' : 'seedance-v1'

      const submitRes = await fetch('https://api.higgsfield.ai/v1/video/generate', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId, prompt, duration, aspect_ratio: aspectRatio }),
      })

      if (!submitRes.ok) {
        const err = await submitRes.text()
        return NextResponse.json({ error: `Higgs Field ${submitRes.status}: ${err}` }, { status: submitRes.status })
      }

      const submitData = await submitRes.json()
      jobId = submitData.id || submitData.job_id
      if (!jobId) return NextResponse.json({ error: 'Job ID nao retornado' }, { status: 500 })

      // quick poll up to 5 attempts
      for (let i = 0; i < 5; i++) {
        await delay(2000)
        const pollRes = await fetch(`https://api.higgsfield.ai/v1/video/${jobId}`, {
          headers: { 'Authorization': `Bearer ${key}` },
        })
        if (!pollRes.ok) continue
        const pollData = await pollRes.json()
        if (pollData.status === 'completed' || pollData.status === 'succeeded') {
          videoUrl = pollData.video_url || pollData.output?.video_url || ''
          return NextResponse.json({ url: videoUrl, jobId, status: 'done' })
        }
        if (pollData.status === 'failed') {
          return NextResponse.json({ error: 'Geracao falhou: ' + (pollData.error || 'desconhecido') }, { status: 500 })
        }
      }

      return NextResponse.json({ jobId, status: 'processing', message: 'Video em geracao. Verifique o status.' }, { status: 202 })
    }

    // Segmind Seedance 2.0 (preserve existing)
    else if (model === 'segmind-seedance-2') {
      const key = keys.segmind || process.env.SEGMIND_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Segmind nao configurada.' }, { status: 400 })

      const payload = {
        prompt,
        duration: duration || 5,
        aspect_ratio: aspectRatio || '9:16',
      }

      const res = await fetch('https://api.segmind.com/v1/seedance-2.0/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Segmind ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      videoUrl = data.video_url || data.url || ''
      if (!videoUrl) return NextResponse.json({ error: 'Segmind nao retornou video.' }, { status: 500 })
      return NextResponse.json({ url: videoUrl, status: 'done' })
    }

    // Replicate (SVD, ZeroScope XL)
    else if (model.startsWith('replicate')) {
      const key = keys.replicate || process.env.REPLICATE_API_TOKEN
      if (!key) return NextResponse.json({ error: 'Chave Replicate nao configurada.' }, { status: 400 })

      let replicateModel: string
      if (model === 'replicate-svd') replicateModel = 'stability-ai/stable-video-diffusion:3f0452e3a52ffa9c0e948aff785c46b32285eb39c4b75c4915d1e21b59c5ee37'
      else if (model === 'replicate-zeroscope') replicateModel = 'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351'
      else replicateModel = model.replace('replicate-', '')

      const createRes = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: replicateModel,
          input: {
            prompt,
            ...(duration && { fps: 24, frames: duration * 24 }),
            ...(aspectRatio && { aspect_ratio: aspectRatio }),
          },
        }),
      })
      const createData = await createRes.json()
      if (!createRes.ok) {
        return NextResponse.json({ error: `Replicate erro ${createRes.status}: ${JSON.stringify(createData)}` }, { status: createRes.status })
      }

      const jobId = createData.id
      if (!jobId) return NextResponse.json({ error: 'Replicate nao retornou ID de predicao.' }, { status: 500 })

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // HuggingFace video models
    else if (model.startsWith('huggingface-video')) {
      const key = keys.huggingface || process.env.HUGGINGFACE_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave HuggingFace nao configurada.' }, { status: 400 })

      let modelId: string
      switch (model) {
        case 'huggingface-zero-shot':
          modelId = 'cerspense/zeroscope-v2-576w'
          break
        case 'huggingface-svd':
          modelId = 'stabilityai/stable-video-diffusion-img2vid-xt'
          break
        default:
          modelId = model.replace('huggingface-', '')
      }

      // HuggingFace video generation is async - we'll poll
      const payload = {
        inputs: prompt,
        parameters: { num_frames: (duration || 5) * 8, num_inference_steps: 25 },
      }

      const res = await fetch(
        `https://api-inference.huggingface.co/models/${encodeURIComponent(modelId)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `HuggingFace erro ${res.status}: ${err}` }, { status: res.status })
      }

      // HuggingFace may return directly or with a job ID
      const data = await res.json()
      if (data.video) {
        videoUrl = data.video
      } else if (data.url) {
        videoUrl = data.url
      } else {
        return NextResponse.json({ error: 'HuggingFace nao retornou video.' }, { status: 500 })
      }
    }

    // Pika
    else if (model === 'pika' || model === 'pika-v2') {
      const key = keys.pika || process.env.PIKA_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Pika nao configurada.' }, { status: 400 })

      const endpoint = model === 'pika-v2' ? 'https://api.pika.art/v2/videos' : 'https://api.pika.art/v1/videos'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          duration: duration || 3,
          aspect_ratio: aspectRatio,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Pika erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const jobId = data.id || data.video_id || ''
      if (!jobId) {
        videoUrl = data.url || data.video_url || ''
        if (videoUrl) return NextResponse.json({ url: videoUrl, status: 'done' })
        return NextResponse.json({ error: 'Pika nao retornou ID ou URL de video.' }, { status: 500 })
      }

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // Runway ML (Gen-2 / Gen-3 Alpha)
    else if (model === 'runway-gen-2' || model === 'runway-gen-3') {
      const key = keys.runway || process.env.RUNWAY_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Runway nao configurada.' }, { status: 400 })

      const endpoint = 'https://api.runwayml.com/v1/generate'
      const modelName = model === 'runway-gen-3' ? 'gen3-alpha' : 'gen2'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: modelName,
          duration: duration || 4,
          aspect_ratio: aspectRatio,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Runway erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const jobId = data.id || data.job_id || ''
      if (!jobId) {
        videoUrl = data.url || data.video_url || ''
        if (videoUrl) return NextResponse.json({ url: videoUrl, status: 'done' })
        return NextResponse.json({ error: 'Runway nao retornou ID ou URL de video.' }, { status: 500 })
      }

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // Kling AI
    else if (model === 'kling') {
      const key = keys.kling || process.env.KLING_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Kling AI nao configurada.' }, { status: 400 })

      const res = await fetch('https://api.kling.kuaishou.com/v1/videos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          duration: duration || 5,
          aspect_ratio: aspectRatio,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Kling erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const jobId = data.task_id || data.id || ''
      if (!jobId) {
        videoUrl = data.url || data.video_url || ''
        if (videoUrl) return NextResponse.json({ url: videoUrl, status: 'done' })
        return NextResponse.json({ error: 'Kling nao retornou ID ou URL de video.' }, { status: 500 })
      }

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // Haiper
    else if (model === 'haiper') {
      const key = keys.haiper || process.env.HAIPER_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Haiper nao configurada.' }, { status: 400 })

      const res = await fetch('https://api.haiper.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          duration: duration || 4,
          aspect_ratio: aspectRatio,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Haiper erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const jobId = data.job_id || data.id || ''
      if (!jobId) {
        videoUrl = data.url || data.video_url || ''
        if (videoUrl) return NextResponse.json({ url: videoUrl, status: 'done' })
        return NextResponse.json({ error: 'Haiper nao retornou ID ou URL de video.' }, { status: 500 })
      }

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // Luma Dream Machine
    else if (model === 'luma-dream-machine') {
      const key = keys.luma || process.env.LUMA_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Luma nao configurada.' }, { status: 400 })

      const res = await fetch('https://api.lumalabs.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: 'dream-machine',
          duration: duration || 5,
          aspect_ratio: aspectRatio,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `Luma erro ${res.status}: ${err}` }, { status: res.status })
      }

      const data = await res.json()
      const jobId = data.id || data.job_id || ''
      if (!jobId) {
        videoUrl = data.url || data.video_url || ''
        if (videoUrl) return NextResponse.json({ url: videoUrl, status: 'done' })
        return NextResponse.json({ error: 'Luma nao retornou ID ou URL de video.' }, { status: 500 })
      }

      return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
    }

    // fal.ai Minimax
    else if (model === 'fal-minimax') {
      const key = keys.falai || process.env.FALAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave fal.ai nao configurada.' }, { status: 400 })
      const endpoint = 'https://queue.fal.run/fal-ai/minimax'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          enable_safety: false,
          ...(duration && { duration }),
          ...(aspectRatio && { aspect_ratio: aspectRatio }),
        }),
      })
      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: `fal.ai (Minimax) erro ${res.status}: ${err}` }, { status: res.status })
      }
      const data = await res.json()
      if (data.video_url || data.url) {
        videoUrl = data.video_url || data.url
        return NextResponse.json({ url: videoUrl, status: 'done' })
      }
      if (data.id) {
        jobId = data.id
        for (let i = 0; i < 60; i++) {
          await delay(3000)
          const pollRes = await fetch(`https://queue.fal.run/fal-ai/minimax/status/${jobId}`, {
            headers: { 'Authorization': `Key ${key}` },
          })
          if (!pollRes.ok) continue
          const pollData = await pollRes.json()
          if (pollData.status === 'completed' || pollData.status === 'succeeded') {
            videoUrl = pollData.video_url || pollData.url || (pollData.output && (Array.isArray(pollData.output) ? pollData.output[0] : pollData.output)) || ''
            return NextResponse.json({ url: videoUrl, jobId, status: 'done' })
          }
          if (pollData.status === 'failed') {
            return NextResponse.json({ error: `fal.ai falhou: ${pollData.error || 'unknown'}` }, { status: 500 })
          }
        }
        return NextResponse.json({ jobId, status: 'processing' }, { status: 202 })
      }
      return NextResponse.json({ error: 'fal.ai nao retornou video, job ID ou URL.' }, { status: 500 })
    }

    else {
      return NextResponse.json({ error: `Modelo de video "${model}" nao suportado.` }, { status: 400 })
    }

    if (videoUrl) {
      return NextResponse.json({ url: videoUrl, status: 'done' })
    }

    return NextResponse.json({ error: 'URL do video nao gerada.' }, { status: 500 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Erro interno no servidor.' }, { status: 500 })
  }
}
