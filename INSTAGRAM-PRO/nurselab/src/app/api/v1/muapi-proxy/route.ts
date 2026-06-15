import { NextRequest, NextResponse } from 'next/server'

const MUAPI_KEY = process.env.MUAPI_API_KEY || 'd5d036ce326cdc9292dfab2658f365e0bacedf032cdeca05264262019911b522'
const MUAPI_BASE = 'https://api.muapi.ai/v2'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

async function pollResult(requestId: string, maxAttempts = 60, interval = 2000) {
  for (let i = 1; i <= maxAttempts; i++) {
    await delay(interval)
    const res = await fetch(`${MUAPI_BASE}/predictions/${requestId}/result`, {
      headers: { 'x-api-key': MUAPI_KEY, 'Content-Type': 'application/json' }
    })
    if (!res.ok) continue
    const data = await res.json()
    const s = (data.status || '').toLowerCase()
    if (s === 'completed' || s === 'succeeded' || s === 'success') return data
    if (s === 'failed' || s === 'error') throw new Error(data.error || 'Generation failed')
  }
  throw new Error('Timeout esperando resultado')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { endpoint, payload } = body

    if (!endpoint) return NextResponse.json({ error: 'Endpoint requerido' }, { status: 400 })

    const res = await fetch(`${MUAPI_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'x-api-key': MUAPI_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const txt = await res.text()
      return NextResponse.json({ error: `MuAPI ${res.status}: ${txt.slice(0, 200)}` }, { status: res.status })
    }

    const json = await res.json()
    const reqId = json.request_id || json.id
    if (!reqId) return NextResponse.json(json)

    // Poll for result
    const result = await pollResult(reqId)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}