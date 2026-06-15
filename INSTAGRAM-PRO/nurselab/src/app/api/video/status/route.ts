import { NextRequest, NextResponse } from 'next/server'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST(req: NextRequest) {
  try {
    const { jobId, provider, model, apiKeys } = await req.json()
    const keys = apiKeys || {}

    if (!jobId || !provider) {
      return NextResponse.json({ error: 'jobId e provider sao obrigatorios' }, { status: 400 })
    }

    let result: any

    // Higgsfield (seedance variants)
    if (provider === 'higgsfield-seedance' || provider === 'seedance-v1' || provider === 'seedance-v1-lite') {
      const key = keys.higgsfield || process.env.HIGGSFIELD_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Higgs Field nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.higgsfield.ai/v1/video/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Higgsfield status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'succeeded') {
        return NextResponse.json({
          status: 'done',
          url: result.video_url || result.output?.video_url || '',
        })
      }
      if (result.status === 'failed') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // Segmind
    else if (provider === 'segmind') {
      const key = keys.segmind || process.env.SEGMIND_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Segmind nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.segmind.com/v1/seedance-2.0/status/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Segmind status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'succeeded') {
        return NextResponse.json({ status: 'done', url: result.video_url || result.url || '' })
      }
      if (result.status === 'failed') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // Replicate
    else if (provider === 'replicate') {
      const key = keys.replicate || process.env.REPLICATE_API_TOKEN
      if (!key) return NextResponse.json({ error: 'Chave Replicate nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${jobId}`, {
        headers: { 'Authorization': `Token ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Replicate status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'succeeded') {
        const output = result.output
        const url = Array.isArray(output) ? output[0] : output
        return NextResponse.json({ status: 'done', url })
      }
      if (result.status === 'failed') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // HuggingFace
    else if (provider === 'huggingface') {
      const key = keys.huggingface || process.env.HUGGINGFACE_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave HuggingFace nao configurada.' }, { status: 400 })

      // HuggingFace video may not have a status endpoint; if it returns a result immediately in generation, this endpoint might not be used.
      // For models that support polling, some expose a result URL. We'll try to fetch the result directly.
      const res = await fetch(`https://api-inference.huggingface.co/models/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (res.ok) {
        const data = await res.json()
        if (data.video || data.url) {
          return NextResponse.json({ status: 'done', url: data.video || data.url })
        }
      }
      // If not ready, return processing
      return NextResponse.json({ status: 'processing' })
    }

    // Pika
    else if (provider === 'pika') {
      const key = keys.pika || process.env.PIKA_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Pika nao configurada.' }, { status: 400 })

      const endpoint = model === 'pika-v2' ? 'https://api.pika.art/v2/videos' : 'https://api.pika.art/v1/videos'

      const pollRes = await fetch(`${endpoint}/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Pika status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'succeeded') {
        return NextResponse.json({ status: 'done', url: result.url || result.video_url || result.output || '' })
      }
      if (result.status === 'failed') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // Runway
    else if (provider === 'runway') {
      const key = keys.runway || process.env.RUNWAY_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Runway nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.runwayml.com/v1/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Runway status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'SUCCEEDED') {
        return NextResponse.json({ status: 'done', url: result.output_url || result.video_url || '' })
      }
      if (result.status === 'FAILED') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: 'processing' })
    }

    // Kling
    else if (provider === 'kling') {
      const key = keys.kling || process.env.KLING_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Kling nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.kling.kuaishou.com/v1/videos/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Kling status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'SUCCEEDED') {
        return NextResponse.json({ status: 'done', url: result.url || result.video_url || result.result_url || '' })
      }
      if (result.status === 'failed' || result.status === 'FAILED') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // Haiper
    else if (provider === 'haiper') {
      const key = keys.haiper || process.env.HAIPER_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Haiper nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.haiper.ai/v1/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Haiper status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'SUCCEEDED') {
        return NextResponse.json({ status: 'done', url: result.output_url || result.video_url || '' })
      }
      if (result.status === 'failed' || result.status === 'FAILED') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // Luma
    else if (provider === 'luma') {
      const key = keys.luma || process.env.LUMA_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave Luma nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://api.lumalabs.ai/v1/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `Luma status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'SUCCEEDED') {
        return NextResponse.json({ status: 'done', url: result.result_url || result.video_url || '' })
      }
      if (result.status === 'failed' || result.status === 'FAILED') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    // fal.ai (Minimax)
    else if (provider === 'fal-minimax') {
      const key = keys.falai || process.env.FALAI_API_KEY
      if (!key) return NextResponse.json({ error: 'Chave fal.ai nao configurada.' }, { status: 400 })

      const pollRes = await fetch(`https://queue.fal.run/fal-ai/minimax/status/${jobId}`, {
        headers: { 'Authorization': `Key ${key}` },
      })
      if (!pollRes.ok) {
        return NextResponse.json({ status: 'error', error: `fal.ai status ${pollRes.status}` }, { status: pollRes.status })
      }
      result = await pollRes.json()
      if (result.status === 'completed' || result.status === 'succeeded') {
        const videoUrl = result.video_url || result.url || (result.output && (Array.isArray(result.output) ? result.output[0] : result.output)) || ''
        return NextResponse.json({ status: 'done', url: videoUrl })
      }
      if (result.status === 'failed') {
        return NextResponse.json({ status: 'error', error: result.error || 'Falha na geracao' }, { status: 500 })
      }
      return NextResponse.json({ status: result.status || 'processing' })
    }

    else {
      return NextResponse.json({ error: `Provider "${provider}" nao suportado para status.` }, { status: 400 })
    }
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || 'Erro interno no servidor.' }, { status: 500 })
  }
}
